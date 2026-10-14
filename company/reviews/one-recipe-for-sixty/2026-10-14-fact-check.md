# Fact-check: one-recipe-for-sixty, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 84 = 2 x 2 x 3 x 7, whichever first split you choose (2 x 42, 3 x 28, ... | verified | Own node run of Demo.tsx grow() for all five 84 starts (2x42, 3x28, 4x21, 6x14, 7x12): sorted leaves 2,2,3,7 each time. |
| c5 A prime is a number that cannot be split into smaller whole factors, l... | disputed | As worded the definition also admits 1 (1 cannot be split into smaller whole factors) and 1 is not prime; the source itself says "a whole number above 1". Fix (builder): "a whole number above 1 that cannot be split into smaller whole factors, like 2, 3, 5 and 7" in the claim and in the predict text/opening caption. Re-check after the fix. |
| c6 You started 60 as the splits you chose; different starts grow differen... | verified | Own node run of grow() for all five 60 starts: sorted leaves 2,2,3,5 each time; shelf sorts leaves (line 188); reveal quotes tried. |

Result: 2 verified, 1 disputed.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Standard definition (integer > 1 whose only positive divisors are 1 and itself; Hardy and Wright, An Introduction to the Theory of Numbers, 1.2). 'Cannot be split into smaller whole factors' is equivalent. Predict text matches. Non-blocking: the opening caption (Demo.tsx ~line 176) says 'no smaller factors', which read literally excludes 1; builder may reuse the claim's wording. |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
