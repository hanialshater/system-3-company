*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): insert-at-front-cost
lesson version: v2
boundary: adult beginner (knows a queue, can count; has never heard of arrays or linked lists).
Screenshots seen: yes (artifacts/walkthroughs/insert-at-front-cost/sheet.png, all 5 frames)
Verdict: revise

## 1. From the artifact (written before reading the earlier review)

- Predict: clear. 1 / 6 / 7 gives a real misconception (1: "only the new one moves") and a counting trap (7). The locked row with an empty slot 7 is a good hint that something has to shift, without giving the count.
- Explore, row: "Insert N at front" turns A to F red, prints "each moved one slot →", and ITEMS MOVED reads 6. The headline question is answered on the stage, cleanly.
- Explore, chain: "Switch to chain" shows a chain that already has N at the front, with "Nothing moved. 2 arrows changed." and ITEMS MOVED 0. The learner never watches the chain insert happen: there is no before/after of the two arrows, so "2 arrows changed" is a caption to take on trust. N no longer vanishes, which is better.
- Explore, reaching item 4: in the chain, hop numbers 1, 2, 3 sit under A, B, C and the caption says "Item 4: 3 hops". That works, but the numbers make A look like item 1 when N is item 1; the item reached (C) is not highlighted. In the row, "Go to item 4" was never pressed in this path, and the gate opened without it. So "a row makes reaching any slot instant" is reveal text only.
- Reveal: the first paragraph matches the stage exactly (6 moved; 3 hops; 0 moved, 2 arrows). The second paragraph states a two-way trade-off (row: instant access, costly insert; chain: cheap insert, k − 1 hops) of which the learner has seen three corners, and one of those only as a caption. "Array" and "linked list" are named after the experience, which is fine.

## 2. Earlier findings (v1 review, 2026-10-13)

1. Prediction had little pull: **partly fixed**. 7 was added as a counting trap; 1 is still the only conceptual misconception.
2. Trade-off only half on stage, with the chain insert and the row's go-to-item-4 missing: **partly fixed**. The chain now shows the result of a front insert (0 moved, 2 arrows changed) but not the act. The row's go-to-item-4 is still not in the path or the gate.
3. N disappeared on switching to the chain: **fixed**.

## 3. New findings

- Top (blocks launch): the reveal's trade-off claim "reaching any slot instant" in a row is never seen. Require "Go to item 4" in the row view too (it should read 1 step), so both counters are compared side by side.
- Let the learner do the chain insert, or animate the two arrows being redrawn, so "2 arrows changed" is seen.
- Minor: the hop numbers under A, B, C read like item numbers; highlight C as "item 4".
- No FATAL.
