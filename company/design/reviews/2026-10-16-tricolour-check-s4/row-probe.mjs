// design-lead S4 probe: the explore control row's widths at 390 and 360 wide (record ../2026-10-16-tricolour-check-s4.md).
// BASE=http://localhost:<port> node <this file> ['<css override>']
import { chromium } from "@playwright/test";
const base = (process.env.BASE || "http://localhost:3611") + "/d/tricolour-check";
const FIX = process.argv[2] || "";
const browser = await chromium.launch();
for (const [w, h] of [[390, 844], [360, 740], [360, 640]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: true, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  if (FIX) await page.addStyleTag({ content: FIX });
  const m = await page.evaluate(() => {
    const row = document.querySelector(".stage .row");
    const kids = [...row.children].map((c) => { const r = c.getBoundingClientRect(); const cs = getComputedStyle(c);
      return `${c.textContent}:${Math.round(r.width)}x${Math.round(r.height)} pad ${cs.paddingLeft} font ${cs.fontSize}`; });
    return { rowW: Math.round(row.getBoundingClientRect().width), rowH: Math.round(row.getBoundingClientRect().height), gap: getComputedStyle(row).columnGap, kids };
  });
  console.log(`${w}x${h}`, JSON.stringify(m));
  await ctx.close();
}
await browser.close();
