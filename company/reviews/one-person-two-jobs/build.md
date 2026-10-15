# Build note: one-person-two-jobs

## Revision v2, W9 (r11 fix plan, 2026-10-15, demo-builder)

Input: the W9 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md and this lesson's r11 learner review.

**What changed**
- The fixture is now two 30-minute jobs, both drawn from minute 0. "Test plan" shows 30 minutes of overlap and "no valid finish" (TP-4). "One after the other" moves job B to 30–60.
- The version was already bumped to v2 by the TP-4/TP-5 template change on this branch, and is not bumped twice.

**Claims** (none marked verified by me): c1 unverified, c2 verified, c3 unverified, c4 unverified, recall verified.

## Pre-flight v2
1. **Title and hook:** "One person, two blocks" / "Two 30-minute jobs on separate rows from minute 0, one person."
2. **Options:** "Minute 30", "Minute 60".
3. **Locked stage:** both jobs at 0–30, readouts "?".
4. **Reveal values:** every number in the first reveal sentence is computed from the learner's final layout or order. The milestones are "Test plan"/"Run queue" and the lesson's button.
5. **QA path:** the first button, the lesson's button, then the slider (schedule) or the swaps (queue). Both milestones are reached, and the final state is on screen at the reveal.
6. **Reset:** there is no Reset control, and the reveal reads the current state.
7. **Phone fit:** reveal-fit 390×844 (committed tool, clean stamp, dev server; it commits the first option): verdict fit, crop 0 px, hiddenBelow 0 px, 41 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server :3711): QA contract phone and desktop (`QA_BASE_URL`, the 28 lessons changed on the branch); `npm run test:lifehacks` 64/64; `npm run check`; `npx tsc --noEmit`. Results in the commit message.

## Template change v2 (r11 fix plan, 2026-10-15, demo-builder)

- TP-4 (shared v1 schedule stage, `StudyLesson.tsx`): readouts in words ("Overlap 5 min", "Due at 40: finishes at 50", slider "minute 12"); an overlapping layout reports "no valid finish" instead of a normal finish; the reveal's first sentence reads the final layout and names each overlapping pair with its minutes. The explore hint no longer says "fixture". The lesson's own text (title, hook, question, options, principle) is unchanged.
- **Claims:** c3 (displayed results and the reveal) reset to unverified, because the shared stage text changed. No other claim changed. Version → 2.
- **Checks:** QA contract phone and desktop passed on the dev server (`QA_BASE_URL=http://localhost:3711`); `npm run test:lifehacks`, `npm run check`, `npx tsc --noEmit` green.
