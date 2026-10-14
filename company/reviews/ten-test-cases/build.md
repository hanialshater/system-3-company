# Build note: ten-test-cases

- Intent: one histogram of test scores (bars = share of tests per score), Run 1 / Run 100 and a cases-per-test switch (10, 100, 1,000). Seed 1, untuned.
- Key state: at least 100 runs of the 10-case test (milestone "many-at-10"), reached on the QA path by Run 1 then Run 100.
- The reveal quotes the learner's own 10-case tally next to the exact 12.1%; the spread numbers (12.6 and 1.3 points) are computed from the same constants.
- After screenshots: switching size wiped the 10-case runs, so the reveal could not quote them and the chart sat empty. The 10-case runs are now kept (the stream skips their draws on return), and an empty chart says "press Run".

## Revision v2 (batch 02, 2026-10-14)

Each test size keeps its own runs, so switching never erases the 10-case chart; choosing 100 or 1,000 cases runs 100 tests at once; a second milestone (100 tests at 1,000 cases) gates the reveal and a spread readout shows the narrowing. Red zone outlined, not filled. c4 reset to unverified (reveal now quotes the learner's own 1,000-case spread).
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.
