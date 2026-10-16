#!/usr/bin/env node
// Self-check for the phase A personalization model (W-1493). Node >= 22.18, no dependencies:
//   node company/personalization/model/self-check.mjs
// Prints need scores for each simulation persona, runs the model invariants, and checks the
// boundaries: model.ts does not reference personas, nothing in src/ imports this folder, and
// MODEL_VERSION has a line in the decision record; then the privacy ruling's P1/P2/N6 tests (W-1514). Exits 1 on any failure.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "./model.ts";
import { PERSONAS, PERSONAS_VERSION } from "./personas.ts";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..", "..");
const fails = [];

// 1. Invariants.
fails.push(...M.checkModel());

// 2. Boundaries.
if (/personas/.test(readFileSync(join(here, "model.ts"), "utf8").replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "")))
  fails.push("model.ts code references personas (serving code must never read them)");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
// W-1498 (README.md "Where the model lives"): src/ never imports this folder (no import, import() or require
// naming it). The HQ lab reaches the simulator only by running sim/hq-cli.mjs as a separate process, and only
// from SIM_GATEWAY. Other src mentions (a library link, a comment) are allowed.
const SIM_GATEWAY = join("src", "lib", "hq-personalization-server.ts");
const importsModel = /(\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|^\s*import\s+)["'`][^"'`]*personalization\/model/m;
for (const f of walk(join(root, "src"))) {
  if (!/\.(t|j)sx?$|\.mjs$/.test(f)) continue;
  const txt = readFileSync(f, "utf8");
  if (!txt.includes("personalization/model")) continue;
  if (importsModel.test(txt)) fails.push(`src imports the model: ${f}`);
  if (/child_process/.test(txt) && !f.endsWith(SIM_GATEWAY)) fails.push(`src runs the simulator outside ${SIM_GATEWAY}: ${f}`);
}
const decision = readFileSync(join(root, M.DECISION), "utf8");
for (const v of [M.MODEL_VERSION, PERSONAS_VERSION]) if (!decision.includes(v)) fails.push(`${v} has no line in ${M.DECISION}`);
// N6 (privacy ruling §3, W-1514): from model-v0.2.1 on, the current version's change line says
// "privacy: no new input" or names the privacy read it needed.
const curLine = decision.split("\n").find((l) => l.startsWith(`| ${M.MODEL_VERSION} |`));
if (curLine && !/privacy:/.test(curLine)) fails.push(`${M.MODEL_VERSION} change line lacks "privacy: no new input" or the read it needed (ruling N6)`);

// 3. Determinism and inspectability.
const fp = (p) => ({ version: "fp-v0", statedSubjects: [], lessOfThis: [], ...p.fingerprintMeans });
for (const p of PERSONAS) if (JSON.stringify(M.detect(fp(p))) !== JSON.stringify(M.detect(fp(p)))) fails.push(`${p.id}: detect not deterministic`);
JSON.parse(JSON.stringify(M.inspect())); // must serialise

// 4. fingerprintFrom smoke test on a tiny synthetic history (no learner data).
const dims = {
  a: { slug: "a", domain: "probability", concept: "p1", level: "intro", prerequisites: [], successors: ["p2"] },
  b: { slug: "b", domain: "probability", concept: "p2", level: "core", prerequisites: ["p1"], successors: [] },
  c: { slug: "c", domain: "cs", concept: "c1", level: "intro", prerequisites: [], successors: ["c2"] },
};
const now = Date.UTC(2026, 9, 16);
const hist = [
  { slug: "a", completedAt: now - 5e8, predictedCorrectly: true, recalls: [{ at: now - 1e8, correct: true }] },
  { slug: "c", completedAt: now - 4e8, predictedCorrectly: false, recalls: [{ at: now - 1e8, correct: false }] },
];
const f1 = M.fingerprintFrom(hist, dims, now);
const f2 = M.fingerprintFrom(hist, dims, now, { predictedCorrectly: false });
if (f1.missRecent !== 0.5 || f1.frontierOpen !== 1 || f1.domainConcentration !== 0.5) fails.push(`fingerprintFrom: unexpected ${JSON.stringify(f1)}`);
if (f2.successRecent !== 0.5) fails.push("fingerprintFrom: recall-only mode wrong");

// 5. Privacy ruling tests (company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §2.1, W-1514).
// P2: predictedCorrectly null or absent (no prediction made) is absent, never "wrong".
const noRecall = (slug, t, pc) => ({ slug, completedAt: t, ...(pc === undefined ? {} : { predictedCorrectly: pc }), recalls: [] });
const fNull = M.fingerprintFrom([noRecall("a", now - 5e8, null), noRecall("b", now - 4e8, null)], dims, now);
const fAbsent = M.fingerprintFrom([noRecall("a", now - 5e8, undefined), noRecall("b", now - 4e8, undefined)], dims, now);
const fWrong = M.fingerprintFrom([noRecall("a", now - 5e8, false), noRecall("b", now - 4e8, false)], dims, now);
if (fNull.missRecent !== 0 || fNull.successRecent !== 0) fails.push(`P2: null prediction counted as a miss or success ${JSON.stringify(fNull)}`);
if (JSON.stringify(fNull) !== JSON.stringify(fAbsent)) fails.push("P2: null and absent prediction give different fingerprints");
if (fWrong.missRecent !== 1) fails.push("P2 control: a wrong prediction should count as a miss when the input is on");
// P1: with the recall-only fallback on, histories identical except predictedCorrectly give identical fingerprints.
const variants = [true, false, null, undefined];
const base = [
  { slug: "a", completedAt: now - 5e8, recalls: [{ at: now - 1e8, correct: true }] },
  { slug: "b", completedAt: now - 4.5e8, recalls: [] },
  { slug: "c", completedAt: now - 4e8, recalls: [{ at: now - 1e8, correct: false }] },
];
const seen = new Set();
for (const v0 of variants) for (const v1 of variants) for (const v2 of variants) {
  const h = base.map((x, i) => { const pc = [v0, v1, v2][i]; return pc === undefined ? { ...x } : { ...x, predictedCorrectly: pc }; });
  seen.add(JSON.stringify(M.fingerprintFrom(h, dims, now, { predictedCorrectly: false })));
}
if (seen.size !== 1) fails.push(`P1: recall-only fallback depends on predictedCorrectly (${seen.size} distinct fingerprints over 64 variants)`);
const stripped = M.fingerprintFrom(base, dims, now, { predictedCorrectly: false });
if (!seen.has(JSON.stringify(stripped))) fails.push("P1: fallback fingerprint differs from one computed with the field never loaded");

// Output.
const r = (x) => x.toFixed(2);
console.log(`${M.MODEL_VERSION} · ${PERSONAS_VERSION} · decision ${M.DECISION}`);
console.log(`signals: ${M.inspect().signals.map((s) => `${s.signal}[${s.privacy}]`).join(", ")}\n`);
console.log("persona".padEnd(24) + "damp  " + M.NEEDS.map((n) => n.padEnd(8)).join("") + "top (largest term)");
for (const p of PERSONAS) {
  const ex = M.explainNeeds(fp(p));
  const top = [...ex].sort((a, b) => b.score - a.score)[0];
  const term = [...top.terms].sort((a, b) => b.contribution - a.contribution)[0];
  console.log(p.id.padEnd(24) + r(ex[0].dampener).padEnd(6) + ex.map((e) => r(e.score).padEnd(8)).join("") +
    (top.score > 0 ? `${top.need} (${term.signal}=${r(term.x)} -> ${r(term.y)})` : "none (default order)"));
}
console.log(fails.length ? `\nFAIL (${fails.length}):\n- ${fails.join("\n- ")}\nowner: learner-model-engineer (escalate: vp-personalization) · read: company/personalization/model/README.md` : "\nOK: invariants, boundaries, determinism, fingerprintFrom, privacy P1/P2/N6");
process.exit(fails.length ? 1 : 0);
