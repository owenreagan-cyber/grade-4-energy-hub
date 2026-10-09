# CHAPTER 1 PREMIUM v1.2 — CANDIDATE WORKSPACE (PHASE 1)

> Planning-only workspace. No production assets, no mass artwork, no certification.

## State

| Field | Value |
|---|---|
| Chapter | 1 · Energy Causes Change |
| Frozen version | `UNIT1_CH1_GOLD_STANDARD_VERSION = 1.1` (FROZEN · CANONICAL · CLASSROOM_READY) |
| Candidate version | `UNIT1_CH1_PREMIUM_CANDIDATE_VERSION = 1.2` |
| Candidate state | `PREMIUM_CANDIDATE` · `PREMIUM_BUILD_IN_PROGRESS` |
| Phase | 2B — Design-spike asset candidate generation control |
| Workspace | `work/premium/chapter-01/v1.2/` |

## Phase 2B additions

- Chief authorization: **design-spike asset candidate generation = GO** (mass production / integration / propagation NOT authorized).
- Five-forms modality LOCKED: realistic instructional illustration (`five-forms-family.md`).
- Vocabulary hero-art-only rule LOCKED (`CH1_PREMIUM_ART_BIBLE.md` §4): AI providers render hero art only; Cursor renders all instructional text deterministically.
- `assets/candidates/` — candidate storage + `candidate-registry.json` + `source-briefs.json` (locked brief hashes).
- `provider-packets/handoffs/` — clean copy/paste generation prompts for GPT Images and Gemini Studio + Photo/Reality requirements.
- `science-review-procedure.md` · `art-review-procedure.md` — review contracts.
- `PHASE_2B_REPORT.md` — this phase's report.

## Phase 2A additions

- `premium-asset-manifest.json` — revised two-axis classification (`classroomBlocking` / `premiumCompletion`) + status ladder.
- `CH1_PREMIUM_ART_BIBLE.md` — APPROVED FOR DESIGN-SPIKE PRODUCTION; added Authenticity Rule, unit vocab reuse, science/art review contracts, status ladder.
- `visual-asset-briefs.md` — Phase 2A priority reclassification table.
- `provider-packets/` — GPT Images / Gemini Studio / Photo-Reality packets (BRIEF only).
- `five-forms-family.md` — one coherent visual family spec.
- `nine-slide-spike-build-plan.md` — integration plan (build only after assets approved).
- `PHASE_2A_REPORT.md` — this phase's report.

## Scope

This workspace holds Phase 1 planning artifacts only:

- Rendered 45-slide deck (`renders/`) + contact sheet
- Slide classification
- Art Bible + instructional visual grammar + vocabulary card system
- Premium storyboard (all 45 slides)
- Nine-slide design spike briefs
- Visual asset briefs (draft)
- Media opportunity map
- Machine-readable notes ↔ slides sync manifest (draft)
- Resource opportunity scanner
- Premium asset manifest (draft)
- Phase 1 report

## Conventions note

- **No prior "candidate" folder system exists** in this repo, so this workspace establishes one, clearly scoped under `work/` (the existing non-production area that already hosts `work/release-qa/`).
- Render/evidence output is kept **out of** `production/`, `curriculum/`, and `assets/authoritative/` (per `tools/chapter_qa/workspace.py::assert_output_allowed`). `renders/` is git-ignored.
- Frozen v1.1 bytes are **untouched**; the render pipeline reads the canonical PPTX and writes only into this workspace.

## Stop condition

Phase 1 MUST stop before mass premium image generation. Chief must approve the Art Bible, instructional visual grammar, vocabulary card system, storyboard, nine-slide spike, asset briefs, media map, and sync-manifest structure before production asset generation begins.
