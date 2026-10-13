# Fact-check: clicks-not-value (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; model re-run in artifacts/scratch/fc-aiecongeo/cv.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Start h=2: clicks 2*2+8 = 12, value 8. Labelled 'invented' on the stage. |
| c2 | verified | clicks = h + 10 for all h in 0..10 (checked); runToEnd(2,'clicks') = h 10, clicks 20, value 0. |
| c3 | verified | runToEnd(2,'value') = h 0, value 10, clicks 10; step moves one unit toward the higher target. |
| c4 | verified | Strathern 1997, European Review 5(3):305-321 gives the wording; Goodhart 1975 (Papers in Monetary Economics, Reserve Bank of Australia) is the origin; Manheim & Garrabrant 2018 arXiv:1803.04585 exists and classifies variants. The reveal itself says the formula is invented and the wording is attributed as 'Goodhart's law'. |

## Added (unverified) and a concern
- c5: "Clicks do reward substance ... clicks and value look related". True of the marginal reward (one click per unit of substance) but with fixed effort the stage never shows them rising together; across splits r = -1. Not wrong, but a learner could read 'look related' as 'move together'. For the demo-builder / pedagogy-critic to consider; not a fact error.
