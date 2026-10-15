*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-pay-for-used-quantity
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Distinguish purchase unit price from cost per utilized unit.)
Screenshots seen: yes (artifacts/walkthroughs/lh-pay-for-used-quantity/sheet.png, recorded 2026-10-15T21:36, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Singles"; tapped Test A, Test B; slid Used 5 to 7; opened reveal.

1. **Where understanding first broke: the hook answers the question.** "A ten-pack can have a lower sticker price per piece and a higher cost per used piece" is printed above "If five pieces are used, which cost per used piece is lower?" Without the hook this would be a good trap (€0.40 a piece looks cheaper than €0.50); with it, the answer is given.
2. **The working uses "min".** "(4÷min(5,10))" is outside my boundary. "€4 ÷ 5 used" is all I need.
3. **Units read oddly.** "0.5€/used" and "0.571€/used" instead of "€0.50 per piece used" and "€0.57".
4. **Does the reveal answer my question?** Partly. It says divide by pieces used, giving €0.80 at five. It does not tell me the practical rule I would want after sliding: at 8 used the pack ties with singles (€0.50), and from 9 on the pack is cheaper.
5. The receipts are decorative.

Fixes (for the builder):
- Make the hook a question that does not give the answer.
- Plain working and €0.00 money format; one sentence on the break-even (8 pieces).

Verdict reason: the hook gives away the answer to a prediction that would otherwise be a good trap.

## After reading the brief (meta.json)

- Objective: distinguish purchase unit price from cost per used unit. The reveal delivers it; the hook gives the answer first (finding 1).
- Fix route: demo-builder (hook, working, money format, break-even sentence).
