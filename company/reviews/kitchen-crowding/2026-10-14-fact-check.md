# Fact-check: kitchen-crowding (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node over adds(k) = max(0, 10 - 2(k - 1)): 10 + 8 + 6 + 4 = 28 vs 4 x 10 = 40. v2 question no longer states the decrement, but the claim is conditional and the reveal states "each added worker adds 2 fewer"; stage outline reads 4 x 10 = 40. |
| c2 | verified | Running totals 10, 18, 24, 28, 30, 30, 30, 30: peak 30 at 5; worker 6 on adds 0. Reveal gated on milestone tops-out (n > 5), so the learner sees "Worker 6 adds nothing." |

**Result:** all open claims verified; lesson has no unverified or disputed claims.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | Numbers verified (own node: adds 10, 8, 6, 4, 2, 0, 0, 0; totals peak 30 at 5; reveal gated on n > 5). DISPUTED on the parenthetical: Demo look() overwrites seen.zero on every one-oven visit past 5, so the reveal names the latest such worker set, not the highest (set 8 then 6: reveal says 6). The learner sentence stays true (6, 7 and 8 all add nothing); the claim text is wrong. Fix (builder): 'the most recent such worker' in the claim text, or keep the max in code. |
| c4 | verified | Model disclosed on the stage chip 'Model: made-up numbers' and the reveal's muted last line; adds() is 10 - 2(k - 1) floored at 0, the oven is the only fixed input in the model. |
| c5 | disputed | Formula and sums verified (own node: two-oven adds 10, 10, 8, 8, 6, 6, 4, 4; totals 36 at 4, 52 at 7, 56 at 8). DISPUTED: the reveal quotes the last two-oven state, and the learner can reach 1 worker with two ovens (Remove one down to 1, then Add a second oven), giving '1 workers made 10: fewer cooks per oven, so each added more.' With one worker the second oven adds nothing (10 either way), so the sentence is false there (and '1 workers'). Fix (builder): quote the second-oven sentence only when totalOf(n, 2) > totalOf(n, 1) (n >= 2), or quote the n >= 2 state. |

**Result:** 2 disputed; the lesson cannot publish until the builder fixes and the claim is re-checked.
