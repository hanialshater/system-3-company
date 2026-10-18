// reachable-v1: a new-lesson ordering candidate built from criterion 3 §2.2's written design (steps 1-6).
// Owner: learner-model-engineer (run lme-c1-1017, W-1572 item C1). Build note: reachable-v1-build-note.md.
// Values: applied-scientist-personalization's sheet reachable-v1-params.md (rows P1-P15), base rows only.
// No imports. No clock, no randomness, no I/O, no state kept between calls. The only inputs read are
// `now`, `history` and `dims` (criterion 2 §I.3); `slots` is accepted and not needed by a per-pick value.

// ---------------------------------------------------------------------------------------------
// Types (declared here; HistoryItem and LessonDims follow model.ts, plus the two optional dims
// fields criterion 3 §2.2 lists: status and rating)
// ---------------------------------------------------------------------------------------------

export type HistoryItem = {
  slug: string;
  completedAt: number;
  predictedCorrectly?: boolean | null;
  recalls: { at: number; correct: boolean }[];
};

export type LessonDims = {
  slug: string;
  domain: string;
  concept: string;
  level: "intro" | "core" | "stretch";
  prerequisites: string[];
  successors: string[];
  misconceptionStrength?: 1 | 2 | 3;
  status?: string;
  rating?: number;
};

export type ReachableInput = {
  now: number;
  history: HistoryItem[];
  dims: Record<string, LessonDims>;
  slots: number;
};

export type PrerequisiteFact = {
  concept: string;
  pKnown: number;
  /** Slugs in the history whose dims concept is this prerequisite (empty if none completed). */
  completedSlugs: string[];
};

export type ReasonFacts =
  | { code: "prerequisites"; versus: string; prerequisites: PrerequisiteFact[]; versusPrerequisites: PrerequisiteFact[] }
  | { code: "domain-estimate"; versus: string; domain: string; rightPredictions: number; wrongPredictions: number; estimate: number }
  | { code: "concept-known"; versus: string; concept: string; completedSlugs: string[]; recallsRight: number; recallsWrong: number; pKnown: number }
  | { code: "refresh"; versus: string; concept: string; lastEventSlug: string | null; daysSinceLastEvent: number | null }
  | { code: "default-order"; versus: string; defaultIndex: number; versusDefaultIndex: number }
  | { code: "last"; versus: null };

export type RankedLesson = { slug: string; value: number; reason: ReasonFacts };

// ---------------------------------------------------------------------------------------------
// Parameters: every number is a row of reachable-v1-params.md (A1) or a constant §2.2 names.
// ---------------------------------------------------------------------------------------------

const P = {
  learnRate: 0.6, // P1
  feedback: 0.1, // P2
  penalty: 0.15, // P3
  slip: 0.1, // P4
  floor: 0.2, // P5 guess floor
  relearn: 0.7, // P6
  missRateMult: 1.0, // P6a
  strengthenHigh: 0.6, // P6b s(1)
  strengthenLow: 0.35, // P6b s(0)
  k: 0.08, // P7 per day
  shape: 0.27, // P8
  knee: 7, // P8 (the form's 7-day knee)
  sigma: 0.4, // P9 SD of log k
  priorMean: 0.2, // P10
  priorSd: 0.15, // P11
  priorRateMult: 0.0574, // P13 m
  priorAgeDays: 0, // P13
  // P14 E[pull | rating], by msr-v1 level (1, 2, 3) and for an absent rating, from the sheet at 48218b3
  // (triangular pull 0.30/0.55/0.85, rho 0.5, cuts 0.5/0.7), plus the persona-modifier average (m-bar 0).
  pullByRating: { 1: 0.499, 2: 0.579, 3: 0.662, absent: 0.567 },
  pullModifierMean: 0,
  horizonDays: 14, // §2.2 step 5 valuation horizon
  assumedExtraAgeDays: 6.5, // §2.2 step 5 assumed age beyond priorAgeDays
  recallWindowDays: 30, // criterion 2 §I.3 / privacy F1
} as const;

const DAY_MS = 86_400_000;

// ---------------------------------------------------------------------------------------------
// Population-expected kept share (P15): average over the L9 factor exp(sigma z), z ~ N(0, 1)
// ---------------------------------------------------------------------------------------------

/** Nodes z in [-8, 8] at step 0.05 with normal weights normalised to sum to 1 (build note, choice 9). */
function l9Nodes(): { f: number[]; w: number[] } {
  const f: number[] = [];
  const w: number[] = [];
  let total = 0;
  for (let i = -160; i <= 160; i++) {
    const z = i * 0.05;
    const weight = Math.exp(-0.5 * z * z);
    f.push(Math.exp(P.sigma * z));
    w.push(weight);
    total += weight;
  }
  for (let i = 0; i < w.length; i++) w[i] /= total;
  return { f, w };
}

function ageUnits(a: number): number {
  const age = Math.max(0, a);
  return Math.min(age, P.knee) + P.shape * Math.max(0, age - P.knee);
}

function kappa(nodes: { f: number[]; w: number[] }, ageDays: number, mult: number): number {
  const u = P.k * mult * ageUnits(ageDays);
  let s = 0;
  for (let i = 0; i < nodes.f.length; i++) s += nodes.w[i] * Math.exp(-u * nodes.f[i]);
  return s;
}

function strengthen(r: number): number {
  return Math.pow(P.strengthenHigh, r) * Math.pow(P.strengthenLow, 1 - r);
}

// ---------------------------------------------------------------------------------------------
// Step 1: per-domain posterior of the prior-knowledge rate pi on a grid
// ---------------------------------------------------------------------------------------------

function normalDensity(x: number): number {
  const d = (x - P.priorMean) / P.priorSd;
  return Math.exp(-0.5 * d * d) / (P.priorSd * Math.sqrt(2 * Math.PI));
}

function integrate(a: number, b: number): number {
  // Simpson's rule, 20 panels (build note, choice 8).
  const n = 20;
  const h = (b - a) / n;
  let s = normalDensity(a) + normalDensity(b);
  for (let i = 1; i < n; i++) s += (i % 2 === 1 ? 4 : 2) * normalDensity(a + i * h);
  return (s * h) / 3;
}

/** 101 nodes, step 0.01; the clamp puts the mass beyond each bound on that bound (P12). */
function priorGrid(): { pi: number[]; w: number[] } {
  const pi: number[] = [];
  const w: number[] = [];
  for (let i = 0; i <= 100; i++) pi.push(i / 100);
  for (let i = 0; i <= 100; i++) w.push(0);
  let inner = 0;
  for (let i = 1; i < 100; i++) {
    w[i] = integrate(pi[i] - 0.005, pi[i] + 0.005);
    inner += w[i];
  }
  w[100] = integrate(0.995, P.priorMean + 12 * P.priorSd);
  w[0] = Math.max(0, 1 - inner - w[100]);
  return { pi, w };
}

function pRightGivenPi(pi: number, rating: number | undefined): number {
  return pi * (1 - P.slip) + (1 - pi) * (1 - expectedPull(rating));
}

/** P14: E[pull | rating], persona modifiers averaged (criterion 3 §2.2), read from the sheet's table. */
function expectedPull(rating: number | undefined): number {
  if (rating === 1 || rating === 2 || rating === 3) return P.pullByRating[rating] + P.pullModifierMean;
  return P.pullByRating.absent + P.pullModifierMean;
}

type DomainPosterior = {
  logw: number[]; // log prior weight + log likelihood at each grid node
  mean: number;
  right: number;
  wrong: number;
};

// ---------------------------------------------------------------------------------------------
// The estimate, rebuilt at every call
// ---------------------------------------------------------------------------------------------

type ConceptState = {
  p: number; // P(known)
  clock: number; // time of the trace's clock (ms)
  mult: number; // rate multiplier of the known trace
  completedSlugs: string[];
  recallsRight: number;
  recallsWrong: number;
  lastEventSlug: string;
};

type Estimate = {
  nodes: { f: number[]; w: number[] };
  domains: Map<string, DomainPosterior>;
  prior: DomainPosterior;
  concepts: Map<string, ConceptState>;
  conceptDomain: Map<string, string>;
};

function ratingOf(d: LessonDims | undefined): number | undefined {
  if (!d) return undefined;
  if (d.misconceptionStrength !== undefined) return d.misconceptionStrength;
  return d.rating;
}

function posteriorMean(grid: { pi: number[] }, logw: number[]): number {
  let max = -Infinity;
  for (const v of logw) if (v > max) max = v;
  let num = 0;
  let den = 0;
  for (let i = 0; i < logw.length; i++) {
    const e = Math.exp(logw[i] - max);
    num += e * grid.pi[i];
    den += e;
  }
  return num / den;
}

/** P(known before the lesson | all first predictions), exact under the grid posterior (step 2, first part). */
function knownBeforeFirstPrediction(grid: { pi: number[] }, post: DomainPosterior, right: boolean, rating: number | undefined): number {
  let max = -Infinity;
  for (const v of post.logw) if (v > max) max = v;
  let num = 0;
  let den = 0;
  for (let i = 0; i < post.logw.length; i++) {
    const e = Math.exp(post.logw[i] - max);
    const pi = grid.pi[i];
    const pr = pRightGivenPi(pi, rating);
    const known = right ? pi * (1 - P.slip) : pi * P.slip;
    num += (e * known) / (right ? pr : 1 - pr);
    den += e;
  }
  return num / den;
}

function estimate(input: ReachableInput): Estimate {
  const { now, dims } = input;
  const nodes = l9Nodes();
  const grid = priorGrid();
  const priorLogw = grid.w.map((x) => (x > 0 ? Math.log(x) : -Infinity));

  const conceptDomain = new Map<string, string>();
  for (const key of Object.keys(dims)) {
    const d = dims[key];
    if (!conceptDomain.has(d.concept)) conceptDomain.set(d.concept, d.domain);
  }

  // History items whose slug is in dims, in time order (stable on the input's order).
  const items = input.history
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => dims[h.slug] !== undefined)
    .sort((a, b) => a.h.completedAt - b.h.completedAt || a.i - b.i);

  // Step 1: first prediction per concept = the prediction on the concept's first completion.
  const firstItemOfConcept = new Map<string, number>();
  for (const { h, i } of items) {
    const c = dims[h.slug].concept;
    if (!firstItemOfConcept.has(c)) firstItemOfConcept.set(c, i);
  }
  const domains = new Map<string, DomainPosterior>();
  const getDomain = (dom: string): DomainPosterior => {
    let d = domains.get(dom);
    if (!d) {
      d = { logw: priorLogw.slice(), mean: 0, right: 0, wrong: 0 };
      domains.set(dom, d);
    }
    return d;
  };
  for (const { h, i } of items) {
    const d = dims[h.slug];
    if (firstItemOfConcept.get(d.concept) !== i) continue;
    if (h.predictedCorrectly !== true && h.predictedCorrectly !== false) continue;
    const post = getDomain(d.domain);
    const rating = ratingOf(d);
    for (let g = 0; g < grid.pi.length; g++) {
      const pr = pRightGivenPi(grid.pi[g], rating);
      post.logw[g] += Math.log(h.predictedCorrectly ? pr : 1 - pr);
    }
    if (h.predictedCorrectly) post.right++;
    else post.wrong++;
  }
  for (const post of domains.values()) post.mean = posteriorMean(grid, post.logw);
  const prior: DomainPosterior = { logw: priorLogw, mean: posteriorMean(grid, priorLogw), right: 0, wrong: 0 };
  const domainOf = (dom: string): DomainPosterior => domains.get(dom) ?? prior;

  // Step 2: forward pass over completions and visible recalls, in time order.
  const cutoff = now - P.recallWindowDays * DAY_MS;
  type Ev = { t: number; kind: 0 | 1; slug: string; i: number; correct?: boolean };
  const events: Ev[] = [];
  for (const { h, i } of items) {
    events.push({ t: h.completedAt, kind: 0, slug: h.slug, i });
    for (const r of h.recalls) if (r.at >= cutoff) events.push({ t: r.at, kind: 1, slug: h.slug, i, correct: r.correct });
  }
  events.sort((a, b) => a.t - b.t || a.kind - b.kind || a.i - b.i);

  const concepts = new Map<string, ConceptState>();
  const pKnownAt = (concept: string): number => {
    const s = concepts.get(concept);
    if (s) return s.p;
    const dom = conceptDomain.get(concept);
    if (dom === undefined) return 1; // a prerequisite with no lesson in dims: no penalty (build note, choice 6)
    return domainOf(dom).mean;
  };
  const pEncode = (d: LessonDims): number => {
    let prod = 1;
    for (const c of d.prerequisites) prod *= pKnownAt(c);
    return P.learnRate * (1 + P.feedback) * (1 - P.penalty * (1 - prod));
  };

  for (const ev of events) {
    const d = dims[ev.slug];
    const c = d.concept;
    const s = concepts.get(c);
    if (ev.kind === 0) {
      const h = input.history[ev.i];
      const pred = h.predictedCorrectly;
      const enc = pEncode(d);
      if (!s) {
        const post = domainOf(d.domain);
        const p0 =
          pred === true || pred === false ? knownBeforeFirstPrediction(grid, post, pred, ratingOf(d)) : post.mean;
        const p = p0 + (1 - p0) * enc;
        const mult = p > 0 ? (p0 * P.priorRateMult + (1 - p0) * enc * 1) / p : 1;
        concepts.set(c, { p, clock: ev.t, mult, completedSlugs: [ev.slug], recallsRight: 0, recallsWrong: 0, lastEventSlug: ev.slug });
      } else {
        let p0 = s.p;
        if (pred === true || pred === false) {
          const pr = (1 - p0) * (1 - expectedPull(ratingOf(d)));
          const kr = p0 * (1 - P.slip);
          p0 = pred ? kr / (kr + pr) : (p0 * P.slip) / (p0 * P.slip + (1 - p0) * expectedPull(ratingOf(d)));
        }
        const p = p0 + (1 - p0) * enc;
        s.mult = p > 0 ? (p0 * s.mult + (1 - p0) * enc * 1) / p : s.mult;
        s.p = p;
        s.clock = ev.t;
        s.completedSlugs.push(ev.slug);
        s.lastEventSlug = ev.slug;
      }
    } else if (s) {
      const r = kappa(nodes, (ev.t - s.clock) / DAY_MS, s.mult);
      const pRightKnown = P.floor + (1 - P.floor) * r;
      if (ev.correct) {
        const kn = s.p * pRightKnown;
        const un = (1 - s.p) * P.floor;
        const post = kn / (kn + un);
        const retrievalShare = ((1 - P.floor) * r) / pRightKnown;
        const knownMult = s.mult * (retrievalShare * strengthen(r) + (1 - retrievalShare));
        const pAfter = post + (1 - post) * P.relearn;
        s.mult = pAfter > 0 ? (post * knownMult + (1 - post) * P.relearn * s.mult) / pAfter : s.mult;
        s.p = pAfter;
        s.recallsRight++;
      } else {
        const kn = s.p * (1 - P.floor) * (1 - r);
        const un = (1 - s.p) * (1 - P.floor);
        const post = kn / (kn + un);
        s.p = post + (1 - post) * P.relearn;
        s.mult = s.mult * P.missRateMult;
        s.recallsWrong++;
      }
      s.clock = ev.t;
      s.lastEventSlug = ev.slug;
    }
  }

  return { nodes, domains, prior, concepts, conceptDomain };
}

// ---------------------------------------------------------------------------------------------
// Steps 3-6: value every eligible new lesson, rank, explain
// ---------------------------------------------------------------------------------------------

type Terms = { q: number; prereqFactor: number; refresh: number; newGain: number };

function valueOf(t: Terms): number {
  return (1 - t.q) * t.newGain * t.prereqFactor + t.q * t.refresh;
}

export function rank(input: ReachableInput): RankedLesson[] {
  const { now, dims, history } = input;
  const est = estimate(input);
  const completed = new Set(history.map((h) => h.slug));
  const order = Object.keys(dims); // default order: the catalogue's order as dims carries it (build note, choice 1)
  const defaultIndex = new Map(order.map((s, i) => [s, i] as const));

  const kNew = kappa(est.nodes, P.horizonDays, 1);
  const assumedAge = P.priorAgeDays + P.assumedExtraAgeDays;
  const refreshPrior =
    kappa(est.nodes, P.horizonDays, P.priorRateMult) - kappa(est.nodes, assumedAge + P.horizonDays, P.priorRateMult);

  const prereqFacts = (d: LessonDims): PrerequisiteFact[] =>
    d.prerequisites.map((c) => {
      const s = est.concepts.get(c);
      const dom = est.conceptDomain.get(c);
      const pKnown = s ? s.p : dom === undefined ? 1 : (est.domains.get(dom) ?? est.prior).mean;
      return { concept: c, pKnown, completedSlugs: s ? s.completedSlugs.slice() : [] };
    });

  const rows = order
    .filter((slug) => !completed.has(slug))
    .map((slug) => {
      const d = dims[slug];
      const s = est.concepts.get(d.concept);
      const prereqs = prereqFacts(d);
      let prod = 1;
      for (const f of prereqs) prod *= f.pKnown;
      const prereqFactor = 1 - P.penalty * (1 - prod);
      const newGain = P.learnRate * (1 + P.feedback) * kNew;
      let terms: Terms;
      if (s) {
        const a = (now - s.clock) / DAY_MS;
        const refresh = kappa(est.nodes, P.horizonDays, s.mult) - kappa(est.nodes, a + P.horizonDays, s.mult);
        terms = { q: s.p, prereqFactor, refresh, newGain };
      } else {
        terms = { q: (est.domains.get(d.domain) ?? est.prior).mean, prereqFactor, refresh: refreshPrior, newGain };
      }
      return { slug, d, s, prereqs, terms, value: valueOf(terms), idx: defaultIndex.get(slug) as number };
    });

  rows.sort((a, b) => b.value - a.value || a.idx - b.idx);

  return rows.map((row, i) => {
    const next = rows[i + 1];
    if (!next) return { slug: row.slug, value: row.value, reason: { code: "last", versus: null } };
    let reason: ReasonFacts;
    if (row.value === next.value) {
      reason = { code: "default-order", versus: next.slug, defaultIndex: row.idx, versusDefaultIndex: next.idx };
    } else {
      // The term whose swap to the next lesson's value closes the most of the gap decided the order.
      const swaps: { code: "prerequisites" | "q" | "refresh"; closed: number }[] = [
        { code: "prerequisites", closed: row.value - valueOf({ ...row.terms, prereqFactor: next.terms.prereqFactor }) },
        { code: "q", closed: row.value - valueOf({ ...row.terms, q: next.terms.q }) },
        { code: "refresh", closed: row.value - valueOf({ ...row.terms, refresh: next.terms.refresh }) },
      ];
      let best = swaps[0];
      for (const sw of swaps) if (sw.closed > best.closed) best = sw;
      if (best.code === "prerequisites") {
        reason = { code: "prerequisites", versus: next.slug, prerequisites: row.prereqs, versusPrerequisites: next.prereqs };
      } else if (best.code === "refresh") {
        reason = {
          code: "refresh",
          versus: next.slug,
          concept: row.d.concept,
          lastEventSlug: row.s ? row.s.lastEventSlug : null,
          daysSinceLastEvent: row.s ? (now - row.s.clock) / DAY_MS : null,
        };
      } else if (row.s) {
        reason = {
          code: "concept-known",
          versus: next.slug,
          concept: row.d.concept,
          completedSlugs: row.s.completedSlugs.slice(),
          recallsRight: row.s.recallsRight,
          recallsWrong: row.s.recallsWrong,
          pKnown: row.s.p,
        };
      } else {
        const post = est.domains.get(row.d.domain) ?? est.prior;
        reason = {
          code: "domain-estimate",
          versus: next.slug,
          domain: row.d.domain,
          rightPredictions: post.right,
          wrongPredictions: post.wrong,
          estimate: post.mean,
        };
      }
    }
    return { slug: row.slug, value: row.value, reason };
  });
}

export function decide(input: ReachableInput): RankedLesson | undefined {
  return rank(input)[0];
}

export const REACHABLE_V1 = { name: "reachable-v1", version: "1", rank, decide } as const;

/** For tests and F5's read only: the population-expected kept share (P15) and the clamped prior mean (P12). */
export const internals = {
  kappa: (ageDays: number, mult: number): number => kappa(l9Nodes(), ageDays, mult),
  priorMean: (): number => {
    const g = priorGrid();
    return posteriorMean(g, g.w.map((x) => (x > 0 ? Math.log(x) : -Infinity)));
  },
};
