*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): choose-the-metric-first
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compare waiting and deadline misses for one fixed order.)
Screenshots seen: yes (artifacts/walkthroughs/choose-the-metric-first/sheet.png, recorded 2026-10-15T21:33)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Choose the objective"; tapped Run queue, Swap first; opened reveal.

1. **The prediction is a strawman.** "What is required before calling an order better? Choose the objective / Count visible movement." No adult thinks "visible movement" decides it. I got it right without engaging.
2. **The explore is the good part.** Short-first gives Wait 25m, Late 1; urgent-first gives Wait 35m, Late 0. That is exactly the tension the hook promises: one order is better on one score and worse on the other. I saw it.
3. **Where it first broke: I did not know what "Wait" counted.** 25 and 35 are not obvious from the chart. "Prereq 0" sits there with no prerequisites anywhere on stage. The reveal says "All jobs are ready except for the stated prerequisites", and none were stated.
4. **"More animation is not an outcome" baffled me.** I had not thought animation was an outcome. It reads like an answer to a question nobody asked.
5. **Reveal versus my question.** My question after the explore was "so which order should I use?" The reveal's answer, "it depends which score you care about", is the right one, but it is said abstractly. One line such as "if missing the urgent deadline costs most, go urgent first; if total waiting matters, go short first" would close it.

Fixes (for the builder):
- Ask a real prediction: "Which order is better: short first or urgent first?" and let the two counters show the answer is "it depends".
- Define Wait on stage; remove Prereq and the prerequisite sentence; drop the animation line.

Verdict reason: the prediction is a strawman, and the reveal mentions prerequisites and animation that never appeared while leaving "Wait" undefined, although the 25/1 versus 35/0 trade-off itself lands.

## After reading the brief (meta.json)

- Objective ('compare waiting and deadline misses for one fixed order') is closer to what the stage delivers than the title suggests, and the 25/1 vs 35/0 comparison delivers it. Misconception field is 'Count visible movement', the strawman foil.
- Fix route: demo-builder (prediction, reveal noise).
