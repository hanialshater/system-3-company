# The star can take nothing: builder B3 note

2026-10-16 · demo-builder · draft, claims unverified

Objective: Match a full string against dot-and-star patterns using zero-copy and repeat transitions.

Model: src/lib/algorithms/topics/sequence-dynamic-programming.ts#regex_star_dp. First input: Text aab, pattern c*a*b; contrast text ab, pattern .*c.

| Run | Computed retained proof | Trace frames |
| --- | --- | --- |
| Question | Full regex match yes | 17 |
| Changed input | Full regex match no | 8 |

Pre-flight: both cases execute bounded pure algorithms; the question run supplies the persistent witness. Prediction, transfer recall and both cases' visible factual text are recorded in the unverified claim ledger. Run example, Step, Try another and Reset use the shared approved renderer contract. Source leads remain unacquired.

Validation: retained finite-fixture checker company/domains/briefs/checks/algorithms-200-2.mjs covers all 50 B3 lessons and 100 runs with 432 assertions; it uses graph/subset enumeration, direct fixture calculations, standard-library string checks and explicit certificates. Root algorithms validator passed this filtered 50-lesson batch with zero errors and zero claim/overlap warnings.

Pending: integrated registry/curriculum generation, TypeScript/build/browser verification and independent fact/design/learner/QA gates. The isolated worktree's normal check reports missing new curriculum concepts and stale generated registry/loaders; chief of staff owns those integration changes. These arithmetic and structural checks are not independent review or publishing evidence.
