# Build: bk-porter-same-budget-opportunity

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/business.json`, family `payoff`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Keep alternative" [100,0,0] → 0 extra credits; "Switch project" [30,25,-15] → -3 extra credits. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "What the other option earns" / "A toy project looks profitable. What if the same budget has a valuable alternative?". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "12.00"; 2: "15.00"; 3: "25.00"; 4: "-3.00". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral payoff diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 0 and -3; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Keep alternative", "Switch project", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Competitive Strategy Michael E. Porter 1980 Competitive Strategy treats strategic choice as requiring trade-offs rather than pursuing every attractive activity. A adds 0 credits over the baseline; B adds -3. Switching can earn 40, but foregoes the certain alternative’s 15 in both branches. A single exclusive budget is stipulated; no competitive industry outcome or investment recommendation follows. Does it hold up? The arithmetic follows our assumptions; real-world applicability and book attribution remain unverified.". Reset-last browser run pending.
7. Phone fit: reveal body 73 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["12.00","15.00","25.00","-3.00"]; after ["12","15","25","-3"]. Answer index 3 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- meta.json: the .toy claim's "Prediction correct option" token updated to match; claim stays unverified.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
