# Build note: tote-balance-sides

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r3 (company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md) D2 idea (c1, and meta objective) so it holds at every slider value; r3 dispatch D2: c1 support source → derivation with the FC54 argument as written in patch r3 (the REI page kept as further reading); new claim `lifehacks.tote-balance-sides.caption` = `Model; no safe load limit` (convention, unverified). Pending the W-1094 safety re-look (load lesson).
- Applied, commit 8ffa8f1 (D4 E1): lever arm 150 → 188 in w3Picture `balance`; the rotated balance-point dot now lands on the dashed vertical (test, ±1 unit at p = 3 and 5; fails at 150 with x = 156.25).
- Reset: c1; new: caption. Kept: title and hook (patch: keep), c2 load wording. Not applied: r14 note 1 ("−10 cm" with no 20 cm anchor), which patch r3 left for the walk. Two-option predict (W-1248) is lane 6's.
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; two options ("No: the total didn't change" / "Yes").
- Seen table (r11 finding 2, W-1076): Left side and Right side for both layouts (3 kg / 1 kg as packed, 2 kg / 2 kg evened out), and the balance point for both (−10 cm · left of the handle / 0 cm · under the handle). "Left mass 3.2 kg beside a 0 cm centre" can no longer appear.
- Slider: "Left side, as packed", 1 to 5 kg in steps of 2, so the evened-out sides stay whole kilograms; both columns move. Safety: weights stay at 6 kg or less (safety record), caption "Model; no safe load limit" and the limit line kept.
- Picture: the tote hangs from its handle and tilts until its balance point is under the handle, so "hangs straight" is visible.
- Idea in plain words ("the heavier side pulls the balance point towards it"), no "mass-weighted average".
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: Yes, 2nd of 2 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
