#!/usr/bin/env python3
"""Phase 3 — record Chief-approved premium source-art intake in the asset manifest.

Reads the canonical asset manifest, applies intake metadata (sourceFile,
production filePath, dimensions, aspect) and sets scienceReview/artReview=PASS,
status=APPROVED for the 14 Chief-approved assets. Adds CH1-PENCIL-EVIDENCE-01
(the combined pencil before/after evidence image) as a new record.

Idempotent: safe to re-run.
"""
import json
from pathlib import Path

WS = Path(__file__).resolve().parents[1]
MANIFEST = WS / "premium-asset-manifest.json"
APPROVED_DIR = "assets/approved"

# assetId -> (sourceFile_in_Downloads, width, height)
INTAKE = {
    "CH1-HERO-01":              ("candidate-a-lamp-lit-chapter-opener-final.jpg", 1920, 1080),
    "CH1-VOC-ENERGY-01":        ("ch1-voc-energy-01-refined.jpg", 1918, 1233),
    "CH1-VOC-CHANGE-01":        ("ch1-voc-change-01-refined.jpg", 1920, 1234),
    "CH1-VOC-STORED-ENERGY-01": ("ch1-voc-stored-energy-01.jpg", 1920, 1234),
    "CH1-MODEL-ECE-01":         ("ch1-model-ece-01.jpg", 1920, 1080),
    "CH1-FORMS-MOTION-01":      ("ch1-forms-motion-03.jpg", 1440, 1080),
    "CH1-FORMS-SOUND-01":       ("ch1-forms-sound-02.jpg", 1536, 1152),
    "CH1-FORMS-LIGHT-01":       ("ch1-forms-light-02.jpg", 1536, 1152),
    "CH1-FORMS-HEAT-01":        ("ch1-forms-heat-01.jpg", 1440, 1080),
    "CH1-FORMS-ELECTRICAL-01":  ("ch1-forms-electrical-01.jpg", 1440, 1080),
    "CH1-DARK-BRIGHT-01":       ("ch1-dark-bright-01.jpg", 1920, 1080),
    "CH1-STORED-BATTERY-01":    ("ch1-stored-battery-01.jpg", 1920, 1440),
    "CH1-STORED-RAISED-APPLE-01": ("ch1-stored-raised-apple-01.jpg", 1440, 1920),
    "CH1-PENCIL-EVIDENCE-01":   ("ch1-pencil-evidence-01.jpg", 1920, 1234),
}

# New record template for CH1-PENCIL-EVIDENCE-01 (combined before/after).
NEW_RECORD = {
    "assetId": "CH1-PENCIL-EVIDENCE-01",
    "type": "photo-before-after",
    "concept": "pencil before/after evidence (demo)",
    "provider": "photography",
    "sourceBasis": "SOURCE",
    "classroomBlocking": "NO",
    "premiumCompletion": "REQUIRED",
    "scienceReview": "REQUIRED",
    "artReview": "REQUIRED",
    "status": "BRIEF",
    "reuseScope": "Ch1 demo (combined before/after evidence image)",
    "usedOnSlides": [8],
    "filePath": None,
    "sourceBriefHash": None,
    "candidateStatus": "CANDIDATE_PENDING",
    "candidateCount": 0,
}

data = json.loads(MANIFEST.read_text())

existing_ids = {a["assetId"] for a in data["assets"]}

# Add CH1-PENCIL-EVIDENCE-01 if absent.
if "CH1-PENCIL-EVIDENCE-01" not in existing_ids:
    data["assets"].append(NEW_RECORD)
    existing_ids.add("CH1-PENCIL-EVIDENCE-01")

# Apply intake metadata to approved assets.
for a in data["assets"]:
    aid = a["assetId"]
    if aid in INTAKE:
        src_name, w, h = INTAKE[aid]
        a["sourceFile"] = src_name
        a["filePath"] = f"{APPROVED_DIR}/{aid}.jpg"
        a["dimensions"] = {"width": w, "height": h}
        a["aspect"] = round(w / h, 4)
        a["scienceReview"] = "PASS"
        a["artReview"] = "PASS"
        a["status"] = "APPROVED"
        a["candidateStatus"] = "APPROVED"

data["stage"] = "PHASE_3_ASSET_INTAKE"
data["note"] = (
    "Phase 3 intake. 14 Chief-approved source-art files copied from ~/Downloads "
    "into assets/approved/ under canonical names (originals preserved in Downloads). "
    "scienceReview=PASS, artReview=PASS, status=APPROVED. CH1-PENCIL-EVIDENCE-01 is a "
    "combined before/after evidence image that supersedes CH1-PENCIL-BEFORE-01 and "
    "CH1-PENCIL-AFTER-01 for the nine-slide spike (both remain BRIEF below). "
    "CH1-STORED-RUBBER-BAND-01 remains BRIEF (not in the approved set)."
)

MANIFEST.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")

approved = [a["assetId"] for a in data["assets"] if a.get("status") == "APPROVED"]
print(f"Updated {MANIFEST.name}")
print(f"APPROVED count: {len(approved)}")
for aid in approved:
    print(f"  APPROVED {aid}")
print("Non-approved (BRIEF):",
      [a["assetId"] for a in data["assets"] if a.get("status") != "APPROVED"])
