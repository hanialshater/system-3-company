# Fact-check: paths-by-adding, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Every shortest route into a corner arrives from the corner to its west... | verified | Last move is east or north, disjoint cases, so count = west + south; an edge corner has one predecessor. |
| c5 A city 3 blocks east by 3 blocks north has 4 x 4 corners (the dots); 2... | verified | (3+1)^2 = 16 corners; C(6,3) = 20 in node. |

Result: 2 verified, 0 disputed.
