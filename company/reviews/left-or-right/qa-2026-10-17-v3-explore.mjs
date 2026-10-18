// Exploratory QA, left-or-right v3. node lor.mjs  (BASE env)
import { createRequire } from "module";
import fs from "fs";
const require = createRequire(process.cwd() + "/node_modules/");
const pw = require("@playwright/test");
const BASE = process.env.BASE;
const OUT = "artifacts/explore17/shots";
fs.mkdirSync(OUT, { recursive: true });
const browser = await pw.chromium.launch();
const res = [];
const log = (k, v) => { res.push([k, v]); console.log(k, "=>", typeof v === "string" ? v : JSON.stringify(v)); };

async function open(vp, { scheme = "light", reduced = false, touch = true } = {}) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, hasTouch: touch, isMobile: touch, colorScheme: scheme, reducedMotion: reduced ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(`${BASE}/d/left-or-right`, { waitUntil: "networkidle" });
  await page.getByTestId("predict-option").nth(1).click();
  await page.getByTestId("commit-prediction").click();
  await page.waitForTimeout(400);
  return { ctx, page, errors };
}
const ctl = (page, name) => page.locator(`[data-testid=stage] button[data-qa=control]`, { hasText: new RegExp(`^${name}$`) });
async function state(page) {
  return page.evaluate(() => {
    const rb = document.querySelector("[data-testid=reveal-button]");
    return {
      readout: document.querySelector("[data-testid=stage] [role=status]")?.textContent,
      seen: document.querySelector("[data-testid=seen-line]")?.textContent.trim(),
      label: document.querySelector("[role=img]")?.getAttribute("aria-label"),
      revealBtn: rb ? { text: rb.textContent, disabled: rb.disabled || rb.getAttribute("aria-disabled") } : null,
      pressed: [...document.querySelectorAll("[data-testid=stage] button[data-qa=control]")].map((b) => b.textContent + ":" + b.getAttribute("aria-pressed") + (b.disabled ? ":dis" : "")).join(" "),
      phase: document.querySelector("[data-testid=lesson]")?.getAttribute("data-phase"),
    };
  });
}
async function press(page, name, wait) { await ctl(page, name).click({ timeout: 3000 }).catch((e) => log("clickfail " + name, e.message.split("\n")[0])); await page.waitForTimeout(wait); }
async function openReveal(page) {
  const b = page.getByTestId("reveal-button");
  const st = await state(page);
  if (!st.revealBtn || st.revealBtn.text.trim() !== "Show me why") return null;
  await b.click();
  await page.waitForTimeout(500);
  return page.getByTestId("reveal").innerText();
}

// 1. orders, fresh mount each, settled between presses
const orders = {
  "T": ["Turn over"], "M": ["Mirror"],
  "T,M": ["Turn over", "Mirror"], "M,T": ["Mirror", "Turn over"],
  "M,T,M,T": ["Mirror", "Turn over", "Mirror", "Turn over"],
  "T,T": ["Turn over", "Turn over"], "M,M": ["Mirror", "Mirror"],
  "M,T,T": ["Mirror", "Turn over", "Turn over"], "M,T,M": ["Mirror", "Turn over", "Mirror"],
  "T,M,T": ["Turn over", "Mirror", "Turn over"], "T,M,M,T": ["Turn over","Mirror","Mirror","Turn over"],
  "M,M,T": ["Mirror","Mirror","Turn over"],
};
for (const vp of [{ width: 390, height: 844 }]) {
  for (const [k, seq] of Object.entries(orders)) {
    const { ctx, page, errors } = await open(vp);
    for (const n of seq) await press(page, n, 900);
    const st = await state(page);
    const txt = await openReveal(page);
    log(`order ${k}`, { st, opener: txt ? txt.split(":")[0] : null, errors });
    await ctx.close();
  }
}

// 2. fast presses (no settle wait) and mid-flip
const fast = {
  "fast M,T (50ms)": [["Mirror", 50], ["Turn over", 0]],
  "fast T,M (50ms)": [["Turn over", 50], ["Mirror", 0]],
  "fast T,T": [["Turn over", 30], ["Turn over", 0]],
  "fast M,M": [["Mirror", 30], ["Mirror", 0]],
  "fast T,M,T,M": [["Turn over", 40], ["Mirror", 40], ["Turn over", 40], ["Mirror", 0]],
  "T mid-flip(200ms) then M": [["Turn over", 200], ["Mirror", 0]],
  "M mid(150ms) then T": [["Mirror", 150], ["Turn over", 0]],
};
for (const [k, seq] of Object.entries(fast)) {
  const { ctx, page, errors } = await open({ width: 390, height: 844 });
  for (const [n, w] of seq) await press(page, n, w);
  const mid = await state(page);
  await page.waitForTimeout(1500);
  const st = await state(page);
  // consistency: readout vs label
  const txt = await openReveal(page);
  log(`${k}`, { mid: mid.readout + " | " + mid.pressed, st, opener: txt ? txt.split(":")[0] : null, errors });
  await ctx.close();
}

// 3. chip switch mid-flip
for (const [k, first, w] of [["T then chip 4_1 at 150ms", "Turn over", 150], ["M then chip at 150ms", "Mirror", 150], ["T then chip at 10ms", "Turn over", 10]]) {
  const { ctx, page, errors } = await open({ width: 390, height: 844 });
  await press(page, first, w);
  await press(page, "Figure-eight", 1500);
  const a = await state(page);
  await press(page, "Trefoil", 1500);
  const b = await state(page);
  await press(page, "Turn over", 900);
  const c = await state(page);
  const txt = await openReveal(page);
  log(k, { afterFig: a, backTrefoil: b, thenT: c, opener: txt ? txt.split(":")[0] : null, errors });
  await ctx.close();
}
// figure-eight only + reveal; fig eight turn then trefoil
{
  const { ctx, page, errors } = await open({ width: 390, height: 844 });
  await press(page, "Figure-eight", 900); await press(page, "Mirror", 900); await press(page, "Turn over", 900);
  const st = await state(page);
  log("fig-eight M,T only", { st, errors });
  await press(page, "Trefoil", 900); await press(page, "Mirror", 900);
  const st2 = await state(page);
  await press(page, "Turn over", 900);
  const st3 = await state(page);
  const txt = await openReveal(page);
  log("fig8 M,T then trefoil M,T", { st2: st2.seen, st3, reveal: txt, errors });
  await page.screenshot({ path: `${OUT}/fig8-then-tref-reveal.png` });
  await ctx.close();
}

// 4. viewports: reveal screenshots for M,T and T,M, geometry
for (const [name, vp] of Object.entries({ "390x844": { width: 390, height: 844 }, "360x740": { width: 360, height: 740 }, "360x640": { width: 360, height: 640 }, "1280x800": { width: 1280, height: 800 } })) {
  for (const [k, seq] of [["MT", ["Mirror", "Turn over"]], ["TM", ["Turn over", "Mirror"]], ["MTMT", ["Mirror","Turn over","Mirror","Turn over"]]]) {
    const { ctx, page, errors } = await open(vp, { touch: vp.width < 600 });
    for (const n of seq) await press(page, n, 900);
    await page.screenshot({ path: `${OUT}/${name}-${k}-explore.png` });
    const ex = await page.evaluate(() => {
      const vh = innerHeight;
      const btns = [...document.querySelectorAll("[data-testid=stage] button[data-qa=control]")].map((b) => { const r = b.getBoundingClientRect(); return { t: b.textContent, top: Math.round(r.top), bottom: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height) }; });
      return { vh, btns, hscroll: document.documentElement.scrollWidth > innerWidth };
    });
    const rbtn = await state(page);
    const txt = await openReveal(page);
    await page.screenshot({ path: `${OUT}/${name}-${k}-reveal.png` });
    const rv = await page.evaluate(() => {
      const r = document.querySelector("[data-testid=reveal]")?.getBoundingClientRect();
      const p = document.querySelector("[role=img]")?.getBoundingClientRect();
      const cb = document.querySelector(".card-body, [class*=cardBody]");
      const stage = document.querySelector("[data-testid=stage]")?.getBoundingClientRect();
      const sc = document.scrollingElement;
      return { vh: innerHeight, reveal: r && [Math.round(r.top), Math.round(r.bottom)], pic: p && [Math.round(p.top), Math.round(p.bottom)], stage: stage && [Math.round(stage.top), Math.round(stage.bottom)], hscroll: sc.scrollWidth > innerWidth };
    });
    log(`${name} ${k}`, { explore: ex, rbtn: rbtn.revealBtn, opener: txt ? txt.split(":")[0] : null, rv, errors });
    await ctx.close();
  }
}

// 5. double taps / dblclick on Turn over, Mirror, reveal button, chip
{
  const { ctx, page, errors } = await open({ width: 390, height: 844 });
  await ctl(page, "Turn over").dblclick(); await page.waitForTimeout(1200);
  const a = await state(page);
  await ctl(page, "Mirror").dblclick(); await page.waitForTimeout(1200);
  const b = await state(page);
  await ctl(page, "Figure-eight").dblclick().catch(() => {}); await page.waitForTimeout(1200);
  const c = await state(page);
  log("dblclick T, M, fig", { a, b, c, errors });
  await ctx.close();
}
// reveal button double click, then reset behaviours
{
  const { ctx, page, errors } = await open({ width: 390, height: 844 });
  await press(page, "Mirror", 900); await press(page, "Turn over", 900);
  await page.getByTestId("reveal-button").dblclick(); await page.waitForTimeout(700);
  const txt = await page.getByTestId("reveal").innerText();
  const full = await state(page);
  log("dblclick reveal button", { opener: txt.split(":")[0], full, errors });
  // reload mid lesson
  await page.reload({ waitUntil: "networkidle" });
  log("after reload", await page.evaluate(() => document.querySelector("[data-testid=lesson]")?.getAttribute("data-phase")));
  await ctx.close();
}

// 6. keyboard only
for (const [k, seq] of [["kbd M,T", ["Mirror", "Turn over"]], ["kbd T,M", ["Turn over", "Mirror"]]]) {
  const { ctx, page, errors } = await open({ width: 1280, height: 800 }, { touch: false });
  const names = seq;
  // focus order: tab until focused control text matches, press Enter (T) / Space (M)
  let used = 0;
  for (const n of names) {
    for (let i = 0; i < 25; i++) {
      const t = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (t === n) break;
      await page.keyboard.press("Tab");
    }
    const t = await page.evaluate(() => document.activeElement?.textContent?.trim());
    await page.keyboard.press(used++ % 2 ? "Space" : "Enter");
    await page.waitForTimeout(1000);
    log(`${k} focus after ${n}`, { was: t, now: await page.evaluate(() => document.activeElement?.textContent?.trim()) });
  }
  const st = await state(page);
  // tab to reveal button
  let got = null;
  for (let i = 0; i < 25; i++) {
    const t = await page.evaluate(() => document.activeElement?.getAttribute("data-testid"));
    if (t === "reveal-button") { got = true; break; }
    await page.keyboard.press("Tab");
  }
  await page.keyboard.press("Enter");
  await page.waitForTimeout(600);
  const txt = await page.getByTestId("reveal").innerText().catch(() => null);
  const foc = await page.evaluate(() => document.activeElement?.tagName + ":" + (document.activeElement?.textContent || "").slice(0, 30));
  log(k, { st, reachedRevealByTab: got, opener: txt ? txt.split(":")[0] : null, focusAfterReveal: foc, errors });
  await ctx.close();
}

// 7. reduced motion and dark
for (const [k, opt] of [["reduced", { reduced: true }], ["dark", { scheme: "dark" }], ["dark+reduced", { scheme: "dark", reduced: true }]]) {
  for (const [sk, seq] of [["MT", ["Mirror", "Turn over"]], ["TM", ["Turn over", "Mirror"]], ["MTMT", ["Mirror","Turn over","Mirror","Turn over"]]]) {
    const { ctx, page, errors } = await open({ width: 390, height: 844 }, opt);
    for (const n of seq) {
      await ctl(page, n).click().catch(() => {});
      await page.waitForTimeout(opt.reduced ? 200 : 900);
      if (opt.reduced && n === "Turn over") await page.screenshot({ path: `${OUT}/${k}-${sk}-turnedlabel.png` });
      await page.waitForTimeout(opt.reduced ? 1100 : 0);
    }
    const st = await state(page);
    const txt = await openReveal(page);
    await page.screenshot({ path: `${OUT}/${k}-${sk}-reveal.png` });
    log(`${k} ${sk}`, { st, opener: txt ? txt.split(":")[0] : null, errors });
    await ctx.close();
  }
}
// reduced: fast presses
{
  const { ctx, page, errors } = await open({ width: 390, height: 844 }, { reduced: true });
  await ctl(page, "Mirror").click(); await ctl(page, "Turn over").click(); await page.waitForTimeout(1500);
  const st = await state(page); const txt = await openReveal(page);
  log("reduced fast M,T", { st, opener: txt ? txt.split(":")[0] : null, errors });
  await ctx.close();
}
fs.writeFileSync("artifacts/explore17/lor-results.json", JSON.stringify(res, null, 1));
await browser.close();
