#!/usr/bin/env node
// SPIKE-001 measurements on Pixel 7 emulation (Playwright + /opt/pw-browsers/chromium).
// Needs the app on :3140 (NEXT_DIST_DIR=.next-spike npx next start -p 3140) and the CDN on :3141.
//
//   node spike/measure.mjs [--runs=5]
//
// 1. iframe insert → ready (lesson rendered, predict options on screen), cold and warm (HTTP cache),
//    default Chromium (sandboxed frame = its own process) and "mid phone" (4× CPU throttle, frames
//    in-process as on Android Chrome, which does not isolate sandboxed frames by process).
// 2. navigation → lesson interactive: /spike?only=<slug> vs today's /d/<slug>.
// 3. Memory (PSS of every Chromium process): / feed with 3 lesson cards mounted vs /spike with 3 frames.
// 4. Feed gestures: touch swipe that starts on a lesson, touch drag on a slider in a frame,
//    keyboard ArrowDown with focus inside a lesson.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = process.env.SPIKE_HOST ?? "http://localhost:3140";
const EXE = process.env.PW_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";
const RUNS = Number(process.argv.find((a) => a.startsWith("--runs="))?.split("=")[1] ?? 5);
const SLUGS = ["why-seven-wins", "throw-it-fast-enough", "bearing-spiral-to-the-pole"];
const phone = devices["Pixel 7"];
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? +(s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2).toFixed(1) : null;
};
const IN_PROCESS = ["--disable-features=IsolateSandboxedIframes,IsolateOrigins,site-per-process", "--disable-site-isolation-trials"];

async function frameTimings(browser, slug, throttle) {
  const cold = [];
  const warm = [];
  const navToReady = [];
  for (let i = 0; i < RUNS; i++) {
    const ctx = await browser.newContext({ ...phone });
    const page = await ctx.newPage();
    if (throttle) await (await ctx.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: throttle });
    await page.goto(`${HOST}/spike?only=${slug}&mode=single`);
    await page.locator(`iframe[data-slug="${slug}"][data-ready="1"]`).waitFor({ timeout: 30_000 });
    if (i === 0) {
      // Warm: remount the same frame RUNS times; bundles now come from the HTTP cache (immutable).
      for (let k = 0; k < RUNS; k++) {
        await page.evaluate((s) => window.__spike.remount(s), slug);
        await page.waitForFunction(([s, n]) => (window.__spike.ready[s] ?? []).length >= n, [slug, k + 2], { timeout: 30_000 });
      }
    }
    const s = await page.evaluate((x) => ({ ready: window.__spike.ready[x], inserts: window.__spike.inserts[x] }), slug);
    cold.push(s.ready[0].ms);
    navToReady.push(s.inserts[0] + s.ready[0].ms);
    if (i === 0) warm.push(...s.ready.slice(1).map((r) => r.ms));
    await ctx.close();
  }
  return { coldInsertToReadyMs: median(cold), warmInsertToReadyMs: median(warm), navToReadyMs: median(navToReady), samples: { cold: cold.map(Math.round), warm: warm.map(Math.round) } };
}

async function inAppBaseline(browser, slug, throttle) {
  const nav = [];
  for (let i = 0; i < RUNS; i++) {
    const ctx = await browser.newContext({ ...phone });
    const page = await ctx.newPage();
    if (throttle) await (await ctx.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: throttle });
    await page.goto(`${HOST}/d/${slug}`, { waitUntil: "commit" });
    await page.waitForFunction(() => document.querySelector('[data-testid="predict-option"]'), null, { polling: "raf", timeout: 30_000 });
    nav.push(await page.evaluate(() => performance.now()));
    await ctx.close();
  }
  return { navToReadyMs: median(nav), samples: nav.map(Math.round) };
}

function pss(rootPid) {
  // Sum PSS (kB) over the browser process and all descendants.
  const kids = new Map();
  for (const p of fs.readdirSync("/proc").filter((x) => /^\d+$/.test(x))) {
    try {
      const ppid = Number(fs.readFileSync(`/proc/${p}/stat`, "utf8").split(") ")[1].split(" ")[1]);
      kids.set(ppid, [...(kids.get(ppid) ?? []), Number(p)]);
    } catch {
      /* gone */
    }
  }
  let total = 0;
  let renderers = 0;
  const walk = (pid) => {
    try {
      const m = fs.readFileSync(`/proc/${pid}/smaps_rollup`, "utf8").match(/^Pss:\s+(\d+)/m);
      if (m) total += Number(m[1]);
      if (fs.readFileSync(`/proc/${pid}/cmdline`, "utf8").includes("--type=renderer")) renderers++;
    } catch {
      /* gone */
    }
    for (const k of kids.get(pid) ?? []) walk(k);
  };
  walk(rootPid);
  return { pssMB: +(total / 1024).toFixed(1), renderers };
}

async function memory(args) {
  const out = {};
  for (const [name, url, ready] of [
    ["blank", "about:blank", null],
    ["feed / (3 lesson cards mounted)", `${HOST}/`, "feed"],
    ["/spike (3 sandboxed frames mounted)", `${HOST}/spike`, "spike"],
  ]) {
    const server = await chromium.launchServer({ executablePath: EXE, args });
    const browser = await chromium.connect(server.wsEndpoint());
    const page = await (await browser.newContext({ ...phone })).newPage();
    await page.goto(url);
    if (ready === "feed") {
      // Card 2 is the second lesson: lessons 1-3 are mounted (active ±1).
      await page.locator('[data-testid="feed"]').evaluate((el) => el.scrollTo({ top: el.clientHeight * 2 }));
      await page.waitForFunction(() => document.querySelectorAll('[data-testid="lesson"]').length >= 3, null, { timeout: 30_000 });
    }
    if (ready === "spike") {
      await page.locator('[data-testid="feed"]').evaluate((el) => el.scrollTo({ top: el.clientHeight }));
      await page.waitForFunction(() => Object.keys(window.__spike?.ready ?? {}).length >= 3, null, { timeout: 30_000 });
    }
    await page.waitForTimeout(1500);
    out[name] = pss(server.process().pid);
    await browser.close();
    await server.close();
  }
  return out;
}

async function gestures(browser) {
  const res = {};
  const ctx = await browser.newContext({ ...phone });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  const feedTop = () => page.locator('[data-testid="feed"]').evaluate((el) => el.scrollTop);
  // A finger drag of 560 px upwards from (206, y): more than half a card, so scroll-snap goes on.
  // Pixel 7 viewport is 412x839. Each start point records what it hit and whether the feed moved.
  const swipeGrid = async (url, prep) => {
    const rows = [];
    await page.goto(url);
    await prep();
    for (const y of [150, 300, 500, 700, 760, 800]) {
      const hit = await page.evaluate(([x, yy]) => {
        const e = document.elementFromPoint(x, yy);
        return e ? `${e.tagName.toLowerCase()}${typeof e.className === "string" && e.className ? "." + e.className.split(" ")[0] : ""}` : null;
      }, [206, y]);
      const t0 = await feedTop();
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 206, y }] });
      for (let i = 1; i <= 14; i++) {
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 206, y: y - i * 40 }] });
        await page.waitForTimeout(16);
      }
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await page.waitForTimeout(1300);
      const t1 = await feedTop();
      rows.push({ y, hit, moved: t1 > t0 + 50, snapped: t1 % 839 === 0 });
      await page.locator('[data-testid="feed"]').evaluate((el, t) => el.scrollTo({ top: t }), t0);
      await page.waitForTimeout(800);
    }
    return rows;
  };
  // a) Today's feed, first lesson card (lessons are mounted active ±1).
  res.appSwipe = await swipeGrid(`${HOST}/`, async () => {
    await page.locator('[data-testid="feed"]').evaluate((el) => el.scrollTo({ top: el.clientHeight }));
    await page.locator('[data-testid="stage"]').first().waitFor();
    await page.waitForTimeout(1200);
  });
  // b) Spike feed, first card: the frame fills the card body.
  res.spikeSwipe = await swipeGrid(`${HOST}/spike`, async () => {
    await page.waitForFunction(() => Object.keys(window.__spike?.ready ?? {}).length >= 2, null, { timeout: 30_000 });
    await page.waitForTimeout(500);
  });
  let t0;

  // c) Keyboard: ArrowDown while focus is inside a frame (the feed listens on the host window).
  await page.locator('[data-testid="feed"]').evaluate((el) => el.scrollTo({ top: 0 }));
  await page.waitForTimeout(600);
  const f = page.frameLocator("iframe[data-slug]").first();
  await f.locator('[data-testid="predict-option"]').first().focus();
  t0 = await feedTop();
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(700);
  res.spikeArrowDownInFrameMovedFeed = (await feedTop()) > t0 + 50;
  await ctx.close();

  // d) Touch drag on a slider (throw-it-fast-enough): in today's app (control) and inside a frame.
  for (const [key, url, inFrame] of [
    ["appSliderTouchDrag", `${HOST}/d/throw-it-fast-enough`, false],
    ["spikeSliderTouchDrag", `${HOST}/spike?only=throw-it-fast-enough&mode=single`, true],
  ]) {
    const ctx2 = await browser.newContext({ ...phone });
    const p2 = await ctx2.newPage();
    const cdp2 = await ctx2.newCDPSession(p2);
    await p2.goto(url);
    if (inFrame) await p2.locator('iframe[data-ready="1"]').waitFor({ timeout: 30_000 });
    const root = inFrame ? p2.frameLocator('iframe[data-slug="throw-it-fast-enough"]') : p2;
    await root.locator('[data-testid="predict-option"]').last().click();
    await root.locator('[data-testid="commit-prediction"]').click();
    const slider = root.locator('input[type="range"]').first();
    await slider.scrollIntoViewIfNeeded();
    const [val, min, max] = await slider.evaluate((el) => [Number(el.value), Number(el.min), Number(el.max)]);
    const sb = await slider.boundingBox();
    const y = sb.y + sb.height / 2;
    const x0 = sb.x + 8 + ((val - min) / (max - min)) * (sb.width - 16); // on the thumb
    await cdp2.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x0, y }] });
    for (let i = 1; i <= 12; i++) await cdp2.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x0 + i * 8, y }] });
    await cdp2.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await p2.waitForTimeout(300);
    res[key] = { before: String(val), after: await slider.inputValue() };
    await ctx2.close();
  }
  return res;
}

const results = { at: new Date().toISOString(), runs: RUNS, device: "Pixel 7 (Playwright)", chromium: EXE };
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];
{
  const browser = await chromium.launch({ executablePath: EXE });
  results.chromiumVersion = browser.version();
  if (ONLY !== "gestures") {
    results.default = {};
    for (const slug of SLUGS) results.default[slug] = { frame: await frameTimings(browser, slug, 0), inApp: await inAppBaseline(browser, slug, 0) };
  }
  results.gestures = await gestures(browser);
  await browser.close();
}
if (ONLY === "gestures") {
  console.log(JSON.stringify(results.gestures, null, 2));
  process.exit(0);
}
{
  const browser = await chromium.launch({ executablePath: EXE, args: IN_PROCESS });
  results.midPhone4xInProcess = {};
  for (const slug of SLUGS) results.midPhone4xInProcess[slug] = { frame: await frameTimings(browser, slug, 4), inApp: await inAppBaseline(browser, slug, 4) };
  await browser.close();
}
results.memory = { default: await memory([]), inProcess: await memory(IN_PROCESS) };
console.log(JSON.stringify(results, null, 2));
const out = path.join(ROOT, "artifacts/scratch/platform-engineer/measure.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(results, null, 2));
