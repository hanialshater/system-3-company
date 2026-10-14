*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): four-rolls-one-six
lesson version: v1
boundary: an adult with school-level maths; adds chances (4 x 1/6 = 67%).
Screenshots seen: yes (artifacts/walkthroughs/four-rolls-one-six/sheet.png, plus 05-step-4.png at full size)
Verdict: launch

## 1. From the artifact

- Predict: 67% (adding 1/6 four times) is the classic beginner answer, and I picked it. 33% and 52% are plausible alternatives. The locked stage shows one bar of 1,000 and the readouts 1,000 (100%) / 0 (0%). Nothing leaks.
- Explore: each roll adds a bar of players with no six yet (844, 701, 581, 477) and a dashed red line for "what adding 1/6 per roll predicts" (833, 667, 500, 333). AT LEAST ONE SIX ends at 523 (52%), which contradicts my 67% on stage.
- Where understanding first broke (legibility): the dashed line's labels collide with the bar labels. At roll 3, "500" overprints "581". At roll 4 the red "333" sits on top of "477", and neither is readable (05-step-4.png). The gap between the dashed line and the bar is small at phone size. So the key on-stage contrast, my model's 333 against the real 477, cannot be read at the moment it matters. The 52% readout still carries the verdict.
- The mechanism ("each roll removes 1/6 of the players still left, not 1/6 of everyone") is told in the reveal. On stage the learner could only work it out by dividing successive bars (844 → 701 is about 5/6). Nothing invites that. A per-roll "−156, −143, −120, −104" label would let the shrinking removals be seen.
- After "Start over" the reveal quotes 477 and 523, which are no longer on stage. Minor.
- Reveal: it answers the question. "1 − (5/6)⁴" is introduced as a formula. It is fine for the reveal.

## 2. Earlier findings (v1 review)

1. The dashed-line labels overlap the bar labels at rolls 3 and 4: **not fixed**. At roll 4 the 333/477 pair is illegible.
2. The reveal quotes a stage cleared by "Start over": **not fixed** (minor).
3. Empty band at the top of the stage: **not fixed** (cosmetic).
4. The reveal ran into the trust link: **fixed** (it fits in this run).

Note: meta.json still says version 1. I saw no visible change since the v1 review.

## 3. New findings

- Should fix (carried, raised in priority): move the dashed-line labels off the bars (for example to the right of each point, or in a small legend row: "adding predicts: 833 / 667 / 500 / 333"). The 477 vs 333 contrast is the lesson's best picture, and right now it is unreadable.
- Minor: label each step's removal (−156, −143, −120, −104) so "1/6 of those left" can be seen in the bars.
- No FATAL. The 52% readout and the bars sitting above the dashed line still contradict the adding model on stage.
