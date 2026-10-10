import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CandidatePdfPreview } from "@/components/CandidatePdfPreview";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chapter 1 · Energy Causes Change — CKSci Unit 1" },
      { name: "description", content: "CKSci Unit 1 Prompt 2: Chapter 1 Energy Causes Change candidate guided notes and matching teacher key, with original PDF preview, printing and downloads." },
      { property: "og:title", content: "Chapter 1 · Energy Causes Change — CKSci Unit 1" },
      { property: "og:description", content: "Where can we observe evidence of energy causing change? View the two-page Prompt 2 candidate student notes and teacher key." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="no-print border-b-[3px] border-ink bg-sun/40 px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">CKSci Unit 1</h1>
            <p className="text-sm">Grade 4 · Energy Transfer &amp; Transformation · Prompt Pack</p>
          </div>
        </div>
      </aside>

      <div className="candidate-layout mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[260px_1fr]">
        <div className="no-print space-y-4">
          <div className="border-l-4 border-ink pl-4">
            <p className="text-xs font-bold uppercase">Prompt 2 · Candidate</p>
            <p className="font-display text-xl font-bold">Chapter 1 · Energy Causes Change</p>
            <p className="mt-2 text-sm">Guided notes + teacher key</p>
          </div>
          <div className="grid gap-2" role="group" aria-label="Document version">
            <Button variant={showKey ? "outline" : "default"} aria-pressed={!showKey} onClick={() => setShowKey(false)}>Student Notes</Button>
            <Button variant={showKey ? "default" : "outline"} aria-pressed={showKey} onClick={() => setShowKey(true)}>Teacher Key</Button>
          </div>
        </div>
        <main className="min-w-0"><CandidatePdfPreview showKey={showKey} /></main>
      </div>
    </div>
  );
}
