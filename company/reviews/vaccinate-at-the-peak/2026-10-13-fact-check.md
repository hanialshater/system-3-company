# Fact-check: vaccinate-at-the-peak (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran the Demo.tsx simulate(): no vaccine 94.07% ever infected, peak day 19.19. |
| c2 | verified | node: day 0 70.3%, peak 75.7%, day 40 93.6%; saves 18.4 of 23.8 points = 77.5%. |
| c3 | disputed | Numbers right (S at day 19 = 34.5%; peak at S=1/R0) but the reveal says 'most infections were still to come' at the peak. node: at day 19, 65.5% of the town has already been infected; only 28.6 points remain, 30% of the eventual 94%. So most infections have already happened. Fix: 'about a third of the town had never been infected' or 'nearly a third of the town was still to be infected', and drop 'most' and 'the middle of the epidemic'. |
| c4 | verified | node: random doses: day 0 70.3%, day 19 87.3%, benefit fraction 28.6% (about 29%). |
| c5 | verified | Stage muted line states model assumptions. |

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 On day 19, the peak, about 35% of the town has never been infected; th... | verified | Re-ran SIR: peak day 19.19; S at day 19 = 0.3455; peak at S = 1/R0 = 1/3. Reveal now says only that 35% had never been infected and that protecting then removes much of the tail (benefit 77.5% of day 0; 2% left by day 40): all true. |

Result: 1 verified, 0 disputed, 0 added unverified.
