# Fact-check: half-life (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c6 | Verified. Re-ran the lesson's decayStepsFor (seed 1009 + 7919 x run) for 400 consecutive run pairs: survivors after 3 half-lives identical in 0 of 400 pairs; mean Jaccard overlap 0.063 vs about 0.067 expected for independent draws. A new run really keeps different atoms. |
| c7 | Verified as a statement about the process: pooled over 500 runs the share decaying at half-lives 1,2,3,4 is 0.500, 0.499, 0.500, 0.504, so survivors that have lasted 3 half-lives decay at the same rate. Caveat for the individual run quoted in the reveal: the 4th-step share (about 25 atoms) has median 50% but a 5th-95th percentile of 33-68% across 500 runs, 87% fall within 35-65%, 10% are 64% or more, and the first 20 runs include 75% and 33%. The reveal's 'still went at about the same rate' is therefore a stretch for those runs, but the sentence that follows ('With only N atoms the share wobbles by chance, but nothing pushes it toward overdue') carries the true claim. Not disputed; the builder may want 'close to half, give or take the wobble'. |
| c8 | Verified: IUPAC Gold Book definition of half-life (time for a quantity to fall to half its initial value; for decay, the time for half the nuclei to decay), and the predict question states it that way. |

Also re-read the earlier-verified claims against the visible text: C-14 5,700 years (NUBASE2020 5700 +/- 30 y) and 'about a quarter after two, an eighth after three' are correct; 'about 25 left after 3 half-lives' of 200 is right (mean 25.06 over 500 runs, 90% range 18-34), though a given run shows e.g. 22, which the reveal reports honestly. Seeds are per run number, not chosen. No unrecorded claims.
