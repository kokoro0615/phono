/**
 * Release gate: every route at every target viewport must have no horizontal
 * overflow, exactly one h1, no broken images, no scroll reveal left hidden
 * after a full sweep, and a clean console.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:3400";
const WIDTHS = [1440, 1024, 768, 390];
const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/subsidy",
  "/projects",
  "/projects/hachimarusuisan-ec",
  "/contact",
  "/recruitment"
];

const browser = await chromium.launch();
let failures = 0;

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    const consoleErrors = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text().slice(0, 120));
    });
    page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + String(e).slice(0, 120)));

    const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 120000 });
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
      // animation that never lands, so without this the sweep stops a few
      // hundred pixels down and never exercises the rest of the page.
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);

    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll("h1").length,
      broken: Array.from(document.images).filter((i) => !i.complete || i.naturalWidth === 0).length,
      docH: document.documentElement.scrollHeight,
      skip: !!document.querySelector(".skip-link"),
      // Every route carries the footer nav, so this also guards the one route
      // that is *only* reachable through it.
      subsidyLink: !!document.querySelector('.site-footer a[href="/services/subsidy"]'),
      nestedAnchors: document.querySelectorAll("a a").length,
      // Scroll reveals start hidden. After a full sweep every one of them must
      // have been committed: anything still pending is content the reader can
      // never see.
      stranded: Array.from(document.querySelectorAll("[data-reveal]")).filter(
        (el) => el.getAttribute("data-reveal") !== "in"
      ).length
    }));

    const bad =
      res?.status() !== 200 ||
      m.overflow > 0 ||
      m.h1 !== 1 ||
      m.broken > 0 ||
      consoleErrors.length > 0 ||
      !m.skip ||
      !m.subsidyLink ||
      m.nestedAnchors > 0 ||
      m.stranded > 0;
    if (bad) failures++;
    console.log(
      `${bad ? "FAIL" : "ok  "} ${String(width).padStart(4)} ${route.padEnd(34)} status=${res?.status()} overflow=${m.overflow} h1=${m.h1} broken=${m.broken} h=${m.docH} subsidyLink=${m.subsidyLink ? 1 : 0} nestedA=${m.nestedAnchors} stranded=${m.stranded} errors=${consoleErrors.length}${consoleErrors[0] ? " :: " + consoleErrors[0] : ""}`
    );
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
  }
  await page.close();
}

// The Figma detail rows cut the third card off at the frame edge, so the paging
// arrows are the only way to reach it — assert that they actually do.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/services/subsidy", { waitUntil: "networkidle", timeout: 120000 });
  for (const group of ["subsidy-detail-pink", "subsidy-detail-lavender"]) {
    const card = `.${group} .subsidy-detail-card:last-child .subsidy-detail-card-title`;
    await page.locator(`.${group} .subsidy-detail-arrow-next`).click();
    await page.waitForTimeout(600);
    const visible = await page.evaluate((sel) => {
      const r = document.querySelector(sel).getBoundingClientRect();
      return r.x >= 0 && r.right <= 1440;
    }, card);
    if (!visible) failures++;
    console.log(`${visible ? "ok  " : "FAIL"} carousel ${group}: third card reachable`);
  }
  await page.close();
}

console.log(failures === 0 ? "\nALL PASS" : `\n${failures} FAILURES`);
await browser.close();
