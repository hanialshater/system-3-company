#!/usr/bin/env node
// SPIKE-001 rollback-by-hash drill: point why-seven-wins at version A, then B, then A again, and
// check after each repoint that a fresh learner gets exactly that bundle, with no rebuild.
// Needs the app on :3140 and the CDN on :3141.   node spike/rollback-drill.mjs

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";
import { setPointer } from "./manifest.mjs";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist");
const HOST = process.env.SPIKE_HOST ?? "http://localhost:3140";
const slug = "why-seven-wins";
const builds = JSON.parse(fs.readFileSync(path.join(DIST, "builds.json"), "utf8")).lessons[slug];
const A = Object.values(builds).find((b) => b.variant === "A");
const B = Object.values(builds).find((b) => b.variant === "B");
const digest = (rel) => crypto.createHash("sha256").update(fs.readFileSync(path.join(DIST, rel))).digest("hex");
const before = { a: digest(A.bundle), b: digest(B.bundle) };

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
const steps = [];
for (const [label, v] of [["A", A], ["B", B], ["A", A]]) {
  const t0 = performance.now();
  const r = setPointer(slug, v.frameHash);
  const repointMs = performance.now() - t0;
  const ctx = await browser.newContext({ ...devices["Pixel 7"] }); // a fresh learner, empty cache
  const page = await ctx.newPage();
  const t1 = performance.now();
  await page.goto(`${HOST}/spike?only=${slug}&mode=single`);
  await page.locator(`iframe[data-slug="${slug}"][data-ready="1"]`).waitFor({ timeout: 15_000 });
  const servedMs = performance.now() - t1;
  const s = await page.evaluate(() => ({ ready: window.__spike.ready, v: window.__spike.manifestVersion }));
  const src = await page.locator(`iframe[data-slug="${slug}"]`).getAttribute("src");
  const got = s.ready[slug][0].bundle;
  steps.push({ label, manifestVersion: s.v, frame: src.split("#")[0].split("/f/")[1].slice(0, 12), bundle: got.slice(3, 15), expected: v.bundle.slice(3, 15), ok: got === v.bundle && src.includes(v.frame), repointMs: +repointMs.toFixed(2), freshLoadMs: Math.round(servedMs) });
  await ctx.close();
}
await browser.close();
const after = { a: digest(A.bundle), b: digest(B.bundle) };
const result = { steps, immutable: before.a === after.a && before.b === after.b && before.a === A.hash && before.b === B.hash };
console.log(JSON.stringify(result, null, 2));
fs.mkdirSync(path.join(DIST, "..", "..", "artifacts/scratch/platform-engineer"), { recursive: true });
fs.writeFileSync(path.join(DIST, "..", "..", "artifacts/scratch/platform-engineer/rollback-drill.json"), JSON.stringify(result, null, 2));
if (!steps.every((s) => s.ok) || !result.immutable) process.exit(1);
