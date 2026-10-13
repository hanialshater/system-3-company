# Fact-check: circle-slices-to-rectangle, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A circle of radius 10 has area about 314, which is about 78% (78.5%) o... | verified | pi*100=314.16, /400=0.7854. Note 78.54% rounds to 79%, so "about 78%" is a floor; the 78.5% in brackets is exact. Acceptable. |
| c2 Half the rim of a circle of radius 10 is pi x 10, about 31.4. | verified | pi*10=31.416. |
| c3 Equal slices laid alternately point-up and point-down form a strip abo... | verified | Strip length N r sin(pi/N): 3.061 (N=8), 3.121 (16), 3.140 (64), 3.1416 (1000) times r; height r cos(pi/N) -> r. Area preserved by rearrangement. Limit argument is standard; the Strogatz page was not re-read (book not reachable), the maths is. |
| c4 Any circle fills pi / 4, about 78.5%, of the square drawn around it. | verified | pi r^2/(2r)^2 = pi/4 = 0.7854 for any r. |

Disputed: none. Withdrawn: none.

Reveal text (strip as tall as 10, half rim 31.4, 3.14 of four boxes, 78.5%) all follow from c1-c4.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
