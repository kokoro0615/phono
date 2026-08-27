/** Ad-hoc geometry probe: node scripts/probe.mjs <route> <selector>... */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://127.0.0.1:3300";
const [route, ...sels] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE + route, { waitUntil: "networkidle", timeout: 120000 });
await p.evaluate(async () => {
  for (const i of document.images) i.loading = "eager";
  for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
  window.scrollTo(0, 0);
});
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(600);
const rows = await p.evaluate((sels) => sels.flatMap((sel) =>
  Array.from(document.querySelectorAll(sel)).slice(0, 12).map((el, i) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { sel, i, x: +r.x.toFixed(1), y: +(r.y + window.scrollY).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight, ls: cs.letterSpacing, color: cs.color };
  })), sels);
for (const r of rows) console.log(JSON.stringify(r));
console.log("docH", await p.evaluate(() => document.documentElement.scrollHeight));
await b.close();
