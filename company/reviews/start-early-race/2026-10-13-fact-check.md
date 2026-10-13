# Fact-check: start-early-race (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; closed form and a year-by-year simulation in artifacts/scratch/fc-aiecongeo/early.mjs (the two agree to 1e-9). Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Ordinary-annuity future value; simulation matches. |
| c2 | verified | Ana: 33,159.48 x 7.6123 = $252,418. |
| c3 | verified | Ben (wait 10): $226,706. |
| c4 | verified | $24,000 vs $72,000 (3x). |
| c5 | verified | Wait 9: $244,975 (deposits $74,400) < $252,418 -> behind; wait 8: $264,524 -> ahead. First wait at which Ben is behind is 9 (simulated). Slider runs 0 to 20 years. |
| c6 | verified | 1.07^30 = 7.612. |
| c7 | verified | Reveal: 'A model: a fixed 7%, no fees, taxes or inflation. Not a forecast of returns, and not advice.' |

Stage check: the reveal's 'Ben falls behind once he waits 9 years, even though he still puts in three times as much' is slightly loose: at a 9-year wait Ben deposits $74,400, which is about 3.1x Ana's $24,000, so 'three times as much' is right to one significant figure (and exactly 3x at the 10-year wait that the sentence before it describes). Unrecorded claims: none.
