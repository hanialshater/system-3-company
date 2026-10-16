# Build: bk-yes-trade-different-values

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/business.json`, family `payoff`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Certain fallback" [100,12,12] → 12 credits; "Uncertain agreement" [70,20,-10] → 11 credits. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "An offer and a fallback" / "A toy agreement has two possible outcomes. Compare it with a certain outside option.". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "20.00"; 2: "14.00"; 3: "11.00"; 4: "12.00". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral payoff diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 12 and 11; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Certain fallback", "Uncertain agreement", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "Getting to Yes Roger Fisher and William Ury 1981 Getting to Yes uses the best alternative to an agreement as a benchmark for evaluating a proposed deal. A gives 12; B averages 11. An attractive 20-credit agreement outcome does not by itself beat the certain 12-credit fallback. Probabilities and net values are stipulated; expected value is not a complete negotiation criterion. Does it hold up? The arithmetic follows our assumptions; real-world applicability and book attribution remain unverified.". Reset-last browser run pending.
7. Phone fit: reveal body 77 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.
