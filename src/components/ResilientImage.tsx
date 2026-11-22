import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({ src, alt, fallbackTitle, className = '' }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-limestone border border-hairline text-ink-muted p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-7 h-7 mb-2 text-vermilion opacity-80" aria-hidden="true" />
        <span className="font-serif text-sm text-ink">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
