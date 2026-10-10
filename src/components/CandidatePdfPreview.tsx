import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, Printer, FileText } from "lucide-react";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Button } from "@/components/ui/button";
import { getChapter1Candidate } from "@/lib/ch1-candidate";

export function CandidatePdfPreview({ showKey }: { showKey: boolean }) {
  const document = getChapter1Candidate(showKey);
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const container = pagesRef.current;
    if (!container) return;
    let disposed = false;
    let destroy: (() => void) | undefined;
    container.replaceChildren();
    setStatus("loading");
    setPageCount(0);

    async function render() {
      try {
        const pdfjs = await import("pdfjs-dist");
        if (disposed || !container) return;
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
        const task = pdfjs.getDocument({ url: document.url });
        destroy = () => { void task.destroy(); };
        const pdf = await task.promise;
        if (disposed) return;
        setPageCount(pdf.numPages);
        for (let number = 1; number <= pdf.numPages; number++) {
          const page = await pdf.getPage(number);
          if (disposed) return;
          const viewport = page.getViewport({ scale: 2 });
          const canvas = window.document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = "candidate-pdf-page";
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", `${document.label}, page ${number}`);
          const context = canvas.getContext("2d");
          if (!context) throw new Error("PDF canvas unavailable");
          await page.render({ canvasContext: context, canvas, viewport }).promise;
          if (disposed) return;
          container.append(canvas);
        }
        if (!disposed) setStatus("ready");
      } catch (error) {
        if (!disposed) {
          console.error("Candidate PDF preview failed", error);
          setStatus("error");
        }
      }
    }
    void render();
    return () => { disposed = true; destroy?.(); container.replaceChildren(); };
  }, [document.url, document.label]);

  return (
    <section className="candidate-preview min-w-0" aria-label="Chapter 1 candidate PDF">
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-ink/20 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold">Energy Causes Change</h2>
          <p className="text-sm text-muted-foreground">Chapter 1 · Candidate · {document.label}{pageCount > 0 && ` · ${pageCount} pages`}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => window.print()} disabled={status !== "ready"}><Printer />Print</Button>
          <Button asChild><a href={document.url} download={document.filename}><Download />Download PDF</a></Button>
          <Button asChild variant="outline" size="icon"><a href={document.url} target="_blank" rel="noopener noreferrer" aria-label="Open original PDF" title="Open original PDF"><ExternalLink /></a></Button>
        </div>
      </div>
      <div className="no-print" role="status" aria-live="polite">
        {status === "loading" && <p className="flex items-center gap-2 py-8 text-muted-foreground"><FileText />Loading {document.label.toLowerCase()}…</p>}
        {status === "error" && <p className="py-8">The preview could not load. You can still open or download the original PDF above.</p>}
      </div>
      <div ref={pagesRef} className="candidate-pdf-pages" aria-busy={status === "loading"} />
    </section>
  );
}