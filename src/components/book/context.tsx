'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Side } from './paper';

export type Mode = 'spread' | 'single' | 'flat';

export type Chapter = { id: string; numeral: string; title: string };

export type Sheet = {
  id: string;
  chapter: Chapter | null;
  kind: 'cover' | 'paper' | 'back';
  render: (ctx: { side: Side; folio: number | null }) => ReactNode;
};

export type BookState = {
  mode: Mode | null;
  sheets: Sheet[];
  /** Index of the resting position: a spread in spread mode, a sheet otherwise. */
  position: number;
  goToSheet: (sheetIndex: number) => void;
  next: () => void;
  prev: () => void;
};

export const BookContext = createContext<BookState>({
  mode: null,
  sheets: [],
  position: 0,
  goToSheet: () => {},
  next: () => {},
  prev: () => {},
});

export const useBook = () => useContext(BookContext);

/** Spread mode shows sheets 2k-1 and 2k at position k; the cover is position 0. */
export function sheetToPosition(mode: Mode | null, sheetIndex: number) {
  return mode === 'spread' ? Math.ceil(sheetIndex / 2) : sheetIndex;
}

export function visibleSheets(mode: Mode | null, position: number, count: number) {
  if (mode !== 'spread') return [position];
  return [2 * position - 1, 2 * position].filter((i) => i >= 0 && i < count);
}
