# Fact-check: groups-where-everyone-reaches-everyone (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node brute force (fc21b/scc.mjs): mutual reachability groups [1,2,3], [4,5,6], [7]. |
| c2 | verified | Own DFS (towns in order, out-roads ascending): discovery 1..6 at 1..6, finish 6,5,4,3,2,1 at 7..12, town 7 at 13/14. Finish order 6,5,4,3,2,1,7. |
| c3 | verified | Own pass 2 on reversed roads in decreasing finish order: starts 7, 1, 4; groups [7], [1,2,3], [4,5,6]; only reversed roads leaving a group are 4->3 and 6->7, both into already coloured towns. Kosaraju's method in CLRS 4e sec. 20.5 (chapter placement from memory; not opened); the sentence rests on the computation. |
| c4 | verified | Own check: undirected search from 1 reaches all 7; reach(4) = {4,5,6}; no road ends at 7. |
| c5 | verified | Own check: inter-group roads are 3->4 and 7->6, so the shrunk graph is {1,2,3} -> {4,5,6} <- 7, acyclic. General fact re-derived: a cycle among components would make them mutually reachable, i.e. one component. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.
