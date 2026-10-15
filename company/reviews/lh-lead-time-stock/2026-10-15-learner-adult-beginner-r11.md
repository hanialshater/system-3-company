*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-lead-time-stock
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Calculate the stock on hand when ordering to cover a stated delivery delay and retain a stated reserve.)
Screenshots seen: yes (artifacts/walkthroughs/lh-lead-time-stock/sheet.png, recorded 2026-10-15T21:35, build f1832fa, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "20 units"; tapped Test A, Test B; slid Lead-days 3 to 5; opened reveal.

1. **The prediction is a real calculation with real traps.** 8 (just the reserve) and 12 (just the waiting days) are both the kind of half-answer a beginner gives; 20 needs both. This is one of the few lessons in the set that asks for a number rather than "which is bigger".
2. **The stage confirms it.** ((4×3)+8) against (4×3) is readable; sliding to five days shows both rising by 8, with the reserve gap staying at 8.
3. **Where my boundary stops (minor).** "Lead time" and "reorder" in the hook are shop words I half know; the question explains them in plain terms, so it did not stop me. The question says "units", the readouts say "items". "Full scale: 48items" and "constant toy demand" are jargon in the caption. The pictures (boxes on a shelf) are decorative.
4. **Does the reveal answer my question?** Yes: daily use × waiting days, plus the reserve. The note that this is stock on hand at ordering, not the amount to buy, heads off a confusion I would have had.

Notes (for the builder, not blocking):
- Use "units" throughout; plain words for the caption.

Verdict reason: the prediction tests the two common half-answers and the reveal gives the rule from what the stage showed.

## After reading the brief (meta.json)

- Objective: stock on hand when ordering to cover a delay plus a reserve. Delivered; the question asks for exactly this number.
- Notes route: demo-builder; not blocking.
