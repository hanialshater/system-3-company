// design-lead S4 probe: the flip and the Mirror dip on the built left-or-right, 4_1 (record ../2026-10-17-left-or-right-s4.md).
// BASE=http://localhost:<port> node <this file> ['<css override>']
// CAUTION: in (1) the lesson's timer fallbacks run in real time while the frames are paused, so the "marks" column and
// the marks in the flip screenshots after about 60 ms are not valid. realtime-probe.mjs measures the marks; use (1) for angles
// and widths only.
// (1) Flip, paused frames: press Turn over on 4_1, pause every running animation (CSS transitions are Web Animations),
//     and step currentTime 0..300 ms by 12.5 ms. Per frame: card angle (from the computed matrix), the drawn width of
//     the visible strands as a share of the rest width, the marks opacity, the readout text. Time spent in the
//     63-117 degree band where 4_1's closest strands touch (specs review L-section: 53 ms expected at 300 ms ease-in-out).
//     Screenshots of the picture every 25 ms go to artifacts/design-s4-lor/flip-<size>-<ms>.png (not committed).
// (2) Mirror dip, real time: press Mirror on 4_1 and log, every animation frame for 450 ms, the wrapper opacity and
//     transform, so the frame the transform changes on shows its opacity (L-2: it must be 0).
// (3) Badges at rest, all four states of both knots: badge edge to the nearest strand edge in units and px, read from the
//     DOM. On-screen strand geometry per state: front = front face; turned = back face content (already reflected);
//     mirrored = the front reflected x -> 100 - x; mirrored+turned = the back content reflected. Badge r 4.6, ring 0.5,
//     strand half-width 1. Crops of the beak (4_1 crossing 0) per state go to artifacts/design-s4-lor/beak-*.png.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const base = (process.env.BASE || "http://localhost:3622") + "/d/left-or-right";
const OUT = "artifacts/design-s4-lor";
mkdirSync(OUT, { recursive: true });
const FIX = process.argv[2] || "";
const browser = await chromium.launch();
async function open(w, h, scheme = "light", motion = "no-preference") {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 3, hasTouch: true, isMobile: true, colorScheme: scheme, reducedMotion: motion });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  if (FIX) await page.addStyleTag({ content: FIX });
  await page.getByRole("button", { name: "No, never", exact: true }).click();
  await page.getByRole("button", { name: /Lock it in/ }).click();
  await page.waitForTimeout(300);
  return { ctx, page };
}
const press = async (page, name, wait = 700) => { await page.getByRole("button", { name, exact: true }).click(); await page.waitForTimeout(wait); };
const tag = FIX ? "-fix" : "";
for (const [w, h] of [[390, 844], [360, 740]]) {
  const { ctx, page } = await open(w, h);
  await press(page, "Figure-eight");
  const restW = await page.evaluate(() => { const f = document.querySelector('[data-face="front"]'); return [...f.querySelectorAll("path")].reduce((a, p) => { const r = p.getBoundingClientRect(); return [Math.min(a[0], r.left), Math.max(a[1], r.right)]; }, [1e9, -1e9]); });
  await page.getByRole("button", { name: "Turn over", exact: true }).click();
  await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
  let band = 0, prev = null;
  const rows = [];
  for (let t = 0; t <= 300; t += 12.5) {
    const f = await page.evaluate((t) => {
      document.getAnimations().forEach((a) => { const d = a.effect.getTiming().duration; a.currentTime = Math.min(t, d); });
      const card = document.querySelector('[data-testid="card"]');
      const m = new DOMMatrix(getComputedStyle(card).transform);
      const ang = (Math.atan2(-m.m13, m.m11) * 180) / Math.PI;
      const vis = [...document.querySelectorAll('[data-face] path')].filter((p) => { const face = p.closest("[data-face]"); return face.dataset.face === (Math.abs(ang) < 90 ? "front" : "back"); });
      const box = vis.reduce((a, p) => { const r = p.getBoundingClientRect(); return [Math.min(a[0], r.left), Math.max(a[1], r.right), Math.min(a[2], r.top), Math.max(a[3], r.bottom)]; }, [1e9, -1e9, 1e9, -1e9]);
      return { ang: Math.round(ang * 10) / 10, visW: box[1] - box[0], visH: box[3] - box[2], marks: +getComputedStyle(document.querySelector('[data-testid="marks"]')).opacity, readout: document.querySelector('[role="status"]').textContent.trim() };
    }, t);
    if (f.ang >= 63 && f.ang <= 117) band += 12.5;
    rows.push(`${t}ms ${f.ang}deg width ${((100 * f.visW) / (restW[1] - restW[0])).toFixed(0)}% height ${f.visH.toFixed(0)}px marks ${f.marks.toFixed(2)} readout "${f.readout}"`);
    if (t % 25 === 0) await page.locator('[role="img"]').first().screenshot({ path: `${OUT}/flip-${w}x${h}-${String(t).padStart(3, "0")}${tag}.png` });
    prev = f;
  }
  console.log(`== ${w}x${h} 4_1 flip (paused frames)\n` + rows.join("\n") + `\n   time in 63-117 deg band: ~${band} ms`);
  await page.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
  await page.waitForTimeout(700);
  // (2) Mirror dip, real time.
  const log = await page.evaluate(() => new Promise((res) => {
    const wrap = document.querySelector('[data-testid="mirror-wrap"]'), out = [], t0 = performance.now();
    const tick = () => { const cs = getComputedStyle(wrap); out.push([Math.round(performance.now() - t0), +(+cs.opacity).toFixed(3), cs.transform]); if (performance.now() - t0 < 450) requestAnimationFrame(tick); else res(out); };
    [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Mirror").click();
    requestAnimationFrame(tick);
  }));
  let swaps = [];
  for (let i = 1; i < log.length; i++) if (log[i][2] !== log[i - 1][2]) swaps.push(`transform ${log[i - 1][2]} -> ${log[i][2]} at ${log[i][0]} ms, opacity ${log[i][1]} (previous frame ${log[i - 1][1]})`);
  const minOp = Math.min(...log.map((r) => r[1])), restAt = log.find((r, i) => i > 0 && r[1] === 1 && log[i - 1][1] < 1);
  console.log(`== ${w}x${h} Mirror dip: ${log.length} frames, min opacity ${minOp}, back to 1 at ${restAt ? restAt[0] : "?"} ms; ${swaps.join("; ") || "no transform change seen"}`);
  await ctx.close();
}
// (3) Badges at rest.
const { ctx, page } = await open(390, 844);
const badgeGap = () => page.evaluate(() => {
  const wrap = document.querySelector('[data-testid="mirror-wrap"]'), card = document.querySelector('[data-testid="card"]');
  const mirrored = getComputedStyle(wrap).transform !== "none", turned = /180/.test(card.style.transform);
  const face = document.querySelector(`[data-face="${turned ? "back" : "front"}"]`);
  const g = face.querySelector("g"), flipG = !!g; // back content is drawn through translate(100 0) scale(-1 1)
  const pts = [...face.querySelectorAll("path")].flatMap((p) => { const L = p.getTotalLength(); return Array.from({ length: 300 }, (_, i) => { const q = p.getPointAtLength((L * i) / 299); let x = flipG ? 100 - q.x : q.x; if (mirrored) x = 100 - x; return [x, q.y]; }); });
  const marks = document.querySelector('[data-testid="marks"]'), pxu = marks.getBoundingClientRect().width / 116;
  return { state: marks.dataset.state, badges: [...marks.querySelectorAll("circle")].map((c) => { const cx = +c.getAttribute("cx"), cy = +c.getAttribute("cy"), r = +c.getAttribute("r");
    const dmin = Math.min(...pts.map((p) => Math.hypot(p[0] - cx, p[1] - cy))); const gap = dmin - r - 0.25 - 1; return { at: [cx, cy].map((v) => Math.round(v * 10) / 10), gapUnits: Math.round(gap * 100) / 100, gapPx: Math.round(gap * pxu * 10) / 10 }; }), pxPerUnit: Math.round(pxu * 100) / 100 };
});
for (const chip of ["Trefoil", "Figure-eight"]) {
  if (chip === "Figure-eight") await press(page, "Figure-eight");
  for (const steps of [[], ["Turn over"], ["Mirror"], ["Turn over"]]) {
    for (const s of steps) await press(page, s, 900);
    const m = await badgeGap();
    console.log(`${chip} ${m.state} (${m.pxPerUnit} px/unit):`, m.badges.map((b) => `${b.at} gap ${b.gapUnits}u/${b.gapPx}px`).join(" | "));
    if (chip === "Figure-eight") {
      const box = await page.locator('[data-testid="marks"]').boundingBox();
      await page.screenshot({ path: `${OUT}/beak-${m.state}${tag}.png`, clip: { x: box.x + box.width * 0.55, y: box.y + box.height * 0.2, width: box.width * 0.45, height: box.height * 0.45 } });
    }
  }
}
await ctx.close();
await browser.close();
