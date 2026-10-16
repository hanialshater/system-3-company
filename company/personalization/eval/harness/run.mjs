#!/usr/bin/env node
// The full phase A criterion run (C4). Refused unless the criterion's status is `frozen` (freeze lock, harness.mjs).
//   NODE_NO_WARNINGS=1 node company/personalization/eval/harness/run.mjs --seeds=<S> [--jobs=4] [--inputs=<b2.json>] [--out=<dir>]
//   ... run.mjs --seeds=3 --plumbing --out=<tmp>   runner self-check before the freeze: every policy served by a fixture
// owner: personalization-eval (Uma) · run: eval-c1-1016 (built; first used in C4) · criterion §2 to §5
//
// Order: T5-T7 (judge; any failure stops the run) -> episodes for every unit (cell × policy × persona, S seeds each, in
// `jobs` worker threads; results do not depend on jobs) -> T1-T4 per policy (a failure makes it INVALID) -> the
// criterion rule -> <out>/results.json (every episode score), <out>/verdicts.json (per pair and per term), and
// <out>/manifest.json (criterion hash, inputs hash, file hashes, commit, node version, seed list).
// It writes no prose: the readout (company/personalization/eval/2026-10-16-phase-a-readout-1.md) is written from verdicts.json.
//
// Units per cell kind (the criterion's pairs; set in C1 before any score):
//   base, one-at-a-time: every POLICIES entry (model.ts)          -> GAM vs default-order, GAM vs draft-rules (pass), per-term breadth (base)
//   corner:              default-order, draft-rules, gam          -> reported only
//   novelty (-0.05/0/+0.05): gam, gam-no-surprise-novelty        -> per-term novelty (the VP's request; kill rule reads benefit 0)
//   rho (0 / 0.5 / 1 × surprise base / high): gam, gam-surprise-on -> per-term surprise (only the surprise term differs)
import { Worker } from "node:worker_threads";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../model/model.ts";
import { PERSONAS } from "./personas.copy.mjs";
import { CRITERION, cells } from "./world-inputs.mjs";
import { assertScoringAllowed, criterionStatus, loadInputs, CRITERION_FILE, ALL_POLICIES, cellByName } from "./harness.mjs";
import { t1Replay, pickChecks, t5Static, t6Dynamic, t7Forgetting0, t7Prereq0, t7Surprise0 } from "./checks.mjs";
import { judgeCell, outcome, paired, mean } from "./scorer.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };

export const GAM_VARIANTS_UNDER_T4 = ["gam", "gam-no-surprise-novelty", "gam-no-breadth", "gam-surprise-on"];

export function units(b2) {
  const out = [];
  for (const c of cells(b2)) {
    const pols = c.kind === "base" || c.kind === "one-at-a-time" ? [...M.POLICIES]
      : c.kind === "corner" ? ["default-order", "draft-rules", "gam"]
        : c.kind === "novelty" ? ["gam", "gam-no-surprise-novelty"]
          : ["gam", "gam-surprise-on"];
    for (const policy of pols) for (const p of PERSONAS) out.push({ cell: c.name, kind: c.kind, world: c.world, policy, persona: p.id });
  }
  return out;
}

// --plumbing: every policy name is served by the fixture "fixture-explained-default" (the default order with an explained
// term). It exercises units, workers, T1-T4, the rule and the output files on a run where no policy under test exists,
// so the runner can be checked before the freeze. Its verdicts are meaningless by construction (every delta is 0).
const PLUMBING = process.argv.includes("--plumbing");
export const impl = (policy) => (PLUMBING ? "fixture-explained-default" : policy);

async function runUnits(list, seeds, b2, jobs) {
  const results = new Array(list.length);
  let next = 0;
  const worker = () => new Promise((resolve, reject) => {
    const w = new Worker(join(HERE, "run-worker.mjs"), { env: { ...process.env, NODE_NO_WARNINGS: "1" } });
    const feed = () => {
      if (next >= list.length) { w.terminate().then(resolve); return; }
      const i = next++;
      w.postMessage({ i, unit: { ...list[i], policy: impl(list[i].policy) }, seeds, b2 });
    };
    w.on("message", ({ i, scores }) => { results[i] = scores; feed(); });
    w.on("error", reject);
    feed();
  });
  await Promise.all(Array.from({ length: Math.max(1, jobs) }, worker));
  return results;
}

async function main() {
  const b2 = loadInputs(arg("inputs"));
  const S = +arg("seeds");
  if (!S) throw new Error("--seeds=S is required (the S written in the criterion)");
  const policies = [...ALL_POLICIES];
  assertScoringAllowed(policies.map(impl));
  const out = arg("out", join(HERE, "out"));
  mkdirSync(out, { recursive: true });
  const seeds = Array.from({ length: S }, (_, i) => CRITERION.seeds.first + i);

  // Judge tests first (T5-T7). A failure stops the run: it is the eval's defect, not a policy's.
  const base = cellByName("base", b2);
  const judge = { t5: t5Static(), t6: PERSONAS.map((p) => t6Dynamic({ persona: p, seed: seeds[0], cellWorld: base })),
    t7: { a: t7Forgetting0(), b: t7Prereq0(), c: t7Surprise0() } };
  const judgeOk = judge.t5.ok && judge.t6.every((x) => x.ok) && judge.t7.a.ok && judge.t7.b.ok && judge.t7.c.ok;
  if (!judgeOk) { writeFileSync(join(out, "judge-tests.json"), JSON.stringify(judge, null, 2)); throw new Error("T5-T7 failed: run stopped (eval defect); see judge-tests.json"); }

  const list = units(b2);
  const t0 = Date.now();
  const scores = await runUnits(list, seeds, b2, +arg("jobs", 4));
  const R = {}; // cell -> policy -> persona -> score[]
  list.forEach((u, i) => { ((R[u.cell] ??= {})[u.policy] ??= {})[u.persona] = scores[i]; });

  // T1-T4 per policy under test (base cell; gam-surprise-on at rho = RHO_AGREEMENT, surprise high).
  const validity = {};
  for (const policy of policies) {
    const cellName = policy === "gam-surprise-on" ? `rho-${CRITERION.rhoAgreement.value}-surprise-high` : "base";
    const world = cellByName(cellName, b2);
    const t1 = ["curious-newcomer", "returning-expert"].map((persona) => t1Replay({ persona, seed: seeds[0], cell: cellName, policy: impl(policy) }));
    const picks = PERSONAS.map((p) => pickChecks({ persona: p, seed: seeds[0], cell: world, policy: impl(policy), t4: GAM_VARIANTS_UNDER_T4.includes(policy) }));
    const ok = { T1: t1.every((x) => x.ok), T2: picks.every((x) => x.t2.ok), T3: picks.every((x) => x.t3.ok), T4: picks.every((x) => x.t4.ok) };
    validity[policy] = { ok, invalid: !Object.values(ok).every(Boolean), t1, picks: picks.map((x) => ({ t2: x.t2, t3: x.t3, t4: x.t4 })) };
  }

  // The criterion rule.
  const C = CRITERION;
  const oat = cells(b2).filter((c) => c.kind === "one-at-a-time").map((c) => c.name);
  const pairs = {};
  for (const baseline of ["default-order", "draft-rules"]) {
    const byCell = {};
    for (const cell of ["base", ...oat]) byCell[cell] = judgeCell({ gam: R[cell].gam, base: R[cell][baseline], dflt: R[cell]["default-order"], C });
    const oatBeats = Object.fromEntries(oat.map((c) => [c, byCell[c].beats]));
    pairs[`gam vs ${baseline}`] = { outcome: outcome({ invalid: validity.gam.invalid || validity[baseline].invalid, baseBeats: byCell.base.beats, oatBeats }), byCell };
  }
  const perTerm = {
    "breadth: gam vs gam-no-breadth (base)": judgeCell({ gam: R.base.gam, base: R.base["gam-no-breadth"], dflt: R.base["default-order"], C, withGuardrails: false }),
  };
  for (const c of cells(b2).filter((x) => x.kind === "novelty")) perTerm[`novelty: gam vs gam-no-surprise-novelty (${c.name})`] = judgeCell({ gam: R[c.name].gam, base: R[c.name]["gam-no-surprise-novelty"], dflt: null, C, withGuardrails: false });
  for (const c of cells(b2).filter((x) => x.kind === "rho")) perTerm[`surprise: gam-surprise-on vs gam (${c.name})`] = judgeCell({ gam: R[c.name]["gam-surprise-on"], base: R[c.name].gam, dflt: null, C, withGuardrails: false });
  const reference = {};
  for (const pol of ["random", "epsilon-greedy"]) reference[pol] = Object.fromEntries(PERSONAS.map((p) => [p.id, paired(R.base[pol][p.id].map((s) => s.R), R.base["default-order"][p.id].map((s) => s.R))]));
  const corners = {};
  for (const c of cells(b2).filter((x) => x.kind === "corner")) for (const baseline of ["default-order", "draft-rules"]) corners[`${c.name}: gam vs ${baseline}`] = judgeCell({ gam: R[c.name].gam, base: R[c.name][baseline], dflt: R[c.name]["default-order"], C });
  const descriptive = Object.fromEntries(Object.entries(R.base).map(([pol, byP]) => [pol, Object.fromEntries(Object.entries(byP).map(([p, ss]) => [p, {
    movedShare: mean(ss.map((s) => s.movedShare)), reveal: mean(ss.map((s) => s.reveal)), cards: mean(ss.map((s) => s.cards)),
    R_realised_minus_R: mean(ss.map((s) => s.R_realised - s.R)) }]))]));

  let commit = "unknown";
  try { commit = execSync("git rev-parse HEAD", { cwd: HERE, encoding: "utf8" }).trim(); } catch {}
  const files = ["harness.mjs", "learner.mjs", "scorer.mjs", "world-inputs.mjs", "personas.copy.mjs", "checks.mjs", "run.mjs", "run-worker.mjs",
    "../../model/model.ts", "../../model/sim/composer.ts", "../../model/sim/catalog.mjs"];
  const manifest = { plumbing: PLUMBING, criterionStatus: criterionStatus(), criterionSha256: sha(readFileSync(CRITERION_FILE)), inputsSha256: sha(JSON.stringify(b2)), inputs: b2,
    commit, node: process.version, S, seedList: `${seeds[0]}..${seeds.at(-1)}`, modelVersion: M.MODEL_VERSION, composer: M.COMPOSER.version,
    fileSha256: Object.fromEntries(files.map((f) => [f, sha(readFileSync(join(HERE, f)))])), seconds: (Date.now() - t0) / 1000 };
  writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  writeFileSync(join(out, "results.json"), JSON.stringify(R) + "\n");
  writeFileSync(join(out, "verdicts.json"), JSON.stringify({ judge, validity, pairs, perTerm, reference, corners, descriptive }, null, 2) + "\n");
  console.log(`done in ${manifest.seconds}s; wrote ${out}/{manifest,results,verdicts}.json`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
