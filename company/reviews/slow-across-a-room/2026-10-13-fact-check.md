# Fact-check: slow-across-a-room (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l11.ts (copy of the stage's seeded walks plus the t = x^2/2D arithmetic). Stage text from the walkthrough transcript; Demo.tsx read (tOf(um) = um^2 x 1e-3 s, D = 5e-10 m^2/s = 500 um^2/s).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | One-dimensional diffusion: mean-square displacement <x^2> = 2Dt (Einstein; Berg 1993). The lesson says "typical spread", "single molecules arrive sooner or later". |
| c2 | verified | D for small solutes in water is of order 1e-9 to 1e-10 m^2/s; glucose about 6.7e-10 (Longsworth 1953), sucrose about 5e-10. 5e-10 is a rounded value for "a sugar molecule in water", labelled as such. I did not open Longsworth (1953) or Berg; the sucrose and glucose values are consistent with tabulated diffusion coefficients. |
| c3 | verified | t = x^2/(2D): 10 um -> 0.100 s; 1 mm -> 1,000 s = 16.7 min; ratio 10,000. With glucose's 6.7e-10: 0.075 s and 746 s = 12.4 min (the predict says "about 17 minutes"; with a different sugar it would be 12 to 17 minutes, same order, and the lesson fixes D). |
| c4 | verified | x^2 = 2Dt: doubling x quadruples t (20 um -> 0.4 s = 4 x 0.1 s); the edge curve sqrt(2Dt) is a parabola when drawn with time down. |
| c5 | verified | Diffusion across a cell (about 10 um) takes about 0.1 s; across 1 mm about 17 minutes, across a centimetre about 28 hours (1e5 s) at this D, hence bulk flow (circulation) in large animals. Insects use tracheae rather than blood for oxygen, so "large animals move oxygen and food by blood flow" is a simplification, not wrong for the large vertebrates the lesson is about. |
| c6 | verified | The stage's 30 walks use Gaussian steps with variance 2D x 5 s (sd = sqrt(1e-3 x 5) mm), seed 424242. Their RMS spread is 0.31 mm at 100 s (theory 0.32), 0.67 at 500 s (0.71), 0.77 at 1,000 s (1.00), 0.93 at 1,200 s (1.10); 24 of 30 walkers lie inside the +-sqrt(2Dt) curve at 1,000 s (68% expected = 20). The stage seed's walkers are a little less spread than theory at 1,000 s (about 1.7 standard errors), which is ordinary sampling variation for 30 walkers; the claim only says the walks are seeded with the same D. |

Non-blocking: the reveal's dashed "typical" curve is the exact RMS, and the learner sees 30 sample paths that average slightly narrower; no text claims they match exactly. No unrecorded claims found.
