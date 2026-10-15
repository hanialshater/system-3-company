*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-voucher-minimum
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Apply a discontinuous minimum-purchase rule accurately.)
Screenshots seen: yes (artifacts/walkthroughs/lh-voucher-minimum/sheet.png, recorded 2026-10-15T21:34:09.621Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "No-voucher lower" (wrong); tapped Test A, Test B; slid Basket 28 to 30; opened reveal.

1. **Where understanding first broke: card B's expression.** "(28-(5×floor(min(1,(28÷30)))))" is unreadable to me. "floor" and "min" are spreadsheet words, and the panel tells me to "compare the displayed expressions". This is the one place the stage should show the rule ("28 is under 30, so no €5 off"), and it shows code.
2. **What the prediction felt like.** Given away. The hook says "A €5 voucher can leave a small basket unchanged", and the question states the rule (only when the basket is at least €30) and the basket (€28). "Equal" follows from reading. "No-voucher lower" is not a believable outcome for anyone.
3. **Whether the reveal answered my question.** It restates the threshold in plain words, which is fine. Moving to €30 and seeing €25 is the one moment with any interest.
4. Picture: identical receipts again.

Verdict reason: the hook and question give the answer, and card B's expression uses floor/min instead of words; ask something a shopper gets wrong (e.g. whether adding a €2 item to reach €30 lowers the bill) and show the rule in words.

## After reading the brief (meta.json)

- Objective (checking eligibility before applying a deduction) is told in the hook and the question, so the prediction does not test it.
- Fix route: demo-builder (prediction that tempts a wrong answer; card B in words, not floor/min).
