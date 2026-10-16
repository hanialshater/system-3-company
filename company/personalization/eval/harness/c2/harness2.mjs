#!/usr/bin/env node
// Criterion 2's harness: glue between the arms under test and the criterion-2 judge (learner2, scorer2, world2).
// owner: personalization-eval (Uma) · run: eval-k1-1016 · criterion: company/personalization/eval/2026-10-16-criterion-2.md
// Offline only, Node >= 22.18, no dependencies. NOT a judge module: it imports the policies (read-only) and the
// phase A glue (../harness.mjs: `choose`, `seedHistory`, `poolFor`, all unchanged since readout 1).
//
// An ARM is "<order>+<review>": the order rule picks new cards, the review rule picks revisits (interface §I).
//   order:  default-order | draft-rules | random | gam (model-v0.2.2 as frozen) | oracle-order (judge's reference)
//   review: fixed (src/kit/progress.ts schedule) | none | oracle-review@<theta> (judge's reference) | candidate
//           (P2's REVIEW_TIMING_POLICY, loaded with --candidate=<path>) | fixture-review-* (tests only)
//
// FREEZE LOCK: while criterion 2's status line is not `frozen`, only `default-order+fixed` and arms whose non-reference
// parts are fixtures run. Every other arm is refused before any episode (batch 3 K1: no policy scored).
//
// Commands:
//   node harness2.mjs seeds [--pilot=500] [--out=<file>]   S from default-order+fixed alone (prints SDs only)
//   node harness2.mjs episode --persona=<id> --seed=<n> [--cell=base] [--arm=default-order+fixed]   prints the episode hash
//   node harness2.mjs world [--seed=1001]                   the hidden world of one seed (judge only)
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as M from "../../../model/model.ts";
import { choose, seedHistory, poolFor, catalog } from "../harness.mjs";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, EPISODE2, CRITERION2, cells2, personaWorld2 } from "./world2.mjs";
import { makeLearner2, hiddenPull, u01 } from "./learner2.mjs";
import { newLog2, scoreEpisode2, sd, seedsFromSd, mean } from "./scorer2.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const CRITERION2_FILE = join(HERE, "..", "..", "2026-10-16-criterion-2.md");
const DAY = 86_400_000;
const sha = (s) => createHash("sha256").update(s).digest("hex");
export { catalog };

// ------------------------------------------------------------------------------------------------
// The GAM as frozen (pre-commitment 1). The hash is of model-v0.2.2's COMPOSER and curves; a test pins it.
// ------------------------------------------------------------------------------------------------
export const GAM_FROZEN_VERSION = "model-v0.2.2";
export function gamFingerprint() {
  const v = M.inspect ? M.inspect() : null;
  return sha(JSON.stringify({ version: M.MODEL_VERSION, composer: M.COMPOSER, curves: v ? v.curves : null }));
}

// ------------------------------------------------------------------------------------------------
// Freeze lock
// ------------------------------------------------------------------------------------------------
export function criterionStatus2(file = CRITERION2_FILE) {
  const m = readFileSync(file, "utf8").match(/^status:\s*(.+)$/m);
  return m ? m[1].trim() : "missing";
}
export const parseArm = (arm) => { const i = arm.indexOf("+"); if (i < 0) throw new Error(`arm "${arm}" is not <order>+<review>`); return { order: arm.slice(0, i), review: arm.slice(i + 1) }; };
export const UNFROZEN_ALLOWED2 = (arm) => {
  const { order, review } = parseArm(arm);
  return (order === "default-order" || order.startsWith("fixture-")) && (review === "fixed" || review.startsWith("fixture-"));
};
export function assertScoringAllowed2(arms, file = CRITERION2_FILE) {
  const st = criterionStatus2(file);
  if (/^frozen\b/.test(st)) return;
  const bad = arms.filter((a) => !UNFROZEN_ALLOWED2(a));
  if (bad.length) throw new Error(`freeze lock: criterion 2 status is "${st}"; refusing to score ${bad.join(", ")} (only default-order+fixed and fixture arms until frozen)`);
}

// ------------------------------------------------------------------------------------------------
// Review rules (interface §I). Each is { name, version, decide(input) -> { revisits: [{slug, reason}] } }.
// ------------------------------------------------------------------------------------------------
/** The product's fixed schedule (src/kit/progress.ts revisitDue, REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21]), interface §I.5. */
export const REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21];
export function fixedDue(history, now, slots) {
  const due = [];
  for (const h of history) {
    const successes = h.recalls.filter((r) => r.correct).length;
    if (successes >= REVISIT_SCHEDULE_DAYS.length) continue;
    const last = h.recalls.length ? h.recalls[h.recalls.length - 1].at : h.completedAt;
    if (now - last >= REVISIT_SCHEDULE_DAYS[Math.min(successes, REVISIT_SCHEDULE_DAYS.length - 1)] * DAY) due.push({ slug: h.slug, last });
  }
  due.sort((a, b) => a.last - b.last || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  return due.slice(0, slots).map((d) => d.slug);
}
export const FIXED = { name: "fixed", version: "progress.ts", decide: (inp) => ({ revisits: inp.fixedDue.map((slug) => ({ slug, reason: "due on the fixed schedule" })) }) };
export const NONE = { name: "none", version: "ref", decide: () => ({ revisits: [] }) };

/** Fixtures: used only to show the interface checks can fail, and as the gaming probes (criterion 2 §5 T8, T9). */
export const REVIEW_FIXTURES = {
  "fixture-review-fixedcopy": { name: "fixture-review-fixedcopy", version: "0", decide: (inp) => ({ revisits: inp.fixedDue.map((slug) => ({ slug, reason: "copy of the fixed schedule" })) }) },
  "fixture-review-early": { name: "fixture-review-early", version: "0", decide: (inp) => ({ revisits: [...inp.history]
    .map((h) => ({ slug: h.slug, last: h.recalls.length ? h.recalls[h.recalls.length - 1].at : h.completedAt }))
    .sort((a, b) => a.last - b.last || (a.slug < b.slug ? -1 : 1)).slice(0, inp.slots).map((x) => ({ slug: x.slug, reason: "every lesson, every session" })) }) },
  "fixture-review-random": { name: "fixture-review-random", version: "0", decide: (inp) => ({ revisits: inp.fixedDue.filter(() => Math.random() < 0.5).map((slug) => ({ slug, reason: "coin" })) }) },
  "fixture-review-mutator": { name: "fixture-review-mutator", version: "0", decide: (inp) => { inp.history.pop(); return { revisits: [] }; } },
  "fixture-review-forbidden": { name: "fixture-review-forbidden", version: "0", decide: (inp) => ({ revisits: (inp.sessionCount ?? 0) % 2 ? [] : inp.fixedDue.map((slug) => ({ slug, reason: "x" })) }) },
  "fixture-review-badslug": { name: "fixture-review-badslug", version: "0", decide: (inp) => ({ revisits: [{ slug: "not-a-lesson", reason: "x" }] }) },
};

/** Oracle review scheduler (criterion 2 §2.4): reads the hidden recall probability. */
export function oracleReview(theta, learner, dimsLite) {
  return { name: `oracle-review@${theta}`, version: "judge", decide: (inp) => ({ revisits: inp.history
    .map((h) => ({ slug: h.slug, p: learner.oracle.recallProb(dimsLite[h.slug], inp.now) }))
    .filter((x) => x.p < theta).sort((a, b) => a.p - b.p || (a.slug < b.slug ? -1 : 1)).slice(0, inp.slots)
    .map((x) => ({ slug: x.slug, reason: "oracle" })) }) };
}

let CANDIDATE = null;
/** Load P2's candidate (interface §I.4). K2 records the path and the frozen commit in criterion 2 before scoring it. */
export async function loadCandidate(path) {
  const mod = await import(pathToFileURL(resolve(path)).href);
  const c = mod.REVIEW_TIMING_POLICY;
  if (!c || typeof c.decide !== "function" || typeof c.name !== "string" || typeof c.version !== "string") throw new Error(`${path}: no valid REVIEW_TIMING_POLICY export (interface §I.4)`);
  CANDIDATE = c;
  return c;
}

const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); } return o; };
/** The review input (interface §I.3): a fresh deep-frozen object per session; recalls cut to the 30-day window. */
export function reviewInput(history, now, dimsFrozen, slots) {
  const cut = now - EPISODE2.recallWindowDays * DAY;
  return deepFreeze({
    now, slots, dims: dimsFrozen, fixedDue: fixedDue(history, now, slots),
    history: history.map((h) => ({ slug: h.slug, completedAt: h.completedAt, predictedCorrectly: h.predictedCorrectly,
      recalls: h.recalls.filter((r) => r.at >= cut).map((r) => ({ at: r.at, correct: r.correct })) })),
  });
}
/** Interface §I.4 check 3 (well formed). Returns a list of problems. */
export function decisionProblems(dec, input) {
  const out = [];
  if (!dec || !Array.isArray(dec.revisits)) return ["no revisits array"];
  const inHist = new Set(input.history.map((h) => h.slug));
  const seen = new Set();
  for (const r of dec.revisits) {
    if (!r || typeof r.slug !== "string" || !inHist.has(r.slug)) out.push(`slug not in history: ${r?.slug}`);
    else if (seen.has(r.slug)) out.push(`slug twice: ${r.slug}`);
    seen.add(r?.slug);
    if (!r || typeof r.reason !== "string" || !r.reason.trim()) out.push(`no reason for ${r?.slug}`);
  }
  if (dec.revisits.length > input.slots) out.push(`more revisits than slots (${dec.revisits.length} > ${input.slots})`);
  return out;
}

// ------------------------------------------------------------------------------------------------
// Order rules: the phase A `choose` (default-order, draft-rules, random, gam), plus the judge's oracle ordering.
// ------------------------------------------------------------------------------------------------
/** Oracle ordering (criterion 2 §2.3): the eligible lesson with the largest expected rise in the primary read. */
export function oracleOrder(input, learner, dimsLite, t, tRead) {
  const done = new Set(input.history.map((h) => h.slug));
  const el = input.defaultOrder.filter((s) => !done.has(s));
  if (!el.length) return { picks: [], slots: [], personalised: false, note: "oracle" };
  let best = el[0], bestG = -Infinity;
  for (const s of el) { const g = learner.oracle.gainIfStudied(dimsLite[s], t, tRead); if (g > bestG + 1e-12) { best = s; bestG = g; } }
  return { picks: [{ slug: best, moved: best !== el[0], reason: "oracle", terms: [], score: bestG }], slots: [], personalised: best !== el[0], note: "oracle" };
}

function makePolicyRand(seed, personaId, order) {
  let n = 0;
  return () => u01(`${seed}|${personaId}|policy|${order}|${n++}`);
}

// ------------------------------------------------------------------------------------------------
// One episode (criterion 2 §1): persona x seed x cell x arm.
// ------------------------------------------------------------------------------------------------
/**
 * opts.onReview(input, decision, ctx) and opts.onPick(input, composition, ctx): hooks for the checks; must not mutate.
 * opts.reviewOverride: a review rule object (tests). opts.permute: slug -> slug map of the ratings in the composer's view
 * (T6). Returns { score, hash, worldHash, steps? }.
 */
export function runEpisode2({ persona, arm, seed, cell, cat = catalog(), e1 = E1, onReview = null, onPick = null, reviewOverride = null, keepSteps = false, permute = null }) {
  const { order, review } = parseArm(arm);
  const world = personaWorld2(persona, PERSONAS, cell, e1);
  const dimsLite = Object.fromEntries(cat.lessons.map((l) => [l.slug, { slug: l.slug, concept: l.concept, domain: l.domain }]));
  const pulls = Object.fromEntries(cat.lessons.map((l) => [l.slug, hiddenPull(seed, l.slug, e1.pull)]));
  const graph = { prereqsOf: (c) => cat.prereqsByConcept[c] || [], pilotConcepts: cat.pilotConcepts };
  const learner = makeLearner2({ seed, personaId: persona.id, world, graph, pullOf: (s) => pulls[s], startTime: EPISODE2.baseTime });
  const pre = seedHistory(persona, cat, seed);
  learner.seedKnowledge(pre, dimsLite);
  const worldHash = sha(JSON.stringify({ pulls, initial: learner.snapshot(), world }));
  const pool = poolFor(cat, seed, CRITERION2.rho.value, { b2: e1, permute });
  const dimsFrozen = deepFreeze(Object.fromEntries(pool.map((d) => [d.slug, structuredClone(d)])));
  const history = pre.map((h) => ({ ...h, recalls: [...h.recalls] }));
  const bySlug = new Map(history.map((h) => [h.slug, h]));
  const log = newLog2(learner.knownCount(), pre.length);
  const steps = [];
  const policyRand = makePolicyRand(seed, persona.id, order);
  const tLast = EPISODE2.baseTime + (EPISODE2.days - 1) * DAY + EPISODE2.sessionStartHour * 3_600_000;
  const tPrimary = tLast + EPISODE2.primaryHorizonDays * DAY;
  let rule = reviewOverride;
  if (!rule) {
    if (review === "fixed") rule = FIXED;
    else if (review === "none") rule = NONE;
    else if (review.startsWith("oracle-review@")) rule = oracleReview(+review.slice("oracle-review@".length), learner, dimsLite);
    else if (review === "candidate") { if (!CANDIDATE) throw new Error("candidate not loaded (--candidate=<path>)"); rule = CANDIDATE; }
    else if (REVIEW_FIXTURES[review]) rule = REVIEW_FIXTURES[review];
    else throw new Error(`unknown review rule ${review}`);
  }
  const pendingRead = []; // new lessons completed, read at the next session start (R1d, descriptive)

  for (let day = 0; day < EPISODE2.days; day++) {
    learner.beginSession(day);
    let t = EPISODE2.baseTime + day * DAY + EPISODE2.sessionStartHour * 3_600_000;
    for (const x of pendingRead.splice(0)) log.nextDayRecall.push(learner.recallProb(dimsLite[x], t));
    // 1. The review rule: revisits first (AMD-008 F2).
    const input = reviewInput(history, t, dimsFrozen, EPISODE2.slots);
    const dec = rule.decide(input);
    const problems = decisionProblems(dec, input);
    if (problems.length) throw new Error(`INVALID review rule ${rule.name}: ${problems.slice(0, 3).join("; ")}`);
    if (onReview) onReview(input, dec, { arm, seed, persona: persona.id, day, t, rule });
    const chosen = new Set(dec.revisits.map((r) => r.slug));
    for (const s of input.fixedDue) if (!chosen.has(s)) log.v4.later++;
    for (const s of chosen) (input.fixedDue.includes(s) ? log.v4.same++ : log.v4.earlier++);
    let served = 0, stopped = false;
    for (const r of dec.revisits) {
      const res = learner.revisit(dimsLite[r.slug], t);
      bySlug.get(r.slug).recalls.push({ at: t, correct: res.ok });
      log.revisits++; if (res.ok) log.revisitsOk++; log.cardsServed++;
      steps.push(["r", day, r.slug, res.ok ? 1 : 0, res.stop ? 1 : 0]);
      served++; t += EPISODE2.revisitMinutes * 60_000;
      if (res.stop) { stopped = true; break; }
    }
    // 2. The order rule: new cards in the remaining positions.
    while (!stopped && served < EPISODE2.slots) {
      const fingerprint = M.fingerprintFrom(history, cat.dims, t);
      const needs = M.detect(fingerprint);
      const cinput = { fingerprint, needs, remaining: { ...needs }, pool, defaultOrder: cat.defaultOrder, queued: [], history, dueRevisits: [], personalisationOn: true };
      const draws = [];
      const comp = order === "oracle-order" ? oracleOrder(cinput, learner, dimsLite, t, tPrimary)
        : choose(order, cinput, cat, () => { const v = policyRand(); draws.push(v); return v; });
      if (onPick) onPick(cinput, comp, { arm, seed, persona: persona.id, day, t, draws });
      const pick = comp.picks.find((p) => p.reason !== "due-revisit");
      if (!pick) break;
      const lesson = cat.dims[pick.slug];
      const doneConcepts = new Set(history.map((h) => cat.dims[h.slug]?.concept));
      const beforePrereq = (cat.prereqsByConcept[lesson.concept] || []).some((c) => !doneConcepts.has(c));
      const out = learner.study(dimsLite[pick.slug], t);
      log.newStarted++; log.cardsServed++; served++;
      if (beforePrereq) log.prereqFirst++;
      if (pick.moved) log.moved++;
      if (out.revealed) {
        log.newRevealed++;
        const h = { slug: pick.slug, completedAt: t, predictedCorrectly: out.predictedRight, recalls: [] };
        history.push(h); bySlug.set(pick.slug, h);
        pendingRead.push(pick.slug);
        log.byDomain[lesson.domain] = (log.byDomain[lesson.domain] || 0) + 1;
        log.concepts.add(lesson.concept);
      }
      steps.push(["n", day, pick.slug, pick.moved ? 1 : 0, out.predictedRight ? 1 : 0, out.revealed ? 1 : 0, out.stop ? 1 : 0, out.learned ? 1 : 0]);
      t += EPISODE2.cardMinutes * 60_000;
      if (out.stop) stopped = true;
    }
  }
  const tNext = tLast + DAY;
  for (const x of pendingRead.splice(0)) log.nextDayRecall.push(learner.recallProb(dimsLite[x], tNext));
  // The final test: read only, no session in between (criterion 2 §1).
  for (const H of EPISODE2.horizonsDays) log.K[H] = learner.knowledgeAt(tLast + H * DAY);
  log.knownEnd = learner.knownCount();
  const score = scoreEpisode2(log);
  const hash = sha(JSON.stringify({ steps, score }));
  return { score, hash, worldHash, steps: keepSteps ? steps : undefined };
}

export const cellByName2 = (name, e1 = E1) => {
  const c = cells2(e1).find((x) => x.name === name);
  if (!c) throw new Error(`unknown cell ${name}`);
  return c.world;
};
export function loadInputs2(path) { return path ? JSON.parse(readFileSync(path, "utf8")) : E1; }

// ------------------------------------------------------------------------------------------------
// CLI
// ------------------------------------------------------------------------------------------------
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
export const REFERENCE_ARM = "default-order+fixed";

function cmdSeeds() {
  assertScoringAllowed2([REFERENCE_ARM]);
  const e1 = loadInputs2(arg("inputs"));
  const pilot = +arg("pilot", 500);
  const cell = cellByName2("base", e1);
  const cat = catalog();
  const H = EPISODE2.primaryHorizonDays;
  const seeds = Array.from({ length: pilot }, (_, i) => CRITERION2.seeds.first + i);
  const perPersona = {};
  for (const p of PERSONAS) {
    const R = seeds.map((s) => { const sc = runEpisode2({ persona: p, arm: REFERENCE_ARM, seed: s, cell, cat, e1 }).score; return sc.nAll > 0 ? sc.K[H] / sc.nAll : NaN; });
    perPersona[p.id] = { sdR: sd(R), n: R.filter((x) => !Number.isNaN(x)).length, nan: R.filter((x) => Number.isNaN(x)).length };
  }
  const sdMax = Math.max(...Object.values(perPersona).map((x) => x.sdR));
  const S = seedsFromSd(sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap);
  const rec = {
    what: "S from the reference arm (default-order + fixed schedule) alone at the base cell (criterion 2 §1). SDs only; no mean, no other arm.",
    rule: "S = max(floor, ceil((2.8·√2·sd_R/δ_min)²)), cap; sd_R = the largest per-persona SD of R_7 = K[7]/nAll of the reference arm",
    inputsStatus: e1.status, inputsHash: sha(JSON.stringify(e1)), cell, pilotSeeds: `${seeds[0]}..${seeds.at(-1)}`,
    deltaMin: CRITERION2.deltaMin, floor: CRITERION2.seeds.floor, cap: CRITERION2.seeds.cap,
    perPersona, sdMax, S, seedList: `${CRITERION2.seeds.first}..${CRITERION2.seeds.first + S - 1}`,
    episode: EPISODE2, modelVersion: M.MODEL_VERSION,
  };
  const out = arg("out");
  if (out) writeFileSync(out, JSON.stringify(rec, null, 2) + "\n");
  console.log(JSON.stringify(rec, null, 2));
}

async function cmdEpisode() {
  const arm = arg("arm", REFERENCE_ARM);
  assertScoringAllowed2([arm]);
  if (arg("candidate")) await loadCandidate(arg("candidate"));
  const persona = PERSONAS.find((p) => p.id === arg("persona", PERSONAS[0].id));
  const e1 = loadInputs2(arg("inputs"));
  const r = runEpisode2({ persona, arm, seed: +arg("seed", CRITERION2.seeds.first), cell: cellByName2(arg("cell", "base"), e1), e1 });
  console.log(r.hash); // the hash only: no score is printed
}

function cmdWorld() {
  const cat = catalog();
  const seed = +arg("seed", CRITERION2.seeds.first);
  const pulls = cat.lessons.map((l) => hiddenPull(seed, l.slug, E1.pull));
  console.log(JSON.stringify({ seed, lessons: cat.lessons.length, pilotConcepts: [...cat.pilotConcepts].length, pullMean: mean(pulls), pullSd: sd(pulls),
    cells: cells2().map((c) => `${c.kind}:${c.name}`) }, null, 2));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const cmd = process.argv[2];
  const f = { seeds: cmdSeeds, episode: cmdEpisode, world: cmdWorld }[cmd];
  if (!f) { console.error("usage: node harness2.mjs seeds|episode|world [options] (see header); the full run is run2.mjs"); process.exit(2); }
  Promise.resolve().then(f).catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
