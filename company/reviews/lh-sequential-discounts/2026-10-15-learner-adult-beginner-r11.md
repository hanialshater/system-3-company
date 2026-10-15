*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-sequential-discounts
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Calculate sequential discounts from the reduced base.)
Screenshots seen: yes (artifacts/walkthroughs/lh-sequential-discounts/sheet.png, recorded 2026-10-15T21:32:08.752Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Sequential" (wrong); tapped Test A, Test B; slid Original 100 to 110; opened reveal.

1. **Where understanding first broke: the receipt pictures.** Both receipts are drawn identically (same dashed lines, same orange dot at the same height) even when A is €72 and B is €70. The picture does not show the second discount acting on a smaller base, which is the whole idea. I learned it from the numbers and the printed expressions "(100×0.8×0.9)" vs "(100×0.7)", not from the stage.
2. **What the prediction felt like.** Genuine. "20% then 10% must be 30%" is my real instinct, and the question is fair (which final price is lower). I picked Sequential and was wrong, which is the point.
3. **Whether the reveal answered my question.** Yes. "The second percentage acts on what remains ... 0.8 × 0.9 leaves 0.72, not 0.70" answers "why isn't it 30%?" directly, and the 110 example confirms the gap stays.
4. Small things: "Full scale:€108" is unexplained (why 108?); the slider reads "100€" while cards read "€72". Mixed currency placement.

Verdict reason: the trap is real and the reveal resolves it; the receipts not showing the base change is a note for the builder, not a blocker, because the expressions carry the idea.

## After reading the brief (meta.json)

- Objective "calculate sequential discounts from the reduced base" is delivered through the printed expressions and the reveal's 0.8 × 0.9 = 0.72 sentence.
- Note for demo-builder: the receipt pictures are identical for A and B, so the stage picture carries none of the reduced-base idea; "Full scale:€108" is unexplained; currency symbol placement differs between slider and cards.
