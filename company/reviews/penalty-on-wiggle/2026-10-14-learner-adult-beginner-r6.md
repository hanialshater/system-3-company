*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): penalty-on-wiggle
lesson version: v4
boundary: adult-beginner (school-level maths and science; knows a too-flexible curve can overfit and that held-out points check a model; does not know ridge).
Screenshots seen: yes (artifacts/walkthroughs/penalty-on-wiggle/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the title "What a penalty does to the fit" and the hook "...what happens to its miss?" are now neutral. The options are Larger / Stays exactly 0 / Larger on some data, 0 on others; all three are plausible to a beginner. The locked stage shows the curve threading the dots and only "NO-PENALTY HELD-OUT 0.44"; the training and held-out miss boxes read "–". Nothing leaks. The stem is long (about 50 words with the ridge/coefficient gloss), but it reads.
- Explore: one slider nudge and the purple curve leaves the dots (training miss 0.13, held-out 0.41 vs no-penalty 0.44, dashed no-penalty curve behind). "Penalty 10" flattens the curve: training 0.50, held-out 0.72 vs 0.44. "New data" (data set 2) at 10: training 0.72, held-out 0.64 vs 0.58. So the trade (worse on training, better on held-out at a moderate penalty, worse again at 10) is all on stage.
- Reveal: points at what was seen: miss 0 with no penalty, 0.72 at 10 on the current data, the moderate win, the loss at 10 on data set 2. "490 of 500" is told context and is claimed.
- Finding (minor): the reveal says "at penalty **0.0001** on data set 1 you saw 0.41 against 0.44", but the stage the learner last looked at read "Penalty λ 0.001" with 0.41. The slider passed through 0.0001 on the way, so the learner was technically there, but the number they remember is 0.001. Under "earn the reveal" the numbers should match the screen the learner remembers. Quote the stop where the learner stayed, or the last moderate stop, rather than the best of the stops passed through.
- Minor: the reveal frame scrolls the chart mostly off the top; the readouts stay visible.

Told vs shown check (brief): doesNotKnow "penalising large coefficients" is the slider itself; "the cure makes the training fit worse" is the training-miss readout rising from 0 and the curve leaving the dots. The objective's "too strong a penalty loses again" is now a required visit to 10. All shown.

## 2. Earlier findings (r5 review, v3)

1. Title and hook gave away the predict answer: **fixed** (neutral title and hook).
2. "Smaller" was an impossible option: **fixed** (replaced with "Larger on some data, 0 on others").
3. The U-shape (too much penalty loses again) was told: **fixed** ("Penalty 10" is required and the reveal quotes the learner's own visit).

## 3. New findings

- Minor: 0.0001 in the reveal vs 0.001 on stage (above).
- Minor: the predict stem is about 50 words; the gloss could be shorter.
- No FATAL.
