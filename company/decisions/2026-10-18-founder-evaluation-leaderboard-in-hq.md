# Founder: the evaluation org's Bradley–Terry leaderboard in HQ, and the merge to the default branch

owner: chief-of-staff · date: 2026-10-18 · status: decided
class: product
route: founder → chief-of-staff (records, dispatches) → hq-engineer (ports the page, tools and records) → chief-of-staff-ceo-office (ports the four roles) → evaluation-steward (independence check)
recorded by: chief-of-staff

## What the founder said

> "I didn't get the screenshots, this is eval not personalization right? We will have both? Where is bradly terry score per demo?"
> "Ok will take your recommendations"  (founder, conversation, 2026-10-18)

The recommendations accepted: (1) bring the evaluation org's work (decision company/decisions/2026-10-14-evaluation-org.md on branch `ccr-rnd-ncm`, never merged) into HQ as its own Evaluation tab beside Personalization, by porting only its pieces (HQ page, `tools/eval/`, `company/evaluation/` records with round 1's 144 blind judgements and six criteria, tests, the four roles), not by merging that branch (1,080 commits ahead of the default branch); (2) merge the default branch `ccr-4c6c7654-ew9ko1` into the work branch properly (renumber this branch's 170 colliding board ids except frozen records; regenerate the catalogue-dependent personalization data; the learner-model-engineer decides whether the simulator pins its catalogue), then open the PR.

## Objections

- **chief-of-staff:** round 1 is 144 records from 8 judges on 2026-10-14; a leaderboard from it is thin and the catalogue has since grown. **Answer:** the page shows intervals and record counts as the evaluation README requires, and states the round date; new rounds are the head of evaluation's to run.
