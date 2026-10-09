# CHAPTER 1 PREMIUM v1.2 — PHASE 1 REPORT

> Production-integrator planning phase. Scope: inspect, render, classify, storyboard, define, brief. **Stopped before mass asset generation.**

## A. Baseline

| Field | Value |
|---|---|
| HEAD | `b7695bd364f3a56daa96604ef2c9b785a29f9492` |
| Branch | `main` |
| Repo convention discovered | No prior "candidate" folder system exists. Candidate workspace established at `work/premium/chapter-01/v1.2/` (sibling of existing `work/release-qa/`), render/evidence kept out of `production/`/`curriculum/`/`assets/authoritative/` per `tools/chapter_qa/workspace.py`. |
| Frozen gate (open) | `ALLOW` · 42 protected · 0 mismatches |
| Frozen gate (close) | `ALLOW` · 42 protected · 0 mismatches |
| Baseline mismatch | **NO** |

## B. Candidate State

| Item | Value |
|---|---|
| Chapter 1 v1.1 state | `CLASSROOM_READY` · `CANONICAL` · `FROZEN` |
| v1.2 candidate state | `PREMIUM_CANDIDATE` · `PREMIUM_BUILD_IN_PROGRESS` |
| Candidate path | `work/premium/chapter-01/v1.2/` |

## C. Rendered Slide Inspection

- Slides rendered: **45 / 45** (2000×1125 px, 16:9 @ 150 dpi)
- Render method: `soffice --headless` (isolated profile) → PDF → `pdftoppm -png`; no desktop, no frozen file touched
- Visual index / contact sheet: `work/premium/chapter-01/v1.2/renders/contact-sheet.png` (2484×2804) + `renders/ch1-slide-01..45.png`

## D. 45-Slide Classification

| Class | Count |
|---|---|
| CINEMATIC_CONCEPT | 18 |
| INTERACTION | 7 |
| WRITE_CHECK | 20 |

Full per-slide table: `slide-classification.md`.

## E. Visual Quality Inventory

- **Strongest current slides:** vocab cards (10, 20) and model chains (9, 14, 16, 25) — coherent programmatic structure.
- **Weakest current slides:** five-forms (17, only motion modeled), phenomenon/before-after (4, 8 — text-only), position (24 — text chain).
- **Highest-value opportunities:** five-form set (17), real before/after pairs (4, 8), hero model (14/16), collectible cards (10, 20). The entire deck is programmatic shapes/text — no photography, no illustration.

## F. Art Bible

- Path: `CH1_PREMIUM_ART_BIBLE.md`
- Visual identity: Discovery / Evidence · navy `#1F2A5A` · gold `#A67C16` · cream `#F5EEDC` · amber `#7A5620` (unchanged from frozen tokens)
- Instructional visual grammar: phenomenon→photo/before-after · concept model→diagram · vocabulary→collectible card · student writing→minimal · assessment→clarity · teacher-only→richer annotation · demonstration→real evidence · synthesis→one memorable model

## G. Vocabulary Card System

| Card | Reader | Definition |
|---|---|---|
| ENERGY | p. 1 | the ability to cause change |
| CHANGE | p. 1 | to become different |
| STORED ENERGY | p. 4 | energy that has the ability to cause change at a later time |

- Source traceability: each card carries `DEFINITION_SOURCE` (Reader page).
- Science-review rule: `SCIENCE_REVIEW` is a **hard gate** before any card is `APPROVED` (plus `ART_REVIEW`).
- Anatomy + no-Pokémon-imitation rule: `CH1_PREMIUM_ART_BIBLE.md` §4.

## H. Premium Storyboard

| Tier | Count |
|---|---|
| KEEP_AS_IS | 29 |
| LIGHT_POLISH | 6 |
| PREMIUM_REDESIGN | 10 |

Full table: `CH1_PREMIUM_STORYBOARD.md`.

## I. Nine-Slide Design Spike

| # | Slide | Class | Premium target | Required asset(s) |
|---|---|---|---|---|
| 1 | 1 | CINEMATIC_CONCEPT | Cinematic hero opener | CH1-HERO-01 |
| 2 | 4 | CINEMATIC_CONCEPT | Real dark→bright before/after | CH1-DARK-BRIGHT-01 |
| 3 | 8 | CINEMATIC_CONCEPT | Real sharpener before/after pair | CH1-PENCIL-BEFORE-01 · CH1-PENCIL-AFTER-01 |
| 4 | 10 | CINEMATIC_CONCEPT | ENERGY collectible card | CH1-VOC-ENERGY-01 |
| 5 | 10 | CINEMATIC_CONCEPT | CHANGE collectible card | CH1-VOC-CHANGE-01 |
| 6 | 14/16 | CINEMATIC_CONCEPT | ENERGY→CHANGE→EVIDENCE hero model | CH1-MODEL-ECE-01 |
| 7 | 17 | CINEMATIC_CONCEPT | Five-form visual set | CH1-FORMS-MOTION/SOUND/LIGHT/HEAT/ELECTRICAL-01 |
| 8 | 20 | CINEMATIC_CONCEPT | STORED ENERGY collectible card | CH1-VOC-STORED-ENERGY-01 |
| 9 | 11 | WRITE_CHECK | Visual restraint benchmark (no change) | — |

Full briefs: `nine-slide-design-spike.md`.

## J. Visual Asset Briefs

- Total: **16**
- Required-tier: **15** · Preferred-tier: **1** (CH1-STORED-BATTERY-01) · Optional-tier: **0**
- Provider placeholders: photography / illustration / diagram / hybrid (all `TBD` — briefs at `visual-asset-briefs.md`)

## K. Media Opportunity Map

- Opportunities: **8** (M1–M8)
- Required media: **NONE** (M1 is a live in-class demo, not media)
- Offline/network risks: only M2 (remote rocket clip) is unverified + network-dependent; all usable candidates are local project MP4s. M7 rejected (misleading wording).
- Path: `CH1_MEDIA_OPPORTUNITY_MAP.md`

## L. Notes ↔ Slides Sync Manifest

- Anchors: **7** (BQ · V1 · V2 · N1 · N2 · N3 · N4)
- Machine-readable path: `notes-slides-sync-manifest.json` (SHA-256 notes + per-slide hashes, reveal sequence, blank counts)
- Current result: **PASS** (all 7 anchors; consistent with the classroom-ready notes/slides sync PASS)

## M. Student Resource Opportunities

| Classification | Count |
|---|---|
| CLASSROOM_NECESSARY | 0 |
| PREMIUM_ENHANCEMENT | 10 |
| OPTIONAL | 4 |

No premium visual is a classroom necessity — preserves "premium must not block Classroom Ready." Full map: `resource-opportunity-scanner.md`.

## N. Premium Asset Manifest

- Draft path: `premium-asset-manifest.json`
- Asset count: **16** (all `BRIEF`; nothing `APPROVED`; no `filePath` set)

## O. Frozen Non-Regression

- Protected: **42** · Mismatches: **0** · Decision: **ALLOW**
- Frozen Chapter 1 v1.1 bytes unchanged (render pipeline was read-only on the canonical PPTX).

## P. NEEDS CHIEF

1. **Scope boundary (release decision):** slides-only premium, or extend into student/teacher resources (Guided Notes 2-up vocab cards, Practice prompts, Teacher packet). Guided Notes are FROZEN — any student-resource change needs owner-authorized reopening (Rule 80).
2. **Vocab-card priority acceptance:** whether the collectible cards are `REQUIRED_VISUAL` (blocking) or `PREFERRED_VISUAL` (non-blocking) for the next Classroom Ready week. I drafted them REQUIRED-tier; this is the one classification with real release consequence.
3. **Media production scope:** produce the custom "What Changed?" explainer (M3, script-only today) in this candidate, or defer. (Cost/scope decision; not required.)

All other decisions (filenames, folder layout, per-slide tier/priority) were resolved under the integrator mandate and are not escalated.

## Q. Final State

| Check | Result |
|---|---|
| PHASE 1 | **PASS** |
| READY FOR CHIEF VISUAL-DIRECTION REVIEW | **YES** |
| READY FOR PREMIUM ASSET GENERATION | **NO** |
| FROZEN v1.1 MODIFIED | **NO** |

**STOP** — awaiting Chief approval of Art Bible, instructional visual grammar, vocabulary card system, storyboard, nine-slide spike, asset briefs, media map, and sync-manifest structure before any production asset generation.
