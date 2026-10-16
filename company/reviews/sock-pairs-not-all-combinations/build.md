# Build note: sock-pairs-not-all-combinations

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r3 (company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md) D2 rows in full (supersede its §2 title and hook): title `Ten socks: how many pairings?`, hook, question (six socks of three people, 15 pairings given; ten?), options `25: in step with the socks` / `45` / `90`, key index 1 (was 2), resultLabel `Possible pairings`, revealLine, idea (c1, and meta objective), limit (c2), formula (c3), seen, recall question, misconception, learner.doesNotKnow[0]. Patch run at p = 6/10/4/8: 15/3, 45/5, 6/2, 28/4, as quoted.
- Reset: c1, c2, c3, c4, seen, recall (question reworded; why unchanged). Kept (patch: keep): initial, min, max, step, modeLabels, amounts, c5.
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan ("3" / "6" / "15").
- Picture (r11 findings 1, 4): the socks on a circle; A draws every possible pairing as a line (15 at 6 socks, 45 at 10); B draws only the partner lines with each pair's number. Nothing is cut off at the top.
- Both counts live with the slider (15 vs 3, 45 vs 5). "Combinatorial growth" replaced with "the pairings grow much faster than the socks" (finding 2).
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: 15, 3rd of 3 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
