*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): spam-threshold-tradeoff
lesson version: v2
boundary: an adult who uses email and a spam folder; knows a model can give each email a score; has never heard of thresholds, precision or recall.
Screenshots seen: yes (artifacts/walkthroughs/spam-threshold-tradeoff/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the hook ("Move the bar and see who gets flagged") is neutral now. The question asks for a number (real emails flagged at 0.25: Still 1 / 2 / 3). "Still 1" is the tempting wrong answer for someone who thinks lowering the bar only adds spam. The locked stage shows the dots and the bar at 0.50, so a careful reader can count the answer (0.4 and 0.3 join 0.6). That is fine here: the counting is the insight, because the 0.3 spam cannot be reached without passing real mail.
- Explore: "Try 0.25" gives 5 of 5 spam and 3 of 5 real, with the caption "More spam caught, and more real mail flagged." "Try 0.65" gives 3 of 5 and 0 of 5, "Fewer false alarms, but more spam gets through." "Show me why" stays locked until both are visited. The two rows of dots on one score axis, with the flagged region shaded, make the overlap the thing you look at.
- Reveal: it answers my question (why 3?) by naming the overlap I had just seen, then frames the choice as which mistake costs more. I got "no bar is perfect here; each one trades one mistake for the other" from the stage before reading it.

## 2. Earlier findings (v1 review)

1. Hook all but stated the answer: **fixed**.
2. Gate skippable; 0.25 never visited: **fixed** (both 0.25 and 0.65 are required).
3. Prediction was a wall of scores with a qualitative answer: **fixed** (now a count, 1 / 2 / 3).
4. Precision/recall arrive as a told footnote: **not fixed** (still one grey line; 5/8 precision never appears on stage).
5. Dot labels small on a phone: **not fixed** (labels inside the 0.1-0.4 and pale unflagged dots are still hard to read).

## 3. New findings

- Minor: precision and recall are in the brief's "does not know" list but are only named in the last line. If the lesson is meant to teach them, a "precision" readout (flagged that are spam) beside the two counts would show 4/5 → 5/8 on stage. As a name for the trade-off, the footnote is acceptable.
- Minor: the pale (unflagged) dots have low-contrast labels.
- No FATAL.
