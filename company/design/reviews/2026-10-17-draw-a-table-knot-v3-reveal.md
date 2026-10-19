# Design ruling (W-1610): draw-a-table-knot v3, the reveal crop on short phones and the live stage at the reveal

design-lead (Ines) · 2026-10-17 · main `ccr-4c6c7654-ew9ko1` at cbb7ca10 (lesson version 3), built in my worktree and served on 3622

**Rulings: (a) accept the crop at 360×740 and 360×640; no smaller reveal board and no scroll-to-top. (b) Keep the stage live at the reveal, on purpose. No change to the lesson.**

**Inputs.** The QA record `company/reviews/draw-a-table-knot/2026-10-17-qa-v3.md` (F1, F2), `build.md` (W-1602 round), my S4 record `company/design/reviews/2026-10-16-draw-a-table-knot-s4.md`, `src/kit/Lesson.tsx` line 82. I re-measured with my S4 probe, `2026-10-16-draw-a-table-knot-s4/fit-probe.mjs`, on the v3 build (no override).

## Measured on v3

| Viewport | Explore (0₁ readout) | Reveal, 3 options × last switch 4₁ or 0₁ |
|---|---|---|
| 390×844 | board 284, overflow 0 | crop 0 in all 6; 27 to 68 px spare; picture 231 px |
| 360×740 | board 211, overflow 0, chip row on screen | crop 42 to 82 px; picture 211 px; reveal text fully on screen |
| 360×640 | board 206, overflow 74 to 94 | (QA: crop 137 to 157) |

This agrees with QA's 42 to 62 px; my 82 px is the wrong-prediction 0₁ variant, where the verdict line adds a line. It is inside the 21 to 82 px range my S4 record measured after D3, so v3's restore at the reveal did not make it worse.

## (a) The reveal crop below 390×844: accepted

- **The standard binds at 390×844**, and there the crop is 0 in every variant.
- **A smaller reveal board cannot fix it.** Removing an 82 px crop needs a board about 130 px wide (1.26 px per unit). My S4 floor for this lesson is 1.76 px per unit (the 6₁ clasp pair's 44 px circles overlap below it), which is a 181 px board, saving about 30 px. That still leaves a crop at 360×740, at the cost of gaps and rings that I cleared only down to 2.05 px per unit.
- **A scroll-to-top would trade the wrong way.** The kit scrolls the card body so the reveal's last line is on screen. Scrolling to the stage top instead would push the reveal's last lines below the fold. When both cannot fit, the reveal text wins, and the stage is one swipe up (QA: scrollTop is already at its maximum). The scroll is also the kit's behaviour (`src/kit/Lesson.tsx`, protected), not the lesson's.
- **What the reveal points at stays visible at 360×740:** the bold readout ("Crossings drawn: 6 · Name: 4₁"), the Seen line and the chips. The part cut is the top loop of the knot and, on crossing 3, a corner of the ring; the ring's centre stays visible. The ring is not named by the reveal.
- **At 360×640** the ring is hidden on 6 of 11 switches (QA). Accepted on the same grounds, as in the S4 record and the other knot lessons at this size: the floor wins.

## (b) QA F2, the stage stays live at the reveal: keep it live

- It is the product's behaviour in every lesson: the kit locks the stage only at predict (`locked: phase === "predict"`). Learners can keep exploring after the reveal, and the other knot lessons rely on it (tricolour-check's arcs stay tappable at the reveal, accepted in my S4 record).
- The format rule is that the stage **at reveal time** shows what the reveal describes (`company/design/formats.md`). v3 meets it: when the reveal opens, the stage returns to the last switch, and QA found all 24 paths agree. A later tap is the learner's own experiment.
- The Seen line keeps the quoted state ("6 drawn, name 4₁") whatever the learner taps after, so the reveal's numbers stay on screen.
- Locking at the reveal for one lesson would make it behave unlike the rest. Locking for all would be a change to the lesson contract (`Lesson.tsx` is protected), which is not mine to make. If anyone wants it, it goes as a proposal to the evaluation steward.

## What I believe, and how sure

- The crop cannot be removed at 360×740 without going under the hit-circle floor, and scroll-to-top would hide the reveal: **sure** (measured on v3; arithmetic from the S4 floor).
- Keeping the stage live costs learners little, because the Seen line holds the quoted state: **fairly sure**. Not tested with learners.

## Objections, and what happened to each

- **QA F1: "could not tell from the record what the reveal-phase target was" at 360×740.** Answered here: there is no crop target below 390×844; the bar there is that the reveal text and what it points at are visible, which holds.
- **QA F2: lock at the reveal or keep it live?** Keep it live (above). No change asked of the builder.

## Next moves

| Move | Owner |
|---|---|
| None for the lesson from this ruling. Close W-1610 against this record | chief-of-staff (board) |
