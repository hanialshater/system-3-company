# Build note: minus-one-flips-the-order

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 4

- Intent: one number line −10 to 10 (16 px per unit, ticks every 1, labels every 5 at 12 px), a filled circle at 2 and a hollow square at 5 (told apart by shape), each with its value above it. A chip applies its operation to the original pair and tweens both shapes along an arc (320 ms, under the 450 ms QA wait; instant with reduced motion). A negative multiplier also draws a dashed "mirror" line at 0, the cause the reveal names. Readout: "circle 4 < square 10" with the true sign.
- Chips in brief order: "× 2", "− 3", "× (−1)", "× (−2)", Reset.
- Milestones (minInteractions 2): "kept" (first order-keeping chip recorded: its name and the two values), "flipped" (× (−1)).
- Trace: a log line lists every operation tried with its result ("× 2: 4 < 10 · × (−1): −2 > −5 …"), so Reset (back to 2 and 5) keeps the evidence.
- Title and hook are mine: "Times −1 on both sides" / "An equation stays true when you do the same to both sides. What about 2 < 5?" (hook claim c5).

## Pre-flight v1

1. Title and hook: neither says the sign flips.
2. Options: "−2 < −5" / "−2 > −5" / "−2 = −5": same form.
3. Locked stage: circle at 2, square at 5, "circle 2 < square 5" (the question's given), no mirror line.
4. Reveal values: the first order-keeping operation and its two values (milestone "kept"; log line); −2 and −5 (milestone "flipped"; log line).
5. QA path: × 2 (kept), − 3, × (−1) (flipped), × (−2), Reset: both by press 3.
6. Reset: reveal reads "Times 2 moved the dots to 4 and 10, and the circle stayed on the left. Times −1 mirrored both through 0: the circle landed on −2 and the square on −5, to its left. So −2 > −5. ..."; the log line still shows "× 2: 4 < 10" and "× (−1): −2 > −5".
7. Phone fit: see the measurement section below.

## Measurement v1 (demo-builder, 2026-10-14)

- Reveal fit at 390×844 on the shared dev server (http://localhost:3530): verdict fit, stage-top crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true; reveal 72 words by the tool count (includes the verdict line); stage parts picture 100 px, controls 44 px, text 52 px. Screenshot: artifacts/reveal-fit/minus-one-flips-the-order.png. On screen with the reveal: the log line (× 2: 4 < 10, × (−1): −2 > −5) and the number line.
- Caveat: the dev server took 45 to 200 s a page (load 25 to 40 on 4 CPUs), so tools/reveal-fit.mjs timed out at page.goto (30 s) and the lesson wait (15 s). The numbers above come from a scratch copy of the tool whose only changes are those two timeouts and an absolute import path; the measuring code is unchanged.
- QA: the official command (tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wavej-math) ran twice and timed out on both projects at "lesson renders" (15 s, page still "Loading…"/"Compiling"), so it is not a pass. A scratch copy of the spec with only the goto/render timeouts raised (and the test timeout) passed phone and desktop. Run the official QA on a quiet server or a build before review.
- Labels: smallest SVG text is 11 px in its viewBox, drawn at 10.4 px or larger at 390 px wide (smallest: the "mirror" label in minus-one-flips-the-order, 11 px in a 360-wide viewBox); stage numbers 12 px. Targets: every control has min-height 44 px.
- QA (official spec, run 3): `tests/qa/contract.spec.ts` unmodified, with the CLI flag `--timeout=600000` (test timeout only; the 15 s render wait is the spec's own), QA_OUT=artifacts/qa-wavej-math: phone and desktop passed.
