# Build: bk-forecast-proper-score

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/psychology.json`, family `payoff`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Forecast 20 percent" [20,10,-5] → -2 net points; "Forecast 60 percent" [60,10,-5] → 4 net points. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "Would the updated forecast flip it?" / "A toy action is attractive only when its expected net points exceed zero.". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "-2 points"; 2: "4 points"; 3: "6 points". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral payoff diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots -2 and 4; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Forecast 20 percent", "Forecast 60 percent", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Superforecasting Philip E. Tetlock and Dan Gardner 2015 Superforecasting describes revising probability judgments as relevant information arrives. At 20%, action averages -2; at 60%, 4. The changed probability crosses the positive-expectation threshold. Does it hold up? An updated probability is not automatically more accurate; forecast quality needs outcomes and scoring.". Reset-last browser run pending.
7. Phone fit: reveal body 50 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.
