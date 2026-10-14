# Build note: skip-the-edge-that-loops

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #50 (no spec; single card).

- Brief numbers held in node (scratchpad algo2b0/check.mjs, check2.mjs): built AC, BC, DE, BD, total 11; enumerating all spanning trees of the 8 roads gives minimum 11, unique.
- Planar layout: A inside triangle B, C, D, so no roads cross. Towns are coloured by union-find group (alphabetically first town names the group), so "same colour = already connected" is visible before each test.
- Controls in QA order: "Test <next road>", "Test the rest", "Start over". Milestones `first-skip` (A-B 4 tested) and `all-tested`; minInteractions 2. QA path: one test, then the rest reaches both.
- Not run here: next build, typecheck, QA, walkthrough (shared machine; integrated build after merge). Syntax-only transpile passed.
- All 5 claims `unverified`.
