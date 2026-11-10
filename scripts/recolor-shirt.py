"""Recolour the orange t-shirt in the hero portrait to another colour.

The original orange photo is in git history (images/hero-pointing.png before the blue version).
To try another colour, restore that file, then run from the repo root (needs Pillow and numpy):

    python scripts/recolor-shirt.py images/hero-pointing.png images/hero-pointing.png --hue 221 --sat 0.92
    python scripts/make-images.py images/hero-pointing.png

--hue is the target hue in degrees (221 = the site's blue accent, 190 = teal, 265 = violet).
--sat / --val scale saturation and brightness. --debug <dir> writes a mask overlay and before/after crops.

How it works
  1. Shirt mask from colour: orange hue window AND (high Lab chroma OR very high saturation).
     Skin is the same hue but far less colourful, so it stays out of the mask.
  2. Keep only mask areas connected to the big shirt interior (drops stray skin speckles).
  3. Rotate the hue of masked pixels to the target, keeping each pixel's saturation and
     brightness, so folds and shading stay exactly as photographed.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter


def smoothstep(lo, hi, x):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def rgb_to_hsv(rgb):
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    mx, mn = rgb.max(-1), rgb.min(-1)
    d = mx - mn
    s = np.where(mx > 0, d / np.maximum(mx, 1e-6), 0)
    dd = np.maximum(d, 1e-6)
    h = np.where(mx == r, (g - b) / dd, np.where(mx == g, 2 + (b - r) / dd, 4 + (r - g) / dd))
    h = np.where(d > 1e-6, (h / 6) % 1, 0)
    return h * 360, s, mx


def hsv_to_rgb(h, s, v):
    h6 = (h % 360) / 60
    i = np.floor(h6).astype(int) % 6
    f = h6 - np.floor(h6)
    p, q, t = v * (1 - s), v * (1 - s * f), v * (1 - s * (1 - f))
    r = np.choose(i, [v, q, p, p, t, v])
    g = np.choose(i, [t, v, v, q, p, p])
    b = np.choose(i, [p, p, t, v, v, q])
    return np.stack([r, g, b], -1)


def lab_chroma(rgb):
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    m = np.array([[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]])
    xyz = lin @ m.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    a = 500 * (f[..., 0] - f[..., 1])
    b = 200 * (f[..., 1] - f[..., 2])
    return np.hypot(a, b)


def keep_connected_to_core(mask, core_erode=21, step=7, max_iter=400):
    """Morphological reconstruction: grow the eroded 'core' back out, but only inside the mask."""
    m8 = Image.fromarray((mask > 0.5).astype(np.uint8) * 255)
    marker = np.asarray(m8.filter(ImageFilter.MinFilter(core_erode))) > 0
    hard = np.asarray(m8) > 0
    for _ in range(max_iter):
        grown = np.asarray(Image.fromarray(marker.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(step))) > 0
        grown &= hard
        if (grown == marker).all():
            break
        marker = grown
    return marker


def main():
    args = sys.argv[1:]
    src, out = Path(args[0]), Path(args[1])
    hue_target = float(args[args.index('--hue') + 1]) if '--hue' in args else 221.0
    sat_scale = float(args[args.index('--sat') + 1]) if '--sat' in args else 1.0
    val_scale = float(args[args.index('--val') + 1]) if '--val' in args else 1.0
    debug = Path(args[args.index('--debug') + 1]) if '--debug' in args else None

    im = Image.open(src).convert('RGBA')
    a = np.asarray(im).astype(np.float64) / 255
    rgb, alpha = a[..., :3], a[..., 3]
    h, s, v = rgb_to_hsv(rgb)
    chroma = lab_chroma(rgb)

    hc = np.where(h > 180, h - 360, h)                 # centre on red, so 355 deg reads as -5
    # Shirt hue runs from about -3 (deep shadow, redder) to 28 (highlights); skin sits at 13-22 but is much less colourful.
    hue_win = smoothstep(-16, -8, hc) * (1 - smoothstep(36, 44, hc))
    strong = np.maximum(smoothstep(40, 54, chroma), smoothstep(0.82, 0.90, s) * smoothstep(0.06, 0.14, v))
    raw = hue_win * strong * (alpha > 0.02)

    core = keep_connected_to_core(raw)
    # Soft edge: let the mask fall off over ~1px so shirt/skin and shirt/background edges blend.
    reach = np.asarray(Image.fromarray(core.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(5))) > 0
    mask = np.where(reach, raw, 0.0)
    mask = np.asarray(Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float64) / 255
    mask = np.clip(mask * 1.15, 0, 1)

    shirt_hue = np.median(hc[core])
    new_h = hue_target + (hc - shirt_hue) * 0.5       # keep a little of the natural hue variation
    new_rgb = hsv_to_rgb(new_h, np.clip(s * sat_scale, 0, 1), np.clip(v * val_scale, 0, 1))
    res = rgb * (1 - mask[..., None]) + new_rgb * mask[..., None]

    out_im = Image.fromarray((np.dstack([res, alpha]) * 255 + 0.5).astype(np.uint8), 'RGBA')
    out.parent.mkdir(parents=True, exist_ok=True)
    out_im.save(out, optimize=True)
    print(f'{src.name}: shirt hue {shirt_hue:.1f} -> {hue_target:.0f}; mask covers {mask.mean() * 100:.1f}% of the image; '
          f'raw-only pixels dropped: {int(((raw > 0.5) & ~reach).sum())}')

    if debug:
        debug.mkdir(parents=True, exist_ok=True)
        w = 800
        size = (w, round(im.height * w / im.width))
        over = rgb.copy()
        over[mask > 0.5] = over[mask > 0.5] * 0.35 + np.array([1, 0, 1]) * 0.65            # kept mask: magenta
        dropped = (raw > 0.5) & ~reach
        over[dropped] = np.array([0, 1, 0])                                                  # dropped speckles: green
        Image.fromarray((over * 255).astype(np.uint8)).resize(size, Image.LANCZOS).save(debug / 'mask-overlay.png')
        bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
        bg.alpha_composite(out_im)
        bg.convert('RGB').resize(size, Image.LANCZOS).save(debug / 'result-800.jpg', quality=90)
        # Full-resolution crops of the tricky edges, side by side: before | after
        before = Image.new('RGBA', im.size, (255, 255, 255, 255)); before.alpha_composite(im)
        crops = {'collar': (380, 480, 820, 700), 'left-hand': (150, 640, 520, 960), 'right-hand': (720, 640, 1090, 960),
                 'left-armpit': (160, 930, 420, 1180), 'right-armpit': (860, 930, 1120, 1180), 'left-sleeve': (20, 600, 300, 1060)}
        for name, box in crops.items():
            b, a2 = before.crop(box).convert('RGB'), bg.crop(box).convert('RGB')
            sheet = Image.new('RGB', (b.width * 2 + 8, b.height), (255, 255, 255))
            sheet.paste(b, (0, 0)); sheet.paste(a2, (b.width + 8, 0))
            sheet.save(debug / f'crop-{name}.jpg', quality=92)


if __name__ == '__main__':
    main()
