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

## Pre-flight v2

Changes for r6 (binary-search-graduate, revise): options are now "Fewer than 10" / "About 10" / "More than 10" (v1's "More: 13" was the only exact option). The title no longer says thirds only "sound" faster. The table gains a "left after 2" column (249 / 333) that fills once two questions have been asked and stays, so the reveal's two-question state is on stage on every path, including "Ask one question" then "Ask until found" (main finding). The per-target histograms are removed (one view fewer; claim c7 dropped with them). The zoomed tick strip is unchanged. Not built, typechecked or QA'd (batch instruction).

1. **Title and hook.** "Halves or thirds: which finds it first?" / "Cut a sorted list into thirds each round: do you find things sooner?" No: both are open questions with no count or direction.
2. **Options.** "Fewer than 10", "About 10", "More than 10": all anchored on the 10 given in the question, none exact.
3. **Locked stage.** Two lines 1 to 1,000, "Questions: 0 · Left: 1,000" in each lane, table all "?". Nothing shows 13 or which lane wins.
4. **Reveal values.** 10 and 13 on 721: (b) milestone both-found; table column "721". Worst 10 / 13, averages 9.0 / 11.2: (b) milestone all-targets; table columns, same toFixed(1) rounding. 249 / 333 after two questions: (b) on the required path, since both-found needs k = 13 and passes k = 2; the "left after 2" column shows them from then on.
5. **QA path.** Ask one question (k = 1: 500 vs 666), Ask until found (25 ms per step, 12 steps, about 300 ms, inside the 450 ms wait; both-found; fills "left after 2"), Try all 1,000 targets (all-targets). Both milestones in three presses. Buttons keep their labels.
6. **Reset.** The lesson has no Reset control and nothing clears the table. Reveal (traced from code, not run): "On 721, halving needed 10 questions; thirds needed 13. Over all 1,000 targets the worst cases were 10 and 13 (averages about 9.0 and 11.2). / Look at 'left after 2' in the table: halving had 249 numbers left, thirds 333. A third sounds smaller than a half, but it costs two questions, and two halvings leave a quarter. Per question, halving wins. / Ternary search earns its place elsewhere: finding the top of a smooth hill." Matches the table.
