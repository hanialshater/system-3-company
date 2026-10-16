# Build: bk-swan-unseen-regime-change

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/science-history.json`, family `payoff`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Omit tail" [99,1,0] → 0.99 points; "Include tail" [99,1,-200] → -1.01 points. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "The missing tail in the average" / "What happens when a rare loss enters a model that previously omitted it?". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "−1.01 points"; 2: "+0.99 points"; 3: "−2.00 points". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral payoff diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 0.99 and -1.01; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Omit tail", "Include tail", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "The Black Swan Nassim Nicholas Taleb 2007 Rare events can dominate conclusions built on ordinary observations. Omitting the tail gives 0.99; including it gives -1.01. Its 1% probability stays fixed, but its weighted loss outweighs the common gain. Does it hold up? This mean follows arithmetic. It does not estimate unseen-event probabilities or verify a forecast.". Reset-last browser run pending.
7. Phone fit: reveal body 56 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["−1.01 points","+0.99 points","−2.00 points"]; after ["-1.01 points","0.99 points","-2 points"]. Answer index 0 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
