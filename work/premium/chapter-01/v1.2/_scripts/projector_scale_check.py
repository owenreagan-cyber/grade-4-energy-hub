#!/usr/bin/env python3
"""Projector-scale evidence check for the five-form cards.

Renders each approved five-form source image at the exact on-slide display
size (card image is ~2.14in wide) scaled to a 1280x720 projector, then writes
a side-by-side review strip so the evidence cues (ball motion, bell, lamp,
steam, fan) can be inspected at classroom scale.
"""
from pathlib import Path
from PIL import Image

WS = Path(__file__).resolve().parents[1]
APPROVED = WS / "assets" / "approved"
OUT = WS / "spike" / "renders" / "projector-scale-forms.png"

# On-slide geometry (inches): card_w=2.3, image inset 0.08 each side => iw=2.14in
# Slide is 13.333in wide; a 1280px projector => 1280/13.333 = 96 px/in.
# Card image width = 2.14 * 96 = ~205 px.
px_per_in = 1280 / 13.333
target_w = int(round(2.14 * px_per_in))

forms = [
    ("motion", "CH1-FORMS-MOTION-01.jpg"),
    ("sound", "CH1-FORMS-SOUND-01.jpg"),
    ("light", "CH1-FORMS-LIGHT-01.jpg"),
    ("heat", "CH1-FORMS-HEAT-01.jpg"),
    ("electrical", "CH1-FORMS-ELECTRICAL-01.jpg"),
]

pad = 12
label_h = 20
thumbs = []
for label, fname in forms:
    im = Image.open(APPROVED / fname).convert("RGB")
    # preserve 4:3 aspect as on-slide
    h = int(round(target_w * 3 / 4))
    t = im.resize((target_w, h))
    thumbs.append((label, t))

w = sum(t.width for _, t in thumbs) + pad * (len(thumbs) + 1)
h = max(t.height for _, t in thumbs) + label_h + pad * 2
sheet = Image.new("RGB", (w, h), "white")
from PIL import ImageDraw
d = ImageDraw.Draw(sheet)
x = pad
for label, t in thumbs:
    d.text((x, pad // 2), label, fill="black")
    sheet.paste(t, (x, pad + label_h))
    x += t.width + pad

OUT.parent.mkdir(parents=True, exist_ok=True)
sheet.save(OUT)
print("projector-scale strip ->", OUT, "card image size ~", target_w, "px wide")
