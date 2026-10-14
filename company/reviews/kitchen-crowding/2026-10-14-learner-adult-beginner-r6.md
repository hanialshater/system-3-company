*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): kitchen-crowding
lesson version: v4
boundary: adult beginner; believes more workers means proportionally more output; has not heard "diminishing returns".
Screenshots seen: yes (artifacts/walkthroughs/kitchen-crowding/sheet.png)
Verdict: launch

## 1. From the artifact

- Hook and predict: "One cook makes 10 pizzas an hour. What do four cooks make in one small kitchen?" The options are now 40 / fewer than 40 / more than 40, which tests the belief and not the model's constants. The title "Four cooks, one oven" hints at crowding, but 40 stays tempting. The locked stage shows an oven, one cook dot, "?" and "Model: made-up numbers". Nothing leaks.
- Explore: at 4 workers the stack reads +10 +8 +6 +4 = 28 inside a dashed "4 × 10 = 40", and four dots crowd the oven ("Worker 4 adds 4: 4 cooks share the oven"). "Fill the kitchen" goes to 8 workers: 30 against 80, with eight dots on one oven ("Worker 8 adds nothing"). "Add a second oven" (at 7) splits the dots 4 + 3 over two ovens and the stack rebuilds +10 +10 +8 +8 +6 +6 +4 = 52. The cause is now something I can see and change: the fixed oven. Adding the second oven brings the big increments back.
- Where it could still lose a beginner: the cook dots only count cooks per oven. Nothing shows a cook waiting, so "crowds the oven" is inferred from the count and from what the second oven does. That is enough for the idea. Minor.
- Minor: at 7 to 8 workers the "+2" and "+0" slices are slivers with labels squeezed to the left of the bar ("+2 / +4" overlap). Worker 5's +2 is still hard to read.
- Reveal: it quotes the path (28, worker 8 adds nothing, 30 cap, 52 with two ovens against 30 with one) and points at the second oven. It names "diminishing returns" after the learner has seen it. It ends on "the fixed oven is the reason", with the model disclaimer.
- Minor: trust link 3/5 claims checked (fact-checker's lane).
- No FATAL.

## 2. Earlier findings (r5 review, v2)

1. Main: the fixed input (oven) was invisible, and the cause was only told: **fixed**. The oven, the cooks per oven and the "Add a second oven" toggle are on stage, and the reveal points at them.
2. The reveal quoted "worker 6", which was not seen: **fixed** (it now says worker 8, which "Fill the kitchen" reaches).
3. +2 sliver unlabelled: **partly fixed** (labelled, but the labels overlap; minor).
4. 28 against 20 was an arbitrary pick: **fixed** (40 / fewer / more).
5. Trust link: now 3/5 (fact-checker).
- (r1/r2) Empty stage above the bar: **mostly fixed** (the taller stacks use the space).

## 3. Brief check (show the why)

- doesNotKnow 1 (with a fixed oven, each extra worker adds less): shown, as shrinking slices, cooks crowding one oven, and the second oven restoring the slices.
- doesNotKnow 2 (output can stop rising): shown ("Worker 8 adds nothing", 30 at 7 and at 8).
