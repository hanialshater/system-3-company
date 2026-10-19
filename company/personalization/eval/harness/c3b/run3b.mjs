#!/usr/bin/env node
// The criterion 3b run (K6): one candidate vs default-order + fixed in criterion 3's world.
//   NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=8192 node company/personalization/eval/harness/c3b/run3b.mjs \
//       --candidate=company/personalization/policies/reachable-v2.ts --seeds=<S> [--jobs=4] [--placements=interleave,first] --out=<dir>
//   Plumbing (any time; the fixture in the slot, the oracle row replaced by the reference arm; readings meaningless):
//   node company/personalization/eval/harness/c3b/run3b.mjs --plumbing --seeds=3 [--chain] --out=<dir>
// owner: personalization-eval (Uma) · run: eval-k5-1017 · criterion 3b §2 to §8
//
// Order: lock -> 3b-ID0, 3b-ID1, T5c (any failure stops the run: an eval defect) -> K-e gate (K6: a draft or retired
// lesson in dims stops the run before any score, batch 5 §13 R6) -> 3b-ID2 (reference arm at readout 3's
// seeds equals readout 3's reference rows; stops on failure) -> every unit in worker threads -> candidate validity V1-V10
// (any failure, or any candidate unit error, makes the candidate INVALID) -> the rule per cell, the outcome over the sweep,
// the reported rows -> <out>/results.ndjson, verdicts.json, manifest.json. It writes no prose.
import { Worker } from "node:worker_threads";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, openSync, writeSync, closeSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, CRITERION2, EPISODE2 } from "../c2/world2.mjs";
import { judgePair2, outcome2, mean } from "../c2/scorer2.mjs";
import { REFERENCE_ARM } from "../c3/harness3.mjs";
import { E3 } from "../c3/world3.mjs";
import { t5Static3 } from "../c3/checks3.mjs";
import { cells3b, seedList3b, header3b, assertCandidateAllowed, assertOracleAllowed, candidateRunner, CRITERION3B_FILE, FIXTURE, CANDIDATE_ARM, ORACLE_ARM,
  BASE_CELL_3B, CATALOG_SHA256_C3, catalogSha, ROOT } from "./harness3b.mjs";
import { identityFiles3b, identitySlot, chainReadout3, READOUT3_SEEDS, v1Static, callChecks, v3CrossProcess, v3Episode, v9Hash, v10Copy, COPY, inputFacts, tieOrderProbe, ratingProbe, keGate } from "./checks3b.mjs";
import { loadCandidate } from "./slot.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const PLUMBING = process.argv.includes("--plumbing");
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
/** K6 adds A1's sheet to the copy check's corpus at its commit (criterion 3b §4.2): --corpus-extra=<commit>:<path>[,…] */
const extraCorpus = () => (arg("corpus-extra", "") ? arg("corpus-extra").split(",").map((x) => { const [commit, ...p] = x.split(":"); return { commit, path: p.join(":") }; }) : []);

async function runUnits(list, jobs, candidatePath) {
  const results = new Array(list.length), ms = new Array(list.length);
  let next = 0;
  const worker = () => new Promise((res, rej) => {
    const w = new Worker(join(HERE, "run3b-worker.mjs"), { env: { ...process.env, NODE_NO_WARNINGS: "1" } });
    const feed = () => { if (next >= list.length) { w.terminate().then(res); return; } const i = next++; w.postMessage({ i, unit: list[i], candidatePath, plumbing: PLUMBING }); };
    w.on("message", ({ i, scores, error, ms: t }) => { results[i] = error ? { error } : scores; ms[i] = t; feed(); });
    w.on("error", rej);
    feed();
  });
  await Promise.all(Array.from({ length: Math.max(1, jobs) }, worker));
  return { results, ms };
}

/** Validity of the candidate (criterion 3b §4.1), on its own episodes' inputs: every base cell run, every persona, seed s0. */
async function validity(candidatePath, cells, s0, expectedSha) {
  const cand = await loadCandidate(candidatePath);
  const fresh = await loadCandidate(candidatePath, { fresh: "v7" });
  const { run } = await candidateRunner(candidatePath);
  const v = { V1: v1Static(cand.source), V9: v9Hash(cand, expectedSha), V10: v10Copy(cand.source, extraCorpus()), calls: [], V3call: [], V3episode: [], inputFacts: [], probes: [] };
  for (const c of cells.filter((x) => x.kind === "base")) {
    const byPersona = {};
    for (const p of PERSONAS) { const ins = []; run({ persona: p, seed: s0, cell: c.world, onReachable: (inp) => ins.push(inp) }); byPersona[p.id] = ins; }
    // §4.3: input facts K-a to K-d (first input of each persona) and the report-only probes (every input); never INVALID
    for (const p of PERSONAS) {
      const ins = byPersona[p.id];
      if (ins.length) v.inputFacts.push({ cell: c.name, persona: p.id, ...inputFacts(ins[0]) });
      const tie = ins.map((x) => tieOrderProbe(cand, x)), rat = ins.map((x) => ratingProbe(cand, x));
      v.probes.push({ cell: c.name, persona: p.id, inputs: ins.length, tiedPairs: tie.reduce((a, x) => a + x.tiedPairs, 0), tiedInDefaultOrder: tie.reduce((a, x) => a + x.inDefaultOrder, 0), tiedInOrderRule: tie.reduce((a, x) => a + x.inOrderRule, 0), ratingPermutationChangesRank: rat.filter((x) => x.changes).length });
    }
    for (const p of PERSONAS) {
      const ins = byPersona[p.id], other = byPersona[PERSONAS[(PERSONAS.indexOf(p) + 1) % PERSONAS.length].id];
      const fails = []; let n = 0;
      ins.forEach((inp, k) => { n++; const r = callChecks(cand, inp, { others: [other[k % Math.max(1, other.length)], ins[ins.length - 1 - k]].filter(Boolean), fresh }); if (!r.ok) fails.push({ k, ...r }); });
      v.calls.push({ cell: c.name, persona: p.id, inputs: n, ok: fails.length === 0, fails: fails.slice(0, 3) });
    }
    for (const pid of ["curious-newcomer", "returning-expert"]) {
      v.V3call.push({ cell: c.name, persona: pid, ...v3CrossProcess(cand, candidatePath, byPersona[pid]) });
      v.V3episode.push({ cell: c.name, persona: pid, ...v3Episode({ candidatePath, persona: pid, seed: s0, cell: c.name }) });
    }
  }
  v.ok = v.V1.ok && v.V9.ok && v.V10.ok && v.calls.every((x) => x.ok) && v.V3call.every((x) => x.ok) && v.V3episode.every((x) => x.ok);
  return { v, cand };
}

async function main() {
  const S = +arg("seeds");
  if (!S) throw new Error("--seeds=S is required (the S written in criterion 3b §3)");
  const candidatePath = PLUMBING ? FIXTURE : arg("candidate");
  if (!candidatePath) throw new Error("--candidate=<path> is required (or --plumbing)");
  const lock = assertCandidateAllowed(candidatePath);
  if (!PLUMBING) assertOracleAllowed();
  const out = arg("out", join(HERE, "out")); mkdirSync(out, { recursive: true });
  const placements = arg("placements", "interleave,first").split(",");
  const jobs = +arg("jobs", 4), C = CRITERION2, H = EPISODE2.primaryHorizonDays, t0 = Date.now();
  const seeds = seedList3b(S);

  // Judge checks (stop on failure)
  const judge = { id0: identityFiles3b(), id1: await identitySlot({ fixturePath: FIXTURE, ...(PLUMBING ? { cells: ["interleave:base", "first:base"], seeds: [1001] } : {}) }), t5c: t5Static3() };
  if (!(judge.id0.ok && judge.id1.ok && judge.t5c.ok)) { writeFileSync(join(out, "judge-tests.json"), JSON.stringify(judge, null, 2)); throw new Error("3b-ID0/ID1/T5c failed: run stopped (eval defect)"); }
  const cells = cells3b(E1, E3).filter((c) => placements.includes(c.placement));

  // K-e (K6, batch 5 §13 R6): before the first score, dims holds no draft or retired lesson; else stop and score nothing
  judge.ke = keGate(seeds);
  if (!judge.ke.ok) { writeFileSync(join(out, "judge-tests.json"), JSON.stringify(judge, null, 2)); throw new Error("K-e failed: dims holds a draft or retired lesson; run stopped before any score (report to vp-personalization)"); }

  // 3b-ID2: the reference arm at readout 3's seeds reproduces readout 3's reference rows (base cells of the placements run)
  let chain = { skipped: true };
  if (!PLUMBING || process.argv.includes("--chain")) {
    const s3 = READOUT3_SEEDS();
    const baseCells = cells.filter((c) => c.kind === "base");
    const cl = baseCells.flatMap((c) => PERSONAS.map((p) => ({ cell: c.name, world: c.world, arm: REFERENCE_ARM, persona: p.id, seeds: s3 })));
    const { results } = await runUnits(cl, jobs, candidatePath);
    const ref = {}; cl.forEach((u, i) => { (ref[u.cell] ??= {})[u.persona] = results[i]; });
    chain = chainReadout3(ref, baseCells.map((c) => c.placement));
    if (!chain.ok) { writeFileSync(join(out, "judge-tests.json"), JSON.stringify({ judge, chain }, null, 2)); throw new Error("3b-ID2 failed: the reference arm does not reproduce readout 3 (eval defect)"); }
  }

  // Units
  const armsFor = (c) => [REFERENCE_ARM, CANDIDATE_ARM, ...(c.kind === "base" ? [ORACLE_ARM] : [])];
  const list = [];
  for (const c of cells) for (const arm of armsFor(c)) for (const p of PERSONAS) list.push({ cell: c.name, role: c.role, kind: c.kind, placement: c.placement, world: c.world, arm, persona: p.id, seeds });
  const { results: scores, ms } = await runUnits(list, jobs, candidatePath);
  const R = {}, errors = {}, unitMs = {};
  list.forEach((u, i) => { if (scores[i]?.error) errors[`${u.cell}|${u.arm}|${u.persona}`] = scores[i].error; else ((R[u.cell] ??= {})[u.arm] ??= {})[u.persona] = scores[i]; (unitMs[u.arm] ??= []).push(ms[i]); });

  // Validity (criterion 3b §4.1)
  const expected = PLUMBING ? sha(readFileSync(FIXTURE)) : header3b().candidateSha256;
  const { v: valid, cand } = await validity(candidatePath, cells, seeds[0], expected);
  const candidateErrors = Object.keys(errors).filter((k) => k.split("|")[1] === CANDIDATE_ARM);
  const invalid = !valid.ok || candidateErrors.length > 0;

  // The rule per cell (criterion 2 §2.1 via judgePair2, ordering guardrails), the outcome, the reported rows
  const ok = (cell, a) => R[cell]?.[a] && Object.keys(R[cell][a]).length === PERSONAS.length;
  // judgePair2 unchanged; for ordering rows, the ratios G2 and G4 are judged on (lower end / reference mean, as judgePair2's
  // `rel`) are attached for display, so the formatter computes nothing.
  const pair = (cell, a, b, g, h = H) => {
    const j = judgePair2({ a: R[cell][a], b: R[cell][b], ref: R[cell][REFERENCE_ARM], C, H: h, guardrails: g });
    if (g === "ordering") for (const r of j.rows) {
      const m = (k) => mean(R[cell][REFERENCE_ARM][r.persona].map((s) => s[k]));
      const rel = (k) => (m(k) > 0 ? r.g[k].lo / m(k) : r.g[k].lo);
      r.rel = { G2: rel("g2Concepts"), G4: rel("g4Gain") };
    }
    return j;
  };
  const verdicts = { pair: { name: `${CANDIDATE_ARM} vs ${REFERENCE_ARM}`, byCell: {}, outcome: null }, reported: { oracle: {}, candidateVsOracle: {} }, horizons: {}, descriptive: {} };
  for (const c of cells) {
    if (ok(c.name, CANDIDATE_ARM) && ok(c.name, REFERENCE_ARM)) verdicts.pair.byCell[c.name] = { role: c.role, kind: c.kind, ...pair(c.name, CANDIDATE_ARM, REFERENCE_ARM, "ordering") };
    if (c.kind === "base" && ok(c.name, ORACLE_ARM)) {
      verdicts.reported.oracle[c.name] = pair(c.name, ORACLE_ARM, REFERENCE_ARM, "ordering");
      if (ok(c.name, CANDIDATE_ARM)) verdicts.reported.candidateVsOracle[c.name] = pair(c.name, CANDIDATE_ARM, ORACLE_ARM, "none");
    }
    if (c.kind === "base") {
      verdicts.horizons[c.name] = Object.fromEntries(EPISODE2.horizonsDays.map((h) => [h, Object.fromEntries([CANDIDATE_ARM, ORACLE_ARM].filter((a) => ok(c.name, a)).map((a) => [a, pair(c.name, a, REFERENCE_ARM, "none", h).rows.map((x) => ({ persona: x.persona, R: x.R }))]))]));
      verdicts.descriptive[c.name] = Object.fromEntries(Object.entries(R[c.name]).map(([a, byP]) => [a, Object.fromEntries(Object.entries(byP).map(([p, ss]) => [p, Object.fromEntries(
        ["nNew", "revisits", "revisitShare", "cards", "reveal", "movedShare", "R1d"].map((k) => [k, mean(ss.map((s) => s[k]))]).concat(Object.keys(ss[0].extra).map((k) => [k, mean(ss.map((s) => s.extra[k]))])))]))]));
    }
  }
  const byCell = verdicts.pair.byCell;
  const oat = cells3b(E1, E3).filter((c) => c.role === "one-at-a-time").map((c) => c.name);
  const complete = byCell[BASE_CELL_3B] && oat.every((c) => byCell[c]);
  verdicts.pair.outcome = complete || invalid
    ? outcome2({ invalid, baseBeats: !!byCell[BASE_CELL_3B]?.beats, oatBeats: Object.fromEntries(oat.map((c) => [c, !!byCell[c]?.beats])) })
    : { verdict: null, why: `incomplete: the outcome needs ${BASE_CELL_3B} and all ${oat.length} one-at-a-time cells (run both placements)` };
  verdicts.pair.reportedCellsNotBeaten = cells.filter((c) => c.role === "reported" && byCell[c.name] && !byCell[c.name].beats).map((c) => c.name);

  let commit = "unknown"; try { commit = execSync("git rev-parse HEAD", { cwd: HERE, encoding: "utf8" }).trim(); } catch {}
  const files = ["harness3b.mjs", "slot.mjs", "slot-shim.mjs", "checks3b.mjs", "copy-check.mjs", "run3b.mjs", "run3b-worker.mjs", "replay-child.mjs", "fixtures/fixture-default-order.ts",
    "../c3/harness3.mjs", "../c3/learner3.mjs", "../c3/world3.mjs", "../c3/reachable-oracle.mjs", "../c3/checks3.mjs", "../c2/harness2.mjs", "../c2/learner2.mjs", "../c2/scorer2.mjs", "../c2/world2.mjs",
    "../harness.mjs", "../personas.copy.mjs", "../../../model/model.ts", "../../../model/sim/composer.ts", "../../../model/sim/catalog.mjs"];
  const h3b = header3b();
  const manifest = { plumbing: PLUMBING, criterion3bStatus: h3b.status, criterion3bSha256: sha(readFileSync(CRITERION3B_FILE)), v3Record: h3b.v3Record,
    candidate: { path: relative(ROOT, candidatePath), sha256: cand.sha256, expectedSha256: expected, fixture: lock.fixture },
    criterion3Sha256: judge.id0.criterion3 ? JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-17-readout-3", "interleave", "manifest.json"), "utf8")).criterionSha256 : "MISMATCH",
    e1Sha256: sha(JSON.stringify(E1)), e3Sha256: sha(JSON.stringify(E3)), catalogSha256: catalogSha(), catalogExpected: CATALOG_SHA256_C3,
    commit, node: process.version, S, seedList: `${seeds[0]}..${seeds.at(-1)}`, placements, copyThresholds: COPY, corpusExtra: extraCorpus(), modelVersion: M.MODEL_VERSION,
    fileSha256: Object.fromEntries(files.map((f) => [f, sha(readFileSync(join(HERE, f)))])), errors,
    timing: Object.fromEntries(Object.entries(unitMs).map(([a, xs]) => [a, { unitMeanMs: mean(xs), perEpisodeMs: mean(xs) / S }])), seconds: (Date.now() - t0) / 1000 };
  writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  const fd = openSync(join(out, "results.ndjson"), "w");
  for (const u of list) { const sc = R[u.cell]?.[u.arm]?.[u.persona]; if (sc) writeSync(fd, JSON.stringify({ cell: u.cell, arm: u.arm, persona: u.persona, scores: sc }) + "\n"); }
  closeSync(fd);
  writeFileSync(join(out, "verdicts.json"), JSON.stringify({ judge, chain, validity: valid, candidateErrors, candidateInvalid: invalid, ...verdicts }, null, 2) + "\n");
  console.log(`done in ${manifest.seconds}s; wrote ${out}/manifest.json, results.ndjson, verdicts.json`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
