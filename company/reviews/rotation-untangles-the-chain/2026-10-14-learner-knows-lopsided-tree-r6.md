*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): rotation-untangles-the-chain
lesson version: v1
boundary: knows-lopsided-tree (from meta.json learner.knows: insert order shapes a search tree; does not know that a tree can fix itself with a local rotation and stay in order).
Screenshots seen: yes (artifacts/walkthroughs/rotation-untangles-the-chain/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "A tree that rotates whenever one side is two levels deeper than the other: what height?" 7 / 5 / 3. The locked stage is an empty tree over a row of key columns 1–7. No leak. "7" is the honest guess for someone who believes sorted input always gives a chain.
- Explore: "Insert next key" places 1. "Insert the rest" jumps straight to the finished tree: root 4, height 3, 4 rotations, with dashed ghosts of the last rotation ("Rotated at 5: 6 moves up"). The gate opened here. Toggling "Plain" shows the 7-level chain (its top is cropped off the stage), and "Rotating" shows the balanced tree again (its root 4 is also cropped).
- **Where it broke:** the hint says "watch key 3", and the reveal says "at key 3, 2 rose above 1 and 3". I never saw that. "Insert the rest" ran through it in one press. The only rotation on screen was the last one, drawn as overlapping dashed ghosts (5, 6, 7 ghosts sitting over the solid 5, 6, 7), which I could not read as "lift the middle key". So the idea the lesson exists for (a local rotation that lifts the middle key and keeps order) is on stage only as a result, never as a move I watched. The "first-rotation" milestone seems to count as reached when the bulk button passes it.
- What does work: the 1–7 column boxes under the tree make "no key ever left its column" visible. That is a good stand-in for "stays in order", and the reveal points at it. The contrast Plain 7 vs Rotating 3 is clear in the readouts.
- Reveal: 3 vs 7 and "four rotations in all" match the readouts. "At key 3, 2 rose above 1 and 3" quotes a state that was never shown (W-150).
- Minor: "1 levels" grammar; the tree is cropped at the top in the Plain/Rotating frames and off screen entirely at reveal.

Told vs shown check (brief): doesNotKnow "a tree can fix itself with a local rotation and stay in order". "Stay in order" is shown (columns). "Local rotation" is shown only as the end state plus an unreadable ghost. The objective asks the learner to explain "a rotation lifts the middle key while keeping the left-to-right order". The lifting move is the cause and it is not watched. Revise.

## 2. Earlier findings

No earlier learner review exists. Boundary taken from meta.json.

## 3. New findings

- **Revise:** gate the first milestone on the learner stepping "Insert next key" up to key 3 and seeing the 1-2-3 chain become 2 over 1 and 3 (one before/after, the middle key visibly moving up its column). Put "Insert next key" first and disable "Insert the rest" until that rotation has been seen. Then the reveal's "at key 3" sentence becomes true.
- Moderate: the ghost overlay (dashed old positions over the new ones) is hard to read. A brief animation along the column, or a single "before" ghost in a different tint, would read better.
- Minor: the tree is cropped at the top (the Plain chain's root, the Rotating root 4); "1 levels".
- Note: 0/5 claims checked on the trust sheet (fact-checker's lane).
- No FATAL.
