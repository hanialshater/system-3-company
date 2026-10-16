# Founder ask: a scalable personalization org under Mateo

owner: chief-of-staff-ceo-office (Leonie: org design and the new-role pipeline)
date: 2026-10-16
status: routed
class: org
route: personalization-lead (proposes the team, §7 of company/personalization/2026-10-16-brief-response.md) → chief-of-staff-ceo-office (designs under company/ceo-office/org-change-process.md, checks overlaps) → founder (approves each new role before it exists)
recorded by: chief-of-staff

## What the founder said

> "Mateo will create his team, with eval, applied scientes, head of feed, etc, this org should scale"  (source: conversation, 2026-10-16, right after the personalization brief, company/personalization/2026-10-16-founder-brief.md)

## What the founder decided, and what is left to the owners

- **Decided by the founder (whether):** personalization becomes an org, not a two-person team, led by personalization-lead (Mateo), and it must be able to grow. Named functions: evaluation, applied science, a head of feed, "etc".
- **Left to the owners (how):** the role list, reporting lines, sub-teams, which roles start in phase A vs later, and how they meet existing owners (platform-engineer owns the feed today; analytics-steward owns experiments and metric meaning; evaluation-steward owns the evaluation harness; growth-designer owns badges and streaks; learner-model-engineer already reports to Mateo). Under company/decisions/2026-10-16-founder-org-and-dispatch-rule.md rule 1, Mateo proposes, Leonie designs, the founder approves each role; nobody creates an agent, role file or tools/org/roles.mjs entry before that.

## Route and answers

| Step | Role | Answer (agree / agree with changes / object) | Where |
|---|---|---|---|
| 1 | personalization-lead | **agree with changes** (2026-10-16): 3 new roles for phase A (applied-scientist-personalization, personalization-eval reporting to evaluation-steward, lesson-dims-owner), head-of-feed in phase B as an ordering-contract owner, not the feed code; overlaps written as T1-T8 for Leonie | company/personalization/2026-10-16-brief-response.md §7 |
| 2 | chief-of-staff-ceo-office | **agree with changes** (2026-10-16, Leonie, after the founder's second message): self-contained org under **vp-personalization** (id rename, "VP of Personalization (CEO Office)", reports to the founder). Approve now (phase A, each with a waiting item): personalization-eval (in-org, with a two-way independence rule: eval never builds what it grades, builders never build or tune the judge), applied-scientist-personalization, learning-scientist-personalization, lesson-dims-owner, personalization-engineer (HQ lab W-1503), plus scope edits to learner-model-engineer and growth-designer (streaks line, T7). Deferred with triggers: head-of-feed (phase B start), feed-engineer, splits by need family / category cluster / offline-online, sub-team leads (span > 6). T1-T8 each give scope to the org; company-wide gates kept as interfaces. Two circularities in Mateo's plan moved to the eval (personas from W-1493, simulated learner from W-1494). Consults pending: head-of-product, evaluation-steward, principal-engineer, vp-rnd, chief-of-staff, personalization-lead | company/ceo-office/2026-10-16-personalization-org-proposal.md |
| 3 | founder | pending | this record |


## Founder decision, second message (2026-10-16)

> "Mateo is VP he should be independent instead of taping onto others in the compay, leoni to help with he org experience but not levergae other teams for his internal scope"  (founder, conversation)

- **Decided by the founder:** personalization-lead becomes **VP of Personalization** and runs a **self-contained org**. Its internal work (feed ordering for personalization, the model and curves, the simulator, evaluation of its own policies, applied science, lesson dims for its use, its HQ simulation lab) is staffed inside the org, not borrowed from other teams. Leonie designs the org and brings org-design experience; she does not route Mateo's internal scope to other teams.
- **Consequence for open items:** W-1496 (analytics-steward), W-1497 (research-lead), W-1498 (principal-engineer, location of dims and code) and W-1503 (hq-engineer, HQ lab) move into the personalization org once its roles are approved; until then they wait for those roles rather than going to the other teams. personalization-eval reports inside the org, not to evaluation-steward.
- **What stays company-wide (not "leveraging", they are gates every org passes):** privacy review of learner data (W-1495), the founder's approval of every deploy, protected paths and the constitution, the claims rule for anything a learner reads, and the platform owner's review where personalization code touches the shared feed or kit. Leonie is asked to state the interface for each in the org design.

## Objections

- **chief-of-staff:** a "head of feed" and a personalization "eval" role overlap with owners that exist (platform-engineer owns the feed surface; analytics-steward and evaluation-steward own experiments and the harness). Creating them without moving those scopes leaves two owners for one thing. **Answer:** sent to step 1 and 2: Mateo must name each overlap, Leonie must resolve it (move the scope, split it, or drop the role) before it reaches the founder.
- **chief-of-staff:** most of the org has no work until phase A's simulator and lesson dims exist; staffing ahead of work produces unused roles (the CEO office's role evaluation already looks for these). **Answer:** Mateo marks each role phase A or later; Leonie may stage the approvals.

- **chief-of-staff:** a self-contained org duplicates capabilities other teams already have (experiment analysis, research, engineering review), and its own evaluation of its own policies loses independence. **Answer:** the founder chose independence; Leonie's design must give the org's eval a written independence rule (eval roles never build what they grade), and the company-wide gates above still apply.

## Board

- W-1492 Design the personalization org (owner chief-of-staff-ceo-office)
