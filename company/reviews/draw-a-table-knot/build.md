# Build note: draw-a-table-knot

Builder: demo-builder (demo-builder-w1539), 2026-10-16. Board W-1539. Status **draft**; all 8 claims **unverified**.
Inputs: brief `company/domains/briefs/math.discrete.md` "Knots, batch 1" #1 with the accepted "Designer's proposals (W-1569)" (switch a crossing, answer B); design note `company/reviews/draw-a-table-knot/design.md`; check `node company/domains/briefs/checks/knots-check.mjs` (K1, K6, K8, K14 re-run first; my own node re-run of every single switch agrees with K14: 6_1 switches 0, 2, 3, 5 give 4_1 and 1, 4 give 0_1; 5_2 switches 0, 2, 4 give 3_1 (mirror) and 1, 3 give 0_1). Picture conditions: design-lead S1 to S4, `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (brief 1: pictures cleared).

Kept from evaluators until they report.

## What was built
- Stage: the kit's 6_1 (first) or 5_2 drawing; tap a crossing to switch it; one switch at a time (tapping another restores the first; tapping the switched one switches it back). A thin ring (`var(--domain)`, r 9 units) marks the switched crossing. Readout "Crossings drawn: 6 · Name: 6₁" (`crossingCount`, `identify` name only; 0_1 reads "0₁, plain loop"). Seen line "Seen on 6₁: 6 drawn, name 4₁" (the last switch; survives Reset and chip changes). Chips 5₂ | 6₁ and Reset in one row. Caption "Switch: top strand goes under" (brief's words).
- Milestone `switched` (minInteractions 1). The first crossing in DOM order reaches it on either chip (K14: every single switch changes the name).
- Reveal: the brief's script, branching on the recorded {chip, drawn, name}.
- Recall: the designer's (9 crossings, 5₂).

## Kit rules (README rule 1 and 2(a) scope; principal-engineer conditions; CEO-office approval of W-1539)
- Imports only from `@/kit/knots`: `knot, layout, draw, crossingChange, crossingCount, identify` and types.
- `layout` is computed once per knot, in a `useMemo` on mount, default `relax`. Taps redraw with `draw(pd, { layout: L, gap: 0.5 })` on that stored layout. `size`, `margin` and `relax` are never passed. Scaling is only by the SVG viewBox and CSS.
- Drawn: table entries 6_1 and 5_2 and their single `crossingChange`s, nothing else. `identify` is read for the name only (it simplifies internally; nothing it returns is drawn). No `randomKnot`, `scramble`, `simplify`, `apply`, `turnOver` or `mirror` output is drawn.

## Design-lead conditions S1 to S4
- **S1.** `draw(pd, { layout: L, gap: 0.5 })`. The viewBox is **tightened as S1 allows**, to `-1.5 -1 103 105`: the union of every drawn state's curve (x 6.9 to 93.1, y 7.2 to 95.7, sampled Bezier bbox over both knots and all 11 switches, scratch probe) plus 8 units. Hit-circle room holds: the lowest crossing (5_2, y 94.1) keeps 22 px to the edge down to 2.24 px per unit; the closest pair (6_1 clasp) is 56 px at that scale.
- **S2.** Stroke 2 units, `stroke-linecap: butt`, `var(--fg)`.
- **S3.** 44 px HTML hit circles over each crossing (`data-qa="control"`, aria-pressed). The picture never moves on a tap (stored layout). Measured centres at 390: closest pair 64 px; at 360 (board 261 px) also ≥ 63 px.
- **S4.** For the design lead: walk the lesson at 390×844. **Two departures for you to rule on:** (1) the switched-crossing ring (not in S1 to S3; it crosses the strands at radius 9 units, clear of the gap); (2) the reveal-time picture scale, 2.24 px per unit (231 px board), the smallest scale your record measured (260 px / 116), used for phone fit. Explore scale is 2.76 px per unit (284 px board, = 320 / 116).

## Stage word budget
Strict count at the busiest frame (6_1 switched to 0_1), measured by a stage text probe at 360 and 390: **15**: caption 5 ("Switch: top strand goes under"), "Crossings drawn" 2, "Name" 1, "plain loop" 2, Seen line 4 ("Seen on", "drawn", "name"), "Reset" 1. Chips and names are numerals (0). The design note's 14 plus "on" in the Seen line (added so the reveal's "which is why 6₁ had exactly 6" is visible when the learner has since moved to the 5₂ chip).

## Reveal word budget: OVER, stopped, cm-math-discrete decides
Counted as `tools/reveal-fit.mjs` counts it (verdict included, numerals included):

| Branch | Body | With "Not quite: …" | With "Your prediction held." |
|---|---|---|---|
| 6₁ → 4₁ | 80 | **93** | 83 |
| 6₁ → 0₁ | 81 | **94** | 84 |
| 5₂ → 3₁ | 80 | **93** | 83 |
| 5₂ → 0₁ | 81 | **94** | 84 |

The designer's 80 counts the body only; the kit's wrong-answer verdict (13 words, it quotes option B) takes it over 90. Every reveal sentence is the brief's fixed, claim-bearing script, so I trimmed nothing (demo-standard "Over budget"). The brief's own cut order (claim 3 "and never with fewer", then claim 4 the last sentence) is for fact-check holds; using it for budget is the category manager's call. Board item added for cm-math-discrete.

## Phone fit
Fix order used: no text cut (it is all claimed). (1) Gesture caption hidden at the reveal (the reveal does not point at it). (2) viewBox tightened (S1). (3) Picture at the reveal 231 px (from 284), tap targets unchanged at 44 px. (4) Stage gaps 4 px → 1 px and readout line-height 1.3 at the reveal. No text or tap target made smaller.
- reveal-fit runs: a 114 px crop (first build) → b 9 px → **e/f fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 93 words, 12 lines** (`artifacts/reveal-fit/w1539-f.json`, tool clean, --strict).
- At 360×740 (not the standard's size) the reveal still scrolls the stage top off, and in explore "Name: 0₁, plain loop" wraps to two lines so the chip row needs a small scroll. Both are kit-scroll cases; recorded, not fixed.

## EDD-004 C4 (first lesson using `layout`)
Measured with Playwright CPU throttling 4× (script `company/reviews/draw-a-table-knot/c4-timing.mjs`, host load 3 to 7 on 4 CPUs, three runs):
- `layout` cold first call: 6_1 56 to 118 ms, 5_2 9 to 24 ms; warm median 17 to 22 / 9 to 10 ms. Runs once per knot on mount.
- `draw(pd, { layout: L, gap: 0.5 })`: first 5 to 15 ms, warm median 0.3 to 1.6 ms. A tap (`crossingChange` + `draw` + `crossingCount`) median 0.3 to 1.4 ms, max 12 ms.
- `identify` cold first call 88 to 187 ms (warm about 1 ms). So the lesson warms the switch names 50 ms after mount; first tap to paint is now 21 to 69 ms (was 103 to 110 ms before the warm-up), later taps 12 to 36 ms, chip change 14 to 28 ms.
- Note for platform-engineer: `company/engineering/notes/2026-10-16-edd004-c4-layout-timing.md` (board item added).

## Claims (all unverified; builder never marks them)
c1 crossing number definition (source: Rolfsen); c2 kit drawings have 6 and 5 crossings (derivation K1, K6); c3 4₁/3₁ cannot be drawn with fewer (derivation K8 + Tait's first conjecture citation); c4 second number is the place in the table (source: Rolfsen); c5 single-switch results (derivation K14, my re-run); c6 a plain loop 0₁ has no crossings (convention); c7 the table draws each knot with the fewest, so 6₁ shows 6 (derivation + Rolfsen); c8 switch caption (convention). The brief lists c1, c4, c6, c8 as "definition"; `company check` accepts only derivation, simulation, source and convention, so c1 and c4 are `source` (they cite Rolfsen) and c6 and c8 are `convention`.

## Pre-flight v1
1. **Title and hook.** "What does the 6 in 6₁ count?" / "Knot tables give every knot a number. Is it something you can count in the picture?" They ask the question; neither says "fewest" or "any drawing".
2. **Options.** "The crossings in any drawing of it" / "The fewest crossings any drawing of it can have" / "The loops in the rope". None numbered; A and B worded at the same precision (the brief's intent).
3. **Locked stage.** 6₁ drawn, caption, "Crossings drawn: 6 · Name: 6₁", chips, Reset (disabled). The 6 = 6 agreement fits A and B equally, on purpose (brief).
4. **Reveal values.** N drawn, new name, chip, and k (the new name's first number): all from the `switched` milestone record ({chip, drawn, name}, the last switch), shown on the Seen line.
5. **QA path.** Crossing 1 (first in DOM order) fires `switched` on either chip; each crossing, the other chip and Reset all change the stage (contract QA passed). The Seen line stays visible at the reveal.
6. **Reset.** The reveal-fit/QA path ends after the 5₂ chip (Reset disabled, nothing switched). Reveal text from that run: "Not quite: it was “The fewest crossings any drawing of it can have”. A switch makes a new knot. Yours still had 6 crossings drawn, but its name became 4₁. So the first number in a name is not what one drawing shows. It is the fewest crossings any drawing of that knot can have: 4₁ can be drawn with 4 and never with fewer. The table draws each knot with that fewest, which is why 6₁ had exactly 6. The number after it is only the knot's place in the table's list." Stage then shows 5₂ unswitched and "Seen on 6₁: 6 drawn, name 4₁", which matches.
7. **Phone fit.** reveal-fit: fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 93 words (over budget, above).

## Local QA (the builder's pass, not the qa-tester's record)
Build `NEXT_DIST_DIR=.next-w1539`, served on 3539. `tests/qa/contract.spec.ts` with QA_ONLY=draw-a-table-knot, QA_OUT=artifacts/qa-w1539: **phone and desktop passed** (2/2). Screens viewed: phone 2-explore, 3-reveal; my own probe at 360×740 and 390×844 (locked, 6₁ switched at crossing 1 and 2, 5₂ switched, reveal). The crossings read as crossings at both widths: gaps clearly wider than the stroke, no beak. No console or page errors. `npx tsc --noEmit` exit 0; `npm run check` passed.
