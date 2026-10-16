/**
 * Phase A composer (W-1494): implements ComposeFn from ../model.ts, a port of edp-engine.js compose()
 * to the shape in company/personalization/2026-10-16-brief-response.md §2.5.
 *
 * owner: learner-model-engineer (Ifeoma) · offline only · nothing in src/ imports this.
 * Imports types only, so it runs under Node type stripping and tsc alike; every number comes from the
 * `model` argument (COMPOSER), never from a literal here, except where marked "sim choice".
 *
 *   score(lesson | learner) = defaultRank·rank + Σ onRem[n]·remaining[n]·addr[lesson,n]
 *                           + wS·surprise·[surpriseGate open] + wN·novelty·[noveltyGate open]
 * (model-v0.2: overlap and slot terms removed from the contract; slotsAhead is 1, compose-one-recompute.
 *  Surprise is 0 unless COMPOSER.surpriseGate is active AND the lesson's strengthSource is a real rating.
 *  model-v0.2.2: novelty is 0 unless COMPOSER.noveltyGate is active.)
 *
 * Hard constraints (not terms; no weight buys past them): due revisits first; default order when the
 * dampener is 0 or the learner switched off; move threshold; 1-in-3 default share (anti-bubble floor);
 * stretch readiness; stated subjects / "less of this" filter. Engagement is never a term: the reveal
 * completion floor is phase B (needs aggregates) and is reported as inactive in every trace.
 *
 * Ablations: pass `opts.off` with term names; a switched-off term is scored 0 and still shown in the
 * trace (value 0), so an ablation run is inspectable the same way.
 */
import type {
  COMPOSER as ComposerConst, ComposeInput, ComposerTerm, ComposerTermName, HistoryItem, LessonDims,
  Need, NeedScores, Pick, PickReason,
} from "../model";

type Model = typeof ComposerConst;
const NEEDS: Need[] = ["repair", "build", "breadth", "stretch"];
const LV: Record<string, number> = { intro: 0, core: 0.5, stretch: 1 };
const LEVELS = ["intro", "core", "stretch"];

export type ComposeOpts = {
  /** Terms switched off (ablation). "floor" switches off the 1-in-3 constraint (diagnostic only). */
  off?: (ComposerTermName | "floor")[];
  /** In-pilot concepts: prerequisites outside it can never be completed and are ignored (catalog.mjs). */
  pilotConcepts?: Set<string>;
  /** How many top candidates each slot trace keeps (sim choice: 10). */
  traceTopK?: number;
};

export type CandidateTrace = { slug: string; concept: string; domain: string; level: string; score: number;
  terms: ComposerTerm[]; eligibleToMove: boolean; note?: string };
export type SlotTrace = {
  slot: number;
  kind: "due-revisit" | "new";
  defaultCard: string | null;
  defaultScore: number | null;
  constraint: string | null;           // which hard constraint decided the slot, if any
  candidates: CandidateTrace[];        // top K by score, plus the default card
  candidatesConsidered: number;
  winner: string | null;
  moved: boolean;
  reason: PickReason;
  margin: number | null;               // best score − default card score
  rejected: { slug: string; why: string }[];
  remainingBefore: NeedScores;
  remainingAfter: NeedScores;
  engagementFloor: "inactive: phase B (needs aggregate reveal completion, W-706)";
};
export type Composition = { picks: Pick[]; slots: SlotTrace[]; personalised: boolean; note: string };

// ------------------------------------------------------------------------------------------------
// Relational dims (response §2.4), computed from the graph and the learner's history.
// ------------------------------------------------------------------------------------------------

export type Ctx = {
  dimsBySlug: Record<string, LessonDims>;
  done: Set<string>;               // completed slugs
  doneConcepts: Set<string>;
  missedConcepts: string[];        // last 5 completions with a wrong prediction or failed first revisit
  succeededConcepts: string[];     // last 5 with a right prediction or a recalled first revisit
  last10Domains: string[];
  topDomain: string | null;
  levelRecent: number;
  last3Concepts: string[];
  prereqsOf: Record<string, string[]>; // concept -> in-pilot prerequisites
  pilot?: Set<string>;
};

export function buildCtx(input: ComposeInput, pilot?: Set<string>): Ctx {
  const dimsBySlug: Record<string, LessonDims> = {};
  for (const d of input.pool) dimsBySlug[d.slug] = d;
  const hist = [...input.history].sort((a, b) => a.completedAt - b.completedAt);
  const dimOf = (h: HistoryItem) => dimsBySlug[h.slug];
  const missed = (h: HistoryItem) => h.predictedCorrectly === false || (h.recalls.length > 0 && !h.recalls[0].correct);
  const ok = (h: HistoryItem) => h.predictedCorrectly === true || (h.recalls.length > 0 && h.recalls[0].correct);
  const last5 = hist.slice(-5);
  const concepts = (xs: HistoryItem[]) => xs.map((h) => dimOf(h)?.concept).filter((c): c is string => !!c);
  const last10Domains = hist.slice(-10).map((h) => dimOf(h)?.domain).filter((d): d is string => !!d);
  const counts: Record<string, number> = {};
  for (const d of last10Domains) counts[d] = (counts[d] || 0) + 1;
  const topDomain = Object.entries(counts).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))[0]?.[0] ?? null;
  const prereqsOf: Record<string, string[]> = {};
  for (const d of input.pool) prereqsOf[d.concept] = d.prerequisites.filter((p) => !pilot || pilot.has(p));
  const lv = last5.map((h) => dimOf(h)).filter((d): d is LessonDims => !!d).map((d) => LV[d.level]);
  return {
    dimsBySlug, pilot, prereqsOf,
    done: new Set(hist.map((h) => h.slug)),
    doneConcepts: new Set(concepts(hist)),
    missedConcepts: concepts(last5.filter(missed)),
    succeededConcepts: concepts(last5.filter(ok)),
    last10Domains, topDomain,
    levelRecent: lv.length ? lv.reduce((a, b) => a + b, 0) / lv.length : 0,
    last3Concepts: concepts(hist.slice(-3)),
  };
}

const prereqsDone = (l: LessonDims, ctx: Ctx) => (ctx.prereqsOf[l.concept] ?? []).every((p) => ctx.doneConcepts.has(p));
const prereqsAllUnseen = (l: LessonDims, ctx: Ctx) => {
  const p = ctx.prereqsOf[l.concept] ?? [];
  return p.length > 0 && p.every((c) => !ctx.doneConcepts.has(c));
};

/** addr[lesson, need] (response §2.4; constants from model.addr). */
export function addr(l: LessonDims, need: Need, ctx: Ctx, m: Model): number {
  const a = m.addr;
  if (need === "repair") {
    let best = 0;
    for (const miss of ctx.missedConcepts) {
      if (l.concept === miss) best = Math.max(best, a.repairHops[0]);
      const p1 = ctx.prereqsOf[miss] ?? [];
      if (p1.includes(l.concept)) best = Math.max(best, a.repairHops[1]);
      else if (p1.some((p) => (ctx.prereqsOf[p] ?? []).includes(l.concept))) best = Math.max(best, a.repairHops[2] ?? 0);
    }
    return best;
  }
  if (need === "build") {
    const isSucc = ctx.succeededConcepts.some((c) => (ctx.prereqsOf[l.concept] ?? []).includes(c));
    return isSucc && prereqsDone(l, ctx) && !ctx.doneConcepts.has(l.concept) ? a.buildSuccessor : 0;
  }
  if (need === "breadth") {
    if (!ctx.last10Domains.includes(l.domain)) return a.breadthUnseenDomain;
    return l.domain !== ctx.topDomain ? a.breadthOtherDomain : 0;
  }
  // stretch: one level above the recent level's band.
  const cur = Math.round(ctx.levelRecent * 2); // 0 intro, 1 core, 2 stretch
  const up = LEVELS.indexOf(l.level) - cur;
  return up === 1 ? a.stretchOneUp : up === 2 ? a.stretchTwoUp : 0;
}

export function readiness(l: LessonDims, ctx: Ctx, m: Model): number {
  return prereqsDone(l, ctx) ? m.readiness.prereqsDone : m.readiness.prereqsMissing;
}

export function novelty(l: LessonDims, ctx: Ctx, m: Model, queuedConcepts: string[]): number {
  // model-v0.2.2 (W-1542, written by vp-personalization per the readout 1 kill decision): the gate is read
  // here, not on the add() line, so the term still appears in every trace as 0 and the W-1526 break
  // anchors (privacy-breaks.mjs) are unchanged.
  if (!m.noveltyGate.active) return 0;
  const n = m.novelty;
  const recent = [...ctx.last3Concepts, ...queuedConcepts].slice(-3);
  const similar = recent.filter((c) => c === l.concept).length;
  return (ctx.doneConcepts.has(l.concept) ? 0 : n.conceptUnseen)
    + (ctx.last10Domains.includes(l.domain) || ctx.done.size === 0 ? 0 : n.domainUnseen) - n.perSimilarRecent * similar;
}

/** Was each history item the default card at its time? (reconstructs the 1-in-3 floor's streak purely). */
export function movedStreak(history: HistoryItem[], defaultOrder: string[], filter: (slug: string) => boolean): number {
  const done = new Set<string>();
  const flags: boolean[] = [];
  let i = 0;
  for (const h of [...history].sort((a, b) => a.completedAt - b.completedAt)) {
    while (i < defaultOrder.length && (done.has(defaultOrder[i]) || !filter(defaultOrder[i]))) i++;
    flags.push(defaultOrder[i] !== h.slug);
    done.add(h.slug);
  }
  let s = 0;
  for (let k = flags.length - 1; k >= 0 && flags[k]; k--) s++;
  return s;
}

// ------------------------------------------------------------------------------------------------
// The composer.
// ------------------------------------------------------------------------------------------------

const zeroNeeds = (): NeedScores => ({ repair: 0, build: 0, breadth: 0, stretch: 0 });
const sum = (ts: ComposerTerm[]) => ts.reduce((s, t) => s + t.value, 0);

export function composeExplained(input: ComposeInput, model: Model, opts: ComposeOpts = {}): Composition {
  const off = new Set(opts.off ?? []);
  const K = opts.traceTopK ?? 10;
  const w = model.weights;
  const ctx = buildCtx(input, opts.pilotConcepts);
  const picks: Pick[] = [];
  const slots: SlotTrace[] = [];
  const remaining: NeedScores = { ...input.remaining };
  const fp = input.fingerprint;
  const filterOk = (slug: string) => {
    const d = ctx.dimsBySlug[slug];
    if (!d) return false;
    if (fp.statedSubjects.length && !fp.statedSubjects.includes(d.domain)) return false;
    return !fp.lessOfThis.includes(d.domain) && !fp.lessOfThis.includes(d.concept);
  };

  // Constraint 1: due revisits first, untouched (AMD-008 F2).
  for (const slug of input.dueRevisits) {
    picks.push({ slug, moved: false, reason: "due-revisit", terms: [], score: 0 });
    slots.push({ slot: slots.length, kind: "due-revisit", defaultCard: null, defaultScore: null, constraint: "dueRevisitsFirst",
      candidates: [], candidatesConsidered: 0, winner: slug, moved: false, reason: "due-revisit", margin: null, rejected: [],
      remainingBefore: { ...remaining }, remainingAfter: { ...remaining }, engagementFloor: "inactive: phase B (needs aggregate reveal completion, W-706)" });
  }

  const totalNeed = NEEDS.reduce((s, n) => s + input.needs[n], 0);
  const personalised = input.personalisationOn && totalNeed > 0;
  const taken = new Set<string>([...ctx.done, ...input.queued]);
  const queuedConcepts = input.queued.map((s) => ctx.dimsBySlug[s]?.concept).filter((c): c is string => !!c);
  let streak = movedStreak(input.history, input.defaultOrder, filterOk);
  const floor = model.constraints.antiBubbleFloor;

  for (let s = 0; s < model.slotsAhead; s++) {
    const before = { ...remaining };
    const eligibleDefault = input.defaultOrder.filter((slug) => !taken.has(slug) && filterOk(slug));
    if (!eligibleDefault.length) break;
    const defaultCard = eligibleDefault[0];
    const rankOf = new Map(eligibleDefault.map((slug, i) => [slug, i]));
    const n = eligibleDefault.length;

    const scoreOf = (l: LessonDims): CandidateTrace => {
      const t: ComposerTerm[] = [];
      const add = (name: ComposerTermName, v: number) => t.push({ name, value: off.has(name) ? 0 : v });
      add("defaultRank", w.defaultRank * (n > 1 ? 1 - (rankOf.get(l.slug) ?? n - 1) / (n - 1) : 1));
      for (const need of NEEDS) add(`need:${need}`, w.onRem[need] * remaining[need] * addr(l, need, ctx, model));
      const g = model.surpriseGate;
      const rated = g.active && !!l.strengthSource && g.requiresStrengthSource.includes(l.strengthSource);
      add("surprise", rated ? w.surprise * ((l.misconceptionStrength ?? 0) / 3) * readiness(l, ctx, model) : 0);
      add("novelty", w.novelty * novelty(l, ctx, model, queuedConcepts));
      const stretchBlocked = model.constraints.stretchNeedsSomePrereq && l.level === "stretch" && prereqsAllUnseen(l, ctx);
      return { slug: l.slug, concept: l.concept, domain: l.domain, level: l.level, score: sum(t), terms: t,
        eligibleToMove: !stretchBlocked, note: stretchBlocked ? "stretch readiness: all prerequisites unseen" : undefined };
    };

    let cands: CandidateTrace[] = [];
    let constraint: string | null = null;
    let winner: CandidateTrace;
    let moved = false;
    let reason: PickReason = "default";
    const rejected: { slug: string; why: string }[] = [];

    if (!personalised) {
      constraint = input.personalisationOn ? "defaultWhenDampened (needs all 0)" : "defaultWhenOff (learner switch)";
      winner = scoreOf(ctx.dimsBySlug[defaultCard]);
      cands = [winner];
    } else {
      cands = eligibleDefault.map((slug) => scoreOf(ctx.dimsBySlug[slug])).sort((a, b) => b.score - a.score || (a.slug < b.slug ? -1 : 1));
      const def = cands.find((c) => c.slug === defaultCard)!;
      const floorHit = !off.has("floor") && streak >= floor.everyN - floor.fromDefaultRoundRobin;
      const best = cands.find((c) => c.eligibleToMove || c.slug === defaultCard)!;
      for (const c of cands.slice(0, K)) if (!c.eligibleToMove && c.slug !== defaultCard) rejected.push({ slug: c.slug, why: c.note! });
      if (floorHit) {
        constraint = `antiBubbleFloor: ${streak} moved in a row, 1 in ${floor.everyN} stays default`;
        winner = def; reason = best.slug !== defaultCard ? "breadth-floor" : "default";
        if (best.slug !== defaultCard) rejected.push({ slug: best.slug, why: "anti-bubble floor forced the default card" });
      } else if (best.slug !== defaultCard && best.score - def.score > model.moveThreshold) {
        winner = best; moved = true;
        const named = best.terms.filter((t) => t.name !== "defaultRank" && t.value > 0)
          .sort((a, b) => b.value - a.value)[0];
        reason = named ? (named.name.startsWith("need:") ? (named.name.slice(5) as Need) : (named.name as PickReason)) : "default";
        rejected.push({ slug: defaultCard, why: `default card, ${(best.score - def.score).toFixed(3)} below the winner` });
      } else {
        winner = def;
        if (best.slug !== defaultCard) rejected.push({ slug: best.slug, why: `margin ${(best.score - def.score).toFixed(3)} ≤ move threshold ${model.moveThreshold}` });
      }
      for (const c of cands.slice(0, K)) if (c.slug !== winner.slug && !rejected.some((r) => r.slug === c.slug)) rejected.push({ slug: c.slug, why: "lower score" });
    }

    const wl = ctx.dimsBySlug[winner.slug];
    if (personalised) for (const need of NEEDS) remaining[need] = Math.max(0, remaining[need] - addr(wl, need, ctx, model));
    streak = moved ? streak + 1 : 0;
    taken.add(winner.slug);
    queuedConcepts.push(wl.concept);
    picks.push({ slug: winner.slug, moved, reason, terms: winner.terms, score: winner.score });
    const top = cands.slice(0, K);
    if (!top.some((c) => c.slug === defaultCard)) { const d = cands.find((c) => c.slug === defaultCard); if (d) top.push(d); }
    const defScore = cands.find((c) => c.slug === defaultCard)?.score ?? null;
    slots.push({ slot: slots.length, kind: "new", defaultCard, defaultScore: defScore, constraint, candidates: top, candidatesConsidered: cands.length,
      winner: winner.slug, moved, reason, margin: personalised && defScore !== null ? cands[0].score - defScore : null, rejected,
      remainingBefore: before, remainingAfter: { ...remaining }, engagementFloor: "inactive: phase B (needs aggregate reveal completion, W-706)" });
  }
  return { picks, slots, personalised, note: personalised ? "personalised" : "not personalised (default order)" };
}

/** The ComposeFn contract from ../model.ts. */
export const gamCompose = (input: ComposeInput, model: Model): Pick[] => composeExplained(input, model).picks;

// ------------------------------------------------------------------------------------------------
// Comparison policies (response §3). Each returns the same Composition shape so traces line up.
// All keep constraint 1 (due revisits first): it is product behaviour, not a policy choice.
// ------------------------------------------------------------------------------------------------

function simple(input: ComposeInput, choose: (eligible: string[], ctx: Ctx) => { slug: string; moved: boolean; reason: PickReason; why?: string }, pilot?: Set<string>): Composition {
  const ctx = buildCtx(input, pilot);
  const picks: Pick[] = input.dueRevisits.map((slug) => ({ slug, moved: false, reason: "due-revisit" as PickReason, terms: [], score: 0 }));
  const eligible = input.defaultOrder.filter((s) => !ctx.done.has(s) && !input.queued.includes(s));
  const slots: SlotTrace[] = [];
  if (eligible.length) {
    const c = choose(eligible, ctx);
    picks.push({ slug: c.slug, moved: c.moved, reason: c.reason, terms: [], score: 0 });
    slots.push({ slot: 0, kind: "new", defaultCard: eligible[0], defaultScore: null, constraint: c.why ?? null, candidates: [], candidatesConsidered: eligible.length,
      winner: c.slug, moved: c.moved, reason: c.reason, margin: null, rejected: [], remainingBefore: zeroNeeds(), remainingAfter: zeroNeeds(),
      engagementFloor: "inactive: phase B (needs aggregate reveal completion, W-706)" });
  }
  return { picks, slots, personalised: picks.some((p) => p.moved), note: "baseline policy" };
}

export const defaultOrderPolicy = (input: ComposeInput) => simple(input, (e) => ({ slug: e[0], moved: false, reason: "default" }));

export const randomPolicy = (input: ComposeInput, rand: () => number) =>
  simple(input, (e) => { const s = e[Math.floor(rand() * e.length)]; return { slug: s, moved: s !== e[0], reason: "default", why: "random" }; });

/**
 * Draft rules (company/personalization/2026-10-16-draft-founder-brief.md §2): repair after a wrong
 * prediction AND a missed first revisit (prerequisite or same concept of X); build after a right
 * prediction OR a recall (a lesson building on X); else default; G3 1-in-3 default share. No dampener,
 * no weights: the first matching lesson in default order wins. Most recent qualifying X first.
 */
export function draftRulesPolicy(input: ComposeInput, model: Model, pilot?: Set<string>): Composition {
  return simple(input, (eligible, ctx) => {
    const streak = movedStreak(input.history, input.defaultOrder, () => true);
    const floor = model.constraints.antiBubbleFloor;
    if (streak >= floor.everyN - floor.fromDefaultRoundRobin) return { slug: eligible[0], moved: false, reason: "breadth-floor", why: "G3 floor" };
    const hist = [...input.history].sort((a, b) => b.completedAt - a.completedAt).slice(0, 5);
    for (const h of hist) {
      const x = ctx.dimsBySlug[h.slug];
      if (!x) continue;
      if (h.predictedCorrectly === false && h.recalls.length && !h.recalls[0].correct) {
        const pre = ctx.prereqsOf[x.concept] ?? [];
        const y = eligible.find((s) => { const d = ctx.dimsBySlug[s]; return d.concept === x.concept || pre.includes(d.concept); });
        if (y) return { slug: y, moved: y !== eligible[0], reason: "repair", why: `rule 2 on ${x.slug}` };
      }
      if (h.predictedCorrectly === true || (h.recalls.length && h.recalls[0].correct)) {
        const y = eligible.find((s) => (ctx.prereqsOf[ctx.dimsBySlug[s].concept] ?? []).includes(x.concept));
        if (y) return { slug: y, moved: y !== eligible[0], reason: "build", why: `rule 3 on ${x.slug}` };
      }
    }
    return { slug: eligible[0], moved: false, reason: "default" };
  }, pilot);
}

export { NEEDS as COMPOSER_NEEDS, zeroNeeds };
export type { Model as ComposerModel };
