# CH1 MEDIA AUDIT — Chapter 1 (Energy Causes Change)

> Phase M1 · zero-trust media audit. **Method:** `ffprobe` technical metadata + SHA-256 byte identity + `tesseract` OCR frame probe (1 frame/2–4 s). **Audio transcription UNAVAILABLE** (no whisper/vosk; headless `SFSpeechRecognizer` hangs on a privacy prompt). Narration **not** captured on screen is `NOT_VERIFIED`. Where on-screen text already shows forbidden content, the verdict is decisive; where on-screen text is clean, the item is low-risk but narration-unverified.
>
> **Authoritative baseline (frozen Ch1 v1.1):** energy = *the ability to cause change*; change = *to become different*; stored energy = *ability to cause change at a later time*; forms = motion (energy of motion), sound, light, heat, electrical; model = ENERGY → CHANGE → EVIDENCE; BQ = *Where can we observe evidence of energy causing change?*; sentence = *"We cannot see energy. We look for a change. A change is our evidence."*
>
> **Reject-list (vocabulary/boundary):** kinetic · potential · mechanical · radiant · thermal · electromagnetic · electron · inertia · momentum · compression-wave · "proof/proves" (use *evidence*) · "active energy" · "energy as substance" (capacity/reserve/quantity) · personifying energy.

## 0. Verdict summary (one line each)

| ID | File | Runtime | Science | Acceptance |
|---|---|---|---|---|
| M01 | The_Invisible_Boss_of_Change | 2:50 | FAIL | REJECT |
| M02 | The_Energy_Detective | 6:45 | PASS | OPTIONAL_REINFORCEMENT |
| M03 | Stored_Energy | 4:37 | PASS | OPTIONAL_REINFORCEMENT |
| M04 | Energy_Detectives_Briefing | 7:53 | PASS_WITH_CAVEAT | FLEX_ENRICHMENT |
| M05 | Chapter_1_Science_Notebook | 8:26 | FAIL | TEACHER_ONLY |
| M06 | How_Scientists_Spot_Invisible_Energy | 1:16 | FAIL | REJECT |
| M07 | Why_Still_Objects_Secretly_Have_Energy | 1:16 | FAIL | REJECT |
| M08 | Chapter_1_Review | 7:17 | FAIL | REJECT |
| M09 | Energy_Causes_Change__The_Electric_Pencil_Sharpener | 3:05 | FAIL | REJECT |
| M10 | How_Change_Proves_Energy_Exists | 1:23 | PASS_WITH_CAVEAT | REJECT |
| M11 | How_Physical_Change_Proves_Energy_Exists | 1:19 | FAIL | REJECT |
| M12 | Energy_Causes_Change (unit-02) | 6:43 | FAIL | REJECT (misnamed) |
| M13 | Energy_Detectives (unit-02) | 7:17 | FAIL | REJECT (misnamed) |

**None is CORE_REQUIRED.** The only required "media moment" is the live electric-pencil-sharpener demonstration. A Chapter 1 lesson is fully complete if every video fails to play.

---

## 1. Duplicate / variant analysis

- **Byte-identical duplicates (renamed re-downloads):** the mission's `(1)`-suffixed names (`Energy_Detectives_Briefing(1).mp4`, `Chapter_1_Review(1).mp4`, `How_Scientists_Spot_Invisible_Energy(1).mp4`, `Stored_Energy(1).mp4`, `Why_Still_Objects_Secretly_Have_Energy(1).mp4`, `The_Energy_Detective(1).mp4`, `The_Invisible_Boss_of_Change(1).mp4`) are macOS re-download renames. All 8 repo copies are **byte-for-byte identical (SHA-256)** to the matching `~/Downloads` originals. One canonical staged copy each — no content drift.
- **Alternate cuts:** `How_Change_Proves_Energy_Exists.mp4` (M10) ↔ `How_Physical_Change_Proves_Energy_Exists.mp4` (M11) — same sharpener-evidence concept, both vertical ~1:20 shorts. M11 is the more advanced/worse variant.
- **Shared contaminated graphic:** the forbidden "forms of energy" grid (`mechanical / electrical–electrons / radiant / thermal / electromagnetic spectrum`) is reused inside M01 (~88–120 s), M05 (~276–300 s), and M08 (~192–216 s). Three videos fail on the same asset.
- **Misnamed (already REJECTED, Phase 13H):** `Energy_Causes_Change.mp4` (M12) is Unit 2 grid/storage; `Energy_Detectives.mp4` (M13) is turbine/generator electricity. Neither is Chapter 1. Relationship to Ch1 concept: **UNRELATED**.
- No file deleted anywhere.

---

## 2. Semantic content summary + science check

### M02 — The_Energy_Detective.mp4 (6:45) — PASS
**Topic:** core concept explainer — how we infer energy from change. **Claims:** energy = ability to cause change; "whenever there is a change, there is some form of energy causing the change"; ENERGY → CHANGE → EVIDENCE (observable change becomes evidence). **Examples:** bright light bulb (light energy), energy of motion, sound energy. **Terminology:** clean (energy of motion, light, sound). **Prompts:** "What evidence of change can you find now?" (answer held to student). No forbidden terms on screen. **Caveat:** 6:45 > 3-min explainer budget; narration unverified. → **OPTIONAL_REINFORCEMENT / MAKEUP**, never full-play in core.

### M03 — Stored_Energy.mp4 (4:37) — PASS
**Topic:** stored energy explainer. **Claims:** "can objects have energy when completely still?"; stored energy = ability to cause change at a later time (matches locked V2 verbatim); "an object can have stored energy from its position." **Examples:** battery (sitting still, ready to power bulb), stretched rubber band (limp→stretched→let go), raised apple (hold high→release→fall), book on shelf. These are **exactly** the locked Ch1 stored-energy examples. **Terminology:** clean. Minor: "Secret Energy!" label and "limp band: no energy" (acceptable Grade-4 shorthand for "no stored-from-stretch energy"). → **best stored-energy media**; 4:37 is the one runtime question (see §3).

### M04 — Energy_Detectives_Briefing.mp4 (7:53) — PASS_WITH_CAVEAT
**Topic:** Energy Detectives activity briefing (the 4-step detective method). **Claims:** energy = ability to cause change; Observe BEFORE → Observe AFTER → Identify change → Explain. **Example:** sharpener "blades still" → "blades moving rapidly"; stored-energy definition. **Terminology:** clean **except** "Tie it together to **prove**" (reject-list). This is the Energy Detectives (optional/ungraded) activity, not core. → **FLEX_ENRICHMENT** with teacher swap "prove"→"evidence".

### M01 — The_Invisible_Boss_of_Change.mp4 (2:50) — FAIL
**Topic:** cinematic opening hook. Clean opening (0–44 s: "ENERGY → CHANGE → EVIDENCE"). **Fails at 88–120 s:** forbidden forms grid (`mechanical` by a machine, `electrical` by movement of `electrons`, `radiant energy`). Later: "STORED ENERGY CAPACITY: 100%", "STORED RESERVE", "Energy Transformation: Storage → Action" — personification ("Boss") + substance/capacity framing + Ch6 "transformation". → **REJECT.** The clean 0–44 s hook is not worth a trim given the metaphor and contamination.

### M05 — Chapter_1_Science_Notebook.mp4 (8:26) — FAIL
**Topic:** notebook walkthrough mirroring the Guided Notes structure (definitions → evidence model → forms → stored energy). **Good:** energy/change/stored-energy definitions verbatim. **Fails:** (a) "**Proof** energy was there" (~192–212 s), (b) forbidden forms grid with `mechanical/radiant/thermal/electrical–electrons/electromagnetic` (~276–300 s), (c) "transforming" (~344 s). Model rendered "ENERGY → ACTION → EVIDENCE" (locked model uses **CHANGE**). → **TEACHER_ONLY** (planning reference only; do not project).

### M06 — How_Scientists_Spot_Invisible_Energy.mp4 (1:16) — FAIL
**Topic:** evidence short. **Fails:** "**Verified Proof**" (×4), "**Zero State** (Motionless)", "**Null Result**", "**Acoustic Vibration**", "**All Physical Actions**". This is the exact content already rejected in the frozen `MEDIA_GUIDE.md`. → **REJECT** (confirms prior decision).

### M07 — Why_Still_Objects_Secretly_Have_Energy.mp4 (1:16) — FAIL
**Topic:** stored-energy retrieval short. **Fails:** "FORWARD **VELOCITY**" (advanced term; project uses *speed*), "Stillness + Zero Energy" (risks teaching stillness ⇒ no energy, contradicting stored energy), "secretly" framing. → **REJECT** (lost to M03).

### M08 — Chapter_1_Review.mp4 (7:17) — FAIL
**Topic:** end-of-chapter review/quiz prep. **Good:** menu (1 What Is Energy, 2 Evidence, 3 Forms, 4 Stored Energy, 5 Final Quiz); ENERGY → CHANGE → EVIDENCE; quiz questions ("scientific definition of energy?", "what do a stretched rubber band & battery share?", "3 steps in our Energy Model?"). **Fails:** forbidden forms grid at ~192–216 s (`mechanical/radiant/thermal/electromagnetic/electrons`) + "**Chemical**: inside a battery" stored-energy type. Friday cannot host new/advanced content. → **REJECT** (clean parts already covered by slides 34–45).

### M09 — Energy_Causes_Change__The_Electric_Pencil_Sharpener.mp4 (3:05) — FAIL
**Topic:** pencil-sharpener demo explainer. **Good:** ENERGY→CHANGE→EVIDENCE framework; ends with the exact Ch1 demo questions ("What changes did you observe? What forms of energy did you notice? How do we know energy was there?"). **Fails:** "Electrical > **Mechanical** Work & Sound", "**Undeniable Proof**: Observed Effects Confirm Energy Transfer", jargon ("Deformation Rate: 0.00 mm/s", "Acoustic Emission"), and an **off-topic "razor/shaving brainstorm" slide at ~90–104 s**. → **REJECT.** The only clean tail (166–184 s) duplicates the slide questions.

### M10 — How_Change_Proves_Energy_Exists.mp4 (1:23) — PASS_WITH_CAVEAT
**Topic:** sharpener evidence short. **Content:** drop pencil in sharpener → BEFORE/AFTER → "what changed?" → energy had to move → motion/sound/heat evidence → energy = ability to cause change. **Science is correct**, but (a) **title/framing = "Proves"** (reject-list), (b) "**transforms** into motion energy" (premature Ch6), (c) "energy **transfer**" (premature Ch4), (d) "MOTION ENERGY" vs locked "energy of motion". → **REJECT as-is** (title alone violates the vocabulary rule); would need regeneration.

### M11 — How_Physical_Change_Proves_Energy_Exists.mp4 (1:19) — FAIL
**Topic:** same sharpener short, more advanced. **Fails:** "**Kinetic** Acoustic **Thermal**", "loud **mechanical** vibrations", "**ACTIVE ENERGY**", "**zero evidence of energy**" at rest (contradicts stored energy), "Physical Difference is your **proof**". → **REJECT** (worst of the three sharpener shorts).

### M12 / M13 — Energy_Causes_Change.mp4 · Energy_Detectives.mp4 — FAIL (misnamed)
Unit 2 content (grid/storage; turbine/generator). Already REJECTED in Phase 13H. Not Chapter 1. → **REJECT.**

---

## 3. Runtime economy

| ID | Runtime | Full-play decision | Clip recommendation |
|---|---|---|---|
| M02 The_Energy_Detective | 6:45 | no | `0:52–2:16` (ENERGY→CHANGE→EVIDENCE) ≈ 1:24, optional reinforcement |
| M03 Stored_Energy | 4:37 | optional-only | `1:04–2:16` (battery → definition → rubber band) ≈ 1:12, or full in buffer |
| M04 Energy_Detectives_Briefing | 7:53 | FLEX-only | full for the optional activity (teacher-narrated "evidence" swap) |
| all others | — | DO_NOT_USE | — |

No 6–8 min full video is recommended inside a 30-minute core block. `Stored_Energy` (4:37) and `The_Energy_Detective` (6:45) are the only science-clean candidates; both exceed the 3-min targeted-explainer budget and are therefore **optional reinforcement**, never on the critical path.

---

## 4. Instructional placement map (accepted items only)

| ID | Item | Exact placement | Status |
|---|---|---|---|
| M03 | Stored_Energy (clip or full) | Session 2 · AFTER slide 27 (N3 reveal) · "wrap the stored-energy idea" | optional · skip freely |
| M02 | The_Energy_Detective (clip) | Session 1 · AFTER slide 16 (N1 reveal) · re-state the model · or Session 2 re-entry (slide 2) | optional · skip freely |
| M04 | Energy_Detectives_Briefing | Energy Detectives FLEX activity · Friday **after the quiz** or a review day | optional · enrichment |

See `CH1_MEDIA_PACING_GUIDE_CANDIDATE.md` for the minute-by-minute candidate budgets.

---

## 5. Demo relationship (pencil sharpener)

Live demonstration remains the primary, required evidence moment (pacing slides 6–9). Media must not replace it.

| Sharpener media | Classification |
|---|---|
| M09 Energy_Causes_Change__The_Electric_Pencil_Sharpener | REDUNDANT + contaminated → REJECT |
| M10 How_Change_Proves_Energy_Exists | REDUNDANT + "Proves" → REJECT |
| M11 How_Physical_Change_Proves_Energy_Exists | REDUNDANT + kinetic/thermal/mechanical → REJECT |
| M04 Energy_Detectives_Briefing (sharpener segment) | FLEX briefing only, after live demo |

**Live classroom evidence first.** No sharpener video earns core time.

---

## 6. Media-failure fallback (no core step depends on video)

Every accepted item is optional. If playback fails: use the live sharpener demo (already required), the Reader pages, the existing slides (34–45 for review), or teacher narration. Because **no** video is CORE_REQUIRED, failure cannot break the lesson.
