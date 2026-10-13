# Build note: five-weak-voters

- Intent: one grid of 200 questions, green where the vote (or the single model) was right. Controls in order: 1 model, 5 voters, 21 voters, "Same mistakes" toggle (every voter copies voter 1), New batch. Readouts: this batch (count/200) and long run (exact binomial; 60% for one model or shared mistakes). Locked: grey grid, readouts hidden.
- Key states (milestones): "five" (5 independent voters shown) and "same-mistakes" (shared mistakes with more than one voter). QA path: 5 voters → 21 voters → Same mistakes → New batch.
- Seeds: batch b = mulberry32(b), 21 draws per question, voters 1..n use the first n; batches in order, untuned. Batch 1: 121 / 138 / 158 for 1 / 5 / 21. Spread: 5 voters beat 1 in 1,967 of 2,000 batches.
- Reveal quotes the counts the learner saw, tagged with the batch when it differs from the single-model count's batch.
- Node check: majority(5) = 0.6826, majority(21) = 0.8256. Option "About 68%" computed.
