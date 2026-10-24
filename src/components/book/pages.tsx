'use client';

import type { ReactNode } from 'react';
import {
  MapPin, Phone, Mail, CalendarRange, Truck, Handshake, ShieldAlert, KeyRound, Webhook,
  FileDown, FileText, Languages, ArrowUpRight, PenLine, Layers, ScrollText, Ruler,
} from 'lucide-react';
import { SiGithub, FaLinkedinIn } from './brand-icons';
import {
  person, summary, summaryClose, headlineStats, domains, skills, languages,
  type Role, type Project, type SkillGroup,
} from '@/content/cv';
import { Paper, Rich, ChapterHead, Ornament, type Side } from './paper';
import { TechIcon } from './tech-icon';
import { useBook, type Chapter } from './context';

type Ctx = { side: Side; folio: number | null };

/* ---------- Boards ---------- */

export function CoverBoard({ side }: { side: Side }) {
  return (
    <div className="cloth" data-side={side === 'left' ? 'left' : 'right'}>
      {/* hinge groove beside the spine */}
      <div className="absolute inset-y-0 left-[5.5%] w-[1.1%] bg-gradient-to-r from-black/35 via-white/5 to-black/20" />
      <div className="absolute inset-[6.5%] left-[11%] border border-foil/45">
        <div className="absolute inset-[1.2%] border border-foil/20" />
        {[
          'left-0 top-0 -translate-x-1/2 -translate-y-1/2',
          'right-0 top-0 translate-x-1/2 -translate-y-1/2',
          'left-0 bottom-0 -translate-x-1/2 translate-y-1/2',
          'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
        ].map((pos) => (
          <span key={pos} className={`absolute ${pos} size-[2.4cqw] border border-foil/60 bg-[var(--cloth)]`}>
            <span className="absolute inset-[22%] rotate-45 bg-foil/50" />
          </span>
        ))}
      </div>

      <div className="absolute inset-[6.5%] left-[11%] flex flex-col items-center px-[7cqw] py-[9cqh] text-center">
        <p className="smallcaps text-[3.1cqw] tracking-[0.32em] foil-text">Curriculum Vitae</p>

        <div className="my-auto">
          <h1 className="font-display text-[11.8cqw] leading-[0.96] font-semibold tracking-[-0.02em] foil-text">
            Bello
            <br />
            Olamilekan
          </h1>
          <div className="mx-auto my-[4.5cqh] flex items-center justify-center gap-[2cqw] text-foil/70">
            <span className="h-px w-[12cqw] bg-current" />
            <svg viewBox="0 0 12 12" className="size-[2.2cqw] fill-current"><path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" /></svg>
            <span className="h-px w-[12cqw] bg-current" />
          </div>
          <p className="font-display text-[5.2cqw] italic foil-text">{person.title}</p>
          <p className="mt-[2.4cqh] text-[2.9cqw] leading-[1.7] text-foil/75 smallcaps">
            {person.focus.join('  ·  ')}
          </p>
        </div>

        <div className="flex w-full items-end justify-between text-[2.6cqw] text-foil/70">
          <span className="smallcaps">{person.location}</span>
          <span className="grid size-[11cqw] place-items-center rounded-full border border-foil/55 font-display text-[4.2cqw] font-semibold foil-text">
            BO
          </span>
          <span className="smallcaps">Edition 2026</span>
        </div>
      </div>
    </div>
  );
}

export function BackBoard({ side }: { side: Side }) {
  return (
    <div className="cloth" data-side={side === 'right' || side === 'solo' ? 'right' : 'left'}>
      <div className="absolute inset-y-0 right-[5.5%] w-[1.1%] bg-gradient-to-l from-black/35 via-white/5 to-black/20" />
      <div className="absolute inset-[6.5%] right-[11%] flex flex-col px-[7cqw] py-[8cqh] text-foil/80">
        <p className="smallcaps text-[2.8cqw] tracking-[0.3em] foil-text">From the author</p>
        <p className="mt-[4cqh] font-display text-[4.3cqw] leading-[1.45] italic text-foil/85">
          “{summaryClose}”
        </p>
        <div className="mt-[5cqh] flex flex-wrap gap-x-[2.4cqw] gap-y-[1.4cqh] text-[2.7cqw] smallcaps text-foil/70">
          {['Go', 'TypeScript', 'C#', 'Java', 'Kafka', 'Kubernetes', 'PostgreSQL', 'Redis'].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between">
          <span className="grid size-[11cqw] place-items-center rounded-full border border-foil/55 font-display text-[4.2cqw] font-semibold foil-text">BO</span>
          <div className="rounded-[0.6cqw] bg-[#f3ecdc] px-[2.4cqw] pt-[1.6cqw] pb-[1cqw] text-center">
            <div className="flex h-[8cqh] items-stretch gap-[0.35cqw]" aria-hidden="true">
              {'1101001011101100101101110010110100111010110'.split('').map((b, i) => (
                <span key={i} className={b === '1' ? 'w-[0.55cqw] bg-[#1b1a17]' : 'w-[0.3cqw]'} />
              ))}
            </div>
            <div className="mt-[0.6cqw] font-mono text-[1.9cqw] text-[#1b1a17]">{person.githubLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Contents & contact ---------- */

export function ContentsPage({ side, folio }: Ctx) {
  const { sheets, goToSheet } = useBook();
  const chapters: { chapter: Chapter; index: number }[] = [];
  sheets.forEach((s, i) => {
    if (s.chapter && s.chapter.id !== 'contents' && !chapters.some((c) => c.chapter.id === s.chapter!.id)) {
      chapters.push({ chapter: s.chapter, index: i });
    }
  });

  return (
    <Paper side={side} folio={null}>
      <div className="smallcaps text-[0.74em] text-ink-faint">Ex libris</div>
      <h2 className="mt-[0.3em] font-display text-[2.15em] leading-none font-medium text-ink">Contents</h2>

      <ol className="mt-[1.1em] space-y-[0.32em]">
        {chapters.map(({ chapter, index }) => (
          <li key={chapter.id}>
            <button
              type="button"
              onClick={() => goToSheet(index)}
              className="group flex w-full items-baseline text-left text-[1.02em] text-ink transition-colors hover:text-vermilion focus-visible:text-vermilion focus-visible:outline-none"
            >
              <span className="w-[2.2em] shrink-0 font-mono text-[0.72em] text-vermilion">{chapter.numeral}</span>
              <span className="font-display group-hover:italic">{chapter.title}</span>
              <span className="leader" />
              <span className="font-display tabular-nums text-ink-soft">{index}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-auto rounded-[0.5em] border border-[var(--rule)] bg-white/25 p-[1em]">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[1.15em] font-medium text-ink">{person.name}</span>
          <span className="smallcaps text-[0.7em] text-ink-faint">Correspondence</span>
        </div>
        <ul className="mt-[0.55em] grid gap-[0.3em] text-[0.82em] text-ink-soft">
          <ContactLine icon={<MapPin />} text={person.location} />
          <ContactLine icon={<Phone />} text={person.phone} href={person.phoneHref} />
          <ContactLine icon={<Mail />} text={person.email} href={`mailto:${person.email}`} />
          <ContactLine icon={<SiGithub />} text={person.githubLabel} href={person.github} />
          <ContactLine icon={<FaLinkedinIn />} text={person.linkedinLabel} href={person.linkedin} />
        </ul>
      </div>
      {folio != null && <span className="sr-only">Page {folio}</span>}
    </Paper>
  );
}

function ContactLine({ icon, text, href }: { icon: ReactNode; text: string; href?: string }) {
  const inner = (
    <>
      <span className="grid size-[1.5em] shrink-0 place-items-center text-vermilion [&_svg]:size-[0.95em]">{icon}</span>
      <span className="truncate">{text}</span>
      {href && <ArrowUpRight className="ml-auto size-[0.9em] shrink-0 opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true" />}
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-center gap-[0.4em] hover:text-ink">
          {inner}
        </a>
      ) : (
        <span className="flex items-center gap-[0.4em]">{inner}</span>
      )}
    </li>
  );
}

/* ---------- Summary ---------- */

export function SummaryPage({ side, folio, head, withNumbers }: Ctx & { head: string; withNumbers: boolean }) {
  return (
    <Paper side={side} folio={folio} head={head}>
      <ChapterHead numeral="I" kicker="Professional summary" title={<>Systems that hold up <span className="italic text-vermilion">under load.</span></>} icon={<ScrollText />} />
      <p className="drop-cap mt-[1em] text-[1.02em] leading-[1.55] text-ink-soft hyphens-auto">{summary}</p>
      <p className="mt-[0.7em] text-[1.02em] leading-[1.55] text-ink-soft hyphens-auto">{summaryClose}</p>
      {withNumbers && (
        <>
          <div className="my-auto py-[1em]">
            <Ornament className="mb-[0.7em]" />
            <ul className="flex flex-wrap justify-center gap-x-[1.4em] gap-y-[0.3em] font-display text-[0.95em] italic text-ink-soft">
              {domains.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <Numbers />
        </>
      )}
    </Paper>
  );
}

export function NumbersPage({ side, folio, head }: Ctx & { head: string }) {
  return (
    <Paper side={side} folio={folio} head={head}>
      <div className="smallcaps text-[0.74em] text-ink-faint">The record, in numbers</div>
      <h2 className="mt-[0.35em] font-display text-[1.9em] leading-[1.05] font-medium text-ink">
        Measured in production, <span className="italic">not in slides.</span>
      </h2>
      <Numbers className="mt-[1.4em]" />
      <div className="mt-auto">
        <Ornament className="mb-[0.8em]" />
        <p className="text-center text-[0.82em] text-ink-soft">
          Delivered across <span className="text-ink">{domains.join(', ').replace(/, ([^,]*)$/, ' and $1').toLowerCase()}</span>.
        </p>
      </div>
    </Paper>
  );
}

function Numbers({ className = '' }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-[1.2em] gap-y-[0.9em] border-t border-[var(--rule)] pt-[0.9em] ${className}`}>
      {headlineStats.map((s) => (
        <div key={s.value}>
          <dt className="font-display text-[1.75em] leading-none font-medium tracking-[-0.02em] text-ink">{s.value}</dt>
          <dd className="mt-[0.3em] text-[0.74em] leading-[1.35] text-ink-soft">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Skills ---------- */

export function SkillsPage({
  side, folio, head, groups, opener, closer,
}: Ctx & { head: string; groups: SkillGroup[]; opener: boolean; closer: boolean }) {
  return (
    <Paper side={side} folio={folio} head={head}>
      {opener ? (
        <ChapterHead numeral="II" kicker="Technical skills" title={<>The <span className="italic">toolkit.</span></>} icon={<Ruler />} />
      ) : (
        <div className="smallcaps shrink-0 text-[0.74em] text-ink-faint">Technical skills, continued</div>
      )}
      <div className="mt-[1.2em] flex flex-1 flex-col gap-[1.3em] text-[1.06em]">
        {groups.map((g) => (
          <section key={g.name}>
            <h3 className="mb-[0.45em] flex items-center gap-[0.5em] font-display text-[1.02em] font-medium text-ink">
              {g.name}
              <span className="h-px flex-1 bg-[var(--rule)]" />
              <span className="font-mono text-[0.65em] text-ink-faint">{String(g.items.length).padStart(2, '0')}</span>
            </h3>
            <ul className="flex flex-wrap gap-[0.36em]">
              {g.items.map((item) => (
                <li key={item} className="ink-chip">
                  <TechIcon name={item} className="size-[1.05em] text-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {closer && <Ornament className="mt-[0.8em]" />}
    </Paper>
  );
}

export const skillPages = {
  spread: [skills.slice(0, 4), skills.slice(4)],
  compact: [skills.slice(0, 2), skills.slice(2, 4), skills.slice(4, 6), skills.slice(6)],
};

/* ---------- Experience ---------- */

const roleIcons: Record<string, ReactNode> = {
  send24: <Truck />,
  gmp: <Handshake />,
  devheit: <ShieldAlert />,
};

export function RoleIntro({
  side, folio, head, role, numeral, figure,
}: Ctx & { head: string; role: Role; numeral: string; figure: ReactNode }) {
  return (
    <Paper side={side} folio={folio} head={head}>
      <ChapterHead
        numeral={numeral}
        kicker={role.role}
        title={<>{role.company}<span className="text-ink-faint">, </span><span className="italic text-ink-soft">{role.org}</span></>}
        icon={roleIcons[role.id]}
      />
      <div className="mt-[0.6em] flex flex-wrap gap-x-[1.1em] gap-y-[0.2em] text-[0.76em] text-ink-soft">
        <span className="flex items-center gap-[0.35em]"><MapPin className="size-[1em] text-vermilion" aria-hidden="true" />{role.location}</span>
        <span className="flex items-center gap-[0.35em]"><CalendarRange className="size-[1em] text-vermilion" aria-hidden="true" />{role.period}</span>
      </div>
      <p className="mt-[0.8em] text-[0.98em] leading-[1.5] italic text-ink-soft">{role.blurb}</p>

      <dl className={`mt-[0.9em] grid gap-[0.8em] border-y border-[var(--rule)] py-[0.7em] ${role.metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {role.metrics.map((m) => (
          <div key={m.label}>
            <dt className="font-display text-[1.35em] leading-[1.05] font-medium tracking-[-0.015em] text-ink">{m.value}</dt>
            <dd className="mt-[0.25em] text-[0.68em] leading-[1.3] text-ink-faint">{m.label}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-1 flex-col justify-center pt-[0.9em]">{figure}</div>
    </Paper>
  );
}

export function RoleWork({
  side, folio, head, role, from, to, showStack,
}: Ctx & { head: string; role: Role; from: number; to: number; showStack: boolean }) {
  const items = role.bullets.slice(from, to);
  return (
    <Paper side={side} folio={folio} head={head}>
      <div className="flex shrink-0 items-baseline justify-between">
        <h3 className="font-display text-[1.3em] font-medium text-ink">
          {from === 0 ? 'What I built' : <>What I built, <span className="italic">continued</span></>}
        </h3>
        <span className="font-mono text-[0.66em] text-ink-faint">{role.company}</span>
      </div>
      <ol className="mt-[0.9em] space-y-[0.8em]">
        {items.map((b, i) => (
          <li key={i} className="grid grid-cols-[2em_1fr] text-[0.9em] leading-[1.5] text-ink-soft">
            <span className="pt-[0.18em] font-mono text-[0.72em] text-vermilion">{String(from + i + 1).padStart(2, '0')}</span>
            <span className="hyphens-auto"><Rich text={b} /></span>
          </li>
        ))}
      </ol>
      {showStack && (
        <div className="mt-auto pt-[1em]">
          <div className="smallcaps mb-[0.45em] text-[0.7em] text-ink-faint">Built with</div>
          <ul className="flex flex-wrap gap-[0.36em]">
            {role.stack.map((s) => (
              <li key={s} className="ink-chip">
                <TechIcon name={s} className="size-[1.05em] text-ink" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Paper>
  );
}

/* ---------- Projects ---------- */

const projectIcons: Record<string, ReactNode> = {
  idempotency: <KeyRound />,
  'webhook-relay': <Webhook />,
};

export function ProjectPage({
  side, folio, head, project, figure, part, opener,
}: Ctx & { head: string; project: Project; figure: ReactNode; part: 'all' | 'text' | 'figure'; opener: boolean }) {
  const header = (
    <>
      {opener ? (
        <ChapterHead numeral="VI" kicker="Selected projects" title={project.name} icon={projectIcons[project.id]} />
      ) : (
        <header className="flex shrink-0 items-start justify-between gap-[0.6em]">
          <h2 className="font-display text-[2.15em] leading-[1.02] font-medium tracking-[-0.015em] text-ink">{project.name}</h2>
          <span className="pt-[0.3em] text-ink-faint [&_svg]:size-[1.35em]">{projectIcons[project.id]}</span>
        </header>
      )}
      <p className="mt-[0.2em] font-display text-[1.1em] italic text-ink-soft">{project.tagline}</p>
      <ul className="mt-[0.7em] flex flex-wrap gap-[0.36em]">
        {project.stack.map((s) => (
          <li key={s} className="ink-chip">
            <TechIcon name={s} className="size-[1.05em] text-ink" />
            {s}
          </li>
        ))}
      </ul>
    </>
  );

  if (part === 'figure') {
    return (
      <Paper side={side} folio={folio} head={head}>
        <div className="smallcaps shrink-0 text-[0.74em] text-ink-faint">How it behaves</div>
        <h3 className="mt-[0.3em] font-display text-[1.5em] leading-[1.1] font-medium text-ink">{project.name}</h3>
        <div className="my-auto pt-[1em]">{figure}</div>
      </Paper>
    );
  }

  return (
    <Paper side={side} folio={folio} head={head}>
      {header}
      <ul className="mt-[0.8em] space-y-[0.42em]">
        {project.bullets.map((b, i) => (
          <li key={i} className="grid grid-cols-[1.1em_1fr] text-[0.85em] leading-[1.45] text-ink-soft">
            <span className="pt-[0.62em]"><span className="block size-[0.3em] rotate-45 bg-vermilion" /></span>
            <span className="hyphens-auto"><Rich text={b} /></span>
          </li>
        ))}
      </ul>
      {part === 'all' && <div className="mt-auto pt-[0.9em]">{figure}</div>}
    </Paper>
  );
}

/* ---------- Colophon & correspondence ---------- */

const principles = [
  { title: 'Performance', text: 'Measured with k6 and Prometheus before it is promised.' },
  { title: 'Reliability', text: 'Retries, dead-letter queues and autoscaling planned in, not bolted on.' },
  { title: 'Data consistency', text: 'Double-entry ledgers and idempotent processing where money moves.' },
  { title: 'Measurable outcomes', text: 'Minutes off dispatch, tickets off support, discrepancies at zero.' },
];

export function ColophonPage({ side, folio, head }: Ctx & { head: string }) {
  return (
    <Paper side={side} folio={folio} head={head}>
      <ChapterHead numeral="VII" kicker="Colophon" title={<>How this engineer <span className="italic">works.</span></>} icon={<Layers />} />
      <dl className="mt-[1em] space-y-[0.7em]">
        {principles.map((p) => (
          <div key={p.title} className="grid grid-cols-[7.4em_1fr] gap-[0.8em] border-b border-[var(--rule)] pb-[0.7em] text-[0.95em]">
            <dt className="font-display font-medium text-ink">{p.title}</dt>
            <dd className="leading-[1.45] text-ink-soft">{p.text}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-[1.1em] flex items-start gap-[0.8em] text-[0.88em]">
        <Languages className="mt-[0.2em] size-[1.1em] shrink-0 text-vermilion" aria-hidden="true" />
        <div>
          <div className="smallcaps text-[0.82em] text-ink-faint">Languages</div>
          <div className="text-ink">
            {languages.map((l, i) => (
              <span key={l.name}>
                {i > 0 && <span className="mx-[0.5em] text-ink-faint">/</span>}
                {l.name} <span className="italic text-ink-soft">{l.level.toLowerCase()}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-[1em]">
        <div className="smallcaps mb-[0.5em] text-[0.72em] text-ink-faint">Take a copy</div>
        <div className="flex flex-wrap gap-[0.5em]">
          <a href={person.cvPdf} download="Bello_Olamilekan_CV.pdf" className="inline-flex items-center gap-[0.45em] rounded-full bg-ink px-[1em] py-[0.5em] text-[0.82em] text-paper transition-transform hover:-translate-y-px">
            <FileDown className="size-[1.1em]" aria-hidden="true" /> CV as PDF
          </a>
          <a href={person.cvDocx} download="Bello_Olamilekan_CV.docx" className="inline-flex items-center gap-[0.45em] rounded-full border border-ink/30 px-[1em] py-[0.5em] text-[0.82em] text-ink transition-colors hover:border-ink">
            <FileText className="size-[1.1em]" aria-hidden="true" /> Word version
          </a>
        </div>
      </div>
    </Paper>
  );
}

export function CorrespondencePage({ side, folio, head }: Ctx & { head: string }) {
  const rows = [
    { icon: <Mail />, label: 'Write', text: person.email, href: `mailto:${person.email}` },
    { icon: <Phone />, label: 'Call', text: person.phone, href: person.phoneHref },
    { icon: <SiGithub />, label: 'Read the code', text: person.githubLabel, href: person.github },
    { icon: <FaLinkedinIn />, label: 'Connect', text: person.linkedinLabel, href: person.linkedin },
  ];
  return (
    <Paper side={side} folio={folio} head={head}>
      <div className="smallcaps text-[0.74em] text-ink-faint">Correspondence</div>
      <h2 className="mt-[0.35em] font-display text-[2.3em] leading-[1.02] font-medium tracking-[-0.015em] text-ink">
        Have a system that needs to <span className="italic text-vermilion">hold up?</span>
      </h2>
      <p className="mt-[0.8em] text-[0.95em] leading-[1.5] text-ink-soft">
        I am open to full-stack and backend engineering roles, especially on transaction, logistics and real-time platforms. Based in {person.location}.
      </p>

      <ul className="mt-[1.1em] divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {rows.map((r) => (
          <li key={r.label}>
            <a
              href={r.href}
              target={r.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-[0.8em] py-[0.8em] text-[0.98em]"
            >
              <span className="grid size-[2em] shrink-0 place-items-center rounded-full border border-[var(--rule)] text-ink transition-colors group-hover:border-vermilion group-hover:bg-vermilion group-hover:text-paper [&_svg]:size-[0.95em]">
                {r.icon}
              </span>
              <span className="min-w-0">
                <span className="block smallcaps text-[0.78em] text-ink-faint">{r.label}</span>
                <span className="block truncate text-ink">{r.text}</span>
              </span>
              <ArrowUpRight className="ml-auto size-[1.1em] shrink-0 text-ink-faint transition-transform group-hover:translate-x-[0.15em] group-hover:-translate-y-[0.15em] group-hover:text-vermilion" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <a href="#write" className="mt-auto inline-flex items-center gap-[0.5em] self-start pt-[1em] text-[0.88em] text-ink underline decoration-vermilion/50 underline-offset-4 hover:decoration-vermilion">
        <PenLine className="size-[1.05em] text-vermilion" aria-hidden="true" /> Or leave a note after the last page
      </a>
    </Paper>
  );
}
