# Fact-check: friends-have-more-friends (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner text from Demo.tsx. Scripts: artifacts/scratch/fc-problife/a10.ts, a10b.mjs.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Star degrees 4,1,1,1,1: 8/5 = 1.6. |
| c2 | verified | 0.2 x 1 + 0.8 x 4 = 3.4; model's meanFriendDegree() = 3.4. |
| c3 | verified (as the Feld statement) | Feld (1991), Am. J. Sociology 96(6): 1464-1477: the average friend count over friendship links, sum d^2 / sum d, is at least the mean sum d / n, with equality only when all counts are equal (Cauchy-Schwarz). See the new claim c5 for the narrower statement the stage's picking rule supports. |
| c4 | verified | picks(101, seed 1991) gives 3.317 (3.32). Across seeds 1-500 the 101-pick average has middle 95% 3.17-3.64 (median 3.41, minimum 3.05), so the stage run is typical; every run is far above 1.6. |

## Added claim and the stage claim that differs from c3

Added c5 (unverified, for an independent checker). The stage does not average over friendship links as Feld does; it picks a random person and then one of their friends. That average is (1/n) x sum over friendships of (d_i/d_j + d_j/d_i) >= mean, but equality holds whenever every pair of friends has equal counts. The reveal's last sentence says "wherever friend counts differ, your friends have more friends than you, on average". Counterexample (computed): a separate triangle plus a separate group of four who all know each other has friend counts 2 and 3, yet pick-a-person-then-a-friend averages 2.571, equal to the mean 2.571 (Feld's link average is 2.667). The statement is strictly true for any connected network, which covers every realistic example, so I do not dispute it.

Fix routed to demo-builder (optional wording, not blocking): "in any connected network where friend counts differ", or "on average over friendships".
