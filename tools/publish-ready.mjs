#!/usr/bin/env node
// Chief-of-staff publish loop (W-062). Not a gate: the gates live in tools/company.mjs and still run
// on every publish. This script adds the check the gate lacks until AMD-001(d) is ratified: the most
// recent learner review must say "Verdict: launch" AND name the lesson's current version.
//
//   node tools/publish-ready.mjs              list candidates and why others are held
//   node tools/publish-ready.mjs --publish    also run `company publish` for each candidate
//
// It also links learner-review files into meta.evidence.simulatedLearner (W-063 until a command exists).

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...p) => path.join(ROOT, ...p);
const doPublish = process.argv.includes("--publish");
const holds = fs.existsSync(rel("company/ops/publish-holds.json"))
  ? JSON.parse(fs.readFileSync(rel("company/ops/publish-holds.json"), "utf8")).holds
  : {};

const ready = [];
const held = {};
let linked = 0;
for (const dom of fs.readdirSync(rel("src/demos"))) {
  const dd = rel("src/demos", dom);
  if (!fs.statSync(dd).isDirectory()) continue;
  for (const slug of fs.readdirSync(dd)) {
    const mp = path.join(dd, slug, "meta.json");
    if (!fs.existsSync(mp)) continue;
    const meta = JSON.parse(fs.readFileSync(mp, "utf8"));
    const rd = rel("company/reviews", slug);
    const reviews = fs.existsSync(rd) ? fs.readdirSync(rd).filter((f) => f.includes("learner")).sort() : [];
    meta.evidence.simulatedLearner ??= [];
    let changed = false;
    for (const f of reviews) {
      const p = `company/reviews/${slug}/${f}`;
      if (!meta.evidence.simulatedLearner.includes(p)) (meta.evidence.simulatedLearner.push(p), (changed = true), linked++);
    }
    if (changed) fs.writeFileSync(mp, JSON.stringify(meta, null, 2) + "\n");
    if (meta.status !== "review") continue;
    const why = (r) => ((held[r] ??= []).push(slug), null);
    if (holds[slug]) { why(`hold: ${holds[slug]}`); continue; }
    if (!reviews.length) { why("no learner review"); continue; }
    const t = fs.readFileSync(path.join(rd, reviews.at(-1)), "utf8");
    const verdict = t.match(/Verdict:\s*\**\s*(launch|revise|fatal)/i)?.[1]?.toLowerCase();
    const v = Number(t.match(/lesson version:\s*v(\d+)/i)?.[1] ?? 0);
    if (verdict !== "launch") { why(`verdict ${verdict ?? "missing"}`); continue; }
    if (v !== (meta.version ?? 1)) { why("verdict is for an older version"); continue; }
    ready.push(slug);
  }
}

console.log(`linked ${linked} review file(s) as evidence`);
for (const [r, s] of Object.entries(held)) console.log(`held (${r}): ${s.length}${s.length <= 12 ? "  " + s.join(", ") : ""}`);
console.log(`candidates: ${ready.length}  ${ready.join(", ")}`);
if (doPublish)
  for (const slug of ready) {
    let out;
    try {
      out = execFileSync("node", [rel("tools/company.mjs"), "publish", slug], { encoding: "utf8" });
    } catch (e) {
      out = (e.stdout ?? "") + (e.stderr ?? "");
    }
    console.log(out.trim().split("\n").filter(Boolean).slice(-3).join(" "));
  }
