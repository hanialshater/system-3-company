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

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node port of search() (fc22-5/astar.mjs): open grid guess route 6 = no-guess 6; wall guess route 10 = no-guess 10 (BFS shortest 10). Own derivation: Manhattan is admissible and consistent on a 4-way unit grid, so the first time a cell is settled its steps are minimal; checked on 20,000 random wall layouts (30% walls), guided route length = flood length in every case. Hart, Nilsson & Raphael 1968 not opened (all PDF mirrors unreachable); citation details (IEEE TSSC 4(2):100-107) corroborated by web search only. The learner-visible sentence rests on the derivation, not the unopened paper. |
| c6 | verified | GUESS_AT_S = /0-6/ + /3-3/ = 6; own BFS with the wall gives 10. Stage line 'Guess at S: 6. Route: 10.' Legend 'Numbers: settle order. Dashed: waiting to settle.' matches num() = settleIdx+1 and isFrontier (joined frontier at disc <= k, not yet settled). |

**Result:** every claim in this pass verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I opened the builder's pre-flight only for count-the-out-of-order-pairs and each-element-pops-once, and only after reading the code. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | GUESS_AT_S = 6; own BFS with the wall at column 3, rows 2-4 gives 10. The line under the table 'Guess at S: 6. Real route with the wall: 10.' appears once the guided wall run is filled ('?' before). num() = settleIdx + 1. isFrontier = discovered at settled-count <= k and not yet settled, which matches 'Dashed: waiting to settle'. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
