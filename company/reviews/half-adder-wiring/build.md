# Build note: half-adder-wiring (demo-builder, 2026-10-13)

- Design intent: one circuit. Inputs A and B (switch boxes) each feed two gate slots, sum and carry; each output drives a lamp showing 0 or 1. Wires light in the domain colour when they carry a 1. Buttons flip A and B and cycle each slot's gate (AND -> OR -> XOR). A readout says on how many of the four input pairs the circuit adds correctly.
- Deviation from brief: no dragging gates or drawing wires; the wiring is fixed and the learner chooses the gate in each slot. Free wiring on a phone would be the hard part of the lesson instead of the idea.
- Start state: sum = OR, carry = XOR (1 of 4 right), chosen so each slot is one tap from the answer in DOM order.
- Key state: a circuit right on all four inputs, then 1 + 1 on that circuit. Milestones ["wired", "one-plus-one"], minInteractions 2. QA path: A, B, Sum gate, Carry gate (reaches XOR/AND with A = B = 1), Reset.
- Numbers: all lamp values and the 'right on N of 4' count come from apply()/rightOn() in Demo.tsx. Brief answer (B, carry 1 sum 0) re-derived; enumeration of all 9 gate pairs in Node shows only (XOR, AND) scores 4.
- Locked: lamps are blank and the readout shows a dash.
- After screenshots: zero-valued wires were nearly invisible (var(--line)); they now use var(--muted). The A and B wires cross once on the left; there is no junction dot at the crossing.

## Revision v2 (wave C, learner review)

- Binary and carry/sum undefined: the question says counting goes 0, 1, 10, 11 and that the answer has a carry digit on the left and a sum digit on the right.
- Score opaque: the stage prints the goal (00, 01, 01, 10) and the rule for each gate chosen (AND, OR, XOR) (c2).
- Reveal after Reset: it now says 'When you had the circuit adding right', not 'your working circuit' as if still on stage.
- Chaining was told: sentence and claim c4 removed. Hook no longer gives away that wiring is the answer.

All changed claims are unverified, awaiting a fact-checker.
