*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): round-box-leftover-gap
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The inscribed circle touches all four sides yet occupies less area than the square. Corner gaps remain outside the circular footprint; touching the sides is not the same as filling the region.)
Screenshots seen: yes (artifacts/walkthroughs/round-box-leftover-gap/sheet.png, recorded 2026-10-15T21:35)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Square footprint"; after lock-in the stage showed Unused area 0 cm²; tapped Inscribed circle (85.84 cm²); slid square side to 22 (103.87 cm²); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **The picture does the teaching.** The circle touching all four sides with white corners showing, next to 0 cm² for the square, is clear. The reveal's line "touching the sides is not the same as filling the region" is the sentence I would remember.
2. **Where it wobbled: the prediction is too easy.** "Which shape leaves unused corners in this square space?" A circle obviously does. The interesting part (how much: about a fifth of the space) is never said. 85.84 cm² means little until I divide it by 400, which a beginner will not do.
3. **The reveal restates only the current number** ("103.87cm²").
4. Two decimals of cm² is false precision for a storage hack.
5. **Selected-state styling is inverted** (current mode grey, other white).

Notes (not blocking):
- Ask "how much of the square is wasted?" (about 5% / 21% / 50%) and show the percentage.
- Round to whole cm².

Verdict reason: the stage and reveal answer the question as asked, and the corner gaps are visible; the weak prediction and missing percentage are notes.

## After reading the brief (meta.json)

- The objective is delivered (circle touches all sides; corners stay unused).
- The trust-sheet worked example uses a 30 cm square (900 / 707 / 193 cm², ~21%), while the stage default is 20 cm. The ~21% figure is what the stage should show. Route: fact-checker (consistency), demo-builder (percentage).
