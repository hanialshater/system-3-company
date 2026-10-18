// design-lead S4 probe: label placement (T3a) and crossing marks on the built tricolour-check
// (record ../2026-10-16-tricolour-check-s4.md). BASE=http://localhost:<port> node <this file>
// All distances are viewBox units (116 units = board width; 290 px board = 2.5 px per unit).
// Per knot: each label's distance to the nearest crossing centre (T3a: >= 12), the clear space between a label ring
// (r 5.2, stroke 1.5) and a crossing ring (r 9, stroke 0.8), the smallest label-to-label distance, and for each tick or
// cross glyph its distance to the nearest strand centre line, label centre and crossing centre, and whether it stays
// in the viewBox. Also the counter / seen / census text boxes against strands, labels and glyphs.
import { chromium } from "@playwright/test";
const base = (process.env.BASE || "http://localhost:3611") + "/d/tricolour-check";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto(base, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Yes", exact: true }).click();
await page.getByRole("button", { name: /Lock it in/ }).click();
await page.waitForTimeout(300);
const measure = () => page.evaluate(() => {
  const svg = document.querySelector(".stage svg[viewBox]");
  const circles = [...svg.querySelectorAll("circle")];
  const rings = circles.filter((c) => c.getAttribute("r") === "9").map((c) => [+c.getAttribute("cx"), +c.getAttribute("cy")]);
  const labels = circles.filter((c) => c.getAttribute("r") === "5.2").map((c) => [+c.getAttribute("cx"), +c.getAttribute("cy")]);
  const arcs = [...svg.querySelectorAll("path")].filter((p) => getComputedStyle(p).strokeWidth === "2px" && getComputedStyle(p).stroke !== "rgba(0, 0, 0, 0)");
  const pts = arcs.flatMap((p) => { const L = p.getTotalLength(); return Array.from({ length: 400 }, (_, i) => { const q = p.getPointAtLength((L * i) / 399); return [q.x, q.y]; }); });
  const glyphs = [...svg.querySelectorAll("path")].filter((p) => getComputedStyle(p).strokeWidth === "1.4px").map((p) => {
    const n = p.getAttribute("d").match(/-?\d+(\.\d+)?/g).map(Number); const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1);
    return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
  });
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const r1 = (v) => Math.round(v * 10) / 10;
  const label = labels.map((l) => ({ at: l.map(r1), toCrossing: r1(Math.min(...rings.map((c) => d(l, c)))),
    ringClear: r1(Math.min(...rings.map((c) => d(l, c))) - 9 - 5.2 - 0.4 - 0.75) }));
  let labelGap = 999; for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) labelGap = Math.min(labelGap, d(labels[i], labels[j]));
  let ringGap = 999; for (let i = 0; i < rings.length; i++) for (let j = i + 1; j < rings.length; j++) ringGap = Math.min(ringGap, d(rings[i], rings[j]));
  const glyph = glyphs.map((g) => ({ at: g.map(r1), toStrand: r1(Math.min(...pts.map((p) => d(p, g)))), toLabel: r1(Math.min(...labels.map((l) => d(l, g)))),
    toOwnCrossing: r1(Math.min(...rings.map((c) => d(c, g)))), inView: g[0] > -5 && g[0] < 105 && g[1] > -5 && g[1] < 105 }));
  const vb = svg.getBoundingClientRect(), k = 116 / vb.width;
  const texts = [...svg.querySelectorAll("text")].filter((t) => !/^[ABC]$/.test(t.textContent)).map((t) => {
    const b = t.getBBox(); const box = [b.x, b.y, b.x + b.width, b.y + b.height];
    const inBox = (p, m) => p[0] > box[0] - m && p[0] < box[2] + m && p[1] > box[1] - m && p[1] < box[3] + m;
    return { text: t.textContent, box: box.map(r1), strandHits: pts.filter((p) => inBox(p, 1)).length, labelHits: labels.filter((l) => inBox(l, 5.2)).length, glyphHits: glyphs.filter((g) => inBox(g, 3)).length };
  });
  return { rings: rings.length, ringGapMin: r1(ringGap), labelGapMin: r1(labelGap), label, glyph, texts, pxPerUnit: r1(1 / k) };
});
await page.getByRole("button", { name: "Arc 1, colour A" }).click(); await page.getByRole("button", { name: "Arc 2, colour A" }).click();
console.log("3_1", JSON.stringify(await measure(), null, 1));
await page.getByRole("button", { name: "Plain loop" }).click();
await page.getByRole("button", { name: "Figure-eight, 4₁" }).click();
await page.getByRole("button", { name: "Arc 1, colour A" }).click();
await page.getByRole("button", { name: "Check all" }).click();
console.log("4_1", JSON.stringify(await measure(), null, 1));
await browser.close();
