# Fact-check: file-type-then-owner

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B4, PR #2 head origin/codex/lifehacks-200, read via git show only; contributor review records not read. Re-derived from studyCatalog.ts, studyModels.ts and StudyLesson.tsx (rendered reveal text). Status is a recommendation to apply to meta.json after the merge; nothing here was written to the lesson.

| Claim | Verdict | Note |
|---|---|---|
| c1 | disputed | Hook 'Four files match one clue.' is false for the fixture (2 PDFs, 2 Ana files, list.txt matches neither). Fix: change the hook in studyCatalog.ts and the matching text in c1 to 'Four files; two are PDFs and two are Ana's. Which one matches both?' |
| c2 | verified | Principle text equals the rendered principle (string match). Fixture re-derived: 4 files: plan.pdf Ana, map.pdf Bo, note.txt Ana, list.txt Bo. PDF filter: 2; PDF and Ana: 1 (intersection) (node/code). HOOK IS FALSE: 'Four files match one clue.' Only two match the PDF clue and two match the Ana clue; list.txt matches neither. Reveal prints '1 matches' (grammar). Source: Google Drive Help answer 2375114 exists (search); host blocked here, page not read. Snippets confirm filter chips / search options for type, owner and date modified. A Trash/location filter was not found on the official page snippets (only a third-party help page), so source-support for the trash behaviour is unverified (source unreachable); the claim text itself is fixture-bound and hedged. |
| c3 | verified | Reveal sentences are computed from visible state (code read of observation()).  Scoped to an exercise; no productivity claim made. |
| c4 | verified | Recall question, correct option and rationale equal the catalogue fixture and meta.recall (string match); answer re-derived (see c2 note). |

Unrecorded learner-visible factual sentences: none beyond the disputed hook (already c1).

Sources: external hosts (learn.microsoft.com, support.google.com, doi.org, psychologicalscience.org, pubmed) are blocked by the proxy (403) in this environment; checked through search snippets only, marked as such above.
