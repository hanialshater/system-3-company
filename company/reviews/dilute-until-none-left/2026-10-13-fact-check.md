# Fact-check: dilute-until-none-left (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | N_A = 6.02214076e23 /mol exact since the 2019 SI redefinition. |
| c2 | verified | node: 1.0 x 0.010 x 6.02214e23 = 6.022e21. |
| c3 | verified | node: 6.022e21 x 1e-21 = 6.02; x 1e-22 = 0.602. |
| c4 | verified | node: Poisson P(0) = exp(-0.6022) = 0.5476 (55%). |
| c5 | verified | node: stage seed 3000+k gives 5 at step 21 and 0 at step 22. Selection is disclosed in the claim. Minor correction for the source note: over seed bases 1000-7000 step 21 gives 5-11 as stated, but step 22 gives 0, 1 or 2 (base 6000 gives 2), not 'only 0 or 1'. 0 occurs with probability 55%, so the illustration is typical. |
| c6 | verified | Stage chip states the 1 mL into 9 mL scheme; adsorption to walls is a standard serial-dilution caveat. |

## Pass 15 (2026-10-14)

| Claim | Verdict | Method and evidence |
|---|---|---|
| chemistry.dilute-until-none-left.c7 | verified | Re-ran Demo.tsx sample()/emptyOf() with src/kit/random.ts mulberry32 in node (scratch p15.mjs). Seeds are 3000 + k + 977 x d for d = 1..20; the "20 tubes drawn: N empty" line shows only when k >= 19; the reveal quotes emptyOf(22) = 15 of 20, identical to what the stage shows at step 22 (milestone "none" guarantees the learner visited it). Counts by step: 19-21 → 0, 22 → 15, 23 → 19, 24+ → 20. Sampler is unbiased: 100,000 draws at step 22 give 55.1% empty (Poisson e^-0.602 = 54.8%), mean 0.598; at step 21 mean 6.02. "Not a measurement" disclosure is accurate. |

Non-blocking note for demo-builder: 15 of 20 (75%) is a high draw for a 54.8% chance (P(X >= 15) = 5.3%, Binomial(20, 0.548)); other 20-draw sets with the same scheme give 7 to 16. It is true and disclosed, but a learner reads "about 55%" next to "15 of 20". Consider a seed set closer to 11/20 (disclosed as chosen, per company/knowledge/patterns/disclose-chosen-seeds.md) or a phrase noting chance spread. Pedagogy call is not mine.
