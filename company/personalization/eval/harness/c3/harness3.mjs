#!/usr/bin/env node
// Criterion 3's harness: glue between the arms and the judge. Reuses the criterion 2 harness by import; edits no c2 file.
// owner: personalization-eval (Uma) · run: eval-k3-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3.md
// Offline only, Node >= 22.18, no dependencies. NOT a judge module.
//
// runEpisode3 is runEpisode2 (../c2/harness2.mjs) with four additions, each inert at criterion 2's values (test C3-ID1):
//   - placement "first" (criterion 2) or "interleave" (src/components/Feed.tsx, criterion 3 §1.1);
//   - a revisit takes revisitSlotCost positions of `slots` (E3 rows; criterion 2: 1 of 12);
//   - learner3 (N7 rows, criterion 3 §1.2 L11);
//   - order rules oracle-new, oracle-refresh (O1 split, §2.1) and reachable (§2.2), beside criterion 2's.
//
// FREEZE LOCK: while criterion 3's status line is not `frozen`, only default-order+fixed (any placement) and fixture arms
// run through the CLI and run3.mjs. The identity check (checks3.mjs C3-ID1) compares hashes of criterion 2's own arms at
// criterion 2's cells, already published in readout 2; it returns booleans, never a score.
//
// Commands:
//   node harness3.mjs seeds [--pilot=500] [--out=<file>]   S from default-order+fixed at interleave:base alone (SDs only)
//   node harness3.mjs episode --persona=<id> --seed=<n> [--cell=interleave:base] [--arm=default-order+fixed]   the hash only
//   node harness3.mjs cells                                 the cell list
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { choose, seedHistory, poolFor } from "../harness.mjs";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, EPISODE2, CRITERION2, cells2, personaWorld2 } from "../c2/world2.mjs";
import { hiddenPull, u01 } from "../c2/learner2.mjs";
import { newLog2, scoreEpisode2, sd, seedsFromSd } from "../c2/scorer2.mjs";
import { catalog, parseArm, fixedDue, FIXED, NONE, REVIEW_FIXTURES, oracleReview, oracleOrder, reviewInput, decisionProblems } from "../c2/harness2.mjs";
import { makeLearner3 } from "./learner3.mjs";
import { E3, FEED, BASE_PLACEMENT, cells3, personaWorld3 } from "./world3.mjs";
import { makeReachableOracle } from "./reachable-oracle.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const CRITERION3_FILE = join(HERE, "..", "..", "2026-10-17-criterion-3.md");
const DAY = 86_400_000;
const sha = (s) => createHash("sha256").update(s).digest("hex");
export { catalog, parseArm };
export const REFERENCE_ARM = "default-order+fixed";
export const BASE_CELL = `${BASE_PLACEMENT}:base`;

// ---------------- freeze lock ----------------
export function criterionStatus3(file = CRITERION3_FILE) {
  const m = readFileSync(file, "utf8").match(/^status:\s*(.+)$/m);
  return m ? m[1].trim() : "missing";
}
export const UNFROZEN_ALLOWED3 = (arm) => {
  const { order, review } = parseArm(arm);
  return (order === "default-order" || order.startsWith("fixture-")) && (review === "fixed" || review.startsWith("fixture-"));
};
export function assertScoringAllowed3(arms, file = CRITERION3_FILE) {
  const st = criterionStatus3(file);
  if (/^frozen\b/.test(st)) return;
  const bad = arms.filter((a) => !UNFROZEN_ALLOWED3(a));
  if (bad.length) throw new Error(`freeze lock: criterion 3 status is "${st}"; refusing to score ${bad.join(", ")} (only default-order+fixed and fixture arms until frozen)`);
}

// ---------------- cells ----------------
export const allCells3 = (e1 = E1, e3 = E3) => cells3(cells2(e1), e3);
export const cellByName3 = (name, e1 = E1, e3 = E3) => {
  const c = allCells3(e1, e3).find((x) => x.name === name);
  if (!c) throw new Error(`unknown cell ${name}`);
  return c.world;
};

// ---------------- the fixed schedule as Feed.tsx serves it ----------------
/** Feed.tsx: `Object.keys(progress).filter(revisitDue)`, i.e. due lessons in first-completion order (progress key order),
 *  the full history (progress.ts reads the whole local record), at most MAX_REVISITS fetched. */
export function feedDue(history, now) {
  const all = fixedDue(history, now, Infinity);
  const set = new Set(all);
  return history.filter((h) => set.has(h.slug)).map((h) => h.slug).slice(0, FEED.maxRevisits);
}

// ---------------- O1: the restricted hidden-state oracles (criterion 3 §2.1) ----------------
const isKnown = (learner, dimsLite, slug, t) => learner.keptAt(dimsLite[slug].concept, t) > 0;
const pickOf = (best, el, score, note) => ({ picks: [{ slug: best, moved: best !== el[0], reason: note, terms: [], score }], slots: [], personalised: best !== el[0], note });
/** oracle-new: new picks only. When the default order's next lesson is a refresh (its concept is known), serve it as the
 *  default would; otherwise serve the unknown-concept lesson of largest expected rise in K(T7). */
export function oracleNew(input, learner, dimsLite, t, tRead) {
  const done = new Set(input.history.map((h) => h.slug));
  const el = input.defaultOrder.filter((s) => !done.has(s));
  if (!el.length) return { picks: [], slots: [], personalised: false, note: "oracle-new" };
  if (isKnown(learner, dimsLite, el[0], t)) return pickOf(el[0], el, 0, "oracle-new");
  let best = el[0], bestG = -Infinity;
  for (const s of el) { if (isKnown(learner, dimsLite, s, t)) continue; const g = learner.oracle.gainIfStudied(dimsLite[s], t, tRead); if (g > bestG + 1e-12) { best = s; bestG = g; } }
  return pickOf(best, el, bestG, "oracle-new");
}
/** oracle-refresh: refresh choice only. Candidates: the default order's next unknown-concept lesson and every eligible
 *  known-concept lesson; serve the largest expected rise (so it may skip, take or reorder refreshes, never new picks). */
export function oracleRefresh(input, learner, dimsLite, t, tRead) {
  const done = new Set(input.history.map((h) => h.slug));
  const el = input.defaultOrder.filter((s) => !done.has(s));
  if (!el.length) return { picks: [], slots: [], personalised: false, note: "oracle-refresh" };
  let firstNew = false, best = null, bestG = -Infinity;
  for (const s of el) {
    const k = isKnown(learner, dimsLite, s, t);
    if (!k) { if (firstNew) continue; firstNew = true; }
    const g = learner.oracle.gainIfStudied(dimsLite[s], t, tRead);
    if (g > bestG + 1e-12) { best = s; bestG = g; }
  }
  return pickOf(best, el, bestG, "oracle-refresh");
}

// ---------------- the reachable-signal oracle's population constants and input (criterion 3 §2.2) ----------------
/** E[clamp(pull x pullScale + mean pullModifier) | rating], by quadrature over the world's own rating law (learner2
 *  simulatedRating: triangular pull, rho, cuts). Population-level: the persona modifiers are averaged. */
export function pullBarByRating(e1, cell, rho = CRITERION2.rho.value) {
  const { low: lo, base: mode, high: hi } = e1.pull;
  const mean = (lo + mode + hi) / 3, sdv = Math.sqrt((lo * lo + mode * mode + hi * hi - lo * mode - lo * hi - mode * hi) / 18);
  const mods = PERSONAS.map((p) => personaWorld2(p, PERSONAS, cell, e1).pullModifier);
  const pm = mods.reduce((a, b) => a + b, 0) / mods.length;
  const acc = { 0: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0] };
  const N = 400, Z = 60;
  for (let i = 0; i < N; i++) {
    const u = (i + 0.5) / N, fm = (mode - lo) / (hi - lo);
    const pull = u < fm ? lo + Math.sqrt(u * (hi - lo) * (mode - lo)) : hi - Math.sqrt((1 - u) * (hi - lo) * (hi - mode));
    const z = (pull - mean) / sdv;
    for (let j = 0; j < Z; j++) {
      const e = -4 + (8 * (j + 0.5)) / Z, w = Math.exp(-0.5 * e * e);
      const obs = mean + sdv * (rho * z + Math.sqrt(1 - rho * rho) * e);
      const r = obs <= 0.5 ? 1 : obs >= 0.7 ? 3 : 2; // learner2 RATING_CUTS
      const pe = Math.max(0, Math.min(1, pull * cell.pullScale + pm));
      for (const k of [r, 0]) { acc[k][0] += w * pe; acc[k][1] += w; }
    }
  }
  return Object.fromEntries(Object.entries(acc).map(([k, [a, b]]) => [k, b > 0 ? a / b : NaN]));
}
/** Population constants for the reachable oracle: the cell's population values only (the persona spread at its median,
 *  never a persona's own k, prior, pull modifier or interest). */
export function reachablePop(e1, e3, cell) {
  return {
    learnRate: cell.learnRate, predictionFeedback: e1.predictionFeedback.base, prereqPenalty: cell.prereqPenalty,
    slip: 0.1, guessRecall: 0.2, relearn: cell.relearn, // UNSOURCED2 slip and guessRecall (world2.mjs), population constants
    forgetK: e1.forgetRate.base * cell.forgetScale, forgetShape: cell.forgetShape, kSpread: cell.kSpread,
    priorMean: cell.priorKnowledgeMean, priorSD: e1.priorKnowledgeSpread.base, priorClamp: [0.01, 0.95],
    priorRateMult: cell.priorRateMult, assumedPriorAgeDays: cell.priorAgeDays + (EPISODE2.days - 1) / 2,
    valuationHorizonDays: 14, pullBarByRating: pullBarByRating(e1, cell),
  };
}
const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); } return o; };
/** The reachable oracle's input: criterion 2 §I.3's object without fixedDue (a review field), fresh and deep-frozen. */
export function reachableInput(history, now, dimsFrozen, slots) {
  const cut = now - EPISODE2.recallWindowDays * DAY;
  return deepFreeze({ now, slots, dims: dimsFrozen,
    history: history.map((h) => ({ slug: h.slug, completedAt: h.completedAt, predictedCorrectly: h.predictedCorrectly,
      recalls: h.recalls.filter((r) => r.at >= cut).map((r) => ({ at: r.at, correct: r.correct })) })) });
}

function makePolicyRand(seed, personaId, order) {
  let n = 0;
  return () => u01(`${seed}|${personaId}|policy|${order}|${n++}`);
}

/**
 * One episode: persona x seed x cell x arm. cell: a cells3() world (placement, slots, revisitSlotCost, N7 rows ...).
 * Returns { score, hash, worldHash, extra, steps? }. score and hash are runEpisode2's (extra is outside the hash).
 * opts.onReachable(input, decision, ctx): hook for the checks (the reachable arm only).
 */
export function runEpisode3({ persona, arm, seed, cell, cat = catalog(), e1 = E1, e3 = E3, keepSteps = false, onReachable = null, reviewOverride = null }) {
  const { order, review } = parseArm(arm);
  const placement = cell.placement ?? "first";
  const slots = cell.slots ?? EPISODE2.slots;
  const cost = cell.revisitSlotCost ?? 1;
  const world = personaWorld3(personaWorld2(persona, PERSONAS, cell, e1), cell);
  const dimsLite = Object.fromEntries(cat.lessons.map((l) => [l.slug, { slug: l.slug, concept: l.concept, domain: l.domain }]));
  const pulls = Object.fromEntries(cat.lessons.map((l) => [l.slug, hiddenPull(seed, l.slug, e1.pull)]));
  const graph = { prereqsOf: (c) => cat.prereqsByConcept[c] || [], pilotConcepts: cat.pilotConcepts };
  const learner = makeLearner3({ seed, personaId: persona.id, world, graph, pullOf: (s) => pulls[s], startTime: EPISODE2.baseTime });
  const pre = learner.seedKnowledge2(seedHistory(persona, cat, seed), dimsLite);
  const worldHash = sha(JSON.stringify({ pulls, initial: learner.snapshot(), world }));
  const pool = poolFor(cat, seed, CRITERION2.rho.value, { b2: e1 });
  const dimsFrozen = deepFreeze(Object.fromEntries(pool.map((d) => [d.slug, structuredClone(d)])));
  const history = pre.map((h) => ({ ...h, recalls: [...h.recalls] }));
  const bySlug = new Map(history.map((h) => [h.slug, h]));
  const log = newLog2(learner.knownCount(), pre.length);
  const extra = { refreshPicks: 0, refreshPrior: 0, refreshEpisode: 0, newPicks: 0, revisitsUnserved: 0 };
  const steps = [];
  const policyRand = makePolicyRand(seed, persona.id, order);
  const tLast = EPISODE2.baseTime + (EPISODE2.days - 1) * DAY + EPISODE2.sessionStartHour * 3_600_000;
  const tPrimary = tLast + EPISODE2.primaryHorizonDays * DAY;
  const reach = order === "reachable" ? makeReachableOracle(reachablePop(e1, e3, cell)) : null;
  const pickReviewRule = () => {
    if (reviewOverride) return reviewOverride;
    if (review === "fixed") return FIXED;
    if (review === "none") return NONE;
    if (review.startsWith("oracle-review@")) return oracleReview(+review.slice("oracle-review@".length), learner, dimsLite);
    if (REVIEW_FIXTURES[review]) return REVIEW_FIXTURES[review];
    throw new Error(`unknown review rule ${review} (criterion 3 runs no candidate, pre-commitment 1)`);
  };
  const rule = pickReviewRule();
  const pendingRead = [];

  for (let day = 0; day < EPISODE2.days; day++) {
    learner.beginSession(day);
    let t = EPISODE2.baseTime + day * DAY + EPISODE2.sessionStartHour * 3_600_000;
    for (const x of pendingRead.splice(0)) log.nextDayRecall.push(learner.recallProb(dimsLite[x], t));
    const input = reviewInput(history, t, dimsFrozen, slots);
    // Interleave + fixed: the queue is Feed.tsx's (progress key order); otherwise the rule's decision, in its order.
    const dec = placement === "interleave" && rule === FIXED
      ? { revisits: feedDue(history, t).map((slug) => ({ slug, reason: "due on the fixed schedule" })) }
      : rule.decide(input);
    // Interleave: the queue is a fetch list (Feed.tsx fetches up to MAX_REVISITS whatever the session length), not a count served.
    const problems = decisionProblems(dec, placement === "interleave" ? { ...input, slots: Math.max(input.slots, FEED.maxRevisits) } : input);
    if (problems.length) throw new Error(`INVALID review rule ${rule.name}: ${problems.slice(0, 3).join("; ")}`);
    const chosen = new Set(dec.revisits.map((r) => r.slug));
    for (const s of input.fixedDue) if (!chosen.has(s)) log.v4.later++;
    for (const s of chosen) (input.fixedDue.includes(s) ? log.v4.same++ : log.v4.earlier++);
    let used = 0, stopped = false;
    const queue = placement === "interleave" ? dec.revisits.slice(0, FEED.maxRevisits) : [...dec.revisits];
    const serveRevisit = (r) => {
      const res = learner.revisit(dimsLite[r.slug], t);
      bySlug.get(r.slug).recalls.push({ at: t, correct: res.ok });
      log.revisits++; if (res.ok) log.revisitsOk++; log.cardsServed++;
      steps.push(["r", day, r.slug, res.ok ? 1 : 0, res.stop ? 1 : 0]);
      used += cost; t += EPISODE2.revisitMinutes * 60_000;
      if (res.stop) stopped = true;
    };
    if (placement === "first") while (!stopped && queue.length && used < slots) serveRevisit(queue.shift());
    let newIdx = 0, revisitedAt = -1;
    while (!stopped && used < slots) {
      if (placement === "interleave" && newIdx % FEED.every === FEED.at && revisitedAt !== newIdx && queue.length) { revisitedAt = newIdx; serveRevisit(queue.shift()); continue; }
      // The fingerprint is read only by the phase A order rules (choose); the judge's oracles never read it (pure; skipping
      // it changes no draw and no hash, C3-ID1).
      const usesFp = !["oracle-order", "oracle-new", "oracle-refresh", "reachable"].includes(order);
      const fingerprint = usesFp ? M.fingerprintFrom(history, cat.dims, t) : null;
      const needs = usesFp ? M.detect(fingerprint) : {};
      const cinput = { fingerprint, needs, remaining: { ...needs }, pool, defaultOrder: cat.defaultOrder, queued: [], history, dueRevisits: [], personalisationOn: true };
      let comp;
      if (order === "oracle-order") comp = oracleOrder(cinput, learner, dimsLite, t, tPrimary);
      else if (order === "oracle-new") comp = oracleNew(cinput, learner, dimsLite, t, tPrimary);
      else if (order === "oracle-refresh") comp = oracleRefresh(cinput, learner, dimsLite, t, tPrimary);
      else if (order === "reachable") {
        const rin = reachableInput(history, t, dimsFrozen, slots);
        const d = reach.decide(rin);
        if (onReachable) onReachable(rin, d, { seed, persona: persona.id, day, t, reach });
        if (d && (!dimsFrozen[d.slug] || bySlug.has(d.slug))) throw new Error(`INVALID reachable pick ${d.slug}`);
        const el = cat.defaultOrder.filter((s) => !bySlug.has(s));
        comp = d ? { picks: [{ slug: d.slug, moved: d.slug !== el[0], reason: d.reason, terms: [], score: d.value }], slots: [] } : { picks: [] };
      } else comp = choose(order, cinput, cat, policyRand);
      const pick = comp.picks.find((p) => p.reason !== "due-revisit");
      if (!pick) { // catalogue end: Feed.tsx appends the remaining due revisits
        if (placement === "interleave") while (!stopped && queue.length && used < slots) serveRevisit(queue.shift());
        break;
      }
      const lesson = cat.dims[pick.slug];
      if (isKnown(learner, dimsLite, pick.slug, t)) { extra.refreshPicks++; if (history.some((h) => cat.dims[h.slug]?.concept === lesson.concept)) extra.refreshEpisode++; else extra.refreshPrior++; } else extra.newPicks++;
      const doneConcepts = new Set(history.map((h) => cat.dims[h.slug]?.concept));
      const beforePrereq = (cat.prereqsByConcept[lesson.concept] || []).some((c) => !doneConcepts.has(c));
      const out = learner.study(dimsLite[pick.slug], t);
      log.newStarted++; log.cardsServed++; used += 1; newIdx++;
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
    extra.revisitsUnserved += queue.length;
  }
  const tNext = tLast + DAY;
  for (const x of pendingRead.splice(0)) log.nextDayRecall.push(learner.recallProb(dimsLite[x], tNext));
  for (const H of EPISODE2.horizonsDays) log.K[H] = learner.knowledgeAt(tLast + H * DAY);
  log.knownEnd = learner.knownCount();
  const score = scoreEpisode2(log);
  const hash = sha(JSON.stringify({ steps, score }));
  return { score, hash, worldHash, extra, steps: keepSteps ? steps : undefined };
}

// ---------------- CLI ----------------
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
export const loadE3 = (path) => (path ? JSON.parse(readFileSync(path, "utf8")) : E3);

function cmdSeeds() {
  assertScoringAllowed3([REFERENCE_ARM]);
  const e3 = loadE3(arg("e3"));
  const pilot = +arg("pilot", 500);
  const cell = cellByName3(BASE_CELL, E1, e3);
  const cat = catalog();
  const H = EPISODE2.primaryHorizonDays;
  const seeds = Array.from({ length: pilot }, (_, i) => CRITERION2.seeds.first + i);
  const perPersona = {};
  for (const p of PERSONAS) {
    const R = seeds.map((s) => { const sc = runEpisode3({ persona: p, arm: REFERENCE_ARM, seed: s, cell, cat, e3 }).score; return sc.nAll > 0 ? sc.K[H] / sc.nAll : NaN; });
    perPersona[p.id] = { sdR: sd(R), n: R.filter((x) => !Number.isNaN(x)).length, nan: R.filter((x) => Number.isNaN(x)).length };
  }
  const sdMax = Math.max(...Object.values(perPersona).map((x) => x.sdR));
  const S = seedsFromSd(sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap);
  const rec = {
    what: "S from the reference arm (default-order + fixed, Feed.tsx interleave) alone at criterion 3's base cell. SDs only; no mean, no other arm.",
    rule: "criterion 2 §1.4, unchanged: S = max(200, ceil((2.8·√2·sd_R/δ_min)²)), cap 2000; sd_R = largest per-persona SD of R_7 of the reference arm",
    e1Hash: sha(JSON.stringify(E1)), e3Status: e3.status, e3Hash: sha(JSON.stringify(e3)), cellName: BASE_CELL, cell, pilotSeeds: `${seeds[0]}..${seeds.at(-1)}`,
    deltaMin: CRITERION2.deltaMin, perPersona, sdMax, S, seedList: `${CRITERION2.seeds.first}..${CRITERION2.seeds.first + S - 1}`, modelVersion: M.MODEL_VERSION,
  };
  const out = arg("out");
  if (out) writeFileSync(out, JSON.stringify(rec, null, 2) + "\n");
  console.log(JSON.stringify(rec, null, 2));
}
function cmdEpisode() {
  const arm = arg("arm", REFERENCE_ARM);
  assertScoringAllowed3([arm]);
  const persona = PERSONAS.find((p) => p.id === arg("persona", PERSONAS[0].id));
  const e3 = loadE3(arg("e3"));
  const r = runEpisode3({ persona, arm, seed: +arg("seed", CRITERION2.seeds.first), cell: cellByName3(arg("cell", BASE_CELL), E1, e3), e3 });
  console.log(r.hash);
}
function cmdCells() { for (const c of allCells3(E1, loadE3(arg("e3")))) console.log(`${c.kind}\t${c.name}`); }

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const f = { seeds: cmdSeeds, episode: cmdEpisode, cells: cmdCells }[process.argv[2]];
  if (!f) { console.error("usage: node harness3.mjs seeds|episode|cells [options] (see header); the full run is run3.mjs"); process.exit(2); }
  Promise.resolve().then(f).catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
