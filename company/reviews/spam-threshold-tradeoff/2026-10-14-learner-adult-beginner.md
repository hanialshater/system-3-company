*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: spam-threshold-tradeoff
lesson version: 1
Screenshots seen: yes (sheet.png, 3 frames)
boundary: an adult who uses email and a spam folder; has never heard of thresholds, precision or recall.

## 1. From the artifact

- Prediction: the hook ("Lowering the bar catches more spam. What else does it catch?") all but states the answer, and the question is a wall of ten scores to hold in my head. I chose "more spam and more real mail" from the hook alone. "Your prediction held" did not test anything.
- Where understanding first broke: the gate. One slider move to 0.60 (up, not down) unlocked "Show me why". I never visited 0.25, the threshold the question is about. The reveal then reports "At 0.25: all 5 spam caught, but 3 real emails flagged" as told text. The single most important state of the lesson can be skipped.
- Stage itself is good: two rows of dots (spam, real mail) on one score axis, a purple flagged region right of the line, flagged dots ringed. The overlap (spam 0.3 sits left of real 0.6 and 0.4) is visible and is the right picture for "no threshold is perfect".
- Told-not-shown: "Recall ... precision ..." arrives in the last line as new jargon; acceptable as a footnote, but it is not on the stage.
- Layout: dots and labels are small on a phone (score labels inside 0.1-0.4 dots are hard to read); no clipping.
- Fix suggested: require the threshold to reach 0.25 (and, as the panel says, pass 0.6) before unlocking; make the prediction less leading (e.g. ask how many real emails are flagged at 0.25: 1 / 2 / 3); enlarge dot labels.

## 2. After reading the brief

- Objective: with overlapping scores, moving the threshold trades missed spam for false alarms; the choice is about which mistake costs more. The overlap picture supports it, but the trade is only shown if the learner drags both ways, which the gate does not require. The brief lists precision/recall as not known; the reveal introduces them in one line, which is fine as a name but not taught.
- Claims: 4, all verified; I cannot vouch for them.

Verdict: revise
