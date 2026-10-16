/**
 * Personalization phase A model definition: probability + cs pilot.
 *
 * owner: personalization-lead (Mateo) · board: W-1493 · date: 2026-10-16
 * design: company/personalization/2026-10-16-brief-response.md §2 (shapes), ratified with the
 *         founder's Q3 change in company/personalization/2026-10-16-founder-brief.md §6
 *         ("the curves live in code, not JSON").
 * change rule: every edit to a curve, weight, constraint or signal bumps MODEL_VERSION, carries a
 *         reason in the commit message, and adds a line to the decision record named in DECISION.
 *         There is no curve-editing tool. See README.md in this folder.
 *
 * STATUS: offline definition only. Nothing in src/ may import this file until its home is ruled
 * (W-1498; that step is now "personalization org, pending role approval", per the founder's
 * self-contained-org note in company/decisions/2026-10-16-founder-personalization-org.md).
 * Nothing here is served to a learner: serving needs an experiment (personalization org, pending
 * role approval), the company-wide privacy review (W-1495, privacy-reviewer), F-19 (W-1499) and
 * the founder's deploy approval.
 *
 * INSPECTABLE BY DESIGN (founder ask, founder brief §7, W-1503/W-1504): every curve point, weight
 * and reason string is plain data (NEED_SHAPES, DAMPENER, COMPOSER), explainNeeds() returns the
 * per-signal contributions behind every need score, and inspect() bundles all of it as one
 * JSON-serialisable object a debug page can draw from. No closures hold model numbers.
 *
 * Plain TypeScript with erasable syntax only (no enums, no namespaces), so Node >= 22.18 runs it
 * directly by type stripping, and no npm dependency is needed. It imports nothing.
 *
 * Conventions (response §2): every signal and score is 0..1; every curve is a piecewise-linear
 * {bps, vals} evaluated by pwl(), exactly edp-engine.js's shape.
 *
 * Personas are NOT in this file on purpose: they are simulation fixtures (personas.ts), and
 * serving code must never read them. self-check.mjs fails if this file mentions that module.
 */

export const MODEL_VERSION = "model-v0.1" as const;
export const DECISION = "company/decisions/2026-10-16-personalization-model-v0.md" as const;

/** The pilot set (response §3, phase A). Life Hacks is out: 15/200 lessons have prerequisites. */
export const PILOT_DOMAINS = ["probability", "cs"] as const;
export type PilotDomain = (typeof PILOT_DOMAINS)[number];

// ---------------------------------------------------------------------------------------------
// 1. Inputs and their privacy status (response §2.1). Pending W-1495 (privacy-reviewer).
// ---------------------------------------------------------------------------------------------

/**
 * Privacy status of a raw input, as of 2026-10-16:
 * - "permitted-pending-F19": in AMD-008 P2's permitted list and privacy gate P3.1; F-19 (the
 *   founder's ratification of AMD-008 part P) is still open.
 * - "read-needed": not forbidden, but W-1495 must rule before it may order a live feed.
 *   Offline simulation may use it (no learner data is involved).
 * - "not-personal": lesson or curriculum data.
 */
export type PrivacyStatus = "permitted-pending-F19" | "read-needed" | "not-personal";

export type RawInput =
  | "completions"          // per-lesson completion with time. permitted-pending-F19 (P2, P3.1)
  | "predictedCorrectly"   // prediction right/wrong. read-needed: EDD-009 §7 says ordering use needs its own privacy read
  | "recalls"              // revisit results {at, correct}. permitted-pending-F19 (P2, P3.1)
  | "settings"             // stated subjects, "less of this", on/off. read-needed: schema not built (EDD-008 §6.1)
  | "lessonDims"           // domain, concept, level, prerequisites, successors. not-personal
  | "curriculumGraph";     // content/curriculum/*.json. not-personal

export const INPUT_PRIVACY: Record<RawInput, PrivacyStatus> = {
  completions: "permitted-pending-F19",
  predictedCorrectly: "read-needed",
  recalls: "permitted-pending-F19",
  settings: "read-needed",
  lessonDims: "not-personal",
  curriculumGraph: "not-personal",
};

/**
 * Forbidden inputs (AMD-008 P2, X1; privacy gate P3.1). No signal may read these, and the
 * composer never sees them. Listed so self-check can assert it. Not used in v0 and deliberately
 * absent from RawInput: days since last completion (gapDays) and masteryOf() output, both
 * waiting on W-1495; a persona label, which never exists at serve time.
 */
export const FORBIDDEN_INPUTS = [
  "dwell", "swipes", "scroll", "sessionLength", "sessionCount", "shares", "device",
  "locationFinerThanCountry", "ageBand", "ads", "personaLabel",
] as const;

// ---------------------------------------------------------------------------------------------
// 2. Fingerprint signals (the x-axis of the curves). Computed on demand, never stored.
// ---------------------------------------------------------------------------------------------

export type CurveSignal =
  | "historySize" | "missRecent" | "recallFailRate" | "successRecent"
  | "levelRecent" | "domainConcentration" | "frontierOpen";

export type Fingerprint = {
  version: "fp-v0";
  /** completed lessons / 30, capped at 1. Inputs: completions. Status: permitted-pending-F19. */
  historySize: number;
  /** share of the last 5 completed with a wrong prediction OR a failed first revisit.
   *  Inputs: completions, predictedCorrectly, recalls. Status: read-needed (predictedCorrectly).
   *  If W-1495 refuses predictedCorrectly, this becomes recall-only (opts.predictedCorrectly=false). */
  missRecent: number;
  /** failed first revisits / first revisits taken in the last 30 days (0 if none).
   *  Inputs: recalls. Status: permitted-pending-F19. */
  recallFailRate: number;
  /** share of the last 5 predicted right OR recalled on first revisit.
   *  Inputs: completions, predictedCorrectly, recalls. Status: read-needed (predictedCorrectly). */
  successRecent: number;
  /** mean level of the last 5 (intro 0, core .5, stretch 1).
   *  Inputs: completions, lessonDims. Status: permitted-pending-F19. */
  levelRecent: number;
  /** share of the last 10 completions in the single most-seen domain.
   *  Inputs: completions, lessonDims. Status: permitted-pending-F19. */
  domainConcentration: number;
  /** share of completed concepts that have at least one successor concept not yet completed.
   *  Inputs: completions, curriculumGraph. Status: permitted-pending-F19. */
  frontierOpen: number;
  /** filter, not a curve. Inputs: settings. Status: read-needed (schema). */
  statedSubjects: string[];
  /** filter, not a curve. Inputs: settings. Status: read-needed (schema). */
  lessOfThis: string[];
};

export const SIGNAL_INPUTS: Record<CurveSignal | "statedSubjects" | "lessOfThis", RawInput[]> = {
  historySize: ["completions"],
  missRecent: ["completions", "predictedCorrectly", "recalls"],
  recallFailRate: ["recalls"],
  successRecent: ["completions", "predictedCorrectly", "recalls"],
  levelRecent: ["completions", "lessonDims"],
  domainConcentration: ["completions", "lessonDims"],
  frontierOpen: ["completions", "curriculumGraph"],
  statedSubjects: ["settings"],
  lessOfThis: ["settings"],
};

/** A signal's status is its most restrictive input's status. */
export function signalPrivacy(signal: keyof typeof SIGNAL_INPUTS): PrivacyStatus {
  const s = SIGNAL_INPUTS[signal].map((i) => INPUT_PRIVACY[i]);
  if (s.includes("read-needed")) return "read-needed";
  if (s.includes("permitted-pending-F19")) return "permitted-pending-F19";
  return "not-personal";
}

/** Lesson dims the model reads (response §2.4). Where they live is W-1498 (personalization org, pending role approval). */
export type Level = "intro" | "core" | "stretch";
export type LessonDims = {
  slug: string;
  domain: string;
  concept: string;
  level: Level;
  prerequisites: string[];   // concept ids
  successors: string[];      // concept ids (reverse edges)
  misconceptionStrength?: 1 | 2 | 3;              // pilot rating (CMs), then classifier, then data
  strengthSource?: "cm" | "classifier" | "data";
  revealCompletionRate?: number;                  // aggregate only, phase B on (gate P6.3)
  firstRecallRate?: number;                       // aggregate only, phase B on
};

/** One learner's history as the fingerprint reads it. Only permitted/read-needed fields. */
export type HistoryItem = {
  slug: string;
  completedAt: number;                               // ms since epoch
  predictedCorrectly?: boolean | null;               // read-needed (W-1495)
  recalls: { at: number; correct: boolean }[];       // revisit results, oldest first
};

export const LEVEL_VALUE: Record<Level, number> = { intro: 0, core: 0.5, stretch: 1 };
const DAY = 86_400_000;

/**
 * The fingerprint definition made executable, so the simulator (W-1494) and any later serving
 * code compute the same thing. Pure: same inputs, same output (AMD-008 P1 replay test).
 */
export function fingerprintFrom(
  history: HistoryItem[],
  dims: Record<string, LessonDims>,
  now: number,
  opts: { predictedCorrectly: boolean; statedSubjects?: string[]; lessOfThis?: string[] } = { predictedCorrectly: true },
): Fingerprint {
  const done = [...history].sort((a, b) => a.completedAt - b.completedAt || (a.slug < b.slug ? -1 : 1));
  const last = (n: number) => done.slice(-n);
  const share = (xs: HistoryItem[], f: (h: HistoryItem) => boolean) => (xs.length ? xs.filter(f).length / xs.length : 0);
  const usePred = opts.predictedCorrectly;
  const missed = (h: HistoryItem) =>
    (usePred && h.predictedCorrectly === false) || (h.recalls.length > 0 && !h.recalls[0].correct);
  const succeeded = (h: HistoryItem) =>
    (usePred && h.predictedCorrectly === true) || (h.recalls.length > 0 && h.recalls[0].correct);

  const firstRecent = done.map((h) => h.recalls[0]).filter((r) => r && r.at >= now - 30 * DAY);
  const last10Domains = last(10).map((h) => dims[h.slug]?.domain).filter((d): d is string => !!d);
  const counts: Record<string, number> = {};
  for (const d of last10Domains) counts[d] = (counts[d] || 0) + 1;
  const top = Math.max(0, ...Object.values(counts));

  const doneConcepts = new Set(done.map((h) => dims[h.slug]?.concept).filter((c): c is string => !!c));
  const successorsOf: Record<string, Set<string>> = {};
  for (const d of Object.values(dims)) for (const s of d.successors) (successorsOf[d.concept] ||= new Set()).add(s);
  const open = [...doneConcepts].filter((c) => [...(successorsOf[c] || [])].some((s) => !doneConcepts.has(s)));

  const lv = last(5).map((h) => dims[h.slug]).filter((d): d is LessonDims => !!d).map((d) => LEVEL_VALUE[d.level]);
  return {
    version: "fp-v0",
    historySize: Math.min(1, done.length / 30),
    missRecent: share(last(5), missed),
    recallFailRate: firstRecent.length ? firstRecent.filter((r) => !r.correct).length / firstRecent.length : 0,
    successRecent: share(last(5), succeeded),
    levelRecent: lv.length ? lv.reduce((a, b) => a + b, 0) / lv.length : 0,
    domainConcentration: last10Domains.length ? top / last10Domains.length : 0,
    frontierOpen: doneConcepts.size ? open.length / doneConcepts.size : 0,
    statedSubjects: opts.statedSubjects ?? [],
    lessOfThis: opts.lessOfThis ?? [],
  };
}

// ---------------------------------------------------------------------------------------------
// 3. Needs and their shape curves (response §2.2). Hand-set guesses, not evidence.
// ---------------------------------------------------------------------------------------------

export const NEEDS = ["repair", "build", "breadth", "stretch"] as const;
export type Need = (typeof NEEDS)[number];
export type NeedScores = Record<Need, number>;

export type Curve = { bps: number[]; vals: number[] };
export type ShapeTerm = Curve & {
  signal: CurveSignal;
  w: number;
  /** The reason for this curve and weight, in words. Contains "guess" while it is one. */
  why: string;
};

export const NEED_SHAPES: Record<Need, ShapeTerm[]> = {
  // repair: misses and forgetting call for a prerequisite or same-concept lesson.
  repair: [
    // guess: flat below 1 miss in 5 (one miss is noise); steep from 2 to 3 misses in 5; capped
    // at .9 so repair never fully crowds out the other needs. Weight .6 vs .4: a recent miss
    // is fresher evidence than a 30-day recall rate.
    { signal: "missRecent", bps: [0, 0.2, 0.4, 0.6, 1], vals: [0, 0.1, 0.45, 0.75, 0.9], w: 0.6,
      why: "guess: 1 miss in 5 is noise, 2-3 in 5 is a pattern; capped at .9; weighted above recall rate as fresher evidence" },
    // guess: failing half of first revisits is a strong forgetting signal (typical first-revisit
    // recall should sit well above .5 if lessons land; W-1497's evidence, personalization org, pending role approval, may move this).
    { signal: "recallFailRate", bps: [0, 0.25, 0.5, 1], vals: [0, 0.2, 0.6, 0.9], w: 0.4,
      why: "guess: failing half of first revisits means forgetting, not noise; W-1497 may move the knee" },
  ],
  // build: successes with open successors call for the next lesson in the graph.
  build: [
    // guess: little build pressure below 2 in 5 right; rises fastest from 2 to 3.5 in 5.
    { signal: "successRecent", bps: [0, 0.4, 0.7, 1], vals: [0, 0.15, 0.6, 0.85], w: 0.6,
      why: "guess: success is the main readiness evidence for the next concept, so it carries .6" },
    // guess: with no open successors there is nothing to build to; never above .8 because an
    // open frontier is an opportunity, not a need on its own.
    { signal: "frontierOpen", bps: [0, 0.3, 1], vals: [0, 0.4, 0.8], w: 0.4,
      why: "guess: an open frontier is an opportunity, not a need on its own; capped at .8" },
  ],
  // breadth: the anti-bubble signal as a detected need (the hard 1-in-3 floor is separate).
  breadth: [
    // guess: under half of the last 10 in one domain is already broad; from 7 in 10 it is a
    // bubble forming. Single term, so the weight is 1 by construction.
    { signal: "domainConcentration", bps: [0, 0.5, 0.7, 0.9, 1], vals: [0, 0.05, 0.4, 0.8, 0.95], w: 1,
      why: "guess: <5 of 10 in one domain is broad, >=7 of 10 is a bubble forming; single term so w=1" },
  ],
  // stretch: getting everything right on intro lessons calls for a core or stretch lesson.
  stretch: [
    // guess: stretch only when success is high (>= 4 in 5); stricter than build on purpose,
    // because a stretch lesson before readiness is the confusion O8 warns about.
    { signal: "successRecent", bps: [0, 0.6, 0.8, 1], vals: [0, 0.1, 0.5, 0.8], w: 0.5,
      why: "guess: stretch needs >=4 of 5 right, stricter than build, because early stretch confuses (O8)" },
    // guess: inverse curve: the lower the recent level, the more room to stretch; at stretch
    // level there is nothing left to stretch to.
    { signal: "levelRecent", bps: [0, 0.4, 1], vals: [0.8, 0.4, 0], w: 0.5,
      why: "guess: inverse: low recent level leaves room to stretch, at stretch level there is none; equal weight to success" },
  ],
};

/**
 * Cold-start dampener, multiplied into every need (response §2.2, O5). guess: with fewer than
 * 3 completions (historySize .1) every need is 0 and the composer returns the default order
 * labelled "not personalised" (AMD-008 F4); half strength at 9 completions; full at 30.
 */
export const DAMPENER: Curve & { signal: "historySize"; why: string } = {
  signal: "historySize", bps: [0, 0.1, 0.3, 1], vals: [0, 0, 0.5, 1],
  why: "guess: no personalisation under 3 completions (O5, AMD-008 F4); half at 9; full at 30",
};

export const clamp = (x: number, lo = 0, hi = 1): number => Math.max(lo, Math.min(hi, x));

/** Piecewise-linear curve, exactly edp-engine.js pwl(): flat outside the breakpoints. */
export function pwl(x: number, c: Curve): number {
  if (x <= c.bps[0]) return c.vals[0];
  for (let i = 1; i < c.bps.length; i++) {
    if (x <= c.bps[i]) return c.vals[i - 1] + ((c.vals[i] - c.vals[i - 1]) * (x - c.bps[i - 1])) / (c.bps[i] - c.bps[i - 1]);
  }
  return c.vals[c.vals.length - 1];
}

export type NeedExplanation = {
  need: Need;
  score: number;      // final, after the dampener
  raw: number;        // weighted mean of the terms, before the dampener
  dampener: number;
  terms: { signal: CurveSignal; x: number; y: number; w: number; contribution: number; why: string }[];
};

/** detect() with its working shown: every score is a sum of named, reasoned terms. */
export function explainNeeds(fp: Fingerprint, shapes: Record<Need, ShapeTerm[]> = NEED_SHAPES): NeedExplanation[] {
  const damp = pwl(fp.historySize, DAMPENER);
  return NEEDS.map((need) => {
    const cs = shapes[need];
    const wsum = cs.reduce((s, c) => s + c.w, 0);
    const terms = cs.map((c) => {
      const x = clamp(fp[c.signal] ?? 0);
      const y = pwl(x, c);
      return { signal: c.signal, x, y, w: c.w, contribution: (c.w * y) / Math.max(wsum, 1e-9), why: c.why };
    });
    const raw = clamp(terms.reduce((s, t) => s + t.contribution, 0));
    return { need, score: raw * damp, raw, dampener: damp, terms };
  });
}

/** detect(): score[need] = clamp(Σ w·pwl(x) / Σ w) × pwl(historySize, DAMPENER). */
export function detect(fp: Fingerprint, shapes: Record<Need, ShapeTerm[]> = NEED_SHAPES): NeedScores {
  const out = { repair: 0, build: 0, breadth: 0, stretch: 0 };
  for (const e of explainNeeds(fp, shapes)) out[e.need] = e.score;
  return out;
}

// ---------------------------------------------------------------------------------------------
// 4. Composer terms, constraints and the engagement guardrail (response §2.5).
//    The composer itself is learner-model-engineer's (W-1494, inside the personalization org); this is its contract and weights.
// ---------------------------------------------------------------------------------------------

/**
 * The only terms a pick's score may contain. There is deliberately no engagement term
 * (founder Q1 ratified: engagement is a guardrail, AMD-008 X1). Adding one is an amendment, not
 * an edit to this file.
 */
export type ComposerTermName =
  | "defaultRank" | `need:${Need}` | "surprise" | "novelty" | "overlap" | "slot";

export const COMPOSER = {
  version: "composer-v0",
  /** guess: 3 new cards ahead, recomputed after every card, as response §2.5. */
  slotsAhead: 3,
  weights: {
    /** guess: 1.0 on the default order's rank (1 for the next default card, falling linearly to
     *  0 across the pool) so the default order is the base and needs must earn a move. */
    defaultRank: 1.0,
    /** onRem[need] × remaining[need] × addr[lesson, need]. guess: repair highest (forgetting
     *  costs recall most directly), build next, breadth just under build (it also has a hard
     *  floor), stretch lowest (O8: stretch before readiness is the riskiest move). */
    onRem: { repair: 0.5, build: 0.4, breadth: 0.35, stretch: 0.3 } satisfies Record<Need, number>,
    /** guess: small on purpose. Surprise (misconceptionStrength/3 × readiness) is kept only while
     *  the experiment shows recall does not fall (founder Q1); W-1497 may change its form. */
    surprise: 0.15,
    /** guess: smaller than surprise; novelty without a learning reason is the feed-optimisation
     *  drift we exist to avoid. Kept only while recall does not fall. */
    novelty: 0.1,
    /** guess: a second card on a queued concept loses half a default rank: no two from one concept. */
    overlap: 0.5,
    /** guess: as edp-engine slot_decay; mild preference to resolve needs sooner. */
    slotDecay: 0.02,
  },
  /** guess: a card moves only if score − score(default card) > .1; otherwise the default card is
   *  shown and no reason is claimed (constraint 3). .1 is a tenth of the default-rank range. */
  moveThreshold: 0.1,
  /** Relational dims (response §2.4), as constants the composer uses. */
  addr: {
    /** guess: repair addr 1 if the lesson's concept is a missed lesson's concept or its direct
     *  prerequisite, .5 at 2 hops, 0 beyond. */
    repairHops: [1, 1, 0.5] as number[],                 // index = hops (0 same concept, 1, 2)
    /** guess: build addr 1 for a direct successor of a recalled concept whose prerequisites are all done. */
    buildSuccessor: 1,
    /** guess: breadth addr 1 for a domain not in the last 10, .5 for a domain seen but not the top one. */
    breadthUnseenDomain: 1, breadthOtherDomain: 0.5,
    /** guess: stretch addr 1 one level above levelRecent's level, .5 two levels above (readiness permitting). */
    stretchOneUp: 1, stretchTwoUp: 0.5,
  },
  /** surprise = misconceptionStrength/3 × readiness. guess: readiness .5 if prerequisites are not all done (O8). */
  readiness: { prereqsDone: 1, prereqsMissing: 0.5 },
  /** novelty = (concept unseen ? .6 : 0) + (domain unseen ? .4 : 0) − .2 × similar cards among the last 3. guess. */
  novelty: { conceptUnseen: 0.6, domainUnseen: 0.4, perSimilarRecent: 0.2 },
  /** Hard constraints: not terms, so no weight can buy past them. */
  constraints: {
    dueRevisitsFirst: true,               // AMD-008 F2
    defaultWhenDampenedOrOff: true,       // dampener 0, or learner switched off (P4)
    antiBubbleFloor: { everyN: 3, fromDefaultRoundRobin: 1 },  // guess: 1 in 3 (draft G3)
    stretchNeedsSomePrereq: true,         // stretch ineligible if all prerequisites unseen (O8)
    statedSubjectsAndLessOfThisFilter: true,
  },
  /**
   * The engagement guardrail: a FLOOR, not a term (founder Q1). Phase B on, when W-706 persisted
   * events give per-lesson aggregates. guess: .6, to be set by the personalization org's evaluation role (pending role approval) from the first
   * aggregate distribution of Surface Value #5. Effect: the lesson may not be moved UP; it can
   * still be shown in its default place. Never dwell, swipes, session time or count.
   */
  engagementGuardrail: {
    metric: "revealCompletionRate" as const,   // Surface Value #5, per lesson, aggregate
    floor: 0.6,
    from: "phase-B" as const,
    effect: "not-eligible-to-move-up" as const,
  },
};

/** What a pick reports, so every moved card is explained by its terms (AMD-008 P1). */
export type ComposerTerm = { name: ComposerTermName; value: number };
export type PickReason = Need | "surprise" | "novelty" | "breadth-floor" | "default" | "due-revisit";
export type Pick = { slug: string; moved: boolean; reason: PickReason; terms: ComposerTerm[]; score: number };

/** Interface for W-1494: what a composer receives. No persona, no forbidden input. */
export type ComposeInput = {
  fingerprint: Fingerprint;
  needs: NeedScores;            // detect(fingerprint)
  remaining: NeedScores;        // needs not yet covered by cards already queued this pass
  pool: LessonDims[];           // eligible lessons, pilot domains
  defaultOrder: string[];       // today's round-robin order (the base and the holdout)
  queued: string[];             // cards already queued ahead
  history: HistoryItem[];
  dueRevisits: string[];
  personalisationOn: boolean;   // the learner's switch (P4)
};
export type ComposeFn = (input: ComposeInput, model: typeof COMPOSER) => Pick[];

// ---------------------------------------------------------------------------------------------
// 5. The learning objective the simulator scores (response §2.5). The pass criterion is
//    W-1496's (personalization org, pending role approval) and is written before the simulator runs.
// ---------------------------------------------------------------------------------------------

export const OBJECTIVE = {
  primary: "mean simulated first spaced-revisit recall over ALL lessons completed (not only moved ones)",
  guardrails: [
    "distinct domains reached does not fall (breadth)",
    "share of cards shown before their prerequisites does not rise",
  ],
  /** Never a score input: the simulator scores an independent simulated learner, not need coverage (O2). */
  notScored: ["need coverage", "time on feed", "cards seen"],
  passCriterion: "W-1496 (personalization org, pending role approval), written before the first run",
} as const;

/** Policies phase A compares (response §3); W-1494 implements them. */
export const POLICIES = [
  "default-order", "draft-rules", "gam", "gam-no-surprise-novelty", "gam-no-breadth", "random", "epsilon-greedy",
] as const;
export type PolicyName = (typeof POLICIES)[number];

// ---------------------------------------------------------------------------------------------
// 6. Model invariants (run by self-check.mjs; the simulator should run them too).
// ---------------------------------------------------------------------------------------------

export function checkModel(): string[] {
  const errs: string[] = [];
  const curves: [string, Curve & { why: string }][] = [["dampener", DAMPENER]];
  for (const need of NEEDS) {
    if (!NEED_SHAPES[need]?.length) errs.push(`${need}: no shape terms`);
    for (const t of NEED_SHAPES[need] ?? []) {
      curves.push([`${need}.${t.signal}`, t]);
      if (!(t.w > 0)) errs.push(`${need}.${t.signal}: weight must be > 0`);
      if (!(t.signal in SIGNAL_INPUTS)) errs.push(`${need}.${t.signal}: unknown signal`);
    }
  }
  for (const [id, c] of curves) {
    if (c.bps.length !== c.vals.length || c.bps.length < 2) errs.push(`${id}: bps/vals length`);
    if (c.bps.some((b, i) => i > 0 && b <= c.bps[i - 1])) errs.push(`${id}: bps must ascend`);
    if ([...c.bps, ...c.vals].some((v) => v < 0 || v > 1)) errs.push(`${id}: values outside 0..1`);
    if (!c.why || c.why.length < 20) errs.push(`${id}: needs a written reason`);
  }
  const forbidden = new Set<string>(FORBIDDEN_INPUTS);
  for (const [sig, inputs] of Object.entries(SIGNAL_INPUTS)) {
    for (const i of inputs) if (forbidden.has(i)) errs.push(`${sig}: reads forbidden input ${i}`);
  }
  if (COMPOSER.engagementGuardrail.effect !== "not-eligible-to-move-up") errs.push("engagement must stay a floor");
  return errs;
}

// ---------------------------------------------------------------------------------------------
// 7. Inspection (founder ask, W-1503 page / W-1504 trace). Plain data, JSON-serialisable.
// ---------------------------------------------------------------------------------------------

export type CurveView = { need: Need | "dampener"; signal: CurveSignal; w: number; why: string;
  points: { x: number; y: number }[]; privacy: PrivacyStatus };

/** Every curve as drawable points plus its reason and the privacy status of its signal. */
export function curveViews(): CurveView[] {
  const pts = (c: Curve) => c.bps.map((x, i) => ({ x, y: c.vals[i] }));
  const out: CurveView[] = [{ need: "dampener", signal: "historySize", w: 1, why: DAMPENER.why, points: pts(DAMPENER), privacy: signalPrivacy("historySize") }];
  for (const need of NEEDS) for (const t of NEED_SHAPES[need])
    out.push({ need, signal: t.signal, w: t.w, why: t.why, points: pts(t), privacy: signalPrivacy(t.signal) });
  return out;
}

/** The whole model as one object: versions, signals with privacy, curves, composer, objective. */
export function inspect() {
  return {
    version: MODEL_VERSION, decision: DECISION, pilot: PILOT_DOMAINS,
    signals: (Object.keys(SIGNAL_INPUTS) as (keyof typeof SIGNAL_INPUTS)[]).map((s) => ({ signal: s, inputs: SIGNAL_INPUTS[s], privacy: signalPrivacy(s) })),
    curves: curveViews(), composer: COMPOSER, objective: OBJECTIVE, policies: POLICIES,
    forbiddenInputs: FORBIDDEN_INPUTS,
  };
}
