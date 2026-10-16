// The eval-owned simulated learner and its hidden world (W-1513 build, lane 14 batch 2 C1).
// owner: personalization-eval (Uma) · run: eval-c1-1016 · decision: company/personalization/eval/2026-10-16-learner-scorer-decision.md
// Judge module: imports NOTHING (criterion T5). It never sees a composer score, a need, a curve, a weight or a
// lesson's rating; the harness gives it only { slug, concept, domain } per lesson and the in-pilot prerequisite graph.
//
// Implements the SimLearner interface of company/personalization/model/sim/learner.ts (study, revisit, knownCount),
// plus recallProb (the expected-value primary, criterion §1), seedKnowledge and snapshot (criterion T6).
// Started from a reading of the provisional learner; four mechanics differ (decision file findings 1 to 4):
//   1. Hidden per-lesson pull, drawn from the eval's own seed (hiddenPull); the composer's rating is generated
//      FROM it at fidelity rho (simulatedRating), never the other way round.
//   2. Prerequisite penalty split: an encoding cut (B2 prereqPenalty, when >= 1 in-pilot prerequisite is unknown)
//      and a forgetting penalty (0: B2 supports only the encoding cut). Binary in "any prerequisite unknown", as B2 words it.
//   3. Common random numbers: every draw is a hash of (seed, persona, key, event, occurrence), so two policies that
//      meet the same concept get the same dice for it, whatever came before.
//   4. The scorer reads recallProb at each completed lesson's scheduled first revisit (no survivorship).
//
// Model, in words:
//   - Each in-pilot concept is known or not. Start: known with P = priorKnowledge[domain]; then the visible pre-history.
//   - Predict: known -> right with P 1 - slip; unknown -> wrong with P = clamp(pull(lesson) × pullScale + pullModifier).
//   - Study, if the card reached the reveal: unknown -> encodes with
//       P = learnRate × (1 + predictionFeedback) × (1 - learnPrereqPenalty·[any prerequisite unknown]) × (1 + novelty·[context switch]).
//     [context switch] (C4, answer to C2 F3) = the lesson's domain differs from the domain of the previous completed card
//     (pre-history included; false for the very first card). C1's trigger ("concept never completed, or domain not among
//     the last 10 completed") was true for nearly every card and copied the composer's own novelty tests; replaced.
//     Known -> the clock is refreshed. A card left before the reveal changes nothing (and is not "seen").
//   - Recall at time t of a known concept (C4, answer to C2 F1: the increment-above-floor form, the form under which
//     C0 sourced forgetRate high 0.20): min(1, guessRecall + (1 - guessRecall) × exp(-forgetK × mult × days) ×
//     (1 + hypercorrection·[encoded after a misconception error, until its first revisit])). Unknown: guessRecall.
//     (C1 decayed the whole probability toward 0 and floored it at guessRecall with max; replaced before any score.)
//   - Revisit: recalled with that P; success halves the forgetting multiplier; failure re-encodes with P relearn, else forgets.
//   - Stop after each card with P = stopHazard × (1.5 - interest[domain]), keyed by card position (sessions stay aligned).

const DAY = 86_400_000;
const clamp01 = (x) => Math.max(0, Math.min(1, x));

/** 53-bit string hash (cyrb53 construction), mapped to [0, 1). Deterministic across processes and platforms. */
export function u01(key) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < key.length; i++) {
    const ch = key.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)) / 9007199254740992;
}

/** Standard normal from two keyed uniforms (Box-Muller). */
export function normal(key) {
  const a = Math.max(u01(key + "|n0"), 1e-300), b = u01(key + "|n1");
  return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
}

/** Triangular(lo, mode, hi): the B2 pull row read as the spread of lessons (low, base, high). */
export function triangular(u, lo, mode, hi) {
  const f = (mode - lo) / (hi - lo);
  return u < f ? lo + Math.sqrt(u * (hi - lo) * (mode - lo)) : hi - Math.sqrt((1 - u) * (hi - lo) * (hi - mode));
}
export function triangularMoments(lo, mode, hi) {
  const mean = (lo + mode + hi) / 3;
  const v = (lo * lo + mode * mode + hi * hi - lo * mode - lo * hi - mode * hi) / 18;
  return { mean, sd: Math.sqrt(v) };
}

/** The hidden per-lesson pull for one seed: a property of the item, the same for every persona and policy. */
export function hiddenPull(seed, slug, pullRange) {
  return triangular(u01(`${seed}|world|${slug}|pull|0`), pullRange.low, pullRange.base, pullRange.high);
}

/**
 * The composer's view of a lesson's pull, on the msr-v1 scale 1-3 (company/personalization/dims/2026-10-16-misconception-strength-rubric.md §2).
 * rho is the correlation between the continuous observed pull and the hidden pull (before rounding to a level):
 *   z_obs = rho·z + sqrt(1 - rho²)·eps,  observed = mean + sd·z_obs (the hidden pull's own mean and sd)
 *   level 1 if observed <= 0.5 (the misconception is not a clear majority pick, rubric level 1 (b));
 *   level 3 if observed >= 0.7 (a robust majority; eval's cut, a guess); else level 2 (a majority pick).
 * eps is keyed per (seed, lesson) and shared across rho values, so rho sweeps are paired. The pull-scale sweep does
 * not change ratings (a rater judges lessons relative to each other).
 */
export const RATING_CUTS = { level2Above: 0.5, level3From: 0.7 };
export function simulatedRating(seed, slug, rho, pullRange) {
  const { mean, sd } = triangularMoments(pullRange.low, pullRange.base, pullRange.high);
  const z = (hiddenPull(seed, slug, pullRange) - mean) / sd;
  const zObs = rho * z + Math.sqrt(Math.max(0, 1 - rho * rho)) * normal(`${seed}|world|${slug}|rating|0`);
  const obs = mean + sd * zObs;
  return obs <= RATING_CUTS.level2Above ? 1 : obs >= RATING_CUTS.level3From ? 3 : 2;
}

/**
 * Make one learner. world: personaWorld() output (world-inputs.mjs). graph: { prereqsOf(concept) -> in-pilot concepts,
 * pilotConcepts: Iterable<string> }. pullOf(slug) -> hidden pull (hiddenPull for this seed).
 */
export function makeLearner({ seed, personaId, world, graph, pullOf }) {
  const W = world;
  const known = new Map(); // concept -> { at, mult, hyper }
  const occ = new Map();
  let lastDomain = null;    // domain of the previous completed card (pre-history or simulation): the novelty context (C2 F3)
  let cardNo = 0;
  const draw = (key, event) => {
    const k = `${key}|${event}`;
    const n = occ.get(k) ?? 0;
    occ.set(k, n + 1);
    return u01(`${seed}|${personaId}|${k}|${n}`);
  };
  for (const c of [...graph.pilotConcepts].sort()) {
    const dom = c.split(":")[0];
    if (draw(c, "prior") < (W.priorKnowledge[dom] ?? 0)) known.set(c, { at: -30 * DAY, mult: 1, hyper: false });
  }
  const anyPrereqUnknown = (c) => graph.prereqsOf(c).some((p) => !known.has(p));
  const markSeen = (lesson) => { lastDomain = lesson.domain; };
  const recallProb = (lesson, t) => {
    const k = known.get(lesson.concept);
    if (!k) return W.guessRecall;
    const days = Math.max(0, (t - k.at) / DAY);
    const kept = Math.exp(-W.forgetK * k.mult * days) * (k.hyper ? 1 + W.hypercorrection : 1); // share of the increment kept
    return Math.min(1, W.guessRecall + (1 - W.guessRecall) * kept);
  };
  return {
    /** Visible pre-history -> hidden state: a recalled concept is known, a failed recall is not, else encoded with P learnRate. */
    seedKnowledge(history, dimsLite) {
      for (const h of history) {
        const d = dimsLite[h.slug]; if (!d) continue;
        const r = h.recalls[0];
        if (r) { if (r.correct) known.set(d.concept, { at: r.at, mult: 1, hyper: false }); else known.delete(d.concept); }
        else if (h.predictedCorrectly || draw(d.concept, "history") < W.learnRate) known.set(d.concept, { at: h.completedAt, mult: 1, hyper: false });
        markSeen(d);
      }
    },
    study(lesson, t) {
      const c = lesson.concept;
      const was = known.has(c);
      const pull = clamp01(pullOf(lesson.slug) * W.pullScale + W.pullModifier);
      const uPred = draw(c, "predict");
      const predictedRight = was ? uPred < 1 - W.slip : uPred >= pull;
      const card = cardNo++;
      const pStop = clamp01(W.stopHazard * (1.5 - (W.interest[lesson.domain] ?? 0.5)));
      const stop = u01(`${seed}|${personaId}|card|${card}|stop`) < pStop;
      const revealed = !(stop && u01(`${seed}|${personaId}|card|${card}|before-reveal`) < W.stopBeforeRevealShare);
      let learned = false;
      if (revealed) {
        const miss = anyPrereqUnknown(c);
        if (was) {
          const k = known.get(c);
          known.set(c, { at: t, mult: k.mult, hyper: k.hyper });
        } else {
          const novel = lastDomain !== null && lastDomain !== lesson.domain;
          const p = clamp01(W.learnRate * (1 + W.predictionFeedback) * (1 - W.learnPrereqPenalty * (miss ? 1 : 0)) * (1 + W.novelty * (novel ? 1 : 0)));
          if (draw(c, "learn") < p) {
            learned = true;
            known.set(c, { at: t, mult: 1 + W.forgetPrereqPenalty * (miss ? 1 : 0), hyper: !predictedRight });
          }
        }
        markSeen(lesson);
      }
      return { predictedRight, revealed, stop, learned };
    },
    /** Ground-truth P(recall) of the lesson's concept at time t. For the scorer only; never shown to a policy. */
    recallProb,
    revisit(lesson, t) {
      const c = lesson.concept;
      const k = known.get(c);
      const ok = draw(c, "revisit") < recallProb(lesson, t);
      if (ok) known.set(c, { at: t, mult: (k?.mult ?? 1) * W.revisitStrengthen, hyper: false });
      else if (draw(c, "relearn") < W.relearn) known.set(c, { at: t, mult: k?.mult ?? 1, hyper: false });
      else known.delete(c);
      return ok;
    },
    knownCount: () => known.size,
    /** The hidden state, serialised in a fixed order (criterion T6). */
    snapshot() {
      return JSON.stringify([...known.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)));
    },
  };
}
