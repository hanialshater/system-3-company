# Build note: slowest-station-sets-pace

builder: demo-builder (demo-builder-books-1) · 2026-10-14 · v1 draft · brief: company/domains/briefs/books.md #1 · format: single card (today; multi-card later per brief)

- Intent: four station boxes in a row (rates 12, 9, 5, 10 parts an hour), a pile of small squares in front of each station showing what waits there after one hour (inflow minus rate, inflow = slowest rate upstream), the unique slowest station outlined in red and labelled "slowest". Readouts: "Finished an hour" (? until the commit) and "Upgrades left".
- Controls in DOM order: S1 +2, S2 +2, S3 +2, S4 +2 (3 upgrades to spend, as the brief says), then presets "All 3 on S3" and "Double S1" (the question's own case), then Reset.
- Deviation from the brief, mechanics only: the brief's milestone 3 (the bottleneck moves) needs three taps on station 3, which the QA path (each control once) never makes. Following pattern preset-buttons, "All 3 on S3" reaches it in one press; "Double S1" makes the question's case a milestone (demo-standard: the question's own case is a milestone). The free taps stay for exploration.
- Milestones (minInteractions 4): "same" (a non-bottleneck tap leaves output unchanged), "rose" (a tap raises output), "moved" (unique slowest station is no longer station 3; station and output recorded), "asked" (rates 24, 9, 5, 10; output recorded). A record line under the picture keeps "S1 at 24: 5/h" and "S3 faster: 9/h, slowest now S2" through Reset.
- Reveal: the brief's draft, reworded to the question's case (doubling station 1) instead of "while you sped up station {n}", and with the brief's optional claim 4 (firm-level evidence is mostly case reports) because the charter asks for the real-world-use verdict when the book's claim is arithmetic.
- Copyright: no quote, no characters or dialogue from the novel; the line and numbers are our own toy model.

## Pre-flight v1

1. Title and hook: "Double the fastest machine" / "A line of four machines makes parts. What does one much faster machine buy you?" Neither names 5, the slowest station or "bottleneck".
2. Options: "5" / "7" / "10" / "12": all bare numbers.
3. Locked stage: four boxes labelled S1 to S4 with 12/h, 9/h, 5/h, 10/h (the question's givens), no piles, no outline, no "slowest" label, "Finished an hour ?", "Upgrades left 3".
4. Reveal values: 24 and 5 (milestone "asked", recorded; record line); "station 3 sped up, the bottleneck moved to station 2" (milestone "moved", recorded; record line). Everything else is constant text.
5. QA path: S1 +2 (same), S2 +2, S3 +2 (rose; budget now 0, S4 disabled and skipped), All 3 on S3 (moved), Double S1 (asked), Reset. All four milestones by press 5; both record lines visible after Reset.
6. Reset: reveal after Reset reads "Doubling station 1 to 24 left output at 5 an hour: the extra parts just piled up in front of slower stations. ... once station 3 sped up, the bottleneck moved to station 2. ..." and the record lines still show both states.
7. Phone fit: see "Measurement" below.

## Measurement

Host: shared dev server http://localhost:3530 (load average 25-40, other builders' HMR in flight). `node tools/reveal-fit.mjs` as shipped timed out on every attempt (page.goto 30 s, lesson waitFor 15 s; one other builder's half-written cs/nearest-town-first-detours/Demo.tsx also broke the shared bundle for ~10 min). The numbers below come from a copy of tools/reveal-fit.mjs with only those two timeouts raised to 300 s (artifacts/books-fit/reveal-fit-slowhost.mjs, not committed); the measurement code is unchanged. QA: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<4 slugs> QA_OUT=artifacts/qa-books-1 npx playwright test tests/qa/contract.spec.ts --workers=1`, plus `--timeout=600000` (the 45 s test timeout cannot cover a 1-2 minute page load here). Failures that were "lesson renders" timeouts with the card on "Loading..." / "Compiling", or a pageerror "Invalid or unexpected token" from the shared bundle, were re-run (artifacts/qa-books-1b, -1c, -1d); screenshots in artifacts/qa/<slug>/.

- reveal-fit v1 (first layout): fit, crop 23 px, 90 words. Fix: picture viewBox 150 -> 104 high (empty band above and below the line removed), pile squares 5 -> 6 px.
- reveal-fit after fix: fit, **crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, 90 words** ("slowest" visible). SVG labels 12-14 px in a 340-wide viewBox drawn ~316 px wide: >= 11 px.
- QA: desktop pass (run 1); phone pass on re-run (run 1 phone had a React 'state update on a component that hasn't mounted' warning plus 'Invalid or unexpected token' from the shared bundle during HMR; desktop of the same build was clean).
