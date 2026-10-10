import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resources } from "@/lib/content";
import { ResourcePage, type Opts } from "@/components/ResourcePage";
import { CandidatePdfPreview } from "@/components/CandidatePdfPreview";
import { Button } from "@/components/ui/button";

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
  const [id, setId] = useState("ch1-candidate");
  const [opts, setOpts] = useState<Opts>({ key: false, school: "", teacher: "" });
  const r = resources.find((x) => x.id === id);
  const isCandidate = id === "ch1-candidate";

  return (
    <div className="min-h-screen bg-background">
      <aside className="no-print border-b-[3px] border-ink bg-sun/40 px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">⚡ Energy Lab Printables</h1>
            <p className="text-sm">Grade 4 · Energy Transfer &amp; Transformation</p>
          </div>
          {!isCandidate && <Button onClick={() => window.print()} size="lg">
            Download PDF
          </Button>}
        </div>
      </aside>

      <div className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[260px_1fr]">
        <div className="no-print space-y-4">
          <div className="space-y-2">
            <Button onClick={() => setId("ch1-candidate")} aria-pressed={isCandidate} variant="outline" className={`h-auto w-full flex-col items-start whitespace-normal border-[3px] border-ink p-3 text-left ${isCandidate ? "bg-sky/40" : "bg-paper"}`}>
              <span className="text-xs font-bold uppercase text-flame">Chapter 1 · Candidate</span>
              <span className="font-display font-bold">Energy Causes Change</span>
              <span className="text-xs">Guided notes + teacher key</span>
            </Button>
            {resources.map((x) => (
              <Button key={x.id} onClick={() => setId(x.id)} aria-pressed={x.id === id} variant="outline" className={`h-auto w-full flex-col items-start whitespace-normal border-[3px] border-ink p-3 text-left transition ${x.id === id ? "bg-sky/40" : "bg-paper hover:bg-sky/15"}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-flame">{x.type}</div>
                <div className="font-display font-bold">{x.title}</div>
              </Button>
            ))}
          </div>
          <div className="space-y-3 rounded-xl border-[3px] border-ink bg-paper p-3">
            <label className="flex items-center gap-2 font-semibold">
              <input type="checkbox" checked={opts.key} onChange={(e) => setOpts({ ...opts, key: e.target.checked })} className="h-5 w-5 accent-[var(--flame)]" />
              Show answer key
            </label>
            {!isCandidate && <>
            <input placeholder="Teacher name" value={opts.teacher} onChange={(e) => setOpts({ ...opts, teacher: e.target.value })} className="w-full rounded-lg border-2 border-ink bg-background px-2 py-1" />
            <input placeholder="School / class" value={opts.school} onChange={(e) => setOpts({ ...opts, school: e.target.value })} className="w-full rounded-lg border-2 border-ink bg-background px-2 py-1" />
            </>}
          </div>
        </div>
        <div className={isCandidate ? "min-w-0" : "print-area overflow-x-auto"}>
          {isCandidate ? <CandidatePdfPreview showKey={opts.key} /> : r ? <ResourcePage r={r} opts={opts} /> : null}
        </div>
      </div>
    </div>
  );
}
