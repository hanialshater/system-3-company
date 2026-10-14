*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, r6 wave): pairs-cancel-under-xor
lesson version: v2
boundary: learner who knows bitwise operators on a number (mask-the-flags) and reads 3-bit binary; has never been shown that a XOR a = 0 or that XOR ignores order.
Screenshots seen: yes (artifacts/walkthroughs/pairs-cancel-under-xor/sheet.png, 5 frames)
Verdict: revise

## 1. From the artifact

- Predict: "In 7 3 5 4 5 3 4, every number but one appears twice. XOR all seven together." Options 0 / 7 / 28. "0" is a real trap ("XOR of many things cancels out"), and that is the guess I made. The hook already says "All but one number ... has a twin", and anyone who scans the list sees that 7 is alone. Some learners will pick 7 on "the lone one must be the answer" without any XOR reasoning. It is not a full leak, but it softens the prediction. The locked stage shows the bits and lamps at 0 and nothing about the answer.
- Explore, one fold (frame 02): "000 XOR 111 = 111, so 0 becomes 7", and all three lamps go green. Clear.
- "Fold the rest" (frame 03): it jumps from 1 of 7 to 7 of 7. The lamps were 111 before and 111 after, so the stage shows no change in the lamps. The six partner tiles are struck through, and the final message is "011 XOR 100 = 111, so 3 becomes 7". I never watched a partner switch a lamp back off. In this order the twins are not neighbours (3 … 3, 5 … 5), so even folding one at a time would show the running value wandering (7, 4, 1, 5, 0, 3, 7) rather than pairs cancelling cleanly.
- The reveal lit after "Fold the rest". "New order" (frame 04) dealt 5 5 4 3 4 3 7, which has an adjacent 5 5 and would show a XOR a = 0 in one tap. But it reset to 0 of 7, and nothing asked me to fold it.
- Reveal: "The lamps ended at 111" was seen. "Whatever lamps a number flips, its partner flips the same lamps back" was not seen, for the reasons above. "XOR also ignores order, so any order ends at 7" was not seen: I had a second order on screen but never folded it. "On 4 1 2 1 2 it gives 4" and "three times ... spoils" are told, which is fine as context.

## 2. Earlier findings

There is no earlier learner review. The boundary is taken from meta.json's learner field.

## 3. After reading the brief

- Both doesNotKnow items are causes the objective asks the learner to explain: "a XOR a = 0 and a XOR 0 = a" and "XOR ignores order". On the minimal path (one fold, then fold the rest) neither is on stage. The objective even says "see pairs switch their bits back off ... in any order". Under "Show the why you promised", **revise**. The stand-ins already exist on this stage: the lamps, the strike-through and New order. The gate and path just do not make the learner see them change: no single-step fold of a pair, and no completed second order.
- Hook: "has a twin" plus a seven-number list lets a learner find 7 by eye, which weakens the misconception the brief targets (that you need sorting or counting).
- The trust sheet reads 5/6 checked.
- No FATAL.
