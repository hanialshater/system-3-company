// Criterion 2's simulated learner (eval-owned). Started as a copy of ../learner.mjs (phase A, frozen with readout 1 and
// not edited); the differences are listed in criterion 2 §1 (L1 to L6) and marked "C2:" below.
// owner: personalization-eval (Uma) · run: eval-k1-1016 · criterion: company/personalization/eval/2026-10-16-criterion-2.md
// Judge module: imports NOTHING (criterion 2 T5). It never sees a composer score, a curve, a weight or a lesson rating;
// the harness gives it only { slug, concept, domain } per lesson and the in-pilot prerequisite graph.
//
// Model, in words:
//   - Each in-pilot concept is known or not. Start: known with P = priorKnowledge[domain], clock at the episode start
//     (C2 L4, answers C2 F23); then the visible pre-history.
//   - Predict: known -> right with P 1 - slip; unknown -> wrong with P = clamp(pull(lesson) x pullScale + pullModifier).
//   - Study (a new card that reached the reveal): unknown -> encodes with
//       P = learnRate x (1 + predictionFeedback) x (1 - learnPrereqPenalty x [any in-pilot prerequisite unknown]);
//     known -> the clock is refreshed. (No novelty and no hypercorrection term: both 0 in criterion 2, C2 L6.)
//   - Recall at t of a known concept: guessRecall + (1 - guessRecall) x kept, kept = exp(-forgetK x mult x days since
//     the clock). Unknown: guessRecall. (The C4 form, kept.)
//   - Revisit (C2 L2, L3): recalled with that P. If recalled AND known: clock reset, and mult x= revisitStrengthen^(1 - r),
//     r = kept at the revisit (a revisit before any forgetting strengthens nothing; one after full decay multiplies the
//     rate by revisitStrengthen). Otherwise (failed, or a lucky guess on an unknown concept): the feedback re-encodes
//     with P relearn (clock reset, mult kept), else the concept is unknown.
//   - Stop after each card, revisit or new (C2 L5), with P = stopHazard x (1.5 - interest[domain]) (x revisitStopScale
//     after a revisit card), keyed by (day, position in the session), so two arms at the same seed share the stop dice
//     position by position.

const DAY = 86_400_000;
const clamp01 = (x) => Math.max(0, Math.min(1, x));

/** 53-bit string hash (cyrb53), mapped to [0, 1). Same function as ../learner.mjs u01 (copied: judge imports nothing). */
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
export function normal(key) {
  const a = Math.max(u01(key + "|n0"), 1e-300), b = u01(key + "|n1");
  return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
}
export function triangular(u, lo, mode, hi) {
  const f = (mode - lo) / (hi - lo);
  return u < f ? lo + Math.sqrt(u * (hi - lo) * (mode - lo)) : hi - Math.sqrt((1 - u) * (hi - lo) * (hi - mode));
}
export function triangularMoments(lo, mode, hi) {
  const mean = (lo + mode + hi) / 3;
  const v = (lo * lo + mode * mode + hi * hi - lo * mode - lo * hi - mode * hi) / 18;
  return { mean, sd: Math.sqrt(v) };
}
/** Hidden per-lesson pull (same keys as phase A, so the same seed gives the same pulls). */
export function hiddenPull(seed, slug, pullRange) {
  return triangular(u01(`${seed}|world|${slug}|pull|0`), pullRange.low, pullRange.base, pullRange.high);
}
/** The composer's rating at fidelity rho (phase A definition, unchanged; inert for the GAM at model-v0.2.2). */
export const RATING_CUTS = { level2Above: 0.5, level3From: 0.7 };
export function simulatedRating(seed, slug, rho, pullRange) {
  const { mean, sd } = triangularMoments(pullRange.low, pullRange.base, pullRange.high);
  const z = (hiddenPull(seed, slug, pullRange) - mean) / sd;
  const zObs = rho * z + Math.sqrt(Math.max(0, 1 - rho * rho)) * normal(`${seed}|world|${slug}|rating|0`);
  const obs = mean + sd * zObs;
  return obs <= RATING_CUTS.level2Above ? 1 : obs >= RATING_CUTS.level3From ? 3 : 2;
}

/**
 * world: personaWorld2() output. graph: { prereqsOf(concept), pilotConcepts }. pullOf(slug): hidden pull.
 * startTime: the episode start (prior-known clock, C2 L4).
 */
export function makeLearner2({ seed, personaId, world, graph, pullOf, startTime }) {
  const W = world;
  const known = new Map(); // concept -> { at, mult }
  const occ = new Map();
  const pilot = [...graph.pilotConcepts].sort();
  let day = -1, pos = 0;
  const draw = (key, event) => {
    const k = `${key}|${event}`;
    const n = occ.get(k) ?? 0;
    occ.set(k, n + 1);
    return u01(`${seed}|${personaId}|${k}|${n}`);
  };
  for (const c of pilot) {
    const dom = c.split(":")[0];
    if (draw(c, "prior") < (W.priorKnowledge[dom] ?? 0)) known.set(c, { at: startTime, mult: 1 }); // C2 L4
  }
  const anyPrereqUnknown = (c) => graph.prereqsOf(c).some((p) => !known.has(p));
  const keptOf = (k, t) => Math.exp(-W.forgetK * k.mult * Math.max(0, (t - k.at) / DAY));
  const recallProb = (lesson, t) => {
    const k = known.get(lesson.concept);
    return k ? W.guessRecall + (1 - W.guessRecall) * keptOf(k, t) : W.guessRecall;
  };
  const pEncode = (c) => clamp01(W.learnRate * (1 + W.predictionFeedback) * (1 - W.learnPrereqPenalty * (anyPrereqUnknown(c) ? 1 : 0)));
  const stopAfterCard = (lesson, scale = 1) => {
    const pStop = clamp01(scale * W.stopHazard * (1.5 - (W.interest[lesson.domain] ?? 0.5)));
    const key = `${seed}|${personaId}|card|${day}|${pos++}`;
    return { stop: u01(`${key}|stop`) < pStop, beforeReveal: u01(`${key}|before-reveal`) < W.stopBeforeRevealShare };
  };
  return {
    /** Start a session (C2 L5): the stop dice are keyed by (day, position). */
    beginSession(d) { day = d; pos = 0; },
    /** Visible pre-history -> hidden state (phase A rule, unchanged). */
    seedKnowledge(history, dimsLite) {
      for (const h of history) {
        const d = dimsLite[h.slug]; if (!d) continue;
        const r = h.recalls[0];
        if (r) { if (r.correct) known.set(d.concept, { at: r.at, mult: 1 }); else known.delete(d.concept); }
        else if (h.predictedCorrectly || draw(d.concept, "history") < W.learnRate) known.set(d.concept, { at: h.completedAt, mult: 1 });
      }
    },
    /** A new card. */
    study(lesson, t) {
      const c = lesson.concept;
      const was = known.has(c);
      const pull = clamp01(pullOf(lesson.slug) * W.pullScale + W.pullModifier);
      const uPred = draw(c, "predict");
      const predictedRight = was ? uPred < 1 - W.slip : uPred >= pull;
      const s = stopAfterCard(lesson);
      const revealed = !(s.stop && s.beforeReveal);
      let learned = false;
      if (revealed) {
        if (was) known.set(c, { at: t, mult: known.get(c).mult });
        else if (draw(c, "learn") < pEncode(c)) { learned = true; known.set(c, { at: t, mult: 1 }); }
      }
      return { predictedRight, revealed, stop: s.stop, learned };
    },
    /** A revisit card (C2 L2, L3, L5). Returns the realised answer, its expected value before it, and the stop. */
    revisit(lesson, t) {
      const c = lesson.concept;
      const k = known.get(c);
      const p = recallProb(lesson, t);
      const ok = draw(c, "revisit") < p;
      if (ok && k) known.set(c, { at: t, mult: k.mult * Math.pow(W.revisitStrengthen, 1 - keptOf(k, t)) });
      else if (draw(c, "relearn") < W.relearn) known.set(c, { at: t, mult: k?.mult ?? 1 });
      else known.delete(c);
      const s = stopAfterCard(lesson, W.revisitStopScale);
      return { ok, p, stop: s.stop };
    },
    recallProb,
    /** Share of the increment above the floor kept at t, for one concept (0 if unknown). */
    keptAt: (concept, t) => { const k = known.get(concept); return k ? keptOf(k, t) : 0; },
    /** The final-test read (criterion 2 §1): sum over in-pilot concepts of the share kept at t. Pure: changes nothing. */
    knowledgeAt: (t) => pilot.reduce((a, c) => a + (known.has(c) ? keptOf(known.get(c), t) : 0), 0),
    knownCount: () => known.size,
    /**
     * Oracle view (criterion 2 §2.3, §2.4): hidden-state reads for the judge's reference policies only. Never given to a
     * policy under test. gainIfStudied: expected rise of the concept's kept share at tRead if the lesson were studied
     * at t (stop and reveal ignored: they do not depend on the lesson chosen).
     */
    oracle: {
      gainIfStudied(lesson, t, tRead) {
        const k = known.get(lesson.concept);
        if (k) return keptOf({ at: t, mult: k.mult }, tRead) - keptOf(k, tRead);
        return pEncode(lesson.concept) * keptOf({ at: t, mult: 1 }, tRead);
      },
      recallProb,
    },
    snapshot() {
      return JSON.stringify([...known.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)));
    },
  };
}
