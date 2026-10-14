# Fact-check: cover-before-recall

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Batch B4, PR #2 head origin/codex/lifehacks-200, read via git show only; contributor review records not read. Re-derived from studyCatalog.ts, studyModels.ts and StudyLesson.tsx (rendered reveal text). Status is a recommendation to apply to meta.json after the merge; nothing here was written to the lesson.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question and correct option in the claim equal the catalogue fixture text (checked by string comparison). Stipulated exercise data. |
| c2 | verified | Principle text equals the rendered principle (string match). Fixture re-derived: Pairs bell-lake, kite-plum, leaf-door; cover hides targets; check counts matching positions. Matches code. Source: Roediger & Karpicke 2006 (Psychological Science 17(3):249-255, doi 10.1111/j.1467-9280.2006.01693.x): citation, volume, pages and the 'delayed retention advantage for testing over restudy on prose passages' finding confirmed from the PubMed and APS listing via web search (the hosts themselves, doi.org / psychologicalscience.org / pubmed, return proxy 403 here, so the page was not read directly). The cited paper supports the retrieval-practice context only; the fixture rule itself is a convention. |
| c3 | verified | Reveal sentences are computed from visible state (code read of observation()).  Scoped to an exercise; no productivity claim made. |
| c4 | verified | Recall question, correct option and rationale equal the catalogue fixture and meta.recall (string match); answer re-derived (see c2 note). |

Unrecorded learner-visible factual sentences: none found. Title, hook, question, options, principle and boundary are all inside c1-c4; dynamic reveal sentences are covered by c3.

Sources: external hosts (learn.microsoft.com, support.google.com, doi.org, psychologicalscience.org, pubmed) are blocked by the proxy (403) in this environment; checked through search snippets only, marked as such above.
