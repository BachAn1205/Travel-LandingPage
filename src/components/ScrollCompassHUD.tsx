import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

interface Destination {
  id: string;
  name_vi: string;
  name_en: string;
  lat: string;
  lng: string;
  alt: string;
  bearing: number; // compass bearing in degrees
  sectionId: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "hero",
    name_vi: "Điểm Khởi Hành",
    name_en: "Departure Point",
    lat: "21°01'49\" N",
    lng: "105°51'25\" E",
    alt: "12M",
    bearing: 0,
    sectionId: "hero-section",
  },
  {
    id: "1",
    name_vi: "Positano, Ý",
    name_en: "Positano, Italy",
    lat: "40°37'47\" N",
    lng: "14°30'54\" E",
    alt: "72M",
    bearing: 305,
    sectionId: "timeline-section",
  },
  {
    id: "2",
    name_vi: "Dolomites, Áo",
    name_en: "Dolomites, Austria",
    lat: "46°30'36\" N",
    lng: "11°20'41\" E",
    alt: "1496M",
    bearing: 320,
    sectionId: "timeline-section",
  },
  {
    id: "3",
    name_vi: "Snæfellsnes, Iceland",
    name_en: "Snæfellsnes, Iceland",
    lat: "64°51'36\" N",
    lng: "23°46'19\" W",
    alt: "1446M",
    bearing: 340,
    sectionId: "timeline-section",
  },
  {
    id: "collab",
    name_vi: "Xưởng Ảnh",
    name_en: "Photo Studio",
    lat: "48°51'29\" N",
    lng: "02°21'03\" E",
    alt: "35M",
    bearing: 0,
    sectionId: "collab-section",
  },
];

export default function ScrollCompassHUD() {
  const { language } = useLanguage();
  const [scrollRatio, setScrollRatio] = useState(0);
  const [currentDest, setCurrentDest] = useState(DESTINATIONS[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docH > 0 ? scrollY / docH : 0;
      setScrollRatio(ratio);
      setIsVisible(scrollY > 80);

      // Determine destination based on scroll position
      if (ratio < 0.08) setCurrentDest(DESTINATIONS[0]);
      else if (ratio < 0.55) {
        const timelineProgress = (ratio - 0.08) / 0.47;
        const idx = Math.min(Math.floor(timelineProgress * 3), 2);
        setCurrentDest(DESTINATIONS[idx + 1]);
      } else {
        setCurrentDest(DESTINATIONS[4]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bearing = currentDest.bearing + scrollRatio * 15;
  const destName = language === "en" ? currentDest.name_en : currentDest.name_vi;

  return (
    <div
      className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6 pointer-events-none"
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', monospace" }}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Compass Rose */}
        <div className="relative w-14 h-14">
          {/* Outer ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="0.5"
              className="text-[var(--theme-border)]" strokeDasharray="2 4" />
            {/* Cardinal letters */}
            {[
              { label: "N", x: 28, y: 7 },
              { label: "E", x: 50, y: 30 },
              { label: "S", x: 28, y: 52 },
              { label: "W", x: 6, y: 30 },
            ].map(c => (
              <text key={c.label} x={c.x} y={c.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="5" fill="currentColor" className="text-[var(--theme-text-muted)] font-mono">
                {c.label}
              </text>
            ))}
            {/* Tick marks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const r1 = i % 9 === 0 ? 20 : 22;
              const r2 = 24;
              return (
                <line key={i}
                  x1={28 + r1 * Math.sin(angle)} y1={28 - r1 * Math.cos(angle)}
                  x2={28 + r2 * Math.sin(angle)} y2={28 - r2 * Math.cos(angle)}
                  stroke="currentColor" strokeWidth={i % 9 === 0 ? 1.5 : 0.5}
                  className="text-[var(--theme-border)]"
                />
              );
            })}
          </svg>

          {/* Needle */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `rotate(${bearing}deg)`, transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56">
              {/* North tip (red) */}
              <polygon points="28,10 25,28 31,28" fill="#c0392b" opacity="0.9" />
              {/* South tip (white/stone) */}
              <polygon points="28,46 25,28 31,28" fill="currentColor" className="text-stone-500" opacity="0.7" />
              {/* Center dot */}
              <circle cx="28" cy="28" r="2.5" fill="currentColor" className="text-[var(--theme-text)]" />
            </svg>
          </div>
        </div>

        {/* Coordinate readout */}
        <div className="bg-[var(--theme-overlay)] backdrop-blur-sm border border-[var(--theme-border)] rounded-md px-2.5 py-2 w-[72px] transition-colors duration-700">
          <div className="text-[7px] font-bold tracking-[0.2em] uppercase text-amber-500/80 mb-1.5 text-center">
            {language === "en" ? "COORDS" : "TỌA ĐỘ"}
          </div>
          <div className="space-y-0.5">
            <div className="text-[7px] text-[var(--theme-text)] font-mono leading-tight">{currentDest.lat}</div>
            <div className="text-[7px] text-[var(--theme-text)] font-mono leading-tight">{currentDest.lng}</div>
            <div className="text-[7px] text-[var(--theme-text-muted)] font-mono leading-tight border-t border-[var(--theme-border)] pt-0.5 mt-0.5">
              ALT {currentDest.alt}
            </div>
          </div>
        </div>

        {/* Destination name */}
        <div className="w-[72px] text-center">
          <div
            className="text-[7px] font-bold uppercase tracking-widest text-[var(--theme-text-muted)] leading-tight"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", height: "64px", overflow: "hidden" }}
          >
            {destName}
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="w-0.5 h-16 bg-[var(--theme-border)] rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 right-0 bg-amber-500 rounded-full transition-all duration-300"
            style={{ height: `${scrollRatio * 100}%` }}
          />
        </div>

        {/* Flight path dots */}
        <div className="flex flex-col items-center space-y-1">
          {DESTINATIONS.map((d, i) => (
            <div
              key={d.id}
              onClick={() => document.getElementById(d.sectionId)?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-pointer transition-all duration-300 hover:scale-150"
              title={language === "en" ? d.name_en : d.name_vi}
            >
              <div className={`rounded-full transition-all duration-500 ${
                d.id === currentDest.id
                  ? "w-2 h-2 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  : "w-1 h-1 bg-[var(--theme-border)]"
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
