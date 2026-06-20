import React, { useRef, useState } from "react";
import { TimelineItem } from "../types";
import { initialTimelineItems } from "../data";
import { ChevronLeft, ChevronRight, Heart, MapPin, Calendar, Volume2, Plus, CornerDownLeft, Sparkles, BookOpen } from "lucide-react";

interface TimelineSectionProps {
  onSelectMemory: (item: TimelineItem) => void;
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
}

export default function TimelineSection({ onSelectMemory, timelineItems, setTimelineItems }: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [quickNotes, setQuickNotes] = useState<Record<string, string>>({});
  const [activeNoteInputId, setActiveNoteInputId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal
    setTimelineItems(prev =>
      prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  // Add quick physical memory notes written into the polaroid
  const handleAddNote = (itemId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setQuickNotes(prev => ({ ...prev, [itemId]: noteText }));
    setNoteText("");
    setActiveNoteInputId(null);
  };

  return (
    <section id="timeline-section" className="relative w-full py-24 px-4 md:px-12 bg-[#0c0c0c] text-stone-200 overflow-hidden border-t border-b border-white/5 z-10">
      {/* Dynamic background vignette decorations */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#262626]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Title block with handwritten subtitle matching Section 2 of reference */}
      <div className="text-center mb-16 relative z-30">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-stone-500 block mb-3">SECTION 2 // FLOATING TIMELINE</span>
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-white mb-3 selection:bg-neutral-800 selection:text-white">
          The Photographic Timeline
        </h2>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#a3a3a3] font-light mt-1">
          "Lăn chuột hoặc kéo ngang để hồi tưởng hành trình."
        </p>
      </div>

      {/* Decorative Scrapbook Film edges running horizontally */}
      <div className="relative w-full max-w-7xl mx-auto my-6 z-20">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0c0c0c] to-transparent z-30 pointer-events-none hidden md:block" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0c0c0c] to-transparent z-30 pointer-events-none hidden md:block" />

        {/* Left/Right controls overlaid for easy accessibility */}
        <div className="absolute top-[40%] -left-4 z-40 transform -translate-y-1/2 hidden md:flex">
          <button
            onClick={scrollLeft}
            className="p-3 rounded-full bg-[#171717] hover:bg-white hover:text-black border border-white/10 text-stone-300 transition-all cursor-pointer shadow-2xl active:scale-95 text-center"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute top-[40%] -right-4 z-40 transform -translate-y-1/2 hidden md:flex">
          <button
            onClick={scrollRight}
            className="p-3 rounded-full bg-[#171717] hover:bg-white hover:text-black border border-white/10 text-stone-300 transition-all cursor-pointer shadow-2xl active:scale-95 text-center"
            aria-label="Scroll Right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* HORIZONTAL SWIPEABLE FILM STRIP BOX */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-8 md:gap-11 py-10 px-4 md:px-10 scrollbar-none scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {timelineItems.map((item, index) => {
            // Minimal, clean slight rotation variants to retain interactive artsy feeling but with high-end dark gallery vibe
            const rotations = ["hover:rotate-0 rotate-[-0.5deg]", "hover:rotate-0 rotate-[0.5deg]", "hover:rotate-0 rotate-[-1deg]", "hover:rotate-0 rotate-[1deg]"];
            const rotationClass = rotations[index % rotations.length];

            return (
              <div
                key={item.id}
                onClick={() => onSelectMemory(item)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`flex-shrink-0 w-[290px] sm:w-[325px] snap-center select-none transition-all duration-500 ease-out cursor-pointer py-4 ${rotationClass} group`}
              >
                {/* Modern Dark Slide Frame Container */}
                <div className="bg-[#121212] text-stone-200 p-4 pb-5 rounded-lg shadow-2xl border border-white/5 relative transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#161616]">
                  
                  {/* Tape style adhesive at top center */}
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-white/[0.03] backdrop-blur-[1.5px] border-l border-r border-white/10 opacity-80 z-20 shadow-sm origin-center -rotate-1 group-hover:opacity-100 transition-opacity" />

                  {/* Polaroid Image Slot */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-900 border border-stone-400 group-hover:brightness-[1.02] transition-all duration-300">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[15%] sepia-[10%] group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700 ease-out"
                    />
                    
                    {/* Atmospheric Tag pinned inside Polaroid */}
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-[9px] text-warm-gold/90 border border-warm-gold/30 px-2 py-0.5 rounded-full flex items-center space-x-1 uppercase tracking-widest z-10">
                      <MapPin className="h-2.5 w-2.5 text-warm-gold" />
                      <span className="truncate max-w-[124px]">{item.location.split(',')[0]}</span>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-warm-cream/90 text-stone-800 text-[8px] font-mono px-1.5 py-0.5 rounded-sm border border-stone-300 uppercase tracking-wider z-10">
                      {item.date.split(',')[1] || item.date}
                    </div>
                  </div>

                  {/* Polaroid Bottom Notes with Handwriting font */}
                  <div className="mt-4 pt-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight tracking-tight hover:text-warm-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-hand text-xl text-warm-accent leading-none mt-1 shadow-none">
                        "{quickNotes[item.id] || item.handwrittenCaption}"
                      </p>
                    </div>

                    {/* Interactive bottom row like count, view story label */}
                    <div className="flex items-center justify-between border-t border-stone-200 mt-4 pt-2 text-stone-500">
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="flex items-center space-x-1.5 text-xs hover:text-red-500 active:scale-90 transition-transform cursor-pointer"
                        title="Thích kỷ niệm này"
                      >
                        <Heart className="h-4.5 w-4.5 transition-all text-red-500 fill-red-500" />
                        <span className="font-mono text-xs text-stone-600 group-hover:text-stone-800 font-semibold">{item.likes}</span>
                      </button>

                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#2d2420]/75 flex items-center space-x-1 font-semibold">
                        <BookOpen className="h-3 w-3 text-warm-accent/80" />
                        <span>Read Entry</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional interactive pencil comment log in cell */}
                {hoveredCard === item.id && (
                  <div className="mt-3 text-center transition-all duration-300 animate-fade-in px-4">
                    <span className="text-[11px] font-hand text-warm-gold tracking-widest animate-pulse">
                      ✨ Click to read journal entries...
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ripped instruction labels exactly matching handrawn visual detail in Section 2 */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 mt-6 text-center text-warm-cream/60">
        <div className="font-hand text-2xl text-warm-gold/90 flex items-center space-x-2 select-none">
          <span className="text-sm border border-warm-gold/30 rounded-full h-8 w-8 flex items-center justify-center font-mono text-warm-cream font-bold">1</span>
          <span>Click any Polaroid frame to open the detailed traveler's diary.</span>
        </div>

        <div className="font-hand text-2xl text-warm-gold/90 flex items-center space-x-2 mt-4 sm:mt-0 select-none">
          <span className="text-sm border border-warm-gold/30 rounded-full h-8 w-8 flex items-center justify-center font-mono text-warm-cream font-bold">2</span>
          <span>Hover / Touch to see secrets scroll & ambient tracks.</span>
        </div>
      </div>
    </section>
  );
}
