*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: twins-never-split
lesson version: v1
boundary: an adult with school-level maths, new to the topic (has heard "neural network" and "training"; does not know gradient descent).
Screenshots seen: yes (sheet.png, 4 frames)

## 1. From the artifact

- Prediction: a little / exactly equal / a lot. First ideas I lacked: "hidden unit", "output weight", "bias", "gradient descent", "loss" — all in the question, none glossed. I predicted on the word "differ" alone. The stem "After 200 steps their weights differ:" followed by "They stay exactly equal" is grammatically odd and flags that option as the twist.
- Shown well: train 200 steps and the solid and dashed lines lie exactly on top of each other (gap 0). After a 0.01 nudge they peel apart to -1.627 and +1.627 (gap 3.254), loss 0.250 -> 0.003. Striking picture.
- Told, not shown: "equal units get equal updates" (the why) and "that is why networks start from random weights".
- Layout: the readout "W1 · W2  -1.627 · 1.627" uses a middle dot that reads as multiplication. Both weights jump from 0.5 to about 0 in the first steps with no comment, which looks odd. Reveal frame shrinks the plot.
- Fix suggested: gloss "unit" and "loss" in one line, use "W1 / W2" or two chips, and reword the stem ("After 200 steps their weights are:").

## 2. After reading the brief

- Intent delivered visually; jargon is the barrier for this boundary.
- Claims in meta.json: 5 verified. I cannot vouch for any of them.

Verdict: launch
