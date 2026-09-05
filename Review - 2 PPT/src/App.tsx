import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_DATA } from './data/slidesData';
import { Header } from './components/Header';
import { SlideDeck } from './components/SlideDeck';
import { SpeakerNotesDrawer } from './components/SpeakerNotesDrawer';
import { OverviewGridModal } from './components/OverviewGridModal';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const totalSlides = SLIDES_DATA.length;

  const handleNext = useCallback(() => {
    setCurrentSlideIndex(prev => Math.min(totalSlides - 1, prev + 1));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleJumpToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  }, [totalSlides]);

  // Autoplay Slideshow Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlideIndex(prev => {
          if (prev >= totalSlides - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting when user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'n':
        case 'N':
        case 'p':
        case 'P':
          e.preventDefault();
          setIsNotesOpen(prev => !prev);
          break;
        case 'g':
        case 'G':
        case 'o':
        case 'O':
          e.preventDefault();
          setIsOverviewOpen(prev => !prev);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          setIsOverviewOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`w-screen h-screen flex flex-col select-none overflow-hidden ${
      themeMode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'
    }`}>
      {/* Top Header Controls */}
      <Header
        currentSlideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        onNext={handleNext}
        onPrev={handlePrev}
        onJumpToSlide={handleJumpToSlide}
        isNotesOpen={isNotesOpen}
        onToggleNotes={() => setIsNotesOpen(prev => !prev)}
        isOverviewOpen={isOverviewOpen}
        onToggleOverview={() => setIsOverviewOpen(prev => !prev)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        themeMode={themeMode}
        onToggleTheme={() => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
        isPlaying={isPlaying}
        onToggleAutoplay={() => setIsPlaying(prev => !prev)}
      />

      {/* Main Presentation Stage & Speaker Notes Drawer */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        <main className="flex-1 h-full relative overflow-hidden flex flex-col">
          <SlideDeck
            currentSlideIndex={currentSlideIndex}
            onNavigateToSlide={handleJumpToSlide}
          />
        </main>

        {/* Collapsible Speaker Notes Panel */}
        <SpeakerNotesDrawer
          isOpen={isNotesOpen}
          onClose={() => setIsNotesOpen(false)}
          slide={SLIDES_DATA[currentSlideIndex]}
          slideNumber={currentSlideIndex + 1}
          totalSlides={totalSlides}
        />
      </div>

      {/* Full Overview Grid Modal */}
      <OverviewGridModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={handleJumpToSlide}
      />
    </div>
  );
}
