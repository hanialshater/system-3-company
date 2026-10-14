# Fact-check: maze-depth-first (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Hand trace of dfsSteps with sorted neighbours: S-A-B (dead end, back to A)-C-D-G, 4 links; BFS gives S-E-G, 2 links. Stage message adds 'B was a dead end.' on the maze. |
| c5 | verified | CLRS 3e 22.2, Theorem 22.5 (4e: 20.2, Theorem 20.5): BFS computes shortest-path distances in unweighted graphs. |

**Result:** all claims in this pass verified; no disputes.
