# Build note: next-word-tally

- Intent: the learner writes with a one-word-memory counter; the count bars are the whole model, and each tap appends a word that really followed the previous one.
- The reveal unlocks only when a sentence is finished, and the stage marks it "New" or "Copied", so the payoff (recombination makes new sentences) is seen, not told.
- After screenshots: the finished state drops the bars and leaves the card mostly empty; kept it (one thing to look at) with a running "new sentences" tally.
- Known: short novel sentences like "the mat." count as new. That is honest bigram behaviour, but a reviewer may prefer gating on the target sentence.

## Revision v2 (batch 02, 2026-10-14)

Novelty now means "not a piece of the training text" (a run like "the mat." is no longer new); badge and reveal say "a piece of the training text" otherwise. Sentence box keeps a fixed height. No claim text changed.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.
