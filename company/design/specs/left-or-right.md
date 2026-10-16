# Spec: left-or-right (two versions)

owner: interaction-designer (Rafael) · 2026-10-16 · board W-1568 · status: draft, for design review · brief: `company/domains/briefs/math.discrete.md` "Knots, batch 1" §4 (W-1550 revision; versions A and B, W-1569) · design note: `company/reviews/left-or-right/design.md` · rulings: principal engineer W-1567 `company/engineering/reviews/2026-10-16-knots-left-or-right-card.md` (card inside rule 2(a), conditions C1 to C4) and design lead W-1566 `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (card preferred and cleared, conditions C1 to C6 and S1 to S4; `scaleX(-1)` Mirror cleared) · check: K4, K5b, K13, K17 in `company/domains/briefs/checks/knots-check.mjs` · mockup: `left-or-right.svg`, rendered by `knots-batch1-mockups.mjs` (kit only)

**Which version is built is cm-math-discrete's call** (the brief is theirs; both rulings are now on disk, and the design lead prefers B). This spec makes both buildable. Condition labels below are prefixed: **PE-C1…C4** (principal engineer), **DL-C1…C6** and **S1…S4** (design lead).

## Shared by both versions
- **Picture.** `draw(q, { layout: L, gap: 0.5 })`, L = `layout(knot(n).pd)` once per chip, q ∈ {pd, mirror(pd)}. Default `size`/`margin`, `viewBox="-8 -8 116 116"`, stroke 2, butt caps, `--fg` (S1, S2). Knot 290 px wide on a 360 phone. **`turnOver(pd)` is never passed to `draw` or `layout`**; it is called for numbers only.
- **Marks.** One badge (+ or −, radius about 4.6 units, `--bg-2` disc, `--fg` ring and glyph) per crossing, drawn in an overlay **outside every transformed element** (DL-C4), so no glyph is ever mirrored or squeezed. Placement: on a ring of radius 10 units round the crossing's **on-screen** position (just outside the 44 px hit area), at the angle farthest from every strand, inside the view box. Recompute per rest state. In the mockup the smallest badge-centre to strand distance over all rest states is 7.0 units (script output), so no badge sits on a strand; 4₁'s centre crossing (the right lens, 10 px wide) is the tight one, check it on the sheet.
- **Readout**, above the picture: "Sum −3" (the writhe of what is shown) and a name, "Left-handed" if negative, "Right-handed" if positive, **nothing at 0**. Stage rule kept: the sum describes this drawing only.
- **Seen line** (muted, under the readout), written as milestones fire and never cleared: "Turned over −3", then "Turned over −3 · Mirror +3". It is what keeps the trefoil's numbers on the stage when the QA path ends on the figure-eight.
- **Chips** Trefoil · Figure-eight, **last in DOM order**, current chip disabled (`aria-pressed="true"`). A chip change shows the new knot at rest, front, unmirrored, with no animation; the seen line stays.
- **No Reset** (the brief lists one). Every other control toggles back, so Reset would only duplicate them, and it would empty the stage the reveal describes. cm-math-discrete: please drop it from the brief's control list.
- Why chips last: `tests/qa/contract.spec.ts` counts the controls once and presses them in index order. With chips last, the trefoil milestones happen first and the path ends on the figure-eight, whose Sum 0 is the reveal's last point.

## Version A: mirror only, caption-only turned-over control, optional "Turn it round"
Build if cm-math-discrete chooses caption-only. Nothing in A draws a turned-over picture.

**Controls, in DOM order**
| # | Control | Behaviour |
|---|---|---|
| 1 | **"Turned over?"** (brief: "Flip it over"; see note) | Toggles the caption "Turned over in your hands: same knot, same marks." Picture unchanged. Marks are recomputed from `signs(turnOver(q))`; they equal the current marks crossing by crossing (K4), so nothing moves. First press on the trefoil: milestone `turnedTold`, seen line "Turned over −3". `aria-expanded`. |
| 2 | **"Turn it round"** (optional, needs cm-math-discrete's yes) | CSS `rotate(180deg)` of the picture element in the plane, 300 ms ease-in-out; second press turns back the same way. Reduced motion: instant. The marks overlay is **not** rotated: badges move to the rotated crossing positions at rest (hidden during the turn) and keep their values. A real motion that visibly changes the picture and changes no mark. |
| 3 | **Mirror** | Toggles q between pd and `mirror(pd)` on the same layout: every gap moves to the other strand, the curve does not move. Cross-fade 150 to 400 ms, instant under reduced motion. First press on the trefoil: milestone `mirrored`, seen line "… · Mirror +3". Hides the caption (the marks have changed). |
| 4, 5 | Chips | As shared. |

- **Label note (objection carried).** The design lead ruled that a control named "Flip it over" that flips nothing promises an action the stage does not perform, and that the wording is cm-math-discrete's (W-1566, "The caption-only version has a design defect"). I propose the question chip "Turned over?". If cm-math-discrete keeps an action label, the defect stands and goes back to the design lead.
- **Caption length.** The brief's caption is 17 words and breaks the 25-word stage budget with everything else on screen. Proposed 9-word caption above; the words are cm-math-discrete's.
- Stage words at the busiest frame: Sum 1, Left-handed 1, seen line 3, caption 9, controls 2 + 3 + 1, chips 2 = 22 (19 without "Turn it round").
- **QA path:** Turned over? (`turnedTold`) · Turn it round (rotated; settles in 300 ms, inside the 450 ms wait) · Mirror (`mirrored`, +3, Right-handed) · Trefoil (disabled, skipped) · Figure-eight (4₁, Sum 0, no name). `minInteractions = 2`.
- **Reveal check:** the brief's A reveal says "for it the mirror button changed nothing that matters", which the QA path does not reach (Mirror is never pressed on 4₁). Use the design note's fallback when `eightMirror` has not fired: "The figure-eight is different: it is its own mirror image." (cm-math-discrete.)
- Mockup row A (both themes): start, Turned over?, Turn it round, Mirror, end of QA path.

## Version B: the two-sided card (preferred by the design lead)
**Structure** (PE-C1, PE-C3, DL-C1, DL-C2):
```
stage
├─ marks overlay + readout          (never transformed)
└─ mirror wrapper                   (B2 only: transform scaleX(-1) when mirrored)
   └─ card                          (transform-style: preserve-3d; perspective on its parent; rotateY 0 / 180)
      ├─ front face  <svg viewBox="-8 -8 116 116">  draw(pd, {layout: L, gap: 0.5})
      └─ back face   <svg …> rotateY(180deg); content:
            <g transform="translate(100 0) scale(-1 1)"> draw(mirror(pd), {layout: L, gap: 0.5}) </g>
```
- Both faces `backface-visibility: hidden` and `-webkit-backface-visibility: hidden`.
- **The back face's content is authored already reflected.** The back face is pre-rotated `rotateY(180deg)`, and at a card angle of 180° the two rotations cancel, so the face shows its content as authored. A plain `draw(mirror(pd))` there would show the **mirror knot labelled "turned over"**, the exact misconception (PE-C1; K17 prints that case false; the mockup's last frame shows it). With the reflected content, the rest frame is the reflected mirror drawing, which is the turned-over knot: on screen −,−,− for 3₁ and −,+,−,+ for 4₁ = `signs(turnOver(pd))` (K17, PE §1, DL finding 9).
- Never a one-sided flip, never a 360° spin, never a visible back face of one drawing (PE-C3, DL-C2).

**Controls, in DOM order**
| # | Control | Behaviour |
|---|---|---|
| 1 | **Turn over** | Card `rotateY` 0° → 180°, 300 ms ease-in-out (DL-C3: 150 to 400 ms); a second press goes 180° → 0°, back the way it came. Marks fade out at the press and reappear at rest at the new face's positions (crossing x reflected). Reduced motion: instant swap to the 180° end state, plus a 1 s "Turned over" label. First press on the trefoil: `turned` (marks −,−,−; seen "Turned over −3"). |
| 2 | **Mirror** | **B2 (build this; cleared by PE-C4 and the design lead, who prefers it):** toggles `scaleX(-1)` on the mirror wrapper, which reflects both faces together (DL-C6). **Cross-fade 200 ms, never an animated scaleX**: a squeeze through zero width looks exactly like turning a card over, which would teach "flip gives the mirror". Reduced motion: instant. **B1 (fallback if cm-math-discrete wants the curve fixed):** both faces swap content together, front `draw(mirror(pd))`, back the reflected `draw(pd)`; same cross-fade. First press on the trefoil: `mirrored` (marks +,+,+; seen "… · Mirror +3"). |
| 3, 4 | Chips | As shared; a chip change also returns the card to 0° and the wrapper to unmirrored, without animation. |

**Rest states and what composes** (PE-C4 asks for this written down; the marks and the C1 check run on every one)
| State | Transforms on screen | What the screen shows | Readout (logical diagram, PE-C2) |
|---|---|---|---|
| front | none | `draw(pd)` | `signs(pd)` (3₁: −−−) |
| turned | card 180° · back reflection | reflected `draw(mirror(pd))` = turned over | `signs(turnOver(pd))` (−−−) |
| mirrored (B2) | wrapper reflection | reflected `draw(pd)` = mirror knot, same outline as "turned" | `signs(mirror(pd))` (+++) |
| mirrored + turned (B2) | wrapper · card 180° · back reflection (two reflections cancel) | `draw(mirror(pd))` as authored = mirror knot | `signs(turnOver(mirror(pd)))` (+++) |
| B1 mirrored / + turned | content swapped, as front / turned | `draw(mirror(pd))` / reflected `draw(pd)` | `signs(mirror(pd))` / `signs(turnOver(mirror(pd)))` |

What the learner should notice under B2: "Turn over" and "Mirror" end on the **same outline**, and every crossing is the other way round; only Mirror changes the marks. That is the lesson's point, made by the picture.

- Stage words at the busiest frame: Sum 1, Left-handed 1, seen line 3, Turn over 2, Mirror 1, chips 2 = 10 (+2 for the reduced-motion label).
- **QA path:** Turn over (`turned`; settles in 300 ms) · Mirror (`mirrored`, on the turned card: +,+,+) · Trefoil (disabled, skipped) · Figure-eight (4₁ front, Sum 0, no name). `minInteractions = 2`; `eightMirror` (4₁ mirrored, Sum 0) is optional and not on the path, so the reveal uses the fallback figure-eight sentence unless it fired.
- **Mid-flip (PE §3, DL):** between about 63° and 117° 4₁'s closest strands touch visually. Ease-in-out spends the least time there; the marks are hidden for the whole flip. Whether that is readable enough is the design lead's call on the built sheet.
- **Builder obligations** (from the rulings, collected here; the build and its tests are the builder's):
  1. **Browser check (PE-C1):** after Turn over settles, an off-centre crossing's screen x = stage width − its front x (`getBoundingClientRect` of a marker at crossing 0, or the composed `DOMMatrix`), on every rest state above. Script numbers in view-box units: 3₁ crossing 0 at x 82.0 → 18.0; 4₁ crossing 0 at 96.4 → 3.6.
  2. **Signs test (PE-C2, DL-C5):** for each rest state per chip, read the signs from the displayed geometry (`geoSigns` in `company/engineering/reviews/2026-10-16-W-1567-flip-probe.mjs`, or `pictureSigns` in the design lead's `sheet.mjs`) and assert they equal the readout column above.
  3. Check in WebKit as well (the `-webkit-` prefix).
- **Accessibility:** the picture has `role="img"` with an `aria-label` that states the rest state ("Trefoil, turned over. Marks minus, minus, minus. Sum minus 3, left-handed."); the marks overlay is `aria-hidden`; the readout is `aria-live="polite"`.
- Mockup rows B (both themes): 3₁ and 4₁ at 0°, 60°, 90°, 120°, 180°; then Mirror end states B1 front and turned, B2 front and turned, and the forbidden counter-rotated back face for reference. The flip frames are orthographic (|cos θ| squeeze); a real `perspective` adds foreshortening.

## Open, and whose
- A or B, the "Turned over?" label, the 9-word caption, dropping Reset, the figure-eight reveal fallback, and whether to keep "Turn it round" in A: cm-math-discrete.
- Mid-flip legibility on 4₁ and the badge placement near 4₁'s right lens, on the built walkthrough sheet (S4): design lead.
- The browser check and the signs test: builder (whether the signs test lives in the kit or the lesson is the principal engineer's call, DL-C5).
