# Fact-check: calendar-needs-travel

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B4, PR #2 head origin/codex/lifehacks-200, read via git show only; contributor review records not read. Re-derived from studyCatalog.ts, studyModels.ts and StudyLesson.tsx (rendered reveal text). Status is a recommendation to apply to meta.json after the merge; nothing here was written to the lesson.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question and correct option in the claim equal the catalogue fixture text (checked by string comparison). Stipulated exercise data. |
| c2 | verified | Principle text equals the rendered principle (string match). Fixture re-derived: Stage: travel 0-15, meeting 10-30, email 35-45. Initial overlap 5 min (node), target [0,15,35] overlap 0, finish 45. Recall: 14:30 - 20 min = 14:10 (node). Stage trip is 15 min, recall trip is 20 min: stated as stipulated in c4, but the learner meets two different travel durations in one lesson (advisory, not an error). |
| c3 | verified | Reveal sentences are computed from visible state (code read of observation()). Advisory: source wording 'overlap is pairwise intersection length' differs from the code (time during which at least two blocks coincide); identical for this fixture because the fixed rows never overlap each other. Scoped to an exercise; no productivity claim made. |
| c4 | verified | 14:30 minus 20 min = 14:10, re-derived in node. Stipulated duration, honest hedge in claim. |

Unrecorded learner-visible factual sentences: none found. Title, hook, question, options, principle and boundary are all inside c1-c4; dynamic reveal sentences are covered by c3.

Sources: external hosts (learn.microsoft.com, support.google.com, doi.org, psychologicalscience.org, pubmed) are blocked by the proxy (403) in this environment; checked through search snippets only, marked as such above.
