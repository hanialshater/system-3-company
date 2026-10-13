# Fact-check: wave-from-the-corner (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: the stage's BFS gives distance 8 to the opposite corner on the open 5 x 5 grid. |
| c2 | Verified, and re-tested beyond the cited theorem: the stage's BFS agrees with an independent Bellman-Ford style relaxation on 1,000 random wall layouts (0 mismatches, cells walled off stay unlabelled, as the claim says 'reachable'). |
| c3 | Verified: each cell is dequeued at most once (max 25 dequeues over 1,000 layouts on 25 cells), so every cell is labelled once and no route is enumerated. |
| c4 | Verified: C(8,4) = 70; a depth-first count and a BFS-DAG path count both give 70. |

Reveal wording 'far more with detours' and 'walls only bend the wave; the labels stay true distances' are consistent with the above. Wave is deterministic; the 1,000 layouts used a fixed LCG (seed 7) only to test the algorithm. No unrecorded claims.
