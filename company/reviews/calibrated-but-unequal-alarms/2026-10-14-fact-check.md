# Fact-check: calibrated-but-unequal-alarms

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own port of reoffends(): ringed reoffenders 4/5, 16/20, 28/35, 40/50 and others 19/95, 16/80, 13/65, 10/50 at B = 5, 20, 35, 50 (A = 50): exactly 80% and 20% at every slider value. Nit, non-blocking: the quoted string '8 in 10 ringed dots reoffended, in A and in B' is not the stage message; the stage says '80% of ringed, 20% of the rest reoffend, in A and B.' and the reveal says 'in A and in B, 8 in 10 ringed dots reoffended'. |
| c2 | verified | Own: A false alarms 10/50 = 20%, misses 10/50 = 20%; B at 20: 4/68 = 5.9% (shown 6%), misses 16/32 = 50%; B at 5: 1/77, 19/23; at 35: 7/59, 13/41. |
| c3 | verified | Own sweep: B false alarms 1.3/5.9/11.9/20.0%, misses 82.6/50.0/31.7/20.0%; reoffenders in B 23/32/41/50; both errors equal A's only at 50 ringed (base rate 50%). Reveal at h = 50 quotes the 20-ringed case; at other h it quotes that h. |
| c4 | verified | Rests on own derivation, not on Kleinberg-Mullainathan-Raghavan 2017 or Chouldechova 2017 (not opened, web blocked). With the lesson's sense of calibration (PPV = a and the low-group rate b equal across groups) and flagged share f: p = af + b(1-f), FNR = b(1-f)/p, FPR = (1-a)f/(1-p). FNR is strictly decreasing in f when a, b > 0 and FPR strictly increasing when a < 1, so equal errors force equal f, hence equal p, unless the score is perfect (a = 1 and b = 0). Chouldechova's identity FPR = p/(1-p)(1-PPV)/PPV(1-FNR) also follows from the definitions; toy check A 0.2, B 0.0588. |
| c5 | verified | Stage tag 'Toy groups of 100'; reoffends() is the fixed pattern (i + row) % 5, deterministic, no seed. How-chosen note true. |

**Result:** 5 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
