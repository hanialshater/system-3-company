# Build note: two-writers-one-counter (demo-builder, 2026-10-13; sonnet build, EXP-003, queue)

- Intent: two lanes of three steps (read, add 1, write) for threads A and B, a shared counter, and a "holds" register per thread. Presets "Both read first" (counter 1) and "One at a time" (counter 2); Step A / Step B let the learner interleave by hand; Start over clears the run.
- Milestones: "one" and "two", reached when a full run ends at 1 and at 2. QA presses the two presets first, so both are reached; the reveal names only those two outcomes, kept in the text, not in resettable state.
- Question wording fixes the order (A reads, B reads, A adds and writes, B adds and writes), the same as the "Both read first" preset.
- Of 20 interleavings, 18 give 1 and 2 give 2 (script).
