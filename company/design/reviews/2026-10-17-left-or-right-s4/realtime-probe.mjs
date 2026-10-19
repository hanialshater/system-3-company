// design-lead S4 probe: the 4_1 flip in real time on the built left-or-right (record ../2026-10-17-left-or-right-s4.md).
// BASE=http://localhost:<port> node <this file>
// motion-probe.mjs pauses the CSS transitions to step through angles, but the lesson's timer fallbacks keep running in real
// time, so its marks readings are not valid. This probe logs every animation frame for 700 ms after a real press of Turn
// over (and of Turn over again, back to the front): card angle, marks opacity, readout. It reports the frames that fall
// in the 63-117 degree band and the largest marks opacity seen while the card is between 10 and 170 degrees.
import { chromium } from "@playwright/test";
const base = (process.env.BASE || "http://localhost:3622") + "/d/left-or-right";
const browser = await chromium.launch();
for (const [w, h] of [[390, 844], [360, 740]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "No, never", exact: true }).click();
  await page.getByRole("button", { name: /Lock it in/ }).click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Figure-eight", exact: true }).click();
  await page.waitForTimeout(600);
  for (const run of ["turn", "turn back"]) {
    const log = await page.evaluate(() => new Promise((res) => {
      const card = document.querySelector('[data-testid="card"]'), marks = document.querySelector('[data-testid="marks"]'), out = [], t0 = performance.now();
      const tick = () => {
        const m = new DOMMatrix(getComputedStyle(card).transform);
        out.push({ t: Math.round(performance.now() - t0), ang: Math.abs(Math.round((Math.atan2(-m.m13, m.m11) * 180) / Math.PI)), marks: +(+getComputedStyle(marks).opacity).toFixed(2), readout: document.querySelector('[role="status"]').textContent.trim() });
        if (performance.now() - t0 < 700) requestAnimationFrame(tick); else res(out);
      };
      [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Turn over").click();
      requestAnimationFrame(tick);
    }));
    const band = log.filter((f) => f.ang >= 63 && f.ang <= 117);
    const mid = log.filter((f) => f.ang > 10 && f.ang < 170);
    const restAt = log.find((f) => f.ang === (run === "turn" ? 180 : 0));
    const back = log.find((f, i) => i > 0 && f.marks === 1 && log[i - 1].marks < 1 && f.t > 150);
    console.log(`${w}x${h} ${run}: ${log.length} frames; band 63-117 deg: ${band.length} frames from ${band[0]?.t} to ${band.at(-1)?.t} ms; max marks opacity while 10-170 deg: ${Math.max(...mid.map((f) => f.marks))} (in the band: ${Math.max(...band.map((f) => f.marks))}; at 45-135 deg: ${Math.max(...log.filter((f) => f.ang >= 45 && f.ang <= 135).map((f) => f.marks))}); card at rest ${restAt?.t} ms; marks back to 1 at ${back?.t} ms; readouts seen: ${[...new Set(log.map((f) => f.readout))].join(" / ")}`);
    await page.waitForTimeout(400);
  }
  await ctx.close();
}
await browser.close();
