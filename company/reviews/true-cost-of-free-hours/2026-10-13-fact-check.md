# Fact-check: true-cost-of-free-hours (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; cost() in artifacts/scratch/fc-aiecongeo/tcf.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 50 + 3 x 20 = $110. |
| c2 | verified | Mankiw, Principles of Economics, ch. 1, principle 2: 'the cost of something is what you give up to get it'. This is the standard definition of opportunity cost, a definition that needs consistency (it is a convention of the field) rather than data. |
| c3 | verified | With no paid alternative the model gives $50 at every hour count (cost(h,false) = 50 for h = 1..8). |
| c4 | verified | Real cost 70, 90, 110, 130, 150, 170, 190, 210 for 1..8 hours. |
| c5 | verified | Chip 'Toy numbers: paid work was on offer'; reveal 'Toy numbers. It ignores taxes and what the course is worth to you.' |

Stage check: 'the given-up pay counts only if that work was really there to take' is the model's stated condition (c3) and is consistent with opportunity-cost usage. Unrecorded claims: none.
