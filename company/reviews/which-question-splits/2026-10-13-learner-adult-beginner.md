*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: which-question-splits
lesson version: v1
boundary: adult beginner; knows "sort things into groups"; never heard of Gini or decision trees.
Screenshots seen: yes (sheet.png, 6 frames)
Verdict: launch

## 1. From the artifact

- First idea I didn't have: "weighted Gini". The stage caption gives a usable gloss ("0 = one label only, 0.5 = half and half. Weighted by group size"), so I could predict by eye: "Between 2 and 3" (a pure left group) is the natural pull. Good trap.
- Explore: each cut draws a bar, colours the two groups, and prints "Left group: 1 × 1, 3 × 0 · Gini 0.38 / Right group: 4 × 1, 0 × 0 · Gini 0.00", then WEIGHTED GINI. 2|3 → 0.21, 4|5 → 0.19, 6|7 → 0.38. The numbers are shown.
- Told-not-shown: why 4|5 beats 2|3 ("the stray 0 sits in the big right group of six, which counts for more") is told. The weighting is the whole lesson and the stage never shows it as a calculation (e.g. "6/8 × 0.28 = 0.21"). The 0.19 vs 0.21 margin is thin; a beginner may feel the answer is a technicality without seeing the weights.
- Layout: the "cuts tried, weighted Gini:" strip lists numbers (0.36 0.21 0.37 0.19 … 0.38) with no cut labels under them, in very small type; I could not tell which number belonged to which cut. It also filled in values for cuts I only slid past and highlighted 0.21 green before I chose it. In the reveal the dot row shrinks to unreadable.

## 2. After reading the brief

- Learner field (knows a classifier sorts into labels) matches.
- Suggested fix (minor): show the weighting on stage ("left 4/8 × 0.38 + right 4/8 × 0 = 0.19"); label the cuts-tried strip with cut positions and enlarge it.
