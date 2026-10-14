# Fact-check: search-the-document-body

## Pass LH-1 (pre-merge, read-only)

- Date: 2026-10-14. Checker: fact-checker (Ingrid). Not the author of these claims.
- Read: `src/demos/lifehacks/search-the-document-body/meta.json`, `Demo.tsx`, the `search-the-document-body` fixture in `src/lib/lifehacks/studyCatalog.ts`, `studyModels.ts`, `src/components/lifehacks/StudyLesson.tsx`, all from PR #2 head 71e99fee (read-only via git show). Contributor review records not read.
- Method: ran the PR's own `studyModels.ts` functions under node on the fixture at every step and compared meta claim text with the catalog (hook, question, correct option, principle, recall.why: no mismatches). Re-derived arithmetic independently of the lesson text.
- Web: Google (Gmail, Drive), Microsoft Learn, psychologicalscience.org, PubMed, doi.org all return 403 from this environment (egress policy); only search-result summaries were available.
- Family: files. Verdict: verified except source-unreachable claims.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Scenario text equals the catalog hook, question and correct option (checked by script against meta.recall and studyCatalog.ts). Stipulated exercise data; no external fact asserted. |
| c2 | unverified | Fixture re-derived correctly (Re-run: title-only search for "telescope" -> 0; body search -> "untitled" (body "telescope notes") = 1. Correct.). The cited Google Drive Help page is unreachable here (403). A search summary of the official page says Drive searches the titles and content of files you can access, which matches. Unverified (source unreachable); low risk. |
| c3 | verified | Reveal text (observation() in StudyLesson.tsx) recomputed with studyModels.ts for each step; values match.  |
| c4 | unverified | Fixture re-derived correctly (Re-run: title-only search for "telescope" -> 0; body search -> "untitled" (body "telescope notes") = 1. Correct.). The cited Google Drive Help page is unreachable here (403). A search summary of the official page says Drive searches the titles and content of files you can access, which matches. Unverified (source unreachable); low risk. |

Claim texts are as in meta.json (c1 scenario/hook/prediction, c2 principle, c3 reveal readouts, c4 recall answer and rationale). Verdicts to be applied to meta.json after the merge (`company/reviews/lifehacks-200/fact-check-B5.json`).
