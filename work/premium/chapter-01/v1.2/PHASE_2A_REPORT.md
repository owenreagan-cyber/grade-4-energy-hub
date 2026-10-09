# CHAPTER 1 PREMIUM v1.2 — PHASE 2A REPORT

> Apply Chief decisions + prepare asset-generation packets. No full-deck build, no mass art, no frozen v1.1 modification.

## A. Chief Decisions Applied

| # | Decision | Applied to |
|---|---|---|
| 1 | Premium slides first; do not reopen frozen student resources; later student/teacher redesign = separate v1.2 derivative | Scope noted; no student/teacher resources touched |
| 2 | Vocab cards (ENERGY · CHANGE · STORED ENERGY) = `PREMIUM_COMPLETION_REQUIRED` + `CLASSROOM_READY_NONBLOCKING` | Manifest + briefs + Art Bible |
| 3 | M3 custom video = `PREFERRED_PREMIUM` · `DEFERRED_PENDING_VISUAL_SYSTEM_APPROVAL` | Media map + report (no production) |
| 4 | Art Bible APPROVED FOR DESIGN-SPIKE PRODUCTION + Authenticity Rule | Art Bible §2 |
| 5 | Nine-slide spike APPROVED; do not propagate beyond spike until Chief reviews | Spike build plan + storyboard |

## B. Revised Asset Priority

| Axis | Result |
|---|---|
| `classroomBlocking` | **NO for all 16 assets** (v1.1 Classroom Ready unaffected) |
| `premiumCompletion = REQUIRED` | 11 (CH1-HERO-01 · CH1-DARK-BRIGHT-01 · CH1-VOC-ENERGY-01 · CH1-VOC-CHANGE-01 · CH1-MODEL-ECE-01 · CH1-FORMS ×5 · CH1-VOC-STORED-ENERGY-01) |
| `premiumCompletion = PREFERRED` | 5 (CH1-PENCIL-BEFORE-01 · CH1-PENCIL-AFTER-01 · CH1-STORED-BATTERY-01 · CH1-STORED-RUBBER-BAND-01 · CH1-STORED-RAISED-APPLE-01) |
| `premiumCompletion = OPTIONAL` | 0 |

The Phase 1 "15/16 REQUIRED" classification is superseded by the two-axis model above.

## C. Unit Vocabulary System

- Card **frame/system** is a reusable Unit 1 component; only the Chapter 1 identity (theme + footer) is chapter-specific.
- Future cards (MOTION · ENERGY OF MOTION · SPEED · ENERGY TRANSFER · …) reuse the frame without changing the visual identity — **not built now**.
- No fake game mechanics; no copyrighted trading-card imitation.
- Applied in Art Bible §4.

## D. GPT Images Packet

- Path: `provider-packets/GPT_IMAGES_ASSET_PACKET.md`
- Assets: CH1-HERO-01 · CH1-VOC-ENERGY-01 · CH1-VOC-CHANGE-01 · CH1-VOC-STORED-ENERGY-01 · CH1-MODEL-ECE-01 + five-form family (**conditional** on illustration being the selected modality).
- Every brief carries VISUAL_ID, purpose, source basis, must/must-not communicate, exact locked text, composition, style, output dims, transparency, usage slides, science constraints.

## E. Gemini Studio Packet

- Path: `provider-packets/GEMINI_STUDIO_ASSET_PACKET.md`
- Role: independent visual exploration only (opener, vocab compositions, five-forms system, ECE model, dark/bright, stored-energy treatments).
- Locked science briefs handed verbatim; Gemini is NOT curriculum authority; generated wording never treated as source truth.

## F. Photo / Reality Packet

- Path: `provider-packets/PHOTO_REALITY_ASSET_PACKET.md`
- Assets: CH1-DARK-BRIGHT-01 · CH1-PENCIL-BEFORE-01 · CH1-PENCIL-AFTER-01 · CH1-STORED-BATTERY-01 · CH1-STORED-RUBBER-BAND-01 · CH1-STORED-RAISED-APPLE-01.
- Matched framing mandatory for before/after pairs; changed variable visually obvious; no busy stock backgrounds.

## G. Five-Forms Family

- Path: `five-forms-family.md`
- motion · sound · light · heat · electrical energy = ONE coherent family (one frame/palette/icon language/grid).
- Exact labels only; no advanced forms vocabulary. Concrete examples locked for spike.
- Modality (illustration vs. photography) is a spike-time decision, not yet made.

## H. Science Review Contract

- `SCIENCE_REVIEW = PASS` required before APPROVED. Five questions: supports intended science? implies incorrect mechanism? introduces unsupported terminology? observable evidence honest? could a Grade 4 student form a misconception? Beautiful-but-wrong = REJECTED.
- Applied in Art Bible §6.

## I. Art Review Contract

- Runs after science PASS; checks Art Bible consistency, hierarchy, clarity, premium quality, family consistency, projection usefulness, absence of clip-art/template look. Only `SCIENCE_REVIEW PASS` + `ART_REVIEW PASS` → `STATUS = APPROVED`.
- Applied in Art Bible §7.

## J. Nine-Slide Spike Build Plan

- Path: `nine-slide-spike-build-plan.md`
- 9 slides mapped to assets; build order = candidates → science/art review → APPROVED → integrate → render → Chief review → STOP.
- WRITE/CHECK benchmark (slide 11) requires **no** premium asset.

## K. Updated Asset Manifest

- Path: `premium-asset-manifest.json` (schema v2)
- 16 assets, every asset carries: assetId · type · concept · provider · sourceBasis · classroomBlocking · premiumCompletion · scienceReview · artReview · status · reuseScope · usedOnSlides · filePath.
- Status ladder `BRIEF → CANDIDATE → SCIENCE_APPROVED → ART_APPROVED → APPROVED` (+ `REJECTED`); no `BRIEF → APPROVED` jump.

## L. Frozen Non-Regression

- Frozen gate: **42 protected · 0 mismatches · ALLOW**
- HEAD unchanged (`b7695bd3`); no frozen file modified. Frozen Chapter 1 v1.1 bytes unchanged.

## M. NEEDS CHIEF

1. **Modality for the five-form family** (illustration vs. photography) — determines which packet the family ships to for production. (Deferred to spike; Chief may decide now or after seeing spike candidates.)
2. **Authorization to generate design-spike asset candidates** — this is the single blocking go/no-go before the next phase. Everything else in Phase 2A is prepared.

## Final

| Check | Result |
|---|---|
| READY TO GENERATE DESIGN-SPIKE ASSET CANDIDATES | **YES** (packets prepared; awaiting Chief go) |
| READY TO BUILD NINE-SLIDE SPIKE | **NO** (requires approved assets first) |
| READY TO PROPAGATE FULL DECK | **NO** |
| FROZEN v1.1 MODIFIED | **NO** |

**STOP** — awaiting Chief's go to generate design-spike asset candidates.
