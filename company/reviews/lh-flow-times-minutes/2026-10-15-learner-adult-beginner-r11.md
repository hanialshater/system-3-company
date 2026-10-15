*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-flow-times-minutes
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Convert a constant flow rate and duration into volume.)
Screenshots seen: yes (artifacts/walkthroughs/lh-flow-times-minutes/sheet.png, recorded 2026-10-15T21:34, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "6L/min"; tapped Test A, Test B; slid Minutes 4 to 6; opened reveal.

1. **Where understanding first broke: the question removes the thing the hook is about.** The hook says a flow rate "is not the final volume until duration joins it", but the question gives both flows the same four minutes. With equal time, the faster flow obviously gives more, so duration never matters to my answer.
2. **What the prediction felt like.** No stakes: 3L/min for four minutes is less than 6L/min for four minutes. I picked "6L/min" only because the walk forced option 1.
3. **The stage is clear.** The two jugs fill to different levels; (6×4) and (3×4) are readable. Moving the slider changes both together, so the ratio never changes; it confirms rather than explores.
4. **Does the reveal answer my question?** It states volume = rate × minutes, which I already knew going in. The idea the hook promises (a rate alone does not tell you the volume) needs a case where the slower flow runs longer, and there is none.

Fixes (for the builder):
- Give the flows different durations (for example 6L/min for 2 minutes versus 3L/min for 5 minutes) so the higher rate is not automatically the larger volume.

Verdict reason: with equal durations the prediction has no plausible wrong answer, so the hook's idea (duration matters) is never tested.

## After reading the brief (meta.json)

- Objective: convert a constant flow rate and duration into volume. The stage does the conversion, but with equal durations the prediction tests only which rate is higher (finding 1); duration never decides anything.
- Fix route: demo-builder (unequal durations in the question).
