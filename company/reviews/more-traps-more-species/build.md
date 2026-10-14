# Build note: more-traps-more-species

builder: demo-builder (demo-builder-wavej-life) · 2026-10-14 · v1 draft · brief: company/domains/briefs/life.ecology-body.md #6 (check E6) · no spec

- Model as briefed: 40 species, shares proportional to 0.88^i (commonest 12.1%, rarest 0.083%); insects caught one at a time, each by one kit mulberry32 draw walking the shares in order; one cumulative catch of 5,000 per seed. catchInsects() re-run in node: seed 1 18/37/40, seed 2 20/34/40, seed 3 17/34/40 at 50/500/5,000. Matches E6.
- Seed 2 is the start (chosen: its 50-insect count, 20, is near the expected 18.9; disclosed in c1). "New forest seed" steps 2 → 3 → 1 → 2 and re-runs the current catch size; the button shows the seed ("now 3").
- Stage: model line, readout "caught: n · species found: k", one curve (log x 1 to 5,000, ticks 50, 500, 5,000; y 0 to 50) with labelled points at each catch size reached, and a strip of 40 cells from commonest to rarest, filled when found (stands for "common species first, rare ones last").
- Controls in DOM order: Catch 50, Catch 500, Catch 5,000, New forest seed (disabled until a catch is drawn).
- Milestones (minInteractions 2): c500, c5000. When the reveal opens the catch is set to 5,000, so all three labelled points are on the curve.
- Reveal numbers come from the current seed; "under" or "about" twice is computed (34 vs 2 × 20 on seed 2; 37 vs 2 × 18 on seed 1 gives "about").
- Cut from the brief's reveal draft: "real ones hold far more rare species" (the brief says cut it unless a fact-checker supports it). Claims c1 to c6, all unverified.

## Pre-flight v1

1. **Title and hook.** "More traps, more species?" / "Two teams survey the same forest. One catches ten times as many insects." Neither says how the count grows.
2. **Options.** "About 200" / "About 35" / "About 20": all numbers, same precision.
3. **Locked stage.** The brief's setup text, "caught: 0 · species found: 0", empty axes with gridlines 0 to 50 by 10 (no total-species line), an empty 40-cell strip.
4. **Reveal values.** "34", "20" (seed 2): (a) current seed's catch, labelled points on the curve (catch set to 5,000 at the reveal). "under/about twice": computed from those two. "5,000 insects found all 40": (a) the readout and the 40 label. The general sentences: claims c3 and c4.
5. **QA path.** Catch 50, Catch 500 (c500), Catch 5,000 (c5000), New forest seed (seed 3): both milestones in 3 controls; the points 17, 34, 40 and the readout are on the stage at the reveal.
6. **Reset.** No Reset control. Reveal after the QA path (seed 3): "Ten times the catch found 34 species, not 200: about twice the 17 at 50. Common species turn up in the first few dozen insects. After that most of the catch is repeats, and each new species is a rarer one. 5,000 insects found all 40. / So a species count depends on how hard you looked: compare two places only at the same catch size. A made-up forest."
7. **Phone fit.** Measured with the `tools/reveal-fit.mjs` logic on the :3530 dev server (a copy with longer page-load timeouts only, artifacts/wavej-life-tools/reveal-fit-slow.mjs, because the shared dev server took 30 s or more a page): crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; revealWords 74 (tool count, verdict line included). Stage parts: picture 160, controls 70, text 94. Smallest rendered SVG label over the QA path and at the reveal: 10.8 px ("commonest species"). On screen with the reveal's last line: the labelled points 17, 34, 40 and the readout. Screenshot artifacts/reveal-fit/more-traps-more-species.png.

QA: `tests/qa/contract.spec.ts` on :3530 (QA_ONLY, QA_OUT=artifacts/qa-wavej-life, `--timeout=300000` because page loads took 20 to 60 s): phone and desktop pass. An earlier run with the default 45 s timeout failed on page.goto only; one longer-timeout run logged the React "state update on a component that hasn't mounted yet" console error once (same-dose-levels-off, desktop), not reproduced in the next run; other builders attribute it to Fast Refresh rebuilds on the shared server.

## v2: learner r10 fixes (W-840, demo-builder, 2026-10-14)

Review: company/reviews/more-traps-more-species/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Catch axis is linear (0 to 5,000) so the slowing shows; points labelled '20 at 50', '34 at 500', '40'.
- When the reveal opens the stage returns to seed 2 (the question's 20 at 50) and the 5,000 catch, so the reveal's numbers match the question.
- Finding 5 checked, not a bug: 'New forest seed' re-runs all sizes; seeds 2 and 3 give 20/34/40 and 17/34/40 (coincidence at 500 and 5,000; recorded in c1). c1 rewritten (unverified).

## Pre-flight v2

1. Unchanged.
2. Unchanged.
3. Locked: empty chart and strip.
4. Reveal values: 34, 20, 40 from seed 2 (restored at the reveal), marked on the curve.
5. QA path unchanged; New seed last, the reveal restores seed 2.
6. Reset: n/a (about 60 reveal words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 74 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
