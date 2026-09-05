import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SLIDES_DATA } from '../data/slidesData';
import { SlideTitle } from './slides/SlideTitle';
import { SlideProblem } from './slides/SlideProblem';
import { SlideSolution } from './slides/SlideSolution';
import { SlideTelemetryDemo } from './slides/SlideTelemetryDemo';
import { SlideEscalationDemo } from './slides/SlideEscalationDemo';
import { SlideMLFeatures } from './slides/SlideMLFeatures';
import { SlideDutyRoster } from './slides/SlideDutyRoster';
import { SlideLivesSavedScale } from './slides/SlideLivesSavedScale';
import { SlideTechStack } from './slides/SlideTechStack';

interface SlideDeckProps {
  currentSlideIndex: number;
  onNavigateToSlide: (index: number) => void;
}

export const SlideDeck: React.FC<SlideDeckProps> = ({
  currentSlideIndex,
  onNavigateToSlide
}) => {
  const currentSlide = SLIDES_DATA[currentSlideIndex];

  const renderSlideContent = () => {
    switch (currentSlide.slug) {
      case 'title':
        return <SlideTitle slide={currentSlide} onNavigateToDemo={() => onNavigateToSlide(3)} />;
      case 'the-problem':
        return <SlideProblem slide={currentSlide} />;
      case 'the-solution':
        return <SlideSolution slide={currentSlide} />;
      case 'telemetry-demo':
        return <SlideTelemetryDemo slide={currentSlide} />;
      case 'escalation-demo':
        return <SlideEscalationDemo slide={currentSlide} />;
      case 'ml-architecture':
        return <SlideMLFeatures slide={currentSlide} />;
      case 'duty-roster':
        return <SlideDutyRoster slide={currentSlide} />;
      case 'lives-saved-scale':
        return <SlideLivesSavedScale slide={currentSlide} onNavigateNext={() => onNavigateToSlide(8)} />;
      case 'tech-stack':
        return <SlideTechStack slide={currentSlide} />;
      default:
        return <SlideTitle slide={currentSlide} onNavigateToDemo={() => onNavigateToSlide(3)} />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full flex flex-col"
        >
          {renderSlideContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
