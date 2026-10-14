# Build note: monopolist-holds-back

builder: demo-builder · 2026-10-13

- Intent: the demand line, the $20 cost line, and the profit box (price − cost) × units for the chosen price. The best box seen so far stays dashed, so going past the peak shows a smaller box against it. "Profit = (price − cost) × units sold" is on the stage.
- Milestones: price $60, and some price above $60. DOM order: slider (starts $40, $10 steps: QA lands on $50 then $60), +$10 (to $70), −$10, then "Rivals arrive" (price falls to the $20 cost, 80 units, profit 0).
- Price ticks are $0, $20, $50, $100; a $60 tick would have given the answer away.
- The reveal lists the other prices the learner saw and mentions rivals only if they pressed it.
- After screenshots: in rivals mode the one-seller box vanished, so the stage no longer showed what the reveal compares; the best box now stays dashed with its profit. The "buyers" and "cost" labels collided with the dot and moved.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- good/bad area fills use --good-fill/--bad-fill at 40% over the card, so --fg text on them clears 4.5:1 in both themes (was --good/--bad at 60-70%, which became dark green in light and left white text at 2.9:1 in dark).
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

