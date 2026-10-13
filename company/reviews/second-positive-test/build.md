# Build note: second-positive-test (demo-builder, 2026-10-13)
- Intent: 1,000 dots, 10 red (sick). "Test everyone" rings 98 (9 sick); "Test the positives again" keeps 16 (8 sick); "Start over". Counts are expected values rounded to whole people (model.ts counts()), so the stage never wobbles; the seed (9) only places dots.
- Gate: 2 milestones, round 1 and round 2. The second button enables after the first, so QA (pressing in DOM order) reaches round 2.
- Question numbers (1%, 90%, 9%, "about 9%") and options (50% from the stage, 81% = 0.9 x 0.9) are computed. Exact Bayes is 50.25% (c2).
- Independence assumption is in the reveal (c4). The third round (7 of 8 rounded vs 91% exact) is deliberately not built.
- Iteration after screenshots: "Sick" label at round 0, 1,000 formatting, hook reworded to say "with this test".
