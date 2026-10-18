# algo-kll-compaction: build v1

Builder: demo-builder · B5 · 2026-10-16. Draft, claims unverified.

Pure model: `src/lib/algorithms/topics/randomized-streaming.ts#kll_compaction`.

Fixture: Level values [1,2,3,4,5,6,7,8], parity even versus odd.

Computed question result: "1,3,5,7". Comparison results: "2,4,6,8".

Retained witness: Kept 1,3,5,7; mass 8.

Verification: `company/domains/briefs/checks/algorithms-200-4.mjs` and `algorithms-200-4-results.json` retain the finite fixture checks. Pure TypeScript and model contract checks pass. These are builder checks, not independent fact checking, learner evidence or browser QA. No network or random runtime draws. Supplied hash/draw/parity examples are disclosed in their prediction/reveal.

## Pre-flight v1

1. Title/hook: “Half the cards get double weight” / “Keeping half the items changes how much each survivor represents.”. Source inspection: input tension; no computed answer is named.
2. Options: "1,3,5,7"; "2,4,6,8"; "1,2,3,4"; "5,6,7,8". All are answer choices of the same kind for this prediction.
3. Locked frame: input only, caption “Level input”; no completed witness. All four controls receive the kit lock. Browser confirmation pending.
4. Reveal values: the first paragraph is the computed and captured question proof, “Kept 1,3,5,7; mass 8.”; the second explains the mechanism. The shared renderer retains this Seen witness after case changes and Reset.
5. QA path: source inspection confirms Run example completes case 0 synchronously before Step/another/Reset; the question witness is the milestone. Browser execution remains pending at integration.
6. Reset: the shared state retains the captured question witness; reveal source reads that immutable run. No browser Reset transcript is claimed.
7. Phone fit: maximum computed stage budget 15/25 words including controls and Seen proof; question reveal 42/90 words. Traces have 3/3 frames, each bounded by 8 rows, 12 columns and 64 cells. 390×844 screenshot/crop and independent visual review remain pending.

Next: independent fact/design/learner/QA roles inspect artifact before this note. Do not mark published or call these checks quality approval.

Integration check: the isolated builder worktree’s `npm run check` reports 50 missing new curriculum concepts plus stale generated registries, owned by the existing coverage/integration lanes. The focused 50-spec checker reports zero errors and zero claim coverage warnings; full `verify` and browser QA belong to integration.
