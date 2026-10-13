# Fact-check: nines-without-end, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 With n nines after the point, the gap to 1 is 0.00...01 with n - 1 zer... | verified | 1 - 0.9..9 (n nines) = 10^-n for n=1..6 in floating point; for exact digits, 0.0..01 with n-1 zeros is 10^-n. |
| c2 On the stage each new nine zooms in ten times on the gap, so the gap a... | verified | Demo.tsx header: view runs 1-10^-(n-1) to 1, so the gap 10^-n is always the last tenth; stage caption matches. |
| c3 A gap smaller than every one of 0.1, 0.01, 0.001, ... cannot be positi... | verified | 0.999... >= every finite 0.9..9, so 0 <= 1 - 0.999... <= 10^-n for all n; the only such real is 0 (Archimedean property). Sound. |
| c4 Three times 0.333... is 0.999..., and three times 1/3 is 1. | verified | 3 x 0.333... = 0.999... digit by digit; 3 x 1/3 = 1. True; note it presupposes 1/3 = 0.333..., which is the same kind of fact, so this is illustration rather than an independent proof (the proof is c3). |

Disputed: none. Withdrawn: none.

Reveal sentence "Shrinks but never reaches describes stopping after some nines" is a fair reading of option 3 (each finite string does stay short of 1).

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
