# Build note: which-coin-is-it (demo-builder, 2026-10-13)
- Intent: one line chart of the chance the mystery coin is two-headed, one point per flip (50, 67, 80, 89%...). A tails drops it to 0. 'Test 1,000 pulls' checks the 89% by counting (505 of 578 HHH pulls were two-headed).
- Gate: 2 milestones, three heads in a row on one coin, then the 1,000-pull test. Flip / Flip 3 times come first so the QA path reaches it.
- Chosen seed (disclosed in c6): pull sequence seed 9, so the first coin can show three heads and the second shows an early tails. The line depends only on the flips seen, not on which coin it is.
- After screenshots: added a chart title, because the message line is replaced by the test result.
