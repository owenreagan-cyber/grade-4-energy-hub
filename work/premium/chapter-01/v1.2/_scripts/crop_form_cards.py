#!/usr/bin/env python3
"""Crop and 2x-zoom the five-form cards from the full-res slide 7 render."""
from pathlib import Path
from PIL import Image

WS = Path(__file__).resolve().parents[1]
SPIKE = WS / "spike"
src = Image.open(SPIKE / "renders" / "spike-slide-07.png").convert("RGB")
W, H = src.size  # 150dpi => 2000 x 1125

# slide geometry (inches) -> px (2000/13.333 = 150 px/in)
px = W / 13.333
cw, gap = 2.3, 0.183
total = 5 * cw + 4 * gap
x0_in = 0.55 + (12.23 - total) / 2
card_y, card_h = 2.5, 2.6

for i, label in enumerate(["motion", "sound", "light", "heat", "electrical"]):
    cx = x0_in + i * (cw + gap)
    x = int(round(cx * px))
    y = int(round(card_y * px))
    w = int(round(cw * px))
    h = int(round(card_h * px))
    crop = src.crop((x, y, x + w, y + h))
    crop = crop.resize((w * 2, h * 2), Image.LANCZOS)
    out = SPIKE / "renders" / f"forms-zoom-{label}.png"
    crop.save(out)
    print("saved", out.name)
