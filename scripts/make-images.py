"""Generate responsive WebP + AVIF versions of the portrait photos.
Run from the repo root: python scripts/make-images.py  (needs Pillow 11.3+)."""
from pathlib import Path
from PIL import Image

JOBS = {  # source PNG -> output widths
    "images/hero-pointing.png": [480, 800, 1200],
    "images/about-thumbsup.png": [480, 800],
    "images/cta-armscrossed.png": [400, 800],
}

for src, widths in JOBS.items():
    im = Image.open(src).convert("RGBA")
    stem = Path(src).with_suffix("")
    for w in widths:
        h = round(im.height * w / im.width)
        out = im if w == im.width else im.resize((w, h), Image.LANCZOS)
        out.save(f"{stem}-{w}.webp", "WEBP", quality=80, method=6)
        out.save(f"{stem}-{w}.avif", "AVIF", quality=55, speed=4)
        print(f"{stem}-{w}: {w}x{h}")
