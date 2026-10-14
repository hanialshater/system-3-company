# Fact-check: fit-before-fixed-slot

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B4, PR #2 head origin/codex/lifehacks-200, read via git show only; contributor review records not read. Re-derived from studyCatalog.ts, studyModels.ts and StudyLesson.tsx (rendered reveal text). Status is a recommendation to apply to meta.json after the merge; nothing here was written to the lesson.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question and correct option in the claim equal the catalogue fixture text (checked by string comparison). Stipulated exercise data. |
| c2 | verified | Principle text equals the rendered principle (string match). Fixture re-derived: write 10-30 (movable), call 20-35 fixed, file 35-45. Initial overlap 10; target [0,20,35] overlap 0, finish 45 (node). Call starts at minute 20: 'fixed at minute twenty' true. |
| c3 | verified | Reveal sentences are computed from visible state (code read of observation()). Advisory: source wording 'overlap is pairwise intersection length' differs from the code (time during which at least two blocks coincide); identical for this fixture because the fixed rows never overlap each other. Scoped to an exercise; no productivity claim made. |
| c4 | verified | Recall question, correct option and rationale equal the catalogue fixture and meta.recall (string match); answer re-derived (see c2 note). |

Unrecorded learner-visible factual sentences: none found. Title, hook, question, options, principle and boundary are all inside c1-c4; dynamic reveal sentences are covered by c3.

Sources: external hosts (learn.microsoft.com, support.google.com, doi.org, psychologicalscience.org, pubmed) are blocked by the proxy (403) in this environment; checked through search snippets only, marked as such above.
