# Fact check: work-in-process-limit

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Durations one 5, two 10, three 15; initial order three,two,one. Before any "Swap first"/"Try target" the stage uses 5-minute round-robin: slices 3,2,1,3,2,3, the five-minute job "one" finishes at minute 15, first completion 15, total 30 (run). Whole-job target order one,two,three finishes "one" at 5; "Swap first" gives order two,three,one with first completion 10. So (a) "The bars represent whole-task execution" is false for the opening round-robin view, whose bars are 5-minute slices; (b) "Starting everything would spread progress without completing the first job" overstates: the first job does complete, at minute 15 instead of 5.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | disputed | Two wording errors against the model: bars in the opening view are 5-minute round-robin slices (not whole-task); and the first job does complete under round-robin (minute 15, not never). FIX: "In the whole-job view each bar is one job run to completion. Slicing the same 30 minutes of work into 5-minute turns delays the first completion from minute 5 to minute 15; starting and finishing are different counts." |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | disputed | Recall rationale repeats c2's two errors. Keyed answer ("One job to completion" completes the first five-minute job at minute 5) is correct when the learner uses "Try target". Same FIX as c2. Advisory: "Swap first" yields first completion 10, not 5. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
