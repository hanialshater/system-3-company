#!/usr/bin/env node
// Walkthrough: use a lesson like a learner and record only what a learner would see.
// This is the artifact evaluators read BEFORE any builder explanation (company/reviews/README.md).
//
//   npm run walkthrough -- <slug> [--choose N] [--steps K] [--viewport phone|desktop]
//
// Writes artifacts/walkthroughs/<slug>/transcript.md and step screenshots.
// Uses a running server at WALKTHROUGH_URL if set; otherwise starts `next start` on port 3300
// (run `npm run build` first).

import { chromium, devices } from "@playwright/test";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const opt = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
if (!slug) {
  console.log("usage: npm run walkthrough -- <slug> [--choose N] [--steps K] [--viewport phone|desktop]");
  process.exit(1);
}
const choose = Number(opt("choose", "0"));
const steps = Number(opt("steps", "6"));
const viewport = opt("viewport", "phone");
const outDir = path.join("artifacts", "walkthroughs", slug);
fs.mkdirSync(outDir, { recursive: true });

async function waitFor(url, ms = 30_000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`server did not start at ${url}`);
}

let server;
let base = process.env.WALKTHROUGH_URL;
if (!base) {
  const port = 3300 + Math.floor(Math.random() * 500);
  base = `http://localhost:${port}`;
  server = spawn("npx", ["next", "start", "-p", String(port)], { stdio: "ignore", detached: true });
  await waitFor(base);
}

const launch = process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {};
const browser = await chromium.launch(launch);
const context = await browser.newContext(viewport === "phone" ? devices["Pixel 7"] : { viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
const log = [];
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

const stageText = () =>
  page.locator('[data-testid="stage"]').evaluate((el) => {
    const svg = Array.from(el.querySelectorAll('svg[aria-label],[role="img"][aria-label]')).map((s) => `[picture: ${s.getAttribute("aria-label")}]`);
    return [el.innerText.trim(), ...svg].filter(Boolean).join("\n");
  });
let n = 0;
const snap = async (label) => {
  n += 1;
  const file = `${String(n).padStart(2, "0")}-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`;
  await page.screenshot({ path: path.join(outDir, file) });
  return file;
};

try {
  await page.goto(`${base}/d/${slug}`);
  await page.locator('[data-testid="lesson"]').waitFor({ timeout: 15_000 });
  const title = await page.locator(".card-title").innerText();
  const hook = await page.locator(".card-hook").innerText();
  log.push(`# Walkthrough: ${title}`, "", `viewport: ${viewport} · choice: option ${choose + 1} · recorded ${new Date().toISOString()}`, "");
  log.push("> This transcript records only what a learner sees. It has no brief, objective or builder notes. Evaluators: write your findings from this before you read anything else.", "");
  log.push(`**Hook:** ${hook}`, "");

  const q = await page.locator(".panel-q").innerText();
  const options = await page.locator('[data-testid="predict-option"]').allInnerTexts();
  log.push("## 1. Predict", "", `**Question:** ${q}`, "", ...options.map((o, i) => `${i + 1}. ${o}`), "");
  log.push("**Stage while locked:**", "", "```", await stageText(), "```", "", `![predict](${await snap("predict")})`, "");

  await page.locator('[data-testid="predict-option"]').nth(Math.min(choose, options.length - 1)).click();
  await page.locator('[data-testid="commit-prediction"]').click();
  log.push(`Learner chose **${options[Math.min(choose, options.length - 1)]}**.`, "");
  log.push("## 2. Explore", "", `**Panel:** ${await page.locator(".panel-q").innerText()}`, "");

  for (let s = 0; s < steps; s++) {
    const controls = page.locator('[data-testid="stage"] [data-qa="control"]');
    const count = await controls.count();
    let acted = false;
    for (let i = 0; i < count && !acted; i++) {
      const c = controls.nth((s + i) % count);
      if (!(await c.isVisible()) || (await c.isDisabled())) continue;
      const label = ((await c.getAttribute("aria-label")) || (await c.innerText().catch(() => "")) || "control").trim();
      const type = await c.evaluate((el) => (el.tagName === "INPUT" ? el.type : el.tagName));
      if (type === "range") {
        await c.focus();
        for (let k = 0; k < 3; k++) await page.keyboard.press("ArrowRight");
        log.push(`### Step ${s + 1}: moved slider "${label}" right`);
      } else {
        await c.click();
        log.push(`### Step ${s + 1}: tapped "${label}"`);
      }
      acted = true;
      await page.waitForTimeout(500);
      log.push("", "```", await stageText(), "```", "", `![step ${s + 1}](${await snap(`step-${s + 1}`)})`, "");
    }
    if (!acted) break;
  }

  const revealBtn = page.locator('[data-testid="reveal-button"]');
  if (await revealBtn.isEnabled()) {
    await revealBtn.click();
    const reveal = await page.locator('[data-testid="reveal"]').innerText();
    log.push("## 3. Reveal", "", ...reveal.split("\n").filter(Boolean).map((l) => `> ${l}`), "", `![reveal](${await snap("reveal")})`, "");
  } else {
    log.push("## 3. Reveal", "", "**The reveal never unlocked during this walkthrough.**", "");
  }

  await page.locator('[data-testid="trust-button"]').click();
  const trust = await page.locator('[data-testid="trust-sheet"]').innerText();
  log.push("## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)", "", "```", trust, "```", "");
  if (errors.length) log.push("## Page errors", "", ...errors.map((e) => `- ${e}`), "");
} finally {
  fs.writeFileSync(path.join(outDir, "transcript.md"), log.join("\n") + "\n");
  await browser.close();
  if (server) try { process.kill(-server.pid); } catch {}
}
console.log(`wrote ${path.join(outDir, "transcript.md")} and ${n} screenshots`);
