# Build note: shoes-opposite-ends

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; two options, filled from values toe 12, heel 6: "18 cm" / "24 cm: same shoes".
- Picture (r11 finding 2): top view to scale (7 units per cm) inside the bag. Each shoe narrows evenly from toe to heel with rounded caps; toe-to-heel, the reversed shoe's edge lies exactly on the first one's, so they touch with no overlap. A dimension bar shows the pair width.
- Seen table (finding 3): "Pair width" 24 / 18 cm, then "Room left in the bag".
- No "envelope" anywhere (finding 1).
- For fact-checker (TP-9): the recall claim's worked example uses toe 11 / heel 5; the stage uses 12 / 6.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: 18 cm, moved from 2nd to 1st of 2 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
