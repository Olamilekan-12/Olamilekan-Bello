'use client';

import { person, roles, projects } from '@/content/cv';
import type { Chapter, Sheet } from './context';
import type { Side } from './paper';
import {
  CoverBoard, BackBoard, ContentsPage, SummaryPage, NumbersPage, SkillsPage, skillPages,
  RoleIntro, RoleWork, ProjectPage, ColophonPage, CorrespondencePage,
} from './pages';
import { DispatchFigure, MatchingFigure, FraudFigure, IdempotencyFigure, RelayFigure } from './figures';

const ch = {
  contents: { id: 'contents', numeral: '', title: 'Contents' },
  summary: { id: 'summary', numeral: 'I', title: 'Summary' },
  toolkit: { id: 'toolkit', numeral: 'II', title: 'Toolkit' },
  send24: { id: 'send24', numeral: 'III', title: 'Send24' },
  gmp: { id: 'gmp', numeral: 'IV', title: 'GMP, PikaGroup' },
  devheit: { id: 'devheit', numeral: 'V', title: 'Devheit' },
  projects: { id: 'projects', numeral: 'VI', title: 'Selected projects' },
  colophon: { id: 'colophon', numeral: 'VII', title: 'Colophon' },
} satisfies Record<string, Chapter>;

const figures: Record<string, React.ReactNode> = {
  send24: <DispatchFigure />,
  gmp: <MatchingFigure />,
  devheit: <FraudFigure />,
  idempotency: <IdempotencyFigure />,
  'webhook-relay': <RelayFigure />,
};

const roleChapter: Record<string, Chapter> = { send24: ch.send24, gmp: ch.gmp, devheit: ch.devheit };

/** Running head: the author on left pages, the chapter on right pages, as in a printed book. */
function headFor(side: Side, chapter: Chapter) {
  return side === 'left' ? person.name : chapter.title;
}

function paper(id: string, chapter: Chapter, render: (side: Side, folio: number | null, head: string) => React.ReactNode): Sheet {
  return {
    id,
    chapter,
    kind: 'paper',
    render: ({ side, folio }) => render(side, folio, headFor(side, chapter)),
  };
}

export function buildSheets(compact: boolean): Sheet[] {
  const sheets: Sheet[] = [];

  sheets.push({ id: 'cover', chapter: null, kind: 'cover', render: ({ side }) => <CoverBoard side={side} /> });
  sheets.push({
    id: 'contents',
    chapter: ch.contents,
    kind: 'paper',
    render: ({ side, folio }) => <ContentsPage side={side} folio={folio} />,
  });

  if (compact) {
    sheets.push(paper('summary', ch.summary, (side, folio, head) => <SummaryPage side={side} folio={folio} head={head} withNumbers={false} />));
    sheets.push(paper('numbers', ch.summary, (side, folio, head) => <NumbersPage side={side} folio={folio} head={head} />));
  } else {
    sheets.push(paper('summary', ch.summary, (side, folio, head) => <SummaryPage side={side} folio={folio} head={head} withNumbers />));
  }

  const groups = compact ? skillPages.compact : skillPages.spread;
  groups.forEach((g, i) =>
    sheets.push(
      paper(`skills-${i}`, ch.toolkit, (side, folio, head) => (
        <SkillsPage side={side} folio={folio} head={head} groups={g} opener={i === 0} closer={i === groups.length - 1} />
      )),
    ),
  );

  roles.forEach((role) => {
    const chapter = roleChapter[role.id];
    sheets.push(
      paper(`${role.id}-intro`, chapter, (side, folio, head) => (
        <RoleIntro side={side} folio={folio} head={head} role={role} numeral={chapter.numeral} figure={figures[role.id]} />
      )),
    );
    const n = role.bullets.length;
    const splits: [number, number][] = compact ? [[0, Math.ceil(n / 2)], [Math.ceil(n / 2), n]] : [[0, n]];
    splits.forEach(([from, to], i) =>
      sheets.push(
        paper(`${role.id}-work-${i}`, chapter, (side, folio, head) => (
          <RoleWork side={side} folio={folio} head={head} role={role} from={from} to={to} showStack={i === splits.length - 1} />
        )),
      ),
    );
  });

  projects.forEach((project, i) => {
    const parts = compact ? (['text', 'figure'] as const) : (['all'] as const);
    parts.forEach((part) =>
      sheets.push(
        paper(`${project.id}-${part}`, ch.projects, (side, folio, head) => (
          <ProjectPage side={side} folio={folio} head={head} project={project} figure={figures[project.id]} part={part} opener={i === 0} />
        )),
      ),
    );
  });

  sheets.push(paper('colophon', ch.colophon, (side, folio, head) => <ColophonPage side={side} folio={folio} head={head} />));
  sheets.push(paper('correspondence', ch.colophon, (side, folio, head) => <CorrespondencePage side={side} folio={folio} head={head} />));
  sheets.push({ id: 'back', chapter: null, kind: 'back', render: ({ side }) => <BackBoard side={side} /> });

  return sheets;
}
