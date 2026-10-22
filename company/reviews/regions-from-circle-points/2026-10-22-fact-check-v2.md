# Fact-check: regions-from-circle-points (v2)

checker: fact-checker · date: 2026-10-22
Read first: the walkthrough transcript and sheet (recorded 13:05, v2), then meta.json and Demo.tsx. Builder notes not read.

| Claim | New status | Basis |
|---|---|---|
| math.regions-from-circle-points.c1 | verified | ANGLES are unchanged from v1. Recomputed in a fresh script: lines 0, 1, 3, 6, 10, 15; crossings 0, 0, 0, 1, 5, 15, all distinct (minimum separation 0.209 R); pieces 1, 2, 4, 8, 16, 31. This agrees with D3 and with the stage table. |
| math.regions-from-circle-points.c2 | verified | The v1 finding is fixed. The claim and the reveal now say "the rule was never doubling: it only matched doubling up to 5 points", which is true: 1 + C(n,2) + C(n,4) gives 1, 2, 4, 8, 16, 31, 57. The formula and 1 + 15 + 15 = 31 are correct. |
| math.regions-from-circle-points.c3 | verified | Chords cross inside the circle exactly when their end points alternate, so each set of 4 points gives one crossing. C(n,4) = 1, 5, 15, recomputed. |
| math.regions-from-circle-points.c4 | verified | Regular hexagon: 15 crossing pairs fall on 13 distinct points (the three long diagonals meet at the centre), which gives 30 pieces. This agrees with D3. |

Change since v1: one sentence of reveal text (Demo.tsx) and the c2 text. There is no change to the geometry or the counts.

Verdict: pass. All four claims are verified.
