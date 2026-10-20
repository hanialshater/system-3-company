/**
 * Session composer (composer-v0.3-session, model-v0.4.0; model-v0.4.2 adds the trace field reasonCarriesMove): a faithful port of EDP's compose()
 * (company/personalization/reference/edp-orchestrator/src/orchestrator-inline.js compose/scoreModule,
 * policies.js applyAddr, edp-engine.js compose's attention budget), BESIDE the phase A composer
 * (./composer.ts, which is unchanged and still serves every existing policy).
 *
 * owner: learner-model-engineer (Ifeoma) · offline only · nothing in src/ imports this.
 * Founder decision: company/decisions/2026-10-20-founder-edp-faithful-personalization.md.
 * Build note (mapping to EDP lines, numbers to review): company/personalization/policies/gam-session-build-note.md.
 *
 * A session of N new cards (COMPOSER_SESSION.sessionSize) is filled greedily, slot by slot:
 *
 *   score(l, slot) = base·rank(l) + Σ_n onRem[n]·remaining[n]·addr[l,n]
 *                  + [l is not the default card]·Σ_n onCov[n]·coverage[n]·addr[l,n]   (model-v0.4.0: EDP's defaults have no on_cov)
 *                  + surprise + novelty                      (both gated off: COMPOSER gates, value 0)
 *                  − [l is not the default card]·(slotDecay·slot + attentionCost)
 *
 *   attention budget (EDP's gain, edp-engine.js compose): a departure is eligible only if
 *     gain(l) = Σ_n min(remaining[n], addrUse·addr[l,n]) > attentionCost   (the need mass the card would resolve);
 *   otherwise the default card fills the slot and no reason is claimed (EDP: candidates with gain ≤ cost
 *   are not shown; here "not shown" means "the default card is shown instead", the moveThreshold rule).
 *   Until model-v0.4.0 gain was the need-term score Σ need:* + Σ cov:*; with addr 1 that equalled the move bar.
 *
 *   after each pick (EDP applyAddr on the addr scaled by addrUse, model-v0.4.0):
 *     remaining[n] = max(0, remaining[n] − addrUse·addr[w,n]);  coverage[n] = min(1, coverage[n] + addrUse·addr[w,n]).
 *   addrUse is session state only: the need and cov terms score with the unscaled addr.
 *
 * remaining starts at the detected needs, coverage at 0. addr is relational (./composer.ts addr(), from the
 * curriculum graph and the history at compose time) and stays fixed for the session: a queued card is not
 * assumed completed, only assumed to address its needs (that assumption is the O2 circularity; model.ts §4b).
 *
 * Hard constraints, as ./composer.ts: due revisits first; default order when the dampener is 0 or the
 * learner switched off; the 1-in-3 anti-bubble floor (streak from history, then the session's own moves);
 * stretch readiness; stated subjects / less-of-this filter. Engagement is never a term.
 *
 * Ablations: `opts.off` with term names, scored 0 and still shown in the trace (gam-session-no-cov).
 */
import type {
  COMPOSER as ComposerConst, COMPOSER_SESSION as SessionConst, ComposeInput, LessonDims, Need, NeedScores,
  PickReason, SessionCoefficients, SessionTermName,
} from "../model";
import { buildCtx, addr, readiness, novelty, movedStreak, type Ctx } from "./composer.ts";

type Model = typeof ComposerConst;
type Session = typeof SessionConst;
const NEEDS: Need[] = ["repair", "build", "breadth", "stretch"];
const ENGAGEMENT = "inactive: phase B (needs aggregate reveal completion, W-706)" as const;

export const SESSION_TRACE_SCHEMA = "personalization-sim-trace-v1" as const;

export type SessionTerm = { name: SessionTermName; value: number };
/**
 * model-v0.4.2 (W-2003, VP record company/decisions/2026-10-20-vp-personalization-session-base.md §3 and §5):
 * reasonCarriesMove, on every pick and slot of every session policy. For a moved card it is true iff the named reason's
 * term value (for a need reason n: the winner's need:n + cov:n terms; for surprise or novelty: that term; for a moved card
 * with no positive named term: 0) is greater than or equal to score(winner) − score(default card), i.e. without that
 * reason's terms the default card would have won the comparison or tied it, and a tie keeps the default card (model-v0.4.4,
 * W-2008, VP record §7: ≥, tied to the strict move test `wouldMove = best.score > def.score`; if that ever becomes ≥, this
 * becomes > in the same change). null for every pick that did not move (default, breadth-floor,
 * due revisits, unpersonalised sessions): there is no move for a reason to carry.
 */
export type SessionPick = { slug: string; moved: boolean; reason: PickReason; terms: SessionTerm[]; score: number; slot: number; reasonCarriesMove: boolean | null };
export type SessionCandidate = {
  slug: string; concept: string; domain: string; level: string; isDefault: boolean;
  score: number; gain: number; addr: NeedScores; terms: SessionTerm[]; eligibleToMove: boolean; note?: string;
};
export type SessionSlotTrace = {
  slot: number;                         // index over picks, due revisits included (as SlotTrace)
  sessionSlot: number | null;           // index among the session's new cards (the slotDecay multiplier); null for revisits
  kind: "due-revisit" | "new";
  defaultCard: string | null;
  defaultScore: number | null;
  constraint: string | null;
  candidates: SessionCandidate[];       // top K by score, plus the default card
  candidatesConsidered: number;
  winner: string | null;
  moved: boolean;
  reason: PickReason;
  /** best eligible departure's score − default card's score (> 0 means it moved, unless the floor held). */
  margin: number | null;
  /** winner's score − the best other candidate that could have filled the slot. */
  runnerUpMargin: number | null;
  /** model-v0.4.2: does the named reason alone carry the move (see SessionPick)? null when the slot did not move. */
  reasonCarriesMove: boolean | null;
  rejected: { slug: string; why: string }[];
  /** the top K candidates that lost, with every term, so a reader can see why each lost. */
  rejectedTop: { slug: string; score: number; gain: number; terms: SessionTerm[]; why: string }[];
  remainingBefore: NeedScores;
  remainingAfter: NeedScores;
  coverageBefore: NeedScores;
  coverageAfter: NeedScores;
  attentionCost: number;
  slotDecay: number;
  engagementFloor: typeof ENGAGEMENT;
};
export type SessionComposition = {
  composer: string; variant: string; sessionSize: number;
  picks: SessionPick[]; slots: SessionSlotTrace[]; personalised: boolean; note: string;
  needs: NeedScores; remaining: NeedScores; coverage: NeedScores;
  /** EDP's coverageRate for this session: (Σ needs − Σ remaining) / Σ needs. Circular: the model grading its own beliefs. */
  diagnostics: { label: string; needMass: number; resolved: number; coverageRate: number };
};
export type SessionOpts = {
  off?: (SessionTermName | "floor")[];
  pilotConcepts?: Set<string>;
  traceTopK?: number;                   // sim choice: 10, as ./composer.ts
  size?: number;                        // default COMPOSER_SESSION.sessionSize
  variant?: string;                     // a label for the trace only
};

const zero = (): NeedScores => ({ repair: 0, build: 0, breadth: 0, stretch: 0 });
const sum = (ts: SessionTerm[]) => ts.reduce((s, t) => s + t.value, 0);

/** The value of the terms a pick reason names (model-v0.4.2): need reason n -> need:n + cov:n; surprise/novelty -> that term; else 0. */
export function reasonTermValue(reason: PickReason, terms: SessionTerm[]): number {
  const names = reason === "surprise" || reason === "novelty" ? [reason] : (NEEDS as string[]).includes(reason) ? [`need:${reason}`, `cov:${reason}`] : [];
  let v = 0;
  for (const t of terms) if (names.includes(t.name)) v += t.value;
  return v;
}
const prereqsAllUnseen = (l: LessonDims, ctx: Ctx) => {
  const p = ctx.prereqsOf[l.concept] ?? [];
  return p.length > 0 && p.every((c) => !ctx.doneConcepts.has(c));
};

/**
 * EDP applyAddr (policies.js lines 12-17) on the addr scaled by `use` (COMPOSER_SESSION addrUse, model-v0.4.0):
 * remaining falls by use·addr (floor 0), coverage rises by use·addr (cap 1). With use = 1 it is EDP's function exactly.
 */
export function applyAddr(a: NeedScores, remaining: NeedScores, coverage: NeedScores, use = 1): void {
  for (const n of NEEDS) {
    const d = use * a[n];
    remaining[n] = Math.max(0, remaining[n] - d);
    coverage[n] = Math.min(1, coverage[n] + d);
  }
}

/** EDP's attention-budget gain (edp-engine.js compose): the need mass a pick would resolve, Σ_n min(remaining[n], use·addr[n]). */
export function resolvableGain(a: NeedScores, remaining: NeedScores, use: number): number {
  let g = 0;
  for (const n of NEEDS) g += Math.min(remaining[n], use * a[n]);
  return g;
}

/** Relational addr of one lesson for every need (./composer.ts addr, unchanged). */
export function addrAll(l: LessonDims, ctx: Ctx, model: Model): NeedScores {
  const o = zero();
  for (const n of NEEDS) o[n] = addr(l, n, ctx, model);
  return o;
}

export function composeSession(input: ComposeInput, model: Model, session: Session, c: SessionCoefficients, opts: SessionOpts = {}): SessionComposition {
  const off = new Set(opts.off ?? []);
  const K = opts.traceTopK ?? 10;
  const size = opts.size ?? session.sessionSize;
  const w = model.weights;
  const ctx = buildCtx(input, opts.pilotConcepts);
  const fp = input.fingerprint;
  const picks: SessionPick[] = [];
  const slots: SessionSlotTrace[] = [];
  const remaining: NeedScores = { ...input.remaining };
  const coverage: NeedScores = zero();
  const filterOk = (slug: string) => {
    const d = ctx.dimsBySlug[slug];
    if (!d) return false;
    if (fp.statedSubjects.length && !fp.statedSubjects.includes(d.domain)) return false;
    return !fp.lessOfThis.includes(d.domain) && !fp.lessOfThis.includes(d.concept);
  };
  const base = { attentionCost: c.attentionCost, slotDecay: c.slotDecay, engagementFloor: ENGAGEMENT };

  // Constraint 1: due revisits first, untouched (AMD-008 F2).
  for (const slug of input.dueRevisits) {
    picks.push({ slug, moved: false, reason: "due-revisit", terms: [], score: 0, slot: picks.length, reasonCarriesMove: null });
    slots.push({ slot: slots.length, sessionSlot: null, kind: "due-revisit", defaultCard: null, defaultScore: null, constraint: "dueRevisitsFirst",
      candidates: [], candidatesConsidered: 0, winner: slug, moved: false, reason: "due-revisit", margin: null, runnerUpMargin: null, reasonCarriesMove: null,
      rejected: [], rejectedTop: [], remainingBefore: { ...remaining }, remainingAfter: { ...remaining },
      coverageBefore: { ...coverage }, coverageAfter: { ...coverage }, ...base });
  }

  const totalNeed = NEEDS.reduce((s, n) => s + input.needs[n], 0);
  const personalised = input.personalisationOn && totalNeed > 0;
  const taken = new Set<string>([...ctx.done, ...input.queued]);
  const queuedConcepts = input.queued.map((s) => ctx.dimsBySlug[s]?.concept).filter((x): x is string => !!x);
  let streak = movedStreak(input.history, input.defaultOrder, filterOk);
  const floor = model.constraints.antiBubbleFloor;

  for (let s = 0; s < size; s++) {
    const remainingBefore = { ...remaining }, coverageBefore = { ...coverage };
    const eligibleDefault = input.defaultOrder.filter((slug) => !taken.has(slug) && filterOk(slug));
    if (!eligibleDefault.length) break;
    const defaultCard = eligibleDefault[0];
    const rankOf = new Map(eligibleDefault.map((slug, i) => [slug, i]));
    const n = eligibleDefault.length;

    const scoreOf = (l: LessonDims): SessionCandidate => {
      const isDefault = l.slug === defaultCard;
      const a = addrAll(l, ctx, model);
      const t: SessionTerm[] = [];
      const add = (name: SessionTermName, v: number) => t.push({ name, value: off.has(name) ? 0 : v });
      add("base", c.base * (n > 1 ? 1 - (rankOf.get(l.slug) ?? n - 1) / (n - 1) : 1));
      for (const need of NEEDS) add(`need:${need}`, c.onRem[need] * remaining[need] * a[need]);
      // model-v0.4.0 (W-1999): the default card carries no cov terms (scored 0, still in the trace), as EDP's default
      // widgets carry on_cov {} (orchestrator-inline.js 152-159). It keeps its need terms: see the build note §8 (b).
      for (const need of NEEDS) add(`cov:${need}`, isDefault ? 0 : c.onCov[need] * coverage[need] * a[need]);
      const g = model.surpriseGate;
      const rated = g.active && !!l.strengthSource && g.requiresStrengthSource.includes(l.strengthSource);
      add("surprise", rated ? w.surprise * ((l.misconceptionStrength ?? 0) / 3) * readiness(l, ctx, model) : 0);
      add("novelty", w.novelty * novelty(l, ctx, model, queuedConcepts));
      add("slotDecay", isDefault ? 0 : -c.slotDecay * s);
      add("attentionCost", isDefault ? 0 : -c.attentionCost);
      const gain = resolvableGain(a, remaining, c.addrUse);
      const stretchBlocked = model.constraints.stretchNeedsSomePrereq && l.level === "stretch" && prereqsAllUnseen(l, ctx);
      const overBudget = !isDefault && !(gain > c.attentionCost);
      const note = stretchBlocked ? "stretch readiness: all prerequisites unseen"
        : overBudget ? `attention budget: resolvable need ${gain.toFixed(3)} ≤ attention cost ${c.attentionCost}` : undefined;
      return { slug: l.slug, concept: l.concept, domain: l.domain, level: l.level, isDefault, score: sum(t), gain, addr: a, terms: t,
        eligibleToMove: isDefault || (!stretchBlocked && !overBudget), ...(note ? { note } : {}) };
    };

    let cands: SessionCandidate[];
    let constraint: string | null = null;
    let winner: SessionCandidate;
    let moved = false;
    let reason: PickReason = "default";
    let margin: number | null = null;
    let carries: boolean | null = null;
    const rejected: { slug: string; why: string }[] = [];

    if (!personalised) {
      constraint = input.personalisationOn ? "defaultWhenDampened (needs all 0)" : "defaultWhenOff (learner switch)";
      winner = scoreOf(ctx.dimsBySlug[defaultCard]);
      cands = [winner];
    } else {
      cands = eligibleDefault.map((slug) => scoreOf(ctx.dimsBySlug[slug])).sort((a, b) => b.score - a.score || (a.slug < b.slug ? -1 : 1));
      const def = cands.find((x) => x.isDefault)!;
      const best = cands.find((x) => !x.isDefault && x.eligibleToMove) ?? null;
      margin = best ? best.score - def.score : null;
      const floorHit = !off.has("floor") && streak >= floor.everyN - floor.fromDefaultRoundRobin;
      const wouldMove = !!best && best.score > def.score;
      for (const x of cands.slice(0, K)) if (!x.eligibleToMove) rejected.push({ slug: x.slug, why: x.note! });
      if (floorHit) {
        constraint = `antiBubbleFloor: ${streak} moved in a row, 1 in ${floor.everyN} stays default`;
        winner = def; reason = wouldMove ? "breadth-floor" : "default";
        if (wouldMove) rejected.push({ slug: best!.slug, why: "anti-bubble floor forced the default card" });
      } else if (wouldMove) {
        winner = best!; moved = true;
        const named = best!.terms.filter((x) => (x.name.startsWith("need:") || x.name.startsWith("cov:") || x.name === "surprise" || x.name === "novelty") && x.value > 0)
          .sort((a, b) => b.value - a.value)[0];
        reason = named ? (named.name.includes(":") ? (named.name.split(":")[1] as Need) : (named.name as PickReason)) : "default";
        carries = reasonTermValue(reason, best!.terms) >= best!.score - def.score; // model-v0.4.4 (W-2008): >=, VP record §7
        rejected.push({ slug: defaultCard, why: `default card, ${(best!.score - def.score).toFixed(3)} below the winner` });
      } else {
        winner = def;
        if (best) rejected.push({ slug: best.slug, why: `best departure ${(best.score - def.score).toFixed(3)} below the default card after attention cost ${c.attentionCost} and slot decay ${(c.slotDecay * s).toFixed(3)}` });
      }
      for (const x of cands.slice(0, K)) if (x.slug !== winner.slug && !rejected.some((r) => r.slug === x.slug)) rejected.push({ slug: x.slug, why: "lower score" });
    }

    const wl = ctx.dimsBySlug[winner.slug];
    if (personalised) applyAddr(winner.addr, remaining, coverage, c.addrUse);
    streak = moved ? streak + 1 : 0;
    taken.add(winner.slug);
    queuedConcepts.push(wl.concept);
    picks.push({ slug: winner.slug, moved, reason, terms: winner.terms, score: winner.score, slot: picks.length, reasonCarriesMove: carries });
    const top = cands.slice(0, K);
    if (!top.some((x) => x.isDefault)) { const d = cands.find((x) => x.isDefault); if (d) top.push(d); }
    // model-v0.4.2: the winner is always in the slot's candidates. Under a flat base (v3-edpbase) the best ELIGIBLE departure
    // can rank below K ineligible ones (stretch-blocked, over budget); before, its row (terms, gain, addr) was then missing.
    if (!top.some((x) => x.slug === winner.slug)) top.push(winner);
    const others = cands.filter((x) => x.slug !== winner.slug && (x.eligibleToMove || x.isDefault));
    const defScore = cands.find((x) => x.isDefault)?.score ?? null;
    const whyOf = (slug: string) => rejected.find((r) => r.slug === slug)?.why ?? "lower score";
    slots.push({ slot: slots.length, sessionSlot: s, kind: "new", defaultCard, defaultScore: defScore, constraint, candidates: top,
      candidatesConsidered: cands.length, winner: winner.slug, moved, reason, margin,
      runnerUpMargin: personalised && others.length ? winner.score - others[0].score : null, reasonCarriesMove: carries, rejected,
      rejectedTop: cands.slice(0, K).filter((x) => x.slug !== winner.slug).map((x) => ({ slug: x.slug, score: x.score, gain: x.gain, terms: x.terms, why: whyOf(x.slug) })),
      remainingBefore, remainingAfter: { ...remaining }, coverageBefore, coverageAfter: { ...coverage }, ...base });
  }
  const needMass = NEEDS.reduce((q, k) => q + input.needs[k], 0);
  const resolved = needMass - NEEDS.reduce((q, k) => q + remaining[k], 0);
  return {
    composer: session.version, variant: opts.variant ?? "custom", sessionSize: size,
    picks, slots, personalised, note: personalised ? "personalised (session)" : "not personalised (default order)",
    needs: { ...input.needs }, remaining: { ...remaining }, coverage: { ...coverage },
    diagnostics: { label: session.circularLabel, needMass, resolved, coverageRate: needMass ? resolved / needMass : 0 },
  };
}

/**
 * The inputs a browser sandbox needs to recompute one session without importing the model: every eligible
 * card in default order with its addr per need (fixed for the session) and the gated terms' values.
 * Pure; same input, same output. The algorithm the sandbox must follow is sim/sandbox-reference.mjs.
 */
export function sandboxPool(input: ComposeInput, model: Model, opts: { pilotConcepts?: Set<string> } = {}) {
  const ctx = buildCtx(input, opts.pilotConcepts);
  const fp = input.fingerprint;
  const filterOk = (slug: string) => {
    const d = ctx.dimsBySlug[slug];
    if (!d) return false;
    if (fp.statedSubjects.length && !fp.statedSubjects.includes(d.domain)) return false;
    return !fp.lessOfThis.includes(d.domain) && !fp.lessOfThis.includes(d.concept);
  };
  const taken = new Set<string>([...ctx.done, ...input.queued]);
  const eligible = input.defaultOrder.filter((slug) => !taken.has(slug) && filterOk(slug));
  const queuedConcepts: string[] = [];
  const candidates = eligible.map((slug, i) => {
    const l = ctx.dimsBySlug[slug];
    const g = model.surpriseGate;
    const rated = g.active && !!l.strengthSource && g.requiresStrengthSource.includes(l.strengthSource);
    return { slug, concept: l.concept, domain: l.domain, level: l.level, defaultRank: i, addr: addrAll(l, ctx, model),
      stretchBlocked: model.constraints.stretchNeedsSomePrereq && l.level === "stretch" && prereqsAllUnseen(l, ctx),
      surprise: rated ? model.weights.surprise * ((l.misconceptionStrength ?? 0) / 3) * readiness(l, ctx, model) : 0,
      novelty: model.weights.novelty * novelty(l, ctx, model, queuedConcepts) };
  });
  return { candidates, antiBubbleStreak: movedStreak(input.history, input.defaultOrder, filterOk) };
}
