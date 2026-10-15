/**
 * Toy recall model for spaced-beats-cram (v2). Pure and deterministic. Chosen constants, no fit to data,
 * no personal forecast. Both plans do the same thing (three one-hour rereads); only the calendar differs.
 *
 *   - Each one-hour session closes GAIN of the gap to 100%: m <- m + GAIN * (1 - m).
 *   - Between sessions and after the last one, recall fades as hold(dt) = (1 + dt / tau) ^ -DECAY.
 *   - A session that starts after forgetting makes the fade slower: tau <- tau * (1 + BOOST * lost),
 *     where lost = 1 - hold(gap) is the share forgotten since the previous session. A session an hour
 *     after the last one finds almost nothing forgotten, so it barely slows the fade.
 */
export const GAIN = 0.6;
export const TAU0 = 5; // days
export const DECAY = 0.75;
export const BOOST = 6;

/** Session start times in days; day 0 is the last study hour, so "right after" is t = 0. */
export const PLAN_A: readonly number[] = [-2 / 24, -1 / 24, 0];
export const PLAN_B: readonly number[] = [-2, -1, 0];
export const TESTS = { rightAfter: 0, month: 30 } as const;

const hold = (dt: number, tau: number) => Math.pow(1 + dt / tau, -DECAY);

/** Recall (0..1) at day t under the toy model; 0 before the first session. */
export function recallAt(sessions: readonly number[], t: number): number {
  let m = 0, tau = TAU0, last: number | null = null;
  for (const s of sessions) {
    if (s > t) break;
    if (last !== null) { const keep = hold(s - last, tau); m *= keep; tau *= 1 + BOOST * (1 - keep); }
    m += GAIN * (1 - m);
    last = s;
  }
  return last === null ? 0 : m * hold(t - last, tau);
}

export const pct = (v: number) => Math.round(v * 100);
/** Rounded percentages for both plans at day t, as the stage shows them. */
export function both(t: number) {
  return { a: pct(recallAt(PLAN_A, t)), b: pct(recallAt(PLAN_B, t)) };
}
