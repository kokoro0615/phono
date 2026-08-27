"""Image comparison helpers for Figma-vs-live pixel auditing.

Usage:
  uv run --with pillow python scripts/imgtool.py sbs FIGMA LIVE OUT [--band Y0 Y1] [--scale S]
  uv run --with pillow python scripts/imgtool.py crop SRC OUT Y0 Y1 [--scale S]
  uv run --with pillow python scripts/imgtool.py diff FIGMA LIVE OUT
  uv run --with pillow python scripts/imgtool.py rowdiff FIGMA LIVE
"""

from __future__ import annotations

import sys

from PIL import Image, ImageChops, ImageDraw

Image.MAX_IMAGE_PIXELS = None


def _arg(flag: str, n: int) -> list[str] | None:
    if flag not in sys.argv:
        return None
    i = sys.argv.index(flag)
    return sys.argv[i + 1 : i + 1 + n]


def side_by_side(figma_path: str, live_path: str, out: str) -> None:
    band = _arg("--band", 2)
    scale = _arg("--scale", 1)
    fig = Image.open(figma_path).convert("RGB")
    live = Image.open(live_path).convert("RGB")
    if band:
        y0, y1 = int(band[0]), int(band[1])
        fig = fig.crop((0, y0, fig.width, min(y1, fig.height)))
        live = live.crop((0, y0, live.width, min(y1, live.height)))
    h = max(fig.height, live.height)
    gap = 24
    canvas = Image.new("RGB", (fig.width + live.width + gap, h + 28), (255, 255, 255))
    canvas.paste(fig, (0, 28))
    canvas.paste(live, (fig.width + gap, 28))
    d = ImageDraw.Draw(canvas)
    d.text((8, 8), "FIGMA", fill=(200, 0, 0))
    d.text((fig.width + gap + 8, 8), "LIVE", fill=(0, 0, 200))
    d.line([(fig.width + gap // 2, 0), (fig.width + gap // 2, h + 28)], fill=(255, 0, 0), width=2)
    if scale:
        s = float(scale[0])
        canvas = canvas.resize((int(canvas.width * s), int(canvas.height * s)), Image.LANCZOS)
    canvas.save(out)
    print(f"{out} {canvas.width}x{canvas.height}")


def crop(src: str, out: str, y0: int, y1: int) -> None:
    scale = _arg("--scale", 1)
    im = Image.open(src).convert("RGB")
    im = im.crop((0, y0, im.width, min(y1, im.height)))
    if scale:
        s = float(scale[0])
        im = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    im.save(out)
    print(f"{out} {im.width}x{im.height}")


def diff(figma_path: str, live_path: str, out: str) -> None:
    fig = Image.open(figma_path).convert("RGB")
    live = Image.open(live_path).convert("RGB")
    h = min(fig.height, live.height)
    w = min(fig.width, live.width)
    fig = fig.crop((0, 0, w, h))
    live = live.crop((0, 0, w, h))
    d = ImageChops.difference(fig, live).convert("L").point(lambda p: 255 if p > 28 else 0)
    d.save(out)
    print(f"{out} {w}x{h}")


def rowdiff(figma_path: str, live_path: str) -> None:
    """Report per-100px-band mismatch ratio so drift shows up as a profile."""
    fig = Image.open(figma_path).convert("L")
    live = Image.open(live_path).convert("L")
    h = min(fig.height, live.height)
    w = min(fig.width, live.width)
    fig = fig.crop((0, 0, w, h))
    live = live.crop((0, 0, w, h))
    d = ImageChops.difference(fig, live).point(lambda p: 255 if p > 40 else 0)
    band = 100
    print(f"size {w}x{h} (figma h={Image.open(figma_path).height} live h={Image.open(live_path).height})")
    for y in range(0, h, band):
        strip = d.crop((0, y, w, min(y + band, h)))
        px = strip.histogram()
        total = sum(px)
        bad = px[255] if len(px) > 255 else 0
        ratio = bad / total if total else 0
        bar = "#" * int(ratio * 60)
        print(f"{y:6d} {ratio*100:6.1f}% {bar}")


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "sbs":
        side_by_side(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == "crop":
        crop(sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5]))
    elif cmd == "diff":
        diff(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == "rowdiff":
        rowdiff(sys.argv[2], sys.argv[3])
    else:
        raise SystemExit(f"unknown command {cmd}")
