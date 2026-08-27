/**
 * Measure live element boxes in document coordinates and compare them with the
 * Figma node geometry recorded in scripts/expected/<page>.json.
 *
 * Each expected entry: { node, name, sel, x, y, w, h, nth? }
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://127.0.0.1:3300";
const page_ = process.argv[2];
const spec = JSON.parse(readFileSync(`scripts/expected/${page_}.json`, "utf8"));
const TOL = Number(process.env.TOL ?? 2);

const browser = await chromium.launch();
// Reduced motion renders the settled composition, which is what the Figma
// node geometry in scripts/expected/*.json describes.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await page.goto(BASE + spec.route, { waitUntil: "networkidle", timeout: 120000 });
await page.evaluate(async () => {
  for (const img of Array.from(document.images)) img.loading = "eager";
  document.documentElement.style.scrollBehavior = "auto";
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
  window.scrollTo(0, 0);
});
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);

const results = await page.evaluate((items) => {
  return items.map((it) => {
    const nodes = document.querySelectorAll(it.sel);
    const el = nodes[it.nth ?? 0];
    if (!el) return { ...it, missing: true, count: nodes.length };
    const r = el.getBoundingClientRect();
    return {
      ...it,
      count: nodes.length,
      lx: +(r.x).toFixed(1),
      ly: +(r.y + window.scrollY).toFixed(1),
      lw: +(r.width).toFixed(1),
      lh: +(r.height).toFixed(1),
      fs: getComputedStyle(el).fontSize,
      ff: getComputedStyle(el).fontFamily.split(",")[0].replace(/"/g, "")
    };
  });
}, spec.items);

let bad = 0;
console.log(
  "node".padEnd(9) + "name".padEnd(26) + "  Δx     Δy     Δw     Δh   | figma x,y,w,h -> live"
);
for (const r of results) {
  if (r.missing) {
    console.log(`${r.node.padEnd(9)}${r.name.padEnd(26)}  MISSING (selector ${r.sel})`);
    bad++;
    continue;
  }
  const d = (a, b) => +(b - a).toFixed(1);
  const dx = d(r.x, r.lx), dy = d(r.y, r.ly), dw = d(r.w, r.lw), dh = d(r.h, r.lh);
  const off = [dx, dy, dw, dh].some((v) => Math.abs(v) > TOL);
  if (off) bad++;
  const f = (v) => String(v).padStart(6);
  console.log(
    `${r.node.padEnd(9)}${r.name.padEnd(26)}${f(dx)}${f(dy)}${f(dw)}${f(dh)}  | ${r.x},${r.y},${r.w},${r.h} -> ${r.lx},${r.ly},${r.lw},${r.lh}  ${off ? "OFF" : "ok"}  ${r.fs} ${r.ff}`
  );
}
console.log(`\n${results.length - bad}/${results.length} within ±${TOL}px`);
await browser.close();
