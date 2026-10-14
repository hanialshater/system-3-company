# Build note: born-in-january-picked-first

builder: demo-builder (demo-builder-books-1) · 2026-10-14 · v1 draft · brief: company/domains/briefs/books.md #3 · format: simulation run (analytic, deterministic; multi-card later per brief)

- Intent: a 12-bar histogram of the picks' birth months, with an "equal share" dashed line at 1/12. Before any pick every bar sits on that line (the whole band). Picking highlights the three months after the cutoff (shaded band, darker bars). Once picked, a label over the shaded band reads the current share ("44% born Jan–Mar"; it follows the cutoff). The first build had a readout row (Cutoff, Picked, Born Jan–Mar); it was cut for phone fit (crop 61 px, see Measurement). Chip: "Model: +0.5 cm per month older, ±5.5 cm spread".
- Controls in DOM order: "Pick top 10%", "Pick top 50%", then cutoffs "1 Jan" (active at start), "1 Apr", "1 Jul", "1 Oct".
- Milestones (minInteractions 3): "jan10" (top 10% with 1 January: 43.9% recorded, the question's case), "half" (top 50%: 32.9% recorded), "moved" (a picked chart under a non-January cutoff). One record line keeps "1 Jan, top 10%: 44% born Jan–Mar · top 50%: 33%".
- Deviation from the brief: learner.doesNotKnow drops "extra coaching then widens the gap", because nothing on the stage stands for coaching (demo-standard "Show the why you promised"). The coaching half of the book's argument is noted in claim c1's source only and is not stated to the learner. The brief's multi-card card 3 would show it. Category manager's call whether that is acceptable for the single card (board item filed for cm-books-psychology).
- Copyright: no quote; the hockey example is summarised in one sentence in our words.

## Pre-flight v1

1. Title and hook: "Picked for height, sorted by birthday" / "Every child in the league is nine. Does the month they were born in matter?" The title says birthdays are involved but not how much; it does not separate 25%, 45% or 75%.
2. Options: "About 25%" / "About 45%" / "About 75%": same form.
3. Locked stage: 12 equal bars on the "equal share" line, month letters, "birth months", the chip, the "1 Jan" button marked active. No highlight, no share label, no record line.
4. Reveal values: 44% (milestone "jan10", recorded; record line); 33% (milestone "half", recorded; record line, and the band label "33% born Oct–Dec" at the end of the QA path); "the peak moved with it" (milestone "moved"; the final chart at 1 Oct shows the peak at Oct–Dec); 25% is the fair split (constant, the equal-share line).
5. QA path: Pick top 10% (jan10), Pick top 50% (half), 1 Jan disabled (skipped), 1 Apr (moved), 1 Jul, 1 Oct. All three by press 3.
6. Reset: no Reset control; the last press leaves the 1 Oct, top 50% chart with its peak after the cutoff. Reveal reads "44% of the picks were born in the first three months after the cutoff, where a fair split would give 25%. Picking the top half shrank that to 33%. When you moved the cutoff, the peak moved with it, ..."
7. Phone fit: see "Measurement" below.

## Measurement

Host: shared dev server http://localhost:3530 (load average 25-40, other builders' HMR in flight). `node tools/reveal-fit.mjs` as shipped timed out on every attempt (page.goto 30 s, lesson waitFor 15 s; one other builder's half-written cs/nearest-town-first-detours/Demo.tsx also broke the shared bundle for ~10 min). The numbers below come from a copy of tools/reveal-fit.mjs with only those two timeouts raised to 300 s (artifacts/books-fit/reveal-fit-slowhost.mjs, not committed); the measurement code is unchanged. QA: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<4 slugs> QA_OUT=artifacts/qa-books-1 npx playwright test tests/qa/contract.spec.ts --workers=1`, plus `--timeout=600000` (the 45 s test timeout cannot cover a 1-2 minute page load here). Failures that were "lesson renders" timeouts with the card on "Loading..." / "Compiling", or a pageerror "Invalid or unexpected token" from the shared bundle, were re-run (artifacts/qa-books-1b, -1c, -1d); screenshots in artifacts/qa/<slug>/.

- reveal-fit v1 (first layout): fit, crop 61 px, named hidden "cutoff" (the readout row), 86 words. Fix: readout row removed (share moved into a label over the band), the two record lines merged, picture 160 -> 142 high.
- reveal-fit after fix: fit, **crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 86 words**. Axis text 11 px in a 320-wide viewBox drawn ~316 px: ~10.9 px.
- QA: phone pass (run 1); desktop pass on the second re-run (two runs timed out on "Loading..." while the dev server was compiling).
