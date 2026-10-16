# Build: bk-accelerate-small-batches

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/business.json`, family `intervals`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Five-minute batches" [60,5,2] → 40 work minutes; "Fifteen-minute batches" [60,15,2] → 45 work minutes. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "Two release batch sizes" / "Toy releases pay a setup cost per batch. What does this arithmetic leave out?". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "60.00"; 2: "30.00"; 3: "45.00"; 4: "40.00". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral intervals diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 40 and 45; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Five-minute batches", "Fifteen-minute batches", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Accelerate Nicole Forsgren, Jez Humble and Gene Kim 2018 Accelerate connects delivery performance with practices that include working in small batches. A completes 40 work minutes; B completes 45. Larger batches pay setup fewer times here; the picture contains no benefit from faster feedback. Setup accounting only; delivery speed, learning and the book’s empirical findings are not modeled. Does it hold up? The arithmetic follows our assumptions; real-world applicability and book attribution remain unverified.". Reset-last browser run pending.
7. Phone fit: reveal body 74 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["60.00","30.00","45.00","40.00"]; after ["60","30","45","40"]. Answer index 2 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- meta.json: the .toy claim's "Prediction correct option" token updated to match; claim stays unverified.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
