# Build note: one-bit-avalanche (demo-builder, 2026-10-13)

- Design intent: the message "cat" as 24 tappable bits (3 rows of 8, letter shown beside each row) above a 16 x 16 grid of SHA-256 output bits. Each tap flips one message bit, recomputes a real SHA-256 (sha256.ts, synchronous) and lights the output bits that changed on that tap, with a count ("126 changed").
- Key state: three single-bit flips, each changing roughly half the grid. Milestones ["flip-1", "flip-3"], minInteractions 2. QA path: message bits 1-16 in turn (counts 129, 112, 129, 131, ... 126; all listed in claim c2).
- Numbers: 256 and 128 in the question/options derive from OUT_BITS; the reveal quotes the learner's own counts and their mean. Brief answer (B, about 128) re-computed: 1,000 random one-bit flips in Node gave mean 127.7 (range 103-157).
- Implementation check: sha256.ts matches the FIPS "abc" vector and Node crypto on 200 inputs (claim c3).
- Locked: no count shown until the first tap; the grid shows the hash of "cat" with nothing highlighted.
- Deviation: no free-text input; letters that become unprintable after a flip show as "·".
- After screenshots: reads on phone; no changes.

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. Question defines a hash as a fingerprint used to check a message. The dot glyph is explained. A running 'changed per tap' line shows each tap re-rolls about half. Reveal's nudge sentence rewritten to what the taps showed. c4, c5 reopened and new c6, unverified.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
