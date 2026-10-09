#!/usr/bin/env python3
"""One-shot: enrich premium-asset-manifest.json with sourceBriefHash + candidateStatus.

Reads source-briefs.json (already built) and adds to each asset:
  - sourceBriefHash  (the locked brief hash the asset's candidates must reference)
  - candidateStatus  (CANDIDATE_PENDING until candidates exist)
  - candidateCount   (0 until generation completes)
"""
import json
import os

WS = "/Users/owen/Projects/grade-4-energy-transfer-transformation/work/premium/chapter-01/v1.2"

briefs_path = os.path.join(WS, "assets", "candidates", "source-briefs.json")
manifest_path = os.path.join(WS, "premium-asset-manifest.json")

with open(briefs_path) as f:
    briefs = json.load(f)["briefs"]

with open(manifest_path) as f:
    manifest = json.load(f)

for a in manifest["assets"]:
    aid = a["assetId"]
    a["sourceBriefHash"] = briefs[aid]["sourceBriefHash"]
    a["candidateStatus"] = "CANDIDATE_PENDING"
    a["candidateCount"] = 0

manifest["note"] = (
    manifest.get("note", "") +
    " Phase 2B: candidate generation AUTHORIZED (design-spike only). "
    "sourceBriefHash references assets/candidates/source-briefs.json; "
    "candidateStatus=CANDIDATE_PENDING until candidates are generated. "
    "Candidate-level tracking lives in assets/candidates/candidate-registry.json."
)

with open(manifest_path, "w") as f:
    json.dump(manifest, f, indent=2)
print("manifest updated ->", manifest_path)
