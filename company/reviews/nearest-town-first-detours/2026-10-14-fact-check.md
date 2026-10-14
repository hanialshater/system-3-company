# Fact-check: nearest-town-first-detours (2026-10-14)

Board: W-657. Lesson: src/demos/cs/nearest-town-first-detours/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx and model.ts on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

The builder's correction holds. Nearest-first ties with 7 other orders at 56 km: ALL_TOTALS has values {46, 50, 52, 56}, with 8 orders at 46 and 8 at 56.

Reachable paths covered: Nearest-first, Step (1-5 hops, including from the sweep state, which restarts greedy at 1 hop), Out to 8 first, Try all 24, Reset. The greedy milestone fires only on the full 5-hop tour. Static reveal; all three milestones gate it.

Sources opened: google/or-tools ortools/constraint_solver/routing_enums.proto and routing_parameters.proto (GitHub raw, stable branch). Croes (1958) and Johnson and McGeoch (1997) were not opened. c5 rests on OR-tools, and its source field should say so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran nearestFirst() and checked for ties: hops 0->2 (2), 2->-3 (5), -3->8 (11), 8->-15 (23), -15->0 (15) = 56. No step has a tie (2 v 3, 5 v 6, 11 v 12). |
| c2 | verified | outTo8First(): 2 + 6 + 11 + 12 + 15 = 46 (node). |
| c3 | verified | Builder's correction confirmed. ALL_TOTALS over 24 orders takes only the values {46, 50, 52, 56}: 8 orders at 46 and 8 at 56. Nearest-first (2, -3, 8, -15) is one of the 8 at 56, so it ties with 7 other orders, and 'tied for the longest' is right. The lower bound of 2 x (8 + 15) = 46 holds. The predict answer ('about 10 km shorter') is 56 - 46 = 10. |
| c4 | verified | From c1: the first three hops are each the shortest available at the time; the last two (23 across the road, 15 home) pay for the far end skipped earlier. |
| c5 | verified | Verified on a different opened source than the one cited. Google OR-tools (GitHub raw): ortools/constraint_solver/routing_enums.proto calls FirstSolutionStrategy 'used as starting point of local search'. PATH_CHEAPEST_ARC is a nearest-next construction ('connect it to the node which produces the cheapest route segment, then extend the route by iterating on the last node added'). GREEDY_DESCENT 'accepts improving (cost-reducing) local search neighbors', and routing_parameters.proto has use_two_opt. Croes (1958) and Johnson and McGeoch (1997) were not opened. Builder: replace or extend the source field with the OR-tools reference. |

**Result:** verified 5.
