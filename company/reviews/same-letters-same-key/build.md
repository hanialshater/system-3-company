# Build note: same-letters-same-key

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #57 (single card).

- Brief numbers held in node (scratchpad algo2b0/check.mjs): eilnst 4, eggloo 2, act 3, dgo 1; 4 groups. 45 pairs for 10 words.
- Ten word buttons stay in place after tapping (disabled, showing word and key) so QA's DOM order does not shift; bins appear in first-seen key order.
- Controls: 10 words, "Drop the rest", "Start over". Milestones `first-word`, `all-placed`; minInteractions 2.
- The "Word-to-word checks 0" readout is a constant on purpose; claim c4 covers it.
- Not run here: build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 4 claims `unverified`.
