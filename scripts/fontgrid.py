"""Measure the fontcal3 grid and rank weight/tracking against Figma targets."""
import json
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

# Targets read off the native Figma 1440 export (docs/figma-pages/ref-20260826).
TARGETS = {  # key: (advance width px, median stem run px)
    "Media39": (115, 5),
    "About48": (130, 7),
    "Services48": (176, 7),
    "Member102": (383, 15),
    "Services30": (109, 4),
}

def metrics(im, y0, y1):
    px = im.load(); w, h = im.size
    m = [[1 if px[x, y][0] < 128 else 0 for x in range(w)] for y in range(y0, y1)]
    xs = [x for r in m for x, v in enumerate(r) if v]
    ys = [y for y, r in enumerate(m) for v in r if v]
    if not xs: return None
    x0, x1 = min(xs), max(xs)
    yy = [y for y, r in enumerate(m) if any(r)]
    ry0, ry1 = min(yy), max(yy)
    runs = []
    for y in range(ry0, ry1 + 1):
        run = 0
        for x in range(x0, x1 + 2):
            on = x <= x1 and m[y][x]
            if on: run += 1
            elif run: runs.append(run); run = 0
    runs.sort()
    return x1 - x0 + 1, (runs[len(runs) // 2] if runs else 0)

cfg = json.load(open("/tmp/fontcal3.json"))
im = Image.open("/tmp/fontcal3.png").convert("RGB")
rows = {}
for i, c in enumerate(cfg["cells"]):
    r = metrics(im, i * cfg["rowH"], (i + 1) * cfg["rowH"])
    if not r: continue
    rows.setdefault((c["weight"], c["track"]), {})[c["key"]] = r

print(f"{'w':>4} {'track':>7} | " + " ".join(f"{k:>16}" for k in TARGETS) + " | Δwidth% Δstem%")
best = []
for (w, t), got in sorted(rows.items()):
    if len(got) < len(TARGETS): continue
    dw, ds, cells = [], [], []
    for k, (tw, ts) in TARGETS.items():
        gw, gs = got[k]
        dw.append(gw / tw - 1); ds.append(gs / ts - 1)
        cells.append(f"{gw:4d}/{gs:<2d}({tw}/{ts})".rjust(16))
    mw = sum(abs(v) for v in dw) / len(dw) * 100
    ms = sum(abs(v) for v in ds) / len(ds) * 100
    best.append((mw + ms, mw, ms, w, t))
    print(f"{w:>4} {t:>7} | " + " ".join(cells) + f" | {mw:6.1f}% {ms:6.1f}%")

print("\nRanked (mean |Δwidth| + mean |Δstem|):")
for score, mw, ms, w, t in sorted(best)[:8]:
    print(f"  weight={w:<4} tracking={t:<7} width_err={mw:5.1f}%  stem_err={ms:5.1f}%  total={score:5.1f}")
