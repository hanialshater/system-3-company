# Build note: last-survivor-is-not-the-most-common (demo-builder, 2026-10-14, wave J cs)

- Format: single card, presets Run stream 1, Count again, Run stream 2, Step, Reset (DOM order = QA path).
- Stage: the stream as seven letter tiles (A filled, B outlined, C dashed: shape before colour); processed tiles dim and show "candidate:counter" after them (12 px), a pointer marks the next tile. Readouts Candidate and Counter; a second-pass line ("C: 2 of 7 · not a majority · A had 3" / "A: 5 of 7 · majority"); trace "stream 1 → C (2 of 7; A had 3) · stream 2 → A (5 of 7)" survives Reset.
- Brief reading: Run stream 2 shows its second-pass count at once (the brief gives its readout with the run); Count again is the step for stream 1. Step processes one tile of the current stream; Reset returns to stream 1, nothing processed.
- Numbers: `model.ts`; node 2026-10-14: stream 1 counters A1 A2 A3 A2 A1 A0 C1 (final C), stream 2 A1 A2 A1 A2 A1 A2 A3 (final A, 5 of 7).
- Milestones (3): survivor-C, checked-none, majority-found.
- The method's name (Boyer-Moore, MJRTY) is not shown to the learner; c5 records it for the fact-checker.
- All claims unverified.

## Pre-flight

1. Title and hook: "Who is left standing?" / "One candidate, one counter, seven items. Which item survives the cancelling?" No letter named.
2. Options: "A", "B", "C". Same form.
3. Locked stage: the seven stream-1 tiles, pointer at the first, Candidate "–", Counter 0. No tile marked.
4. Reveal values: C, "A appeared 3 times and C only 2" (milestone survivor-C, from model), "2 of 7" (milestone checked-none), "5 of 7" (milestone majority-found). All in the trace when the reveal opens.
5. QA path: Run stream 1 (survivor-C), Count again (checked-none), Run stream 2 (majority-found), Step (disabled at the end of a stream, so skipped), Reset.
6. Reset: reveal after Reset: "Stream 1 left C as the candidate, though A appeared 3 times and C only 2. Each −1 cancels two different items. With no item in more than half the stream, whatever survives proves nothing, and the second count showed C in only 2 of 7. / In stream 2, A filled 5 of 7 places, and that many copies cannot all be cancelled, so A survived. One counter finds a majority if there is one; a second pass checks that there is." Every number is in the trace.
7. Phone fit: see the "Measurement" line below.
