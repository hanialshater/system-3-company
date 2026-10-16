# Build: bk-chaos-nearby-trajectories

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/science-history.json`, family `compound`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Double error" [0.01,100,5,0] → 0.32 units; "Triple error" [0.01,200,5,0] → 2.43 units. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "An uncertainty can grow each step" / "Compare multipliers acting on the same tiny initial uncertainty.". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "0.05 units"; 2: "0.32 units"; 3: "0.50 units". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral compound diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 0.32 and 2.43; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Double error", "Triple error", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Chaos James Gleick 1987 Sensitivity to initial conditions can limit long-range prediction. Doubling gives 0.32; tripling gives 2.43. Repeated amplification makes the multiplier increasingly important despite the same tiny starting uncertainty. Does it hold up? This error recurrence is not a chaotic system. It proves neither chaos nor the accuracy of a weather forecast.". Reset-last browser run pending.
7. Phone fit: reveal body 54 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["0.05 units","0.32 units","0.50 units"]; after ["0.05 units","0.32 units","0.5 units"]. Answer index 1 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
