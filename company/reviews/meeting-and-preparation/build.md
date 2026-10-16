# Build note: meeting-and-preparation

## Revision v2, W9 (r11 fix plan, 2026-10-15, demo-builder)

Input: the W9 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md and this lesson's r11 learner review.

**What changed**
- The presentation runs 30–45, and the 20-minute prep starts booked after it (45–65), which is the calendar with prep missing before the presentation. The v1 stage gained `dueRow`: prep is due at 30, so the readouts say "Due at 30: finishes at 65" and "Late: 35 min". "Book prep before 30" moves it to 10–30. I kept the hook ("You booked the presentation, but where did preparation go?"). It is a neutral question, and the plan does not replace it.
- The version was already bumped to v2 by the TP-4/TP-5 template change on this branch, and is not bumped twice.

**Claims** (none marked verified by me): c1 unverified, c2 verified, c3 unverified, c4 unverified, recall verified.

## Pre-flight v2
1. **Title and hook:** "Preparation needs its own slot" / unchanged hook. The title points at the answer; cm content.
2. **Options:** "Only if prep is booked before 30", "Yes: prep fits somewhere".
3. **Locked stage:** prep after the presentation, the deadline line at 30, readouts "?".
4. **Reveal values:** every number in the first reveal sentence is computed from the learner's final layout or order. The milestones are "Test plan"/"Run queue" and the lesson's button.
5. **QA path:** the first button, the lesson's button, then the slider (schedule) or the swaps (queue). Both milestones are reached, and the final state is on screen at the reveal.
6. **Reset:** there is no Reset control, and the reveal reads the current state.
7. **Phone fit:** reveal-fit 390×844 (committed tool, clean stamp, dev server; it commits the first option): verdict fit, crop 0 px, hiddenBelow 0 px, 47 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server :3711): QA contract phone and desktop (`QA_BASE_URL`, the 28 lessons changed on the branch); `npm run test:lifehacks` 64/64; `npm run check`; `npx tsc --noEmit`. Results in the commit message.

## Template change v2 (r11 fix plan, 2026-10-15, demo-builder)

- TP-4 (shared v1 schedule stage, `StudyLesson.tsx`): readouts in words ("Overlap 5 min", "Due at 40: finishes at 50", slider "minute 12"); an overlapping layout reports "no valid finish" instead of a normal finish; the reveal's first sentence reads the final layout and names each overlapping pair with its minutes. The explore hint no longer says "fixture". The lesson's own text (title, hook, question, options, principle) is unchanged.
- **Claims:** c3 (displayed results and the reveal) reset to unverified, because the shared stage text changed. No other claim changed. Version → 2.
- **Checks:** QA contract phone and desktop passed on the dev server (`QA_BASE_URL=http://localhost:3711`); `npm run test:lifehacks`, `npm run check`, `npx tsc --noEmit` green.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and/or hook replaced as the patch row gives it (no question, option or key change). Reset: the claim quoting them (c1 Study, c4 Home).
- TP-8 across W9 after this patch (own count from studyCatalog): key at index 0 in 5 of 13, index 1 in 7, index 2 in 1. No position holds the key in more than 9 of 13.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
