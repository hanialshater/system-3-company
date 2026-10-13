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

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | node: re-derived. Mean friend-of-random-person degree = (1/n) sum over friendships (d_i/d_j + d_j/d_i) >= 2m/n = mean degree, equality iff every friendship joins equal degrees. Star: 1.6 vs 3.4. Triangle + K4: 2.571 vs 2.571 (equal although degrees differ across the network). 20,000 random connected graphs: never below, and strictly above whenever degrees are not all equal. The claim as worded is true. Advisory for builder: the reveal's 'wherever friend counts differ' (and verified claim c3) is not literally true for disconnected networks like triangle + K4; 'wherever friends differ in how many friends they have' is exact. |

Stage check: Reveal numbers 3.4, 1.6, 0.2*1+0.8*4=3.4 and 'four in five are leaves' re-derived and correct.

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c3 | verified | In any connected network where friend counts differ, a friend picked as a random person's ... | Feld 1991 is a result on the mean over friendship links; the claim as revised (random person then random friend, connected network, degrees differ) follows from the pairing argument d_i/d_j + d_j/d_i >= 2. Brute-forced 20,000 random connected graphs (3-10 nodes): the pick-person-then-friend mean exceeded the mean degree whenever degrees differed (19,248 cases, 0 violations) and equalled it when all degrees were equal. |
| c5 | verified | With the stage's way of picking (a random person, then one of their friends at random), th... | Rechecked: the equality case (triangle + K4: both means 2.571) is correct; the revised text now states connected + degrees differ gives strict inequality, supported by the 20,000-graph brute force and the algebra. Hub toy: 0.2 x 1 + 0.8 x 4 = 3.4 vs mean 1.6. |

## Result (pass 4)
2 verified, 0 disputed, 0 left unverified, 0 added unverified.
