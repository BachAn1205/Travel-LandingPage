import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";

interface Track {
  id: string; name_vi: string; name_en: string;
  location: string; emoji: string; color: string;
  // Web Audio params per soundscape
  noiseGain: number; filterFreq: number; filterQ: number;
  lfoFreq: number; lfoDepth: number; reverbAmount: number;
}

const TRACKS: Track[] = [
  { id:"1", name_vi:"Sóng Biển Amalfi",    name_en:"Amalfi Ocean Waves",     location:"Positano, Italy",       emoji:"🌊", color:"#d4a853", noiseGain:0.35, filterFreq:320,  filterQ:0.8, lfoFreq:0.15, lfoDepth:180, reverbAmount:0.6 },
  { id:"2", name_vi:"Gió Núi Dolomites",   name_en:"Dolomites Mountain Wind", location:"Dolomites, Austria",    emoji:"🏔️", color:"#7eb8c9", noiseGain:0.25, filterFreq:900,  filterQ:0.5, lfoFreq:0.4,  lfoDepth:400, reverbAmount:0.3 },
  { id:"3", name_vi:"Lửa Trại Bắc Âu",    name_en:"Nordic Campfire",         location:"Snæfellsnes, Iceland",  emoji:"🔥", color:"#e8834a", noiseGain:0.28, filterFreq:200,  filterQ:1.2, lfoFreq:2.5,  lfoDepth:80,  reverbAmount:0.4 },
  { id:"4", name_vi:"Suối Rừng Croatia",   name_en:"Croatia Forest Stream",   location:"Plitvice, Croatia",     emoji:"🌿", color:"#8aad5c", noiseGain:0.40, filterFreq:1200, filterQ:0.6, lfoFreq:0.8,  lfoDepth:300, reverbAmount:0.5 },
  { id:"5", name_vi:"Băng Giá Banff",      name_en:"Banff Glacial Air",       location:"Banff, Canada",         emoji:"❄️", color:"#9ab8d4", noiseGain:0.15, filterFreq:2800, filterQ:0.3, lfoFreq:0.2,  lfoDepth:600, reverbAmount:0.7 },
  { id:"6", name_vi:"Thung Lũng Yosemite", name_en:"Yosemite Valley",         location:"California, USA",       emoji:"🌲", color:"#c07c3a", noiseGain:0.22, filterFreq:600,  filterQ:0.7, lfoFreq:0.3,  lfoDepth:200, reverbAmount:0.5 },
  { id:"7", name_vi:"Thác Skógafoss",      name_en:"Skógafoss Falls",         location:"Iceland",               emoji:"💧", color:"#6b9dc2", noiseGain:0.55, filterFreq:800,  filterQ:0.4, lfoFreq:0.6,  lfoDepth:350, reverbAmount:0.8 },
];

// Build a reverb impulse via decaying noise
function makeReverb(ctx: AudioContext, duration = 2.5, decay = 2.0): ConvolverNode {
  const conv = ctx.createConvolver();
  const rate = ctx.sampleRate;
  const len  = rate * duration;
  const buf  = ctx.createBuffer(2, len, rate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/len, decay);
  }
  conv.buffer = buf;
  return conv;
}

export default function AudioCassette() {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying]   = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress]     = useState(0);
  const [reelAngle, setReelAngle]   = useState(0);
  const [volume, setVolume]         = useState(0.55);

  const animRef    = useRef<number|null>(null);
  const audioRef   = useRef<AudioContext|null>(null);
  const nodesRef   = useRef<AudioNode[]>([]);

  // Stop & disconnect current audio nodes
  const stopAudio = useCallback(() => {
    nodesRef.current.forEach(n => { try { (n as any).stop?.(); n.disconnect(); } catch{} });
    nodesRef.current = [];
  }, []);

  // Start procedural ambient sound for given track
  const startAudio = useCallback((trackIdx: number, vol: number) => {
    stopAudio();
    const t = TRACKS[trackIdx];

    if (!audioRef.current || audioRef.current.state === "closed") {
      audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(vol * t.noiseGain, ctx.currentTime + 1.5);
    masterGain.connect(ctx.destination);

    // Brown noise source via white noise shaped through biquad
    const bufSize = ctx.sampleRate * 2;
    const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufSize; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      nd[i] = last * 18; // amplify brownian
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;

    // Primary low-pass filter
    const lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = t.filterFreq;
    lpf.Q.value = t.filterQ;

    // LFO modulates filter cutoff for wave/wind motion
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = t.lfoFreq;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = t.lfoDepth;
    lfo.connect(lfoGain);
    lfoGain.connect(lpf.frequency);
    lfo.start();

    // Reverb for spaciousness
    const reverb = makeReverb(ctx);
    const dryGain = ctx.createGain();  dryGain.gain.value  = 1 - t.reverbAmount;
    const wetGain = ctx.createGain();  wetGain.gain.value  = t.reverbAmount;

    noise.connect(lpf);
    lpf.connect(dryGain);
    lpf.connect(reverb);
    reverb.connect(wetGain);
    dryGain.connect(masterGain);
    wetGain.connect(masterGain);
    noise.start();

    nodesRef.current = [noise, lfo, lpf, lfoGain, reverb, dryGain, wetGain, masterGain];
  }, [stopAudio]);

  // Play/pause effect
  useEffect(() => {
    if (isPlaying) {
      startAudio(currentTrack, volume);
    } else {
      // Fade out gracefully
      if (audioRef.current) {
        const ctx = audioRef.current;
        const master = nodesRef.current.find(n => n instanceof GainNode) as GainNode | undefined;
        if (master) {
          master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
          setTimeout(stopAudio, 900);
        } else stopAudio();
      }
    }
  }, [isPlaying, currentTrack, volume]);

  // Reel animation
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setReelAngle(a => (a + 2) % 360);
        setProgress(p => p >= 100 ? 0 : p + 0.07);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => () => { stopAudio(); audioRef.current?.close(); }, []);

  const track = TRACKS[currentTrack];
  const trackName = language === "en" ? track.name_en : track.name_vi;

  const changeTrack = (idx: number) => {
    setCurrentTrack(idx);
    setProgress(0);
    if (isPlaying) setTimeout(() => startAudio(idx, volume), 50);
  };

  const Reel = ({ angle, scale = 1 }: { angle: number; scale?: number }) => (
    <div className="relative" style={{ width: 40*scale, height: 40*scale }}>
      <div className="absolute inset-0 rounded-full border-2 border-[#4a3520] bg-[#1a1008]"
        style={{ transform: `rotate(${angle}deg)`, transition: isPlaying ? "none" : "transform 0.3s" }}>
        <div className="absolute inset-[3px] rounded-full border border-[#3a2510]" />
        {[0,60,120,180,240,300].map(a => (
          <div key={a} className="absolute w-0.5 h-3 bg-[#5a4030] rounded-full"
            style={{ transform:`rotate(${a}deg) translateY(-5px)`, transformOrigin:"50% 100%",
              top:"50%", left:"50%", marginLeft:"-1px", marginTop:"-12px" }} />
        ))}
        <div className="absolute inset-[7px] rounded-full bg-[#2a1a0a] border border-[#4a3020]" />
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none" style={{ fontFamily:"'Plus Jakarta Sans', monospace" }}>

      {/* ── Expanded Panel ── */}
      <div className={`transition-all duration-500 ease-out overflow-hidden ${isExpanded ? "opacity-100 translate-y-0 mb-3" : "opacity-0 translate-y-4 pointer-events-none mb-0"}`}
        style={{ maxHeight: isExpanded ? "360px" : "0px" }}>
        <div className="w-64 bg-[#1a1410] border border-[#3d2e1e] rounded-xl shadow-2xl overflow-hidden"
          style={{ boxShadow:"0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
          <div className="p-4">
            {/* Cassette window */}
            <div className="bg-[#0d0a07] rounded-lg p-3 mb-3 border border-[#2a1f14]">
              <div className="flex items-center justify-between mb-2">
                <Reel angle={reelAngle} />
                <div className="flex-1 mx-3 text-center">
                  <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-400/80 mb-0.5">
                    {language === "en" ? "AMBIENT VOL." : "ÂM THANH T."}
                  </div>
                  <div className="text-[8px] text-stone-500 tracking-widest">
                    {String(currentTrack+1).padStart(2,"0")} / {String(TRACKS.length).padStart(2,"0")}
                  </div>
                </div>
                <Reel angle={-reelAngle * 0.6} />
              </div>
              {/* Progress */}
              <div className="h-1 bg-[#2a1f14] rounded-full overflow-hidden mt-2">
                <div className="h-full rounded-full transition-all duration-100"
                  style={{ width:`${progress}%`, backgroundColor: track.color }} />
              </div>
            </div>

            {/* Track info */}
            <div className="mb-3 flex items-center space-x-2">
              <span className="text-lg">{track.emoji}</span>
              <div>
                <div className="text-xs font-bold text-stone-200 leading-tight">{trackName}</div>
                <div className="text-[9px] text-stone-500 tracking-widest uppercase mt-0.5">{track.location}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={e => { e.stopPropagation(); changeTrack((currentTrack-1+TRACKS.length)%TRACKS.length); }}
                className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-200 transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
              </button>
              <button onClick={e => { e.stopPropagation(); setIsPlaying(p => !p); }}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90"
                style={{ backgroundColor: track.color, boxShadow:`0 0 16px ${track.color}55` }}>
                {isPlaying
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{marginLeft:"2px"}}><polygon points="5,3 19,12 5,21"/></svg>
                }
              </button>
              <button onClick={e => { e.stopPropagation(); changeTrack((currentTrack+1)%TRACKS.length); }}
                className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-200 transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>

            {/* Volume slider */}
            <div className="flex items-center space-x-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-stone-600 flex-shrink-0">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
              <input type="range" min="0" max="1" step="0.05" value={volume}
                onChange={e => { const v = parseFloat(e.target.value); setVolume(v); }}
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: track.color }} />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-stone-400 flex-shrink-0">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </div>
          </div>

          {/* Track list */}
          <div className="border-t border-[#2a1f14] px-3 py-2 max-h-28 overflow-y-auto">
            {TRACKS.map((t, i) => (
              <button key={t.id}
                onClick={e => { e.stopPropagation(); changeTrack(i); }}
                className={`w-full flex items-center space-x-2 py-1 px-1 rounded text-left transition-colors cursor-pointer ${i === currentTrack ? "bg-[#2a1f14]" : "hover:bg-[#1f1710]"}`}>
                <span className="text-sm">{t.emoji}</span>
                <span className={`text-[9px] truncate ${i === currentTrack ? "text-amber-400" : "text-stone-500"}`}>
                  {language === "en" ? t.name_en : t.name_vi}
                </span>
                {i === currentTrack && isPlaying && (
                  <span className="ml-auto flex space-x-px">
                    {[1,2,3].map(b => <span key={b} className="w-0.5 rounded-full bg-amber-400 animate-pulse" style={{height:`${6+b*2}px`, animationDelay:`${b*0.15}s`}} />)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating Pill Trigger ── */}
      <button onClick={() => setIsExpanded(e => !e)}
        className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-full cursor-pointer transition-all duration-300 active:scale-95 ${isExpanded ? "bg-[#1a1410] border border-[#3d2e1e]" : "bg-[#1a1410]/90 border border-[#3d2e1e]/60 backdrop-blur-md"}`}
        style={{ boxShadow: isPlaying ? `0 0 20px ${track.color}40, 0 4px 20px rgba(0,0,0,0.4)` : "0 4px 20px rgba(0,0,0,0.4)" }}>
        {/* Mini reel */}
        <div className="relative w-5 h-5 flex-shrink-0">
          <div className="absolute inset-0 rounded-full border border-amber-700/60 bg-[#0d0a07]"
            style={{ transform:`rotate(${reelAngle}deg)`, transition: isPlaying ? "none" : "transform 0.5s" }}>
            {[0,120,240].map(a => (
              <div key={a} className="absolute w-0.5 h-1.5 bg-amber-600/70 rounded-full"
                style={{top:"2px", left:"calc(50% - 1px)", transform:`rotate(${a}deg)`, transformOrigin:"50% 8px"}} />
            ))}
            <div className="absolute inset-[4px] rounded-full bg-amber-900/30" />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold text-stone-300 truncate max-w-[100px]">{trackName}</span>
          {isPlaying && (
            <div className="flex items-center space-x-[2px] mt-0.5">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-0.5 rounded-full bg-amber-400"
                  style={{height:`${4+i}px`, animation:`pulse ${0.4+i*0.1}s ease-in-out infinite alternate`}} />
              ))}
            </div>
          )}
        </div>
        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: isPlaying ? track.color : "#4a3520" }}>
          {isPlaying
            ? <svg width="6" height="6" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="6" height="6" viewBox="0 0 24 24" fill="white" style={{marginLeft:"1px"}}><polygon points="5,3 19,12 5,21"/></svg>
          }
        </div>
      </button>
    </div>
  );
}
