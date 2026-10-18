# A route that keeps getting cheaper: builder B3 note

2026-10-16 · demo-builder · draft, claims unverified

Objective: Use an extra Bellman-Ford relaxation pass and predecessor chasing to extract a reachable negative cycle.

Model: src/lib/algorithms/topics/path-algorithms-witnesses.ts#negative_cycle_witness. First input: Arcs S-A:1,A-B:-2,B-C:-2,C-A:1; compare C-A:5.

| Run | Computed retained proof | Trace frames |
| --- | --- | --- |
| Question | Cycle CABC; weight -3 | 15 |
| Changed input | Reachable negative cycle none | 5 |

Pre-flight: both cases execute bounded pure algorithms; the question run supplies the persistent witness. Prediction, transfer recall and both cases' visible factual text are recorded in the unverified claim ledger. Run example, Step, Try another and Reset use the shared approved renderer contract. Source leads remain unacquired.

Validation: retained finite-fixture checker company/domains/briefs/checks/algorithms-200-2.mjs covers all 50 B3 lessons and 100 runs with 432 assertions; it uses graph/subset enumeration, direct fixture calculations, standard-library string checks and explicit certificates. Root algorithms validator passed this filtered 50-lesson batch with zero errors and zero claim/overlap warnings.

Pending: integrated registry/curriculum generation, TypeScript/build/browser verification and independent fact/design/learner/QA gates. The isolated worktree's normal check reports missing new curriculum concepts and stale generated registry/loaders; chief of staff owns those integration changes. These arithmetic and structural checks are not independent review or publishing evidence.
