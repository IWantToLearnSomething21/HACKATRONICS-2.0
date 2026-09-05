import React, { useState, useEffect } from 'react';
import { 
  X, Volume2, VolumeX, Sparkles, CheckCircle2, 
  Stethoscope, Briefcase, Eye, Clock, MessageSquareQuote, Play, Pause
} from 'lucide-react';
import { SlideData } from '../types';

interface SpeakerNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slide: SlideData;
  slideNumber: number;
  totalSlides: number;
}

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  isOpen,
  onClose,
  slide,
  slideNumber,
  totalSlides
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Stop speech if slide changes
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [slide.id]);

  const toggleSpeech = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${slide.title}. ${slide.speakerNotes.overview}. Key points: ${slide.speakerNotes.talkingPoints.join('. ')}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const togglePointCheck = (index: number) => {
    const key = `${slide.id}-${index}`;
    setCheckedPoints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen) return null;

  return (
    <aside className="w-full md:w-96 lg:w-[420px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/80 flex flex-col h-full z-30 shadow-2xl transition-all duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <MessageSquareQuote className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 font-display">
              Speaker Notes & Teleprompter
            </h3>
            <p className="text-[11px] text-slate-400">
              Slide {slideNumber} of {totalSlides} • Est. {slide.speakerNotes.estimatedSeconds}s
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="tts-read-aloud-btn"
            onClick={toggleSpeech}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
              isSpeaking 
                ? 'bg-amber-500 text-slate-950 animate-pulse' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title={isSpeaking ? 'Stop Audio Read-Aloud' : 'Read Speaker Notes Aloud (TTS)'}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-400" />}
            <span className="text-[11px]">{isSpeaking ? 'Stop' : 'Rehearse'}</span>
          </button>
          
          <button
            id="close-speaker-notes-btn"
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
        {/* Slide Visual Concept Card */}
        <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-teal-400 font-semibold mb-1.5 text-[11px]">
            <Eye className="w-3.5 h-3.5" />
            <span>Slide Visual Concept & Stage Direction</span>
          </div>
          <p className="text-slate-300 italic text-[11px]">
            "{slide.visualConcept}"
          </p>
        </div>

        {/* Narrative Overview */}
        <div className="p-3 rounded-lg bg-teal-950/20 border border-teal-800/40">
          <h4 className="text-teal-300 font-semibold mb-1.5 flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Opening Narrative / Hook</span>
          </h4>
          <p className="text-slate-200 text-xs leading-normal">
            {slide.speakerNotes.overview}
          </p>
        </div>

        {/* Talking Points Interactive Checklist */}
        <div className="space-y-2">
          <h4 className="text-slate-200 font-semibold text-xs flex items-center justify-between">
            <span>Essential Talking Points</span>
            <span className="text-[10px] text-slate-400 font-normal">Click to mark covered</span>
          </h4>
          <div className="space-y-2">
            {slide.speakerNotes.talkingPoints.map((point, idx) => {
              const isChecked = !!checkedPoints[`${slide.id}-${idx}`];
              return (
                <div
                  key={idx}
                  onClick={() => togglePointCheck(idx)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2 ${
                    isChecked 
                      ? 'bg-teal-950/40 border-teal-700/60 text-teal-200 line-through opacity-75' 
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isChecked ? 'text-teal-400' : 'text-slate-500'}`} />
                  <span className="text-xs leading-snug">{point}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clinical Deep Dive Callout */}
        <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-800/40">
          <div className="flex items-center gap-1.5 text-sky-400 font-semibold mb-1 text-[11px]">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical & Physiological Context</span>
          </div>
          <p className="text-sky-100/90 text-xs">
            {slide.speakerNotes.clinicalContext}
          </p>
        </div>

        {/* Stakeholder / Investor Focus */}
        <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-800/40">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1 text-[11px]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Hospital Leadership & Investor Focus</span>
          </div>
          <p className="text-indigo-100/90 text-xs">
            {slide.speakerNotes.stakeholderFocus}
          </p>
        </div>
      </div>

      {/* Footer / Quick Keyboard Cheat */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Keyboard: ←/→ to navigate • F for fullscreen</span>
        <div className="flex items-center gap-1 text-slate-300">
          <Clock className="w-3 h-3 text-teal-400" />
          <span>{slide.speakerNotes.estimatedSeconds}s cue</span>
        </div>
      </div>
    </aside>
  );
};
