# Design review (S4): unknot-game, built knot lesson 3

design-lead (Ines) · 2026-10-17 · worktree from `ccr-4c6c7654-ew9ko1`; measured at 1885929e + ca5b2a9c (lesson code identical at cbb7ca10, where only `meta.json` claim statuses changed)

**Verdict: pass with changes** (D1 to D3 below: D1 and D2 are CSS in `src/demos/math/unknot-game/styles.module.css`, D3 is a few lines in `Demo.tsx`). The builder's one departure, the 270 px reveal picture, is accepted. The tint at the figure-eight's tightest crossing (the beak) is accepted.

**Authority.** Condition S4 of `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (S1 to S3, the tint condition), U-1 and U-2 of `company/design/reviews/2026-10-16-knots-specs-review.md`, and the format rule "the stage at reveal time shows what the reveal describes" (`company/design/formats.md`). This record rules on pictures and layout only. The title, hook and reveal words belong to cm-math-discrete and the learning designer. I did not design this lesson, so this is not a self-review. The learner review's verdict (revise) is not mine to override; D3 agrees with it.

## What I looked at, in this order (artifact first)

1. **The build.** `NEXT_DIST_DIR=.next-dl-s4k npm run build`, served on port 3622 (`tools/serve.sh`). Dispatch preflight `tools/dispatch-check.mjs --kind=build --worktree=<this worktree>`: OK (0 builders in flight).
2. **The walkthrough.** `npm run walkthrough -- unknot-game` (phone, option 1): `artifacts/walkthroughs/unknot-game/sheet.png`, 7 frames and the transcript. Sheet findings were written to a scratch note before I opened `build.md`.
3. **The reveal fit.** `node tools/reveal-fit.mjs --strict` at 390×844, 360×740 and 360×640.
4. **My probes, kept beside this record** in `2026-10-17-unknot-game-s4/` (rerun from the repo root against a running build, `BASE=http://localhost:<port>`):
   - `fit-probe.mjs`: explore overflow and control-row position for every predict option on the busiest frame, and the reveal for every option with two endings: the QA path (crossings 1 to 3, Reset, Figure-eight) and **a switch left on** (crossings 1 to 3, then Show me why: the likely real path). Takes a CSS override; that is how D1 and D2 were tested.
   - `tint-probe.mjs`: for all 7 single switches, the visible gap at each crossing (cut end to the over strand's edge, using the drawn width 2 or 3), the tint's clearance to other strands away from crossings, and beak crops in both themes.
5. **Then the builder's account,** `company/reviews/unknot-game/build.md`, the QA record `2026-10-16-qa.md`, and the learner walk `2026-10-17-learner-walk.md` (read after my findings were written).

## Measured fit

**Reveal** (`reveal-fit --strict` on the QA path; `fit-probe.mjs` for all variants):

| Viewport | QA path (reveal-fit) | QA path, 3 options | A switch left on, 3 options |
|---|---|---|---|
| 390×844 | fit, crop 0, phoneFit true, 73 words, picture 270 × 247 | crop 0, 11 px spare | **crop 15 px**, 5 px spare |
| 360×740 | fit + crop 144 | crop 144 | crop 164 |
| 360×640 | fit + crop 244 | crop 244 | crop 264 |

The "switch left on" ending is the one most learners reach: the reveal unlocks at 3 of 3, which is the moment crossing 3 is switched. Then the caption line ("On top twice: it slides off") is showing at the reveal, and the stage top is cut by 15 px at the standard's size. `reveal-fit` and the walkthrough do not take that path, so they report a pass.

**Explore** (trefoil, crossing 1 switched: readout, caption and tally all showing; same in all 3 options):

| Viewport | Board | Stage window / content | Overflow | Control row below the window |
|---|---|---|---|---|
| 390×844 | 320 px | 504 / 504 | 0 | 0 |
| 360×740 | 290 px | 376 / 438 | 62 px | **52 px (all of Reset, Trefoil, Figure-eight)** |
| 360×640 | 266 px | 276 / 416 | 140 px | 130 px |

## Findings from the sheet

1. **The knots read as knots in every frame.** The tint is on one strand only, 3 units wide against 2, and it runs into the ringed (switched) crossing in every trefoil frame. The other strand of the lens is `--fg` and visibly cut. This meets my tint condition.
2. **U-1 holds.** The current chip is filled (selected), Reset is greyed only when nothing is switched, so the two never look alike.
3. **U-2 holds.** Rings only, `pointer-events` on the 44 px circle, no fill. The switched ring is 2 px `--fg`; the others are 1 px `--line`.
4. **The reveal on the QA path shows an unswitched figure-eight**, "Still a knot", no tint, while the reveal's "why" sentence says "the tinted strand lay on top at two crossings in a row". I noted this from the sheet; the learner walk (finding 2) reached the same place independently. See D3.
5. **At 360 wide the title wraps to two lines** ("How many switches untie a / trefoil?"). That costs one line of stage window on the phone size where the stage is shortest. Not a condition; see the note to cm-math-discrete below.

## The tint at the figure-eight's tightest crossing (`tint-probe.mjs`)

The beak is the figure-eight's crossing 1 (x 96.4). Switches 1 and 3 make the tinted strand the over strand there.

| Measure (viewBox units; px at 320 / 290 / 270 / 238 px boards, this viewBox is 106 wide) | Value |
|---|---|
| Beak gap, tint over it (width 3) | 2.44 u: 7.4 / 6.7 / 6.2 / 5.5 px |
| Beak gap, untinted (width 2) | 2.63 to 2.79 u: 7.9 to 8.4 / 7.2 to 7.6 / 6.7 to 7.1 / 5.9 to 6.3 px |
| Every other crossing, any state | 4.3 u or more (10 px or more at 238) |
| Tinted strand to any other strand, away from crossings | 3.3 u on 4₁ switches 1 and 3 (10.0 / 9.1 / 8.4 / 7.4 px); 4.2 u or more elsewhere |

- The 3-unit tint takes 0.5 units off the beak gap. At 270 px (the reveal) it is 6.2 px, which is the 6.1 px I cleared for this crossing in the contact sheet; at 238 px (D2's floor) it is 5.5 px, the figure I cleared at 260 px on the 116-unit frame.
- In the crops (`artifacts/design-s4-unk/f8-c*-{390x844,360x740}-{light,dark}.png`, at 3x) the beak reads as a crossing with the tint on top, and the short tinted strand reads as one strand inside the lens, separate from the black arc beside it, in both themes.
- The tint ends at the crossing centre and the next edge carries on in `--fg`, so the over strand changes width (3 to 2) exactly at the beak. On the crops that reads as the tint stopping at the crossing, not as a gap. **Accepted as built.**

## Rulings on the builder's decisions (build.md)

- **The 270 px reveal picture (S4 departure): accepted.** 2.55 px per unit; the beak gap with the tint is 6.2 px; the 44 px rings do not shrink. A bigger picture would cost the crop D1 removes.
- **The tightened viewBox `0 0 106 97`: accepted** (S1 allows it; the builder's extent and the 9.6-unit room at the beak hold in my measures).
- **Title and hook (builder-written): no design objection** to their reading at 390 (title one line, hook two). The wording is cm-math-discrete's.
- **360×740 "recorded, not fixed": fixed with D2.** At 360×640 the stage still scrolls (below).

## Changes required (D1 to D3)

**D1. Hide the caption line at the reveal, always.** In `styles.module.css`, replace `.atReveal .caption.empty { display: none; }` with:
- `.atReveal .caption { display: none; }`
- Why: with a switch left on, the caption shows at the reveal and cuts the stage top by 15 px at 390×844. At the reveal the caption is redundant: the reveal's own sentence says what the caption says ("the tinted strand lay on top at two crossings in a row, so it slides off"), and the tint itself stays on the picture.
- Measured (override, all 3 options): switch-left-on at 390×844 goes from crop 15 to **crop 0, 11 px spare**; the QA path is unchanged (crop 0, 11 px spare).

**D2. A height-aware board, floored at the beak's legibility, and tighter explore spacing.** In `styles.module.css`:
- `.wrap`: `gap: 4px;` becomes `gap: 2px;`.
- `.board`: `width: min(100%, 320px, calc(38dvh * 106 / 97));` becomes `width: min(100%, clamp(238px, calc((100dvh - 537px) * 106 / 97), 320px));` (keep `aspect-ratio`, `position`, `margin`).
- `.atReveal .board`: `width: min(100%, 270px);` becomes `width: min(100%, 270px, clamp(238px, calc((100dvh - 537px) * 106 / 97), 320px));` so the picture never grows at the reveal on a short phone.
- Where the numbers come from: **537 px** is the 360-wide stage window (100dvh − 364 px in this kit build) minus everything in the stage that is not the board (172.6 px). **238 px** is 2.24 px per unit, the smallest scale I cleared in the contact sheet; there the tinted beak gap is 5.5 px, the closest crossing pair (the figure-eight's beak and centre crossings, 31.5 units apart) is 71 px apart, so the 44 px rings do not overlap. **320 px** is today's size at 390×844.
- Measured (override, all 3 options):

| Viewport | Board | Overflow | Control row below the window | Reveal |
|---|---|---|---|---|
| 390×844 | 320, unchanged | 0 | 0 | unchanged: 270 px, crop 0 |
| 360×740 | 238 | **6 px** (was 62) | **0** (was 52) | 238 px, crop 115 (was 144 to 164) |
| 360×640 | 238 | 106 (was 140) | 96 | crop 215 |

- At 360×640 the control row stays below the window. Going under 238 px would take the tinted beak gap under what I have cleared, so the floor wins. Same ruling as tricolour-check and draw-a-table-knot at this size.

**D3. At the reveal, put the stage back on the trefoil with its last switch.** In `Demo.tsx`: keep the index of the last trefoil crossing switched (it always exists: the reveal unlocks at 3 of 3), and when the phase becomes `reveal`, set the chip to Trefoil and the switch to that crossing. This is what draw-a-table-knot v3 does (W-1602).
- Why: the reveal's "why" sentence points at "the tinted strand", and the format rule says the stage at the reveal shows what the reveal describes. On the QA path the stage shows an unswitched figure-eight with no tint (finding 4; learner walk finding 2).
- With D1, the reveal then shows the trefoil, "Plain loop", the tinted strand and the ringed crossing, with the tally rows. That is the "switch left on" state, measured above at **crop 0, 11 px spare** at 390×844.
- The tally, Reset and chips stay as built. The stage stays live at the reveal, as in every lesson (the kit locks it only at predict).

After D1 to D3, the builder re-runs:
- the walkthrough (the reveal frame must show the tinted trefoil);
- `reveal-fit --strict` at 390×844 (fit, crop 0);
- `fit-probe.mjs` with no override (390×844: crop 0 on both endings; 360×740: explore overflow 6 px or less and the control row at 0).

The builder records the numbers in `build.md`. I do not need to see it again unless a number misses. Any other departure from S1 to S3 or the tint condition comes back to me.

## Note to cm-math-discrete (not a condition)

At 360 wide the title wraps to two lines and costs one line of stage window. A title of about 30 characters or fewer fits one line at 360 (the current one is 34). The wording is yours; I only report the measure.

## What I believe, and how sure

- At 390×844 the lesson meets S1 to S3, U-1, U-2 and the tint condition, and after D1 the reveal fits on both endings: **sure** (measured on the build, 3 options, 2 endings).
- The tint at the beak reads (6.2 px at the reveal, 5.5 px at D2's floor): **fairly sure**. Measured, and seen at 3x in both themes; not seen on a real phone.
- D2 fixes 360×740 and costs 390×844 nothing: **sure** for this kit build (tested as an override). The 537 constant depends on the chrome and the explore hint.
- D3 is required, not cosmetic: **sure**. The reveal's "why" names a stage element that is absent on the QA path.

## Objections, and what happened to each

- **Builder (build.md pre-flight 6): "the tinted strand" is past tense, about what was seen after each switch.** Not accepted for the stage. The learner walk did not read it that way, and the format rule is about the stage at the reveal. D3 restores the state the sentence describes.
- **Builder: 360×740 "recorded, not fixed".** Fixed by D2 at no cost to 390×844. At 360×640 I agree it stays a scroll.
- **Learner walk finding 1 (the slide itself is never shown).** Not a layout matter. It stays with the learning designer and the learner review.

## Next moves

| Move | Owner |
|---|---|
| Apply D1 to D3; re-run the three checks above; record numbers in build.md | demo-builder |
| Title length at 360 (note above), and learner-walk findings 1, 4, 5 | cm-math-discrete / learning-designer |
| Re-walk after D3 (finding 2 is the learner review's to close) | learner-evaluator |
