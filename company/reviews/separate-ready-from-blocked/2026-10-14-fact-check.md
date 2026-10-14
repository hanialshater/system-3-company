# Fact check: separate-ready-from-blocked

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Labels output(15) independent(10) input(5), dependency output requires input. Simulated queueResult: initial order output>independent>input gives 1 prerequisite breach; independent>input>output gives 0. Question "Which task can run before the input arrives?" answer Independent work is correct. All sentences hold.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
