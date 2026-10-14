# Fact-check: no-fraction-fits, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 When a square is off from 2 x q^2 by exactly 1, the square is odd and ... | verified | 2q^2 is even; /p^2 - 2q^2/ = 1 makes p^2 odd. Own node: off-by-1 cases for q <= 100 are exactly q = 1, 2, 5, 12, 29, 70 (Pell). Caption line 121 matches. |
| c6 If p/q = sqrt(2), squaring both sides gives p^2 = 2 x q^2. | verified | (p/q)^2 = 2, times q^2: p^2 = 2q^2. The multiply step is implicit in "gives"; acceptable. |

Result: 2 verified, 0 disputed.
