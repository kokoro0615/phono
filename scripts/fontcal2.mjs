/**
 * Advance-width half of the Futura PT Heavy substitution fit.
 *
 * Run it AFTER scripts/fontcal3.mjs + scripts/fontgrid.py have fixed the weight
 * to the one whose stroke thickness matches Figma; this then solves tracking
 * for width at that weight. Fitting width alone lets the weight float upward
 * (a heavier Jost is wider, so negative tracking "corrects" it) and produces
 * strokes ~25% too thick — the state this replaced.
 */
import { chromium } from "playwright";

const TARGETS = [
  ["Member", 102, 389], ["Recruitment", 102, 548], ["Projects", 102, 362],
  ["About", 48, 132], ["Services", 48, 180], ["View All", 48, 182], ["View More", 48, 240],
  ["Creative", 39, 148], ["Media", 39, 114],
  ["Hiroto", 55, 157], ["Nonoguchi", 55, 275], ["Takashi", 55, 189], ["Yamashita", 55, 262],
  ["Nobuhiro", 55, 241], ["Endoh", 55, 156], ["Ryo", 55, 97], ["Kawakami", 55, 272],
  ["Top", 30, 48], ["About", 30, 83], ["Services", 30, 113], ["Recruitment", 30, 162],
  ["Member", 30, 119], ["Contact", 30, 103]
];

const FAMILIES = ["Jost"];
const WEIGHTS = [575, 600, 625, 650];
const TRACKING = [-0.01,0,0.005,0.01,0.015,0.02,0.025,0.03,0.035,0.04];

const query = FAMILIES.map((f) => `family=${encodeURIComponent(f)}:wght@100..900`).join("&");
const html = `<!doctype html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${query}&display=block">
<style>body{margin:0}span{white-space:pre;display:inline-block}</style>
</head><body><div id="stage"></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(async (fams) => {
  const jobs = [];
  for (const f of fams) for (const w of [600, 700, 800, 900]) jobs.push(document.fonts.load(`${w} 102px "${f}"`, "MemberRecruitmentProjectsAboutServicesViewCreatveHiotNguchTkasYmhbEdRyKwmiCnt"));
  await Promise.all(jobs);
  await document.fonts.ready;
}, FAMILIES);
await page.waitForTimeout(1500);

const rows = await page.evaluate(({ targets, families, weights, tracking }) => {
  const stage = document.getElementById("stage");
  const out = [];
  for (const family of families) {
    for (const weight of weights) {
      for (const tr of tracking) {
        let sumSq = 0;
        let maxAbs = 0;
        for (const [text, size, want] of targets) {
          const s = document.createElement("span");
          s.textContent = text;
          s.style.fontFamily = `"${family}"`;
          s.style.fontWeight = String(weight);
          s.style.fontSize = size + "px";
          s.style.letterSpacing = tr + "em";
          stage.appendChild(s);
          const got = s.getBoundingClientRect().width;
          s.remove();
          const errPct = (got - want) / want * 100;
          sumSq += errPct * errPct;
          maxAbs = Math.max(maxAbs, Math.abs(errPct));
        }
        out.push({ family, weight, tr, rms: +Math.sqrt(sumSq / targets.length).toFixed(2), max: +maxAbs.toFixed(2) });
      }
    }
  }
  return out;
}, { targets: TARGETS, families: FAMILIES, weights: WEIGHTS, tracking: TRACKING });

rows.sort((a, b) => a.rms - b.rms);
console.log("family            wt   tracking   rms%   max%");
for (const r of rows.slice(0, 15)) {
  console.log(`${r.family.padEnd(18)}${String(r.weight).padEnd(5)}${String(r.tr).padEnd(11)}${String(r.rms).padEnd(7)}${r.max}`);
}

// Detail for the winner.
const best = rows[0];
const detail = await page.evaluate(({ targets, b }) => {
  const stage = document.getElementById("stage");
  return targets.map(([text, size, want]) => {
    const s = document.createElement("span");
    s.textContent = text;
    s.style.fontFamily = `"${b.family}"`;
    s.style.fontWeight = String(b.weight);
    s.style.fontSize = size + "px";
    s.style.letterSpacing = b.tr + "em";
    stage.appendChild(s);
    const got = +s.getBoundingClientRect().width.toFixed(1);
    s.remove();
    return { text, size, want, got, err: +((got - want) / want * 100).toFixed(1) };
  });
}, { targets: TARGETS, b: best });

console.log(`\nbest: ${best.family} ${best.weight} tracking ${best.tr}em`);
for (const d of detail) {
  console.log(`  ${d.text.padEnd(12)}${String(d.size).padStart(4)}px  want ${String(d.want).padStart(5)}  got ${String(d.got).padStart(6)}  ${d.err > 0 ? "+" : ""}${d.err}%`);
}

await browser.close();
