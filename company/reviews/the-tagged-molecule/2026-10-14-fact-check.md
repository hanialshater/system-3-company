# Fact-check: the-tagged-molecule, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c2 | verified | Own re-run of step() (tm.mjs), seeds 77/31337, 1,000 ticks: every tick exactly 12 A->B and 12 B->A, counts 50/50; molecule 44 flipped on 23.4% of ticks (expected 24%). Caption prints aToB/bToA; bars labelled "A n", "B n". After x5 the caption shows the last tick only. |

Disputes: none.

Result: 1 verified, 0 disputed, 0 withdrawn.
