# Fact-check: odd-numbers-make-squares, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 Wrapping a 3 x 3 square takes 3 + 3 + 1 = 7 dots, and 7 is the next od... | verified | 3x3 wrap: 3+3+1=7 (the 4th odd number, 2*4-1); 9x9 wrap: 9+9+1=19 (10th odd number) -> 10x10. Verified n^2 = sum of first n odds for n=1..300 by brute force. Stage captions (2+2+1 wraps 2x2 to 3x3 etc.) correct. |
| c5 The first 15 odd numbers, 1 + 3 + ... + 29, add up to 225. | verified | Sum of first 15 odds = 225; the 15th odd is 29. Recall options 225/210/450: only 225 right. |

Disputed: none. Withdrawn: none.

Reveal "first 100 odd numbers add up to 10,000" and "ten odd numbers make 100" are c3 (previously verified by another checker); I re-ran both (10000, 100).

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
2 verified, 0 disputed, 0 added unverified.
