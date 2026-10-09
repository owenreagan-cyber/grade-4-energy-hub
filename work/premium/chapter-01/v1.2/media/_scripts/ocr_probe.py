#!/usr/bin/env python3
"""Deterministic frame+OCR probe for media audit. ffmpeg + tesseract CLI.

Usage: python3 ocr_probe.py <video> <interval_seconds> <out_txt>
Extracts one frame every `interval_seconds`, OCRs it with tesseract,
dedupes consecutive identical text, and writes a timestamped outline.
"""
import subprocess, sys, tempfile, os, shutil, re

def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)

def main():
    video = sys.argv[1]
    interval = float(sys.argv[2])
    out_txt = sys.argv[3]

    tmp = tempfile.mkdtemp(prefix="media_ocr_")
    try:
        # probe duration
        p = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                 "-of", "csv=p=0", video])
        dur = float(p.stdout.strip())
        n = int(dur // interval) + 1

        # extract frames
        run(["ffmpeg", "-v", "error", "-i", video, "-vf",
             f"fps=1/{interval}", "-q:v", "2", f"{tmp}/f_%05d.jpg"])

        lines = []
        prev = ""
        files = sorted(os.listdir(tmp))
        for i, fn in enumerate(files):
            if not fn.endswith(".jpg"):
                continue
            t = round(i * interval, 1)
            o = run(["tesseract", os.path.join(tmp, fn), "stdout", "--psm", "6"])
            text = re.sub(r"\n{2,}", "\n", o.stdout).strip()
            # skip blank; dedupe consecutive
            if not text:
                continue
            if text == prev:
                continue
            prev = text
            lines.append(f"[{t:6.1f}s] {text}")

        with open(out_txt, "w") as f:
            f.write(f"# {os.path.basename(video)}\n# duration={dur:.1f}s interval={interval}s\n")
            f.write("\n\n".join(lines) + "\n")
        print(f"wrote {out_txt}: {len(lines)} unique text frames over {dur:.1f}s")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

if __name__ == "__main__":
    main()
