# Build note: split-the-sum

Built by demo-builder (sonnet build, EXP-003). Kept from evaluators until they report.

- Key states: cut at 10 (70 and 21) and any other cut (total unchanged). Milestones `ten`, `elsewhere`.
- QA path: slider starts at 8 (not 10) so the two arrow presses pass 9 and land on 10. If the start is changed the QA path must still visit 10.
- Known weak spot: the "Together" readout shows 91 at every cut, so the answer is visible once unlocked (it is hidden while locked). The payoff is the 70 + 21 split, not the number.
- Numbers from LEN, ROWS, TEN. Question options 91 / 81 / 101 are total, total - 10, total + 10.
- Screenshot looked at: artifacts/qa/split-the-sum/phone-2-explore.png. Left-piece readout wrapped to two lines with spaces; shortened to "10×7=70".

## Revision v2
Learner review (2026-10-14) finding: "What is 13 x 7?" was an arithmetic test, not a belief about the idea.
- The prediction now asks the idea: "Which cuts give the true 13 x 7?" (only a cut at 10 / any cut / only near the middle).
- The reveal needs two readings (a cut at 10 and a cut elsewhere: the two milestones), so "any cut works" rests on more than one reading, and quotes the learner's own other cut.
- No "Show me why" button exists in this build; the reviewer's note refers to the milestone gate.
