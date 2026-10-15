*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): meeting-and-preparation
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Schedule preparation before a dependent live task.)
Screenshots seen: yes (artifacts/walkthroughs/meeting-and-preparation/sheet.png, recorded 2026-10-15T21:36:50.133Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Prepare then present"; tapped Test plan, Move preparation; slid Start 0 to 2 min; opened reveal.

1. **Where understanding first broke: the reveal says I was right while my plan is broken.** After the slider moved preparation to 2–22, the stage showed 2 minutes of overlap with the 20–35 presentation, and the reveal opened with "Your prediction held. Your layout has 2 overlapping minutes". It praises the answer and reports a failing plan in the same breath, without saying that 2 minutes of overlap means preparation did not finish in time.
2. **What the prediction felt like.** None. "Prepare then present" vs "Prepare during presentation" for "which makes preparation finish first?": the answer is in the wording.
3. **The stage numbers do not help.** "Finish 45m" never changes, so it carries no information. The axis runs 0–100 minutes while everything happens in 0–45, so the blocks are small and the overlap is hard to see. "Test plan" and "Move preparation" are unclear names; "Move preparation" jumped prep to 0 without my choosing.
4. **Whether the reveal answered my question.** "A shared calendar must include the prerequisite, not only the visible event" is the useful idea, but the lesson never shows the calendar a colleague would see (only the presentation booked).

Verdict reason: the reveal says "prediction held" over a layout with overlap and does not flag it, and the prediction cannot be got wrong; make the reveal respond to the overlap and show what the calendar looks like when prep is missing.

## After reading the brief (meta.json)

- doesNotKnow "schedule preparation before a dependent live task": the stage shows overlap, but the reveal does not respond to the learner leaving an overlap in place (finding 1).
- Fix route: demo-builder (reveal conditional on overlap; drop the constant "Finish" readout or make it meaningful; axis range).
