*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): half-adder-wiring
lesson version: v3
boundary: adult who knows binary digits and 1 + 1 = 10 in binary, uses on/off switches, and has never met AND, OR or XOR.
Screenshots seen: yes (artifacts/walkthroughs/half-adder-wiring/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact

- Predict: the question is now "One gate makes the sum digit. Which one?" Each option defines its gate in plain words. OR is the natural wrong pick. The locked stage shows the circuit with both outputs blank, and the four-row table has "goal ? ? ? ?" (hidden). It also says "Tap a gate button to change it." Nothing on the locked stage answers the question. The stem's "1 + 1 = 10 (carry 1, sum 0)" lets a careful learner reason to XOR from the option definitions. That's reasoning, not copying, and the brief's "knows" already includes 1 + 1 = 10.
- Explore: flipping A to 1 lights the wires green and fills the whole table at once: goal 00 01 01 10, circuit 00✓ 11✗ 11✗ 01✗. With both inputs at 1, OR still gives sum 1, and I could see the ✗ under 1+1. Switching the sum gate to XOR made 1+1 read 00✗. Switching carry to AND turned every row into a tick and "4 of 4 inputs". The table shows the per-row check that the counter only claimed before. The caption under the table defines the two gates currently in use.
- Reveal: it points at the goal row's sum digits (0, 1, 1, 0 = XOR) and carry digits (0, 0, 0, 1 = AND), and at OR failing in the 1 + 1 column. I saw each of those in the table. "Half adder" and "the wiring does it" follow from what I did. I got the idea from the stage: one gate per digit, chosen by matching its column.

## 2. Earlier findings (v2 review, r5)

1. Predict leaked its answer through the goal row and the "counting goes" line: **fixed** (new question; goal row hidden until lock-in).
2. "4 of 4" not visible as rows: **fixed** (four-row table with ✓/✗).
3. No "tap to change gate" cue: **fixed** ("Tap a gate button to change it." on the locked stage).
4. Version not bumped: **fixed** (v3).

## 3. New findings

- Minor: after Reset (the walkthrough pressed it after 4/4), the stage at reveal shows OR/XOR and "1 of 4" while the reveal talks about the ticked circuit. The reveal wording handles it ("With all four rows ticked"), but a "your last working wiring" marker would help.
- Minor: the circuit and the table are two places to look. The table carries the reasoning, so this is acceptable, but on a small phone the reveal crops the circuit's top.
- Minor: still brute-forceable (9 gate combos), but the reveal teaches from the table, not from the search.
- No FATAL.
