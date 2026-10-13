# Build note: alias-wave-wagon-wheel (demo-builder, 2026-10-13; sonnet build, EXP-003, queue)

- Intent: one picture over one second: the cosine (solid), 6 sample dots (5 per second plus the end point), and the lowest-frequency wave through the same dots (dashed green) drawn only when it differs. Slider 0.5-4 Hz plus preset buttons 4 Hz and 2 Hz placed first in DOM order so QA reaches the question's 4 Hz.
- Milestone: "fast-wave" fires when the wave is set to exactly 4 Hz (the value the question and reveal quote).
- The brief's third claim (CD at 44.1 kHz) is left out of the learner text to keep the reveal under budget.
- 'Same dots as' is hidden while locked; the alias is |f - 5 round(f/5)|.
