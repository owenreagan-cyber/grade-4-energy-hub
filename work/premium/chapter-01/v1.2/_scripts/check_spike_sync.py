#!/usr/bin/env python3
"""Deterministic notes<->slides sync check for the nine-slide premium spike.

Slide-scoped verification (a TEACH card legitimately shows its definition; a
WRITE slide must NOT reveal the answer; the opener must NOT reveal EVIDENCE).

Exit 0 = PASS, exit 1 = FAIL.
"""
from pptx import Presentation
import sys

PPTX = sys.argv[1]
prs = Presentation(PPTX)

slides = {}
for i, slide in enumerate(prs.slides, 1):
    txt = "\n".join(sh.text_frame.text for sh in slide.shapes
                    if sh.has_text_frame and sh.text_frame.text.strip())
    slides[i] = txt

def has(n, s):
    return s in slides.get(n, "")

results = []

def check(name, cond, detail=""):
    results.append((name, cond, detail))
    print(f"{name}: {'PASS' if cond else 'FAIL'} {detail}")

# Slide 1 — opener: BQ teaser present, unresolved motif, no EVIDENCE leak
check("BQ teaser (slide 1)", has(1, "Where can we observe evidence of energy causing change?"))
check("BQ no-answer (slide 1 '?')", has(1, "?") and not has(1, "EVIDENCE"), "(must show '?', not EVIDENCE)")

# Slide 9 — V1 WRITE restraint: blanks present, answers hidden
check("V1 write blanks (slide 9)",
      has(9, "energy — the ability to cause") and has(9, "_______")
      and has(9, "change — to become") and has(9, "_________"))
check("V1 write no-answer (slide 9)",
      not has(9, "the ability to cause change") and not has(9, "to become different"),
      "(answers must stay hidden)")

# Slides 4/5 — V1 TEACH cards: exact definitions shown
check("V1 ENERGY def (slide 4)", has(4, "the ability to cause change"))
check("V1 CHANGE def (slide 5)", has(5, "to become different"))

# Slide 8 — V2 TEACH card: exact definition
check("V2 def (slide 8)", has(8, "energy that has the ability to cause change at a later time"))

# Slide 6 — N1 model: three nodes
check("N1 model (slide 6)", has(6, "ENERGY") and has(6, "CHANGE") and has(6, "EVIDENCE"))

# Slide 7 — N2 five forms: exact labels
check("N2 forms (slide 7)",
      all(has(7, w) for w in ["motion", "sound", "light", "heat", "electrical energy"]))

ok = all(c for _, c, _ in results)
print(f"\nSYNC RESULT: {'PASS' if ok else 'FAIL'}")
sys.exit(0 if ok else 1)
