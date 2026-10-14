# Fact-check: cluster-stops-the-cascade (2026-10-14)

## Pass NCM-1

Checker: fact-checker (session 2, branch ccr-rnd-ncm). I wrote none of these claims. Order: walkthrough transcript and Demo.tsx first, then meta.json sources.

Result: 9 of 9 verified (c1-c9). 0 disputed, 0 withdrawn.

Re-run (my own node script, copying EDGES, NB and simulate() from Demo.tsx exactly: synchronous, join when 2k >= degree, adopters stay):
- Start 0,1: rounds [[0,1],[2],[3],[4],[5],[6],[7]], last = 6, 8 adopted, holdouts 8, 9, 10, 11 (c2). Pills at the final: 8 1/4, 9 0/3, 10 0/3, 11 0/3 (c4). Inside counts 8 3/4, others 3/3 (c5).
- Start 8,9: rounds [[8,9],[7,10,11],[6],[5],[4],[3],[2],[1],[0]], last = 8, 12 adopted (c3).
- 14 edges (c8). Outline rect (140..268, 156..284) encloses exactly nodes 8-11; node 7 (170,118) is outside.
- Cluster theorem on this graph (c7): for every seed set of every size (all 4,095), "incomplete" equals "the non-seeds contain a non-empty set whose every member has more than half its friends inside it" (max such set found by peeling): 0 contradictions. Sizes 1-3: 298 sets, 132 incomplete, matches the builder.

Stage and reveal vs claims: predict answer "8" = c2; reveal paragraph 1 = c2/c4 (or the c5 fallback)/c3; paragraph 2 = c6/c5; muted line = c7; recall = c9. The stage does not make a different claim from the text: the round numbers shown match c2/c3, and the pill shows adopted/friends as in c4.

Sources:
- c1, c7: E&K ch. 19 threshold model (adopt when fraction of A-neighbours >= q) and the clusters theorem: "If the remaining network contains a cluster of density greater than 1 - q, the initial adopters will not cause a complete cascade; whenever they do not, the remaining network must contain such a cluster", cluster of density p = every member has at least a p fraction of its neighbours in the set. Statement confirmed via search-quoted lecture notes built on E&K (Edinburgh STN cascades slides, Cambridge L109 lecture 7, EPFL CSM lecture 3); the book PDF (cs.cornell.edu and the CUHK mirror) is blocked by the proxy (403). For q = 1/2, "density greater than 1/2" = each member has more than half its friends inside, as the lesson says. "Stops exactly at such a group" holds because the final holdout set is itself such a cluster (each holdout has fewer than q adopted friends). Synchronous rounds affect only the round numbers, not the final set (monotone threshold rule); c1 states the convention. Section numbers stay in section_unconfirmed (my recollection is 19.2 Modeling Diffusion, 19.3 Cascades and Clusters, unconfirmed against the PDF).
- c5, c6, c9: derivations re-done; correct (with no member adopted, a member's adopted friends are all outside, at most 1/4 or 0/3 < 1/2).

Non-blocking note: none.

Confidence: high on c2-c6, c8, c9 (deterministic re-run); medium-high on c1/c7 wording-level match to E&K (theorem confirmed through secondary teaching sources only).
