# Build note: one-percent-a-day

builder: demo-builder (demo-builder-books-1) · 2026-10-14 · v1 draft · brief: company/domains/briefs/books.md #2 · format: single card (today; multi-card later per brief)

- Intent: one chart of skill over 365 days. A solid curve compounds the daily gain, a dashed line adds it without compounding (1 + g × days), and once added a green practice curve (illustrative power law, skill = day^0.4, 10.6× at day 365) stays drawn. The y axis rescales to the largest curve, so at 2% a day the practice curve visibly flattens to nothing next to 1,377×. Readouts: "Compounded, day 365" and "Practice curve". Chip: "Practice curve: illustrative, skill ∝ day^0.4".
- Controls in DOM order: daily-gain slider (0.1% to 2%, starts at 0.5%), "Add practice curve", "Compound at 1%" (the question's own case, last). The slider also reaches the 1% milestone if the learner lands on 1.0%.
- Deviation from the brief: the brief's "curve toggle" is a one-way "Add practice curve" button, so the curve the reveal points at ("as your practice curve showed") cannot be toggled away before the reveal opens. The slider still moves the compounded and added curves while the practice curve is shown.
- Milestones (minInteractions 2): "practice" (10.59× recorded), "compound" (g = 1.0%: 37.78× recorded).

## Pre-flight v1

1. Title and hook: "Get 1% better every day" / "Each day builds on the last. Where does a year of small gains leave you?" Neither names 4.7, 37.8 or 365.
2. Options: "About 4.7 times" / "About 37.8 times" / "About 365 times": same form, all numbered.
3. Locked stage: empty axes ("day 0", "day 365"), legend "compounded / no compounding", chip, readouts "?" and "–", slider at 0.5%. No curve, no end values.
4. Reveal values: 37.8× (milestone "compound", recorded; on the chart and readout at the end of the QA path); 10.6× (milestone "practice", recorded; the practice curve and its end label stay drawn); 4.7× is the question's option, also drawn as the dashed line's end label at 1%.
5. QA path: slider 0.5 → 0.7%, Add practice curve (practice), Compound at 1% (compound). Both milestones by press 3; both curves and their end labels on the chart when the reveal opens.
6. Reset: there is no Reset control; the last press leaves the question's case on screen. Reveal reads "At 1% a day the compounded curve reached 37.8×, not 4.7×. ... as your practice curve showed (10.6× after a year). ..."
7. Phone fit: see "Measurement" below.

## Measurement

Host: shared dev server http://localhost:3530 (load average 25-40, other builders' HMR in flight). `node tools/reveal-fit.mjs` as shipped timed out on every attempt (page.goto 30 s, lesson waitFor 15 s; one other builder's half-written cs/nearest-town-first-detours/Demo.tsx also broke the shared bundle for ~10 min). The numbers below come from a copy of tools/reveal-fit.mjs with only those two timeouts raised to 300 s (artifacts/books-fit/reveal-fit-slowhost.mjs, not committed); the measurement code is unchanged. QA: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<4 slugs> QA_OUT=artifacts/qa-books-1 npx playwright test tests/qa/contract.spec.ts --workers=1`, plus `--timeout=600000` (the 45 s test timeout cannot cover a 1-2 minute page load here). Failures that were "lesson renders" timeouts with the card on "Loading..." / "Compiling", or a pageerror "Invalid or unexpected token" from the shared bundle, were re-run (artifacts/qa-books-1b, -1c, -1d); screenshots in artifacts/qa/<slug>/.

- reveal-fit: fit, **crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 83 words** (37.8, 10.6, practice curve all visible). Re-measured after the viewBox widened 320 -> 330 (end labels no longer clip): same result. Axis text 11 px in a 330-wide viewBox drawn ~316 px: ~10.5 px.
- QA: phone and desktop pass (run 1).

## v2: learner r10 fixes (W-840, demo-builder, 2026-10-14)

Review: company/reviews/one-percent-a-day/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Reveal no longer quotes the made-up curve's 10.6×: 'practice studies find gains come fast at first and then slow. The practice curve here is made up, not data.'
- Stage caption in plain words: 'Practice curve: made up, rises fast, then slows' (was 'illustrative, skill ∝ day^0.4'). c3, c4 rewritten (unverified). Not done: finding 5 (the crossing point of the two curves).

## Pre-flight v2

1. Unchanged.
2. Unchanged.
3. Unchanged.
4. Reveal values: 37.8× (b, compound milestone), 4.7× (dashed line).
5. QA path unchanged.
6. Reset: n/a (about 68 reveal words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 82 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
