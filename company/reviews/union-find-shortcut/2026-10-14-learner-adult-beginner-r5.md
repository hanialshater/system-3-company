*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): union-find-shortcut
lesson version: v2
boundary: adult beginner who understands "groups with a leader" from clubs or teams, and has met rooted trees and Kruskal's loop check in earlier lessons; does not know union by size (v1 review plus the meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/union-find-shortcut/sheet.png, 13 frames)
Verdict: launch

## 1. From the artifact

- Predict: 7 / 3 / 1. "7" (a chain) is the honest beginner guess, and I took it. The locked stage now shows only the eight people A to H with no hop rows, so nothing leaks.
- Explore: tapping A then B draws B under A with "Merged: leader A, group of 2. Tallest: 1 hop. Tap two leaders (filled circles) to merge more." The instruction to merge groups is now on stage. The scripted path only made pairs and never tried pairs-into-pairs, so I can't confirm from stills that a learner trying for a chain watches the rule refuse it. That is the strongest possible moment, and it is optional.
- "Merge the rest, tallest way" builds the tree H → D/F/G → B/C/E → A: 3 hops, with row labels growing as the tree grows. "1,000 random orders: the worst tree was 3 hops tall." The status line keeps "tallest you built by hand 1" separate, and the reveal says "By hand you built up to 1 hop". Honest.
- Reveal: the 3 was seen twice. The doubling reason ("their group at least doubles ... only 3 times") is told; group sizes are never shown on the tree as it grows.
- Layout: in the reveal frame the tree is scrolled so the leader H and the top of the tree are cut off. The picture the reveal describes is incomplete.
- Minor: the button label "tallest way" and its result text "smallest groups first" use two names for one thing.

## 2. Earlier findings (v1 review, 2026-10-14)

1. Hop-row labels leaked "3" before the prediction: **fixed**.
2. No instruction for merging groups: **fixed** ("Tap two leaders (filled circles)").
3. "Tallest you built" credited the button's tree to me: **fixed** (separate "by hand" count, and the reveal is worded from what I did).
4. "1 hops" grammar: **fixed**.
5. Leader node scrolled off in the reveal: **not fixed**.
6. Doubling reason told: **not fixed** (minor).
7. Hook's "trace through everyone" misconception never shown as a cost: **not fixed**. The last line ("a few hops, not a search") asserts it.

## 3. New findings

- Show each leader's group size on the tree, so "the group at least doubles" can be watched.
- Keep the whole tree in view on reveal.
- None blocking: the worst-case 3 is seen, not told. No FATAL.
