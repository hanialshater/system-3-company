*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: noisy-compass
lesson version: v1
boundary: adult beginner; knows averages smooth out noise, has heard "standard deviation" but cannot compute one; no ML.
Screenshots seen: yes (sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact

- First idea I didn't have: "gradient" and "sd". The question glosses sd as "spread", and the stage turns "gradient" into "slope estimate" with a green true-slope line, which is enough. Choosing between 0.25 and 0.0625 is a guess for me; the real beginner pull is "1" or "divide by 16", and both traps are offered. Fair.
- Explore shows it well: 30 dots collapse onto the true-slope line as batch goes 4 → 16 → 64; readout 0.58, 0.23, 0.13.
- Told-not-shown: "sd 1.18 at batch 1" appears only in the reveal; the batch-1 readout was "–" at lock and I never returned to it. Also 1.18 vs the stated "sd 1" may make a beginner think the toy is off; one clause ("30 dots wobble around 1") would help. "1 divided by the square root of the batch size" is told; the readouts roughly fit it.
- Layout: the vertical position of dots is meaningless jitter, not labelled; fine. In the reveal the chart shrinks to small type. Batch 64 wraps onto its own row.
- Reveal answers my question; "16 times the work buys 4 times the steadiness" is the line I would remember.

## 2. After reading the brief

- Learner field (knows gradient descent uses estimated slopes) is above my boundary; still reachable.
- Suggested fix (minor): show the batch-1 spread on the readout from the start of explore; note that the vertical scatter is only for visibility.
