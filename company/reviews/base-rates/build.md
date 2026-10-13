# Build note: base-rates

(No v1 build note was written. This file starts at the revision.)

## v2 (revision)

Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state (earn-the-reveal): a full town of 1,000 tested at the question's own setting, 1 in 1,000. One milestone (`tested-1-in-1000`, `useMilestones`), `minInteractions = 1`. Nothing else calls `interact()`.

| Finding | What I did |
|---|---|
| Learner FATAL / 1: the reveal was reachable at 1 in 10, where "99 of 108 are sick" confirms the wrong answer | The reveal now unlocks only after 1,000 people are tested at 1 in 1,000. The other diseases are locked until then ("Disease:" becomes "Now compare:"). In the reveal phase the stage goes back to the tested 1-in-1,000 town, so the picture matches the text even if the learner last looked at 1 in 10. |
| 2: the hint did not send the learner to 1 in 1,000 | Hint: "At 1 in 1,000, fill the town, test everyone and count the positives. Then compare." 1 in 1,000 is already the default and the only setting open. |
| 3: the one true positive is lost among 1,000 cells | When there are 10 or fewer true positives, each one gets a red ring. At 1 in 10 (99 of them) there are no rings, so the grid stays readable. |
| 4: "catches 99% ... clears 99%" is hard to parse | Question: "A test flags 99% of sick people, and wrongly flags 1% of healthy people." Same meaning as c1, so c1 keeps its status. |
| 5 / fact-check F1: the Harvard 2% looks like it contradicts 9% | The reveal now says "(a test that wrongly flagged 5% of healthy people)" and "The right answer, if the test catches every case, was about 2%." c6 reworded to match, so it goes back to unverified. |
| 6: the "sick, missed" colour is nearly invisible and never explained | Darker fill with a dashed red outline. Legend now says "sick, tested negative". |
| 7: unclear that you can change disease and test again after "Hide results" | Test results stay on when the disease chip changes, and the chip row label "Now compare:" invites it. Not fully solved: "Hide results" is still a toggle. |
| Fact-check F2 (put 27/60 and 11/60 in c6's source once the paper is opened) | The secondary counts are in c6's source and marked as secondary. Opening NEJM is the fact-checker's job, not mine. |
| numbers-from-the-stage | The reveal's counts (11 positives, 1 sick; 10 of 20; 99 of 108) come from `counts()`, which uses the same `town()` that draws the grid. Recorded as new claim c9 (unverified). |

Claims: c6 changed (now unverified). c9 added (unverified). The rest are unchanged.

QA-path trade-off: the contract presses each control once in DOM order. The disease chips now sit *after* "+100 / Fill to 1,000 / Test all", so the contract fills the town, tests it at 1 in 1,000, reaches the milestone, and only then presses 1 in 100 and 1 in 10. A real learner can reach the key state with two taps (Fill, Test). Locking the comparison chips costs some freedom: a learner cannot look at 1 in 10 first.
