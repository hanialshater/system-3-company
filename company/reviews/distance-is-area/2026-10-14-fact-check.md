# Fact-check: distance-is-area, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c2 Strips using the speed at the end of each slice give 200 m with 1 stri... | verified | Own node right sums for v = 2t on [0,10]: n=1 200, n=10 110, n=20 105 = 100(n+1)/n > 100; rightSum in Demo.tsx is the same function; reveal quotes seen.lo and seen.hi. |
| c4 Each strip is speed times a short time, which is metres: a small dista... | verified | Units m/s x s = m; reveal text lines 54-55 match. |

Result: 2 verified, 0 disputed.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node right sums for v = 2t, T = 10: 200, 133.33, 110, 105 (= 100(n+1)/n), all above 100 and decreasing. Slider COUNTS = [1, 3, 10, 20]; reveal and 'Tried' line list only seen counts; m() rounds 133.33 to 133.3. |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
