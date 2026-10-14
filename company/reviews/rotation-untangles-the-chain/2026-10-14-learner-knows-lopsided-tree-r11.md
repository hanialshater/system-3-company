# Learner review r11: rotation-untangles-the-chain

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v4
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: knows-lopsided-tree (same tag as r6-r8). Knows insert order shapes a search tree; does not know that a tree can fix itself with a local rotation and stay in order.
artifact: walkthrough against a release build on :3590 (I started it). transcript.md read first, then sheet.png. Screenshots seen: all 6 frames.
path walked: chose 7 levels; Insert next key (key 3); Insert the rest; Plain; Rotating; reveal.

## Findings (written before reading meta.json)

- **Prediction:** for a mind that knows sorted input gives a chain, 7 is the natural pick and 3 sounds too good. Good tension; the question also gives the plain chain height so the choice is only about the rotating tree.
- **The first rotation is shown well:** at key 3 the ghost outlines (dashed 1, 2, 3) show where keys were, a green arrow shows 2 lifting, and the caption names it: "Key 3 made 1's side too deep: 2 lifted up". The key strip 1-7 under the tree stays in order. Shown, not told.
- **Plain vs Rotating toggle** puts the 7-level chain and the 3-level tree on the same stage with the same key strip; the contrast is immediate (frames 4-5).
- **Weak spot (not a blocker):** "Insert the rest" jumps from key 3 to key 7, so on this path I only see the two easy rotations (three keys in a line). The rotation at the root, where 4 rises above 2 and 3 has to change parent, is the one where "stays in order" is least obvious, and I never watch it. The reveal's "No key ever left its column" asks me to trust the strip for that case. Stepping key by key would show it; the panel does not ask for it.
- **Weak spot:** "close to log₂ of the number of keys" is told; 7 keys / 3 levels is one consistent instance.
- No clipping; reveal fits with the stage visible.

## After reading the brief

The objective (rotation lifts the middle key, keeps order, 3 levels not 7) is what the stage shows. The misconception "the only cure is shuffling" is answered by the toggle. The skipped root rotation is the gap between intent and experience; it does not make anything false. No fatal flaw seen.
