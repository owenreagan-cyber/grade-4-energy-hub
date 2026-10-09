# CANDIDATE STORAGE & METADATA — Chapter 1 Premium v1.2

> Candidate-only storage. **No candidate may be placed in `approved/` yet.** Every candidate starts `CANDIDATE`; only Chief-authorized `APPROVED` assets enter the nine-slide spike.

## Directory structure

```
work/premium/chapter-01/v1.2/assets/candidates/
  GPT_IMAGES/
  GEMINI_STUDIO/
  PHOTO_REALITY/
  candidate-registry.json
  source-briefs.json
```

- `GPT_IMAGES/` — hero art + model + five-form family illustration candidates.
- `GEMINI_STUDIO/` — parallel exploration concept images/directions.
- `PHOTO_REALITY/` — realistic photography candidates.
- `candidate-registry.json` — machine-readable candidate list.
- `source-briefs.json` — locked brief hashes each candidate references.

## Candidate metadata (per candidate)

Each candidate file is accompanied by a metadata record in `candidate-registry.json`:

| Field | Meaning |
|---|---|
| `assetId` | the target asset (e.g. `CH1-VOC-ENERGY-01`) |
| `candidateId` | unique, e.g. `CH1-VOC-ENERGY-01-C1` |
| `provider` | `GPT_IMAGES` / `GEMINI_STUDIO` / `PHOTO_REALITY` |
| `generationPromptVersion` | e.g. `v1` — ties the candidate to the exact handoff prompt |
| `sourceBriefHash` | SHA-256 of the locked brief (from `source-briefs.json`) |
| `createdAt` | UTC timestamp |
| `scienceReview` | `PASS` / `FAIL` / `NOT_VERIFIED` |
| `artReview` | `PASS` / `FAIL` / `NOT_VERIFIED` |
| `status` | `CANDIDATE` → `SCIENCE_APPROVED` → `ART_APPROVED` → `APPROVED` / `REJECTED` |

## Review order (hard)

```
CANDIDATE → SCIENCE REVIEW → ART REVIEW → APPROVAL DECISION
```

Science review happens **first**. A candidate that is attractive but misleading is REJECTED and does not proceed as an art-direction winner.

## Status rules

- A missing premium asset remains **`CANDIDATE_PENDING`** — never a reason to lower the standard or substitute generic stock/icons.
- `SCIENCE_APPROVED` + `ART_APPROVED` is **not** `APPROVED`; Chief performs final asset acceptance, then authorizes `APPROVED`.
- Only `APPROVED` assets may enter the nine-slide spike.
