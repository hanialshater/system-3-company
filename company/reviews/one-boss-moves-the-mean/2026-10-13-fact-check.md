# Fact-check: one-boss-moves-the-mean, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Salaries 30, 35, 40, 45, 50 (thousands) have mean 40 and median 40. | verified | Sum 200, mean 40; sorted middle 40. |
| c2 With the top salary at 500, the mean is (30 + 35 + 40 + 45 + 500) / 5 ... | verified | Sum 650, mean 130; median 40. |
| c3 The median stays at 40 for every boss salary on the stage (50 to 500),... | verified | Tabulated the stage's boss values 50,100,...,500 (slider min 50, max 500, step 50): median 40 in all ten; mean = 40, 50, 60, ..., 130; mean > 45 first at boss 100, so "once the boss earns 100 or more" is true at every stage step (strictly it is true from boss > 75, but the stage has no step between). |
| c4 The median depends only on the order of the values, so one extreme val... | verified | Median = middle order statistic, mean = sum/n: definitions. "Cannot drag it far" is true for a single outlier among five (median moves only to a neighbouring value); the Huber-Ronchetti breakdown-point citation was not re-read. |

Disputed: none. Withdrawn: none.

Reveal arithmetic (30+35+40+45+500)/5 = 130 matches c2.

## Learner-visible statements not previously recorded (added as unverified)

- c5 When one billionaire moves into a village, the median describes a typical villager's wealth better than the mean does. (recall card)

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 1 added unverified.
