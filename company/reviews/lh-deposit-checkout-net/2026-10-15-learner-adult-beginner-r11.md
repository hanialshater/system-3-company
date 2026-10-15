*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-deposit-checkout-net
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Separate upfront deposits from net cost after a stated full refund.)
Screenshots seen: yes (artifacts/walkthroughs/lh-deposit-checkout-net/sheet.png, recorded 2026-10-15T21:32, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "After return"; tapped Test A, Test B; slid Containers 4 to 6; opened reveal.

1. **Where understanding first broke: the hook answers the question before I predict.** The line under the title says the deposit "changes checkout cash without changing the modeled net price". The only tempting wrong answer for me is "Equal" (the deposit comes back, so it is the same cost). The hook has already ruled that out, so the prediction becomes reading the subtitle, not committing a belief.
2. **What the prediction felt like.** With "Equal" gone, "Checkout" is obvious: €2.40 plus €0.25 must be more than €2.40. I picked "After return" only because the walk forced option 1; a real beginner would not.
3. **The stage shows the two moments clearly.** The receipts and the expressions (2.4×4) and (2.65×4) make the difference visible, and the slider keeps the gap at €0.25 per container. Money is printed as €9.6 and €10.6 instead of €9.60 and €10.60, which reads like a typo on a price.
4. **"Full scale: €26.5" is not a phrase I understand.** It sits under the readouts on every frame and looks like a number I am meant to use.
5. **Does the reveal answer my question?** Yes for "which is higher": checkout includes the deposits, the return takes them back. It does not say in plain words what the title promises, that the net cost is still €2.40 each.

Fixes (for the builder):
- Rewrite the hook so it asks rather than tells (for example "You get the deposit back. Does it change what you pay?").
- Show money to two decimals; replace "Full scale" with plain words or drop it from the learner's view.
- Add one reveal sentence: "Your net cost is still €2.40 an item."

Verdict reason: the hook gives away the answer, so the one plausible wrong guess ("Equal") is never really at stake.

## After reading the brief (meta.json)

- Objective: separate upfront deposits from net cost after a full refund. The stage delivers the separation, but the hook states it before the prediction (finding 1), so the learner never commits to the confusion the objective targets.
- Fix route: demo-builder (hook wording, money format, one reveal sentence on net cost).
