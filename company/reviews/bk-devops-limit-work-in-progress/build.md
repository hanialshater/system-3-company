# Build: bk-devops-limit-work-in-progress

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/business.json`, family `feedback`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Admit eight" [0,8,5,4] → 12 waiting jobs; "Admit five" [0,5,5,4] → 0 waiting jobs. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "The release queue" / "A toy service finishes five releases per round. What if admissions match that rate?". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "5.00"; 2: "0.00"; 3: "12.00"; 4: "20.00". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral feedback diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 12 and 0; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Admit eight", "Admit five", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "The DevOps Handbook Gene Kim, Jez Humble, Patrick Debois and John Willis 2016 The DevOps Handbook describes limiting work in progress and making delivery flow visible. A accumulates 12 waiting jobs; B has 0. Admitting three more than finish adds three jobs each round; matching admissions avoids that accumulation. Deterministic fixed rates only; latency, randomness and real deployment reliability are not estimated. Does it hold up? The arithmetic follows our assumptions; real-world applicability and book attribution remain unverified.". Reset-last browser run pending.
7. Phone fit: reveal body 78 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["5.00","0.00","12.00","20.00"]; after ["5","0","12","20"]. Answer index 1 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- meta.json: the .toy claim's "Prediction correct option" token updated to match; claim stays unverified.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
