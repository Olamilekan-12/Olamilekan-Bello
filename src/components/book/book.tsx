'use client';

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type CSSProperties, type ReactNode, type RefObject,
} from 'react';
import {
  motion, useMotionValueEvent, useScroll, useSpring, useTransform,
  type MotionValue,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsDown } from 'lucide-react';
import { BookContext, sheetToPosition, useBook, type Mode, type Sheet } from './context';
import { buildSheets } from './sheets';
import type { Side } from './paper';

const TOPBAR = 64;
const CONTROLS = 76;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function detectMode(): Mode {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'flat';
  if (h < 500) return 'flat';
  if (w >= 1000 && w / h >= 1.15 && h >= 560) return 'spread';
  return 'single';
}

type Geometry = { vw: number; vh: number; pageW: number; pageH: number; step: number };

function measure(mode: Mode): Geometry {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (mode === 'spread') {
    const availH = vh - TOPBAR - CONTROLS;
    const pageW = Math.floor(Math.min(availH * 0.72, (vw - 112) / 2, 660));
    return { vw, vh, pageW, pageH: Math.floor(pageW / 0.72), step: Math.round(vh * 0.9) };
  }
  const availH = vh - TOPBAR - CONTROLS;
  const pageW = Math.floor(Math.min(vw - 32, 620));
  const pageH = Math.floor(Math.min(availH, pageW * (pageW < 480 ? 1.9 : 1.42)));
  return { vw, vh, pageW, pageH, step: Math.round(vh * 0.72) };
}

/* ---------- Provider: mode, sheets, position and navigation ---------- */

type EngineState = {
  compact: boolean;
  trackRef: RefObject<HTMLElement | null>;
  geometry: Geometry | null;
  setPosition: (p: number) => void;
};

const EngineContext = createContext<EngineState | null>(null);

export function BookProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [position, setPosition] = useState(0);
  const trackRef = useRef<HTMLElement | null>(null);
  const widthRef = useRef(0);

  useEffect(() => {
    const update = (force = false) => {
      const next = detectMode();
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Mobile browsers resize the viewport as the address bar slides; ignore small height-only changes.
      setGeometry((prev) => {
        if (!force && prev && w === widthRef.current && Math.abs(h - prev.vh) < 120 && next === mode) return prev;
        widthRef.current = w;
        return measure(next);
      });
      setMode(next);
    };
    update(true);
    const onResize = () => update();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    window.addEventListener('resize', onResize);
    mq.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', onResize);
    };
  }, [mode]);

  // Phones get shorter pages; tablets and desktops share the full sixteen-page layout.
  const compact = mode === 'single' && !!geometry && geometry.pageW < 480;
  const sheets = useMemo(() => (mode ? buildSheets(compact) : []), [mode, compact]);
  const maxPosition = mode === 'spread' ? sheets.length / 2 : Math.max(sheets.length - 1, 0);

  const goToPosition = useCallback(
    (p: number) => {
      const track = trackRef.current;
      if (!track || !geometry || mode === 'flat') return;
      const target = Math.max(0, Math.min(maxPosition, p));
      const top = track.getBoundingClientRect().top + window.scrollY + target * geometry.step;
      window.scrollTo({ top, behavior: 'smooth' });
    },
    [geometry, mode, maxPosition],
  );

  const goToSheet = useCallback(
    (i: number) => {
      if (mode === 'flat') {
        document.getElementById(`sheet-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      goToPosition(sheetToPosition(mode, i));
    },
    [mode, goToPosition],
  );

  const book = useMemo(
    () => ({
      mode,
      sheets,
      position,
      goToSheet,
      next: () => goToPosition(position + 1),
      prev: () => goToPosition(position - 1),
    }),
    [mode, sheets, position, goToSheet, goToPosition],
  );

  const engine = useMemo(() => ({ compact, trackRef, geometry, setPosition }), [compact, geometry]);

  return (
    <BookContext.Provider value={book}>
      <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>
    </BookContext.Provider>
  );
}

/* ---------- Stage ---------- */

export function BookStage() {
  const { mode, sheets } = useBook();
  const engine = useContext(EngineContext);

  if (!mode || !engine?.geometry) {
    return <section aria-label="Curriculum vitae" className="h-[100svh]" />;
  }
  if (mode === 'flat') return <FlatBook sheets={sheets} />;
  return <ScrollBook mode={mode} compact={engine.compact} sheets={sheets} geometry={engine.geometry} trackRef={engine.trackRef} setPosition={engine.setPosition} />;
}

type Leaf = { front: Sheet; frontIndex: number; back: Sheet | null; backIndex: number };

function makeLeaves(mode: Mode, sheets: Sheet[]): Leaf[] {
  if (mode === 'spread') {
    const leaves: Leaf[] = [];
    for (let i = 0; i < sheets.length; i += 2) {
      leaves.push({ front: sheets[i], frontIndex: i, back: sheets[i + 1] ?? null, backIndex: i + 1 });
    }
    return leaves;
  }
  return sheets.map((s, i) => ({ front: s, frontIndex: i, back: null, backIndex: -1 }));
}

function ScrollBook({
  mode, compact, sheets, geometry, trackRef, setPosition,
}: {
  mode: Exclude<Mode, 'flat'>;
  compact: boolean;
  sheets: Sheet[];
  geometry: Geometry;
  trackRef: RefObject<HTMLElement | null>;
  setPosition: (p: number) => void;
}) {
  const { next, prev, position } = useBook();
  const spread = mode === 'spread';
  const leaves = useMemo(() => makeLeaves(mode, sheets), [mode, sheets]);
  const flips = spread ? leaves.length : leaves.length - 1;
  const { pageW, pageH, step, vh } = geometry;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const raw = useTransform(scrollYProgress, (v) => v * flips);
  const p = useSpring(raw, { stiffness: 120, damping: 22, mass: 0.6, restDelta: 0.0005 });

  useMotionValueEvent(raw, 'change', (v) => setPosition(Math.max(0, Math.min(flips, Math.round(v)))));

  // Proximity snapping lets a reader settle on a spread without fighting the scroll.
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = 'y proximity';
    return () => {
      html.style.scrollSnapType = '';
    };
  }, []);

  // Arrow keys turn pages while the book is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const track = trackRef.current;
      if (!track || e.altKey || e.metaKey || e.ctrlKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const r = track.getBoundingClientRect();
      if (r.top > 1 || r.bottom < window.innerHeight - 1) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, trackRef]);

  const bookW = spread ? pageW * 2 : pageW;

  // Closed book sits centred on its cover, then slides over as it opens; same in reverse at the back.
  const x = useTransform(p, (v) => (spread ? (-pageW / 2) * (1 - clamp01(v)) + (pageW / 2) * clamp01(v - (flips - 1)) : 0));
  const tilt = useTransform(p, (v) => (spread ? 7 * (1 - clamp01(v)) + 7 * clamp01(v - (flips - 1)) : 0));
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  const onBookClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a,button,input,textarea,label')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    if (spread ? rel >= 0.5 : rel >= 0.3) next();
    else prev();
  };

  return (
    <section
      ref={trackRef as RefObject<HTMLElement>}
      aria-label="Curriculum vitae, an illustrated book"
      className="relative"
      style={{ height: flips * step + vh }}
    >
      {Array.from({ length: flips + 1 }, (_, i) => (
        <div key={i} aria-hidden="true" className="absolute left-0 h-px w-px snap-start" style={{ top: i * step }} />
      ))}

      <div className="sticky top-0 flex flex-col overflow-hidden" style={{ height: vh }}>
        <div style={{ height: TOPBAR }} className="shrink-0" />

        <div className="relative flex flex-1 items-center justify-center" style={{ perspective: 2400 }}>
          <motion.div
            className="book relative cursor-pointer select-none"
            data-mode={mode}
            data-density={compact ? 'compact' : 'full'}
            style={{ width: bookW, height: pageH, x, rotateX: tilt }}
            onClick={onBookClick}
          >
            <DeskShadows p={p} flips={flips} spread={spread} />
            <StackEdges p={p} flips={flips} spread={spread} />
            {leaves.map((leaf, i) => (
              <LeafView key={leaf.front.id} leaf={leaf} index={i} count={leaves.length} p={p} spread={spread} />
            ))}
            <CastShadow p={p} spread={spread} flips={flips} z={leaves.length * 2 + 10} />
          </motion.div>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-[3%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-desk-muted"
          >
            <span className="smallcaps text-sm tracking-[0.2em]">Scroll to open</span>
            <ChevronsDown className="size-4 animate-[nudge-down_1.8s_ease-in-out_infinite]" aria-hidden="true" />
          </motion.div>
        </div>

        <Controls position={position} flips={flips} spread={spread} sheets={sheets} />
      </div>
    </section>
  );
}

/* ---------- Leaves ---------- */

function LeafView({ leaf, index, count, p, spread }: { leaf: Leaf; index: number; count: number; p: MotionValue<number>; spread: boolean }) {
  const t = useTransform(p, (v) => clamp01(v - index));
  const rotateY = useTransform(t, (v) => -180 * v);
  // A turning page bows slightly; skew sells the bend without splitting the page into strips.
  const skewY = useTransform(t, (v) => Math.sin(v * Math.PI) * (spread ? -1.6 : -2.6));
  const board = spread && (index === 0 || index === count - 1);
  // Boards rest beneath the page block so the edges of the pages show inside their overhang.
  const zIndex = useTransform(p, (v) => {
    const l = v - index;
    if (board && ((index === 0 && l >= 1) || (index === count - 1 && l <= 0))) return 0;
    if (l <= 0) return (count - index) * 2 + 2;
    if (l >= 1) return (index + 1) * 2 + 2;
    return count * 2 + 20;
  });
  const visibility = useTransform(p, (v) => {
    if (board) return 'visible';
    // A single page swings off to the left; once it has gone, it is gone.
    if (!spread && v - index >= 1) return 'hidden';
    return index >= Math.floor(v) - 1 && index <= Math.ceil(v) + 1 ? 'visible' : 'hidden';
  });
  const opacity = useTransform(t, (v) => (spread ? 1 : 1 - clamp01((v - 0.75) / 0.25)));
  const frontShade = useTransform(t, (v) => clamp01(v * 2) * 0.5);
  const backShade = useTransform(t, (v) => clamp01((1 - v) * 2) * 0.5);
  const highlight = useTransform(t, (v) => Math.sin(v * Math.PI) * 0.22);

  const isCover = leaf.front.kind === 'cover';

  const frontSide: Side = spread ? 'right' : 'solo';
  const leafStyle: CSSProperties = spread ? { left: '50%', width: '50%' } : { left: 0, width: '100%' };
  const boardInset = (back: boolean): CSSProperties =>
    board ? (back ? { inset: '-1.4% 0 -1.4% -1.8%' } : { inset: '-1.4% -1.8% -1.4% 0' }) : { inset: 0 };

  return (
    <motion.div
      className="absolute top-0 h-full origin-left"
      style={{ ...leafStyle, rotateY, skewY, zIndex, visibility, opacity, transformStyle: 'preserve-3d', transformPerspective: spread ? 4200 : 2200 }}
    >
      {/* front */}
      <div className="absolute [backface-visibility:hidden]" style={boardInset(false)}>
        <FaceContent sheet={leaf.front} side={frontSide} folio={folioOf(leaf.front, leaf.frontIndex)} endpaper={board && leaf.front.kind === 'paper'} back={false} />
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: frontShade, background: 'linear-gradient(to right, rgba(20,14,6,0.55), rgba(20,14,6,0.12) 55%, rgba(20,14,6,0.3))' }} />
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: highlight, background: 'linear-gradient(105deg, transparent 40%, rgba(255,250,235,0.9) 70%, transparent 85%)' }} />
      </div>

      {/* back */}
      <div className="absolute [backface-visibility:hidden] [transform:rotateY(180deg)]" style={boardInset(true)}>
        {leaf.back ? (
          <FaceContent sheet={leaf.back} side="left" folio={folioOf(leaf.back, leaf.backIndex)} endpaper={board && leaf.back.kind === 'paper'} back />
        ) : isCover ? (
          <div className="endpaper" />
        ) : (
          <div className="page" data-side="left" />
        )}
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: backShade, background: 'linear-gradient(to left, rgba(20,14,6,0.55), rgba(20,14,6,0.12) 55%, rgba(20,14,6,0.3))' }} />
      </div>
    </motion.div>
  );
}

function folioOf(sheet: Sheet, index: number) {
  return sheet.kind === 'paper' && sheet.id !== 'contents' ? index : null;
}

function FaceContent({ sheet, side, folio, endpaper, back }: { sheet: Sheet; side: Side; folio: number | null; endpaper: boolean; back: boolean }) {
  const content = sheet.render({ side, folio });
  if (!endpaper) return <>{content}</>;
  return (
    <>
      <div className="endpaper" style={{ borderRadius: back ? '0.6cqw 0 0 0.6cqw' : '0 0.6cqw 0.6cqw 0' }} />
      <div className="absolute" style={back ? { inset: '1.4% 0 1.4% 1.8%' } : { inset: '1.4% 1.8% 1.4% 0' }}>
        {content}
      </div>
    </>
  );
}

/* ---------- Shadows and page-block edges ---------- */

function CastShadow({ p, spread, flips, z }: { p: MotionValue<number>; spread: boolean; flips: number; z: number }) {
  const f = useTransform(p, (v) => (v <= 0 || v >= flips ? 0 : v - Math.floor(v)));
  const angle = useTransform(f, (v) => v * Math.PI);
  const opacity = useTransform(angle, (a) => Math.sin(a) * 0.9);

  // Right half: shadow just beyond the lifting edge. Left half: mirror once the page passes vertical.
  const rightLeft = useTransform(angle, (a) => `${(spread ? 50 : 0) + Math.max(0, Math.cos(a)) * (spread ? 50 : 100)}%`);
  const rightWidth = useTransform(angle, (a) => (a < Math.PI / 2 ? `${Math.sin(a) * (spread ? 16 : 30)}%` : '0%'));
  const leftRight = useTransform(angle, (a) => `${50 + Math.max(0, -Math.cos(a)) * 50}%`);
  const leftWidth = useTransform(angle, (a) => (a > Math.PI / 2 ? `${Math.sin(a) * 16}%` : '0%'));

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-full"
        style={{ left: rightLeft, width: rightWidth, opacity, zIndex: z, background: 'linear-gradient(to right, rgba(25,16,6,0.4), rgba(25,16,6,0.12) 45%, transparent)' }}
      />
      {spread && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-full"
          style={{ right: leftRight, width: leftWidth, opacity, zIndex: z, background: 'linear-gradient(to left, rgba(25,16,6,0.4), rgba(25,16,6,0.12) 45%, transparent)' }}
        />
      )}
    </>
  );
}

function DeskShadows({ p, flips, spread }: { p: MotionValue<number>; flips: number; spread: boolean }) {
  // A half of the book only casts a shadow once a page actually lies there.
  const right = useTransform(p, (v) => (spread ? 1 - clamp01((v - (flips - 1)) / 0.12) : 1));
  const left = useTransform(p, (v) => (spread ? clamp01((v - 0.88) / 0.12) : 0));
  const shadow = '0 40px 70px -24px rgba(20,12,4,0.55), 0 18px 30px -18px rgba(20,12,4,0.45), 0 2px 6px rgba(20,12,4,0.18)';
  return (
    <>
      <motion.div aria-hidden="true" className="absolute top-0 h-full rounded-[3px]" style={{ left: spread ? '50%' : 0, width: spread ? '50%' : '100%', boxShadow: shadow, opacity: right }} />
      {spread && <motion.div aria-hidden="true" className="absolute top-0 left-0 h-full w-1/2 rounded-[3px]" style={{ boxShadow: shadow, opacity: left }} />}
    </>
  );
}

function edgeShadow(count: number, dir: 1 | -1) {
  if (count <= 0) return 'none';
  const layers: string[] = [];
  for (let i = 1; i <= count; i++) {
    const light = i % 2 === 0 ? 'var(--paper-edge)' : 'var(--paper-shade)';
    layers.push(`${dir * i * 1.4}px ${i * 0.9}px 0 ${light}`);
  }
  layers.push(`${dir * (count * 1.4 + 0.6)}px ${count * 0.9 + 0.6}px 0 rgba(60,44,24,0.35)`);
  return layers.join(', ');
}

function StackEdges({ p, flips, spread }: { p: MotionValue<number>; flips: number; spread: boolean }) {
  const total = spread ? flips : flips + 1;
  const rightCount = useTransform(p, (v) => Math.min(7, Math.max(0, total - Math.ceil(v - 0.001) - 1)));
  const leftCount = useTransform(p, (v) => Math.min(7, Math.max(0, Math.floor(v) - 1)));
  const rightShadow = useTransform(rightCount, (c) => edgeShadow(c, 1));
  const leftShadow = useTransform(leftCount, (c) => edgeShadow(c, -1));
  const rightOpacity = useTransform(rightCount, (c) => (c > 0 ? 1 : 0));
  const leftOpacity = useTransform(leftCount, (c) => (c > 0 ? 1 : 0));
  return (
    <>
      <motion.div aria-hidden="true" className="absolute top-0 h-full bg-[var(--paper)]" style={{ left: spread ? '50%' : 0, width: spread ? '50%' : '100%', boxShadow: rightShadow, opacity: rightOpacity, zIndex: 1 }} />
      {spread && <motion.div aria-hidden="true" className="absolute top-0 left-0 h-full w-1/2 bg-[var(--paper)]" style={{ boxShadow: leftShadow, opacity: leftOpacity, zIndex: 1 }} />}
    </>
  );
}

/* ---------- Controls ---------- */

function Controls({ position, flips, spread, sheets }: { position: number; flips: number; spread: boolean; sheets: Sheet[] }) {
  const { next, prev } = useBook();
  const label = useMemo(() => {
    if (position === 0) return 'Cover';
    if (spread && position === flips) return 'Back cover';
    if (!spread && position === sheets.length - 1) return 'Back cover';
    if (spread) {
      const l = 2 * position - 1;
      const r = 2 * position;
      const left = sheets[l]?.id === 'contents' ? 'Contents' : `${l}`;
      return `${left} · ${r}`;
    }
    return sheets[position]?.id === 'contents' ? 'Contents' : `Page ${position}`;
  }, [position, flips, spread, sheets]);
  const chapter = (spread ? sheets[2 * position] ?? sheets[2 * position - 1] : sheets[position])?.chapter;

  const btn =
    'grid size-10 place-items-center rounded-full border border-desk-line text-desk-ink transition-colors hover:bg-desk-ink hover:text-desk disabled:pointer-events-none disabled:opacity-30';

  return (
    <div className="flex shrink-0 items-center justify-center gap-4 px-4" style={{ height: CONTROLS }}>
      <button type="button" onClick={prev} disabled={position <= 0} aria-label="Previous page" className={btn}>
        <ChevronLeft className="size-4" />
      </button>
      <div className="min-w-[11rem] text-center" aria-live="polite">
        <div className="font-mono text-[11px] tracking-wider text-desk-muted uppercase">{chapter?.title ?? (position === 0 ? 'Curriculum vitae' : 'Fin')}</div>
        <div className="font-display text-base text-desk-ink">{label}</div>
      </div>
      <button type="button" onClick={next} disabled={position >= flips} aria-label="Next page" className={btn}>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

/* ---------- Flat fallback: loose sheets for reduced motion and short screens ---------- */

function FlatBook({ sheets }: { sheets: Sheet[] }) {
  return (
    <section aria-label="Curriculum vitae" className="book mx-auto w-full max-w-[680px] space-y-8 px-4 pt-24 pb-16" data-mode="flat">
      {sheets.map((sheet, i) => {
        const board = sheet.kind !== 'paper';
        return (
          <article
            key={sheet.id}
            id={`sheet-${i}`}
            className="relative overflow-hidden rounded-[4px] shadow-[0_24px_50px_-26px_rgba(20,12,4,0.55),0_2px_6px_rgba(20,12,4,0.12)] scroll-mt-20"
            style={board ? { aspectRatio: '0.72' } : undefined}
          >
            {sheet.render({ side: 'solo', folio: sheet.kind === 'paper' && sheet.id !== 'contents' ? i : null })}
          </article>
        );
      })}
    </section>
  );
}
