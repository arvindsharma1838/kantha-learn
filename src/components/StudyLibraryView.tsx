import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookCheck,
  Check,
  RotateCw,
  Search,
} from 'lucide-react';
import { STUDY_LESSONS } from '../data/epicsData';
import { EpicCategory, EpicSelection, StudyLesson } from '../types';

interface StudyLibraryViewProps {
  initialFilter: EpicSelection;
  learnedLessonIds: string[];
  masteredFlashcardIds: string[];
  onToggleLearned: (lessonId: string) => void;
  onToggleMasteredFlashcard: (lessonId: string) => void;
  onQuizEpic: (epic: EpicCategory) => void;
}

type StudyMode = 'archive' | 'flashcards';

const FILTER_TABS: { id: EpicSelection; label: string }[] = [
  { id: 'All', label: 'All Traditions' },
  { id: 'Ramayana', label: 'Ramayana' },
  { id: 'Mahabharata', label: 'Mahabharata & Gita' },
  { id: 'Puranas', label: 'Puranas & Upanishads' },
];

export function StudyLibraryView({
  initialFilter,
  learnedLessonIds,
  masteredFlashcardIds,
  onToggleLearned,
  onToggleMasteredFlashcard,
  onQuizEpic,
}: StudyLibraryViewProps) {
  const [mode, setMode] = useState<StudyMode>('archive');
  const [categoryFilter, setCategoryFilter] = useState<EpicSelection>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLesson, setActiveLesson] = useState<StudyLesson | null>(null);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STUDY_LESSONS.filter((lesson) => {
      const matchEpic = categoryFilter === 'All' || lesson.epic === categoryFilter;
      const matchQuery =
        !q ||
        lesson.title.toLowerCase().includes(q) ||
        lesson.subtopic.toLowerCase().includes(q) ||
        lesson.leadParagraph.toLowerCase().includes(q) ||
        lesson.sanskritTerm.transliteration.toLowerCase().includes(q);
      return matchEpic && matchQuery;
    });
  }, [categoryFilter, searchQuery]);

  const safeFlashcardIndex =
    filteredLessons.length > 0 ? Math.min(flashcardIndex, filteredLessons.length - 1) : 0;
  const activeFlashcard = filteredLessons[safeFlashcardIndex];

  // Editorial Reader View for a selected lesson
  if (activeLesson) {
    const isLearned = learnedLessonIds.includes(activeLesson.id);
    return (
      <article className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        <button
          type="button"
          onClick={() => setActiveLesson(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Study Library</span>
        </button>

        <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted mb-3">
            <span>
              {activeLesson.epic} · {activeLesson.subtopic} · {activeLesson.readingMinutes} min read
            </span>
            {isLearned && (
              <span className="inline-flex items-center gap-1 font-semibold text-forest">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                Completed
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-semibold text-ink leading-tight mb-6">
            {activeLesson.title}
          </h1>

          <div className="bg-limestone border border-hairline rounded-lg px-5 py-4 mb-7 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <span className="font-serif text-lg font-semibold text-ink mr-2">
                {activeLesson.sanskritTerm.transliteration}
              </span>
              <span className="text-sm text-ink-muted">({activeLesson.sanskritTerm.term})</span>
            </div>
            <p className="text-sm text-ink">{activeLesson.sanskritTerm.meaning}</p>
          </div>

          <div className="max-w-2xl space-y-5 text-base text-ink leading-[1.75]">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-vermilion">
              {activeLesson.leadParagraph}
            </p>

            <ul className="space-y-3 pt-2">
              {activeLesson.details.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[15px] text-ink-muted leading-relaxed">
                  <span className="font-mono text-xs text-vermilion mt-1 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-8 py-5 border-y border-hairline">
            <p className="font-serif italic text-lg sm:text-xl text-ink leading-relaxed">
              {activeLesson.keyTakeaway}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onToggleLearned(activeLesson.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                isLearned
                  ? 'border-forest bg-emerald-50/70 text-forest'
                  : 'border-ink text-ink hover:bg-limestone'
              }`}
            >
              <BookCheck className="w-4 h-4" aria-hidden="true" />
              <span>{isLearned ? 'Marked as Learned' : 'Mark as Learned'}</span>
            </button>

            <button
              type="button"
              onClick={() => onQuizEpic(activeLesson.epic)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Test Yourself on {activeLesson.epic}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-hairline">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-2">
            Grantha · Guided Learning Archive
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink mb-2">
            Study the Epics Before You Test
          </h1>
          <p className="text-sm sm:text-base text-ink-muted max-w-2xl">
            Read structured monographs on the Ramayana, Mahabharata, Bhagavad Gita, and Puranas,
            or switch to Flashcard Drill to practice active recall.
          </p>
        </div>

        {/* Workspace Mode Toggle */}
        <div
          role="tablist"
          aria-label="Study mode"
          className="inline-flex items-center gap-1 p-1 bg-limestone border border-hairline rounded-lg self-start shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'archive'}
            onClick={() => setMode('archive')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              mode === 'archive'
                ? 'bg-surface text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Reading Archive
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'flashcards'}
            onClick={() => {
              setMode('flashcards');
              setIsCardFlipped(false);
            }}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              mode === 'flashcards'
                ? 'bg-surface text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Flashcard Drill
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTER_TABS.map((tab) => {
            const active = categoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setCategoryFilter(tab.id);
                  setFlashcardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                  active
                    ? 'border-vermilion bg-limestone text-ink'
                    : 'border-hairline bg-surface text-ink-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-80">
          <Search
            className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFlashcardIndex(0);
              setIsCardFlipped(false);
            }}
            placeholder="Search concepts, Sanskrit terms, heroes..."
            aria-label="Search study lessons"
            className="w-full pl-10 pr-4 py-2 text-sm bg-surface border border-hairline rounded-lg text-ink placeholder:text-ink-muted focus:border-vermilion focus:outline-none"
          />
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="bg-surface border border-hairline rounded-xl p-10 text-center">
          <p className="font-serif text-lg text-ink mb-2">No matching study modules found</p>
          <p className="text-sm text-ink-muted mb-4">
            Try clearing your search filter or switching to All Traditions.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('All');
            }}
            className="px-4 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-limestone transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : mode === 'archive' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const isLearned = learnedLessonIds.includes(lesson.id);
            return (
              <article
                key={lesson.id}
                className="bg-surface border border-hairline rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-ink-muted mb-2.5">
                    <span>
                      {lesson.epic} · {lesson.readingMinutes} min read
                    </span>
                    {isLearned && (
                      <span className="inline-flex items-center gap-1 font-semibold text-forest">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        Learned
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-xl font-semibold text-ink leading-snug mb-2">
                    {lesson.title}
                  </h2>

                  <p className="text-xs font-medium text-vermilion mb-3">
                    {lesson.sanskritTerm.transliteration} · {lesson.subtopic}
                  </p>

                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
                    {lesson.leadParagraph}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-hairline">
                  <button
                    type="button"
                    onClick={() => onToggleLearned(lesson.id)}
                    className={`text-xs font-medium transition-colors whitespace-nowrap ${
                      isLearned
                        ? 'text-forest hover:text-ink'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {isLearned ? 'Completed' : 'Mark Learned'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLesson(lesson)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-ink border border-hairline hover:bg-limestone rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Read Module</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* FLASHCARD DRILL MODE */
        activeFlashcard && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-xs text-ink-muted">
              <span>
                {activeFlashcard.epic} · {activeFlashcard.subtopic}
              </span>
              <span className="font-mono tabular-nums">
                Card {String(safeFlashcardIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredLessons.length).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCardFlipped((prev) => !prev)}
              className="w-full text-left bg-surface border border-hairline hover:border-ink/40 rounded-xl p-8 sm:p-10 min-h-[260px] flex flex-col justify-between transition-colors duration-150"
            >
              <div className="flex items-center justify-between gap-2 text-xs font-medium text-ink-muted">
                <span>{isCardFlipped ? 'Answer & Context' : 'Recall Prompt'}</span>
                <span className="inline-flex items-center gap-1.5 text-vermilion">
                  <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                  Click to flip
                </span>
              </div>

              <div className="my-6">
                {!isCardFlipped ? (
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink leading-snug">
                    {activeFlashcard.flashcardPrompt}
                  </h2>
                ) : (
                  <div className="space-y-3">
                    <p className="font-serif text-xl sm:text-2xl font-semibold text-vermilion leading-snug">
                      {activeFlashcard.flashcardAnswer}
                    </p>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      Key term: <strong className="text-ink">{activeFlashcard.sanskritTerm.transliteration}</strong> —{' '}
                      {activeFlashcard.sanskritTerm.meaning}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-xs text-ink-muted">
                Module: {activeFlashcard.title}
              </div>
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeFlashcardIndex === 0}
                  onClick={() => {
                    setFlashcardIndex((i) => Math.max(0, i - 1));
                    setIsCardFlipped(false);
                  }}
                  className="px-3.5 py-2 text-xs font-medium border border-hairline bg-surface rounded-lg hover:bg-limestone disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={safeFlashcardIndex >= filteredLessons.length - 1}
                  onClick={() => {
                    setFlashcardIndex((i) => Math.min(filteredLessons.length - 1, i + 1));
                    setIsCardFlipped(false);
                  }}
                  className="px-3.5 py-2 text-xs font-medium border border-hairline bg-surface rounded-lg hover:bg-limestone disabled:opacity-40 transition-colors"
                >
                  Next Card
                </button>
              </div>

              <button
                type="button"
                onClick={() => onToggleMasteredFlashcard(activeFlashcard.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                  masteredFlashcardIds.includes(activeFlashcard.id)
                    ? 'border-forest bg-emerald-50/70 text-forest'
                    : 'border-ink text-ink hover:bg-limestone'
                }`}
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {masteredFlashcardIds.includes(activeFlashcard.id)
                    ? 'Mastered'
                    : 'Mark as Mastered'}
                </span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
