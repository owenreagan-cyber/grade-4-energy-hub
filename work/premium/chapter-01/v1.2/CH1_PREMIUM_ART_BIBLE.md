# CHAPTER 1 PREMIUM — ART BIBLE (v1.2 candidate)

> Visual direction for the Chapter 1 Premium v1.2 candidate.
> **Status:** APPROVED FOR DESIGN-SPIKE PRODUCTION (Chief decision, Phase 2A). The nine-slide spike is the only build authorized from this bible until Chief reviews the rendered spike.
> This bible extends, and must stay consistent with, the frozen Unit 1 Visual System v1.0 (`assets/visual-system/design-tokens.json`). It does not change the frozen tokens.

## 1. Visual identity

| Element | Value |
|---|---|
| Theme | Discovery / Evidence |
| Palette | deep navy `#1F2A5A` · warm gold `#A67C16` · cream `#F5EEDC` · muted amber `#7A5620` (unchanged from frozen Chapter 1 tokens) |
| Style | premium modern elementary science · cinematic · warm · academically credible · high contrast · slight dimensionality |
| Avoid | childish clip art · generic corporate template · busy Canva-marketplace look · excessive gradients · heavy decorative frames |

Design posture: "modern museum exhibit + excellent elementary science textbook + strong teacher presentation" — the same target as the frozen system, but elevated with real photography and dimensional illustration where the instructional purpose benefits.

## 2. Instructional visual grammar

> The visual modality must serve the instructional purpose. This is the governing rule for every asset decision in the storyboard.

| Purpose | Preferred modality |
|---|---|
| Phenomenon | real photograph, before/after, or observable evidence |
| Concept model | diagram or simplified illustration |
| Vocabulary | collectible science card |
| Student writing | minimal decoration; legibility first |
| Assessment | clarity first; no unnecessary visual novelty |
| Teacher-only | richer annotation acceptable |
| Demonstration | real-world physical evidence |
| Synthesis | one memorable visual model |

### Authenticity rule (Chief decision, Phase 2A)

- When students **OBSERVE physical evidence**: prefer **realistic photography / photorealistic scene** where practical.
- When explaining **invisible relationships / models**: prefer **simplified instructional illustration / diagram**.

Hard rules:

- WRITE/CHECK slides are **restrained**; exact notes sync; decoration secondary.
- Color is never the only signal (grayscale-safe — inherit from frozen tokens).
- Grade 4 readability floor: body ≥ 28 pt on slides, ≥ 12 pt on handouts.
- One idea per visual; large labels; high contrast.
- Arrows = model, not mechanism. No kinetic/potential/mechanical/radiant/compression-wave/inertia language.

## 3. Visual language system

### Border / frame

- Panels: 12 pt soft corners, 1.25 pt border (frozen token `radius.card_pt`, `line_weights.panel_border_pt`).
- Premium photography: thin 1 pt `neutral` frame with 8 pt corners (`radius.image_frame_pt`), white keyline when on a `surface` fill.
- No ornate frames; no fantasy/trading-card styling.

### Icon family

- Inherit the frozen single-color line icon family (`assets/visual-system/icons/`, 48 px grid, 2 pt round-cap stroke, `currentColor`).
- HUD action verbs stay the frozen set: `RECITE · WRITE · PREDICT · VOTE · TURN & TALK · CHECK · TRACE · DRAW · WATCH` (+ optional `OBSERVE · EVIDENCE · DATA · ENGINEER · EXPLAIN`).
- One HUD bubble per slide; never stack competing actions.

### Card treatment (vocabulary)

- Canonical frame 560 × 360 pt full-screen on slides (frozen token `components.vocabulary_card`); 2-up on notes reuses the same architecture.
- Restrained 1.25 pt frame + chapter-theme accent bar; huge term; exact Reader definition; small Reader page reference.

### Image crop behavior

- Photographs: crop to the instructional signal; no busy backgrounds; subject fills 50–65% of the hero region.
- Before/after pairs: identical framing, identical crop, so the *change* is the only variable.
- 16:9 safe area = 40 pt inset (projector overscan).

### Caption treatment

- `ink_soft` at label size, one short line, never redundant with the slide title.
- Reader page reference as a small tag (e.g. `Reader p. 2`), never a citation wall.

### Background texture policy

- Default slide background `paper` white; `surface` cream for panels.
- Subtle texture is allowed on cinematic concept slides only if it stays grayscale-safe and does not reduce text contrast below WCAG AA.
- WRITE/CHECK and assessment slides: flat background only.

### Cross-provider consistency

- Any provider (photography, illustration, diagram, video still) must reproduce the Chapter 1 palette, the icon/frame language, and the grayscale rule.
- A provider that cannot hit the palette + contrast floor is rejected, regardless of aesthetic appeal.

## 4. Vocabulary card system (collectible science card)

Reusable premium component with a trading-card **feel**, not a trading-card *imitation*. Do **not** imitate copyrighted Pokémon branding (no card-back, no rarity gems, no character art). **No fake game mechanics** (no rarity, no points, no "collect them all" gimmicks).

### Unit-wide reuse

The card **frame/system** is a reusable Unit 1 component; the Chapter 1 identity (navy/gold/cream + "Energy Causes Change" footer) is the only chapter-specific layer. Future cards — MOTION, ENERGY OF MOTION, SPEED, ENERGY TRANSFER, etc. — reuse the same frame with their own chapter theme and footer. **Do not build future cards now**; only the frame must be reusable without changing the visual identity.

### Hero-art-only implementation rule (Chief decision, Phase 2B — LOCKED)

AI image providers generate the **HERO ART only**. Cursor deterministically renders the instructional text — TERM, exact Reader definition, Reader page, category badge, card frame, and Chapter 1 identity.

- Do **not** ask image models to render final instructional text into the artwork.
- This avoids text errors, definition drift, inconsistent typography, and accessibility problems.
- The vocabulary-card frame/component remains deterministic and reusable.

### Anatomy (top → bottom)

1. **TOP** — `TERM` at ≥ 48 pt bold, chapter `primary`.
2. **CENTER** — 50–65% of the card: one scientifically accurate hero visual (the AI-generated hero art, with a reserved region for the deterministic TERM/definition overlay).
3. **BOTTOM** — exact Reader definition (no paraphrase), body size.
4. **FOOTER** — Reader page reference + subtle chapter/unit identity.
5. **Optional** — small category badge/icon (e.g. "KEY WORD").

### Required metadata (per card)

| Field | Value |
|---|---|
| `DEFINITION_SOURCE` | Reader/TG page (traceable) |
| `SCIENCE_REVIEW` | PASS required before APPROVED |
| `ART_REVIEW` | PASS required before APPROVED |
| `REUSE_SCOPE` | where the card is reused |
| `STATUS` | `BRIEF` → `CANDIDATE` → `SCIENCE_APPROVED` → `ART_APPROVED` → `APPROVED` |

### Required Chapter 1 cards

| Term | Reader | Definition |
|---|---|---|
| ENERGY | p. 1 | the ability to cause change |
| CHANGE | p. 1 | to become different |
| STORED ENERGY | p. 4 | energy that has the ability to cause change at a later time |

Definition source must trace to the Reader/TG; `SCIENCE_REVIEW` is a **hard gate** before any card is `APPROVED`.

## 5. Premium asset priority (Phase 2A revised)

Two independent axes. `classroomBlocking` governs whether the existing v1.1 Classroom Ready release is affected; `premiumCompletion` governs what v1.2 requires before it may claim `PREMIUM_COMPLETE`.

| Field | Meaning | Values |
|---|---|---|
| `classroomBlocking` | Does the absence of this asset invalidate v1.1 Classroom Ready? | `YES` / `NO` (all Ch1 premium assets = `NO`) |
| `premiumCompletion` | How essential is the asset to the v1.2 premium claim? | `REQUIRED` / `PREFERRED` / `OPTIONAL` |

- `classroomBlocking = YES` is reserved for the rare case where the intended science cannot be communicated without the asset. No current Ch1 premium asset qualifies.
- `premiumCompletion = REQUIRED` assets must exist (and pass review) before v1.2 may claim `PREMIUM_COMPLETE`; they remain `classroomBlocking = NO`.
- No asset may jump `BRIEF → APPROVED`; the ladder is `BRIEF → CANDIDATE → SCIENCE_APPROVED → ART_APPROVED → APPROVED`.

## 6. Science review contract (gate before APPROVED)

`SCIENCE_REVIEW = PASS` is required before any candidate visual can become `APPROVED`. Beautiful-but-wrong = **REJECTED**.

The review asks five questions:

1. Does the visual **support** the intended science?
2. Does it **imply an incorrect mechanism**?
3. Does it **introduce unsupported terminology** (kinetic/potential/mechanical/radiant/compression-wave/inertia)?
4. Is the **observable evidence honest** (no claimed heat that wasn't observed, no "visible energy")?
5. Could a Grade 4 student form a **misconception** from it?

## 7. Art review contract (gate after science review)

Runs only after `SCIENCE_REVIEW = PASS`. `ART_REVIEW = PASS` plus `SCIENCE_REVIEW = PASS` is the only combination that may set `STATUS = APPROVED`.

The review checks:

- Art Bible consistency (palette, type, frame, icon family)
- Visual hierarchy (term/definition/visual ordering)
- Visual clarity at projector distance
- Premium quality (not generic clip-art / template)
- Consistency with related assets (family resemblance)
- Classroom projection usefulness (contrast floor, safe area)

## 8. Status ladder (machine)

```
BRIEF → CANDIDATE → SCIENCE_APPROVED → ART_APPROVED → APPROVED
  └─────────────────────────── REJECTED (any stage)
```

`APPROVED` requires `SCIENCE_REVIEW = PASS` **and** `ART_REVIEW = PASS`; no shortcut.
