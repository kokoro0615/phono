"""Drop glyph outlines that a Figma SVG export baked into an artwork group.

Figma exports a node's *rendered* pixels, so a group whose bounds happen to
cover a sibling text node comes back with that text flattened into paths. When
the page also renders the same string as live HTML (which it must, for
selectable and scalable type), the two copies stack and the letters read as
smeared or "crushed".

A baked glyph is recognised by a very long path `d` — real artwork in this
design is a handful of smooth curves, a typeset word is thousands of segments.

Usage: uv run --no-project python scripts/strip-baked-text.py FILE...
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

# Longest artwork path in this design is ~210 chars; the shortest baked word is
# ~2900. 1200 sits far from both.
GLYPH_PATH_MIN_D = 1200
PATH = re.compile(r'<path\b[^>]*?\sd="([^"]+)"[^>]*?/?>')


def strip(path: Path, fill: str) -> None:
    text = path.read_text(encoding="utf-8")
    removed = 0

    def drop(match: re.Match[str]) -> str:
        nonlocal removed
        tag = match.group(0)
        if len(match.group(1)) < GLYPH_PATH_MIN_D or f'fill="{fill}"' not in tag:
            return tag
        removed += 1
        return ""

    updated = PATH.sub(drop, text)
    if removed:
        path.write_text(re.sub(r"\n{2,}", "\n", updated), encoding="utf-8")
    print(f"{path.name}: removed {removed} baked glyph path(s)")


if __name__ == "__main__":
    args = sys.argv[1:]
    fill = "white"
    if args and args[0].startswith("--fill="):
        fill = args.pop(0).split("=", 1)[1]
    for arg in args:
        strip(Path(arg), fill)
