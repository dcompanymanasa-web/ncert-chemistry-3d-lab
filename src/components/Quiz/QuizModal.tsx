import React, { useState } from 'react';
import { NCERT_QUIZ_QUESTIONS, QuizQuestion } from '../../data/quizzes';
import { recordQuizScore } from '../../utils/storage';
import { labAudio } from '../../utils/audio';
import { X, CheckCircle, XCircle, Award, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  isOpen: boolean;
  activityNumber: string;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  activityNumber,
  onClose
}) => {
  const questions: QuizQuestion[] = NCERT_QUIZ_QUESTIONS.filter(
    q => q.activityNumber === activityNumber
  );

  // If no activity-specific questions, show all
  const activeQuestions = questions.length > 0 ? questions : NCERT_QUIZ_QUESTIONS.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  if (!isOpen) return null;

  const currentQ = activeQuestions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      labAudio.playSuccessChime();
      setScore(prev => prev + 1);
    } else {
      labAudio.playGlassClink();
    }
  };

  const handleNext = () => {
    labAudio.playClick();
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizComplete(true);
      recordQuizScore(activityNumber, score + (selectedOption === currentQ.correctIndex ? 0 : 0), activeQuestions.length);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }
    }
  };

  const handleRestart = () => {
    labAudio.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
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

        {!isQuizComplete ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                {activityNumber} Quiz
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-bold text-base md:text-lg mb-4 text-slate-100 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5 mb-5">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-200";

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-red-950/80 border-red-500 text-red-200 font-semibold";
                  } else {
                    btnStyle = "bg-slate-900/60 border-slate-800 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center border border-slate-600 font-mono text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && selectedOption === idx && idx !== currentQ.correctIndex && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-5 animate-fadeIn space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <BookOpen className="w-4 h-4" />
                  <span>NCERT Scientific Reference:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="text-[11px] text-slate-500 font-mono">
                  Ref: {currentQ.ncertReference}
                </div>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>{currentIndex + 1 === activeQuestions.length ? 'View Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* Quiz Results Summary */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Quiz Completed!
            </h3>
            <p className="text-sm text-slate-400">
              You scored <strong className="text-cyan-400 text-lg font-mono">{score}</strong> out of <strong className="text-slate-200">{activeQuestions.length}</strong>
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto">
              {score === activeQuestions.length ? (
                <span className="text-emerald-300 font-semibold">
                  🌟 Outstanding! You have mastered the NCERT concepts and observations for this experiment.
                </span>
              ) : score >= activeQuestions.length / 2 ? (
                <span className="text-cyan-300">
                  👍 Good effort! Review the experiment simulation and observations to get a perfect score.
                </span>
              ) : (
                <span className="text-amber-300">
                  💡 Keep exploring! Try running through the virtual laboratory procedure once more.
                </span>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={() => {
                  labAudio.playClick();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
