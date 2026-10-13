# Fact-check: whose-cutoff-wins (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; data and mistakes() rebuilt in artifacts/scratch/fc-aiecongeo/cut.mjs. Deterministic, no seeds.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 90 group A (9 per 10-point band), 10 group B (1 per band at 5, 15, ...); A qualified from 50, B from 30. Invented, labelled as such in the claim. |
| c2 | verified | A mistake is a pass/fail that disagrees with the person's own group line; cutoffs in steps of 10; model keeps the minimum total. |
| c3 | verified | Totals for cutoffs 0..100 = 48,38,28,18,10,2,12,22,32,42,52. Minimum 2 at cutoff 50 (A 0, B 2: the B people at 35 and 45). Over integer cutoffs 0..100 the minimum is also at 50. 2/10 = 20% of B, 0% of A. |
| c4 | verified | Cutoff 40: A 9 mistakes (the 9 people in [40,50) pass but are unqualified), B 1 (35 still failed; 45 now correctly passes). Net: fixes 1, breaks 9. |
| c5 | verified | Buolamwini & Gebru 2018 (PMLR 81, FAT*) abstract reports error rates of up to 34.7% for darker-skinned women and at most 0.8% for lighter-skinned men. The reveal says 'far more often', which is supported. One study, one source for the real-world sentence. |

Stage check: 'It fit the majority, and the rare group got the errors' follows from the toy. Real-world sentence is attributed. 'Group B scores run 20 points low' (code comment) is not shown to the learner. Unrecorded claims: none.
