# Fact-check: distance-is-area, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c2 Strips using the speed at the end of each slice give 200 m with 1 stri... | verified | Own node right sums for v = 2t on [0,10]: n=1 200, n=10 110, n=20 105 = 100(n+1)/n > 100; rightSum in Demo.tsx is the same function; reveal quotes seen.lo and seen.hi. |
| c4 Each strip is speed times a short time, which is metres: a small dista... | verified | Units m/s x s = m; reveal text lines 54-55 match. |

Result: 2 verified, 0 disputed.
