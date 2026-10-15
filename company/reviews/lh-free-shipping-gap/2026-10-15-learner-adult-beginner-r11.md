*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-free-shipping-gap
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Compare total checkout cost when adding merchandise to reach a shipping threshold.)
Screenshots seen: yes (artifacts/walkthroughs/lh-free-shipping-gap/sheet.png, recorded 2026-10-15T21:34, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Pay shipping"; tapped Test A, Test B; slid Basket €42 to €44; opened reveal.

1. **The trap is real, but the hook springs it for me.** "Add €8 to save €4 shipping" is a common pull, and "Reach €50" is offered. But the subtitle says "Adding an item can remove shipping while raising the total you pay", which is the answer, stated above the question.
2. **Where understanding first broke: the expression under "Pay shipping".** "(42+(4×(1-floor(min(1,(42÷50))))))" is a wall of brackets with "floor" and "min" in it. I cannot read it, and it sits exactly where every other lesson puts the readable working. "max(42,50)" under B is also outside my boundary. Plain "42 + 4" and "42 + 8 of goods" would do.
3. **The numbers themselves are clear.** €46 against €50 at €42, €48 against €50 at €44. The receipts are identical pictures and carry no information.
4. **Does the reveal answer my question?** Yes: removing a shipping line is not the same as lowering the receipt; at €42 shipping makes €46 and reaching €50 adds €8 of goods. It does not say where it flips (at €46 and above, adding goods costs the same or less), which is the practical rule I would want.

Fixes (for the builder):
- Make the hook a question that does not give the answer.
- Replace the formula readouts with "42 + 4 shipping" and "42 + 8 more goods".
- Optionally: one reveal sentence naming when reaching the threshold stops costing extra.

Verdict reason: the hook hands over the answer, and the readout under the first case is an unreadable formula for this learner.

## After reading the brief (meta.json)

- Objective: compare total checkout cost when adding goods to reach a threshold. The comparison is delivered; the hook pre-answers it and the A readout is a formula outside the boundary (findings 1-2).
- Fix route: demo-builder (hook, readout wording).
