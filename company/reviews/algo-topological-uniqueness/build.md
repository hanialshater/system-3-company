# Was the next task forced?: builder B3 note

2026-10-16 · demo-builder · draft, claims unverified

Objective: Test uniqueness of a topological order by checking whether exactly one zero-indegree vertex is available at each step.

Model: src/lib/algorithms/topics/graph-traversal-decomposition.ts#topological_uniqueness. First input: DAG A-B,A-C,B-D,C-D; compare add B-C.

| Run | Computed retained proof | Trace frames |
| --- | --- | --- |
| Question | Unique no; chosen ABCD | 5 |
| Changed input | Unique yes; chosen ABCD | 5 |

Pre-flight: both cases execute bounded pure algorithms; the question run supplies the persistent witness. Prediction, transfer recall and both cases' visible factual text are recorded in the unverified claim ledger. Run example, Step, Try another and Reset use the shared approved renderer contract. Source leads remain unacquired.

Validation: retained finite-fixture checker company/domains/briefs/checks/algorithms-200-2.mjs covers all 50 B3 lessons and 100 runs with 432 assertions; it uses graph/subset enumeration, direct fixture calculations, standard-library string checks and explicit certificates. Root algorithms validator passed this filtered 50-lesson batch with zero errors and zero claim/overlap warnings.

Pending: integrated registry/curriculum generation, TypeScript/build/browser verification and independent fact/design/learner/QA gates. The isolated worktree's normal check reports missing new curriculum concepts and stale generated registry/loaders; chief of staff owns those integration changes. These arithmetic and structural checks are not independent review or publishing evidence.

## 2026-10-16 · PR #6 fix (demo-builder, pr6/build)

W-1572: both graphs ended on ready D, indegree 0000. Each Kahn frame now carries a 'unique so far' metric (no once any ready set has more than one vertex). Final frame: no for the question DAG and yes for the DAG with added B-C. Answer (No) unchanged. New claims c25 'unique so far', c26 'yes', c27 'no'.

Verification (builder, not QA evidence): node --test tests/algorithms 12/12; tests/platform 29/30 with only #18 (evidence tripwire, qa-tester) failing; npm run check and typecheck pass; tools/algorithms-200-check.mjs 0 errors 0 warnings; retained checkers 1-4 pass; fixture-sync rewritten with --write (modelSha256 for every row of the changed topic modules, plus this lesson's countercase fields where they changed). next build --webpack with own dist dir; QA contract (QA_ONLY = 5 W-1572/M3 slugs) 10/10 contract tests passed on phone and desktop; the 4 feed.spec failures are QA_ONLY artifacts (draft-only pool). A browser probe of Run example then Try another confirmed the stage's visible text differs on the final frame for all five; a model scan found no other algorithm lesson (of 200) whose two final frames are visibly identical apart from the step counter. Status stays draft; all claims stay unverified.
