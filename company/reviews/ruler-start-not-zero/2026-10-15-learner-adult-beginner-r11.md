*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): ruler-start-not-zero
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The object begins at the three-centimetre mark. Its length is the endpoint minus its start; the endpoint reading alone includes the unused part of the ruler.)
Screenshots seen: yes (artifacts/walkthroughs/ruler-start-not-zero/sheet.png, recorded 2026-10-15T21:35)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Read endpoint"; after lock-in the stage showed Reported length 18 cm; tapped Subtract start (15 cm); slid endpoint to 20 (17 cm); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **The prediction is a genuine error.** Reading the number at the end of the object is what I actually do with a ruler. The drawing makes it visible: the object starts at the 3 mark, not 0, and the green line under it shows its span. 18 vs 15 is concrete. The reveal ("the endpoint reading alone includes the unused part of the ruler") answers why I was wrong.
2. **Where it wobbled, slightly:** the object's start is only shown by where it sits on the ruler, and "Start=3cm" sits in small grey text. A tick or label at 3 would help a beginner see the start mark.
3. The reveal restates only the current number (17 cm). The comparison (20 read vs 17 real, always 3 cm too long) would make the rule stick.
4. Damaged-zero tip in the reveal is a nice practical touch.
5. **Selected-state styling is inverted.**

Notes (not blocking):
- Mark the start at 3 cm on the drawing, and say "always 3 cm too long" in the reveal.

Verdict reason: the reveal answers the learner's question (why the endpoint reading is too long) with the stage they just used.

## After reading the brief (meta.json)

- The objective is delivered.
- The trust-sheet worked example says "19 − 4 = 15 cm", while the stage shows start 3 and end 18. The sheet's numbers do not match the drawing. Route: fact-checker.
