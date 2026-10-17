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
// Excluded on purpose: review-timing (not an ordering policy; no episode in hq-cli) and any reachable-* candidate
// (it does not enter the lab before vp-personalization's go/no-go record G, batch 5 §4).
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = "company/personalization/model/sim/hq-cli.mjs";
const OUT = "src/data/hq-personalization";
const INPUTS = ["company/personalization/model", "content/curriculum", "src/demos"];
export const SEEDS = [1];
export const DAYS = 7;
export const COMPARE = { seeds: 5, days: 7, sets: ["main", "all"] };
const DENY = /^reachable/; // not before go/no-go G
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
  excluded: ["review-timing: not an ordering policy (no episode in hq-cli)", "reachable-*: not before go/no-go G (batch 5 §4)", "saved traces (sim/out/traces): local files, never copied"],
  runs, compares,
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
for (const sub of ["runs", "compare"]) if (existsSync(path.join(dir, sub))) rmSync(path.join(dir, sub), { recursive: true });
for (const [rel, buf] of files) { mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); writeFileSync(path.join(dir, rel), buf); }
writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 1) + "\n");
const bytes = [...files.values()].reduce((s, b) => s + b.length, 0);
console.log(`hq-lab-precompute: wrote ${files.size} files (${(bytes / 1024).toFixed(0)} KB) + manifest.json to ${OUT}; inputs ${inputsCommit}, ${meta.modelVersion}`);
