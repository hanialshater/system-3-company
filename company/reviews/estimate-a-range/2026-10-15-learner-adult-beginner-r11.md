*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): estimate-a-range
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Stress-test a schedule at the longer end of an explicit range.)
Screenshots seen: yes (artifacts/walkthroughs/estimate-a-range/sheet.png, recorded 2026-10-15T21:36)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Use 25 minutes"; tapped Test plan, Use upper estimate; slid Start to 27; opened reveal.

1. **The prediction is a giveaway.** "Which checks the stated worst duration? Use 25 minutes / Use 15 minutes." The hook said fifteen to twenty-five; the worst is 25. Reading, not believing.
2. **Where it first broke: the write block was 25 minutes from the start.** The lesson is about testing both ends of a range. But "write 0–25" is on stage before I touch anything; I never saw the 15-minute version. "Use upper estimate" did not change the write block at all; it moved the call from 15 to 25. So the button is really "move the call", and the plan the hook warns about (booking the call at minute 15 because writing might take only 15) was never drawn as a plan that works in the good case and breaks in the bad one.
3. **The reveal's sentence admits it.** "The first block is shown at the longer stated duration." Yes, always. So the comparison is between two call times, not two estimates.
4. **After the slider, the reveal reads as a failure.** I slid Start to 27; the call then overlapped the file block by 2 minutes. "Your prediction held" followed by "Your layout has 2 overlapping minutes" is confusing; the overlap is caused by my slider, not my prediction.
5. **Reveal versus my question.** The takeaway ("check overlap at the longer estimate before treating the optimistic one as enough") is the right life hack and is clearly worded. It would land if I had seen the 15-minute plan look fine and the 25-minute version break it.

Fixes (for the builder):
- Start with write at 15 minutes and the call at 15 (looks fine); make the button stretch write to 25 so the overlap appears; then let the learner move the call.
- Separate "your prediction" from "your final layout" in the reveal.

Verdict reason: the stage never shows the optimistic 15-minute plan, so the contrast between the two ends of the estimate, which is the lesson, is not shown, and the prediction is answered by the hook.

## After reading the brief (meta.json)

- Objective: 'Stress-test a schedule at the longer end of an explicit range.' The stage only ever shows the longer end; a stress test needs the optimistic plan first (finding 2).
- Misconception field is 'Use 15 minutes', the foil label.
- Fix route: demo-builder.
