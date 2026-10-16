# algo-exact-cover: build v1

Builder: demo-builder · B5 · 2026-10-16. Draft, claims unverified.

Pure model: `src/lib/algorithms/topics/combinatorial-game-search.ts#exact_cover`.

Fixture: Columns A,B,C,D; rows AB,BC,CD,AD,AC,BD.

Computed question result: "AB+CD". Comparison results: "BC+AD".

Retained witness: Cover AB+CD.

Verification: `company/domains/briefs/checks/algorithms-200-4.mjs` and `algorithms-200-4-results.json` retain the finite fixture checks. Pure TypeScript and model contract checks pass. These are builder checks, not independent fact checking, learner evidence or browser QA. No network or random runtime draws. Supplied hash/draw/parity examples are disclosed in their prediction/reveal.

## Pre-flight v1

1. Title/hook: “Each column must be covered once” / “Covering one column may invalidate rows through other columns too.”. Source inspection: input tension; no computed answer is named.
2. Options: "AB+CD"; "AB+BC"; "AC+CD"; "AB+AD". All are answer choices of the same kind for this prediction.
3. Locked frame: input only, caption “Exact-cover rows”; no completed witness. All four controls receive the kit lock. Browser confirmation pending.
4. Reveal values: the first paragraph is the computed and captured question proof, “Cover AB+CD.”; the second explains the mechanism. The shared renderer retains this Seen witness after case changes and Reset.
5. QA path: source inspection confirms Run example completes case 0 synchronously before Step/another/Reset; the question witness is the milestone. Browser execution remains pending at integration.
6. Reset: the shared state retains the captured question witness; reveal source reads that immutable run. No browser Reset transcript is claimed.
7. Phone fit: maximum computed stage budget 18/25 words including controls and Seen proof; question reveal 40/90 words. Traces have 4/4 frames, each bounded by 8 rows, 12 columns and 64 cells. 390×844 screenshot/crop and independent visual review remain pending.

Next: independent fact/design/learner/QA roles inspect artifact before this note. Do not mark published or call these checks quality approval.

Integration check: the isolated builder worktree’s `npm run check` reports 50 missing new curriculum concepts plus stale generated registries, owned by the existing coverage/integration lanes. The focused 50-spec checker reports zero errors and zero claim coverage warnings; full `verify` and browser QA belong to integration.
