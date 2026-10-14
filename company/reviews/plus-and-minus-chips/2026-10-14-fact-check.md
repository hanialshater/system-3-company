# Fact-check: plus-and-minus-chips, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 3 plus-chips and 5 minus-chips total -2: three pairs cancel and two mi... | verified | 3 - 5 = -2; Demo.tsx readout shows "?" while canCancel (both kinds > 0), line 121. |
| c3 A negative number is the opposite that cancels a positive one, like a ... | verified | Additive inverse a + (-a) = 0 and a + (-b) = a - b; two-colour counter model is a standard teaching model (Van de Walle et al.). Conventional, correct. |

Result: 2 verified, 0 disputed.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| (all) | unchanged | No open claims. Demo.tsx re-read after the revision: total readout '?' while both kinds remain, reveal quotes the stage's own remaining chips and 3 + (-5) = 3 - 5 = -2; matches verified c1-c3. No status change. |

**Result:** nothing open.
