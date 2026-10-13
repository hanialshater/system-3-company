# Fact-check: wait-or-take-now (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; present values in artifacts/scratch/fc-aiecongeo/pv.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 1,200 / 1.05^3 = 1,036.61; beats $1,000 by $36.61 (reveal: $37). |
| c2 | verified | Present value = FV / (1+r)^n: the amount that grows to FV at rate r. Definition checked by the recall card (500 x 1.1^2 = 605 > 550; 550 / 1.1^2 = 454.55). |
| c3 | verified | 1,200 / 1.07^3 = 979.56. |
| c4 | verified | Break-even r = 1.2^(1/3) - 1 = 6.2659% ('about 6.27%'). On the whole-percent slider the later offer wins through 6% (1,007.54) and loses from 7%. |
| c5 | verified | 0%: $1,200; 12%: $854.14. |
| c6 | verified | Chip 'Model: sure payment, steady rate, no tax'; reveal 'Not advice'. |

Unrecorded claims: none. The reveal's 'Future money is worth less today because money now could be earning' is the lesson's explanation of c2.
