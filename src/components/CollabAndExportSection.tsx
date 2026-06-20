import React, { useState } from "react";
import { AlbumPhoto, Collaborator, TourConfig } from "../types";
import { UserPlus, Heart, Printer, Loader2, Sparkles, Check, Share2, Quote, Plus, Image } from "lucide-react";

interface CollabAndExportSectionProps {
  albumPhotos: AlbumPhoto[];
  setAlbumPhotos: React.Dispatch<React.SetStateAction<AlbumPhoto[]>>;
  collaborators: Collaborator[];
  setCollaborators: React.Dispatch<React.SetStateAction<Collaborator[]>>;
}

export default function CollabAndExportSection({
  albumPhotos,
  setAlbumPhotos,
  collaborators,
  setCollaborators
}: CollabAndExportSectionProps) {
  // Config state for premium dark PDF compiler
  const [config, setConfig] = useState<TourConfig>({
    tripName: "HÀNH TRÌNH TỰ DO",
    subtitle: "Thước phim chầm chậm rực rỡ nhất",
    dates: "Tháng 6, 2025",
    narrative: "Tuổi trẻ là những chuyến đi tự do băng qua thảo nguyên và đại ngàn, tìm kiếm bóng hình của tự do mây núi...",
    themeStyle: "obsidian"
  });

  // Collaborative real-time reactions
  const [globalLikes, setGlobalLikes] = useState(2471);
  const [hasLikedAlbum, setHasLikedAlbum] = useState(false);

  // Invite dynamic collaborator state
  const [inviteName, setInviteName] = useState("");
  const [showInviteInput, setShowInviteInput] = useState(false);

  // Picture adding states for Collab card
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [newPhotoAuthor, setNewPhotoAuthor] = useState("Bạn");
  const [selectedPresetImage, setSelectedPresetImage] = useState("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop");
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  // Printer anim state
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Photo presets the users can choose to publish
  const travelPhotoPresets = [
    { name: "Săn Mây Đỉnh Núi", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=550&auto=format&fit=crop" },
    { name: "Nắng Chiều Sườn Rừng", url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=550&auto=format&fit=crop" },
    { name: "Cắm Trại Đêm Bầu Trời", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=550&auto=format&fit=crop" },
    { name: "Hồ Nước Sơn Cốc", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=550&auto=format&fit=crop" }
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
      caption: newPhotoCaption.trim() || "Khoảnh khắc lãng mạn đáng nhớ.",
      author: newPhotoAuthor.trim() || "Khách mời",
      imageUrl: selectedPresetImage,
      likes: 1,
      date: "Hôm nay"
    };
    setAlbumPhotos(prev => [newPhoto, ...prev]);
    setNewPhotoTitle("");
    setNewPhotoCaption("");
    setShowAddPhoto(false);
    // trigger dynamic liking reactions
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
        return { bg: "bg-[#18181b]", text: "text-amber-200", border: "border-amber-400/25", hex: "#18181b" };
      case "quartz":
        return { bg: "bg-[#161616]", text: "text-neutral-200", border: "border-neutral-700/50", hex: "#161616" };
      case "obsidian":
      default:
        return { bg: "bg-[#0b0b0c]", text: "text-stone-200", border: "border-white/5", hex: "#0b0b0c" };
    }
  };

  const themeColors = getThemeColors();

  return (
    <section id="collab-section" className="relative w-full py-24 px-4 md:px-12 bg-[#090909] text-stone-200 z-10 font-sans">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Segment lines running in margins */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT SIDE: Collaborative elements & Config */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* A. COLLABORATIVE ALBUM COMPONENT */}
          <div className="bg-[#121212]/95 p-6 sm:p-8 rounded-lg shadow-2xl border border-white/5 relative">
            <span className="absolute top-3.5 right-4 text-[9px] font-mono tracking-widest text-[#737373] font-light">ALBUM PLATFORM</span>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
              <div>
                <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-stone-500 block">SECTION 3 // COLLABORATIVE JOURNAL</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
                  Collaborative Album
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed max-w-lg">
                  Share moments, get real-time reactions, and build your digital archive together.
                </p>
              </div>

              {/* Real-time love react counter exactly matching Section 3 image badge */}
              <button
                onClick={handleGlobalLike}
                id="global-album-like-btn"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 shadow-xl ${
                  hasLikedAlbum 
                    ? "bg-red-500 text-white hover:bg-red-600 scale-105" 
                    : "bg-white/5 hover:bg-white/10 text-red-500 border border-white/10"
                }`}
                title="Bấm tim cho chuyến xe"
              >
                <Heart className={`h-4 w-4 ${hasLikedAlbum ? "fill-white text-white" : "fill-red-500 text-red-500 animate-pulse"}`} />
                <span className="font-mono text-xs font-bold text-stone-200">{(globalLikes / 1000).toFixed(1)}K</span>
              </button>
            </div>

            {/* Traveler Avatar Stack and Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#181818]/60 p-4 rounded-lg border border-white/5 mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3.5 overflow-hidden">
                  {collaborators.map((collab) => (
                    <div key={collab.id} className="relative group/avatar">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-neutral-900 object-cover"
                        src={collab.avatarUrl}
                        alt={collab.name}
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-stone-400 ring-1.5 ring-neutral-950 animate-pulse" />
                      
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-black/80 rounded-sm whitespace-nowrap opacity-0 group-hover/avatar:opacity-100 transition-opacity z-30">
                        {collab.name}
                      </span>
                    </div>
                  ))}
                  {/* Plus button representation */}
                  <button
                    onClick={() => setShowInviteInput(!showInviteInput)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white text-stone-400 hover:text-black border border-dashed border-white/10 transition-colors cursor-pointer"
                    title="Mời thêm bạn đồng hành"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-stone-300">Đồng hành ({collaborators.length + 1} người)</span>
                  <p className="text-[10px] text-stone-500 font-mono italic">
                    {collaborators[0]?.name || "Bạn bè"} đang bổ sung ảnh...
                  </p>
                </div>
              </div>

              {/* Add dynamic photos switch */}
              <button
                onClick={() => setShowAddPhoto(!showAddPhoto)}
                className="px-4 py-2 bg-neutral-800 hover:bg-white text-stone-200 hover:text-black text-xs font-bold rounded-full cursor-pointer transition-all hover:scale-105 flex items-center space-x-1.5 shadow-md border border-white/5"
              >
                <span>Thêm Ảnh Chung</span>
                <span className="bg-[#262626] text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-full inline-block">LIVE</span>
              </button>
            </div>

            {/* Invite Form Overlay Inside Container */}
            {showInviteInput && (
              <form onSubmit={handleInvite} className="bg-[#181818] p-4 rounded-lg border border-white/10 mb-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập tên người bạn muốn thêm..."
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="flex-1 text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white placeholder-stone-550 focus:outline-none focus:border-white/30"
                  required
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black text-xs font-bold px-4 rounded-lg cursor-pointer"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  onClick={() => setShowInviteInput(false)}
                  className="text-stone-400 hover:text-white text-xs px-2 cursor-pointer"
                >
                  Hủy
                </button>
              </form>
            )}

            {/* Add Photo Form */}
            {showAddPhoto && (
              <form onSubmit={handleAddPhoto} className="bg-[#181818] p-5 rounded-lg border border-white/10 mb-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-stone-300">Tải lên tấm ảnh kỷ niệm</h4>
                  <button type="button" onClick={() => setShowAddPhoto(false)} className="text-xs text-stone-400 hover:text-stone-200 cursor-pointer">Đóng</button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Tên Tác Phẩm</label>
                    <input
                      type="text"
                      placeholder="e.g. Điểm hẹn sương mờ"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      className="w-full text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Chú thích (Ghi chú tay)</label>
                    <input
                      type="text"
                      placeholder="e.g. Lúc này mặt trời bắt đầu lên ấm áp vô cùng..."
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      className="w-full text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-bold text-stone-400 mb-2">Chọn Góc Ảnh Phong Cảnh</label>
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
                          <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-stone-300 py-0.5 truncate text-center">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-white hover:bg-neutral-200 text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Xác nhận tải lên album chung
                </button>
              </form>
            )}

            {/* List of active collaborative live feed photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {albumPhotos.map((photo) => (
                <div key={photo.id} className="bg-[#171717] p-3.5 rounded-lg border border-white/5 shadow-sm relative group/card hover:scale-[1.01] transition-transform">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-black mb-3 border border-white/5 rounded relative">
                    <img src={photo.imageUrl} alt={photo.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-black/80 text-[#e5e5e7] font-mono text-[8px] px-2 py-0.5 rounded uppercase">
                      Tác giả: {photo.author}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-light text-white">{photo.title}</h4>
                  <p className="font-hand text-lg text-stone-400 leading-none mt-1">"{photo.caption}"</p>
                  
                  {/* Photo likes indicator inside grid cards */}
                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center text-[9px] text-[#737373]">
                    <span>Shared Feed</span>
                    <button
                      onClick={() => {
                        setAlbumPhotos(prev => prev.map(p => p.id === photo.id ? {...p, likes: p.likes + 1} : p));
                        setGlobalLikes(p => p + 1);
                      }}
                      className="flex items-center space-x-1.5 hover:text-white font-bold cursor-pointer bg-transparent border-none"
                    >
                      <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                      <span>{photo.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. DETAILED CONFIGURATION FOR COMPILER */}
          <div className="bg-[#121212]/95 p-6 sm:p-8 rounded-lg shadow-2xl border border-white/5 space-y-6">
            <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
              <span className="h-8 w-8 rounded-full bg-white/5 text-white flex items-center justify-center font-bold text-sm border border-white/10">03</span>
              <div>
                <h3 className="font-serif text-lg text-white font-normal">Configure Your Souvenir Book</h3>
                <p className="text-xs text-stone-400">Customize layout settings of the output ready-to-print compilation ledger.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Tên Chuyến Hành Trình</label>
                <input
                  type="text"
                  value={config.tripName}
                  onChange={(e) => setConfig({ ...config, tripName: e.target.value })}
                  className="w-full text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Khẩu Hiệu / Subtitle</label>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                  className="w-full text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Khoảng Thời Gian</label>
                <input
                  type="text"
                  value={config.dates}
                  onChange={(e) => setConfig({ ...config, dates: e.target.value })}
                  className="w-full text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">Chủ Đề Mỹ Thuật</label>
                <select
                  value={config.themeStyle}
                  onChange={(e) => setConfig({ ...config, themeStyle: e.target.value as any })}
                  className="w-full text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white focus:outline-none"
                >
                  <option value="obsidian">Obsidian Matte Black</option>
                  <option value="amber">Warm Bronze Twilight</option>
                  <option value="quartz">Frosted Crystal Quartz</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[9px] uppercase font-bold text-[#a3a3a3] mb-1">Trích lục hành trình</label>
                <textarea
                  value={config.narrative}
                  onChange={(e) => setConfig({ ...config, narrative: e.target.value })}
                  rows={2}
                  className="w-full text-xs p-2.5 bg-black border border-white/10 rounded-lg text-white resize-none focus:outline-none"
                />
              </div>
            </div>

            {/* Features checkmarks as requested */}
            <div className="flex flex-wrap items-center justify-between p-3.5 bg-black rounded-lg border border-white/5 gap-3">
              <div className="flex items-center space-x-1.5 text-xs text-stone-300">
                <div className="p-1 bg-white/5 rounded-full text-white">
                  <Check className="h-3 w-3" />
                </div>
                <span>High Quality</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-stone-300">
                <div className="p-1 bg-white/5 rounded-full text-white">
                  <Check className="h-3 w-3" />
                </div>
                <span>Print Ready</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-stone-300">
                <div className="p-1 bg-white/5 rounded-full text-white">
                  <Check className="h-3 w-3" />
                </div>
                <span>Easy to Share</span>
              </div>
            </div>

            {/* EXPORT TO PDF CALL TO ACTION (CTA) */}
            <button
              onClick={triggerExportPDF}
              id="compiler-print-btn"
              disabled={isPrinting}
              className="w-full py-4 bg-white hover:bg-neutral-250 disabled:bg-neutral-800 text-black font-semibold text-xs uppercase tracking-widest rounded-full cursor-pointer shadow-lg transition-all flex items-center justify-center space-x-3.5"
            >
              {isPrinting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span className="tracking-wider">ĐANG BIÊN TẬP SÁCH ẢNH...</span>
                </>
              ) : (
                <>
                  <Printer className="h-4 w-4 text-black" />
                  <span className="tracking-widest">Export to PDF Souvenir</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive virtual polaroid printer & margins annotations */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          
          {/* Printer Device mockup body */}
          <div className="bg-[#121212] p-6 rounded-xl shadow-2xl border border-white/10 relative overflow-hidden flex flex-col items-center">
            
            {/* Hand-drawn style annotations pointing to the printer */}
            <div className="absolute top-2 left-6 z-20 pointer-events-none transform -rotate-12 hidden xs:block">
              <span className="font-hand text-xl text-stone-400 leading-none">Memories together.</span>
            </div>

            {/* Custom status dial light */}
            <div className="w-full flex justify-between items-center border-b border-white/5 pb-3 mb-6">
              <div className="flex space-x-1.5 items-center">
                <span className={`block h-2 w-2 rounded-full ring-2 ring-neutral-900 ${isPrinting ? "bg-amber-400 animate-ping" : "bg-neutral-500"}`} />
                <span className="text-[9px] uppercase font-mono tracking-widest text-stone-400 font-extrabold">MEMO-STATION N°03</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-stone-500 uppercase">PRO PHYSICAL FEED</span>
            </div>

            {/* Virtual Device Slot where sheet prints out */}
            <div className="relative w-full aspect-[4/3] bg-black rounded border border-white/5 overflow-hidden flex flex-col justify-end p-1">
              
              {/* LED Line Feed representing laser printer slide */}
              {isPrinting && (
                <div className="absolute top-0 inset-x-0 h-1 bg-white shadow-[0_0_8px_white] z-30 animate-bounce duration-500" />
              )}

              {/* Printed Album Sheet sliding upwards based on states */}
              <div
                className={`w-[93%] mx-auto ${themeColors.bg} ${themeColors.text} p-4 rounded border ${themeColors.border} transition-all duration-[1500ms] ease-out origin-bottom transform ${
                  isPrinting 
                    ? "translate-y-[40%] scale-95 opacity-55 animate-pulse" 
                    : "translate-y-2 scale-100 opacity-100 hover:scale-[1.01]"
                }`}
                style={{ minHeight: "220px" }}
              >
                {/* Vintage details inside printed page */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                  <span className="text-[8px] font-mono tracking-widest font-light uppercase text-stone-400">SOUVENIR MANIFESTO</span>
                  <span className="text-[7.5px] font-mono tracking-wider font-light text-stone-400 uppercase">{config.dates}</span>
                </div>

                <div className="space-y-2">
                  <span className="font-serif text-[10px] italic tracking-widest text-stone-500 block">OUR PATH:</span>
                  <h4 className="font-serif text-sm font-light tracking-tight leading-none uppercase text-white">
                    {config.tripName || "Tour Book title"}
                  </h4>
                  <p className="font-hand text-lg text-stone-400 leading-none mb-1">"{config.subtitle}"</p>
                  
                  {/* Small postcard photo matching live feed */}
                  <div className="w-full h-18 overflow-hidden rounded border border-white/5 bg-black">
                    <img 
                      src={selectedPresetImage} 
                      referrerPolicy="no-referrer" 
                      alt="Current book preview" 
                      className="w-full h-full object-cover grayscale-[10%]" 
                    />
                  </div>

                  {/* Print micro excerpts */}
                  <p className="text-[10px] italic leading-relaxed text-stone-400 line-clamp-2 select-text font-serif">
                    {config.narrative || "Hành trình mộc mạc lưu lại những ký ức rực rỡ nhất."}
                  </p>
                </div>
              </div>

              {/* Printer Mouth physical frame bar */}
              <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-stone-900 to-[#121212] z-10 border-t border-white/5 flex items-center justify-center">
                <span className="block h-0.5 w-2/3 bg-black rounded-full" />
              </div>
            </div>

            {/* Virtual physical eject button */}
            <button
              onClick={triggerExportPDF}
              className="mt-6 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-stone-300 hover:text-white rounded-full border border-white/10 text-[10px] font-mono tracking-widest shadow-md transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
            >
              <Printer className="h-3.5 w-3.5 text-stone-450" />
              <span>FEED PHOTO SHEETS</span>
            </button>
          </div>

          {/* Quick info panel */}
          <div className="bg-[#121212] p-5 rounded border border-white/5 text-xs text-stone-400 leading-relaxed text-justify">
            <h4 className="font-bold text-stone-300 mb-1.5 uppercase font-mono tracking-wider text-[10px]">Lưu Tri Kỷ Niệm</h4>
            Tính năng export sẽ tổng hợp toàn bộ ảnh có trong album chung được tải lên từ tất cả đồng hành lữ khách, tạo ra file PDF hoàn thiện để lưu trữ làm quà lưu niệm.
          </div>
        </div>
      </div>

      {/* DETAILED PDF STORIES PRINT PREVIEW BOOK MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-none">
          <div className="my-8 w-full max-w-4xl bg-[#0d0d0d] text-stone-200 rounded-lg shadow-2xl overflow-hidden border border-white/10 z-50">
            
            {/* Modal action bar */}
            <div className="bg-black text-stone-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/5">
              <div className="flex items-center space-x-2.5">
                <Printer className="h-4 w-4 text-stone-400" />
                <span className="font-serif tracking-widest text-xs uppercase">PREVIEW PRINT-READY ALBUM</span>
              </div>
              <div className="flex items-center space-x-3.5">
                <button
                  onClick={confirmPhysicalPrint}
                  id="modal-confirm-print-btn"
                  className="px-4 py-2 bg-white hover:bg-neutral-205 text-black font-semibold text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-md"
                >
                  Confirm & Print PDF
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  id="modal-close-print-btn"
                  className="text-stone-400 hover:text-white text-xs uppercase tracking-widest p-2 cursor-pointer"
                >
                  Đóng Preview
                </button>
              </div>
            </div>

            {/* Printable Album Sheet Container */}
            <div className="p-8 md:p-12 font-serif text-stone-200 bg-[#0d0d0d] print:p-0" id="printable-area">
              
              {/* Outer boundary ledger design */}
              <div className="border border-white/10 p-6 md:p-10 relative bg-[#090909]">
                
                {/* Cover Header */}
                <div className="text-center pb-8 border-b border-white/5 mb-8">
                  <div className="text-[9px] tracking-[0.45em] uppercase font-mono text-stone-550 font-extrabold mb-3">SỔ LƯU NIỆM DU HÀNH</div>
                  <h1 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-white mb-2 leading-none">
                    {config.tripName}
                  </h1>
                  <p className="font-hand text-3xl text-stone-400 leading-none">"{config.subtitle}"</p>
                  
                  <div className="flex justify-center items-center space-x-4 mt-6 text-xs text-stone-450 tracking-wider font-mono uppercase">
                    <span>DATES: {config.dates}</span>
                    <span>•</span>
                    <span>CREATORS: Bạn & {collaborators.map(c => c.name).join(", ")}</span>
                  </div>
                </div>

                {/* Featured Scrapbook layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
                  
                  <div>
                    <h3 className="text-[9px] uppercase tracking-widest font-mono text-stone-500 font-bold mb-3">NARRATIVE REPORT</h3>
                    <p className="text-stone-300 leading-relaxed text-justify text-sm md:text-base mb-6 indent-6">
                      {config.narrative}
                    </p>

                    <div className="bg-[#121212] p-4 border border-white/5 rounded italic text-xs text-stone-400 leading-relaxed font-sans relative">
                      <Quote className="h-5 w-5 text-stone-600 absolute -top-2 -left-2" />
                      "Những cảnh sắc trôi qua mộc mạc bên đường để lại nụ cười rạng rỡ của bạn bè, tiếng hát ngâm vang giáp đồi dốc. Chúng tôi đã khắc ghi một hành trình tuổi trẻ không phai nhòa."
                    </div>
                  </div>

                  {/* Primary customized travel focus image */}
                  <div className="bg-[#121212] p-4 rounded border border-white/5 shadow-md transform rotate-1">
                    <img
                      src={selectedPresetImage}
                      alt="Printed focus scenery"
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[4/3] object-cover border border-white/5"
                    />
                    <p className="font-hand text-xl text-center text-stone-400 mt-2">
                       {config.tripName} - {config.dates}
                    </p>
                  </div>
                </div>

                {/* Index of included photographic stories */}
                <div className="border-t border-dashed border-white/10 pt-6">
                  <h3 className="text-[9px] font-mono uppercase tracking-widest text-stone-500 font-bold mb-4">MỤC LỤC KÝ ỨC CHUYẾN ĐI ({albumPhotos.length} ảnh chung)</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {albumPhotos.map((photo, i) => (
                      <div key={photo.id} className="text-xs font-mono">
                        <span className="text-stone-450 mr-1">[0{i+1}]</span>
                        <span className="font-normal text-stone-300 uppercase">{photo.title}</span>
                        <p className="text-[10px] text-stone-500 italic mt-0.5">Tác giả: {photo.author}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] text-stone-500 font-mono">
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
