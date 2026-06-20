import React, { useState } from "react";
import { Play, Volume2, VolumeX, ArrowDown, Sparkles, Film } from "lucide-react";

interface HeroSectionProps {
  onScrollNext: () => void;
}

export default function HeroSection({ onScrollNext }: HeroSectionProps) {
  const [isPlayingCinema, setIsPlayingCinema] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Cinematic video asset (high-quality mountain peak hiking scenes)
  const videoUrl = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e108e3e4a9e50280471022ffec7&profile_id=139&oauth2_token_id=57447761";
  const posterUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop";

  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-[#080808] flex flex-col justify-between text-stone-200 z-10 select-none">
      {/* Cinematic Dark Overlay and Color Grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/20 to-[#080808] z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(8,8,8,0.7)_100%)] z-20 pointer-events-none" />

      {/* Background Video / Picture Element */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-50% left-50% transform -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.03] transition-all duration-1000 brightness-[0.7] contrast-[1.05]"
          poster={posterUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          <img src={posterUrl} alt="Mountain view fallback" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* Top Navigation Frame bar (Sophisticated Dark overlay) */}
      <div className="w-full px-6 py-6 md:px-12 flex justify-between items-center z-30 mt-12">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <Film className="h-3.5 w-3.5 text-stone-400" />
          </div>
          <span className="font-mono tracking-[0.25em] text-[10px] uppercase text-stone-400/95 selection:bg-white selection:text-black">
            Adventure Archive // Vol. 01
          </span>
        </div>

        {/* Live Soundtrack / Audio Mute Controller */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          id="toggle-background-audio-btn"
          className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 px-3 py-1.5 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
          title="Bật/Tắt âm thanh môi trường"
        >
          {isMuted ? (
            <>
              <VolumeX className="h-3 w-3 animate-pulse text-stone-500" />
              <span className="hidden sm:inline">Mute Ambient</span>
            </>
          ) : (
            <>
              <Volume2 className="h-3 w-3 text-white animate-bounce" />
              <span className="hidden sm:inline text-white">Live Soundscape</span>
            </>
          )}
        </button>
      </div>

      {/* Central Content (Hero Text & Play Button) */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-6 z-30 pb-16">
        {/* Play Button matching Layout exactly */}
        <button
          onClick={() => setIsPlayingCinema(true)}
          id="reveal-cinema-theater-btn"
          className="group relative mb-8 h-14 w-14 md:h-16 md:w-16 rounded-full border border-white/30 hover:border-white bg-[#080808]/40 hover:bg-white/5 flex items-center justify-center transition-all duration-500 scale-100 hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
          aria-label="Xem phim điện ảnh hành trình"
        >
          <span className="absolute -inset-1 rounded-full border border-white/5 group-hover:scale-125 transition-transform duration-1000 animate-ping opacity-30" />
          <Play className="h-4.5 w-4.5 md:h-5 md:w-5 text-white fill-white group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Title Elements - Sleek & Light to match Elegant Design */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-white mb-6 leading-none px-1 selection:bg-neutral-800 selection:text-white">
          The Summit <br/>
          <span className="italic font-light text-stone-400">Beyond Photography.</span>
        </h1>
        
        <p className="font-hand text-2xl sm:text-3xl text-stone-400 italic max-w-2xl px-4 select-none transform rotate-[-1deg] translate-y-1">
          "It's the cinematic journey of your life."
        </p>
      </div>

      {/* Bottom Frame / Scroll Indicator / Location Badge */}
      <div className="w-full px-6 py-6 md:px-12 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 z-30 bg-gradient-to-t from-[#080808] to-transparent pb-8">
        <div className="text-left hidden sm:block">
          <p className="text-[9px] tracking-[0.3em] font-mono uppercase text-stone-500">SECTION 1 // HERO</p>
          <p className="font-sans text-xs text-stone-400 font-light">"Silence of the high peaks."</p>
        </div>

        {/* Scroll down button in center */}
        <button
          onClick={onScrollNext}
          id="hero-scroll-btn"
          className="group flex flex-col items-center justify-center space-y-2 text-xs uppercase tracking-widest text-[#a3a3a3] hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] text-center text-stone-500 group-hover:text-stone-300 transition-colors duration-300">SCROLL TO EXPLORE</span>
          <ArrowDown className="h-3.5 w-3.5 text-stone-400 group-hover:translate-y-1 transition-transform" />
        </button>

        <div className="text-right hidden sm:block">
          <p className="text-[9px] tracking-[0.3em] font-mono uppercase text-stone-500">EST. 2024</p>
          <p className="font-mono text-[10px] text-stone-400/80">LAT 46.4382° N • ALT 2,840M</p>
        </div>
      </div>

      {/* CINEMA THEATER OVERLAY FULLSCREEN MODAL */}
      {isPlayingCinema && (
        <div className="fixed inset-0 bg-[#080808]/98 z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setIsPlayingCinema(false)}
            id="close-cinema-btn"
            className="absolute top-4 right-4 md:top-8 md:right-8 border border-white/10 hover:border-white text-stone-400 hover:text-white bg-[#0c0c0c]/90 px-4 py-2 rounded-full cursor-pointer text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 z-50"
          >
            Đóng rạp phim [ESC]
          </button>

          {/* Cinemascope Aspect Ratio Video Player Container */}
          <div className="relative w-full max-w-6xl aspect-[21/9] bg-stone-950 rounded-sm overflow-hidden border border-white/5 rip-shadow">
            {/* Aspect Ratio Screen borders */}
            <div className="absolute top-0 inset-x-0 h-4 bg-black/80 z-20 border-b border-white/5" />
            <div className="absolute bottom-0 inset-x-0 h-4 bg-black/80 z-20 border-t border-white/5" />

            <iframe
              src="https://player.vimeo.com/video/371433846?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0"
              className="w-full h-full object-cover scale-[1.01]"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Cinematic Journey Mountain Teaser"
            />
          </div>

          <div className="mt-6 text-center max-w-xl">
            <h3 className="font-serif text-xl text-white mb-2 font-normal">Thước Phim Chầm Chậm Của Tuổi Trẻ</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-sans font-light">
              Những bước chân mộc mạc băng qua các thảo nguyên bao la, đỉnh núi chon von mịt mùng tuyết trắng. Mỗi nơi ta qua đều ghi lại một mảng ký ức diệu kỳ đầy nhựa sống.
            </p>
            <div className="flex justify-center items-center space-x-3 mt-4 text-[9px] text-stone-600 font-mono tracking-widest">
              <span>HD CINEMATIC</span>
              <span>•</span>
              <span>COLOR GRADE MONOCHROME IN SILENCE</span>
              <span>•</span>
              <span>DOLBY SOUND PASSIVE</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
