# Design review (S4): left-or-right (B2, the two-sided card), built knot lesson 4

design-lead (Ines) · 2026-10-17 · worktree from `ccr-4c6c7654-ew9ko1` with branch `worktree-agent-ac7db687eb5b771c8` merged (head ca5b2a9c; the lesson's files equal the builder's d9522400). Lesson code is unchanged on main at cbb7ca10 (only `meta.json` claim statuses).

**Verdict: pass with changes** (D1 and D2 below, both CSS in `src/demos/math/left-or-right/styles.module.css`). Of the builder's three departures: the perspective on the mirror wrapper and the 240 px reveal picture without room are accepted; the 277 px explore picture is not, and D1 restores the spec's 320 px. The mid-flip on 4₁, the badge at 4₁'s beak and the Mirror opacity dip all pass.

**Authority.** S4 of `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (S1 to S3, C1 to C6) and L-1 to L-6 of `company/design/reviews/2026-10-16-knots-specs-review.md`. Pictures and layout only; the words are cm-math-discrete's. I did not design this lesson (the spec is the interaction designer's, the build the demo-builder's), so this is not a self-review.

## What I looked at, in this order (artifact first)

1. **The build.** `NEXT_DIST_DIR=.next-dl-s4k npm run build`, served on 3622. Dispatch preflight `tools/dispatch-check.mjs --kind=build --worktree=<this worktree>`: OK.
2. **The walkthrough.** `npm run walkthrough -- left-or-right` (phone, option 1): `artifacts/walkthroughs/left-or-right/sheet.png`, 5 frames, transcript. Sheet findings were written to a scratch note before I opened `build.md`.
3. **The reveal fit.** `node tools/reveal-fit.mjs --strict` at 390×844, 360×740, 360×640.
4. **My probes, kept beside this record** in `2026-10-17-left-or-right-s4/` (rerun from the repo root, `BASE=http://localhost:<port>`):
   - `fit-probe.mjs`: explore and reveal for every option at the three sizes, with three endings: the QA path (Turn over, Mirror, Figure-eight), staying on the trefoil, and **mirroring the figure-eight** (the other reveal branch). Takes a CSS override.
   - `row-probe.mjs`: the four controls' widths, and whether they fit one row.
   - `motion-probe.mjs`: the 4₁ flip as paused frames (angle, drawn width and height per 12.5 ms, frames saved), the Mirror dip frame by frame, and every badge's clearance at rest on both knots.
   - `realtime-probe.mjs`: the 4₁ flip in real time (angle and marks opacity per animation frame). The paused probe's marks column is not valid, because the lesson's timer fallbacks keep running in real time while the frames are paused (noted at the top of that file).
5. **Then** `company/reviews/left-or-right/build.md` and the QA record `2026-10-16-qa.md`.

## Measured fit

**Reveal** (`reveal-fit --strict` on the QA path: fit, crop 0, phoneFit true, 79 words, picture 240 px; `fit-probe.mjs` for all variants):

| Viewport | QA path | Stay on the trefoil | Mirror the figure-eight |
|---|---|---|---|
| 390×844 | crop 0, 12 px spare, 76 to 79 words | crop 0, 12 px spare | **crop 15 px**, 6 px spare, 81 to 84 words |
| 360×740 | crop 140 | crop 140 | crop 140 |
| 360×640 | crop 240 | crop 240 | crop 240 |

The figure-eight branch ("The figure-eight's marks summed to 0 both ways...") adds one line, and the stage top is then cut at the standard's size. Mirroring the figure-eight is what a curious learner does next on the QA path. `reveal-fit` does not take that branch.

**Explore** (after Turn over, seen line showing):

| Viewport | Picture | px per unit | Overflow | Second control row below the window |
|---|---|---|---|---|
| 390×844 | 277 px (295 for option 2, whose hint is one line shorter) | 2.39 | 0 | 0 |
| 360×740 | 190 px (the floor) | 1.64 | 0 | 0 |
| 360×640 | 190 px | 1.64 | 93 px | 50 px |

## Findings from the sheet

1. **The card shows the truth.** Turn over reflects the outline and keeps −,−,−; Mirror puts the outline back where predict had it and makes +,+,+. Mirror and Turn over end on the same outline, so the only difference left is at the crossings, as I preferred in the contact sheet.
2. **The picture changes size between predict (about 203 px) and explore (277 px).** It happens once, at the commit, when the panel shortens. Not a condition.
3. **At explore, the knot sits in a lot of empty space** (about 80 px between it and the controls at 390). Two causes: L-5's 8 % "room" above and below the card, and the viewBox's own margins. D1 removes the first.
4. **The reveal keeps the seen line** ("Trefoil: turned over −3 · mirror +3"), which carries the quoted trefoil states while the picture shows the figure-eight. The reveal names both knots, and the figure-eight it describes is the one on the stage. I do not ask for a stage change; whether a learner links the seen line to the sentence is the learner review's question (draw-a-table-knot needed W-1602 for the same pattern).
5. **The readout's second column is empty on the figure-eight** (no hand), with its space kept, so "Sum 0" does not move. Good.

## The three checks I was asked for

**Mid-flip readability on 4₁, in motion** (300 ms `ease-in-out`, perspective 1200 px; `realtime-probe.mjs`, `motion-probe.mjs`):
- In real time the card spends **3 animation frames** (first to last 33 ms apart, so under 50 ms) in the 63° to 117° band where 4₁'s closest strands touch (390×844 and 360×740, both directions). The specs review computed 53 ms; the measure agrees (the paused frames give about 60 ms at 12.5 ms steps).
- The marks are at opacity 0 on every frame from 45° to 135°, and in the band. They are still fading in the first 100 ms (0.33 at most past 10°), as L-3 allows. They are back at 455 to 487 ms.
- The readout never changed or blanked on any frame.
- Paused frames (`artifacts/design-s4-lor/flip-390x844-*.png`): the face squeezes to 43 % of its width at 65° and 0 % at 90°, and comes back reflected. It reads as a card turning, not as a new diagram. The perspective adds at most 7 % to the drawn height at 90° (180 to 193 px at 390), well inside the card box, so nothing is clipped or crosses the text.
- **Passes.** I keep 300 ms `ease-in-out`.

**The badge at 4₁'s beak** (`motion-probe.mjs`, all 4 rest states of both knots, read from the DOM):
- Beak badge edge to strand edge: **2.43 to 2.44 units** in all four states (front 101.4, 56.5; turned and mirrored at x −1.4). That meets L-1's 2.0-unit floor and matches the builder's test.
- In px: 6.2 at 295 px (2.54 px/unit), 6.7 at 320 (after D1), 5.0 at the 240 px reveal, 4.5 at 217 (360×740 after D1), 4.0 at the 190 px floor.
- Every other badge has 4.1 units or more (10.5 px at 295).
- Crops at 3x (`beak-*.png`, `f8-turned-*.png`, light and dark): the badge sits outside the beak, clear of both strands, and the − or + reads; at 190 px it is small but still separate.
- **Passes.**

**The Mirror opacity dip** (L-2; `motion-probe.mjs`, real time):
- The wrapper's transform changed once, from `none` to `matrix(-1, 0, 0, 1, 0, 0)`, on a frame where the opacity was **0** (and 0 on the frame before), at 125 to 132 ms. Opacity was back at 1 at 226 to 233 ms.
- No frame shows two outlines or a squeezed outline. **Passes.**

## Rulings on the builder's departures (build.md)

- **(1) Perspective on the mirror wrapper, not on a separate holder: accepted.** L-5's words are "on the card's parent", and the wrapper is that parent. The QA record's sign read (630 assertions, both themes) and my frames show the composition is right: the right face paints, and the turn is a real 3D turn.
- **(2) The 277 px explore picture (spec 320): not accepted; D1.** The 320 px did not fit because of the 8 % room. The room is not needed: the strands reach at most 43 of the card's 58 half-height units (the builder's own figure), and the 7 % to 15 % mid-flip growth keeps them inside the card box. That is the builder's argument for the reveal, and it holds at explore too.
- **(3) The 240 px reveal picture without room: accepted.** At 2.07 px per unit the beak badge has 5.0 px and the beak gap about 5.4 px, within half a pixel of what I cleared at 260 px in the contact sheet. After D2 there is room to spare, and I do not ask for a bigger picture.

## Changes required (D1, D2)

**D1. Drop L-5's room at explore too, so the picture can reach 320 px.** In `styles.module.css`:
- `.picArea`: `min-height: calc(190px * 1.16);` becomes `min-height: 190px;`.
- `.room`: `padding: 8% 0;` becomes `padding: 0;` (keep `overflow: visible`). The `.atReveal .room` rule then does nothing and may go.
- `.pic`: `width: max(190px, min(100cqw, 320px, calc(100cqh / 1.16)));` becomes `width: max(190px, min(100cqw, 320px, 100cqh));`.
- Keep the 190 px floor, `perspective: 1200px` and every `overflow: visible`.
- Measured (override, 3 options):

| Viewport | Picture | Overflow | Second row below the window |
|---|---|---|---|
| 390×844 | **320 px** (was 277 / 295), 2.76 px per unit | 0 | 0 |
| 360×740 | **217 px** (was 190) | 0 | 0 |
| 360×640 | 190 px | 63 (was 93) | 50 |

**D2. Hide the Turn over · Mirror row at the reveal.** In `styles.module.css`, add:
- `.wrapAll.atReveal > .picArea + :global(.row) { display: none; }`
- Keep the chip row (it carries the names "Trefoil" and "Figure-eight" that the reveal uses).
- Why: the figure-eight branch cuts the stage top by 15 px at 390×844. The standard's order is cut told context, fold stage text, merge rows. Cutting is cm-math-discrete's call. The two rows cannot merge (`row-probe.mjs`: 362 px needed against 320). Hiding a control row at the reveal is the tricolour-check precedent. The reveal quotes the toggles' results, which stay on the seen line and the badges; it does not ask the learner to press them.
- Measured (override, 3 options, 390×844): figure-eight branch **crop 0, 35 px spare**; QA path and trefoil endings crop 0, 56 px spare. 360×740 crop 96 (was 140).
- If cm-math-discrete instead cuts told context so that the figure-eight branch measures crop 0 at 390×844 with the row kept, D2 is not needed. The measure is the bar.

After D1 and D2, the builder re-runs:
- the walkthrough;
- `reveal-fit --strict` at 390×844;
- `fit-probe.mjs` with no override (390×844: picture 320, overflow 0, crop 0 on all three endings; 360×740: overflow 0);
- `card.test.mjs` and `c1-check.mjs` (D1 changes the card's size, and C1 reads screen positions).

The builder records the numbers in `build.md`. I do not need to see it again unless a number misses.

## Short phones (recorded, not conditions)

- At 360×740 after D1 the picture is 217 px, 1.87 px per unit, under the 2.24 I cleared in the contact sheet. At 360×640 it is 190 px (1.64). I looked at 4₁ turned at both sizes at 3x, light and dark: the beak reads as a crossing and the badges stay clear. **Accepted**: 390×844 is the standard's size, the floor keeps every badge glyph at 11 px or more, and shrinking anything else would cost text or tap targets.
- At 360×640 the controls still start below the window (QA finding 1). After D1 the overflow is 63 px (was 93). Same ruling as the other knot lessons at this size.

## What I believe, and how sure

- At 390×844, after D1 and D2, the lesson meets S1 to S3, C1 to C6, L-1 to L-6, and the reveal fits on all three endings: **sure** (measured on the build as overrides, 3 options).
- The flip and the dip do not teach the misconception (no frame of two outlines, marks hidden through the band, 3 frames in the band): **sure** in Chromium. WebKit is unmeasured (the builder's open item, owned by qa-tester).
- The beak badge reads: **fairly sure** (2.43 units in every state; seen at 3x, not on a real phone).
- Dropping the room is safe at explore: **fairly sure**. The strands stay inside the card box by the builder's figure and my paused frames; it needs the C1 re-run on the new size.

## Objections, and what happened to each

- **Builder: "320 does not fit the height with two control rows and the 8 % room".** True with the room. D1 removes the room, by the builder's own reveal argument, and 320 fits.
- **QA finding 1 (360×640 controls below the fold).** Reduced by D1, not removed. The floor wins.
- **My own L-5 wording** did not ask for room, only for perspective and no clipping. The room was a reasonable reading of it; it is now ruled out at explore and at the reveal.

## Next moves

| Move | Owner |
|---|---|
| Apply D1 and D2; re-run the four checks above; record numbers in build.md | demo-builder |
| Optional told-context cut in the figure-eight branch (would make D2 unnecessary) | cm-math-discrete |
| WebKit run of `c1-check.mjs` (open in build.md) | qa-tester |
| Learner review: does the seen line carry the trefoil states when the stage shows the figure-eight (finding 4)? | learner-evaluator |
