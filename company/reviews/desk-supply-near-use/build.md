# Build note: desk-supply-near-use

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 92d06bf (r5 D4 E3, D5): on the v2 stage, while neutral (locked or before the first press) the picture draws no journey arrows and the label reads `N m to the tape` (was `Nm one-way`). The tape mark is at the far station while neutral and in A (the SSR render had it inside the desk rect in both, so the row's condition held); B keeps it at the desk. After a press, A still draws 6 there-and-back pairs and `Nm one-way`; B unchanged. The tape keeps its target mark (D5: keep). Tests in tests/lifehacks/home-locked.test.mjs.
- No claim text changed, so no claim reset. The label change applies only while neutral; the row's heading says "v2 + neutral only", and "N m to the tape" would be false for B's copy at the desk.
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Revision v2 (W-608, engines v2, 2026-10-14, demo-builder)

- engine: 2. Content patch r9 batch D block 5 applied as written (company/reviews/lifehacks-200/content-patch-r9-batch-d.md). Engine changes and W-611 choices: company/reviews/lifehacks-200/engines-v2-build-W-608.md.
- Claims now unverified: c4, c6, seen. New: lifehacks.desk-supply-near-use.seen (the engine's first reveal sentence). Nothing marked verified.
- Reveal fit 390x844: crop 0 px, hiddenBelow 0 px, namedHidden 0, 78 measured words, phoneFit true (artifacts/reveal-fit/w608-v2*.json).
- QA contract (dev :3530, --timeout=900000 --workers=1): phone and desktop passed (artifacts/qa-w608).
