import React, { useState, useEffect, useRef } from 'react';
import { NCERT_EXPERIMENTS, NCERTExperiment } from './data/experiments';
import { 
  getStoredProgress, 
  saveProgress, 
  markExperimentComplete, 
  GraphicsQuality 
} from './utils/storage';
import { labAudio } from './utils/audio';

// Components
import { Header } from './components/UI/Header';
import { LabScene } from './components/Laboratory/LabScene';
import { ProcedureGuide } from './components/ExperimentSimulation/ProcedureGuide';
import { ObservationPanel } from './components/ExperimentSimulation/ObservationPanel';
import { EquationBalancer } from './components/Equation/EquationBalancer';
import { QuizModal } from './components/Quiz/QuizModal';
import { SafetyModal } from './components/UI/SafetyModal';
import { ConceptDrawer } from './components/UI/ConceptDrawer';
import { ProgressDrawer } from './components/Progress/ProgressDrawer';

// Icons
import { 
  FlaskConical, 
  Beaker, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ShieldAlert,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export default function App() {
  const initialProgress = getStoredProgress();

  const [currentActivityNumber, setCurrentActivityNumber] = useState<string>(
    initialProgress.lastExperiment || 'Activity 1.1'
  );
  const [simulationStep, setSimulationStep] = useState<number>(1);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [reactionProgress, setReactionProgress] = useState<number>(0.0);
  const [isMolecularView, setIsMolecularView] = useState<boolean>(false);
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(
    initialProgress.graphicsQuality || 'high'
  );
  const [isMuted, setIsMuted] = useState<boolean>(initialProgress.isMuted || false);
  const [isAmbientActive, setIsAmbientActive] = useState<boolean>(false);

  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState<boolean>(false);
  const [isConceptsOpen, setIsConceptsOpen] = useState<boolean>(false);
  const [isProgressOpen, setIsProgressOpen] = useState<boolean>(false);

  // Current active experiment
  const currentExperiment: NCERTExperiment = 
    NCERT_EXPERIMENTS.find(e => e.activityNumber === currentActivityNumber) || NCERT_EXPERIMENTS[0];

  const reactionAnimRef = useRef<number | null>(null);

  // Save current experiment to storage
  useEffect(() => {
    saveProgress({ lastExperiment: currentActivityNumber });
  }, [currentActivityNumber]);

  // Handle activity change
  const handleSelectActivity = (activityNumber: string) => {
    if (reactionAnimRef.current) {
      cancelAnimationFrame(reactionAnimRef.current);
    }
    setCurrentActivityNumber(activityNumber);
    setSimulationStep(1);
    setIsReacting(false);
    setReactionProgress(0.0);
  };

  // Step Controls
  const handleNextStep = () => {
    if (simulationStep < currentExperiment.simulationSteps.length) {
      setSimulationStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (simulationStep > 1) {
      setSimulationStep(prev => prev - 1);
    }
  };

  const handleResetSimulation = () => {
    if (reactionAnimRef.current) {
      cancelAnimationFrame(reactionAnimRef.current);
    }
    setSimulationStep(1);
    setIsReacting(false);
    setReactionProgress(0.0);
  };

  // Trigger Action / Reaction Execution
  const handleTriggerReaction = () => {
    if (isReacting) return;

    // Trigger step action audio based on experiment type
    switch (currentExperiment.realLabHighlights.soundEffect) {
      case 'combustion':
        labAudio.playCombustion(3.0);
        break;
      case 'precipitate':
        labAudio.playLiquidPour(1.5);
        setTimeout(() => labAudio.playGlassClink(), 800);
        break;
      case 'bubbling':
        labAudio.playBubbling(2.5);
        if (simulationStep === 3) {
          setTimeout(() => labAudio.playHydrogenPop(), 2200);
        }
        break;
      case 'boiling_hiss':
        labAudio.playSteamHiss(2.2);
        break;
      case 'crackling':
        labAudio.playBurnerHiss(2.5);
        break;
      case 'fumes':
        labAudio.playBurnerHiss(2.5);
        break;
      case 'pop_and_glow':
        labAudio.playBubbling(2.0);
        if (simulationStep === 3) {
          setTimeout(() => labAudio.playHydrogenPop(), 1800);
        }
        break;
      default:
        labAudio.playGlassClink();
        break;
    }

    setIsReacting(true);
    let startTime: number | null = null;
    const duration = 2800; // ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      setReactionProgress(progress);

      if (progress < 1.0) {
        reactionAnimRef.current = requestAnimationFrame(animate);
      } else {
        setIsReacting(false);
        markExperimentComplete(currentExperiment.activityNumber);
        labAudio.playSuccessChime();
        if (simulationStep < currentExperiment.simulationSteps.length) {
          setSimulationStep(prev => prev + 1);
        }
      }
    };

    reactionAnimRef.current = requestAnimationFrame(animate);
  };

  // Audio Toggles
  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    labAudio.setMuted(newMuted);
    saveProgress({ isMuted: newMuted });
  };

  const handleToggleAmbient = () => {
    const active = labAudio.toggleAmbientLab();
    setIsAmbientActive(active);
  };

  const handleChangeGraphicsQuality = (quality: GraphicsQuality) => {
    setGraphicsQuality(quality);
    saveProgress({ graphicsQuality: quality });
  };

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation Header */}
      <Header
        currentActivityNumber={currentActivityNumber}
        onSelectActivity={handleSelectActivity}
        isMolecularView={isMolecularView}
        onToggleMolecularView={() => setIsMolecularView(prev => !prev)}
        graphicsQuality={graphicsQuality}
        onChangeGraphicsQuality={handleChangeGraphicsQuality}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isAmbientActive={isAmbientActive}
        onToggleAmbient={handleToggleAmbient}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenConcepts={() => setIsConceptsOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
      />

      {/* Main Virtual Laboratory Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-6 space-y-6">
        {/* Activity Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40 p-4 md:p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {currentExperiment.activityNumber}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentExperiment.ncertReference}
              </span>
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-slate-100 tracking-tight">
              {currentExperiment.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSafetyOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Lab Safety</span>
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>

        {/* 3D Virtual Scene & Interactive Laboratory Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center Stage: Realistic 3D Virtual Laboratory Canvas */}
          <div className="lg:col-span-8 space-y-4">
            <LabScene
              experiment={currentExperiment}
              simulationStep={simulationStep}
              isMolecularView={isMolecularView}
              graphicsQuality={graphicsQuality}
              isReacting={isReacting}
              reactionProgress={reactionProgress}
            />

            {/* Reagents & Products Physical Form Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Reactants Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Beaker className="w-4 h-4 text-cyan-400" />
                  <span>Verified Reactants:</span>
                </h4>
                <div className="space-y-2">
                  {currentExperiment.chemicals.reactants.map((r, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-slate-200 font-semibold">{r.name}</strong>
                        <span className="font-mono text-cyan-300 font-bold bg-cyan-950/80 px-1.5 py-0.5 rounded text-[11px]">
                          {r.formula}({r.state})
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Products Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-emerald-400" />
                  <span>Verified Products:</span>
                </h4>
                <div className="space-y-2">
                  {currentExperiment.chemicals.products.map((p, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-slate-200 font-semibold">{p.name}</strong>
                        <span className="font-mono text-emerald-300 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded text-[11px]">
                          {p.formula}({p.state})
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Stage: Interactive Procedure Guide & Live Scientific Telemetry */}
          <div className="lg:col-span-4 space-y-5">
            {/* Step-by-Step Interactive Guide */}
            <ProcedureGuide
              experiment={currentExperiment}
              currentStep={simulationStep}
              totalSteps={currentExperiment.simulationSteps.length}
              isReacting={isReacting}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onReset={handleResetSimulation}
              onTriggerReaction={handleTriggerReaction}
              onOpenSafety={() => setIsSafetyOpen(true)}
            />

            {/* Scientific Observation & Telemetry Panel */}
            <ObservationPanel
              experiment={currentExperiment}
              reactionProgress={reactionProgress}
              isReacting={isReacting}
            />
          </div>
        </div>

        {/* Interactive Equation Balancing Module */}
        <section className="pt-2">
          <EquationBalancer
            task={currentExperiment.balancingChallenge}
            activityNumber={currentExperiment.activityNumber}
          />
        </section>

        {/* Apparatus List Summary Footer */}
        <section className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Apparatus Required:</span>
            <span>{currentExperiment.apparatus.join(' • ')}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
            <span>Official NCERT Chapter 1 Source Verified</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>Chemora 3D — Class 10 CBSE / NCERT Science Virtual Chemistry Laboratory</span>
          <span>Aligned with NCERT Textbook (jesc1ps.pdf)</span>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <QuizModal
        isOpen={isQuizOpen}
        activityNumber={currentActivityNumber}
        onClose={() => setIsQuizOpen(false)}
      />

      <SafetyModal
        isOpen={isSafetyOpen}
        activityTitle={currentExperiment.title}
        activitySafetyNotes={currentExperiment.safetyConsiderations}
        onClose={() => setIsSafetyOpen(false)}
      />

      <ConceptDrawer
        isOpen={isConceptsOpen}
        onClose={() => setIsConceptsOpen(false)}
      />

      <ProgressDrawer
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        onSelectActivity={handleSelectActivity}
      />
    </div>
  );
}
