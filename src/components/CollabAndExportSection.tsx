import React, { useState, useEffect } from "react";
import { AlbumPhoto, Collaborator, TourConfig } from "../types";
import { UserPlus, Heart, Printer, Loader2, Sparkles, Check, Quote, Plus, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CollabAndExportSectionProps {
  albumPhotos: AlbumPhoto[];
  setAlbumPhotos: React.Dispatch<React.SetStateAction<AlbumPhoto[]>>;
  collaborators: Collaborator[];
  setCollaborators: React.Dispatch<React.SetStateAction<Collaborator[]>>;
  isDarkTheme: boolean;
}

export default function CollabAndExportSection({
  albumPhotos,
  setAlbumPhotos,
  collaborators,
  setCollaborators,
  isDarkTheme
}: CollabAndExportSectionProps) {
  const { language, t } = useLanguage();

  // Config state for premium dark PDF compiler
  const [config, setConfig] = useState<TourConfig>({
    tripName: language === "en" ? "FREE JOURNEY" : "HÀNH TRÌNH TỰ DO",
    subtitle: language === "en" ? "Our slowest, brightest film" : "Thước phim chầm chậm rực rỡ nhất",
    dates: language === "en" ? "June, 2025" : "Tháng 6, 2025",
    narrative: language === "en" 
      ? "Youth is a free journey crossing meadows and deep forests, chasing the shapes of cloud and peak freedom..." 
      : "Tuổi trẻ là những chuyến đi tự do băng qua thảo nguyên và đại ngàn, tìm kiếm bóng hình của tự do mây núi...",
    themeStyle: "obsidian"
  });

  // Keep config in sync with language toggle if not modified by user
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      tripName: language === "en" ? "FREE JOURNEY" : "HÀNH TRÌNH TỰ DO",
      subtitle: language === "en" ? "Our slowest, brightest film" : "Thước phim chầm chậm rực rỡ nhất",
      dates: language === "en" ? "June, 2025" : "Tháng 6, 2025",
      narrative: language === "en" 
        ? "Youth is a free journey crossing meadows and deep forests, chasing the shapes of cloud and peak freedom..." 
        : "Tuổi trẻ là những chuyến đi tự do băng qua thảo nguyên và đại ngàn, tìm kiếm bóng hình của tự do mây núi...",
    }));
  }, [language]);

  // Collaborative real-time reactions
  const [globalLikes, setGlobalLikes] = useState(2471);
  const [hasLikedAlbum, setHasLikedAlbum] = useState(false);

  // Invite dynamic collaborator state
  const [inviteName, setInviteName] = useState("");
  const [showInviteInput, setShowInviteInput] = useState(false);

  // Picture adding states for Collab card
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [newPhotoAuthor, setNewPhotoAuthor] = useState(language === "en" ? "You" : "Bạn");
  const [selectedPresetImage, setSelectedPresetImage] = useState("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop");
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  // Printer anim state
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    if (showPrintModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPrintModal]);

  // Photo presets the users can choose to publish
  const travelPhotoPresets = [
    { name: language === "en" ? "Mountain Clouds" : "Săn Mây Đỉnh Núi", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=550&auto=format&fit=crop" },
    { name: language === "en" ? "Forest Sunset" : "Nắng Chiều Sườn Rừng", url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=550&auto=format&fit=crop" },
    { name: language === "en" ? "Night Campfire" : "Cắm Trại Đêm Bầu Trời", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=550&auto=format&fit=crop" },
    { name: language === "en" ? "Canyon Lake" : "Hồ Nước Sơn Cốc", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=550&auto=format&fit=crop" }
  ];

  const handleGlobalLike = () => {
    if (hasLikedAlbum) {
      setGlobalLikes(prev => prev - 1);
      setHasLikedAlbum(false);
    } else {
      setGlobalLikes(prev => prev + 1);
      setHasLikedAlbum(true);
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) return;
    const newCollab: Collaborator = {
      id: Date.now().toString(),
      name: inviteName.trim(),
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000)}?q=80&w=150&auto=format&fit=crop`,
      status: "Vừa tham gia album"
    };
    if (language === "en") {
      (newCollab as any).status_en = "Just joined the album";
    }
    setCollaborators(prev => [...prev, newCollab]);
    setInviteName("");
    setShowInviteInput(false);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim()) return;
    const newPhoto: AlbumPhoto = {
      id: Date.now().toString(),
      title: newPhotoTitle.trim(),
      caption: newPhotoCaption.trim() || (language === "en" ? "A memorable romantic moment." : "Khoảnh khắc lãng mạn đáng nhớ."),
      author: newPhotoAuthor.trim() || (language === "en" ? "Guest" : "Khách mời"),
      imageUrl: selectedPresetImage,
      likes: 1,
      date: language === "en" ? "Today" : "Hôm nay"
    };
    if (language === "en") {
      (newPhoto as any).title_en = newPhotoTitle.trim();
      (newPhoto as any).caption_en = newPhotoCaption.trim() || "A memorable romantic moment.";
      (newPhoto as any).date_en = "Today";
    }
    setAlbumPhotos(prev => [newPhoto, ...prev]);
    setNewPhotoTitle("");
    setNewPhotoCaption("");
    setShowAddPhoto(false);
    setGlobalLikes(prev => prev + 10);
  };

  const triggerExportPDF = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setShowPrintModal(true);
    }, 2400); // Simulated delay for printing polaroid sound/motion
  };

  const confirmPhysicalPrint = () => {
    window.print();
  };

  // Styles based on theme configurations matching Sophisticated Dark
  const getThemeColors = () => {
    switch (config.themeStyle) {
      case "amber":
        return isDarkTheme
          ? { bg: "bg-[#18181b] transition-colors duration-700", text: "text-amber-200 transition-colors duration-700", border: "border-amber-400/25 transition-colors duration-700", hex: "#18181b" }
          : { bg: "bg-[#faf6ee] transition-colors duration-700", text: "text-[#5c4033] transition-colors duration-700", border: "border-[#5c4033]/25 transition-colors duration-700", hex: "#faf6ee" };
      case "quartz":
        return isDarkTheme
          ? { bg: "bg-[#161616] transition-colors duration-700", text: "text-neutral-200 transition-colors duration-700", border: "border-neutral-700/50 transition-colors duration-700", hex: "#161616" }
          : { bg: "bg-[#f4f6f7] transition-colors duration-700", text: "text-[#2c3e50] transition-colors duration-700", border: "border-[#2c3e50]/25 transition-colors duration-700", hex: "#f4f6f7" };
      case "obsidian":
      default:
        return { bg: "bg-[var(--theme-bg)] transition-colors duration-700", text: "text-[var(--theme-text)] transition-colors duration-700", border: "border-[var(--theme-border)] transition-colors duration-700", hex: "var(--theme-bg)" };
    }
  };

  const themeColors = getThemeColors();

  return (
    <section id="collab-section" className={`relative w-full py-24 px-4 md:px-12 bg-[var(--theme-bg)] transition-colors duration-700 text-[var(--theme-text-muted)] transition-colors duration-700 font-sans ${showPrintModal ? "z-50" : "z-10"}`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Segment lines running in margins */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT SIDE: Collaborative elements & Config */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* A. COLLABORATIVE ALBUM COMPONENT */}
          <div className="bg-[var(--theme-panel)] transition-colors duration-700 p-6 sm:p-8 rounded-lg shadow-2xl border border-[var(--theme-border)] transition-colors duration-700 relative overflow-hidden">
            {/* Ambient desk lamp spotlight glow */}
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[350px] h-[350px] bg-amber-500/[0.04] rounded-full blur-[80px] pointer-events-none" />
            <span className="absolute top-3.5 right-4 text-[9px] font-mono tracking-widest text-[#737373] font-light">ALBUM PLATFORM</span>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--theme-border)] transition-colors duration-700">
              <div>
                <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-[var(--theme-text-muted)] transition-colors duration-700 block">{t("collab.sec3")}</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--theme-text)] transition-colors duration-700 tracking-tight mt-1">
                  {t("collab.title")}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] transition-colors duration-700 mt-1 leading-relaxed max-w-lg">
                  {t("collab.desc")}
                </p>
              </div>

              {/* Real-time love react counter exactly matching Section 3 image badge */}
              <button
                onClick={handleGlobalLike}
                id="global-album-like-btn"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 shadow-xl active:scale-95 ${
                  hasLikedAlbum 
                    ? "bg-red-500/10 text-red-500 border border-red-500/30 scale-105" 
                    : "bg-[var(--theme-panel)] hover:bg-[var(--theme-border)] text-red-500 border border-[var(--theme-border)] transition-colors duration-700"
                }`}
                title={t("collab.likeTooltip")}
              >
                <Heart className={`h-4 w-4 ${hasLikedAlbum ? "fill-red-500 text-red-500" : "text-red-400 animate-pulse"}`} />
                <span className="font-mono text-xs font-bold text-[var(--theme-text-muted)] transition-colors duration-700">{(globalLikes / 1000).toFixed(1)}K</span>
              </button>
            </div>

            {/* Traveler Avatar Stack and Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--theme-panel)] transition-colors duration-700 p-4 rounded-lg border border-[var(--theme-border)] transition-colors duration-700 mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2.5 overflow-hidden items-center">
                  {collaborators.map((collab, index) => {
                    const avatarRot = index % 2 === 0 ? "rotate-[-4deg]" : "rotate-[3deg]";
                    return (
                      <div key={collab.id} className={`relative group/avatar transition-all duration-300 hover:scale-110 hover:z-20 hover:rotate-0 ${avatarRot}`}>
                        <img
                          className="inline-block h-10 w-10 rounded-md ring-2 ring-[var(--theme-bg)] object-cover shadow-md"
                          src={collab.avatarUrl}
                          alt={collab.name}
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1.5 ring-neutral-950 animate-pulse" />
                        
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-[var(--theme-text)] transition-colors duration-700 bg-[var(--theme-bg)] rounded-sm whitespace-nowrap opacity-0 group-hover/avatar:opacity-100 transition-opacity z-30 shadow-md">
                          {collab.name}
                        </span>
                      </div>
                    );
                  })}
                  {/* Plus button representation */}
                  <button
                    onClick={() => setShowInviteInput(!showInviteInput)}
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-dark-text/5 hover:bg-dark-text text-[var(--theme-text-muted)] border border-dashed border-[var(--theme-border)] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ml-2"
                    title={language === "en" ? "Invite companions" : "Mời thêm bạn đồng hành"}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-[var(--theme-text-muted)] transition-colors duration-700">
                    {t("collab.activeCollab")} ({collaborators.length + 1} {language === "en" ? "people" : "người"})
                  </span>
                  <p className="text-[10px] text-[var(--theme-text-muted)] transition-colors duration-700 font-mono italic">
                    {collaborators[collaborators.length - 1]?.name || "Companion"} {language === "en" ? (collaborators[collaborators.length - 1] as any)?.status_en || "joined" : collaborators[collaborators.length - 1]?.status || "đã tham gia"}...
                  </p>
                </div>
              </div>

              {/* Add dynamic photos switch */}
              <button
                onClick={() => setShowAddPhoto(!showAddPhoto)}
                className="px-4 py-2 bg-[var(--theme-bg)] hover:bg-[var(--theme-border)] text-[var(--theme-text)] transition-colors duration-700 text-xs font-bold rounded-full cursor-pointer transition-all hover:scale-105 flex items-center space-x-1.5 shadow-md border border-[var(--theme-border)]"
              >
                <span>{showAddPhoto ? t("collab.hideUploadForm") : t("collab.showUploadForm")}</span>
                <span className="bg-[var(--theme-text)] text-[var(--theme-bg)] font-extrabold text-[8px] px-1.5 py-0.5 rounded-full inline-block">LIVE</span>
              </button>
            </div>

            {/* Invite Form Overlay Inside Container */}
            {showInviteInput && (
              <form onSubmit={handleInvite} className="bg-[var(--theme-panel)] transition-colors duration-700 p-4 rounded-lg border border-[var(--theme-border)] transition-colors duration-700 mb-6 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={language === "en" ? "Enter the name of the friend you want to add..." : "Nhập tên người bạn muốn thêm..."}
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="flex-1 text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-[var(--theme-text)] hover:opacity-80 text-[var(--theme-bg)] transition-colors duration-700 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer active:scale-95"
                >
                  {language === "en" ? "Confirm" : "Xác nhận"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowInviteInput(false)}
                  className="text-[var(--theme-text-muted)] transition-colors duration-700 hover:text-[var(--theme-text)] transition-colors duration-700 text-xs px-2 cursor-pointer active:scale-95"
                >
                  {language === "en" ? "Cancel" : "Hủy"}
                </button>
              </form>
            )}

            {/* Add Photo Form */}
            {showAddPhoto && (
              <form onSubmit={handleAddPhoto} className="bg-[var(--theme-panel)] transition-colors duration-700 p-5 rounded-lg border border-[var(--theme-border)] transition-colors duration-700 mb-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--theme-border)] transition-colors duration-700 pb-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--theme-text-muted)] transition-colors duration-700">{language === "en" ? "Upload a memory photo" : "Tải lên tấm ảnh kỷ niệm"}</h4>
                  <button type="button" onClick={() => setShowAddPhoto(false)} className="text-xs text-[var(--theme-text-muted)] transition-colors duration-700 hover:text-[var(--theme-text-muted)] transition-colors duration-700 cursor-pointer">{language === "en" ? "Close" : "Đóng"}</button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-1">{language === "en" ? "Title" : "Tên Tác Phẩm"}</label>
                    <input
                      type="text"
                      placeholder={language === "en" ? "e.g. Misty rendezvous" : "e.g. Điểm hẹn sương mờ"}
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      className="w-full text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-1">{language === "en" ? "Caption (Handwritten note)" : "Chú thích (Ghi chú tay)"}</label>
                    <input
                      type="text"
                      placeholder={language === "en" ? "e.g. The sun started to rise warming..." : "e.g. Lúc này mặt trời bắt đầu lên ấm áp vô cùng..."}
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      className="w-full text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-2">{language === "en" ? "Select Landscape Photo" : "Chọn Góc Ảnh Phong Cảnh"}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {travelPhotoPresets.map(preset => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setSelectedPresetImage(preset.url)}
                          className={`relative aspect-square rounded overflow-hidden border-2 cursor-pointer transition-all ${
                            selectedPresetImage === preset.url ? "border-white ring-2 ring-white/10" : "border-transparent opacity-60"
                          }`}
                        >
                          <img src={preset.url} referrerPolicy="no-referrer" alt={preset.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-[var(--theme-bg)] transition-colors duration-700/80 text-[8px] text-[var(--theme-text-muted)] transition-colors duration-700 py-0.5 truncate text-center">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[var(--theme-bg)] hover:bg-[var(--theme-panel)] text-[var(--theme-text)] border border-[var(--theme-border)] transition-colors duration-700 text-xs font-bold rounded-lg cursor-pointer transition-all shadow-md active:scale-[0.98] active:translate-y-[0.5px]"
                >
                  {t("collab.formConfirm")}
                </button>
              </form>
            )}

            {/* List of active collaborative live feed photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {albumPhotos.map((photo) => {
                const photoTitle = language === "en" && "title_en" in photo ? (photo as any).title_en : photo.title;
                const photoCaption = language === "en" && "caption_en" in photo ? (photo as any).caption_en : photo.caption;

                return (
                  <div key={photo.id} className="bg-[var(--theme-panel)] transition-colors duration-700 p-3.5 rounded-lg border border-[var(--theme-border)] transition-colors duration-700 shadow-sm relative group/card hover:scale-[1.01] transition-transform">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--theme-bg)] transition-colors duration-700 mb-3 border border-[var(--theme-border)] transition-colors duration-700 rounded relative">
                      <img src={photo.imageUrl} alt={photoTitle} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      {/* FIXED AUTHOR BADGE COLOR: Changed from hardcoded white text to theme-aware var(--theme-text) */}
                      <span className="absolute bottom-2 left-2 bg-[var(--theme-bg)] transition-colors duration-700/80 text-[var(--theme-text)] font-mono text-[8px] px-2 py-0.5 rounded uppercase">
                        {t("collab.authorLabel")}{photo.author}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-light text-[var(--theme-text)] transition-colors duration-700">{photoTitle}</h4>
                    <p className="font-hand text-lg text-[var(--theme-text-muted)] transition-colors duration-700 leading-none mt-1">"{photoCaption}"</p>
                    
                    {/* Photo likes indicator inside grid cards */}
                    <div className="mt-3 pt-2 border-t border-[var(--theme-border)] transition-colors duration-700 flex justify-between items-center text-[9px] text-[#737373]">
                      <span>{language === "en" ? "Shared Feed" : "Album Chung"}</span>
                      <button
                        onClick={() => {
                          setAlbumPhotos(prev => prev.map(p => p.id === photo.id ? {...p, likes: p.likes + 1} : p));
                          setGlobalLikes(p => p + 1);
                        }}
                        className="flex items-center space-x-1.5 hover:text-[var(--theme-text)] transition-colors duration-700 font-bold cursor-pointer bg-transparent border-none"
                      >
                        <Heart className="h-3 w-3 fill-action-red text-action-red" />
                        <span>{photo.likes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B. DETAILED CONFIGURATION FOR COMPILER */}
          <div className="bg-[var(--theme-panel)] transition-colors duration-700 p-6 sm:p-8 rounded-lg shadow-2xl border border-[var(--theme-border)] transition-colors duration-700 space-y-6 relative overflow-hidden">
            {/* Ambient desk lamp spotlight glow */}
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] bg-amber-500/[0.03] rounded-full blur-[70px] pointer-events-none" />
            <div className="flex items-center space-x-3 pb-3 border-b border-[var(--theme-border)] transition-colors duration-700 z-10 relative">
              <span className="h-8 w-8 rounded-full bg-dark-text/5 text-[var(--theme-text)] transition-colors duration-700 flex items-center justify-center font-bold text-sm border border-[var(--theme-border)] transition-colors duration-700">03</span>
              <div>
                <h3 className="font-serif text-lg text-[var(--theme-text)] transition-colors duration-700 font-normal">
                  {language === "en" ? "Configure Your Souvenir Book" : "Cấu Hình Cuốn Sổ Lưu Niệm"}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)] transition-colors duration-700">
                  {language === "en" ? "Customize layout settings of the output ready-to-print compilation ledger." : "Tùy chỉnh cấu hình xuất bản cho cuốn sổ tay ký ức vật lý."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-1">{t("collab.tripName")}</label>
                <input
                  type="text"
                  value={config.tripName}
                  onChange={(e) => setConfig({ ...config, tripName: e.target.value })}
                  className="w-full text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-1">{t("collab.subTitle")}</label>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                  className="w-full text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-1">{t("collab.dates")}</label>
                <input
                  type="text"
                  value={config.dates}
                  onChange={(e) => setConfig({ ...config, dates: e.target.value })}
                  className="w-full text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-1">{t("collab.selectTheme")}</label>
                <select
                  value={config.themeStyle}
                  onChange={(e) => setConfig({ ...config, themeStyle: e.target.value as any })}
                  className="w-full text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 focus:outline-none"
                >
                  <option value="obsidian">Obsidian Matte Black</option>
                  <option value="amber">{language === "en" ? "Warm Bronze Twilight" : "Vàng Đồng Ấm Áp"}</option>
                  <option value="quartz">{language === "en" ? "Frosted Crystal Quartz" : "Thạch Anh Trong Suốt"}</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[9px] uppercase font-bold text-[#a3a3a3] mb-1">{t("collab.narrative")}</label>
                <textarea
                  value={config.narrative}
                  onChange={(e) => setConfig({ ...config, narrative: e.target.value })}
                  rows={2}
                  className="w-full text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Features checkmarks */}
            <div className="flex flex-wrap items-center justify-between p-3.5 bg-[var(--theme-bg)] transition-colors duration-700 rounded-lg border border-[var(--theme-border)] transition-colors duration-700 gap-3">
              <div className="flex items-center space-x-1.5 text-xs text-[var(--theme-text-muted)] transition-colors duration-700">
                <div className="p-1 bg-dark-text/5 rounded-full text-[var(--theme-text)] transition-colors duration-700">
                  <Check className="h-3 w-3" />
                </div>
                <span>{language === "en" ? "Premium Quality" : "Chất Lượng Cao"}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-[var(--theme-text-muted)] transition-colors duration-700">
                <div className="p-1 bg-dark-text/5 rounded-full text-[var(--theme-text)] transition-colors duration-700">
                  <Check className="h-3 w-3" />
                </div>
                <span>{language === "en" ? "Print Ready" : "Sẵn Sàng In Ấn"}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-[var(--theme-text-muted)] transition-colors duration-700">
                <div className="p-1 bg-dark-text/5 rounded-full text-[var(--theme-text)] transition-colors duration-700">
                  <Check className="h-3 w-3" />
                </div>
                <span>{language === "en" ? "Easy to Share" : "Chia Sẻ Dễ Dàng"}</span>
              </div>
            </div>

            {/* EXPORT TO PDF CALL TO ACTION (CTA) */}
            <button
              onClick={triggerExportPDF}
              id="compiler-print-btn"
              disabled={isPrinting}
              className="w-full py-4 bg-[var(--theme-bg)] hover:bg-[var(--theme-border)] border border-[var(--theme-border)] disabled:opacity-50 text-[var(--theme-text)] transition-all font-semibold text-xs uppercase tracking-widest rounded-full cursor-pointer shadow-lg flex items-center justify-center space-x-3.5 active:scale-[0.98] active:translate-y-[0.5px]"
            >
              {isPrinting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[var(--theme-text)] transition-colors duration-700" />
                  <span className="tracking-wider">{language === "en" ? "COMPILING SOUVENIR BOOK..." : "ĐANG BIÊN TẬP SÁCH ẢNH..."}</span>
                </>
              ) : (
                <>
                  <Printer className="h-4 w-4 text-[var(--theme-text)] transition-colors duration-700" />
                  <span className="tracking-widest">{t("collab.exportBtn")}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive virtual polaroid printer */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          
          {/* Printer Device mockup body */}
          <div className="bg-[var(--theme-panel)] transition-colors duration-700 p-6 rounded-xl shadow-2xl border border-[var(--theme-border)] transition-colors duration-700 relative overflow-hidden flex flex-col items-center">
            
            <div className="absolute top-2 left-6 z-20 pointer-events-none transform -rotate-12 hidden xs:block">
              <span className="font-hand text-xl text-[var(--theme-text-muted)] transition-colors duration-700 leading-none">
                {language === "en" ? "Memories together." : "Ký ức chung bước."}
              </span>
            </div>

            {/* Custom status dial light */}
            <div className="w-full flex justify-between items-center border-b border-[var(--theme-border)] transition-colors duration-700 pb-3 mb-6">
              <div className="flex space-x-1.5 items-center">
                <span className={`block h-2 w-2 rounded-full ring-2 ring-neutral-900 ${isPrinting ? "bg-amber-400 animate-ping" : "bg-neutral-500"}`} />
                <span className="text-[9px] uppercase font-mono tracking-widest text-[var(--theme-text-muted)] transition-colors duration-700 font-extrabold">MEMO-STATION N°03</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-[var(--theme-text-muted)] transition-colors duration-700 uppercase">PRO PHYSICAL FEED</span>
            </div>

            {/* Virtual Device Slot where sheet prints out */}
            <div className="relative w-full aspect-[4/3] bg-[var(--theme-bg)] transition-colors duration-700 rounded border border-[var(--theme-border)] transition-colors duration-700 overflow-hidden flex flex-col justify-end p-1">
              
              {isPrinting && (
                <div className="absolute top-0 inset-x-0 h-1 bg-dark-text shadow-[0_0_8px_white] z-30 animate-bounce duration-500" />
              )}

              {/* Printed Album Sheet sliding upwards */}
              <div
                className={`w-[93%] mx-auto ${themeColors.bg} ${themeColors.text} p-4 rounded border ${themeColors.border} transition-all duration-[1500ms] ease-out origin-bottom transform ${
                  isPrinting 
                    ? "translate-y-[40%] scale-95 opacity-55 animate-pulse" 
                    : "translate-y-2 scale-100 opacity-100 hover:scale-[1.01]"
                }`}
                style={{ minHeight: "220px" }}
              >
                <div className={`flex justify-between items-center border-b ${themeColors.border} pb-2 mb-3`}>
                  <span className="text-[8px] font-mono tracking-widest font-light uppercase opacity-80">SOUVENIR MANIFESTO</span>
                  <span className="text-[7.5px] font-mono tracking-wider font-light opacity-70 uppercase">{config.dates}</span>
                </div>

                <div className="space-y-2">
                  <span className="font-serif text-[10px] italic tracking-widest opacity-80 block">OUR PATH:</span>
                  <h4 className="font-serif text-sm font-light tracking-tight leading-none uppercase font-semibold">
                    {config.tripName || "Tour Book title"}
                  </h4>
                  <p className="font-hand text-lg opacity-90 leading-none mb-1">"{config.subtitle}"</p>
                  
                  {/* Small postcard photo matching live feed */}
                  <div className={`w-full h-18 overflow-hidden rounded border ${themeColors.border} ${themeColors.bg}`}>
                    <img 
                      src={selectedPresetImage} 
                      referrerPolicy="no-referrer" 
                      alt="Current book preview" 
                      className="w-full h-full object-cover grayscale-[10%]" 
                    />
                  </div>

                  {/* Print micro excerpts */}
                  <p className="text-[10px] italic leading-relaxed opacity-80 line-clamp-2 select-text font-serif">
                    {config.narrative || (language === "en" ? "A rustic journey preserving our brightest memories." : "Hành trình mộc mạc lưu lại những ký ức rực rỡ nhất.")}
                  </p>
                </div>
              </div>

              {/* Printer Mouth physical frame bar */}
              <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-stone-900 to-[#121212] z-10 border-t border-[var(--theme-border)] transition-colors duration-700 flex items-center justify-center">
                <span className="block h-0.5 w-2/3 bg-[var(--theme-bg)] transition-colors duration-700 rounded-full" />
              </div>
            </div>

            {/* Virtual physical eject button */}
            <button
              onClick={triggerExportPDF}
              className="mt-6 px-5 py-2.5 bg-[var(--theme-bg)] hover:bg-[var(--theme-border)] text-[var(--theme-text)] transition-colors duration-700 rounded-full border border-[var(--theme-border)] transition-colors duration-700 text-[10px] font-mono tracking-widest shadow-md transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
            >
              <Printer className="h-3.5 w-3.5 text-[var(--theme-text)]" />
              <span>{t("collab.ejectCard")}</span>
            </button>
          </div>

          {/* Quick info panel */}
          <div className="bg-[var(--theme-panel)] transition-colors duration-700 p-5 rounded border border-[var(--theme-border)] transition-colors duration-700 text-xs text-[var(--theme-text-muted)] transition-colors duration-700 leading-relaxed text-justify">
            <h4 className="font-bold text-[var(--theme-text-muted)] transition-colors duration-700 mb-1.5 uppercase font-mono tracking-wider text-[10px]">
              {language === "en" ? "Preserve Memories" : "Lưu Tri Kỷ Niệm"}
            </h4>
            {language === "en"
              ? "The export feature compiles all photos in the shared album uploaded by all travelers, creating a complete PDF file for souvenir preservation."
              : "Tính năng export sẽ tổng hợp toàn bộ ảnh có trong album chung được tải lên từ tất cả đồng hành lữ khách, tạo ra file PDF hoàn thiện để lưu trữ làm quà lưu niệm."
            }
          </div>
        </div>
      </div>

      {/* DETAILED PDF STORIES PRINT PREVIEW BOOK MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-[var(--theme-bg)] transition-colors duration-700/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-none">
          <div className="my-8 w-full max-w-4xl bg-[var(--theme-panel)] transition-colors duration-700 text-[var(--theme-text-muted)] transition-colors duration-700 rounded-lg shadow-2xl overflow-hidden border border-[var(--theme-border)] transition-colors duration-700 z-50">
            
            {/* Modal action bar */}
            <div className="bg-[var(--theme-bg)] transition-colors duration-700 text-[var(--theme-text-muted)] transition-colors duration-700 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[var(--theme-border)] transition-colors duration-700">
              <div className="flex items-center space-x-2.5">
                <Printer className="h-4 w-4 text-[var(--theme-text-muted)] transition-colors duration-700" />
                <span className="font-serif tracking-widest text-xs uppercase">
                  {language === "en" ? "PREVIEW PRINT-READY ALBUM" : "XEM TRƯỚC BẢN ALBUM SẴN SÀNG IN"}
                </span>
              </div>
              <div className="flex items-center space-x-3.5">
                <button
                  onClick={confirmPhysicalPrint}
                  id="modal-confirm-print-btn"
                  className="px-4 py-2 bg-[var(--theme-bg)] hover:bg-[var(--theme-panel)] text-[var(--theme-text)] border border-[var(--theme-border)] transition-colors duration-700 font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-md"
                >
                  {t("collab.confirmPrint")}
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  id="modal-close-print-btn"
                  className="text-[var(--theme-text-muted)] transition-colors duration-700 hover:text-[var(--theme-text)] transition-colors duration-700 p-2 cursor-pointer rounded-full hover:bg-dark-text/10 transition-colors flex items-center justify-center"
                  title="Close Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Printable Album Sheet Container */}
            <div className="p-8 md:p-12 font-serif text-[var(--theme-text-muted)] transition-colors duration-700 bg-[var(--theme-panel)] transition-colors duration-700 print:p-0" id="printable-area">
              
              {/* Outer boundary ledger design */}
              <div className="border border-[var(--theme-border)] transition-colors duration-700 p-6 md:p-10 relative bg-[var(--theme-bg)] transition-colors duration-700">
                
                {/* Cover Header */}
                <div className="text-center pb-8 border-b border-[var(--theme-border)] transition-colors duration-700 mb-8">
                  <div className="text-[9px] tracking-[0.45em] uppercase font-mono text-stone-550 font-extrabold mb-3">
                    {language === "en" ? "TRAVEL MEMORIES JOURNAL" : "SỔ LƯU NIỆM DU HÀNH"}
                  </div>
                  <h1 className="text-3xl md:text-[var(--theme-text)] transition-colors duration-700xl font-light uppercase tracking-tight text-[var(--theme-text)] transition-colors duration-700 mb-2 leading-none">
                    {config.tripName}
                  </h1>
                  <p className="font-hand text-3xl text-[var(--theme-text-muted)] transition-colors duration-700 leading-none">"{config.subtitle}"</p>
                  
                  <div className="flex justify-center items-center space-x-4 mt-6 text-xs text-stone-455 tracking-wider font-mono uppercase">
                    <span>{language === "en" ? "DATES" : "KHOẢNG THỜI GIAN"}: {config.dates}</span>
                    <span>•</span>
                    <span>{language === "en" ? "CREATORS" : "NGƯỜI TẠO"}: {language === "en" ? "You" : "Bạn"} & {collaborators.map(c => c.name).join(", ")}</span>
                  </div>
                </div>

                {/* Featured Scrapbook layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
                  
                  <div>
                    <h3 className="text-[9px] uppercase tracking-widest font-mono text-[var(--theme-text-muted)] transition-colors duration-700 font-bold mb-3">NARRATIVE REPORT</h3>
                    <p className="text-[var(--theme-text-muted)] transition-colors duration-700 leading-relaxed text-justify text-sm md:text-base mb-6 indent-6">
                      {config.narrative}
                    </p>

                    <div className="bg-[var(--theme-panel)] transition-colors duration-700 p-4 border border-[var(--theme-border)] transition-colors duration-700 rounded italic text-xs text-[var(--theme-text-muted)] transition-colors duration-700 leading-relaxed font-sans relative">
                      <Quote className="h-5 w-5 text-stone-600 absolute -top-2 -left-2" />
                      {language === "en" 
                        ? "\"The simple sceneries passing along the road left bright smiles of friends, echoing songs on the hillsides. We have etched a youth journey that never fades.\""
                        : "\"Những cảnh sắc trôi qua mộc mạc bên đường để lại nụ cười rạng rỡ của bạn bè, tiếng hát ngâm vang giáp đồi dốc. Chúng tôi đã khắc ghi một hành trình tuổi trẻ không phai nhòa.\""
                      }
                    </div>
                  </div>

                  {/* Primary customized travel focus image */}
                  <div className="bg-[var(--theme-panel)] transition-colors duration-700 p-4 rounded border border-[var(--theme-border)] transition-colors duration-700 shadow-md transform rotate-1">
                    <img
                      src={selectedPresetImage}
                      alt="Printed focus scenery"
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[4/3] object-cover border border-[var(--theme-border)] transition-colors duration-700"
                    />
                    <p className="font-hand text-xl text-center text-[var(--theme-text-muted)] transition-colors duration-700 mt-2">
                       {config.tripName} - {config.dates}
                    </p>
                  </div>
                </div>

                {/* Index of included photographic stories */}
                <div className="border-t border-dashed border-[var(--theme-border)] transition-colors duration-700 pt-6">
                  <h3 className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] transition-colors duration-700 font-bold mb-4">
                    {language === "en" ? "JOURNEY MEMORIES INDEX" : "MỤC LỤC KÝ ỨC CHUYẾN ĐI"} ({albumPhotos.length} {language === "en" ? "shared photos" : "ảnh chung"})
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {albumPhotos.map((photo, i) => {
                      const photoTitle = language === "en" && "title_en" in photo ? (photo as any).title_en : photo.title;

                      return (
                        <div key={photo.id} className="text-xs font-mono">
                          <span className="text-stone-450 mr-1">[0{i+1}]</span>
                          <span className="font-normal text-[var(--theme-text-muted)] transition-colors duration-700 uppercase">{photoTitle}</span>
                          <p className="text-[10px] text-[var(--theme-text-muted)] transition-colors duration-700 italic mt-0.5">{t("collab.authorLabel")}{photo.author}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 pt-4 border-t border-[var(--theme-border)] transition-colors duration-700 flex justify-between items-center text-[9px] text-[var(--theme-text-muted)] transition-colors duration-700 font-mono">
                  <span>PRINT CODE CO-SOUVENIR N°1592</span>
                  <span>THE IMMERSIVE TRAVEL COMPANY • 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
