# Build: bk-nudge-default-choice-model

Owner: demo-builder-books100 · 2026-10-16 · v2 · draft prototype

Built from `company/domains/briefs/books-100/psychology.json`, family `selection`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Default X" [6,100,4,50] → 80 % choose X; "Default Y" [6,0,4,50] → 20 % choose X. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v2

1. Title and hook: "Which default, which result?" / "Two forms offer identical alternatives. Compare their stated choice rules.". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "20%"; 2: "50%"; 3: "80%". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral selection diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 80 and 20; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Default X", "Default Y", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Nudge Richard H. Thaler and Cass R. Sunstein 2008 Nudge argues defaults can influence choices while alternatives remain available. Default X gives 80%; default Y gives 20%: only the six followers change. Following is assumed, not measured. Does it hold up? The arithmetic cannot estimate how many real people follow a default.". Reset-last browser run pending.
7. Phone fit: reveal body 52 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.
