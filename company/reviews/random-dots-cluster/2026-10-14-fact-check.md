# Fact-check: random-dots-cluster, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 | verified | model.ts batch(): two mulberry32 [0,1) draws per dot, independent; counts use raw positions. Display nudge clamps within the same cell (c from floor(u*10)), so the drawn square matches the counted square. |
| c5 | disputed | On the stage "evenly spread" = no ringed square, which happens 44.5% of the time (own exact BigInt count; 1 - 0.5550). That is not "the unusual outcome". No square with 2+ dots is unusual: 0.011%. Claim 2 only shows lumps are slightly more common than not. |

Disputes: c5. Fix (demo-builder, claim + reveal): "A scatter with no lump is about as common as one with a lump, so a lump on its own is weak evidence..." or quote that no square holding two dots happens about 1 time in 9,000.

Result: 1 verified, 1 disputed, 0 withdrawn.

## Pass 20

Checker: fact-checker (did not write these claims). Re-check of the builder rewording: claim read against Demo.tsx (stage text and reveal), numbers re-run in own node scripts, Demo.tsx parsed with the TypeScript parser (no syntax errors). No build run.

| Claim | Result | Basis |
|---|---|---|
| c5 | verified | Own BigInt count of 40 dots in 100 cells with no cell >= 3: P = 0.44497, so 44.5% (crowded 55.5%). Reveal lines 92-94 compute (1 - EXACT) and say 'about as common', 'ordinary part of random scatter', 'weak evidence', matching the claim. |
