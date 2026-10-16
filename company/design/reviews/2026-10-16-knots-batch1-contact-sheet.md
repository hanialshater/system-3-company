# Design review: knots batch 1 contact sheet at phone size (block (b) per lesson, W-1566)

design-lead (Ines) · 2026-10-16 · worktree branch `worktree-agent-ac2fee1e9bec919d2` (merged `ccr-4c6c7654-ew9ko1` at 3de3a9d3)

**Authority:**
- `src/kit/knots/README.md` rule 2(b): block (b) lifts per lesson, in writing, in that lesson's design review, after the design lead reviews the lesson's contact sheet at phone size.
- My rulings and cm-math-discrete's consult in `company/design/reviews/2026-10-14-knot-pictures.md` (Ruling 1b, 1d.4, T1 to T4, U1, U2).
- Board W-1566 (mine): the two-sided card for left-or-right.

**Scope:**
- This record rules on pictures only: what the learner sees, at what size, and whether it reads.
- What to teach belongs to cm-math-discrete and the learning designer.
- Rule 2(a) scope belongs to the principal engineer (W-1567). I do not rule on it.

**Inputs:**
- Briefs 1 to 4, "Knots, batch 1", in `company/domains/briefs/math.discrete.md`. Brief 4 is the revised version (W-1550: mirror only, caption-only "Flip it over").
- The learning designer's notes, `company/reviews/{draw-a-table-knot,tricolour-check,unknot-game,left-or-right}/design.md`, which arrived mid-run.
- No lesson is built yet. So this is the contact sheet of every picture these briefs and notes draw, made with the kit itself. It is not a walkthrough of a build.

## What I looked at (artifacts first)

**Sheets.** `company/design/reviews/2026-10-16-knots-batch1-contact-sheet/`, made by `sheet.mjs` in the same folder. Run it with `node company/design/reviews/2026-10-16-knots-batch1-contact-sheet/sheet.mjs`. It imports only the kit.

**Every picture follows the principal engineer's conditions:**
- `draw(pd, { layout: layout(entry.pd) })`;
- default `relax`, default `size` 100 and `margin` 8;
- padded and scaled only through the viewBox `-8 -8 116 116`.

The script refuses any drawing whose frame is not `0 0 100 100`. That is 67 pictures:

| Sheet | Pictures |
|---|---|
| `brief1-draw-a-table-knot.svg` | 5_2 and 6_1, default |
| `note1-draw-a-table-knot-switches.svg` | Every single switch of 5_2 (5) and 6_1 (6), on the stored layout (the learning designer's "switch" interaction) |
| `brief2-tricolour-3_1.svg`, `brief2-tricolour-4_1.svg` | Arc-coloured states: one colour, two colours (fails), three colours (valid on 3_1, fails on 4_1), every arc tapped once on 4_1. Each arc is labelled 1 to n at its middle (T3). |
| `note2-tricolour-qa-path.svg` | The staggered-cycle QA path on 3_1: (B,A,A), then (B,C,A) |
| `brief3-unknot-game-3_1.svg`, `brief3-unknot-game-4_1.svg` | Every crossing-change subset: 8 on 3_1, 16 on 4_1 |
| `note3-unknot-game-tint.svg` | Each single switch with the first R2 of `moves()` tinted (the note's "slide-off" tint) |
| `brief4-left-or-right.svg` | 3_1, 4_1 and their mirrors on the stored layout |
| `note4-left-or-right-card.svg` | The two-sided card at 0° (front), 60° (front), 120° (back), 180° (back = turned over), plus the forbidden one-sided flip at 180° for reference |

**Each sheet has four rows:** 290 px and 320 px wide, each in the dark and light stage colours (`--bg-3`).

**Measures.** They are in `metrics.json` (per picture, per width).

**What I viewed.** I rasterised the sheets in scratch, at 1 CSS px per px, and looked at them before reading the measures.

### Phone size is 290 and 320 px, not 360 and 390
A 360 or 390 px viewport loses 70 px to the feed chrome before the stage SVG (`src/app/globals.css`):
- `.slot-screen` padding: 10 px each side;
- `.card-shell` border 1 px and padding 14 px, each side;
- `.stage` padding: 10 px each side.

So the knot is **290 px** wide on a 360 phone and **320 px** on a 390 phone.

On a short phone, `.stage-svg { max-height: 46dvh }` can take it to about 260 px. I measured that width too.

The briefs' K13 arithmetic used a 360 px stage, which overstates every pixel figure by about 24 %. All the rulings below are at 290 px, with 260 px checked.

### Detector for crossings a test can't see
- **What it counts.** Every intersection between drawn strand centre lines, sampled at 400 points per edge. The only exclusion is the two over-strand halves meeting at their own crossing centre (within 0.5 units).
- **How it differs from the kit test.** The kit test (`test/draw.test.mjs`) skips anything within 3 units of a real crossing. Mine does not, so it sees false crossings inside that 3 % zone.
- **Self-test.** The script stops if the detector fails any of these:
  1. It must find the known false crossing in `draw(knot('4_1').pd, { size: 360 })`. It finds 2 intersections there.
  2. It must find a crossing planted 2.2 units from a real one. It finds it.
  3. Its gap measure must flag `gap: 0.05`. It does: 0.57 units.

## Findings (all 67 pictures)

1. **Extra crossings: none, including within 3 %.**
   - The detector finds 0 unexpected intersections in all 67 pictures, and 0 within 3 units of a real crossing.
   - No third strand comes within 23.9 units (60 px at 290) of any crossing.
   - So nothing is hidden at a crossing.
2. **Hit circles (44 px) fit everywhere at 290 and at 260.**
   - Room from a crossing to the viewBox edge:
     - 4_1 (the U1 crossing): 29 px at 290, 26 px at 260 (needs 22).
     - 5_2: 34.8 px. 6_1: 47.3 px. 3_1: 65 px.
   - Closest crossing pair:
     - 4_1: 78.8 px at 290, 70.6 px at 260.
     - 6_1's clasp: 62.8 px at 290, 56.3 px at 260.
     - 5_2: 74.5 px.
   - None is under 44 px, so no hit circles overlap. **U1 is met by the viewBox padding alone.**
3. **4_1's right-hand crossing is the hardest crossing to read** (crossing 0, at x 96.4).
   - Both strands make U-turns through it. Where the arms leave the gap, two of them are only 30° to 35° apart. Other crossings are 44° to 86° (3_1's narrowest is 66°).
   - So it reads as a beak, or two strands touching, more than as an X.
   - With the default `gap` 0.35, the under-strand's end stops 2.69 to 2.85 units from the over-strand's centre line. That is a visible gap of only **4.2 to 4.6 px** at 290 px with a 5 px stroke: the gap is narrower than the line.
   - It is the one place in the batch where a learner could miss a crossing, or miss which strand is on top.
   - **`gap` is free** under rule 2(a)'s conditions. At `gap: 0.5` the 4_1 gap is **6.1 px** (5.5 at 260), and every subset of every knot still has 0 extra crossings (`gapProbe` in `metrics.json`). Side by side in my scratch render, the beak then reads as a crossing.
   - This is a condition below, for every lesson in the batch, so they look like one product.
4. **Gaps elsewhere** (default gap / gap 0.5, at 290 px):
   - 3_1: 7.8 / 12.1 px. The tightest is the top crossing (crossing 1), which is T2's "top-left" crossing in the fix1 drawing. The colour change between arcs is visible there.
   - 5_2: 6.5 / 9.7 px.
   - 6_1: 5.4 / 8.2 px. All six of its crossings are evenly tight.
5. **Narrowest face** (background between two strokes, away from crossings, at 290 px):
   - 3_1: 27 px. 6_1: 22 px. 5_2: 17.5 px.
   - **4_1: 10 px**, the right lens. It reads as two strands at 290. It is the narrowest in the batch, and I would not take it smaller.
6. **Crossing changes, mirrors and the card change no shape.**
   - All 24 crossing-change subsets keep the outline: only the gaps move (rule 1 / U2 holds in the pictures).
   - The mirror is the all-crossings subset.
   - The measures move by at most 0.2 units between subsets.
7. **Arc colours (T3).**
   - The proposed per-theme sets, each with a number label, all clear 3:1 on `--bg-3`:
     - dark: `#E69F00`, `#56B4E9`, `#E87FBF` (6.1 to 6.9:1);
     - light: `#A65E00`, `#0068A8`, `#B0337A` (4.3 to 5.2:1).
   - 4_1 coloured reads at 290 in both themes. It had been accepted only in black until now.
   - The arc lengths at 290 px are 274 to 305 px on 3_1 and 187 to 337 px on 4_1. Every arc offers far more than 44 px of length to tap along.
   - One flaw is mine, and it is a builder warning: my label placement (the middle of an arc's first edge) puts 3_1's label "2" close to the top crossing. Labels must stay clear of gaps (condition T3a).
8. **The slide-off tint (unknot-game note).**
   - `moves()` gives the R2's two edges. In every one of the 7 single-switch states, one edge is **over at both ends** and the other is **under at both ends** (`metrics.json` records `tint`; checked with the drawing's cut ends).
   - Tinting both, as the note says, colours a whole lens. The caption "On top twice: it slides off" is about one strand, and the lens does not say which one.
9. **The two-sided card shows the turned-over knot, not the mirror** (`cardCheck` in `metrics.json`).
   - I read every crossing's sign off the picture as the learner sees it, after the CSS reflection: incoming under and over directions, calibrated on the unreflected front, where it agrees with `signs(pd)` at every crossing.
   - The back face at 180°, `draw(mirror(pd))` reflected, reads **−,−,− on 3_1 and −,+,−,+ on 4_1**. That equals `signs(turnOver(pd))`.
   - The one-sided flip reads **+,+,+**. That equals `signs(mirror(pd))`, the hazard F4 and the learning designer describe.
   - Every frame of the card is an affine image (a horizontal scale, reflected on the back) of a picture already measured clean. An affine map cannot add or remove a crossing.
   - The edge-on frame at 90° is a single degenerate frame: a line, inside the 300 ms flip.

## Rulings per brief

Conditions marked **(all)** apply to every knot lesson in this batch, so the four look like one product:
- **S1 (all).** `draw(pd, { layout: L, gap: 0.5 })`, where L is the entry's stored layout at the default `relax`.
  - Default `size` and `margin`.
  - SVG `viewBox="-8 -8 116 116"`, `className="stage-svg"`.
  - Never `size`, `margin` or `relax` (the principal engineer's conditions).
  - The viewBox may be tightened to the curve's extent plus 8 units (4_1's curve ends at y 81), but only through the viewBox, and only if the hit-circle room in S3 still holds.
- **S2 (all).** Stroke width 2 viewBox units (5 px at 290), `stroke-linecap="butt"`, colour `var(--fg)` for black pictures.
  - Round caps eat about 1 unit of every gap. Butt caps only.
- **S3 (all) / U1.** Every crossing has a ≥ 44 px hit circle. With S1 they fit: no clipping and no overlap at 260 px or wider (finding 2).
  - Tapping a crossing must not move the picture (U2): the stored layout, and `crossingChange` keeps labels.
- **S4 (all).** The design review of the built lesson checks its walkthrough sheet (`npm run walkthrough -- <slug>`) at 390×844 against these conditions. That check is part of launch, not a new ruling.
  - Any departure from S1 to S3 comes back to me.

### Brief 1, draw-a-table-knot (5_2, 6_1): no block (b) to lift. Pictures cleared, including the note's switched states.
- Block (b) never applied: it covers only 3_1 and 4_1.
- The default 5_2 and 6_1 are cleared under S1 to S4. So are all 11 single-switch pictures from the learning designer's switch interaction: same outline, 0 extra crossings, gaps 5.4 to 6.5 px at the default gap and 8.2 to 9.7 px at `gap: 0.5`.
- 6_1's clasp pair is the closest (62.8 px at 290), which leaves room.
- Whether the lesson counts or switches is cm-math-discrete's call. Either picture set is cleared.

### Brief 2, tricolour-check (3_1, 4_1): **block (b) lifted for this lesson**, with these conditions.
- S1 to S4. `gap: 0.5` matters most on 4_1's right-hand crossing, where three arcs meet at the beak.
- **T1.** One stroke per arc, edges merged by `arcs(pd).edges[k]`, ending exactly at the gaps. No colour change on an over-strand.
- **T2.** Check the top crossing of 3_1 first (crossing 1, the narrowest gap: 12.1 px at gap 0.5).
- **T3.** Arc colours meet ≥ 3:1 on `--bg-3` in both themes, plus a number label at each arc.
  - The sets in finding 7 are cleared on contrast. I did not run a colour-vision simulation, so the number labels carry arc identity, not the hues. The builder may use these sets, or any set that meets 3:1 with the labels.
  - **T3a (new).** Each label's centre is ≥ 12 units (30 px at 290) from every crossing centre, on the arc's longest stretch between gaps. The label's ring uses the arc's colour, and its text is `var(--fg)` on `var(--bg-3)`.
- **T4.** Unchanged: never "lobe", and never imply equal arcs.
- **Crossing ticks.** The per-crossing ring and tick glyph must not cover a gap or a strand end. Draw the ring with radius ≥ 9 units (about 22 px at 290, the hit circle) and put the tick glyph outside it, not on the crossing.
- The learning designer's ○ chip is drawn as a plain SVG circle, not with kit `draw`. That is outside the knot rules. Use stroke S2 and the same arc colour set.
- The staggered colour cycle is invisible in the picture (`note2-tricolour-qa-path.svg`: (B,C,A) is a valid three-colour trefoil). No design objection.

### Brief 3, unknot-game (3_1, 4_1): **block (b) lifted for this lesson**, with these conditions.
- S1 to S4, over all 24 crossing-change subsets. All of them are on the sheets and cleared.
- **Tint (learning-designer note, W-1568 spec).** Tint **only the strand that is on top at both crossings**: the R2 edge that is over at both ends, which exists in every single-switch state (finding 8). Leave the under strand in `--fg`.
  - The tint must not be hue alone: also widen that stroke to 3 units, together with the caption.
  - Tinting both edges of the lens is not cleared: it does not show which strand "slides off".
  - The interaction designer's spec settles the colour against the knot stroke, in both themes.

### Brief 4, left-or-right (3_1, 4_1 and mirrors): **block (b) lifted for this lesson's knot and mirror pictures**, with these conditions.
- S1 to S4.
- The four pictures (3_1, its mirror, 4_1, its mirror, on the entry's stored layout) are cleared. 0 extra crossings; the gaps are as in brief 3.

## W-1566: the two-sided card against the caption-only "Flip it over"

**My choice: the two-sided card.** It is cleared as a picture, and I prefer it to the caption-only version.

It becomes the build only when **both** of these happen:
- (1) the principal engineer rules in writing (W-1567) that it is inside rule 2(a), or covers it in an addendum;
- (2) cm-math-discrete revises brief 4 to use it. The brief is theirs, and the CEO office's approval of W-1542 was conditioned on the W-1550 revision.

Until both happen, the brief as revised stands. It is also cleared as a picture, with the label condition below.

**Why the card.**
- **The picture is true.** At rest after the flip, the screen shows `draw(mirror(pd))` reflected left to right. That is a planar reflection plus every crossing switched, which is `turnOver(pd)` by the kit's own definition.
  - The signs read off the rendered picture equal `signs(turnOver(pd))` on 3_1 and 4_1 (finding 9).
  - No `turnOver` is passed to `draw` or `layout`. No `size`, `margin` or `relax` is touched.
  - Every frame is an affine image of a picture measured clean.
- **It shows the idea instead of telling it.**
  - The misconception is "flip it over and you get the mirror".
  - On the card, the learner turns it over and sees the outline reflect and every gap move, while the marks stay −,−,−.
  - The caption-only version answers the same misconception with a sentence.
- **The caption-only version has a design defect of its own.** A button named "Flip it over" that does not flip anything is a control whose label promises an action the stage does not perform.
  - If caption-only ships, the control must not be named as an action on the picture. For example, a question chip such as "Turned over?" that shows the caption.
  - The wording is cm-math-discrete's. The objection travels to them (board).

**Conditions on the card** (for the builder and W-1568):
- **C1.** Two faces, both `draw(...)` on the **same stored layout L**, the same viewBox, S1 and S2:
  - front: `pd` (or whatever the Mirror state is);
  - back: `mirror` of the front's diagram.
- **C2.** `backface-visibility: hidden` on both faces. The back face is pre-rotated `rotateY(180deg)`.
  - **Never** a single-sided flip, never a visible back face of one drawing, and never a 360° spin. Each of those shows the mirror (finding 9, the one-sided sheet column).
- **C3.** The flip takes 150 to 400 ms.
  - Under `prefers-reduced-motion`, swap instantly to the 180° end state (the reflected back face), not to the front.
- **C4.** Marks, sums and names are drawn **outside** the transformed element, at the crossing positions of the face on show (x reflected after the flip). No text is ever mirrored.
- **C5.** A builder test reads crossing signs from the transformed geometry and checks them against `signs(turnOver(pd))`, the way `pictureSigns` in `sheet.mjs` does.
  - Whether that belongs in the kit or in the lesson is the principal engineer's call (W-1567).
- **C6.** While turned over, Mirror swaps both faces together, so the two faces always hold a knot and its mirror (as in the note).

**The note's `scaleX(-1)` for Mirror.**
- It is also cleared as a picture. A reflection of a cleared drawing with the crossings kept is the mirror knot, and its signs read +,+,+ (the one-sided column of `note4-left-or-right-card.svg`).
- I prefer it, under C4. It matches what "mirror image" means to a learner. It also makes Mirror and Turn over end on the **same outline**, so the only difference left is at the crossings, which is the lesson's point.
- It needs the same W-1567 ruling, so the principal engineer should rule on both together.

## Objections, and what happened to each

- **"The two-sided card depicts `turnOver`, which rule 2(a) keeps blocked" (re-read F4).**
  - Answered on the picture: nothing calls `draw(turnOver(...))`, and the depicted state is proved true, both by the signs and by the affine-map argument.
  - Not answered on scope. That is W-1567, the principal engineer's, and the card does not ship until it is ruled.
- **"A CSS flip draws the mirror" (F4, the learning designer).**
  - Agreed, for a one-sided flip. It is on the sheet as the forbidden column. Condition C2 rules it out.
- **The learning designer's "a caption-only lesson is a revise under told-vs-shown".**
  - I agree it is weaker. Whether it is a revise is the learner review's call under `company/decisions/2026-10-14-told-vs-shown.md`, not mine.
  - I do not hold the lesson on it. If W-1567 says no, caption-only is cleared as a picture, with the label condition.
- **The briefs' "360 px stage" (K13).**
  - The real stage is 290 px. Re-measured at 290 and 260 px: U1 still holds. No brief change is needed beyond correcting the number when cm-math-discrete next edits the brief.

## What I believe, and how sure

- No picture in the batch has a false crossing, including within 3 % of a real one: **sure**. The detector passed its self-test, and the count is 67 of 67.
- 4_1's right-hand crossing is too tight at the default gap, and `gap: 0.5` fixes it enough: **fairly sure**. I measured it and saw it side by side at 290 px. I have not seen it inside a card with the kit's chrome or on a real device.
- The two-sided card shows the turned-over knot truthfully: **sure** (the signs check, plus the affine argument).
- It is the better lesson: **fairly sure**. It is untested with learners.
- Hit circles fit at every phone width down to 260 px: **sure**, from the measures.

## Next moves

| Move | Owner |
|---|---|
| Rule rule 2(a) scope on the two-sided card and on `scaleX(-1)` Mirror (W-1567), with the C5 signs test | principal-engineer |
| Choose card or caption-only for brief 4 after W-1567. If caption-only, rename the "Flip it over" control (objection above). Accept or reject the notes' changes to briefs 1 to 3. Correct K13's 360 px to the 290 px card width | cm-math-discrete |
| Specs: the unknot-game tint (one strand, ≥ 3 units, not hue alone) and the flip card under C1 to C6 (W-1568) | interaction-designer |
| Build with S1 to S4 and the per-brief conditions | builders (after the brief owner's go) |
| Design review of each built lesson's walkthrough sheet against this record (S4) | design-lead |
