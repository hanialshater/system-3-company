# Acyclic roads permit negative costs: builder B3 note

2026-10-16 · demo-builder · draft, claims unverified

Objective: Relax a DAG in topological order to solve shortest paths with negative edges in one pass.

Model: src/lib/algorithms/topics/path-algorithms-witnesses.ts#dag_negative_path. First input: DAG S-A:4,S-B:2,A-B:-3,B-T:2,A-T:5.

| Run | Computed retained proof | Trace frames |
| --- | --- | --- |
| Question | S→T 3; topological distances 0,4,1,3 | 6 |
| Changed input | S→T 4; topological distances 0,4,2,4 | 6 |

Pre-flight: both cases execute bounded pure algorithms; the question run supplies the persistent witness. Prediction, transfer recall and both cases' visible factual text are recorded in the unverified claim ledger. Run example, Step, Try another and Reset use the shared approved renderer contract. Source leads remain unacquired.

Validation: retained finite-fixture checker company/domains/briefs/checks/algorithms-200-2.mjs covers all 50 B3 lessons and 100 runs with 432 assertions; it uses graph/subset enumeration, direct fixture calculations, standard-library string checks and explicit certificates. Root algorithms validator passed this filtered 50-lesson batch with zero errors and zero claim/overlap warnings.

Pending: integrated registry/curriculum generation, TypeScript/build/browser verification and independent fact/design/learner/QA gates. The isolated worktree's normal check reports missing new curriculum concepts and stale generated registry/loaders; chief of staff owns those integration changes. These arithmetic and structural checks are not independent review or publishing evidence.
