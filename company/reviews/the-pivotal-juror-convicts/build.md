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

## Pre-flight v3

Changes for r6 (knows-bayes, revise): each juror now shows a dashed **clue** chip and a filled **vote** tag. Your clue is fixed at "innocent" and your vote is free, so "Flip your vote" changes the verdict and leaves the clue-based bar alone (top finding). The bar reads "Chance of guilt from the three clues". The question now states the 50/50 prior (moderate finding). After the commit, a line under the bar reads "Your clue alone: 30%. Votes are not clues." The reveal points at it (minor). The buttons no longer relabel themselves: "Flip Juror 1's clue", "Flip Juror 2's clue", "Flip your vote", each with aria-pressed. Residual: the slug "the-pivotal-juror-convicts" says "convicts", which leans toward the 70% answer. The title does not. A slug rename is a learning-designer or category-manager call. Not built, typechecked or QA'd (batch instruction).

1. **Title and hook.** "The juror whose vote decides" / "Your clue says innocent. Is voting innocent the rational thing to do?" No figure. The hook questions sincere voting, which hints that the answer is not 30%, but it does not pick between 50% and 70%.
2. **Options.** "30%", "50%", "70%": same precision.
3. **Locked stage.** All three clue chips and votes innocent, bar "from the three clues: 7%", note "One innocent vote already acquits…", readouts Acquit / No. The "your clue alone" line is hidden until the commit. Nothing reads 70%.
4. **Reveal values.** "both other jurors voted guilty" and "pivotal": (b) milestone pivotal. "the bar read 70%": (a) guilt(2, 1), which is what the bar shows in the pivotal state on the required path. It stays at 70% after "Flip your vote", because a vote is not a clue. "Your clue by itself gives only 30%": (a) guilt(0, 1), on the fixed line under the bar.
5. **QA path.** Flip Juror 1's clue (30%), Flip Juror 2's clue (pivotal, 70%), Flip your vote (decided, Convict, bar still 70%). Both milestones in three presses. When the reveal opens, the stage shows clues G, G, I, votes G, G, G, the bar at 70% from clues, and "Your clue alone: 30%".
6. **Reset.** No Reset control. Reveal (traced from code, not run): "Your vote changed the verdict only when both other jurors voted guilty. In every other case one innocent vote already acquits, whatever you do. / The others vote their clues, so in that pivotal case you know two clues said guilty. Two guilty clues against your one innocent clue make the bar read 70%, the same as one guilty clue alone. Your clue by itself gives only 30%, the line under the bar. Your vote moves the verdict, never the bar: it is not a clue. / Voting your clue ignores what being pivotal tells you. A juror who asks 'what if my vote decides?' uses evidence the sincere voter throws away." It matches the final stage.
