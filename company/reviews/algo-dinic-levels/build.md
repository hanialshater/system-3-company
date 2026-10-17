# Only forward layers carry this phase: builder B3 note

2026-10-16 · demo-builder · draft, claims unverified

Objective: Build a residual level graph and send blocking flow using edges advancing one level.

Model: src/lib/algorithms/topics/spanning-matching-flow.ts#dinic_levels. First input: Capacities S-A:2,S-B:1,A-B:1,A-T:1,B-T:2.

| Run | Computed retained proof | Trace frames |
| --- | --- | --- |
| Question | Maximum flow 3; sink unreachable | 7 |
| Changed input | Maximum flow 4; sink unreachable | 7 |

Pre-flight: both cases execute bounded pure algorithms; the question run supplies the persistent witness. Prediction, transfer recall and both cases' visible factual text are recorded in the unverified claim ledger. Run example, Step, Try another and Reset use the shared approved renderer contract. Source leads remain unacquired.

Validation: retained finite-fixture checker company/domains/briefs/checks/algorithms-200-2.mjs covers all 50 B3 lessons and 100 runs with 432 assertions; it uses graph/subset enumeration, direct fixture calculations, standard-library string checks and explicit certificates. Root algorithms validator passed this filtered 50-lesson batch with zero errors and zero claim/overlap warnings.

Pending: integrated registry/curriculum generation, TypeScript/build/browser verification and independent fact/design/learner/QA gates. The isolated worktree's normal check reports missing new curriculum concepts and stale generated registry/loaders; chief of staff owns those integration changes. These arithmetic and structural checks are not independent review or publishing evidence.

## 2026-10-16 · PR #6 fix (demo-builder, pr6/build)

W-1636: Try another ended on the same visible frame (levels 0,-1,-1,-1). The residual-BFS frames now carry the running flow metric, so the final frame reads flow 3 for the question case and flow 4 for the changed capacities (SB=2, BT=3): blocking phases stop at a different value when the cut grows. Model change: spanning-matching-flow.ts dinic(); answer (3) unchanged. Claims: c17 ('flow') unchanged in text; the new metric values are digits only (no new claims).

Verification (builder, not QA evidence): node --test tests/algorithms 12/12; tests/platform 29/30 with only #18 (evidence tripwire, qa-tester) failing; npm run check and typecheck pass; tools/algorithms-200-check.mjs 0 errors 0 warnings; retained checkers 1-4 pass; fixture-sync rewritten with --write (modelSha256 for every row of the changed topic modules, plus this lesson's countercase fields where they changed). next build --webpack with own dist dir; QA contract (QA_ONLY = 5 W-1636/M3 slugs) 10/10 contract tests passed on phone and desktop; the 4 feed.spec failures are QA_ONLY artifacts (draft-only pool). A browser probe of Run example then Try another confirmed the stage's visible text differs on the final frame for all five; a model scan found no other algorithm lesson (of 200) whose two final frames are visibly identical apart from the step counter. Status stays draft; all claims stay unverified.
