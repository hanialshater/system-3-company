# Build note: bad-hash-one-bucket (demo-builder, 2026-10-13)

- Design intent: a tray of the ten keys 10 ... 100 above a 10-slot table; each slot draws its list of keys as chips (red once a slot holds more than one). The rule line reads "slot = key mod 10 (remainder after ÷ 10)", defining mod on the stage. One switch toggles the rule to mod 7 and re-places the same keys at once. Readouts: slots used, longest list.
- Key state: at least four keys stacked in slot 0 under mod 10, then the same keys spread under mod 7. Milestones ["four-stacked", "spread"], minInteractions 2. QA path: all ten keys (all in slot 0: 1 of 10 used, list of 10), then the switch (7 of 10 used).
- Numbers: question keys, option "1" and the reveal's counts come from KEYS/usedSlots() in Demo.tsx; the reveal quotes the largest state the learner reached under each rule. Brief answer (A, 1) and the mod 7 remainders re-computed in Node and held.
- Brief's mod 7 kept on the 10-slot table; slots 7-9 are drawn faded because mod 7 can never reach them (claim c2).
- After screenshots: reads on phone; no changes.

## Revision v2 (wave C, learner review)

- Hook and title leaked the pile-up: now 'Ten slots, ten keys: room for all?'.
- Table, key, slot, hash undefined: the question explains keys and slots with 23 mod 10 = 3 (new claim c5); the reveal names a hash.
- Red chips and greyed slots unexplained: a legend line says 'Red keys share a slot' and, under mod 7, that remainders are only 0 to 6 so slots 7 to 9 stay empty.
- Slow lookup was told: the 'Longest list' readout is replaced by 'Steps to find <last key>' (10 under mod 10, 2 under mod 7); the reveal quotes the learner's own numbers (c1, c2, c3).
- Clipping: left to the kit fix (W-135).

All changed claims are unverified, awaiting a fact-checker.
