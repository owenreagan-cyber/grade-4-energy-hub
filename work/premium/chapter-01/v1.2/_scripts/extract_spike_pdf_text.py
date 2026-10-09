#!/usr/bin/env python3
"""Extract per-page text from the spike PDF for content verification."""
from pypdf import PdfReader
import sys

r = PdfReader(sys.argv[1])
print("pages:", len(r.pages))
for i, p in enumerate(r.pages, 1):
    t = (p.extract_text() or "").strip().replace("\n", " | ")
    print(f"--- p{i} ---")
    print(t)
