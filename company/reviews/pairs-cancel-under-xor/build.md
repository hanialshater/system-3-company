# Build note: pairs-cancel-under-xor

Builder: algo2-b2 (demo-builder). Status: draft. Kept from evaluators until they report. Not built, typechecked or QA'd locally.

## What was built
- Seven chips (value and 3-bit binary), three bit lamps (4, 2, 1) for the running XOR, and one sentence per fold ("011 XOR 101 = 110, so 3 becomes 6"). A chip whose partner has been folded is struck through and dimmed.
- Controls: Fold next, Fold the rest, New order (seeded mulberry32 reshuffle, resets the run), Start over.
- Milestones (minInteractions 2): `fold`, `all`.

## Checks run
- Node: 7 for 7 3 5 4 5 3 4; 7 on 1,000 seeded shuffles; 4 for 4 1 2 1 2; 5 5 5 7 2 2 gives 2 (a triple spoils it).

## Choices to challenge
- The brief's swap-without-a-third-variable aside was left out (text budget).
- "New order" is not gated: the reveal unlocks after one full fold in any order.

## Revision v3 (wave E, r6 learner review)

- r6 hook (the "has a twin" hook let a learner find 7 by eye): title "XOR a whole list", hook "Seven numbers, one operation, folded left to right. What is left at the end?". The question no longer says every number but one appears twice: "Fold 5 3 3 4 7 5 4 with XOR, left to right, starting from 0. What is the final value?" Options 0 / 7 / 31 (31 is the sum).
- r6 main (no single-step fold of a pair, no completed second order): the list is now 5 3 3 4 7 5 4, so the first twin is a neighbour. New button "Fold to next twin" stops on the next second copy; the stage says "110 XOR 011 = 101: the second 3 flips lamps 2 and 1 back, as the first did", and a dashed ring marks the lamps the last number flipped. "New order" now deals and folds the new order to the end. A history row ("Ended at: 7 (5 3 3 4 7 5 4), 7 (7 3 4 5 4 3 5)") keeps every fully folded order and survives Start over.
- Milestones: twin (a stepped fold that lands on a second copy), all (one order folded), second-order (a second, different order folded). minInteractions 3.
- c4 (4 1 2 1 2 gives 4) dropped with its sentence. c1, c2, c3, c5 reworded and unverified.

## Pre-flight v3

1. Title and hook: "XOR a whole list" / "Seven numbers, one operation, folded left to right. What is left at the end?" Neither mentions twins, cancelling or a lone number.
2. Options: "0" / "7" / "31". All bare numbers.
3. Locked stage: seven chips with their 3-bit codes, lamps 0 0 0, "= 0", "Folded 0 of 7". No lamp lit, no chip highlighted, history row empty.
4. Reveal values: "ended at 111, which is 7": history[0], recorded when the first order is fully folded (milestone all, b). "the second 3 … lamps 2 and 1 … 6 went to 5": the first twin record, set at milestone twin (b). "Your other order, 7 3 4 5 4 3 5, ended at 7 too": history[1], milestone second-order (b). "the lone 7": the list's XOR, the same for every order. All three records are in the history row or were on stage at the twin step.
5. QA path: Fold next (5) → Fold to next twin (6 → 5, twin) → Fold the rest (7, all) → New order (7 3 4 5 4 3 5 folded to 7, second-order) → Start over. The history row shows both orders when the reveal opens; a second row keeps the twin: "First twin: the second 3 flipped lamps 2 and 1 back, 6 → 5."
6. Reset: Start over clears the lamps and the fold count, not the history or the twin record. Reveal from that run: "Your lamps ended at 111, which is 7. When the second 3 came in, it flipped lamps 2 and 1 back, the same lamps its twin flipped, and 6 went to 5. a XOR a = 0, and a XOR 0 = a: every pair cancelled, and only the lone 7 was left. / Your other order, 7 3 4 5 4 3 5, ended at 7 too: XOR ignores order, so one pass finds the lone number, with no sorting and no table of counts. It needs every other number to appear an even number of times: one that appears three times does not cancel."
