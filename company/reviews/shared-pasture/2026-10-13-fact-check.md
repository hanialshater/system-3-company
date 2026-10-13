# Fact-check: shared-pasture (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; the game rebuilt in artifacts/scratch/fc-aiecongeo/pasture.mjs. Deterministic, no seeds (the pasture drawing uses fixed pseudo-random spots only for layout).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | N=10: 10 per cow; each herder 10; group 100. |
| c2 | verified | You add a cow: N=11, 9 per cow, you earn 2 x 9 = 18, others 9. |
| c3 | verified | Adder's net gain is +8 (18 vs 10): the new cow's 9 minus 1 lost on the old cow; the total crowding cost (11 cows x 1 = 11) is spread across all. |
| c4 | verified | If you add: 7 other herders add, ending at 18 cows (you 2, seven others 2, two others 1), per cow 2, group 36, your income 4. If you keep: 8 others add, 18 cows, group 36, your income 2. A second round adds nothing. So 18 and 36 either way, as claimed. |
| c5 | verified | n(20-n): 0, 19, 36, ..., 99, 100 at n = 10, 99, ..., 0 at n = 20. |
| c6 | verified | Ostrom 1990, Governing the Commons (CUP), documents long-lived community-managed commons (alpine meadows, irrigation, fisheries). |
| c7 | verified | Reveal: 'A model with made-up numbers and no rules.' Hardin 1968 Science 162:1243 is the origin of the name. |

Stage check: 'Holding back would not have saved it' holds under the lesson's decision rule (others add while N < 18 either way). It is a statement about this rule, not about herders in general; the reveal ends by pointing to Ostrom. Unrecorded claims: none.
