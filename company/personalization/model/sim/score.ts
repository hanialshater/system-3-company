/**
 * PROVISIONAL: placeholder by the builder; to be replaced or owned by personalization-eval; results
 * from it are smoke tests, not evidence. There is no committed pass criterion (W-1496, analytics-steward):
 * this file computes numbers, it does not judge them, and nothing here says which policy is better.
 *
 * Scores an episode from what the simulated learner did (learner.ts), never from need coverage
 * (response §1 C5, objection O2). Metrics, as OBJECTIVE in ../model.ts plus two labelled extras:
 * - recall: mean first-revisit recall over ALL lessons completed in the simulation (primary).
 * - domains / concepts: distinct domains and concepts completed (breadth guardrail; with two pilot
 *   domains, domains saturates fast, so concepts is shown too).
 * - prereqFirst: share of new cards shown before an in-pilot prerequisite was completed (guardrail).
 * - reveal: share of started cards that reached the reveal (reveal completion proxy; engagement, reported,
 *   never optimised).
 * - gain (extra, not in OBJECTIVE): concepts known at the end minus at the start, from ground truth.
 */
export type EpisodeLog = {
  started: number; revealed: number; prereqFirst: number;
  firstRecalls: boolean[]; domains: Set<string>; concepts: Set<string>; knownStart: number; knownEnd: number;
  moved: number;
};
export type EpisodeScore = { recall: number; nRecalls: number; domains: number; concepts: number; prereqFirst: number;
  reveal: number; gain: number; cards: number; movedShare: number };

export const newLog = (knownStart: number): EpisodeLog => ({ started: 0, revealed: 0, prereqFirst: 0, firstRecalls: [],
  domains: new Set(), concepts: new Set(), knownStart, knownEnd: knownStart, moved: 0 });

export function scoreEpisode(l: EpisodeLog): EpisodeScore {
  const n = l.firstRecalls.length;
  return {
    recall: n ? l.firstRecalls.filter(Boolean).length / n : NaN, nRecalls: n,
    domains: l.domains.size, concepts: l.concepts.size,
    prereqFirst: l.started ? l.prereqFirst / l.started : 0,
    reveal: l.started ? l.revealed / l.started : NaN,
    gain: l.knownEnd - l.knownStart, cards: l.started, movedShare: l.started ? l.moved / l.started : 0,
  };
}

export function mean(xs: number[]): number { const v = xs.filter((x) => !Number.isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN; }
export function sd(xs: number[]): number { const m = mean(xs); const v = xs.filter((x) => !Number.isNaN(x)); return v.length > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1)) : 0; }
