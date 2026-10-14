*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): greedy-slot-machine
lesson version: v3
boundary: adult with school maths; knows slot machines and percentages; no reinforcement-learning vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/greedy-slot-machine/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the hook "How often does that go wrong?" is neutral, and the three options (none / 3 in 10 / 9 in 10) are all plausible to a beginner. The locked stage shows empty axes at 30 and 70 and empty tallies. Nothing leaks.
- Explore: run 1 shows greedy's bars in red (40, 29, 23, 30, 41) labelled "stuck on A", next to the explorer's green bars "mostly on B". The caption gives the cause: "first pulls: A lost, B lost". Run 2 ("A lost, B won") is not stuck. "Watch 100 more" builds the tally to 33 of 102 and 57 vs 67 average wins. A learner who picked "No runs" is contradicted by run 1, and the tally shows the rate.
- Where understanding first broke: in run 1 both first pulls lost, so A and B both look 0%. The reveal says "B looked like 0% and it never tried B again", but A looked 0% too. Why A and not B? The tie rule (ties go to A) is only in the trust sheet. A careful beginner will notice this, because run 1 is the example the lesson chose.
- "10% explorer" is never defined before the reveal. The question only describes greedy. The label hints at what it does, but "random on 10% of pulls" first appears in the reveal's formula ("90 pulls on B and 10 at random").
- Reveal: it answers the question I had ("how often?") with my own tally (33 of 102, 32%). The "0.1 × 50" term uses an unexplained 50 (the average of 30 and 70).
- Minor: after "Watch 100 more" the bars show only the last run, so the 102-run claim rests on the tally chip. That is fine, but the chip is small.

## 2. Earlier findings (r2 review)

1. Tie-break unstated (A lost, B lost, so why A?): **not fixed** on stage or in the reveal. The trust-sheet claim c3 now says "with both at 0% the tie goes to A", but a learner only sees that if they open "Why trust this?".
2. Trust link shows 4/5 claims checked: **still open** (c3 is unverified after the v3 text change). This is the fact-checker's lane.

## 3. New findings

- Minor, carried from r2: put "ties go to A" on stage or in the reveal's first sentence ("both lost, so both looked 0%; on a tie greedy picks A, and it never tried B again").
- Minor: the explorer's rule (random on 10% of pulls) should be visible before the reveal, for example as a sub-label under "10% explorer".
- Minor: "0.1 × 50" needs "(the average of A and B)".
- No FATAL. A first-time learner at this boundary sees greedy get stuck on stage and counts how often. The idea arrives without being told.
