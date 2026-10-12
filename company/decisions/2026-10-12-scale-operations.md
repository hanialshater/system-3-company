# Scale operations: waves, briefs files, batched checks on a different model

owner: chief-of-staff
date: 2026-10-12
status: decided · revisit after wave 2

## Context (what the first run showed)
- Building cost about 43k tokens per lesson (4 per builder). Checking one lesson cost about 155k (fact-check 70k + learner review 85k), so checking was the bottleneck. This is the book's Thesis 1, observed.
- All four builders hit the same kit defect (slider tap target) and each worked around it. Platform should have caught it before dispatch.
- Builders and checkers skipped the board and progress log because their briefs said "edit nothing else". With parallel agents, shared files conflict on merge.
- The registry conflicts on every merge; regenerating it resolves the conflict.
- The fact-checker found 5 unrecorded claims in one lesson, and the learner review found that the lesson told, rather than showed, half its objective. Both checks earned their cost.

## Decision
1. **Briefs before builds.** Each category manager keeps `company/domains/briefs/<domain>.md`: a ranked list of lesson briefs (slug, concept, learner boundary, misconception, prediction idea). Builders take briefs from the top. This replaces putting briefs on the board, which conflicted.
2. **Waves.** A wave is one builder per domain, working in its own worktree, taking about 10 briefs. Merge, regenerate the registry, and run `npm run verify` once on the integrated tree.
3. **Batched checks per domain** on `model: sonnet`, a different model from the builders. That is cheaper, and it adds a little model diversity: the checker shares less with the builder than a copy would. One fact-checker and one learner evaluator per domain per wave, working from `npm run walkthrough -- --domain <d>`.
4. **Shared files are written only by the chief of staff:** board.json, progress.md, the registry. Subagents write only their own lesson folder and review records.
5. **Kit first.** Before a wave, the platform engineer builds one lesson with any new kit feature (the geo kit: `mercator-greenland`) and runs QA, so defects are found once.
6. **Wave launch review.** One launch-review record per wave lists every lesson whose gates pass. Lessons with a fatal finding stay in review and their findings go to the next wave's builder.

## Rests on
Token and duration figures from the founding session's agent reports; `company/reviews/merge-sort-payoff/`.

## Revisit if
- Sonnet checkers miss errors that a later real-learner session or COE finds. Count them, by checker model.
- Per-lesson checking cost is still above building cost after batching.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| Batching a whole domain in one reviewer context recreates shared context: the reviewer's view of lesson 1 colours lesson 7 | evaluation-steward (self-review of this plan) | evidence | open, funded: compare a sample of batched reviews with single-lesson reviews in wave 2 |
| A cheaper checker model may verify things it should dispute | founding review | evidence | accepted with mitigation: derivation claims must be re-run, not reasoned about; a disputed claim still blocks |
