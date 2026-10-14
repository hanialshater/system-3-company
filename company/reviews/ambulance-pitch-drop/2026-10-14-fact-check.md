# Fact-check: ambulance-pitch-drop, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c8 Each ring is where the sound sent out 0.1 s earlier has reached. Hz = ... | disputed | Stage does not match the claim's fix note. Demo.tsx draws 6 rings with tau = 0.1, 0.2 ... 0.6 s (lines 96-99), but the locked caption (line 94) still reads "Each ring is where sound sent 0.1 s earlier has reached": true only of the innermost ring. The pass-4 "builder fix" (1.4 ms, every 70th crest) is not in the caption, and caption plus reveal ("Each crest leaves from a spot...", "the rings were 31.8 m apart") still read rings as crests; header comment line 13 also says the caption defines ring = crest. Fix (builder): e.g. "Rings mark sound sent 0.1, 0.2 ... 0.6 s ago. A real 700 Hz siren sends 70 crests between rings. Hz = crests per second." Re-check after the fix. |

Result: 0 verified, 1 disputed.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Own node: 343 x 0.1 = 34.3; 318 x 0.1 = 31.8; 368 x 0.1 = 36.8. Demo.tsx rings: centre x - V tau, radius C tau, so the front edges are (C - V) x 0.1 apart and the rear edges (C + V) x 0.1; gap labels compute the same. Frequency = crests per second (SI hertz). |
| c8 | verified | Demo.tsx rings tau = 0.1 ... 0.6 s, radius 343 tau, centred at the emission point. 700 Hz x 0.1 s = 70 cycles between rings. Hz = s^-1, cycles per second (SI Brochure, 9th ed., Table 4). |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
