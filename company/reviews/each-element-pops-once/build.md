# Build note: each-element-pops-once (demo-builder, algo2-sa, 2026-10-14)

- Design intent (spec `company/design/specs/each-element-pops-once.md`): the list row on top (9 cells of 36 px) with a caret under the number just fed and an answer slot under each cell ("?", then "9✓" in `--good` when popped, "none" when the pass ends). Below, Scan (left): one row of `--muted` ticks per fed position, one tick per comparison, so 9 8 ... 1 draws a 36-tick triangle. Stack (right): the stack column (bottom = oldest) and one row of `--domain` ticks per arriving number. Counters "Scan: n" and "Stack: n" ("?" before the first press). Two Readouts keep each list's totals.
- Controls in DOM order: Next number, All the rest (replay at 40 ms each), chips "9 8 … 1" (active, disabled at start) and "8 … 1 9". Switching a chip after the current list finished replays the new list to its end (a-star-heads-for-goal pattern); otherwise it loads the new list from the start.
- Key state: milestones `descending-done`, `pops-seen`, minInteractions 2. QA path: Next number, All the rest (36 vs 8), skip the disabled chip, 8 … 1 9 (replay: 36 vs 15, eight pops on the 9).
- Numbers: run() computes both counts from the same comparison convention (stack: one test of the new value against the top; scan: stops at the first bigger). Re-ran in node: 36/8 (0 pops); added list 36/15 (8 pops, answers 9 x8, none); the brief's 5 3 8 1 9 2 7 4 gives 11/10 (not on the stage). Brief answer C held.
- The added list is new claim c3 (from the spec), needs a fact-check.
- Deviations from spec: the 150 ms pop slide is not built; popped values vanish from the stack and their answer slot fills with a ✓ on the same press.
- Not run (by instruction): build, typecheck, QA, walkthrough. Screenshots not yet looked at.
