# Fact-check: two-ripples-cancel, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Overlapping waves add by height (superposition). | verified | Superposition for linear waves: standard. |
| c2 With equal amplitudes, a path difference of half a wavelength makes th... | verified | Numerically summed two sines with phase lag D (wavelengths): peak amplitude 2.000 at D = 0 and 1, 1.414 at 0.25 and 0.75, 0.000 at 0.5; matches /2 cos(pi D/lambda)/. |
| c3 A 343 Hz tone in air has a wavelength of 1.00 m. | verified | 343/343 = 1.00 m (20 C dry air). |
| c4 With speakers 1.5 m apart and the listener 4 m in front, A's path is 0... | verified | Solved D(x) = sqrt((x+0.75)^2+16) - sqrt((x-0.75)^2+16) by bisection: D = 0.25, 0.50, 0.75, 1.00 at x = 0.688, 1.436, 2.340, 3.612 m. Matches stage (0.69, 1.44, 2.34, 3.61). |
| c5 Idealised: each speaker is taken as equally loud at the listener, with... | verified | Idealisation. At x = 1.436 the paths are 4.558 m and 4.058 m (ratio 0.890); with 1/r amplitudes the residual is 12.3% of A's amplitude (11.0% of B's): "about 12%" holds. Real rooms add reflections. |

Disputed: none. Withdrawn: none.

Recall (noise-cancelling: copy shifted half a cycle) correct. Stage reading "Listener 2.34 m: A's extra path 0.75 m, 1.4x" correct (|2 cos(0.75 pi)| = 1.41).

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

1. The reveal says the sound was 2.0x straight ahead and "one more step out, with a whole wavelength extra, loud again". The steps are 0, 1/4, 1/2, 3/4 and 1 wavelength, so the step after the silent one (1/2) has 3/4 wavelength extra and is 1.4x, not loud; the whole-wavelength spot is two steps on. Rephrase as "further out, with a whole wavelength extra".

## Result
5 verified, 0 disputed, 0 added unverified.
