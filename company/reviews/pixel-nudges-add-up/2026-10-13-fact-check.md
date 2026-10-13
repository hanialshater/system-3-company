# Fact-check: pixel-nudges-add-up (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; model and image generator re-run in artifacts/scratch/fc-aiecongeo/pix.mjs (mulberry32 seed 7, randInt copied).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 100 pixels, weight 1, cat if sum > 50; generated image sums exactly 50.500; seed 7 only sets shades (pixel values 0.187 to 0.787). |
| c2 | verified | 100 pixels x 0.01: sum 49.5, not above 50 -> flips. |
| c3 | verified | 100 x 0.005 = sum exactly 50.0 (not above 50) flips; 100 x 0.004 = 50.1 stays cat. 50 x 0.01 = 50.0 flips; 50 x 0.009 = 50.05 stays. Minimum on the slider matches. |
| c4 | verified | 0.01 x 255 = 2.55 (arithmetic). Goodfellow, Shlens & Szegedy 2015 (arXiv:1412.6572) call a 0.007 perturbation (the smallest bit of an 8-bit image) imperceptible; 'hard to spot by eye' is a mild paraphrase. 2.55 levels is bigger than their 1.8 levels (0.007 x 255), so 'hard to spot' is plausible but not measured in this lesson; the claim is already flagged as general perception. |
| c5 | verified | 224 x 224 x 3 = 150,528; 0.5 / 150,528 = 3.32e-6 ('about 0.000003'). |
| c6 | verified | Szegedy et al. 2014 (arXiv:1312.6199) reports imperceptible perturbations fooling networks; Goodfellow et al. 2015 gives the linear explanation (many small changes add up), which the reveal calls 'one explanation offered'. Two distinct papers. |

Seed note: no result depends on seed 7. Stage labels the model as a toy. Unrecorded claims: none.
