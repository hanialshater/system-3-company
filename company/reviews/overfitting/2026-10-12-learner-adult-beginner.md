*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: overfitting (adult beginner)

Boundary used: remembers school arithmetic, can read a dot graph and an average; has never studied curve fitting, polynomials or machine learning.

## 1. From the artifact (written before reading the brief)

Sources: walkthrough transcript and screenshots, QA phone screenshots, plus my own Playwright run (chose "6 bends", then stepped the slider 1 to 6 one notch at a time, recording the readouts and when "Show me why" unlocks).

**Where understanding first broke.** "Allow up to 6 bends and it passes through all 8." I do not know what a "bend" is in a fitted curve, why 6 bends would hit exactly 8 dots (8 dots, 6 bends: the arithmetic looks arbitrary), or what "fitted" means ("fitted on" in the legend is the first jargon I meet). I can still follow the picture: solid dots are the ones the curve learns from, hollow ones are new. The two readouts, "MISS: SOLID DOTS" and "MISS: NEW DOTS", are plain once I see the first drag.

**Prediction.** It allowed a real guess. Straight line vs. a gentle curve vs. the one that hits everything. The temptation to pick "6 bends (hits all 8)" is real and it is the misconception, so a wrong guess feels natural. With 0 bends showing at lock time, the line visibly misses a lot, which also invites picking the flexible curve. Good. A weakness: the question asks about "the 5 new dots", but the stage at lock-in shows only the line's miss (4.1) with no hint what other settings would score.

**Exploring.** This answers my question directly. Dragging "Bends allowed" 0 to 6, the purple curve visibly goes from flat line, to a smooth arch, to a wild curve that dives off the chart; "MISS: SOLID DOTS" falls to 0.0 while "MISS: NEW DOTS" jumps from 1.6 to 5.1. The status lines ("Now it chases single training dots.", "Through all 8 training dots. Check the new ones.") speak to exactly the moment of discovery. The red stalks from new dots to the curve make the misses visible. Problems:
- Settings 1, 2 and 3 look essentially identical (one arch, 1.5 / 1.6 / 1.6 °C). My slider moves from 1 to 3 and nothing visible happens, so "bends" does not look like it counts bends. A learner may think the control is stuck, or may not learn what a bend is.
- At 6 bends the curve and the biggest stalk (the new dot near 6:30am) run off the bottom of the plot, so the largest miss is clipped and 5.1 °C cannot be checked by eye.
- The line's new-dot miss (4.1) only appears in the readout at 0; the reveal then compares 5.1 with 4.1, a number I had to remember or re-drag.
- The slider was only moved right in the walkthrough; going back, I would need to know to try it.

**Reveal: earned or told?** Mostly earned for the headline: I saw 0.0 on the dots I trained on and 5.1 on new ones, with a curve that obviously looks silly. But the unlock gate is weak: "Show me why" is enabled after a single notch of the slider (I checked: enabled at bends = 1), so someone can reach the reveal without ever seeing the 6-bend state. The explanation "random jitter ... a curve flexible enough to hit every dot learns the jitter too" is TOLD; nothing on stage shows which part of the dots is smooth warming and which is jitter. "Jitter" is not shown separately from the pattern. The last line, "Only data held back from training can [warn you]", is a good takeaway but unillustrated (the stage never says the hollow dots are the held-back data; the legend says only "new").

**Findings (problems):**
1. "Bends" and "fitted on" are unexplained, and bends 1 to 3 look the same on screen, so the control's unit is not legible.
2. The reveal unlocks after one notch of the slider, before the key state (6 bends) has necessarily been seen.
3. The worst misses at 6 bends are drawn off the chart; the 5.1 average cannot be verified by looking.
4. The jitter explanation is told, not shown; the learner is never shown which part of each dot is signal and which is noise.
5. The comparison line (4.1 for the straight line) must be carried in memory from setting 0.
6. On phone there is a large empty band between the chart and the status line, and the stage resizes between explore and reveal, so the picture jumps.
7. A natural follow-up for an adult ("so how many bends should I use, and how would I know?") is answered only as "data held back"; no worked sense of how that is used.

No FATAL flaw found. All readouts agree with what I saw (1.5 / 1.6 / 1.6 / 3.0 / 2.7 / 5.1); the controls respond; the slider is not dead, though 1 to 3 is visually inert.

## 2. After reading the brief

- Intent: dislodge "zero training error = best model"; objective is that a flexible curve hits noisy points yet misses new ones, and only held-out points reveal this. The experience delivers the 0.0 vs 5.1 contrast clearly and matches the intent; this is the strongest part.
- The brief's own boundary says the learner knows measurements are noisy and averages, and does not know training/test sets. The lesson uses "fitted on" and "new" without ever saying "training" or "test", which suits that boundary, but "bends" is never defined even though the polynomial machinery is out of boundary.
- The claim text says the slider is a maximum ("at most d - 1 bends"). That explains why 1 to 3 look identical (the fit does not use the extra allowed bends), but the on-screen label "Bends allowed" with a plain number reads as an exact count. Finding 1 stands as a legibility problem, not an error.
- The data is described as simulated only in the trust sheet (claim c1). The learner reads temperatures as real readings; the reveal's "day's smooth warming plus random jitter" is stated as fact about "each reading". I cannot see that the learner is ever told the dots are made up; this is a candidate honesty issue for the fact-checker, not a fatal flaw.
- All claims are `unverified`; I could not and did not verify them.

Verdict: revise
