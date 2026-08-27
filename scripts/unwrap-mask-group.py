"""Push a Figma export's `<g mask=...>` down onto its paths.

Figma writes a masked group as `<g mask="url(#m)">` wrapping the layers. In SVG
a masked group is an isolated group, so any `mix-blend-mode` on a child blends
only inside the group — it never reaches what the group is painted over. Figma's
own compositing does reach it, which is why exported waves come back too light
wherever they sit on a coloured band.

Moving the mask attribute onto each path keeps the identical clip while letting
each layer blend with the real backdrop.

Usage: uv run --no-project python scripts/unwrap-mask-group.py FILE...
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

MASK_GROUP = re.compile(r'<g mask="(url\(#[^"]+\))"\s*>(.*?)</g>', re.DOTALL)
BLEND_WRAPPER = re.compile(r'<g class="phono-wave-blend"\s*>(.*?)</g>', re.DOTALL)
PATH_OPEN = re.compile(r"<path\b")


def unwrap(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    moved = 0

    def rewrite(match: re.Match[str]) -> str:
        nonlocal moved
        mask, body = match.group(1), match.group(2)
        # A style-driven blend wrapper carries the same isolation problem.
        inner = BLEND_WRAPPER.sub(lambda m: m.group(1), body)
        if "mix-blend-mode" not in inner:
            return match.group(0)
        count = len(PATH_OPEN.findall(inner))
        if not count:
            return match.group(0)
        moved += count
        return PATH_OPEN.sub(f'<path mask="{mask}" ', inner)

    updated = MASK_GROUP.sub(rewrite, text)
    if moved:
        # The wrapper class is gone, so its rule would be dead.
        updated = updated.replace(
            "<style>.phono-wave-blend &gt; path{mix-blend-mode:multiply}</style>", ""
        )
        updated = re.sub(
            r'(<path mask="url\(#[^"]+\)" (?![^>]*mix-blend-mode)[^>]*?)/>',
            r'\1 style="mix-blend-mode:multiply"/>',
            updated,
        )
        path.write_text(updated, encoding="utf-8")
    print(f"{path.name}: moved mask onto {moved} path(s)")


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        unwrap(Path(arg))
