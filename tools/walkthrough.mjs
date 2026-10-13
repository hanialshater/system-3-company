#!/usr/bin/env node
// Walkthrough: use a lesson like a learner and record only what a learner would see.
// This is the artifact evaluators read BEFORE any builder explanation (company/reviews/README.md).
//
//   npm run walkthrough -- <slug> [<slug> ...] [--choose N] [--steps K] [--viewport phone|desktop]
//   npm run walkthrough -- --domain <domain>      every non-retired lesson in a domain, one server
//
// Writes artifacts/walkthroughs/<slug>/transcript.md and step screenshots.
// Uses a running server at WALKTHROUGH_URL if set; otherwise starts `next start` on port 3300
// (run `npm run build` first).

import { chromium, devices } from "@playwright/test";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const optVals = new Set(["choose", "steps", "viewport", "domain"].map((k) => opt(k, null)).filter(Boolean));
let slugs = args.filter((a) => !a.startsWith("--") && !optVals.has(a));
const domainOpt = opt("domain", null);
if (domainOpt) {
  const dir = path.join("src/demos", domainOpt);
  slugs = fs.readdirSync(dir).filter((s) => {
    try { return JSON.parse(fs.readFileSync(path.join(dir, s, "meta.json"), "utf8")).status !== "retired"; } catch { return false; }
  });
}
if (!slugs.length) {
  console.log("usage: npm run walkthrough -- <slug> [--choose N] [--steps K] [--viewport phone|desktop]");
  process.exit(1);
}
const choose = Number(opt("choose", "0"));
const steps = Number(opt("steps", "6"));
const viewport = opt("viewport", "phone");

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

const launchOpts = process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOpts);
for (const slug of slugs) {
const outDir = path.join("artifacts", "walkthroughs", slug);
fs.mkdirSync(outDir, { recursive: true });
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

  // Follow the QA contract's path (tests/qa/contract.spec.ts): each of the first 16 enabled stage
  // controls pressed once in DOM order, sliders moved two steps. This is the path builders design
  // the key state for, so reviewers see what the lesson actually shows on that path.
  const total = Math.min(await page.locator('[data-testid="stage"] [data-qa="control"]').count(), 16, Math.max(steps, 16));
  let stepNo = 0;
  for (let i = 0; i < total; i++) {
    const c = page.locator('[data-testid="stage"] [data-qa="control"]').nth(i);
    if ((await c.count()) === 0 || !(await c.isVisible()) || (await c.isDisabled())) continue;
    const label = ((await c.getAttribute("aria-label")) || (await c.innerText().catch(() => "")) || "control").trim();
    const type = await c.evaluate((el) => (el.tagName === "INPUT" ? el.type : el.tagName));
    stepNo += 1;
    if (type === "range") {
      await c.focus();
      const atMax = await c.evaluate((el) => Number(el.value) >= Number(el.max));
      const key = atMax ? "ArrowLeft" : "ArrowRight";
      for (let k = 0; k < 2; k++) await page.keyboard.press(key);
      log.push(`### Step ${stepNo}: moved slider "${label}" ${atMax ? "left" : "right"} (now ${await c.evaluate((el) => el.value)})`);
    } else {
      await c.click();
      log.push(`### Step ${stepNo}: tapped "${label}"`);
    }
    await page.waitForTimeout(1200); // let animations settle before the screenshot
    log.push("", "```", await stageText(), "```", "", `![step ${stepNo}](${await snap(`step-${stepNo}`)})`, "");
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
} catch (e) {
  log.push("", `**Walkthrough aborted:** ${e.message.split("\n")[0]}`);
} finally {
  fs.writeFileSync(path.join(outDir, "transcript.md"), log.join("\n") + "\n");
  await context.close();
}
console.log(`wrote ${path.join(outDir, "transcript.md")} and ${n} screenshots`);
}
await browser.close();
if (server) try { process.kill(-server.pid); } catch {}
