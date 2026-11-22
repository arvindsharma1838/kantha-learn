import { useState } from 'react';
import { EpicGuideView } from './components/EpicGuideView';
import { Header } from './components/Header';
import { ProgressView } from './components/ProgressView';
import { QuizView } from './components/QuizView';
import { StudyLibraryView } from './components/StudyLibraryView';
import {
  AppView,
  DifficultyLevel,
  EpicCategory,
  EpicSelection,
  UserProgress,
} from './types';
import {
  clearProgress,
  loadProgress,
  recordQuizResult,
  saveProgress,
} from './utils/storage';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('quiz');
  const [selectedEpic, setSelectedEpic] = useState<EpicSelection>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('Easy');
  const [libraryFilter, setLibraryFilter] = useState<EpicSelection>('All');
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [quickStartTrigger, setQuickStartTrigger] = useState<number>(0);

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickStartQuiz = () => {
    setActiveView('quiz');
    setQuickStartTrigger((n) => n + 1);
  };

  const handleQuizCompleted = (params: {
    epicSelection: EpicSelection;
    difficulty: DifficultyLevel;
    answers: { epic: EpicCategory; isCorrect: boolean }[];
  }) => {
    setProgress((prev) => recordQuizResult(prev, params));
  };

  const handleOpenLibraryEpic = (epic: EpicCategory) => {
    setLibraryFilter(epic);
    setActiveView('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizFromGuideOrLibrary = (epic: EpicCategory) => {
    setSelectedEpic(epic);
    setActiveView('quiz');
    setQuickStartTrigger((n) => n + 1);
  };

  const handleToggleLearned = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.learnedLessonIds.includes(lessonId);
      const learnedLessonIds = exists
        ? prev.learnedLessonIds.filter((id) => id !== lessonId)
        : [...prev.learnedLessonIds, lessonId];
      const next = { ...prev, learnedLessonIds };
      saveProgress(next);
      return next;
    });
  };

  const handleToggleMasteredFlashcard = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.masteredFlashcardIds.includes(lessonId);
      const masteredFlashcardIds = exists
        ? prev.masteredFlashcardIds.filter((id) => id !== lessonId)
        : [...prev.masteredFlashcardIds, lessonId];
      const next = { ...prev, masteredFlashcardIds };
      saveProgress(next);
      return next;
    });
  };

  const handleResetProgress = () => {
    setProgress(clearProgress());
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onQuickStartQuiz={handleQuickStartQuiz}
      />

      <main className="flex-1">
        {activeView === 'quiz' && (
          <QuizView
            selectedEpic={selectedEpic}
            selectedDifficulty={selectedDifficulty}
            onChangeEpic={setSelectedEpic}
            onChangeDifficulty={setSelectedDifficulty}
            onQuizCompleted={handleQuizCompleted}
            onOpenLibraryEpic={handleOpenLibraryEpic}
            externalStartTrigger={quickStartTrigger}
          />
        )}

        {activeView === 'library' && (
          <StudyLibraryView
            key={libraryFilter}
            initialFilter={libraryFilter}
            learnedLessonIds={progress.learnedLessonIds}
            masteredFlashcardIds={progress.masteredFlashcardIds}
            onToggleLearned={handleToggleLearned}
            onToggleMasteredFlashcard={handleToggleMasteredFlashcard}
            onQuizEpic={handleQuizFromGuideOrLibrary}
          />
        )}

        {activeView === 'guide' && (
          <EpicGuideView onQuizEpic={handleQuizFromGuideOrLibrary} />
        )}

        {activeView === 'progress' && (
          <ProgressView
            progress={progress}
            onResetProgress={handleResetProgress}
            onNavigateToQuiz={() => handleNavigate('quiz')}
            onNavigateToLibrary={() => {
              setLibraryFilter('All');
              handleNavigate('library');
            }}
          />
        )}
      </main>

      <footer className="border-t border-hairline mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <span className="font-serif text-sm text-ink">Katha Archive</span>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleNavigate('quiz')}
              className="hover:text-ink transition-colors"
            >
              Quiz Studio
            </button>
            <button
              type="button"
              onClick={() => {
                setLibraryFilter('All');
                handleNavigate('library');
              }}
              className="hover:text-ink transition-colors"
            >
              Study Library
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('guide')}
              className="hover:text-ink transition-colors"
            >
              Epic Guide
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('progress')}
              className="hover:text-ink transition-colors"
            >
              Progress
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
