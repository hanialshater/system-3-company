# Build note: huffman-by-merging (demo-builder, 2026-10-12)

- Design intent: tap two circles to join them; the tree grows upward, edges carry 0/1, and every leaf shows its current code underneath. The Bits readout adds each join's weight, so the learner sees that a join costs its weight.
- With two groups left the last join is forced and made automatically. 'Join the two lightest' is a step button for learners who get stuck.
- Reveal gate: interact() only when a tree is complete, so the learner has seen a full code and its bit total.
- After screenshots: a learner who joins A+B first gets 16 bits and was only told 'versus 16 fixed'; the message now says 'no better than fixed. Start over?'. Reveal quotes the learner's own codes and was trimmed under 120 words.

## v2 (revision 2026-10-13)

- Reveal now lists the codes of the tree the stage builds (A 1, B 01, C 000, D 001; 14 bits), not the 2-bit codes. Leaves start ordered C, D, B, A so the QA path (Join the two lightest, then tap the 2-group and B) builds the 14-bit tree; the reveal is gated on that tree via Milestones ("best-tree"), and a 16-bit finish says to start over. Question and hook reworded to explain bits.
- New claim c7 (unverified) covers the listed codes.

## Revision v3 (wave C)

Question simplified (prefix rule out of the stem; bit defined). Circles now read 'C 1' with 'The number is how many times the letter appears'; button renamed 'Join the two rarest'. Each leaf shows its cost (1x3=3) so the 4+4+3+3 sum is on the stage. Reveal quotes the learner's own total and codes, gives a prefix example, and no longer asserts optimality as seen (it says Huffman proved it). Not changed: no worse-tree comparison on stage; the learner sees their own total vs 14 only. Claims c2-c5 reworded, unverified.
