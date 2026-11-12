'use client';


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

/* EatGo: an order moves forward one state at a time; ignored orders fall off to "cancelled". */
export function OrderLifecycleFigure() {
  const states = [
    { x: 20, label: 'placed' },
    { x: 82, label: 'paid' },
    { x: 148, label: 'in progress' },
    { x: 216, label: 'out for' , label2: 'delivery' },
    { x: 280, label: 'delivered' },
  ];
  return (
    <FigureFrame caption="Fig. 3. Stripe's webhook marks an order paid, the restaurant moves it on from there, and a job cancels any order left waiting past the delivery estimate.">
      <svg viewBox="0 0 300 150" className="block w-full" role="img" aria-label="Order lifecycle from placed to delivered, with ignored orders cancelled">
        <g>
          <rect x="44" y="4" width="76" height="20" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="0.9" />
          <text x="82" y="17" textAnchor="middle" fontSize="7.5" fontFamily="var(--font-mono-face)" fill="var(--ink)">Stripe webhook</text>
          <path d="M82 24 L82 50" stroke="var(--moss)" strokeWidth="0.9" strokeDasharray="2.5 2" fill="none" />
          <path d="M79 46 L82 51 L85 46" stroke="var(--moss)" strokeWidth="0.9" fill="none" />
          <text x="88" y="40" fontSize="6.2" fontFamily="var(--font-mono-face)" fill="var(--moss)">signature verified</text>
        </g>

        <path d="M20 60 L280 60" stroke="var(--ink-faint)" strokeWidth="1" />
        {states.map((s, i) => (
          <g key={s.label}>
            <circle cx={s.x} cy="60" r="6" fill={i === states.length - 1 ? 'var(--moss)' : 'var(--paper)'} stroke="var(--ink)" strokeWidth="1.1" />
            <text x={s.x} y="78" textAnchor="middle" fontSize="7.2" fontFamily="var(--font-mono-face)" fill="var(--ink-soft)">{s.label}</text>
            {s.label2 && <text x={s.x} y="87" textAnchor="middle" fontSize="7.2" fontFamily="var(--font-mono-face)" fill="var(--ink-soft)">{s.label2}</text>}
          </g>
        ))}

        <path d="M20 66 C 20 112, 52 126, 96 126" stroke="var(--vermilion)" strokeWidth="0.9" strokeDasharray="3 2" fill="none" />
        <path d="M82 66 C 82 104, 96 118, 104 120" stroke="var(--vermilion)" strokeWidth="0.9" strokeDasharray="3 2" fill="none" />
        <rect x="96" y="116" width="62" height="20" rx="4" fill="var(--paper)" stroke="var(--vermilion)" strokeWidth="0.9" />
        <text x="127" y="129" textAnchor="middle" fontSize="7.5" fontFamily="var(--font-mono-face)" fill="var(--vermilion)">cancelled</text>
        <text x="166" y="124" fontSize="6.2" fontFamily="var(--font-mono-face)" fill="var(--ink-faint)">ETA passed, no confirmation</text>
        <text x="166" y="133" fontSize="6.2" fontFamily="var(--font-mono-face)" fill="var(--ink-faint)">job checks every 60 s</text>

        <circle r="4.2" fill="var(--moss)" stroke="var(--paper)" strokeWidth="1.2">
          <animateMotion dur="7s" repeatCount="indefinite" calcMode="linear" path="M20 60 L280 60"
            keyTimes="0;0.08;0.18;0.28;0.38;0.48;0.58;0.68;0.78;1" keyPoints="0;0;0.238;0.238;0.492;0.492;0.754;0.754;1;1" />
        </circle>
        <circle r="3.4" fill="var(--vermilion)" stroke="var(--paper)" strokeWidth="1">
          <animateMotion dur="7s" begin="1.5s" repeatCount="indefinite" calcMode="linear" path="M20 60 L20 66 C 20 112, 52 126, 96 126"
            keyTimes="0;0.55;0.8;1" keyPoints="0;0;1;1" />
        </circle>
      </svg>
      <div className="mt-[0.3em] flex items-center justify-center gap-[0.5em] text-[0.62em] text-ink-faint">
        <span className="font-mono">customer page polls every</span>
        <span className="font-mono text-ink">5 s</span>
      </div>
    </FigureFrame>
  );
}

/* Send24: one parcel's journey, from booking to cash settled at the door. */
export function DeliveryJourneyFigure() {
  const stops = [
    { x: 32, label: 'booked', note: 'quote + pickup' },
    { x: 92, label: 'assigned', note: '<1 min, GEO radius' },
    { x: 152, label: 'picked up', note: 'rider app' },
    { x: 212, label: 'in transit', note: 'live on the map' },
    { x: 268, label: 'delivered', note: 'OTP + photo' },
  ];
  return (
    <FigureFrame caption="Fig. 4. Every parcel moves through the same five checkpoints, each one recorded, and a cash-on-delivery order only closes once the money collected is reconciled.">
      <svg viewBox="0 0 300 150" className="block w-full" role="img" aria-label="Parcel journey from booking to delivery and cash settlement">
        <path d="M32 54 C 66 30, 114 78, 152 54 S 234 30, 268 54" fill="none" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3 2.5" />
        {stops.map((s, i) => {
          const y = [54, 52, 54, 46, 54][i];
          return (
            <g key={s.label}>
              <circle cx={s.x} cy={y} r="6" fill={i === stops.length - 1 ? 'var(--moss)' : 'var(--paper)'} stroke="var(--ink)" strokeWidth="1.1" />
              <text x={s.x} y={y + 18} textAnchor="middle" fontSize="7.4" fontFamily="var(--font-mono-face)" fill="var(--ink)">{s.label}</text>
              <text x={s.x} y={y + 27} textAnchor="middle" fontSize="6" fontFamily="var(--font-mono-face)" fill="var(--ink-faint)">{s.note}</text>
            </g>
          );
        })}
        <g>
          <circle r="4.6" fill="var(--vermilion)" stroke="var(--paper)" strokeWidth="1.2">
            <animateMotion dur="7s" repeatCount="indefinite" calcMode="linear" path="M32 54 C 66 30, 114 78, 152 54 S 234 30, 268 54"
              keyTimes="0;0.08;0.2;0.3;0.42;0.52;0.66;0.76;0.88;1" keyPoints="0;0;0.24;0.24;0.5;0.5;0.76;0.76;1;1" />
          </circle>
        </g>

        <path d="M268 82 L 268 104" stroke="var(--moss)" strokeWidth="0.9" strokeDasharray="2.5 2" fill="none" />
        <path d="M265 100 L268 105 L271 100" stroke="var(--moss)" strokeWidth="0.9" fill="none" />
        <rect x="200" y="108" width="92" height="30" rx="4" fill="var(--ink)" />
        <text x="246" y="121" textAnchor="middle" fontSize="7.4" fontFamily="var(--font-mono-face)" fill="var(--paper)">COD reconciled</text>
        <text x="246" y="131" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono-face)" fill="var(--foil)">settled to merchant</text>

        <rect x="4" y="108" width="150" height="30" rx="4" fill="var(--paper)" stroke="var(--rule)" />
        <text x="12" y="121" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--ink-soft)">offline? the rider app queues</text>
        <text x="12" y="131" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--ink-soft)">updates and syncs when back</text>
      </svg>
    </FigureFrame>
  );
}

/* Keepsake: two ways to learn a payment succeeded, one place that marks it paid. */
export function PaymentConfirmationFigure() {
  return (
    <FigureFrame caption="Fig. 2. The customer's return and Paystack's webhook can both arrive. Whichever reaches the guarded update first marks the order paid; the other changes nothing.">
      <svg viewBox="0 0 300 160" className="block w-full" role="img" aria-label="Return page and webhook both confirming one Paystack payment exactly once">
        <rect x="4" y="10" width="96" height="30" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="0.9" />
        <text x="52" y="23" textAnchor="middle" fontSize="7.4" fontFamily="var(--font-mono-face)" fill="var(--ink)">return page</text>
        <text x="52" y="33" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono-face)" fill="var(--ink-faint)">verify reference</text>

        <rect x="4" y="74" width="96" height="30" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="0.9" />
        <text x="52" y="87" textAnchor="middle" fontSize="7.4" fontFamily="var(--font-mono-face)" fill="var(--ink)">webhook</text>
        <text x="52" y="97" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono-face)" fill="var(--ink-faint)">HMAC-SHA512 checked</text>

        <path d="M100 25 C 124 25, 122 57, 140 57" fill="none" stroke="var(--ink-faint)" strokeWidth="0.9" />
        <path d="M100 89 C 124 89, 122 57, 140 57" fill="none" stroke="var(--ink-faint)" strokeWidth="0.9" />

        <rect x="140" y="38" width="96" height="38" rx="4" fill="var(--ink)" />
        <text x="188" y="51" textAnchor="middle" fontSize="7.4" fontFamily="var(--font-mono-face)" fill="var(--paper)">fulfil order</text>
        <text x="188" y="61" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono-face)" fill="var(--foil)">amount + NGN match?</text>
        <text x="188" y="70" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono-face)" fill="var(--foil)">WHERE isPaid = false</text>

        <path d="M236 50 L 245 50 L 245 28 L 250 28" fill="none" stroke="var(--moss)" strokeWidth="0.9" />
        <rect x="250" y="16" width="48" height="24" rx="4" fill="var(--paper)" stroke="var(--moss)" strokeWidth="0.9" />
        <text x="274" y="26" textAnchor="middle" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--moss)">paid +</text>
        <text x="274" y="35" textAnchor="middle" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--moss)">1 email</text>

        <path d="M236 66 L 245 66 L 245 88 L 250 88" fill="none" stroke="var(--ink-faint)" strokeWidth="0.9" strokeDasharray="3 2" />
        <rect x="250" y="76" width="48" height="24" rx="4" fill="var(--paper)" stroke="var(--ink-faint)" strokeWidth="0.9" />
        <text x="274" y="86" textAnchor="middle" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--ink-faint)">already</text>
        <text x="274" y="95" textAnchor="middle" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--ink-faint)">paid: no-op</text>

        <circle r="3.6" fill="var(--moss)" stroke="var(--paper)" strokeWidth="1">
          <animateMotion dur="5s" repeatCount="indefinite" keyTimes="0;0.55;1" keyPoints="0;1;1" calcMode="linear" path="M100 25 C 124 25, 122 57, 140 57 L 236 50 L 252 50 L 252 28 L 258 28" />
        </circle>
        <circle r="3.6" fill="var(--vermilion)" stroke="var(--paper)" strokeWidth="1">
          <animateMotion dur="5s" begin="0.9s" repeatCount="indefinite" keyTimes="0;0.55;1" keyPoints="0;1;1" calcMode="linear" path="M100 89 C 124 89, 122 57, 140 57 L 236 66 L 252 66 L 252 88 L 258 88" />
        </circle>

        <rect x="4" y="122" width="292" height="30" rx="4" fill="var(--paper)" stroke="var(--rule)" />
        <text x="14" y="135" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--ink-soft)">price set on the server in kobo: base + material + finish</text>
        <text x="14" y="145" fontSize="6.4" fontFamily="var(--font-mono-face)" fill="var(--ink-soft)">the client never decides what it is charged</text>
      </svg>
    </FigureFrame>
  );
}
