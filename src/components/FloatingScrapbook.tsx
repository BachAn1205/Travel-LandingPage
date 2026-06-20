import React, { useEffect, useRef, useState } from "react";
import { TimelineItem } from "../types";
import { 
  Heart, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Paperclip, 
  Pin, 
  Scissors, 
  ArrowLeftRight, 
  SquarePen
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface FloatingScrapbookProps {
  onSelectMemory: (item: TimelineItem) => void;
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
}

export default function FloatingScrapbook({ 
  onSelectMemory, 
  timelineItems, 
  setTimelineItems 
}: FloatingScrapbookProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  // States for custom notes written by the traveler (localized)
  const [customNotes, setCustomNotes] = useState<Record<string, { vi: string; en: string }>>({
    "1": { vi: "Cà phê vỉa hè ngắm biển Positano dốc dựng đứng, nắng lóa cả mắt!", en: "Sidewalk cafe viewing Positano's vertical cliffs, blinding sun!" },
    "2": { vi: "Chèo thuyền gỗ sương sớm, Alex tí nữa là rớt điện thoại xuống hồ lạnh buốt.", en: "Rowing wooden boat in morning mist, Alex almost dropped his phone in freezing lake." },
    "3": { vi: "Bấc lửa trại nướng kẹo dẻo ấm sực giữa đêm Bắc Âu xanh ngắt màu lục bảo.", en: "Campfire roasting marshmallows under emerald green Nordic night sky." },
    "4": { vi: "Croatia siêu đẹp rêu phong, đi bộ rã rời 15,000 bước chân!", en: "Croatia is beautiful and mossy, walked 15,000 steps until exhausted!" },
    "5": { vi: "Đóng băng toàn tập, mũi đỏ ửng vì lạnh nhưng cảnh quá choáng ngợp!", en: "Completely frozen, red nose from cold but the scenery is stunning!" },
    "6": { vi: "Ngắm bình minh muộn ở thung lũng, tĩnh lặng đến lạ kỳ.", en: "Watching late sunrise in the valley, uniquely tranquil." },
    "7": { vi: "Mặc áo mưa đi dưới thác mà vẫn ướt sũng, bù lại cầu vồng siêu đẹp!", en: "Wore raincoats under the fall but still soaked, but the rainbow is gorgeous!" }
  });

  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  // 3D flip state: which card IDs are currently flipped to show diary back
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid launching full diary details modal
    setTimelineItems(prev =>
      prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleAddCustomNote = (itemId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!noteDraft.trim()) return;
    setCustomNotes(prev => {
      const current = prev[itemId] || { vi: "", en: "" };
      return {
        ...prev,
        [itemId]: {
          vi: language === "vi" ? noteDraft.trim() : current.vi || noteDraft.trim(),
          en: language === "en" ? noteDraft.trim() : current.en || noteDraft.trim(),
        }
      };
    });
    setNoteDraft("");
    setActiveInputId(null);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollEl = containerRef.current;
      const triggerEl = triggerRef.current;
      if (!scrollEl || !triggerEl) return;

      const getScrollWidth = () => {
        return scrollEl.scrollWidth - window.innerWidth;
      };

      gsap.to(scrollEl, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      gsap.utils.toArray<HTMLElement>(".sc-parallax-slower").forEach((element) => {
        gsap.to(element, {
          xPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: () => `+=${getScrollWidth()}`,
            scrub: 1,
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".sc-parallax-faster").forEach((element) => {
        gsap.to(element, {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: () => `+=${getScrollWidth()}`,
            scrub: 1,
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".sc-rotating-parallax").forEach((element) => {
        const driftRotation = element.dataset.rotationDrift || "2";
        gsap.to(element, {
          rotation: `+=${driftRotation}`,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: () => `+=${getScrollWidth()}`,
            scrub: 1,
          }
        });
      });

    }, triggerRef);

    return () => ctx.revert();
  }, [timelineItems]);

  return (
    <div id="timeline-section" ref={triggerRef} className="relative w-full h-screen overflow-hidden bg-[var(--theme-bg)] z-30 select-none transition-colors duration-700">
      
      {/* Background elegant coordinates, grid patterns & decorative ink drops */}
      <div className="absolute inset-x-0 top-0 h-18 bg-gradient-to-b from-[var(--theme-bg)] to-transparent z-10 pointer-events-none transition-colors duration-700" />
      <div className="absolute inset-x-0 bottom-0 h-18 bg-gradient-to-t from-[var(--theme-bg)] to-transparent z-10 pointer-events-none transition-colors duration-700" />
      
      {/* Vintage ledger lines run in the static background */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--theme-border)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none transition-colors duration-700" />
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-red-950/20 border-l border-red-500/10 pointer-events-none" />

      {/* HORIZONTAL SCRAPBOOK CONTAINER */}
      <div 
        ref={containerRef} 
        className="flex h-full items-center pl-12 pr-64 sm:pl-24 py-12 gap-20 sm:gap-28 relative"
        style={{ willChange: "transform" }}
      >
        
        {/* FIRST COLUMN: Cinematic Introduction & Instructions overlay */}
        <div className="flex-shrink-0 w-[320px] sm:w-[420px] flex flex-col justify-center space-y-6 relative z-20">
          <div className="absolute -top-12 -left-4 font-mono text-[9px] tracking-[0.4em] text-[var(--theme-text-muted)] block bg-[var(--theme-panel)] px-2 py-1 rounded">
            {t("timeline.sec2")}
          </div>

          <div className="space-y-3">
            <span className="flex items-center space-x-1.5 text-xs text-[var(--theme-text-muted)] font-mono tracking-widest uppercase">
              <ArrowLeftRight className="h-3 w-3 animate-pulse opacity-70" />
              <span>{t("timeline.scrollSlide")}</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[var(--theme-text)] leading-tight">
              {t("timeline.title1")} <br />
              <span className="italic text-[var(--theme-text-muted)] font-normal">{t("timeline.title2")}</span>
            </h2>
          </div>

          <div className="bg-[var(--theme-panel)] border border-[var(--theme-border)] p-5 rounded-lg shadow-2xl relative text-xs text-[var(--theme-text-muted)] leading-relaxed font-sans space-y-3">
            <div className="absolute -top-4 -right-1 text-[var(--theme-text-muted)] z-10 transform rotate-12 transition-colors duration-700">
              <Paperclip className="h-6 w-6 opacity-80" />
            </div>

            <p className="font-serif text-sm italic text-[var(--theme-text)] transition-colors duration-700">
              {t("timeline.quote")}
            </p>
            <p className="font-sans font-light text-[var(--theme-text)] transition-colors duration-700">
              {t("timeline.desc")}
            </p>

            <div className="pt-2 border-t border-[var(--theme-border)] flex items-center space-x-2 text-[9px] font-mono uppercase text-[var(--theme-text-muted)] transition-colors duration-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>GSAP ScrollTrigger Active</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-[var(--theme-text-muted)] text-xs font-mono transition-colors duration-700">
            <Scissors className="h-4 w-4" />
            <span>{t("timeline.manifesto")}</span>
          </div>
        </div>

        {/* ITERATIVE COLUMNS: RENDER TIMELINE ITEMS WITH DYNAMIC PARALLAX ELEMENT STICKERS */}
        {timelineItems.map((item, index) => {
          const itemRotations = ["-rotate-2", "rotate-3", "-rotate-1", "rotate-2", "-rotate-3"];
          const polaroidRot = itemRotations[index % itemRotations.length];
          const noteLefts = ["-left-6", "left-40", "-left-10", "left-36"];
          const notePosition = noteLefts[index % noteLefts.length];

          const tapes = [
            "bg-amber-500/25 rotate-3 border-amber-300/10",
            "bg-stone-500/35 -rotate-2 border-white/10",
            "bg-neutral-600/30 rotate-6 border-stone-300/15",
            "bg-yellow-600/20 -rotate-4 border-yellow-200/5",
          ];
          const chosenTape = tapes[index % tapes.length];

          const connectionPaths = [
            "M 0,50 Q 50,10 100,25",
            "M 0,25 C 35,-15 65,115 100,75",
            "M 0,75 Q 50,30 100,50",
            "M 0,50 Q 50,90 100,75",
            "M 0,75 C 30,20 70,80 100,25"
          ];
          const pathD = connectionPaths[index % connectionPaths.length];

          // Translated properties
          const itemTitle = language === "en" && "title_en" in item ? (item as any).title_en : item.title;
          const itemLocation = language === "en" && "location_en" in item ? (item as any).location_en : item.location;
          const itemDate = language === "en" && "date_en" in item ? (item as any).date_en : item.date;

          return (
            <div 
              key={item.id}
              className="flex-shrink-0 w-[300px] sm:w-[350px] relative flex flex-col justify-center h-full"
            >
              {index < timelineItems.length - 1 && (() => {
                const airplaneSpecs = [
                  { y: 23.75, rot: -14 },
                  { y: 50, rot: 56 },
                  { y: 46.25, rot: -14 },
                  { y: 76.25, rot: 14 },
                  { y: 50, rot: 4 }
                ];
                const spec = airplaneSpecs[index % airplaneSpecs.length];
                return (
                  <div className="absolute top-0 bottom-0 -right-[100px] sm:-right-[132px] w-[120px] sm:w-[152px] z-0 pointer-events-none">
                    {/* Hand-drawn ink trail line */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="opacity-80">
                      <path 
                        d={pathD} 
                        fill="none" 
                        stroke="var(--theme-dashed)" 
                        strokeWidth="2.5" 
                        strokeDasharray="4 8"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    
                    {/* Paper Airplane Flying Overlay */}
                    <div 
                      className="absolute text-[var(--theme-text)] opacity-80 z-10" 
                      style={{
                        left: "50%",
                        top: `${spec.y}%`,
                        transform: `translate(-50%, -50%) rotate(${spec.rot}deg)`
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                        <path d="M2 5 L22 12 L2 19 L6 12 Z" />
                        <path d="M6 12 L22 12" />
                      </svg>
                    </div>
                  </div>
                );
              })()}
              
              {/* VINTAGE WRITTEN NOTE CARD */}
              <div 
                className={`absolute ${notePosition} -top-16 w-60 bg-[var(--theme-panel)] p-4 rounded-lg shadow-xl border border-[var(--theme-border)] font-hand select-text transform sc-parallax-slower z-10 hover:z-40 hover:scale-105 transition-all duration-300`}
                style={{ transformOrigin: "center bottom" }}
              >
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 text-stone-500 hover:text-stone-300 cursor-pointer">
                  <Pin className="h-4.5 w-4.5 text-stone-400 rotate-12" />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-[var(--theme-text-muted)] uppercase mb-2 border-b border-[var(--theme-border)] pb-1 transition-colors duration-700">
                  <span>{t("timeline.note")}{item.id}</span>
                  <span>{itemDate.split(',')[1] || "2025"}</span>
                </div>

                <p className="text-sm text-[var(--theme-text)] leading-snug transition-colors duration-700">
                  {index === 0 && (language === "en" ? "📸 Scent of open sea and hill winds, Positano enchants the traveler..." : "📸 Mùi mặn biển khơi và gió sườn đồi, Positano làm say lòng kẻ lữ hành...")}
                  {index === 1 && (language === "en" ? "🚣 Wood shavings falling in the boat cabin, sunlight shimmering on the cold water." : "🚣 Những lát dăm gỗ bào rơi rớt trên khoang thuyền, mặt nước lổ loang ánh nắng chói dại.")}
                  {index === 2 && (language === "en" ? "🌌 Chasing the auroras until knees ache. Sipping hot cocoa inside the tent." : "🌌 Đuổi theo cực quang tới mỏi nhừ đôi gối. Nhấp hớp socola nóng giữa lều trại.")}
                  {index === 3 && (language === "en" ? "🍁 Waterfalls roaring through the valley, lush moss clinging to limestone roots." : "🍁 Thác nước rầm rì dội vang thung lũng, rêu mọc xanh rì bám rễ vách thạch nhũ.")}
                  {index === 4 && (language === "en" ? "❄️ Standing amidst thick ice layers, watching distant snow peaks reflect." : "❄️ Đứng giữa lớp băng dày cộp, ngắm nhìn đỉnh núi tuyết xa xăm in bóng.")}
                  {index === 5 && (language === "en" ? "🌲 Deep breath of fresh valley air filled with early morning mist." : "🌲 Hít một hơi thật sâu không khí trong lành của thung lũng ngập tràn sương sớm.")}
                  {index === 6 && (language === "en" ? "💧 Roaring waters echoing around, white foam spraying beneath the bridge." : "💧 Tiếng nước đổ ầm ầm vang vọng, bọt tung trắng xóa dưới chân cầu.")}
                </p>

                <div className="mt-3 text-right">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--theme-text-muted)] transition-colors duration-700">
                    {t("timeline.scrapMemo")}
                  </span>
                </div>
              </div>

              {/* SECOND DECORATIVE PAPER CARD */}
              <div 
                className="absolute right-[-40px] bottom-12 w-44 bg-[var(--theme-panel)] border border-dashed border-[var(--theme-border)] p-3 rounded transform -rotate-6 sc-parallax-faster z-15 hover:z-40 text-left cursor-help"
                title="Historical fact"
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="inline-block h-1.5 w-1.5 bg-neutral-400 rounded-full" />
                  <span className="font-mono text-[8px] text-[var(--theme-text-muted)] uppercase tracking-widest transition-colors duration-700">{t("timeline.logFile")}</span>
                </div>
                <span className="font-sans text-[10px] text-[var(--theme-text)] italic font-light transition-colors duration-700">
                  {index === 0 && (language === "en" ? "Positano is steep at 45 degrees, built on ancient primary limestone cliffs." : "Positano dốc đứng 45 độ, xây trên đá vôi nguyên sinh cổ đại.")}
                  {index === 1 && (language === "en" ? "The lake lies at 1,496m altitude, with crystal-clear depths over 30 meters." : "Hồ nằm ở cao độ 1,496m, đáy hồ sâu hơn 30 mét trong vắt.")}
                  {index === 2 && (language === "en" ? "Auroras are created by solar storm particles colliding with atmosphere." : "Cực quang sinh ra từ vụ nổ bão từ mặt trời va chạm khí quyển.")}
                  {index === 3 && (language === "en" ? "A unique natural cascading lake system, one of the finest in East Europe." : "Hệ hồ bậc thang liên kết tự nhiên độc đáo bậc nhất Đông Âu.")}
                  {index === 4 && (language === "en" ? "Banff has over 1,000 ancient glaciers that shaped its landscape." : "Banff có hơn 1000 dòng sông băng cổ đại kiến tạo nên.")}
                  {index === 5 && (language === "en" ? "Yosemite is famous for its massive towering granite monoliths." : "Yosemite nổi tiếng với các khối đá granite khổng lồ vươn mình.")}
                  {index === 6 && (language === "en" ? "Skógafoss waterfall is 25 meters wide with a vertical drop of 60 meters." : "Thác Skógafoss rộng 25 mét và thả dốc thẳng đứng 60 mét.")}
                </span>
              </div>

              {/* CORE POLAROID CELL — 3D FLIP CONTAINER */}
              <div
                className={`relative z-10 cursor-pointer transform-gpu ${polaroidRot} hover:rotate-0 transition-transform duration-300`}
                style={{ perspective: "1000px" }}
                onClick={(e) => toggleFlip(item.id, e)}
              >
                <div
                  className="relative w-full transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedCards.has(item.id) ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* ── FRONT FACE ── */}
                  <div
                    className="relative bg-[#F4F1EB] text-stone-700 p-4 pb-5 rounded shadow-[0_12px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] border border-stone-300/30 group"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* PHYSICAL WASHI TAPE STICKER */}
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-28 h-6 backdrop-blur-[1px] border-l border-r opacity-85 z-30 shadow-md ${chosenTape}`} style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)" }} />

                    {/* Picture screen slot */}
                    <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden border border-stone-300/60 rounded-sm group-hover:brightness-105 transition-all duration-500">
                      <img
                        src={item.imageUrl}
                        alt={itemTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[20%] sepia-[10%] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-[1.03] transition-all duration-700 ease-out transform-gpu"
                      />
                      <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-md text-[8.5px] text-stone-300 border border-white/10 px-2 py-0.5 rounded-full flex items-center space-x-1 uppercase tracking-widest">
                        <MapPin className="h-2.5 w-2.5 text-stone-400" />
                        <span className="truncate max-w-[130px]">{itemLocation.split(',')[0]}</span>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-stone-200 text-black text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-sm shadow-sm border border-stone-300">
                        {itemDate.split(',')[1] || itemDate}
                      </span>
                    </div>

                    {/* Polaroid lower margins */}
                    <div className="mt-4 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-serif text-base text-stone-900 leading-tight font-medium">{itemTitle}</h3>
                        <div className="relative pt-1 border-t border-stone-200">
                          <p className="font-hand text-xl text-stone-800 italic leading-snug">
                            "{customNotes[item.id]?.[language] || (language === "en" && "handwrittenCaption_en" in item ? (item as any).handwrittenCaption_en : item.handwrittenCaption)}"
                          </p>
                        </div>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-stone-200 flex items-center justify-between">
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-red-500 active:scale-90 transition-transform cursor-pointer"
                        >
                          <Heart className="h-4.5 w-4.5 fill-red-500 text-red-500" />
                          <span className="font-mono text-xs text-stone-600 font-bold">{item.likes}</span>
                        </button>

                        {activeInputId === item.id ? (
                          <form onSubmit={(e) => handleAddCustomNote(item.id, e)}
                            className="flex items-center space-x-1 flex-1 ml-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input type="text" value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)}
                              placeholder={t("timeline.inputPlaceholder")}
                              className="flex-1 text-[10px] p-1.5 bg-transparent border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-500"
                              maxLength={55} required autoFocus
                            />
                            <button type="submit" className="text-[9px] bg-stone-800 text-white px-2 py-1.5 rounded font-bold hover:bg-stone-900 cursor-pointer">
                              {t("timeline.paste")}
                            </button>
                            <button type="button" onClick={() => setActiveInputId(null)} className="text-[9px] text-stone-400 hover:text-stone-600 px-1">X</button>
                          </form>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); setNoteDraft(customNotes[item.id]?.[language] || ""); setActiveInputId(item.id); }}
                            className="text-[9px] font-mono tracking-widest text-stone-500 hover:text-stone-900 uppercase flex items-center space-x-1 border border-stone-200 px-2 py-1 bg-stone-100 rounded-full hover:bg-stone-200"
                          >
                            <SquarePen className="h-3 w-3" />
                            <span>{t("timeline.writeNote")}</span>
                          </button>
                        )}
                      </div>

                      <div className="mt-2 text-center opacity-60 hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-sans text-stone-400 tracking-wider flex items-center justify-center space-x-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{language === "en" ? "tap to flip & read diary" : "nhấn để lật & đọc nhật ký"}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── BACK FACE (Diary Journal) ── */}
                  <div
                    className="absolute inset-0 bg-[#F9F5EE] text-stone-800 p-4 rounded shadow-[0_12px_32px_rgba(0,0,0,0.2)] border border-stone-300/40 overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {/* Cardboard texture lines */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(0,0,0,0.04)_24px,rgba(0,0,0,0.04)_25px)] pointer-events-none" />
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300/40 pointer-events-none" />

                    {/* Back header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-300/60">
                      <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-stone-400">
                        {language === "en" ? "Travel Diary" : "Nhật Ký Hành Trình"}
                      </span>
                      <span className="text-[8px] font-mono text-stone-400">{itemDate.split(',')[1]?.trim() || itemDate}</span>
                    </div>

                    {/* Location stamp */}
                    <div className="mb-3 inline-block border border-stone-400/40 rounded px-2 py-0.5 rotate-[-2deg]">
                      <span className="text-[8px] font-mono tracking-widest uppercase text-stone-500">
                        📍 {itemLocation}
                      </span>
                    </div>

                    {/* Diary text */}
                    <div className="font-hand text-sm text-stone-700 leading-relaxed mb-3">
                      {language === "en" && "description_en" in item
                        ? (item as any).description_en
                        : (item as any).description || ""}
                    </div>

                    {/* Handwritten footer note */}
                    <div className="absolute bottom-4 left-4 right-4 border-t border-stone-300/60 pt-2">
                      <p className="font-hand text-base text-stone-600 italic">
                        {customNotes[item.id]?.[language] || (language === "en" && "handwrittenCaption_en" in item
                          ? (item as any).handwrittenCaption_en
                          : item.handwrittenCaption)}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectMemory(item); }}
                          className="text-[8px] font-mono tracking-wider text-amber-700 hover:text-amber-900 uppercase underline cursor-pointer"
                        >
                          {language === "en" ? "open full diary →" : "mở nhật ký đầy đủ →"}
                        </button>
                        <span className="text-[8px] font-mono text-stone-400">{item.likes} ❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ENDING SOUVENIR STORY PAGE */}
        <div className="flex-shrink-0 w-[240px] flex flex-col justify-center space-y-4 text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-[var(--theme-panel)] border border-[var(--theme-border)] flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-[var(--theme-text-muted)]" />
          </div>
          <h3 className="font-serif text-lg text-[var(--theme-text)] font-normal uppercase tracking-widest">{t("timeline.endStream")}</h3>
          <p className="text-xs text-[var(--theme-text-muted)] italic">
            {t("timeline.endQuote")}
          </p>
        </div>

      </div>

      {/* FOOTER SCROLL INDICATOR BAR */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-stone-600 text-[10px] font-mono">
        <span className="uppercase tracking-widest">{t("timeline.footerGrid")}</span>
        <div className="flex items-center space-x-2">
          <span>{t("timeline.footerChronicles")}</span>
        </div>
        <span className="uppercase tracking-widest">{t("timeline.footerPreserved")}</span>
      </div>
    </div>
  );
}
