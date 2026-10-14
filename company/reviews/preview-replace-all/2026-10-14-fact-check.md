# Fact-check: preview-replace-all

## Pass LH-1 (pre-merge, read-only)

- Date: 2026-10-14. Checker: fact-checker (Ingrid). Not the author of these claims.
- Read: `src/demos/lifehacks/preview-replace-all/meta.json`, `Demo.tsx`, the `preview-replace-all` fixture in `src/lib/lifehacks/studyCatalog.ts`, `studyModels.ts`, `src/components/lifehacks/StudyLesson.tsx`, all from PR #2 head 71e99fee (read-only via git show). Contributor review records not read.
- Method: ran the PR's own `studyModels.ts` functions under node on the fixture at every step and compared meta claim text with the catalog (hook, question, correct option, principle, recall.why: no mismatches). Re-derived arithmetic independently of the lesson text.
- Web: Google (Gmail, Drive), Microsoft Learn, psychologicalscience.org, PubMed, doi.org all return 403 from this environment (egress policy); only search-result summaries were available.
- Family: edit. Verdict: **DISPUTED** (blocks publish until fixed).

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Scenario text equals the catalog hook, question and correct option (checked by script against meta.recall and studyCatalog.ts). Stipulated exercise data; no external fact asserted. |
| c2 | verified | Re-run: [red, blue, red] -> apply -> [green, blue, green]; preview step highlights BOTH red tokens in the diagram (StudyLesson.tsx line 227) but the reveal sentence names only position 1 (see dispute). Definitional fixture claim; the cited Microsoft Learn page (unreachable, 403) is context only and does not support it. Suggest dropping the citation. |
| c3 | disputed | The reveal sentence for the preview step reads "The highlighted position is 1; finding did not rewrite the tokens." (observation() in StudyLesson.tsx, edit branch). The diagram highlights BOTH "red" tokens (positions 1 and 3), the principle says the preview "marks every exact match", and the step is a preview, not a find. Fix (builder): for slug preview-replace-all at step 1 build the sentence from the tokens, e.g. "The preview marks 2 exact matches, at positions 1 and 3; previewing did not rewrite the tokens." |
| c4 | verified | Re-run: [red, blue, red] -> apply -> [green, blue, green]; preview step highlights BOTH red tokens in the diagram (StudyLesson.tsx line 227) but the reveal sentence names only position 1 (see dispute). Definitional fixture claim; the cited Microsoft Learn page (unreachable, 403) is context only and does not support it. Suggest dropping the citation. |

Claim texts are as in meta.json (c1 scenario/hook/prediction, c2 principle, c3 reveal readouts, c4 recall answer and rationale). Verdicts to be applied to meta.json after the merge (`company/reviews/lifehacks-200/fact-check-B5.json`).

### Unrecorded learner-visible sentences
- The edit-family reveal sentence "The highlighted position is N; finding did not rewrite the tokens." is generated text covered only by the catch-all c3; for this lesson it is wrong (see c3 dispute). Suggest recording the dynamic readouts per family in c3.
