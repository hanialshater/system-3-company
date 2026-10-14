# Build note: patience-piles (demo-builder, algo-builder session, 2026-10-14)

- Design intent: the 8 cards in a row, piles as buttons below; tap the pile the next card goes on (wrong piles refuse with the reason). After the last card, tapping a pile traces a run back through the back-pointers.
- 'Deal one by the rule' and 'Deal the rest' are the QA path.
- Reveal gate: all 8 cards dealt.
- Brief note for cm-cs: the misconception is 'the longest run starts at the smallest number', but the traced run is 1 4 5 6, which does start at the smallest. The reveal shows 3 4 5 9 as the counterexample. The misconception may need rewording.
- After screenshots: piles now show their top card first.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.


## Revision v2

Review: trace never prompted; reveal quoted unvisited runs; top of pile ambiguous. Changes: second milestone needs a 4-card trace (new button Trace from last pile, or tap pile 4); reveal quotes the learner's trace only; arrow marks each pile's top card. Claims unchanged. Version 2. Not done: slow card-by-card animation of Deal the rest.
