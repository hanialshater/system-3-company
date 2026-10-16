// Phase A episode simulator (W-1494) and per-step trace (W-1504). Offline only; nothing in src/ imports it.
// owner: learner-model-engineer. Node >= 22.18 (type stripping), no dependencies.
//
// One episode = one simulated learner (a persona, jittered) for DAYS days of feed sessions under one policy:
//   1. A pre-simulation history is drawn from the persona's jittered fingerprintMeans (visible history, the
//      same for every policy at a given seed), so fingerprintFrom() sees what the persona describes and the
//      composer has real lessons to repair or build on.
//   2. Each day: due first revisits first (1 day after completion: REVISIT_SCHEDULE_DAYS[0] in src/kit/progress.ts),
//      then new cards from the policy until the learner stops or MAX_CARDS. Recompute after every card.
//   3. A last day with revisits only, so every lesson completed in the simulation gets its first revisit.
// The composer sees only ComposeInput (fingerprint from history, needs, pool, default order, history, due
// revisits). It never sees the persona id or its latent block; the learner (learner.ts, PROVISIONAL) does.
// Only the first revisit is simulated (it is the scored event); later revisits (3, 7, 21 days) are not.
import * as M from "../model.ts";
import { composeExplained, defaultOrderPolicy, randomPolicy, draftRulesPolicy } from "./composer.ts";
import { makeLearner, BASE_PARAMS } from "./learner.ts";
import { newLog, scoreEpisode } from "./score.ts";

export const DAY = 86_400_000;
export const BASE_T = Date.UTC(2026, 9, 16);
export const SIM = { days: 14, maxCardsPerDay: 12, prehistoryDays: 20, prehistoryRecallTaken: 0.7, jitter: 0.1 }; // sim choices, guesses

export function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const fnv = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
const clamp = (x) => Math.max(0, Math.min(1, x));
const LV = { intro: 0, core: 0.5, stretch: 1 };

/** GAM variants: name -> terms switched off. The first three are model.ts POLICIES; the rest are one-term ablations. */
export const GAM_VARIANTS = {
  "gam": [],
  "gam-no-surprise-novelty": ["surprise", "novelty"],
  "gam-no-breadth": ["need:breadth"],
  "gam-off-repair": ["need:repair"],
  "gam-off-build": ["need:build"],
  "gam-off-stretch": ["need:stretch"],
  "gam-off-surprise": ["surprise"],
  "gam-off-novelty": ["novelty"],
  "gam-off-overlap": ["overlap"],
  "gam-off-floor": ["floor"],
};
export const ALL_POLICIES = ["default-order", "draft-rules", ...Object.keys(GAM_VARIANTS), "random", "epsilon-greedy"];

/** Draw the visible pre-simulation history from jittered fingerprint means (no latent read). */
export function seedHistory(persona, cat, rand) {
  const j = (v) => clamp(v + (rand() - 0.5) * SIM.jitter);
  const fm = persona.fingerprintMeans;
  const means = { historySize: j(fm.historySize), missRecent: j(fm.missRecent), recallFailRate: j(fm.recallFailRate),
    successRecent: j(fm.successRecent), levelRecent: j(fm.levelRecent), domainConcentration: j(fm.domainConcentration) };
  const n = Math.round(means.historySize * 30);
  // The home domain of the drawn history is the latent learner's higher-interest domain (the world generates
  // the history; the policy only ever sees the history). Tie: a seed draw.
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
    const at = BASE_T - (n - i) * ((SIM.prehistoryDays * DAY) / Math.max(n, 1));
    const recalls = at + DAY <= BASE_T && rand() < SIM.prehistoryRecallTaken ? [{ at: at + DAY, correct: rand() >= means.recallFailRate }] : [];
    hist.push({ slug: l.slug, completedAt: at, predictedCorrectly: rand() < pRight, recalls });
  });
  return { history: hist, jitteredMeans: means, home };
}

function choose(policy, input, cat, policyRand) {
  if (policy === "default-order") return defaultOrderPolicy(input);
  if (policy === "random") return randomPolicy(input, policyRand);
  if (policy === "draft-rules") return draftRulesPolicy(input, M.COMPOSER, cat.pilotConcepts);
  const off = policy === "epsilon-greedy" ? [] : GAM_VARIANTS[policy];
  if (!off) throw new Error(`unknown policy ${policy}`);
  const c = composeExplained(input, M.COMPOSER, { off, pilotConcepts: cat.pilotConcepts });
  if (policy === "epsilon-greedy") {
    const firstNew = c.picks.findIndex((p) => p.reason !== "due-revisit");
    if (firstNew >= 0 && policyRand() < 0.15) { // sim choice: 15% exploration, as edp-engine
      const done = new Set(input.history.map((h) => h.slug));
      const el = input.defaultOrder.filter((s) => !done.has(s));
      const s = el[Math.floor(policyRand() * el.length)];
      c.picks[firstNew] = { slug: s, moved: s !== el[0], reason: "default", terms: [], score: 0 };
      const st = c.slots.find((x) => x.kind === "new"); if (st) { st.winner = s; st.constraint = "epsilon: random exploration replaced the winner"; }
    }
  }
  return c;
}

/**
 * Run one episode. Returns the score and, if opts.trace, the per-step trace (W-1504).
 * Same (persona, seed, params) gives the same pre-history and the same starting knowledge for every policy.
 */
export function runEpisode({ persona, policy, seed, params = BASE_PARAMS, cat, trace = false, days = SIM.days }) {
  const key = `${seed}|${persona.id}`;
  const histRand = rng(fnv(key + "|history"));
  const learnRand = rng(fnv(key + "|learner"));
  const policyRand = rng(fnv(key + "|policy|" + policy));
  const pre = seedHistory(persona, cat, histRand);
  const prereqsOf = (c) => (cat.prereqsByConcept[c] || []);
  const learner = makeLearner(persona, params, { pilotConcepts: cat.pilotConcepts, prereqsOf }, learnRand);
  learner.seedKnowledge(pre.history, cat.dims);
  const history = pre.history.map((h) => ({ ...h, recalls: [...h.recalls] }));
  const simSlugs = new Set();
  const log = newLog(learner.knownCount());
  const steps = [];
  const stepBySlug = {};
  const initialFp = M.fingerprintFrom(history, cat.dims, BASE_T);

  for (let day = 0; day <= days; day++) {
    let t = BASE_T + day * DAY + 9 * 3_600_000;
    let cards = 0;
    for (;;) {
      const due = history.filter((h) => simSlugs.has(h.slug) && h.recalls.length === 0 && h.completedAt + DAY <= t).map((h) => h.slug);
      if (due.length) { // constraint 1 handled here for speed; the composer enforces the same order
        const slug = due[0];
        const ok = learner.revisit(cat.dims[slug], t);
        history.find((h) => h.slug === slug).recalls.push({ at: t, correct: ok });
        log.firstRecalls.push(ok);
        if (trace) { steps.push({ step: steps.length, day, kind: "revisit", slug, recalled: ok }); if (stepBySlug[slug]) stepBySlug[slug].simulated.firstRecall = ok; }
        t += 60_000; continue;
      }
      if (day === days || cards >= SIM.maxCardsPerDay) break;
      const fingerprint = M.fingerprintFrom(history, cat.dims, t);
      const needs = M.detect(fingerprint);
      const input = { fingerprint, needs, remaining: { ...needs }, pool: cat.lessons, defaultOrder: cat.defaultOrder,
        queued: [], history, dueRevisits: [], personalisationOn: true };
      const comp = choose(policy, input, cat, policyRand);
      const pick = comp.picks.find((p) => p.reason !== "due-revisit");
      if (!pick) break;
      const lesson = cat.dims[pick.slug];
      const doneConcepts = new Set(history.map((h) => cat.dims[h.slug]?.concept));
      const beforePrereq = prereqsOf(lesson.concept).some((c) => !doneConcepts.has(c));
      const out = learner.study(lesson, t);
      log.started++; cards++;
      if (beforePrereq) log.prereqFirst++;
      if (pick.moved) log.moved++;
      if (out.revealed) {
        log.revealed++;
        history.push({ slug: pick.slug, completedAt: t, predictedCorrectly: out.predictedRight, recalls: [] });
        simSlugs.add(pick.slug); log.domains.add(lesson.domain); log.concepts.add(lesson.concept);
      }
      if (trace) {
        const s = { step: steps.length, day, kind: "new", fingerprint, needs: M.explainNeeds(fingerprint),
          personalised: comp.personalised, note: comp.note, slots: comp.slots, served: pick.slug, moved: pick.moved, reason: pick.reason,
          shownBeforePrerequisites: beforePrereq,
          simulated: { predictedRight: out.predictedRight, revealed: out.revealed, stopped: out.stop, firstRecall: null } };
        steps.push(s); if (out.revealed) stepBySlug[pick.slug] = s;
      }
      t += 120_000;
      if (out.stop) break;
    }
  }
  log.knownEnd = learner.knownCount();
  const score = scoreEpisode(log);
  const result = { persona: persona.id, policy, seed, score };
  if (trace) {
    result.trace = {
      schema: "personalization-sim-trace-v0", modelVersion: M.MODEL_VERSION, composer: M.COMPOSER.version,
      provisional: "simulated learner and scorer are PROVISIONAL placeholders by the builder (learner-model-engineer); to be replaced or owned by personalization-eval; smoke test, not evidence",
      criterion: "none committed (W-1496); unscored",
      persona: { id: persona.id, name: persona.name, fingerprintMeans: persona.fingerprintMeans, jitteredMeans: pre.jitteredMeans, homeDomain: pre.home },
      groundTruth: { note: "simulator only; no policy read this", latent: persona.latent, params },
      initialFingerprint: initialFp, preHistoryCount: pre.history.length, steps, score,
    };
  }
  return result;
}
