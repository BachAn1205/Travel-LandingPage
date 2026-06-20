 import React, { useState } from "react";
import { Play, Volume2, VolumeX, ArrowDown, Sparkles, Film } from "lucide-react";

interface HeroSectionProps {
  onScrollNext: () => void;
}

export default function HeroSection({ onScrollNext }: HeroSectionProps) {
  // Cinematic video asset
  const videoUrl = "/video/2.mp4";

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
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.03] transition-all duration-1000 brightness-[0.7] contrast-[1.05]"
        >
          <source src={videoUrl} type="video/mp4" />
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
      </div>

      {/* Central Content (Hero Text) */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-6 z-30 pb-16">
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

    </section>
  );
}
