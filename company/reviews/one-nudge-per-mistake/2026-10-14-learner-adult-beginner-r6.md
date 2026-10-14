*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): one-nudge-per-mistake
lesson version: v2
boundary: adult beginner; knows a straight line can separate two groups of points; no vectors, no dot product.
Screenshots seen: yes (artifacts/walkthroughs/one-nudge-per-mistake/sheet.png, integrated build 3 at :3470)
Verdict: launch

## 1. From the artifact

- Predict: the title "How does a line learn?" is a question. The locked stage shows the five points with no line and blank readouts, and it has a plain caption: "+ in the shade, − outside. With no line, every point counts as wrong." The formula line is gone. To a beginner the question ("adds (+) or subtracts (−) that point") is still abstract, so 1 / 2 / 5 is an honest guess between "one fix", "a few" and "one per point". Nothing leaks.
- Explore: "Check next point" nudges at (1,1). A line and shading appear, "nudge 1" labels the point, and (−1,0) is ringed red as now wrong. "Rest of sweep" now captions the second nudge: "(-1,0) −: score 0 → wrong, nudge. Then 3 points right, no change." The red ring turns green, "nudge 2" is labelled, and the line is steeper. "Full sweep" gives "Sweep 2: no mistakes. Training is done." Every point is green. Both doesNotKnow items have a stand-in on stage: a mistake becomes a red ring, a correction turns it green, and a point that is already right leaves the line unchanged ("3 points right, no change").
- Reveal: "You made 2 nudges, marked on the stage: at (1,1) and (-1,0)" matches the labels I saw. "Watch a red ring turn green" points at what I saw for (−1,0). The reveal stage now shows the trained line, not an empty reset.

## 2. Earlier findings (r5, v1)

1. "Rest of sweep" swallowed the second nudge: **fixed** (the caption names it, and both nudges are labelled on stage).
2. The reveal sat over an empty stage after Start over: **fixed** (the reveal frame shows the trained line).
3. The stage explanation was in notation (Score = w·point + b): **fixed** (a plain caption on the locked stage).
4. The prediction can't be reasoned out by a beginner (carried from the first review): **not fixed**, minor. It is a guess, which is acceptable for a prediction.

## 3. New findings

- Minor: (1,1) is never seen red. On the locked stage the rings are neutral, though the caption says every point is wrong. Its red-to-green change happens inside the first tap, so only (−1,0) shows the change the reveal points at. Tinting the locked rings red would make both visible.
- Minor: "w 1,1 b 1" and "score 0" are jargon a beginner skips. The colours carry the meaning anyway.
- Minor: on the reveal frame the stage is scrolled, and the top point and "nudge 1" label are cropped.
- Minor: the stage shows "(-1,0)" with an ASCII hyphen, while the question uses "(−1,0)".
- No FATAL.
