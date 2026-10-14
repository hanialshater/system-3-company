# Fact-check: clay-boat, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 The stage draws to scale four open cylindrical cups of 1 kg of clay wi... | verified | Own node from Demo.tsx cup(): D = 11.93/14.71/17.89/21.29 cm, H = 7.16/7.36/7.16/7.02 cm; drafts 8.95 (> 7.16 tall: sinks), 5.88, 3.98, 2.81 cm; clay 1 kg / 1800 kg/m^3 = 0.556 L. |

Result: 1 verified, 0 disputed.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own node copy of cup(): D = 11.93/14.71/17.89/21.29 cm, H = 7.16/7.36/7.16/7.02 cm, clay 555.6 cm^3 each; drafts 1000/(pi D^2/4) = 8.95 (but hull 0.80 L < 1 L, sinks), 5.88, 3.98, 2.81 cm, each below its height. 'Tried' line uses pushed(): 0.56 L for ball/small cup, 1.00 L for floaters. |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
