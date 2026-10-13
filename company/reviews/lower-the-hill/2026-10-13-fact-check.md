# Fact-check: lower-the-hill (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: Arrhenius k = A exp(-Ea/RT); the fraction of collisions with energy at least Ea is exp(-Ea/RT) (IUPAC Gold Book). |
| c2 | Verified: exp(25000 / (8.314 x 298)) = exp(10.09) = 24,113, i.e. about 24,000 (same pre-factor assumed, as the stage and reveal say). |
| c3 | Verified: RT = 2,477.6 J/mol; 25,000/RT = 10.09; e^10 = 22,026; e^10.1 = 24,343 (the reveal's 'precisely e^10.1 = 24,000' is rounded, fine). |
| c4 | Verified: IUPAC Gold Book definition of catalyst; the equilibrium is unchanged. |
| c5 | Verified (convention): Demo.tsx rate(ea) = exp((75 - Ea)/RT) gives 1 per second at 75 kJ/mol and 24,113 at 50. |

Recall (12 kJ/mol, RT 2.6: e^4.6 = 101, about 100) is correct. Wording note, not a dispute: the reveal's 'Only collisions with at least the barrier's energy react' states a necessary condition; real reactions also need suitable orientation (a pre-factor, which the lesson holds fixed). Deterministic. No unrecorded claims.
