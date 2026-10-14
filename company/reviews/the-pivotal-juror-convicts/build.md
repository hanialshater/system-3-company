# Build note: the-pivotal-juror-convicts

builder: ncm-p2 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card with no randomness.
- **Picture:** three juror figures (Juror 1, Juror 2 and You), each with a guilty or innocent vote pill.
- **Note:** says whether your vote matters.
- **Bar:** the chance of guilt from all three clues, assuming the others vote their clues.
- **Controls, in DOM order:** Juror 1 toggle, Juror 2 toggle, Your vote toggle.
- **Readouts:** the verdict, and whether your vote matters.
- **Milestones:** pivotal (both other jurors vote guilty) and decided (you flip your vote while pivotal, so the verdict changes).

## Answers re-run in node
Probability of guilt with 70%-reliable clues and a prior of 1/2:
- your innocent clue alone: 0.30
- plus two guilty clues: 0.70
- plus one guilty and one innocent: 0.30
- plus two innocent: 0.073

These match the brief.

## Known gaps
- The bar always shows the probability from all three clues, including the cases where your vote does not decide (7% and 30%). The reveal relies on two numbers: the 70% when your vote decides, and the 30% from your clue alone.
- Brief claim 3 (Feddersen-Pesendorfer: unanimity can convict more innocents) is not in the learner text. It is cited only in the source of claim c4.
- References use chapter 23 only. The unconfirmed sections were dropped.
- All claims are unverified.
