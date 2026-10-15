*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): one-person-two-jobs
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Detect simultaneous bookings for one constrained resource.)
Screenshots seen: yes (artifacts/walkthroughs/one-person-two-jobs/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One"; tapped Test plan, Separate jobs; slid Start to 22; opened reveal.

1. **Where understanding first broke: the overlapping plan still reports a finish.** "Test plan" shows "Overlap 15m · Finish 35m". The lesson's own point is that one person cannot do the overlapping minutes. Then 35 is not a real finish time; the real one is 50, which "Separate jobs" shows. The stage presents 35 as a result with the same weight as 50, so the cost of the illusion (15 minutes of work that cannot happen) is never named. At Start 22 the same thing happens again: "Overlap 2m; Finish 50m", although write runs to 42 and the call cannot start until then, so the real finish is 52.
2. **The prediction is decided by the question's wording.** "How many blocks can one person do simultaneously in this model?" answers itself ("one person"). The real beginner error is not believing two pairs of hands exist. It is trusting a calendar that shows the jobs on separate rows. The question does not test that.
3. **The reveal does not answer my question.** I wanted to know how long my plan really takes. The reveal says "2 overlapping minutes and ends at minute 50" and "separate rows do not create extra capacity", but never says that an overlap means the plan is late by that much.
4. The "Start" slider moves only the write block, and only "Separate jobs" moves the call. Fine, but the slider's label does not say which block it moves.

Fixes (for the builder):
- When overlap is above 0, show the true finish (overlap pushed later), or label the finish "impossible as drawn".
- Ask the prediction about the plan ("Does this plan finish at 35?"), not about the model's rule.

Verdict reason: the lesson shows an overlapping plan's finish time as if it were real, which is the very illusion it means to undo.

## After reading the brief (meta.json)

- The objective is "Detect simultaneous bookings for one constrained resource." Detection works (the overlap counter). But the finish time stays at the impossible value (finding 1), so detecting the overlap has no visible consequence.
- Trust-sheet claim c3 talks about "10:30–11:00 booked twice". The stage uses minutes 0–100, not clock times, so a learner who opens the sheet sees a time that is not on stage. Route: fact-checker / demo-builder.
- Fix route: demo-builder (true finish under overlap; question wording).
