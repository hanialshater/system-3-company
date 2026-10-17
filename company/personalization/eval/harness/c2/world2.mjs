// Criterion 2's world inputs: every number the criterion-2 learner and episode use, named, with its source.
// owner: personalization-eval (Uma) · run: eval-k1-1016 · criterion: company/personalization/eval/2026-10-16-criterion-2.md (§1, §4)
// Judge module: imports nothing (criterion 2 T5). No policy, curve, weight or lesson rating is read here.
//
// THE E1 BLOCK, FILLED IN K2 (run eval-k2-1016) from company/personalization/evidence/2026-10-16-criterion-2-ranges.md
// ("Ranges table"), row by row, as cited in each `mark`. Two rows spot-checked against their sources by the eval (criterion 2
// §4). Rows E1 does not give (pull, pullModifier, prereqPenalty, predictionFeedback) carry B2 (C4) unchanged, as E1 says.
// Run with another block: `--inputs=<file.json>` (same keys); the manifest records the hash of the block used.

export const E1 = {
  status: "FILLED from E1 (K2, run eval-k2-1016)",
  ranges: "company/personalization/evidence/2026-10-16-criterion-2-ranges.md",
  // per-day rate k of the increment ABOVE the guess floor over days 0-7 of a trace's age. E1 `forgetRate` k, first interval.
  forgetRate: { low: 0.04, base: 0.08, high: 0.19, mark: "E1: low Roediger & Karpicke [R]; base McGillivray 2015 [F]; high Fazio 2010 [F]" },
  // ratio of the effective rate after day 7 of a trace's age to the first-week rate (1 = single exponential). F1 B1 answer (b).
  forgetShape: { low: 0.2, base: 0.27, high: 1.0, mark: "E1 forgetting shape beyond 7 days: Murre & Dros 2015 [F]; high 1.0 = exponential" },
  // fastest / slowest persona rate. E1 between-learner spread (B2 unchanged); base used, not swept (F1 N12, note).
  forgetSpread: { low: 1.5, base: 2, high: 3, mark: "E1 (B2 unchanged); not swept" },
  // SD of log k across (learner, lesson) pairs, on top of the persona spread. F1 B3 answer (a). E1 new row.
  kSpread: { low: 0.2, base: 0.4, high: 0.7, mark: "E1 learner x lesson spread of k: Fastrich 2018 [F] derived upper bound; Mettler 2016 [F]" },
  // Successful-retrieval strengthening, the multiplier on the rate (smaller = stronger). F1 B2 answer (a): base cell is
  // the lag form anchored at both E1 ends, s(r) = atFullRecall^r x atNoRecall^(1 - r) (geometric interpolation: the
  // eval's unsourced choice); the low and high cells are E1's low and high as constants (no lag dependence).
  revisitStrengthen: { low: 0.35, base: 0.50, high: 0.60, lag: { atFullRecall: 0.60, atNoRecall: 0.35 },
    mark: "E1 revisitStrengthen (high Fazio 2010 Schedule A [F]; low scheduler multipliers [R]) and lag dependence (direction Cepeda [A], Eglington & Pavlik [F]; shape unsourced)" },
  // P(re-encode | failed revisit or a right guess on an unknown concept; answer and why shown). E1 `relearn`.
  relearn: { low: 0.60, base: 0.70, high: 0.88, mark: "E1: Metcalfe 2015 [F], Metcalfe 2012 [F], Fazio & Marsh 2009 [F], McGillivray [F]" },
  // Population prior knowledge: mean and between-learner SD. E1 priorKnowledge rows.
  priorKnowledgeMean: { low: 0.05, base: 0.20, high: 0.45, mark: "E1 §3 table [F]/[F-r]" },
  priorKnowledgeSpread: { low: 0.05, base: 0.15, high: 0.25, mark: "E1 (B2 unchanged); base used, not swept (F1 N6)" },
  // P(encode | unknown, no penalty) BEFORE the prediction-feedback boost (x 1.10 applied in pEncode). F1 B4: pre-boost row.
  learnRate: { low: 0.35, base: 0.60, high: 0.80, mark: "E1 learnRate pre-boost row (Fazio 2010 [F]; Fazio & Marsh 2009 [F]; Metcalfe [F]; McGillivray [F]; Fastrich [F, derived])" },
  // Carried from B2 (C4) unchanged; E1 is not asked for these.
  pull: { low: 0.30, base: 0.55, high: 0.85, mark: "B2 (C4)" },
  pullModifier: { low: -0.15, base: 0, high: 0.10, mark: "B2 (C4)" },
  prereqPenalty: { low: 0.00, base: 0.15, high: 0.40, mark: "B2 (C4): high [S] unverifiable" },
  predictionFeedback: { low: 0.00, base: 0.10, high: 0.25, mark: "B2 (C4): [A]/[S]; not swept" },
};

// Unsourced constants, labelled guesses, not swept (criterion 2 §4). Surprise (hypercorrection) and novelty are 0: the
// product has both off (founder Q2; model-v0.2.2), phase A's rule set the surprise base at 0, and criterion 2 tests no
// per-term pair, so the learner carries neither mechanism (§1 L6).
export const UNSOURCED2 = {
  slip: 0.1,                  // P(wrong prediction | known). guess (C2 F18, note)
  guessRecall: 0.2,           // recall floor. K2 (F1 N11): basis is the 3-option format, E1 guessRecall 0.08/0.22/0.35; not swept
  stopBeforeRevealShare: 0.5, // engagement only (C2 F22, note)
  priorClamp: [0.01, 0.95],
  hypercorrection: 0,
  novelty: 0,
  // Prior-known concepts (C2 F23, answered in §1 L4): known at the episode start with the clock at the episode start and
  // the persona's base rate, not 30 days back at the floor.
  priorKnownClock: "episode start",
  // A revisit card's stop hazard relative to a new card's (C2 L5). 1 = per card (phase A's stop is per card). Unsourced
  // engagement constant that prices a revisit for the review pairs, so its low value 0.5 (per minute: a revisit takes
  // 1 minute, a new card 2) is a pass-relevant one-at-a-time cell (criterion 2 §4).
  revisitStopScale: { low: 0.5, base: 1 },
};

// Episode (criterion 2 §1). Same for every arm. Nothing here is visible to a review-timing candidate (interface §I.6).
export const EPISODE2 = {
  days: 14,                   // sessions on days 0..13, each: revisits first (the review rule), then new cards (the order rule)
  slots: 12,                  // card positions per session; a revisit takes one (interface §I.2)
  sessionStartHour: 9,        // one session a day at 09:00 UTC; the learner returns every day (as phase A)
  cardMinutes: 2,
  revisitMinutes: 1,
  prehistoryDays: 20, prehistoryRecallTaken: 0.7, jitter: 0.1, // visible pre-history: phase A generator, unchanged
  baseTime: Date.UTC(2026, 9, 16),
  recallWindowDays: 30,       // a review policy sees revisit results from the last 30 days only (privacy F1)
  // Final test (§1 primary): expected recall of every in-pilot concept read H days after the start of the last session,
  // with no session in between. Primary H = 7; reported H = 1 and H = 30.
  horizonsDays: [1, 7, 30],
  primaryHorizonDays: 7,
};

// The criterion's thresholds (criterion 2 §2, §3), as named inputs.
export const CRITERION2 = {
  deltaMin: 0.01, deltaHarm: 0.01, winsNeeded: 4, personas: 6,
  // ordering pairs: phase A's guardrails, unchanged
  g1MaxRise: 0.05, g2MaxRelFall: 0.05, g3MaxRise: 0.02, g4MaxRelFall: 0.05,
  // review pairs
  newMaxRelFall: 0.10,        // new lessons completed: lower end of the interval of relative change >= -0.10
  loadMaxRise: 0.10,          // revisit share of cards served: upper end of the interval of change <= +0.10
  rho: { value: 0.5, label: "guess; inert in criterion 2 (surprise gate shut in model-v0.2.2, §4)" },
  seeds: { first: 1001, floor: 200, cap: 2000 },
  // oracle review scheduler (§2.4): threshold grid and the tuning seeds it is chosen on (disjoint from the scored seeds)
  oracleReview: { thetas: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9], tuningSeeds: { first: 5001, n: 100 } },
};

/**
 * The cells (criterion 2 §4), derived from the E1 block by written rules, set before any policy score:
 *  - forgetting scale low/high = the wider of +-50% and E1's low/base, high/base (phase A rule, kept);
 *  - every other swept row: E1's low and high as absolute values, the others at base;
 *  - pull scale 0.5 / 1.5 (phase A exit row, kept);
 *  - a row whose low (or high) equals its base gives no cell.
 * Kinds: base; one-at-a-time (pass-relevant); corner (reported only: forgetting x revisitStrengthen x kSpread, K2).
 * revisitStrengthen: the base cell is "lag" (E1's two anchors, F1 B2); its low and high cells are E1's low and high as
 * constants.
 */
export function cells2(e1 = E1) {
  const fLow = Math.min(0.5, e1.forgetRate.low / e1.forgetRate.base);
  const fHigh = Math.max(1.5, e1.forgetRate.high / e1.forgetRate.base);
  const base = { forgetScale: 1, forgetShape: e1.forgetShape.base, kSpread: e1.kSpread.base, pullScale: 1,
    prereqPenalty: e1.prereqPenalty.base, learnRate: e1.learnRate.base,
    revisitStrengthen: e1.revisitStrengthen.lag ? "lag" : e1.revisitStrengthen.base, relearn: e1.relearn.base,
    priorKnowledgeMean: e1.priorKnowledgeMean.base, revisitStopScale: UNSOURCED2.revisitStopScale.base };
  const axes = {
    forgetScale: [fLow, fHigh],
    forgetShape: [e1.forgetShape.low, e1.forgetShape.high],
    kSpread: [e1.kSpread.low, e1.kSpread.high],
    revisitStrengthen: [e1.revisitStrengthen.low, e1.revisitStrengthen.high],
    relearn: [e1.relearn.low, e1.relearn.high],
    priorKnowledgeMean: [e1.priorKnowledgeMean.low, e1.priorKnowledgeMean.high],
    learnRate: [e1.learnRate.low, e1.learnRate.high],
    prereqPenalty: [e1.prereqPenalty.low, e1.prereqPenalty.high],
    pullScale: [0.5, 1.5],
    revisitStopScale: [UNSOURCED2.revisitStopScale.low, UNSOURCED2.revisitStopScale.base],
  };
  const out = [{ name: "base", kind: "base", world: { ...base } }];
  for (const [k, [lo, hi]] of Object.entries(axes)) {
    if (lo !== base[k]) out.push({ name: `${k}-low`, kind: "one-at-a-time", world: { ...base, [k]: lo } });
    if (hi !== base[k]) out.push({ name: `${k}-high`, kind: "one-at-a-time", world: { ...base, [k]: hi } });
  }
  const ck = ["forgetScale", "revisitStrengthen", "kSpread"]; // K2: kSpread replaces prior mean in the corners (F1 B3)
  for (let m = 0; m < 8; m++) {
    const w = { ...base };
    ck.forEach((k, i) => { w[k] = axes[k][(m >> i) & 1]; });
    out.push({ name: "corner-" + ck.map((k, i) => ((m >> i) & 1 ? "H" : "L")).join(""), kind: "corner", world: w });
  }
  return out;
}

/**
 * Per-persona world from the copied latents and the E1 block (phase A personaWorld rules, kept), with the cell's
 * revisitStrengthen, relearn, learnRate and prior-knowledge mean. personas: the verbatim copy (../personas.copy.mjs).
 */
export function personaWorld2(persona, personas, cell, e1 = E1) {
  const L = persona.latent;
  const rates = personas.map((p) => Math.log(p.latent.forgetRate));
  const lo = Math.min(...rates), hi = Math.max(...rates);
  const pos = hi > lo ? (Math.log(L.forgetRate) - (lo + hi) / 2) / (hi - lo) : 0;
  const forgetK = e1.forgetRate.base * Math.pow(e1.forgetSpread.base, pos) * cell.forgetScale;
  const pulls = personas.map((p) => p.latent.misconceptionPull);
  const pm = pulls.reduce((a, b) => a + b, 0) / pulls.length, pmin = Math.min(...pulls), pmax = Math.max(...pulls);
  const x = L.misconceptionPull;
  const pullModifier = x >= pm ? (pmax > pm ? e1.pullModifier.high * (x - pm) / (pmax - pm) : 0)
    : (pm > pmin ? e1.pullModifier.low * (pm - x) / (pm - pmin) : 0);
  const priors = personas.flatMap((p) => [p.latent.priorKnowledge.probability, p.latent.priorKnowledge.cs]);
  const mu = priors.reduce((a, b) => a + b, 0) / priors.length;
  const sd = Math.sqrt(priors.reduce((a, b) => a + (b - mu) ** 2, 0) / (priors.length - 1));
  const [cl, ch] = UNSOURCED2.priorClamp;
  const prior = (v) => Math.max(cl, Math.min(ch, cell.priorKnowledgeMean + e1.priorKnowledgeSpread.base * (sd > 0 ? (v - mu) / sd : 0)));
  return {
    forgetK, pullModifier, pullScale: cell.pullScale,
    priorKnowledge: { probability: prior(L.priorKnowledge.probability), cs: prior(L.priorKnowledge.cs) },
    learnPrereqPenalty: cell.prereqPenalty, predictionFeedback: e1.predictionFeedback.base, learnRate: cell.learnRate,
    revisitStrengthen: cell.revisitStrengthen === "lag" ? null : cell.revisitStrengthen,
    strengthenAt1: cell.revisitStrengthen === "lag" ? e1.revisitStrengthen.lag.atFullRecall : cell.revisitStrengthen,
    strengthenAt0: cell.revisitStrengthen === "lag" ? e1.revisitStrengthen.lag.atNoRecall : cell.revisitStrengthen,
    forgetShape: cell.forgetShape, kSpread: cell.kSpread,
    relearn: cell.relearn, revisitStopScale: cell.revisitStopScale,
    slip: UNSOURCED2.slip, guessRecall: UNSOURCED2.guessRecall, stopBeforeRevealShare: UNSOURCED2.stopBeforeRevealShare,
    hypercorrection: UNSOURCED2.hypercorrection, novelty: UNSOURCED2.novelty,
    interest: { ...L.interest }, stopHazard: L.stopHazard,
  };
}
