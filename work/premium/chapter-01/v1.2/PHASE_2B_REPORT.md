# CHAPTER 1 PREMIUM v1.2 — PHASE 2B CONTROL REPORT

> Design-spike asset candidate generation control. Generation AUTHORIZED (design-spike only). No mass production, no integration, no propagation, no frozen v1.1 modification.

## A. Chief Authorization Applied

| Authorization | Status |
|---|---|
| Design-spike asset candidate generation | **GO** (applied) |
| Mass asset production | NOT AUTHORIZED |
| Nine-slide integration | NOT AUTHORIZED |
| Full-deck propagation | NOT AUTHORIZED |
| Frozen v1.1 modification | NOT AUTHORIZED |
| Candidate promotion | NOT AUTHORIZED (Chief accepts only after both reviews) |

## B. Five-Forms Modality

- **LOCKED: REALISTIC INSTRUCTIONAL ILLUSTRATION.** Recognizable real-world objects/events, one coherent premium illustration style, one set.
- Forbidden: abstract energy beams · glowing energy matter · particle streams · fake electron visuals · unrelated decorative symbols · cartoon clip art.
- Locked per-form depiction added to `five-forms-family.md`.

## C. Vocabulary Hero-Art Rule

- **LOCKED:** AI providers generate the **HERO ART only**. Cursor deterministically renders TERM, exact Reader definition, Reader page, category badge, card frame, Chapter 1 identity.
- Image models are **not** asked to render final instructional text (avoids text errors, definition drift, inconsistent typography, accessibility problems).
- Added to `CH1_PREMIUM_ART_BIBLE.md` §4.

## D. Candidate Generation Matrix

| Asset | GPT Images | Gemini Studio | Photo/Reality |
|---|---|---|---|
| CH1-HERO-01 | PRIMARY (2–3) | parallel alt | — |
| CH1-DARK-BRIGHT-01 | — | treatment concept | PRIMARY (2–3) |
| CH1-PENCIL-BEFORE-01 | — | — | PRIMARY (2–3) |
| CH1-PENCIL-AFTER-01 | — | — | PRIMARY (2–3) |
| CH1-VOC-ENERGY-01 (hero) | PRIMARY (2–3) | composition concept | — |
| CH1-VOC-CHANGE-01 (hero) | PRIMARY (2–3) | composition concept | — |
| CH1-VOC-STORED-ENERGY-01 (hero) | PRIMARY (2–3) | composition concept | — |
| CH1-MODEL-ECE-01 | PRIMARY (2–3) | parallel alt | — |
| CH1-FORMS family | PRIMARY (2–3 full family) | system alt | — |
| CH1-STORED-BATTERY-01 | — | stored-energy direction | PRIMARY (2–3) |
| CH1-STORED-RUBBER-BAND-01 | — | stored-energy direction | PRIMARY (2–3) |
| CH1-STORED-RAISED-APPLE-01 | — | stored-energy direction | PRIMARY (2–3) |

Candidate count: ~2–3 serious directions per major asset (no variant floods).

## E. GPT Images Handoff Prompts

- Path: `provider-packets/handoffs/GPT_IMAGES_HANDOFF_PROMPTS.md`
- 6 prompt groups: opener · ENERGY hero · CHANGE hero · STORED ENERGY hero · ECE model · five-form family.
- Each is a self-contained copy/paste prompt; locks science/composition/forbidden/style; leaves room for creativity; does not reveal rankings/winner/audit history.

## F. Gemini Studio Handoff Prompts

- Path: `provider-packets/handoffs/GEMINI_STUDIO_HANDOFF_PROMPTS.md`
- 6 exploration targets: opener · vocab compositions · five-form system · ECE · dark/bright · stored-energy.
- Locked science briefs handed verbatim; Gemini is NOT curriculum authority; generated wording never treated as source truth.

## G. Photo / Reality Requirements

- Path: `provider-packets/handoffs/PHOTO_REALITY_REQUIREMENTS.md`
- 6 assets; matched framing mandatory on before/after pairs; changed variable visually obvious; no busy stock backgrounds.

## H. Candidate Storage / Metadata

- Root: `work/premium/chapter-01/v1.2/assets/candidates/` (`GPT_IMAGES/` · `GEMINI_STUDIO/` · `PHOTO_REALITY/`)
- `candidate-registry.json` — machine list (empty until candidates exist; schema v1).
- `source-briefs.json` — 16 locked briefs, each with a SHA-256 `sourceBriefHash`.
- Metadata per candidate: `assetId · candidateId · provider · generationPromptVersion · sourceBriefHash · createdAt · scienceReview · artReview · status`.
- No candidate may be placed in `approved/` yet. Missing premium asset = `CANDIDATE_PENDING`.

## I. Science Review Procedure

- Path: `science-review-procedure.md`
- Science FIRST. Six questions (concept · mechanism · terminology · visible-substance · misconception · honest evidence). Result `PASS`/`FAIL`/`NOT_VERIFIED`; severity `BLOCKING`/`HIGH`/`MEDIUM`/`LOW`/`INFO`. Beautiful-but-wrong = REJECTED.

## J. Art Review Procedure

- Path: `art-review-procedure.md`
- Only science-PASS candidates proceed. Eight criteria (quality · clarity · Art Bible · palette · family coherence · projection · subject emphasis · composition). Five forms get FAMILY COHERENCE evaluation. `SCIENCE_APPROVED + ART_APPROVED` is not `APPROVED`; Chief accepts final.

## K. Asset Manifest State

- Path: `premium-asset-manifest.json` (schema v2, enriched)
- 16 assets; every asset now carries `sourceBriefHash` + `candidateStatus` + `candidateCount`.
- `classroomBlocking` = NO (×16) · `premiumCompletion` = REQUIRED ×11 / PREFERRED ×5.
- Asset `status` = `BRIEF` (×16); `candidateStatus` = `CANDIDATE_PENDING` (×16); `candidateCount` = 0.
- Candidate-level tracking in `candidate-registry.json`; status ladder `CANDIDATE → SCIENCE_APPROVED → ART_APPROVED → APPROVED` (+`REJECTED`), no `BRIEF → APPROVED` jump.

## L. Frozen Non-Regression

- Frozen gate: **42 protected · 0 mismatches · ALLOW**
- HEAD unchanged (`b7695bd3`). Frozen Chapter 1 v1.1 bytes unchanged.

## M. NEEDS CHIEF

1. **Provider execution** — the environment has no GPT Images / Gemini Studio / Photo-Reality provider available to this integrator (only Figma `generate_image`, which is not an approved provider). The handoff prompts are ready for external execution; Chief runs the external providers or authorizes a specific in-environment provider. I did **not** generate assets or substitute stock/icons.
2. **Final acceptance** — after candidates return and pass both reviews, Chief performs final asset acceptance (approving the `APPROVED` set) before the nine-slide spike.

## Final

| Check | Result |
|---|---|
| ASSET CANDIDATE GENERATION AUTHORIZED | **YES** |
| ASSETS APPROVED | **0** |
| READY TO BUILD NINE-SLIDE SPIKE | **NO** |
| READY FOR FULL-DECK PROPAGATION | **NO** |
| FROZEN v1.1 MODIFIED | **NO** |

**STOP** — handoffs prepared; awaiting external provider execution of the design-spike candidates.
