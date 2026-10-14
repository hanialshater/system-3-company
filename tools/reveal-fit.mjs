// Reveal fit (W-135): on a phone, can the learner read the whole reveal?
//
//   node tools/reveal-fit.mjs --url http://localhost:3471 [<slug> ...] [--jobs 6] [--width 390 --height 844]
//                             [--out artifacts/reveal-fit/<name>.json] [--shots] [--rotate 844x390]
//
// Needs a running build (NEXT_DIST_DIR=.next-fit npm run build; tools/serve.sh start <port> .next-fit).
// For each lesson it opens /d/<slug> at 390×844 (touch, mobile), commits the first option, follows the
// QA contract's path (first 16 enabled stage controls once, sliders two steps), presses "Show me why",
// waits for layout to settle, and measures what the learner sees without touching anything:
//
//   fit     the reveal text is entirely inside the visible window (viewport ∩ every clipping ancestor,
//           and above the card footer)
//   scroll  part of it is hidden, but a scroll container can bring the rest into view
//   clip    part of it is hidden and nothing can scroll to it (the defect W-135 forbids)
//
// It also measures the stage at the reveal: "thumb" when the stage box is under 180px tall while its
// content is taller, or when its main picture (largest svg with a viewBox) is drawn at under 75% of the
// scale the stage width allows and under 200px tall (height-squeezed into a thumbnail).
// Pass (the W-135 bar) = fit or scroll, and no thumb. "fit" is the stricter count: the learner did not
// have to discover a scroll. Exit code 1 if any lesson fails the bar or errors.
// --rotate WxH: reveal at --width x --height, then resize the viewport to WxH (turning the phone after
// the reveal, W-139 follow-up 2) and measure there instead.
// No dependencies beyond @playwright/test, which QA already uses.

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const valued = new Set(["url", "jobs", "width", "height", "out", "rotate"].map((k) => `--${k}`));
const base = opt("url", process.env.REVEAL_FIT_URL);
if (!base) {
  console.log("usage: node tools/reveal-fit.mjs --url http://localhost:<port> [<slug> ...] [--jobs 6] [--out file.json] [--shots]");
  process.exit(2);
}
const width = Number(opt("width", 390));
const height = Number(opt("height", 844));
const jobs = Number(opt("jobs", 6));
const shots = args.includes("--shots");
const rotate = opt("rotate", null)?.split("x").map(Number) ?? null;

function allLessons() {
  const root = "src/demos";
  const out = [];
  for (const domain of fs.readdirSync(root)) {
    const d = path.join(root, domain);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const slug of fs.readdirSync(d)) {
      const m = path.join(d, slug, "meta.json");
      if (fs.existsSync(m)) out.push({ slug, status: JSON.parse(fs.readFileSync(m, "utf8")).status });
    }
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}
const named = args.filter((a, i) => !a.startsWith("--") && !valued.has(args[i - 1]));
const lessons = named.length ? allLessons().filter((l) => named.includes(l.slug)) : allLessons();

// Runs in the page. Returns the geometry of the reveal and the stage as the learner sees it.
function measure() {
  const reveal = document.querySelector('[data-testid="reveal"]');
  const stage = document.querySelector('[data-testid="stage"]');
  if (!reveal || !stage) return { error: "no reveal" };
  const foot = document.querySelector(".card-foot");
  const window_ = (el) => {
    let top = 0;
    let bottom = window.innerHeight;
    const scrollers = [];
    for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowY === "visible") continue;
      const r = a.getBoundingClientRect();
      const t = r.top + a.clientTop;
      top = Math.max(top, t);
      bottom = Math.min(bottom, t + a.clientHeight);
      if ((cs.overflowY === "auto" || cs.overflowY === "scroll") && a.scrollHeight > a.clientHeight + 1)
        scrollers.push(a.scrollHeight - a.clientHeight - a.scrollTop);
    }
    return { top, bottom, scrollers };
  };
  const w = window_(reveal);
  if (foot) {
    const f = foot.getBoundingClientRect();
    const r = reveal.getBoundingClientRect();
    if (f.top < r.bottom && f.bottom > r.top) w.bottom = Math.min(w.bottom, f.top); // footer over the reveal
  }
  const rr = reveal.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(reveal);
  const tr = range.getBoundingClientRect();
  const textTop = Math.min(rr.top, tr.top || rr.top);
  // The reveal itself may be a scroller (its own max-height); then its text runs to scrollHeight.
  const ownScroll = reveal.scrollHeight > reveal.clientHeight + 1;
  const textBottom = Math.max(rr.bottom, tr.bottom, rr.top + (ownScroll ? reveal.scrollHeight : 0));
  const hiddenBelow = Math.max(0, textBottom - w.bottom);
  const hiddenAbove = Math.max(0, w.top - textTop);
  const revealCs = getComputedStyle(reveal);
  const ownReach = ownScroll && (revealCs.overflowY === "auto" || revealCs.overflowY === "scroll") ? reveal.scrollHeight - reveal.clientHeight - reveal.scrollTop : 0;
  const reach = Math.max(0, ...w.scrollers) + ownReach;
  const visibleOwn = ownScroll ? Math.max(0, rr.top + reveal.clientHeight - w.bottom) : 0;
  let verdict;
  // 2px of slack: fractional layout (a 0.5px border) is not a clipped line of text.
  if (hiddenBelow <= 2 && hiddenAbove <= 2 && !(ownScroll && reveal.scrollHeight - reveal.clientHeight - reveal.scrollTop > 2)) verdict = "fit";
  else if (hiddenBelow - visibleOwn <= reach + 2 || ownReach > 0) verdict = "scroll";
  else verdict = "clip";
  const sr = stage.getBoundingClientRect();
  const sw = window_(stage);
  const stageVisible = Math.max(0, Math.min(sr.bottom, sw.bottom) - Math.max(sr.top, sw.top));
  // A picture is squeezed when its height, not the stage width, sets its scale: it is drawn at
  // under 75% of the size the stage width allows and ends up under 200px tall.
  let pic = null;
  for (const svg of stage.querySelectorAll("svg[viewBox]")) {
    const vb = svg.viewBox.baseVal;
    const b = svg.getBoundingClientRect();
    if (!vb || !vb.width || b.width * b.height < (pic?.area ?? 0)) continue;
    const drawn = Math.min(b.width / vb.width, b.height / vb.height);
    const allowed = (stage.clientWidth - 20) / vb.width;
    pic = { area: b.width * b.height, ratio: drawn / allowed, h: Math.round(vb.height * drawn) };
  }
  const squeezed = (sr.height < 180 && stage.scrollHeight > stage.clientHeight + 1) || (pic !== null && pic.ratio < 0.75 && pic.h < 200);
  return {
    verdict,
    hiddenBelow: Math.round(hiddenBelow),
    hiddenAbove: Math.round(hiddenAbove),
    reach: Math.round(reach),
    revealH: Math.round(textBottom - textTop),
    windowH: Math.round(w.bottom - w.top),
    stageH: Math.round(sr.height),
    stageContentH: stage.scrollHeight,
    stageVisible: Math.round(stageVisible),
    picScale: pic ? Math.round(pic.ratio * 100) / 100 : null,
    picH: pic?.h ?? null,
    thumb: squeezed,
  };
}

async function run(page, slug, settle = 120, deep = false) {
  await page.goto(`${base}/d/${slug}`, { waitUntil: "domcontentloaded" });
  await page.locator('[data-testid="lesson"]').waitFor({ timeout: 15_000 });
  await page.locator('[data-testid="predict-option"]').first().click();
  await page.locator('[data-testid="commit-prediction"]').click();
  const controls = page.locator('[data-testid="stage"] [data-qa="control"]');
  const total = Math.min(await controls.count(), deep ? 40 : 16);
  for (let i = 0; i < total; i++) {
    const c = controls.nth(i);
    if ((await c.count()) === 0 || !(await c.isVisible()) || (await c.isDisabled())) continue;
    const type = await c.evaluate((el) => (el.tagName === "INPUT" ? el.type : el.tagName));
    if (type === "range") {
      await c.focus();
      const atMax = await c.evaluate((el) => Number(el.value) >= Number(el.max));
      if (deep) await page.keyboard.press(atMax ? "Home" : "End");
      else for (let k = 0; k < 2; k++) await page.keyboard.press(atMax ? "ArrowLeft" : "ArrowRight");
    } else await c.click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(settle);
  }
  const btn = page.locator('[data-testid="reveal-button"]');
  if (!(await btn.isEnabled())) return { error: "reveal never unlocked" };
  await btn.click();
  await page.locator('[data-testid="reveal"]').waitFor();
  await page.waitForTimeout(900); // animations and any scroll-into-view settle
  if (rotate) {
    await page.setViewportSize({ width: rotate[0], height: rotate[1] });
    await page.waitForTimeout(600);
  }
  const m = await page.evaluate(measure);
  if (shots) {
    fs.mkdirSync("artifacts/reveal-fit", { recursive: true });
    await page.screenshot({ path: `artifacts/reveal-fit/${slug}.png` });
  }
  return m;
}

const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const results = [];
let next = 0;
async function worker() {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  while (next < lessons.length) {
    const l = lessons[next++];
    if (rotate) await page.setViewportSize({ width, height });
    let r;
    try {
      r = await run(page, l.slug);
      // Slow animations can swallow quick taps; retry at the QA contract's pace (450ms per control).
      if (r.error) r = await run(page, l.slug, 450);
      // Lessons gated on a milestone (useMilestones) may need sliders at an end: one deeper pass.
      if (r.error) r = await run(page, l.slug, 450, true);
    } catch (e) {
      r = { error: String(e.message || e).split("\n")[0] };
    }
    results.push({ slug: l.slug, status: l.status, ...r });
    const tag = r.error ? "ERROR" : r.verdict + (r.thumb ? "+thumb" : "");
    if (r.error || r.verdict !== "fit" || r.thumb) console.log(`${tag.padEnd(12)} ${l.slug}  ${r.error ?? `hidden ${r.hiddenBelow}px, reach ${r.reach}px, stage ${r.stageH}px (visible ${r.stageVisible}), picture ${r.picH}px at ${r.picScale}`}`);
  }
  await ctx.close();
}
await Promise.all(Array.from({ length: Math.min(jobs, lessons.length) }, worker));
await browser.close();

results.sort((a, b) => a.slug.localeCompare(b.slug));
const count = (f) => results.filter(f).length;
const summary = {
  viewport: `${width}x${height}` + (rotate ? ` rotated to ${rotate.join("x")}` : ""),
  lessons: results.length,
  fit: count((r) => r.verdict === "fit"),
  scroll: count((r) => r.verdict === "scroll"),
  clip: count((r) => r.verdict === "clip"),
  thumb: count((r) => r.thumb),
  errors: count((r) => r.error),
};
summary.pass = count((r) => !r.error && r.verdict !== "clip" && !r.thumb);
const out = opt("out", null);
if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ summary, recorded: new Date().toISOString(), results }, null, 2));
}
console.log(JSON.stringify(summary));
process.exit(summary.pass === results.length ? 0 : 1);
