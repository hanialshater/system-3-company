# Build: bk-learn-cue-overlap

Owner: demo-builder-books100 · 2026-10-16 · v1 · draft prototype

Built from `company/domains/briefs/books-100/psychology.json`, family `selection`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Familiar context" [8,100,2,0] → 80 % retrieved; "Changed context" [3,100,7,0] → 30 % retrieved. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v1

1. Title and hook: "Will the cue still be there?" / "A toy answer works only on tasks whose context cue matches the stored cue.". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "30%"; 2: "70%"; 3: "80%". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral selection diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 80 and 30; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Familiar context", "Changed context", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "How We Learn Benedict Carey 2014 How We Learn discusses learning conditions and the cues available during later retrieval. Familiar context retrieves 80%; changed context 30%. The matching share shrinks under an exact-match rule. Does it hold up? Human memory is not an exact-match lookup; these are invented cue counts.". Reset-last browser run pending.
7. Phone fit: reveal body 50 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.
