# Rituals

A ritual is a mechanism, an attempt to make a behaviour outlive the person who first cared about
it. Each one has an owner, a cadence, inputs, a template and a record. Start one with
`npm run company -- ritual <name>`. It creates `records/<date>-<name>.md` from the template and,
where the template asks, fills in the live operating snapshot. `npm run company -- rituals` shows
what is due.

Rituals also scar: a review added after one failure can outlive its reason by years. That is why
**Distillation Day** exists, and why every ritual below says what would justify removing it.

| Ritual | Cadence | Owner | Purpose | Remove it if… |
|---|---|---|---|---|
| Session handoff | every session | whoever worked | The next worker arrives knowing nothing; `ops/progress.md` is how they catch up | never; make it shorter instead |
| [Weekly Business Review](templates/wbr.md) | weekly | chief of staff, metrics by analytics steward | Read the numbers that matter and the anomalies; assign owners | it stops changing what anyone does next week |
| [Demo Crit](templates/demo-crit.md) | weekly | chief of staff convenes; quality reports first | Independent, pairwise judgement of lessons in review; kill, keep or revise | its verdicts stop predicting real-learner results |
| [Cycle Planning](templates/cycle-planning.md) | every 2 weeks | chief of staff | Turn OP allocation into board items; reserve exploration | — |
| [Pattern Review](templates/pattern-review.md) | every 2 weeks | pattern librarian | Move pattern confidence with evidence; scope, split or retire patterns | the library is stable for a quarter |
| [Distillation Day](templates/distillation.md) | monthly | pattern librarian + evaluation steward | Delete checks, rules and rituals that no longer earn their cost | — |
| [Creative Distrust](templates/creative-distrust.md) | monthly | pattern librarian | Reopen one refused idea or trusted pattern on purpose | — |
| [Operational Planning (OP)](templates/op-planning.md) | quarterly | head of product; founder ratifies | Written plan: goals, domain allocation, exploration budget, what we will not do | — |
| [Constitutional Review Board](templates/constitutional-review.md) | quarterly + emergencies | founder chairs; evaluation steward presents | Decide amendments to the judge, slowly | — |
| [Launch Review](templates/launch-review.md) | per launch | head of product chairs; release manager executes | Go/no-go against gates; committed predictions for the lesson | — |
| [Correction of Error (COE)](templates/coe.md) | per incident | the role nearest the failure | Ask why until the answers stop being about people; change a mechanism | — |
| [Retro](templates/retro.md) | after every wave | chief of staff | What helped, what hurt; every change alters a mechanism and has an owner | — |
| [Engineering Review](templates/eng-review.md) | per tier-2 change | principal engineer | Design and risk review of critical changes only (see `engineering/README.md`) | it reviews tier-0 work |
| [Offboarding](templates/offboarding.md) | when a role or worker leaves for good | the leaving role's manager | Ownership does not leave with the worker | — |
| [Domain Launch Review](templates/domain-launch.md) | per proposal | domain scout | Decide whether a new domain enters, incubates or waits | — |
| [Retirement Review](templates/retirement.md) | per candidate / quarterly sweep | category manager | Remove lessons that no longer relieve the problem they were made for | — |

Amendments use [templates/amendment.md](templates/amendment.md) and are filed in `../constitution/amendments/`.

## A week, in practice

| Day | What happens |
|---|---|
| Mon | WBR. The chief of staff reads `company status`, the analytics steward the metrics. Each anomaly gets an owner. |
| Mon–Thu | Work through the board. Every session ends with a handoff. |
| Thu | Demo Crit for everything that reached `review` this week. Evaluators report before anyone presents intent. |
| Fri | Launch Reviews for lessons whose gates pass; release. Every second Friday: Cycle Planning and Pattern Review. |
| Monthly | Distillation Day; Creative Distrust. |
| Quarterly | OP; Constitutional Review Board; retirement sweep. |
