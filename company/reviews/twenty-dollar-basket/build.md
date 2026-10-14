# Build note: twenty-dollar-basket

builder: demo-builder · 2026-10-13

- Intent: a $20 cart drawn as ten $2 slots. An apple takes one slot, a loaf two, so the trade-off shows as space.
- Milestones: 3 loaves in the cart, then filled with apples (4). The loaves slider starts at 1, so QA's two arrow presses reach 3; "Fill with apples" comes next.
- Moving the loaves slider bumps apples out when they no longer fit, so the cart stays within $20.
- Reveal quotes the other loaf counts the learner filled at, if any.
- Changed from the brief: a slider for loaves instead of tapping items in, so the key state is reachable on the QA path.

## Revision v2

Wave C, builder 11, 2026-10-14, from the latest learner review and fact-check. Prediction now targets the hook: a full cart (3 loaves, 4 apples), add one more loaf. Start state is that cart; sliding loaves up pushes apples out with a caption; milestone is adding a loaf to a full cart; reveal says "once the money is all spent". c1, c2 edited, unverified.
QA contract: pass (phone and desktop). Claims edited are unverified and need a fact-check pass.
