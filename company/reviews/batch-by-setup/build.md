# Build note: batch-by-setup

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit c715f7f (r5 D3, FC 61 W-1344): hook (spec and meta) `…Does the order change how long they wait?`; question (total waiting, each task's start time added up); options `2 minutes: one switch fewer` / `0: same three tasks` / `4 minutes`, key index 2 (was 0); principle (c2); meta misconception `Removing one 2-minute switch saves 2 minutes of waiting.`. queueResult on this tree: [0,1,2] waiting 21, starts 0/7/14; [0,2,1] waiting 17, starts 0/5/12; 21 − 17 = 4, as D3 quotes.
- Reset: c1 (was disputed), c2. Kept: recall (D3: keep, it counts switches).
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Template change v2 (r11 fix plan, 2026-10-15, demo-builder)

- TP-5 (shared v1 queue stage, `StudyLesson.tsx`): the caption defines total waiting on the stage ("Total waiting: each job's start time, added up"); "Prereq" became "Run before input" and shows only when the lesson has a dependency; row labels read "10 min · due 60 · needs draft"; when the learner reaches the target order and it waits longer than the starting order, the reveal says so and names the goal (deadline or dependency). The explore hint no longer says "fixture". The lesson's own text is unchanged.
- **Claims:** c3 (displayed results and the reveal) reset to unverified, because the shared stage text changed. No other claim changed. Version → 2.
- **Checks:** QA contract phone and desktop passed on the dev server (`QA_BASE_URL=http://localhost:3711`); `npm run test:lifehacks`, `npm run check`, `npx tsc --noEmit` green.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title, hook, question, options, answer replaced (1C). Key '2 minutes' (index 0). Own run of queueResult: A1→B1→A2 19 min, 2 switches; A1→A2→B1 17 min, 1 switch. Reset: c1.
- TP-8 across W9 after this patch (own count from studyCatalog): key at index 0 in 5 of 13, index 1 in 7, index 2 in 1. No position holds the key in more than 9 of 13.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
