# Build note: fragmented-time-does-not-fit

## Revision v3 (W1, r11 fix plan, 2026-10-15, demo-builder)

Input: company/reviews/fragmented-time-does-not-fit/2026-10-15-learner-adult-beginner-r11.md (verdict revise) and the W1 row of company/decisions/2026-10-15-lifehacks-r11-fix-plan.md.

**What changed**
- **Plan line implemented.** New hook and question; the fixture now has three 10-minute gaps before minute 40 (call 10–15, chat 25–30), as the question states. The job starts at minute 0, in the first gap, so the scattered plan is the starting layout, and "Test plan" shows it fail: 10 minutes of overlap and "no valid finish". "Use one 30-min gap" moves it to 40–70.
- **TP-4.** The free gaps are drawn dashed in the job's lane. Readouts in words: "Free before 40: 30 min · longest gap 10", "Overlap", "Finish" (an overlapping layout says "no valid finish"). The reveal reads the final layout in its own sentence after the kit's verdict line.
- The r11 note about the recall card ("25 < 40") is not a mismatch: the recall question has its own gaps (20, 15, 25) and a 40-minute task.

**Claims** (none marked verified by me): c1 rewritten; c3 reset (stage rules); c4 new (fixture). c2 and recall unchanged and verified.

**Version** → 3.

## Pre-flight v3
1. **Title and hook:** "Thirty scattered minutes" / "Thirty free minutes in scattered gaps: will a 30-minute job fit?" Neither answers it.
2. **Options:** "Yes: 30 minutes free", "No: it needs one 30-minute gap". Same precision.
3. **Locked stage:** the job at 0–30 over call and chat, dashed gaps, all readouts "?". The caption says the job runs in one piece, which the question assumes.
4. **Reveal values:** free minutes and the longest gap come from the fixture; overlap and finish come from the learner's final layout.
5. **QA path:** Test plan (milestone 1), Use one 30-min gap (milestone 2), Start slider +2. The final layout is on screen at the reveal.
6. **Reset:** none; the reveal reads the current layout. QA-path reveal: "Before minute 40 there are 30 free minutes in 3 gaps, and the longest gap is 10 minutes. Your final layout has no overlap, and everything is done by minute 72."
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp, dev server): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, 57 words, phoneFit true.

**Checks** (worktree /home/user/s3c-lh-study, branch lh-study, dev server `NEXT_DIST_DIR=.next-lhs next dev -p 3711`): QA contract (`tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3711`, `QA_ONLY` = the 28 lessons changed on this branch) phone and desktop passed; `npm run test:lifehacks` 64/64; `npm run check` passed; `npx tsc --noEmit` clean.

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** "Three gaps total thirty minutes" contradicted the calendar, which has two 10-minute gaps before minute 40.
- **Fix:** The FC sentence is 110 characters, and the hook bound in study.test.mjs is 90. I did not loosen the fixture. Instead the hook and c1 say the same thing in 84 characters: "Two ten-minute gaps before minute 40. A thirty-minute task needs one continuous gap." The predict distractor "Any three 10-minute gaps" is unchanged, because the FC note about the recall distractor is moot after the recall patch.
- **Recall check:** Recall (gaps 20, 15, 25; 40-minute task) agrees.
- **Claims:** c1 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
