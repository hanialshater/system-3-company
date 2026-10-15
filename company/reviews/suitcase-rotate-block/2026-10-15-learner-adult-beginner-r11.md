*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): suitcase-rotate-block
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know For these rigid rectangles, rotation changes how many complete rows and columns fit. Empty area can remain unusable when it is in strips narrower than another block.)
Screenshots seen: yes (artifacts/walkthroughs/suitcase-rotate-block/sheet.png, recorded 2026-10-15T21:34, build f1832fa on localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Long way"; tapped Quarter-turn; slid Bag width from 30 to 32 cm; opened reveal.

1. **The prediction is genuine.** With a 30 × 36 cm bag and 18 × 12 cm blocks, it is not obvious which way fits more. I guessed "long way" for a real reason (the long side feels like it should go along the long side).
2. **The picture carries the contrast.** On the predict screen the long-way bag visibly holds 3 blocks with a wide empty strip; quarter-turn holds 4 in a 2 × 2 grid with a thin strip. I could count both, even though the number readout only showed "4blocks" for the quarter-turn.
3. **Where understanding wobbled: the slider.** Widening the bag from 30 to 32 cm leaves 4 blocks. That supports the reveal's point (leftover strips narrower than a block are wasted), but nothing says so; I briefly thought the slider was broken.
4. **The reveal answers my question.** "Rotation changes how many complete rows and columns fit. Empty area can remain unusable when it is in strips narrower than another block." That is why 4 beat 3, and the empty strips are on screen.
5. Small notes: the long-way count (3) is never written as a number; "4blocks" is missing a space; the selected button looks reversed (the one not on screen is white).

Notes for the builder (not blocking):
- Write both counts (long way 3, quarter-turn 4) in the readout.
- Add a hint for the slider ("try 36 cm" so a third column appears), so it shows when extra width starts to help.
- Fix the selected-button look and the missing space.

Verdict reason: the prediction has real tension, the picture shows 3 against 4, and the reveal explains why; the remaining issues are polish.

## After reading meta.json

- Objective (rotation changes complete rows and columns; narrow strips are wasted) matches what the stage and reveal show. The misconception field is the generic template line, but this lesson's prediction has a real trap anyway (finding 1).
- Version 2 is the version walked. No route needed for launch; the polish notes go to demo-builder.
