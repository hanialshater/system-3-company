# Fact-check: plus-fifty-minus-forty (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner text from Demo.tsx. Script: artifacts/scratch/fc-problife/a15.ts.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | (1.5 + 0.6)/2 = 1.05; expected wealth after 100 rounds 100 x 1.05^100 = $13,150 (131.5x). |
| c2 | verified | 1.5 x 0.6 = 0.9; sqrt(0.9) = 0.9487, a 5.1% shrink per typical round. |
| c3 | verified | 1.5^k 0.6^(100-k) > 1 first holds at k = 56; exact P(Bin(100, 1/2) >= 56) = 0.1356 (14%). |
| c4 | verified | Median k is 50 (P(k <= 49) = 0.460, P(k <= 50) = 0.540), so median wealth is 100 x 0.9^50 = $0.515, shown as $0.52, about 0.5% of the start. |
| c5 | verified | paths(0, 1505) at round 100: median $1.29, 8 of 50 above $100, average of all 50 players $429.76. Across 500 other batches: players above start 1-14 (median 7), batch median $0.08 to about $2-3 (middle 95%), batch average above $100 in 79% of batches (source says 82%, within sampling error). So the stage's "typical player shrank, a few lucky players carried the average" holds generally, not only for this seed. |
| c6 | verified | O. Peters (2019), "The ergodicity problem in economics", Nature Physics 15: 1216-1221, uses this +50% / -40% coin game as its running example. |

Wording note for demo-builder (non-blocking): c5 says "8 of 50 ended above $100, and their average was $430". The $430 is the average of all 50 players (the reveal says so correctly); "their" in the claim could be read as the 8 winners. Reword the claim to "the average of all 50 was $430".

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c5 | verified | On the stage's first 50 players, the typical player ended at $1.29, 8 of 50 ended above $1... | Re-ran paths()/stats() in node (seed 1505): median 1.288 -> $1.29, 8 of 50 above $100, mean 429.76 -> $430 (the average of all 50). Over batches 1-500 (my own run): players above start 1-14 (median 7); batch mean exceeded $100 in 78.6%. The wording now says 'the average of all 50' so it cannot be read as the winners' average. |
| c7 | verified | A head then a tail turns $100 into $150 and then $90, a loss though heads and tails are eq... | 100 x 1.5 = 150, 150 x 0.6 = 90 (node); median in stats() is the mean of the two middle of 50 sorted wealths; gridlines at $0.01, $1, $100, $10,000, $1,000,000 are each 100x the one below (Demo.tsx line 36 and stage text). Also checked in node: 56+ heads in 100 needed to end ahead, P = 13.6%; expected wealth 100 x 1.05^100 = $13,150. |

## Result (pass 4)
2 verified, 0 disputed, 0 left unverified, 0 added unverified.
