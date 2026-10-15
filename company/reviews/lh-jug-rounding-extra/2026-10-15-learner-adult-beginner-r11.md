*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-jug-rounding-extra
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Compute excess created by rounding a volume to coarse increments.)
Screenshots seen: yes (artifacts/walkthroughs/lh-jug-rounding-extra/sheet.png, recorded 2026-10-15T21:34, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Exact"; tapped Test A, Test B; slid Cups 5 to 7; opened reveal.

1. **Where understanding first broke: why round to whole litres at all?** The question says "compare exact total volume with that total rounded up to whole litres", but nothing says why anyone would round up (a jug that only measures whole litres? a kettle?). Without the situation, the comparison is an exercise, not a life hack.
2. **What the prediction felt like.** No stakes. A number rounded up is never smaller than the number, and the hook ("can leave a whole-litre fill above the exact requirement") says so first.
3. **"ceil(((5×250)÷1,000))" is outside my boundary.** I do not know "ceil".
4. **The stage itself is clear.** The jugs show 1.25L against 2L; sliding to 7 cups shows the gap shrinking to 0.25L, which is the most interesting thing on screen, and the reveal does not mention it.
5. **Does the reveal answer my question?** It says rounding up "introduces an excess", which I knew. The useful point (the waste depends on how close you are to the next litre) is shown but not said.

Fixes (for the builder):
- Give the situation (for example "your kettle is marked only in whole litres") and ask how much extra you boil at 5 cups (0.25L, 0.75L, 1L).
- Replace "ceil" with "round up"; say in the reveal that the extra shrinks as you approach a whole litre.

Verdict reason: the prediction asks whether rounding up gives more, which no one gets wrong, and the hook states it first.

## After reading the brief (meta.json)

- Objective: compute the excess created by rounding to coarse increments. The excess is visible on stage (0.75L, then 0.25L) but the prediction asks only which is larger, and the reveal never names the excess amount (findings 2, 4).
- Fix route: demo-builder (situation, numeric question, "ceil").
