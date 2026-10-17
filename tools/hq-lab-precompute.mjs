#!/usr/bin/env node
// Precompute the HQ Personalization Lab's runs for a released HQ build (W-1572 H1;
// company/personalization/batches/2026-10-17-batch-5.md, section H1). owner: personalization-engineer.
//
// In production the lab never spawns a process (src/lib/hq-personalization-server.ts); it serves only the
// committed files this script writes to src/data/hq-personalization/ (format: that folder's README.md).
// Locally (npm run dev) the lab still runs the simulator live.
//
//   node tools/hq-lab-precompute.mjs            regenerate the folder (refuses if the inputs are uncommitted)
//   node tools/hq-lab-precompute.mjs --check    regenerate in memory and report whether the folder is current
//
// SIMULATED PERSONAS ONLY. The only source is the simulator's JSON CLI (company/personalization/model/sim/hq-cli.mjs),
// whose only data inputs are personas.ts, the lesson catalogue and sim/out/traces (lab privacy DoD D1,
// company/personalization/lab/2026-10-16-lab-privacy-dod.md). Saved traces (sim/out/traces, git-ignored local
// files) are never copied: the stored meta has `saved: []`.
// Excluded on purpose: review-timing (not an ordering policy; no episode in hq-cli) and every reachable-* policy in the
// simulator's own set (DENY). Batch 5 §20.2 (W-1648) amends §4 for the lab only: the two frozen candidates
// reachable-v2 and reachable-v3 are shown read-only, from tools/hq-lab-candidates.mjs, which imports each file
// unchanged only if its bytes hash to the frozen sha256 (any mismatch: this script exits and writes nothing).
// Every other reachable-* file stays out, reachable-v1 included. The candidate documents carry the §20.2 label.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = "company/personalization/model/sim/hq-cli.mjs";
const OUT = "src/data/hq-personalization";
const INPUTS = ["company/personalization/model", "content/curriculum", "src/demos", "company/personalization/policies", "tools/hq-lab-candidates.mjs", "src/lib/hq-personalization-candidates.ts"];
const ADAPTER = "tools/hq-lab-candidates.mjs";
export const SEEDS = [1];
export const DAYS = 7;
export const COMPARE = { seeds: 5, days: 7, sets: ["main", "all"] };
const DENY = /^reachable/; // the simulator's own set: never (candidates come only from ADAPTER, batch 5 §20.2)
const check = process.argv.includes("--check");
const allowDirty = process.argv.includes("--allow-dirty");

const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8" }).trim();
const sha = (b) => createHash("sha256").update(b).digest("hex");
function cli(args) {
  const out = execFileSync(process.execPath, [path.join(ROOT, CLI), ...args],
    { cwd: ROOT, env: { NODE_NO_WARNINGS: "1" }, maxBuffer: 256 * 1024 * 1024, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const doc = JSON.parse(out);
  if (doc && doc.error) throw new Error(`hq-cli ${args.join(" ")}: ${doc.error}`);
  return doc;
}

const dirty = git("status", "--porcelain", "--", ...INPUTS);
if (dirty && !allowDirty && !check) {
  console.error(`hq-lab-precompute: the simulator's inputs have uncommitted changes; commit them first so the data names a real commit:\n${dirty}`);
  process.exit(2);
}
const [commit, commitDate] = git("log", "-1", "--format=%h%x09%cI", "--", ...INPUTS).split("\t");
const inputsCommit = dirty ? `${commit}+dirty` : commit;

const files = new Map(); // rel → Buffer
const meta = cli(["meta"]);
meta.saved = [];
files.set("meta.json", Buffer.from(JSON.stringify(meta)));
const personas = meta.personas.map((p) => p.id);
const policies = meta.policies.model.filter((p) => meta.policies.all.includes(p) && !DENY.test(p));
const allSet = meta.policies.all.filter((p) => !DENY.test(p));
if (allSet.length !== meta.policies.all.length) throw new Error("a reachable-* policy is in the simulator's set; the lab cannot show it before G");
const runs = [];
for (const persona of personas) for (const policy of policies) for (const seed of SEEDS) {
  const t = cli(["run", `--persona=${persona}`, `--policy=${policy}`, `--seed=${seed}`, `--days=${DAYS}`]);
  const rel = `runs/${persona}.${policy}.seed${seed}.days${DAYS}.json.gz`;
  files.set(rel, gzipSync(Buffer.from(JSON.stringify(t)), { level: 9 }));
  runs.push({ persona, policy, seed, days: DAYS, file: rel });
}
// Frozen candidates (batch 5 §20.2): computed before anything is written, so a refusal writes nothing.
const cand = (() => {
  try {
    return JSON.parse(execFileSync(process.execPath, [path.join(ROOT, ADAPTER)],
      { cwd: ROOT, env: { NODE_NO_WARNINGS: "1" }, maxBuffer: 256 * 1024 * 1024, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
  } catch (e) {
    let msg = String(e.message);
    try { msg = JSON.parse(e.stdout).error ?? msg; } catch { /* not JSON */ }
    console.error(`hq-lab-precompute: candidates refused, nothing written: ${msg}`);
    process.exit(3);
  }
})();
const candidates = [];
let candidateLabel = null;
for (const d of cand.docs) {
  if (!/^reachable-v[23]$/.test(d.candidate.name) || !personas.includes(d.persona.id)) throw new Error(`unexpected candidate document ${d.candidate.name} / ${d.persona.id}`);
  candidateLabel = d.label;
  const rel = `candidates/${d.persona.id}.${d.candidate.name}.seed${d.run.seed}.days${d.run.days}.json.gz`;
  files.set(rel, gzipSync(Buffer.from(JSON.stringify(d)), { level: 9 }));
  candidates.push({ persona: d.persona.id, policy: d.candidate.name, seed: d.run.seed, days: d.run.days, file: rel, sha256: d.candidate.sha256 });
}
const compares = [];
for (const scope of [...personas, "all"]) for (const set of COMPARE.sets) {
  const c = cli(["compare", `--persona=${scope}`, `--seeds=${COMPARE.seeds}`, `--set=${set}`, `--days=${COMPARE.days}`]);
  c.ms = 0; // wall time is not data; keeps regeneration byte-identical
  const rel = `compare/${scope}.${set}.seeds${COMPARE.seeds}.days${COMPARE.days}.json`;
  files.set(rel, Buffer.from(JSON.stringify(c)));
  compares.push({ persona: scope, set, seeds: COMPARE.seeds, days: COMPARE.days, file: rel });
}

const manifest = {
  schema: "personalization-hq-precomputed-v1",
  simulatedOnly: meta.simulatedOnly,
  unscored: meta.unscored,
  inputsCommit, inputsCommitDate: commitDate, inputs: INPUTS,
  command: "node tools/hq-lab-precompute.mjs", cli: CLI,
  modelVersion: meta.modelVersion, personasVersion: meta.personasVersion, composerVersion: meta.composerVersion,
  personas, policies, seeds: SEEDS, days: DAYS, compare: { ...COMPARE, scopes: [...personas, "all"] },
  excluded: ["review-timing: not an ordering policy (no episode in hq-cli)", "reachable-* in the simulator's policy set, and every reachable-* file but the two frozen candidates (reachable-v1 included): batch 5 §4 as amended by §20.2", "saved traces (sim/out/traces): local files, never copied"],
  candidateLabel, candidateAdapter: ADAPTER,
  candidatePolicies: [...new Set(candidates.map((c) => c.policy))],
  runs, compares, candidates,
  files: Object.fromEntries([...files].map(([k, b]) => [k, sha(b)]).sort(([a], [b]) => a.localeCompare(b))),
};

const dir = path.join(ROOT, OUT);
if (check) {
  let old = null;
  try { old = JSON.parse(readFileSync(path.join(dir, "manifest.json"), "utf8")); } catch { /* reported below */ }
  const stale = !old ? ["manifest.json missing or unreadable"] : Object.entries(manifest.files).filter(([k, h]) => old.files?.[k] !== h).map(([k]) => k)
    .concat(Object.keys(old.files ?? {}).filter((k) => !(k in manifest.files)).map((k) => `${k} (no longer generated)`));
  if (stale.length) { console.log(`hq-lab-precompute --check: STALE (${stale.length}): ${stale.slice(0, 8).join(", ")}${stale.length > 8 ? " …" : ""}`); process.exit(1); }
  console.log(`hq-lab-precompute --check: current (${files.size} files, ${old.modelVersion}, inputs ${old.inputsCommit})`);
  process.exit(0);
}
for (const sub of ["runs", "compare", "candidates"]) if (existsSync(path.join(dir, sub))) rmSync(path.join(dir, sub), { recursive: true });
for (const [rel, buf] of files) { mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); writeFileSync(path.join(dir, rel), buf); }
writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 1) + "\n");
const bytes = [...files.values()].reduce((s, b) => s + b.length, 0);
console.log(`hq-lab-precompute: wrote ${files.size} files (${(bytes / 1024).toFixed(0)} KB) + manifest.json to ${OUT}; inputs ${inputsCommit}, ${meta.modelVersion}`);
