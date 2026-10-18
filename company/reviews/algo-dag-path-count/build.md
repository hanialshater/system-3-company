# One count per incoming route: builder B3 note

2026-10-16 · demo-builder · draft, claims unverified

Objective: Count directed acyclic graph paths by propagating counts in topological order.

Model: src/lib/algorithms/topics/graph-traversal-decomposition.ts#dag_path_count. First input: DAG A-B,A-C,B-D,C-D,B-C; compare remove B-C.

| Run | Computed retained proof | Trace frames |
| --- | --- | --- |
| Question | A→D paths 3; counts 1,1,2,3 | 6 |
| Changed input | A→D paths 2; counts 1,1,1,2 | 5 |

Pre-flight: both cases execute bounded pure algorithms; the question run supplies the persistent witness. Prediction, transfer recall and both cases' visible factual text are recorded in the unverified claim ledger. Run example, Step, Try another and Reset use the shared approved renderer contract. Source leads remain unacquired.

Validation: retained finite-fixture checker company/domains/briefs/checks/algorithms-200-2.mjs covers all 50 B3 lessons and 100 runs with 432 assertions; it uses graph/subset enumeration, direct fixture calculations, standard-library string checks and explicit certificates. Root algorithms validator passed this filtered 50-lesson batch with zero errors and zero claim/overlap warnings.

Pending: integrated registry/curriculum generation, TypeScript/build/browser verification and independent fact/design/learner/QA gates. The isolated worktree's normal check reports missing new curriculum concepts and stale generated registry/loaders; chief of staff owns those integration changes. These arithmetic and structural checks are not independent review or publishing evidence.
