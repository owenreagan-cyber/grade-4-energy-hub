# Chapter 1 guided-notes premium-polish candidate

## Decision
**CH1_GUIDED_NOTES_POLISH_PASS — local rendered and deterministic checks.**

Candidate only. Not approved for propagation or frozen release: external Grok adversarial review remains pending. The frozen v1.1 notes remain three pages and are unchanged; the owner's two-page limit applies only to this candidate.

## Verified results
- Student PDF: **2 US Letter pages**. Teacher PDF: **2 US Letter pages**.
- Three retained requirement tests pass: two-page limit, student/key drawing geometry equality, no red answer text.
- Both editable DOCX masters pass document validation.
- Rendered PDF checker: both files PASS, zero warnings/failures.
- All four final rendered pages and the grayscale comparison inspected: no clipped text, unsupported glyphs or overlapping sections found.
- Navy answers and gold/navy hierarchy remain readable in grayscale. Teacher label and sample-answer disclaimer occupy reserved footer space without moving student geometry.
- Fifteen frozen baseline files, including accepted notes, key, release copies and release metadata, have identical SHA-256 hashes before/after.

## Visual defects found and corrected
1. Earlier three-page overflow: reduced candidate row/title/spacer heights; both final exports fit two pages.
2. Vocabulary lead-in wrapped inside an exact-height row and clipped “become”: widened the lead column; the full phrase now renders on one line.
3. Stored-energy blank appeared detached at the left edge: kept “at a ___ time.” together on its own line.
4. N1 model touched the preceding blank rule: inserted separation above the model.
5. N3 example instruction was missing in the initial full-width layout: restored an explicit writing prompt.
6. Variable open-response wording was not identified globally: added a reserved teacher-only footer disclaimer.

## Writing-space and tradeoff audit
- N2 rows: 26 pt; N3 rows: 24 pt; reflection writing-rule pitch: 28 pt.
- Before/after drawing panels: approximately 3.575 × 1.833 inches each.
- Two pages are denser than the accepted three-page version; no student content cue was added merely for symmetry.
- No actual student handwriting trial was conducted; dimensional checks do not establish classroom usability empirically.

## Notes / slideshow alignment
| Anchor | Preserved content | Candidate page |
|---|---|---|
| BQ | Where can we observe evidence of energy causing change? | 1 |
| V1 | energy / change | 1 |
| N1 | ENERGY → CHANGE → EVIDENCE; final student model node remains unanswered | 1 |
| N2 | motion / sound / light / heat / electrical energy | 1 |
| V2 | stored energy | 1 |
| N3 | stored energy → release → change; battery, rubber band, raised object, position | 2 |
| N4 | observed change; before / after; what changed? | 2 |
| CHECK | evidence when energy itself is not visible | 2 |
| BQ · NOW I THINK | Exact BQ repeated | 2 |

The canonical slideshow was not changed. Its existing anchor sequence remains applicable; candidate page references differ from the accepted three-page notes. No propagation or pacing update is authorized by this local decision.

## Full affected-artifact inventory for external review
- `production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish.docx`
- `production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish.pdf`
- `production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish-key.docx`
- `production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish-key.pdf`
- `production/candidates/chapter-01/guided-notes-polish/RENDERED_QA.md`
- `production/candidates/chapter-01/guided-notes-polish/SIDE_BY_SIDE.png`
- `production/candidates/chapter-01/guided-notes-polish/GRAYSCALE.png`
- `production/candidates/chapter-01/guided-notes-polish/FROZEN_INTEGRITY.json`
- `production/candidates/chapter-01/guided-notes-polish/AUDIT_PACKET.md`
- `production/candidates/chapter-01/guided-notes-polish/INVENTORY_QA.md`
- `production/candidates/chapter-01/guided-notes-polish/INTERNAL_REVIEW.md`
- `tools/build_ch1_notes_polish.cjs`
- `tests/chapter_qa/test_ch1_notes_polish.py`
- `AGENTS.md`
- `roadmap.md`

## External reviewer instructions
Read only. Account for every inventory row; evaluate source fidelity, exact anchors, student/key geometry, two-page readability, handwriting space and grayscale quality. Return concrete findings with evidence and a decision. Independently verify each finding before remediation. No external approval is claimed here.

## Unrelated preview limitation
The checkout's package manifest lacks a dev command; preview telemetry reports “Script not found dev”. The app preview was not verified or altered as part of this document-only task.