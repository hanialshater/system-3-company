# Build note: ternary-asks-more (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #46 and spec company/design/specs/ternary-asks-more.md (+ .svg).

## What was built
- Two stacked number lines 1 to 1,000 (Halves, Thirds), one question per press in each lane. Band = numbers still possible, ticks = numbers asked (latest labelled), hollow ticks for questions that cut nothing, brackets join a round's two probes. Shared zoom to 701-740 once both lanes have fewer than 40 left (after question 6); the rule line shortens to "Find 721." then.
- Results table (721 · worst of 1,000 · average), "?" until filled. "Try all 1,000 targets" adds a histogram strip under each lane with the peak labelled.
- Controls in DOM order (3, as spec): Ask one question · Ask until found (25 ms per question) · Try all 1,000 targets.
- Milestones (minInteractions 2): both-found, all-targets.

## Checks run
- Node and the Demo's own functions: 721 needs 10 and 13; all targets worst 10 and 13, averages 8.987 and 11.192 (shown 9.0, 11.2); left after 2 questions 249 and 333; hollow questions 4 and 12; 131 targets are worst for both; histogram peaks 489 at 10 and 272 at 13; smarter ternary still worst 13 (avg 9.634).

## Disclosed choice
- Target 721 was chosen by the spec as a worst case for both methods; disclosed in claim c3.

## Not run
next build, typecheck, QA, walkthrough (as instructed). All claims unverified.
