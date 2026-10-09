#!/usr/bin/env python3
"""One-shot: build source-briefs.json (locked briefs + SHA-256 sourceBriefHash).

The hash ties every candidate to its locked brief. Locked brief content is the
authoritative must/must-not/term/composition for the asset, independent of any
provider handoff prompt (which adds style and creativity latitude).
"""
import hashlib
import json
import os

WS = "/Users/owen/Projects/grade-4-energy-transfer-transformation/work/premium/chapter-01/v1.2"

BRIEFS = {
    "CH1-HERO-01": {
        "concept": "chapter opener / Discovery-Evidence",
        "mustCommunicate": "A change is the clue that energy was involved (an investigation).",
        "mustNotCommunicate": "The answer EVIDENCE (hidden until slide 16); energy as a visible substance; advanced vocabulary.",
        "lockedText": "none in artwork; reserve clean backdrop for title overlay",
        "composition": "16:9 cinematic before/after scene + subtle ENERGY->CHANGE->? glyph; third node '?'; 40pt safe inset",
        "scienceConstraints": "no visible energy beam; no energy=glow",
    },
    "CH1-DARK-BRIGHT-01": {
        "concept": "observable change (dark->bright room)",
        "mustCommunicate": "The room 'became different' - that is a change.",
        "mustNotCommunicate": "a visible energy beam; energy as a substance.",
        "lockedText": "none in photo (labels overlaid)",
        "composition": "two equal side-by-side panels; identical framing/crop for DARK and BRIGHT",
        "scienceConstraints": "light change visibly obvious; no energy ray",
    },
    "CH1-PENCIL-BEFORE-01": {
        "concept": "dull pencil BEFORE (demo)",
        "mustCommunicate": "a dull, quiet pencil.",
        "mustNotCommunicate": "any post-sharpening state in this image.",
        "lockedText": "none (label BEFORE overlaid)",
        "composition": "single subject (dull tip + sharpener), 50-65% of frame",
        "scienceConstraints": "must read as dull/unsharpened",
    },
    "CH1-PENCIL-AFTER-01": {
        "concept": "sharpened pencil AFTER (demo)",
        "mustCommunicate": "the pencil is now shorter and sharper.",
        "mustNotCommunicate": "the sound 'hum' as visible; unobserved heat.",
        "lockedText": "none (label AFTER overlaid)",
        "composition": "identical framing/crop to BEFORE; same subject/angle",
        "scienceConstraints": "change obvious vs BEFORE; matched framing mandatory",
    },
    "CH1-VOC-ENERGY-01": {
        "concept": "energy = ability to cause change",
        "mustCommunicate": "energy - the ability to cause change; an object mid-change.",
        "mustNotCommunicate": "energy as visible glow/substance; advanced vocab.",
        "lockedText": "TERM=energy | DEFINITION=the ability to cause change | FOOTER=Reader p. 1 (rendered by Cursor, NOT by image model)",
        "composition": "560x360pt card; hero visual 50-65%; reserved region for deterministic text overlay",
        "scienceConstraints": "hero object visibly changing; no energy-inside depiction",
    },
    "CH1-VOC-CHANGE-01": {
        "concept": "change = to become different",
        "mustCommunicate": "change - to become different; one concrete before/after difference.",
        "mustNotCommunicate": "abstract change swirl; ambiguous states.",
        "lockedText": "TERM=change | DEFINITION=to become different | FOOTER=Reader p. 1 (rendered by Cursor)",
        "composition": "560x360pt card; before/after hero 50-65%",
        "scienceConstraints": "one concrete observable difference only",
    },
    "CH1-MODEL-ECE-01": {
        "concept": "ENERGY -> CHANGE -> EVIDENCE model",
        "mustCommunicate": "ENERGY -> CHANGE -> EVIDENCE; a change you observe is evidence energy was involved.",
        "mustNotCommunicate": "mechanism arrows (wave physics); energy visible in the wave; advanced vocab.",
        "lockedText": "ENERGY | CHANGE | EVIDENCE (EVIDENCE revealed only on slide 16)",
        "composition": "three navy nodes left->right, gold arrows, large labels; third node as separate reveal layer",
        "scienceConstraints": "arrows = model not mechanism; reveal order preserved",
    },
    "CH1-FORMS-MOTION-01": {
        "concept": "motion energy (five-forms family)",
        "mustCommunicate": "recognizable moving object / carousel / ball; observable motion.",
        "mustNotCommunicate": "abstract streak effects as the science.",
        "lockedText": "label=motion (rendered by Cursor)",
        "composition": "five-form family card; one concrete example + change cue",
        "scienceConstraints": "observable motion, not abstract streaks",
    },
    "CH1-FORMS-SOUND-01": {
        "concept": "sound energy (five-forms family)",
        "mustCommunicate": "recognizable sound-producing object; subtle vibration cue allowed.",
        "mustNotCommunicate": "visible sound rays as literal matter.",
        "lockedText": "label=sound (rendered by Cursor)",
        "composition": "five-form family card; one concrete example + change cue",
        "scienceConstraints": "no compression-wave detail; no literal sound rays",
    },
    "CH1-FORMS-LIGHT-01": {
        "concept": "light energy (five-forms family)",
        "mustCommunicate": "real luminous source visibly illuminating an environment/object.",
        "mustNotCommunicate": "radiant-energy terminology.",
        "lockedText": "label=light (rendered by Cursor)",
        "composition": "five-form family card; one concrete example + change cue",
        "scienceConstraints": "luminous source illuminating environment",
    },
    "CH1-FORMS-HEAT-01": {
        "concept": "heat energy (five-forms family)",
        "mustCommunicate": "real warm/hot object with plausible observable context.",
        "mustNotCommunicate": "unnecessary flame imagery.",
        "lockedText": "label=heat (rendered by Cursor)",
        "composition": "five-form family card; one concrete example + change cue",
        "scienceConstraints": "heat as temperature change (warming), not fire",
    },
    "CH1-FORMS-ELECTRICAL-01": {
        "concept": "electrical energy (five-forms family)",
        "mustCommunicate": "powered real-world device/source producing an observable change.",
        "mustNotCommunicate": "speculative electron mechanics.",
        "lockedText": "label=electrical energy (rendered by Cursor)",
        "composition": "five-form family card; one concrete example + change cue",
        "scienceConstraints": "no electron/current mechanics",
    },
    "CH1-VOC-STORED-ENERGY-01": {
        "concept": "stored energy = cause change later",
        "mustCommunicate": "stored energy - energy that has the ability to cause change at a later time; a still-but-stored object.",
        "mustNotCommunicate": "stored energy = moving; energy visible inside object; kinetic/potential vocab.",
        "lockedText": "TERM=stored energy | DEFINITION=energy that has the ability to cause change at a later time | FOOTER=Reader p. 4 (rendered by Cursor)",
        "composition": "560x360pt card; hero visual 50-65%; STILL->LATER->CHANGE cue optional",
        "scienceConstraints": "object STILL while storing; no energy-inside art",
    },
    "CH1-STORED-BATTERY-01": {
        "concept": "still battery stores energy",
        "mustCommunicate": "a battery in an OFF flashlight.",
        "mustNotCommunicate": "visible energy inside the battery; a lit state in this image.",
        "lockedText": "none (label overlaid)",
        "composition": "flashlight (off) + battery visible; high contrast",
        "scienceConstraints": "flashlight clearly OFF (still, stored)",
    },
    "CH1-STORED-RUBBER-BAND-01": {
        "concept": "stretched rubber band stores energy",
        "mustCommunicate": "a stretched (not yet released) rubber band.",
        "mustNotCommunicate": "the release outcome in the same image.",
        "lockedText": "none (label overlaid)",
        "composition": "stretched band between fingers; high contrast",
        "scienceConstraints": "band STRETCHED but NOT yet released",
    },
    "CH1-STORED-RAISED-APPLE-01": {
        "concept": "position relates to stored energy",
        "mustCommunicate": "an apple held above the ground (position/height).",
        "mustNotCommunicate": "gravitational potential energy label; fall outcome as required content.",
        "lockedText": "none (label overlaid)",
        "composition": "apple held high vs ground reference; obvious height difference",
        "scienceConstraints": "show position, not motion; no energy-inside-apple",
    },
}

out = {"schema": "ch1-premium-source-briefs-v1", "generated_at": "2026-10-08", "briefs": {}}
for aid, brief in BRIEFS.items():
    canonical = json.dumps(brief, sort_keys=True, ensure_ascii=False)
    out["briefs"][aid] = {
        "brief": brief,
        "sourceBriefHash": hashlib.sha256(canonical.encode("utf-8")).hexdigest(),
    }

path = os.path.join(WS, "assets", "candidates", "source-briefs.json")
with open(path, "w") as f:
    json.dump(out, f, indent=2)
print("source-briefs ->", path, "assets:", len(out["briefs"]))
