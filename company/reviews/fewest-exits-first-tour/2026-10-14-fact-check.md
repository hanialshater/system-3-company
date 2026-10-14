# Fact-check: fewest-exits-first-tour (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder algo2-sd). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own knight simulation (scratchpad fc22/kn.mjs, same move order and tie rule, written independently): 5x5 A 21 ends (1,3), B 25 ends (0,2); 8x8 A 36 (28 unvisited), B 64. |
| c2 | verified | Own sim: move 2 legal squares (2,4) (3,3) (3,1) (2,0) (0,4) with onward counts 3,3,3,3,1; A takes (2,4), B takes (0,4). Same as the stage badges (onward() in Demo.tsx). |
| c3 | verified | Own sim: A's unvisited squares (0,2) (0,3) (0,4) (1,4); (0,4) is the bottom-left (row 0 at top); knight at (1,3) has no legal move, and neither knight-neighbour of (0,4), (1,2) and (2,3), is unvisited, so nothing could reach it. |
| c4 | verified | Derivation (explanatory, hedged by c5): B takes the onward-1 corner (0,4) at move 2 (own sim). Accepted as an explanation of the run shown, not a general proof. |
| c5 | verified | Verified independently of the unopened sources: own sim of the lesson's exact rule (fewest onward moves, ties to first in order) fails on 8x8 from (4,2) (60 of 64) and on 6x6 from (3,3) (34 of 36), boards where tours exist. Warnsdorff 1823 and Squirrel & Cull 1996 NOT opened (host blocked; search snippets only say tie-breaking matters and correctness is unproven). Learner text does not name them; builder should cite the counterexample instead. |

**Result:** every claim in this lesson is now verified.
