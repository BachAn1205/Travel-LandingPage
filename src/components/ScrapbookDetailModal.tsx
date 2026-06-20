import React, { useState, useEffect } from "react";
import { TimelineItem } from "../types";
import { X, Heart, MapPin, Calendar, Volume2, VolumeX, Sparkles, Send, Music } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ScrapbookDetailModalProps {
  item: TimelineItem | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export default function ScrapbookDetailModal({ item, onClose, onLike }: ScrapbookDetailModalProps) {
  if (!item) return null;

  const { language, t } = useLanguage();

  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; date: string }>>([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);

  useEffect(() => {
    setComments(language === "en" ? [
      { id: "c1", author: "Emily Khanh", text: "Stunning shot! Looks like a cinema screenshot.", date: "06/15" },
      { id: "c2", author: "Phan Lam", text: "Love the romantic background music added to this journey.", date: "06/16" }
    ] : [
      { id: "c1", author: "Hồng Nhung", text: "Ảnh đẹp ngất ngây luôn ạ! Nhìn như tác phẩm điện ảnh.", date: "15/06" },
      { id: "c2", author: "Thành Đạt", text: "Thích nhạc nền lãng mạn lồng vào hành trình này quá.", date: "16/06" }
    ]);
  }, [language]);

  const getAtmosphereSoundName = (loc: string) => {
    if (loc.includes("Amalfi")) {
      return language === "en" 
        ? "Amalfi Ocean Waves & Sea Gulls" 
        : "Tiếng Sóng Biển Amalfi & Chim Hải Âu";
    }
    if (loc.includes("Dolomites")) {
      return language === "en" 
        ? "Alps Mountain Wind & Distant Bells" 
        : "Tiếng Gió Núi Alps & Chuông Ngọai Ô";
    }
    if (loc.includes("Iceland")) {
      return language === "en" 
        ? "Snæfellsnes Crackling Campfire Atmosphere" 
        : "Tiếng Lửa Trại Bập Bùng Snæfellsnes";
    }
    return language === "en" 
      ? "Sacred Forest Stream & Waterfalls" 
      : "Tiếng Suối Rừng Linh Thiêng Khắc Thác";
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const author = commenterName.trim() || t("modal.defaultAuthor");
    setComments(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        author,
        text: newComment.trim(),
        date: t("modal.commentDate")
      }
    ]);
    setNewComment("");
    setCommenterName("");
  };

  // Translated properties
  const itemTitle = language === "en" && "title_en" in item ? (item as any).title_en : item.title;
  const itemLocation = language === "en" && "location_en" in item ? (item as any).location_en : item.location;
  const itemDate = language === "en" && "date_en" in item ? (item as any).date_en : item.date;
  const itemDescription = language === "en" && "description_en" in item ? (item as any).description_en : item.description;
  const itemHandwritten = language === "en" && "handwrittenCaption_en" in item ? (item as any).handwrittenCaption_en : item.handwrittenCaption;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-none">
      <div className="absolute inset-0 cursor-auto" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[var(--theme-panel)] text-[var(--theme-text)] rounded-xl shadow-2xl overflow-hidden border border-[var(--theme-border)] z-10 font-sans flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] transition-colors duration-700">
        
        {/* Left Side: Elegant post-card & video visual */}
        <div className="w-full md:w-1/2 p-6 bg-[var(--theme-bg)] border-b md:border-b-0 md:border-r border-[var(--theme-border)] flex flex-col justify-between overflow-y-auto transition-colors duration-700">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] uppercase tracking-widest font-mono text-[var(--theme-text-muted)] font-light transition-colors duration-700">{t("modal.title")}</span>
              <button
                onClick={() => onLike(item.id)}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all active:scale-95 cursor-pointer border border-red-500/20"
              >
                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                <span className="font-mono text-xs font-bold text-red-500">{item.likes}</span>
              </button>
            </div>

            <div className="bg-[var(--theme-panel)] p-3 rounded-lg border border-[var(--theme-border)] relative mb-6 transition-colors duration-700">
              <div className="w-full aspect-[4/3] bg-black rounded overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={itemTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 font-serif text-center"
                />
              </div>
              <p className="font-hand text-2xl text-[var(--theme-text)] text-center mt-3 select-none transition-colors duration-700">
                "{itemHandwritten}"
              </p>
            </div>
          </div>

          {/* Interactive atmosphere controller */}
          <div className="bg-[var(--theme-panel)] p-4 rounded-lg border border-[var(--theme-border)] mt-2 transition-colors duration-700">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-[var(--theme-bg)] flex items-center justify-center text-[var(--theme-text)] border border-[var(--theme-border)] flex-shrink-0 transition-colors duration-700">
                {isPlayingSoundscape ? (
                  <Volume2 className="h-4.5 w-4.5 text-[var(--theme-text)]" />
                ) : (
                  <VolumeX className="h-4.5 w-4.5 text-[var(--theme-text-muted)]" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[9px] tracking-widest uppercase font-mono text-[var(--theme-text-muted)] font-light transition-colors duration-700">{t("modal.soundscape")}</p>
                <h4 className="text-xs font-bold text-[var(--theme-text)] truncate transition-colors duration-700">{getAtmosphereSoundName(item.location)}</h4>
                
                <button
                  onClick={() => setIsPlayingSoundscape(!isPlayingSoundscape)}
                  className={`mt-2 text-[9px] px-3 py-1 uppercase tracking-widest rounded-full font-bold cursor-pointer transition-colors ${
                    isPlayingSoundscape 
                      ? "bg-[var(--theme-text)] text-[var(--theme-bg)]" 
                      : "bg-[var(--theme-border)] hover:opacity-85 text-[var(--theme-text-muted)]"
                  }`}
                >
                  {isPlayingSoundscape ? t("modal.soundToggleOn") : t("modal.soundToggleOff")}
                </button>
              </div>
            </div>
            
            {isPlayingSoundscape && (
              <div className="mt-3 flex items-center space-x-2 text-[8px] text-[var(--theme-text-muted)] font-mono transition-colors duration-700">
                <Music className="h-3 w-3 text-[var(--theme-text-muted)] animate-spin" />
                <span>{t("modal.soundDesc")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Diary Notebook Page */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[var(--theme-panel)] relative transition-colors duration-700">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors cursor-pointer z-20"
            aria-label="Đóng sổ"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

          {/* Diary Body journal entry */}
          <div className="pt-2">
            <div className="flex items-center space-x-4 text-xs font-mono text-[var(--theme-text-muted)] uppercase tracking-wider mb-2">
              <span className="flex items-center space-x-1 font-bold">
                <MapPin className="h-3 w-3 text-[var(--theme-text-muted)]" />
                <span>{itemLocation}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono text-[var(--theme-text-muted)] uppercase tracking-wider mb-4 border-b border-[var(--theme-border)] pb-3 transition-colors duration-700">
              <span className="flex items-center space-x-1 font-bold">
                <Calendar className="h-3 w-3 text-[var(--theme-text-muted)]" />
                <span>{itemDate}</span>
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-light text-[var(--theme-text)] leading-tight mb-4 transition-colors duration-700">
              {itemTitle}
            </h3>

            <p className="font-serif text-sm md:text-base text-[var(--theme-text-muted)] leading-relaxed text-justify mb-6 transition-colors duration-700">
              {itemDescription}
            </p>
          </div>

          {/* Interactive Traveler Guestbook comments ledger */}
          <div className="border-t border-dashed border-[var(--theme-border)] pt-5 mt-4 transition-colors duration-700">
            <h4 className="font-serif text-xs uppercase tracking-wider font-normal text-[var(--theme-text)] mb-3 flex items-center space-x-1.5 transition-colors duration-700">
              <span>{t("modal.guestbook")}</span>
              <Sparkles className="h-3.5 w-3.5 text-[var(--theme-text-muted)]" />
            </h4>

            {/* Comment logs */}
            <div className="space-y-3 max-h-40 overflow-y-auto mb-4 pr-1 text-xs">
              {comments.map(c => (
                <div key={c.id} className="bg-[var(--theme-bg)] p-2.5 rounded border border-[var(--theme-border)] shadow-sm relative transition-colors duration-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[var(--theme-text)] font-mono transition-colors duration-700">{c.author}</span>
                    <span className="text-[9px] text-[var(--theme-text-muted)] font-mono transition-colors duration-700">{c.date}</span>
                  </div>
                  <p className="text-[var(--theme-text-muted)] italic transition-colors duration-700">"{c.text}"</p>
                </div>
              ))}
            </div>

            {/* Add new user comment on the diary page */}
            <form onSubmit={handleAddComment} className="space-y-2">
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  placeholder={t("modal.inputName")}
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="w-1/3 text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder={t("modal.inputComment")}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  className="flex-1 text-xs py-2 px-1 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[var(--theme-border)] text-[var(--theme-text)] focus:border-[var(--theme-text)] focus:ring-0 transition-all duration-300 placeholder-stone-500/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[var(--theme-text)] hover:opacity-90 text-[var(--theme-bg)] rounded-lg font-bold text-xs transition-all active:scale-95 duration-300 cursor-pointer flex items-center justify-center border-none"
                  title={language === "en" ? "Send feedback" : "Gửi cảm nghĩ"}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
