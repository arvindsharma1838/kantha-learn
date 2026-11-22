import { AppView } from '../types';

interface HeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onQuickStartQuiz: () => void;
}

const NAV_ITEMS: { id: AppView; label: string }[] = [
  { id: 'quiz', label: 'Quiz' },
  { id: 'library', label: 'Study Library' },
  { id: 'guide', label: 'Epic Guide' },
  { id: 'progress', label: 'Progress' },
];

export function Header({ activeView, onNavigate, onQuickStartQuiz }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-12 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        <button
          type="button"
          onClick={() => onNavigate('quiz')}
          className="font-serif text-xl font-semibold tracking-tight text-ink whitespace-nowrap shrink-0 text-left hover:text-vermilion transition-colors duration-150"
        >
          Katha Archive
        </button>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-vermilion"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onQuickStartQuiz}
            className="px-4 py-2 text-sm font-medium text-white bg-vermilion hover:bg-vermilion-hover rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Start Quiz
          </button>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="md:hidden border-t border-hairline px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors duration-150 ${
                isActive
                  ? 'bg-limestone text-ink'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
