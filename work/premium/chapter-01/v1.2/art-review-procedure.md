# ART REVIEW PROCEDURE — Chapter 1 Premium v1.2

> Runs **only** on candidates that already have `SCIENCE_REVIEW = PASS`. `ART_REVIEW` checks visual execution against the Chapter 1 Art Bible and the premium quality bar.

## Procedure

1. Confirm the candidate's `scienceReview` is `PASS` (do **not** art-review a science-FAIL candidate).
2. Load the candidate image + metadata + the Chapter 1 Art Bible (`CH1_PREMIUM_ART_BIBLE.md`).
3. Evaluate the eight criteria below against the rendered image.
4. Assign `PASS` / `FAIL` / `NOT_VERIFIED`; record findings with severity (`BLOCKING`/`HIGH`/`MEDIUM`/`LOW`/`INFO`).

## Eight review criteria

| # | Criterion | Checks |
|---|---|---|
| 1 | Premium quality | Not generic clip-art / template; believable execution |
| 2 | Visual clarity | Readable at projector distance; one idea per visual |
| 3 | Art Bible consistency | Palette, type hierarchy, frame, icon language |
| 4 | Coherent palette | navy/gold/cream/amber; not off-theme |
| 5 | Coherent family style | Related assets look like one family (esp. five forms) |
| 6 | Projection readability | Contrast floor, safe area (40 pt inset), grayscale-safe |
| 7 | Subject emphasis | Correct subject focus; no busy background |
| 8 | Cropping/composition | Matched framing on before/after; no awkward crops |

## Five-forms special rule

For the five-form family, evaluate **FAMILY COHERENCE** alongside individual quality: all five must look intentionally related (one style, one palette, one card grid). Five unrelated styles = `FAIL` even if each individual image is good.

## Result & status

- `PASS` → candidate may be marked `ART_APPROVED` (still **not** `APPROVED`; Chief accepts next).
- `FAIL` → candidate does **not** advance; `status` stays/returns to non-approved.
- `NOT_VERIFIED` → cannot judge; blocks advancement until inspectable.

## Rules

- `SCIENCE_APPROVED + ART_APPROVED` is not `APPROVED`. Chief performs final asset acceptance, then authorizes `APPROVED`.
- Only `APPROVED` assets may enter the nine-slide spike.
- Art review writes evidence only; it does **not** edit the candidate image.

## Traceability

Each review cites `assetId`, `candidateId`, and the eight criteria verdicts. Evidence is independent: the reviewer judges the rendered image, not the generator prompt.
