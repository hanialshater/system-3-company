*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): one-nudge-per-mistake
lesson version: v1
boundary: adult beginner; knows a straight line can separate two groups of points; no vectors, no dot product.
Screenshots seen: yes (artifacts/walkthroughs/one-nudge-per-mistake/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: the hook ("No formula, no maths homework: just a line that is told when it is wrong") is neutral and inviting. The question lists five points and the rule "adds (+) or subtracts (−) that point". To a beginner, "adding a point to a line" means nothing yet, and "Score = w·point + b" under the stage is notation they don't read. So the prediction is an honest guess between "one fix", "a couple" and "one per point". That is fine for a prediction, and the stage doesn't leak: there is no line, and the readouts are blank.
- Explore: "Check next point" on (1,1) gives "(1,1) +: score 0 → wrong, nudge". A line appears, with the shaded side holding the + points, and (−1,0) is circled red as now wrong. That is the best moment: you can see the line make a new mistake. "Rest of sweep" then jumps straight to "(0,2) +: score 2 → right" with NUDGES 2 and the line turned steeper. The second nudge, at (−1,0), which is the one that actually separates the groups, happens inside a single tap with no caption of its own. I see its result, not the moment. "Full sweep" gives "Sweep 2: no mistakes. Training is done." That is clear and earned.
- Reveal: "You watched 2 nudges: at (1,1) and (−1,0)." I watched the counter say 2, and I saw (−1,0) go red. I did not see a "(−1,0) −: wrong, nudge" caption. "Points already right change nothing" was seen once ((0,2) → right). "Turns the line toward putting that point on the right side" was seen for the first nudge. In the walkthrough the reveal stage shows the reset state (no line, all points red) because Start over was the last tap, so the stage under the reveal contradicts "the line sat between the groups". A real learner who taps Start over will see the same.

## 2. Earlier findings (2026-10-14 review, v1, verdict launch)

1. The prediction is arithmetic, not belief, and the formula line is beyond the boundary: **not fixed** (unchanged).
2. "Rest of sweep" ran the second nudge in one jump, and the reveal says "You watched 2 nudges": **not fixed**. I am raising it to the top finding. The reveal still claims a moment the gated path does not show.
3. What "adds that point" does to the line is told: **not fixed**, minor. The first nudge shows it in outline.
4. Reveal sits under an empty stage after Start over: **not fixed**.

The version is still v1, and I see no change from the walkthrough the earlier review describes. The earlier verdict was launch. I give revise because the reveal's first sentence ("You watched 2 nudges: at (1,1) and (−1,0)") is an overclaim on the path the panel recommends.

## 3. New findings

1. **Revise:** "Rest of sweep" swallows the decisive second nudge. Its caption reports only the last point checked, so the learner who uses it (the panel invites it) never sees "(−1,0) −: wrong, nudge". Better options are a short per-point log, a caption that lists the nudges made in the sweep, or a gate that requires stepping through sweep 1. The builder decides which.
2. Minor: after Start over the reveal sits over an empty stage, so "the line sat between the groups" points at nothing. One option: when the reveal opens, show the trained line, or the last trained state.
3. Minor: the stage line "Score = w·point + b. Right if it has the point's sign" is the only explanation of "right/wrong", and it is in notation. A beginner gets right/wrong from the red and green colours instead, which works.
4. No FATAL.
