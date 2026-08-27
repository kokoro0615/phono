/**
 * List every rendered element whose text is Latin-only (i.e. the Figma design
 * sets it in Futura PT) so the display-font rule can be written against a
 * verified selector list instead of guesses.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:3300";
const ROUTES = ["/", "/about", "/services", "/services/subsidy", "/projects", "/projects/hachimarusuisan-ec", "/contact", "/recruitment"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const all = new Map();

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  const rows = await page.evaluate(() => {
    const out = [];
    const latin = /^[\x20-\x7E ©—→←·]+$/;
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walk.nextNode())) {
      const t = n.textContent.trim();
      if (!t || !latin.test(t)) continue;
      if (/^[\s·—→←]*$/.test(t)) continue;
      const el = n.parentElement;
      if (!el || el.closest(".skip-link")) continue;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      let sel = el.tagName.toLowerCase();
      const cls = (el.className || "").toString().trim().split(/\s+/).filter(Boolean);
      if (cls.length) sel += "." + cls.join(".");
      const parent = el.parentElement;
      if (parent) {
        const pcls = (parent.className || "").toString().trim().split(/\s+/).filter(Boolean);
        if (pcls.length) sel = parent.tagName.toLowerCase() + "." + pcls.join(".") + " > " + sel;
      }
      out.push({ sel, text: t.slice(0, 24), fs: cs.fontSize, fw: cs.fontWeight, w: Math.round(r.width) });
    }
    return out;
  });
  for (const r of rows) {
    const key = r.sel + "|" + r.fs + "|" + r.fw;
    if (!all.has(key)) all.set(key, { ...r, routes: new Set() });
    all.get(key).routes.add(route);
  }
}

const list = [...all.values()].sort((a, b) => parseFloat(b.fs) - parseFloat(a.fs));
for (const r of list) {
  console.log(`${r.fs.padStart(7)} ${r.fw.padStart(4)}  ${JSON.stringify(r.text).padEnd(26)} ${r.sel}`);
}
console.log(`\n${list.length} distinct latin-text selectors`);
await browser.close();
