# Build note: dependency-before-priority

## Revision v2, W9 (r11 fix plan, 2026-10-15, demo-builder)

Input: the W9 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md and this lesson's r11 learner review.

**What changed**
- The review carries a "high priority" tag on the stage (`priority`). The question is the plan's "Which runs first?". The hook used to state the answer, so it now repeats the question until cm supplies one. The TP-5 reveal sentence explains the Wait difference: draft first waits 10 minutes more, and the goal is running each job after the job it needs.
- The version was already bumped to v2 by the TP-4/TP-5 template change on this branch, and is not bumped twice.

**Claims** (none marked verified by me): c1 unverified, c2 verified, c3 unverified, c4 unverified, recall verified.

## Pre-flight v2
1. **Title and hook:** "Priority cannot bypass input" / "Which runs first?" The title states the answer; cm content.
2. **Options:** "The draft it needs", "The high-priority review".
3. **Locked stage:** review first, tagged high priority, readouts "?".
4. **Reveal values:** every number in the first reveal sentence is computed from the learner's final layout or order. The milestones are "Test plan"/"Run queue" and the lesson's button.
5. **QA path:** the first button, the lesson's button, then the slider (schedule) or the swaps (queue). Both milestones are reached, and the final state is on screen at the reveal.
6. **Reset:** there is no Reset control, and the reveal reads the current state.
7. **Phone fit:** reveal-fit 390×844 (committed tool, clean stamp, dev server; it commits the first option): verdict fit, crop 0 px, hiddenBelow 0 px, 72 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server :3711): QA contract phone and desktop (`QA_BASE_URL`, the 28 lessons changed on the branch); `npm run test:lifehacks` 64/64; `npm run check`; `npx tsc --noEmit`. Results in the commit message.

## Template change v2 (r11 fix plan, 2026-10-15, demo-builder)

- TP-5 (shared v1 queue stage, `StudyLesson.tsx`): the caption defines total waiting on the stage ("Total waiting: each job's start time, added up"); "Prereq" became "Run before input" and shows only when the lesson has a dependency; row labels read "10 min · due 60 · needs draft"; when the learner reaches the target order and it waits longer than the starting order, the reveal says so and names the goal (deadline or dependency). The explore hint no longer says "fixture". The lesson's own text is unchanged.
- **Claims:** c3 (displayed results and the reveal) reset to unverified, because the shared stage text changed. No other claim changed. Version → 2.
- **Checks:** QA contract phone and desktop passed on the dev server (`QA_BASE_URL=http://localhost:3711`); `npm run test:lifehacks`, `npm run check`, `npx tsc --noEmit` green.
