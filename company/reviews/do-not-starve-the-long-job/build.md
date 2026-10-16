# Build note: do-not-starve-the-long-job

## Template change v2 (r11 fix plan, 2026-10-15, demo-builder)

- TP-5 (shared v1 queue stage, `StudyLesson.tsx`): the caption defines total waiting on the stage ("Total waiting: each job's start time, added up"); "Prereq" became "Run before input" and shows only when the lesson has a dependency; row labels read "10 min · due 60 · needs draft"; when the learner reaches the target order and it waits longer than the starting order, the reveal says so and names the goal (deadline or dependency). The explore hint no longer says "fixture". The lesson's own text is unchanged.
- **Claims:** c3 (displayed results and the reveal) reset to unverified, because the shared stage text changed. No other claim changed. Version → 2.
- **Checks:** QA contract phone and desktop passed on the dev server (`QA_BASE_URL=http://localhost:3711`); `npm run test:lifehacks`, `npm run check`, `npx tsc --noEmit` green.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title, hook, question, options, answer replaced (1C). Key 'No: it finishes late' (index 1). Own run: small→tiny→long ends the long job at 35 (due 25), 1 late job; long first 0 late. Reset: c1.
- TP-8 across W9 after this patch (own count from studyCatalog): key at index 0 in 5 of 13, index 1 in 7, index 2 in 1. No position holds the key in more than 9 of 13.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
