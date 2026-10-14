# Build note: two-writers-one-counter (demo-builder, 2026-10-13; sonnet build, EXP-003, queue)

- Intent: two lanes of three steps (read, add 1, write) for threads A and B, a shared counter, and a "holds" register per thread. Presets "Both read first" (counter 1) and "One at a time" (counter 2); Step A / Step B let the learner interleave by hand; Start over clears the run.
- Milestones: "one" and "two", reached when a full run ends at 1 and at 2. QA presses the two presets first, so both are reached; the reveal names only those two outcomes, kept in the text, not in resettable state.
- Question wording fixes the order (A reads, B reads, A adds and writes, B adds and writes), the same as the "Both read first" preset.
- Of 20 interleavings, 18 give 1 and 2 give 2 (script).

## Revision v2

Learner review 2026-10-13. Added a line listing the steps in the order they ran ("A reads, B reads, A adds ..."), so the interleaving is visible after either preset. "holds" is now a larger "copy" so the private copy is the most visible number. Hook asks what the counter ends at. c5 back to unverified. The stale "0/5 claims checked" footer in the review was a build issue, not in the lesson.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: 'Order run' line replaced by a step trace (A copy, B copy, counter per step); a stale copy (read before the counter last changed, not yet written) is red and says 'stale'; the lost write's counter cell is red. Milestone 'one' needs a finished run with a lost write. 'thread' glossed in the stem; title says threads.
- Claims reopened (status unverified): c1, c5; new c6.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.
