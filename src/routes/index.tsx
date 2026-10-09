import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resources } from "@/lib/content";
import { ResourcePage, type Opts } from "@/components/ResourcePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Energy Lab Printables — Grade 4 Energy Transfer Worksheets" },
      { name: "description", content: "Print-ready Grade 4 energy transfer and transformation worksheets, quizzes, tests, guided notes and anchor charts with diagrams." },
      { property: "og:title", content: "Energy Lab Printables — Grade 4" },
      { property: "og:description", content: "Premium printable energy worksheets, quizzes, tests and visual references for Grade 4." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [id, setId] = useState(resources[0].id);
  const [opts, setOpts] = useState<Opts>({ key: false, school: "", teacher: "" });
  const r = resources.find((x) => x.id === id)!;

  return (
    <div className="min-h-screen bg-background">
      <aside className="no-print border-b-[3px] border-ink bg-sun/40 px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">⚡ Energy Lab Printables</h1>
            <p className="text-sm">Grade 4 · Energy Transfer &amp; Transformation · Pick a resource, customize, download as PDF.</p>
          </div>
          <button onClick={() => window.print()} className="rounded-full border-[3px] border-ink bg-flame px-6 py-3 font-display text-lg font-bold text-paper shadow-[4px_4px_0_var(--ink)] transition hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)]">
            Download PDF
          </button>
        </div>
      </aside>

      <div className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[260px_1fr]">
        <div className="no-print space-y-4">
          <div className="space-y-2">
            {resources.map((x) => (
              <button key={x.id} onClick={() => setId(x.id)} className={`w-full rounded-xl border-[3px] border-ink p-3 text-left transition ${x.id === id ? "bg-sky/40 shadow-[4px_4px_0_var(--ink)]" : "bg-paper hover:bg-sky/15"}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-flame">{x.type}</div>
                <div className="font-display font-bold">{x.title}</div>
              </button>
            ))}
          </div>
          <div className="space-y-3 rounded-xl border-[3px] border-ink bg-paper p-3">
            <label className="flex items-center gap-2 font-semibold">
              <input type="checkbox" checked={opts.key} onChange={(e) => setOpts({ ...opts, key: e.target.checked })} className="h-5 w-5 accent-[var(--flame)]" />
              Show answer key
            </label>
            <input placeholder="Teacher name" value={opts.teacher} onChange={(e) => setOpts({ ...opts, teacher: e.target.value })} className="w-full rounded-lg border-2 border-ink bg-background px-2 py-1" />
            <input placeholder="School / class" value={opts.school} onChange={(e) => setOpts({ ...opts, school: e.target.value })} className="w-full rounded-lg border-2 border-ink bg-background px-2 py-1" />
            <p className="text-xs text-muted-foreground">Tip: in the print window choose “Save as PDF” and turn on “Background graphics”.</p>
          </div>
        </div>
        <div className="print-area overflow-x-auto">
          <ResourcePage r={r} opts={opts} />
        </div>
      </div>
    </div>
  );
}
