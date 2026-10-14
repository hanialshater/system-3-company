# Fact check: show-the-file-extension

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** report.pdf / report.docx / report.txt. Step 1 ("Hide extensions") shows base names: 1 unique name; step 2 shows 3 unique names (run). "An extension alone does not verify file contents" is true (extensions are names, not content checks). Nit: hook says "Two visible names" but three files are shown. SOURCE-FIX on c4 (Drive search help is off-topic).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Derivation correct (1 unique base name vs 3 distinct full names). SOURCE-FIX: Drive search help does not discuss extension display; unreachable here (403). |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
