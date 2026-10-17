#!/usr/bin/env node
// Criterion 3b's harness glue: one candidate in criterion 3's world, judged against default-order + fixed.
// owner: personalization-eval (Uma) · run: eval-k5-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3b.md
// Offline only, Node >= 22.15 (registerHooks), no dependencies. Edits no file in ../c3/, ../c2/ or ../ (3b-ID0 pins them).
//
// The episode is criterion 3's runEpisode3, unchanged: the reference arm and the oracle row through the plain instance of
// ../c3/harness3.mjs, the candidate through the slot instance (slot.mjs), whose "reachable" order rule serves the
// candidate's decide() on the same deep-frozen §I.3 input the oracle got (criterion 3b §1.2).
//
// LOCK (criterion 3b §7): fixture candidates (files in ./fixtures/) run at any time. Any other candidate file runs only
// when criterion 3b's status line is `frozen`, its `candidate sha256:` line holds the file's sha256, and its
// `V3 record:` line names a file that exists (batch 5 §0 item 2: no candidate score before R3 is accepted in writing).
// The oracle row (reachable+fixed) runs only when criterion 3b is frozen. The reference arm runs at any time.
//
// Commands (from the repository root, NODE_NO_WARNINGS=1):
//   node harness3b.mjs seeds [--pilot=500] [--out=<file>]   S from the reference arm alone at the base cell, 3b's seed block
//   node harness3b.mjs episode --candidate=<path> --persona=<id> --seed=<n> [--cell=interleave:base]   the hash only
//   node harness3b.mjs cells                                 the cell list with each cell's role in the outcome
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, EPISODE2, CRITERION2 } from "../c2/world2.mjs";
import { sd, seedsFromSd } from "../c2/scorer2.mjs";
import { runEpisode3, allCells3, cellByName3, catalog, REFERENCE_ARM } from "../c3/harness3.mjs";
import { E3 } from "../c3/world3.mjs";
import { loadCandidate, useCandidate, slotHarness } from "./slot.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, "..", "..", "..", "..", "..");
export const CRITERION3B_FILE = join(HERE, "..", "..", "2026-10-17-criterion-3b.md");
export const FIXTURES_DIR = join(HERE, "fixtures");
export const FIXTURE = join(FIXTURES_DIR, "fixture-default-order.ts");
export const CANDIDATE_PATH = "company/personalization/policies/reachable-v2.ts"; // batch 5 §2 "The candidate's home"; v2 replaces retired v1 (batch 5 §11.1, K6)
const sha = (s) => createHash("sha256").update(s).digest("hex");

// ---------------- criterion 3b constants (§2, §3) ----------------
export const BASE_CELL_3B = "interleave:base";          // §2.1, named before any score
export const CANDIDATE_ARM = "candidate+fixed";          // label in results; served by the slot's reachable branch
export const ORACLE_ARM = "reachable+fixed";             // criterion 3's oracle, reported beside (§2.4), base cells only
export const SEEDS_3B = { first: 40001, pilot: 500 };    // §3: a block disjoint from every earlier criterion's seeds
export const seedList3b = (S) => Array.from({ length: S }, (_, i) => SEEDS_3B.first + i);
/** The catalogue as criterion 3's world builds it (sim/catalog.mjs over the pilot meta.json and curriculum files). Its
 *  hash at b1ae294 (readout 3's commit), computed in K5 by loadCatalog() over `git archive b1ae294` of those files: equal to this tree's. */
export const CATALOG_SHA256_C3 = "27b535dada5d1f21a51f8d7a8be12da3324c60fa69a21ff8f822db30e5dc7872";
export const catalogSha = (cat = catalog()) => sha(JSON.stringify({ lessons: cat.lessons, defaultOrder: cat.defaultOrder, prereqsByConcept: cat.prereqsByConcept, pilotConcepts: [...cat.pilotConcepts].sort() }));

/**
 * Cells and their role in the outcome (§2.2). Criterion 3's cells, unchanged (cells3). One-at-a-time = one row moved from
 * the base cell: criterion 3's one-at-a-time cells in the interleave, and first:base (the placement row). The first
 * placement's E3 cells move two rows (placement and one E3 row), so they are reported, like the outer and corner cells.
 */
export function cells3b(e1 = E1, e3 = E3) {
  return allCells3(e1, e3).map((c) => ({ ...c,
    role: c.name === BASE_CELL_3B ? "base" : (c.kind === "one-at-a-time" && c.placement === "interleave") || c.name === "first:base" ? "one-at-a-time" : "reported" }));
}

// ---------------- the lock (§7) ----------------
export function header3b(file = CRITERION3B_FILE) {
  const t = readFileSync(file, "utf8");
  const f = (k) => { const m = t.match(new RegExp(`^${k}:\\s*(.+)$`, "m")); return m ? m[1].trim() : null; };
  return { status: f("status") ?? "missing", candidateSha256: (f("candidate sha256") ?? "").match(/[0-9a-f]{64}/)?.[0] ?? null,
    v3Record: (f("V3 record") ?? "").match(/company\/[^\s`)]+\.md/)?.[0] ?? null };
}
export const isFixture = (path) => !relative(FIXTURES_DIR, resolve(path)).startsWith("..");
/** Throws unless this candidate file may run now (fixtures: always). */
export function assertCandidateAllowed(path, file = CRITERION3B_FILE) {
  if (isFixture(path)) return { fixture: true };
  const h = header3b(file);
  const why = [];
  if (!/^frozen\b/.test(h.status)) why.push(`criterion 3b status is "${h.status}"`);
  if (!h.candidateSha256) why.push("no candidate sha256 in criterion 3b");
  else if (sha(readFileSync(path)) !== h.candidateSha256) why.push(`the file's sha256 is not criterion 3b's ${h.candidateSha256.slice(0, 12)}…`);
  if (!h.v3Record || !existsSync(join(ROOT, h.v3Record))) why.push("no V3 record (R3 accepted in writing) named in criterion 3b");
  if (why.length) throw new Error(`lock: refusing candidate ${path}: ${why.join("; ")} (criterion 3b §7)`);
  return { fixture: false, sha256: h.candidateSha256 };
}
export function assertOracleAllowed(file = CRITERION3B_FILE) {
  const st = header3b(file).status;
  if (!/^frozen\b/.test(st)) throw new Error(`lock: criterion 3b status is "${st}"; the oracle row runs only after the freeze (criterion 3b §7)`);
}

// ---------------- episodes ----------------
let SLOT = null, SLOT_PATH = null;
/** Load a candidate into this thread's slot (after the lock). Returns { cand, run } where run(args) is one episode. */
export async function candidateRunner(path, { lockFile = CRITERION3B_FILE } = {}) {
  assertCandidateAllowed(path, lockFile);
  if (!SLOT) SLOT = await slotHarness();
  const cand = await loadCandidate(path);
  if (SLOT_PATH && SLOT_PATH !== path) throw new Error("one candidate per thread");
  SLOT_PATH = path; useCandidate(cand);
  return { cand, run: (args) => SLOT.runEpisode3({ ...args, arm: "reachable+fixed" }) };
}
export const referenceEpisode = (args) => runEpisode3({ ...args, arm: REFERENCE_ARM });
export const oracleEpisode = (args) => runEpisode3({ ...args, arm: ORACLE_ARM });

// ---------------- CLI ----------------
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
function cmdSeeds() {
  const pilot = +arg("pilot", SEEDS_3B.pilot);
  const cell = cellByName3(BASE_CELL_3B);
  const cat = catalog();
  const H = EPISODE2.primaryHorizonDays;
  const seeds = seedList3b(pilot);
  const perPersona = {};
  for (const p of PERSONAS) {
    const R = seeds.map((s) => { const sc = referenceEpisode({ persona: p, seed: s, cell, cat }).score; return sc.nAll > 0 ? sc.K[H] / sc.nAll : NaN; });
    perPersona[p.id] = { sdR: sd(R), n: R.filter((x) => !Number.isNaN(x)).length, nan: R.filter((x) => Number.isNaN(x)).length };
  }
  const sdMax = Math.max(...Object.values(perPersona).map((x) => x.sdR));
  const S = seedsFromSd(sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap);
  const rec = {
    what: "S for criterion 3b from the reference arm (default-order + fixed, Feed.tsx interleave) alone at the base cell, on 3b's own seed block. SDs only; no mean, no other arm.",
    rule: "criterion 2 §1.4, unchanged: S = max(200, ceil((2.8·√2·sd_R/δ_min)²)), cap 2000; sd_R = largest per-persona SD of R_7 of the reference arm; pilot = the first 500 seeds of the block",
    e1Hash: sha(JSON.stringify(E1)), e3Hash: sha(JSON.stringify(E3)), catalogSha256: catalogSha(cat), cellName: BASE_CELL_3B, cell, pilotSeeds: `${seeds[0]}..${seeds.at(-1)}`,
    deltaMin: CRITERION2.deltaMin, perPersona, sdMax, S, seedList: `${SEEDS_3B.first}..${SEEDS_3B.first + S - 1}`, modelVersion: M.MODEL_VERSION,
  };
  const out = arg("out");
  if (out) writeFileSync(out, JSON.stringify(rec, null, 2) + "\n");
  console.log(JSON.stringify(rec, null, 2));
}
async function cmdEpisode() {
  const path = arg("candidate");
  if (!path) throw new Error("--candidate=<path> is required");
  const { run } = await candidateRunner(path);
  const persona = PERSONAS.find((p) => p.id === arg("persona", PERSONAS[0].id));
  console.log(run({ persona, seed: +arg("seed", SEEDS_3B.first), cell: cellByName3(arg("cell", BASE_CELL_3B)) }).hash);
}
function cmdCells() { for (const c of cells3b()) console.log(`${c.role}\t${c.kind}\t${c.name}`); }

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const f = { seeds: cmdSeeds, episode: cmdEpisode, cells: cmdCells }[process.argv[2]];
  if (!f) { console.error("usage: node harness3b.mjs seeds|episode|cells [options] (see header); the full run is run3b.mjs"); process.exit(2); }
  Promise.resolve().then(f).catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
