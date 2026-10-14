# Build note: bank-lends-it-again

builder: demo-builder · 2026-10-13

- Intent: one column of deposit slabs on a fixed $0 to $10,000 scale; each round adds a slab (1 − kept) times the one below. The dashed limit line, "limit = $1,000 ÷ kept", appears only once the total is within 1% of it, so the answer is not drawn before the learner gets there.
- Milestones: a second round at 10%, and the total within 1% of $10,000 at 10% (round 44 or later). DOM order: Back to 1 (disabled at round 1, so QA skips it), Next round, +10, +50 (QA: 2, 12, 62 rounds, total $9,985), then the 10/20/50% tiles.
- The reveal quotes the most rounds reached at 10% and the limits of the other shares only if the learner ran them out.
- The real-world caveat (Bank of England 2014; Fed reserve requirement zero since March 2020) is in the reveal and is claims c4 and c5. Both are sourced claims a checker must confirm.
- After screenshots: the "round N adds" and "first deposit" labels collided at small totals; they moved to the top right and beside the first slab.

## Revision v2
Learner review r2 (2026-10-14) findings:
- Column total and limit labels overlapped on the answer frame. The total now sits to the left of the column at the column top; the limit label stays on the dashed line at the right.
- The reveal quoted round 3 ($810), which the learner may skip with +10. It now says "round 2 added $900, and every round adds 90% of the one before" (round 2 is reached by the first milestone). No claim text changed.
