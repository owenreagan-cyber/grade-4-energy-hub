#!/usr/bin/env python3
"""Zoom into the full-res HEAT and ELECTRICAL sources to isolate evidence cues."""
from pathlib import Path
from PIL import Image

WS = Path(__file__).resolve().parents[1]
APPROVED = WS / "assets" / "approved"
OUT = WS / "spike" / "renders"

def zoom(fname, outname, box):
    im = Image.open(APPROVED / fname).convert("RGB")
    w, h = im.size
    x1, y1, x2, y2 = box
    crop = im.crop((int(x1 * w), int(y1 * h), int(x2 * w), int(y2 * h)))
    crop = crop.resize((crop.width * 2, crop.height * 2), Image.LANCZOS)
    crop.save(OUT / outname)
    print("saved", outname, crop.size)

# HEAT: isolate upper-center where steam rises (whole upper half, wide)
zoom("CH1-FORMS-HEAT-01.jpg", "heat-source-zoom.png", (0.15, 0.0, 0.85, 0.55))
# HEAT: whole image for context
zoom("CH1-FORMS-HEAT-01.jpg", "heat-source-full.png", (0.0, 0.0, 1.0, 1.0))
# ELECTRICAL: center where fan + airflow cue is
zoom("CH1-FORMS-ELECTRICAL-01.jpg", "electrical-source-zoom.png", (0.1, 0.05, 0.9, 0.8))
zoom("CH1-FORMS-ELECTRICAL-01.jpg", "electrical-source-full.png", (0.0, 0.0, 1.0, 1.0))
