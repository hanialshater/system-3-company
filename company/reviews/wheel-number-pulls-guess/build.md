# Build note: wheel-number-pulls-guess

builder: demo-builder (demo-builder-books-1) · 2026-10-14 · v1 draft · brief: company/domains/briefs/books.md #4 · format: single card (today; multi-card later per brief)

- Intent: a crowd of 30 dots on a 0–100% axis, one per lane. With the wheel shown, a red vertical line marks the wheel's number and each dot sits 60% of the way from it to that person's belief, with a faint trail back to the wheel line (the adjustment that stopped short). A dashed line marks the crowd's median. "Hide wheel" removes the line and the dots move to the beliefs (median 35). Dots slide (300 ms CSS transition on cx, off with reduced motion). The wheel line and the median line carry their own labels ("wheel 65", "median 35"). The first build also had a readout row (Wheel, Crowd's median guess); it repeated those labels and was cut for phone fit (crop 31 px). Chip: "Model: guesses go 60% from wheel to belief".
- Controls in DOM order: "Wheel lands on" slider (0–100, starts at 40; disabled while the wheel is hidden), "Wheel: 10", "Wheel: 65", "Hide wheel" / "Show wheel".
- Milestones (minInteractions 3): "lo" (wheel 10 shown: median 25 recorded), "hi" (wheel 65 shown: median 47 recorded), "hidden". Record line: "Wheel 10: median 25 · Wheel 65: median 47".
- Deviations from the brief: (a) options are "About 0 points apart" / "About 5 points apart" / "About 20 points apart" instead of "About the same / A few points apart / About 20 points apart", because demo-standard forbids the right option being the only one with an exact number; (b) the reveal adds one sentence with the published medians (25 and 45, brief claim 2), so the lesson's model crowd (47) is not mistaken for the study; (c) the toggle is preceded by two presets so the QA path lands on 10 and 65 exactly (pattern preset-buttons).
- Copyright: no quote; the wheel study is cited to the 1974 paper, the book only for naming the effect.

## Pre-flight v1

1. Title and hook: "A random number, then a guess" / "A wheel lands on a number, then you answer a factual question. Does the wheel matter?" Neither says how much.
2. Options: "About 0 points apart" / "About 5 points apart" / "About 20 points apart": same form, all numbered.
3. Locked stage: axis 0–100%, 30 grey dots in one column at 50% (not one of the options), the chip, the slider at 40. No wheel line, no median line, no record line.
4. Reveal values: 25 (milestone "lo", recorded; record line); 47 (milestone "hi", recorded; record line); 25 and 45 for the 1974 study (constants, claim c2).
5. QA path: slider 40 → 42, Wheel: 10 (lo), Wheel: 65 (hi), Hide wheel (hidden). All three by press 4; the record line shows both medians and the dots sit at the beliefs when the reveal opens.
6. Reset: no Reset control; "Hide wheel" is the last press and keeps the record line. Reveal reads "With the wheel at 10 the crowd's median was 25. At 65 it was 47. The number told them nothing, ... In the original 1974 study the medians were 25 and 45. ..."
7. Phone fit: see "Measurement" below.

## Measurement

Host: shared dev server http://localhost:3530 (load average 25-40, other builders' HMR in flight). `node tools/reveal-fit.mjs` as shipped timed out on every attempt (page.goto 30 s, lesson waitFor 15 s; one other builder's half-written cs/nearest-town-first-detours/Demo.tsx also broke the shared bundle for ~10 min). The numbers below come from a copy of tools/reveal-fit.mjs with only those two timeouts raised to 300 s (artifacts/books-fit/reveal-fit-slowhost.mjs, not committed); the measurement code is unchanged. QA: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<4 slugs> QA_OUT=artifacts/qa-books-1 npx playwright test tests/qa/contract.spec.ts --workers=1`, plus `--timeout=600000` (the 45 s test timeout cannot cover a 1-2 minute page load here). Failures that were "lesson renders" timeouts with the card on "Loading..." / "Compiling", or a pageerror "Invalid or unexpected token" from the shared bundle, were re-run (artifacts/qa-books-1b, -1c, -1d); screenshots in artifacts/qa/<slug>/.

- reveal-fit v1 (first layout): fit, crop 31 px, 86 words; the chip wrapped to two lines. Fix: readout row removed (the picture labels the wheel and the median), chip shortened.
- reveal-fit after fix: fit, **crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 86 words**. Axis text 11 px in a 320-wide viewBox: ~10.9 px.
- QA: desktop pass (run 1); phone pass on re-run (run 1 timed out on "lesson renders").
