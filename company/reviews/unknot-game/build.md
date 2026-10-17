# Build note: unknot-game

Builder: demo-builder (demo-builder-w1541), 2026-10-16. Board W-1541. Status **draft**; all 7 claims **unverified**.
Inputs: build spec `company/design/specs/unknot-game.md` (+ `.svg`; U-1 and U-2 folded in, W-1584); brief `company/domains/briefs/math.discrete.md` "Knots, batch 1" #3 with the W-1569 and W-1581 rulings and check K20; design note `company/reviews/unknot-game/design.md`; contact sheet `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` S1 to S4 (block (b) lifted for this lesson); colour ruling `company/design/reviews/2026-10-16-knots-colour-ruling.md` (the tint). Checks re-run first: `node company/domains/briefs/checks/knots-check.mjs` K3, K8, K9, K15, K20 all as the brief states (K20: 7 of 7, 7 of 7, 7 of 7).

Kept from evaluators until they report.

## What was built (spec, unchanged)
- Stage top to bottom: readout (`role="status"`, tick in `--good-fill` + "Plain loop", or "Still a knot", nothing for any other status); knot picture; caption line ("On top twice: it slides off" with a tint swatch, only while a switch shows the tint); tally "Freed by one switch" with both rows always shown ("Trefoil ○○○ n of 3", "Figure-eight ○○○○ n of 4"; a mark fills the first time that crossing alone gives a plain loop; kept across Reset and chip changes; held in the lesson root so the reveal reads it); controls row Reset · Trefoil · Figure-eight.
- Gesture: one switch at a time; tapping another crossing restores the previous one; tapping the switched one restores it. Reset disabled when nothing is switched. Current chip `className="active" disabled aria-pressed="true"` (U-1: full opacity via `.control.active:disabled`).
- Crossing buttons (U-2): 44 px circles in a `pointer-events: none` holder, each `pointer-events: auto`; transparent background in every state; 1 px `--line` ring at rest, 2 px `--fg` ring when switched, dashed when disabled (predict); focus outline outside the ring. `aria-label="Crossing k: switch"`, `aria-pressed`.
- DOM order: crossings, Reset, chips (W-1581 ruling 4). Milestones `firstFree`, `allThree`; `minInteractions = 2`.
- During predict the tally and caption are not rendered (`display: none`); they sit below the picture, so the picture does not move. The picture, "Still a knot" and the selected chip are shown.

## The tint
- Computed once per state at mount: `moves(q).filter(R2)[0]`, and of its two edges the one in PD slot 1 or 3 at both of its crossings. Builder probe (scratch, same rule): 3_1 switch 0 -> edge 4, 1 -> 4, 2 -> 5; 4_1 switch 0 -> 5, 1 -> 7, 2 -> 1, 3 -> 3; each R2 contains the tapped crossing (K20).
- Drawn as the same `draw` path with the global `.knot-tint` class (`src/app/globals.css`, W-1582, added by platform-engineer during this build; the lesson uses it and has no colour rule of its own) and `stroke-width` 3; every other path `--fg`, 2. The caption swatch is an SVG line with the same class. 150 ms stroke transition, none under reduced motion.
- `apply` is never called; `simplify` is read for status only; nothing they return is drawn.
- Seen in both themes at 390x844: the tinted strand runs over the tapped crossing and the neighbouring one; the other lens strand shows its gaps. On 4_1 crossing 1 (the beak) the tint is a short strand inside the tightest lens, as the spec accepts; **design lead to check (S4)**.

## Kit rules
- Imports only from `@/kit/knots`: `knot, layout, draw, crossingChange, moves, simplify` and types.
- `layout` once per knot in one `useMemo` on mount (default relax); every picture is `draw(q, { layout: L, gap: 0.5 })`; `size`, `margin`, `relax` never passed.
- `simplify` and `moves` on all 9 states cost under 1 ms each after the first call (node: simplify cold 0.7 ms; one 185 ms outlier in one run did not repeat in three passes, read as a GC pause). They are computed in the mount `useMemo`. `identify` is not used, so README rule 5 (warm `identify` after mount) does not apply: no tap shows a knot name.

## Design-lead conditions S1 to S4
- **S1.** viewBox **tightened as S1 allows** to `0 0 106 97`: over both knots and all 7 single switches the curves span x 8.0 to 97.6, y 8.0 to 88.5 (sampled Bezier bbox), plus 8 units.
- **S2.** Stroke 2 units (3 on the tinted strand, the spec's design-lead condition), butt caps, `--fg`.
- **S3.** 44 px rings over each crossing; at explore the board is 320 px (3.02 px per unit). 4_1's right-hand crossing (x 96.4) keeps 9.6 units = 29 px to the edge; at the reveal scale 24 px. The picture never moves on a tap (stored layout; the readout above has a fixed line height).
- **S4.** Walk at 390x844. **One departure for you to rule on:** the picture at the reveal is 270 px wide (2.55 px per unit), down from 320, for phone fit. That is above the smallest scale your record measured for S3 (260 px / 116 = 2.24 px per unit), and the 44 px rings do not shrink. Same kind of departure as draw-a-table-knot's.

## Stage word budget
Busiest frame (a switch showing the tint): "Plain loop" 2, caption 6 ("On top twice: it slides off"; the spec counted 5), "Freed by one switch" 4, "Trefoil" 1, "of" 1, "Figure-eight" 1, "of" 1, "Reset" 1, chips 2 = **19** under Ruling 2 (numerals 0). Counting numerals too: 23. Inside 25 either way.

## Reveal word budget
73 words as `tools/reveal-fit.mjs` counts them, including the kit's "Not quite: it was “1”." (68 + 5). The prediction-held branch is about 71. Inside 90; nothing cut.

## Phone fit
reveal-fit `--strict` at 390x844: run a **crop 61 px** (first build) -> run b **fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 73 words, 9 lines** (`artifacts/reveal-fit/w1541-b.json`, tool clean). Fix order: no text cut (all claimed). (1) Stage gaps 4 px -> 1 px at the reveal. (2) The caption line collapses at the reveal only while empty (it is below the picture). (3) Picture 270 px at the reveal (S4 departure above). Nothing made smaller in text or tap targets.
- At 360x740 (not the standard's size) the reveal still scrolls the stage top off (readout and top of the knot); the tally the reveal quotes stays visible. Recorded, not fixed.

## Claims (all unverified; the builder never marks them)
c1 switch definition (convention; brief says definition, which `company check` does not accept); c2 3 and 4 crossings (derivation); c3 any one switch gives a plain loop, unswitched is knotted (derivation K3, K8, K20); c4 on top twice, R2 (derivation K15, K20 + my probe); c5 "the twist left over falls out" (derivation: my probe applies the R2 in numbers only: 3_1 leaves 1 crossing, an R1; 4_1 leaves 2, R1 then R1); c6 unknotting number definition and value 1 (source: Adams, *The Knot Book*); c7 some knots need more than one (source: Brittenham and Hermiller per the brief; I added a pointer to Kronheimer and Mrowka 1993 for the fact-checker, unchecked). Brief cut order holds for fact-check holds: c7's sentence first, then "and for the figure-eight too".
- **Title and hook are builder-written** (neither the brief nor the spec gives them): "How many switches untie a trefoil?" / "Switch a crossing and its top strand goes under. How many until the knot falls open?" cm-math-discrete may replace them. The hook's first sentence is claim c1.
- `curriculum.references` is empty: the brief says "none yet" and `content/works.json` has no Adams entry.

## Pre-flight v1
1. **Title and hook.** "How many switches untie a trefoil?" / "Switch a crossing and its top strand goes under. How many until the knot falls open?" They ask the count; neither says one, any, or "special".
2. **Options.** "1" / "2" / "3": all bare numerals.
3. **Locked stage.** Trefoil, "Still a knot", dashed rings on all 3 crossings, Reset greyed, Trefoil chip selected, Figure-eight greyed. No tally, no caption, no tint. Nothing matches "1".
4. **Reveal values.** "3 of 3": the trefoil tally count, computed from the learner's state and gated by `allThree`; it is the stage's "Trefoil ●●● 3 of 3" row, which survives Reset and chip changes. "1 for the trefoil, and for the figure-eight too" and "Some knots need more than one" are claimed context (c6, c7), not stage values.
5. **QA path.** 6 controls on 3_1: crossing 1 (firstFree, 1 of 3), crossing 2 (2 of 3), crossing 3 (allThree, 3 of 3), Reset, Trefoil chip (disabled, skipped), Figure-eight. Both milestones by press 3. At the reveal the Trefoil row reads 3 of 3.
6. **Reset.** My probe ends with Reset then the reveal: "Not quite: it was “1”. Each crossing you switched freed the trefoil on its own: 3 of 3. No crossing was special. After each switch, the tinted strand lay on top at two crossings in a row, so it slides off, and the twist left over falls out. The fewest switches that can free a knot is its unknotting number: 1 for the trefoil, and for the figure-eight too. Some knots need more than one." Stage: 4_1 unswitched, "Still a knot", Trefoil 3 of 3, Figure-eight 4 of 4. "The tinted strand" refers to what was seen after each switch (past tense); no tint shows after Reset.
7. **Phone fit.** reveal-fit: fit, crop 0, phoneFit true, 73 words; named "trefoil" and "figure-eight" visible.

## Local QA (the builder's pass, not the qa-tester's record)
Build `NEXT_DIST_DIR=.next-w1541`, served on 3541 (`tools/serve.sh`). `tests/qa/contract.spec.ts` with `QA_ONLY=unknot-game`, `QA_BASE_URL=http://localhost:3541`, `QA_OUT=artifacts/qa-w1541`: **phone and desktop passed (2/2)**, before and after the fit fix. Screens viewed: QA phone 1-predict, 2-explore, 3-reveal; my probe at 390x844 light (predict, switch 1, every 4_1 switch, reveal), 390x844 dark (switch 3, 4_1 switch 2), 360x740 light (reveal). No console or page errors. `npx tsc --noEmit` exit 0; `npm run check` passed.

## Next
| Move | Owner |
|---|---|
| QA record on this branch (needed for evidence.qa before merge) | qa-tester |
| Fact-check c1 to c7 | fact-checker |
| S4 walkthrough review: reveal scale 270 px, the beak tint on 4_1 crossing 1 | design-lead |
| Title and hook (builder-written), and whether c7 keeps its brief source | cm-math-discrete |
