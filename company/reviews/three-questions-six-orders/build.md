# Build note: three-questions-six-orders (demo-builder, 2026-10-13; sonnet build, EXP-003, queue)

- Intent: six tiles are the six possible orders of 3 cards (biggest first). Three question buttons (A>B, A>C, B>C), each usable once. The answer given is always the one that keeps more orders (tie: yes), the worst case; ruled-out tiles fade.
- Milestones: "two-left" (two questions asked, two orders still alive) and "one-left" (third question). Any asking order gives 6 -> 3 -> 2 -> 1 (checked in node).
- The brief's "learner picks the question that splits best" is simplified: with 3 cards every first question splits 3/3, so all choices are equal; the lesson is the count, not the choice.
- Adversarial answers are disclosed on stage (hint: "the unluckiest ones") and in c2.
