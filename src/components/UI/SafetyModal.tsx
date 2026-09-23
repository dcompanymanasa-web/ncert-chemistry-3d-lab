import React from 'react';
import { labAudio } from '../../utils/audio';
import { X, ShieldAlert, Eye, Wind, Skull, Flame } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activitySafetyNotes?: string[];
  activityTitle?: string;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({
  isOpen,
  onClose,
  activitySafetyNotes = [],
  activityTitle = "Laboratory Protocol"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100 max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            labAudio.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-100">
              NCERT Chemistry Lab Safety
            </h3>
            <p className="text-xs text-amber-300 font-medium">
              {activityTitle}
            </p>
          </div>
        </div>

        {/* Activity-Specific Safety Points */}
        {activitySafetyNotes.length > 0 && (
          <div className="mb-5 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️ Specific Activity Cautions:</span>
            </h4>
            <ul className="space-y-1.5">
              {activitySafetyNotes.map((note, idx) => (
                <li key={idx} className="text-xs text-slate-200 flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Standard NCERT Class 10 Safety Rules */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            General High School Chemistry Rules:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Eye Protection</strong>
                Always wear safety goggles. Never stare directly at burning magnesium.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Wind className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Toxic Fumes</strong>
                Never inhale gases directly. Waft fumes gently toward nose from distance.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Skull className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Heavy Metal Salts</strong>
                Lead and barium salts are toxic. Do not ingest; wash hands after contact.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Heating Glassware</strong>
                Never point test tube mouths toward yourself or peers while heating.
              </div>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              labAudio.playClick();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            I Understand Lab Safety
          </button>
        </div>
      </div>
    </div>
  );
};
