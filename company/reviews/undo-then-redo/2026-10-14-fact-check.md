# Fact check: undo-then-redo

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Tokens A X C, Undo gives A B C, Redo gives A X C (run). Principle correctly hedges that apps differ. c4 cites Microsoft Learn "Keyboard accelerators" (WinUI); the page could not be opened (403) and search did not surface a Undo/Redo table on it, so that source is unconfirmed, but the claim is a definition plus a hedge and holds without it.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Model behaviour re-run. Cited MS Learn page unreachable (403) and not confirmed to list Undo/Redo; the claim does not depend on it (definitional, hedged). SOURCE-FIX: prefer a page that documents Undo/Redo (for example Microsoft Support "Undo, redo, or repeat an action", which lists Ctrl+Z and Ctrl+Y). |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
