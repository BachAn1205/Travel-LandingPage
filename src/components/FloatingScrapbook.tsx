import React, { useEffect, useRef, useState } from "react";
import { TimelineItem } from "../types";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Quote, 
  Paperclip, 
  Pin, 
  Scissors, 
  ArrowLeftRight, 
  RotateCcw,
  SquarePen
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  // States for custom notes written by the traveler
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({
    "1": "Cà phê vỉa hè ngắm biển Positano dốc dựng đứng, nắng lóa cả mắt!",
    "2": "Chèo thuyền gỗ sương sớm, Alex tí nữa là rớt điện thoại xuống hồ lạnh buốt.",
    "3": "Bấc lửa trại nướng kẹo dẻo ấm sực giữa đêm Bắc Âu xanh ngắt màu lục bảo.",
    "4": "Croatia siêu đẹp rêu phong, đi bộ rã rời 15,000 bước chân!",
    "5": "Đóng băng toàn tập, mũi đỏ ửng vì lạnh nhưng cảnh quá choáng ngợp!",
    "6": "Ngắm bình minh muộn ở thung lũng, tĩnh lặng đến lạ kỳ.",
    "7": "Mặc áo mưa đi dưới thác mà vẫn ướt sũng, bù lại cầu vồng siêu đẹp!"
  });

  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid launching full diary details modal
    setTimelineItems(prev =>
      prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleAddCustomNote = (itemId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!noteDraft.trim()) return;
    setCustomNotes(prev => ({
      ...prev,
      [itemId]: noteDraft.trim()
    }));
    setNoteDraft("");
    setActiveInputId(null);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollEl = containerRef.current;
      const triggerEl = triggerRef.current;
      if (!scrollEl || !triggerEl) return;

      // Calculate total scrolling width
      const getScrollWidth = () => {
        return scrollEl.scrollWidth - window.innerWidth;
      };

      // Main pin scroll trigger for horizontal motion
      const tm = gsap.to(scrollEl, {
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

      // Parallax effect on the flying scrapbook notes & polaroids
      // We animate items with class "sc-parallax-slower" slightly opposite/slower
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

      // We animate items with class "sc-parallax-faster" slightly faster
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

      // Subtle rotation parallax for artsy drifting feeling
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
    <div id="timeline-section" ref={triggerRef} className="relative w-full h-screen overflow-hidden bg-[#070707] z-30 select-none">
      
      {/* Background elegant coordinates, grid patterns & decorative ink drops */}
      <div className="absolute inset-x-0 top-0 h-18 bg-gradient-to-b from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-18 bg-gradient-to-t from-[#080808] to-transparent z-10 pointer-events-none" />
      
      {/* Vintage ledger lines run in the static background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-red-950/20 border-l border-red-500/10 pointer-events-none" />

      {/* HORIZONTAL SCRAPBOOK CONTAINER */}
      <div 
        ref={containerRef} 
        className="flex h-full items-center pl-12 pr-64 sm:pl-24 py-12 gap-20 sm:gap-28 relative"
        style={{ willChange: "transform" }}
      >
        
        {/* FIRST COLUMN: Cinematic Introduction & Instructions overlay */}
        <div className="flex-shrink-0 w-[320px] sm:w-[420px] flex flex-col justify-center space-y-6 relative z-20">
          <div className="absolute -top-12 -left-4 font-mono text-[9px] tracking-[0.4em] text-neutral-600 block bg-zinc-900/.4 px-2 py-1 rounded">
            SECTION 02 // TIMELINE CORE
          </div>

          <div className="space-y-3">
            <span className="flex items-center space-x-1.5 text-xs text-stone-500 font-mono tracking-widest uppercase">
              <ArrowLeftRight className="h-3 w-3 animate-pulse text-stone-400" />
              <span>Scroll down to slide horizon</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              The Floating <br />
              <span className="italic text-stone-400 font-normal">Scrapbook.</span>
            </h2>
          </div>

          <div className="bg-[#121212]/75 border border-white/5 p-5 rounded-lg shadow-2xl relative text-xs text-stone-400 leading-relaxed font-sans space-y-3">
            {/* Paperclip aesthetic sticker */}
            <div className="absolute -top-4 -right-1 text-stone-500 z-10 transform rotate-12">
              <Paperclip className="h-6 w-6 text-stone-400" />
            </div>

            <p className="font-serif text-sm italic text-stone-300">
              "Ký ức là những mảnh giấy được cắt dán tự do, không theo hàng lối nhưng ngập tràn cảm xúc chân thật nhất."
            </p>
            <p className="font-sans font-light">
              Lăn chuột dọc trên máy tính hoặc vuốt để ghim và cuộn ngang. Các kỷ niệm được liên kết tự do trên vách tường ký ức kịch tính.
            </p>

            <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-[9px] font-mono uppercase text-stone-500">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>GSAP ScrollTrigger Active</span>
            </div>
          </div>

          {/* Doodles/Scissors decoration */}
          <div className="flex items-center space-x-3 text-stone-600 text-xs font-mono">
            <Scissors className="h-4 w-4" />
            <span>CUT & PIN MANIFESTO</span>
          </div>
        </div>

        {/* ITERATIVE COLUMNS: RENDER TIMELINE ITEMS WITH DYNAMIC PARALLAX ELEMENT STICKERS */}
        {timelineItems.map((item, index) => {
          // Dynamic rotations to represent authentic sloppy physical scrap look
          const itemRotations = ["- rotate-2", "rotate-3", "-rotate-1", "rotate-2"];
          const polaroidRot = itemRotations[index % itemRotations.length];
          
          // Sticky positions for beautiful chaotic layering
          const noteLefts = ["-left-6", "left-40", "-left-10", "left-36"];
          const notePosition = noteLefts[index % noteLefts.length];

          // Washi tape color and rotation configurations
          const tapes = [
            "bg-amber-500/25 rotate-3 border-amber-300/10",
            "bg-stone-500/35 -rotate-2 border-white/10",
            "bg-neutral-600/30 rotate-6 border-stone-300/15",
            "bg-yellow-600/20 -rotate-4 border-yellow-200/5",
          ];
          const chosenTape = tapes[index % tapes.length];

          return (
            <div 
              key={item.id}
              className="flex-shrink-0 w-[300px] sm:w-[350px] relative flex flex-col justify-center h-full"
            >
              
              {/* VINTAGE WRITTEN NOTE CARD (Pasted behind or floating around, Parallax slower!)} */}
              <div 
                className={`absolute ${notePosition} -top-16 w-60 bg-[#161514] p-4 rounded-lg shadow-xl border border-white/5 font-hand select-text transform sc-parallax-slower z-10 hover:z-40 hover:scale-105 transition-all duration-300`}
                style={{ transformOrigin: "center bottom" }}
              >
                {/* Visual Pin sticker at the top */}
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 text-stone-500 hover:text-stone-300 cursor-pointer">
                  <Pin className="h-4.5 w-4.5 text-stone-400 rotate-12" />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 uppercase mb-2 border-b border-stone-900 pb-1">
                  <span>NOTE N°0{item.id}</span>
                  <span>{item.date.split(',')[1] || "2025"}</span>
                </div>

                <p className="text-sm text-stone-300 leading-snug">
                  {index === 0 && "📸 Mùi mặn biển khơi và gió sườn đồi, Positano làm say lòng kẻ lữ hành..."}
                  {index === 1 && "🚣 Những lát dăm gỗ bào rơi rớt trên khoang thuyền, mặt nước lổ loang ánh nắng chói dại."}
                  {index === 2 && "🌌 Đuổi theo cực quang tới mỏi nhừ đôi gối. Nhấp hớp socola nóng giữa lều trại."}
                  {index === 3 && "🍁 Thác nước rầm rì dội vang thung lũng, rêu mọc xanh rì bám rễ vách thạch nhũ."}
                  {index === 4 && "❄️ Đứng giữa lớp băng dày cộp, ngắm nhìn đỉnh núi tuyết xa xăm in bóng."}
                  {index === 5 && "🌲 Hít một hơi thật sâu không khí trong lành của thung lũng ngập tràn sương sớm."}
                  {index === 6 && "💧 Tiếng nước đổ ầm ầm vang vọng, bọt tung trắng xóa dưới chân cầu."}
                </p>

                <div className="mt-3 text-right">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#737373]">
                    — Scrap Memo
                  </span>
                </div>
              </div>

              {/* SECOND DECORATIVE PAPER CARD OR STICKER FOR TACTILE FEEL (Parallax faster!) */}
              <div 
                className="absolute right-[-40px] bottom-12 w-44 bg-[#1a1a1a] border border-dashed border-white/10 p-3 rounded transform -rotate-6 sc-parallax-faster z-15 hover:z-40 text-left cursor-help"
                title="Historical fact"
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="inline-block h-1.5 w-1.5 bg-neutral-400 rounded-full" />
                  <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">LOG FILE</span>
                </div>
                <span className="font-sans text-[10px] text-zinc-400 italic font-light">
                  {index === 0 && "Positano dốc đứng 45 độ, xây trên đá vôi nguyên sinh cổ đại."}
                  {index === 1 && "Hồ nằm ở cao độ 1,496m, đáy hồ sâu hơn 30 mét trong vắt."}
                  {index === 2 && "Cực quang sinh ra từ vụ nổ bão từ mặt trời va chạm khí quyển."}
                  {index === 3 && "Hệ hồ bậc thang liên kết tự nhiên độc đáo bậc nhất Đông Âu."}
                  {index === 4 && "Banff có hơn 1000 dòng sông băng cổ đại kiến tạo nên."}
                  {index === 5 && "Yosemite nổi tiếng với các khối đá granite khổng lồ vươn mình."}
                  {index === 6 && "Thác Skógafoss rộng 25 mét và thả dốc thẳng đứng 60 mét."}
                </span>
              </div>

              {/* CORE POLAROID CELL */}
              <div 
                onClick={() => onSelectMemory(item)}
                className={`relative bg-[#0d0d0d] text-stone-300 p-4 pb-5 rounded shadow-2xl border border-white/5 cursor-pointer ease-out transition-all duration-300 transform group hover:border-white/20 hover:bg-[#111111] ${polaroidRot}`}
              >
                
                {/* PHYSICAL WASHI TAPE STICKER OVERLAY */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-28 h-6 backdrop-blur-[1px] border-l border-r opacity-85 z-30 shadow-md ${chosenTape}`} style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)" }} />

                {/* Picture screen slot */}
                <div className="relative w-full aspect-[4/3] bg-stone-950 overflow-hidden border border-[#212121] rounded-sm group-hover:brightness-105 transition-all duration-500">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[20%] sepia-[10%] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                  
                  {/* Location badge inside Picture container */}
                  <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-md text-[8.5px] text-stone-300 border border-white/10 px-2 py-0.5 rounded-full flex items-center space-x-1 uppercase tracking-widest">
                    <MapPin className="h-2.5 w-2.5 text-stone-400" />
                    <span className="truncate max-w-[130px]">{item.location.split(',')[0]}</span>
                  </div>

                  <span className="absolute bottom-2 right-2 bg-stone-200 text-black text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-sm">
                    {item.date.split(',')[1] || item.date}
                  </span>
                </div>

                {/* Polaroid lower margins containing handwriting and dynamic user custom notes */}
                <div className="mt-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base text-[#fafafb] leading-tight font-medium">
                      {item.title}
                    </h3>
                    
                    {/* Handwritten caption customized or default */}
                    <div className="relative pt-1 border-t border-white/5">
                      <p className="font-hand text-xl text-stone-400 italic leading-snug">
                        "{customNotes[item.id] || item.handwrittenCaption}"
                      </p>
                    </div>
                  </div>

                  {/* Add manual custom note dán đè button */}
                  <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between">
                    
                    {/* Active likes */}
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center space-x-1.5 text-xs text-stone-400 hover:text-red-500 active:scale-90 transition-transform cursor-pointer"
                      title="Vote Love"
                    >
                      <Heart className="h-4.5 w-4.5 fill-red-500 text-red-500 border-none bg-transparent" />
                      <span className="font-mono text-xs text-stone-400 font-bold">{item.likes}</span>
                    </button>

                    {/* Write customized text sticker trigger */}
                    {activeInputId === item.id ? (
                      <form 
                        onSubmit={(e) => handleAddCustomNote(item.id, e)}
                        className="flex items-center space-x-1 flex-1 ml-4"
                        onClick={(e) => e.stopPropagation()} // stop trigger parent modal 
                      >
                        <input
                          type="text"
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Nhập note dán tay..."
                          className="flex-1 text-[10px] p-1.5 bg-black border border-white/10 rounded text-white focus:outline-none focus:border-stone-400"
                          maxLength={55}
                          required
                          autoFocus
                        />
                        <button 
                          type="submit"
                          className="text-[9px] bg-white text-black px-2 py-1.5 rounded font-bold hover:bg-neutral-200 cursor-pointer"
                        >
                          Dán
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setActiveInputId(null)}
                          className="text-[9px] text-[#737373] hover:text-white px-1"
                        >
                          X
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNoteDraft(customNotes[item.id] || "");
                          setActiveInputId(item.id);
                        }}
                        className="text-[9px] font-mono tracking-widest text-stone-400 hover:text-white uppercase flex items-center space-x-1 border border-white/5 px-2 py-1 bg-white/5 rounded-full hover:bg-white/10"
                        title="Dán thêm lời viết tay"
                      >
                        <SquarePen className="h-3 w-3" />
                        <span>Viết đè note</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-sans text-stone-500 tracking-wider flex items-center justify-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>Xem chi tiết lưu bút...</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ENDING SOUVENIR STORY PAGE */}
        <div className="flex-shrink-0 w-[240px] flex flex-col justify-center space-y-4 text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-[#a3a3a3]" />
          </div>
          <h3 className="font-serif text-lg text-white font-normal uppercase tracking-widest">End of Stream</h3>
          <p className="text-xs text-stone-400 italic">
            "We travel not to escape life, but for life not to escape us."
          </p>
        </div>

      </div>

      {/* FOOTER SCROLL INDICATOR BAR */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-stone-600 text-[10px] font-mono">
        <span className="uppercase tracking-widest">VOL. 01 // HORIZONTAL GRID</span>
        <div className="flex items-center space-x-2">
          <span>CO-JOURNAL SCROLL CHRONICLES</span>
        </div>
        <span className="uppercase tracking-widest">ADVENTURE PRESERVED</span>
      </div>
    </div>
  );
}
