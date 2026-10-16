# Build note: reserve-an-unassigned-slot

## Template change v2 (r11 fix plan, 2026-10-15, demo-builder)

- TP-4 (shared v1 schedule stage, `StudyLesson.tsx`): readouts in words ("Overlap 5 min", "Due at 40: finishes at 50", slider "minute 12"); an overlapping layout reports "no valid finish" instead of a normal finish; the reveal's first sentence reads the final layout and names each overlapping pair with its minutes. The explore hint no longer says "fixture". The lesson's own text (title, hook, question, options, principle) is unchanged.
- **Claims:** c3 (displayed results and the reveal) reset to unverified, because the shared stage text changed. No other claim changed. Version → 2.
- **Checks:** QA contract phone and desktop passed on the dev server (`QA_BASE_URL=http://localhost:3711`); `npm run test:lifehacks`, `npm run check`, `npx tsc --noEmit` green.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title, hook, question, options, answer replaced (1C). Key 'Minute 70' (index 0). Own run of scheduleObservation: start 'done by minute 60', target [0,40,60] 'done by minute 70'.
- Builder note in the patch (label the freed 30-40 slot 'urgent task, 10 min'): NOT done. The v1 calendar has no label for a free gap; adding one is a shared StudyLesson.tsx change. The line holds without it, as the patch says.
- Reset: c1.
- TP-8 across W9 after this patch (own count from studyCatalog): key at index 0 in 5 of 13, index 1 in 7, index 2 in 1. No position holds the key in more than 9 of 13.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
