# Build note: fitted-sheet-corners-nest

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r2 §2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md, as amended by patch r3 "§2 re-check") title `Folding a fitted sheet`, hook, question (`…or with them apart. How do the two heights compare?`), options `The same: elastic always lumps` / `Nested is 18 cm flatter`, key index 1 (unchanged); r3 dispatch D2 c5 (spec `recall`) `Why can nesting hollow shapes take up less room without removing any material?`.
- Reset: c4, c5. Not done: the third predict option of interaction-designer's spec §8 (W-1358): this batch does not name it.
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

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
