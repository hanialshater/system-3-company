# Fact-check: a-star-heads-for-goal (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node re-implementation (fc1/astar.mjs) with the Demo.tsx rule (score, then more steps taken, then first added; goal counted when settled): open grid guess 7 settled / route 6 (settle order (0,3)..(6,3)), no guess 31 / route 6. Also 7 and 31 under fewer-steps-first, FIFO and LIFO. Source-text nit (not learner-facing): it says 'three other tie-breaks' but names two. |
| c2 | verified | Same script: wall col 3 rows 2-4, guess 16 / route 10, no guess 46 / route 10 (49 - 3 walls = 46 open). FIFO and fewer-steps-first give 32, LIFO 20, so the 16 is tie-break dependent, as the claim says. Route 10 = 6 across + 2 out + 2 back. |
| c3 | verified | Hart, Nilsson & Raphael, IEEE Trans. SSC 4(2):100-107, July 1968 (DOI 10.1109/TSSC.1968.300136, confirmed by web search): admissible heuristic gives a minimum-cost path. Manhattan on this grid is also consistent, so the stage's no-reopen version is optimal too. |
| c4 | verified | Derivation: each 4-way move changes /dc/ + /dr/ by exactly 1, so any route needs at least /dc/ + /dr/ moves; walls only remove moves. |
| c5 | verified | Derivation: a cell (c,r) has g >= c + /r-3/ and h = (6-c) + /r-3/, so f >= 6 + 2/r-3/: row 3 scores 6, every other cell >= 8. Node settle order is exactly the 7 row-3 cells, numbered 1 to 7 on the stage. |

**Result:** every claim verified or withdrawn.
