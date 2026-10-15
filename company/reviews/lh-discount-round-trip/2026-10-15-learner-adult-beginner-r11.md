*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-discount-round-trip
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Explain why opposite percentage changes do not cancel.)
Screenshots seen: yes (artifacts/walkthroughs/lh-discount-round-trip/sheet.png, recorded 2026-10-15T21:32, build f1832fa, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Below original"; tapped Test A, Test B; slid Original 100 to 110; opened reveal.

1. **The prediction is genuine.** "Down 20%, up 20%, back where you started" is the natural beginner belief, and "At original" is offered. The hook asks the question without answering it.
2. **The stage confirms it in a form I can check.** €96 with (100×0.8×1.2) is readable even for me; at 110 the result is €105.6, still below. I can see the gap grows with the price.
3. **Where my boundary stops (minor).** "Full scale: €150" and "changing percentage base" under the readouts are jargon; I ignored them without losing anything. €105.6 should read €105.60. The two receipt pictures are identical apart from a coin and do not show the size difference; the numbers carry the lesson.
4. **Does the reveal answer my question?** Yes: the rise starts from the smaller base, 0.8×1.2 = 0.96, so it ends below. "Equal percentages need not be equal amounts" is the idea, stated at the end.

Notes (for the builder, not blocking):
- Two-decimal money; plain words for "Full scale".

Verdict reason: the prediction tests the real misconception and the reveal answers it from what the stage showed.

## After reading the brief (meta.json)

- Objective: explain why opposite percentage changes do not cancel. Delivered: the reveal names the smaller base and the 0.96 factor.
- Formatting notes (two-decimal money, "Full scale") go to demo-builder; not blocking.
