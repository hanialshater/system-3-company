# Fact-check: distance-is-area, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c4+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A car speeding up steadily from 0 to 20 m/s over 10 s travels 100 m: t... | verified | 1/2*10*20=100; also 1/2 a t^2 with a=2: 100. |
| c2 Strips using the speed at the end of each slice give 200 m with 1 stri... | verified | Right Riemann sum 100(n+1)/n: n=1 200, n=10 110, n=20 105, n=4 125 and n=7 114.29 (both match the stage readouts). |
| c3 Distance travelled is the area under the speed-time graph. | verified | Distance = integral of speed (speed >= 0): fundamental theorem of calculus. Textbook-grade statement; the cited Stewart section was not re-read, but the content is a definition-level fact. |

Disputed: none. Withdrawn: none.



## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
3 verified, 0 disputed, 0 added unverified.
