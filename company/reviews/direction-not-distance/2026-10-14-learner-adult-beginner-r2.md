*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): direction-not-distance
lesson version: v2
boundary: adult beginner; knows points on a grid; has never met cosine similarity.
Screenshots seen: yes (artifacts/walkthroughs/direction-not-distance/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "Length is ignored" is gone from the locked caption. But the caption still says "Cosine: 1 = same direction, lower = wider angle", and the stem says B is "pointing the same way as Q" while C "points a bit lower". Putting the two together, B = 1 and C < 1 by reading alone. **The prediction is still answerable from the text, without having to give up the "near = similar" idea.**
- Explore: dragging k keeps B's cosine at 1.00 while its distance is 9.9 at k = 8, against C at 0.8 · 0.83. "Rank by distance → C" and "Rank by cosine → B" split clearly. Good.
- Reveal: "at every length you tried, (10, 10), (9, 9), (8, 8), **even when it was 12.7 away**". At k = 10 the readouts were "–" (locked), and the path moved straight to 8, so I never saw 12.7 or the k = 9 values. **Quoting a state I didn't visit.**

## 2. Earlier findings (v1 review)

1. "Length is ignored" leaked the answer: **partly fixed** (that phrase is hidden, but "1 = same direction" plus the stem still gives it away).
2. 12.7 never seen: **not fixed**.
3. Doubled brackets: **fixed**.
4. Q and C labels collide at the origin: **partly fixed** (slightly separated, still crowded).
5. Chart shrinks at reveal: **partly fixed** (legible at reveal).

## 3. New findings

- **Revise:** (a) the predict-time caption plus the stem make B derivable by reading; consider defining cosine after the lock, or not telling the learner in the stem that B "points the same way". (b) The reveal should quote only the lengths actually visited, or show readouts at k = 10 after unlock.
- No FATAL.
