# Fact-check: random-dots-cluster, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 | verified | model.ts batch(): two mulberry32 [0,1) draws per dot, independent; counts use raw positions. Display nudge clamps within the same cell (c from floor(u*10)), so the drawn square matches the counted square. |
| c5 | disputed | On the stage "evenly spread" = no ringed square, which happens 44.5% of the time (own exact BigInt count; 1 - 0.5550). That is not "the unusual outcome". No square with 2+ dots is unusual: 0.011%. Claim 2 only shows lumps are slightly more common than not. |

Disputes: c5. Fix (demo-builder, claim + reveal): "A scatter with no lump is about as common as one with a lump, so a lump on its own is weak evidence..." or quote that no square holding two dots happens about 1 time in 9,000.

Result: 1 verified, 1 disputed, 0 withdrawn.
