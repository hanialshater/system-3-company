*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-split-order-fixed-fee
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Separate per-order charges from per-item costs.)
Screenshots seen: yes (artifacts/walkthroughs/lh-split-order-fixed-fee/sheet.png, recorded 2026-10-15T21:32:25.402Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Split" (wrong); tapped Test A, Test B; slid Orders 2 to 4; opened reveal.

1. **Where understanding first broke: card B hides the fee.** Card A prints "(24+(4×2))", so I can see two fees. Card B prints just "28", so I cannot see that the combined order still pays one €4 fee; I have to work out 28 − 24 myself. The reveal then says "count how many times each line is charged", but the stage never shows B's line count. The receipts are drawn identically too (same dashes, same dot), so the picture does not show one fee line vs two.
2. **What the prediction felt like.** Thin. With the title "One fixed fee per order" and a hook saying "a fee repeats", Combined is close to given away; I chose Split only on the walk script. A real beginner would mostly get this right without thinking.
3. **Whether the reveal answered my question.** Partly. "A fixed fee repeats with each order" is the answer, but because B never shows "24+4×1", the reveal's "count how many times each line is charged" points at something not on stage.

Verdict reason: card B's expression ("28") and the identical receipts hide the single fee the reveal asks me to count; show "24+(4×1)" and fee lines on the receipts.

## After reading the brief (meta.json)

- Objective "separate per-order charges from per-item costs": the reveal names it, but card B shows "28" instead of the per-order structure, so the separation is shown for A only (finding 1).
- Fix route: demo-builder (card B expression "24+(4×1)"; receipts that draw one fee line per order). Category manager may also want to consider whether the title gives the answer away.
