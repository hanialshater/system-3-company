# Build note: split-the-sum

Built by demo-builder (sonnet build, EXP-003). Kept from evaluators until they report.

- Key states: cut at 10 (70 and 21) and any other cut (total unchanged). Milestones `ten`, `elsewhere`.
- QA path: slider starts at 8 (not 10) so the two arrow presses pass 9 and land on 10. If the start is changed the QA path must still visit 10.
- Known weak spot: the "Together" readout shows 91 at every cut, so the answer is visible once unlocked (it is hidden while locked). The payoff is the 70 + 21 split, not the number.
- Numbers from LEN, ROWS, TEN. Question options 91 / 81 / 101 are total, total - 10, total + 10.
- Screenshot looked at: artifacts/qa/split-the-sum/phone-2-explore.png. Left-piece readout wrapped to two lines with spaces; shortened to "10×7=70".
