# Build note: suitcase-layer-access

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan.
- Picture (r11 finding 1): a suitcase drawn as a vertical stack, the jacket marked and labelled, up-arrows on every item above it.
- Seen table (finding 2): "Items to lift" 5 / 0, live with the slider (now "Items in the case", not "Layers").
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: 5, 3rd of 3 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
