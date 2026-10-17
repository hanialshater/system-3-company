// design-lead S4 probe: widths of left-or-right's four controls and the room for one merged row, at the reveal
// (record ../2026-10-17-left-or-right-s4.md). BASE=http://localhost:<port> node <this file>
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
  for (const n of ["Turn over", "Mirror", "Figure-eight"]) { await page.getByRole("button", { name: n, exact: true }).click(); await page.waitForTimeout(600); }
  await page.getByRole("button", { name: /Show me why/ }).click();
  await page.waitForTimeout(900);
  const m = await page.evaluate(() => {
    const stage = document.querySelector(".stage"), rows = [...stage.querySelectorAll(".row")];
    const btn = rows.flatMap((r) => [...r.querySelectorAll("button")]).map((b) => ({ t: b.textContent, w: Math.round(b.getBoundingClientRect().width), padL: getComputedStyle(b).paddingLeft }));
    const gap = parseFloat(getComputedStyle(rows[0]).columnGap || getComputedStyle(rows[0]).gap) || 0;
    return { btn, gap, rowAvail: Math.round(rows[0].getBoundingClientRect().width), rowH: rows.map((r) => Math.round(r.getBoundingClientRect().height)) };
  });
  const need = m.btn.reduce((a, b) => a + b.w, 0) + 3 * m.gap;
  console.log(`${w}x${h}`, JSON.stringify(m), "one-row need", need);
  await ctx.close();
}
await browser.close();
