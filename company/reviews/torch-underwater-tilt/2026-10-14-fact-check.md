# Fact-check: torch-underwater-tilt (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | asin(1/1.333) = 48.607°, shown as 48.6°. At that stop snell() returns 90 and fresnel() returns 1; beyond it snell() returns null. OpenStax 2e 25.4 not reachable (DNS blocked); the number rests on Snell's law. |
| c3 | verified | Own asin(1.333 sin a): 30 → 41.80, 45 → 70.49, 47 → 77.13, 48 → 82.14. |
| c4 | verified | Own Fresnel rs, rp (formulae re-derived: rs = ((n1 cos i - n2 cos t)/(n1 cos i + n2 cos t))², rp = ((n2 cos i - n1 cos t)/(n2 cos i + n1 cos t))², n1 = 1.333, n2 = 1): 0° 0.0204, 45° 0.1395, 47° 0.2614, 48° 0.4331, critical 1. Hecht not opened. |

**Result:** 3 verified, 0 disputed, 0 withdrawn.
