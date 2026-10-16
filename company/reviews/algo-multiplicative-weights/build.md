# algo-multiplicative-weights: build v1

Builder: demo-builder · B5 · 2026-10-16. Draft, claims unverified.

Pure model: `src/lib/algorithms/topics/approximation-online.ts#multiplicative_weights`.

Fixture: Expert loss rounds [[0,1],[1,0],[0,1],[0,1]], eta0.5; compare eta1.

Computed question result: 2.718. Comparison results: 7.389.

Retained witness: Weight ratio 2.718; loss 2; best 1.

Verification: `company/domains/briefs/checks/algorithms-200-4.mjs` and `algorithms-200-4-results.json` retain the finite fixture checks. Pure TypeScript and model contract checks pass. These are builder checks, not independent fact checking, learner evidence or browser QA. No network or random runtime draws. Supplied hash/draw/parity examples are disclosed in their prediction/reveal.

## Pre-flight v1

1. Title/hook: “Bad advice loses weight gradually” / “The experts’ influence changes after each observed mistake.”. Source inspection: input tension; no computed answer is named.
2. Options: "1.000"; "1.649"; "2.718"; "7.389". All are answer choices of the same kind for this prediction.
3. Locked frame: input only, caption “Expert losses input”; no completed witness. All four controls receive the kit lock. Browser confirmation pending.
4. Reveal values: the first paragraph is the computed and captured question proof, “Weight ratio 2.718; loss 2; best 1.”; the second explains the mechanism. The shared renderer retains this Seen witness after case changes and Reset.
5. QA path: source inspection confirms Run example completes case 0 synchronously before Step/another/Reset; the question witness is the milestone. Browser execution remains pending at integration.
6. Reset: the shared state retains the captured question witness; reveal source reads that immutable run. No browser Reset transcript is claimed.
7. Phone fit: maximum computed stage budget 18/25 words including controls and Seen proof; question reveal 45/90 words. Traces have 6/6 frames, each bounded by 8 rows, 12 columns and 64 cells. 390×844 screenshot/crop and independent visual review remain pending.

Next: independent fact/design/learner/QA roles inspect artifact before this note. Do not mark published or call these checks quality approval.

Integration check: the isolated builder worktree’s `npm run check` reports 50 missing new curriculum concepts plus stale generated registries, owned by the existing coverage/integration lanes. The focused 50-spec checker reports zero errors and zero claim coverage warnings; full `verify` and browser QA belong to integration.

## 2026-10-16 · PR #6 fix (demo-builder, pr6/build)

W-1569: claim c12 'learner' (a stage row label) tripped the W-947 internal-string guard. The row label is now 'mixed loss', matching the mechanism's 'displayed cumulative mixed loss'; c12 text updated to match. Model change: approximation-online.ts weights() row labels only; numbers unchanged.

Verification (builder, not QA evidence): node --test tests/algorithms 12/12; tests/platform 29/30 with only #18 (evidence tripwire, qa-tester) failing; npm run check and typecheck pass; tools/algorithms-200-check.mjs 0 errors 0 warnings; retained checkers 1-4 pass; fixture-sync rewritten with --write (modelSha256 for every row of the changed topic modules, plus this lesson's countercase fields where they changed). next build --webpack with own dist dir; QA contract (QA_ONLY = 5 W-1572/M3 slugs) 10/10 contract tests passed on phone and desktop; the 4 feed.spec failures are QA_ONLY artifacts (draft-only pool). A browser probe of Run example then Try another confirmed the stage's visible text differs on the final frame for all five; a model scan found no other algorithm lesson (of 200) whose two final frames are visibly identical apart from the step counter. Status stays draft; all claims stay unverified.
