'use client';

import { Flag, Lock, ArrowRight } from 'lucide-react';

const mono = 'font-mono';

function FigureFrame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="shrink-0">
      <div className="rounded-[0.5em] border border-[var(--rule)] bg-white/30 p-[0.7em] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        {children}
      </div>
      <figcaption className="mt-[0.45em] text-[0.68em] italic text-ink-faint">{caption}</figcaption>
    </figure>
  );
}

/* Send24: Redis GEOSEARCH around a pickup, with riders converging. */
export function DispatchFigure() {
  return (
    <FigureFrame caption="Fig. 1. Rider dispatch: a radius search around the pickup assigns the nearest available rider.">
      <svg viewBox="0 0 300 150" className="block w-full" role="img" aria-label="Dispatch map showing riders around a pickup point in Lagos">
        <defs>
          <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M12 0H0V12" fill="none" stroke="var(--rule)" strokeWidth="0.6" />
          </pattern>
        </defs>

        {/* Network view */}
        <rect x="0" y="0" width="118" height="150" fill="url(#grid)" opacity="0.7" />
        <path d="M0 128 C 30 124, 46 132, 70 134 S 100 140, 118 142" fill="none" stroke="var(--ink-faint)" strokeWidth="0.8" strokeDasharray="2 2" />
        <g stroke="var(--ink-faint)" strokeWidth="0.8" strokeDasharray="3 3" fill="none">
          <path d="M26 112 L76 44" />
          <path d="M76 44 L92 120" />
          <path d="M26 112 L92 120" />
        </g>
        {[
          { x: 26, y: 112, name: 'Lagos' },
          { x: 76, y: 44, name: 'Abuja' },
          { x: 92, y: 120, name: 'Port Harcourt' },
        ].map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r="3.4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
            <text x={c.x + (c.name === 'Port Harcourt' ? -2 : 6)} y={c.y + (c.name === 'Port Harcourt' ? 14 : -5)} fontSize="8" fill="var(--ink-soft)" fontFamily="var(--font-mono-face)" textAnchor={c.name === 'Port Harcourt' ? 'middle' : 'start'}>
              {c.name}
            </text>
          </g>
        ))}
        <path d="M26 112 L132 20" stroke="var(--vermilion)" strokeWidth="0.6" opacity="0.45" />
        <path d="M26 112 L132 140" stroke="var(--vermilion)" strokeWidth="0.6" opacity="0.45" />

        {/* Zoomed radius search */}
        <rect x="132" y="6" width="164" height="138" rx="5" fill="var(--paper)" stroke="var(--ink-faint)" strokeWidth="0.8" />
        <rect x="132" y="6" width="164" height="138" rx="5" fill="url(#grid)" opacity="0.8" />
        <circle cx="214" cy="75" r="46" fill="var(--vermilion)" fillOpacity="0.05" stroke="var(--vermilion)" strokeOpacity="0.5" strokeDasharray="3 3" />
        <circle cx="214" cy="75" r="4" fill="none" stroke="var(--vermilion)" strokeWidth="1">
          <animate attributeName="r" values="4;34" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <path d="M214 63 c -5 0 -8 4 -8 8 c 0 6 8 13 8 13 s 8 -7 8 -13 c 0 -4 -3 -8 -8 -8 z" fill="var(--vermilion)" />
        <circle cx="214" cy="71" r="2.6" fill="var(--paper)" />

        {/* riders outside the radius */}
        {[[150, 24], [282, 30], [160, 132], [284, 128]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="var(--ink-faint)" opacity="0.55" />
        ))}
        {/* candidates inside the radius */}
        {[[188, 52], [246, 98], [238, 46]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.4" fill="var(--moss)" />
        ))}
        {/* nearest rider takes the job */}
        <circle r="4" fill="var(--vermilion)" stroke="var(--paper)" strokeWidth="1.2">
          <animateMotion dur="3.2s" repeatCount="indefinite" keyTimes="0;0.25;0.8;1" keyPoints="0;0;1;1" calcMode="linear" path="M190 100 L 200 92 L 208 86 L 214 80" />
        </circle>
        <text x="140" y="139" fontSize="7" fill="var(--ink-faint)" fontFamily="var(--font-mono-face)">r = 3 km</text>
      </svg>

      <div className={`${mono} mt-[0.6em] overflow-hidden rounded-[0.3em] bg-ink px-[0.7em] py-[0.45em] text-[0.62em] leading-[1.5] whitespace-nowrap text-paper/90`}>
        <span className="text-foil">GEOSEARCH</span> riders FROMLONLAT 3.37 6.52 BYRADIUS 3 km ASC COUNT 3
      </div>

      <div className="mt-[0.7em] grid grid-cols-[auto_1fr] items-center gap-x-[0.7em] gap-y-[0.35em] text-[0.66em]">
        <span className={`${mono} text-ink-faint`}>before</span>
        <div className="flex items-center gap-[0.5em]">
          <div className="h-[0.55em] flex-1 rounded-full bg-ink-faint/35" />
          <span className={`${mono} text-ink-soft`}>~9 min</span>
        </div>
        <span className={`${mono} text-ink-faint`}>after</span>
        <div className="flex items-center gap-[0.5em]">
          <div className="h-[0.55em] w-[11%] origin-left animate-[grow-x_1.4s_ease-out_both] rounded-full bg-vermilion" />
          <span className={`${mono} text-vermilion`}>&lt;1 min</span>
          <span className="flex-1" />
        </div>
      </div>
    </FigureFrame>
  );
}

/* GMP: two opposing slips meet, matching writes a balanced ledger entry. */
export function MatchingFigure() {
  const slip = 'rounded-[0.35em] border border-[var(--rule)] bg-paper px-[0.6em] py-[0.45em] shadow-[0_1px_2px_rgba(0,0,0,0.08)]';
  return (
    <FigureFrame caption="Fig. 2. A back and an opposing bet are paired, then escrowed through a double-entry ledger that always balances.">
      <div className="relative grid grid-cols-2 gap-[0.6em] text-[0.7em]">
        <div className={`${slip} animate-[slip-left_4.8s_ease-in-out_infinite]`}>
          <div className={`${mono} text-[0.82em] text-moss`}>BACK</div>
          <div className="font-medium text-ink">Enyimba to win</div>
          <div className={`${mono} text-ink-soft`}>₦5,000 @ 2.10</div>
        </div>
        <div className={`${slip} animate-[slip-right_4.8s_ease-in-out_infinite] text-right`}>
          <div className={`${mono} text-[0.82em] text-vermilion`}>OPPOSE</div>
          <div className="font-medium text-ink">Enyimba not to win</div>
          <div className={`${mono} text-ink-soft`}>liability ₦5,500</div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className={`${mono} animate-[matched_4.8s_ease-in-out_infinite] rounded-full bg-ink px-[0.8em] py-[0.3em] text-[0.85em] text-paper shadow-md`}>
            matched in 18 ms
          </div>
        </div>
      </div>

      <table className={`${mono} mt-[0.7em] w-full border-collapse text-[0.62em] text-ink-soft`}>
        <thead>
          <tr className="border-b border-[var(--rule)] text-left text-ink-faint">
            <th className="py-[0.2em] font-normal">entry</th>
            <th className="py-[0.2em] font-normal">account</th>
            <th className="py-[0.2em] text-right font-normal">debit</th>
            <th className="py-[0.2em] text-right font-normal">credit</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['1', 'wallet/backer', '5,000.00', ''],
            ['1', 'escrow/m-2041', '', '5,000.00'],
            ['2', 'wallet/opposer', '5,500.00', ''],
            ['2', 'escrow/m-2041', '', '5,500.00'],
          ].map((row, i) => (
            <tr key={i} className="animate-[ledger-in_4.8s_ease-out_infinite]" style={{ animationDelay: `${i * 0.08}s` }}>
              {row.map((cell, j) => (
                <td key={j} className={`py-[0.12em] ${j >= 2 ? 'text-right' : ''} ${j === 1 ? 'text-ink' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-[var(--rule)] text-ink">
            <td className="pt-[0.2em]" colSpan={2}>Σ balanced</td>
            <td className="pt-[0.2em] text-right">10,500.00</td>
            <td className="pt-[0.2em] text-right">10,500.00</td>
          </tr>
        </tbody>
      </table>
    </FigureFrame>
  );
}

/* Devheit: a live feed of scored transactions; anything over the threshold goes to an analyst. */
const txns = [
  { id: 'tx_7Q2', amt: '₦48,200', signal: 'clean', score: 0.08 },
  { id: 'tx_7Q3', amt: '₦912,000', signal: 'account takeover', score: 0.91 },
  { id: 'tx_7Q4', amt: '₦3,500', signal: 'clean', score: 0.12 },
  { id: 'tx_7Q5', amt: '₦150,000', signal: 'ip velocity', score: 0.84 },
  { id: 'tx_7Q6', amt: '₦22,750', signal: 'new device', score: 0.41 },
  { id: 'tx_7Q7', amt: '₦610,000', signal: 'linked accounts', score: 0.88 },
];

export function FraudFigure() {
  const rows = [...txns, ...txns];
  return (
    <FigureFrame caption="Fig. 3. Rules plus a model score every transaction as it arrives. Anything over the threshold lands in the analyst queue.">
      <div className={`${mono} flex items-center justify-between text-[0.6em] text-ink-faint`}>
        <span>incoming</span>
        <span>review if score ≥ 0.80</span>
      </div>
      <div className="relative mt-[0.35em] h-[7.6em] overflow-hidden text-[0.66em]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' }}>
        <div className="animate-[ticker_10s_linear_infinite]">
          {rows.map((t, i) => {
            const flagged = t.score >= 0.8;
            return (
              <div key={i} className="grid h-[1.9em] grid-cols-[4.2em_5.2em_1fr_5.6em] items-center gap-[0.6em] border-b border-[var(--rule)]">
                <span className={`${mono} text-ink-faint`}>{t.id}</span>
                <span className={`${mono} text-right text-ink`}>{t.amt}</span>
                <span className={`flex items-center gap-[0.35em] truncate ${flagged ? 'text-vermilion' : 'text-ink-soft'}`}>
                  {flagged && <Flag className="size-[0.95em] shrink-0" aria-hidden="true" />}
                  {t.signal}
                </span>
                <span className="flex items-center gap-[0.4em]">
                  <span className="h-[0.45em] flex-1 overflow-hidden rounded-full bg-ink-faint/20">
                    <span className={`block h-full rounded-full ${flagged ? 'bg-vermilion' : 'bg-moss'}`} style={{ width: `${t.score * 100}%` }} />
                  </span>
                  <span className={`${mono} text-[0.9em] ${flagged ? 'text-vermilion' : 'text-ink-faint'}`}>{t.score.toFixed(2)}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </FigureFrame>
  );
}

/* Idempotency: the retry gets the stored response, the transfer only happens once. */
export function IdempotencyFigure() {
  const lines: { text: React.ReactNode; tone?: string }[] = [
    { text: <><span className="text-foil">POST</span> /v1/transfers</> },
    { text: <>Idempotency-Key: <span className="text-paper">9f2c41e7</span></>, tone: 'text-paper/60' },
    { text: <>201 Created <span className="text-paper/45">processed, ledger written</span></>, tone: 'text-[#9fd3b4]' },
    { text: <><span className="text-foil">POST</span> /v1/transfers <span className="text-paper/45"># client retry after timeout</span></> },
    { text: <>Idempotency-Key: <span className="text-paper">9f2c41e7</span></>, tone: 'text-paper/60' },
    { text: <>201 Created <span className="text-paper/45">replayed, not reprocessed</span></>, tone: 'text-[#9fd3b4]' },
  ];
  return (
    <FigureFrame caption="Fig. 4. Same key, same fingerprint: the second request returns the stored result instead of moving money twice.">
      <div className="overflow-hidden rounded-[0.4em] bg-ink text-[0.64em] leading-[1.65] text-paper/85 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-[0.45em] border-b border-white/10 px-[0.8em] py-[0.4em] text-paper/50">
          <span className="size-[0.65em] rounded-full bg-[#e0614a]" />
          <span className="size-[0.65em] rounded-full bg-[#e3b34b]" />
          <span className="size-[0.65em] rounded-full bg-[#6cc08b]" />
          <Lock className="ml-auto size-[1em]" aria-hidden="true" />
          <span className={mono}>payments-api</span>
        </div>
        <div className={`${mono} px-[0.9em] py-[0.6em] whitespace-nowrap`}>
          {lines.map((l, i) => (
            <div
              key={i}
              className={`animate-[line-cycle_9s_ease-out_infinite_backwards] ${l.tone ?? ''} ${i === 3 ? 'mt-[0.55em]' : ''} ${i % 3 !== 0 ? 'pl-[1.2em]' : ''}`}
              style={{ animationDelay: `${i * 0.55}s` }}
            >
              {l.text}
            </div>
          ))}
          <span className="inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-[caret_1s_steps(1)_infinite] bg-paper/70" />
        </div>
      </div>
    </FigureFrame>
  );
}

/* Webhook relay: gateways in, verify, dedupe, Kafka out; failures retry to a DLQ and replay. */
export function RelayFigure() {
  const box = (x: number, y: number, w: number, h: number, label: string, sub?: string, strong = false) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={strong ? 'var(--ink)' : 'var(--paper)'} stroke="var(--ink)" strokeWidth="0.9" />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 1 : h / 2 + 3)} textAnchor="middle" fontSize="8" fontFamily="var(--font-mono-face)" fill={strong ? 'var(--paper)' : 'var(--ink)'}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" fontSize="6" fontFamily="var(--font-mono-face)" fill={strong ? 'var(--foil)' : 'var(--ink-faint)'}>
          {sub}
        </text>
      )}
    </g>
  );
  const main = (y: number) => `M78 ${y} C 90 ${y}, 88 64, 98 64 L 238 64 L 267 64 L 267 112`;
  return (
    <FigureFrame caption="Fig. 5. Every gateway event is verified and deduplicated once, then fanned out through Kafka. Failures retry, park in a DLQ and can be replayed.">
      <svg viewBox="0 0 300 172" className="block w-full" role="img" aria-label="Webhook relay pipeline from payment gateways through Kafka">
        <g fill="none" stroke="var(--ink-faint)" strokeWidth="0.9">
          <path d="M78 24 C 90 24, 88 64, 98 64" />
          <path d="M78 64 L 98 64" />
          <path d="M78 104 C 90 104, 88 64, 98 64" />
          <path d="M154 64 L 170 64" />
          <path d="M222 64 L 238 64" />
          <path d="M267 80 L 267 112" />
          <path d="M267 132 L 267 156 L 204 156" strokeDasharray="3 2" stroke="var(--vermilion)" />
          <path d="M176 146 C 176 112, 230 112, 246 80" strokeDasharray="3 2" stroke="var(--moss)" />
        </g>
        <text x="236" y="152" fontSize="6.5" fontFamily="var(--font-mono-face)" fill="var(--vermilion)" textAnchor="end">retry ×3</text>
        <text x="186" y="120" fontSize="6.5" fontFamily="var(--font-mono-face)" fill="var(--moss)">replay</text>

        {box(4, 14, 74, 20, 'Paystack')}
        {box(4, 54, 74, 20, 'Flutterwave')}
        {box(4, 94, 74, 20, 'Monnify')}
        {box(98, 54, 56, 20, 'verify sig')}
        {box(170, 54, 52, 20, 'dedupe')}
        {box(238, 46, 58, 34, 'Kafka', 'payments.events', true)}
        {box(238, 112, 58, 20, 'consumers')}
        {box(150, 146, 54, 20, 'DLQ')}

        {[24, 64, 104].map((y, i) => (
          <circle key={y} r="2.8" fill="var(--moss)">
            <animateMotion dur="3.6s" begin={`${i * 1.2}s`} repeatCount="indefinite" path={main(y)} />
          </circle>
        ))}
        <circle r="2.8" fill="var(--vermilion)">
          <animateMotion dur="4.2s" begin="0.6s" repeatCount="indefinite" path="M267 132 L 267 156 L 204 156 L 177 156 L 176 146 C 176 112, 230 112, 246 80" />
        </circle>
      </svg>
      <div className="mt-[0.4em] flex items-center justify-center gap-[0.5em] text-[0.62em] text-ink-faint">
        <span className={mono}>at-least-once in</span>
        <ArrowRight className="size-[1.1em]" aria-hidden="true" />
        <span className={`${mono} text-ink`}>exactly-once effect out</span>
      </div>
    </FigureFrame>
  );
}
