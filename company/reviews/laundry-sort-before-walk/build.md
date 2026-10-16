# Build note: laundry-sort-before-walk

Kept from evaluators until they report.

## Wave W3 (r11 fix plan), 2026-10-16, demo-builder: not moved

- The plan's line ("The machine is 8 m away. Ten items one at a time, there and back. How far do you walk?", 16 / 80 / 160 m) needs the route value changed from 4 m to 8 m and the start count from 8 to 10. The model fits (case 'trips': 2 × 8 × 10 = 160 m).
- Blocked by a test, not by the model: tests/lifehacks/home.test.mjs ("access, grouping and repeated routes have concrete counts") pins value('laundry-sort-before-walk', 8, false) = 64, which holds only at 4 m. Tests are outside demo-builder's scope, so the lesson is left on engine 1 and out of the W3 ratchet line.
- Needed from evaluation-steward: rule on re-pinning that line to the new spec (8 m: 2 × 8 × 8 = 128 at 8 items, or 160 at 10). After that, the build is the same as the other W3 lessons (show the one-item total in the Seen table; the count slider moves it).
- Also open (r11 finding 5, fact-checker): the recall card uses a 3 m route and a capacity of 3, a different model from the stage.
