# Fact-check: link-label-names-the-target

## Pass LH-1 (pre-merge, read-only)

- Date: 2026-10-14. Checker: fact-checker (Ingrid). Not the author of these claims.
- Read: `src/demos/lifehacks/link-label-names-the-target/meta.json`, `Demo.tsx`, the `link-label-names-the-target` fixture in `src/lib/lifehacks/studyCatalog.ts`, `studyModels.ts`, `src/components/lifehacks/StudyLesson.tsx`, all from PR #2 head 71e99fee (read-only via git show). Contributor review records not read.
- Method: ran the PR's own `studyModels.ts` functions under node on the fixture at every step and compared meta claim text with the catalog (hook, question, correct option, principle, recall.why: no mismatches). Re-derived arithmetic independently of the lesson text.
- Web: Google (Gmail, Drive), Microsoft Learn, psychologicalscience.org, PubMed, doi.org all return 403 from this environment (egress policy); only search-result summaries were available.
- Family: message. Verdict: **DISPUTED** (blocks publish until fixed).

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Scenario text equals the catalog hook, question and correct option (checked by script against meta.recall and studyCatalog.ts). Note: hook says "Three click here links" but the stage builds one label from three fields; stipulated scenario, not false. Stipulated exercise data; no external fact asserted. |
| c2 | disputed | Principle says the label "states artifact, version and scope" but the stage fields are Artifact / Version / Section (fields: ["Artifact","Version","Section"]). Fix: change "scope" to "section" in the principle (studyCatalog.ts, c2 and c4 text, recall.why). |
| c3 | verified | Reveal text (observation() in StudyLesson.tsx) recomputed with studyModels.ts for each step; values match.  |
| c4 | disputed | Same sentence as c2 (rationale repeats the principle): "artifact, version and scope" -> "artifact, version and section". |

Claim texts are as in meta.json (c1 scenario/hook/prediction, c2 principle, c3 reveal readouts, c4 recall answer and rationale). Verdicts to be applied to meta.json after the merge (`company/reviews/lifehacks-200/fact-check-B5.json`).
