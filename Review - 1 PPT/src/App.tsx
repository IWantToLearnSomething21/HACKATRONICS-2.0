import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Slide1Intro } from './components/Slide1Intro';
import { Slide2Problem } from './components/Slide2Problem';
import { Slide3Evaluation } from './components/Slide3Evaluation';
import { Slide4Data } from './components/Slide4Data';
import { Slide5Roadmap } from './components/Slide5Roadmap';
import { SpeakerNotesModal } from './components/SpeakerNotesModal';
import { TEAM_INFO } from './data/presentationData';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const totalSlides = 5;

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  }, []);

  const selectSlide = useCallback((index: number) => {
    if (index >= 1 && index <= totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const toggleNotes = useCallback(() => {
    setShowNotes(prev => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  // Keyboard navigation support for effortless live pitching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in an input
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === '1') selectSlide(1);
      else if (e.key === '2') selectSlide(2);
      else if (e.key === '3') selectSlide(3);
      else if (e.key === '4') selectSlide(4);
      else if (e.key === '5') selectSlide(5);
      else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        toggleNotes();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, selectSlide, toggleFullscreen, toggleNotes]);

  // Sync fullscreen state if user exits via Esc key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#050505] text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-black">
      {/* Top Navigation Bar */}
      <Header
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={selectSlide}
        onNextSlide={nextSlide}
        onPrevSlide={prevSlide}
        toggleNotes={toggleNotes}
        showNotes={showNotes}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      {/* Main Slide Deck Container - Exact Full Height Fits Without Page Scroll */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex flex-col justify-center overflow-hidden min-h-0">
        {currentSlide === 1 && <Slide1Intro onNext={nextSlide} />}
        {currentSlide === 2 && <Slide2Problem onNext={nextSlide} />}
        {currentSlide === 3 && <Slide3Evaluation onNext={nextSlide} />}
        {currentSlide === 4 && <Slide4Data onNext={nextSlide} />}
        {currentSlide === 5 && <Slide5Roadmap onRestart={() => selectSlide(1)} />}
      </main>

      {/* Presenter Speaker Notes Modal */}
      <SpeakerNotesModal
        currentSlide={currentSlide}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
      />
    </div>
  );
}
