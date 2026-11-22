export type EpicCategory = 'Ramayana' | 'Mahabharata' | 'Puranas';
export type EpicSelection = 'All' | EpicCategory;
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type AppView = 'quiz' | 'library' | 'guide' | 'progress';

export interface QuizQuestion {
  id: string;
  epic: EpicCategory;
  difficulty: DifficultyLevel;
  sourceRef: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface StudyLesson {
  id: string;
  epic: EpicCategory;
  subtopic: string;
  readingMinutes: number;
  title: string;
  sanskritTerm: {
    term: string;
    transliteration: string;
    meaning: string;
  };
  leadParagraph: string;
  details: string[];
  keyTakeaway: string;
  flashcardPrompt: string;
  flashcardAnswer: string;
}

export interface KandaStage {
  number: number;
  name: string;
  meaning: string;
  keyLocation: string;
  centralFigures: string;
  summary: string;
  lesson: string;
}

export interface ParvaGroup {
  phase: string;
  range: string;
  summary: string;
  parvas: {
    number: number;
    name: string;
    focus: string;
  }[];
}

export interface AvatarStage {
  order: number;
  name: string;
  form: string;
  yuga: string;
  purpose: string;
  significance: string;
}

export interface QuizAttemptRecord {
  id: string;
  timestamp: string;
  epic: EpicSelection;
  difficulty: DifficultyLevel;
  score: number;
  total: number;
  percentage: number;
}

export interface EpicAccuracyStat {
  correct: number;
  attempted: number;
}

export interface UserProgress {
  quizzesTaken: number;
  totalCorrect: number;
  totalAttempted: number;
  bestByDifficulty: Record<DifficultyLevel, number | null>;
  byEpic: Record<EpicCategory, EpicAccuracyStat>;
  learnedLessonIds: string[];
  masteredFlashcardIds: string[];
  recentAttempts: QuizAttemptRecord[];
}
