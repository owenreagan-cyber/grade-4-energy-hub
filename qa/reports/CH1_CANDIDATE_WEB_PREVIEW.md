# Chapter 1 candidate web preview — local verification

The web app opens the candidate student PDF by default and switches to the original teacher key using Show answer key. No curriculum PDF or DOCX was modified.

## Verified
- Live browser displayed both pages of each original PDF; student and teacher screenshots inspected.
- Student → teacher → student switching succeeded.
- Both downloads matched the candidate source PDF bytes exactly.
- Print control invoked printing; browser print exports were two US-letter pages (612 × 792 pt) for each version.
- Existing printable resource selection remained functional.
- App routing test passed; latest automated build reported build OK; browser reported no runtime errors.

## Affected artifact inventory for external review
- `src/lib/ch1-candidate.ts`: direct candidate asset URLs and variant selection.
- `src/components/CandidatePdfPreview.tsx`: PDF rendering, print, download, loading/error state.
- `src/routes/index.tsx`: default candidate selection and existing answer-key toggle integration.
- `src/styles.css`: PDF screen layout and letter-size print geometry.
- `package.json`, `bun.lock`: browser-compatible PDF.js dependency and required preview build script.
- `AGENTS.md`: candidate PDF serving/rendering rule.
- `roadmap.md` and this report: task status and verification inventory.

External Grok audit remains pending; this report does not declare curriculum phase completion or propagation approval.