/**
 * Personalization phase A model definition: probability + cs pilot.
 *
 * owner: vp-personalization (Mateo; was personalization-lead until 2026-10-16) · board: W-1493 · date: 2026-10-16
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

export const MODEL_VERSION = "model-v0.2.1" as const;
export const DECISION = "company/decisions/2026-10-16-personalization-model-v0.md" as const;

/** The pilot set (response §3, phase A). Life Hacks is out: 15/200 lessons have prerequisites.
 *  model-v0.2 (W-1512 finding 2): NOT widened yet. Candidate third domain: math (80 visible lessons,
 *  65% with prerequisites; 11 pilot prerequisite edges already point into math:). Widening changes
 *  the simulated world (persona latent priorKnowledge/interest per domain, sim history seeding), which
 *  is personalization-eval's (W-1513), and adds 80 lessons to the ratings (lesson-dims-owner). The
 *  breadth guardrail was redefined instead (OBJECTIVE), so it moves with two domains. */
export const PILOT_DOMAINS = ["probability", "cs"] as const;
export type PilotDomain = (typeof PILOT_DOMAINS)[number];

// ---------------------------------------------------------------------------------------------
// 1. Inputs and their privacy status (response §2.1). Ruled by W-1495 (privacy-reviewer).
// ---------------------------------------------------------------------------------------------

/** The privacy ruling these statuses apply (model-v0.2.1, W-1514). Section numbers below are its. */
export const PRIVACY_RULING = "company/reviews/_privacy/2026-10-16-personalization-model-inputs.md" as const;

/**
 * Privacy status of a raw input for phase B (live, experiment-gated), per PRIVACY_RULING §2.
 * Phase A (offline, simulated personas only) is allowed for every input (ruling §1, A1); calibrating
 * the simulated learner on any real data, even aggregates, is a new read (A2).
 * Every phase B status also needs F-19 (AMD-008 part P ratified with P2 as drafted), a registered
 * experiment and the founder's deploy approval; none of those is the privacy reviewer's to give.
 * - "standing-conditions": allowed under the standing conditions N1-N6 (ruling §3): computed on
 *   demand, never stored; anonymous stays local; forbidden-input invariance; no served-order log.
 * - "conditions": allowed only if the named extra conditions (INPUT_PRIVACY_CONDITIONS) hold too.
 * - "conditions-schema-unread": allowed in use, but the schema that would hold it is not built and
 *   its diff needs its own read (ruling §2.2, E7; W-1521) before it may order a live feed.
 * - "not-personal": lesson or curriculum data.
 * There is no "refused" raw input: refused things (gapDays, stored fingerprints or need scores, the
 * forbidden list) are absent from RawInput by design (FORBIDDEN_INPUTS, ruling §2.5 and §4).
 */
export type PrivacyStatus = "standing-conditions" | "conditions" | "conditions-schema-unread" | "not-personal";

export type RawInput =
  | "completions"          // per-lesson completion with time. standing-conditions (ruling §2; P2, gate P3.1)
  | "predictedCorrectly"   // prediction right/wrong. conditions P1-P4 (ruling §2.1); null = no prediction, never "wrong"
  | "recalls"              // revisit results {at, correct}. standing-conditions; 30-day window only, F1 (ruling §2.3)
  | "settings"             // stated subjects, "less of this", on/off. conditions SS1-SS5; schema diff unread (§2.2, W-1521)
  | "lessonDims"           // domain, concept, level, prerequisites, successors. not-personal
  | "curriculumGraph";     // content/curriculum/*.json. not-personal

export const INPUT_PRIVACY: Record<RawInput, PrivacyStatus> = {
  completions: "standing-conditions",
  predictedCorrectly: "conditions",
  recalls: "standing-conditions",
  settings: "conditions-schema-unread",
  lessonDims: "not-personal",
  curriculumGraph: "not-personal",
};

/** The ruling's condition ids per input (PRIVACY_RULING), shown by inspect() beside the status. */
export const INPUT_PRIVACY_CONDITIONS: Record<RawInput, string[]> = {
  completions: ["N1-N6", "F2 (historySize never shown as a number or label)"],
  predictedCorrectly: ["N1-N6", "P1 recall-only fallback stays buildable and tested", "P2 null is absent, never wrong",
    "P3 reason copy names an act, never a trait or comparison", "P4 read to order, never counted or stored"],
  recalls: ["N1-N6", "F1 30-day window over results; never days-since-last or per-day counts"],
  settings: ["N1-N6", "SS1 closed vocabulary", "SS2 bounded", "SS3 stated, never inferred", "SS4 deleted/exported with the account; anonymous local",
    "SS5 never visible to others or in aggregates", "schema diff read (W-1521)"],
  lessonDims: [],
  curriculumGraph: [],
};

/**
 * Forbidden inputs (AMD-008 P2, X1; privacy gate P3.1). No signal may read these, and the
 * composer never sees them. Listed so self-check can assert it. The ruling confirms the list is
 * complete; keep it (PRIVACY_RULING §2). Deliberately absent from RawInput: days since last
 * completion (gapDays), REFUSED (§2.5: close to session count; a new ask needs purpose and the
 * alternative considered); masteryOf() output, allowed only outside v0 on M1-M3 after EDD-009 is
 * approved (§2.5); a persona label, which never exists at serve time. Per-learner storage of any
 * fingerprint, need score or composer term is REFUSED (§4): everything below is computed on
 * demand and discarded (N1). The age band is never an input (teen mode T1).
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
  /** completed lessons / 30, capped at 1. Inputs: completions. Status: standing-conditions. */
  historySize: number;
  /** share of the last 5 completed with a wrong prediction OR a failed first revisit.
   *  Inputs: completions, predictedCorrectly, recalls. Status: conditions P1-P4 (predictedCorrectly).
   *  Recall-only fallback (opts.predictedCorrectly=false) must stay tested (P1, self-check). */
  missRecent: number;
  /** failed first revisits / first revisits taken in the last 30 days (0 if none).
   *  Inputs: recalls. Status: standing-conditions. */
  recallFailRate: number;
  /** share of the last 5 predicted right OR recalled on first revisit.
   *  Inputs: completions, predictedCorrectly, recalls. Status: conditions P1-P4 (predictedCorrectly). */
  successRecent: number;
  /** mean level of the last 5 (intro 0, core .5, stretch 1).
   *  Inputs: completions, lessonDims. Status: standing-conditions. */
  levelRecent: number;
  /** share of the last 10 completions in the single most-seen domain.
   *  Inputs: completions, lessonDims. Status: standing-conditions. */
  domainConcentration: number;
  /** share of completed concepts that have at least one successor concept not yet completed.
   *  Inputs: completions, curriculumGraph. Status: standing-conditions. */
  frontierOpen: number;
  /** filter, not a curve. Inputs: settings. Status: conditions-schema-unread (SS1-SS5; stated, never inferred, SS3). */
  statedSubjects: string[];
  /** filter, not a curve. Inputs: settings. Status: conditions-schema-unread (SS1-SS5; never visible to others, SS5). */
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
  if (s.includes("conditions-schema-unread")) return "conditions-schema-unread";
  if (s.includes("conditions")) return "conditions";
  if (s.includes("standing-conditions")) return "standing-conditions";
  return "not-personal";
}

/** Lesson dims the model reads (response §2.4). Where they live is W-1498 (personalization org, pending role approval). */
export type Level = "intro" | "core" | "stretch";
export type StrengthSource = "dims-owner" | "cm" | "classifier" | "data";
export type LessonDims = {
  slug: string;
  domain: string;
  concept: string;
  level: Level;
  prerequisites: string[];   // concept ids
  successors: string[];      // concept ids (reverse edges)
  misconceptionStrength?: 1 | 2 | 3;              // pilot rating (in-org rater, or CMs), then classifier, then data
  /** model-v0.2: "dims-owner" added (org proposal T6 moves the pilot rating in-org). Absent = unrated or
   *  placeholder, and the surprise term reads it as 0 (COMPOSER.surpriseGate). */
  strengthSource?: StrengthSource;
  revealCompletionRate?: number;                  // aggregate only, phase B on (gate P6.3)
  firstRecallRate?: number;                       // aggregate only, phase B on
};

/** One learner's history as the fingerprint reads it. Only fields ruled in PRIVACY_RULING §2. */
export type HistoryItem = {
  slug: string;
  completedAt: number;                               // ms since epoch
  predictedCorrectly?: boolean | null;               // conditions P1-P4; null/absent = no prediction, never "wrong" (P2)
  recalls: { at: number; correct: boolean }[];       // revisit results, oldest first
};

export const LEVEL_VALUE: Record<Level, number> = { intro: 0, core: 0.5, stretch: 1 };
const DAY = 86_400_000;

/**
 * The fingerprint definition made executable, so the simulator (W-1494) and any later serving
 * code compute the same thing. Pure: same inputs, same output (AMD-008 P1 replay test).
 * Privacy (PRIVACY_RULING §2.1): predictedCorrectly is read only through usePred and only as
 * `=== true` / `=== false`, so null or absent counts as neither a miss nor a success (P2). With
 * opts.predictedCorrectly=false the output does not depend on the field at all (P1; self-check
 * asserts both). Serving code in fallback mode must not load the field into the history at all.
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
  | "defaultRank" | `need:${Need}` | "surprise" | "novelty";
// model-v0.2: "overlap" and "slot" removed. With compose-one-recompute (slotsAhead 1, below) the queue
// is always empty and the slot index is always 0, so both terms were identically 0 in every pick
// (simulator finding 1, W-1512; company/personalization/model/sim/README.md). Repeats of a concept are
// still damped by novelty.perSimilarRecent over the last 3 completed cards.

export const COMPOSER = {
  version: "composer-v0.2",
  /**
   * model-v0.2: compose ONE card, serve it, recompute from the learner's answer (was: 3 slots ahead,
   * recomputed after every card, so slots 2-3 were composed and thrown away; W-1512 finding 1).
   * Chosen over "compose a session of N, then serve all N" because N-ahead serving delays repair: a
   * wrong prediction on card 1 could not change cards 2..N. Needs fall on evidence (the next
   * fingerprint), not on assumed coverage by queued cards (the circularity O2 warns about).
   * `ComposeInput.remaining` therefore equals `needs` and `queued` is empty in every call.
   * Revisit if a surface ever pre-fetches a session (offline mode): that is a new version, with
   * a session-level diversity term designed then.
   */
  slotsAhead: 1,
  servingMode: "compose-one-recompute" as const,
  weights: {
    /** guess: 1.0 on the default order's rank (1 for the next default card, falling linearly to
     *  0 across the pool) so the default order is the base and needs must earn a move. */
    defaultRank: 1.0,
    /** onRem[need] × remaining[need] × addr[lesson, need]. guess: repair highest (forgetting
     *  costs recall most directly), build next, breadth just under build (it also has a hard
     *  floor), stretch lowest (O8: stretch before readiness is the riskiest move). */
    onRem: { repair: 0.5, build: 0.4, breadth: 0.35, stretch: 0.3 } satisfies Record<Need, number>,
    /** guess: small on purpose. Surprise (misconceptionStrength/3 × readiness) is kept only while
     *  the experiment shows recall does not fall (founder Q1); W-1497 may change its form.
     *  INACTIVE in model-v0.2: see surpriseGate. The weight is kept so turning it on is one flag. */
    surprise: 0.15,
    /** guess: smaller than surprise; novelty without a learning reason is the feed-optimisation
     *  drift we exist to avoid. Kept only while recall does not fall. */
    novelty: 0.1,
  },
  /**
   * model-v0.2 (W-1512 finding 3): surprise is OFF until real ratings exist. With a placeholder
   * misconceptionStrength (a slug hash, sim/catalog.mjs) the term ranked by noise × readiness, i.e. it
   * acted only as a second readiness term. Two locks, both required for a non-zero surprise value:
   * (1) `active` is true (a version bump, after personalization-eval's blind 20% second rating reports
   * agreement on the pilot ratings); (2) the lesson's `strengthSource` is in `requiresStrengthSource`
   * (an unrated or placeholder lesson scores 0). Plan for the ratings:
   * company/personalization/2026-10-16-misconception-strength-ratings-plan.md.
   */
  surpriseGate: {
    active: false,
    requiresStrengthSource: ["dims-owner", "cm", "classifier", "data"] as StrengthSource[],
    why: "inactive: no real misconceptionStrength ratings on the pilot; placeholder hash ranks by noise (W-1512 finding 3)",
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
    antiBubbleFloor: {
      everyN: 3, fromDefaultRoundRobin: 1,  // guess: 1 in 3 (draft G3)
      /** model-v0.2 (W-1512 finding 5), how the floor counts, confirmed in the simulator: */
      counts: "completed new cards only, rebuilt from history (permitted inputs, no served log is stored): a card counts as moved if it was not the first eligible card of the default order when it was completed. Learner-chosen cards (map, search) and pre-personalisation history count as moved, so a first session usually starts on the default card. Cards left before the reveal and due revisits do not count. Past items are judged against today's default order and filter, so a catalog change can shift the count.",
      /** Open (phase B, before serving): a learner who skips moved cards without completing them is not
       *  bounded by this floor. Closing it needs a session-local served list, which is a new input for
       *  privacy-reviewer (W-1495); not added here. */
      knownGap: "skipped moved cards do not count (sim: max 4 moved served in a row vs 2 completed)",
    },
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
  remaining: NeedScores;        // needs not yet covered by cards already queued; equals needs under compose-one-recompute
  pool: LessonDims[];           // eligible lessons, pilot domains
  defaultOrder: string[];       // today's round-robin order (the base and the holdout)
  queued: string[];             // cards already queued ahead; empty under compose-one-recompute
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
    // model-v0.2 (W-1512 finding 2): "distinct domains reached" cannot move with 2 pilot domains
    // (every policy reached 2.00 in every episode). Concentration moves with any number of domains.
    "share of completed new cards in the learner's top domain does not rise vs default-order (breadth)",
    "distinct concepts completed does not fall vs default-order (breadth within a domain)",
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
  if (COMPOSER.slotsAhead !== 1 && COMPOSER.servingMode === "compose-one-recompute") errs.push("compose-one-recompute needs slotsAhead 1");
  if (COMPOSER.surpriseGate.active && !COMPOSER.surpriseGate.requiresStrengthSource.length) errs.push("surprise active needs a required strength source");
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
  for (const i of Object.keys(INPUT_PRIVACY) as RawInput[]) {
    if (INPUT_PRIVACY[i] !== "not-personal" && !INPUT_PRIVACY_CONDITIONS[i]?.length) errs.push(`${i}: personal input with no ruling conditions`);
    if (INPUT_PRIVACY[i] === "not-personal" && INPUT_PRIVACY_CONDITIONS[i]?.length) errs.push(`${i}: not-personal input carries conditions`);
  }
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
    privacyRuling: PRIVACY_RULING,
    inputPrivacy: (Object.keys(INPUT_PRIVACY) as RawInput[]).map((i) => ({ input: i, status: INPUT_PRIVACY[i], conditions: INPUT_PRIVACY_CONDITIONS[i] })),
  };
}
