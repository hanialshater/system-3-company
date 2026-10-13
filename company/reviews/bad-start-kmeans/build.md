# Build note: bad-start-kmeans

- Intent: one number line with the points 0, 4, 6, 10, two triangle centres and assignment lines; Step, Run until settled, and ◀ ▶ nudges for each starting centre (each nudge resets to step 0).
- Key state: settled from the question's start (0, 4) (milestone "stuck-from-question-start"), reached by a single Step on the QA path.
- The reveal says whether the learner found the cost-16 grouping, and otherwise names a start that does (2 and 8). Ties go to centre 1; an empty centre stays put.
- After screenshots: no changes needed.

## v2 (revision 2026-10-13)

- Review: nudging the start by one unit always ended at the same clusters, so the learner concluded the start does not matter. Fix: preset buttons 'Start at 2 and 8' / 'Start at 0 and 4' (placed first after Step/Run) settle in one press; an 'Ends so far' line shows both outcomes; two milestones (stuck from 0,4; better from another start) gate the reveal; cost readout renamed 'lower = tighter'; hook no longer leaks. Reveal now quotes the learner's own 2-and-8 run.
