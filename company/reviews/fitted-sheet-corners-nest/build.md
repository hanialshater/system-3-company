# Build note: fitted-sheet-corners-nest

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; two options, "[x]" filled as 18 cm (32 − 14 from case 'nest' at 4 corners).
- Picture (r11 finding 1): a new drawing of four corner cups, stacked apart (32 cm) or nested inside each other (14 cm), with a height bar. It no longer reuses the drying drawing.
- Slider fixed at the 4 corners a sheet has (min = max = 4), so it is hidden (finding 3); "slider-drives-live-chart" removed from interactions.
- No "envelope" or "pocket" wording; the result row is "Folded thickness" (finding 2).
- Not done: the practical folding move itself (finding 4) is still not taught; the limit says so.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: 18 cm flatter, 2nd of 2 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
