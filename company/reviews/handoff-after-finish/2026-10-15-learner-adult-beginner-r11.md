*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): handoff-after-finish
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Schedule a dependent task after its input is ready.)
Screenshots seen: yes (artifacts/walkthroughs/handoff-after-finish/sheet.png, recorded 2026-10-15T21:32:51.067Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "After draft finishes"; tapped Test plan; tapped Wait for handoff; slid Start 25 -> 27; opened reveal.

1. **The hook gives the answer.** "The reviewer cannot start with a draft that has not finished" is printed above "When can review start in this model?" There is nothing to predict; a beginner just copies the hook.
2. **Where understanding first broke: the reveal praises a layout with a new overlap.** After I slid review to 27-42, it now runs into send (40-45): Overlap 2m. The reveal still says "Your prediction held" and "Your layout has 2 overlapping minutes", without saying that this overlap is a problem (send now starts before review ends). That left me unsure whether overlap is fine or not.
3. **"Overlap" changes meaning.** First it measures review overlapping draft (10m), later review overlapping send (2m). The readout does not say which pair.
4. **What I wanted to know is not answered.** Why can't review start on the first part of the draft? The reveal says "this fixture explicitly forbids partial handoffs", which is a rule of the exercise, not a reason. That is honest but it makes the lesson a definition, not an insight.
5. Recall card talks about "10:30" and "11:00"; the stage uses minutes 0-100, no clock times.

Verdict reason: the hook states the answer, and the reveal congratulates a final layout that has a fresh overlap without explaining it.

## After reading the brief (meta.json)

- Objective "schedule a dependent task after its input is ready": the Wait for handoff step shows it. The hook already states it, so the prediction tests nothing (finding 1).
- Recall claim uses clock times 10:30/11:00 not on stage; route to fact-checker.
- Fix route: demo-builder (neutral hook; label which pair overlaps; reveal should flag a non-zero overlap as a problem instead of "prediction held").
