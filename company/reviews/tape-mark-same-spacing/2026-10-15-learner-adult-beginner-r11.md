*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): tape-mark-same-spacing
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know A biased step repeated from the previous mark adds its error each time. Measuring each chosen position from one origin avoids that particular accumulation, though the measuring tool can still have its own errors.)
Screenshots seen: yes (artifacts/walkthroughs/tape-mark-same-spacing/sheet.png, recorded 2026-10-15T21:35, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Step from last mark"; tapped Measure from origin; slid Count from 5 to 7; opened reveal.

1. **Where understanding first broke: I never saw the error grow.** The idea is that a 0.2 cm error per step adds up (1.0 cm by mark 5, 1.4 cm by mark 7). The panel sent me to "the second layout" only, so I saw 0.2 cm at 5 marks and 0.2 cm at 7. The growing number, which is the whole lesson, stayed "?".
2. **The picture does not show drift.** The marks look the same in both modes and do not visibly slide off the ruler's ticks. At this scale 0.2 cm is invisible; the drawing needs exaggeration or a zoomed end mark.
3. **Words beyond my boundary.** "Pitch", "bias" and "compounding" are technical. "Compounding" is also not quite right: the error adds a fixed amount each step (it accumulates, as the title says), it does not multiply.
4. **The prediction is reasonable** (stepping from the last mark is what most people do), so there is a real belief to correct. It just never gets corrected on screen.
5. **The selected button looks reversed.**
6. **The reveal's explanation is clear** ("a biased step repeated from the previous mark adds its error each time"), but "gives 0.2cm" reports only the good method.

Fixes (for the builder):
- Show both errors side by side and let the slider grow the stepping error (1.0, 1.2, 1.4 cm).
- Exaggerate the drawn drift, or zoom on the last mark.
- Replace "compounding" with "adding up", and "pitch/bias" with "spacing/error per step".

Verdict reason: the stepping error that grows with each mark never appears, so the learner sees 0.2 cm twice and the reveal's "adds its error each time" is only told.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, picture, selected-button look, plain wording); Life Hacks category manager for whether the brief names a real beginner belief.
