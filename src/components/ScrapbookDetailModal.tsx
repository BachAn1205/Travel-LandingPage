import React, { useState } from "react";
import { TimelineItem } from "../types";
import { X, Heart, MapPin, Calendar, Volume2, VolumeX, Sparkles, Send, Music } from "lucide-react";

interface ScrapbookDetailModalProps {
  item: TimelineItem | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export default function ScrapbookDetailModal({ item, onClose, onLike }: ScrapbookDetailModalProps) {
  if (!item) return null;

  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; date: string }>>([
    { id: "c1", author: "Hồng Nhung", text: "Ảnh đẹp ngất ngây luôn ạ! Nhìn như tác phẩm điện ảnh.", date: "15/06" },
    { id: "c2", author: "Thành Đạt", text: "Thích nhạc nền lãng mạn lồng vào hành trình này quá.", date: "16/06" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);

  // Audio mock references for matching atmosphere audio
  const getAtmosphereSoundName = (loc: string) => {
    if (loc.includes("Amalfi")) return "Tiếng Sóng Biển Amalfi & Chim Hải Âu";
    if (loc.includes("Dolomites")) return "Tiếng Gió Núi Alps & Chuông Ngọai Ô";
    if (loc.includes("Iceland")) return "Tiếng Lửa Trại Bập Bùng Snæfellsnes";
    return "Tiếng Suối Rừng Linh Thiêng Khắc Thác";
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const author = commenterName.trim() || "Người Lữ Khách";
    setComments(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        author,
        text: newComment.trim(),
        date: "Hôm nay"
      }
    ]);
    setNewComment("");
    setCommenterName("");
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-none">
      {/* Outer Click dismiss */}
      <div className="absolute inset-0 cursor-auto" onClick={onClose} />

      {/* Main ledger journal container */}
      <div className="relative w-full max-w-4xl bg-[#0d0d0d] text-stone-200 rounded-xl shadow-2xl overflow-hidden border border-white/10 z-10 font-sans flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
        
        {/* Left Side: Elegant post-card & video visual */}
        <div className="w-full md:w-1/2 p-6 bg-[#121212] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header labels */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] uppercase tracking-widest font-mono text-stone-500 font-light">KÝ ỨC DƯỚI GÓC PHIM N°041</span>
              <button
                onClick={() => onLike(item.id)}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-red-500 transition-all active:scale-95 cursor-pointer border border-white/5"
              >
                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                <span className="font-mono text-xs font-bold text-stone-300">{item.likes}</span>
              </button>
            </div>

            {/* Postcard post stamp aesthetic */}
            <div className="bg-[#171717] p-3 rounded-lg border border-white/5 relative mb-6">
              <div className="w-full aspect-[4/3] bg-black rounded overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 font-serif text-center"
                />
              </div>
              <p className="font-hand text-2xl text-stone-300 text-center mt-3 select-none">
                "{item.handwrittenCaption}"
              </p>
            </div>
          </div>

          {/* Interactive atmosphere controller */}
          <div className="bg-[#171717] p-4 rounded-lg border border-white/5 mt-2">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-stone-300 border border-white/10 flex-shrink-0">
                {isPlayingSoundscape ? (
                  <Volume2 className="h-4.5 w-4.5 text-white" />
                ) : (
                  <VolumeX className="h-4.5 w-4.5 text-stone-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[9px] tracking-widest uppercase font-mono text-stone-500 font-light">Ambient Soundscape</p>
                <h4 className="text-xs font-bold text-stone-300 truncate">{getAtmosphereSoundName(item.location)}</h4>
                
                {/* Audio mock triggers */}
                <button
                  onClick={() => setIsPlayingSoundscape(!isPlayingSoundscape)}
                  className={`mt-2 text-[9px] px-3 py-1 uppercase tracking-widest rounded-full font-bold cursor-pointer transition-colors ${
                    isPlayingSoundscape 
                      ? "bg-white text-black" 
                      : "bg-[#262626] hover:bg-[#333333] text-stone-350"
                  }`}
                >
                  {isPlayingSoundscape ? "Tạm Dừng Thanh Âm" : "Bật Âm Thanh Môi Trường"}
                </button>
              </div>
            </div>
            
            {isPlayingSoundscape && (
              <div className="mt-3 flex items-center space-x-2 text-[8px] text-stone-500 font-mono">
                <Music className="h-3 w-3 text-stone-500 animate-spin" />
                <span>Đang phát mô phỏng gió cỏ, vách đá, tiếng đồi dốc lộc cộc...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Diary Notebook Page */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#0d0d0d] relative">
          
          {/* Close button inside modal container */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-stone-400 hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Đóng sổ"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Book spine simulated design */}
          <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

          {/* Diary Body journal entry */}
          <div className="pt-2">
            {/* Meta Tags */}
            <div className="flex items-center space-x-4 text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
              <span className="flex items-center space-x-1 font-bold">
                <MapPin className="h-3 w-3 text-stone-400" />
                <span>{item.location}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono text-stone-550 uppercase tracking-wider mb-4 border-b border-white/5 pb-3">
              <span className="flex items-center space-x-1 font-bold">
                <Calendar className="h-3 w-3 text-stone-400" />
                <span>{item.date}</span>
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-light text-white leading-tight mb-4">
              {item.title}
            </h3>

            {/* Story with typewriter/serif styled paragraph */}
            <p className="font-serif text-sm md:text-base text-stone-300 leading-relaxed text-justify mb-6">
              {item.description}
            </p>
          </div>

          {/* Interactive Traveler Guestbook comments ledger */}
          <div className="border-t border-dashed border-white/10 pt-5 mt-4">
            <h4 className="font-serif text-xs uppercase tracking-wider font-normal text-stone-350 mb-3 flex items-center space-x-1.5">
              <span>Cuốn Sổ Lưu Bút Kỷ Niệm</span>
              <Sparkles className="h-3.5 w-3.5 text-[#a3a3a3]" />
            </h4>

            {/* Comment logs */}
            <div className="space-y-3 max-h-40 overflow-y-auto mb-4 pr-1 text-xs">
              {comments.map(c => (
                <div key={c.id} className="bg-[#171717] p-2.5 rounded border border-white/5 shadow-sm relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-stone-300 font-mono">{c.author}</span>
                    <span className="text-[9px] text-stone-500 font-mono">{c.date}</span>
                  </div>
                  <p className="text-stone-450 italic">"{c.text}"</p>
                </div>
              ))}
            </div>

            {/* Add new user comment on the diary page */}
            <form onSubmit={handleAddComment} className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Tên..."
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="w-1/3 text-xs p-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-white/20"
                />
                <input
                  type="text"
                  placeholder="Để lại lưu bút..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  className="flex-1 text-xs p-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-stone-600 focus:outline-none focus:border-white/20"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-white hover:bg-neutral-200 text-black rounded-lg font-bold text-xs transition-colors cursor-pointer flex items-center justify-center border-none"
                  title="Gửi cảm nghĩ"
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
