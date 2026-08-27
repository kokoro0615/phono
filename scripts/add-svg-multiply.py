"""Restore multiply blending that Figma's SVG export dropped.

Some exported groups render in Figma with their sibling paths multiplied
together, but the export writes them as plain fills. Comparing rendered pixels
against the Figma reference is how such a file is identified; this script then
re-applies the blend to every <path> that does not already carry one, so the
layered colour matches.

Usage: uv run --no-project python scripts/add-svg-multiply.py FILE...
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

PATH_TAG = re.compile(r"<path\b(?![^>]*mix-blend-mode)([^>]*?)(/?)>")


def apply(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    updated, count = PATH_TAG.subn(
        lambda m: f'<path{m.group(1)} style="mix-blend-mode:multiply"{m.group(2)}>', text
    )
    if count:
        path.write_text(updated, encoding="utf-8")
    print(f"{path.name}: multiply applied to {count} path(s)")


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        apply(Path(arg))
