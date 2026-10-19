# Engineering ruling: 2026-10-16: left-or-right two-sided card and README rule 2(a) (W-1567)

owner: principal-engineer · board: W-1567 (this), W-1566 (design lead, the visual half, in parallel) · base: `3de3a9d3`
- Question from: learning-designer, `company/reviews/left-or-right/design.md` ("A construction that avoids it").
- Rules applied: `src/kit/knots/README.md` rule 2(a); [EDD-011](../edd/EDD-011-knots-extra-crossings.md) Part 1; conditions 1 to 3 in [the W-407 re-read](2026-10-16-knots-w407-reread.md) (Decision, F2, F4).
- Evidence: [2026-10-16-W-1567-flip-probe.mjs](2026-10-16-W-1567-flip-probe.mjs), run from the repo root against the shipped kit. Review evidence only: not a test and not lesson code.
- Tier: this is a scope ruling with no code change. A lesson built on it is ordinary lesson work (tier 1) and needs no engineering review beyond the conditions below.

## Ruling

1. **The two-sided card fits rule 2(a) and EDD-011 Part 1 as written. No addendum is needed.** The only picture the kit draws is `draw(mirror(pd), { layout: L })` with `L` the entry's stored layout, at the default `size` and `margin`. That is Part 1 item 2 under conditions (i) and (ii). The reflection is a CSS presentation transform, the same kind condition (ii) already allows for scaling ("by the SVG `viewBox` or CSS"). Block (a) exists because of extra crossings in the curve set. A reflection, or any other one-to-one map of the plane, cannot add a crossing to a curve set or remove one. The README's "including `turnOver(pd)`" means `turnOver` output passed to `draw` or `layout`. That stays inside block (a), and nothing here changes it.
2. **The equivalence is exact, but only if the screen at rest shows the left-right reflection of the mirror drawing.** The designer's text ("the back face is `draw(mirror(pd))`") does not guarantee that. The usual way to build a CSS card flip ends on the **mirror knot**. That is condition C1 below, and it is the one way this construction can fail.
3. **Mid-flip frames are correct and fall outside block (a).** Their legibility near 90° belongs to the design lead (W-1566).
4. **The revised brief 4 is inside the rules.** It is mirror-only, and "Flip it over" is a caption only. One sentence in it is now stale (below).

## 1. Is a reflected mirror drawing the turned-over knot? (measured)

The kit defines `turnOver` as "a planar reflection plus every crossing switched" (`index.d.ts`). In `core.mjs`, `turnOver` keeps every crossing index, swaps slots 1 and 3 (the planar reflection) and flips `u` (every crossing switched). `mirror` flips `u` only. So reflecting the mirror gives the turned-over diagram. Measured with the probe, for all 17 one-component entries with `L = layout(pd)`, default options:

| check | result |
|---|---|
| Crossing signs read **from the geometry** of the reflected mirror drawing (over-strand end, under-strand end, cross product, calibrated against `draw`'s own signs on the unreflected drawing) vs `signs(turnOver(pd))` | **equal, 17 of 17**, crossing by crossing (3₁: −1 −1 −1; 4₁: −1 +1 −1 +1) |
| Curves of the reflected mirror drawing vs `draw(turnOver(pd), { layout: L reflected })`. L is re-indexed for `turnOver`'s slot order, each edge is matched to its nearest edge, and the table gives the worst gap. | **0.00 of 100** for 15 entries, including 3₁ and 4₁. **0.10** for 7₅ and 10₈: their frames are not centred (draw's 1.2× stretch cap), so the reflection line is x = 46.8 or 47.2, and the gap is rounding at 1 decimal. |
| The mirror drawing seen **unreflected**: what a pre-rotated back face shows at rest (C1) | signs = `signs(mirror(pd))`, which **differ** from `turnOver`'s on every knot. This is the mirror knot. |
| The **front** drawing reflected: a one-sided flip, or the design note's `scaleX(-1)` Mirror option | signs = `signs(mirror(pd))` on all 17 entries. This confirms re-read F4, and it shows the Mirror option draws a true mirror image. |

So, pixel for pixel, the reflected mirror drawing **is** `draw(turnOver(pd))` on the reflected stored layout. That picture is the cleared mirror picture moved by an isometry, so it has the same crossings, separations and gaps. It is **not** `draw(turnOver(pd))` with `layout(turnOver(pd))`: that layout is recomputed and differs, and it stays inside block (a). The probe draws `turnOver` only to compare the two, and no lesson may copy that call.

**The designer's proposed builder test is feasible.** The probe does it: it reflects the drawn geometry, reads signs from the paths, and compares them with `signs(turnOver(pd))`. The negative control (a one-sided flip reads as `mirror`) shows the test can fail. It is a pure function test with no DOM. It pins the picture's **content**. It cannot pin which way the browser shows it (C1).

## 2. Conditions on a build (they travel with the ruling)

- **C1. The rest frame must be the reflection, and it must be checked in the browser.** If both faces have `backface-visibility: hidden`, the back face must itself be rotated `rotateY(180deg)`, or it is never visible. At a container angle of 180° its net transform is then the identity, and it shows its content **as authored**. So if the back face's content is `draw(mirror(pd), { layout: L })` as the design note says, the screen at rest shows the **mirror knot**, the exact misconception (row 3 above). The authored back face must already be reflected, for example the mirror paths inside `<g transform="translate(100 0) scale(-1 1)">` on the default 0 to 100 box. Then the rest frame is the turned-over picture, and every frame from 90° to 180° continues the front's motion without a jump (x' = x·cos θ on both sides of 90°). That is the true rendering of a rigid half-turn of a flat rope. The builder proves it in the rendered page, not in the CSS source: after Turn over settles, the screen x of one off-centre crossing (a `getBoundingClientRect` of a marker at crossing 0, or the composed `DOMMatrix`) equals the stage width minus its front-face x. If the check is a lesson test or a demo-crit step, it is the builder's job. Changing `tests/qa` is the evaluation steward's call and is not required here.
- **C2. The readout comes from the logical diagram, and a unit test ties it to the picture.** Show `signs(turnOver(pd))` (and `signs(turnOver(mirror(pd)))` after Mirror while turned over). For every reachable rest state the lesson shows (front, turned over, mirrored, mirrored while turned over, per chip), read the signs from that state's displayed geometry, as in the probe, and assert that they equal the readout. The probe's `geoSigns` can be copied as is.
- **C3. Never a one-sided flip, never a spin past 180°, never `turnOver` passed to `draw` or `layout`.** Both faces are `backface-visibility: hidden` (add the `-webkit-` prefix too, and check in WebKit). The container uses `transform-style: preserve-3d`. If either is missing, the frames from 90° to 180° show the reflected **front**, which is the mirror knot (row 4). A 360° spin passes through that frame. Turn over flips back the way it came.
- **C4. Mirror as `scaleX(-1)` (the design note's option) fits on the same grounds.** It is a reflection of the cleared front drawing, it draws a true mirror image (row 4), and its readout is `signs(mirror(pd))` at the reflected positions. C2 covers it. If it is combined with the card, the builder must write down, for each rest state, which transforms compose. The C1 browser check runs on every one of those states.
- Unchanged: default `size`/`margin` and `viewBox` padding (re-read F2, K13), runtime `layout(knot(n).pd)` with default `relax`, blocks (b) and (c), and the design lead's contact sheet. The turned-over rest frame is a picture the design lead has not seen, so it goes on the sheet. Whether a CSS-reflected cleared drawing is a cleared **picture** is W-1566 and not mine to decide.

## 3. Mid-flip frames, near 90°

With C1 and C3 in place, a frame at angle θ shows the front drawing squeezed horizontally by cos θ for 0° < θ < 90°, and the reflected-mirror drawing squeezed by |cos θ| for 90° < θ < 180°. With `perspective`, each frame is a projective image instead. Each of these maps is one-to-one and keeps orientation on the visible face. So every frame shows the **same diagram** as the face it belongs to: the same crossings, over/under and signs (the knot before 90°, the turned-over knot after). **No frame shows the mirror.** At exactly 90° the card is edge-on and shows a line, not a diagram. On engineering grounds, nothing in the flip falls inside block (a)'s reasons, and no frame needs an addendum.

Legibility is a separate question, and it belongs to the design lead. Horizontal distances shrink by |cos θ|. The re-read measured 4₁'s minimum strand separation at 3.47 % of size, and the reference stroke is 1.6 of 100 (`company/design/reviews/2026-10-14-knot-pictures.md`). So on 4₁, the closest strands can touch visually for roughly 63° < θ < 117°, and gaps close where strands run nearly horizontal. With a linear 300 ms that is about 100 ms of an unreadable picture, and less if an ease-in-out moves faster through the middle. It is not a false picture: no frame in that band shows a different knot that could be read. Reduced motion is an instant swap (design note), so it has no mid frames. The per-crossing marks sit outside the transformed element, and whether to hide them during the flip is a call for the interaction designer (W-1568).

## 4. Revised brief 4 (cm-math-discrete, `company/domains/briefs/math.discrete.md`, "4. left-or-right", W-1550)

**Inside the rules.**
- Its pictures are `draw(pd or mirror(pd), { layout: layout(knot(n).pd) })`: Part 1 items 1 and 2, with conditions (i) and (ii) met. The layout is computed at run time with default `relax`, at default `size`/`margin`, and the `viewBox` is `-8 -8 116 116`.
- `turnOver` is used for numbers only.
- `simplify` is used for status only.
- "Flip it over" changes nothing drawn.
- Its K4/K5/K5b/K13 lines reproduce on the shipped kit (`node company/domains/briefs/checks/knots-check.mjs`, run for this ruling).
- The marks after "Flip it over" are `signs(turnOver(pd))`. They equal the current marks crossing by crossing (probe column `turnOver`, and K4), so the marks stay where the crossings are and stay correct.

**One stale sentence, for the brief's owner.** "There is no turned-over picture to review, and none may be added without an EDD-011 addendum covering `turnOver`" was right when it was written. After this ruling, a turned-over **rest frame** made as in C1 needs no addendum. A drawn `turnOver(pd)` still does. The ban on "a CSS `rotateY` or any 3-D flip" is a product choice the brief may keep. Choosing between mirror-only and the card belongs to cm-math-discrete and the learning-designer, after W-1566. The learning-designer flags mirror-only as a likely revise under `company/decisions/2026-10-14-told-vs-shown.md`, and that call belongs to head-of-product. Board item added for cm-math-discrete.

## Objections that travel with it

- **"A CSS reflection *depicts* `turnOver`, so it should sit inside block (a) like a drawn `turnOver`"** (design note, "Why it needs a ruling"). Answered: block (a) is about extra crossings, which are a property of the drawn curve set. Here the curve set is a cleared drawing, moved by an isometry. The thing F4 kept inside block (a) is the recomputed `layout(turnOver(pd))`, and it is not used. What does need guarding is the direction of the reflection (C1), and a test guards it, not the import block.
- **"It is exact" (design note).** Holds for the content: the signs and the curves (section 1). It does not hold for the construction as written, which ends on the mirror if the back face is authored unreflected in the usual idiom (C1). The claim stands once C1 is met.
- **Re-read F4's advice ("use `backface-visibility: hidden` and end on the original drawing")** still holds for a one-sided card. The two-sided card with C1 is a second correct construction, not a reversal.

## What I did (files)

- This record, and the probe `company/engineering/reviews/2026-10-16-W-1567-flip-probe.mjs`.
- [EDD-011](../edd/EDD-011-knots-extra-crossings.md) Part 1: one sentence pointing here. The scope and conditions are unchanged.
- No change to `src/kit/knots/README.md`. Rule 2 says a scope question is settled "in writing in the EDD or the review record", and this is that record. If rnd-lead touches the README for W-1549, a pointer would help builders.
- Board: W-1567 to done. New item for cm-math-discrete (brief 4 stale sentence and the choice between the two versions).

## Kudos (optional)

- @learning-designer: found the hazard before anyone built it, proposed a construction that is right about the content, and asked for the test that pins it. That made this ruling a measurement.
