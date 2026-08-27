"""Strip Figma's export scaffolding from a downloaded node SVG.

`download_assets` renders a node with the canvas behind it, so every export
starts with an opaque `#F5F5F5` sheet plus a white page rectangle. Both would
paint over whatever the asset is layered on top of in the page, so they are
removed here and the file is rewritten in place.

Only rects that appear before the first drawing instruction are touched, so a
rect that is genuinely part of the artwork survives.

Usage: uv run --no-project python scripts/clean-figma-svg.py FILE...
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

BACKDROP = re.compile(
    r'<rect[^>]*fill="(?:#F5F5F5|white|#FFFFFF)"[^>]*/>\s*',
    re.IGNORECASE,
)
FIRST_DRAW = re.compile(r"<(path|circle|ellipse|polygon|polyline|line|image|text)\b")


def clean(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    match = FIRST_DRAW.search(text)
    cut = match.start() if match else len(text)
    head, tail = text[:cut], text[cut:]
    stripped, count = BACKDROP.subn("", head)
    if count:
        path.write_text(stripped + tail, encoding="utf-8")
    print(f"{path.name}: removed {count} backdrop rect(s)")


def drop_page_clip(path: Path) -> None:
    """Remove a page-sized `clip-path` wrapper.

    Figma wraps a node export in `<g clip-path>` whose clip is the whole page
    rect. The clip does nothing (the viewBox already bounds the render) but it
    does open a stacking context, which isolates the layers' `mix-blend-mode`
    from the page behind the asset.
    """
    text = path.read_text(encoding="utf-8")
    match = re.search(r'<clipPath id="([^"]+)">\s*<rect width="(\d+)" height="(\d+)"', text)
    if not match:
        print(f"{path.name}: no page clip")
        return
    clip_id = match.group(1)
    updated = text.replace(f' clip-path="url(#{clip_id})"', "", 1)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
    print(f"{path.name}: dropped page clip #{clip_id}")


if __name__ == "__main__":
    args = sys.argv[1:]
    unclip = "--drop-page-clip" in args
    for arg in [a for a in args if not a.startswith("--")]:
        clean(Path(arg))
        if unclip:
            drop_page_clip(Path(arg))
