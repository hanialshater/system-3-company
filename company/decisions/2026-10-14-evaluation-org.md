# Decision: a Chief Product Officer in the CEO office, and an Evaluation org under it

owner: chief-product-officer (Margot) · date: 2026-10-14 · status: accepted (founder request); consultations with directs pending · decided by: founder · drafted by: chief-of-staff-ceo-office (Leonie)

## Founder request (verbatim, 2026-10-14)
> "I want to start a new org for evaluation, reporting to a new chief product in the CEO office. We want to pairwise-eval demos, have a Bradley-Terry leaderboard on multiple criteria, and show the BT with filters in HQ."

The founder asked for these roles directly, so the founder has decided (company/ceo-office/org-change-process.md). Consultation does not reopen the decision. It settles placement and handoffs, and records objections.

## What was created (tools/org/roles.mjs, regenerated)
| Role | Persona | Team | Reports to | Owns |
|---|---|---|---|---|
| `chief-product-officer` | Margot | leadership (CEO office) | founder | Product outcomes across lessons. Directs the product org and the Evaluation org. Approves criteria and protocol changes. Keeps the leaderboard an input, not a gate |
| `head-of-evaluation` | Tobias | evaluation | chief-product-officer | Criteria (proposes), the pairwise protocol (blind A/B, artifact first, reasons kept), sampling (uncertain neighbours, new versions, connectivity), judge calibration and agreement, the leaderboard, pairwise rounds |
| `pairwise-judge` | from the pool (many run in parallel) | evaluation | head-of-evaluation | Judges one blinded pair on every criterion: winner a, b or tie, plus one sentence per criterion. Never sees builder notes, the leaderboard or which version is newer |
| `evaluation-engineer` | Anya | evaluation | head-of-evaluation | `tools/eval/**`: record validator, Bradley-Terry fit with intervals, generated leaderboard. Supplies the data for the HQ page, which hq-engineer builds |

Contract docs: `company/evaluation/README.md` (org, protocol, record format), `company/evaluation/criteria.json` (six criteria), and the ritual `company/rituals/templates/pairwise-round.md`. Persona names were added in `tools/org/people.mjs`, and `pairwise-judge` joined the `MANY` set so each dispatched judge gets its own name in HQ.

## Reporting lines and what changes for head-of-product
- `head-of-product` (Priya) now reports to `chief-product-officer` instead of the founder. **Her scope, authority, rituals and directs do not change.** She still owns vision, roadmap, PRDs, slot allocation and product decision records, and she still decides at demo-crit (the template says "decides: head-of-product"). The changes are these:
  - she is no longer a founder direct. The directs list in `company/ceo-office/org-change-process.md` now names Margot, with a note to keep consulting Priya on lessons, product and categories;
  - a product trade-off that crosses product and evaluation goes to Margot before it goes to the founder;
  - Surface Value proposals still go to the founder for ratification, now through Margot.
- Everything under head-of-product (categories leads, design, courses, analytics steward, growth, principal-pm-verticals) moves up with her. No other reporting line changes.
- **Not moved (constitutional):** `evaluation-steward` stays a founder direct and keeps the gates, `tests/qa/**` and the independence rules. `pedagogy-critic` stays under the steward as a demo-crit witness. Neither role's entry in `roles.mjs` was edited, because changing their authority is an amendment.

## How the new org relates to the quality roles
- **The Evaluation org decides nothing about shipping.** No publish, kill or keep decision comes from it. Several roles carry this in their `mayNot`: chief-product-officer may not make a rank a publish or kill condition, head-of-evaluation may not treat a rank as a gate, and evaluation-engineer may not make the leaderboard a gate in any tool.
- **pedagogy-critic records may be ingested.** The head of evaluation decides which, and records it in the round record. Only blind ones count, and only under the criterion they answered (by default `learning`), with `"judge":"pedagogy-critic"`.
- Findings that suggest a gate or independence rule should change go to the evaluation steward as amendment proposals.

## Decisions made while implementing (beyond the founder's words)
1. **Team and room.** The CPO sits in team `leadership` with the other CEO-office roles (vp-rnd, chief-of-staff-ceo-office, portfolio-manager). The three evaluation roles form a new team, `evaluation`. No HQ room was assigned. That belongs to hq-engineer, and `src/app/hq/**` is being built in parallel.
2. **Judges write verdicts, the head writes records.** A judge writes `verdict.json` into its blinded packet (`artifacts/pairwise/<run>/<pair>/`). The head of evaluation maps A/B back to slugs and appends the `.jsonl`. This keeps slugs, versions and earlier records out of the judge's view.
3. **Blind is defined as no authorship, no recency, no rank.** Two different lessons cannot hide their topics.
4. **Criteria ids are never reused** for a different question. A changed question retires its id, so old records keep their meaning.
5. **criteria.json content.** The evaluation engineer had created a placeholder `criteria.json` with the same six ids and different wording. It was overwritten with the founder-brief wording. The ids did not change, so `tools/eval` is unaffected.
6. **About 20% of each round goes to calibration** (A/B-swapped repeats and second-judge repeats). This is a starting point for the head of evaluation to tune.
7. **Judge tools are read and write only**, with no Bash, so a judge cannot run git log or open the leaderboard by accident.

## Objections (travel with the decision)
1. **Overlap with pedagogy-critic** (Leonie). Two roles now make pairwise judgements, so we risk two pairwise systems that disagree. *Answer:* the roles have different jobs. The critic is one witness in demo-crit, gives one overall preference, recommends kill or keep, and sits under the steward for independence. Judges produce per-criterion volume for a ranking and recommend nothing. Critic records can flow into the leaderboard, but the reverse never happens: judges never see critic records. *Open:* if, after three rounds, the critic's overall verdicts agree with `learning` judgements no better than chance, the head of evaluation raises it with the steward rather than quietly dropping critic ingestion.
2. **Judge-model bias** (Leonie). Judges, builders and the pedagogy critic are all models from the same family. The leaderboard may reward what the builder model tends to produce (length, a house style), and position bias is well documented for LLM judges. *Answer:* calibration is required every round (position bias via A/B swaps, judge agreement, tie rate, length bias). The leaderboard is reported as *model preference*, not learning, and Surface Value stays with real learners. *Open:* whether to use a different judge model for some pairs. That is the head of evaluation's call, and a new paid model would need a decision record.
3. **Bradley-Terry assumptions** (Leonie). BT assumes one latent strength per item per criterion, transitive preferences, and judges that are exchangeable. Lessons on different topics may not sit on one scale ("which teaches more" across topics is partly a question about the topic). Ties are not part of base BT, and ranks across a disconnected comparison graph are meaningless. *Answer:* fit per criterion with intervals, handle ties explicitly, report connectivity, and sample to keep the graph connected (evaluation-engineer and head-of-evaluation scope). *Open:* filtered views (for example by domain) should arguably be refits on the filtered records, not slices of a global fit. That is for the evaluation engineer and hq-engineer to decide and document.
4. **A single "Overall" rank** (Leonie). The parallel `tools/eval/bt.mjs` computes an "Overall" scope next to the per-criterion fits. A single global rank hides disagreement between criteria and is the most tempting number to turn into a gate. *Answer:* this record does not decide it. The head of evaluation decides whether Overall is shown, and if so how it is defined, and records the choice in `company/evaluation/README.md`.
5. **Goodhart and the rubric problem** (Leonie). `criteria.json` is in the repository, and builders can read it. Demo-crit rule 5 says builders do not see the rubric before building. *Answer:* briefs and builder prompts must not quote the criteria or leaderboard positions (stated in the README and in the CPO's failure modes). *Open:* that is a convention, not a mechanism. Hiding the criteria from builders mechanically would be a change to independence rules, so it goes to the evaluation steward if the convention fails.
6. **Reproducibility of artifacts** (Leonie). `artifacts/` is gitignored, and `npm run walkthrough` overwrites `artifacts/walkthroughs/<slug>/` on every run. Records therefore point to files that will not exist later, and v1 and v2 of a slug share one folder. *Open, for evaluation-engineer:* version the captures (e.g. `artifacts/walkthroughs/<slug>@v<n>/`, or copy them into the packet) and decide whether contact sheets for judged pairs are committed. The record format stays as specified. `artifacts` is a list of paths, and the paths are allowed to change.
7. **Is this a role added to fix a process problem?** (Leonie, from my own failure modes). The pairwise pattern has had zero documented cases (`company/knowledge/patterns/pairwise-not-scores.md`). *Answer:* the founder asked for it. The first test is whether the pattern's `would_be_wrong_if` holds: are pairwise verdicts more consistent across independent judges than absolute scores? Round 1 calibration answers that, and the pattern librarian should update the pattern's confidence from it.

## Consulted
- **chief-of-staff-ceo-office (Leonie):** agree with changes, and the changes are made above. Wiring: judges are dispatched by the operating chief of staff on the head of evaluation's request, never by the CPO or the head directly. Neither has dispatch authority over production work.
- **head-of-product (Priya):** *pending.* Her reporting line moves. Questions for her: does demo-crit still name her as the decider (proposed: yes), and how does the leaderboard enter cycle-planning?
- **evaluation-steward (Hilde):** *pending.* The new roles touch evaluation and reviews. Questions for her: does the protocol meet `company/reviews/README.md`? Is ingesting pedagogy-critic records acceptable? Should "blind" be defined in the independence rules (an amendment)?
- **chief-of-staff (Ada):** *pending.* Dispatching judges in parallel adds load to the loop. Question for her: should pairwise-round become an event-driven trigger in `company/rituals/triggers.json`?
- **principal-engineer (Kenji):** *pending, light.* `tools/eval/**` is new tooling, so the question for him is which change tier it falls in.

## Not done here (needs another role or a path this office may not touch)
- No `org-change` event was written (`company/ops/events.jsonl` was out of bounds for this session). Owner: the operating chief of staff, using `node tools/events.mjs add --type=org-change --room=ceo-office --actor=chief-of-staff-ceo-office --subjects=chief-product-officer,head-of-evaluation,pairwise-judge,evaluation-engineer,head-of-product --summary="Evaluation org under a new CPO"`.
- No board items were added. The consultations above, the artifact-versioning question (evaluation-engineer) and an HQ room for the evaluation team (hq-engineer) each need one.
- The hand-drawn `company/org-chart.md` is already stale (it says 26 roles) and was not redrawn. `company/roles/README.md` is generated and current.
