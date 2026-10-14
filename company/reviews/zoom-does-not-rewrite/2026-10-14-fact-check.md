# Fact check: zoom-does-not-rewrite

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Tokens Map, Key unchanged at steps 0-2; scale 1, 1.5, 0.8 shown as Zoom 150% and 80% (run). Claim holds for view zoom; c4 cites MS Learn keyboard-accelerators, unreachable (403) and context only.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Re-run: tokens identical, scale changes. Cited MS Learn page unreachable and does not document a zoom-does-not-edit-text rule; the claim rests on the fixture, not the page. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
