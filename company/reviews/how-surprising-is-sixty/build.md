# Build note: how-surprising-is-sixty (demo-builder, 2026-10-13)
- Intent: each press runs 250 seeded 100-flip batches (seed 100, untuned; max 1,000) into a histogram of head counts; a marker slider (50-75, starts at 60) shades the batches at or past it. "p-value" is defined on the stage once batches exist.
- Gate: 1 milestone, at least one run seen with the marker at 60 and at least one batch past it (seed 100 gives 5 of 250 on the first press).
- The reveal quotes the counts the learner last saw at marker 60 (stored when seen), the exact 2.84% from exactTail(), and the current marker's count if they moved it. QA path: run 250 (5 at 60+), slider to 62 (1 at 62+).
- Iteration after screenshots: y-scale now follows the current histogram (bars were flat at 250 batches).
- Distractors 0.3% and 30% are typed (tenfold either side); the answer is computed.
