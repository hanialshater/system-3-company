# Fact-check: regions-from-circle-points (v1)

checker: fact-checker · date: 2026-10-22
Read first: artifacts/walkthroughs/regions-from-circle-points/transcript.md and sheet.png; then meta.json, Demo.tsx, brief math.discrete.md #3 (D3). Builder notes not read.

| Claim | New status | Basis |
|---|---|---|
| math.regions-from-circle-points.c1 | verified | I recomputed from ANGLES (0, 64, 113, 179, 230, 308) in a fresh script: lines 0, 1, 3, 6, 10, 15; crossings 0, 0, 0, 1, 5, 15, all distinct (minimum separation 0.209 R; the nearest third line to any crossing is 0.189 R, about 26 px at R = 136); pieces 1, 2, 4, 8, 16, 31. This agrees with D3 and with the stage table in sheet.png. |
| math.regions-from-circle-points.c2 | disputed | The formula pieces = 1 + C(n,2) + C(n,4) under "no three concurrent", 1 + 15 + 15 = 31, and the line-by-line argument are all correct. But the clause "the count was never doubling" is false as written: the counts 1, 2, 4, 8, 16 do double, and the same reveal (and c1) says "Doubling held up to 5 points". |
| math.regions-from-circle-points.c3 | verified | Two chords cross inside the circle exactly when their four end points alternate around it, so each set of 4 points gives one crossing (its diagonals). Its sides do not cross. Recomputed crossings 1, 5, 15 = C(4,4), C(5,4), C(6,4). |
| math.regions-from-circle-points.c4 | verified | I recomputed the regular hexagon: 15 crossing pairs fall on 13 distinct points. The only concurrency is the three long diagonals at the centre, which gives 30 pieces. This agrees with D3. |

## Findings (class: false literal statement in the claim and the reveal)
1. c2 text and the reveal's second paragraph: "…so the count was never doubling" → this contradicts the counts the learner has just seen (1, 2, 4, 8, 16). Required: state it about the rule, not the count, for example "so the rule was never doubling: it only matched doubling up to 5 points". Fix it the same way in meta.json c2 and in Demo.tsx's reveal.

## Other checks (no defect)
- Predict text: "1 point, 1. 2 points, 2. 3: 4. 4: 8. 5: 16" and "uneven so no three lines meet at one spot" hold for the stage points → c1.
- Euler count in drawingOf(): E − V + 1 with E = line segments + n arcs gives 31 at n = 6, independently of the formula.
- Shading: each chord toggles membership of exactly one cap path (evenodd), so neighbouring pieces always differ. In sheet.png, the 3-point frame shades the triangle and not the two small caps, which is right.
- Recall item: a matter of method, not a number. It is covered by c1's last sentence.

Verdict: revise (c2 disputed).
