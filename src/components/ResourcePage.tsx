import type { Block, Resource } from "@/lib/content";
import { Diagram } from "./Diagrams";

export type Opts = { key: boolean; school: string; teacher: string };

function Lines({ n }: { n: number }) {
  return <div className="space-y-5 pt-2">{Array.from({ length: n }).map((_, i) => <div key={i} className="h-px border-b border-dashed border-ink/50" />)}</div>;
}

function Blankify({ text, answers, show }: { text: string; answers: string[]; show: boolean }) {
  const parts = text.split("____");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className="mx-1 inline-block min-w-24 border-b-2 border-ink text-center font-bold text-flame">{show ? answers[i] : "\u00a0"}</span>}
        </span>
      ))}
    </>
  );
}

function RenderBlock({ b, show }: { b: Block; show: boolean }) {
  switch (b.kind) {
    case "intro":
      return <p className="rounded-xl border-2 border-ink bg-sun/30 p-4 text-center font-display text-lg">{b.text}</p>;
    case "vocab":
      return (
        <div className="grid grid-cols-2 gap-2">
          {b.items.map((v) => (
            <div key={v.term} className="rounded-lg border-2 border-ink/80 bg-paper p-2">
              <div className="font-display font-bold text-flame">{v.term}</div>
              <div className="text-sm">{v.def}</div>
            </div>
          ))}
        </div>
      );
    case "diagram":
      return (
        <figure className="rounded-xl border-2 border-ink bg-paper p-3">
          <Diagram k={b.diagram} />
          <figcaption className="mt-1 text-center text-sm italic">{b.caption}</figcaption>
          {show && b.diagram === "circuit" && <p className="mt-1 text-center text-sm font-bold text-flame">A = battery, B = bulb, C = switch, D = wire</p>}
        </figure>
      );
    case "notes":
      return (
        <div className="space-y-2">
          {b.items.map((n) => (
            <div key={n.heading} className="grid grid-cols-[9rem_1fr] overflow-hidden rounded-lg border-2 border-ink">
              <div className="bg-sky/30 p-2 font-display font-bold">{n.heading}</div>
              <div className="p-2 leading-8"><Blankify text={n.text} answers={n.blanks} show={show} /></div>
            </div>
          ))}
        </div>
      );
    case "mcq":
      return (
        <ol className="space-y-3">
          {b.items.map((m, i) => (
            <li key={i}>
              <div className="font-semibold">{i + 1}. {m.q}</div>
              <div className="mt-1 grid grid-cols-2 gap-1 pl-4 text-sm">
                {m.options.map((o, j) => (
                  <span key={j} className={show && j === m.answer ? "font-bold text-flame" : ""}>
                    <span className={`mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 ${show && j === m.answer ? "border-flame" : "border-ink"}`}>{"abcd"[j]}</span>{o}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      );
    case "fill":
      return (
        <div>
          <div className="mb-3 flex flex-wrap justify-center gap-2 rounded-lg border-2 border-dashed border-ink p-2">
            {b.bank.map((w) => <span key={w} className="rounded-full bg-leaf/30 px-3 py-0.5 font-display">{w}</span>)}
          </div>
          <ol className="space-y-2 leading-8">{b.items.map((f, i) => <li key={i}>{i + 1}. <Blankify text={f.text} answers={[f.answer]} show={show} /></li>)}</ol>
        </div>
      );
    case "match": {
      const rights = [...b.items].map((x) => x.right).sort();
      return (
        <div className="grid grid-cols-2 gap-x-16 gap-y-3">
          {b.items.map((m, i) => (
            <div key={i} className="contents">
              <div className="flex items-center justify-between rounded-lg border-2 border-ink p-2 font-display">{m.left}<span className="h-3 w-3 rounded-full bg-ink" /></div>
              <div className="flex items-center gap-2 rounded-lg border-2 border-ink p-2 text-sm">
                <span className="h-3 w-3 shrink-0 rounded-full bg-ink" />{rights[i]}
                {show && <span className="ml-auto font-bold text-flame">→ {b.items.find((x) => x.right === rights[i])!.left}</span>}
              </div>
            </div>
          ))}
        </div>
      );
    }
    case "short":
      return (
        <ol className="space-y-4">
          {b.items.map((q, i) => (
            <li key={i}>
              <div className="font-semibold">{q.q}</div>
              {show ? <p className="mt-2 font-bold text-flame">{q.answer}</p> : <Lines n={q.lines ?? 3} />}
            </li>
          ))}
        </ol>
      );
    case "chain":
      return (
        <div className="grid grid-cols-2 gap-3">
          {b.items.map((c) => (
            <div key={c.device} className="rounded-lg border-2 border-ink p-2">
              <div className="mb-1 font-display font-bold">{c.device}</div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                {c.steps.map((st, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="font-bold">→</span>}
                    <span className="inline-block min-w-20 rounded border-2 border-ink px-1 py-1 text-center">{i === 0 || show ? st : "\u00a0"}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "sort":
      return (
        <div>
          <div className="mb-3 flex flex-wrap gap-2 text-sm">{b.items.map((it) => <span key={it.word} className="rounded border-2 border-ink/70 bg-paper px-2 py-0.5">{it.word}</span>)}</div>
          <div className="grid grid-cols-2 gap-3">
            {b.categories.map((c, ci) => (
              <div key={c} className="min-h-40 rounded-lg border-2 border-ink">
                <div className={`p-2 text-center font-display font-bold ${ci ? "bg-flame/30" : "bg-sky/30"}`}>{c}</div>
                {show ? <ul className="p-2 text-sm font-bold text-flame">{b.items.filter((x) => x.cat === ci).map((x) => <li key={x.word}>• {x.word}</li>)}</ul> : <div className="px-3"><Lines n={4} /></div>}
              </div>
            ))}
          </div>
        </div>
      );
    case "cards":
      return (
        <div className={`grid gap-3 ${b.items.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {b.items.map((c) => (
            <div key={c.title} className="rounded-xl border-2 border-ink bg-paper p-3">
              {c.diagram && <Diagram k={c.diagram} />}
              <div className="font-display text-lg font-bold text-flame">{c.title}</div>
              <div className="text-sm">{c.text}</div>
            </div>
          ))}
        </div>
      );
  }
}

export function ResourcePage({ r, opts }: { r: Resource; opts: Opts }) {
  const total = r.sections.reduce((a, s) => a + (s.points ?? 0), 0);
  return (
    <article className="sheet">
      <header className="mb-4 rounded-2xl border-[3px] border-ink bg-sun/40 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-block rounded-full bg-ink px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-paper">{r.type}{opts.key && " · Answer Key"}</div>
            <h1 className="mt-1 font-display text-4xl font-bold leading-tight">{r.title}</h1>
            <p className="font-display text-lg">{r.subtitle}</p>
          </div>
          <svg viewBox="0 0 60 60" className="h-16 w-16 shrink-0"><path d="M34 4 L12 34 H28 L22 56 L48 24 H32z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" /></svg>
        </div>
        <div className="mt-3 grid grid-cols-[2fr_1fr_1fr] gap-3 text-sm">
          <div>Name: <span className="inline-block w-40 border-b-2 border-ink" /></div>
          <div>Date: <span className="inline-block w-16 border-b-2 border-ink" /></div>
          <div>{total > 0 ? <>Score: ____ / {total}</> : <>Class: ______</>}</div>
        </div>
      </header>
      <div className="space-y-5">
        {r.sections.map((s, i) => (
          <section key={i} className="break-inside-avoid">
            <h2 className="mb-1 flex items-center gap-2 font-display text-xl font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-flame text-sm text-paper">{i + 1}</span>
              {s.title}
              {s.points ? <span className="ml-auto text-sm font-normal">({s.points} pts)</span> : null}
            </h2>
            {s.directions && <p className="mb-2 text-sm italic">{s.directions}</p>}
            <RenderBlock b={s.block} show={opts.key} />
          </section>
        ))}
      </div>
      <footer className="mt-6 flex justify-between border-t-2 border-ink pt-2 text-xs">
        <span>{opts.teacher || "Grade 4 Science"}{opts.school && ` · ${opts.school}`}</span>
        <span>{r.standard} · ~{r.minutes} min</span>
      </footer>
    </article>
  );
}
