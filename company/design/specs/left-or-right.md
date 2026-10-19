# Spec: left-or-right (build version B2, the two-sided card)

owner: interaction-designer (Rafael) · 2026-10-16 · board W-1568, W-1584 · status: **build spec. The design lead approved it with changes, and they are folded in here (W-1584): L-1 to L-6. cm-math-discrete's W-1581 rulings are folded in too: B2 is the build, the seen-line wording, Reset dropped, and the figure-eight reveal fallback.**

**Sources:**
- Design review: `company/design/reviews/2026-10-16-knots-specs-review.md`.
- Brief and content rulings: `company/domains/briefs/math.discrete.md` "Knots, batch 1" §4, with "Spec rulings (W-1581)" and "Conditions folded in" (PE-C1 to C4, DL-C1 to C6, S1 to S4).
- Design note: `company/reviews/left-or-right/design.md`.
- Card ruling: principal engineer W-1567, `company/engineering/reviews/2026-10-16-knots-left-or-right-card.md`.
- Picture rulings: design lead W-1566, `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md`.
- Checks: K4, K5b, K13, K17, K19, K21 in `company/domains/briefs/checks/knots-check.mjs`.
- Mockup: `left-or-right.svg`, rendered by `knots-batch1-mockups.mjs` (kit only; run from the repo root). It prints the badge gap and the C1 numbers this spec quotes. The design lead's badge probe gives the same numbers: `node company/design/reviews/2026-10-16-knots-specs-review/badge-probe.mjs 13`.

**Build B2. Nothing else.** Version A and B1 are recorded fallbacks at the end, and neither is built without cm-math-discrete's say-so.

Condition labels: **PE-C*n*** (principal engineer), **DL-C*n*** and **S*n*** (design lead), **L-*n*** (design lead's spec review).

**Format: single card.** One knot on a two-sided card. "Turn over" flips the card in 3-D, and the marks do not change. "Mirror" reflects it, and every mark flips. The learner sees that the two end on the same outline, and that only Mirror changes the hand.

## Stage (top to bottom; knot 290 px wide on a 360 phone, 320 on a 390 phone, 260 on a short phone)
1. **Readout** (`role="status"`, `aria-live="polite"`): "Sum −3" (the writhe of the diagram on show) and a name, "Left-handed" if the sum is negative, "Right-handed" if positive, **nothing at 0** (the name's space stays reserved). Stage rule: the sum describes this drawing only.
2. **Seen line** (muted, one line, space always reserved), written as milestones fire and **never cleared**, not by a chip change and not mid-transition:
   - empty at first;
   - after `turned`: **"Trefoil: turned over −3"**;
   - after `mirrored`: **"Trefoil: turned over −3 · mirror +3"**.
   - The two segments always appear in that order; each appears when its milestone first fires. If Mirror fires first, the line reads "Trefoil: mirror +3" until `turned` fires.
   - The words are cm-math-discrete's (W-1581 ruling 4). "Trefoil:" says whose numbers they are, so they do not read as the figure-eight's when the path ends there. The numbers are claims (K4, K21).
3. **The picture**, the card (structure below), with the **marks overlay** on top of it. The overlay is not inside any transformed element.
4. **Controls row**: Turn over · Mirror.
5. **Chips row**: Trefoil · Figure-eight.

Stage words at the busiest frame: Sum 1 + Left-handed 1 + seen line 6 + Turn over 2 + Mirror 1 + chips 2 = 13, plus 2 for the reduced-motion "Turned over" label = 15 (≤ 25).

## The card
**Structure** (PE-C1, PE-C3, DL-C1, DL-C2):
```
stage (kit)
└─ picture box                      (lesson; overflow: visible; vertical room, see L-5)
   ├─ marks overlay                 (never transformed; aria-hidden; pointer-events: none)
   └─ perspective holder            (perspective: 1200px or more; overflow: visible)
      └─ mirror wrapper             (transform: scaleX(-1) when mirrored; transition-property: opacity only)
         └─ card                    (transform-style: preserve-3d; rotateY 0deg / 180deg; transition: transform 300ms ease-in-out)
            ├─ front face  <svg viewBox="-8 -8 116 116" class="stage-svg">  draw(pd, {layout: L, gap: 0.5})
            └─ back face   <svg …> transform: rotateY(180deg); content:
                  <g transform="translate(100 0) scale(-1 1)"> draw(mirror(pd), {layout: L, gap: 0.5}) </g>
```
The readout and the seen line sit above the picture box, outside every transformed element.

**Drawing (S1, S2).**
- Both faces use `draw(…, { layout: L, gap: 0.5 })`, where L = `layout(knot(n).pd)` is computed once per chip and shared by both faces (DL-C1).
- Use the default `size` and `margin` and `viewBox="-8 -8 116 116"`. Never pass `size`, `margin` or `relax`.
- Stroke: 2 units, `stroke-linecap="butt"`, `var(--fg)`.
- The faces have **no background, border or shadow**: only the strands move.
- **`turnOver(pd)` is never passed to `draw` or `layout`.** It is called for numbers only.

**Faces.**
- Both faces are `backface-visibility: hidden` and `-webkit-backface-visibility: hidden`.
- **The back face's content is authored already reflected** (PE-C1):
  - the back face is pre-rotated `rotateY(180deg)`;
  - at a card angle of 180° the two rotations cancel, so the face shows its content as authored;
  - that content is the reflected `draw(mirror(pd))`, which is the knot turned over: on screen −,−,− for 3₁ and −,+,−,+ for 4₁, equal to `signs(turnOver(pd))` (K17, K19).
  - A plain `draw(mirror(pd))` on the back would show the **mirror knot labelled "turned over"**, the exact misconception. The mockup's last frame shows it as NEVER.
- Never a one-sided flip, never a 360° spin, never a visible back face of one drawing (PE-C3, DL-C2).

## Rest states (PE-C4; the marks, the badge test and the C1 check run on every one, for both knots)
| State | Transforms on screen | What the screen shows | Readout (logical diagram, PE-C2) | Screen x of a crossing | Picture `aria-label` (3₁ / 4₁) |
|---|---|---|---|---|---|
| front | none | `draw(pd)` | `signs(pd)`: 3₁ −−−, 4₁ −+−+ | x | "Trefoil, front. Marks minus, minus, minus. Sum minus 3, left-handed." / "Figure-eight, front. Marks minus, plus, minus, plus. Sum 0." |
| turned | card 180° · back reflection | reflected `draw(mirror(pd))` = turned over | `signs(turnOver(pd))`: −−− / −+−+ | 100 − x of the back drawing | "Trefoil, turned over. …" / "Figure-eight, turned over. …" (marks and sum as front) |
| mirrored | wrapper reflection | reflected `draw(pd)` = mirror knot, same outline as "turned" | `signs(mirror(pd))`: +++ / +−+− | 100 − x | "Trefoil, mirrored. Marks plus, plus, plus. Sum plus 3, right-handed." / "Figure-eight, mirrored. Marks plus, minus, plus, minus. Sum 0." |
| mirrored + turned | wrapper · card 180° · back reflection (two reflections cancel) | `draw(mirror(pd))` as authored = mirror knot | `signs(turnOver(mirror(pd)))`: +++ / +−+− | x of the back drawing | "Trefoil, mirrored and turned over. …" / "Figure-eight, mirrored and turned over. …" (marks and sum as mirrored) |

What the learner should notice: "Turn over" and "Mirror" end on the **same outline**, with every crossing the other way round. Only Mirror changes the marks. That is the lesson's point, made by the picture.

## Marks (L-1; DL-C4)
- **One badge per crossing.**
  - It is a disc of radius 4.6 units, filled `--bg-2`, with a 0.5-unit `--fg` ring.
  - The glyph is "+" or "−" in `--fg`, bold, about 7 units.
  - Units are the face's view-box units, scaled with the picture: 1 unit = 2.5 px at 290.
- **The overlay.** The badges live in an overlay with the same `viewBox="-8 -8 116 116"`, laid exactly over the picture.
  - The overlay is **outside every transformed element**, so no glyph is ever mirrored or squeezed.
  - It is `aria-hidden="true"` and `pointer-events: none`, and so is each badge.
- **Placement, recomputed for each rest state** from the crossings' **on-screen** positions (table above):
  1. Take a ring of radius **13 units** round the crossing (L-1; it was 10). It is the same for every badge.
  2. Try the 32 angles a·π/16, a = 0…31, measured from +x with y down.
  3. Skip an angle if the badge centre would fall outside −3…103 on either axis.
  4. Choose the angle whose badge centre is farthest from every strand. Measure to the strands' centre lines, sampling each edge's cubic at 200 or more points on screen.
  5. On a tie, take the lowest angle.
- **Builder test (L-1), required.** On every rest state of both knots (8 states, 28 badges), assert:

  badge edge to strand edge = (distance from the badge centre to the nearest strand centre line) − 4.6 − 0.25 − 1 **≥ 2.0 units** (5 px at 290).

  - Expected minimum: **2.43 units** (6.1 px at 290, 5.5 px at 260).
  - It falls at **4₁'s crossing 0, the right-hand beak** (front x 96.4, turned x 3.6), in the turned and mirrored + turned states.
  - The crossing that is tight is 4₁'s crossing 0, the right-hand beak (contact-sheet finding 3), not the centre crossing or "the right lens". The centre crossing's badge has 4.1 units or more.
  - At ring 13, every badge is at least 36.4 units from any other crossing and at least 49.1 from any other badge, so no badge reads as belonging to the wrong crossing.

## Controls, in DOM order
| # | Control | Behaviour |
|---|---|---|
| 1 | **Turn over** (`<Control>`, `aria-pressed` true while turned, L-6; `className="active"` while turned) | Card `rotateY` 0° → 180°, **300 ms `ease-in-out`** (DL-C3; the design lead keeps this curve and duration). A second press goes 180° → 0°, back the way it came. Marks as L-3. The readout keeps its value (it does not change, K4). At rest: the picture's `aria-label` updates, and on the trefoil, unmirrored, the first time, milestone `turned` fires and the seen line is written. |
| 2 | **Mirror** (`<Control>`, `aria-pressed` true while mirrored; `className="active"` while mirrored) | Toggles `scaleX(-1)` on the mirror wrapper, which reflects both faces together (DL-C6). **An opacity dip, never a cross-fade and never an animated scale** (L-2, below). If the card is turned over it stays turned over. At rest: readout, picture `aria-label` and marks update; on the trefoil, the first time it rests mirrored (either face), `mirrored` fires and the seen line is extended. On the figure-eight, the first rest mirrored fires the optional `eightMirror`. |
| 3 | Chip **Trefoil** | Shows 3₁ at rest: front, unmirrored, with no animation. Turn over and Mirror go to `aria-pressed="false"`. The seen line stays. **Disabled while current** (`aria-pressed="true"`). |
| 4 | Chip **Figure-eight** | The same for 4₁. |

- **Chips (U-1, carried over from unknot-game).** The current chip is `<Control className="active" disabled aria-pressed="true">`. It is drawn in the kit's selected style (`.control.active:disabled` keeps it at full opacity) and is **never greyed**. The other chip is enabled and plain.
- **No Reset** (W-1581 ruling 3, design lead accepted):
  - Turn over and Mirror each toggle back, and a chip change returns to rest, so Reset would only duplicate them. It would also empty the stage the reveal describes (`company/design/formats.md`: "No reset that empties it").
  - For crit: demo-standard Pre-flight 6 ("press Reset last") is **not applicable** here, not a miss.
- **During predict:** Turn over and Mirror are disabled and greyed, and the other chip is disabled and greyed. The current chip is shown selected (U-1). The marks, readout and picture are shown. The seen line is empty.
- **Why this order:** `tests/qa/contract.spec.ts` counts the controls once and presses them by index, skipping disabled ones. With the chips last, the trefoil milestones happen first and the path ends on the figure-eight. The disabled current chip is skipped, so it cannot fail "every control does something".

## Motion, exactly
**L-2. Mirror is an opacity dip.** Never superimpose the unreflected and the reflected outline: a frame with both is a picture with false crossings.
1. At the press, fade the **mirror wrapper's** `opacity` 1 → 0 over **100 ms**.
2. At 0 (on `transitionend` of opacity, with a timer fallback at 150 ms), set or remove `scaleX(-1)`. The wrapper has **`transition-property: opacity` only**, so the transform changes in one frame, unseen.
3. Fade `opacity` 0 → 1 over **100 ms**.

- The total is 200 ms, inside the QA path's 450 ms wait.
- There is only one copy of the card; nothing is cross-faded.

**L-3. The marks.**
- On a Turn over or Mirror press, the overlay's opacity goes to 0 in **≤ 100 ms**, starting at the press.
- Compute the badge positions and values for the **target** rest state.
- Fade the overlay back in over **≤ 150 ms**, starting at rest. "At rest" is:
  - for Turn over, `transitionend` of the card's `transform`;
  - for Mirror, `transitionend` of the wrapper's fade-in;
  - each with a **timer fallback at the duration plus 50 ms** (350 ms for the flip, 250 ms for the dip), so a missed `transitionend` never leaves the marks hidden.
- **A press during a transition retargets.**
  - A second Turn over mid-flip reverses the CSS transition from the current angle.
  - A Mirror press mid-flip runs its dip at once.
  - A Mirror press mid-dip changes the transform target, which is applied at opacity 0.
  - The marks stay hidden until the final rest, then fade in at the final state's positions.
  - Controls are never disabled during a transition.

**L-4. The readout and the seen line never blank.**
- During any transition, the readout keeps its last rest value and updates at rest, at the moment the marks start fading in. For Turn over the value does not change anyway (K4).
- The seen line only grows. It is written at rest when a milestone fires.
- No text node is emptied or removed mid-transition. Blanking moves text and makes a flicker. (The original mockup dropped "Sum" mid-flip; the regenerated one does not.)

**L-5. Perspective and overflow.**
- Put `perspective: 1200px` (or more) on the card's parent (the perspective holder).
  - At 1200 px, the near edge of a 320 px card grows at most about 15 % in height mid-flip (about 25 px above and below at 320, 20 px at 290). The width grows under 1 %.
- Nothing clips the card mid-turn:
  - `overflow: visible` on every lesson element between the card and the kit's `.stage`;
  - the picture box reserves vertical room of at least **8 % of the card's width** above and below the card, so that growth stays inside `.stage` (the kit's `.stage` is `overflow: auto`, and the lesson does not restyle it).
- The mockup's flip frames are orthographic (|cos θ| squeeze). The built sheet (S4) is the check.

**Mid-flip on 4₁ (accepted by the design lead).**
- With `ease-in-out` over 300 ms, the card spends about 53 ms between 63° and 117°, where 4₁'s closest strands touch. In that band the face is under 45 % of its width. Nothing is labelled and the marks are hidden.
- Do not change the curve or the duration. If a learner review reports a flicker read as a knot change, it goes back to the design lead.

**Reduced motion** (`prefers-reduced-motion: reduce`):
- Turn over swaps instantly to the 180° end state (the reflected back face, not the front) and shows a 1 s "Turned over" label (DL-C3).
- Mirror swaps instantly, with no dip.
- The marks reappear at once at the new positions.
- The readout, seen line and milestones behave as above.

**L-6. Accessibility.**
- Turn over and Mirror carry `aria-pressed`. The chips carry `aria-pressed`, and the current one is disabled.
- The picture box has `role="img"` with the per-state `aria-label` in the rest-state table, updated at rest.
- The marks overlay is `aria-hidden`. The readout is `aria-live="polite"`.

## QA path (each control once, in DOM order; 4 controls counted on 3₁)
1. Turn over → `turned` (marks −,−,−, Sum −3, Left-handed), seen line "Trefoil: turned over −3". It settles at 300 ms, and the readout and seen line are written by then, inside the 450 ms wait.
2. Mirror → on the turned card: mirrored + turned (marks +,+,+, Sum +3, Right-handed), `mirrored`, seen line "Trefoil: turned over −3 · mirror +3". It settles at 200 ms.
3. Chip Trefoil → disabled, skipped.
4. Chip Figure-eight → 4₁ front, unmirrored, Sum 0, no name, both toggles unpressed, seen line kept.

**Stage at the reveal:** 4₁, Sum 0, and "Trefoil: turned over −3 · mirror +3". `minInteractions = 2`. Key states: `turned` and `mirrored`; optional `eightMirror` (4₁ mirrored, Sum 0), which is not on the path.

Every press changes the stage fingerprint: Turn over changes the seen line, Mirror changes the readout, and the chip changes the knot.

## Reveal (cm-math-discrete owns the words; the brief's script, with the W-1581 fallback)
- **Default, because the QA path does not fire `eightMirror`:** "Turning the trefoil over left every mark minus: turning over is a way of moving it, so its hand stayed left. Mirroring turned every mark plus, and no wiggling gets back: the trefoil is not its own mirror image, as Max Dehn proved in 1914. **The figure-eight is different: it is its own mirror image.** So a trefoil comes in a left and a right version, and turning one over never swaps them."
- **Only if `eightMirror` fired:** the figure-eight sentence is "The figure-eight's marks summed to 0 both ways, and it is its own mirror image."
- "minus" quotes `turned` and "plus" quotes `mirrored`. Both are reached on the path and both stay on the stage in the seen line.
- Cut order, if held: "as Max Dehn proved in 1914", then the figure-eight sentence.

## Shown, not told
The learner turns the card over and watches every gap move while the marks stay minus. They press Mirror and the outline does not change from the turned picture, but every crossing flips and the marks go plus. "Turning over is not mirroring" is two pictures with the same outline and different marks before the reveal says it.

## Builder obligations (from the rulings, collected; the build and its tests are the builder's)
1. **Browser check (PE-C1).** After each rest state settles, an off-centre crossing's screen x matches the rest-state table: a `getBoundingClientRect` of a marker at crossing 0, or the composed `DOMMatrix`. Script numbers in view-box units: 3₁ crossing 0 at x 82.0 front, 18.0 turned; 4₁ crossing 0 at 96.4 front, 3.6 turned.
2. **Signs test (PE-C2, DL-C5).** For each rest state per chip, read the signs from the displayed geometry and assert they equal the readout column. Use `geoSigns` in `company/engineering/reviews/2026-10-16-W-1567-flip-probe.mjs`, or `pictureSigns` in the design lead's `sheet.mjs`.
3. **Badge gap test (L-1).** The ≥ 2.0-unit assertion above, on all 8 rest states.
4. **WebKit too** (the `-webkit-backface-visibility` prefix).
5. **Motion:** the dip (L-2), the marks timing with timer fallbacks (L-3), and no blanking (L-4). A test that fires a press and never dispatches `transitionend` must still see the marks back within duration + 50 ms + 150 ms.

## Mockup (`left-or-right.svg`, regenerated for W-1584 at ring radius 13)
Each block of rows is drawn in dark, then light.
1. **B2, the QA path:** start; Turn over at rest; Mirror mid-dip (picture at opacity 0, readout kept); Mirror at rest; Figure-eight chip.
2. **B2 Turn over frames**, 3₁ and 4₁: 0°, 60°, 90°, 120°, 180°. They are orthographic. The marks are hidden and the readout is kept mid-flip.
3. **4₁'s four rest states**, with the badge at the beak.
4. **Not the build:** B1 front and turned, A "Turned over?" and A Mirror, and the forbidden counter-rotated back face.

In every row, toggles are drawn active while pressed and the current chip is drawn selected. Not a visual design.

## Design-review changes folded in (W-1584)
| Change | Where in this spec |
|---|---|
| L-1: ring radius 13; badge-edge ≥ 2.0 units tested on every rest state; badges `aria-hidden`, `pointer-events: none`; tight badge is 4₁ crossing 0 (the right-hand beak), not "the right lens" | Marks; Builder obligation 3 |
| L-2: Mirror is an opacity dip (100 ms out, transform with no transition, 100 ms in), never a cross-fade | Motion, L-2 |
| L-3: marks hide ≤ 100 ms at the press, fade in ≤ 150 ms at rest, timer fallback duration + 50 ms, presses retarget | Motion, L-3 |
| L-4: readout and seen line never blank | Motion, L-4; Stage 2 |
| L-5: perspective ≥ 1200 px, no clipping | Motion, L-5; Structure |
| L-6: `aria-pressed` on Turn over | Controls; Motion, L-6 |
| U-1 (from unknot-game): the current chip looks selected | Controls |
| W-1581: B2 is the build; seen line "Trefoil: turned over −3 · mirror +3"; Reset dropped; figure-eight reveal fallback is the default | Header; Stage 2; Controls; Reveal |

## Appendix: recorded fallbacks (not the build)
- **B1, Mirror in place.** Build it only if the builder's rendered check (obligation 1) shows the B2 wrapper composing wrongly, and then only after telling cm-math-discrete.
  - Mirror swaps both faces' content together: the front becomes `draw(mirror(pd))` and the back the reflected `draw(pd)`.
  - The outline is the same in both states, so a true cross-fade is allowed here (the L-2 objection does not apply).
  - Everything else is as B2.
  - Rest states: mirrored shows `draw(mirror(pd))`; mirrored + turned shows the reflected `draw(pd)`. The readouts are as in the table.
- **A, caption only.** Build it only if the card cannot be made to rest on the turned-over picture, and only after telling cm-math-discrete. There is no 3-D flip.
  - Controls, in order: **"Turned over?"** (`aria-expanded`), then Mirror (in place, as B1, cross-fade allowed), then the chips.
  - "Turned over?" toggles the caption "Turned over in your hands: same knot, same marks." (W-1581 ruling 5, 9 words). The picture and marks stay unchanged; the marks come from `signs(turnOver(q))`, equal to the current marks (K4). Its first press on the trefoil fires `turnedTold` and writes "Trefoil: turned over −3".
  - The control is **never named "Flip it over"**.
  - "Turn it round" is **not part of A** (unreviewed by both rulings).
  - The reveal uses the same figure-eight fallback. The A reveal's "the mirror button changed nothing that matters" is not used.
  - Known weakness: the gap is told, not shown.

## Open, and whose
- The built walkthrough sheet (S4) is the design lead's to check: 4₁ mid-flip in motion, the badge at the beak at 6.1 px, the perspective growth, and the dip.
- Whether the signs test lives in the kit or in the lesson: principal engineer (DL-C5).
