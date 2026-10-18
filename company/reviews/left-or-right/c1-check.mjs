// Rendered-page checks for left-or-right (PE-C1, PE-C3, L-2, L-3, L-4, L-5, L-6; spec builder obligations 1, 4, 5).
// Not the QA contract and not a kit test: the builder's evidence, rerunnable by anyone with a served build.
// Usage (repo root, a build served by tools/serve.sh):
//   BASE=http://localhost:<port> ENGINE=chromium|webkit OUT=artifacts/c1-w1542 node company/reviews/left-or-right/c1-check.mjs
// What it asserts, on every rest state of both knots (front, turned, mirroredTurned, mirrored):
//  C1  the screen x of crossing 0 on the face on show (a probe circle inside each face's SVG, read with
//      getBoundingClientRect, so every CSS transform is composed by the browser) equals the spec table:
//      3_1 82.0 / 18.0, 4_1 96.4 / 3.6 view-box units; and in px, turned x - left = width - (front x - left).
//  C3  only the expected face paints: test-only CSS strokes the front face red and the back face blue, and
//      the picture's pixels are counted (front/mirrored: red only; turned/mirroredTurned: blue only).
//  plus the marks overlay state, the readout, aria-pressed. Then motion: the Mirror dip frame by frame
//  (transform changes only at opacity 0), marks hidden mid-flip, readout never blank, no clipping mid-turn
//  (card box inside the stage at paused 0-300 ms frames), and the timer fallback with transitionend blocked.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(path.resolve("node_modules") + "/");
const pw = require("@playwright/test");

const BASE = process.env.BASE || "http://localhost:3542";
const ENGINE = process.env.ENGINE || "chromium";
const OUT = process.env.OUT || "artifacts/c1-w1542";
fs.mkdirSync(OUT, { recursive: true });
const WANT = { "3_1": { front: 82.0, refl: 18.0 }, "4_1": { front: 96.4, refl: 3.6 } };
const results = { engine: ENGINE, base: BASE, at: new Date().toISOString(), rest: [], motion: {}, failures: [] };
const fail = (m) => {
  results.failures.push(m);
  console.log("FAIL " + m);
};
const ok = (c, m) => (c ? console.log("ok   " + m) : fail(m));

const browser = await pw[ENGINE].launch();
async function open({ colour = false, block = false, clock = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: ENGINE !== "firefox" });
  const page = await ctx.newPage();
  if (clock) await page.clock.install();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  if (block)
    await page.addInitScript(() => {
      // Never let a transitionend reach React (capture at window runs first): tests the timer fallbacks.
      window.addEventListener("transitionend", (e) => e.stopImmediatePropagation(), true);
    });
  await page.goto(`${BASE}/d/left-or-right`, { waitUntil: "networkidle" });
  if (colour)
    await page.addStyleTag({
      content: `[data-face=front] path{stroke:rgb(255,0,0)!important}[data-face=back] path{stroke:rgb(0,0,255)!important}`,
    });
  await page.getByTestId("predict-option").nth(1).click();
  await page.getByTestId("commit-prediction").click();
  await page.waitForTimeout(300);
  return { ctx, page, errors };
}
const btn = (page, name) => page.locator(`[data-testid=stage] button[data-qa=control]`, { hasText: name });

async function measure(page) {
  return page.evaluate(() => {
    const marks = document.querySelector("[data-testid=marks]");
    const r = marks.getBoundingClientRect();
    const toU = (px) => -8 + ((px - r.left) / r.width) * 116;
    const probe = (k) => {
      const b = document.querySelector(`[data-c1=${k}]`).getBoundingClientRect();
      const cx = b.left + b.width / 2;
      return { px: cx, u: toU(cx) };
    };
    const pressed = [...document.querySelectorAll("[data-testid=stage] button[data-qa=control]")].map((b) => [b.textContent, b.getAttribute("aria-pressed")]);
    return {
      left: r.left,
      width: r.width,
      front: probe("front"),
      back: probe("back"),
      marksState: marks.getAttribute("data-state"),
      marksOpacity: getComputedStyle(marks).opacity,
      readout: document.querySelector("[data-testid=stage] [role=status]").textContent,
      seen: document.querySelector("[data-testid=seen-line]").textContent,
      label: document.querySelector("[data-testid=stage] [role=img]").getAttribute("aria-label"),
      pressed,
    };
  });
}
// Count red and blue stroke pixels inside the picture (test-only colours).
async function paint(page) {
  const box = await page.locator("[data-testid=marks]").boundingBox();
  const png = await page.screenshot({ clip: { x: box.x - 4, y: box.y - 4, width: box.width + 8, height: box.height + 8 } });
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let red = 0, blue = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 180 && d[i + 1] < 90 && d[i + 2] < 90) red++;
      if (d[i + 2] > 180 && d[i] < 90 && d[i + 1] < 90) blue++;
    }
    return { red, blue };
  }, png.toString("base64"));
}

// ---------- rest states ----------
{
  const { ctx, page, errors } = await open({ colour: true });
  for (const chip of ["3_1", "4_1"]) {
    if (chip === "4_1") {
      await btn(page, "Figure-eight").click();
      await page.waitForTimeout(500);
    }
    const seq = [
      ["front", null],
      ["turned", "Turn over"],
      ["mirroredTurned", "Mirror"],
      ["mirrored", "Turn over"],
      ["front", "Mirror"],
    ];
    let frontPx = null;
    for (const [state, press] of seq) {
      if (press) {
        await btn(page, press).click();
        await page.waitForTimeout(700);
      }
      const m = await measure(page);
      const p = await paint(page);
      const face = state === "turned" || state === "mirroredTurned" ? "back" : "front";
      const reflect = state === "turned" || state === "mirrored";
      const want = reflect ? WANT[chip].refl : WANT[chip].front;
      const got = m[face];
      if (state === "front" && frontPx === null) frontPx = got.px - m.left;
      const row = { chip, state, face, wantU: want, gotU: +got.u.toFixed(2), gotPx: +(got.px - m.left).toFixed(1), widthPx: +m.width.toFixed(1), paint: p, marks: m.marksState, opacity: m.marksOpacity, readout: m.readout, seen: m.seen, label: m.label, pressed: m.pressed };
      results.rest.push(row);
      ok(Math.abs(got.u - want) < 0.5, `${ENGINE} ${chip} ${state}: crossing 0 on the ${face} face at x ${got.u.toFixed(2)} (want ${want})`);
      if (reflect) {
        const mirrorPx = m.width - frontPx;
        ok(Math.abs(got.px - m.left - mirrorPx) < 1.5, `${ENGINE} ${chip} ${state}: screen x ${(got.px - m.left).toFixed(1)} px = width ${m.width.toFixed(1)} - front ${frontPx.toFixed(1)} px (${mirrorPx.toFixed(1)})`);
      }
      const shows = face === "front" ? p.red > 50 && p.blue === 0 : p.blue > 50 && p.red === 0;
      ok(shows, `${ENGINE} ${chip} ${state}: only the ${face} face paints (red ${p.red}, blue ${p.blue})`);
      ok(m.marksState === state && m.marksOpacity === "1", `${ENGINE} ${chip} ${state}: marks overlay at rest for ${m.marksState}, opacity ${m.marksOpacity}`);
      const turnedPressed = m.pressed.find(([t]) => t === "Turn over")[1];
      ok(turnedPressed === String(state === "turned" || state === "mirroredTurned"), `${ENGINE} ${chip} ${state}: Turn over aria-pressed=${turnedPressed}`);
    }
  }
  ok(errors.length === 0, `${ENGINE} rest pass: no page or console errors (${errors.join(" | ")})`);
  await ctx.close();
}

// ---------- motion ----------
// Mirror dip, frame by frame: the wrapper's transform may change only while its opacity is (about) 0.
{
  const { ctx, page } = await open();
  for (const chip of ["3_1", "4_1"]) {
    if (chip === "4_1") {
      await btn(page, "Figure-eight").click();
      await page.waitForTimeout(500);
    }
    await page.evaluate(() => {
      const w = document.querySelector("[data-testid=mirror-wrap]");
      const rec = (window.__rec = []);
      const t0 = performance.now();
      const tick = () => {
        const cs = getComputedStyle(w);
        const mk = getComputedStyle(document.querySelector("[data-testid=marks]"));
        rec.push({ t: performance.now() - t0, o: +cs.opacity, tf: cs.transform, tp: cs.transitionProperty, marks: +mk.opacity, readout: document.querySelector("[data-testid=stage] [role=status]").textContent });
        if (performance.now() - t0 < 700) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await btn(page, "Mirror").click();
    await page.waitForTimeout(800);
    const rec = await page.evaluate(() => window.__rec);
    let changes = 0, bad = 0;
    for (let i = 1; i < rec.length; i++)
      if (rec[i].tf !== rec[i - 1].tf) {
        changes++;
        if (rec[i].o > 0.05 && rec[i - 1].o > 0.05) bad++;
      }
    const minO = Math.min(...rec.map((x) => x.o));
    const blank = rec.filter((x) => !x.readout.trim()).length;
    results.motion[`dip-${chip}`] = { frames: rec.length, transformChanges: changes, changesWhileVisible: bad, minOpacity: minO, transitionProperty: rec[0].tp, blankReadoutFrames: blank, settleMs: rec.find((x, i) => i > 0 && x.marks === 1 && rec[i - 1].marks < 1)?.t ?? null };
    ok(changes === 1 && bad === 0 && minO < 0.05, `${ENGINE} ${chip} Mirror dip: ${changes} transform change(s), ${bad} while visible, min opacity ${minO.toFixed(3)}, transition-property '${rec[0].tp}'`);
    ok(rec[0].tp === "opacity", `${ENGINE} ${chip} Mirror wrapper transitions opacity only`);
    ok(blank === 0, `${ENGINE} ${chip} Mirror: readout never blank (${rec.length} frames)`);
    await btn(page, "Mirror").click(); // back to front
    await page.waitForTimeout(600);
  }
  await ctx.close();
}

// Flip, real time: per animation frame, the card's angle, the marks' opacity and the readout (L-3, L-4).
{
  const { ctx, page } = await open();
  for (const chip of ["3_1", "4_1"]) {
    if (chip === "4_1") {
      await btn(page, "Figure-eight").click();
      await page.waitForTimeout(500);
    }
    const before = await measure(page);
    await page.evaluate(() => {
      const card = document.querySelector("[data-testid=card]");
      const mk = document.querySelector("[data-testid=marks]");
      const rd = document.querySelector("[data-testid=stage] [role=status]");
      const rec = (window.__flip = []);
      const t0 = performance.now();
      window.__clickT = null;
      document.addEventListener("click", () => (window.__clickT = performance.now() - t0), { capture: true, once: true });
      const tick = () => {
        const m = new DOMMatrix(getComputedStyle(card).transform);
        // rotateY(a): m11 = cos a, |m13| = sin a for 0..180 degrees
        const a = (Math.atan2(Math.abs(m.m13), m.m11) * 180) / Math.PI;
        rec.push({ t: performance.now() - t0, a, marks: +getComputedStyle(mk).opacity, readout: rd.textContent });
        if (performance.now() - t0 < 900) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await btn(page, "Turn over").click();
    await page.waitForTimeout(1000);
    const { rec, c } = await page.evaluate(() => ({ rec: window.__flip, c: window.__clickT }));
    const after = rec.filter((x) => x.t >= c);
    const band = after.filter((x) => x.a > 45 && x.a < 179.5);
    const hiddenBy = after.find((x) => x.marks < 0.05);
    const restAt = after.find((x) => x.a >= 179.5);
    const reshown = after.find((x) => x.a >= 179.5 && x.marks > 0.05);
    const early = after.filter((x) => x.a < 179.5 && x.marks > 0.05 && x.t - c > 117);
    results.motion[`flip-${chip}`] = {
      frames: after.length,
      marksHiddenAfterMs: hiddenBy ? +(hiddenBy.t - c).toFixed(0) : null,
      cardAtRestAfterMs: restAt ? +(restAt.t - c).toFixed(0) : null,
      marksBackFromMs: reshown ? +(reshown.t - c).toFixed(0) : null,
      bandFrames: band.length,
      bandMaxMarks: Math.max(...band.map((x) => x.marks)),
      readouts: [...new Set(after.map((x) => x.readout))],
    };
    ok(hiddenBy && hiddenBy.t - c <= 117, `${ENGINE} ${chip} flip: marks hidden ${hiddenBy ? (hiddenBy.t - c).toFixed(0) : "-"} ms after the press (<= 100 ms + 1 frame)`);
    ok(band.length > 0 && band.every((x) => x.marks < 0.05) && early.length === 0, `${ENGINE} ${chip} flip: marks hidden on all ${band.length} frames between 45 and 179.5 degrees, and not shown before rest`);
    ok(after.every((x) => x.readout === before.readout), `${ENGINE} ${chip} flip: readout '${before.readout}' kept on every frame`);
    await btn(page, "Turn over").click();
    await page.waitForTimeout(700);
  }
  await ctx.close();
}

// Flip, paused frames: JS timers frozen with Playwright's clock, the card's CSS transition paused at fixed
// times (Web Animations API), the marks' fade set to the same time. Checks that nothing leaves the stage
// mid-turn (L-5) and saves the frames for the design lead (S4).
{
  const { ctx, page } = await open({ clock: true });
  let T = Date.now() + 5000;
  for (const chip of ["3_1", "4_1"]) {
    if (chip === "4_1") {
      await btn(page, "Figure-eight").click();
      await page.waitForTimeout(500);
    }
    const frames = [];
    for (const ms of [50, 100, 125, 150, 175, 200, 250]) {
      T += 5000;
      await page.clock.pauseAt(T);
      const f = await page.evaluate(async (ms) => {
        const b = [...document.querySelectorAll("[data-testid=stage] button[data-qa=control]")].find((x) => x.textContent === "Turn over");
        b.click();
        await new Promise((r) => queueMicrotask(r));
        const card = document.querySelector("[data-testid=card]");
        const mk = document.querySelector("[data-testid=marks]");
        const an = card.getAnimations().find((a) => a.transitionProperty === "transform");
        if (!an) return { missing: true };
        an.pause();
        an.currentTime = ms;
        mk.getAnimations().forEach((a) => {
          a.pause();
          a.currentTime = Math.min(ms, 100);
        });
        const stage = document.querySelector("[data-testid=stage]").getBoundingClientRect();
        const faces = [...card.querySelectorAll("svg")].map((s) => s.getBoundingClientRect());
        const top = Math.min(...faces.map((r) => r.top)), bottom = Math.max(...faces.map((r) => r.bottom));
        const left = Math.min(...faces.map((r) => r.left)), right = Math.max(...faces.map((r) => r.right));
        const m = new DOMMatrix(getComputedStyle(card).transform);
        return {
          ms,
          angle: +((Math.atan2(Math.abs(m.m13), m.m11) * 180) / Math.PI).toFixed(1),
          marks: +getComputedStyle(mk).opacity,
          readout: document.querySelector("[data-testid=stage] [role=status]").textContent,
          inside: top >= stage.top - 0.5 && bottom <= stage.bottom + 0.5 && left >= stage.left - 0.5 && right <= stage.right + 0.5,
          faceBox: [left, top, right, bottom].map((v) => +v.toFixed(1)),
          stageBox: [stage.left, stage.top, stage.right, stage.bottom].map((v) => +v.toFixed(1)),
        };
      }, ms);
      if (f.missing) {
        fail(`${ENGINE} ${chip} flip: no CSS transition found on the card`);
        break;
      }
      await page.screenshot({ path: path.join(OUT, `${ENGINE}-${chip}-flip-${String(ms).padStart(3, "0")}ms.png`) });
      frames.push(f);
      // Back to the front, at rest, before the next frame.
      await page.evaluate(() => document.querySelectorAll("[data-testid=stage] *").forEach((e) => e.getAnimations().forEach((a) => a.finish())));
      await page.clock.resume();
      await page.waitForTimeout(500);
      await btn(page, "Turn over").click();
      await page.waitForTimeout(700);
    }
    results.motion[`flipFrames-${chip}`] = frames;
    ok(frames.length === 7 && frames.every((f) => f.inside), `${ENGINE} ${chip} paused flip frames: the turning faces stay inside the stage (${frames.map((f) => f.angle + "deg").join(", ")})`);
  }
  await ctx.close();
}

// Timer fallback: transitionend never reaches the lesson. Marks must be back by duration + 50 + 150 ms.
{
  const { ctx, page } = await open({ block: true });
  for (const [name, limit] of [
    ["Turn over", 300 + 50 + 150],
    ["Mirror", 200 + 50 + 150],
  ]) {
    await page.evaluate(() => {
      const mk = document.querySelector("[data-testid=marks]");
      const rec = (window.__fb = []);
      const t0 = performance.now();
      window.__clickT = null;
      document.addEventListener("click", () => (window.__clickT = performance.now() - t0), { capture: true, once: true });
      const tick = () => {
        rec.push({ t: performance.now() - t0, o: +getComputedStyle(mk).opacity });
        if (performance.now() - t0 < 1200) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await btn(page, name).click();
    await page.waitForTimeout(1300);
    const { rec, c } = await page.evaluate(() => ({ rec: window.__fb, c: window.__clickT }));
    const hid = rec.findIndex((x) => x.t > c && x.o < 0.05);
    const back = rec.findIndex((x, i) => i > hid && hid >= 0 && x.o >= 0.999);
    const t = back >= 0 ? rec[back].t - c : Infinity;
    const th = hid >= 0 ? rec[hid].t - c : null;
    results.motion[`fallback-${name}`] = { hiddenAfterMs: th === null ? null : +th.toFixed(0), backAfterMs: +t.toFixed(0), limit };
    // Times are from the click to the first animation frame that shows the state; allow one frame (17 ms) of slack.
    ok(hid >= 0 && th <= 100 + 17 && t <= limit + 17, `${ENGINE} ${name} with transitionend blocked: marks hidden ${th === null ? "-" : th.toFixed(0)} ms after the press, fully back at ${t.toFixed(0)} ms (limit ${limit})`);
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, `c1-${ENGINE}.json`), JSON.stringify(results, null, 2));
console.log(`\n${ENGINE}: ${results.failures.length} failure(s); record ${path.join(OUT, `c1-${ENGINE}.json`)}`);
process.exit(results.failures.length ? 1 : 0);
