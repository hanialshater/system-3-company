# Fact-check: spreaders-are-rare (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l12.mjs (own slice allocation, random-outbreak simulation, extinction-probability iteration). Stage text from the walkthrough transcript; allocation rule read from Demo.tsx.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Lloyd-Smith, Schreiber, Kopp & Getz (2005), Nature 438: 355-359, model individual variation in transmission with a negative binomial offspring distribution of mean R and dispersion k; small k means heavy superspreading. |
| c2 | verified | NB P(0) = (k/(k+R))^k = (0.1/2.1)^0.1 = 0.7375 (74%); Poisson P(0) = e^-2 = 0.1353 (14%). Mean = 2 in both. |
| c3 | verified | Re-derived the expected-shape allocation (mean of each 1% slice of the distribution, rounded): k = 0.1: 74 zeros, 200 infections, top 10 cases caused 165; Poisson: 14 zeros, 199 total, largest case 7; k = 1: 33 zeros, 201 total. Random outbreaks (20,000 simulated sets of 100 cases) agree on the first moments: mean zeros 73.7 (k = 0.1), 33.3 (k = 1), 13.5 (Poisson); mean top-10 share 80.7%, 37.8%, 23.7% (stage: 82.5%, 38.3%, 24.1%). |
| c4 | verified | Extinction probability from one case with R = 2: 0.203 for Poisson (take-off 80%), but with k = 1 it is 0.50 and with k = 0.1 it is 0.89 (take-off 11%) (iterated from q = (1 + R(1-q)/k)^-k). So uneven spread makes outbreaks fizzle more often, as Lloyd-Smith et al. show. |
| c5 | verified (convention) | The reveal says k = 0.1 is an illustration. |

Non-blocking wording note for demo-builder: the reveal says "With even spread ... no case infected more than 7". That is true of the stage's expected-shape picture (largest slice mean is 7), but real random sets of 100 Poisson(2) cases often contain an 8, 9 or more (largest seen in 20,000 sets: 12). The reveal's final line says the 100 cases are an expected shape, not a random outbreak, which covers it; consider "in this picture" next to the 7. No unrecorded claims found.

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c3, c4, c5.

Extracted cases()/summary(): even (Poisson 2) 14 zeros, total 199, max 7; k=1 33 zeros, total 201; k=0.1 74 zeros, total 200, top 10 = 165. Lloyd-Smith et al. 2005 Nature 438:355 as cited.
