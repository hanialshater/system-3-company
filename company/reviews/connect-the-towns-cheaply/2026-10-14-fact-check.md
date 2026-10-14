# Fact-check: connect-the-towns-cheaply (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node brute force over all 20 three-cable sets: min 6, achieved by AB+BC+CD and also AB+AC+CD (BC and AC tie at 2). The value 6 is right; '(AB, BC, CD)' is one of two cheapest networks. |
| c2 | verified | True in list order (BC listed and tapped before AC): AC then joins A and C already joined via B; with AB, BC, CD laid, B-D and A-D are joined, so BD and AD close loops. Note: the stage accepts a tap on AC before BC (same cost, check is cost > cheapest), and then BC is the one refused; the stage text is dynamic and stays correct either way. |
| c3 | verified | Spanning tree on 4 towns has 3 edges; three cheapest AB 1, BC 2, AC 2 = 5 form triangle A-B-C, D isolated; node min over connected sets = 6. |
| c5 | verified | A refused cable joins towns already joined, so dropping it never changes which towns are connected; Kruskal optimality by the cut property (CLRS 3rd ed. 23.1, Thm 23.1; not opened). Housekeeping: Demo.tsx header comment still lists old costs (CD 1, min 4); not learner-facing. |

**Result:** all claims in this pass verified.
