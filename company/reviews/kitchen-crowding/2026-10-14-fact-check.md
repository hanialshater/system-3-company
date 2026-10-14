# Fact-check: kitchen-crowding (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node over adds(k) = max(0, 10 - 2(k - 1)): 10 + 8 + 6 + 4 = 28 vs 4 x 10 = 40. v2 question no longer states the decrement, but the claim is conditional and the reveal states "each added worker adds 2 fewer"; stage outline reads 4 x 10 = 40. |
| c2 | verified | Running totals 10, 18, 24, 28, 30, 30, 30, 30: peak 30 at 5; worker 6 on adds 0. Reveal gated on milestone tops-out (n > 5), so the learner sees "Worker 6 adds nothing." |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
