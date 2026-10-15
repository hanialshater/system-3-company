*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-round-snack-packs
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Round purchases to whole packs and compute excess quantity.)
Screenshots seen: yes (artifacts/walkthroughs/lh-round-snack-packs/sheet.png, recorded 2026-10-15T21:37, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Purchased"; tapped Test A, Test B; slid Guests 7 to 9; opened reveal.

1. **Where understanding first broke: the prediction asks less than the hook.** The hook asks "how much extra appears?" (a number: 9). The question asks which is larger, the purchased count or the required count. If packs cannot be split, you buy at least what you need, so "Purchased" is obvious.
2. **What the prediction felt like.** No stakes. The interesting mistakes (buying 2 packs because 21 ÷ 10 = 2.1, or expecting no extra) are never on the table.
3. **The working uses "ceil".** "(10×ceil(((3×7)÷10)))" is outside my boundary.
4. **The stage has one good moment.** Sliding to 9 guests keeps 30 purchased while required rises to 27, so the extra shrinks to 3. The reveal does not mention it.
5. **Does the reveal answer my question?** It gives the rule (work out the need, divide by pack size, round up). It never states the answer to the hook's question ("9 extra").

Fixes (for the builder):
- Ask "How many packs?" (2, 2.1, 3) or "How many extra items?" (0, 1, 9).
- Plain working; say the extra in the reveal.

Verdict reason: the prediction asks which count is larger, which no one gets wrong, and the reveal never states the extra the hook asks about.

## After reading the brief (meta.json)

- Objective: round to whole packs and compute the excess. The excess is never asked for or stated (findings 1, 5).
- Fix route: demo-builder (numeric question, reveal sentence).
