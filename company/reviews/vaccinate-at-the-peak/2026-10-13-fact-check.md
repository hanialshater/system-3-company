# Fact-check: vaccinate-at-the-peak (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran the Demo.tsx simulate(): no vaccine 94.07% ever infected, peak day 19.19. |
| c2 | verified | node: day 0 70.3%, peak 75.7%, day 40 93.6%; saves 18.4 of 23.8 points = 77.5%. |
| c3 | disputed | Numbers right (S at day 19 = 34.5%; peak at S=1/R0) but the reveal says 'most infections were still to come' at the peak. node: at day 19, 65.5% of the town has already been infected; only 28.6 points remain, 30% of the eventual 94%. So most infections have already happened. Fix: 'about a third of the town had never been infected' or 'nearly a third of the town was still to be infected', and drop 'most' and 'the middle of the epidemic'. |
| c4 | verified | node: random doses: day 0 70.3%, day 19 87.3%, benefit fraction 28.6% (about 29%). |
| c5 | verified | Stage muted line states model assumptions. |
