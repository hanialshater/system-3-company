# Fact-check: cut-the-island (2026-10-13)

Checker: fact-checker (independent). Stage text from the walkthrough transcript; Demo.tsx read for the rule (species = round(100 x (area/100)^0.25)).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | S = cA^z is the standard species-area relation (Arrhenius; Preston; MacArthur & Wilson 1967). z of about 0.15-0.35 with 0.25 a common value is the usual summary. Rosenzweig (1995) ch. 2 is a valid but unpaged citation; I did not open it. |
| c2 | verified | 0.1^0.25 = 0.5623 (56 of 100) and 0.5^0.25 = 0.8409 (84 of 100); "losing 90% of the forest cost 44% of its species" = 100 - 56. |
| c3 | verified | Many species are spread over much of the forest, so a random patch contains many of them (the sampling account of the species-area curve). Stated as the intuition; consistent with the cited discussion. |
| c4 | verified | Tilman, May, Lehman & Nowak (1994), Nature 371: 65-66, "Habitat destruction and the extinction debt", exists and shows delayed extinctions. "Empirical regularity, not a law" is accurate. |
| c5 | verified (convention) | Toy-model statement; consistent with Demo.tsx (mulberry32(4) shuffle, only the count from the rule). |

Non-blocking note for the learning-designer and demo-builder: running the species-area curve backwards ("keep 10% of area, keep 56% of species") is exactly the method He & Hubbell (2011, Nature 473: 368-371, "Species-area relationships always overestimate extinction rates from habitat loss") argue overestimates extinction; the stage's "56 kept" is therefore if anything a low estimate of species retained. The reveal hedges ("rule of thumb", "empirical regularity, not a law", "years to decades"), so I do not dispute; a clause that this method is debated would be more accurate. No unrecorded claims found.
