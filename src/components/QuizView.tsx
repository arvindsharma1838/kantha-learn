import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  ARCHIVE_IMAGES,
  DIFFICULTY_META,
  EPIC_DESCRIPTIONS,
  QUIZ_QUESTIONS,
} from '../data/epicsData';
import {
  DifficultyLevel,
  EpicCategory,
  EpicSelection,
  QuizQuestion,
} from '../types';
import { ResilientImage } from './ResilientImage';

interface QuizAnswerRecord {
  question: QuizQuestion;
  chosenIndex: number;
  isCorrect: boolean;
}

interface QuizViewProps {
  selectedEpic: EpicSelection;
  selectedDifficulty: DifficultyLevel;
  onChangeEpic: (epic: EpicSelection) => void;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  onQuizCompleted: (params: {
    epicSelection: EpicSelection;
    difficulty: DifficultyLevel;
    answers: { epic: EpicCategory; isCorrect: boolean }[];
  }) => void;
  onOpenLibraryEpic: (epic: EpicCategory) => void;
  externalStartTrigger: number;
}

type QuizPhase = 'setup' | 'active' | 'results';

const EPIC_OPTIONS: { id: EpicSelection; label: string; note: string }[] = [
  { id: 'All', label: 'All Epics', note: 'Mixed Ramayana, Mahabharata & Puranas' },
  { id: 'Ramayana', label: 'Ramayana', note: '7 Kandas · Journey of Rama & Sita' },
  { id: 'Mahabharata', label: 'Mahabharata', note: '18 Parvas · Kurukshetra & Gita' },
  { id: 'Puranas', label: 'Puranas & Upanishads', note: 'Dashavatara, Rishis & Philosophy' },
];

const DIFFICULTIES: DifficultyLevel[] = ['Easy', 'Medium', 'Hard'];
const LENGTH_OPTIONS: { value: number; label: string }[] = [
  { value: 5, label: '5 Questions' },
  { value: 10, label: '10 Questions' },
  { value: 15, label: 'All Available' },
];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getScholarlyRank(pct: number): { title: string; summary: string } {
  if (pct >= 90) {
    return {
      title: 'Mahavidwan · Master of the Epics',
      summary: 'Exceptional recall of narrative lineages, scriptural terms, and philosophical context.',
    };
  }
  if (pct >= 70) {
    return {
      title: 'Vidwan · Learned Scholar',
      summary: 'Strong command across major episodes and subtle scriptural details.',
    };
  }
  if (pct >= 50) {
    return {
      title: 'Sadhaka · Dedicated Practitioner',
      summary: 'Solid foundation—revisit the missed lore cards or explore the Study Library.',
    };
  }
  return {
    title: 'Jijnasu · Curious Seeker',
    summary: 'Every epic begins with curiosity. Review the explanations below and try a study module.',
  };
}

export function QuizView({
  selectedEpic,
  selectedDifficulty,
  onChangeEpic,
  onChangeDifficulty,
  onQuizCompleted,
  onOpenLibraryEpic,
  externalStartTrigger,
}: QuizViewProps) {
  const [phase, setPhase] = useState<QuizPhase>('setup');
  const [questionLimit, setQuestionLimit] = useState<number>(10);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);
  const [isRetryMissedMode, setIsRetryMissedMode] = useState<boolean>(false);

  const filteredPool = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      const matchEpic = selectedEpic === 'All' || q.epic === selectedEpic;
      const matchDiff = q.difficulty === selectedDifficulty;
      return matchEpic && matchDiff;
    });
  }, [selectedEpic, selectedDifficulty]);

  const effectiveCount = Math.min(filteredPool.length, questionLimit);

  const beginSession = (customQuestions?: QuizQuestion[], retryMode = false) => {
    const pool = customQuestions ?? shuffleArray(filteredPool).slice(0, effectiveCount);
    if (pool.length === 0) return;
    setActiveQuestions(pool);
    setCurrentIndex(0);
    setChosenIndex(null);
    setAnswers([]);
    setIsRetryMissedMode(retryMode);
    setPhase('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (externalStartTrigger > 0) {
      beginSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalStartTrigger]);

  const currentQuestion = activeQuestions[currentIndex];
  const hasAnswered = chosenIndex !== null;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered || !currentQuestion) return;
    setChosenIndex(idx);
    const isCorrect = idx === currentQuestion.correctIndex;
    setAnswers((prev) => [
      ...prev,
      { question: currentQuestion, chosenIndex: idx, isCorrect },
    ]);
  };

  const handleNext = () => {
    if (!hasAnswered) return;
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setChosenIndex(null);
    } else {
      if (!isRetryMissedMode) {
        onQuizCompleted({
          epicSelection: selectedEpic,
          difficulty: selectedDifficulty,
          answers: answers.map((a) => ({
            epic: a.question.epic,
            isCorrect: a.isCorrect,
          })),
        });
      }
      setPhase('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard shortcuts during active quiz: 1-4 / A-D to choose, Enter to advance
  useEffect(() => {
    if (phase !== 'active') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (!hasAnswered) {
        if (key === '1' || key === 'a') handleSelectOption(0);
        else if (key === '2' || key === 'b') handleSelectOption(1);
        else if (key === '3' || key === 'c') handleSelectOption(2);
        else if (key === '4' || key === 'd') handleSelectOption(3);
      } else if (key === 'enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, hasAnswered, currentIndex, activeQuestions, answers]);

  if (phase === 'active' && currentQuestion) {
    const letters = ['A', 'B', 'C', 'D'];
    const scoreSoFar = answers.filter((a) => a.isCorrect).length;
    const progressPct = ((currentIndex + (hasAnswered ? 1 : 0)) / activeQuestions.length) * 100;

    return (
      <section aria-label="Active quiz" className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
            <span>{currentQuestion.epic}</span>
            <span aria-hidden="true">·</span>
            <span>{currentQuestion.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>{currentQuestion.sourceRef}</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-mono text-xs font-medium tabular-nums text-ink">
              Question {String(currentIndex + 1).padStart(2, '0')} / {String(activeQuestions.length).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs font-medium tabular-nums text-ink-muted">
              Score {scoreSoFar}
            </span>
            <button
              type="button"
              onClick={() => setPhase('setup')}
              className="text-xs font-medium text-ink-muted hover:text-ink underline underline-offset-4 transition-colors"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="w-full h-1.5 bg-limestone rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-vermilion transition-all duration-200 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-9">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink leading-snug mb-7">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((optionText, idx) => {
              const isSelected = chosenIndex === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let rowStyle =
                'border-hairline bg-surface hover:border-ink/40 hover:bg-paper text-ink';
              let letterStyle = 'bg-limestone text-ink';

              if (hasAnswered) {
                if (isCorrectOption) {
                  rowStyle = 'border-forest bg-emerald-50/70 text-ink';
                  letterStyle = 'bg-forest text-white';
                } else if (isSelected && !isCorrectOption) {
                  rowStyle = 'border-crimson bg-red-50/70 text-ink';
                  letterStyle = 'bg-crimson text-white';
                } else {
                  rowStyle = 'border-hairline bg-surface text-ink-muted opacity-70';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left px-4 py-3.5 min-h-[52px] border rounded-lg transition-colors duration-150 flex items-center justify-between gap-4 ${rowStyle}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-md font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${letterStyle}`}
                    >
                      {letters[idx]}
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-snug">
                      {optionText}
                    </span>
                  </div>

                  {hasAnswered && isCorrectOption && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest whitespace-nowrap shrink-0">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Correct
                    </span>
                  )}
                  {hasAnswered && isSelected && !isCorrectOption && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-crimson whitespace-nowrap shrink-0">
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                      Incorrect
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div className="bg-limestone border border-hairline rounded-lg p-5 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-vermilion" aria-hidden="true" />
                <span>Scriptural Context · {currentQuestion.sourceRef}</span>
              </div>
              <p className="text-sm sm:text-[15px] text-ink leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-hairline">
            <span className="text-xs text-ink-muted hidden sm:inline">
              {hasAnswered ? 'Press Enter to continue' : 'Tip: Press A–D or 1–4 to answer'}
            </span>
            <button
              type="button"
              disabled={!hasAnswered}
              onClick={handleNext}
              className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-vermilion text-white hover:bg-vermilion-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>
                {currentIndex + 1 === activeQuestions.length ? 'View Results' : 'Next Question'}
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (phase === 'results') {
    const total = answers.length;
    const score = answers.filter((a) => a.isCorrect).length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const rank = getScholarlyRank(pct);
    const missedQuestions = answers.filter((a) => !a.isCorrect).map((a) => a.question);

    return (
      <section aria-label="Quiz results" className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
        <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-9 mb-8">
          <div className="text-xs font-medium text-ink-muted mb-2">
            {isRetryMissedMode ? 'Targeted Review' : `${selectedEpic === 'All' ? 'All Epics' : selectedEpic} · ${selectedDifficulty} Mode`}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mb-2">
            {rank.title}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted max-w-xl mb-6">{rank.summary}</p>

          <div className="grid grid-cols-3 gap-4 py-5 border-y border-hairline mb-6">
            <div>
              <div className="text-xs text-ink-muted mb-1">Score</div>
              <div className="font-mono text-2xl font-semibold tabular-nums text-ink">
                {score} / {total}
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-muted mb-1">Accuracy</div>
              <div className="font-mono text-2xl font-semibold tabular-nums text-vermilion">
                {pct}%
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-muted mb-1">Missed</div>
              <div className="font-mono text-2xl font-semibold tabular-nums text-ink">
                {missedQuestions.length}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {missedQuestions.length > 0 && (
              <button
                type="button"
                onClick={() => beginSession(missedQuestions, true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-vermilion text-white hover:bg-vermilion-hover transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Practice {missedQuestions.length} Missed
              </button>
            )}
            <button
              type="button"
              onClick={() => beginSession()}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-ink text-ink hover:bg-limestone transition-colors whitespace-nowrap shrink-0"
            >
              Play New Round
            </button>
            <button
              type="button"
              onClick={() => setPhase('setup')}
              className="px-4 py-2.5 text-sm font-medium rounded-lg border border-hairline text-ink-muted hover:text-ink hover:bg-limestone transition-colors whitespace-nowrap shrink-0"
            >
              Change Topic or Mode
            </button>
          </div>
        </div>

        <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-8">
          <h3 className="font-serif text-xl font-semibold text-ink mb-4">
            Answer &amp; Lore Review
          </h3>
          <div className="divide-y divide-hairline">
            {answers.map((item, idx) => (
              <div key={item.question.id} className="py-5 first:pt-2 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-ink-muted">
                    {String(idx + 1).padStart(2, '0')} · {item.question.epic} · {item.question.sourceRef}
                  </span>
                  {item.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-crimson">
                      <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      Incorrect
                    </span>
                  )}
                </div>

                <p className="font-medium text-ink text-sm sm:text-base mb-2">
                  {item.question.question}
                </p>

                {!item.isCorrect && (
                  <p className="text-xs text-crimson mb-1">
                    Your answer: {item.question.options[item.chosenIndex]}
                  </p>
                )}
                <p className="text-xs font-semibold text-forest mb-2">
                  Correct answer: {item.question.options[item.question.correctIndex]}
                </p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {item.question.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // SETUP VIEW
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-12">
      {/* Editorial Split Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between py-2">
          <div>
            <p className="text-xs font-medium tracking-wider uppercase text-ink-muted mb-3">
              Itihasa &amp; Purana Knowledge Studio
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-ink leading-[1.14] mb-4 max-w-xl">
              Test your mastery of India’s timeless epics and learn the stories behind them.
            </h1>
            <p className="text-base text-ink-muted leading-relaxed max-w-prose mb-6">
              Challenge yourself across three progressive difficulty tiers—from foundational stories
              to deep Upanishadic and Puranic lore. Every question reveals verified context so you
              learn as you play.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => beginSession()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>Begin {selectedDifficulty} Quiz</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onOpenLibraryEpic(selectedEpic === 'All' ? 'Ramayana' : selectedEpic)}
              className="px-5 py-3 text-sm font-medium text-ink border border-hairline bg-surface hover:bg-limestone rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              Read Study Modules
            </button>
          </div>
        </div>

        <figure className="lg:col-span-5 flex flex-col">
          <div className="flex-1 overflow-hidden rounded-xl border border-hairline bg-limestone min-h-[220px]">
            <ResilientImage
              src={ARCHIVE_IMAGES.hero}
              alt="Illuminated Sanskrit palm-leaf manuscript lit by a warm brass diya lamp"
              fallbackTitle="Katha Archive Manuscript"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-2 font-serif italic text-xs text-ink-muted">
            Fig. 1 · Palm-leaf manuscript illuminated by a traditional brass diya
          </figcaption>
        </figure>
      </section>

      {/* Quiz Configuration Studio */}
      <section
        aria-labelledby="quiz-config-heading"
        className="bg-surface border border-hairline rounded-xl p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-5 mb-6 border-b border-hairline">
          <div>
            <h2 id="quiz-config-heading" className="font-serif text-xl sm:text-2xl font-semibold text-ink">
              Configure Your Quiz Session
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Select a scriptural tradition, difficulty level, and session length.
            </p>
          </div>
          <span className="font-mono text-xs tabular-nums text-ink-muted">
            {effectiveCount} of {filteredPool.length} curated questions selected
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Epic Selector */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
              01. Epic Tradition
            </h3>
            <div className="space-y-2.5">
              {EPIC_OPTIONS.map((opt) => {
                const active = selectedEpic === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeEpic(opt.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 flex items-center justify-between gap-3 ${
                      active
                        ? 'border-vermilion bg-limestone text-ink'
                        : 'border-hairline bg-surface hover:bg-paper text-ink'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">{opt.label}</div>
                      <div className="text-xs text-ink-muted">{opt.note}</div>
                    </div>
                    <span
                      className={`text-xs font-medium whitespace-nowrap shrink-0 ${
                        active ? 'text-vermilion' : 'text-ink-muted'
                      }`}
                    >
                      {active ? 'Selected' : 'Select'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
              02. Difficulty Mode
            </h3>
            <div className="space-y-2.5">
              {DIFFICULTIES.map((diff) => {
                const active = selectedDifficulty === diff;
                const meta = DIFFICULTY_META[diff];
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => onChangeDifficulty(diff)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 ${
                      active
                        ? 'border-vermilion bg-limestone text-ink'
                        : 'border-hairline bg-surface hover:bg-paper text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-sm font-semibold">
                        {diff} · {meta.sanskritTitle} ({meta.label})
                      </span>
                      <span
                        className={`text-xs font-medium whitespace-nowrap shrink-0 ${
                          active ? 'text-vermilion' : 'text-ink-muted'
                        }`}
                      >
                        {active ? 'Active' : 'Choose'}
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted leading-snug">{meta.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Length & Start */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                03. Length
              </h3>
              <div className="flex lg:flex-col gap-2">
                {LENGTH_OPTIONS.map((opt) => {
                  const active = questionLimit === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setQuestionLimit(opt.value)}
                      className={`flex-1 lg:flex-none text-left px-3 py-2.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                        active
                          ? 'border-vermilion bg-limestone text-ink'
                          : 'border-hairline bg-surface text-ink-muted hover:text-ink'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => beginSession()}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors duration-150 whitespace-nowrap"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Three Illustrated Epic Pathways */}
      <section aria-labelledby="epics-showcase-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
          <h2 id="epics-showcase-heading" className="font-serif text-2xl font-semibold text-ink">
            Explore by Sacred Tradition
          </h2>
          <p className="text-sm text-ink-muted">
            Start a focused quiz or open curated study guides for each tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['Ramayana', 'Mahabharata', 'Puranas'] as EpicCategory[]).map((epic) => {
            const info = EPIC_DESCRIPTIONS[epic];
            return (
              <article
                key={epic}
                className="bg-surface border border-hairline rounded-xl overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-limestone overflow-hidden border-b border-hairline">
                  <ResilientImage
                    src={ARCHIVE_IMAGES[epic]}
                    alt={info.caption}
                    fallbackTitle={epic}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-xs text-ink-muted mb-1">
                      {info.subtitle} · {info.scope}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-ink mb-1.5">
                      {epic === 'Puranas' ? 'Puranas & Upanishads' : epic}
                    </h3>
                    <p className="text-xs font-serif italic text-ink-muted">{info.caption}</p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-3 border-t border-hairline">
                    <button
                      type="button"
                      onClick={() => {
                        onChangeEpic(epic);
                        const subset = shuffleArray(
                          QUIZ_QUESTIONS.filter(
                            (q) => q.epic === epic && q.difficulty === selectedDifficulty
                          )
                        );
                        beginSession(subset);
                      }}
                      className="flex-1 px-3 py-2 text-xs font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors whitespace-nowrap"
                    >
                      Quiz {epic}
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenLibraryEpic(epic)}
                      className="flex-1 px-3 py-2 text-xs font-medium text-ink border border-hairline hover:bg-limestone rounded-lg transition-colors whitespace-nowrap"
                    >
                      Study Lessons
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
