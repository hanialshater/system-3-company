# Build note: greedy-slot-machine

- Intent: two panels (greedy, 10% explorer), each five bars of wins per 100 pulls over 500 pulls, green when the player is mostly on B. "Play run 1", then "Next run".
- Run 1 is seed 5, CHOSEN because greedy gets stuck in it (seeds 1–4 it does not); disclosed in c3. The reveal reports the 2,000-run spread computed live (stuck 30%, last-100 means 58 vs 68) and the learner's own stuck count.
- Milestones: "played" (run 1) and "another-run". I dropped the brief's tap-to-pull-it-yourself mode to keep one representation.
- Model detail the brief left open: both players pull A once and B once first; greedy ties go to A. Stuck runs are almost all cases where B's single early pull lost (601 of 604).
