# Build note: work-in-process-limit

## Pre-flight v3

2026-10-14, demo-builder. Board W-403 (FC LH-4 dispute, company/reviews/lifehacks-200/fact-check-LH4-2026-10-14.md).

- **Dispute:** "Slicing ... delays the first completion from minute 5 to minute 15" was false. The opening round-robin ran order three, two, one and the whole-job view ran one, two, three, so the job order made the difference, not slicing. c1 (the predict question) had the same flaw.
- **Fix (FC option 1, one order in both views):** the fixture keeps durations 5, 10, 15, now labelled C, A, B so both views run order A (10), B (15), C (5); `initial` = `target` = [1,2,0]. Whole jobs: A 10, B 25, C 30, first completion 10. 5-minute turns: C 15, A 20, B 30, first completion 15. A, the first job in line, is longer than one turn, so slicing delays it from 10 to 20. Re-checked in node with `queueResult` and `roundRobinQueue`.
- **Stage:** for this lesson only, StudyLesson.tsx replaces "Swap first" / "Try target" (which changed the order and the view at once) with "Whole jobs" and "5-min turns", which toggle the view and never the order. The caption reads "Whole jobs · duration/due" in the whole view, and the reveal's first line names the order.
- **Text:** the question is "Same three jobs, same order A, B, C. Which plan finishes its first job sooner?" and the options are "Whole jobs, one at a time" / "Rotate 5-minute turns" (key 0). The principle (c2) is "Same order A, B, C and the same 30 minutes of work. Run whole, A is done at minute 10. In 5-minute turns the first job done is C, at minute 15, and A waits until minute 20. Starting and finishing are different counts."
- **Recall check:** recall (three 10-minute tasks: 10 one by one, 20 rotating) is the same rule on a near-transfer case and agrees. Unchanged.
- **Claims:** c1, c2 and c3 (c3 now names the view as state) are unverified. c4 no longer exists (deleted in W-391b). Version 2 → 3.
- **Test note:** the existing fixture test in tests/lifehacks/study.test.mjs pins orders [2,1,0] and [0,1,2], which are not the stage order any more. It still passes, because the durations did not change. I did not edit tests (out of scope). A stage-order assertion is routed on the board.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`.
- **Not done:** no build, no QA and no walkthrough (the brief says so). The stage is unseen, including whether three controls fit one row at 390x844.

## Pre-flight v2

2026-10-14, demo-builder. Board W-367 (FC LH-1 dispute, company/reviews/lifehacks-200/fact-check-LH1-2026-10-14.md).

- **Dispute:** The opening view is a 5-minute round-robin, so "the bars represent whole-task execution" was wrong, and the first job does finish (at minute 15).
- **Fix:** The principle, c2 and c4 now say: "In the whole-job view each bar is one job run to completion. Slicing the same 30 minutes of work into 5-minute turns delays the first completion from minute 5 to minute 15; starting and finishing are different counts." The FC also noted that "Swap first" gives a first completion of 10. That is what the stage shows, and no text claims otherwise, so the control is unchanged.
- **Recall check:** Recall (three 10-minute tasks: 10 vs 20) agrees.
- **Claims:** c2, c4 are unverified, waiting on the fact-checker's re-check. Version 1 → 2.
- **Checks:** `npm run test:lifehacks` 53/53, `tsc` clean, `npm run check`. No fixture changes were needed.
- **Not done:** no build, no QA and no walkthrough (the brief says so). I did not screenshot this lesson's stage, so the stage text is unseen.
