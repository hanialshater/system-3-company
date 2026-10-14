*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): stop-at-epoch-sixty
lesson version: v2
boundary: an adult with school-level maths and science, new to the topic; no trig, no specialist vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/stop-at-epoch-sixty/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: a clear question (where is held-out error lowest: end / early within 100 / step 0) with "flexible, wiggly line" glossed. The locked stage shows the 8 black and 200 grey dots, step buttons 0/100/1,000/20,000, a slider and empty error readouts. The tag "SEED 12 (CHOSEN)" is honest. Nothing leaks.
- Explore: 100 gives training 0.204 / held-out 0.320; 1,000 gives 0.177 / 0.486; 20,000 gives 0.170 / 0.693. A small chart of both errors against steps appears after the first tap: the red held-out line dips and climbs while the dashed training line keeps falling. The chart is what carries the idea, and it reads at a glance.
- Reveal: names 0.320 at step 100 and 0.693 at 20,000 (both seen) and gives an explanation (broad shape first, then noise) plus a 483/500 seeded-runs figure, which is told.
- Finding (moderate): "Later it bends to pass through the noise in its 8 training dots" is not visible. From step 100 to 20,000 the purple curve barely changes, except for a downturn at the far left where there are no training dots, and training error only falls from 0.204 to 0.170. It never visibly threads the black dots. The numbers show overfitting, but the picture does not show the cause the reveal names. A learner may take the "why" on trust.
- Finding (minor): the "Show me why" gate opens after 1,000, before 20,000 has been tried. A learner who reveals then reads "By step 20,000 it had climbed to 0.693" as told, not seen. 1,000 alone (0.486 > 0.320) still refutes "At the end", so this is not blocking.
- Finding (minor): whether 100 is truly the minimum, or just the lowest of the four buttons, cannot be told from the chart at phone size. The marker at 100 sits near the bottom of the dip, but the key "within the first 100 steps" depends on it.
- Finding (minor): the chip says 3/4 claims checked.

## 2. Earlier findings (v1 review)

1. "Degree-7 curve" and "held-out" were unglossed: **fixed** ("a flexible, wiggly line"; "200 held-out dots it never trains on").
2. Key "Early, before step 100" disagreed with the minimum at step 100: **fixed** ("Early, within the first 100 steps").
3. Told-not-shown "bends to pass through the noise"; the curve looks the same at 100, 1,000 and 20,000: **not fixed**. It is still the main gap (section 1).
4. Phone reveal clipped at the takeaway: **fixed** (the takeaway line is visible).
5. No error-vs-steps curve, so the dip was not seen: **fixed**. The two-line chart shows the dip and the climb.

## 3. New findings

- The main idea (training error keeps falling while held-out error turns and climbs, so stop early) is now on the stage. The mechanism is still told. Recommended: make the late curve visibly wiggle through the black dots, or show training error near zero at 20,000.
- Minor: the gate opens before 20,000 is tried.
- No FATAL.
