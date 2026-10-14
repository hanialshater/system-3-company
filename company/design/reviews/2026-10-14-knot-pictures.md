# Design ruling: knot pictures for tricolour-check, unknot-game and draw-a-table-knot

design-lead (Ines) · 2026-10-14 · session 2 (branch ccr-rnd-ncm)

**Authority:**
- VP ruling §4 in `company/rnd/evolution/knots-gen2.md`, "Import block, bigons (b)". The block lifts either when the follow-up fixes it, or when the design lead accepts the picture in writing, with cm-math-discrete consulted on tricolour-check.
- EDD-004 and its engineering review (`company/rituals/records/2026-10-14-eng-review-EDD-004.md`). That review left two things to me: the bigon acceptance, and a look at the kit's 5_2.
- `src/kit/knots/README.md`, blocks (b) and "Not blocked".

**Scope:** these rulings cover pictures only. What each lesson teaches belongs to cm-math-discrete and the learning designer. Score, registration and kit changes belong to the rnd-lead and the principal engineer. No lesson for these three slugs exists yet (no brief or build in `src/demos`). So this ruling is about the library's default pictures, not about a contact sheet.

## What I looked at (artifacts first)

- I rasterised everything with `sharp` in scratch, at 360 px (about the size of a phone card stage), and read the SVG text.
  - `src/lab/knots/candidates/fix1-bigon/renders/`: before (`gen2-force-smooth--*`) and after (`fix1-bigon--*`) for 3_1, 4_1, 5_2, L2a1 and random12.
  - `company/rnd/evolution/knots-gen2-looks/kit-derived-table--{3_1,4_1,5_2,6_1}.svg`. My scratch `kit.draw(kit.knot('5_2').pd)` is byte-identical to the 5_2 file, so these files are what the kit draws today.
- Two extra scratch renders, which nobody had made before. Neither touches `src/`.
  1. **The kit's own table** (3_1, 4_1, 5_2, 6_1, 6_2, 6_3) drawn by the fix1-bigon `draw`. The fix1 `renders/` use the lab table, and the kit's 5_2 is a different diagram from the lab's.
  2. **The trefoil coloured by arc** (three colours, one per arc), drawn both by the kit and by fix1-bigon. This is the tricolour-check picture.
- After that, I read NOTES.md (fix1-bigon) and the gen-2 record's picture table.

## What a learner must distinguish

- **tricolour-check:** the trefoil's **three arcs, each one separate piece** (each arc runs from one undercrossing to the next). The learner colours them, or checks a colouring. Each arc has to read as one thing at a glance.
- **unknot-game:** each crossing, and which strand is on top, on the trefoil (and probably 4_1). The learner taps to change a crossing and the stored layout keeps the picture fixed. Every crossing needs to be findable, and the gap that marks the under-strand needs to be obvious.
- **draw-a-table-knot:** a named table knot is recognisable as itself. The learner can trace the strand and count the crossings.

## Ruling 1: 3_1 and 4_1 for tricolour-check and unknot-game

### 1a. The kit's current pictures (gen2-force-smooth): **rejected** for both lessons. I do not accept them in writing, so block (b) does not lift on this path.

- **3_1.** Each side of the rounded triangle is two near-parallel strands, 7.7 apart on a 100 box (ratio 0.10).
  - In black, it reads as a triangle drawn with a double line, not as three lobes.
  - In the arc-coloured render it is worse. Each side shows **two different arcs running side by side** (for example, blue and red together on the left). So the eye pairs colours by side instead of seeing three arcs.
  - That is the exact distinction tricolour-check exists to teach, so the picture misleads on the lesson's own question.
- **4_1.** The left side is the same doubled line (8.3, ratio 0.12).
  - For unknot-game, the two crossings at the ends of that bigon sit at the corners of a sliver. The learner can find them, but the strands between them read as one thick line.
- **I did not consult cm-math-discrete.** The VP's consultation condition applies to *accepting* the picture. A rejection does not need it.

### 1b. fix1-bigon's pictures: **accepted** for both lessons, with the conditions below. My recommendation is that **block (b) lifts with fix1-bigon** once those conditions are met.

- **3_1: three open lobes (bigon width 23.5, ratio 0.58), close to the textbook trefoil (packing 26.8 / 0.52).**
  - In the arc-coloured render, each arc is one lobe and one colour. You can tell the three arcs apart at a glance.
  - Small blemish, not blocking: the top crossing's over-strand bends a little just past the crossing, and one lobe is a little smaller than the others.
- **4_1: the left doubled side is now a lens (17.0, ratio 0.33).**
  - The right bigon is short and drawn small but round. At 360 px it is still clearly two strands.
  - Every crossing gap is visible.
- **The two pictures are the same with the kit's derived table** (my scratch render). The NOTES' before/after holds for what the kit would ship.

### 1c. The costs, and what I make of each

| Cost | My call |
|---|---|
| About −7.8 bench points (median of 3 seeds), all from spacing and spread | **Accepted for design.** The bench rewards leaving room for other strands and cannot see bigon width. The lesson pictures get better on the one property these lessons depend on. Whether the score result stands is the rnd-lead's call, not mine. |
| 6_3's narrowest face drops from 4.7 to 2.7 (a triangle, not a bigon) | **Visible.** At 360 px, the sliver at the top right of 6_3 is thinner, and it is **already marginal in the kit today**. No blocked lesson draws 6_3. **Ruling: 6_3 is not cleared for any lesson picture under either version** without a design look at that lesson's contact sheet. |
| +214 B per lesson (random-knot is 184 B under its condition) | **No design objection.** The size budget belongs to the principal engineer. |
| The Hopf link is still a lens | **No change.** Block (c) stands: no lesson draws links. |
| random12 and random diagrams: the 5th-percentile narrowest face drops from 5.0 to 4.0, and the median bigon goes from 8.3 to 13.1 | **Mixed.** Outer lobes open; the central S-pair gets tighter. Random-knot is still under block (a), so this is not ruled here. **Before block (a) lifts, random-knot pictures under the shipped library need their own design look.** |

### 1d. Conditions for block (b) to lift with fix1-bigon

1. **rnd-lead registers and re-scores fix1-bigon**, following VP ruling §4, path 1.
   - The record must use the bigon-width and minimum-face-width definitions from `measure-bigons.mjs` (the "judged with a bigon-width or minimum-face-width check" part).
   - It must report, on the kit's derived table, 3_1 minimum bigon width ≥ 20 and 4_1 ≥ 15 (view box 100). These floors are what I accepted; any change to the candidate that falls below them comes back to me.
   - First move `measure-bigons.mjs` and `renders/` out of `mutable` (NOTES §8).
2. **The kit update follows the tier the principal engineer rules.**
   - The handoff I was given calls this tier 1. But `src/kit/knots/README.md` ("Changing this library") and item 6b of the engineering review classify a change to the drawings of table entries as **tier 2 (EDD and engineering review)**.
   - fix1-bigon changes those drawings for every table knot. I flag the conflict and do not rule on it: it belongs to the principal engineer.
3. **cm-math-discrete is consulted on the fix1-bigon trefoil before tricolour-check ships.**
   - My acceptance is the "design lead accepts in writing" half of path 2. I am applying the VP's consultation condition here too, so this does not depend on which path is used.
   - The question for them: do the three lobes read as the three arcs a tricolouring is about? My view is yes, from the arc-coloured render.
   - unknot-game does not need this.
4. **Each lesson's contact sheet gets a design review at phone size** before launch (`npm run walkthrough -- <slug>`). The default picture can be undermined by the lesson's own choices:
   - stroke width;
   - gap size;
   - colour, including the light and dark roles in `company/design/system.md` and colour-blind-safe arc colours for tricolour-check;
   - a rotation that hides a lobe.
5. **Until conditions 1 and 2 are met, the block stands.** No lesson draws 3_1 or 4_1 with the kit's current default layout.

## Ruling 2: draw-a-table-knot, with the kit's 5_2 and 6_1 from the derived table

- **5_2 (`kit-derived-table--5_2.svg`): accepted.**
  - It reads as four outer lobes with a clear clasp at the bottom middle, and every crossing gap is visible.
  - There is no doubled side. The narrowest outer lens, at the top left, is open.
  - It is recognisable as the twist knot.
  - The fix1-bigon version, a heart shape, is also acceptable. Either may ship.
- **6_1 (`kit-derived-table--6_1.svg`): accepted with a limit, and fix1-bigon's version is preferred.**
  - The clasp at the bottom is clear, and all six crossings can be found.
  - But the **left side is a thin lens** (bigon width about 10, ratio 0.24). It is the same defect as the trefoil's, only milder: at a glance it reads as a double line.
  - **Acceptable** if the learner's task is to see or identify the knot, or to count its crossings.
  - **Not acceptable** if the task asks the learner to trace the strand, or to colour or label arcs along the left side. In that case, ship it only with fix1-bigon's drawing, where the left lobe opens into a round loop.
  - cm-math-discrete's brief should say which task applies. The builder should not guess.
- **Other table knots** that draw-a-table-knot might offer: nothing here clears them.
  - 6_2 is acceptable to my eye in both versions.
  - 6_3 is not cleared (see 1c).
  - Anything else needs a design look at the lesson's contact sheet.

## Objections, and what happened to each

- **"The bench says fix1-bigon is worse (−7.8)."** I answered this in 1c. The bench has no width measure, and the lessons' defect is width. This is the VP's evaluator gap 2. The score ruling stays with the rnd-lead.
- **"6_3 gets thinner."** I agree, and it is visible. I answered it by not clearing 6_3 for lessons under either version, and no blocked lesson draws it. If a lesson wants 6_3, it comes back to design.
- **"Accept the current picture and save the bytes and the score."** Rejected. On tricolour-check, the doubled sides set two different arcs side by side, which teaches the wrong grouping.

## What I believe, and how sure

- The current kit 3_1 and 4_1 are unfit for these two lessons: **sure**. I saw it in black and in the arc-coloured render.
- fix1-bigon's 3_1 and 4_1 are fit for them, subject to lesson-level styling: **fairly sure**. I have not seen them inside a lesson card at real phone size, or in dark mode.
- 5_2 from the kit is fine for draw-a-table-knot: **sure**. 6_1 is fine for identifying and counting crossings, and weak for tracing: **fairly sure**.

## Next moves

| Move | Owner |
|---|---|
| Register fix1-bigon, re-score it, and record bigon and face widths on the derived table (condition 1) | rnd-lead |
| Rule the tier of the kit update, and whether to ship fix1-bigon's drawings into `src/kit/knots` (condition 2) | principal-engineer |
| Consultation on the fix1 trefoil for tricolour-check; say in the draw-a-table-knot brief whether the learner traces arcs (decides 6_1) | cm-math-discrete |
| A design review of each knot lesson's contact sheet before launch | design-lead |

## Scratch (not committed)

- Renders and the scripts that produced them are in the session scratchpad: an `sharp` rasteriser, and a renderer that draws the kit table with `fix1-bigon/index.mjs`.
- They can be reproduced: import `src/kit/knots/index.mjs` and `src/lab/knots/candidates/fix1-bigon/index.mjs`, call `draw(kit.knot(n).pd)`, and write `edges[].d` as paths with stroke 1.6 on a `-2 -2 104 104` view box.
