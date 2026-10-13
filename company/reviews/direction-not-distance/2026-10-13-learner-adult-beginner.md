*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: direction-not-distance
lesson version: v1
boundary: adult beginner; knows points on a grid, has never met cosine similarity.
Screenshots seen: yes (sheet.png, 5 frames)
Verdict: revise

## 1. From the artifact

- First idea I didn't have: "cosine similarity" in the question. The stage caption answers it, but too completely: "Cosine: 1 = same direction, lower = wider angle. Length is ignored." With "Length is ignored" visible at predict, B is the answer by reading, not by thinking. The prediction is given away.
- Explore works: dragging k shows B's cosine stuck at 1.00 while distance changes (9.9 at k = 8), C at 0.8 · 0.83. "Rank by distance → C", "Rank by cosine → B" makes the split visible.
- Told-not-shown: "even 12.7 away" in the reveal; the readouts were dashes at k = 10, so I never saw 12.7. Typo: "((10, 10), (9, 9), (8, 8))" has doubled brackets.
- Layout: Q and C sit on top of each other at the origin; the labels "Q" and "C" collide. In the reveal frame the chart shrinks so far that "Closer by cosine: B" and "B (8, 8)" are unreadable.
- Reveal answers my question (why the far one wins), and the "longer document, same topic" line connects it.

## 2. After reading the brief

- Matches the learner field (knows embeddings as points). Intent delivered apart from the leak.
- Suggested fix: drop "Length is ignored" from the caption until after lock (keep "1 = same direction"); separate Q and C labels; keep the chart legible at reveal; fix the brackets and either show 12.7 or drop it.
