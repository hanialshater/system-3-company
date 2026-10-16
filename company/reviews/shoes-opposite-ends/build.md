# Build note: shoes-opposite-ends

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r2 §2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md, as amended by patch r3 "§2 re-check") title `Packing a pair of shoes`. Hook kept (patch: keep).
- Reset: c4. The D5 target mark (the turned shoe) is kept, as D5 rules. Two-option predict (W-1248) is lane 6's, not this batch's.
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

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
