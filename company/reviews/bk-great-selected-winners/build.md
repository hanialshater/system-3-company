# Build: bk-great-selected-winners

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/business.json`, family `selection`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Selected winners" [10,100,0,0] → 100 %; "Full toy sample" [10,100,90,0] → 10 %. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "Who entered the comparison?" / "A toy company sample starts with winners. What changes when the omitted firms return?". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "10.00"; 2: "100.00"; 3: "90.00"; 4: "50.00". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral selection diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 100 and 10; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Selected winners", "Full toy sample", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Good to Great Jim Collins 2001 Good to Great searches for distinguishing patterns in selected companies with unusually strong prior performance. A reports 100%; B reports 10%. Adding 90 omitted non-winners changes the denominator from 10 to 100 without changing any firm’s result. These are invented groups; neither a causal explanation nor a replication of the book is supplied. Does it hold up? The arithmetic follows our assumptions; real-world applicability and book attribution remain unverified.". Reset-last browser run pending.
7. Phone fit: reveal body 75 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["10.00","100.00","90.00","50.00"]; after ["10","100","90","50"]. Answer index 0 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- meta.json: the .toy claim's "Prediction correct option" token updated to match; claim stays unverified.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
