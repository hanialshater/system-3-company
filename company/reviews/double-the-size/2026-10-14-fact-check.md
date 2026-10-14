# Fact-check: double-the-size, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 A circle fills the same share of the square around it at any size, so ... | verified | pi r^2 / (2r)^2 = pi/4 for all r. |
| c4 Scaling every length by k multiplies the area by k^2: 3 times as wide ... | verified | Dilation by k scales area by k^2 (Euclid VI.19-20, XII.2): 3 -> 9, 4 -> 16. |

Result: 2 verified, 0 disputed.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| (all) | unchanged | No open claims. Demo.tsx changed after pass 11 (new 'Seen:' line, reveal 'Slide to 18 and 24 inches to see 9 and 16 boxes'); re-read against c1-c4: 18 in = 3 x 3 = 9 boxes, 24 in = 16; all still match. No status change. |

**Result:** nothing open.
