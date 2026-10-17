#!/usr/bin/env node
// The full criterion 2 run (K2). Refused unless criterion 2's status is `frozen` (freeze lock, harness2.mjs).
//   NODE_NO_WARNINGS=1 node company/personalization/eval/harness/c2/run2.mjs --seeds=<S> --candidate=<path> [--jobs=4]
//       [--inputs=<e1.json>] [--kinds=base,one-at-a-time,corner] [--out=<dir>]
//   ... run2.mjs --seeds=3 --plumbing --out=<tmp>   runner self-check before the freeze: every arm served by fixtures
// owner: personalization-eval (Uma) · run: eval-k1-1016 (built; first used in K2) · criterion 2 §2 to §5
//
// Order: T5-T9 (judge; any failure stops the run) -> oracle-review threshold chosen per (persona, cell) on the tuning
// seeds (criterion 2 §2.4) -> episodes for every unit (cell x arm x persona, S seeds each, in worker threads; results do
// not depend on jobs) -> T1-T4 / R1-R4 per arm under test (a failure makes it INVALID) -> the criterion rule ->
// <out>/results.ndjson (K2: one line per unit), <out>/verdicts.json, <out>/manifest.json. It writes no prose; the readout is written from verdicts.
import { Worker } from "node:worker_threads";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, openSync, writeSync, closeSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { CRITERION2, EPISODE2, cells2 } from "./world2.mjs";
import { assertScoringAllowed2, criterionStatus2, loadInputs2, CRITERION2_FILE, cellByName2, parseArm, REFERENCE_ARM, gamFingerprint, GAM_FROZEN_VERSION, loadCandidate } from "./harness2.mjs";
import { t1Replay2, pickChecks2, reviewChecks, t5Static2, t6Dynamic2, t7aForgetting0, t7bPrereq0, t7cLag, t7dReadPure, t7eLuckyGuess, t7fShapeSpread, t7gGuessNoStrengthen, t7hPrehistoryLaw, t8InputShape, t9FixedCopy } from "./checks2.mjs";
import { judgePair2, outcome2, headroom, interval, mean } from "./scorer2.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const PLUMBING = process.argv.includes("--plumbing");

// The arms (criterion 2 §2). Ordering arms keep the fixed schedule; review arms keep the default order.
export const ORDER_ARMS = ["default-order+fixed", "draft-rules+fixed", "random+fixed", "gam+fixed", "oracle-order+fixed"];
export const REVIEW_ARMS = ["default-order+none", "default-order+oracle-review", "default-order+candidate"];
export const CORNER_ARMS = ["default-order+fixed", "draft-rules+fixed", "gam+fixed", "oracle-order+fixed", "default-order+oracle-review", "default-order+candidate"];
/** Plumbing: every non-reference part is a fixture (the default order, or the fixed-schedule copy). Verdicts meaningless. */
export const impl = (arm) => {
  if (!PLUMBING) return arm;
  const { review } = parseArm(arm);
  return review === "fixed" ? "default-order+fixed" : "default-order+fixture-review-fixedcopy";
};

export function units(e1, kinds = null) {
  const out = [];
  for (const c of cells2(e1)) {
    if (kinds && !kinds.includes(c.kind)) continue;
    const arms = c.kind === "corner" ? CORNER_ARMS : [...ORDER_ARMS, ...REVIEW_ARMS];
    for (const arm of arms) for (const p of PERSONAS) out.push({ cell: c.name, kind: c.kind, world: c.world, arm, persona: p.id });
  }
  return out;
}

async function runUnits(list, e1, jobs, candidate) {
  const results = new Array(list.length);
  let next = 0;
  const worker = () => new Promise((res, rej) => {
    const w = new Worker(join(HERE, "run2-worker.mjs"), { env: { ...process.env, NODE_NO_WARNINGS: "1" } });
    const feed = () => {
      if (next >= list.length) { w.terminate().then(res); return; }
      const i = next++;
      w.postMessage({ i, unit: list[i], e1, candidate });
    };
    w.on("message", ({ i, scores, error }) => { results[i] = error ? { error } : scores; feed(); });
    w.on("error", rej);
    feed();
  });
  await Promise.all(Array.from({ length: Math.max(1, jobs) }, worker));
  return results;
}

async function main() {
  const e1 = loadInputs2(arg("inputs"));
  const S = +arg("seeds");
  if (!S) throw new Error("--seeds=S is required (the S written in criterion 2)");
  const candidate = arg("candidate") ? resolve(arg("candidate")) : null;
  const allArms = [...new Set([...ORDER_ARMS, ...REVIEW_ARMS])];
  assertScoringAllowed2(allArms.map(impl));
  if (!PLUMBING) {
    if (!candidate) throw new Error("--candidate=<path> is required (criterion 2 records it before the freeze)");
    await loadCandidate(candidate);
    if (M.MODEL_VERSION !== GAM_FROZEN_VERSION) throw new Error(`the GAM must be ${GAM_FROZEN_VERSION} as frozen (pre-commitment 1); model is ${M.MODEL_VERSION}`);
  }
  const out = arg("out", join(HERE, "out"));
  mkdirSync(out, { recursive: true });
  const C = CRITERION2;
  const seeds = Array.from({ length: S }, (_, i) => C.seeds.first + i);
  const tuning = Array.from({ length: PLUMBING ? 2 : C.oracleReview.tuningSeeds.n }, (_, i) => C.oracleReview.tuningSeeds.first + i); // plumbing: 2
  const jobs = +arg("jobs", 4);
  const t0 = Date.now();

  // Judge tests (T5-T9). A failure stops the run: the eval's defect.
  const base = cellByName2("base", e1);
  const judge = { t5: t5Static2(), t6: PERSONAS.map((p) => t6Dynamic2({ persona: p, seed: seeds[0], cellWorld: base })),
    t7: { a: t7aForgetting0(), b: t7bPrereq0(), c: t7cLag(), d: t7dReadPure(), e: t7eLuckyGuess(), f: t7fShapeSpread(), g: t7gGuessNoStrengthen(), h: t7hPrehistoryLaw() },
    t8: t8InputShape({ persona: PERSONAS[0], seed: seeds[0], cellWorld: base }),
    t9: PERSONAS.map((p) => t9FixedCopy({ persona: p, seed: seeds[0], cellWorld: base })) };
  const judgeOk = judge.t5.ok && judge.t6.every((x) => x.ok) && Object.values(judge.t7).every((x) => x.ok) && judge.t8.ok && judge.t9.every((x) => x.ok);
  if (!judgeOk) { writeFileSync(join(out, "judge-tests.json"), JSON.stringify(judge, null, 2)); throw new Error("T5-T9 failed: run stopped (eval defect); see judge-tests.json"); }

  const kinds = arg("kinds") ? arg("kinds").split(",") : null;
  const list = units(e1, kinds);
  const cellsRun = [...new Set(list.map((u) => u.cell))];

  // Oracle review threshold per (persona, cell), chosen on the tuning seeds by mean R_7 against the reference (§2.4).
  const tuneList = [];
  for (const cell of cellsRun) for (const p of PERSONAS) {
    const world = cellByName2(cell, e1);
    tuneList.push({ cell, world, persona: p.id, arm: impl(REFERENCE_ARM), seeds: tuning, tag: "ref" });
    for (const th of C.oracleReview.thetas) tuneList.push({ cell, world, persona: p.id, arm: PLUMBING ? impl("default-order+oracle-review") : `default-order+oracle-review@${th}`, seeds: tuning, tag: th });
  }
  const tuned = await runUnits(tuneList, e1, jobs, candidate);
  const theta = {};
  for (const cell of cellsRun) for (const p of PERSONAS) {
    const at = (tag) => tuned[tuneList.findIndex((u) => u.cell === cell && u.persona === p.id && u.tag === tag)];
    const ref = at("ref");
    let best = C.oracleReview.thetas[0], bestR = -Infinity;
    for (const th of C.oracleReview.thetas) { const r = mean(at(th).map((s, i) => s.K[EPISODE2.primaryHorizonDays] / ref[i].nAll)); if (r > bestR + 1e-12) { best = th; bestR = r; } }
    (theta[cell] ??= {})[p.id] = best;
  }

  // The scored units.
  const runList = list.map((u) => {
    let arm = u.arm;
    if (arm === "default-order+oracle-review") arm = PLUMBING ? impl(arm) : `default-order+oracle-review@${theta[u.cell][u.persona]}`;
    else arm = impl(arm);
    return { ...u, implArm: arm, seeds };
  });
  const scores = await runUnits(runList.map((u) => ({ ...u, arm: u.implArm })), e1, jobs, candidate);
  const R = {}; const errors = {};
  runList.forEach((u, i) => { if (scores[i]?.error) errors[`${u.cell}|${u.arm}|${u.persona}`] = scores[i].error; else ((R[u.cell] ??= {})[u.arm] ??= {})[u.persona] = scores[i]; });

  // Validity per arm under test (base cell, seed 1001): T1 (2 personas), T2-T4 on order rules, R1-R4 on the candidate.
  const validity = {};
  for (const arm of ["draft-rules+fixed", "random+fixed", "gam+fixed", "default-order+candidate"]) {
    const a = impl(arm);
    const t1 = ["curious-newcomer", "returning-expert"].map((persona) => t1Replay2({ persona, seed: seeds[0], arm: a, candidate: a.endsWith("+candidate") ? candidate : null }));
    const { review } = parseArm(a);
    const ok = { T1: t1.every((x) => x.ok) };
    let detail = {};
    if (review === "candidate") {
      const rc = PERSONAS.map((p) => reviewChecks({ persona: p, seed: seeds[0], cell: base, arm: a }));
      Object.assign(ok, { R1: rc.every((x) => x.r1.ok), R2R3: rc.every((x) => x.r2r3.ok), R4: rc.every((x) => x.r4.ok) });
      detail = rc;
    } else {
      const pc = PERSONAS.map((p) => pickChecks2({ persona: p, seed: seeds[0], cell: base, arm: a, t4: arm.startsWith("gam") }));
      Object.assign(ok, { T2: pc.every((x) => x.t2.ok), T3: pc.every((x) => x.t3.ok), T4: pc.every((x) => x.t4.ok) });
      detail = pc;
    }
    const scoredErr = Object.keys(errors).some((k) => k.split("|")[1] === arm);
    validity[arm] = { ok, invalid: scoredErr || !Object.values(ok).every(Boolean), t1, detail };
  }

  // The criterion rule (§2), at the primary horizon; every horizon reported.
  const H = EPISODE2.primaryHorizonDays;
  const oat = cells2(e1).filter((c) => c.kind === "one-at-a-time" && R[c.name]).map((c) => c.name);
  const ref = (cell) => R[cell][REFERENCE_ARM];
  const pair = (cell, a, b, guardrails, h = H) => judgePair2({ a: R[cell][a], b: R[cell][b], ref: ref(cell), C, H: h, guardrails });
  const verdicts = { headroom: {}, pairs: {}, reference: {}, horizons: {}, corners: {} };
  if (R.base) {
    // Headroom (pre-commitment 3; V2): wins only, base cell; every one-at-a-time cell reported.
    for (const [name, a, b] of [["ordering: oracle-order vs default-order", "oracle-order+fixed", REFERENCE_ARM], ["review: oracle-review vs fixed", "default-order+oracle-review", REFERENCE_ARM]]) {
      const byCell = Object.fromEntries(["base", ...oat].map((c) => [c, pair(c, a, b, "none")]));
      verdicts.headroom[name] = { reading: headroom(byCell.base, C), byCell };
    }
    // Pairs under the full rule (§2.1, §2.2).
    for (const [name, a, b, g, inv] of [
      ["gam vs default-order", "gam+fixed", REFERENCE_ARM, "ordering", ["gam+fixed"]],
      ["gam vs draft-rules", "gam+fixed", "draft-rules+fixed", "ordering", ["gam+fixed", "draft-rules+fixed"]],
      ["draft-rules vs default-order", "draft-rules+fixed", REFERENCE_ARM, "ordering", ["draft-rules+fixed"]],
      ["candidate vs fixed", "default-order+candidate", REFERENCE_ARM, "review", ["default-order+candidate"]],
    ]) {
      const byCell = Object.fromEntries(["base", ...oat].map((c) => [c, pair(c, a, b, g)]));
      verdicts.pairs[name] = { outcome: outcome2({ invalid: inv.some((x) => validity[x]?.invalid), baseBeats: byCell.base.beats, oatBeats: Object.fromEntries(oat.map((c) => [c, byCell[c].beats])) }), byCell };
    }
    // Reference rows, no rule.
    for (const a of ["random+fixed", "default-order+none"]) verdicts.reference[a] = Object.fromEntries(PERSONAS.map((p) => [p.id, interval(R.base[a][p.id].map((s, i) => (s.K[H] - ref("base")[p.id][i].K[H]) / ref("base")[p.id][i].nAll))]));
    // Every horizon, base cell, every arm vs the reference (and gam vs draft-rules).
    for (const h of EPISODE2.horizonsDays) verdicts.horizons[h] = Object.fromEntries(Object.keys(R.base).filter((a) => a !== REFERENCE_ARM).map((a) => [a, pair("base", a, REFERENCE_ARM, "none", h).rows.map((r) => ({ persona: r.persona, R: r.R }))]));
  }
  for (const c of cells2(e1).filter((x) => x.kind === "corner" && R[x.name])) for (const a of CORNER_ARMS.filter((x) => x !== REFERENCE_ARM)) verdicts.corners[`${c.name}: ${a} vs fixed/default`] = pair(c.name, a, REFERENCE_ARM, "none");
  const descriptive = Object.fromEntries(Object.entries(R.base ?? {}).map(([a, byP]) => [a, Object.fromEntries(Object.entries(byP).map(([p, ss]) => [p, {
    nNew: mean(ss.map((s) => s.nNew)), revisits: mean(ss.map((s) => s.revisits)), revisitShare: mean(ss.map((s) => s.revisitShare)), cards: mean(ss.map((s) => s.cards)),
    reveal: mean(ss.map((s) => s.reveal)), movedShare: mean(ss.map((s) => s.movedShare)), R1d: mean(ss.map((s) => s.R1d)),
    v4: { earlier: mean(ss.map((s) => s.v4.earlier)), same: mean(ss.map((s) => s.v4.same)), later: mean(ss.map((s) => s.v4.later)) } }]))]));

  let commit = "unknown";
  try { commit = execSync("git rev-parse HEAD", { cwd: HERE, encoding: "utf8" }).trim(); } catch {}
  const files = ["harness2.mjs", "learner2.mjs", "scorer2.mjs", "world2.mjs", "checks2.mjs", "run2.mjs", "run2-worker.mjs",
    "../harness.mjs", "../personas.copy.mjs", "../../../model/model.ts", "../../../model/sim/composer.ts", "../../../model/sim/catalog.mjs"];
  const manifest = { plumbing: PLUMBING, kinds: kinds ?? "all", criterionStatus: criterionStatus2(), criterionSha256: sha(readFileSync(CRITERION2_FILE)),
    inputsSha256: sha(JSON.stringify(e1)), inputs: e1, commit, node: process.version, S, seedList: `${seeds[0]}..${seeds.at(-1)}`,
    tuningSeeds: `${tuning[0]}..${tuning.at(-1)}`, oracleReviewTheta: theta, modelVersion: M.MODEL_VERSION, gamFingerprint: gamFingerprint(),
    candidate: candidate ? { path: candidate, sha256: sha(readFileSync(candidate)) } : null,
    fileSha256: Object.fromEntries(files.map((f) => [f, sha(readFileSync(join(HERE, f)))])), errors, seconds: (Date.now() - t0) / 1000 };
  writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  // K2: results as one JSON line per unit (cell, arm, persona) in run order. At S = 2000 a single JSON string of every
  // score exceeds V8's string limit; the line form holds the same numbers and is byte-comparable (R2).
  const fd = openSync(join(out, "results.ndjson"), "w");
  for (const u of runList) { const sc = R[u.cell]?.[u.arm]?.[u.persona]; if (sc) writeSync(fd, JSON.stringify({ cell: u.cell, arm: u.arm, implArm: u.implArm, persona: u.persona, scores: sc }) + "\n"); }
  closeSync(fd);
  writeFileSync(join(out, "verdicts.json"), JSON.stringify({ judge, validity, ...verdicts, descriptive }, null, 2) + "\n");
  console.log(`done in ${manifest.seconds}s; wrote ${out}/manifest.json, results.ndjson, verdicts.json`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
