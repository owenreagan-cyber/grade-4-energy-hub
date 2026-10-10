"""Concrete candidate-only owner requirements; run after PDF rendering."""
import unittest
from pathlib import Path
import pymupdf

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'production/candidates/chapter-01/guided-notes-polish'
STEM = '01-ch1-energy-causes-change-guided-notes-polish'

class CandidateRequirements(unittest.TestCase):
    def test_two_page_limit(self):
        for suffix in ('', '-key'):
            with pymupdf.open(OUT / f'{STEM}{suffix}.pdf') as doc:
                self.assertEqual(len(doc), 2, suffix)

    def test_teacher_geometry_matches_student(self):
        with pymupdf.open(OUT / f'{STEM}.pdf') as student, pymupdf.open(OUT / f'{STEM}-key.pdf') as key:
            for sp, kp in zip(student, key):
                self.assertEqual(sp.rect, kp.rect)
                def geometry(page):
                    return [(d['type'], tuple(round(v, 2) for v in d['rect'])) for d in page.get_drawings()]
                self.assertEqual(geometry(sp), geometry(kp))

    def test_no_red_answers(self):
        with pymupdf.open(OUT / f'{STEM}-key.pdf') as key:
            colors = {s['color'] for p in key for b in p.get_text('dict')['blocks'] if 'lines' in b for l in b['lines'] for s in l['spans']}
            self.assertNotIn(0xFF0000, colors)
            for color in colors:
                r, g, b = color >> 16, (color >> 8) & 255, color & 255
                self.assertFalse(r > 130 and r > g * 1.8 and r > b * 1.8)

if __name__ == '__main__':
    unittest.main()