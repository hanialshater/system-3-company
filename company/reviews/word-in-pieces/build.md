# Build note: word-in-pieces

- Intent: one row of token boxes for the current word (multi-letter pieces tinted). Piece toggles un / happi / ness (single letters always in the vocabulary), word picker unhappiness / zyxxy, Tokens readout. Locked: the word is shown unsplit and the count is hidden.
- Key states (milestones): "pieces-off" (unhappiness split with all three pieces off: 11 tokens) and "rare-word" (zyxxy shown: 5 tokens). QA path: un, happi, ness (all off → 11), then zyxxy.
- Question options computed from tokenize(): 11 (Q_NONE), 3 (Q_ALL), 1. Reveal quotes only states reached (sawNone / sawRare flags).
- Node check: un | happi | ness = 3; no pieces = 11; zyxxy = 5; recall: play|ing = 2, q|w|z|ing = 4.
- c4/c5 are about real systems (Sennrich et al. 2016; Kudo & Richardson 2018). The toy's greedy longest-match rule is not how BPE applies merges (said in c3's source).

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. Question defines a token. Each box now shows a piece number (#412, #7031, #1297; letters 1 to 26, made up and labelled) instead of its position, so 'a row of numbers' is visible. The first unlocked state is the 3-token split. New claim c6 (token, made-up ids) and c4 reopened, both unverified.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
