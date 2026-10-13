# Fact-check: fifty-up-fifty-down, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 100 raised by 50% is 150; 150 lowered by 50% is 75. | verified | 100*1.5=150, 150*0.5=75. |
| c2 Up p% then down p% leaves (1 + p)(1 - p) = 1 - p^2 of the start, which... | verified | (1+p)(1-p)=1-p^2 <1 for p in (0,1]. Notation: the claim says "p%" but writes p as a fraction (0.5 for 50%); fine, but a literal reader could trip. Only meaningful for p <= 1 (a fall of more than 100% is not a price fall). |
| c3 Stage values: up 25% gives 125 then 93.75; up 50% gives 150 then 75; u... | verified | 125->93.75, 150->75, 175->43.75; falls 31.25, 75, 131.25; corners 6.25, 25, 56.25. All match stage readouts. |
| c4 10% up then 10% down ends at 99, a 1% net loss. | verified | 100*1.1*0.9 = 99. |

Disputed: none. Withdrawn: none.

Recall (cut 20% then raise 20%: 0.8*1.2 = 0.96, 4% lower) is the same identity and correct. Reveal "+50 ... -75" correct.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
