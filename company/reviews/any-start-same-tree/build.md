# Build note: any-start-same-tree

Builder: algo-pair-06 · 2026-10-14 · from brief #30 and spec `company/design/specs/any-start-same-tree.md`.

- Brief problem and fix: the spec flagged that BC = DE = 2 made the "distinct costs" claim false. The coordinator then changed the brief to DE = 3. Built with DE 3 (the spec body still shows the old numbers: total 10 becomes 11, next-best tree 12). Re-run in node (scratchpad prim.mjs): Prim from A, B, C, D, E gives total 11 each, no tie at any step; 40 spanning trees, costs 11 once and 12 once. Claim 3 now states the checked count and cites distinct costs (CLRS ex. 23.1-6).
- Side-by-side panels (you from A, friend from E), dashed cut cables are the real candidate list, order badges on added cables, refusals with a named reason. 8 cable chips in the question's order (not sorted by cost), then friend-start chips B C D E. Nothing jumps to the finished tree.
- Milestones: `both-complete` (4th cable accepted) and `another-start` (friend chip pressed after completion); `minInteractions=2`. QA path: AB refused, AC, BC, BD, CD refused, CE refused, DE accepted, BE disabled, then B, C, D.
- Reveal quotes the learner's own cable order and only the friend starts they saw completed. "Same 4 cables" shows only when both are complete and the sets match.
- Wireframe positions kept; cost label of CD and BE nudged along the cable so they do not collide (check at 390 px).
- Ideas from TheAlgorithms/Python minimum_spanning_tree_prims.py used only for how Prim works; no code copied.
- All 4 claims `unverified`.
