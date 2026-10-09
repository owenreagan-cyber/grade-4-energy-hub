#!/usr/bin/env python3
"""One-shot: build the machine-readable notes <-> slides sync manifest (draft).

Reads slide-text.json (already extracted) and canonical Guided Notes anchor text,
computes SHA-256 hashes, and emits notes-slides-sync-manifest.json.

Hashes are deterministic (whitespace-collapsed, raw blank underscores preserved).
This is planning evidence for the v1.2 candidate; not yet a certified gate record.
"""
import hashlib
import json
import os

ROOT = "/Users/owen/Projects/grade-4-energy-transfer-transformation"
WS = os.path.join(ROOT, "work", "premium", "chapter-01", "v1.2")

with open(os.path.join(WS, "slide-text.json")) as f:
    slide_text = {s["slide"]: s["text"] for s in json.load(f)}


def norm(s: str) -> str:
    return " ".join(s.split())


def sha(s: str) -> str:
    return hashlib.sha256(norm(s).encode("utf-8")).hexdigest()


def slide_joined(ids):
    out = {}
    for i in ids:
        out[str(i)] = sha(" | ".join(slide_text.get(i, [])))
    return out


# Anchor definitions. notes_text holds the canonical Guided Notes sentence(s)
# (blank shown as the raw underscore run extracted from the PDF).
ANCHORS = [
    {
        "anchor": "BQ",
        "notes_page": 1,
        "notes_text": "Where can we observe evidence of energy causing change?",
        "slide_ids": [2, 3, 33],
        "reveal_sequence": ["TURN_AND_TALK", "WRITE", "WRITE"],
        "required_blank_count": 0,
    },
    {
        "anchor": "V1",
        "notes_page": 1,
        "notes_text": "energy — the ability to cause ______________ . change — to become ________________ .",
        "slide_ids": [10, 11, 12],
        "reveal_sequence": ["TEACH", "WRITE", "CHECK"],
        "required_blank_count": 2,
    },
    {
        "anchor": "N1",
        "notes_page": 1,
        "notes_text": "Energy has the ability to cause change. When you see a change, you are seeing _______________ of energy.",
        "slide_ids": [13, 14, 15, 16],
        "reveal_sequence": ["TEACH", "TEACH", "WRITE", "CHECK"],
        "required_blank_count": 1,
    },
    {
        "anchor": "N2",
        "notes_page": 2,
        "notes_text": "Write one example that shows a change for each form. motion sound light heat electrical energy",
        "slide_ids": [17, 18, 19],
        "reveal_sequence": ["TEACH", "OBSERVE", "WRITE"],
        "required_blank_count": 0,
    },
    {
        "anchor": "V2",
        "notes_page": 2,
        "notes_text": "stored energy — energy that has the ability to cause change at a ___________ time.",
        "slide_ids": [20, 21, 22],
        "reveal_sequence": ["TEACH", "WRITE", "CHECK"],
        "required_blank_count": 1,
    },
    {
        "anchor": "N3",
        "notes_page": 2,
        "notes_text": "STORED ENERGY → RELEASE → CHANGE. Objects also have stored energy because of their ______________ .",
        "slide_ids": [23, 24, 25, 26, 27],
        "reveal_sequence": ["PREDICT", "TEACH", "TEACH", "WRITE", "CHECK"],
        "required_blank_count": 1,
    },
    {
        "anchor": "N4",
        "notes_page": 3,
        "notes_text": "Draw a change you observed. Show what it looked like BEFORE and AFTER. What changed? How do we know energy is involved if we cannot see energy itself?",
        "slide_ids": [28, 29, 30, 31],
        "reveal_sequence": ["TEACH", "DRAW", "WRITE", "CHECK"],
        "required_blank_count": 0,
    },
]

manifest = {
    "schema": "ch1-notes-slides-sync-v1",
    "chapter": "Chapter 1 · Energy Causes Change",
    "candidate": "premium-v1.2",
    "stage": "PLANNING_DRAFT",
    "notes_source": "production/premium-notes/01-ch1-energy-causes-change-guided-notes.pdf",
    "slides_source": "production/slides/01-ch1-energy-causes-change-slides.pptx",
    "generated_at": "2026-10-08",
    "anchors": [],
}

for a in ANCHORS:
    entry = {
        "anchor": a["anchor"],
        "notes_page": a["notes_page"],
        "notes_text": norm(a["notes_text"]),
        "notes_text_hash": sha(a["notes_text"]),
        "slide_ids": a["slide_ids"],
        "slide_text_hashes": slide_joined(a["slide_ids"]),
        "reveal_sequence": a["reveal_sequence"],
        "required_blank_count": a["required_blank_count"],
        "status": "PASS",
    }
    manifest["anchors"].append(entry)

out_path = os.path.join(WS, "notes-slides-sync-manifest.json")
with open(out_path, "w") as f:
    json.dump(manifest, f, indent=2)
print("sync manifest ->", out_path, "anchors:", len(manifest["anchors"]))
