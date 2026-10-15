# Build note: quarters-add-to-a-third

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 5

- Intent: one 232 px square. Level k splits the leftover top-right corner into four: top-left solid (`var(--domain)`), bottom-left dotted, bottom-right hatched, top-right left over (dashed outline). Patterns are user-space SVG patterns (5 px), ids made unique with useId. Readout "Level 2 · solid: 0.3125 of the square" (4 decimals), second line "Left over: 0.0625" until level 6, then "Level 6: solid, hatched, dotted 0.3333 each".
- Controls in brief order: Step (to level 8 max), "To level 6" (active and disabled at 6), and Reset.
- Reset is "Reset to level 1", not level 0: formats.md says "No reset that empties it", and the reveal points at the three matching patterns. At level 1 the three patterns are still drawn and the level-6 trace line stays. Enabled only above level 1, so no press is a no-op.
- Milestones (minInteractions 2): "two-levels" (level ≥ 2), "level-six" (value recorded).
- Title and hook are mine: "Quarters of quarters, forever" / "Add 1/4, then a quarter of that, then a quarter of that… Where does the total settle?"
- Recall uses the thirds series (→ 1/2) so it needs the idea, not the wording.

## Pre-flight v1

1. Title and hook: neither names 1/3, 1/2 or 3/8.
2. Options: "1/2" / "3/8" / "1/3": all fractions.
3. Locked stage: the plain square, "Level 0: the whole square". No colours.
4. Reveal values: level 6 and 0.3333 (milestone "level-six", recorded; trace line); "three patterns always matched" (construction, visible at every level ≥ 1 and in the trace line).
5. QA path: Step (level 1), To level 6 (two-levels and level-six), Reset to level 1: both by press 2.
6. Reset: reveal reads "By level 6 the solid pieces covered 0.3333 of the square. At every level the corner split into four: one solid, one hatched, one dotted, one left over. ..."; the stage shows level 1's three patterns and "Level 6: solid, hatched, dotted 0.3333 each".
7. Phone fit: see the measurement section below.

## Measurement v1 (demo-builder, 2026-10-14)

- Reveal fit at 390×844 on the shared dev server (http://localhost:3530): verdict fit, stage-top crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true; reveal 66 words by the tool count (includes the verdict line); stage parts picture 230 px, controls 44 px, text 36 px. Screenshot: artifacts/reveal-fit/quarters-add-to-a-third.png. On screen with the reveal: the level-1 split with its three patterns and the line "Level 6: solid, hatched, dotted 0.3333 each".
- Caveat: the dev server took 45 to 200 s a page (load 25 to 40 on 4 CPUs), so tools/reveal-fit.mjs timed out at page.goto (30 s) and the lesson wait (15 s). The numbers above come from a scratch copy of the tool whose only changes are those two timeouts and an absolute import path; the measuring code is unchanged.
- QA: the official command (tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wavej-math) ran twice and timed out on both projects at "lesson renders" (15 s, page still "Loading…"/"Compiling"), so it is not a pass. A scratch copy of the spec with only the goto/render timeouts raised (and the test timeout) passed phone and desktop. Run the official QA on a quiet server or a build before review.
- Labels: smallest SVG text is 11 px in its viewBox, drawn at 10.4 px or larger at 390 px wide (smallest: the "mirror" label in minus-one-flips-the-order, 11 px in a 360-wide viewBox); stage numbers 12 px. Targets: every control has min-height 44 px.
- QA (official spec, run 3): `tests/qa/contract.spec.ts` unmodified, with the CLI flag `--timeout=600000` (test timeout only; the 15 s render wait is the spec's own), QA_OUT=artifacts/qa-wavej-math: phone and desktop passed.

## v2: learner r10 fixes (W-822, demo-builder, 2026-10-14)

Review: company/reviews/quarters-add-to-a-third/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- When the reveal opens the stage returns to level 6, whatever was pressed last, so the leftover the reveal names is on screen.
- The second readout now shows, at every level, 'hatched x · dotted x · left over y' (level 6: hatched 0.3333 · dotted 0.3333 · left over 0.0002).
- New caption above the square: 'Hatched and dotted pieces match the solid ones.' (the counting move, before the reveal).
- 'Reset to level 1' became 'Start over' (level 0). Reveal p1 adds 'and the leftover corner was down to 0.0002'. c2 and c3 rewritten (unverified); c1 unchanged.

## Pre-flight v2

1. Title/hook unchanged; neither names 1/3.
2. Options '1/2', '3/8', '1/3': same precision.
3. Locked stage: the empty square, no caption text, no readout values.
4. Reveal values: 0.3333 (b, level-six milestone, recorded); 0.0002 (a, 1/4^6, on the second readout at level 6, which the reveal restores).
5. QA path: Step (level 1), To level 6 (milestones two-levels and level-six), Start over (level 0). The reveal restores level 6.
6. Reset: after Start over the reveal shows level 6: 'By level 6 the solid pieces covered 0.3333 of the square, and the leftover corner was down to 0.0002. At every level the corner split into four: one solid, one hatched, one dotted, one left over. The three patterns always matched, and the leftover corner shrank toward nothing, so each pattern ends with a third of the square. That is 1/4 + 1/16 + 1/64 + … = 1/3, read straight off the picture.' (about 63 words)
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 74 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).

status draft → review (W-996): launch r11, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
