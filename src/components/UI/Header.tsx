import React, { useState } from 'react';
import { NCERT_EXPERIMENTS } from '../../data/experiments';
import { GraphicsQuality } from '../../utils/storage';
import { labAudio } from '../../utils/audio';
import { 
  Volume2, 
  VolumeX, 
  Music, 
  Settings2, 
  Award, 
  HelpCircle, 
  ShieldAlert, 
  BookOpen, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentActivityNumber: string;
  onSelectActivity: (activityNumber: string) => void;
  isMolecularView: boolean;
  onToggleMolecularView: () => void;
  graphicsQuality: GraphicsQuality;
  onChangeGraphicsQuality: (quality: GraphicsQuality) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isAmbientActive: boolean;
  onToggleAmbient: () => void;
  onOpenQuiz: () => void;
  onOpenSafety: () => void;
  onOpenConcepts: () => void;
  onOpenProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentActivityNumber,
  onSelectActivity,
  isMolecularView,
  onToggleMolecularView,
  graphicsQuality,
  onChangeGraphicsQuality,
  isMuted,
  onToggleMute,
  isAmbientActive,
  onToggleAmbient,
  onOpenQuiz,
  onOpenSafety,
  onOpenConcepts,
  onOpenProgress
}) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-3 md:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Chapter Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/25">
              ⚗️
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm md:text-base text-slate-100 tracking-tight">
                  Chemora 3D
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  NCERT
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Class 10 • Chemical Reactions and Equations
              </div>
            </div>
          </div>
        </div>

        {/* Activity Selector Dropdown */}
        <div className="flex-1 max-w-xs md:max-w-md mx-2">
          <div className="relative">
            <select
              value={currentActivityNumber}
              onChange={e => {
                labAudio.playClick();
                onSelectActivity(e.target.value);
              }}
              className="w-full appearance-none bg-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer transition-all truncate"
            >
              {NCERT_EXPERIMENTS.map(exp => (
                <option key={exp.activityNumber} value={exp.activityNumber} className="bg-slate-900 text-slate-200">
                  {exp.activityNumber}: {exp.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Molecular View Switch */}
          <button
            onClick={() => {
              labAudio.playClick();
              onToggleMolecularView();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isMolecularView
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700'
            }`}
            title="Toggle between Lab Bench and 3D Molecular Chamber"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {isMolecularView ? 'Lab Bench' : 'Molecular 3D'}
            </span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => {
              labAudio.playClick();
              onOpenQuiz();
            }}
            className="p-2 md:px-3 md:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Take Activity Quiz"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Quiz</span>
          </button>

          {/* Concepts Drawer */}
          <button
            onClick={() => {
              labAudio.playClick();
              onOpenConcepts();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            title="Read Chapter 1 Concepts"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Progress / Mastery */}
          <button
            onClick={() => {
              labAudio.playClick();
              onOpenProgress();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            title="View Student Progress & Badges"
          >
            <Award className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Audio Controls */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            className={`p-2 rounded-xl border transition-colors ${
              isMuted
                ? 'bg-red-950/40 border-red-500/40 text-red-400'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Ambient Sound Toggle */}
          <button
            onClick={() => {
              onToggleAmbient();
            }}
            className={`p-2 rounded-xl border transition-colors hidden sm:block ${
              isAmbientActive
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-400'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={isAmbientActive ? 'Turn Off Ambient Lab Sound' : 'Turn On Ambient Lab Sound'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Graphics Quality Settings Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsDropdown(prev => !prev)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
              title="Graphics Quality Settings"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs animate-fadeIn">
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Graphics Settings
                </div>
                {(['low', 'medium', 'high', 'ultra'] as GraphicsQuality[]).map(q => (
                  <button
                    key={q}
                    onClick={() => {
                      labAudio.playClick();
                      onChangeGraphicsQuality(q);
                      setShowSettingsDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between capitalize ${
                      graphicsQuality === q
                        ? 'bg-cyan-950 text-cyan-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{q} Quality</span>
                    {graphicsQuality === q && <span className="text-cyan-400">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
