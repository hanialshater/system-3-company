# Build note: fib-call-explosion (demo-builder, 2026-10-12)

- Design intent: the call tree of fib(5), opened call by call; repeated subproblems share a colour (fib(3) x2, fib(2) x3). 'Remember answers' redraws the same tree with lookups dashed: 6 computed, 3 looked up.
- Reveal gate (minInteractions 2): interact() fires only when the full 15-call tree is first shown and when memo view is first switched on (memo is disabled until the full tree has been seen).
- Positions come from the full tree, so nodes never jump while opening. 'Open every call' sits above the tree so a learner who does not want to tap 7 nodes still sees the whole tree.
- After screenshots: memo view read clearly on phone; kept the leaves (fib(1), fib(0)) uncoloured so the eye goes to the repeated non-trivial calls.

## Revision v2 (wave C, learner review)

- Question read like maths notation: fib is described as a recipe, a call as one use of the recipe (c1).
- Hook leaked 'more than 5': now 'How many times is the recipe really used?'.
- Bare numbers on nodes: tapping a node says 'fib(3) opens into fib(2) and fib(1): two more calls.'
- fib(30) was told: removed from the reveal and claim c4 dropped.

All changed claims are unverified, awaiting a fact-checker.
