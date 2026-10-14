# Fact-check: bridge-parity, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 Bridge 7 closed: only 2 places are odd, so a walk can start at one and... | verified | From Demo.tsx BRIDGES with index 6 (S-E) closed: N 3, I 5, S 2, E 2, so 2 odd. Walk N-I-N-E-I-S-I uses bridges 1-6 once each, starts and ends at the odd places. Caption text matches line 202. |
| c5 On the full seven-bridge map the counts are 5, 3, 3, 3: 4 odd places, ... | verified | Full map degrees from BRIDGES: I 5, N 3, S 3, E 3; reveal prints counts7 sorted descending = 5, 3, 3, 3 and odd7.length = 4. |
| c6 Rings mark places you passed through: 2 bridges each, in and out. Odd ... | verified | walkVisits pushes each arrival except the last stop (and not the start), so every ringed place used one bridge in and one out on that pass. Parity argument as c3. |

Result: 3 verified, 0 disputed.
