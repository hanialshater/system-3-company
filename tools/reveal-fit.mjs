// Reveal fit (W-135): on a phone, can the learner read the whole reveal?
//
//   node tools/reveal-fit.mjs --url http://localhost:3471 [<slug> ...] [--jobs 6] [--width 390 --height 844]
//                             [--out artifacts/reveal-fit/<name>.json] [--shots] [--rotate 844x390] [--strict]
//
// Needs a running build (NEXT_DIST_DIR=.next-fit npm run build; tools/serve.sh start <port> .next-fit).
// For each lesson it opens /d/<slug> at 390×844 (touch, mobile; taps, falling back to clicks with input: "click"), commits the first option, follows the
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
// scale the stage width allows and under 200px tall (height-squeezed into a thumbnail). Pictures the
// card shrank on purpose at the reveal (svg[data-reveal-fit], commit 1a879c6) are not thumbnails; they
// are reported as `fitted` (drawn/natural px) instead.
// Pass (the W-135 bar) = fit or scroll, and no thumb. "fit" is the stricter count: the learner did not
// have to discover a scroll. Exit code 1 if any lesson fails the bar or errors.
//
// Phone fit (W-242; demo-standard "The reveal fits with its picture", Pre-flight 7), in px:
//   crop        how far the stage top is above the visible card (0 = stage top on screen)
//   hiddenBelow how far the reveal's last line is below the visible card (above the footer)
//   named       stage labels the reveal quotes (svg text, HTML text, aria-label; >= 4 letters, or a
//               2+ digit number), each with visible true/false. Heuristic: a picture named only by a
//               noun ("the globe") is not detected; namedHidden counts quoted labels off screen.
//   parts       stage height by block: picture (holds an svg >= 60px or one the card fitted), table (<table>, role table/grid,
//               a class with "table", or 3+ readouts and no control), controls, text; revealWords, revealLines and
//               pxPerLine, so a crop can be traced to its cause.
//   phoneFit    crop <= 1 and hiddenBelow <= 2 and namedHidden = 0. --strict makes this the exit bar.
// --rotate WxH: reveal at --width x --height, then resize the viewport to WxH (turning the phone after
// the reveal, W-139 follow-up 2) and measure there instead.
// Tool stamp (W-783): the --out JSON carries `tool`: the commit of this file, HEAD, its blob and whether it
// matched HEAD (tools/lib/tool-stamp.mjs). The tool refuses to run (exit 3) when this file differs from HEAD,
// is untracked, or sits outside a git checkout, so a private copy cannot record a verdict. --allow-modified runs
// it anyway for development and stamps `clean: false`; such a result is not evidence for a lesson record.
// No dependencies beyond @playwright/test, which QA already uses.

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gitStamp } from "./lib/tool-stamp.mjs";

const args = process.argv.slice(2);
const SELF = fileURLToPath(import.meta.url);
const tool = { name: "reveal-fit", ...gitStamp([SELF], { from: SELF }) };
delete tool.root;
if (!tool.clean) {
  const why = tool.error ?? (tool.modified?.length ? `differs from HEAD (${tool.modified.join(", ")})` : "is not committed");
  if (!args.includes("--allow-modified")) {
    console.error(`reveal-fit: refusing to run: this copy of the tool ${why}. Commit it, run the committed tools/reveal-fit.mjs, or pass --allow-modified (the result is then stamped clean: false and is not evidence).`);
    process.exit(3);
  }
  console.error(`reveal-fit: --allow-modified: this copy ${why}; results are stamped clean: false`);
}
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
const strict = args.includes("--strict");
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
  const fitted = [];
  for (const svg of stage.querySelectorAll("svg[viewBox]")) {
    if (svg.dataset.revealFit) {
      // Shrunk on purpose by the card at the reveal (useRevealFit): expected, not a thumbnail.
      fitted.push(`${Math.round(svg.getBoundingClientRect().height)}/${svg.dataset.revealFit}`);
      continue;
    }
    if (svg.closest("svg[data-reveal-fit]")) continue;
    const vb = svg.viewBox.baseVal;
    const b = svg.getBoundingClientRect();
    if (!vb || !vb.width || b.width * b.height < (pic?.area ?? 0)) continue;
    const drawn = Math.min(b.width / vb.width, b.height / vb.height);
    const allowed = (stage.clientWidth - 20) / vb.width;
    pic = { area: b.width * b.height, ratio: drawn / allowed, h: Math.round(vb.height * drawn) };
  }
  const squeezed = (sr.height < 180 && stage.scrollHeight > stage.clientHeight + 1) || (pic !== null && pic.ratio < 0.75 && pic.h < 200);
  // Stage-top crop: how far the stage top sits above the visible card (viewport ∩ clipping ancestors).
  const crop = Math.max(0, sw.top - sr.top);
  const shown = (r) => r.height > 0 && Math.min(r.bottom, sw.bottom) - Math.max(r.top, sw.top) >= Math.min(r.height, 40) * 0.5;
  // What the stage is made of, by block: descend through single-child wrappers, then classify each block.
  let level = stage;
  while (level.children.length === 1 && !level.matches("svg, table")) level = level.children[0];
  const parts = { picture: 0, table: 0, controls: 0, text: 0 };
  for (const el of level.children) {
    const h = el.getBoundingClientRect().height;
    if (!h) continue;
    const big = [...(el.matches("svg[viewBox]") ? [el] : []), ...el.querySelectorAll("svg[viewBox]")].some((v) => v.dataset.revealFit || v.getBoundingClientRect().height >= 60);
    const tabular = "table, [role=table], [role=grid], [class*=table i]";
    const ctrl = el.matches('[data-qa="control"]') || el.querySelector('[data-qa="control"]');
    const kind = !big && (el.matches(tabular) || el.querySelector(tabular) || (!ctrl && el.querySelectorAll('[data-qa="readout"]').length >= 3)) ? "table"
      : big ? "picture"
      : ctrl ? "controls" : "text";
    parts[kind] += h;
  }
  for (const k of Object.keys(parts)) parts[k] = Math.round(parts[k]);
  const revealText = (reveal.innerText || reveal.textContent || "").replace(/\s+/g, " ").trim();
  const revealWords = revealText ? revealText.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;
  const lineTops = new Set([...range.getClientRects()].filter((r) => r.width > 2 && r.height > 6).map((r) => Math.round(r.top / 4)));
  const revealLines = lineTops.size;
  // Named elements: stage labels the reveal quotes, and whether each is on screen.
  const norm = (t) => t.toLowerCase().replace(/[\u2018\u2019\u201c\u201d"'`]/g, "").replace(/\s+/g, " ").trim();
  const words = (t) => ` ${t.replace(/[^\p{L}\p{N}.%°\u2212-]+/gu, " ")} `.replace(/[.-]+(?= )/g, "");
  const said = words(norm(revealText));
  const labels = new Map();
  const consider = (el, raw) => {
    const t = words(norm(raw)).trim();
    if (!t || t.length > 40) return;
    const letters = (t.match(/\p{L}/gu) || []).length;
    if (!(letters >= 4 || /^\d{2,}([.,]\d+)?%?$/.test(t))) return;
    if (/^(show|tap|drag|reset|next|back|play|step|start|stop|pause|again|your|the|with|from|this|that)$/.test(t)) return;
    if (!said.includes(` ${t} `)) return;
    const r = el.getBoundingClientRect();
    const prev = labels.get(t);
    labels.set(t, prev === true || shown(r));
  };
  for (const el of stage.querySelectorAll("text, tspan, [aria-label], th, td, label, span, strong, b, em, p, div, li, button, figcaption, h3, h4")) {
    if (el.getAttribute("aria-label")) consider(el, el.getAttribute("aria-label"));
    if (el.tagName === "text" || el.tagName === "tspan") {
      if (el.tagName === "text" && el.querySelector("tspan")) continue;
      consider(el, el.textContent || "");
    } else if (![...el.children].some((c) => (c.textContent || "").trim())) consider(el, el.textContent || "");
  }
  const named = [...labels].map(([text, visible]) => ({ text, visible }));
  const namedHidden = named.filter((n) => !n.visible).length;
  return {
    verdict,
    crop: Math.round(crop),
    phoneFit: crop <= 1 && hiddenBelow <= 2 && namedHidden === 0,
    named,
    namedHidden,
    revealWords,
    revealLines,
    pxPerLine: revealLines ? Math.round(((tr.bottom - tr.top) / revealLines) * 10) / 10 : null,
    parts,
    fitted,
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

// Load and render waits. REVEAL_FIT_TIMEOUT_MS raises both on a slow host (W-664), e.g. a shared
// dev server under load; the measuring itself is unchanged.
const LOAD_MS = Number(process.env.REVEAL_FIT_TIMEOUT_MS) || 30_000;
const RENDER_MS = Number(process.env.REVEAL_FIT_TIMEOUT_MS) || 15_000;

async function run(page, slug, settle = 120, deep = false, click = false) {
  const press = (loc, o) => (click ? loc.click(o) : loc.tap(o));
  await page.goto(`${base}/d/${slug}`, { waitUntil: "domcontentloaded", timeout: LOAD_MS });
  await page.locator('[data-testid="lesson"]').waitFor({ timeout: RENDER_MS });
  await press(page.locator('[data-testid="predict-option"]').first());
  await press(page.locator('[data-testid="commit-prediction"]'));
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
    } else await press(c, { timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(settle);
  }
  const btn = page.locator('[data-testid="reveal-button"]');
  if (!(await btn.isEnabled())) return { error: "reveal never unlocked" };
  await press(btn);
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
      // Some stages take mouse events only (a tap lands on an overlay): fall back to clicks and say so.
      if (r.error) r = { ...(await run(page, l.slug, 450, false, true)), input: "click" };
      if (r.error) r = { ...(await run(page, l.slug, 450, true, true)), input: "click" };
    } catch (e) {
      r = { error: String(e.message || e).split("\n")[0] };
    }
    results.push({ slug: l.slug, status: l.status, ...r });
    const tag = r.error ? "ERROR" : r.verdict + (r.thumb ? "+thumb" : "") + (r.crop > 1 ? "+crop" : "") + (r.namedHidden ? "+named" : "");
    if (r.error || r.verdict !== "fit" || r.thumb || !r.phoneFit)
      console.log(`${tag.padEnd(18)} ${l.slug}  ${r.error ?? `crop ${r.crop}px, hidden ${r.hiddenBelow}px, reach ${r.reach}px, stage ${r.stageH}px (visible ${r.stageVisible}), picture ${r.picH}px at ${r.picScale}, fitted ${r.fitted.join(",") || "-"}, ${r.revealWords} words${r.namedHidden ? `, off screen: ${r.named.filter((n) => !n.visible).map((n) => n.text).join(" | ")}` : ""}`}`);
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
  cropped: count((r) => r.crop > 1),
  namedHidden: count((r) => r.namedHidden > 0),
  phoneFit: count((r) => r.phoneFit),
};
summary.pass = count((r) => !r.error && r.verdict !== "clip" && !r.thumb);
const out = opt("out", null);
if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ summary, recorded: new Date().toISOString(), tool, results }, null, 2));
}
console.log(JSON.stringify({ ...summary, tool: { commit: tool.commit, head: tool.head, clean: tool.clean } }));
process.exit((strict ? summary.phoneFit : summary.pass) === results.length ? 0 : 1);
