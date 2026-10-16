// The judge's world inputs: every number the eval learner uses, named, with its source.
// owner: personalization-eval (Uma) · run: eval-c1-1016 · criterion: company/personalization/eval/2026-10-16-phase-a-criterion.md
// Judge module: imports nothing (criterion T5). No policy, curve, weight or lesson dim is read here.
//
// THE B2 BLOCK IS A NAMED INPUT, NOT A FILLED PLACEHOLDER. In C1 it holds the values of the B2 memo's ranges table
// (company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md, "The ranges table"), as
// written, before the C0 full-text check (company/personalization/evidence/2026-10-16-ranges-fulltext-check.md).
// C4 replaces this block from the B2 table as corrected by C0 (batch-2 C4 step 2), applies the criterion §4 rules,
// and, if a base value changed, recomputes S from the default-order arm only. `B2.status` says which state it is in.
// Run with another block: `--inputs=<file.json>` (same keys); the harness logs the hash of the block it used.

export const B2 = {
  status: "memo-as-written (pre-C0); C4 fills from the C0-corrected table",
  memo: "company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md#the-ranges-table-for-the-c1-sweep",
  // per-day exponential rate k over the 1-7 day first-revisit window. [R] Roediger & Karpicke 2006; high bound has no named source (VP decision §5).
  forgetRate: { low: 0.04, base: 0.10, high: 0.20, confidence: "low-medium" },
  // ratio of the fastest to the slowest persona's rate
  forgetSpread: { low: 1.5, base: 2, high: 3, confidence: "low" },
  // hidden per-lesson pull, P(predicts the misconception | concept unknown)
  pull: { low: 0.30, base: 0.55, high: 0.85, confidence: "low-medium" },
  // additive learner modifier on the lesson's pull
  pullModifier: { low: -0.15, base: 0, high: 0.10, confidence: "low" },
  // relative cut in encoding when >= 1 in-pilot prerequisite is unknown; no recovery
  prereqPenalty: { low: 0.00, base: 0.15, high: 0.40, stress: 0.50, confidence: "low" },
  priorKnowledgeMean: { low: 0.05, base: 0.20, high: 0.50, confidence: "low" },
  priorKnowledgeSpread: { low: 0.05, base: 0.15, high: 0.25, confidence: "low" },
  // relative boost to encoding, every lesson (prediction then feedback)
  predictionFeedback: { low: 0.00, base: 0.10, high: 0.25, confidence: "medium" },
  // relative boost to first-revisit recall after a misconception error that was then learned, net of reversion
  hypercorrection: { low: 0.00, base: 0.05, high: 0.15, confidence: "low-medium" },
  // relative boost to encoding when the concept or the domain is unseen
  novelty: { low: -0.05, base: 0.00, high: 0.05, confidence: "low" },
};

// Unsourced constants the B2 table does not cover. Copied from the provisional learner (sim/learner.ts BASE_PARAMS,
// read as an artifact), labelled guesses, NOT swept. C2 (learning-scientist-personalization) may challenge any.
export const UNSOURCED = {
  learnRate: 0.7,            // P(encode | unknown, no penalty) before the prediction-feedback boost. guess
  slip: 0.1,                 // P(wrong prediction | known). guess
  guessRecall: 0.2,          // floor on recall probability (a guess at a revisit). guess
  relearn: 0.5,              // P(encode from the feedback of a failed revisit). guess
  revisitStrengthen: 0.5,    // forgetting multiplier after a successful revisit (halves the rate). guess
  stopBeforeRevealShare: 0.5,// share of stops that happen before the reveal. guess
  forgetPrereqPenalty: 0,    // B2 supports only an encoding cut, so the forgetting penalty is 0 (decision file, finding 2)
  priorClamp: [0.01, 0.95],
};

// Episode definition (criterion §1: fixed in C1, same for every policy).
export const EPISODE = {
  days: 14,                  // simulated days with new cards; day 14 is revisits only
  maxCardsPerDay: 12,        // new cards per session at most; the learner may stop earlier (stop hazard)
  sessionStartHour: 9,       // one session per day at 09:00 UTC; the learner returns every day
  cardMinutes: 2,            // simulated clock advance per new card
  revisitMinutes: 1,
  prehistoryDays: 20, prehistoryRecallTaken: 0.7, jitter: 0.1, // visible pre-history (copied from sim/simulate.mjs SIM)
  firstRevisit: "the first session on a later day than the completion (REVISIT_SCHEDULE_DAYS[0] = 1 day; src/kit/progress.ts)",
  baseTime: Date.UTC(2026, 9, 16),
};

// The criterion's thresholds (criterion §2, §3), as named inputs so the judge code carries no literal.
export const CRITERION = {
  deltaMin: 0.01, deltaHarm: 0.01, // deltaHarm 0.02 -> 0.01: VP contest accepted, criterion §8 ruling (eval-c1-1016)
  winsNeeded: 4, personas: 6,
  g1MaxRise: 0.05, g2MaxRelFall: 0.05, g3MaxRise: 0.02, g4MaxRelFall: 0.05,
  rhoAgreement: { value: 0.5, label: "guess: no blind second rating exists (C3 held, VP decision §2)" },
  seeds: { first: 1001, floor: 200, cap: 2000 },
};

/**
 * The sweep cells, derived from B2 by the criterion §4 rules (set before any result). Returns
 * { name, kind: "base"|"one-at-a-time"|"corner"|"novelty"|"rho", world: {...} } for every cell.
 * Rules applied here:
 *  - forgetting scale low/high = the wider of the exit row's ±50% and B2's low/base, high/base (criterion §4 note, C1).
 *  - pull scale 0.5 / 1 / 1.5 on the hidden per-lesson pull (exit row).
 *  - prerequisite penalty absolute low/base/high from B2; 0 kept (B2 low is 0).
 *  - surprise (hypercorrection): B2 low is 0 or confidence below medium => base 0; low 0; high = B2 high.
 *  - novelty: base = B2 base (0); the VP's per-term request runs B2 low/base/high (criterion §8 ruling).
 *  - prediction-feedback: B2 base, not swept (it applies to every lesson alike).
 */
export function cells(b2 = B2) {
  const fLow = Math.min(0.5, b2.forgetRate.low / b2.forgetRate.base);
  const fHigh = Math.max(1.5, b2.forgetRate.high / b2.forgetRate.base);
  const surpriseBaseZero = b2.hypercorrection.low <= 0 || !["medium", "high"].includes(b2.hypercorrection.confidence);
  const sBase = surpriseBaseZero ? 0 : b2.hypercorrection.base;
  const base = { forgetScale: 1, pullScale: 1, prereqPenalty: b2.prereqPenalty.base, hypercorrection: sBase,
    novelty: b2.novelty.base, rho: CRITERION.rhoAgreement.value };
  const out = [{ name: "base", kind: "base", world: { ...base } }];
  const axes = {
    forgetScale: [fLow, fHigh], pullScale: [0.5, 1.5],
    prereqPenalty: [b2.prereqPenalty.low, b2.prereqPenalty.high], hypercorrection: [b2.hypercorrection.low, b2.hypercorrection.high],
  };
  for (const [k, [lo, hi]] of Object.entries(axes)) {
    out.push({ name: `${k}-low`, kind: "one-at-a-time", world: { ...base, [k]: lo } });
    out.push({ name: `${k}-high`, kind: "one-at-a-time", world: { ...base, [k]: hi } });
  }
  const keys = Object.keys(axes);
  for (let m = 0; m < 16; m++) {
    const w = { ...base };
    keys.forEach((k, i) => { w[k] = axes[k][(m >> i) & 1]; });
    out.push({ name: "corner-" + keys.map((k, i) => ((m >> i) & 1 ? "H" : "L")).join(""), kind: "corner", world: w });
  }
  for (const v of [b2.novelty.low, b2.novelty.base, b2.novelty.high]) out.push({ name: `novelty-${v}`, kind: "novelty", world: { ...base, novelty: v } });
  for (const rho of [0, CRITERION.rhoAgreement.value, 1]) {
    for (const s of ["base", "high"]) {
      const h = s === "base" ? sBase : b2.hypercorrection.high;
      out.push({ name: `rho-${rho}-surprise-${s}`, kind: "rho", world: { ...base, rho, hypercorrection: h } });
    }
  }
  return out;
}

/**
 * Per-persona world parameters from the copied latents and B2, by written rules (no tuning):
 *  - forgetting: k_p = B2.forgetRate.base × spread^pos_p × forgetScale, pos_p in [-0.5, 0.5] is the persona's
 *    position on the log scale of the copied latents (fastest/slowest = B2 spread, geometric centre = B2 base).
 *  - pull modifier: piecewise linear in the copied misconceptionPull around the persona mean, reaching
 *    B2.pullModifier.low at the lowest persona and .high at the highest.
 *  - prior knowledge: the 12 copied persona × domain values standardised, then mean B2 base, SD B2 spread, clamped.
 *  - prerequisite penalty: absolute, the cell's value, the same for every persona (B2 gives no between-learner spread);
 *    the copied per-persona prereqPenalty is not used.
 *  - interest, stopHazard: copied as is (they drive stopping only, never the score).
 */
export function personaWorld(persona, personas, cell, b2 = B2) {
  const L = persona.latent;
  const rates = personas.map((p) => Math.log(p.latent.forgetRate));
  const lo = Math.min(...rates), hi = Math.max(...rates);
  const pos = hi > lo ? (Math.log(L.forgetRate) - (lo + hi) / 2) / (hi - lo) : 0;
  const forgetK = b2.forgetRate.base * Math.pow(b2.forgetSpread.base, pos) * cell.forgetScale;
  const pulls = personas.map((p) => p.latent.misconceptionPull);
  const pm = pulls.reduce((a, b) => a + b, 0) / pulls.length, pmin = Math.min(...pulls), pmax = Math.max(...pulls);
  const x = L.misconceptionPull;
  const pullModifier = x >= pm ? (pmax > pm ? b2.pullModifier.high * (x - pm) / (pmax - pm) : 0)
    : (pm > pmin ? b2.pullModifier.low * (pm - x) / (pm - pmin) : 0);
  const priors = personas.flatMap((p) => [p.latent.priorKnowledge.probability, p.latent.priorKnowledge.cs]);
  const mu = priors.reduce((a, b) => a + b, 0) / priors.length;
  const sd = Math.sqrt(priors.reduce((a, b) => a + (b - mu) ** 2, 0) / (priors.length - 1));
  const [cl, ch] = UNSOURCED.priorClamp;
  const prior = (v) => Math.max(cl, Math.min(ch, b2.priorKnowledgeMean.base + b2.priorKnowledgeSpread.base * (sd > 0 ? (v - mu) / sd : 0)));
  return {
    forgetK, pullModifier, pullScale: cell.pullScale,
    priorKnowledge: { probability: prior(L.priorKnowledge.probability), cs: prior(L.priorKnowledge.cs) },
    learnPrereqPenalty: cell.prereqPenalty, forgetPrereqPenalty: UNSOURCED.forgetPrereqPenalty,
    hypercorrection: cell.hypercorrection, novelty: cell.novelty, predictionFeedback: b2.predictionFeedback.base,
    learnRate: UNSOURCED.learnRate, slip: UNSOURCED.slip, guessRecall: UNSOURCED.guessRecall, relearn: UNSOURCED.relearn,
    revisitStrengthen: UNSOURCED.revisitStrengthen, stopBeforeRevealShare: UNSOURCED.stopBeforeRevealShare,
    interest: { ...L.interest }, stopHazard: L.stopHazard,
  };
}
