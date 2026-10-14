*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): attention-shares-one
lesson version: v3
boundary: adult with school maths; has heard "AI pays attention to words"; never met dot products or softmax.
Screenshots seen: yes (artifacts/walkthroughs/attention-shares-one/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the stem now uses plain words ("scores by how well its arrow lines up... turned into shares of one total"), with no "dot product" or "softmax". The hook ("How does attention split among three?") doesn't leak an answer. The locked stage shows arrows, a pale three-part bar in roughly equal thirds (so it doesn't reveal 44.6%), and "?" readouts.
- Explore: "Query on A (0°)" gives A 66.5 / B 24.5 / C 9.0, with "Pointing straight at A, yet A gets about two thirds". "Query midway (45°)" gives 44.6 / 44.6 / 10.8, with scores 0.71/0.71/−0.71 on stage. The gate opened only after both buttons.
- Reveal: every number it quotes (0.71, 44.6, 10.8, 66.5) was on stage. "Softmax" is now introduced as "a step called softmax", after I saw what it does.

## 2. Earlier findings (v1 review)

1. Undefined terms in the stem: **fixed**.
2. Reveal numbers never on stage: **fixed**.
3. One slider nudge unlocked the reveal: **fixed** (both cases are required).
4. "Words" are just arrows: **not fixed**, minor (A/B/C letters, not words).
5. Hook leaked "not all": **fixed**.
6. Blend arrow = weighted average is told: **not fixed**, minor.

## 3. New findings

- Minor: the red "blend" arrow is never explained on stage. A learner sees it move but the legend only says "blend of the words".
- No FATAL.
