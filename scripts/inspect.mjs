import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:3300";
const path = process.argv[2] ?? "/";
const selector = process.argv[3] ?? ".figma-asset";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 120000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2500);

const rows = await page.evaluate((sel) => {
  return Array.from(document.querySelectorAll(sel)).map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const img = el.tagName === "IMG" ? el : el.querySelector("img");
    return {
      cls: el.className?.toString().slice(0, 90),
      x: Math.round(r.x),
      y: Math.round(r.y + window.scrollY),
      w: Math.round(r.width),
      h: Math.round(r.height),
      disp: cs.display,
      pos: cs.position,
      vis: cs.visibility,
      op: cs.opacity,
      blend: cs.mixBlendMode,
      z: cs.zIndex,
      imgSrc: img ? decodeURIComponent(img.currentSrc || img.src).split("/").pop().slice(0, 60) : null,
      imgNat: img ? `${img.naturalWidth}x${img.naturalHeight}` : null,
      imgComplete: img ? img.complete : null
    };
  });
}, selector);

for (const r of rows) console.log(JSON.stringify(r));
await browser.close();
