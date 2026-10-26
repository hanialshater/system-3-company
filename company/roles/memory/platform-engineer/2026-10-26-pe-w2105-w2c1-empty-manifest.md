### 2026-10-26 · pe-w2105-w2c1-empty-manifest · platform-engineer
- did: W-2105 W2-C1: gate tests take entries from a frozen re-hashed fixture, not the committed manifest; empty-manifest test; 33 pass in 6 states
- learned: A gate fix's own output state (a pruned, empty manifest) must be run through the gate suite, not only check and build (company/engineering/reviews/2026-10-26-lesson-frames-code-review.md)
- know: Mutation tests use tests/lesson-frames/fixture.manifest.json via fresh(); refresh it from a real build if no entry stays publishable (tests/lesson-frames/manifest.test.mjs)
- open: principal-engineer re-reads W2-C1; W-2105 in review (company/ops/board.json)
