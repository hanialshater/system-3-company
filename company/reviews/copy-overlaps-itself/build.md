# Build note: copy-overlaps-itself (algo-pair-10, 2026-10-14)

- Built from the brief (#37) and spec `company/design/specs/copy-overlaps-itself.md`. The spec drops the brief's encode mode; followed the spec, so there are only the six copy-step chips.
- Answer re-run in node (scratchpad `algo10-verify.mjs`): "ab", back 2, six one-letter copies gives abababab; sources are indexes 0..5, so steps 3-6 read letters written by this copy.
- Strip draws only written cells plus one dashed "?" cursor; its length is not shown before it is written. Chip k is enabled once frame k-1 was shown, so frame 6 cannot be reached without frames 1-5. Chips use aria-pressed and the `active` class.
- Milestones: `read-new-letter` (frame 3 shown), `eight-written` (frame 6 shown). Reveal quotes the decoded string, which exists on the stage at frame 6.
- Slide-in is a 250 ms CSS animation on the newly written tile, off under reduced motion.
- Reference only: TheAlgorithms/Python not pasted.
- meta.json v2 filled. 4 claims, all `unverified` (c3, c4 are source claims: Ziv and Lempel 1977, RFC 1951, 1952, 2083).
- Known: feed-chips QA failures are W-136.
