#!/usr/bin/env node
// Extra artifact check for R1-R3. The protected contract remains unchanged.
// node tools/mini-lab-control-check.mjs --url http://localhost:3100 --slugs a,b
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const option = (key, fallback) => { const i = args.indexOf(`--${key}`); return i < 0 ? fallback : args[i + 1]; };
const base = option("url", process.env.QA_BASE_URL);
const slugs = option("slugs", process.env.QA_ONLY ?? "").split(",").filter(Boolean);
assert.ok(base && slugs.length, "Pass --url and --slugs (or QA_BASE_URL and QA_ONLY)");
const out = option("out", "artifacts/mini-lab-controls/report.json");
const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const report = [];

async function fingerprint(page) {
  return page.locator("[data-mini-lab]").evaluate((stage) => {
    const picture = stage.querySelector("[data-mini-picture]");
    return JSON.stringify({
      text: picture?.textContent?.trim() ?? "setup",
      // Do not count captions, aria-label descriptions, controls or hidden state indices.
      geometry: picture ? Array.from(picture.querySelectorAll("svg *")).map((el) => Array.from(el.attributes).filter((a) => !["id", "aria-label"].includes(a.name)).map((a) => `${a.name}=${a.value}`).join(";")).join("|") : "",
      metrics: stage.querySelector("[data-mini-metrics]")?.textContent?.trim() ?? "",
      witness: stage.querySelector("[data-mini-witness]")?.textContent?.trim() ?? "",
    });
  });
}

async function pressMeaningful(page, control, name) {
  if (await control.isDisabled()) return false;
  const before = await fingerprint(page);
  await control.click();
  await page.waitForTimeout(80);
  assert.notEqual(await fingerprint(page), before, `${name} changed no rendered picture/readout/observation`);
  return true;
}

async function savedA(page) {
  const controls = page.locator('[data-testid="stage"]');
  const run = controls.getByRole("button", { name: "Run case", exact: true });
  const compare = controls.getByRole("button", { name: "Compare", exact: true });
  const reset = controls.getByRole("button", { name: "Reset", exact: true });
  await pressMeaningful(page, run, "Run case");
  await pressMeaningful(page, compare, "Compare");
  await pressMeaningful(page, reset, "Reset");
  assert.equal(await run.isDisabled(), true, "Saved A-final must not enable Run that only removes its Saved label");
}

try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 800 }]) {
    const context = await browser.newContext({ viewport });
    for (const slug of slugs) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      try {
        await page.goto(`${base}/d/${slug}`);
        await page.locator("[data-mini-lab]").waitFor();
        const stage = page.locator('[data-testid="stage"]');
        const controls = stage.locator('[data-qa="control"]');
        for (let i = 0; i < await controls.count(); i++) assert.equal(await controls.nth(i).isDisabled(), true);
        await page.locator('[data-testid="predict-option"]').last().click();
        await page.locator('[data-testid="commit-prediction"]').click();
        for (let i = 0; i < await controls.count(); i++) await pressMeaningful(page, controls.nth(i), `DOM control ${i}`);
        // Re-establish the saved state for each branch, so Step really is tested after Reset.
        for (const name of ["Run case", "Compare", "Step", "Reset"]) {
          await savedA(page);
          await pressMeaningful(page, stage.getByRole("button", { name, exact: true }), `after Reset: ${name}`);
        }
        await savedA(page);
        await page.locator('[data-testid="reveal-button"]').click();
        assert.equal(await page.locator('[data-testid="reveal"]').isVisible(), true);
        assert.deepEqual(errors, []);
        report.push({ slug, viewport, pass: true });
      } catch (error) {
        report.push({ slug, viewport, pass: false, error: String(error) });
      } finally { await page.close(); }
    }
    await context.close();
  }
} finally {
  await browser.close();
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(report, null, 2) + "\n");
}
console.log(`${report.filter((r) => r.pass).length}/${report.length} mini-lab control paths pass (${out})`);
if (report.some((r) => !r.pass)) process.exitCode = 1;
