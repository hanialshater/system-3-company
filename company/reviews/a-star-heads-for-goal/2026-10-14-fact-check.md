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


## Pass 30 (2026-10-14, W-276)

Checker: fact-checker. I did not write or build these claims. Scope: claims reopened by the W-265/W-267 phone-fit trims (meta.json v5). Method: read Demo.tsx on every reachable path (predict, explore controls, steps back, Reset where one exists, prefers-reduced-motion branch, reveal gates) and checked that each value the reveal names is on the stage when it opens; re-ran the numbers in my own node scripts (session scratchpad fact-checker-w276/). No source was opened (web fetch: DNS failure; proxy 403), so no verdict below rests on a cited text.

Paths read: Settle next, Settle to goal, Wall toggle, No guess, With guess, restart mid-run vs at goal (replay), wall-first path (c1 dispute), reduced motion (replay fills the table at once). No Reset control. Non-blocking for W-278/qa: the reveal on the path that fills all four table cells is 94 words (node count), over the 90 budget; Pre-flight v5 quotes 89 for the QA path only.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | disputed | Numbers hold (own independent A*, fact-checker-w276/astar.mjs): open guess 7 / route 6, no guess 31 / route 6; tie rule matches the stage line "Ties: more steps taken first." DISPUTED on a stage path: milestone guided-at-goal fires on ANY guided finish, including the wall run. Path: Wall: off -> Settle to goal (guided wall) -> No guess (replays no-guess wall) reaches all 3 milestones with the open grid never run, so the reveal verdict "it was 7" / "Your prediction held" answers a case the stage never showed, and Pre-flight v5 item 4 is wrong to call open grid 7 gated (b). Demo-standard: the question own case is a milestone. Fix (builder): reach guided-at-goal only when mode is guess and the wall is off. |
| c2 | verified | Own A*: wall col 3 rows 2-4, guess 16 / route 10, no guess 46 / route 10 (49 - 3 open); BFS shortest 10; FIFO gives 32. Reveal wall line needs both wall runs (milestone wall-both) and reads the table cells "16 cells - route 10", "46 cells - route 10". Reduced motion fills the same table. |
| c3 | verified | Rests on own derivation and simulation, not on Hart, Nilsson & Raphael 1968 (not opened; web blocked): Manhattan is admissible and consistent on a 4-way unit grid, so the closed-set search in Demo.tsx (no reopening) settles each cell at its minimal steps; own runs give guided = flood length on open (6) and wall (10). Note: the general sentence "never too high" alone suffices for A* that may reopen cells; this stage does not reopen, and is still optimal because its guess is consistent. Support could be derivation. |
| c6 | verified | GUESS_AT_S = /0-6/ + /3-3/ = 6; BFS with the wall 10. Line under the table "Guess at S: 6. Real route with the wall: 10." once the guided wall run is filled (wall-both guarantees it), "?" before; reveal "the wall route took 10" reads the same value. Legend "Numbers: settle order. Dashed: waiting to settle." matches num() and isFrontier. |

**Result:** 3 verified, 1 disputed, 0 held (unverified), 0 withdrawn.


## Pass 33 (2026-10-14, W-283 + W-286)

Checker: fact-checker. I did not write or build these claims. Scope: c1 and c3, reopened by the W-282 fix (meta.json v6). Method: I read Demo.tsx v6 on every reachable path before the builder's notes. The paths: guided open first (the QA path), wall first (the pass 30 failure: Wall on, then Settle to goal, then No guess), restart mid-run vs at goal (replay), Settle next by hand to the goal, and reduced motion. There is no Reset. I re-ran the numbers in my own node scripts, not imported from Demo.tsx (session scratchpad fact-checker-w283/check.mjs and c3rand.mjs). Hart, Nilsson & Raphael was not opened, so no verdict rests on it.

Reveal word count (own node count, the reveal() text): the reveal needs guided-at-goal (guess, open) and wall-both (both wall runs), so the only open-grid state left free is the optional no-guess open run. Without that run it is 79 words, with it 84 words. Adding the kit verdict line ("Your prediction held." or "Not quite: it was "7".") gives at most 88. That is at most 90 on every path.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own A*: open grid, guess 7 settled / route 6; no guess 31 / route 6; BFS open 6. Pass 30 path closed: finish() reaches guided-at-goal only when mode is guess and the wall is off. On the wall-first path the guided wall run and the no-guess wall run give plain-at-goal and wall-both but not guided-at-goal, so the reveal stays locked until the open guided run fills its cell ("7 cells · route 6"). So the verdict on the predict answer "7" always follows a run that showed 7. The no-guess 31 shows only if that optional run is made, and the reveal quotes it only then. The tie rule on the stage line matches search(). |
| c3 | verified | Rests on derivation (support is now derivation). Manhattan is admissible and consistent on a 4-way unit grid, so the closed-set search with no reopening settles each cell at its minimum steps. Own runs: guided = flood on open (6) and with the wall (10). Over 15,348 solvable random layouts with 30% walls there were 0 mismatches. After the W-277 cut, the learner sees "The guess can be too low, never too high, so it never makes a shorter route look worse." plus "both routes N steps" where both runs exist (always with the wall). Non-blocking, for the builder: the claim text says the match shows "on the open grid and with the wall", but the open-grid match shows only on the optional no-guess open path. The claim is true but broader than what the stage always shows. Narrowing it is the builder's call, and it does not change this verdict. |

**Result:** 2 verified, 0 disputed, 0 held (unverified), 0 withdrawn. All six claims are now verified.
