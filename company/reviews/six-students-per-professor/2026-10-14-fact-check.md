# Fact-check: six-students-per-professor

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own: P = 2, S = 12: S = 6P '12 = 12' true, 6S = P '72 = 2' false, 6S = 6P '72 = 12' false; P = 4, S = 24: 24 = 24, 144 = 4, 144 = 24. EQS show() prints those sides; S = k x p. |
| c2 | verified | Definition 'a times as many X as Y' -> X = aY. At k = 6 the stage gives S = 6P for P = 1..5; milestone resize needs two P values at k = 6. |
| c3 | verified | 6S = P with S > 0 gives P/S = 6. |
| c4 | verified | Convention; the reveal's 'Multiply the smaller group by 6 to get the bigger one' matches S = 6P with P < S for P >= 1. |
| c5 | verified | S = kP = 6P only if k = 6; at k = 4, P = 2: '8 = 12', false. The k != 6 reveal branch prints the current values; 'at six per professor it was the only true one' holds (36P != 6P, 36P != P). |

**Result:** 5 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
