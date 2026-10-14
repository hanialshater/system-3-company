# Build note: one-road-cuts-the-map

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #76 (single card).

- Brief numbers held in node: removing each edge and flood-filling from town 1, only 3-4 leaves 3 of 6 towns reachable.
- Seven road buttons (one closed at a time; closing another reopens the previous) plus "Reopen all". Each button gains a tick or cross once tested. Towns reachable from 1 are domain-coloured, cut-off towns red.
- The reveal answers the "busiest town" misconception with the degree of towns 3 and 4 (three roads each), claim c2.
- Milestones `first-test`, `all-tested`; QA's one-press-each over the 7 road buttons reaches both.
- Not run here: build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 5 claims `unverified`.
