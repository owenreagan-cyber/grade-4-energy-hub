#!/usr/bin/env python3
"""One-shot: extract per-slide text from the canonical Ch1 PPTX into JSON."""
import json
import os

from pptx import Presentation

ROOT = "/Users/owen/Projects/grade-4-energy-transfer-transformation"
WS = os.path.join(ROOT, "work", "premium", "chapter-01", "v1.2")
prs = Presentation(os.path.join(ROOT, "production", "slides", "01-ch1-energy-causes-change-slides.pptx"))

out = []
for i, slide in enumerate(prs.slides, 1):
    texts = []
    for shp in slide.shapes:
        if shp.has_text_frame:
            t = shp.text_frame.text.strip()
            if t:
                texts.append(t)
        if shp.has_table:
            for row in shp.table.rows:
                for cell in row.cells:
                    if cell.text.strip():
                        texts.append(cell.text.strip())
    out.append({"slide": i, "text": texts})

with open(os.path.join(WS, "slide-text.json"), "w") as f:
    json.dump(out, f, indent=2)
print("slides:", len(out))
