*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-coverage-whole-cans
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Distinguish continuous material need from indivisible container purchases.)
Screenshots seen: yes (artifacts/walkthroughs/lh-coverage-whole-cans/sheet.png, recorded 2026-10-15T21:37:40.072Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Whole containers"; tapped Test A; Test B; slid Area 10 -> 12 m²; opened reveal.

1. **The prediction tests nothing.** "Which volume is larger, whole containers or exact need?" Rounding up to whole 1 L tins is always at least the exact need. The hook already says "Fractional need is not a whole-container order".
2. **Where understanding first broke: "ceil((10÷8))".** I do not know "ceil". The reveal says "rounds that result up", which I do understand; the stage should say that.
3. **The interesting moment is missing.** The useful thing to see is the jump: at 16 m² you need 2 tins exactly, at 17 m² you suddenly need 3. Going 10 -> 12 m² kept the order at 2, so the slider showed nothing new.
4. The tin drawings fill to the right levels (2 L vs 1.25 L), which is a nice touch.
5. Honest hedges ("ignores surface losses ... not actual application instructions"). The real-world catch (labels overstate coverage, buy a margin) is out of scope and the lesson says so.

Verdict reason: the question asks whether rounding up gives more (always yes) instead of how many tins to buy, so there is no real prediction, and the rounding jump is never shown.

## After reading the brief (meta.json)

- Objective "distinguish continuous material need from indivisible container purchases" is shown as numbers, but the prediction is decided by the definition of rounding up (finding 1).
- Fix route: demo-builder (ask "how many 1 L tins for 17 m²?"; show the 16 -> 17 m² jump; "round up" not "ceil").
