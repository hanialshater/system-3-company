# Build note: huffman-by-merging (demo-builder, 2026-10-12)

- Design intent: tap two circles to join them; the tree grows upward, edges carry 0/1, and every leaf shows its current code underneath. The Bits readout adds each join's weight, so the learner sees that a join costs its weight.
- With two groups left the last join is forced and made automatically. 'Join the two lightest' is a step button for learners who get stuck.
- Reveal gate: interact() only when a tree is complete, so the learner has seen a full code and its bit total.
- After screenshots: a learner who joins A+B first gets 16 bits and was only told 'versus 16 fixed'; the message now says 'no better than fixed. Start over?'. Reveal quotes the learner's own codes and was trimmed under 120 words.
