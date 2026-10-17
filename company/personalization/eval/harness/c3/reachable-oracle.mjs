// The reachable-signal oracle (criterion 3 §2.2): the best ordering the eval could write that sees ONLY criterion 2 §I.3's
// input object (now, history with recalls cut to 30 days, dims, slots) and knows the world's equations and population-level
// values, never the persona, a per-learner or per-concept hidden value (prior knowledge, k factor L9, prerequisite state)
// or the episode's schedule. The judge's reference arm, not a candidate; never registered in POLICIES.
// owner: personalization-eval (Uma) · run: eval-k3-1017
//
// Imports nothing. The harness builds `pop` (population constants, criterion 3 §2.2 table) from the cell; `decide`
// rebuilds its whole estimate from the input at every call and keeps no state between calls (tests C3-RS1 to RS6).
// `now` is used only as `now - completedAt` and `now - recalls[i].at` (time-translation test C3-RS4).
//
// Estimate, in words (criterion 3 §2.2):
//   1. Per domain d, the posterior mean of the learner's prior-knowledge rate pi_d on a grid, from the population prior
//      (mean, SD) and every first prediction in d: P(right | pi) = pi (1 - slip) + (1 - pi)(1 - pullBar(rating)).
//   2. Per completed concept, P(known now): the prediction's posterior that it was known, then study (encodes with pEnc),
//      then a forward filter over its visible recalls with the revisit law (right: Bayes with the population kept share,
//      then a lucky guess relearns; miss: relearn).
//   3. Per concept not completed: P(known) = pi_d (its domain's estimate).
//   4. pEnc(c) = learnRate (1 + fb)(1 - penalty (1 - prod over in-pilot prerequisites of P(known))).
//   5. Value of studying lesson L now, read at a fixed valuation horizon H (not the criterion's read time, which it does
//      not know): (1 - q) pEnc kappa(H) + q refresh, where kappa is the population-expected kept share (persona spread at
//      its median, E over the L9 factor) and refresh = kappa_m(H) - kappa_m(H + age); age = time since the concept's last
//      visible event if completed, else the population-mean age of a prior-known trace (assumedPriorAgeDays).
//   6. Pick the eligible lesson (in dims, not in history) of largest value; ties to the default order, derived from dims
//      by the catalogue's own rule (published first, slug order, round-robin across domains).

const DAY = 86_400_000;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
// 7-point Gauss-Hermite nodes and weights for E over z ~ N(0, 1) (probabilists' form, weights sum to 1).
const GH = [[-3.7504397177257425, 0.000548268855972], [-2.366759410734541, 0.030757123967586], [-1.1544053947399682, 0.240123178605013],
  [0, 0.457142857142857], [1.1544053947399682, 0.240123178605013], [2.366759410734541, 0.030757123967586], [3.7504397177257425, 0.000548268855972]];

/** Default order from dims alone (sim/catalog.mjs rule): published first, then slug order, round-robin across domains. */
export function defaultOrderFromDims(dims) {
  const ls = Object.values(dims).slice().sort((a, b) => (a.status === "published" ? 0 : 1) - (b.status === "published" ? 0 : 1) || a.slug.localeCompare(b.slug));
  const byDomain = new Map();
  for (const l of ls) byDomain.set(l.domain, [...(byDomain.get(l.domain) || []), l.slug]);
  const qs = [...byDomain.values()].map((x) => [...x]);
  const out = [];
  while (qs.some((x) => x.length)) for (const x of qs) if (x.length) out.push(x.shift());
  return out;
}

/**
 * pop: { learnRate, predictionFeedback, prereqPenalty, slip, guessRecall, relearn, forgetK, forgetShape, kSpread,
 *        priorMean, priorSD, priorClamp, priorRateMult, assumedPriorAgeDays, valuationHorizonDays, pullBarByRating }
 */
export function makeReachableOracle(pop) {
  const f = (a) => Math.min(a, 7) + pop.forgetShape * Math.max(0, a - 7);
  const kappa = (aDays, m = 1) => GH.reduce((s, [z, w]) => s + w * Math.exp(-pop.forgetK * Math.exp(pop.kSpread * z) * m * f(Math.max(0, aDays))), 0);
  const grid = Array.from({ length: 99 }, (_, i) => 0.005 + i * 0.01);
  const priorW = grid.map((p) => (p < pop.priorClamp[0] - 1e-9 || p > pop.priorClamp[1] + 1e-9 ? 0 : Math.exp(-0.5 * ((p - pop.priorMean) / pop.priorSD) ** 2)));
  const H = pop.valuationHorizonDays;
  const kH = kappa(H);
  const refreshPrior = kappa(H, pop.priorRateMult) - kappa(H + pop.assumedPriorAgeDays, pop.priorRateMult);

  function decide(input) {
    const { now, history, dims } = input;
    const lessons = Object.values(dims);
    const domains = [...new Set(lessons.map((l) => l.domain))];
    const domOf = (c) => c.split(":")[0];
    // prerequisites of a concept from dims (lesson prerequisites, in the pilot's domains, not itself)
    const prereqs = new Map();
    for (const l of lessons) {
      const s = prereqs.get(l.concept) || new Set();
      for (const p of l.prerequisites || []) if (p !== l.concept && domains.includes(domOf(p))) s.add(p);
      prereqs.set(l.concept, s);
    }
    const pullBar = (slug) => pop.pullBarByRating[dims[slug]?.misconceptionStrength ?? 0] ?? pop.pullBarByRating[0];
    // 1. pi_d posterior from first predictions (a concept's first completed lesson only)
    const seen = new Set();
    const logL = Object.fromEntries(domains.map((d) => [d, grid.map(() => 0)]));
    const firstOf = new Map();
    const byConcept = new Map();
    for (const h of history) {
      const d = dims[h.slug]; if (!d) continue;
      if (byConcept.has(d.concept)) byConcept.get(d.concept).push(h); else byConcept.set(d.concept, [h]);
      if (seen.has(d.concept)) continue;
      seen.add(d.concept); firstOf.set(d.concept, h);
      if (h.predictedCorrectly === true || h.predictedCorrectly === false) {
        const pb = pullBar(h.slug);
        grid.forEach((p, i) => {
          const pr = p * (1 - pop.slip) + (1 - p) * (1 - pb);
          logL[d.domain][i] += Math.log(h.predictedCorrectly ? pr : 1 - pr);
        });
      }
    }
    const pi = {};
    for (const d of domains) {
      const mx = Math.max(...logL[d]);
      let num = 0, den = 0;
      grid.forEach((p, i) => { const w = priorW[i] * Math.exp(logL[d][i] - mx); num += w * p; den += w; });
      pi[d] = den > 0 ? num / den : pop.priorMean;
    }
    // 2-4. P(known now) per concept, with pEnc; completed concepts filtered, the rest at pi_d
    const known = new Map();
    const lastEvent = new Map();
    const visiting = new Set();
    const pKnown = (c) => {
      if (known.has(c)) return known.get(c);
      if (!firstOf.has(c) || visiting.has(c)) return pi[domOf(c)] ?? pop.priorMean;
      visiting.add(c);
      const items = byConcept.get(c);
      let q = pi[domOf(c)] ?? pop.priorMean, last = null;
      for (const h of items) {
        if (h.predictedCorrectly === true || h.predictedCorrectly === false) {
          const pb = pullBar(h.slug);
          const lk = h.predictedCorrectly ? 1 - pop.slip : pop.slip, lu = h.predictedCorrectly ? 1 - pb : pb;
          q = (q * lk) / (q * lk + (1 - q) * lu);
        }
        q = q + (1 - q) * pEnc(c);
        last = h.completedAt;
        for (const r of h.recalls) {
          const kept = kappa((r.at - last) / DAY);
          const pc = pop.guessRecall + (1 - pop.guessRecall) * kept;
          if (r.correct) { const post = (q * pc) / (q * pc + (1 - q) * pop.guessRecall); q = post + (1 - post) * pop.relearn; }
          else q = pop.relearn;
          last = r.at;
        }
      }
      visiting.delete(c);
      known.set(c, q); lastEvent.set(c, last);
      return q;
    };
    function pEnc(c) {
      let all = 1;
      for (const p of prereqs.get(c) || []) all *= pKnown(p);
      return clamp01(pop.learnRate * (1 + pop.predictionFeedback) * (1 - pop.prereqPenalty * (1 - all)));
    }
    // 5-6. value of each eligible lesson; ties to the default order
    const done = new Set(history.map((h) => h.slug));
    let best = null, bestV = -Infinity;
    for (const slug of defaultOrderFromDims(dims)) {
      if (done.has(slug)) continue;
      const c = dims[slug].concept;
      const q = pKnown(c);
      const refresh = firstOf.has(c) ? kappa(H) - kappa(H + (now - lastEvent.get(c)) / DAY) : refreshPrior;
      const v = (1 - q) * pEnc(c) * kH + q * refresh;
      if (v > bestV + 1e-12) { best = slug; bestV = v; }
    }
    return best ? { slug: best, value: bestV, reason: "reachable-signal estimate" } : null;
  }
  return { name: "reachable", version: "c3-k3", decide };
}
