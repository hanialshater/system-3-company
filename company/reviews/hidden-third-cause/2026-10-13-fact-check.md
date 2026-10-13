# Fact-check: hidden-third-cause (2026-10-13)

Checker: fact-checker (independent). No claim was written by me. Script: artifacts/scratch/fc-problife/a11.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | model.ts town(): temp uniform 5-35, sales = temp + N(0,15), sunburn = temp + independent N(0,15); neither appears in the other's formula. |
| c2 | verified | town(2024) overall r = 0.8273; theory 75/(75+15) = 0.833. Across seeds 1-500: middle 95% 0.805-0.859, so the seed is typical. |
| c3 | verified | town(2024), 28 bands (starts 5..32): mean r = 0.047, min -0.195, max 0.301, 30-45 days per band (mean 36.7). Theory 0.75/15.75 = 0.048. Across seeds 1-500 the band-mean r has median 0.045 (95% range -0.05 to 0.14, bands overlap so they are not independent); the lowest band r is typically -0.27 and the highest +0.35, so the stage's -0.2 to 0.3 is milder than typical but the same scale. Seeds 1-2000 with every band within +-0.25: 67, matching the source (so the seed is not selected for a tight spread). "Mostly disappears" holds generally. |
| c4 | verified (convention) | By construction; the reveal says "This town is built so temperature is the only link". |

Notes: the 28 bands overlap (a band starts every degree and is 3 degrees wide), so "28 bands average about 0.05" is an average over overlapping subsets, not 28 independent estimates; nothing the lesson says depends on independence. No unrecorded claims found.

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c5 | verified | Correlation runs from -1 to +1: +1 means two quantities rise together perfectly, 0 means n... | Pearson's r lies in [-1, +1] (Cauchy-Schwarz); +1 = perfect increasing straight-line relation, 0 = no linear association. Stage key reads 'Correlation: +1 rise together, 0 no link', consistent. (Minor: the readout word 'weak' covers /r/ 0.3-0.6, which many texts call moderate; labelling, not a recorded claim.) |

## Result (pass 4)
1 verified, 0 disputed, 0 left unverified, 0 added unverified.
