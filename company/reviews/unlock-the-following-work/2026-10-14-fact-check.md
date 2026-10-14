# Fact check: unlock-the-following-work

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Durations polish 15, input 5, build 20; build requires input. Initial polish>input>build: input starts 15, build starts 20, wait 35, 0 breaches; input>build>polish: build starts 5, wait 30 (run). "Doing unrelated work first delays release" is true (build starts at 20 not 5). Advisory: the readouts show 0 prerequisite breaches in both orders, so release time is not displayed; input>polish>build would give lower wait (25) than the "target" (30), but the lesson claims only the dependency ordering, not minimum waiting.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
