*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): jacket-last-first
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: A top-access stack behaves last-in, first-out. To retrieve items in a known use order, put them in the reverse order; the item packed last is the first accessible.)
Screenshots seen: yes (artifacts/walkthroughs/jacket-last-first/sheet.png, recorded 2026-10-15T21:34:02.515Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Use order"; tapped Reverse use order; slid Count 4 -> 6; opened reveal.

1. **Where understanding first broke: the drawing is not a stack.** The title says pack backwards and the reveal talks about a "top-access stack", but after tapping "Reverse use order" I see boxes 1, 2, 3, 4 in a row, left to right, with a sideways arrow. The numbers are in the same order as before, so I cannot see what was reversed or which item is on top. The predict picture (a 2×2 grid with an up-arrow) is a third, different layout.
2. **The use-order result is never shown.** "First blockers" for packing in use order (3 for 4 items) never appears; I only saw 0 and 0. So I never see the problem the trick solves.
3. **"First blockers" is a coined term.** I guessed it means "items on top of the one I need first", but the stage does not say.
4. **The prediction itself is decent.** "Pack in the order you'll use them" is a natural wrong instinct, and the title hints at the answer only a little.
5. The jacket in the slug and the recall card never appears on stage. The reveal sentence ("the item packed last is the first accessible") is clear and is the right answer to my question, but only in words.

Verdict reason: the stage never draws a stack or shows the blockers for use-order packing, so the last-in-first-out idea is told in the reveal but not seen.

## After reading the brief (meta.json)

- Objective is the reveal sentence (top-access stack, last-in first-out). The stage draws a row, not a stack, and never shows the use-order blockers (claim c3 says N−1), so the objective is asserted rather than shown.
- Fix route: demo-builder (vertical stack with the packing order visible; show blockers for both orders).
