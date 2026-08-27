"""Turn a Figma "clippath-1" shape inside an exported SVG into a real clip.

Figma clip-path groups export the mask as an ordinary opaque white <path>. Left
as-is it paints a white sheet and the shapes it was meant to bound flood past
their band. This rewrites the file so that path becomes a <clipPath> applied to
every later path.

Usage:
  uv run --no-project python scripts/apply-figma-clip.py FILE [MASK_INDEX]

MASK_INDEX is the 0-based index of the white mask path (default: the first path
whose fill is white).
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

PATH_RE = re.compile(r"<path\b[^>]*?/>", re.DOTALL)
D_RE = re.compile(r'\bd="([^"]+)"')


def apply(path: Path, mask_index: int | None) -> None:
    text = path.read_text(encoding="utf-8")
    paths = list(PATH_RE.finditer(text))
    if not paths:
        raise SystemExit(f"{path}: no self-closing <path> elements")

    if mask_index is None:
        mask_index = next(
            (i for i, m in enumerate(paths) if re.search(r'fill="(white|#FFFFFF)"', m.group(0), re.I)),
            None,
        )
    if mask_index is None:
        raise SystemExit(f"{path}: no white mask path found")

    mask = paths[mask_index]
    d = D_RE.search(mask.group(0))
    if not d:
        raise SystemExit(f"{path}: mask path has no d attribute")

    after = paths[mask_index + 1 :]
    if not after:
        raise SystemExit(f"{path}: nothing follows the mask path")

    clip = f'<clipPath id="figmaClip"><path d="{d.group(1)}"/></clipPath>'
    head = text[: mask.start()]
    body = text[after[0].start() : after[-1].end()]
    tail = text[after[-1].end() :]

    out = f'{head}<defs>{clip}</defs>\n<g clip-path="url(#figmaClip)">\n{body}\n</g>{tail}'
    path.write_text(out, encoding="utf-8")
    print(f"{path.name}: mask path #{mask_index} converted to clipPath over {len(after)} path(s)")


if __name__ == "__main__":
    target = Path(sys.argv[1])
    index = int(sys.argv[2]) if len(sys.argv) > 2 else None
    apply(target, index)
