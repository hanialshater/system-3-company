#!/usr/bin/env node
// AMD-013 side-by-side, read-only: how many lessons each policy calls ready. Writes nothing.
//   node company/constitution/amendments/AMD-013-one-readiness/measure.mjs [--json] [--root=<repo>]
// old = launchGates() as in tools/company.mjs today (copied below verbatim, minus nothing).
// new = the same claim/evidence floor + readiness() from the proposed tools/lib/readiness.mjs.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readiness, loadContext, loadHolds, gitAncestry } from "./tools/lib/readiness.mjs";

const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
const ROOT = path.resolve(arg("root") ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../.."));
const rel = (...p) => path.join(ROOT, ...p);
const exists = (p) => fs.existsSync(p);

// Verbatim from tools/company.mjs launchGates() at c31c1fab.
function oldGates(meta) {
  const fails = [];
  const open = meta.claims.filter((c) => c.status !== "verified" && c.status !== "withdrawn");
  if (meta.claims.length === 0) fails.push("no claims recorded: every lesson asserts something; write it down");
  if (open.length) fails.push(`claims not verified: ${open.map((c) => c.id).join(", ")}`);
  for (const c of meta.claims) {
    if (c.status === "verified" && (!c.checkedBy || !c.checkedOn)) fails.push(`${c.id} verified without checkedBy/checkedOn`);
    if (c.status === "verified" && c.checkedBy === meta.owner.builder) fails.push(`${c.id} verified by its own builder`);
  }
  if (!meta.evidence.qa?.length) fails.push("no computer-use QA record (company/reviews/...)");
  if (!meta.evidence.simulatedLearner?.length) fails.push("no borrowed-mind learner review");
  for (const k of ["qa", "simulatedLearner", "pairwise", "humanLearners"]) {
    for (const r of meta.evidence[k] ?? []) if (!exists(rel(r))) fails.push(`evidence.${k} points at missing file ${r}`);
  }
  if (meta.confidence === "**" && !(meta.evidence.humanLearners?.length > 0))
    fails.push('confidence "**" needs human-learner evidence; simulated learners are not learners');
  return fails;
}

const holds = loadHolds(ROOT);
const isAncestor = gitAncestry(ROOT);
const rows = [];
for (const dom of fs.readdirSync(rel("src/demos"))) {
  const dd = rel("src/demos", dom);
  if (!fs.statSync(dd).isDirectory()) continue;
  for (const slug of fs.readdirSync(dd)) {
    const mp = path.join(dd, slug, "meta.json");
    if (!exists(mp)) continue;
    const meta = JSON.parse(fs.readFileSync(mp, "utf8"));
    if (meta.status !== "review" && meta.status !== "published") continue;
    const old = oldGates(meta);
    const r = readiness(meta, loadContext(ROOT, meta, { holds, isAncestor }));
    rows.push({ slug, status: meta.status, oldReady: old.length === 0, newReady: old.length === 0 && r.ready, why: [...old, ...r.reasons] });
  }
}

const tally = (status) => {
  const s = rows.filter((r) => r.status === status);
  const reasons = {};
  for (const r of s.filter((x) => x.oldReady && !x.newReady)) {
    const k = r.why[0].replace(/: .*/, (m) => (m.length > 60 ? m.slice(0, 60) + "…" : m));
    reasons[k] = (reasons[k] ?? 0) + 1;
  }
  return {
    lessons: s.length,
    oldReady: s.filter((r) => r.oldReady).length,
    newReady: s.filter((r) => r.newReady).length,
    newOnlyReady: s.filter((r) => r.newReady && !r.oldReady).map((r) => r.slug),
    newReadySlugs: s.filter((r) => r.newReady).length <= 30 ? s.filter((r) => r.newReady).map((r) => r.slug) : "(many)",
    oldOnlyByFirstReason: Object.fromEntries(Object.entries(reasons).sort((a, b) => b[1] - a[1])),
  };
};
const out = { root: ROOT, review: tally("review"), published: tally("published") };
if (process.argv.includes("--json")) console.log(JSON.stringify({ ...out, rows }, null, 2));
else console.log(JSON.stringify(out, null, 2));
