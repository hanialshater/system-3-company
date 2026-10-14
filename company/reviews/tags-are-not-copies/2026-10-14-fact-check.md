# Fact check: tags-are-not-copies

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Rows doc-1/work, doc-1/study, doc-2/home: "Count links" 3, "Count identities" 2 (run). The keyed answer to "How many underlying documents have two labels here?" is One (doc-1 only), which is literally correct, but the reveal prints "2 identities" beside it, which a learner may read as contradicting the keyed answer (clarity, route to demo-critic; not a factual error). SOURCE-FIX on c4 (Drive search help does not discuss labels-as-links semantics).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Literal answer One is correct (only doc-1 carries two labels). Advisory: reveal shows "2 identities" beside it; consider rewording the question to "How many separate documents sit behind these three labelled links?" SOURCE-FIX: Drive search help is off-topic and was unreachable (403). |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
