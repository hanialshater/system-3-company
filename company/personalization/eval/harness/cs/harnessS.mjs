#!/usr/bin/env node
// The session criterion's harness: glue between the session composer (composer-v0.3-session) and criterion 3's world.
// owner: personalization-eval (Uma) · run: eval-s1-1020 · criterion: company/personalization/eval/2026-10-20-session-criterion.md
// Offline only, Node >= 22.18, no dependencies. NOT a judge module. Edits no file in ../c2/, ../c3/, ../c3b/ or ..
//
// runEpisodeS is criterion 3's runEpisode3 (../c3/harness3.mjs) for the ordering arms this criterion keeps, plus one
// serving mode: a SESSION arm composes COMPOSER_SESSION.sessionSize new cards in one call (sim/simulate.mjs
// composeSessionFor, the builder's own glue, imported read-only) and serves them in order; it recomposes when the plan is
// used up or a new day (session) starts. That is model.ts COMPOSER_SESSION.servingMode "compose-session-serve-in-order",
// as built (criterion §1.2). Revisits are placed by criterion 3's Feed.tsx interleave exactly as for every other arm; a
// revisit never changes a plan. For non-session arms runEpisodeS equals runEpisode3 byte for byte (test S-ID1).
//
// Counters outside the hash (criterion §3, §4): K4 served subject mix against the learner's home domain (visible
// pre-history only); K5 reasonCarriesMove on served moved cards; near-ties (VP record §7 O8); moved share by session slot;
// circular diagnostics (sim/simulate.mjs circularDiagnostics, "circular: diagnostic only") when opts.diagnostics.
//
// FREEZE LOCK: while the criterion's status line is not `frozen`, only default-order+fixed and fixture arms run (CLI,
// runS.mjs, the worker). Fixtures exist only to show the plumbing and the checks can fail; never an arm under test.
//
// Commands:
//   node harnessS.mjs seeds [--pilot=500] [--out=<file>]   S from default-order+fixed at interleave:base alone (SDs only)
//   node harnessS.mjs episode --persona=<id> --seed=<n> [--cell=interleave:base] [--arm=default-order+fixed]   hash only
//   node harnessS.mjs pin                                  the candidate pin (file sha256s, catalogue sha256, variants)
//   node harnessS.mjs cells                                the cell list with each cell's role
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { SESSION_VARIANTS, composeSessionFor, circularDiagnostics } from "../../../model/sim/simulate.mjs";
import { reasonTermValue } from "../../../model/sim/composer-session.ts";
import { choose, seedHistory, poolFor } from "../harness.mjs";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, EPISODE2, CRITERION2, personaWorld2 } from "../c2/world2.mjs";
import { hiddenPull, u01 } from "../c2/learner2.mjs";
import { newLog2, scoreEpisode2, sd, seedsFromSd } from "../c2/scorer2.mjs";
import { catalog, parseArm, FIXED, oracleOrder, reviewInput, decisionProblems } from "../c2/harness2.mjs";
import { makeLearner3 } from "../c3/learner3.mjs";
import { E3, FEED, personaWorld3 } from "../c3/world3.mjs";
import { feedDue, allCells3, cellByName3, REFERENCE_ARM, BASE_CELL } from "../c3/harness3.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, "..", "..", "..", "..", "..");
export const CRITERION_S_FILE = join(HERE, "..", "..", "2026-10-20-session-criterion.md");
const DAY = 86_400_000;
const sha = (s) => createHash("sha256").update(s).digest("hex");
export { catalog, parseArm, REFERENCE_ARM, BASE_CELL };

// ---------------- arms (criterion §2) ----------------
/** The four session variants under test (VP record W-2002 §4). Each keeps the fixed schedule (Feed.tsx interleave). */
export const SESSION_ARMS = ["gam-session+fixed", "gam-session-v3+fixed", "gam-session-no-cov+fixed", "gam-session-v3-edpbase+fixed"];
/** Context arms, base cell only, no rule (VP record §4 "context only"; oracle-order = criterion 2 §2.3 headroom). */
export const CONTEXT_ARMS = ["gam+fixed", "draft-rules+fixed", "random+fixed", "oracle-order+fixed"];
/** The K3 attribution contrasts, in the VP's order a, b, c: [complex, simpler]. */
export const K3_CONTRASTS = { K3a: ["gam-session+fixed", "gam-session-no-cov+fixed"], K3b: ["gam-session-v3+fixed", "gam-session+fixed"], K3c: ["gam-session-v3-edpbase+fixed", "gam-session-v3+fixed"] };

/** Session fixtures (plumbing and checks only). Each returns a SessionComposition-shaped object from ComposeInput. */
const eligible = (input) => { const done = new Set(input.history.map((h) => h.slug)); return input.defaultOrder.filter((s) => !done.has(s)); };
const fxPick = (slug, i, moved = false, carries = null, reason = "default") => ({ slug, moved, reason, terms: [], score: 0, slot: i, reasonCarriesMove: carries });
const fxSlot = (slug, def, i, moved, carries, margin) => ({ slot: i, sessionSlot: i, kind: "new", defaultCard: def, defaultScore: 0, winner: slug, moved, reason: moved ? "repair" : "default", margin, reasonCarriesMove: carries, candidates: [] });
export const SESSION_FIXTURES = {
  /** The default order composed as a session of 5: must reproduce the reference arm byte for byte (S-ID2). */
  "fixture-session-default": (input) => {
    const el = eligible(input).slice(0, M.COMPOSER_SESSION.sessionSize);
    return { picks: el.map((s, i) => fxPick(s, i)), slots: el.map((s, i) => fxSlot(s, s, i, false, null, null)), personalised: false, note: "fixture" };
  },
  /** Swaps the first two default cards and marks the move as not carried by its reason: K5's counter must see it. */
  "fixture-session-swap-uncarried": (input) => {
    const el = eligible(input).slice(0, M.COMPOSER_SESSION.sessionSize);
    if (el.length > 1) [el[0], el[1]] = [el[1], el[0]];
    const def = eligible(input);
    return { picks: el.map((s, i) => fxPick(s, i, i === 0 && el.length > 1, i === 0 && el.length > 1 ? false : null, i === 0 && el.length > 1 ? "repair" : "default")),
      slots: el.map((s, i) => fxSlot(s, def[i] ?? s, i, i === 0 && el.length > 1, i === 0 && el.length > 1 ? false : null, i === 0 && el.length > 1 ? 0.05 : null)), personalised: true, note: "fixture" };
  },
  /** Reads a forbidden input: T3S must catch it. */
  "fixture-session-forbidden-reader": (input) => {
    const c = SESSION_FIXTURES["fixture-session-default"](input);
    if (input.sessionCount === 7 || input.fingerprint?.sessionCount === 7) c.picks.reverse();
    return c;
  },
  /** Not deterministic: T1/T2S must catch it. */
  "fixture-session-nondeterministic": (input) => {
    const c = SESSION_FIXTURES["fixture-session-default"](input);
    if (Math.random() < 0.5) c.picks.reverse();
    return c;
  },
};
export const isSessionOrder = (order) => Boolean(SESSION_VARIANTS[order] || SESSION_FIXTURES[order]);
export const SESSION_POLICIES = Object.keys(SESSION_VARIANTS);

/** One composition for a session order: the builder's glue for a variant (byte for byte what the simulator and HQ call). */
export function composeS(order, input, cat) {
  if (SESSION_FIXTURES[order]) return SESSION_FIXTURES[order](input, cat);
  return composeSessionFor(order, input, cat);
}

// ---------------- freeze lock ----------------
export function criterionStatusS(file = CRITERION_S_FILE) {
  const m = readFileSync(file, "utf8").match(/^status:\s*(.+)$/m);
  return m ? m[1].trim() : "missing";
}
export const UNFROZEN_ALLOWED_S = (arm) => {
  const { order, review } = parseArm(arm);
  return (order === "default-order" || order.startsWith("fixture-")) && review === "fixed";
};
export function assertScoringAllowedS(arms, file = CRITERION_S_FILE) {
  const st = criterionStatusS(file);
  if (/^frozen\b/.test(st)) return;
  const bad = arms.filter((a) => !UNFROZEN_ALLOWED_S(a));
  if (bad.length) throw new Error(`freeze lock: session criterion status is "${st}"; refusing to score ${bad.join(", ")} (only default-order+fixed and fixture arms until frozen)`);
}

// ---------------- cells (criterion §2.3): criterion 3's interleave cells, unchanged ----------------
/** role: "base" | "oat" (pass-relevant one-at-a-time) | "reported" (outer, corner). The first placement is not run. */
export function cellsS(e1 = E1, e3 = E3) {
  return allCells3(e1, e3).filter((c) => c.placement === "interleave")
    .map((c) => ({ ...c, role: c.kind === "base" ? "base" : c.kind === "one-at-a-time" ? "oat" : "reported" }));
}
export const cellByNameS = (name, e1 = E1, e3 = E3) => cellByName3(name, e1, e3);

// ---------------- the candidate pin (criterion §6; EDD-016 §4.2 until W-1994's single file exists) ----------------
export const PIN_FILES = [
  "company/personalization/model/model.ts",
  "company/personalization/model/sim/composer-session.ts",
  "company/personalization/model/sim/composer.ts",
  "company/personalization/model/sim/simulate.mjs",
  "company/personalization/model/sim/catalog.mjs",
];
export const catalogSha = (cat = catalog()) => sha(JSON.stringify({ lessons: cat.lessons, defaultOrder: cat.defaultOrder, prereqsByConcept: cat.prereqsByConcept, pilotConcepts: [...cat.pilotConcepts].sort() }));
export function candidatePin(cat = catalog()) {
  return {
    files: Object.fromEntries(PIN_FILES.map((f) => [f, sha(readFileSync(join(ROOT, f)))])),
    catalogSha256: catalogSha(cat), lessons: cat.lessons.length,
    modelVersion: M.MODEL_VERSION, phaseAModelVersion: M.PHASE_A_MODEL_VERSION, composer: M.COMPOSER_SESSION.version,
    servingMode: M.COMPOSER_SESSION.servingMode, sessionSize: M.COMPOSER_SESSION.sessionSize,
    variants: Object.fromEntries(Object.entries(SESSION_VARIANTS).map(([k, v]) => [k, { variant: v.variant, off: v.off, coefficientsSha256: sha(JSON.stringify(M.sessionCoefficients(v.variant))) }])),
  };
}
/** The pin as frozen in the criterion file: the fenced block after the line `candidate-pin:` (JSON). Null while unset. */
export function frozenPin(file = CRITERION_S_FILE) {
  const m = readFileSync(file, "utf8").match(/candidate-pin:\s*\n```json\n([\s\S]*?)\n```/);
  if (!m) return null;
  const j = JSON.parse(m[1]);
  return j && j.files ? j : null;
}
/** The run refuses unless the tree's pin equals the frozen pin (files, catalogue, variants). */
export function pinCheck(file = CRITERION_S_FILE, cat = catalog()) {
  const want = frozenPin(file), have = candidatePin(cat);
  if (!want) return { ok: false, why: "no frozen candidate pin in the criterion", have };
  const bad = [];
  for (const k of ["files", "catalogSha256", "variants", "servingMode", "sessionSize"]) if (JSON.stringify(want[k]) !== JSON.stringify(have[k])) bad.push(k);
  return { ok: bad.length === 0, bad, want, have };
}

// ---------------- one episode ----------------
const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); } return o; };
function makePolicyRand(seed, personaId, order) { let n = 0; return () => u01(`${seed}|${personaId}|policy|${order}|${n++}`); }
const NEAR_TIE = 1e-9;

/** The learner's home domain from the visible pre-history only: most completions; tie -> the latest completion's domain. */
export function homeDomain(pre, cat) {
  const n = {};
  for (const h of pre) { const d = cat.dims[h.slug]?.domain; if (d) n[d] = (n[d] || 0) + 1; }
  const ds = Object.keys(n);
  if (!ds.length) return null;
  const top = Math.max(...Object.values(n));
  const tied = ds.filter((d) => n[d] === top);
  if (tied.length === 1) return tied[0];
  const last = [...pre].sort((a, b) => a.completedAt - b.completedAt).at(-1);
  return cat.dims[last.slug].domain;
}

/**
 * One episode: persona x seed x cell x arm (review is always "fixed" in this criterion).
 * opts.onCompose(input, comp, ctx): every session composition before serving (T2S, T3S, T4S, no-mutation hooks).
 * opts.diagnostics: compute the circular diagnostics (base cell in runS). Returns { score, hash, worldHash, extra, steps? }.
 */
export function runEpisodeS({ persona, arm, seed, cell, cat = catalog(), e1 = E1, keepSteps = false, onCompose = null, diagnostics = false }) {
  const { order, review } = parseArm(arm);
  if (review !== "fixed") throw new Error(`session criterion arms keep the fixed schedule (arm ${arm})`);
  const session = isSessionOrder(order);
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
  const home = homeDomain(pre, cat);
  const extra = { home, servedNew: 0, servedOutHome: 0, movedServed: 0, carriesTrue: 0, carriesFalse: 0, carriesNull: 0, nearTie: 0,
    composes: 0, movedBySlot: Array(M.COMPOSER_SESSION.sessionSize).fill(0), servedBySlot: Array(M.COMPOSER_SESSION.sessionSize).fill(0), revisitsUnserved: 0 };
  const diag = diagnostics ? circularDiagnostics(cat) : null;
  const steps = [];
  const policyRand = makePolicyRand(seed, persona.id, order);
  const tLast = EPISODE2.baseTime + (EPISODE2.days - 1) * DAY + EPISODE2.sessionStartHour * 3_600_000;
  const tPrimary = tLast + EPISODE2.primaryHorizonDays * DAY;
  const rule = FIXED;
  const pendingRead = [];

  for (let day = 0; day < EPISODE2.days; day++) {
    learner.beginSession(day);
    let t = EPISODE2.baseTime + day * DAY + EPISODE2.sessionStartHour * 3_600_000;
    for (const x of pendingRead.splice(0)) log.nextDayRecall.push(learner.recallProb(dimsLite[x], t));
    const input = reviewInput(history, t, dimsFrozen, slots);
    const dec = placement === "interleave"
      ? { revisits: feedDue(history, t).map((slug) => ({ slug, reason: "due on the fixed schedule" })) }
      : rule.decide(input);
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
    let plan = null; // session arms: a new plan at every session (day) start, as sim/simulate.mjs runSessionEpisode
    while (!stopped && used < slots) {
      if (placement === "interleave" && newIdx % FEED.every === FEED.at && revisitedAt !== newIdx && queue.length) { revisitedAt = newIdx; serveRevisit(queue.shift()); continue; }
      let pick, slotTrace = null, sessionSlot = null;
      if (session) {
        if (!plan || plan.idx >= plan.picks.length) {
          const fingerprint = M.fingerprintFrom(history, cat.dims, t);
          const needs = M.detect(fingerprint);
          const cinput = { fingerprint, needs, remaining: { ...needs }, pool, defaultOrder: cat.defaultOrder, queued: [], history, dueRevisits: [], personalisationOn: true };
          const comp = composeS(order, cinput, cat);
          if (onCompose) onCompose(cinput, comp, { seed, persona: persona.id, day, t, order, cat });
          plan = { picks: comp.picks.filter((p) => p.reason !== "due-revisit"), slots: (comp.slots || []).filter((x) => x.kind === "new"), idx: 0 };
          extra.composes++;
        }
        sessionSlot = plan.idx;
        pick = plan.picks[plan.idx]; slotTrace = plan.slots[plan.idx] ?? null;
        plan.idx++;
        if (pick && bySlug.has(pick.slug)) throw new Error(`INVALID session pick ${pick.slug}: already completed`);
      } else {
        const usesFp = order !== "oracle-order";
        const fingerprint = usesFp ? M.fingerprintFrom(history, cat.dims, t) : null;
        const needs = usesFp ? M.detect(fingerprint) : {};
        const cinput = { fingerprint, needs, remaining: { ...needs }, pool, defaultOrder: cat.defaultOrder, queued: [], history, dueRevisits: [], personalisationOn: true };
        const comp = order === "oracle-order" ? oracleOrder(cinput, learner, dimsLite, t, tPrimary) : choose(order, cinput, cat, policyRand);
        pick = comp.picks.find((p) => p.reason !== "due-revisit");
      }
      if (!pick) { // catalogue end: Feed.tsx appends the remaining due revisits
        if (placement === "interleave") while (!stopped && queue.length && used < slots) serveRevisit(queue.shift());
        break;
      }
      if (!dimsFrozen[pick.slug]) throw new Error(`INVALID pick ${pick.slug}: not in the pool`);
      const lesson = cat.dims[pick.slug];
      // counters outside the hash
      extra.servedNew++; if (home && lesson.domain !== home) extra.servedOutHome++;
      if (session) {
        if (sessionSlot < extra.servedBySlot.length) { extra.servedBySlot[sessionSlot]++; if (pick.moved) extra.movedBySlot[sessionSlot]++; }
        if (pick.moved) {
          extra.movedServed++;
          if (pick.reasonCarriesMove === true) extra.carriesTrue++; else if (pick.reasonCarriesMove === false) extra.carriesFalse++; else extra.carriesNull++;
          if (slotTrace && slotTrace.margin !== null && Math.abs(reasonTermValue(pick.reason, pick.terms) - slotTrace.margin) <= NEAR_TIE) extra.nearTie++;
        }
      }
      if (diag) diag.add(M.fingerprintFrom(history, cat.dims, t), lesson, history);
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
  if (diag) extra.circular = diag.result();
  return { score, hash, worldHash, extra, steps: keepSteps ? steps : undefined };
}

// ---------------- CLI ----------------
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
export const SEEDS_S = { first: 70001, pilot: 500 }; // criterion §1.4: a fresh block, disjoint from every earlier readout and tuning block

function cmdSeeds() {
  assertScoringAllowedS([REFERENCE_ARM]);
  const pilot = +arg("pilot", SEEDS_S.pilot);
  const cell = cellByNameS(BASE_CELL);
  const cat = catalog();
  const H = EPISODE2.primaryHorizonDays;
  const seeds = Array.from({ length: pilot }, (_, i) => SEEDS_S.first + i);
  const perPersona = {};
  for (const p of PERSONAS) {
    const R = seeds.map((s) => { const sc = runEpisodeS({ persona: p, arm: REFERENCE_ARM, seed: s, cell, cat }).score; return sc.nAll > 0 ? sc.K[H] / sc.nAll : NaN; });
    perPersona[p.id] = { sdR: sd(R), n: R.filter((x) => !Number.isNaN(x)).length, nan: R.filter((x) => Number.isNaN(x)).length };
  }
  const sdMax = Math.max(...Object.values(perPersona).map((x) => x.sdR));
  const S = seedsFromSd(sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap);
  const rec = {
    what: "S from the reference arm (default-order + fixed, Feed.tsx interleave) alone at interleave:base, session criterion block. SDs only; no mean, no other arm.",
    rule: "criterion 2 §1.4, unchanged: S = max(200, ceil((2.8·√2·sd_R/δ_min)²)), cap 2000; sd_R = largest per-persona SD of R_7 of the reference arm",
    e1Hash: sha(JSON.stringify(E1)), e3Hash: sha(JSON.stringify(E3)), catalogSha256: catalogSha(cat), lessons: cat.lessons.length, cellName: BASE_CELL, cell,
    pilotSeeds: `${seeds[0]}..${seeds.at(-1)}`, deltaMin: CRITERION2.deltaMin, perPersona, sdMax, S, seedList: `${SEEDS_S.first}..${SEEDS_S.first + S - 1}`, modelVersion: M.MODEL_VERSION,
  };
  const out = arg("out");
  if (out) writeFileSync(out, JSON.stringify(rec, null, 2) + "\n");
  console.log(JSON.stringify(rec, null, 2));
}
function cmdEpisode() {
  const arm = arg("arm", REFERENCE_ARM);
  assertScoringAllowedS([arm]);
  const persona = PERSONAS.find((p) => p.id === arg("persona", PERSONAS[0].id));
  const r = runEpisodeS({ persona, arm, seed: +arg("seed", SEEDS_S.first), cell: cellByNameS(arg("cell", BASE_CELL)) });
  console.log(r.hash);
}
function cmdPin() { console.log(JSON.stringify(candidatePin(), null, 2)); }
function cmdCells() { for (const c of cellsS()) console.log(`${c.role}\t${c.name}`); }

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const f = { seeds: cmdSeeds, episode: cmdEpisode, pin: cmdPin, cells: cmdCells }[process.argv[2]];
  if (!f) { console.error("usage: node harnessS.mjs seeds|episode|pin|cells [options] (see header); the full run is runS.mjs"); process.exit(2); }
  Promise.resolve().then(f).catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
