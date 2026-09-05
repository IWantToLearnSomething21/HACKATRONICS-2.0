import React from 'react';
import { X, Layers, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { SLIDES_DATA } from '../data/slidesData';

interface OverviewGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const OverviewGridModal: React.FC<OverviewGridModalProps> = ({
  isOpen,
  onClose,
  currentSlideIndex,
  onSelectSlide
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex flex-col p-4 sm:p-8 overflow-hidden animate-in fade-in duration-200">
      {/* Modal Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-display">
              Pitch Deck Slide Navigator
            </h2>
            <p className="text-xs text-slate-400">
              {SLIDES_DATA.length} Comprehensive Presentation Slides • Click any thumbnail to jump
            </p>
          </div>
        </div>

        <button
          id="close-overview-grid-btn"
          onClick={onClose}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Grid of Slides */}
      <div className="flex-1 overflow-y-auto py-6 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SLIDES_DATA.map((slide, idx) => {
            const isCurrent = idx === currentSlideIndex;
            return (
              <div
                key={slide.id}
                id={`overview-slide-card-${idx}`}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`group relative rounded-xl border p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-800/90 border-teal-400 ring-2 ring-teal-500/40 shadow-xl shadow-teal-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-600 hover:bg-slate-850'
                }`}
              >
                {/* Header tag */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                      Slide {idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                      {slide.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-teal-300 transition-colors line-clamp-2 font-display mb-1">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Footer preview */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>~{slide.speakerNotes.estimatedSeconds}s</span>
                  </div>
                  {isCurrent && (
                    <span className="flex items-center gap-1 text-teal-400 font-medium">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
