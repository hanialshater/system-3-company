# Fact-check: fragmented-time-does-not-fit

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B4, PR #2 head origin/codex/lifehacks-200, read via git show only; contributor review records not read. Re-derived from studyCatalog.ts, studyModels.ts and StudyLesson.tsx (rendered reveal text). Status is a recommendation to apply to meta.json after the merge; nothing here was written to the lesson.

| Claim | Verdict | Note |
|---|---|---|
| c1 | disputed | Hook 'Three gaps total thirty minutes.' does not match the drawn calendar (gaps [0,10] and [20,30] before minute 40, then open space; no third 10-minute gap, none summing to 30). Fix: change the hook in studyCatalog.ts and c1 to 'Before minute 40 the calendar has two separate ten-minute gaps. A thirty-minute task needs one continuous gap.' Optionally change recall distractor 'Any three 10-minute gaps' to 'Any two 10-minute gaps'. |
| c2 | verified | Principle text equals the rendered principle (string match). Fixture re-derived: write 0-30 (movable), call 10-20, meeting 30-40, axis 0-100. Free gaps with the write removed (node): [0,10], [20,30], [40,90]. Target [40,10,30] puts write at 40-70, overlap 0, finish 70. HOOK IS FALSE: 'Three gaps total thirty minutes.' There are two 10-minute gaps before minute 40 (20 minutes) and then an open stretch from 40; there is no third 10-minute gap and the gaps do not total 30. The recall distractor 'Any three 10-minute gaps' is likewise inconsistent with the drawn calendar (advisory). |
| c3 | verified | Reveal sentences are computed from visible state (code read of observation()). Advisory: source wording 'overlap is pairwise intersection length' differs from the code (time during which at least two blocks coincide); identical for this fixture because the fixed rows never overlap each other. Scoped to an exercise; no productivity claim made. |
| c4 | verified | Recall question, correct option and rationale equal the catalogue fixture and meta.recall (string match); answer re-derived (see c2 note). |

Unrecorded learner-visible factual sentences: none beyond the disputed hook (already c1).

Sources: external hosts (learn.microsoft.com, support.google.com, doi.org, psychologicalscience.org, pubmed) are blocked by the proxy (403) in this environment; checked through search snippets only, marked as such above.
