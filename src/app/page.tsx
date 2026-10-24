'use client';

import { BookProvider, BookStage } from '@/components/book/book';
import { Topbar } from '@/components/topbar';
import { WriteToMe, Colophon } from '@/components/write-to-me';

export default function Home() {
  return (
    <BookProvider>
      <div className="desk grain relative min-h-screen">
        <Topbar />
        <main>
          <BookStage />
          <WriteToMe />
        </main>
        <Colophon />
      </div>
    </BookProvider>
  );
}
