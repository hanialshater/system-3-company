# Build note: random-surfer-finds-the-rank

Builder: ncm-c · 2026-10-14 · from brief cs.algorithms, Course NCM #1 (simulation run), accepted version.

- Graph A->B, B->C, C->A, D->C, E->C; each click jumps to a uniform page (any of 5) with probability 0.15, else follows the one link. Seeded mulberry32 seed 146, two draws per click (jump test, jump target), start on A, count the page reached. Totals after n clicks do not depend on which buttons got there.
- My own run (node mirror, scratchpad ncmc/check.mjs): 100,000 clicks gives A 31,211, B 29,645, C 33,220, D 2,948, E 2,976 (A 0.3121, C 0.3322). Power iteration: A 0.3123, B 0.2955, C 0.3322, D = E = 0.0300. All within 0.005, as the brief requires. Seed 146 was the first tried (the brief author's number), not picked; seeds 7, 2026, 14 agree to 0.001.
- Controls: 1 click (note says jumped or followed, current page ringed), +1,000 clicks, Run to 100,000, Reset. Each page shows its share and a bar; readouts show A and C.
- Milestones `first-clicks`, `long-run` (100,000 reached). The reveal quotes the 100,000-click state (the seeded run the learner reached), so a Reset afterwards cannot make it quote zero.
- The why on stage: in-link counts are printed on each page, and C's only arrow goes to A, so the learner can see where A's visits come from; the reveal points at it (claim c4).
- Not run here: next build, typecheck, QA, walkthrough (per dispatch). Syntax-only TypeScript transpile passed. All 5 claims `unverified`.
