# Build note: laundry-gap-air-path

Kept from evaluators until they report.

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r3 (company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md) D1 rows in full: engine 2 on the existing `gaps` case; title `Room between the shirts`, hook, question (60 cm rail, 5 cm gaps; 48 cm rail?), options `None: they touch` / `2 cm` / `5 cm: same five shirts`, key index 1; initial 60 → 48; inputLabel `Rail width`; modeLabels `Pushed together` / `Spread evenly`; amounts, resultLabel `Gap between neighbours`, plainNumbers, revealLine; idea (c1, and objective), formula (c3); misconception (the "same five shirts" option); version 2. Joined the W2 ratchet (tests/lifehacks/home-v2.test.mjs) and the r11 W2 inventory (engines-v2.test.mjs); no pinned value in home.test.mjs moved.
- Patch run at 48/60/45/80: B = 2 / 5 / 1.25 / 10 cm, A = 0; ratchet ok at all 36 steps, as quoted.
- Reset: c1, c3, c4; new: seen. Kept (patch: keep): c2, recall, c5. Not applied: the to-scale gaps picture (patch r3 flags it as an engine row it is not asking for now).
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- NOT applied (whole row, section 1D). The patch's line needs the shirt count as the slider on a fixed 60 cm rail, gap = (60 − 8n)/(n − 1). home-models.ts case 'gaps' takes the slider as the rail width and the count as a fixed value, so the line needs a new or changed model case in src/lib/lifehacks/home-models.ts (shared Home engine, 69 lessons) plus a cloth picture for a variable count in HomeLesson.tsx. The caller's brief says: stop that row if it needs a shared-engine change. Title, hook and question were not applied either, because they describe the count model ('Hang two more: how much gap is left?') and would be false on the width model. Nothing in this lesson changed; no claim reset.
