# Build note: four-in-a-row-two-thirds

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #15 (NCM)

- Intent: the line A–B–C–D, a split bar under each deal with the fallback part hatched, and a strip of B's share by round with 2/3 ghosted. The B–C link is dashed and labelled "fallback". It is the cause the brief asks the stage to show: each inner person's outside option feeds the other's.
- Rule on the card: each round, every pair covers both fallbacks, then halves the rest. Round 0 has no fallbacks (50/50). B's fallback = 1 − C's share. Iteration: 0.5, 0.75, 0.625, 0.6875, 0.6563 … within $0.001 of 2/3 at round 9. I re-ran it in node, and Demo.tsx computes it.
- Round-by-round updating is a teaching device for the fixed point and is labelled a model. The balanced outcome itself is the fixed point; claim c2's source says so.
- Milestones: "stepped" (Next round, first in DOM) and "settled" (Run until settled, second). Reset is disabled at round 0, so pressing it always changes something.
- Kept out of learner text: brief claim 3 (laboratory results on 4-paths), which is flagged for a human source check.
- The reveal quotes the iteration values the learner saw. The 3-path comparison is one claimed sentence (c4).
- Not run (per dispatch): next build, QA, walkthrough, tsc. Typecheck and QA are still owed before review.
