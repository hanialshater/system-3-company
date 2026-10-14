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
