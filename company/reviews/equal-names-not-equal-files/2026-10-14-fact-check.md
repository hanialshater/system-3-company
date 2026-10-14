# Fact-check: equal-names-not-equal-files

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B4, PR #2 head origin/codex/lifehacks-200, read via git show only; contributor review records not read. Re-derived from studyCatalog.ts, studyModels.ts and StudyLesson.tsx (rendered reveal text). Status is a recommendation to apply to meta.json after the merge; nothing here was written to the lesson.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question and correct option in the claim equal the catalogue fixture text (checked by string comparison). Stipulated exercise data. |
| c2 | verified | Principle text equals the rendered principle (string match). Fixture re-derived: Items report.txt/A, report.txt/B, copy.txt/A. Different content identifiers A vs B: true. Observation: 'Name groups' count is 2 and 'Content groups' count is 2 (node/code), so the displayed number does not change between the two steps; the claim is true but the stage number does not itself show it (pedagogy hand-off, not a fact error). Source: Google Drive Help answer 2375114 exists (search); host blocked here, page not read. Snippets confirm filter chips / search options for type, owner and date modified. A Trash/location filter was not found on the official page snippets (only a third-party help page), so source-support for the trash behaviour is unverified (source unreachable); the claim text itself is fixture-bound and hedged. |
| c3 | verified | Reveal sentences are computed from visible state (code read of observation()).  Scoped to an exercise; no productivity claim made. |
| c4 | verified | Recall question, correct option and rationale equal the catalogue fixture and meta.recall (string match); answer re-derived (see c2 note). |

Unrecorded learner-visible factual sentences: none found. Title, hook, question, options, principle and boundary are all inside c1-c4; dynamic reveal sentences are covered by c3.

Sources: external hosts (learn.microsoft.com, support.google.com, doi.org, psychologicalscience.org, pubmed) are blocked by the proxy (403) in this environment; checked through search snippets only, marked as such above.
