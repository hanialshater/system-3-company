*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): direction-not-distance
lesson version: v3
boundary: adult beginner who knows an embedding places an item as a point or arrow in space; does not know that cosine compares only direction.
Screenshots seen: yes (artifacts/walkthroughs/direction-not-distance/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: Q = (1, 1), B = (10, 10) far, C = (1, 0.2) near. The prompt defines cosine as "the angle between two arrows from the origin", so the prediction tests the pull of "close = similar" against a rule just read. The locked stage shows no numbers (dashes). Nothing leaks beyond the definition.
- Explore: dragging k gives B "9.9 · 1.00" next to C "0.8 · 0.83". "Rank by distance" says C, "Rank by cosine" says B. The dashed "Q's direction" line runs straight through B, so the angle is visible. The contrast (far but 1.00, near but 0.83) is on stage at once.
- Reveal: names the lengths tried and the 11.3 distance (k = 9, passed while dragging), restates direction-only, and gives one real-world use.

## 2. Earlier findings (r2 review, v2)

1. Prediction answerable by reading (caption + "pointing the same way" stem): **fixed**. The locked stage has no caption; the stem now gives only coordinates and the definition. B still follows from the definition if the learner trusts it, but that is the misconception being tested, not a leak.
2. Reveal quoted 12.7 at a locked state: **fixed** (k = 10 is no longer listed; the reveal now lists visited lengths). The 11.3 at k = 9 is a mid-drag value, see new findings.
3. Q and C labels crowded at the origin: **not fixed** (still tight, readable).

## 3. New findings

- Minor: the stage caption "Length is ignored" states the conclusion before the learner tests it. The learner can still check it by dragging, but the gate needs only one slider move, so "1.00 at every length" may rest on one or two readings. Requiring two distinct k values (or a small log of k → cosine) would make the invariance seen, not told.
- Minor: the reveal quotes "11.3 away", a value only visible mid-drag; a learner who jumps straight to 8 never read it.
- Minor: in the reveal frame the top of the stage scrolls off (title of the plot cropped); the numbers stay visible.
- No FATAL.
