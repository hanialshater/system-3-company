*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): arrival-is-not-departure
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compute a departure block ending at the required arrival.)
Screenshots seen: yes (artifacts/walkthroughs/arrival-is-not-departure/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Minute 20"; tapped Test plan, Move departure; slid Start to 22; opened reveal.

1. **Where it first broke: the hook.** "A twenty-minute trip for a minute-forty arrival has a latest departure." I had to reread "minute-forty arrival" twice. Real people say "I need to be there at 9:40", not "minute forty".
2. **The prediction is a subtraction with one silly foil.** 40 minus 20 is 20; "Minute 40" means leaving at the time you are due. As an adult I would never pick it, so the prediction felt like a test of whether I could subtract, not a belief. The everyday mistake (forgetting parking, walking from the car, the lift) is not offered.
3. **The stage words are internal labels.** "Overlap", "Due40", "Test plan", "Move departure", and the panel's "inspect what changes in the fixture". "Fixture" means nothing to me. "Overlap 10m" took a moment: it means the travel block runs into the visit block, which is legible from the chart once I saw it.
4. **The reveal confused me after I moved the slider.** I had predicted 20 and it said "Your prediction held", then immediately "Your layout has 2 overlapping minutes ... The first task extends 2 minutes beyond its minute-40 deadline". That reads like I failed. It is describing where I left the slider (22), not my prediction. "Ends at minute 75" is irrelevant to the question.
5. **Reveal versus my question.** The general rule is stated ("Start equals arrival minus journey duration") and the traffic caveat is honest. But the rule is the thing I already knew, so the lesson adds nothing for me beyond a chart of it.

Fixes (for the builder):
- Use clock times (9:40, 20-minute trip) and offer a tempting wrong answer that people actually make (e.g. forgetting the walk from the car park, or leaving at the arrival time minus the drive only).
- Rename Overlap/Due40/fixture in plain words; make the reveal separate "your prediction" from "where you left the slider".

Verdict reason: the prediction is trivial subtraction with no plausible wrong answer, and the reveal reports the learner's last slider position as a failure right after "Your prediction held".

## After reading the brief (meta.json)

- The brief's misconception field is just 'Minute 40', the foil option, not a belief people hold. That confirms finding 2: there is no real misconception behind the prediction.
- Objective (compute a departure ending at the arrival) is delivered, but it is within what the learner field already says this learner can do (compare simple counts).
- Fix route: demo-builder (prediction, labels, reveal wording).
