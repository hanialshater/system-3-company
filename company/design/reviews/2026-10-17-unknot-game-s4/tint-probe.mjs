// design-lead S4 probe: the tint at the figure-eight's crossings on the built unknot-game
// (record ../2026-10-17-unknot-game-s4.md). BASE=http://localhost:<port> node <this file>
// For every single switch of both knots, read the built DOM (viewBox units, 106 wide):
//   - per crossing: the visible gap = distance from each under-strand cut end to the over strand's centre line, minus
//     half the over strand's drawn stroke width (2, or 3 when it is the tinted strand). Reported in units and in px at
//     the explore board (320 at 390, 290 at 360) and the 270 px reveal board, and the floor-candidate boards.
//   - the clear space between the tinted strand and any other strand away from crossings (beyond 10 units of every
//     crossing centre): centre distance minus 1.5 minus 1.
//   - which crossings the tinted strand passes over, and whether the beak (crossing 1 of 4_1, x 96.4) is one of them.
// Screenshots at 390x844 and 360x740, light and dark, of each 4_1 switch go to artifacts/design-s4-unk/ (not committed).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const base = (process.env.BASE || "http://localhost:3622") + "/d/unknot-game";
const OUT = "artifacts/design-s4-unk";
mkdirSync(OUT, { recursive: true });
const BOARDS = [320, 290, 270, 250, 238];
const browser = await chromium.launch();
async function open(w, h, scheme) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 3, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: /Lock it in/ }).click();
  await page.waitForTimeout(300);
  return { ctx, page };
}
const measure = (page) => page.evaluate(() => {
  const svg = document.querySelector(".stage svg[role=img]");
  const board = svg.parentElement, bw = board.getBoundingClientRect().width;
  const vbw = svg.viewBox.baseVal.width;
  const hits = [...board.querySelectorAll("button")].map((b) => {
    const r = b.getBoundingClientRect(), br = board.getBoundingClientRect();
    return [((r.x + r.width / 2 - br.x) / bw) * vbw, ((r.y + r.height / 2 - br.y) / bw) * vbw];
  });
  const paths = [...svg.querySelectorAll("path")].map((p) => {
    const L = p.getTotalLength();
    const pts = Array.from({ length: 600 }, (_, i) => { const q = p.getPointAtLength((L * i) / 599); return [q.x, q.y]; });
    return { tint: p.classList.contains("knot-tint"), w: parseFloat(p.getAttribute("stroke-width")), pts, ends: [pts[0], pts[599]], len: L };
  });
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const r2 = (v) => Math.round(v * 100) / 100;
  const crossings = hits.map((c, i) => {
    const over = paths.filter((p) => p.pts.some((q) => d(q, c) < 0.8));
    const unders = paths.flatMap((p) => p.ends.filter((e) => d(e, c) < 10 && d(e, c) > 0.8).map((e) => ({ p, e })));
    const gaps = unders.map(({ p, e }) => {
      const o = over.filter((x) => x !== p);
      if (!o.length) return null;
      const best = Math.min(...o.map((x) => Math.min(...x.pts.map((q) => d(q, e))) - x.w / 2));
      return best;
    }).filter((g) => g !== null);
    return { i: i + 1, at: c.map((v) => r2(v)), overIsTint: over.some((p) => p.tint), visibleGapUnits: gaps.length ? r2(Math.min(...gaps)) : null };
  });
  const tint = paths.find((p) => p.tint);
  let tintClear = null;
  if (tint) {
    const away = (q) => hits.every((c) => d(q, c) > 10);
    let m = 999;
    for (const q of tint.pts) if (away(q)) for (const p of paths) if (p !== tint) for (const r of p.pts) if (away(r)) m = Math.min(m, d(q, r) - 1.5 - p.w / 2);
    tintClear = r2(m);
  }
  return { boardPx: Math.round(bw), pxPerUnit: r2(bw / vbw), crossings, tintLenUnits: tint ? r2(tint.len) : null, tintClearUnits: tintClear };
});
const { ctx, page } = await open(390, 844, "light");
for (const [chip, n] of [["Trefoil", 3], ["Figure-eight", 4]]) {
  if (chip === "Figure-eight") { await page.getByRole("button", { name: "Figure-eight", exact: true }).click(); await page.waitForTimeout(200); }
  for (let c = 1; c <= n; c++) {
    await page.getByRole("button", { name: `Crossing ${c}: switch`, exact: true }).click();
    await page.waitForTimeout(400);
    const m = await measure(page);
    const px = (u) => (u === null ? null : BOARDS.map((b) => `${b}:${((u * b) / 106).toFixed(1)}`).join(" "));
    console.log(`${chip} switch ${c}: tint len ${m.tintLenUnits} u, tint-to-strand clear ${m.tintClearUnits} u (${px(m.tintClearUnits)} px)`);
    for (const x of m.crossings) console.log(`   crossing ${x.i} at ${x.at}: over is tint ${x.overIsTint}, visible gap ${x.visibleGapUnits} u (${px(x.visibleGapUnits)} px)`);
    await page.getByRole("button", { name: `Crossing ${c}: switch`, exact: true }).click();
    await page.waitForTimeout(250);
  }
}
await ctx.close();
for (const [w, h] of [[390, 844], [360, 740]]) for (const scheme of ["light", "dark"]) {
  const { ctx, page } = await open(w, h, scheme);
  await page.getByRole("button", { name: "Figure-eight", exact: true }).click();
  for (let c = 1; c <= 4; c++) {
    await page.getByRole("button", { name: `Crossing ${c}: switch`, exact: true }).click();
    await page.waitForTimeout(400);
    await page.locator(".stage svg[role=img]").first().screenshot({ path: `${OUT}/f8-c${c}-${w}x${h}-${scheme}.png` });
  }
  await ctx.close();
}
await browser.close();
