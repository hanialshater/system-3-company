# Build note: in-order-is-sorted (demo-builder, 2026-10-13)

- Design intent: the tree built from 5, 3, 8, 1, 4, 9, 7 is drawn with node buttons, and seven visit slots sit under it. The learner taps the node to visit next by "left side, then the node, then right side". A wrong tap says why not yet ("5's left side comes first", "3 comes before its right side"). A correct tap puts a visit-number badge on the node and fills the next slot. After the first correct visit, "Finish the walk" visits the rest by the same rule, and every badge stays visible.
- Key state: one correct visit, then every node visited. Milestones ["first-visit", "all-visited"], minInteractions 2. QA path: node buttons are in insertion order in the DOM (not visit order, so the DOM does not leak the answer). 5, 3, 8 are refused with distinct reasons; 1 is visited; 4, 9, 7 are refused; then Finish. "Start again" comes first in the DOM, disabled before any visit, and is shown last, so a DOM-order press never undoes the walk.
- Honest limit: on the QA path only one node is visited by hand; the reveal says so ("You visited 1 node by hand and the walk went on by the same rule"). A learner can visit all seven by hand.
- Numbers: the tree, in-order 1,3,4,5,7,8,9 and the pre-order distractor 5,3,1,4,8,7,9 come from build()/inorder()/preorder() in Demo.tsx.
- Retitled: the slug gives the answer; title "What order comes out of the tree?".
- After screenshots: reads on phone. No changes.
