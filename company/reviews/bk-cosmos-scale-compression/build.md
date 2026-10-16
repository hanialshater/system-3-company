# Build: bk-cosmos-scale-compression

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/science-history.json`, family `compound`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Six scale steps" [1,900,6,0] → 1,000,000 units; "Seven scale steps" [1,900,7,0] → 10,000,000 units. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "Keep track of the powers of ten" / "One more tenfold scale step multiplies the whole accumulated quantity.". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "6 units"; 2: "100000 units"; 3: "1000000 units". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral compound diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 1,000,000 and 10,000,000; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Six scale steps", "Seven scale steps", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Cosmos Carl Sagan 1980 Astronomical scales require reasoning across many orders of magnitude. Six steps give 1,000,000; seven give 10,000,000. The additional step multiplies the accumulated scale by ten rather than adding ten. Does it hold up? These are dimensionless scale factors, not dated cosmic events, an age estimate or the book’s calendar diagram.". Reset-last browser run pending.
7. Phone fit: reveal body 54 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["6 units","100000 units","1000000 units"]; after ["6 units","100,000 units","1,000,000 units"]. Answer index 2 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
