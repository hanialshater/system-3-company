// Integration browser audit, not independent learner or fact-check evidence.
// node tools/history-maps/audit.mjs http://127.0.0.1:<port>
import fs from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import catalog from "./catalog.json" with { type: "json" };

const base = process.argv[2];
if (!base || !["127.0.0.1","localhost"].includes(new URL(base).hostname)) throw new Error("Supply the local review server URL");
const out = "artifacts/history-maps-100";
fs.mkdirSync(out,{ recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || undefined });
const context = await browser.newContext({ viewport: { width:390,height:844 }, colorScheme:"light" });
const page = await context.newPage();
const errors = [];
page.on("pageerror",(e) => errors.push(String(e)));
const wordCount = async () => page.getByTestId("stage").evaluate((stage) => {
  const walker = document.createTreeWalker(stage,NodeFilter.SHOW_TEXT);
  const text = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement?.closest("title,script,style")) continue;
    const range = document.createRange(); range.selectNodeContents(node);
    const box = range.getBoundingClientRect();
    if (box.width && box.height) text.push(node.textContent);
  }
  return text.join(" ").split(/\s+/).filter((word) => /\p{L}/u.test(word)).length;
});
const results = [];
try {
  await page.goto(`${base}/history-maps`);
  assert.equal(await page.locator('a[href^="/d/map-"]').count(),100);
  await page.screenshot({ path:`${out}/atlas-phone.png` });
  for (const [index,c] of catalog.entries()) {
    await page.goto(`${base}/d/${c.slug}`);
    await page.getByTestId("lesson").waitFor();
    const counts = [await wordCount()];
    await page.getByTestId("predict-option").first().click();
    await page.getByTestId("commit-prediction").click();
    const controls = page.getByTestId("stage").locator('[data-qa="control"]');
    for (let i=0;i<3;i++) { await controls.nth(i).click(); counts.push(await wordCount()); }
    await page.getByTestId("reveal-button").click();
    await page.getByTestId("reveal").waitFor();
    assert.ok(await page.getByTestId("reveal").innerText());
    assert.ok(Math.max(...counts) <= 25,`${c.slug}: ${counts}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false);
    const smallestSvgFont = await page.getByTestId("stage").locator("svg text").evaluateAll((nodes) => Math.min(...nodes.map((el) => {
      const scale = el.ownerSVGElement.getBoundingClientRect().width / el.ownerSVGElement.viewBox.baseVal.width;
      return parseFloat(getComputedStyle(el).fontSize)*scale;
    })));
    assert.ok(smallestSvgFont >= 10,`${c.slug}: SVG labels ${smallestSvgFont}px`);
    // The trace must survive revisiting both snapshots after the reveal.
    await controls.nth(0).click();
    const trace = page.getByTestId("stage").getByLabel("Snapshots visited");
    assert.ok((await trace.innerText()).includes(String(c.years[0])));
    assert.ok((await trace.innerText()).includes(String(c.years[1])));
    results.push({ slug:c.slug,stageWords:counts,maxStageWords:Math.max(...counts),smallestSvgFont,traceRetained:true });
    if (["map-damascus-cairo-1500-1530","map-mexico-city-oaxaca-1492-1530","map-cusco-quito-1492-1530"].includes(c.slug)) {
      await controls.nth(2).click();
      await page.screenshot({ path:`${out}/${c.slug}-phone.png` });
    }
    if ((index+1)%25===0) console.log(`audit ${index+1}/100`);
  }
  await page.emulateMedia({ colorScheme:"dark" });
  await page.goto(`${base}/history-maps`);
  await page.screenshot({ path:`${out}/atlas-phone-dark.png` });
  await page.setViewportSize({ width:1280,height:900 });
  await page.screenshot({ path:`${out}/atlas-desktop-dark.png` });
  assert.equal(errors.length,0,errors.join("\n"));
  fs.writeFileSync(`${out}/audit.json`,JSON.stringify({ type:"builder integration audit",cases:results.length,atlasLinks:100,pageErrors:errors,maxStageWords:Math.max(...results.map((r) => r.maxStageWords)),results },null,2)+"\n");
  console.log(`PASS: ${results.length} cases; stage budget, trace retention, no horizontal overflow; atlas 100 links; light/dark screenshots`);
} finally { await browser.close(); }
