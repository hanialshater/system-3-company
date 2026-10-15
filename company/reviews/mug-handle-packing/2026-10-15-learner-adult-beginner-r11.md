*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): mug-handle-packing
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Counting only cup diameters ignores their handles. The conservative side-by-side layout uses the complete horizontal envelope for each empty cup.)
Screenshots seen: yes (artifacts/walkthroughs/mug-handle-packing/sheet.png, recorded 2026-10-15T21:37:03.187Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Body diameter" (wrong); tapped "Handle envelope"; slid Tray width 36 to 38 cm; opened reveal.

1. **Where understanding first broke: "handle envelope".** I do not know what an envelope is here. I guessed "the cup's width including the handle" from the picture. The tapped layout button does not look selected: after I tapped the second layout, the stage highlighted the first one (white, bold) and greyed the one I chose, so I was not sure which layout the readout described.
2. **What the prediction felt like.** Given away. "Which estimate avoids the pictured handle overlap?" and the predict picture already shows four cups with handles overlapping the next cup. The question tells me the body-only estimate overlaps.
3. **Exploring did nothing.** The slider moved the tray from 36 to 38 cm and the row count stayed at 3 cups. The body-only count (4 cups) is never shown as a number after I commit, so I never compare 4 against 3.
4. **Whether the reveal answered my question.** "Counting only cup diameters ignores their handles" is right. "Conservative side-by-side layout uses the complete horizontal envelope" is jargon. The final caveats (no hot liquids; handles may interleave) are reasonable.

Verdict reason: the question and picture give the answer, "envelope" is unexplained, the slider range never changes the count, and the 4-vs-3 comparison is never shown; ask "how many mugs fit on a 36 cm tray?" and show both counts.

## After reading the brief (meta.json)

- The meta.json learner.doesNotKnow field holds the reveal paragraph rather than a knowledge gap, so the boundary is under-specified (category manager). I used the boundary "everyday objects have sizes, positions and amounts".
- The selected-state styling (tapped layout shown unselected) recurs across this layout template (lids-match-by-size, margin-before-cut, measure-diagonal-for-square, measure-inside-not-outside, mug-handle-packing, nested-box-retrieval): likely one kit or template fix; worth a QA check.
- Fix route: demo-builder (slider range that changes the count; show body-only count; replace "envelope").
