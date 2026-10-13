# Build notes: four-lines-one-continent

v1 (2026-10-13, Wave 5 geography, sonnet build, EXP-003). Brief 50.

- The four lines are walked through the 1:110m country polygons in the browser (0.1 deg steps); continent counts on the stage and in the reveal come from that walk, and a node re-run gives the same: Africa 4, Asia 2, South America 2, Europe 1, North America 1, Australia 1.
- Continents come from an explicit table limited to the countries the lines cross (node check: every crossed country is in it). Egypt (Africa) and Indonesia (Asia) are conventions, recorded as claim c3. A button reads "Australia" (the country), not "Oceania", since small islands are missing from the data.
- Gate: all six continents checked, because the reveal says "of these six, only Africa" (earn-the-reveal: it must have been seen). A thinner gate (three continents, as in the brief) would let the reveal state what the learner did not see.
- Lit-up countries are only the ones a line crosses; the caption says so. Tropic latitude 23.4366 is from the brief (memory, unverified).
