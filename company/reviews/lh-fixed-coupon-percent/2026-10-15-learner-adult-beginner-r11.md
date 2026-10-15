*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-fixed-coupon-percent
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Find the crossover of fixed and percentage discounts.)
Screenshots seen: yes (artifacts/walkthroughs/lh-fixed-coupon-percent/sheet.png, recorded 2026-10-15T21:32, build f1832fa, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "20% off"; tapped Test A, Test B; slid Basket €20 to €22; opened reveal.

1. **The prediction is genuine.** "20% sounds bigger than €5" is a real beginner pull, and at €20 it is wrong (€16 versus €15). The hook says they "cross over" somewhere but does not say which side €20 is on.
2. **The stage makes the comparison checkable.** (20×0.8) and (20-5) are readable to me. Sliding to €22 narrows the gap; I can see the two deductions heading toward each other.
3. **Where my boundary stops (minor).** "Full scale: €35" is jargon; €17.6 should be €17.60. The receipts are identical pictures and carry no information.
4. **Does the reveal answer my question?** Yes: the percentage grows with the basket and the fixed amount does not; they match at €25 because 20% of €25 is €5. That tells me when to choose which.

Notes (for the builder, not blocking):
- Two-decimal money; plain words for "Full scale".

Verdict reason: the prediction tests a real pull and the reveal gives the crossover rule from what the stage showed.

## After reading the brief (meta.json)

- Objective: find the crossover of fixed and percentage discounts. Delivered: the reveal names €25 and why. The walk stopped at €22; a learner sliding further would see the crossover on stage.
- Notes route: demo-builder; not blocking.
