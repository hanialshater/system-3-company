# Build note: hamming-points-at-the-bug (demo-builder, 2026-10-13)

- Design intent: one grid. Seven bit buttons show the sent word 0110011, with positions 1-7 under them. Below are three rows of dots, one per check ({1,3,5,7}, {2,3,6,7}, {4,5,6,7}). Each row has a worth (+1, +2, +4) on the left and a fail/ok light on the right. Tapping a bit flips it in transit. Tapping another bit moves the flip, so there is one error at a time, and tapping the flipped bit undoes it. A readout shows what the failing checks add to.
- Key state: three different bits flipped, and bit 6 flipped (checks 2 and 3 fail, 2 + 4 = 6). Milestones ["three-bits", "bit-six"], minInteractions 2. The QA path taps bits 1-7 in order. At reveal the stage shows bit 7 (1 + 2 + 4 = 7), and the reveal names it as "on the stage now".
- Deviation from brief: no separate "repair a received word" target. Reading the position off the lights is the payoff; repair is one sentence in the reveal (claim c5). The brief's words 0110001 (received) and 0110011 (sent) agree: bit 6 is the flipped one.
- Numbers: the question's check lists, the failing checks and the 6 all come from CHECKS/TARGET in Demo.tsx. Node confirmed sums 1..7 for positions 1..7.
- Retitled: "One bit flipped. Which one?" (the slug hints at the idea but not the answer).
- After screenshots: reads on phone. The key sentence wraps "1s" onto a second line; acceptable.
