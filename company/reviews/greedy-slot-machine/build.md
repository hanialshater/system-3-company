# Build note: greedy-slot-machine

- Intent: two panels (greedy, 10% explorer), each five bars of wins per 100 pulls over 500 pulls, green when the player is mostly on B. "Play run 1", then "Next run".
- Run 1 is seed 5, CHOSEN because greedy gets stuck in it (seeds 1–4 it does not); disclosed in c3. The reveal reports the 2,000-run spread computed live (stuck 30%, last-100 means 58 vs 68) and the learner's own stuck count.
- Milestones: "played" (run 1) and "another-run". I dropped the brief's tap-to-pull-it-yourself mode to keep one representation.
- Model detail the brief left open: both players pull A once and B once first; greedy ties go to A. Stuck runs are almost all cases where B's single early pull lost (601 of 604).

## Revision v2 (wave C, 2026-10-14)

- Review (v1): stem mixed 'you' and 'a player', question and demo pointed at different numbers, lock-in told, hook leaked. Fix: question now asks how often greedy ends up stuck on A (the stage's own tally); 'Watch 100 more' builds the tally in one tap; the first pulls (A won/lost, B won/lost) are printed; readouts for average last-100 wins of both players; reveal quotes the learner's tally; 68 shown as arithmetic only.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
