# Fact-check: two-random-walks-agree (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | pair() in model.ts: 100 steps of +/-1 by independent mulberry32 draws. |
| c2 | verified | node: strongShare(100000, 1000000) = 0.39791 (39.8%). Independent Math.random simulation of 200,000 pairs: 0.3962 (SE 0.0011), consistent. |
| c3 | verified | node: first 41 pairs (seed 5000+i) give 17 with |r|>0.5, max r +0.883, first 11 pairs 2 strong. Over 300 other seed sets of 41: mean 16.3 (range 8-24); source says 15.9 (6-24), consistent within sampling. Untuned disclosure present. |
| c4 | verified | Yule (1926) JRSS 89(1): 1-63 'Why do we sometimes get nonsense-correlations between time-series?' and Granger & Newbold (1974) J. Econometrics 2(2): 111-120 'Spurious regressions in econometrics' exist and show independent random-walk-like series produce spurious correlation. |
| c5 | verified | Follows from c2: about 40% of independent pairs have |r|>0.5, so tracking alone is weak evidence of a shared cause. |
