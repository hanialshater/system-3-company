#!/usr/bin/env node
// Phase A simulator runner (W-1494, W-1504). Offline only, no dependencies, Node >= 22.18:
//   node company/personalization/model/sim/run.mjs                 # base table + sensitivity + traces
//   node company/personalization/model/sim/run.mjs --seeds=5 --no-sens   # quick smoke run
//   options: --seeds=N (default 20) --sens-seeds=N (10) --days=N (7) --no-sens --no-trace --out=DIR
//
// UNSCORED: there is no committed pass criterion (W-1496, analytics-steward). This prints numbers and
// draws no conclusion about which policy is better. The simulated learner and the scorer are PROVISIONAL
// placeholders by the builder (learner.ts, score.ts), to be replaced or owned by personalization-eval:
// the output is a smoke test, not evidence.
//
// Writes (gitignored, sim/.gitignore): <out>/results.json (every episode's score) and
// <out>/traces/<persona>.<policy>.seed<k>.json (W-1504 per-step traces, seed 1, gam and default-order).
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../model.ts";
import { PERSONAS, PERSONAS_VERSION } from "../personas.ts";
import { loadCatalog, STRENGTH_PLACEHOLDER } from "./catalog.mjs";
import { runEpisode, ALL_POLICIES, SIM } from "./simulate.mjs";
import { BASE_PARAMS } from "./learner.ts";
import { mean, sd } from "./score.ts";

const here = dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split("=")[1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const SEEDS = +arg("seeds", 20), SENS_SEEDS = +arg("sens-seeds", 10), DAYS = +arg("days", 7);
const OUT = arg("out", join(here, "out"));
const cat = loadCatalog();
const fails = M.checkModel();
if (fails.length) { console.error("model invariants fail:\n- " + fails.join("\n- ")); process.exit(1); }

const f = (x, d = 3) => (Number.isNaN(x) ? "  -  " : x.toFixed(d));
const pad = (s, n) => String(s).padEnd(n);
const run = (policy, persona, seed, params = BASE_PARAMS, trace = false) => runEpisode({ persona, policy, seed, params, cat, trace, days: DAYS });

console.log(`personalization phase A simulator · ${M.MODEL_VERSION} · ${PERSONAS_VERSION} · ${M.COMPOSER.version}`);
console.log(`catalog: ${cat.lessons.length} pilot lessons (probability + cs, published + review), ${cat.pilotConcepts.size} concepts`);
console.log(`misconceptionStrength: PLACEHOLDER (${STRENGTH_PLACEHOLDER.rule})`);
console.log(`episodes: ${DAYS} days + 1 revisit-only day, ≤${SIM.maxCardsPerDay} new cards/day, seeds 1..${SEEDS}`);
console.log("UNSCORED: no committed criterion (W-1496). Learner + scorer PROVISIONAL (personalization-eval to replace/own). Smoke test, not evidence.\n");

// 0. Replay test (AMD-008 P1): same inputs, same trace.
const a = JSON.stringify(run("gam", PERSONAS[0], 3, BASE_PARAMS, true)), b = JSON.stringify(run("gam", PERSONAS[0], 3, BASE_PARAMS, true));
console.log(`replay test (same seed twice, full trace): ${a === b ? "identical" : "DIFFERENT"}\n`);
if (a !== b) process.exit(1);

// 1. Base run: every policy × persona × seed.
const results = [];
const t0 = Date.now();
for (const policy of ALL_POLICIES) for (const p of PERSONAS) for (let s = 1; s <= SEEDS; s++) results.push(run(policy, p, s));
const metric = (rs, k) => mean(rs.map((r) => r.score[k]));
console.log(`TABLE 1 (UNSCORED; no committed criterion): base parameters, mean over ${PERSONAS.length} personas × ${SEEDS} seeds (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
console.log("recall = simulated first-revisit recall over ALL lessons completed; sd = across persona×seed episodes;");
console.log("concepts/domains = breadth; prereq1st = share of cards shown before an in-pilot prerequisite; reveal = reveal completion proxy;");
console.log("gain = concepts known at end − start (extra, ground truth, not in OBJECTIVE); moved = share of cards moved off the default order\n");
console.log(pad("policy", 26) + ["recall", "sd", "concepts", "domains", "prereq1st", "reveal", "gain", "moved"].map((h) => pad(h, 10)).join(""));
for (const policy of ALL_POLICIES) {
  const rs = results.filter((r) => r.policy === policy);
  console.log(pad(policy, 26) + [f(metric(rs, "recall")), f(sd(rs.map((r) => r.score.recall))), f(metric(rs, "concepts"), 1), f(metric(rs, "domains"), 2),
    f(metric(rs, "prereqFirst")), f(metric(rs, "reveal")), f(metric(rs, "gain"), 1), f(metric(rs, "movedShare"))].map((x) => pad(x, 10)).join(""));
}

console.log(`\nTABLE 2 (UNSCORED): simulated first-revisit recall by persona (mean over ${SEEDS} seeds; ± is the standard error)`);
const main = ["default-order", "draft-rules", "gam", "gam-no-surprise-novelty", "gam-no-breadth", "random", "epsilon-greedy"];
console.log(pad("persona", 24) + main.map((p) => pad(p.replace("gam-no-surprise-novelty", "gam-no-S/N"), 15)).join(""));
for (const p of PERSONAS) {
  console.log(pad(p.id, 24) + main.map((pol) => {
    const xs = results.filter((r) => r.policy === pol && r.persona === p.id).map((r) => r.score.recall);
    return pad(`${f(mean(xs))}±${f(sd(xs) / Math.sqrt(xs.length), 2).slice(1)}`, 15);
  }).join(""));
}

// 2. Sensitivity: the learner's parameters are guesses; show how the table moves.
const sens = [];
if (!flag("no-sens")) {
  const SC = {
    "base": {}, "forget ×0.5": { forgetScale: 0.5 }, "forget ×1.5": { forgetScale: 1.5 },
    "pull ×0.5": { pullScale: 0.5 }, "pull ×1.5": { pullScale: 1.5 },
    "prereq ×0.5": { prereqScale: 0.5 }, "prereq ×1.5": { prereqScale: 1.5 },
    "learnRate .4": { learnRate: 0.4 }, "learnRate .9": { learnRate: 0.9 },
    "surpriseBoost .3": { surpriseBoost: 0.3 }, "prereq 0 (order irrelevant)": { prereqScale: 0 },
  };
  const pols = ["default-order", "draft-rules", "gam", "gam-no-surprise-novelty", "random"];
  console.log(`\nTABLE 3 (UNSCORED): sensitivity of mean simulated recall to the PROVISIONAL learner's guessed parameters (${SENS_SEEDS} seeds × ${PERSONAS.length} personas)`);
  console.log("same seeds in every cell (common random numbers); 'order' ranks the five policies by mean recall in that scenario\n");
  console.log(pad("scenario", 28) + pols.map((p) => pad(p.replace("gam-no-surprise-novelty", "gam-no-S/N"), 15)).join("") + "gam−default  personas gam>default  order");
  for (const [name, over] of Object.entries(SC)) {
    const params = { ...BASE_PARAMS, ...over };
    const row = {};
    const perPersona = {};
    for (const pol of pols) {
      const rs = [];
      for (const p of PERSONAS) for (let s = 1; s <= SENS_SEEDS; s++) rs.push(run(pol, p, s, params));
      row[pol] = metric(rs, "recall");
      perPersona[pol] = Object.fromEntries(PERSONAS.map((p) => [p.id, metric(rs.filter((r) => r.persona === p.id), "recall")]));
    }
    const wins = PERSONAS.filter((p) => perPersona.gam[p.id] > perPersona["default-order"][p.id]).length;
    const order = [...pols].sort((x, y) => row[y] - row[x]).map((p) => p.replace("default-order", "D").replace("draft-rules", "R").replace("gam-no-surprise-novelty", "G-sn").replace("gam", "G").replace("random", "X")).join(">");
    console.log(pad(name, 28) + pols.map((p) => pad(f(row[p]), 15)).join("") + pad((row.gam - row["default-order"] >= 0 ? "+" : "") + f(row.gam - row["default-order"]), 13) + pad(`${wins}/6`, 21) + order);
    sens.push({ scenario: name, params, recall: row, perPersona });
  }
  console.log("\nlegend: D default-order, R draft-rules, G gam, G-sn gam-no-surprise-novelty, X random");
}

// 3. Outputs.
mkdirSync(join(OUT, "traces"), { recursive: true });
const round = (_k, v) => (typeof v === "number" ? Math.round(v * 1e4) / 1e4 : v);
writeFileSync(join(OUT, "results.json"), JSON.stringify({ unscored: "no committed criterion (W-1496)", provisional: "learner and scorer are builder placeholders",
  model: M.MODEL_VERSION, personas: PERSONAS_VERSION, days: DAYS, seeds: SEEDS, base: results, sensitivity: sens }, round));
if (!flag("no-trace")) {
  let bytes = 0;
  for (const p of PERSONAS) for (const pol of ["gam", "default-order", "draft-rules"]) {
    const r = run(pol, p, 1, BASE_PARAMS, true);
    // curve reasons live once in M.inspect(); per-step need terms drop the repeated `why` text
    for (const s of r.trace.steps) if (s.needs) for (const n of s.needs) for (const t of n.terms) delete t.why;
    r.trace.model = M.inspect();
    const txt = JSON.stringify(r.trace, round);
    bytes += txt.length;
    writeFileSync(join(OUT, "traces", `${p.id}.${pol}.seed1.json`), txt);
  }
  console.log(`\ntraces: ${PERSONAS.length * 3} files, ${(bytes / 1e6).toFixed(1)} MB in ${join(OUT, "traces")} (schema personalization-sim-trace-v0)`);
}
console.log(`results: ${join(OUT, "results.json")}`);
console.log("\nUNSCORED. No conclusion about which policy is better is drawn or supported: no criterion is committed (W-1496), and the learner is a builder placeholder.");
