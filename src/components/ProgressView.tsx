import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DIFFICULTY_META, STUDY_LESSONS } from '../data/epicsData';
import { DifficultyLevel, EpicCategory, UserProgress } from '../types';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onNavigateToQuiz: () => void;
  onNavigateToLibrary: () => void;
}

export function ProgressView({
  progress,
  onResetProgress,
  onNavigateToQuiz,
  onNavigateToLibrary,
}: ProgressViewProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const overallAccuracy =
    progress.totalAttempted > 0
      ? Math.round((progress.totalCorrect / progress.totalAttempted) * 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-2">
            Personal Learning Ledger
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink mb-2">
            Quiz Mastery &amp; Study Progress
          </h1>
          <p className="text-sm sm:text-base text-ink-muted max-w-2xl">
            Saved locally in your browser across quiz difficulty modes, epic categories, and study
            library modules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-crimson border border-hairline bg-surface hover:bg-red-50/70 rounded-lg transition-colors self-start shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          Reset Progress
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-hairline rounded-xl p-5">
          <div className="text-xs text-ink-muted mb-1">Quizzes Completed</div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-ink">
            {progress.quizzesTaken}
          </div>
        </div>
        <div className="bg-surface border border-hairline rounded-xl p-5">
          <div className="text-xs text-ink-muted mb-1">Overall Accuracy</div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-vermilion">
            {overallAccuracy}%
          </div>
        </div>
        <div className="bg-surface border border-hairline rounded-xl p-5">
          <div className="text-xs text-ink-muted mb-1">Lessons Completed</div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-ink">
            {progress.learnedLessonIds.length} / {STUDY_LESSONS.length}
          </div>
        </div>
        <div className="bg-surface border border-hairline rounded-xl p-5">
          <div className="text-xs text-ink-muted mb-1">Flashcards Mastered</div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-ink">
            {progress.masteredFlashcardIds.length} / {STUDY_LESSONS.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Best Scores by Difficulty */}
        <section className="bg-surface border border-hairline rounded-xl p-6 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Best Accuracy by Difficulty Mode
          </h2>
          <div className="divide-y divide-hairline">
            {(['Easy', 'Medium', 'Hard'] as DifficultyLevel[]).map((diff) => {
              const best = progress.bestByDifficulty[diff];
              const meta = DIFFICULTY_META[diff];
              return (
                <div key={diff} className="py-4 first:pt-2 last:pb-0 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      {diff} · {meta.sanskritTitle} ({meta.label})
                    </div>
                    <div className="text-xs text-ink-muted">{meta.description}</div>
                  </div>
                  <div className="font-mono text-base font-semibold tabular-nums whitespace-nowrap shrink-0 text-ink">
                    {best !== null ? `${best}%` : '—'}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Accuracy by Epic */}
        <section className="bg-surface border border-hairline rounded-xl p-6 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Accuracy by Tradition
          </h2>
          <div className="space-y-5 pt-2">
            {(['Ramayana', 'Mahabharata', 'Puranas'] as EpicCategory[]).map((epic) => {
              const stat = progress.byEpic[epic];
              const pct = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
              return (
                <div key={epic} className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-ink">
                      {epic === 'Puranas' ? 'Puranas & Upanishads' : epic}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-ink-muted">
                      {stat.attempted > 0
                        ? `${stat.correct} / ${stat.attempted} (${pct}%)`
                        : 'No questions answered yet'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-limestone rounded-full overflow-hidden">
                    <div
                      className="h-full bg-vermilion transition-all duration-200"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Recent Quiz History */}
      <section className="bg-surface border border-hairline rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="font-serif text-xl font-semibold text-ink">Recent Quiz Sessions</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToLibrary}
              className="text-xs font-medium text-ink-muted hover:text-ink underline underline-offset-4"
            >
              Open Study Library
            </button>
            <button
              type="button"
              onClick={onNavigateToQuiz}
              className="px-3.5 py-2 text-xs font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors"
            >
              Take Another Quiz
            </button>
          </div>
        </div>

        {progress.recentAttempts.length === 0 ? (
          <p className="text-sm text-ink-muted py-6">
            You have not completed a quiz yet. Start an Easy, Medium, or Hard session to record your
            first score.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-hairline text-xs text-ink-muted">
                  <th className="py-2.5 pr-4 font-medium">Date</th>
                  <th className="py-2.5 pr-4 font-medium">Tradition</th>
                  <th className="py-2.5 pr-4 font-medium">Difficulty</th>
                  <th className="py-2.5 pr-4 font-medium text-right">Score</th>
                  <th className="py-2.5 font-medium text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {progress.recentAttempts.map((attempt) => (
                  <tr key={attempt.id}>
                    <td className="py-3 pr-4 font-mono text-xs text-ink-muted tabular-nums whitespace-nowrap">
                      {new Date(attempt.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 pr-4 text-ink font-medium">
                      {attempt.epic === 'All' ? 'All Epics' : attempt.epic}
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{attempt.difficulty}</td>
                    <td className="py-3 pr-4 text-right font-mono tabular-nums text-ink">
                      {attempt.score} / {attempt.total}
                    </td>
                    <td className="py-3 text-right font-mono tabular-nums font-semibold text-vermilion">
                      {attempt.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Accessible In-App Confirmation Modal (no window.confirm) */}
      {confirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
        >
          <div className="bg-surface border border-hairline rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 id="reset-dialog-title" className="font-serif text-xl font-semibold text-ink">
              Reset all saved progress?
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              This will clear your quiz history, best difficulty scores, learned modules, and
              mastered flashcards from this browser.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 text-xs font-medium border border-hairline rounded-lg text-ink hover:bg-limestone transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmOpen(false);
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-crimson text-white hover:opacity-90 transition-opacity"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
