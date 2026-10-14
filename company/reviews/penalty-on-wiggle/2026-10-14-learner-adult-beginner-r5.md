*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): penalty-on-wiggle
lesson version: v3
boundary: an adult with school-level maths and science, new to the topic; knows a too-flexible curve can overfit and that held-out points check a model; does not know ridge.
Screenshots seen: yes (artifacts/walkthroughs/penalty-on-wiggle/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: the title "Fit worse on purpose" and the hook "A curve hits every training dot. Why would you make it miss?" both say the training miss goes up. The question then asks whether the training miss gets larger. **The answer is printed above the question.** Also, "Smaller" is impossible from a miss of 0, so it is really a two-way choice. The prediction costs nothing and so cannot surface the surprise ("worse on training, by design").
- Explore: the stem now explains the penalty in plain words ("discourages wild bends ... coefficients, the numbers that set how sharply the curve bends"). With one nudge to 0.001 the purple curve stops threading the dots, training miss 0.13, held-out 0.41 against the "NO-PENALTY HELD-OUT 0.44" box, with the no-penalty curve dashed behind. "New data" gives 0.08 / 0.47 vs 0.58. The trade (worse on training, better on held-out) is seen on stage, twice.
- Reveal: quotes only what was seen (0.08, 0.58, 0.47), then tells "490 of 500 data sets" and "Push to 10 ... loses again". The gate opened after one slider move, so the too-much-penalty side was never visited.

## 2. Earlier findings (v2 review)

1. Vocabulary ("degree-7", unexplained coefficients): **fixed** (plain-language gloss in the stem).
2. The 0.58 no-penalty contrast was never on screen: **fixed** (no-penalty held-out readout plus dashed ghost curve).
3. "490 of 500" and "push to 10 ... flatter" told, not shown: **not fixed** (still told; the gate needs only one move).
4. Stage shrinks to a tiny chart at reveal: **fixed** (chart legible).

## 3. New findings

- **Revise:** title and hook give away the predict answer. A neutral title/hook (for example "What does a penalty do to the training miss?") would make the prediction real.
- Minor: "Smaller" is an impossible option from miss 0; a learner may read it as a trick.
- Minor: the U-shape (too much penalty loses again) is told. Requiring one visit to a large λ would show it.
- No FATAL.
