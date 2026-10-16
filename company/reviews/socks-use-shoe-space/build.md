# Build note: socks-use-shoe-space

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r2 §2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md, as amended by patch r3 "§2 re-check") title `Socks beside the shoe or in it?`, hook, question (`Rolled socks beside a shoe … Stuffed inside the shoe, how much extra space do they take?`), options `None` / `The same as beside it`, key index 0.
- Applied, commit 10c03f8 (D4 E2): the hollow label in mode B reads `N cm³ still empty` with N = 600 − min(socks, 600) (400 at the initial 200, 0 from 600 up); A keeps `600 cm³ empty`; no label while neutral (as before). New claim `lifehacks.socks-use-shoe-space.picture` (derivation, unverified). The non-vacuity test in tests/lifehacks/home-locked.test.mjs asserted mode B draws `600 cm³ empty`; it now asserts A draws `600 cm³ empty` and B `400 cm³ still empty` (flagged in the readiness record).
- Reset: c4; new: picture. Not done: the third predict option of spec §8 (W-1358): this batch does not name it.
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; two options.
- Seen table (r11 finding 1): "Volume the socks add" 200 / 0 cm³ and "Shoe and socks" 1,000 / 800 cm³.
- Slider (finding 2): range raised from 100-400 to 100-800 cm³ so it passes the 600 cm³ hollow and the inside column starts to grow; the picture labels the hollow "600 cm³ empty" and the idea says socks add nothing until they are bigger than the space.
- Safety line kept verbatim.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: None, moved from 2nd to 1st of 2 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
