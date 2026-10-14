*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): heap-bubble-up
lesson version: v2
boundary: an adult who uses a phone and a laptop daily and has never programmed; comfortable with basic arithmetic (brief: knows a tree as parents and children and a list with numbered positions).
Screenshots seen: yes (artifacts/walkthroughs/heap-bubble-up/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: plain words now ("A tree of numbers has a rule: every parent is smaller than its children. It is stored as the list ..., read top to bottom, left to right"). The tree with i=0..4 labels and the list line under it make the tree-to-list link readable. The options include the "re-sort everything" answer [1, 2, 3, 9, 6, 5], so the hook's misconception has a home. A real prediction.
- Explore: "Add 1 at the end" puts 1 under 3 (i=5), with the caption "1 < parent 3: swap"; each swap moves 1 up one level with a green edge, and the list line changes in step. "1 is at the top: stop". 5, 9 and 6 visibly never move.
- Reveal: the swaps and indices quoted were all on stage. "At most 19 for a million" is told (fine as an extension).

## 2. Earlier findings (v1 review)

1. Programmer vocabulary (min-heap, index, array, formula): **fixed**.
2. Tree-to-array link not shown: **fixed** ("read top to bottom, left to right" plus i= labels and a live list line).
3. Rule disappears from the stage while exploring: **fixed** ("rule: parent < children" stays in the caption).
4. log2 and "19 for a million" told: **partly fixed** (log2 gone; 19 still told, minor).
5. Unexplained TREE HEIGHT counter: **partly fixed**, see below.
6. Reveal clipped: **fixed**.

## 3. New findings

- Minor: "LEVELS BELOW TOP 2" stays 2 when 1 has reached the top. I read it as "how far below the top is 1" and expected 0. It means the tree's depth; label it "Tree levels" or "max swaps".
- Minor: "Add 1 at the end" stays highlighted and tappable after 1 is added; tapping it again is an unclear action.
- Minor: trust link shows "2/4 claims checked" (route to fact-checker).
- No FATAL.
