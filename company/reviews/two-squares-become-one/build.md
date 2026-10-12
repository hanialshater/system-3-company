# Build note: two-squares-become-one (demo-builder, 2026-10-12)

- Intent: the 3-4-c triangle ×4 in a 7×7 frame; a 3-stop slider slides three triangles (pure translations) from "one tilted c×c square empty" to "3×3 and 4×4 empty". The empty area never changes, so c×c = 25.
- Reveal is gated on reaching the two-squares layout (interact() fires only there); the tilted square shows "c × c = ?" until then and "25" once the learner slides back.
- Locked stage hides the unit grid so the hypotenuse cannot be measured against it.
- After screenshots: halfway caption said "nor overlaps", which is not guaranteed mid-transition; reworded to "Nothing turns, nothing is added or cut."
- Open question for evaluators: a 3-stop slider is coarse; a continuous slider would feel more like sliding but QA's two arrow presses must reach the end state.
