# Fact-check: gauss-staircase, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c4+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 1 + 2 + 3 + ... + 10 = 55. | verified | Direct sum 55. |
| c2 Two staircases of n steps, one turned half a turn, fill an n-by-(n+1) ... | verified | Column i has i dots + (n+1-i) = n+1; n columns. Brute-force n=1..500 sum equals n(n+1)/2. |
| c3 1 + 2 + ... + 100 = 100 x 101 / 2 = 5050. | verified | 5050 by direct sum. |

Disputed: none. Withdrawn: none.

Stage readouts (11x12=132 and 66; 12x13=156 and 78; 9x10=90 and 45) and the recall (20 -> 20x21=420, half 210) re-computed and correct. Reveal read from Demo.tsx lines 32-43 (walkthrough never unlocked it): 10x11=110, half 55; 100x101/2=5050.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
3 verified, 0 disputed, 0 added unverified.
