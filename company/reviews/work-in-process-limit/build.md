# Build note: work-in-process-limit

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The opening view is a 5-minute round-robin, so "the bars represent whole-task execution" was wrong, and the first job does finish (at minute 15).
- **Fix:** The principle, c2 and c4 now say: "In the whole-job view each bar is one job run to completion. Slicing the same 30 minutes of work into 5-minute turns delays the first completion from minute 5 to minute 15; starting and finishing are different counts." The FC also noted that "Swap first" gives a first completion of 10. That is what the stage shows, and no text claims otherwise, so the control is unchanged.
- **Recall check:** Recall (three 10-minute tasks: 10 vs 20) agrees.
- **Claims:** c2, c4 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
