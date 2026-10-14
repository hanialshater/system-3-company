# Build note: bisect-the-bad-commit (demo-builder, 2026-10-13)

- Design intent: one strip of 1,000 versions. The suspect range is coloured; every test leaves a tick (green works, red broken). Readouts: suspects, tests, last test. Buttons: "Test the middle: v500" (step), "Keep halving to the end" (instant jump, no animation), "Test the next one: v2" (the one-by-one contrast). When found, the first button becomes "Start again".
- Key state: suspects halved once, then under 10. Milestones ["halved", "under-10"], minInteractions 2. QA path: Test the middle (999 → 500), Keep halving (→ 1, v737 after 10 tests); "next one" is disabled once found.
- Numbers: question's 1,000 and option 10 come from N and WORST = ceil(log2 999); the reveal quotes the learner's own suspect sequence and test count, and the one-by-one cost BAD − 1 = 736. Brief answer (A, 10) re-computed over all 999 positions in Node: max 10.
- Disclosure: first broken version fixed at v737 so QA reproduces; 974 of 999 positions take 10 tests (claim c1).
- Deviation from brief: no tapping arbitrary versions on the strip (1,000 versions on a 300 px strip is 3 per pixel on a phone); the learner chooses middle vs next instead.
- The brief's "1000 -> 500" is 999 -> 500 here: suspects are v2..v1000 because v1 is known to work.
- After screenshots: "Test the next one" kept a stale version number once found; the label now drops it.

## Revision v2 (wave C, learner review)

- Hook leaked '1,000 is not the answer': now 'How many tests find the first bad one?'.
- Reveal quoted a chain the stage skipped: the stage now prints the suspects chain (e.g. 999 → 500 → ...) under the strip after any test or after 'Keep halving to the end'.
- 736 never displayed and powers of two unexplained: the reveal says 'up to 998 tests' and '9 halvings only handle 512 suspects, 10 handle 1,024'; c1, c2, c3 rewritten.
- Worst case vs one run: the reveal says 'wherever the first broken version is'.

All changed claims are unverified, awaiting a fact-checker.
