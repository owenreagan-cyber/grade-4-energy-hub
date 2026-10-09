#!/usr/bin/env python3
"""Build a labeled contact sheet for the nine-slide premium spike."""
from pathlib import Path

from PIL import Image, ImageDraw

SPIKE = Path(__file__).resolve().parents[1] / "spike"
renders = sorted(SPIKE.glob("renders/spike-slide-*.png"))

thumb_w = 420
cols = 3
pad = 14
label_h = 30

imgs = []
for p in renders:
    im = Image.open(p)
    w, h = im.size
    nh = max(1, int(h * thumb_w / w))
    imgs.append(im.resize((thumb_w, nh)))

cell_w = thumb_w + pad
cell_h = max(i.height for i in imgs) + label_h + pad
rows = (len(imgs) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cell_w + pad, rows * cell_h + pad), "white")
d = ImageDraw.Draw(sheet)
labels = {
    "01": "1 Opener", "02": "2 Dark->Bright", "03": "3 Pencil", "04": "4 ENERGY card",
    "05": "5 CHANGE card", "06": "6 ECE model", "07": "7 Five forms", "08": "8 STORED card",
    "09": "9 Write/Check",
}
for i, im in enumerate(imgs):
    r, c = divmod(i, cols)
    x = pad + c * cell_w
    y = pad + r * cell_h
    sheet.paste(im, (x, y + label_h))
    n = Path(renders[i]).stem.split("-")[-1]
    d.text((x, y + 6), f"{n}: {labels.get(n, '')}", fill="black")

out = SPIKE / "contact-sheet.png"
sheet.save(out)
print("contact sheet ->", out, "size", sheet.size)
