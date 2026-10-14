# Fact-check: earliest-deadline-first

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B4, PR #2 head origin/codex/lifehacks-200, read via git show only; contributor review records not read. Re-derived from studyCatalog.ts, studyModels.ts and StudyLesson.tsx (rendered reveal text). Status is a recommendation to apply to meta.json after the merge; nothing here was written to the lesson.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question and correct option in the claim equal the catalogue fixture text (checked by string comparison). Stipulated exercise data. |
| c2 | verified | Principle text equals the rendered principle (string match). Fixture re-derived: urgent 15/due 15, quick 5/due 40, later 10/due 50. Urgent first: ends 15, on time (late if >). Initial [later,quick,urgent]: late 1. Urgent-first wait 35, short-first [quick,urgent,later] wait 20 but urgent late (node). 'Rewards meeting due dates rather than minimising average waiting' true. Valid orders: 012, 021. |
| c3 | verified | Reveal sentences are computed from visible state (code read of observation()).  Scoped to an exercise; no productivity claim made. |
| c4 | verified | Recall question, correct option and rationale equal the catalogue fixture and meta.recall (string match); answer re-derived (see c2 note). |

Unrecorded learner-visible factual sentences: none found. Title, hook, question, options, principle and boundary are all inside c1-c4; dynamic reveal sentences are covered by c3.

Sources: external hosts (learn.microsoft.com, support.google.com, doi.org, psychologicalscience.org, pubmed) are blocked by the proxy (403) in this environment; checked through search snippets only, marked as such above.
