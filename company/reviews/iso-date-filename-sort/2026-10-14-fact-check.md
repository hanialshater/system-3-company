# Fact-check: iso-date-filename-sort

## Pass LH-1 (pre-merge, read-only)

- Date: 2026-10-14. Checker: fact-checker (Ingrid). Not the author of these claims.
- Read: `src/demos/lifehacks/iso-date-filename-sort/meta.json`, `Demo.tsx`, the `iso-date-filename-sort` fixture in `src/lib/lifehacks/studyCatalog.ts`, `studyModels.ts`, `src/components/lifehacks/StudyLesson.tsx`, all from PR #2 head 71e99fee (read-only via git show). Contributor review records not read.
- Method: ran the PR's own `studyModels.ts` functions under node on the fixture at every step and compared meta claim text with the catalog (hook, question, correct option, principle, recall.why: no mismatches). Re-derived arithmetic independently of the lesson text.
- Web: Google (Gmail, Drive), Microsoft Learn, psychologicalscience.org, PubMed, doi.org all return 403 from this environment (egress policy); only search-result summaries were available.
- Family: files. Verdict: all verified.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Scenario text equals the catalog hook, question and correct option (checked by script against meta.recall and studyCatalog.ts). Stipulated exercise data; no external fact asserted. |
| c2 | verified | Re-run: day-first text sort gives 01-12-2025, 02-11-2026, 15-01-2026 = 2025-12-01, 2026-11-02, 2026-01-15 (not chronological: Nov 2026 before Jan 2026). Year-first sort gives 2025-12-01, 2026-01-15, 2026-11-02 (chronological). Correct. The cited Google Drive Help page is unreachable (403) and, from its known scope (searching Drive), does not bear on this claim; the claim rests on the derivation. Suggest dropping the irrelevant citation. |
| c3 | verified | Reveal text (observation() in StudyLesson.tsx) recomputed with studyModels.ts for each step; values match.  |
| c4 | verified | Re-run: day-first text sort gives 01-12-2025, 02-11-2026, 15-01-2026 = 2025-12-01, 2026-11-02, 2026-01-15 (not chronological: Nov 2026 before Jan 2026). Year-first sort gives 2025-12-01, 2026-01-15, 2026-11-02 (chronological). Correct. The cited Google Drive Help page is unreachable (403) and, from its known scope (searching Drive), does not bear on this claim; the claim rests on the derivation. Suggest dropping the irrelevant citation. |

Claim texts are as in meta.json (c1 scenario/hook/prediction, c2 principle, c3 reveal readouts, c4 recall answer and rationale). Verdicts to be applied to meta.json after the merge (`company/reviews/lifehacks-200/fact-check-B5.json`).
