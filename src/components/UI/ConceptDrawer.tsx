import React, { useState } from 'react';
import { NCERT_CONCEPTS, ChapterConcept } from '../../data/concepts';
import { labAudio } from '../../utils/audio';
import { X, BookOpen, Search, CheckCircle, Lightbulb } from 'lucide-react';

interface ConceptDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConceptDrawer: React.FC<ConceptDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<ChapterConcept>(NCERT_CONCEPTS[0]);

  if (!isOpen) return null;

  const filteredConcepts = NCERT_CONCEPTS.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.keyPoints.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Drawer Header */}
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-slate-100">
                NCERT Class 10 Chemistry Concepts
              </h3>
              <p className="text-xs text-slate-400">
                Chapter 1: Chemical Reactions and Equations
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              labAudio.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout: Left Sidebar + Right Detail View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Concepts Navigation List */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 p-3 md:p-4 flex flex-col bg-slate-950/40">
            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredConcepts.map(c => {
                const isActive = selectedConcept.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      labAudio.playClick();
                      setSelectedConcept(c);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isActive
                        ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono mb-1">
                      <span>Section {c.section}</span>
                    </div>
                    <div className="font-semibold text-xs leading-snug line-clamp-2">
                      {c.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Concept Details */}
          <div className="flex-1 p-5 md:p-6 overflow-y-auto space-y-5 bg-slate-900/40">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                NCERT Class 10 Science • Section {selectedConcept.section}
              </div>
              <h2 className="text-xl font-bold text-slate-100">
                {selectedConcept.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                {selectedConcept.summary}
              </p>
            </div>

            {/* Key NCERT Points */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Fundamental Principles:</span>
              </h4>
              <ul className="space-y-2">
                {selectedConcept.keyPoints.map((pt, idx) => (
                  <li
                    key={idx}
                    className="text-xs md:text-sm text-slate-200 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Representative Chemical Equations */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Standard NCERT Reactions:</span>
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedConcept.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs"
                  >
                    <div className="text-emerald-300 font-bold text-sm mb-1">
                      {ex.equation}
                    </div>
                    <div className="text-slate-400 text-xs font-sans">
                      {ex.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Applications */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Everyday & Industrial Applications:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedConcept.realWorldApplications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700"
                  >
                    🌱 {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Textbook Citation Footer */}
            <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-3 font-mono">
              Citation: {selectedConcept.ncertTextbookReference}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
