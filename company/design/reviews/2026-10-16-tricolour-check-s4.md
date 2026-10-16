# Design review (S4): tricolour-check, built knot lesson 2

design-lead (Ines) · 2026-10-16 · worktree from `ccr-4c6c7654-ew9ko1` at 5c5c719e

**Verdict: pass with changes** (D1 and D2 below, both CSS in `src/demos/math/tricolour-check/styles.module.css`). All four of the builder's choices that I was asked to rule on are accepted: the `loopOne` trigger (design side only), the control row hiding at the reveal, the label placement, and the crossing-mark rings.

**Authority.** Condition S4 of my contact-sheet record, `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (S1 to S4, T1 to T4, T3a, crossing ticks), and decision W-1583 in `company/design/reviews/2026-10-16-knots-specs-review.md` (arc colours and T3-letters). This record rules on pictures and layout only. What counts as a milestone, and the reveal's words, belong to cm-math-discrete and the learning designer. I did not design this lesson, so this is not a self-review.

## What I looked at, in this order (artifact first)

1. **The build.** `NEXT_DIST_DIR=.next-dl-tc npm run build`, served on port 3611 (`tools/serve.sh`). Dispatch preflight: `dispatch-check --kind=build --worktree=<this worktree>` passed (0 builders in flight).
2. **The walkthrough.** `npm run walkthrough -- tricolour-check` (phone, option 1): `artifacts/walkthroughs/tricolour-check/sheet.png`, its 9 frames and the transcript. I wrote the findings below from the sheet before I opened `build.md`.
3. **The reveal fit.** `node tools/reveal-fit.mjs --strict` at 390×844, 360×740 and 360×640.
4. **My probes, kept beside this record** in `2026-10-16-tricolour-check-s4/` (rerun from the repo root against a running build, `BASE=http://localhost:<port>`):
   - `fit-probe.mjs`: explore overflow and chip-row position for every predict option, and the reveal for every option, at all three sizes. It takes an optional CSS override, which is how D1 and D2 were tested before I wrote them. `SCHEME=dark` for the dark theme.
   - `row-probe.mjs`: the widths of the five controls in the explore row.
   - `geom-probe.mjs`: label distances (T3a), label-to-ring clearance, tick and cross glyph clearance, and stage text against strands, labels and glyphs, on 3₁ and 4₁.
5. **Then the builder's account,** `company/reviews/tricolour-check/build.md` ("Decisions a reviewer should check"), and the QA record `company/reviews/tricolour-check/2026-10-16-qa.md`.

## Measured fit

**Reveal** (`reveal-fit --strict`; `fit-probe.mjs` agrees for all 3 predict options):

| Viewport | Verdict | Stage-top crop | Room below the last line | Words | Picture |
|---|---|---|---|---|---|
| 390×844 | fit, phoneFit true, pass 1 | 0 px | 37 px | 87 to 89 | 320 px |
| 360×740 | fit + crop, pass 1 | 85 px | 6 px | 87 to 89 | 290 px |
| 360×640 | fit + crop, pass 1 | 151 px | 6 px | 87 to 89 | 256 px |

At 390×844, the size the standard binds, the reveal fits in every variant. The reveal is 90 words or fewer.

**Explore** (on 3₁ after (B,C,A), the frame with the "Seen" line; all stage text is inside the square SVG, so the height does not change with the readout):

| Viewport | Board | Control row | Stage window / content | Overflow | Row below the window | Smallest stage text |
|---|---|---|---|---|---|---|
| 390×844 | 320 px | 1 line | 504 / 504 (483 for option 3) | 0 px | 0 px | 12.7 px |
| 360×740 | 290 px | **2 lines** | 359 / 412 | 53 px | 43 px | 11.5 px |
| 360×640 | 256 px | **2 lines** | 259 / 378 | 119 px | 109 px (all of it) | 10.2 px |

This confirms QA's 360×640 observation, and it also happens at 360×740. There are two causes:
- **The row wraps at 360 wide.** It needs 309 px (three 44 px chips, Check all 89 px, Reset 64 px, four 6 px gaps), and the stage gives it 290. The second line costs 50 px.
- **The board is `40dvh`.** That does not take the stage window into account.

## Findings from the sheet

1. **The knots read as knots in every frame, in both themes.** On 3₁ the colour changes only at gaps (T1). The 4₁ beak crossing reads as a crossing at `gap: 0.5`, with its ring around it.
2. **W-1583 is applied exactly.** The hex values match my table, in both themes. Each label ring is stroked in its arc's colour, and its letter is `--fg` on `--bg-3`. The letter changes with every tap. The aria-labels read "Arc k, colour X". The letters are counted as stage words: 20 at the busiest frame, within 25.
3. **The grey C in light mode reads as a third colour, not as "uncoloured"** (frames 3, 4 and 6). That is because every arc starts as blue A, and the ring says C. This is my judgement from the sheet, not a learner result. The learner review is still the test (W-1583).
4. **Labels (T3a) are met.** Every label is 17.0 units or more from every crossing centre (3₁: 35.8 to 40.0; 4₁: 17.0 to 36.0). The closest pair of labels is 27.8 units apart, so their 44 px buttons are 61 px or more apart, even at the D2 floor.
   - The tightest spot is 4₁'s short arc (label at 79.6, 53), between the centre crossing and the beak. There, the label ring sits **1.7 units (4.8 px at 390, 3.7 px at the 254 px floor)** clear of the centre crossing's ring.
   - The two rings differ in colour, stroke weight (1.5 against 0.8) and size, and they read as two marks on the sheet (frames 7 to 9).
   - No other point on that arc is further from the crossings: the arc is 187 px long and runs from one crossing to the next.
5. **Crossing marks follow the tick condition.** Each ring has r 9 units, a 0.8 stroke, no fill, and is drawn **under** the strands, so it covers no gap or strand end. Each tick or cross glyph sits 15 units from its crossing, outside the ring, and 10.0 to 13.2 units from the nearest strand centre line. All of them are inside the viewBox.
   - Contrast on `--bg-3`: `--good` 5.31:1 (light) and 8.13:1 (dark); `--bad` 5.53:1 and 6.15:1. All are 3:1 or better.
   - A failing crossing never relies on hue alone: its ring is dashed and its glyph is a cross.
6. **Stage text.** The counter, the Seen line and the census line touch no strand, label or glyph on either knot (`geom-probe.mjs`). They are 12.7 px at 390 and 10.2 px at 360×640, above the 10 px floor (`company/design/system.md`, W-289). That floor is what limits D2 below.
7. **At the reveal** the stage shows 4₁ with the Seen line and the 4₁ census line. The reveal quotes those two lines, so the quoted states are on screen.

## Rulings on the builder's decisions (build.md)

- **(1) `loopOne` fires when the ○ chip opens: no design objection.**
  - The ○ picture is one circle with one label, A, and the counter reads "No crossings". So opening it shows what the reveal quotes ("A plain loop has one arc"), without a tap.
  - Whether opening ○ is *enough* to count as the milestone is cm-math-discrete's call (the brief says "a tap or Check all on ○"), not mine. I do not ask for a change.
- **(2) The control row hides at the reveal: accepted.**
  - The reveal names no control, and the arcs stay tappable.
  - At 390×844 the reveal has 37 px to spare, and the row plus its margin is 48 px. So showing the row would bring back the stage-top crop the standard forbids. The builder measured 22 px.
  - This fix comes after folding the stage text into the picture, which is the standard's order. The precedent is W-574.
- **(3) Label placement: accepted as built.** T3a holds with a 5-unit margin at the tightest label (finding 4). The 1.7-unit ring-to-ring clearance on 4₁ is accepted. Moving that label would put it closer to a crossing, not further.
- **(4) Crossing-mark rings: accepted as built** (finding 5).
  - The 0.8 stroke is thinner than draw-a-table-knot's 1.2 selection ring. That is right: here every crossing carries a ring at once, and a heavier ring would compete with the arcs.
  - The two rings mean different things: status here, "which one did I switch" there.
- **(5) Phone fit below 390×844 (QA's observation): fix 360×740 with D1 and D2. At 360×640, accept a smaller scroll.**
  - **At 360×740, after D1 and D2:** overflow 0 and the row fully on screen, in all 3 options. The reveal crop drops from 85 px to 77 px.
  - **At 360×640, after D1 and D2:** the stage still scrolls by 67 px (was 119), and the row is still below the window (57 px, was 109).
    - Getting the row on screen would need a board of about 187 px. That would put the counter, Seen and census lines at about 7.4 px, under the 10 px floor. The floor wins (demo-standard, "On screen means legible").
    - I tried moving the row above the picture at short heights, and I reject it. On the QA path, arc 2's label (C, y 86) and the census line that Check all writes would then sit below the window. So a learner would press Check all and see nothing change.
    - This is the same ruling as draw-a-table-knot at 360×640 (`company/design/reviews/2026-10-16-draw-a-table-knot-s4.md`). The explore hint names ○, 4₁ and Check all, so the learner is told the row exists.

## Changes required (D1, D2)

**D1. Keep the explore control row on one line at 360 wide.** In `styles.module.css`:
- `.wrap .controls`: change `gap: 6px;` to `gap: 4px;` (keep `margin-top: 4px` and `justify-content: center`).
- `.btn`: add `padding-left: 8px; padding-right: 8px;` (keep `min-height: 44px`).
- Do not change the chips, the font sizes, or any 44 px minimum.
- Measured: Check all 81 px, Reset 56 px, row 285 px against the 290 px available. At 390 the row still fits on one line.
- Keep `flex-wrap` as it is, so a narrower phone wraps instead of overflowing.

**D2. A height-aware board, floored at the text floor.** Replace the `.board` width rule with:
- `.board { width: min(100%, clamp(254px, calc(100dvh - 458px), 320px)); }` (keep `position`, `aspect-ratio: 1` and `margin`).
- Where the numbers come from:
  - **458 px** is the stage window at 360 wide (`100dvh - 381px`), minus the stage padding (20), the gap and row margin (8), the row (44), and 5 px of spare.
  - **254 px** is the smallest board at which the 4.6-unit stage text renders at 10 px or more (4.6 × 254 / 116 = 10.07). The label buttons are then still 61 px or more apart.
  - **320 px** is today's size at 390×844.

D1 and D2 were tested together as an override (`fit-probe.mjs`, all 3 options):

| Viewport | Board | Row | Overflow | Row below the window | Smallest text | Reveal |
|---|---|---|---|---|---|---|
| 390×844 | 320 px, unchanged | 1 line | 0 | 0 | 12.7 px | Unchanged: crop 0, 37 px spare, 320 px picture |
| 360×740 | 282 px | 1 line | **0** (was 53) | **0** (was 43) | 11.2 px | Crop 77 px (was 85) |
| 360×640 | 254 px | 1 line | 67 (was 119) | 57 (was 109) | 10.1 px | Crop 149 px (was 151) |

**What can make the numbers drift:**
- If the kit's chrome or the explore hint changes, the 458 constant can drift. The check is `fit-probe.mjs`: overflow must be 0 at 360×740 for every option, and nothing may change at 390×844.
- If the stage text's 4.6-unit size changes, the 254 floor changes with it (floor = 10 × 116 / text units).

After D1 and D2, the builder re-runs:
- the walkthrough;
- `reveal-fit --strict` at 390×844 (must stay fit, crop 0);
- `fit-probe.mjs` (0 overflow at 360×740, minimum text 10 px or more at 360×640).

The builder records the numbers in `build.md`. I do not need to see the lesson again for D1 and D2 unless a number misses. Any other departure from S1 to S3, T1 to T4 or W-1583 comes back to me.

## What I believe, and how sure

- At 390×844 the lesson meets S1 to S3, T1, T3a, T3-letters and the tick condition, and the reveal fits in every option: **sure** (measured on the build, 3 options, both themes).
- D1 and D2 fix 360×740 and cost 390×844 nothing: **sure** for this build's chrome (tested as an override). The 458 constant depends on the chrome.
- The 360×640 scroll cannot be removed without going under the text floor: **sure** (arithmetic from the measured window).
- The grey C reads as a colour and the 1.7-unit ring clearance reads as two marks: **fairly sure** (judged from the sheet at phone size; not tested with learners).

## Objections, and what happened to each

- **QA: "at 360×640 the chips, Check all and Reset sit below the stage window."** Partly fixed. D1 and D2 halve the overflow and fix 360×740 fully. At 360×640 the row stays below the window, because the text floor wins. The rejected alternative is recorded in ruling (5).
- **Builder (decision 3): "the design lead or cm may prefer cutting a reveal sentence instead of hiding the row."** I do not prefer it. Hiding the row costs the learner nothing at the reveal, while a cut would cost a claim-bearing sentence. Which sentence could go is cm-math-discrete's call in any case.
- **Builder (decision 1): the `loopOne` trigger.** No design objection. The milestone question stays with cm-math-discrete.

## Next moves

| Move | Owner |
|---|---|
| Apply D1 and D2, then re-run the three checks above | demo-builder (board) |
| Rule on whether opening ○ is enough for `loopOne` (build.md decision 1) | cm-math-discrete |
| Learner review: does the grey C read as uncoloured, and at 360×640 does a learner find the chip row by scrolling? | learner-review |
| Fact-check of claims c1 to c8 (0/8 checked) | fact-checker (already in the lesson's gates) |
