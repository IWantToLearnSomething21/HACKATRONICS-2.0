import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  BookOpen, Grid, Clock, MessageSquare, Sparkles, Activity
} from 'lucide-react';
import { SLIDES_DATA } from '../data/slidesData';

interface HeaderProps {
  currentSlideIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onJumpToSlide: (index: number) => void;
  isNotesOpen: boolean;
  onToggleNotes: () => void;
  isOverviewOpen: boolean;
  onToggleOverview: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  isPlaying: boolean;
  onToggleAutoplay: () => void;
}

// Short human-readable titles for the top pill navigation rail
const SLIDE_SHORT_TITLES: string[] = [
  '1. Intro & Overview',
  '2. Clinical Problem',
  '3. The Solution',
  '4. Telemetry 4Hz',
  '5. Escalation Matrix',
  '6. ML & Dataset',
  '7. Duty Roster',
  '8. Lives Saved & Scale',
  '9. Tech Stack'
];

export const Header: React.FC<HeaderProps> = ({
  currentSlideIndex,
  totalSlides,
  onNext,
  onPrev,
  onJumpToSlide,
  isNotesOpen,
  onToggleNotes,
  isOverviewOpen,
  onToggleOverview,
  isFullscreen,
  onToggleFullscreen,
  isPlaying,
  onToggleAutoplay
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Automatically smoothly scroll the active slide pill into center view whenever slide changes
  useEffect(() => {
    const activeBtn = buttonRefs.current[currentSlideIndex];
    if (activeBtn && scrollContainerRef.current) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950 px-3 sm:px-4 flex items-center justify-between select-none z-40 relative gap-2 sm:gap-4">
      {/* Brand & Edition Info (Matches Cube X / Hammacher HC-01 Header) */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Glowing Teal/Cyan Brand Icon with dot */}
        <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/20 text-slate-950 font-black text-base font-display">
          <span>X</span>
          {/* Top-Right Glowing Dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 shadow-sm shadow-emerald-400 animate-pulse" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-white text-sm tracking-tight font-display">
              Cube X
            </span>
            <span className="px-1.5 py-0.2 rounded-md border border-teal-500/40 bg-teal-950/80 text-teal-300 font-mono text-[10px] font-bold">
              HC-01
            </span>
            <span className="text-slate-400 text-xs hidden 2xl:inline">
              | HACKTRONICS 2nd Edition
            </span>
          </div>
          <span className="text-[11px] text-teal-400/80 font-mono tracking-tight truncate max-w-[170px] sm:max-w-xs">
            Fetal Distress Detection from CTG Signals
          </span>
        </div>
      </div>

      {/* Center Slide Pill Navigation Rail - Smoothly Animated & Auto-Centering */}
      <div className="flex items-center flex-1 max-w-4xl justify-center relative min-w-0 px-1 sm:px-2">
        {/* Left Gradient Fade for overflow visual hint */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10 hidden sm:block" />

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-full p-1 shadow-inner backdrop-blur-md overflow-x-auto scrollbar-none w-full max-w-fit scroll-smooth"
        >
          {SLIDES_DATA.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;
            const shortTitle = SLIDE_SHORT_TITLES[idx] || `${idx + 1}. Slide`;

            return (
              <button
                key={slide.id}
                ref={(el) => (buttonRefs.current[idx] = el)}
                onClick={() => onJumpToSlide(idx)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 z-0 ${
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={`Slide ${idx + 1}: ${slide.title}`}
              >
                {/* Fluid Gliding Active Pill Motion Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeSlideGlider"
                    className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 rounded-full shadow-md shadow-teal-500/30 z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse shrink-0" />
                )}
                <span className="tracking-tight">{shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Right Gradient Fade for overflow visual hint */}
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10 hidden sm:block" />
      </div>

      {/* Right Controls Container */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Presentation Timer with Live / Standby badge */}
        <button
          id="timer-reset-btn"
          onClick={() => setIsTimerRunning(!isTimerRunning)}
          className="items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 hidden xl:flex hover:bg-slate-800 transition-colors"
          title="Click to toggle timer"
        >
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-bold text-slate-200">{formatTime(elapsedSeconds)}</span>
          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
            isTimerRunning ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
          }`}>
            {isTimerRunning ? 'LIVE' : 'STANDBY'}
          </span>
        </button>

        {/* Speaker Notes Button */}
        <button
          id="speaker-notes-toggle-btn"
          onClick={onToggleNotes}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
            isNotesOpen 
              ? 'bg-teal-400 text-slate-950 border-teal-300 shadow-md font-bold' 
              : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border-slate-800'
          }`}
          title="Speaker Notes & Teleprompter (N)"
        >
          <MessageSquare className={`w-3.5 h-3.5 ${isNotesOpen ? 'text-slate-950' : 'text-teal-400'}`} />
          <span className="hidden sm:inline">Notes</span>
        </button>

        {/* Slide Counter with Chevrons (< 1/11 >) */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
          <button
            id="prev-slide-btn"
            onClick={onPrev}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-25 disabled:pointer-events-none transition-colors"
            title="Previous Slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="px-2 text-xs font-mono font-bold text-slate-200">
            <span className="text-teal-400">{currentSlideIndex + 1}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{totalSlides}</span>
          </span>

          <button
            id="next-slide-btn"
            onClick={onNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-25 disabled:pointer-events-none transition-colors"
            title="Next Slide"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Overview Grid Button */}
        <button
          id="overview-grid-toggle-btn"
          onClick={onToggleOverview}
          className={`p-2 rounded-xl transition-colors border ${
            isOverviewOpen 
              ? 'bg-teal-400 text-slate-950 border-teal-300 font-semibold' 
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
          }`}
          title="Slide Overview Grid (G)"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          id="fullscreen-toggle-btn"
          onClick={onToggleFullscreen}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};

