# Build note: twenty-harmless-tests (demo-builder, 2026-10-12)
- Intent: 20 cards, all true nulls. Tapping a card (or "Run all 20") runs the test, and false alarms light red. "Run 1,000 batches" counts the batches with at least one alarm: 63.8% on this seed.
- Gate: one full batch of 20 plus one 1,000-batch run. The bulk buttons come before the cards in the DOM, so the learner (and QA) reach them first.
- I picked seed 4 so the first batch shows 2 alarms. This is disclosed in model.ts and in claim c4.
- After screenshots: I shortened the readout labels. The rest of the layout read cleanly.
