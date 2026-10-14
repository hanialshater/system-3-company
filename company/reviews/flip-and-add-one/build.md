# Build note: flip-and-add-one (demo-builder, 2026-10-13)

- Design intent: three rows of 8 bits under their place values (top weight −128 in red): the fixed 5 (00000101), the learner's pattern (tappable bits) and, once "Add 5 to it" is pressed, the 8-bit sum with a carry note. Each row shows its signed value. Buttons above: Back to 5 (first in DOM, disabled at the start), Flip all, + 1, Add 5 to it.
- Key state: the pattern reaches 11111011 (−5) by flip and +1, then 5 is added and the sum is 00000000 with the carry dropped. Milestones ["negated", "cancelled"], minInteractions 2. QA path: Flip all (11111010, −6), + 1 (11111011, −5), Add 5 (sum 0, carry falls off), then the 8 bit toggles.
- Numbers: options are bitsOf(flip(5)), bitsOf(NEG) and bitsOf(128 | 5) from Demo.tsx; the reveal's −6, −5, 123 and −123 come from signed(). Brief answer (B, 11111011) re-computed in Node and held.
- Open risk: the bit toggles come after the key buttons in the DOM (so QA reaches the key state first); the QA path then taps all 8 bits, so the final explore screenshot shows an arbitrary pattern (00000100) rather than −5. The reveal quotes only the learner's flip/+1/add steps from the log.
- After screenshots: grid fits a phone; no further changes.

## Revision v2 (wave C, learner review)

- Bit, flip and the -128 column undefined: the question defines a bit and flipping (c5); a line under the grid says the left bit is worth -128 and shows '11111011 = -128 + 123 = -5' (c1).
- Subtraction payoff was told: a new 'Add 9 to it' button shows 9 + 11111011 = 00000100 = 4 (c3); the reveal quotes it only if the learner did it.
- Stage vs reveal mismatch from bit toggles: the line says 'Tap a bit to try your own'; the reveal quotes only the logged steps.
- Hook no longer asks about the minus-sign bit. Not changed: the minus-sign-bit counterexample stays in the reveal as told (c4, verified).

All changed claims are unverified, awaiting a fact-checker.
