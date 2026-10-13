# Fact-check: most-cases-vaccinated (2026-10-13)

Checker: fact-checker (independent). Inline node arithmetic. Stage text from the walkthrough transcript; Demo.tsx read (expected counts: round(nVax x 0.05), round(nUnvax x 0.5)).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | 100 x 0.5 = 50; 900 x 0.05 = 45; 45/95 = 47.4%. The vaccinated risk is 0.5 x (1 - 0.9) = 5%. |
| c2 | verified | At 100% vaccinated: 1,000 x 0.05 = 50 cases, all vaccinated; with nobody vaccinated 1,000 x 0.5 = 500. |
| c3 | verified | Derivation: vaccinated cases = N x PPV x r_v, unvaccinated = N x (1 - PPV) x r_u, so PCV/(1 - PCV) = [PPV r_v] / [(1 - PPV) r_u] and VE = 1 - r_v/r_u = 1 - [PCV/(1 - PCV)] x [(1 - PPV)/PPV] (the screening method, Orenstein et al. 1985, Bull. WHO 63(6): 1055-1068). Numeric check with the stage's numbers: PCV = 45/95, PPV = 0.9 gives VE = 0.90; a second random parameter set also matches. The final sentence ("compare risk per person in each group") is sound advice, not a measured fact. |
| c4 | verified (convention) | Stated in the reveal: "Made-up numbers ... everyone equally exposed and the vaccine works the same for everyone." |

Non-blocking: other slider positions are also expected counts (80% gives 40 + 100 cases, 28.6% vaccinated; 50% gives 25 + 250, 9.1%), correct under the same model. No unrecorded claims found.

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c5.

Expected counts 500; 45 + 50; 50 as stated.
