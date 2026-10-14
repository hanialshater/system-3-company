# Build note: undo-a-bad-push (demo-builder, algo-builder session, 2026-10-14)

- Design intent: s, a, b, t with five 1-unit pipes; route buttons push one unit; full pipes refuse with the pipe named; the send-back route is its own button and only enables after the zig-zag; the s-cut appears at total 2.
- Reveal gate (2 milestones): stuck at 1 after s-a-b-t, then 2 via send back. A learner who pushes s-a-t and s-b-t first reaches 2 without the trap; the hint says to push the zig-zag first and 'Empty the pipes' resets.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.

## Revision v2 (batch 02, 2026-10-14)

The prediction now tests the misconception (push, never take back: how much reaches t?), answer "1: stuck". The repair button is named as a route back along a-b and the stuck message says a route may run backwards. "Cut" is defined in the reveal. c2, c3 reworded, unverified. Not done: letting the learner tap the a-b pipe itself to send water back.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.

## Revision v3 (wave D r5, 2026-10-14)

Named rescue route removed; once pipes carry water the learner picks which pipe to send a unit back along (only a-b helps; others say why not). Stuck caption no longer says routes may go backwards. Hook neutral. Reveal points at the dashed cut; Ford-Fulkerson sentence dropped (c4 removed). Reopened c2, c3; added c5.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.
