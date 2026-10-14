# Build note: one-shy-rioter-stops-the-riot

builder: ncm-m1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report
brief: company/domains/briefs/math.discrete.md, "## Course: NCM (2026-10-14)" #3 (accepted version)

## What was built
Single card with Step. A 10 x 10 grid of 100 people, each labelled with their threshold (0..99). Everyone sees everyone. The controls are Run to end, the toggle "Make the '1' a '2'" / "Put the '1' back", Step and Reset. The changed person gets an amber outline. Each person who will join next round gets a dashed outline. The note names the next count needed ("1 joined. Next: anyone needing 1 or fewer"), or says "Stuck at 1: everyone left needs more than 1". The readouts are Joined, Round and Avg threshold (49.50 against 49.51).
The state is (crowd, round), and the toggle keeps the round. So after Run, the toggle is a before/after of the two end states (100 against 1).
The why on stage: the per-person thresholds and the "next" highlight. In the changed crowd there is no 1 left, which is the missing link the reveal names.
Milestones: full-riot (original crowd at its end, 100 joined) and stalled (changed crowd at its end). QA path in DOM order: Run, then the toggle, which reaches both.

## Answers re-run in node (Demo.tsx joinRounds(), extracted)
- Thresholds 0..99: 100 join, one per round, 100 rounds. With the 1 changed to 2: 1 joins. Means 49.5 and 49.51.
- Extra: raising any one threshold j to j+1 stops the crowd at exactly j (j = 0, 1, 2, 10, 50, 98, 99).
- Recall (0..49 with the 10 changed to 11): 10 join.

## Known gaps
- Not run: next build, tsc, QA, walkthrough (per dispatch).
- The Granovetter attribution (c5) is cited from the brief and not opened, so its support is "source". All claims are unverified.
