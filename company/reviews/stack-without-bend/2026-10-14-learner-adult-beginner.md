*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: stack-without-bend
lesson version: v1
boundary: adult beginner (knows a network passes values through layers; can evaluate a straight-line formula; has not met activation functions).
Screenshots seen: yes (sheet.png, phone, 4 frames)

## 1. From the artifact

- Where I first needed an idea I didn't have: "ReLU bend: negative h becomes 0 before layer 2" is on the stage from the first frame, before I know what a bend is for. "ReLU" is never explained beyond that line.
- The prediction is substitution algebra (2(3x + 1) − 5). I could do it; the tempting wrong answer ("two layers are stronger") is there. Fair.
- Explore: sliding x to 2 shows h = 7, y = 9 and the dots sit on a dashed "one layer: y = 6x − 3" line. Then "Bend" on draws a kink at x = −1/3 with a flat segment to the left. The kink is the payoff and it is visible.
- But the bend never changes anything I control: my x stayed at 2, the tile reads "H 7 → 7, Y 9", so switching ReLU on does nothing to my number. The kink is drawn only off to the left of where I was. A beginner may conclude the bend "doesn't matter". The panel should send me to a negative x after turning the bend on.
- The toggle button shows its state ("Bend: off") rather than the action ("Turn bend on"), so it is unclear it is a button.
- Reveal claims "At x = 0, 1, 2 the stack gave −3, 3, 9"; I made one slider move straight to 2.
- Layout: the reveal shrinks the chart to a small, hard-to-read strip (kink label unreadable). No text clipping.

## 2. After reading the brief (version only)

- Version 1, 4 claims shown as checked.

## Fix suggested

After the bend is on, ask for x = −1 and show y differ from 6x − 3 (−5 vs −9); label the toggle as an action; keep the chart readable at reveal; recap only the x values the learner stopped at.

Verdict: launch
