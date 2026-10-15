*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): reserve-an-unassigned-slot
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Recognise that spare calendar capacity is an explicit resource.)
Screenshots seen: yes (artifacts/walkthroughs/reserve-an-unassigned-slot/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "A free 10-minute interval"; tapped Test plan, Reserve ten minutes; slid Start to 42; opened reveal.

1. **Where understanding first broke: I end on a broken plan and am told my prediction held.** "Reserve ten minutes" moves admin to 40–60 and the call to 60–70, which leaves 30–40 free. Good. Then the Start slider moves admin to 42–62 while the call stays at 60–70. The stage reports "Overlap 2m; Finish 70m", and the reveal opens "Your prediction held. Your layout has 2 overlapping minutes and ends at minute 70." For one person, an overlap means the plan is impossible as drawn, and the call cannot end at 70. The lesson says nothing about this.
2. **The free slot is never used.** The hook is about fitting "an extra ten-minute task". No unplanned task ever appears or drops into the 30–40 gap, so I never see slack absorb something.
3. **The cost of slack is shown but not named.** The finish moves from 60 to 70 when I reserve the slot, which is the honest trade-off. The reveal does not mention it.
4. **The prediction answers itself** ("A free 10-minute interval" vs "A fully booked hour" for "what can accommodate a 10-minute task").
5. Reveal caveat ("Slack is unused time in this fixture, not evidence that the day will stay predictable") is good.

Fixes (for the builder):
- Add an "Unplanned task arrives" step that lands in the gap, or pushes everything later when there is no gap.
- When overlap > 0, do not report a normal finish. Flag the conflict in the stage and in the reveal.
- Name the 60 → 70 cost in the reveal.

Verdict reason: the slider produces an overlapping, impossible plan that the reveal endorses ("your prediction held ... ends at minute 70"), and the reserved slot never receives a task.

## After reading the brief (meta.json)

- The objective is "Recognise that spare calendar capacity is an explicit resource." The reserved gap appears, but it never absorbs a task, and the slider can end on an overlapping plan that the reveal endorses (finding 1).
- The same overlap-but-normal-finish behaviour is in one-person-two-jobs (r11). It looks like a shared schedule component. Route: demo-builder.
