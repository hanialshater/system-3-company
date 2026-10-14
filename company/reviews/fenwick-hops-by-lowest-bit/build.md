# Build note: fenwick-hops-by-lowest-bit

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. The classic Fenwick picture: 16 numbers (digits of pi) in a row. Each cell i is a bar over the positions it covers, raised by log2(lowbit). "Read cell i, hop down" fills that bar and the numbers it covers; "Hop to 0" finishes the run. Chips: Sum 1-13 / 1-15 / 1-7. "Change position 1: hop up" outlines cells 1, 2, 4, 8, 16, one per press, and cycles. Milestones: one-hop, tiled (reached 0 from 13).

## Answers re-run in node
- 13 -> 12 -> 8 (ranges 13, 9-12, 1-8), cells 9 + 21 + 31 = 61 = sum of the first 13. 15 reads 4 cells; 7 reads 3. Update from 1: 1, 2, 4, 8, 16. Recall: 22 reads 22, 20, 16.

## Known gaps
- The cell numbers sit at the right end of each bar in 9 px text, which may be small on a phone.
- The Fenwick 1994 citation comes from the brief and has not been opened. All claims are unverified.
