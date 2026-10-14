# Fact check: separate-confusable-pairs

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Fixture AX1/AX2/AX3 with left/right/centre; "Add digits" turns the identical cues AX,AX,AX into AX1,AX2,AX3 (studyCatalog.ts, StudyLesson.tsx). Match count is reconstructionMatches out of 3 (checked). Recall answer (Code plus distinguishing field) follows. SOURCE-FIX: c2 and c4 are derivations from the fixture but cite Roediger & Karpicke 2006 (a retrieval-practice paper) as their source, which does not bear on "the last digit distinguishes the codes". Replace the source with the fixture/studyModels.ts reference (support: derivation). Nit: hook says "Two almost identical labels" while the stage shows three codes.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | Statement is true by construction of the fixture (labels AX1/AX2/AX3, shared cue AX). SOURCE-FIX: the cited Roediger & Karpicke (2006) does not support it; replace source with "src/lib/lifehacks/studyCatalog.ts fixture separate-confusable-pairs; derivation". No empirical claim is made. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Same as c2: correct by construction (answer index 0 = "Code plus distinguishing field"). SOURCE-FIX as c2: R&K 2006 is the wrong source for this derivation. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
