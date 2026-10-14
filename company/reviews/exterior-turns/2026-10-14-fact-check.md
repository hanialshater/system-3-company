# Fact-check: exterior-turns, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 In a lopsided shape that only bulges outward the turns are unequal, bu... | verified | Own node run of vertices(n, lop=true) and the Demo turn computation for n = 3..12: every turn positive, turns unequal, sum 360.000000 each time. Turn = half of the two adjacent arcs (inscribed angle). |

Result: 1 verified, 0 disputed.
