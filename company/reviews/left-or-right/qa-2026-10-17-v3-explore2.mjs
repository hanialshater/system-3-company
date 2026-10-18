import { createRequire } from "module";
const require = createRequire(process.cwd() + "/node_modules/");
const pw = require("@playwright/test");
const BASE = process.env.BASE;
const browser = await pw.chromium.launch();
async function open(vp = { width: 390, height: 844 }) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(`${BASE}/d/left-or-right`, { waitUntil: "networkidle" });
  await page.getByTestId("predict-option").nth(1).click();
  await page.getByTestId("commit-prediction").click();
  await page.waitForTimeout(400);
  return { ctx, page, errors };
}
const ctl = (p, n) => p.locator(`[data-testid=stage] button[data-qa=control]`, { hasText: new RegExp(`^${n}$`) });
const rb = async (p) => p.evaluate(() => { const b = document.querySelector("[data-testid=reveal-button]"); return b ? b.textContent + (b.disabled ? " (disabled)" : "") : null; });
const info = (p) => p.evaluate(() => ({ label: document.querySelector("[role=img]").getAttribute("aria-label"), seen: document.querySelector("[data-testid=seen-line]").textContent.trim(), ctl: [...document.querySelectorAll("[data-testid=stage] button[data-qa=control]")].map((b) => b.textContent + ":" + b.getAttribute("aria-pressed") + (b.disabled ? ":dis" : "")) }));

for (const [k, pre] of [["M settled, then T: reveal button samples every 100ms", ["Mirror"]], ["T settled, then M", ["Turn over"]]]) {
  const { ctx, page } = await open();
  for (const n of pre) { await ctl(page, n).click(); await page.waitForTimeout(900); }
  await ctl(page, pre[0] === "Mirror" ? "Turn over" : "Mirror").click();
  const samples = [];
  for (let i = 0; i < 8; i++) { samples.push(await rb(page)); await page.waitForTimeout(100); }
  console.log(k, JSON.stringify(samples));
  await ctx.close();
}
{
  const { ctx, page } = await open();
  await ctl(page, "Mirror").click(); await page.waitForTimeout(900);
  await ctl(page, "Turn over").click(); await page.waitForTimeout(900);
  await ctl(page, "Mirror").click(); await page.waitForTimeout(60);
  const s = await rb(page);
  await page.getByTestId("reveal-button").click({ timeout: 2000 }).catch((e) => console.log("click fail", e.message.split("\n")[0]));
  await page.waitForTimeout(800);
  const txt = await page.getByTestId("reveal").innerText().catch(() => null);
  console.log("reveal pressed mid-flip (M,T settled, Mirror, reveal at 60ms)", s, txt && txt.split(":")[0]);
  console.log(JSON.stringify(await info(page)));
  await page.waitForTimeout(1200);
  console.log(JSON.stringify(await info(page)));
  await ctx.close();
}
{
  const { ctx, page, errors } = await open();
  await ctl(page, "Mirror").click(); await page.waitForTimeout(900);
  await ctl(page, "Turn over").click(); await page.waitForTimeout(900);
  await page.getByTestId("reveal-button").click(); await page.waitForTimeout(600);
  const before = await page.getByTestId("reveal").innerText();
  const chips = await page.locator("[data-testid=stage] button[data-qa=control]").evaluateAll((bs) => bs.map((b) => b.textContent + ":" + b.disabled));
  await ctl(page, "Figure-eight").click({ timeout: 2000 }).catch((e) => console.log("chip click fail", e.message.split("\n")[0]));
  await page.waitForTimeout(1000);
  const after = await page.getByTestId("reveal").innerText();
  console.log("chip at reveal", JSON.stringify({ chips, sameText: before === after, info: await info(page), errors }));
  await page.screenshot({ path: "artifacts/explore17/shots/chip-at-reveal.png" });
  await ctx.close();
}
await browser.close();
