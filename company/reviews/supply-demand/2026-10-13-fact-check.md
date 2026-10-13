# Fact-check: supply-demand, second check (2026-10-13)

Checker: fact-checker (different from the earlier record that verified c1-c7). Scope: open claims c8-c11. Method: transcript + Demo.tsx; market grid re-run in artifacts/scratch/fc-aiecongeo/sd.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c8 | verified | As price falls from 6 to 2 demand rises 40 -> 80 and supply falls 40 -> 0; the sentence is prefixed 'In this model'. Law of demand/supply stated as the model's assumption. |
| c9 | verified | At $7.50: wanted 25, baked 55, sold 25, unsold 30. Reachable: slider step 0.5 over $2-$10. |
| c10 | verified | Cap $4: wanted 60, baked 20, sold 20, short 40; with the cap on the slider max is $4 (cannot pass it) and the stage message at price >= 4 with a shortage reads 'N loaves short, and the cap stops the price rising'. |
| c11 | verified | Terms are the standard definitions; stage labels match: price below $6 -> wanted > baked (shortage), above -> surplus. |

Stage check: 'half as many as at $6' (20 vs 40) and 'the most loaves change hands at $6' (max of min(wanted, baked) over the $0.50 grid is 40 at $6) confirmed. Unrecorded claims: none.
