#!/usr/bin/env node
// The phase A evaluation harness (W-1513 build, W-1516 (a)(b)(c); lane 14 batch 2 C1).
// owner: personalization-eval (Uma) · run: eval-c1-1016 · criterion: company/personalization/eval/2026-10-16-phase-a-criterion.md
// Offline only, Node >= 22.18, no dependencies. How to run and reproduce: README.md beside this file.
//
// This file is NOT a judge module: it is the glue between the policies under test (sim/composer.ts, model.ts, imported
// read-only) and the judge (learner.mjs, scorer.mjs, world-inputs.mjs, which import nothing). The learner gets only
// { slug, concept, domain } and the in-pilot prerequisite graph; the composer gets only ComposeInput.
//
// FREEZE LOCK: while the criterion's status line is not `status: frozen`, the harness scores only the default-order
// arm and `fixture-*` test policies. Every other policy is refused before any episode runs (batch-2 C1 constraint).
//
// Commands:
//   node harness.mjs seeds [--pilot=500]      S from the default-order arm's SD of R at the base cell (prints SDs only)
//   node harness.mjs episode --persona=<id> --seed=<n> [--cell=base] [--policy=default-order]   prints the episode hash (T1)
//   node harness.mjs world [--seed=1001] [--rho=0.5]   the hidden world of one seed: pull and rating distribution (judge only)
//   node run.mjs --seeds=S [--jobs=4] [--out=<dir>]    the full criterion run (C4); refused unless frozen (run.mjs)
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../model/model.ts";
import { composeExplained, defaultOrderPolicy, randomPolicy, draftRulesPolicy } from "../../model/sim/composer.ts";
import { loadCatalog } from "../../model/sim/catalog.mjs";
import { PERSONAS } from "./personas.copy.mjs";
import { B2, CRITERION, EPISODE, cells, personaWorld } from "./world-inputs.mjs";
import { makeLearner, hiddenPull, simulatedRating, u01 } from "./learner.mjs";
import { newLog, scoreEpisode, sd, seedsFromSd, paired, judgeCell, outcome, mean } from "./scorer.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const CRITERION_FILE = join(HERE, "..", "2026-10-16-phase-a-criterion.md");
const DAY = 86_400_000;
const sha = (s) => createHash("sha256").update(s).digest("hex");

// ------------------------------------------------------------------------------------------------
// Freeze lock
// ------------------------------------------------------------------------------------------------
export function criterionStatus(file = CRITERION_FILE) {
  const m = readFileSync(file, "utf8").match(/^status:\s*(.+)$/m);
  return m ? m[1].trim() : "missing";
}
export const UNFROZEN_ALLOWED = (p) => p === "default-order" || p.startsWith("fixture-");
export function assertScoringAllowed(policies, file = CRITERION_FILE) {
  const st = criterionStatus(file);
  if (/^frozen\b/.test(st)) return;
  const bad = policies.filter((p) => !UNFROZEN_ALLOWED(p));
  if (bad.length) throw new Error(`freeze lock: criterion status is "${st}"; refusing to score ${bad.join(", ")} (only default-order and fixture-* until frozen)`);
}

// ------------------------------------------------------------------------------------------------
// Policies under test. The GAM variants are model.ts POLICIES; gam-surprise-on is the VP's named counterfactual
// (company/decisions/2026-10-16-vp-personalization-pre-freeze-decisions.md §1): a COMPOSER copy with
// surpriseGate.active = true and the simulated ratings tagged with a source the gate accepts. Nothing else changes.
// ------------------------------------------------------------------------------------------------
export const GAM_OFF = { "gam": [], "gam-no-surprise-novelty": ["surprise", "novelty"], "gam-no-breadth": ["need:breadth"], "gam-surprise-on": [] };
export const SURPRISE_ON_SOURCE = "classifier"; // simulated rating, not a human one; the gate accepts it; nothing else reads the tag
export const COMPOSER_SURPRISE_ON = { ...M.COMPOSER, surpriseGate: { ...M.COMPOSER.surpriseGate, active: true,
  why: "COUNTERFACTUAL gam-surprise-on (eval readout only; not the shipped model, not a model version)" } };
export const ALL_POLICIES = [...M.POLICIES, "gam-surprise-on"];

/** Fixture policies: deliberately broken, used only to prove T1-T4 can fail. Never a policy under test. */
export const FIXTURES = {
  "fixture-nondeterministic": (input) => { const c = defaultOrderPolicy(input); const el = input.defaultOrder.filter((s) => !input.history.some((h) => h.slug === s)); const s = el[Math.floor(Math.random() * Math.min(3, el.length))]; c.picks[c.picks.length - 1] = { slug: s, moved: true, reason: "default", terms: [], score: 0 }; return c; },
  "fixture-forbidden-reader": (input) => { const c = defaultOrderPolicy(input); if (input.sessionCount === 7 || input.fingerprint.sessionCount === 7) { const el = input.defaultOrder.filter((s) => !input.history.some((h) => h.slug === s)); if (el[1]) c.picks[c.picks.length - 1] = { slug: el[1], moved: true, reason: "default", terms: [], score: 0 }; } return c; },
  "fixture-explained-default": (input) => { const c = defaultOrderPolicy(input); const terms = [{ name: "defaultRank", value: 1 }]; for (const p of c.picks) if (p.reason !== "due-revisit") { p.terms = terms; p.score = 1; } c.slots = c.slots.map((s) => ({ ...s, candidates: [{ slug: s.winner, score: 1, terms, eligibleToMove: true }], defaultScore: 1, margin: 0 })); return c; },
  "fixture-bad-explanation": (input, cat) => { const c = FIXTURES["fixture-explained-default"](input, cat); for (const p of c.picks) if (p.terms.length) p.score += 0.5; return c; },
};

function makePolicyRand(seed, personaId, policy) {
  let n = 0;
  return () => u01(`${seed}|${personaId}|policy|${policy}|${n++}`);
}

/** One composition (Composition shape of sim/composer.ts) for any policy name. */
export function choose(policy, input, cat, policyRand) {
  if (FIXTURES[policy]) return FIXTURES[policy](input, cat);
  if (policy === "default-order") return defaultOrderPolicy(input);
  if (policy === "random") return randomPolicy(input, policyRand);
  if (policy === "draft-rules") return draftRulesPolicy(input, M.COMPOSER, cat.pilotConcepts);
  if (policy === "epsilon-greedy") { // copied from sim/simulate.mjs choose(): 15% exploration replaces the first new pick
    const c = composeExplained(input, M.COMPOSER, { off: [], pilotConcepts: cat.pilotConcepts });
    const firstNew = c.picks.findIndex((p) => p.reason !== "due-revisit");
    if (firstNew >= 0 && policyRand() < 0.15) {
      const done = new Set(input.history.map((h) => h.slug));
      const el = input.defaultOrder.filter((s) => !done.has(s));
      const s = el[Math.floor(policyRand() * el.length)];
      c.picks[firstNew] = { slug: s, moved: s !== el[0], reason: "default", terms: [], score: 0 };
    }
    return c;
  }
  const off = GAM_OFF[policy];
  if (!off) throw new Error(`unknown policy ${policy}`);
  const model = policy === "gam-surprise-on" ? COMPOSER_SURPRISE_ON : M.COMPOSER;
  return composeExplained(input, model, { off, pilotConcepts: cat.pilotConcepts });
}

// ------------------------------------------------------------------------------------------------
// The world: catalog, the composer's pool (with simulated ratings at rho), the visible pre-history.
// ------------------------------------------------------------------------------------------------
let CAT = null;
export function catalog() { return (CAT ??= loadCatalog()); }

/** The composer's view of the catalog for one seed and rho. permute: optional slug -> slug map (T6). */
export function poolFor(cat, seed, rho, { surpriseOn = false, permute = null, b2 = B2 } = {}) {
  const rating = Object.fromEntries(cat.lessons.map((l) => [l.slug, simulatedRating(seed, l.slug, rho, b2.pull)]));
  return cat.lessons.map((l) => {
    const d = { ...l, misconceptionStrength: rating[permute ? permute[l.slug] : l.slug] };
    if (surpriseOn) d.strengthSource = SURPRISE_ON_SOURCE; else delete d.strengthSource;
    return d;
  });
}

const clamp = (x) => Math.max(0, Math.min(1, x));
const LV = { intro: 0, core: 0.5, stretch: 1 };
/** Visible pre-history from jittered fingerprint means: copied from sim/simulate.mjs seedHistory (no latent read except
 *  the home domain, as there), with the eval's keyed random stream. The same for every policy at a (seed, persona). */
export function seedHistory(persona, cat, seed) {
  let n0 = 0;
  const rand = () => u01(`${seed}|${persona.id}|history-gen|${n0++}`);
  const j = (v) => clamp(v + (rand() - 0.5) * EPISODE.jitter);
  const fm = persona.fingerprintMeans;
  const means = { historySize: j(fm.historySize), missRecent: j(fm.missRecent), recallFailRate: j(fm.recallFailRate),
    successRecent: j(fm.successRecent), levelRecent: j(fm.levelRecent), domainConcentration: j(fm.domainConcentration) };
  const n = Math.round(means.historySize * 30);
  const it = persona.latent.interest;
  const home = it.probability === it.cs ? (rand() < 0.5 ? "probability" : "cs") : it.probability > it.cs ? "probability" : "cs";
  const nTop = Math.max(Math.ceil(n / 2), Math.round(means.domainConcentration * n));
  const doms = Array.from({ length: n }, (_, i) => (i < nTop ? home : home === "cs" ? "probability" : "cs"));
  for (let i = doms.length - 1; i > 0; i--) { const k = Math.floor(rand() * (i + 1)); [doms[i], doms[k]] = [doms[k], doms[i]]; }
  const used = new Set();
  const pRight = clamp((means.successRecent + 1 - means.missRecent) / 2);
  const hist = [];
  doms.forEach((d, i) => {
    const pool = cat.lessons.filter((l) => l.domain === d && !used.has(l.slug));
    const ws = pool.map((l) => Math.exp(-4 * Math.abs(LV[l.level] - means.levelRecent)));
    let r = rand() * ws.reduce((a, b) => a + b, 0), k = 0;
    while (k < pool.length - 1 && (r -= ws[k]) > 0) k++;
    const l = pool[k]; used.add(l.slug);
    const at = EPISODE.baseTime - (n - i) * ((EPISODE.prehistoryDays * DAY) / Math.max(n, 1));
    const recalls = at + DAY <= EPISODE.baseTime && rand() < EPISODE.prehistoryRecallTaken ? [{ at: at + DAY, correct: rand() >= means.recallFailRate }] : [];
    hist.push({ slug: l.slug, completedAt: at, predictedCorrectly: rand() < pRight, recalls });
  });
  return hist;
}

// ------------------------------------------------------------------------------------------------
// One episode (criterion §1 unit): one persona × one seed × one cell × one policy.
// ------------------------------------------------------------------------------------------------
/**
 * opts.onPick(input, composition, ctx): called at every pick before serving (T2, T3, T4 hooks). It must not mutate.
 * opts.permute: slug -> slug permutation of the ratings in the composer's view (T6).
 * Returns { score, hash, worldHash, steps? }.
 */
export function runEpisode({ persona, policy, seed, cell, cat = catalog(), b2 = B2, onPick = null, permute = null, keepSteps = false }) {
  const world = personaWorld(persona, PERSONAS, cell, b2);
  const dimsLite = Object.fromEntries(cat.lessons.map((l) => [l.slug, { slug: l.slug, concept: l.concept, domain: l.domain }]));
  const pulls = Object.fromEntries(cat.lessons.map((l) => [l.slug, hiddenPull(seed, l.slug, b2.pull)]));
  const graph = { prereqsOf: (c) => cat.prereqsByConcept[c] || [], pilotConcepts: cat.pilotConcepts };
  const learner = makeLearner({ seed, personaId: persona.id, world, graph, pullOf: (s) => pulls[s] });
  const pre = seedHistory(persona, cat, seed);
  learner.seedKnowledge(pre, dimsLite);
  const worldHash = sha(JSON.stringify({ pulls, initial: learner.snapshot(), world }));
  const pool = poolFor(cat, seed, cell.rho, { surpriseOn: policy === "gam-surprise-on", permute, b2 });
  const history = pre.map((h) => ({ ...h, recalls: [...h.recalls] }));
  const simDone = []; // { slug, completedAt, day, revisited }
  const log = newLog(learner.knownCount());
  const steps = [];
  const policyRand = makePolicyRand(seed, persona.id, policy);

  for (let day = 0; day <= EPISODE.days; day++) {
    let t = EPISODE.baseTime + day * DAY + EPISODE.sessionStartHour * 3_600_000;
    // First revisits: every simulated completion from an earlier day, at this session's start. Expected recall is read
    // for all of them before any is applied (they share one scheduled time).
    const due = simDone.filter((x) => !x.revisited && x.day < day);
    const probs = due.map((x) => learner.recallProb(dimsLite[x.slug], t));
    due.forEach((x, i) => {
      log.expectedRecalls.push(probs[i]);
      const ok = learner.revisit(dimsLite[x.slug], t);
      log.realisedRecalls.push(ok);
      x.revisited = true;
      history.find((h) => h.slug === x.slug).recalls.push({ at: t, correct: ok });
      steps.push(["r", day, x.slug, probs[i], ok]);
      t += EPISODE.revisitMinutes * 60_000;
    });
    if (day === EPISODE.days) break;
    for (let cards = 0; cards < EPISODE.maxCardsPerDay; cards++) {
      const fingerprint = M.fingerprintFrom(history, cat.dims, t);
      const needs = M.detect(fingerprint);
      const input = { fingerprint, needs, remaining: { ...needs }, pool, defaultOrder: cat.defaultOrder,
        queued: [], history, dueRevisits: [], personalisationOn: true };
      const draws = [];
      const comp = choose(policy, input, cat, () => { const v = policyRand(); draws.push(v); return v; });
      if (onPick) onPick(input, comp, { policy, seed, persona: persona.id, day, t, draws });
      const pick = comp.picks.find((p) => p.reason !== "due-revisit");
      if (!pick) break;
      const lesson = cat.dims[pick.slug];
      const doneConcepts = new Set(history.map((h) => cat.dims[h.slug]?.concept));
      const beforePrereq = (cat.prereqsByConcept[lesson.concept] || []).some((c) => !doneConcepts.has(c));
      const out = learner.study(dimsLite[pick.slug], t);
      log.started++;
      if (beforePrereq) log.prereqFirst++;
      if (pick.moved) log.moved++;
      if (out.revealed) {
        log.revealed++;
        history.push({ slug: pick.slug, completedAt: t, predictedCorrectly: out.predictedRight, recalls: [] });
        simDone.push({ slug: pick.slug, completedAt: t, day, revisited: false });
        log.byDomain[lesson.domain] = (log.byDomain[lesson.domain] || 0) + 1;
        log.concepts.add(lesson.concept);
      }
      steps.push(["n", day, pick.slug, pick.moved ? 1 : 0, out.predictedRight ? 1 : 0, out.revealed ? 1 : 0, out.stop ? 1 : 0, out.learned ? 1 : 0]);
      t += EPISODE.cardMinutes * 60_000;
      if (out.stop) break;
    }
  }
  log.knownEnd = learner.knownCount();
  const score = scoreEpisode(log);
  const hash = sha(JSON.stringify({ steps, score }));
  return { score, hash, worldHash, steps: keepSteps ? steps : undefined };
}

export const cellByName = (name, b2 = B2) => {
  const c = cells(b2).find((x) => x.name === name);
  if (!c) throw new Error(`unknown cell ${name}`);
  return c.world;
};

/** Read an --inputs file (same keys as B2) or use B2 as written. */
export function loadInputs(path) {
  if (!path) return B2;
  return JSON.parse(readFileSync(path, "utf8"));
}

// ------------------------------------------------------------------------------------------------
// CLI
// ------------------------------------------------------------------------------------------------
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };

function cmdSeeds() {
  assertScoringAllowed(["default-order"]);
  const b2 = loadInputs(arg("inputs"));
  const pilot = +arg("pilot", 500);
  const cell = cellByName("base", b2);
  const cat = catalog();
  const seeds = Array.from({ length: pilot }, (_, i) => CRITERION.seeds.first + i);
  const perPersona = {};
  for (const p of PERSONAS) {
    const R = seeds.map((s) => runEpisode({ persona: p, policy: "default-order", seed: s, cell, cat, b2 }).score.R);
    perPersona[p.id] = { sdR: sd(R), n: R.filter((x) => !Number.isNaN(x)).length, nan: R.filter((x) => Number.isNaN(x)).length };
  }
  const sdMax = Math.max(...Object.values(perPersona).map((x) => x.sdR));
  const S = seedsFromSd(sdMax, CRITERION.deltaMin, CRITERION.seeds.floor, CRITERION.seeds.cap);
  const rec = {
    what: "S from the default-order arm alone at the base cell (criterion §1). Only SDs are recorded; no mean, no other policy.",
    rule: "S = max(floor, ceil((2.8·√2·sd_R/δ_min)²)), cap; sd_R = the largest per-persona SD of R over the pilot seeds",
    inputsStatus: b2.status, inputsHash: sha(JSON.stringify(b2)), cell, pilotSeeds: `${seeds[0]}..${seeds.at(-1)}`,
    deltaMin: CRITERION.deltaMin, floor: CRITERION.seeds.floor, cap: CRITERION.seeds.cap,
    perPersona, sdMax, S, seedList: `${CRITERION.seeds.first}..${CRITERION.seeds.first + S - 1}`,
    episode: EPISODE, modelVersion: M.MODEL_VERSION, composer: M.COMPOSER.version,
  };
  const out = arg("out");
  if (out) writeFileSync(out, JSON.stringify(rec, null, 2) + "\n");
  console.log(JSON.stringify(rec, null, 2));
}

function cmdEpisode() {
  const policy = arg("policy", "default-order");
  assertScoringAllowed([policy]);
  const persona = PERSONAS.find((p) => p.id === arg("persona", PERSONAS[0].id));
  const b2 = loadInputs(arg("inputs"));
  const r = runEpisode({ persona, policy, seed: +arg("seed", CRITERION.seeds.first), cell: cellByName(arg("cell", "base"), b2), b2 });
  console.log(r.hash); // the hash only: no score is printed
}

function cmdWorld() {
  const cat = catalog();
  const seed = +arg("seed", CRITERION.seeds.first), rho = +arg("rho", CRITERION.rhoAgreement.value);
  const pulls = cat.lessons.map((l) => hiddenPull(seed, l.slug, B2.pull));
  const levels = { 1: 0, 2: 0, 3: 0 };
  for (const l of cat.lessons) levels[simulatedRating(seed, l.slug, rho, B2.pull)]++;
  console.log(JSON.stringify({ seed, rho, lessons: cat.lessons.length, pullMean: mean(pulls), pullSd: sd(pulls),
    pullMin: Math.min(...pulls), pullMax: Math.max(...pulls), ratingLevels: levels }, null, 2));
}

export { paired, judgeCell, outcome };

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const cmd = process.argv[2];
  const f = { seeds: cmdSeeds, episode: cmdEpisode, world: cmdWorld }[cmd];
  if (!f) { console.error("usage: node harness.mjs seeds|episode|world [options] (see header); the full run is run.mjs"); process.exit(2); }
  try { f(); } catch (e) { console.error(String(e.message || e)); process.exit(1); }
}
