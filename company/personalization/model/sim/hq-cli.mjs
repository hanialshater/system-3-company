#!/usr/bin/env node
// JSON command line for the HQ simulation lab (W-1503, /hq/personalization). Offline, no dependencies,
// Node >= 22.18. owner: learner-model-engineer.
//
// The app never imports this folder (W-1498 decision: model/README.md "Where the model lives"). The HQ
// server spawns this file as a separate Node process and reads one JSON document from stdout. That keeps
// the model and the simulator free of app imports and out of the Next build, and gives the app exactly
// one contract: the documents below (schemas personalization-hq-*-v0 and the trace, personalization-sim-trace-v0).
//
//   node company/personalization/model/sim/hq-cli.mjs meta
//   node company/personalization/model/sim/hq-cli.mjs run --persona=<id> --policy=<name> --seed=<1..999> [--days=1..14]
//   node company/personalization/model/sim/hq-cli.mjs compare --persona=<id|all> [--seeds=1..10] [--set=main|all] [--days=1..14]
//   node company/personalization/model/sim/hq-cli.mjs saved --file=<persona>.<policy>.seed<k>.json   (a run.mjs trace in out/traces)
//   node company/personalization/model/sim/hq-cli.mjs sandbox --persona=<id> --variant=v1|v3|edpbase [--seed=1..999]
//        (model-v0.3.0: everything a browser needs to recompute detect() + one session compose without the model,
//         plus the CLI's own composed session for a drift test; schema personalization-hq-sandbox-v0; the algorithm
//         is sim/sandbox-reference.mjs)
// (model-v0.4.2: --variant=edpbase is gam-session-v3-edpbase, W-2003; its document adds session["v3-edpbase"] and session.edpBaseEdits.)
// Session policies (gam-session, gam-session-v3, gam-session-no-cov, gam-session-v3-edpbase) are in policies.all and policies.session, not in
// policies.model; their `run` trace schema is personalization-sim-trace-v1 (sim/README.md "Session policies").
//
// SIMULATED PERSONAS ONLY. Nothing here reads, or can be pointed at, real learner data: the only inputs are
// personas.ts, the lesson catalog (the pinned snapshot of meta.json + curriculum in ./catalog-pin/) and the arguments above.
// UNSCORED: no committed criterion (W-1496); the learner and scorer are PROVISIONAL (personalization-eval).
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../model.ts";
import { PERSONAS, PERSONAS_VERSION } from "../personas.ts";
import { loadCatalog, STRENGTH_PLACEHOLDER } from "./catalog.mjs";
import { runEpisode, ALL_POLICIES, GAM_VARIANTS, SIM, SESSION_VARIANTS, SANDBOX_VARIANTS, CIRCULAR_LABEL, sandboxDocument } from "./simulate.mjs";
import { BASE_PARAMS } from "./learner.ts";
import { mean, sd } from "./score.ts";

const here = dirname(fileURLToPath(import.meta.url));
const TRACES = join(here, "out", "traces");
// The pinned catalogue snapshot (company/personalization/2026-10-18-simulator-catalogue-pin.md), not the live tree.
// Read through the unchanged loadCatalog(root); review-timing.test.mjs (in npm run check) verifies the snapshot's hash.
const PIN_ROOT = join(here, "catalog-pin");
const loadPinnedCatalog = () => loadCatalog(PIN_ROOT);
const LABEL = {
  unscored: "UNSCORED: no committed criterion; provisional simulated learner",
  criterion: "none committed (W-1496)",
  provisional: "simulated learner and scorer are PROVISIONAL builder placeholders (learner.ts, score.ts); personalization-eval to replace or own them; smoke test, not evidence",
  simulatedOnly: "simulated personas only; no real learner data is read",
};
const round = (_k, v) => (typeof v === "number" ? (Number.isFinite(v) ? Math.round(v * 1e4) / 1e4 : null) : v);

function fail(msg) { process.stdout.write(JSON.stringify({ error: msg })); process.exit(2); }
const args = Object.fromEntries(process.argv.slice(3).map((a) => { const m = /^--([a-z]+)=(.*)$/.exec(a); return m ? [m[1], m[2]] : [a, ""]; }));
const int = (k, d, lo, hi) => { const v = args[k] === undefined ? d : Number(args[k]); if (!Number.isInteger(v) || v < lo || v > hi) fail(`--${k} must be an integer ${lo}..${hi}`); return v; };
const persona = (id) => PERSONAS.find((p) => p.id === id) ?? fail(`unknown persona ${id}`);
const policy = (p) => (ALL_POLICIES.includes(p) ? p : fail(`unknown policy ${p}`));
const fpOf = (p) => ({ version: "fp-v0", statedSubjects: [], lessOfThis: [], ...p.fingerprintMeans });
const savedFiles = () => (existsSync(TRACES) ? readdirSync(TRACES).filter((f) => /^[a-z0-9-]+\.[a-z0-9-]+\.seed\d+\.json$/.test(f)).sort() : []);

const cmd = process.argv[2];
const errs = M.checkModel();
if (errs.length) fail(`model invariants fail: ${errs.join("; ")}`);
let out;

if (cmd === "meta") {
  out = {
    schema: "personalization-hq-meta-v0", ...LABEL,
    modelVersion: M.MODEL_VERSION, personasVersion: PERSONAS_VERSION, composerVersion: M.COMPOSER.version, decision: M.DECISION,
    model: M.inspect(),
    personas: PERSONAS.map((p) => ({ id: p.id, name: p.name, description: p.description, why: p.why, source: p.source,
      fingerprintMeans: p.fingerprintMeans, needsAtMeans: M.explainNeeds(fpOf(p)),
      groundTruth: { note: "simulator only; no policy reads this", latent: p.latent } })),
    policies: { model: M.POLICIES, all: ALL_POLICIES, ablations: GAM_VARIANTS, session: SESSION_VARIANTS },
    // model-v0.3.0: the session composer's coefficients, EDP's v1/v3 and the edit table [target, path, from, to, reason].
    session: { version: M.COMPOSER_SESSION.version, size: M.COMPOSER_SESSION.sessionSize, servingMode: M.COMPOSER_SESSION.servingMode,
      recompute: M.COMPOSER_SESSION.recompute, v1: M.sessionCoefficients("v1"), v3: M.sessionCoefficients("v3"),
      edits: M.COMPOSER_SESSION.edits.map(([target, path, from, to, reason]) => ({ target, path, from, to, reason })),
      // model-v0.4.2 (W-2003): gam-session-v3-edpbase = v3 + edpBaseEdits (one row, base 1.0 -> beta, placeholder pending W-2004).
      "v3-edpbase": M.sessionCoefficients("v3-edpbase"),
      edpBaseEdits: M.COMPOSER_SESSION.edpBaseEdits.map(([target, path, from, to, reason]) => ({ target, path, from, to, reason })),
      sandboxVariants: SANDBOX_VARIANTS,
      why: M.COMPOSER_SESSION.why, ablations: M.COMPOSER_SESSION.ablations, circularLabel: CIRCULAR_LABEL },
    sim: { ...SIM, defaultDays: 7, learnerParams: BASE_PARAMS, misconceptionStrength: STRENGTH_PLACEHOLDER },
    saved: savedFiles(),
  };
} else if (cmd === "run" || cmd === "saved") {
  let trace;
  if (cmd === "run") {
    const p = persona(args.persona), pol = policy(args.policy);
    const seed = int("seed", 1, 1, 999), days = int("days", 7, 1, 14);
    const r = runEpisode({ persona: p, policy: pol, seed, params: BASE_PARAMS, cat: loadPinnedCatalog(), trace: true, days });
    trace = { ...r.trace, run: { persona: p.id, policy: pol, seed, days, source: "live" } };
  } else {
    const f = args.file ?? "";
    if (!savedFiles().includes(f)) fail(`no saved trace ${f}`);
    trace = JSON.parse(readFileSync(join(TRACES, f), "utf8"));
    const m = /^(.+)\.(.+)\.seed(\d+)\.json$/.exec(f);
    trace.run = { persona: m[1], policy: m[2], seed: +m[3], days: null, source: `saved: sim/out/traces/${f}` };
  }
  // as run.mjs: curve reasons live once in the model block; per-step need terms drop the repeated text
  for (const s of trace.steps) if (s.needs) for (const n of s.needs) for (const t of n.terms) delete t.why;
  trace.model = M.inspect();
  out = { ...trace, label: LABEL.unscored };
} else if (cmd === "compare") {
  const ps = args.persona === "all" ? PERSONAS : [persona(args.persona)];
  const seeds = int("seeds", 5, 1, 10), days = int("days", 7, 1, 14);
  // "main" = model.ts POLICIES that order new cards; "review-timing" (W-1547) is not an ordering policy and has no episode here.
  const set = args.set === "all" ? ALL_POLICIES : args.set === "main" || args.set === undefined ? M.POLICIES.filter((p) => ALL_POLICIES.includes(p)) : fail("--set must be main or all");
  const cat = loadPinnedCatalog();
  const t0 = Date.now();
  const rows = set.map((pol) => {
    const rs = [];
    const circ = [];
    for (const p of ps) for (let s = 1; s <= seeds; s++) {
      const e = runEpisode({ persona: p, policy: pol, seed: s, params: BASE_PARAMS, cat, days, diagnostics: true });
      rs.push(e.score); circ.push(e.circular);
    }
    const rec = rs.map((r) => r.recall).filter((x) => !Number.isNaN(x));
    const m = (k) => mean(rs.map((r) => r[k]));
    // EDP-style diagnostics (founder decision 2026-10-20 Q3): pooled need coverage, mean domain diversity. Circular.
    const mass = circ.reduce((q, c) => q + c.needMass, 0), res = circ.reduce((q, c) => q + c.resolved, 0);
    return { policy: pol, episodes: rs.length, recall: mean(rec), recallSd: sd(rec), recallSe: rec.length > 1 ? sd(rec) / Math.sqrt(rec.length) : null,
      concepts: m("concepts"), domains: m("domains"), prereqFirst: m("prereqFirst"), reveal: m("reveal"), gain: m("gain"), movedShare: m("movedShare"), cards: m("cards"),
      circular: { label: CIRCULAR_LABEL, needCoverageRate: mass ? res / mass : null, domainDiversity: mean(circ.map((c) => c.domainDiversity)),
        distinctDomainsServed: mean(circ.map((c) => c.distinctDomainsServed)) } };
  });
  out = { schema: "personalization-hq-compare-v0", ...LABEL, modelVersion: M.MODEL_VERSION, personasVersion: PERSONAS_VERSION,
    personas: ps.map((p) => p.id), seeds, days, set: args.set ?? "main", ms: Date.now() - t0, rows,
    columns: {
      recall: "simulated first-revisit recall over all lessons completed (mean over episodes)",
      recallSd: "sd across episodes", recallSe: "standard error", concepts: "distinct concepts completed", domains: "distinct domains completed",
      prereqFirst: "share of cards shown before an in-pilot prerequisite", reveal: "reveal completion proxy (reported, never optimised)",
      gain: "concepts known at end minus start (ground truth; extra, not in OBJECTIVE)", movedShare: "share of cards moved off the default order",
      circular: `${CIRCULAR_LABEL}: EDP-style, graded by the model's own detect() and addr(), not by the learner; never a pass score, always beside recall`,
      "circular.needCoverageRate": "Σ min(need, addr[served card, need]) / Σ need over every served new card, needs and addr from the evidence when the card is served (EDP resolved / initial mass), pooled over episodes",
      "circular.domainDiversity": "Shannon entropy of served new cards' domains / log2(pilot domains), 0..1, mean over episodes (EDP widget-mix entropy)",
      "circular.distinctDomainsServed": "distinct domains among served new cards, mean over episodes",
    }, circularLabel: CIRCULAR_LABEL };
} else if (cmd === "sandbox") {
  const p = persona(args.persona);
  const variant = Object.hasOwn(SANDBOX_VARIANTS, args.variant ?? "") ? args.variant : fail(`--variant must be one of ${Object.keys(SANDBOX_VARIANTS).join(", ")}`);
  const seed = int("seed", 1, 1, 999);
  out = { schema: "personalization-hq-sandbox-v0", ...LABEL, personasVersion: PERSONAS_VERSION, ...sandboxDocument(p, variant, seed, loadPinnedCatalog()) };
} else {
  fail("usage: hq-cli.mjs meta | run --persona= --policy= --seed= [--days=] | compare --persona=<id|all> [--seeds=] [--set=main|all] | saved --file= | sandbox --persona= --variant=v1|v3|edpbase [--seed=]");
}
// sandbox is not rounded: a browser re-implementation must see the exact numbers the CLI composed with (drift test).
process.stdout.write(JSON.stringify(out, cmd === "sandbox" ? undefined : round));
