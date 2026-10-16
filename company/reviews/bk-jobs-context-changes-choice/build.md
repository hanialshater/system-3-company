# Build: bk-jobs-context-changes-choice

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/business.json`, family `payoff`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Task X uncommon" [20,18,2] → 5.2 fit points; "Task X common" [80,18,2] → 14.8 fit points. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "The job changes the score" / "A toy product serves two tasks. Does its average score survive a context shift?". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "18.00"; 2: "10.00"; 3: "14.80"; 4: "5.20". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral payoff diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 5.2 and 14.8; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Task X uncommon", "Task X common", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Competing Against Luck Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan 2016 Competing Against Luck frames product choice around the progress someone seeks in a particular circumstance. A scores 5.2; B scores 14.8. The product is unchanged; its 18-point fit matters more when task X occurs four times as often. Task frequencies and fit points are stipulated, not measured preferences or a choice law. Does it hold up? The arithmetic follows our assumptions; real-world applicability and book attribution remain unverified.". Reset-last browser run pending.
7. Phone fit: reveal body 83 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.

## Revision 2026-10-16 · PR #5 review F7/F8 (demo-builder, run pr5-f7f8)

Input: company/engineering/reviews/2026-10-16-pr5-engineering-review.md (in the PR #5 review worktree).

- F8: predict options now use the stage's number format (formatBookValue: no trailing zeros, ASCII hyphen-minus, no plus sign, thousands commas). Before ["18.00","10.00","14.80","5.20"]; after ["18","10","14.8","5.2"]. Answer index 2 unchanged and equals a computed scenario output. Distractors normalised too, so format cannot single out the answer.
- meta.json: the .toy claim's "Prediction correct option" token updated to match; claim stays unverified.
- Checks: books tests 12/12; npm run check passed; script over all 100 payloads: every answer equals a formatted computed output, every option number is in stage format. Not done: browser, phone fit or reveal-fit; qa-tester owns those. Status stays draft.
