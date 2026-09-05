import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  Activity,
  Award
} from 'lucide-react';
import { SlideId } from '../types';
import { TEAM_INFO } from '../data/presentationData';

interface HeaderProps {
  currentSlide: number;
  totalSlides: number;
  onSelectSlide: (slideIndex: number) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  toggleNotes: () => void;
  showNotes: boolean;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  totalSlides,
  onSelectSlide,
  onNextSlide,
  onPrevSlide,
  toggleNotes,
  showNotes,
  isFullscreen,
  toggleFullscreen
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  // Automatically hold timer at 00:00 on Slide 1 (Standby mode) and auto-run on Slide 2+
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && currentSlide > 1) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, currentSlide]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const slideNames = [
    '1. Intro & Overview',
    '2. The Clinical Problem',
    '3. Global Crisis & AI Impact',
    '4. CTG Data & Features',
    '5. Roadmap & Architecture'
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-6 py-3 flex items-center justify-between text-white transition-all">
      {/* Left: Team & Hackathon branding */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500 text-black font-extrabold font-mono text-sm shadow-md shadow-teal-500/20">
          X
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-300"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5 font-['Outfit']">
              {TEAM_INFO.teamName}
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-teal-400 border border-white/10 font-semibold tracking-wider">
                {TEAM_INFO.track}
              </span>
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 font-medium">| {TEAM_INFO.event}</span>
          </div>
          <p className="hidden md:block text-[11px] text-slate-400 truncate max-w-[280px]">
            {TEAM_INFO.trackTitle}
          </p>
        </div>
      </div>

      {/* Center: Slide Progress & Quick Jump Pills */}
      <nav className="hidden lg:flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
        {slideNames.map((name, idx) => {
          const isActive = currentSlide === idx + 1;
          return (
            <button
              key={idx}
              id={`slide-nav-btn-${idx + 1}`}
              onClick={() => onSelectSlide(idx + 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-teal-500 text-black shadow-md shadow-teal-500/30 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black animate-pulse' : 'bg-slate-500'}`}></span>
              {name}
            </button>
          );
        })}
      </nav>

      {/* Right: Pitch Timer, Presenter Notes & Navigation Controls */}
      <div className="flex items-center gap-2">
        {/* Presentation Stopwatch */}
        <button
          onClick={() => setTimerRunning(!timerRunning)}
          title={currentSlide === 1 ? 'Timer is on standby on Slide 1 and begins on Slide 2' : 'Click to pause/resume presentation timer'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
            currentSlide === 1 
              ? 'bg-white/5 border-white/10 text-slate-400' 
              : 'bg-white/5 border-teal-500/30 text-teal-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Clock className={`w-3.5 h-3.5 ${currentSlide === 1 ? 'text-slate-500' : 'text-teal-400 animate-pulse'}`} />
          <span className="font-semibold">
            {formatTime(secondsElapsed)}
          </span>
          {currentSlide === 1 && (
            <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
              Standby
            </span>
          )}
        </button>

        {/* Speaker Notes Toggle */}
        <button
          id="btn-speaker-notes-toggle"
          onClick={toggleNotes}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            showNotes
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-white/5 text-slate-300 border-white/10 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle Presenter Speaker Notes"
        >
          <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
          <span className="hidden sm:inline">Notes</span>
        </button>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
          <button
            id="btn-prev-slide"
            onClick={onPrevSlide}
            disabled={currentSlide === 1}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono px-1.5 text-slate-300 font-semibold">
            {currentSlide}/{totalSlides}
          </span>
          <button
            id="btn-next-slide"
            onClick={onNextSlide}
            disabled={currentSlide === totalSlides}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Slide (Right Arrow or Space)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          id="btn-fullscreen-toggle"
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors"
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
