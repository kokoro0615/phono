/**
 * Calibrate the Jost substitution against Futura PT Heavy as Figma renders it.
 *
 * Renders each display string at its Figma size across a weight x tracking grid,
 * screenshots the grid, and leaves measurement to scripts/fontgrid.py (stem
 * thickness + advance width are read off the pixels, not from font metrics).
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const SAMPLES = [
  { text: "Media", size: 39 },
  { text: "About", size: 48 },
  { text: "Services", size: 48 },
  { text: "Member", size: 102 },
  { text: "Services", size: 30, key: "Services30" }
];
const WEIGHTS = [500, 550, 600, 625, 650, 675, 700, 750];
const TRACKS = [-0.02, -0.01, 0, 0.005, 0.01];

const cells = [];
for (const s of SAMPLES)
  for (const w of WEIGHTS)
    for (const t of TRACKS)
      cells.push({ ...s, key: s.key ?? `${s.text}${s.size}`, weight: w, track: t });

const ROW_H = 160;
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@100..900&display=block" rel="stylesheet">
<style>
  html,body{margin:0;background:#fff;color:#000}
  .cell{position:relative;height:${ROW_H}px;box-sizing:border-box;padding:0}
  .cell span{position:absolute;left:40px;top:40px;font-family:Jost;white-space:nowrap;line-height:1.284}
</style></head><body>
${cells.map((c) => `<div class="cell"><span style="font-size:${c.size}px;font-weight:${c.weight};letter-spacing:${c.track}em">${c.text}</span></div>`).join("\n")}
</body></html>`;

writeFileSync("/tmp/fontcal3.html", html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 800 }, deviceScaleFactor: 1 });
await page.goto("file:///tmp/fontcal3.html", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/fontcal3.png", fullPage: true });
writeFileSync("/tmp/fontcal3.json", JSON.stringify({ rowH: ROW_H, cells }, null, 0));
console.log(`cells=${cells.length} rowH=${ROW_H}`);
await browser.close();
