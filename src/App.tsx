import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import FloatingScrapbook from "./components/FloatingScrapbook";
import CollabAndExportSection from "./components/CollabAndExportSection";
import ScrapbookDetailModal from "./components/ScrapbookDetailModal";
import { TimelineItem, AlbumPhoto, Collaborator } from "./types";
import { initialTimelineItems, initialAlbumPhotos, initialCollaborators } from "./data";
import { Film, Image as ImageIcon, Sparkles, Heart, Share2, Compass, ArrowUp, Calendar, MapPin } from "lucide-react";

export default function App() {
  // App-level state for interactive content
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(initialTimelineItems);
  const [albumPhotos, setAlbumPhotos] = useState<AlbumPhoto[]>(initialAlbumPhotos);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators);
  
  // Modal tracking
  const [selectedMemory, setSelectedMemory] = useState<TimelineItem | null>(null);

  // Quick feedback toasts
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLikeMemory = (id: string) => {
    setTimelineItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          triggerToast(`Đã lưu tim cho kỷ niệm "${item.title}"! ❤️`);
          return { ...item, likes: item.likes + 1 };
        }
        return item;
      })
    );
    // Synced with active open modal state
    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory((prev) => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200 font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden relative">
      
      {/* Floating Top Mini Header (Pinned on scroll) */}
      <nav className="fixed top-0 inset-x-0 h-14 bg-[#080808]/85 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-12 z-40">
        <button 
          onClick={() => scrollToSection("hero-section")} 
          className="flex items-center space-x-2 text-white hover:text-stone-300 transition-colors cursor-pointer bg-transparent border-none"
        >
          <Film className="h-4 w-4 text-stone-400" />
          <span className="font-serif tracking-widest text-[11px] uppercase font-light">L'IMMERSION</span>
        </button>

        {/* Section Fast links exactly matched to Section numbers of reference image */}
        <div className="flex items-center space-x-4 md:space-x-8 text-[10px] font-mono tracking-widest uppercase text-stone-400">
          <button 
            onClick={() => scrollToSection("hero-section")} 
            className="hover:text-white cursor-pointer transition-colors bg-transparent border-none hidden sm:inline-block border-b border-transparent hover:border-white/30 pb-0.5"
          >
            01. Hero
          </button>
          <button 
            onClick={() => scrollToSection("timeline-section")} 
            className="hover:text-white cursor-pointer transition-colors bg-transparent border-none border-b border-transparent hover:border-white/20 pb-0.5 text-stone-200"
          >
            02. Floating Film Timeline
          </button>
          <button 
            onClick={() => scrollToSection("collab-section")} 
            className="hover:text-white cursor-pointer transition-colors bg-transparent border-none border-b border-transparent hover:border-white/30 pb-0.5"
          >
            03. Features & CTA
          </button>
        </div>

        {/* Floating Quick Action */}
        <button
          onClick={() => scrollToSection("collab-section")}
          className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white text-stone-300 hover:text-black border border-white/10 text-[10px] font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer hidden md:block"
        >
          Secure Copy
        </button>
      </nav>

      {/* Main Core View Modules */}
      <main className="pt-0">
        
        {/* SECTION 1: HERO CONTAINER */}
        <HeroSection onScrollNext={() => scrollToSection("timeline-section")} />

        {/* SECTION 2: FLOATING TIMELINE STRIP */}
        <FloatingScrapbook 
          onSelectMemory={setSelectedMemory} 
          timelineItems={timelineItems} 
          setTimelineItems={setTimelineItems} 
        />

        {/* SECTION 3: COLLABORATION ALBUM & PHYSICAL PRINTER CONTROLLER */}
        <CollabAndExportSection 
          albumPhotos={albumPhotos} 
          setAlbumPhotos={setAlbumPhotos}
          collaborators={collaborators}
          setCollaborators={setCollaborators}
        />
      </main>

      {/* INTERACTIVE DETAIL SCRAPBOOK DIARY OVERLAY */}
      <ScrapbookDetailModal 
        item={selectedMemory} 
        onClose={() => setSelectedMemory(null)} 
        onLike={handleLikeMemory} 
      />

      {/* FOOTER SECTION: Standard, clean copyrights and creative creds */}
      <footer className="bg-[#050505] text-[#737373] py-16 px-6 md:px-12 border-t border-neutral-900 z-10 text-center font-sans">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center space-x-3 text-white/45">
            <Compass className="h-6 w-6 animate-spin-slow text-neutral-400" />
            <span className="font-serif tracking-widest text-sm uppercase text-[#e5e5e7]">THE IMMERSIVE JOURNEY</span>
          </div>

          <p className="font-serif text-sm italic text-[#a3a3a3] max-w-xl mx-auto leading-relaxed">
            "Chúng tôi đi không phải để đổi chỗ, mà để xua đi tất cả định kiến, tích lũy thêm những mảng ký ức mộc mạc rực rỡ lộng lẫy dưới vương quốc của tự nhiên mây trời."
          </p>

          <div className="flex justify-center space-x-6 text-[10px] text-stone-500 font-mono">
            <span>© 2026 CO-JOURNAL INC.</span>
            <span>•</span>
            <span>LIMITED EDITION PRINTING</span>
            <span>•</span>
            <span>LANDING PAGE DESIGN LAYOUT 3</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center space-x-1.5 text-xs text-stone-300 hover:text-white uppercase tracking-widest font-mono border border-neutral-800 px-4 py-2 rounded-full cursor-pointer transition-colors bg-transparent"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Trở về đỉnh trời</span>
          </button>
        </div>
      </footer>

      {/* REACTIVE MICRO FEEDBACK TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#171717]/95 text-stone-200 px-4 py-3 rounded-full shadow-2xl border border-white/10 flex items-center space-x-2.5 z-50 text-xs tracking-wider animate-bounce font-sans font-bold">
          <Sparkles className="h-4.5 w-4.5 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
