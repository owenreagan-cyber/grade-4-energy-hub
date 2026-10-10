# Chapter 1 candidate web preview — local verification

The web app exclusively showcases the CKSci Unit 1 Prompt 2 Chapter 1 candidate. Student Notes is the default; Teacher Key selects the separate original key. No curriculum PDF or DOCX was modified.

## Verified
- Live browser displayed both pages of each original PDF; student and teacher screenshots inspected.
- Student → teacher → student switching succeeded.
- Both downloads matched the candidate source PDF bytes exactly.
- Print control invoked printing; browser print exports were two US-letter pages (612 × 792 pt) for each version.
- All six generic scaffold resources and their data/HTML/diagram renderer files were removed; no placeholder names or renderer references remain under src.
- App routing and candidate selection tests passed (3 tests); latest automated build reported build OK; browser reported no runtime errors.
- Reverified on 2026-10-10: both original downloads matched source bytes, both print exports were two 612 × 792 pt pages, and Student Notes → Teacher Key → Student Notes succeeded.
- Screenshots inspected for both variants and complete second pages; BQ, V1, N1, N2, V2, N3, N4, CHECK and BQ · NOW I THINK remain the original artifact content. Student answer blanks are preserved; the completed ENERGY → CHANGE → EVIDENCE model is visible in the teacher key.

## Affected artifact inventory for external review
- `src/lib/ch1-candidate.ts`: direct candidate asset URLs and variant selection.
- `src/components/CandidatePdfPreview.tsx`: PDF rendering, print, download, loading/error state.
- `src/routes/index.tsx`: exclusive Prompt 2 preview, Student Notes/Teacher Key controls, curriculum-specific metadata.
- Deleted `src/lib/content.ts`, `src/components/ResourcePage.tsx`, `src/components/Diagrams.tsx`: generic scaffold data and renderers.
- `src/test/ch1-candidate.test.ts`: concrete original student/key asset selection regression tests.
- `src/styles.css`: PDF screen layout and letter-size print geometry.
- `package.json`, `bun.lock`: browser-compatible PDF.js dependency and required preview build script.
- `AGENTS.md`: candidate PDF serving/rendering rule.
- `roadmap.md` and this report: task status and verification inventory.

External Grok audit remains pending; this report does not declare curriculum phase completion or propagation approval.