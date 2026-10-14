# Evaluation: pairwise judging and the Bradley-Terry leaderboard

owner: head-of-evaluation (Tobias) · reports to: chief-product-officer (Margot) · since 2026-10-14 · decision: [2026-10-14-evaluation-org](../decisions/2026-10-14-evaluation-org.md)

The founder asked for it on 2026-10-14: *"I want to start a new org for evaluation, reporting to a new chief product in the CEO office. We want to pairwise-eval demos, have a Bradley-Terry leaderboard on multiple criteria, and show the BT with filters in HQ."*

This org **measures and ranks. It does not decide.** Gates belong to the evaluation steward and change only by amendment. Kill, keep or revise belongs to demo-crit, and publishing belongs to the release manager after the gates pass. A leaderboard rank is never a publish condition. It models which lesson the judges preferred. It is not evidence that anyone learned (Surface Value is measured with real learners).

## The org

```text
Founder
 └ Chief Product Officer (CEO office)        chief-product-officer · approves criteria and protocol changes
    ├ Head of Product                        head-of-product · unchanged scope, now reports here
    └ Head of Evaluation                     head-of-evaluation · criteria, protocol, sampling, calibration, leaderboard
       ├ Pairwise Judge (many in parallel)   pairwise-judge · judges blinded A/B pairs, one sentence per criterion
       └ Evaluation Engineer                 evaluation-engineer · tools/eval/** (validator, BT fit, leaderboard) + HQ data, with hq-engineer

Evaluation Steward (founder direct, constitutional), unchanged
 └ Pedagogy Critic (constitutional, demo-crit witness), unchanged
```

**How it relates to the constitutional quality roles**
- **evaluation-steward** still owns the gates, `tests/qa/**` and the independence rules (`company/reviews/README.md`). This protocol follows those rules and adds nothing that overrides them. If the evaluation org finds that a gate or rule should change, it writes an amendment proposal and routes it to the steward.
- **pedagogy-critic** stays under the steward as a witness at demo-crit, where it gives one overall preference with reasons and a kill/keep recommendation. Its `company/reviews/<slug>/<date>-pairwise.md` records **may be ingested** into the leaderboard. The head of evaluation decides which ones and records the decision in the round record. A critic record is ingested only if it was blind (rule 3 below) and only under the criterion it actually answered. By default "which to give a first-time learner" maps to `learning` and to nothing else. Ingested lines use `"judge":"pedagogy-critic"`.

## Criteria

[`criteria.json`](criteria.json) is an array of `{ "id", "name", "question" }`. The head of evaluation proposes changes and the chief product officer approves them, each with a decision record. Never reuse a criterion id for a different question. Retire the old id and add a new one, so old records keep their meaning.

| id | question |
|---|---|
| learning | Which would teach a first-time learner more? |
| shown-not-told | In which does the stage itself show the payoff, rather than the text telling it? |
| prediction | Which prediction question better surfaces the misconception, without giving away the answer? |
| clarity | Which is easier to follow on a phone? |
| engagement | Which would a learner more want to finish? |
| trust | Which states only what it can support, with its limits visible? |

Builders do not get the criteria as a rubric (demo-crit rule 5). Briefs and builder prompts must not quote them or cite leaderboard positions.

## Protocol

1. **Artifact first.** Every judgement starts from walkthrough artifacts (`npm run walkthrough -- <slug>` → `artifacts/walkthroughs/<slug>/transcript.md`, step screenshots, `sheet.png`). Judges read nothing else about either lesson.
2. **Blind A/B.** The head of evaluation builds a packet per pair in `artifacts/pairwise/<run>/<pair>/`, with the two artifacts copied as `A/` and `B/`. The left/right order is randomised per pair. Packets carry no builder, branch, version number, date, leaderboard position or earlier verdicts. Two different lessons cannot hide their topics, so blind here means **no authorship, no recency and no rank**.
3. **What a judge never sees:** `build.md`, `design.md`, other reviews, the leaderboard, earlier pairwise records, git history, or which version is newer. A judge never judges a pair containing a lesson it built or revised. If a packet leaks any of these, the judge stops and reports it, and the pair is rebuilt. A record is `"blind": true` only if all of this held. Any judgement made with knowledge of authorship, recency or rank is recorded `"blind": false`, and the fit may exclude it.
4. **Every criterion, every pair.** For each criterion the judge picks `a`, `b` or `tie` and writes **one sentence** naming what it saw in the artifact. "B's slider moves the bars as you drag, so the payoff appears without text" is a reason. "B is clearer" is not. Ties are allowed and expected when the artifacts do not separate. There are no scores.
5. **Reasons are the payload.** They go back to builders (after the round, never as a rubric before a build) and to demo-crit as context.
6. **Records are append-only.** Nobody edits a verdict. The head of evaluation can exclude a line from the fit by listing its `id` and the reason in the round record.
7. **No decisions.** The output is records and a leaderboard. Using either for a publish, kill or keep decision belongs to the steward's gates and to demo-crit.

### Sampling (which pairs next)
The head of evaluation chooses pairs to tighten the fit where it matters, in this order:
- **New versions:** a lesson's new `meta.json` `version` against its previous version and against its two nearest neighbours.
- **Uncertain neighbours:** adjacent items whose intervals overlap most on any criterion.
- **Connectivity:** items or clusters that have never been compared with the main graph. Ranks across disconnected components mean nothing.
- **Calibration share:** about 20% of each round goes to repeats. Some repeat a pair with A/B swapped (position bias). Some repeat a pair with a second judge (agreement). Results go to `calibration/<date>-<run>.md`.

### Calibration and judge bias
Track per round: agreement between judges, the position-bias rate (how often the verdict flips when A/B swap), the tie rate, and the share of wins that went to the lesson with the longer transcript (length bias). Judges are models from the same family as the builders, so the leaderboard measures *model* preference until real-learner results corroborate it. Report it that way.

## The record format (fixed; tools/eval depends on it)

One JSON object per line in `company/evaluation/pairwise/<YYYY-MM-DD>-<run>.jsonl`:

```json
{"id":"<run>-<n>","date":"YYYY-MM-DD","judge":"<role or agent id>","criterion":"<criterion id>","a":"<slug>@v<version>","b":"<slug>@v<version>","winner":"a"|"b"|"tie","reason":"<one sentence>","artifacts":["artifacts/walkthroughs/<slug>/..."],"blind":true}
```

- `id`: unique across all files. `<run>` matches the filename's run part, and `<n>` counts from 1 within the run.
- `judge`: the role (`pairwise-judge`, `pedagogy-critic`) or a dispatched agent label. Judge-level calibration only works if this identifies the instance, so use the agent label when there is one.
- `criterion`: an `id` from `criteria.json`.
- `a`, `b`: `<slug>@v<version>`, where `version` is the lesson's `meta.json` `version` at the time its walkthrough was captured. `a` and `b` are what the judge saw as A and B. They differ.
- `winner`: `"a"`, `"b"` or `"tie"`.
- `reason`: one sentence.
- `artifacts`: the walkthrough files the judge saw, for both sides. `artifacts/` is not committed, so these are pointers for the round, not a permanent archive (see the open questions in the decision record).
- `blind`: `true` only if protocol rule 3 held.

A pair judged on six criteria produces six lines. The validator and fit live in `tools/eval/` (evaluation-engineer). The HQ leaderboard page reads the generated output (hq-engineer, filters by criterion, domain, judge, date and version).

## Files

| Path | What | Owner |
|---|---|---|
| `criteria.json` | the criteria | head-of-evaluation proposes, chief-product-officer approves |
| `pairwise/<date>-<run>.jsonl` | pairwise records, append-only | head-of-evaluation writes them from judges' verdicts |
| `rounds/<date>-<run>.md` | round record: pairs and why, judges, exclusions with reasons, what moved | head-of-evaluation |
| `calibration/<date>-<run>.md` | agreement, position bias, length bias | head-of-evaluation |
| `tools/eval/**` | validator, Bradley-Terry fit, leaderboard | evaluation-engineer |

A round runs by [`../rituals/templates/pairwise-round.md`](../rituals/templates/pairwise-round.md).
