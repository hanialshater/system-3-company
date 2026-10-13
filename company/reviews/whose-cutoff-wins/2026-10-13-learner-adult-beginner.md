*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: whose-cutoff-wins
lesson version: v1
boundary: adult beginner (knows pass/fail cutoffs on a test; has heard "AI bias" in the news; no ML).
Screenshots seen: yes

## From the artifact
- First needed an idea I didn't have: "qualified from 50" in the question; I took it to mean "people at 50 or above should pass". The question is dense (90/10, two thresholds, "spread evenly") for a phone screen, but readable.
- Prediction: fair. "Halfway" is a tempting compromise. The locked stage, though, already shows the cutoff at 30 with two columns of red group-A squares, which hints that 30 is costly before I answer.
- Shown well: a grid of 90 grey A squares and 10 purple B dots on one score axis; at cutoff 50, "A WRONG 0 of 90", "B WRONG 2 of 10", the two red B dots sitting between 30 and 50. The unequal error is visible.
- Told, not shown: the comparison that explains why the cutoff "stays put" (40 fixes 1 B person, breaks 9 A people) is reveal text; the recorded path jumps straight to 50 and never stops at 40. "Let the model learn" is not used in the path.
- Layout: on phone the reveal's last paragraph (the Gender Shades real-world example) is cut off mid-word; the reveal chart shrinks to a thumbnail. The badge reads "70S", longer than the 60-second format.

## Fix suggested
Make the path stop at 40 first (A wrong 9, B wrong 1, total 10) then press "Let the model learn" to land at 50 (total 2); show the starting cutoff at a neutral spot without mistakes coloured until lock-in; fix the clipped reveal; trim to 60 s.

## After reading the brief
Learner field matches. Claims 5/5 checked; 2 in 100 at 50 and 10 at 40 agree with the setup.

Verdict: revise
