import type { ReactNode } from 'react';

export type Side = 'left' | 'right' | 'solo';

export function Paper({
  side,
  folio,
  head,
  children,
  className = '',
}: {
  side: Side;
  folio?: number | null;
  head?: string;
  children: ReactNode;
  className?: string;
}) {
  const outer = side === 'left' ? 'text-left' : 'text-right';
  return (
    <div className="page" data-side={side}>
      <div className="page-inner">
        {head && (
          <div className={`smallcaps mb-[1.6em] shrink-0 text-[0.74em] text-ink-faint ${outer}`}>
            {head}
          </div>
        )}
        <div className={`flex min-h-0 flex-1 flex-col ${className}`}>{children}</div>
        {folio != null && (
          <div
            className={`mt-[1.2em] shrink-0 font-display text-[0.8em] tabular-nums text-ink-faint ${outer}`}
          >
            {folio}
          </div>
        )}
      </div>
    </div>
  );
}

/** Renders **bold** spans inside CV bullet text. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function ChapterHead({
  numeral,
  kicker,
  title,
  icon,
}: {
  numeral: string;
  kicker: string;
  title: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <header className="shrink-0">
      <div className="flex items-center gap-[0.6em] text-[0.72em] text-vermilion">
        <span className="font-mono tracking-wider">{numeral}</span>
        <span className="h-px w-[2.2em] bg-vermilion/50" />
        <span className="smallcaps text-ink-soft">{kicker}</span>
        {icon && <span className="ml-auto text-ink-faint [&_svg]:size-[1.35em]">{icon}</span>}
      </div>
      <h2 className="mt-[0.45em] font-display text-[2.15em] leading-[1.02] font-medium tracking-[-0.015em] text-ink">
        {title}
      </h2>
    </header>
  );
}

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-[0.6em] text-ink-faint ${className}`} aria-hidden="true">
      <span className="h-px w-[3em] bg-current opacity-40" />
      <svg viewBox="0 0 12 12" className="size-[0.6em] fill-current">
        <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" />
      </svg>
      <span className="h-px w-[3em] bg-current opacity-40" />
    </div>
  );
}
