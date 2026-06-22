import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import FloatingScrapbook from "./components/FloatingScrapbook";
import CollabAndExportSection from "./components/CollabAndExportSection";
import ScrapbookDetailModal from "./components/ScrapbookDetailModal";
import AudioCassette from "./components/AudioCassette";
import ScrollCompassHUD from "./components/ScrollCompassHUD";
import { TimelineItem, AlbumPhoto, Collaborator } from "./types";
import { initialTimelineItems, initialAlbumPhotos, initialCollaborators } from "./data";
import { Film, Compass, ArrowUp, Sun, Moon } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

export default function App() {
  // App-level state for interactive content
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(initialTimelineItems);
  const [albumPhotos, setAlbumPhotos] = useState<AlbumPhoto[]>(initialAlbumPhotos);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators);
  
  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Modal tracking
  const [selectedMemory, setSelectedMemory] = useState<TimelineItem | null>(null);

  // Quick feedback toasts
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { language, setLanguage, t } = useLanguage();

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
          const itemTitle = (language === "en" && "title_en" in item) 
            ? (item as any).title_en 
            : item.title;
          triggerToast(
            language === "en"
              ? `Saved heart for memory "${itemTitle}"! ❤️`
              : `Đã lưu tim cho kỷ niệm "${itemTitle}"! ❤️`
          );
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
    <div className={`min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden relative transition-colors duration-700 ${isDarkTheme ? "dark-theme" : ""}`}>
      
      {/* Floating Top Mini Header (Pinned on scroll) */}
      <nav className="fixed top-0 inset-x-0 h-14 bg-[var(--theme-overlay)] backdrop-blur-md border-b border-[var(--theme-border)] flex items-center justify-between px-6 md:px-12 z-40 transition-colors duration-700">
        <button 
          onClick={() => scrollToSection("hero-section")} 
          className="flex items-center space-x-2 text-[var(--theme-text)] hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-none"
        >
          <Film className="h-4 w-4 text-stone-400" />
          <span className="font-serif tracking-widest text-[11px] uppercase font-light">L'IMMERSION</span>
        </button>

        {/* Section Fast links exactly matched to Section numbers of reference image */}
        <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12 text-[12px] font-mono tracking-widest uppercase text-[var(--theme-text)]">
          <button 
            onClick={() => scrollToSection("hero-section")} 
            className="group hover:opacity-70 text-[var(--theme-text)] cursor-pointer transition-all bg-transparent border-none pb-0.5 text-left flex items-center w-[120px] sm:w-[145px] md:w-[170px]"
          >
            <span className="mr-1.5 font-bold flex-shrink-0">01.</span>
            <span className="border-b border-transparent group-hover:border-[var(--theme-text)] pb-0.5 truncate transition-all duration-300">
              {language === "vi" ? "Lời Mở Đầu" : "Prologue"}
            </span>
          </button>
          <button 
            onClick={() => scrollToSection("timeline-section")} 
            className="group hover:opacity-70 text-[var(--theme-text)] cursor-pointer transition-all bg-transparent border-none pb-0.5 text-left flex items-center w-[150px] sm:w-[175px] md:w-[200px]"
          >
            <span className="mr-1.5 font-bold flex-shrink-0">02.</span>
            <span className="border-b border-transparent group-hover:border-[var(--theme-text)] pb-0.5 truncate transition-all duration-300">
              {language === "vi" ? "Lưu Bút Ký Ức" : "Memory Journal"}
            </span>
          </button>
          <button 
            onClick={() => scrollToSection("collab-section")} 
            className="group hover:opacity-70 text-[var(--theme-text)] cursor-pointer transition-all bg-transparent border-none pb-0.5 text-left flex items-center w-[180px] sm:w-[215px] md:w-[245px]"
          >
            <span className="mr-1.5 font-bold flex-shrink-0">03.</span>
            <span className="border-b border-transparent group-hover:border-[var(--theme-text)] pb-0.5 truncate transition-all duration-300">
              {language === "vi" ? "Đồng Hành & Kỷ Vật" : "Co-op & Souvenir"}
            </span>
          </button>
        </div>

        {/* Floating Quick Action & Theme / Language Switcher */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle Button */}
          <button
            onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
            className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider rounded-md border border-[var(--theme-border)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] text-[var(--theme-text)] transition-all active:scale-95 duration-300 cursor-pointer"
            title={language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}
            id="lang-toggle-btn"
          >
            {language === "vi" ? "EN" : "VI"}
          </button>

          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="p-1.5 rounded-md border border-[var(--theme-border)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] text-[var(--theme-text)] transition-all active:scale-95 duration-300 cursor-pointer flex items-center justify-center"
            title="Toggle Light/Dark Theme"
          >
            {isDarkTheme ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={() => scrollToSection("collab-section")}
            className="px-4 py-1.5 rounded-full bg-[var(--theme-border)] hover:bg-[var(--theme-text)] text-[var(--theme-text)] hover:text-[var(--theme-bg)] text-[12px] font-sans font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer hidden md:block border-none"
          >
            {t("nav.secureCopy")}
          </button>
        </div>
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
          isDarkTheme={isDarkTheme}
        />
      </main>

      {/* INTERACTIVE DETAIL SCRAPBOOK DIARY OVERLAY */}
      <ScrapbookDetailModal 
        item={selectedMemory} 
        onClose={() => setSelectedMemory(null)} 
        onLike={handleLikeMemory} 
      />

      {/* FOOTER SECTION: Standard, clean copyrights and creative creds */}
      <footer className="bg-[var(--theme-panel)] text-[var(--theme-text-muted)] py-16 px-6 md:px-12 border-t border-[var(--theme-border)] z-10 text-center font-sans transition-colors duration-700">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center space-x-3 text-[var(--theme-text-muted)]">
            <Compass className="h-6 w-6 animate-spin-slow opacity-60" />
            <span className="font-serif tracking-widest text-sm uppercase text-[var(--theme-text)]">{t("footer.title")}</span>
          </div>

          <p className="font-serif text-sm italic text-[var(--theme-text-muted)] max-w-xl mx-auto leading-relaxed">
            {t("footer.quote")}
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
            className="inline-flex items-center space-x-1.5 text-xs text-[var(--theme-text)] hover:opacity-70 uppercase tracking-widest font-mono border border-[var(--theme-border)] px-4 py-2 rounded-full cursor-pointer transition-colors bg-transparent"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>{t("footer.backToTop")}</span>
          </button>
        </div>
      </footer>

      {/* REACTIVE MICRO FEEDBACK TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#171717]/95 text-stone-200 px-4 py-3 rounded-full shadow-2xl border border-white/10 flex items-center space-x-2.5 z-50 text-xs tracking-wider animate-bounce font-sans font-bold">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Film Grain Noise Overlay */}
      <div className="film-grain" />

      {/* PHASE 1: Floating Vintage Cassette Player */}
      <AudioCassette />

      {/* PHASE 3: Scroll-driven Compass HUD */}
      <ScrollCompassHUD />
    </div>
  );
}
