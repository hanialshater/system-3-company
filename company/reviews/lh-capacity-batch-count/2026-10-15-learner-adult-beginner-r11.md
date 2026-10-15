*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-capacity-batch-count
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Calculate whole batch counts using a stated usable capacity.)
Screenshots seen: yes (artifacts/walkthroughs/lh-capacity-batch-count/sheet.png, recorded 2026-10-15T21:36:41.739Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Six capacity"; tapped Test A; Test B; slid Objects 20 -> 22; opened reveal.

1. **The prediction is too easy.** "Which needs fewer batches, a six-carrier or an eight-carrier?" The bigger carrier, obviously. The interesting point (a remainder still costs a whole trip, so 20 ÷ 6 = 3.33 means 4 trips) is stated in the hook, not asked.
2. **Where understanding first broke: "ceil((20÷6))".** The working uses "ceil", which I do not know. The reveal says "round up", which I do understand; the stage should say that.
3. **The slider did not show anything new.** Going from 20 to 22 objects left both answers the same (4 and 3). The moment worth seeing is when one more object adds a whole trip (24 -> 25 on the six-carrier), or when both carriers need the same number (12 objects: 2 and 2), which would make "Equal" a real option.
4. The bucket drawings fill to different levels but do not show the last, part-full trip, which is the whole idea.
5. Reveal is clear and the safety hedge (weight, volume, carrying limits) is appropriate.

Verdict reason: the question asks the obvious comparison instead of the rounding-up insight, and the stage never shows a partial last batch costing a full trip.

## After reading the brief (meta.json)

- Objective "calculate whole batch counts using a stated usable capacity": shown as numbers, but the prediction does not test it (bigger carrier always needs no more batches).
- Fix route: demo-builder (ask for the batch count; show a partial last batch; "round up" not "ceil").
