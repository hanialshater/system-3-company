*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): confident-and-wrong
lesson version: v3
boundary: adult with school maths; knows percentages; has heard "AI is confidently wrong"; ln is a calculator button at best.
Screenshots seen: yes (artifacts/walkthroughs/confident-and-wrong/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "How much does a sure mistake cost?" with the hook "How much does a model pay for being sure and wrong?" The question gives two anchors (100% → 0, 50% → 0.69) and asks for 1%. It is neutral. The locked stage shows only the dot at 50% with penalty 0.69 and the curve hidden, so nothing leaks. One catch: "the ln key on a calculator" invites a learner with a phone calculator to type ln(100) and get 4.6. That turns it into a calculator exercise rather than a prediction. Most learners won't, and the options (1.4 linear-ish doubling, 4.6, 50) still split intuitions well.
- Explore: "Halve the chance" moves the dot 50% → 25% and prints "50% → 25%: each halving adds 0.69". The 10% and 1% buttons and the slider move the dot along a curve that is obviously steep at the left edge. The "× the 50% penalty" readout (2.0, 3.3, 6.6, 5.1 at 3%) is a good ruler. A beginner sees the penalty go 0.69 → 2.30 → 4.61 and the curve shoot up toward 0%. That is the idea, and it comes from the stage.
- Reveal: "Not quite: it was 4.6." The numbers quoted (0.69, 2.30, 4.61, 6.6×) were all seen. The halvings argument ("1% is about 6.6 halvings away, so it costs 6.6 times the first one") is told, not seen. The learner saw one halving, and the gate opened without any more. The reveal hedges this with "The step should repeat", which reads as an ask to take it on trust. "It never levels off" is supported by the curve's shape, but only up to the 8 on the y-axis.

## 2. Earlier findings (r2 review, v2)

1. **Revise:** the reveal said "You saw each halving add the same 0.69" but the gate needs only one halving. **Fixed by softening**: the reveal now says "You saw one halving... The step should repeat." That is honest. The gate is unchanged, so the rule is still asserted rather than seen (see new finding 1, now minor).
2. ln undefined: still partly fixed. The calculator gloss and anchors are adequate.
3. "No ceiling" told: still minor. The curve's steep left edge carries most of it.
4. Real-training claim: still fixed. 5. Hook leak: still fixed.

## 3. New findings

1. Minor: the "halving" story is only half on stage. The gate opens after one halving, so "each halving adds 0.69" rests on a single example, and "6.6 halvings away" is a count the learner never makes. The fix belongs to the builder (for example, require 2 or 3 halvings, or show the halving count next to "× the 50% penalty"). The core idea still lands without it: sure-and-wrong costs far more, and the curve keeps rising.
2. Minor: in the reveal frame the stage is scrolled so the top of the curve and the dot at 3% are cropped. Not harmful, since the readouts are visible.
3. Minor: "the ln key on a calculator" lets a learner compute the answer instead of predicting it.
4. No FATAL.
