export type GraphicsQuality = 'low' | 'medium' | 'high' | 'ultra';

export interface UserProgress {
  completedExperiments: string[]; // e.g. ["Activity 1.1", "Activity 1.2"]
  completedBalancing: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  lastExperiment: string;
  graphicsQuality: GraphicsQuality;
  isMuted: boolean;
  isAmbientActive: boolean;
  badges: string[];
}

const STORAGE_KEY = 'ncert_chemistry_3d_lab_progress';

const defaultProgress: UserProgress = {
  completedExperiments: [],
  completedBalancing: [],
  quizScores: {},
  lastExperiment: 'Activity 1.1',
  graphicsQuality: 'high',
  isMuted: false,
  isAmbientActive: false,
  badges: []
};

export const getStoredProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
};

export const saveProgress = (progress: Partial<UserProgress>): UserProgress => {
  try {
    const current = getStoredProgress();
    const updated = { ...current, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return { ...defaultProgress, ...progress };
  }
};

export const markExperimentComplete = (activityNumber: string) => {
  const current = getStoredProgress();
  if (!current.completedExperiments.includes(activityNumber)) {
    const completed = [...current.completedExperiments, activityNumber];
    const badges = [...current.badges];
    if (completed.length === 1 && !badges.includes('first_step')) {
      badges.push('first_step');
    }
    if (completed.length === 11 && !badges.includes('master_of_reactions')) {
      badges.push('master_of_reactions');
    }
    saveProgress({ completedExperiments: completed, badges });
  }
};

export const markBalancingComplete = (activityNumber: string) => {
  const current = getStoredProgress();
  if (!current.completedBalancing.includes(activityNumber)) {
    const completedBalancing = [...current.completedBalancing, activityNumber];
    const badges = [...current.badges];
    if (completedBalancing.length >= 5 && !badges.includes('stoichiometry_scholar')) {
      badges.push('stoichiometry_scholar');
    }
    saveProgress({ completedBalancing, badges });
  }
};

export const recordQuizScore = (activityNumber: string, score: number, total: number) => {
  const current = getStoredProgress();
  const quizScores = {
    ...current.quizScores,
    [activityNumber]: {
      score,
      total,
      date: new Date().toISOString()
    }
  };
  const badges = [...current.badges];
  if (score === total && !badges.includes('perfect_chemist')) {
    badges.push('perfect_chemist');
  }
  saveProgress({ quizScores, badges });
};
