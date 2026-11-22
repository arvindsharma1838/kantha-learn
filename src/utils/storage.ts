import { DifficultyLevel, EpicCategory, EpicSelection, UserProgress } from '../types';

const STORAGE_KEY = 'katha_epics_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  quizzesTaken: 0,
  totalCorrect: 0,
  totalAttempted: 0,
  bestByDifficulty: {
    Easy: null,
    Medium: null,
    Hard: null,
  },
  byEpic: {
    Ramayana: { correct: 0, attempted: 0 },
    Mahabharata: { correct: 0, attempted: 0 },
    Puranas: { correct: 0, attempted: 0 },
  },
  learnedLessonIds: [],
  masteredFlashcardIds: [],
  recentAttempts: [],
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_PROGRESS);
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      quizzesTaken: parsed.quizzesTaken ?? 0,
      totalCorrect: parsed.totalCorrect ?? 0,
      totalAttempted: parsed.totalAttempted ?? 0,
      bestByDifficulty: {
        Easy: parsed.bestByDifficulty?.Easy ?? null,
        Medium: parsed.bestByDifficulty?.Medium ?? null,
        Hard: parsed.bestByDifficulty?.Hard ?? null,
      },
      byEpic: {
        Ramayana: parsed.byEpic?.Ramayana ?? { correct: 0, attempted: 0 },
        Mahabharata: parsed.byEpic?.Mahabharata ?? { correct: 0, attempted: 0 },
        Puranas: parsed.byEpic?.Puranas ?? { correct: 0, attempted: 0 },
      },
      learnedLessonIds: Array.isArray(parsed.learnedLessonIds) ? parsed.learnedLessonIds : [],
      masteredFlashcardIds: Array.isArray(parsed.masteredFlashcardIds) ? parsed.masteredFlashcardIds : [],
      recentAttempts: Array.isArray(parsed.recentAttempts) ? parsed.recentAttempts : [],
    };
  } catch {
    return structuredClone(DEFAULT_PROGRESS);
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function clearProgress(): UserProgress {
  const fresh = structuredClone(DEFAULT_PROGRESS);
  saveProgress(fresh);
  return fresh;
}

export function recordQuizResult(
  prev: UserProgress,
  params: {
    epicSelection: EpicSelection;
    difficulty: DifficultyLevel;
    answers: { epic: EpicCategory; isCorrect: boolean }[];
  }
): UserProgress {
  const total = params.answers.length;
  const correct = params.answers.filter((a) => a.isCorrect).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const nextByEpic = {
    Ramayana: { ...prev.byEpic.Ramayana },
    Mahabharata: { ...prev.byEpic.Mahabharata },
    Puranas: { ...prev.byEpic.Puranas },
  };

  for (const ans of params.answers) {
    nextByEpic[ans.epic].attempted += 1;
    if (ans.isCorrect) {
      nextByEpic[ans.epic].correct += 1;
    }
  }

  const prevBest = prev.bestByDifficulty[params.difficulty];
  const nextBest = prevBest === null ? percentage : Math.max(prevBest, percentage);

  const attemptRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    epic: params.epicSelection,
    difficulty: params.difficulty,
    score: correct,
    total,
    percentage,
  };

  const next: UserProgress = {
    ...prev,
    quizzesTaken: prev.quizzesTaken + 1,
    totalCorrect: prev.totalCorrect + correct,
    totalAttempted: prev.totalAttempted + total,
    bestByDifficulty: {
      ...prev.bestByDifficulty,
      [params.difficulty]: nextBest,
    },
    byEpic: nextByEpic,
    recentAttempts: [attemptRecord, ...prev.recentAttempts].slice(0, 12),
  };

  saveProgress(next);
  return next;
}
