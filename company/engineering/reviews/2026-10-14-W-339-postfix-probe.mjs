// W-237 review probe (principal-engineer, 2026-10-14). Run from the repo root against a PRE-1a879c6 build:
//   node company/engineering/reviews/2026-10-14-W-237-probe.mjs http://localhost:<port> <jobs> [slug ...] > out.json
// It follows the QA-contract path to the reveal, then applies a copy of 1a879c6's picture fit in the page
// and reports per shrunk svg: natural/fitted height, k, px of overflow it freed, position, preserveAspectRatio,
// smallest <text> in rendered px before (text0) and after (text1), and pointer-like elements inside (hit).
// Overflow is read from scrollHeight - clientHeight, so the old build's scroll does not affect it.
import { chromium } from "@playwright/test";
import fs from "node:fs"; import path from "node:path";
const base = process.argv[2]; const jobs = Number(process.argv[3] || 3); const named = process.argv.slice(4);
const root = "/home/user/system-3-company/src/demos"; let lessons = [];
for (const d of fs.readdirSync(root)) { const p = path.join(root, d); if (!fs.statSync(p).isDirectory()) continue;
  for (const s of fs.readdirSync(p)) if (fs.existsSync(path.join(p, s, "meta.json"))) lessons.push(s); }
if (named.length) lessons = lessons.filter((l) => named.includes(l));
function probe() {
  // Post-fix build: read what the app's own useRevealFit did (no in-page copy of the fit).
  const body = document.querySelector(".card-body") || document.querySelector('[data-testid="lesson"]').parentElement;
  const stage = document.querySelector('[data-testid="stage"]');
  const minText = (svg, hidden) => { let m = Infinity; for (const t of svg.querySelectorAll("text")) { if (!t.textContent.trim()) continue;
      if (hidden !== undefined && !!t.closest('[aria-hidden="true"]') !== hidden) continue;
      const fs_ = parseFloat(getComputedStyle(t).fontSize); const ctm = t.getScreenCTM(); if (!ctm) continue;
      const px = fs_ * Math.sqrt(Math.abs(ctm.a * ctm.d - ctm.b * ctm.c)); if (px > 0) m = Math.min(m, px); } return m === Infinity ? null : +m.toFixed(1); };
  const overAfter = body.scrollHeight - body.clientHeight;
  const shrunk = [...stage.querySelectorAll("svg[data-reveal-fit]")];
  const out = shrunk.map((svg) => { const h = Number(svg.dataset.revealFit); const to = svg.getBoundingClientRect().height;
    const hit = [...svg.querySelectorAll("*")].filter((e) => getComputedStyle(e).cursor === "pointer" || e.getAttribute("tabindex") !== null || e.getAttribute("role") === "button").length;
    return { h, to: Math.round(to), k: +(to / h).toFixed(2), pos: getComputedStyle(svg).position, par: svg.getAttribute("preserveAspectRatio"),
      text1: minText(svg), meaning1: minText(svg, false), decor1: minText(svg, true), hit }; });
  // undo the app's fit to read natural sizes (for the before column), then restore it
  const saved = shrunk.map((s) => s.getAttribute("style")); shrunk.forEach((s) => { s.style.removeProperty("max-height"); s.style.removeProperty("min-height"); });
  const overBefore = body.scrollHeight - body.clientHeight;
  shrunk.forEach((s, i) => { out[i].text0 = minText(s); out[i].meaning0 = minText(s, false); s.setAttribute("style", saved[i] ?? ""); });
  return { overBefore, overAfter, out };
}
async function run(page, slug) {
  await page.goto(`${base}/d/${slug}`, { waitUntil: "domcontentloaded" });
  await page.locator('[data-testid="lesson"]').waitFor({ timeout: 15000 });
  await page.locator('[data-testid="predict-option"]').first().click();
  await page.locator('[data-testid="commit-prediction"]').click();
  const controls = page.locator('[data-testid="stage"] [data-qa="control"]');
  const total = Math.min(await controls.count(), 16);
  for (let i = 0; i < total; i++) { const c = controls.nth(i);
    if ((await c.count()) === 0 || !(await c.isVisible()) || (await c.isDisabled())) continue;
    const type = await c.evaluate((el) => (el.tagName === "INPUT" ? el.type : el.tagName));
    if (type === "range") { await c.focus(); for (let k = 0; k < 2; k++) await page.keyboard.press("ArrowRight"); }
    else await c.click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(100); }
  const btn = page.locator('[data-testid="reveal-button"]'); if (!(await btn.isEnabled())) return { error: "locked" };
  await btn.click(); await page.locator('[data-testid="reveal"]').waitFor(); await page.waitForTimeout(900);
  return page.evaluate(probe);
}
const browser = await chromium.launch(); const res = {}; let i = 0;
await Promise.all(Array.from({ length: jobs }, async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  while (i < lessons.length) { const s = lessons[i++]; try { res[s] = await run(page, s); } catch (e) { res[s] = { error: String(e).slice(0, 80) }; } }
  await ctx.close(); }));
await browser.close(); console.log(JSON.stringify(res));
