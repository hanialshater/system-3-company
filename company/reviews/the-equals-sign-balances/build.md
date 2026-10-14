# Build note: the-equals-sign-balances

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 1

- Intent: one balance beam. Left pan 8 + 4 blocks, right pan the dashed box + 5 blocks (rows of 4, so 17 still fits). Chips in brief order: "Box = 12", "Box = 17", "Box = 7", Reset. The beam tilts toward the heavier side (2° per unit, capped at 10°), pans hang level. Status line under the beam: "left 12 · right 17" (adds "· level" at 12 = 12).
- Locked frame: box empty with "?", beam resting on two stops, status "left 12 · right □ + 5". No value is drawn for the box.
- Milestones (minInteractions 2): "tipped" (first wrong value recorded as w, quoted with w + 5), "level" (7).
- Trace: every value tried stays in the caption ("Tried: 12 → right 17 · 17 → right 22 · 7 → 12 level"), so Reset (which empties the box and puts the beam back on its stops) cannot erase what the reveal quotes.
- Format note: formats.md says "No reset that empties it"; the brief lists Reset, so it is kept and the caption carries the trace. Category manager may prefer to drop Reset.
- Title and hook are mine (the brief gives none): "What does = actually ask?" / "8 + 4 = □ + 5 looks like a sum with a gap in it. What fills the gap?"

## Pre-flight v1

1. Title and hook: "What does = actually ask?" / "8 + 4 = □ + 5 looks like a sum with a gap in it. What fills the gap?" Neither names 7, 12 or 17.
2. Options: "7" / "12" / "17": all bare numbers.
3. Locked stage: 8 and 4 blocks, empty dashed box with "?", 5 blocks, beam on its stops, "left 12 · right □ + 5". 12 is the left side's total (given by the question), not the box's value.
4. Reveal values: w and w + 5 (milestone "tipped", recorded on first wrong press; caption trace); 7 and 12 on both sides (milestone "level"; caption trace "7 → 12 level"); 8 + 4 = 7 + 5 (constants of the question).
5. QA path: Box = 12 (tipped), Box = 17, Box = 7 (level), Reset: both milestones by press 3. Trace visible after Reset.
6. Reset: after Reset the reveal reads "With 12 in the box the right side came to 17, and the beam tipped: 17 is not 12. With 7 it went level, 12 on both sides. ..." and the caption still lists 12, 17 and 7.
7. Phone fit: see the measurement section below.

## Measurement v1 (demo-builder, 2026-10-14)

- Reveal fit at 390×844 on the shared dev server (http://localhost:3530): verdict fit, stage-top crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true; reveal 72 words by the tool count (includes the verdict line); stage parts picture 196 px, controls 94 px, text 19 px. Screenshot: artifacts/reveal-fit/the-equals-sign-balances.png. On screen with the reveal: the trace caption (12, 17, 7) and the beam.
- Caveat: the dev server took 45 to 200 s a page (load 25 to 40 on 4 CPUs), so tools/reveal-fit.mjs timed out at page.goto (30 s) and the lesson wait (15 s). The numbers above come from a scratch copy of the tool whose only changes are those two timeouts and an absolute import path; the measuring code is unchanged.
- QA: the official command (tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wavej-math) ran twice and timed out on both projects at "lesson renders" (15 s, page still "Loading…"/"Compiling"), so it is not a pass. A scratch copy of the spec with only the goto/render timeouts raised (and the test timeout) passed phone and desktop. Run the official QA on a quiet server or a build before review.
- Labels: smallest SVG text is 11 px in its viewBox, drawn at 10.4 px or larger at 390 px wide (smallest: the "mirror" label in minus-one-flips-the-order, 11 px in a 360-wide viewBox); stage numbers 12 px. Targets: every control has min-height 44 px.
- QA (official spec, run 3): `tests/qa/contract.spec.ts` unmodified, with the CLI flag `--timeout=600000` (test timeout only; the 15 s render wait is the spec's own), QA_OUT=artifacts/qa-wavej-math: phone and desktop passed.
