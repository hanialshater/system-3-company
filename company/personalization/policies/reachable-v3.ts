// reachable-v3: reachable-v2 over an ungraded history, plus the moving reasons it emits itself (batch 5 §15.1 (ii) 1-4).
// Owner: learner-model-engineer (run lme-v3-1017, W-1572 item V3; v2 by lme-c2-1017, v1 by lme-c1-1017). Build note: reachable-v3-build-note.md.
// Values: applied-scientist-personalization's sheet reachable-v1-params.md (rows P1-P15), base rows only.
// No imports. No clock, no randomness, no I/O, no state kept between calls. The only inputs read are
// `now`, `history` and `dims` (criterion 2 §I.3); `slots` is accepted and not needed by a per-pick value.
// Ungraded: of each history item only `slug` and `completedAt` are read; never `predictedCorrectly`, never `recalls`.

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

function estimate(input: ReachableInput): Estimate {
  const { dims } = input;
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

  // Step 1, ungraded (v3): no prediction is read, so no domain posterior is ever formed and every
  // domain uses the prior, as v2 does for a domain with no first prediction.
  const domains = new Map<string, DomainPosterior>();
  const prior: DomainPosterior = { logw: priorLogw, mean: posteriorMean(grid, priorLogw), right: 0, wrong: 0 };
  const domainOf = (dom: string): DomainPosterior => domains.get(dom) ?? prior;

  // Step 2, ungraded (v3): forward pass over completions only, in time order; no recall is read.
  type Ev = { t: number; kind: 0; slug: string; i: number };
  const events: Ev[] = [];
  for (const { h, i } of items) events.push({ t: h.completedAt, kind: 0, slug: h.slug, i });
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
    // v2's no-prediction branch for every completion; v2's recall branch is unreachable and removed.
    const enc = pEncode(d);
    if (!s) {
      const post = domainOf(d.domain);
      const p0 = post.mean;
      const p = p0 + (1 - p0) * enc;
      const mult = p > 0 ? (p0 * P.priorRateMult + (1 - p0) * enc * 1) / p : 1;
      concepts.set(c, { p, clock: ev.t, mult, completedSlugs: [ev.slug], recallsRight: 0, recallsWrong: 0, lastEventSlug: ev.slug });
    } else {
      const p0 = s.p;
      const p = p0 + (1 - p0) * enc;
      s.mult = p > 0 ? (p0 * s.mult + (1 - p0) * enc * 1) / p : s.mult;
      s.p = p;
      s.clock = ev.t;
      s.completedSlugs.push(ev.slug);
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

/**
 * The default order (default-order-rule.md, order rule v1, steps 1-4), over every entry of dims.
 * Reads only slug, domain and status; never key order. Step 5 (remove completed) is done by the caller, after.
 */
function defaultOrder(dims: Record<string, LessonDims>): string[] {
  const statusRank = (d: LessonDims): number => (d.status === undefined || d.status === "published" ? 0 : 1);
  const sorted = Object.keys(dims)
    .map((key) => ({ key, d: dims[key] }))
    .sort((a, b) => statusRank(a.d) - statusRank(b.d) || (a.d.slug < b.d.slug ? -1 : a.d.slug > b.d.slug ? 1 : 0));
  const queues = new Map<string, string[]>();
  for (const { key, d } of sorted) {
    const q = queues.get(d.domain);
    if (q) q.push(key);
    else queues.set(d.domain, [key]);
  }
  const groups = [...queues.values()];
  const out: string[] = [];
  const next = groups.map(() => 0);
  let left = sorted.length;
  while (left > 0) {
    for (let g = 0; g < groups.length; g++) {
      if (next[g] < groups[g].length) {
        out.push(groups[g][next[g]++]);
        left--;
      }
    }
  }
  return out;
}

type Row = {
  slug: string;
  d: LessonDims;
  s: ConceptState | undefined;
  prereqs: PrerequisiteFact[];
  terms: Terms;
  value: number;
  idx: number;
};

/** v2's rank body up to the sort, unchanged, so `rank` and `moves` read the same rows (v3: extracted, build note). */
function rankRows(input: ReachableInput): { est: Estimate; order: string[]; rows: Row[] } {
  const { now, dims, history } = input;
  const est = estimate(input);
  const completed = new Set(history.map((h) => h.slug));
  const order = defaultOrder(dims); // default order: default-order-rule.md steps 1-4 over all of dims (v2 build note)
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

  return { est, order, rows };
}

export function rank(input: ReachableInput): RankedLesson[] {
  const { now } = input;
  const { est, rows } = rankRows(input);

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

// ---------------------------------------------------------------------------------------------
// Moving reasons (v3, batch 5 §15.1 (ii) 2-3): for each ranked lesson, whether it moved against the
// default order with finished lessons removed, its direction, and one code chosen by F6's pair test
// (evidence/2026-10-17-edd010-reason-rule-truth.md §1 T0/T1/T2 and §7). Slugs only, no number.
// ---------------------------------------------------------------------------------------------

export type MoveCode = "prerequisites" | "concept-known" | "refresh";

export type MoveFacts = {
  /** Lessons in dims whose concept is one of this lesson's prerequisites (the catalogue relation), in default order. */
  prerequisiteLessons: string[];
  /** Finished lessons (history, in dims) on this lesson's own concept, in order of first completion. */
  finishedOnConcept: string[];
  /** Finished lessons (history, in dims) on one of this lesson's prerequisites, in order of first completion. */
  finishedOnPrerequisites: string[];
};

export type MovingReason = {
  slug: string;
  moved: boolean;
  direction: "earlier" | "later" | null;
  /** null when not moved; also null when moved with no eligible code, which v3's tests treat as a failure. */
  code: MoveCode | null;
  facts: MoveFacts;
};

type PairCodes = { decisive: MoveCode | null; contributing: MoveCode[] };

/**
 * F6 §7's pairCode for u shown above l, with q read as concept-known only when the moved lesson has its own
 * concept state (`movedHasState`), and as no code otherwise (domain-estimate does not exist in v3).
 */
function pairCodes(u: Row, l: Row, movedHasState: boolean): PairCodes {
  if (!(u.value > l.value)) return { decisive: null, contributing: [] }; // T0
  const sw: { c: "prerequisites" | "q" | "refresh"; v: number }[] = [
    { c: "prerequisites", v: u.value - valueOf({ ...u.terms, prereqFactor: l.terms.prereqFactor }) },
    { c: "q", v: u.value - valueOf({ ...u.terms, q: l.terms.q }) },
    { c: "refresh", v: u.value - valueOf({ ...u.terms, refresh: l.terms.refresh }) },
  ];
  let b = sw[0];
  for (const x of sw) if (x.v > b.v) b = x; // rank's own tie rule (T1)
  const m = (c: "prerequisites" | "q" | "refresh"): MoveCode | null =>
    c === "q" ? (movedHasState ? "concept-known" : null) : c;
  const contributing: MoveCode[] = [];
  for (const x of sw) {
    const c = m(x.c);
    if (x.v > 0 && c !== null) contributing.push(c); // T2
  }
  return { decisive: m(b.c), contributing };
}

const CODE_ORDER: MoveCode[] = ["prerequisites", "concept-known", "refresh"];

export function moves(input: ReachableInput): MovingReason[] {
  const { history, dims } = input;
  const { order, rows } = rankRows(input);
  const fullIndex = new Map(order.map((s, i) => [s, i] as const));
  const def = new Map(rows.map((r) => [r.slug, r.idx] as const)); // positions in the full default order
  const defSorted = rows.map((r) => r.slug).sort((a, b) => (def.get(a) as number) - (def.get(b) as number));
  const defPos = new Map(defSorted.map((s, i) => [s, i] as const)); // positions with finished lessons removed
  const rankPos = new Map(rows.map((r, i) => [r.slug, i] as const));

  // Finished lessons in dims, each once, at its first completion; ties in time go to the default order.
  const firstAt = new Map<string, number>();
  for (const h of history) {
    if (dims[h.slug] === undefined) continue;
    const t = firstAt.get(h.slug);
    if (t === undefined || h.completedAt < t) firstAt.set(h.slug, h.completedAt);
  }
  const finished = [...firstAt.keys()].sort(
    (a, b) => (firstAt.get(a) as number) - (firstAt.get(b) as number) || (fullIndex.get(a) as number) - (fullIndex.get(b) as number),
  );
  const finishedOn = (concepts: string[]): string[] => finished.filter((slug) => concepts.includes(dims[slug].concept));

  return rows.map((x, rx) => {
    const facts: MoveFacts = {
      prerequisiteLessons: order.filter((slug) => x.d.prerequisites.includes(dims[slug].concept)),
      finishedOnConcept: finishedOn([x.d.concept]),
      finishedOnPrerequisites: finishedOn(x.d.prerequisites),
    };
    const dx = defPos.get(x.slug) as number;
    if (rx === dx) return { slug: x.slug, moved: false, direction: null, code: null, facts };
    const earlier = rx < dx;
    // The passed cards: earlier, the lessons it passed; later, the lessons that passed it (F6 §1).
    const pairs: [Row, Row][] = [];
    for (const y of rows) {
      const dy = defPos.get(y.slug) as number;
      const ry = rankPos.get(y.slug) as number;
      if (earlier && dy < dx && ry > rx) pairs.push([x, y]);
      if (!earlier && dy > dx && ry < rx) pairs.push([y, x]);
    }
    const eligible = new Set<MoveCode>();
    const decisiveCount = new Map<MoveCode, number>();
    for (const [u, l] of pairs) {
      const pc = pairCodes(u, l, x.s !== undefined);
      for (const c of pc.contributing) eligible.add(c);
      if (pc.decisive !== null) decisiveCount.set(pc.decisive, (decisiveCount.get(pc.decisive) ?? 0) + 1);
    }
    let code: MoveCode | null = null;
    for (const c of CODE_ORDER) {
      if (!eligible.has(c)) continue;
      if (code === null || (decisiveCount.get(c) ?? 0) > (decisiveCount.get(code) ?? 0)) code = c;
    }
    return { slug: x.slug, moved: true, direction: earlier ? "earlier" : "later", code, facts };
  });
}

export const REACHABLE_V3 = { name: "reachable-v3", version: "3", rank, decide, moves } as const;

/**
 * For tests and F5's/F7's read only: the population-expected kept share (P15), the clamped prior mean (P12),
 * and (v3) the ranked rows' terms, so a reader can re-run F6's pair test on rank's own numbers.
 */
export const internals = {
  rows: (input: ReachableInput): { slug: string; value: number; terms: Terms; hasState: boolean }[] =>
    rankRows(input).rows.map((r) => ({ slug: r.slug, value: r.value, terms: { ...r.terms }, hasState: r.s !== undefined })),
  kappa: (ageDays: number, mult: number): number => kappa(l9Nodes(), ageDays, mult),
  priorMean: (): number => {
    const g = priorGrid();
    return posteriorMean(g, g.w.map((x) => (x > 0 ? Math.log(x) : -Infinity)));
  },
};
