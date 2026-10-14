# Fact check: shorter-folder-path

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** work/old/notes 3, work/old/maps 3, home/docs 2: total 8. After removing "/old/": 2,2,2: total 6 (fileResult steps 1,2, run). "Redundant middle directory" is a stipulation of the exercise and the principle disclaims a measured speedup. SOURCE-FIX: c4 cites the Google Drive search help page, which says nothing about folder depth; replace with the fixture.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Derivation correct (8 to 6 segments). SOURCE-FIX: cited Drive help page (search/filter) does not bear on path segment counts; Drive page was also unreachable (403 on CONNECT), so not opened. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
