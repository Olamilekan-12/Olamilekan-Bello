'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { FileDown, Moon, Sun, TableOfContents, X } from 'lucide-react';
import { person } from '@/content/cv';
import { useBook, visibleSheets } from './book/context';

export function Topbar() {
  const { sheets, position, mode, goToSheet } = useBook();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('mousedown', close);
      window.removeEventListener('keydown', close);
    };
  }, [open]);

  const shown = visibleSheets(mode, position, sheets.length);
  const currentChapter = shown.map((i) => sheets[i]?.chapter).filter(Boolean).pop();

  const chapters = sheets
    .map((s, i) => ({ s, i }))
    .filter(({ s }, idx, all) => s.chapter && all.findIndex((x) => x.s.chapter?.id === s.chapter?.id) === idx);

  const iconBtn =
    'grid size-9 place-items-center rounded-full text-desk-ink transition-colors hover:bg-desk-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion';

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-desk-line bg-desk/75 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <a href="#" onClick={(e) => { e.preventDefault(); goToSheet(0); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[var(--cloth)] font-display text-sm font-semibold text-foil shadow-[inset_0_0_0_1px_rgba(210,174,104,0.45)]">
            BO
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-[15px] text-desk-ink">{person.name}</span>
            <span className="block font-mono text-[10.5px] tracking-wider text-desk-muted uppercase">{person.title}</span>
          </span>
        </a>

        <div className="mx-auto hidden font-mono text-[11px] tracking-[0.18em] text-desk-muted uppercase md:block" aria-hidden="true">
          {currentChapter ? (
            <>
              <span className="text-vermilion">{currentChapter.numeral || '·'}</span>
              <span className="mx-2 text-desk-line">/</span>
              {currentChapter.title}
            </>
          ) : position === 0 ? 'Closed book' : 'The end'}
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <div className="relative" ref={menuRef}>
            <button type="button" className={iconBtn} aria-label="Contents" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              {open ? <X className="size-4" /> : <TableOfContents className="size-4" />}
            </button>
            {open && (
              <nav
                aria-label="Chapters"
                className="absolute top-12 right-0 w-64 overflow-hidden rounded-lg border border-desk-line bg-paper p-2 text-ink shadow-[0_20px_40px_-18px_rgba(0,0,0,0.5)]"
              >
                <div className="px-3 pt-2 pb-1 smallcaps text-xs text-ink-faint">Contents</div>
                <ul>
                  {chapters.map(({ s, i }) => (
                    <li key={s.chapter!.id}>
                      <button
                        type="button"
                        onClick={() => { setOpen(false); goToSheet(i); }}
                        className="flex w-full items-baseline gap-3 rounded-md px-3 py-2 text-left hover:bg-ink/5"
                      >
                        <span className="w-6 font-mono text-[11px] text-vermilion">{s.chapter!.numeral}</span>
                        <span className="font-display text-[15px]">{s.chapter!.title}</span>
                        <span className="ml-auto font-mono text-[11px] text-ink-faint">{i}</span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <a href="#write" onClick={() => setOpen(false)} className="flex w-full items-baseline gap-3 rounded-md px-3 py-2 hover:bg-ink/5">
                      <span className="w-6 font-mono text-[11px] text-vermilion">PS</span>
                      <span className="font-display text-[15px]">Leave a note</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          <button
            type="button"
            className={iconBtn}
            aria-label={mounted && resolvedTheme === 'dark' ? 'Switch to light desk' : 'Switch to dark desk'}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && resolvedTheme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <a
            href={person.cvPdf}
            download="Bello_Olamilekan_CV.pdf"
            className="ml-1 inline-flex h-9 items-center gap-2 rounded-full bg-desk-ink px-4 text-sm text-desk transition-transform hover:-translate-y-px"
          >
            <FileDown className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Download CV</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
