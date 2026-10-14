*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): shrink-toward-zero
lesson version: v2
boundary: adult beginner; knows averaging noisy readings helps; "squared error", "bias" and "sd" are fuzzy words.
Screenshots seen: yes (artifacts/walkthroughs/shrink-toward-zero/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the hook "Which misses by less?" is neutral, and the stem defines "average squared error" in plain words. "noise sd 1" is jargon for an adult beginner, but nothing in the answer depends on it. The locked stage shows A's dots spread around the truth line, with A's numbers (bias 0.00, spread 0.50, error 0.250) as a baseline. B's number is hidden. Nothing leaks.
- Layout defect in the predict frame: the caption "(×1) starts here: bias 0.00, spread 0.50, error 0.250" is overlapped by the A/B/×0.2 buttons, and the BIAS / SPREAD / ERROR chips are cut off at the bottom of the stage (half-visible "0.00 0.50 0.250"). This is the first thing a learner sees. In explore frames the stage is taller and the problem goes away.
- Explore: tapping B ×0.5 pulls the dots together and moves the "centre" line off "truth". Bias −0.25, spread 0.25, error 0.125, so the error halves. ×0.2 squeezes the dots tighter, but the centre is far off: bias −0.40 and error up to 0.170. The slider at ×0.30 gives 0.145. Both halves of the trade-off are on stage: the cluster gets tighter while the centre drifts away.
- Where it is thinnest: the readouts are long-run numbers, but the 40 dots are only a sample. A beginner cannot see "error" in the dots the way bias and spread can be seen. The rule error = bias² + spread² appears only in the reveal. The learner can check it with on-stage numbers (0.25² + 0.25² = 0.125), but is not invited to.
- Reveal: it answers the question I had, and every number it uses was seen. "Here the best factor is exactly 0.5" is told, not shown: the learner tried 1, 0.5, 0.3 and 0.2, so 0.5 is only the best of those. Values like 0.4 and 0.6 are reachable on the slider but not required.

## 2. Earlier findings (v1 review)

1. A's numbers were never seen, so 0.250 vs 0.125 was told: **fixed**. The A baseline is on the locked stage and in a caption that persists through explore.
2. Squared error was undefined: **fixed** in the stem ("the miss, squared, averaged over many tries"). The bias² + spread² rule is still reveal-only (minor).
3. "Best factor is exactly 0.5" was told: **not fixed** (minor).
4. The locked-stage caption overlapped the buttons: **not fixed**. It still overlaps, and the readout chips are now also clipped.

## 3. New findings

- Should fix (layout, for the builder and QA): in the predict frame, the caption is under the A/B/×0.2 buttons and the readout chips are cut off. This does not block the idea, but it is the first frame.
- Minor: add a tap at ×0.4 or ×0.6 to the gate, or soften "exactly 0.5" to "near 0.5 (try it)".
- Minor: "noise sd 1" could be "noise of about ±1".
- No FATAL. The trade-off (tighter cluster, drifting centre, error down then up) is visible on stage without being told.
