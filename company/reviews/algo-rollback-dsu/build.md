# Undo a merge without flattening: builder B3 note

2026-10-16 · demo-builder · draft, claims unverified

Objective: Restore a previous disjoint-set state using a stack of changed parent and size fields.

Model: src/lib/algorithms/topics/disjoint-offline-connectivity.ts#rollback_dsu. First input: Vertices A,B,C,D; merge A-B, snapshot, merge B-C, rollback.

| Run | Computed retained proof | Trace frames |
| --- | --- | --- |
| Question | A↔C no; parents 0,0,2,3 | 4 |
| Changed input | A↔C yes; parents 0,0,0,3 | 4 |

Pre-flight: both cases execute bounded pure algorithms; the question run supplies the persistent witness. Prediction, transfer recall and both cases' visible factual text are recorded in the unverified claim ledger. Run example, Step, Try another and Reset use the shared approved renderer contract. Source leads remain unacquired.

Validation: retained finite-fixture checker company/domains/briefs/checks/algorithms-200-2.mjs covers all 50 B3 lessons and 100 runs with 432 assertions; it uses graph/subset enumeration, direct fixture calculations, standard-library string checks and explicit certificates. Root algorithms validator passed this filtered 50-lesson batch with zero errors and zero claim/overlap warnings.

Pending: integrated registry/curriculum generation, TypeScript/build/browser verification and independent fact/design/learner/QA gates. The isolated worktree's normal check reports missing new curriculum concepts and stale generated registry/loaders; chief of staff owns those integration changes. These arithmetic and structural checks are not independent review or publishing evidence.
