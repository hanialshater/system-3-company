# Build note: keep-the-error-feedback

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit d44fdab (r5 D3, FC 61 W-1345): RetrievalLesson.tsx FeedbackStage chip labels `Try ${r.tries}, count only` / `Try ${r.tries}, marked` (render: "Try 3, count only", "Try 3, marked"). FeedbackStage renders only for `kind: "feedback"`, which only this lesson uses (studyCatalog.ts, 1 match). c4 last sentence replaced as D3 wrote it.
- Reset: c3 (text unchanged, was disputed), c4 (was disputed).
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.

## Revision v3 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/keep-the-error-feedback/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **The default attempt contains an error (plan).** A bike lock with the stipulated code 4 · 9 · 2; the last try was 4 · 7 · 2, after 3 tries. "Count only" shows "3 tries · still locked". "Mark each digit" marks digit 2 wrong. The learner can then change digits (fixed choices) and press "Try again", which adds a try; the lock opens only at 4 · 9 · 2. The code itself is never shown, so the marks are the only help.
- The old hook stated the answer (r11 finding 1). The new hook is the scenario sentence from the cm line, unchanged.
- **Hook is provisional.** The plan gives this lesson a question but no hook, and the old hook stated the answer. I used the cm's own words from the line, unchanged; cm-lifehacks may replace it.

**Claims** (none marked verified by me): c1 rewritten; c3 reset; c4 new. c2 and recall unchanged and verified.

**Version** → 3.

## Pre-flight v3
1. **Title and hook:** "Keep the correction" / "Two kinds of feedback after a wrong attempt: 'took 3 tries' or the item marked wrong." Neutral, though not a question.
2. **Options:** "Either", "Only the marked item". Same precision.
3. **Locked stage:** the last try 4 · 7 · 2, "Feedback: ?", both readouts "?". No mark is drawn.
4. **Reveal values:** the count sentence and the marks sentence are fixture values, each shown only after its milestone. The last sentence ("Try n …") is computed from the learner's tries.
5. **QA path:** Count only, Mark each digit, digits 1-3, Try again. Both milestones; marks and the count are on screen.
6. **Reset:** none. QA-path reveal: "“3 tries, still locked” did not say which digit was wrong. The marks did: digit 2 (7) wrong, the rest right. Try 4 is still locked."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 52 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** "Useful evidence only if you compare it" was contradicted by R&K 2006.
- **Fix:** Hook and c1 now say "Comparing your attempt with the target shows which item you got wrong."
- **Recall check:** Recall (attempt beside target, errors marked) agrees.
- **Claims:** c1 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title and hook replaced (1A). Chip labels in src/components/lifehacks/RetrievalLesson.tsx (FeedbackStage only) renamed 'First try, count only' / 'First try, marked'; mode buttons keep their labels. Count confirmed: 1 catalog entry has retrieval.kind 'feedback', so no other lesson renders these chips.
- Reset: c1 (hook), c3 (disputed; text unchanged, the stage it describes changed), c4 (chip sentence appended as the patch gives it).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
