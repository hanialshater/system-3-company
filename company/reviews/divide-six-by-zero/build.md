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

## v2: learner r10 fixes (W-839, demo-builder, 2026-10-14)

Review: company/reviews/divide-six-by-zero/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Reveal p1 answers the infinity chooser: '… took 2, 6 and 60, climbing with no ceiling. The climb never lands on a count, and infinity scoops of nothing would still hold nothing.'
- Reveal p2 ties 'undefined' to the check: 'No number passes the check, so 6 ÷ 0 has no answer: it is left undefined.' c3, c4 rewritten (unverified). No stage change.

## Pre-flight v2

1. Unchanged.
2. Unchanged.
3. Unchanged.
4. Reveal values unchanged (scoop list and counts from state; 1,000 tries).
5. QA path unchanged.
6. Reset: trace keeps every quoted line (about 74 words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 87 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
