#!/usr/bin/env python3
"""One-shot: build a labeled contact sheet from the rendered Ch1 slides."""
import glob
import os

from PIL import Image, ImageDraw

WS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
renders = sorted(glob.glob(os.path.join(WS, "renders", "ch1-slide-*.png")))
thumb_w = 480
cols = 5
pad = 14
label_h = 26

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
for i, im in enumerate(imgs):
    r, c = divmod(i, cols)
    x = pad + c * cell_w
    y = pad + r * cell_h
    sheet.paste(im, (x, y + label_h))
    n = int(os.path.basename(renders[i]).split("-")[-1].split(".")[0])
    d.text((x, y + 4), "slide %d" % n, fill="black")

out = os.path.join(WS, "renders", "contact-sheet.png")
sheet.save(out)
print("contact sheet ->", out, "size", sheet.size)
