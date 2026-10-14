# Build note: divide-six-by-zero

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 3

- Intent: a jug marked 0 to 6 (29 px per unit), a scoop drawn at its size beside it, and a counter panel on the right. A size chip fills the jug with alternating bands of that scoop's size; the panel logs "6 ÷ 3 = 2" etc. "Scoop 0" leaves the jug empty with "0 of 6" in red, a dashed flat scoop and the log row "0: 0 of 6 after 1,000" (jumps straight to the 1,000 state, no animation). "Check: ? × 0" adds "6 × 0 = 0", "1,000 × 0 = 0", "1,000,000 × 0 = 0" to the panel.
- Chips in brief order: Scoop 3, Scoop 1, Scoop 0.1, Scoop 0, Check: ? × 0, Reset. Check is active and disabled once shown.
- Milestones (minInteractions 3): "two-sizes" (two non-zero sizes poured), "zero-poured", "checked".
- Trace: the log and check lines stay through Reset (which only empties the jug and removes the scoop).
- Reveal: names only the non-zero sizes the learner poured, sorted large to small, with their counts.
- Options as the brief asks: "It is 0" / "It is infinity" / "No number works".
- Title and hook are mine: "What is 6 ÷ 0, really?" / "6 ÷ 2 is 3 because three 2s make 6. Ask the same question about 0." (hook claim c5).

## Pre-flight v1

1. Title and hook: neither says undefined, infinity or 0 as an answer.
2. Options: "It is 0" / "It is infinity" / "No number works": three short plain phrases, none numbered beyond the 0 in A.
3. Locked stage: an empty jug with marks 0 to 6 and the panel header "6 ÷ scoop = scoops". No scoop, no log.
4. Reveal values: the sizes and counts (recorded on each pour, log rows); 1,000 tries (milestone "zero-poured"; log row); the check (milestone "checked"; three lines).
5. QA path: Scoop 3, Scoop 1 (two-sizes), Scoop 0.1, Scoop 0 (zero-poured), Check (checked), Reset: all three by press 5.
6. Reset: reveal reads "6 ÷ a scoop size asks how many scoops fill the jug. Your scoops of 3, 1 and 0.1 took 2, 6 and 60: smaller scoops, more of them, with no ceiling. A scoop of 0 filled nothing after 1,000 tries, ..."; log and check lines still on the stage.
7. Phone fit: see the measurement section below.

## Measurement v1 (demo-builder, 2026-10-14)

- Reveal fit at 390×844 on the shared dev server (http://localhost:3530): verdict fit, stage-top crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true; reveal 76 words by the tool count (includes the verdict line); stage parts picture 200 px, controls 94 px, text 0 px. Screenshot: artifacts/reveal-fit/divide-six-by-zero.png. On screen with the reveal: the log rows (6 ÷ 3 = 2 …, 0: 0 of 6 after 1,000) and the three check lines.
- Caveat: the dev server took 45 to 200 s a page (load 25 to 40 on 4 CPUs), so tools/reveal-fit.mjs timed out at page.goto (30 s) and the lesson wait (15 s). The numbers above come from a scratch copy of the tool whose only changes are those two timeouts and an absolute import path; the measuring code is unchanged.
- QA: the official command (tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wavej-math) ran twice and timed out on both projects at "lesson renders" (15 s, page still "Loading…"/"Compiling"), so it is not a pass. A scratch copy of the spec with only the goto/render timeouts raised (and the test timeout) passed phone and desktop (desktop failed once on the React dev warning "Can't perform a React state update on a component that hasn't mounted yet" while the server was compiling, then passed on a rerun; the lesson has no effects or async updates, so I read it as dev-server noise, not proven). Run the official QA on a quiet server or a build before review.
- Labels: smallest SVG text is 11 px in its viewBox, drawn at 10.4 px or larger at 390 px wide (smallest: the "mirror" label in minus-one-flips-the-order, 11 px in a 360-wide viewBox); stage numbers 12 px. Targets: every control has min-height 44 px.
- QA (official spec, run 3): `tests/qa/contract.spec.ts` unmodified, with the CLI flag `--timeout=600000` (test timeout only; the 15 s render wait is the spec's own), QA_OUT=artifacts/qa-wavej-math: phone and desktop passed.
