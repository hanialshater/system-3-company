# Design ruling (W-1612): tricolour-check v2, the reveal crop on short phones

design-lead (Ines) · 2026-10-17 · main `ccr-4c6c7654-ew9ko1` at c27517e5 (lesson version 2, S4 D1 and D2 applied), built in my worktree (`NEXT_DIST_DIR=.next-dl-tc2`) and served on 3633

**Ruling: accept the crop at 360×740 (QA finding 1) and at 360×640 (QA finding 2). No reveal board cap, no scroll-to-top. No change to the lesson.**

**Inputs.** The QA record `company/reviews/tricolour-check/2026-10-17-qa-v2.md` (findings 1 and 2), my S4 record `company/design/reviews/2026-10-16-tricolour-check-s4.md` (which predicted this crop as the cost of D2), and the precedent ruling `company/design/reviews/2026-10-17-draw-a-table-knot-v3-reveal.md`. I re-measured with my S4 probe, `company/design/reviews/2026-10-16-tricolour-check-s4/fit-probe.mjs`, on the v2 build, first with no override, then with two candidate reveal caps. I did not read `build.md` for this ruling.

## Measured on v2 (all 3 predict options, QA path, light)

| Viewport | Explore (3₁ after B,C,A) | Reveal |
|---|---|---|
| 390×844 | board 320, overflow 0, row 1 line | crop 0, 37 px spare, picture 320 |
| 360×740 | board 282, overflow 0, row 1 line, min text 11.2 px | **crop 77 px**, 6 px spare, picture 282, reveal text whole |
| 360×640 | board 254, overflow 67, row 57 px below the window, min text 10.1 px | crop 149 px, 6 px spare, picture 254 |

These are exactly the post-D1/D2 numbers my S4 record measured as an override (crop 77 and 149). QA's 77 px scroll agrees. The build matches the spec; the crop is the one S4 accepted implicitly and did not rule on by name. This record rules on it.

## Candidate fix tested: a reveal-time board cap

I tested a cap on the board only once the control row has gone (that is, at the reveal), as a CSS override on the build: `._1-UsgW_wrap:not(:has(._1-UsgW_controls)) ._1-UsgW_board{width:min(100%,<N>px)}`. Explore numbers were unchanged in both runs.

| Cap | 390×844 reveal | 360×740 reveal | 360×640 reveal | Smallest stage text at the reveal |
|---|---|---|---|---|
| none (v2) | crop 0, picture 320 | crop 77 | crop 149 | 11.2 px at 360×740 |
| 254 px (the S4 text floor) | crop 0, picture **254** (was 320) | crop **49** | crop 149 | 10.1 px |
| 205 px (what 0 crop needs) | crop 0, picture 205 | crop **0** | crop 100 | **8.1 px** (4.6 × 205 / 116) |

- **205 px removes the crop but breaks the text floor.** The Seen line and the census line, which the reveal quotes, would render at 8.1 px, under the 10 px floor (`company/design/system.md`, W-289; demo-standard "On screen means legible"). The floor wins, as in S4 ruling (5).
- **254 px keeps the floor but only trims the crop from 77 to 49 px**, so the top ring is still cut. As written it would also shrink the 390×844 reveal picture from 320 to 254 px, where today nothing is cropped. A height-gated version would avoid that, but it buys 28 px of a figure that still crops, and it makes the picture jump in size at the moment the reveal opens. Not worth it.
- **Scroll-to-top** is the kit's call (`src/kit/Lesson.tsx`, protected) and would trade the wrong way: with 6 px spare, showing the stage top would push the reveal's last lines below the fold. When both cannot fit, the reveal text wins (same as draw-a-table-knot v3).

## Why the crop is acceptable

- **The standard binds at 390×844**, and there the crop is 0 in every option with 37 px spare.
- **What the reveal points at stays on screen at 360×740** (screenshot `artifacts/design-s4-tri/reveal-360x740-light.png`, not committed): the "Seen on 3₁: 3 colours, 3 of 3 OK" line, the "4₁: 3 of 81 obey: all one colour" census line, and three of the four crossing rings with their ticks. The cut part is the top band: the top crossing ring and its tick and the "Crossings OK" counter. The reveal quotes neither; it quotes the two lines along the bottom, which is why the builder put the stage text there.
- **Nothing is lost**: the card body scrolls up to show it (QA).
- **At 360×640** the reveal crops 149 px, the explore row starts below the window; both accepted in S4 ruling (5) on the text floor, and unchanged in v2. QA marks it inherited and outside this pass's target sizes.

## What I believe, and how sure

- No CSS change can remove the 360×740 reveal crop without putting the quoted lines under 10 px: **sure** (measured on the v2 build with the two caps; arithmetic from the 4.6-unit text).
- A learner at 360×740 loses nothing the reveal names: **fairly sure** (judged from the screenshot; not tested with learners).

## Objections, and what happened to each

- **QA finding 1 (medium): "Expected by the brief ('reveal fits on screen at both phone sizes') only partly met at 360×740."** Answered: the reveal text fits whole at both sizes; the figure crop at 360×740 is accepted here because removing it breaks the text floor (table above). If cm-math-discrete reads the brief's "fits" as including the whole figure at 360×740, the only route left is fewer reveal words (about 77 px is roughly 3 lines at this width), which is their call and the learning designer's, not mine. I do not ask for it.
- **QA finding 2 (low, inherited): 360×640.** Accepted, as in S4 ruling (5); no change.
- **QA findings 3 and 4** (zero-size disabled controls; Arc 1 live at the reveal) are for demo-builder, as QA routed them. On 4, the design position is the same as draw-a-table-knot v3 (b): the stage stays live at the reveal in every lesson.

## Next moves

| Move | Owner |
|---|---|
| None for the lesson from this ruling. Close W-1612 against this record | chief-of-staff (board) |
| QA findings 3 and 4 (as QA routed) | demo-builder |
