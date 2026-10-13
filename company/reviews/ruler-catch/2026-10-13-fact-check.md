# Fact-check: ruler-catch (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | d = g t^2/2 from rest, t = sqrt(2d/g); drag negligible for a ruler over 20 cm. |
| c2 | verified | node: sqrt(0.4/9.81) = 0.2019 s. |
| c3 | verified | Hedged claim ('about 0.2 to 0.25 s'), not shown to the learner. Visual simple RT in young adults is reported at roughly 180-200 ms (Kosinski 2008, quoting Galton and others; via BioNumbers) up to about 220-250 ms on modern screen tests (Woods et al. 2015 note modern values exceed Galton's <190 ms). The range covers the literature; the exact young-adult mean in Woods et al. could not be fetched (journal sites blocked in this environment), so the check rests on Kosinski plus the Woods abstract. |
| c4 | verified | node: MEAN_T 0.20, SPREAD 0.05 (sum of 3 uniforms - 1.5, sd 0.025), seed 1: first five catches 16.4, 27.4, 22.2, 24.2, 13.3 cm; 30-trial mean 20.1 cm; seeds 2 and 3 give 20.4 and 21.3 cm, so 'about 20 cm' holds. |
| c5 | verified | node: timeFor(21) - timeFor(20) = 0.00499 s. |
| c6 | verified | Reveal converts min and max catch with timeFor, same formula as c1. |
