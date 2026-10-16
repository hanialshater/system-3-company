# Build: bk-habit-cue-policy

Owner: demo-builder-books100 · 2026-10-16 · v2 · draft prototype

Built from `company/domains/briefs/books-100/psychology.json`, family `feedback`. Own payload, ordinary entry point, complete brief/recall, all claims unverified and evidence empty. This is one original idea prototype, not a complete book summary. Chapter/attribution and independent evidence remain held.

## Mechanical checks

The shared model validator accepted the payload. Direct calculation: "Cue present" [0,2,0,4] → 8 actions; "Cue absent" [0,0,0,4] → 0 actions. These are stipulated-model derivations, not empirical book evidence.

## Pre-flight v2

1. Title and hook: "When does the routine run?" / "A toy cue starts two actions per round. Compare keeping and removing that cue.". No winning output is printed; artifact-first review must assess indirect cueing.
2. Options: 1: "2 actions"; 2: "6 actions"; 3: "8 actions". Copied unchanged from CM prediction.
3. Locked stage: shared renderer draws a neutral feedback diagram; inputs, calculated output and both Seen results are hidden as question marks; all stage controls disabled. Static source inspection only, browser verification pending.
4. Reveal values: {A} and {B}, where used, substitute scenario milestone snapshots 8 and 0; exact inputs above. Both case-labelled Seen records are retained by the shared state layer. Other model parameters in the explanation come from the fixed CM cases recorded in claims.
5. QA path: source order is "Cue present", "Cue absent", Reset. Each case calculates and stores a unique milestone; active case and no-op Reset disable. DOM-order browser run pending; no browser pass is claimed.
6. Reset: source restores case A after both cases are observed while retaining both Seen snapshots. Before both observations, it returns to neutral; no-op Reset disables. The expected unchanged reveal body is: "The Power of Habit Charles Duhigg 2012 The Power of Habit describes routines in relation to cues and rewards. Keeping the cue records 8; removing it records 0. The programmed trigger supplies actions; no habit strength is inferred. Does it hold up? Real cues do not guarantee actions; rewards and competing cues are outside this counter.". Reset-last browser run pending.
7. Phone fit: reveal body 56 words excluding the kit verdict; stage word count/crop and 390×844 screenshot are not yet measured. Independent phone fit and 320 px overflow checks pending; no phone-fit approval is claimed.

## Handoff

Root owns integrated check/typecheck/build and registration. Independent QA owns every route and Reset-last result. Learning/design/accessibility reviewers own representative and bounded-group review. Fact-checker owns all claim verification. No publication or deploy.
