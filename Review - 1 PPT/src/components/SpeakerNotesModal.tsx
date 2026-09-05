import React from 'react';
import { MessageSquare, X, CheckCircle, Lightbulb } from 'lucide-react';
import { SPEAKER_NOTES } from '../data/presentationData';

interface SpeakerNotesModalProps {
  currentSlide: number;
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  currentSlide,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const currentSlideKey = `slide-${currentSlide}`;
  const notes = SPEAKER_NOTES[currentSlideKey] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-5 text-white space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-['Outfit'] text-white">
                Presenter Notes • Slide {currentSlide} of 5
              </h3>
              <p className="text-[11px] font-mono text-teal-400">
                Team Cube X Pitch Guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notes list */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {notes.map((note, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{note}</span>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Keyboard shortcut: Press Space / Arrow Keys to advance</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
