*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): shelf-front-labels
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The picture uses opaque boxes. A rear-facing label is blocked when the boxes stay on the shelf; a front-facing address is visible from the shown viewpoint.)
Screenshots seen: yes (artifacts/walkthroughs/shelf-front-labels/sheet.png, recorded 2026-10-15T21:36)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Labels on back"; after lock-in the stage showed Visible addresses 0 (boxes with no labels visible); tapped Labels on front (6, numbered boxes); slid Count to 8 (8); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **Simple and shown.** Blank box faces (0 visible) against numbered faces (6 visible) is the whole idea, and the reveal says why: opaque boxes block a rear label from the front view.
2. **The prediction is nearly self-answering** ("Which layout exposes the written addresses?" → front). Few people would choose back. The lesson is a reminder more than a surprise.
3. **Where I wobbled: the two drawings differ in layout,** not only in labels: a 2×3 grid of lying-down boxes in the back state and a row of standing boxes in the front state. I briefly wondered whether turning the boxes was part of the hack.
4. "Same outcome" is an odd third option. **Selected-state styling is inverted.**

Notes (not blocking):
- Keep the same arrangement in both modes and change only the label face.

Verdict reason: the stage shows 0 vs all labels visible and the reveal answers why; the weak prediction is a note.

## After reading the brief (meta.json)

- The objective is delivered (0 vs N visible).
- Fix route: none for launch; drawing-consistency note to demo-builder.
