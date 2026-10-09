import type { DiagramKey } from "@/lib/content";

const s = { stroke: "var(--ink)", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Forms() {
  const items = [
    { l: "Light", c: "var(--sun)", e: <circle cx="0" cy="0" r="18" fill="var(--sun)" {...s} /> },
    { l: "Sound", c: "var(--sky)", e: <path d="M-16 -8 h10 l12 -12 v40 l-12 -12 h-10z" fill="var(--sky)" {...s} /> },
    { l: "Thermal", c: "var(--flame)", e: <path d="M0 -22 C14 -6 14 8 0 20 C-14 8 -14 -6 0 -22z" fill="var(--flame)" {...s} /> },
    { l: "Electrical", c: "var(--sun)", e: <path d="M4 -22 L-10 4 H2 L-4 22 L12 -4 H0z" fill="var(--sun)" {...s} /> },
    { l: "Kinetic", c: "var(--leaf)", e: <><circle cx="4" cy="0" r="14" fill="var(--leaf)" {...s} /><path d="M-26 -8h12M-28 4h14" {...s} /></> },
    { l: "Chemical", c: "var(--grape)", e: <><rect x="-10" y="-20" width="20" height="40" rx="4" fill="var(--grape)" {...s} /><rect x="-4" y="-25" width="8" height="5" fill="var(--ink)" /></> },
  ];
  return (
    <svg viewBox="0 0 600 130" className="w-full">
      {items.map((it, i) => (
        <g key={it.l} transform={`translate(${50 + i * 100},50)`}>
          <circle r="38" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeDasharray="4 4" />
          {it.e}
          <text y="66" textAnchor="middle" className="diagram-label">{it.l}</text>
        </g>
      ))}
    </svg>
  );
}

function Circuit() {
  return (
    <svg viewBox="0 0 500 220" className="mx-auto w-full max-w-md">
      <rect x="80" y="40" width="340" height="140" rx="16" fill="none" stroke="var(--flame)" strokeWidth="5" />
      <rect x="60" y="85" width="40" height="60" rx="5" fill="var(--grape)" {...s} />
      <rect x="72" y="78" width="16" height="8" fill="var(--ink)" />
      <g transform="translate(250,40)"><circle r="26" fill="var(--sun)" {...s} /><path d="M-8 6 l4 -10 l4 10 l4 -10" {...s} fill="none" /></g>
      <g transform="translate(250,180)"><rect x="-30" y="-8" width="60" height="16" fill="var(--paper)" {...s} /><path d="M-20 0 L18 -22" {...s} /></g>
      {[["A", 30, 115], ["B", 250, 18], ["C", 250, 212], ["D", 440, 110]].map(([t, x, y]) => (
        <g key={t as string}><circle cx={x as number} cy={(y as number) - 5} r="12" fill="var(--paper)" {...s} strokeWidth={2} /><text x={x as number} y={y as number} textAnchor="middle" className="diagram-label">{t}</text></g>
      ))}
    </svg>
  );
}

function Coaster() {
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      <path d="M20 200 L20 60 C80 20 120 30 160 80 C220 170 260 190 320 180 C380 170 400 100 460 110 C520 120 560 170 590 190" fill="none" stroke="var(--ink)" strokeWidth="5" />
      <rect x="40" y="25" width="44" height="26" rx="6" fill="var(--flame)" {...s} />
      <rect x="270" y="160" width="44" height="26" rx="6" fill="var(--flame)" {...s} />
      <path d="M220 175 h30 M230 165 h20" {...s} />
      <text x="62" y="15" textAnchor="middle" className="diagram-label">MOST potential</text>
      <text x="292" y="212" textAnchor="middle" className="diagram-label">MOST kinetic</text>
      <rect x="400" y="20" width="180" height="56" rx="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <text x="490" y="44" textAnchor="middle" className="diagram-small">Going down: PE → KE</text>
      <text x="490" y="64" textAnchor="middle" className="diagram-small">Going up: KE → PE</text>
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 240 120" className="w-full">
      <circle cx="40" cy="55" r="28" fill="var(--sun)" {...s} />
      {[0, 1, 2].map((i) => <path key={i} d={`M80 ${35 + i * 20} q30 -10 60 0 t60 0`} fill="none" stroke="var(--flame)" strokeWidth="3" strokeDasharray="6 6" />)}
      <circle cx="210" cy="55" r="22" fill="var(--sky)" {...s} />
      <path d="M198 48 q8 -8 16 2 q6 8 0 14" fill="var(--leaf)" stroke="none" />
    </svg>
  );
}

function Sound() {
  return (
    <svg viewBox="0 0 240 120" className="w-full">
      <ellipse cx="50" cy="75" rx="32" ry="12" fill="var(--flame)" {...s} />
      <rect x="18" y="55" width="64" height="20" fill="var(--flame)" stroke="none" />
      <ellipse cx="50" cy="55" rx="32" ry="12" fill="var(--sun)" {...s} />
      {[0, 1, 2].map((i) => <path key={i} d={`M${110 + i * 30} 30 q14 32 0 64`} fill="none" stroke="var(--sky)" strokeWidth="4" strokeLinecap="round" />)}
    </svg>
  );
}

function Heat() {
  return (
    <svg viewBox="0 0 240 120" className="w-full">
      <path d="M40 60 h80 v40 a10 10 0 0 1 -10 10 h-60 a10 10 0 0 1 -10 -10z" fill="var(--sky)" {...s} />
      <path d="M100 30 L150 100" stroke="var(--flame)" strokeWidth="8" strokeLinecap="round" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${55 + i * 18} 50 q-6 -10 0 -20 q6 -10 0 -20`} fill="none" stroke="var(--flame)" strokeWidth="3" strokeLinecap="round" />)}
      <path d="M170 60 h50 M205 48 l15 12 l-15 12" {...s} fill="none" />
      <text x="195" y="92" textAnchor="middle" className="diagram-small">warm → cool</text>
    </svg>
  );
}

function Flashlight() {
  return (
    <svg viewBox="0 0 600 160" className="w-full">
      <rect x="40" y="55" width="200" height="50" rx="10" fill="var(--grape)" {...s} />
      <path d="M240 45 L300 30 L300 130 L240 115z" fill="var(--sky)" {...s} />
      <path d="M300 30 L560 0 L560 160 L300 130z" fill="var(--sun)" opacity="0.5" />
      <rect x="70" y="68" width="60" height="24" rx="4" fill="var(--leaf)" {...s} />
      <text x="100" y="140" textAnchor="middle" className="diagram-label">Battery: chemical</text>
      <text x="270" y="152" textAnchor="middle" className="diagram-label">Bulb</text>
      <text x="450" y="85" textAnchor="middle" className="diagram-label">Light + heat</text>
    </svg>
  );
}

function Collision() {
  return (
    <svg viewBox="0 0 600 140" className="w-full">
      <line x1="20" y1="110" x2="580" y2="110" {...s} />
      <circle cx="200" cy="80" r="30" fill="var(--flame)" {...s} />
      <path d="M100 70 h50 M90 85 h55 M110 100 h40" {...s} />
      <circle cx="262" cy="80" r="30" fill="var(--sky)" {...s} />
      <path d="M230 35 l4 -16 M245 38 l12 -14 M215 40 l-6 -14" stroke="var(--sun)" strokeWidth="4" strokeLinecap="round" />
      <path d="M320 80 h120 M420 66 l20 14 l-20 14" {...s} fill="none" />
      <text x="380" y="62" textAnchor="middle" className="diagram-small">energy transfers</text>
      <text x="236" y="15" textAnchor="middle" className="diagram-small">BANG! (sound)</text>
    </svg>
  );
}

export function Diagram({ k }: { k: DiagramKey }) {
  const map = { forms: Forms, circuit: Circuit, rollercoaster: Coaster, sun: Sun, sound: Sound, heat: Heat, flashlight: Flashlight, collision: Collision };
  const C = map[k];
  return <C />;
}
