/**
 * PROVISIONAL: placeholder by the builder; to be replaced or owned by personalization-eval; results
 * from it are smoke tests, not evidence. (Independence rule, company/ceo-office/2026-10-16-personalization-org-proposal.md §2:
 * builders never build the thing that grades them. learner-model-engineer wrote this only so the
 * composer and traces could be exercised end to end.)
 *
 * The simulated learner behind the SimLearner interface. It reads the persona's hidden ground truth
 * (personas.ts `latent`) plus the global SimParams below, never need coverage, never the composer's
 * scores, and never misconceptionStrength (a placeholder in phase A, catalog.mjs). Every number here is
 * a guess with no source; research-lead's W-1497 parameter ranges replace them.
 *
 * Model, in words (kept small on purpose):
 * - Each in-pilot concept is known or not. Start: known with P = priorKnowledge[domain].
 * - Predict: known -> right with P = 1 - slip; unknown -> right with P = 1 - misconceptionPull.
 * - Study a lesson: unknown -> learns with P = learnRate × (1 - prereqPenalty × missingPrereqShare).
 *   A learned or refreshed concept gets a forgetting multiplier (1 + prereqPenalty × missingPrereqShare),
 *   times (1 - surpriseBoost) if the prediction was wrong (a hypercorrection assumption, default OFF).
 * - First revisit: known -> recalls with P = max(guessRecall, exp(-forgetRate × mult × days)); unknown ->
 *   guessRecall. A failed revisit relearns with P = relearn (feedback), else the concept is forgotten.
 * - Stop: after each card, P(stop) = stopHazard × (1.5 - interest[domain]); half of stops happen before
 *   the reveal (the reveal completion proxy). interest drives stopping only, never the score.
 */
import type { HistoryItem, LessonDims } from "../model";
import type { Persona } from "../personas";

export type SimParams = {
  learnRate: number; slip: number; guessRecall: number; relearn: number; surpriseBoost: number;
  forgetScale: number; pullScale: number; prereqScale: number; // sensitivity multipliers on persona latents
  stopBeforeRevealShare: number;
};
export const BASE_PARAMS: SimParams = {
  learnRate: 0.7, slip: 0.1, guessRecall: 0.2, relearn: 0.5, surpriseBoost: 0,
  forgetScale: 1, pullScale: 1, prereqScale: 1, stopBeforeRevealShare: 0.5,
};

export type CardOutcome = { predictedRight: boolean; revealed: boolean; stop: boolean; learned: boolean };

/** The interface personalization-eval may reimplement. The simulator calls only these. */
export interface SimLearner {
  /** Shows a new card; returns what happened. */
  study(lesson: LessonDims, t: number): CardOutcome;
  /** First spaced revisit of a completed lesson; returns recalled or not. */
  revisit(lesson: LessonDims, t: number): boolean;
  /** Concepts known now (ground truth, for the scorer only; never shown to a policy). */
  knownCount(): number;
}

const DAY = 86_400_000;
const clamp = (x: number) => Math.max(0, Math.min(1, x));

export function makeLearner(persona: Persona, p: SimParams, catalog: { pilotConcepts: Set<string>; prereqsOf: (c: string) => string[] },
  rand: () => number): SimLearner & { seedKnowledge(history: HistoryItem[], dims: Record<string, LessonDims>): void } {
  const L = persona.latent;
  const forget = L.forgetRate * p.forgetScale;
  const pull = clamp(L.misconceptionPull * p.pullScale);
  const prereqPen = clamp(L.prereqPenalty * p.prereqScale);
  const known = new Map<string, { at: number; mult: number }>();
  for (const c of [...catalog.pilotConcepts].sort()) {
    const dom = c.split(":")[0] as "probability" | "cs";
    if (rand() < (L.priorKnowledge[dom] ?? 0)) known.set(c, { at: -30 * DAY, mult: 1 });
  }
  const missingShare = (l: LessonDims) => {
    const pre = catalog.prereqsOf(l.concept);
    return pre.length ? pre.filter((c) => !known.has(c)).length / pre.length : 0;
  };
  return {
    seedKnowledge(history, dims) {
      // Pre-simulation history (see simulate.mjs): a recalled concept is known, a failed recall is not.
      for (const h of history) {
        const c = dims[h.slug]?.concept; if (!c) continue;
        const r = h.recalls[0];
        if (r) { if (r.correct) known.set(c, { at: r.at, mult: 1 }); else known.delete(c); }
        else if (h.predictedCorrectly || rand() < p.learnRate) known.set(c, { at: h.completedAt, mult: 1 });
      }
    },
    study(l, t) {
      const was = known.has(l.concept);
      const predictedRight = rand() < (was ? 1 - p.slip : 1 - pull);
      const miss = missingShare(l);
      let learned = false;
      if (was || rand() < p.learnRate * (1 - prereqPen * miss)) {
        learned = !was;
        known.set(l.concept, { at: t, mult: (1 + prereqPen * miss) * (predictedRight ? 1 : 1 - p.surpriseBoost) });
      }
      const pStop = clamp(L.stopHazard * (1.5 - (L.interest[l.domain as "probability" | "cs"] ?? 0.5)));
      const stop = rand() < pStop;
      const revealed = !(stop && rand() < p.stopBeforeRevealShare);
      if (!revealed && learned) known.delete(l.concept); // left before the reveal: nothing learned
      return { predictedRight, revealed, stop, learned: learned && revealed };
    },
    revisit(l, t) {
      const k = known.get(l.concept);
      const pr = k ? Math.max(p.guessRecall, Math.exp(-forget * k.mult * ((t - k.at) / DAY))) : p.guessRecall;
      const ok = rand() < pr;
      if (ok) known.set(l.concept, { at: t, mult: (k?.mult ?? 1) * 0.5 });
      else if (rand() < p.relearn) known.set(l.concept, { at: t, mult: k?.mult ?? 1 });
      else known.delete(l.concept);
      return ok;
    },
    knownCount: () => known.size,
  };
}
