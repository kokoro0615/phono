import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE ?? "http://127.0.0.1:3300";
const OUT = process.env.OUT ?? "docs/figma-pages/live-20260826";
const WIDTH = Number(process.env.W ?? 1440);

const ROUTES = [
  ["top", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["subsidy", "/services/subsidy"],
  ["projects", "/projects"],
  ["project-detail", "/projects/hachimarusuisan-ec"],
  ["contact", "/contact"],
  ["recruitment", "/recruitment"]
];

const only = process.argv[2];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
// Captured with reduced motion: that path is defined to render the settled
// Figma composition with no entrance, drift or parallax applied, which is the
// only state a pixel comparison against the Figma frames can be made against.
const page = await browser.newPage({
  viewport: { width: WIDTH, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce"
});

const report = [];

for (const [name, path] of ROUTES) {
  if (only && only !== name) continue;
  const url = BASE + path;
  const errors = [];
  page.removeAllListeners("console");
  page.removeAllListeners("pageerror");
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 200));
  });
  page.on("pageerror", (e) => errors.push("PAGEERROR " + String(e).slice(0, 200)));

  const res = await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });

  // Native lazy-loading skips images when a scripted scroll moves faster than the
  // intersection callback, which silently blanks whole sections in a fullPage
  // capture. Promote every image to eager and re-issue the request instead.
  await page.evaluate(async () => {
    for (const img of Array.from(document.images)) {
      img.loading = "eager";
      const src = img.getAttribute("src");
      if (src && !img.complete) {
        img.removeAttribute("src");
        img.setAttribute("src", src);
      }
    }
    // `html { scroll-behavior: smooth }` turns a scripted sweep into one long
    // animation that never lands, so the sweep stops a few hundred pixels down
    // and everything below it is captured unloaded.
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  // Wait until every <img> has settled (complete), so fullPage capture is honest.
  await page
    .waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 30000 })
    .catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  const metrics = await page.evaluate(() => ({
    docH: document.documentElement.scrollHeight,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    imgs: Array.from(document.images).length,
    brokenImgs: Array.from(document.images).filter((i) => !i.complete || i.naturalWidth === 0).length,
    fonts: document.fonts.status,
    bodyFont: getComputedStyle(document.body).fontFamily
  }));

  const file = join(OUT, `${name}-${WIDTH}.png`);
  await page.screenshot({ path: file, fullPage: true });
  report.push({ name, status: res?.status(), ...metrics, errors: errors.length, sample: errors[0] ?? "" });
  console.log(JSON.stringify(report[report.length - 1]));
}

await browser.close();
