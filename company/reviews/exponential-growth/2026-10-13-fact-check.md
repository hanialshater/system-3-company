# Fact-check: exponential-growth, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c10+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c6 The pond picture is a 32 x 32 grid of 1,024 equal squares, so each sma... | verified | Demo.tsx GRID=32, 32*32=1024. patch(10): across 5, down 5 halvings -> POND/32 square = exactly one cell. Day-20 coverage 2^-10 = 1/1024. |
| c7 A pond that looks 97% clear (3% covered, as on day 25) is five days fr... | verified | 1-1/32 = 0.96875 -> "97%"; 30-25=5 days. Stage caption day 25 reads "96.9% open water, 5 days from full"; consistent. |
| c8 Guessing 'proportional to the days' gives about 83% for day 25 (25 of ... | verified | 25/30 = 0.8333. |
| c9 If a town's cases double every 3 days and the hospital is full in 12 d... | verified | 12/3=4 doublings, 0.5^4 = 0.0625 = 1/16 = 6.25%. Recall options (6%, 25%, 50%) match. |

Disputed: none. Withdrawn: none.

Stage captions re-computed for days 30..20: 1/2^m covered, open water 87.5% (day 27), 93.8% (day 26), 96.9% (day 25); percent() rounding matches. Reveal "three quarters of the pond fills in the last two days" is c2; "more than a billion" is c4 (2^30 = 1,073,741,824). Checked claims c1-c5 were previously verified by someone else; I did not re-open them except to confirm they are consistent with these four.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
