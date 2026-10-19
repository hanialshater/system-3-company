#!/usr/bin/env node
// The full criterion 3 run (K4). Refused unless criterion 3's status is `frozen` (freeze lock, harness3.mjs).
//   NODE_NO_WARNINGS=1 node company/personalization/eval/harness/c3/run3.mjs --seeds=<S> [--jobs=4] [--e3=<e3.json>]
//       [--placements=interleave,first] [--out=<dir>]
// owner: personalization-eval (Uma) · run: eval-k3-1017 (built; first used in K4) · criterion 3 §2 to §5
//
// Order: C3-ID1/ID2 and T5c (any failure stops the run) -> oracle-review theta per (persona, cell) on tuning seeds 5001-5100
// (criterion 2 §2.4's rule) -> every unit in worker threads -> validity of the reachable arm (T1 replay, RS1-RS6 on its
// own episodes) -> readings -> <out>/results.ndjson, verdicts.json, manifest.json. It writes no prose.
import { Worker } from "node:worker_threads";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, openSync, writeSync, closeSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, CRITERION2, EPISODE2 } from "../c2/world2.mjs";
import { judgePair2, headroom, interval, mean } from "../c2/scorer2.mjs";
import { assertScoringAllowed3, criterionStatus3, CRITERION3_FILE, allCells3, loadE3, REFERENCE_ARM, BASE_CELL, runEpisode3 } from "./harness3.mjs";
import { identityC2, identityFiles, t5Static3, reachableChecks, t1Replay3 } from "./checks3.mjs";
import { reachablePop, cellByName3 } from "./harness3.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const PLUMBING = process.argv.includes("--plumbing"); // runner self-check before the freeze: every arm served by the reference arm; readings meaningless
const impl = (arm) => (PLUMBING ? REFERENCE_ARM : arm);
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };

// Arms (criterion 3 §2). Ordering arms keep the fixed schedule; review rows keep the default order.
export const ORDERING = ["oracle-order+fixed", "oracle-new+fixed", "oracle-refresh+fixed", "reachable+fixed"];
export const REVIEW = ["default-order+none", "default-order+oracle-review"];
/** Which arms run in a cell: every cell runs the reference and the ordering arms; review rows run in every interleave
 *  cell and in first:base only (the revisits-first review rows are readout 2's world; §2.3). */
export const armsFor = (cell) => [REFERENCE_ARM, ...ORDERING, ...(cell.placement === "interleave" || cell.kind === "base" ? REVIEW : [])];

async function runUnits(list, e3, jobs) {
  const results = new Array(list.length);
  let next = 0;
  const worker = () => new Promise((res, rej) => {
    const w = new Worker(join(HERE, "run3-worker.mjs"), { env: { ...process.env, NODE_NO_WARNINGS: "1" } });
    const feed = () => { if (next >= list.length) { w.terminate().then(res); return; } const i = next++; w.postMessage({ i, unit: list[i], e3 }); };
    w.on("message", ({ i, scores, error }) => { results[i] = error ? { error } : scores; feed(); });
    w.on("error", rej);
    feed();
  });
  await Promise.all(Array.from({ length: Math.max(1, jobs) }, worker));
  return results;
}

async function main() {
  const e3 = loadE3(arg("e3"));
  const S = +arg("seeds");
  if (!S) throw new Error("--seeds=S is required (the S written in criterion 3 §1.4)");
  assertScoringAllowed3([...ORDERING, ...REVIEW.map((a) => (a.endsWith("oracle-review") ? a + "@0.5" : a))].map(impl));
  const out = arg("out", join(HERE, "out")); mkdirSync(out, { recursive: true });
  const placements = arg("placements", "interleave,first").split(",");
  const C = CRITERION2, H = EPISODE2.primaryHorizonDays, jobs = +arg("jobs", 4), t0 = Date.now();
  const seeds = Array.from({ length: S }, (_, i) => C.seeds.first + i);
  const tuning = Array.from({ length: PLUMBING ? 2 : C.oracleReview.tuningSeeds.n }, (_, i) => C.oracleReview.tuningSeeds.first + i);

  const judge = { id1: PLUMBING ? identityC2({ cells: ["base"], seeds: [1001] }) : identityC2(), id2: identityFiles(), t5c: t5Static3() };
  if (!(judge.id1.ok && judge.id2.ok && judge.t5c.ok)) { writeFileSync(join(out, "judge-tests.json"), JSON.stringify(judge, null, 2)); throw new Error("C3-ID1/ID2/T5c failed: run stopped (eval defect)"); }

  const cells = allCells3(E1, e3).filter((c) => placements.includes(c.placement));
  // oracle-review theta (criterion 2 §2.4's rule, per cell where review rows run)
  const tuneList = [];
  for (const c of cells) if (armsFor(c).includes("default-order+oracle-review")) for (const p of PERSONAS) {
    tuneList.push({ cell: c.name, world: c.world, persona: p.id, arm: REFERENCE_ARM, seeds: tuning, tag: "ref" });
    for (const th of C.oracleReview.thetas) tuneList.push({ cell: c.name, world: c.world, persona: p.id, arm: impl(`default-order+oracle-review@${th}`), seeds: tuning, tag: th });
  }
  const tuned = await runUnits(tuneList, e3, jobs);
  const theta = {};
  for (const [i, u] of tuneList.entries()) if (u.tag === "ref") {
    const ref = tuned[i]; let best = C.oracleReview.thetas[0], bestR = -Infinity;
    for (const th of C.oracleReview.thetas) { const s = tuned[tuneList.findIndex((v) => v.cell === u.cell && v.persona === u.persona && v.tag === th)]; const r = mean(s.map((x, k) => x.K[H] / ref[k].nAll)); if (r > bestR + 1e-12) { best = th; bestR = r; } }
    (theta[u.cell] ??= {})[u.persona] = best;
  }
  const list = [];
  for (const c of cells) for (const arm of armsFor(c)) for (const p of PERSONAS) {
    const implArm = arm === "default-order+oracle-review" ? `${arm}@${theta[c.name][p.id]}` : arm;
    list.push({ cell: c.name, kind: c.kind, placement: c.placement, world: c.world, arm: impl(implArm), label: arm, persona: p.id, seeds });
  }
  const scores = await runUnits(list, e3, jobs);
  const R = {}; const errors = {};
  list.forEach((u, i) => { if (scores[i]?.error) errors[`${u.cell}|${u.label}|${u.persona}`] = scores[i].error; else ((R[u.cell] ??= {})[u.label] ??= {})[u.persona] = scores[i]; });

  // Validity of the reachable arm: T1 (two processes) and RS1-RS6 on its own inputs in two episodes per placement base.
  const validity = { T1: [], RS: [] };
  if (!PLUMBING) for (const pl of placements) for (const persona of ["curious-newcomer", "returning-expert"]) {
    validity.T1.push({ cell: `${pl}:base`, persona, ...t1Replay3({ persona, seed: seeds[0], cell: `${pl}:base`, arm: "reachable+fixed" }) });
    let prev = null; const fails = [];
    runEpisode3({ persona: PERSONAS.find((p) => p.id === persona), arm: "reachable+fixed", seed: seeds[0], cell: cells.find((c) => c.name === `${pl}:base`).world, e3,
      onReachable: (inp) => { const r = reachableChecks(inp, popOf(pl, e3), prev); if (!r.ok) fails.push(r); prev = inp; } });
    validity.RS.push({ cell: `${pl}:base`, persona, ok: fails.length === 0, fails: fails.slice(0, 3) });
  }
  const reachableInvalid = !validity.T1.every((x) => x.ok) || !validity.RS.every((x) => x.ok) || Object.keys(errors).some((k) => k.split("|")[1] === "reachable+fixed");

  // Readings (criterion 3 §2): wins-only readings for the oracles; harms and ordering guardrails reported beside.
  const ref = (cell) => R[cell][REFERENCE_ARM];
  const pair = (cell, a, g = "ordering", h = H) => judgePair2({ a: R[cell][a], b: ref(cell), ref: ref(cell), C, H: h, guardrails: g });
  const verdicts = { rule3: null, ordering: {}, o1: {}, review: {}, horizons: {}, descriptive: {} };
  for (const c of cells) {
    for (const a of ORDERING) (verdicts.ordering[a] ??= {})[c.name] = pair(c.name, a);
    // O1 split: per persona, Δ_full, Δ_new, Δ_refresh and the interaction Δ_full − Δ_new − Δ_refresh, per seed paired
    verdicts.o1[c.name] = Object.fromEntries(PERSONAS.map((p) => {
      const d = (a) => R[c.name][a][p.id].map((s, i) => (s.K[H] - ref(c.name)[p.id][i].K[H]) / ref(c.name)[p.id][i].nAll);
      const f = d("oracle-order+fixed"), n = d("oracle-new+fixed"), r = d("oracle-refresh+fixed");
      return [p.id, { full: interval(f), newOnly: interval(n), refreshOnly: interval(r), interaction: interval(f.map((x, i) => x - n[i] - r[i])) }];
    }));
    if (R[c.name]["default-order+none"]) verdicts.review[c.name] = { none: pair(c.name, "default-order+none", "review"), oracleReview: pair(c.name, "default-order+oracle-review", "review") };
    if (c.kind === "base") {
      verdicts.horizons[c.name] = Object.fromEntries(EPISODE2.horizonsDays.map((h) => [h, Object.fromEntries(Object.keys(R[c.name]).filter((a) => a !== REFERENCE_ARM).map((a) => [a, pair(c.name, a, "none", h).rows.map((x) => ({ persona: x.persona, R: x.R }))]))]));
      verdicts.descriptive[c.name] = Object.fromEntries(Object.entries(R[c.name]).map(([a, byP]) => [a, Object.fromEntries(Object.entries(byP).map(([p, ss]) => [p, Object.fromEntries(
        ["nNew", "revisits", "revisitShare", "cards", "reveal", "movedShare", "R1d"].map((k) => [k, mean(ss.map((s) => s[k]))]).concat(Object.keys(ss[0].extra).map((k) => [k, mean(ss.map((s) => s.extra[k]))])))]))]));
    }
  }
  if (R[BASE_CELL]) {
    const j = verdicts.ordering["reachable+fixed"][BASE_CELL];
    verdicts.rule3 = { cell: BASE_CELL, wins: j.wins, reading: reachableInvalid ? "INVALID" : headroom(j, C) === "HEADROOM" ? "REACHABLE" : "NOT-REACHABLE",
      note: "pre-commitment 3 reads this field: REACHABLE = wins (lo > 0 and Δ ≥ δ_min) in at least 4 of 6 personas in criterion 3's base cell" };
  }
  let commit = "unknown"; try { commit = execSync("git rev-parse HEAD", { cwd: HERE, encoding: "utf8" }).trim(); } catch {}
  const files = ["harness3.mjs", "learner3.mjs", "world3.mjs", "reachable-oracle.mjs", "checks3.mjs", "run3.mjs", "run3-worker.mjs",
    "../c2/harness2.mjs", "../c2/learner2.mjs", "../c2/scorer2.mjs", "../c2/world2.mjs", "../harness.mjs", "../personas.copy.mjs", "../../../model/model.ts", "../../../model/sim/composer.ts", "../../../model/sim/catalog.mjs"];
  const manifest = { plumbing: PLUMBING, criterionStatus: criterionStatus3(), criterionSha256: sha(readFileSync(CRITERION3_FILE)), e1Sha256: sha(JSON.stringify(E1)), e3Sha256: sha(JSON.stringify(e3)), e3,
    commit, node: process.version, S, seedList: `${seeds[0]}..${seeds.at(-1)}`, tuningSeeds: `${tuning[0]}..${tuning.at(-1)}`, placements, oracleReviewTheta: theta,
    modelVersion: M.MODEL_VERSION, fileSha256: Object.fromEntries(files.map((f) => [f, sha(readFileSync(join(HERE, f)))])), errors, seconds: (Date.now() - t0) / 1000 };
  writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  const fd = openSync(join(out, "results.ndjson"), "w");
  for (const u of list) { const sc = R[u.cell]?.[u.label]?.[u.persona]; if (sc) writeSync(fd, JSON.stringify({ cell: u.cell, arm: u.label, implArm: u.arm, persona: u.persona, scores: sc }) + "\n"); }
  closeSync(fd);
  writeFileSync(join(out, "verdicts.json"), JSON.stringify({ judge, validity, reachableInvalid, ...verdicts }, null, 2) + "\n");
  console.log(`done in ${manifest.seconds}s; wrote ${out}/manifest.json, results.ndjson, verdicts.json`);
}
const popOf = (pl, e3) => reachablePop(E1, e3, cellByName3(`${pl}:base`, E1, e3));

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
