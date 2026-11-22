import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  DASHAVATARA_STAGES,
  MAHABHARATA_PHASES,
  RAMAYANA_KANDAS,
} from '../data/epicsData';
import { EpicCategory } from '../types';

interface EpicGuideViewProps {
  onQuizEpic: (epic: EpicCategory) => void;
}

type GuideSection = 'ramayana' | 'mahabharata' | 'dashavatara';

export function EpicGuideView({ onQuizEpic }: EpicGuideViewProps) {
  const [activeGuide, setActiveGuide] = useState<GuideSection>('ramayana');
  const [kandaIdx, setKandaIdx] = useState<number>(0);
  const [parvaPhaseIdx, setParvaPhaseIdx] = useState<number>(0);
  const [avatarIdx, setAvatarIdx] = useState<number>(0);

  const activeKanda = RAMAYANA_KANDAS[kandaIdx];
  const activePhase = MAHABHARATA_PHASES[parvaPhaseIdx];
  const activeAvatar = DASHAVATARA_STAGES[avatarIdx];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-hairline">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-2">
            Interactive Structural Companion
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink mb-2">
            Chapters, Books &amp; Cosmic Cycles
          </h1>
          <p className="text-sm sm:text-base text-ink-muted max-w-2xl">
            Step through the seven Kandas of the Ramayana, the eighteen Parvas of the Mahabharata,
            and the ten classic Dashavatara descents.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Epic structure selector"
          className="inline-flex items-center gap-1 p-1 bg-limestone border border-hairline rounded-lg self-start shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeGuide === 'ramayana'}
            onClick={() => setActiveGuide('ramayana')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeGuide === 'ramayana'
                ? 'bg-surface text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            7 Kandas (Ramayana)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeGuide === 'mahabharata'}
            onClick={() => setActiveGuide('mahabharata')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeGuide === 'mahabharata'
                ? 'bg-surface text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            18 Parvas (Mahabharata)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeGuide === 'dashavatara'}
            onClick={() => setActiveGuide('dashavatara')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeGuide === 'dashavatara'
                ? 'bg-surface text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Dashavatara (Puranas)
          </button>
        </div>
      </div>

      {/* 1. RAMAYANA 7 KANDAS STEPPER */}
      {activeGuide === 'ramayana' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2">
            {RAMAYANA_KANDAS.map((kanda, idx) => {
              const active = idx === kandaIdx;
              return (
                <button
                  key={kanda.number}
                  type="button"
                  onClick={() => setKandaIdx(idx)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between gap-3 ${
                    active
                      ? 'border-vermilion bg-limestone text-ink'
                      : 'border-hairline bg-surface hover:bg-paper text-ink-muted hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs tabular-nums text-vermilion shrink-0">
                      0{kanda.number}
                    </span>
                    <span className="text-sm font-semibold truncate">{kanda.name}</span>
                  </div>
                  <span className="text-xs whitespace-nowrap shrink-0">{kanda.meaning}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-surface border border-hairline rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-hairline">
              <div>
                <div className="text-xs text-ink-muted mb-1">
                  Book {activeKanda.number} of 7 · {activeKanda.meaning}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
                  {activeKanda.name}
                </h2>
              </div>
              <span className="text-xs font-medium text-vermilion">
                {activeKanda.keyLocation}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-paper border border-hairline rounded-lg p-4">
                <div className="text-xs text-ink-muted mb-1">Primary Geography</div>
                <div className="font-medium text-ink">{activeKanda.keyLocation}</div>
              </div>
              <div className="bg-paper border border-hairline rounded-lg p-4">
                <div className="text-xs text-ink-muted mb-1">Key Figures</div>
                <div className="font-medium text-ink">{activeKanda.centralFigures}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                Narrative Arc
              </h3>
              <p className="text-base text-ink leading-relaxed">{activeKanda.summary}</p>
            </div>

            <div className="bg-limestone border border-hairline rounded-lg p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                Ethical Reflection
              </div>
              <p className="font-serif italic text-base text-ink">{activeKanda.lesson}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-hairline">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={kandaIdx === 0}
                  onClick={() => setKandaIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-limestone disabled:opacity-40 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  Previous Kanda
                </button>
                <button
                  type="button"
                  disabled={kandaIdx === RAMAYANA_KANDAS.length - 1}
                  onClick={() => setKandaIdx((i) => Math.min(RAMAYANA_KANDAS.length - 1, i + 1))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-limestone disabled:opacity-40 transition-colors"
                >
                  Next Kanda
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onQuizEpic('Ramayana')}
                className="px-4 py-2 text-xs font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors whitespace-nowrap"
              >
                Quiz Ramayana
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAHABHARATA 18 PARVAS MAP */}
      {activeGuide === 'mahabharata' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MAHABHARATA_PHASES.map((group, idx) => {
              const active = idx === parvaPhaseIdx;
              return (
                <button
                  key={group.phase}
                  type="button"
                  onClick={() => setParvaPhaseIdx(idx)}
                  className={`text-left p-4 rounded-xl border transition-colors ${
                    active
                      ? 'border-vermilion bg-limestone text-ink'
                      : 'border-hairline bg-surface hover:bg-paper text-ink-muted hover:text-ink'
                  }`}
                >
                  <div className="font-mono text-xs text-vermilion mb-1">{group.range}</div>
                  <div className="font-serif text-base font-semibold text-ink">{group.phase}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-hairline">
              <div>
                <div className="font-mono text-xs text-ink-muted mb-1">{activePhase.range}</div>
                <h2 className="font-serif text-2xl font-semibold text-ink">{activePhase.phase}</h2>
              </div>
              <button
                type="button"
                onClick={() => onQuizEpic('Mahabharata')}
                className="px-4 py-2 text-xs font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors whitespace-nowrap"
              >
                Quiz Mahabharata
              </button>
            </div>

            <p className="text-base text-ink-muted leading-relaxed max-w-3xl">
              {activePhase.summary}
            </p>

            <div className="divide-y divide-hairline border-t border-hairline">
              {activePhase.parvas.map((parva) => (
                <div
                  key={parva.number}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs font-semibold tabular-nums text-vermilion w-14 shrink-0">
                      Parva {String(parva.number).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-lg font-semibold text-ink">{parva.name}</span>
                  </div>
                  <span className="text-sm text-ink-muted sm:text-right">{parva.focus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. DASHAVATARA SEQUENCE */}
      {activeGuide === 'dashavatara' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {DASHAVATARA_STAGES.map((stage, idx) => {
              const active = idx === avatarIdx;
              return (
                <button
                  key={stage.order}
                  type="button"
                  onClick={() => setAvatarIdx(idx)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    active
                      ? 'border-vermilion bg-limestone text-ink'
                      : 'border-hairline bg-surface hover:bg-paper text-ink-muted hover:text-ink'
                  }`}
                >
                  <div className="font-mono text-[11px] tabular-nums text-vermilion mb-0.5">
                    {String(stage.order).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-semibold text-ink truncate">{stage.name}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b border-hairline">
              <div>
                <div className="text-xs text-ink-muted mb-1">
                  Avatar {activeAvatar.order} of 10 · {activeAvatar.yuga}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
                  {activeAvatar.name} · {activeAvatar.form}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onQuizEpic('Puranas')}
                className="px-4 py-2 text-xs font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors whitespace-nowrap"
              >
                Quiz Puranas &amp; Avatars
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-paper border border-hairline rounded-lg p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                  Cosmic Purpose
                </h3>
                <p className="text-sm sm:text-base text-ink leading-relaxed">
                  {activeAvatar.purpose}
                </p>
              </div>
              <div className="bg-limestone border border-hairline rounded-lg p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                  Philosophical Meaning
                </h3>
                <p className="font-serif italic text-base text-ink leading-relaxed">
                  {activeAvatar.significance}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-hairline">
              <button
                type="button"
                disabled={avatarIdx === 0}
                onClick={() => setAvatarIdx((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-limestone disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Previous Avatar
              </button>
              <button
                type="button"
                disabled={avatarIdx === DASHAVATARA_STAGES.length - 1}
                onClick={() => setAvatarIdx((i) => Math.min(DASHAVATARA_STAGES.length - 1, i + 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-hairline rounded-lg hover:bg-limestone disabled:opacity-40 transition-colors"
              >
                Next Avatar
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
