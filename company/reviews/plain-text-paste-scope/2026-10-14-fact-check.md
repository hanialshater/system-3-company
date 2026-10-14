# Fact-check: plain-text-paste-scope

## Pass LH-1 (pre-merge, read-only)

- Date: 2026-10-14. Checker: fact-checker (Ingrid). Not the author of these claims.
- Read: `src/demos/lifehacks/plain-text-paste-scope/meta.json`, `Demo.tsx`, the `plain-text-paste-scope` fixture in `src/lib/lifehacks/studyCatalog.ts`, `studyModels.ts`, `src/components/lifehacks/StudyLesson.tsx`, all from PR #2 head 71e99fee (read-only via git show). Contributor review records not read.
- Method: ran the PR's own `studyModels.ts` functions under node on the fixture at every step and compared meta claim text with the catalog (hook, question, correct option, principle, recall.why: no mismatches). Re-derived arithmetic independently of the lesson text.
- Web: Google (Gmail, Drive), Microsoft Learn, psychologicalscience.org, PubMed, doi.org all return 403 from this environment (egress policy); only search-result summaries were available.
- Family: edit. Verdict: verified except source-unreachable claims.

| Claim | Status | Note |
|---|---|---|
| c1 | verified | Scenario text equals the catalog hook, question and correct option (checked by script against meta.recall and studyCatalog.ts). Stipulated exercise data; no external fact asserted. |
| c2 | unverified | Re-run: [Title] -> styled paste [BOLD, Title] -> plain paste [plain, Title]. Matches the principle text. The text also says app behaviour "varies between applications" (real paste options). The cited Microsoft Learn page (WinUI keyboard accelerators) is unreachable here (403) and, as described in search results, covers accelerator scope, not paste or selection semantics. General statement is plausible but not sourced. Unverified (source unreachable / source does not support). |
| c3 | verified | Reveal text (observation() in StudyLesson.tsx) recomputed with studyModels.ts for each step; values match.  |
| c4 | unverified | Re-run: [Title] -> styled paste [BOLD, Title] -> plain paste [plain, Title]. Matches the principle text. The text also says app behaviour "varies between applications" (real paste options). The cited Microsoft Learn page (WinUI keyboard accelerators) is unreachable here (403) and, as described in search results, covers accelerator scope, not paste or selection semantics. General statement is plausible but not sourced. Unverified (source unreachable / source does not support). |

Claim texts are as in meta.json (c1 scenario/hook/prediction, c2 principle, c3 reveal readouts, c4 recall answer and rationale). Verdicts to be applied to meta.json after the merge (`company/reviews/lifehacks-200/fact-check-B5.json`).
