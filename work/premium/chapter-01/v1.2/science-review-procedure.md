# SCIENCE REVIEW PROCEDURE — Chapter 1 Premium v1.2

> Every candidate passes through science review **FIRST**. A visual that is attractive but misleading is REJECTED and does not proceed as an art-direction winner.

## Review order (hard)

```
CANDIDATE → SCIENCE REVIEW → ART REVIEW → APPROVAL DECISION
```

## Procedure

1. Load the candidate image + its metadata record from `candidate-registry.json`.
2. Load the locked brief from `source-briefs.json` (match by `sourceBriefHash`).
3. Answer the six questions below against the rendered image (not the prompt).
4. Assign a result `PASS` / `FAIL` / `NOT_VERIFIED` and, for any FAIL, a severity per finding.

## Six review questions

| # | Question | What "FAIL" looks like |
|---|---|---|
| 1 | Does it communicate the intended **source-supported** concept? | Wrong or unsupported central concept |
| 2 | Does it **imply an unsupported mechanism**? | Wave/electron/current mechanics drawn |
| 3 | Does it introduce **advanced terminology**? | kinetic/potential/mechanical/radiant/compression-wave/inertia rendered or implied |
| 4 | Does it portray energy as a **visible substance**? | Glow/beam/matter inside objects |
| 5 | Does it create a likely **Grade 4 misconception**? | e.g. "still object has no energy", "energy is a glow" |
| 6 | Is the **observable evidence honest and clear**? | Claims heat not observed; before/after ambiguous |

## Result vocabulary (machine gate status)

- `PASS` — all six questions clear; supports the intended science.
- `FAIL` — at least one BLOCKING/HIGH finding.
- `NOT_VERIFIED` — cannot judge from the image (e.g. missing render); do **not** treat as PASS.

## Finding severity

| Severity | Meaning |
|---|---|
| `BLOCKING` | Falsifies the science or creates a core misconception — auto-FAIL |
| `HIGH` | Materially misleading; requires rework before art review |
| `MEDIUM` | Noticeable but correctable without a science change |
| `LOW` | Minor polish note |
| `INFO` | Observation, no action |

## Rules

- **Beautiful-but-wrong = REJECTED.**
- `NOT_VERIFIED` is not a pass-through; it blocks art review until the image is inspectable.
- Science review writes evidence only; it does **not** edit the candidate.
- Findings are recorded on the candidate's `scienceReview` field + a review note; `FAIL` sets `status = REJECTED` (it does not proceed to art review).

## Traceability

Each candidate review cites `assetId`, `candidateId`, `sourceBriefHash`, and the six-question verdicts. Evidence is independent of the generator: the review is read-only on the candidate image and judges the rendered result, not the prompt.
