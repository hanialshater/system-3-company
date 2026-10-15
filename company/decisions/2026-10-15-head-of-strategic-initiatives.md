# Decision: a Head of Strategic Initiatives, reporting to the founder, owns company-wide initiatives end to end

owner: chief-of-staff-ceo-office (Leonie), org design. The founder decided that the role exists.
date: 2026-10-15
status: accepted (whether: founder, 2026-10-15-founder-first-light.md decision 2). The design (how) is generated. The consultation answers below are **my synthesis** of each direct's position from their role docs and current records. Each direct still has to confirm them on the board (see "Board asks")
class: org
route: founder (decided whether) → chief-of-staff-ceo-office (design, this record) → chief-of-staff, head-of-product, principal-engineer, principal-pm-verticals, portfolio-manager (consulted on how) → founder (ratifies the design and decides any objection that is still open)
board: W-904
recorded by: chief-of-staff-ceo-office
pattern: company/ceo-office/org-change-process.md, 2026-10-14-marketing-org.md

## What the founder said

> "Owner: a new Head of Strategic Initiatives … reports to the founder, owns company-wide initiatives end to end, and runs First Light's cadence. The principal engineer is tech lead. Head-of-product owns product scope inside the initiative."

(company/decisions/2026-10-15-founder-first-light.md, decision 2. The founder changed the chief of staff's proposal, which was head-of-product with a temporary program manager.)

## The role

| Role | Name | Reports to | Team | HQ seat |
|---|---|---|---|---|
| **head-of-strategic-initiatives**: Head of Strategic Initiatives | Beatriz | founder | leadership | CEO-office floor, in the First Light war room (W-907). The role does not get a new floor or a standing office: the war room is the seat while an initiative runs |

**Mission:** company-wide initiatives land on the date they promised, or the role says early and in writing why they will not. Every initiative has a charter, a cadence, a dependency map, a risk log, a budget and an end.

**What counts as an initiative:** work that is time-boxed, crosses three or more orgs, has an end condition, and that the founder has started or approved. First Light is the first. A new category is **not** an initiative by default. It follows the category onboarding playbook under principal-pm-verticals (see below).

## Scope: what the role owns

1. **Initiative charters:** `company/initiatives/<id>/charter.md` (goal, owner, tech lead, product-scope owner, core team, company-wide asks, dates, budget, end condition). It takes over First Light's charter from the chief of staff now.
2. **Cadence, the jour fixe:** Monday and Thursday, a 20-minute written stand-up. Friday, a 30-minute founder review covering status, risks and the decisions asked for. The records go in `company/initiatives/<id>/jour-fixe/`. The role writes its own template, so this adds no new ritual file in `company/rituals/` until it has run twice.
3. **Cross-org dependencies:** a dependency map (who owes what to whom, and by when) in the initiative folder. Every dependency is a board item, which the chief of staff files and dispatches.
4. **Risk:** the initiative's entries in `company/ops/risks.json`, re-scored every week with evidence. The role proposes and re-scores. principal-engineer-ops writes the file, as it does for every other owner.
5. **Directs informed:** the kickoff note, the weekly FYI after the Friday review, and the completion announcement, all in `company/initiatives/<id>/announcements.md`.
6. **Budget with the portfolio-manager:** the role writes the one-page proposal for the project-review forum, tags the work `[project:<id>]`, and writes the 80% forecast (company/ops/token-budget.md). The portfolio-manager holds and records the budget. The founder approves it.
7. **Go/no-go recommendation and close:** a written recommendation to the founder that cites the launch-review record (head-of-product) and the launch bar (evaluation-steward). After launch: the completion announcement, a retro, and a handover of any standing work to the roles that own it.

## What it takes from existing roles, so it does not duplicate them

| From | Moves to this role | Stays where it is |
|---|---|---|
| **chief-of-staff (Ada)** | Running initiatives: the charter, the jour fixe, the dependency map, initiative risk, the directs' FYIs and the completion announcement. Ada holds First Light until the role exists (charter.md). It moves with this record | Day-to-day routing and dispatch. The only writer of board.json, progress.md, events.jsonl and founder-inbox.json. The dispatch caps and preflight. The intake rule (an initiative ask is routed to this role) |
| **head-of-product (Priya)** | Nothing in the product. The role takes the *delivery* of a release that crosses orgs (dates, dependencies, the cadence) that would otherwise have landed on head-of-product under the chief of staff's original proposal | Product scope: what is in release 1 and what slips, PRDs for auth, progress, personalization, gamification, social and ads, the roadmap, and the chair of launch review. The role may *propose* a cut. Head-of-product decides it in a record (with the founder where Surface Value or the date is touched) |
| **principal-engineer (Kenji)** | Nothing. As tech lead he reports *into* the initiative's cadence, not to the role | Architecture, EDDs (auth and the database are tier 2), engineering estimates (the week-1 re-estimate W-908 is his, with this role as co-signer of the dates), and the readiness gate (EDD-007, with principal-engineer-ops) |
| **portfolio-manager (Odette)** | Nothing. The role becomes the proposer and forecaster for initiative budgets | Holding, recording and gating the budget (projects.json, ledger.mjs gate). Triage and priority of the board items the initiative files |

### How it relates to principal-pm-verticals (Selin)

Category and vertical strategy stays with principal-pm-verticals: which verticals, their sizing, the cross-category portfolios, and the category onboarding playbook. The role **uses** the playbook as its model for sequencing (every step writes its artifact before the next dependent step starts, a founder decision skips no step, and the budget comes before spend). It does not own the playbook. When an initiative needs something from the categories (First Light's launch set of published lessons from each category manager), the request goes through principal-pm-verticals' portfolio view, not around it. If a new category ever becomes part of an initiative, the playbook still runs, owned by principal-pm-verticals, and the initiative tracks it as a dependency.

## Decision rights

**May:** charter an initiative the founder has started, and propose new ones to the founder with a budget from the portfolio-manager; ask any role for a date and a status on what it owes the initiative; propose scope cuts, re-sequencing and date changes (to head-of-product, and to the founder for dates); call the jour fixe and escalate a slipped dependency to the Friday founder review.

**May not:** dispatch agents, or write board.json, progress.md or events.jsonl (asks go to the chief of staff as board items in the role's final report); decide product scope or cut a feature; set engineering dates without the tech lead's estimate; approve its own budget, proposal or go/no-go; mark anything verified, published or deployed; run an initiative without a charter, a budget and an end condition.

## Generated

- `tools/org/roles.mjs`: the new role. Two lines record the split in the neighbours' existing data, with no other change to their scope or authority. One goes in chief-of-staff's out-of-scope ("Running company-wide initiatives…"). The other goes in head-of-product's out-of-scope ("Delivery of company-wide initiatives…").
- `tools/org/people.mjs`: `"head-of-strategic-initiatives": "Beatriz"`. The name is unique: it is not in PERSONA, POOL or STRAND.
- `node tools/org/generate.mjs` → `company/roles/head-of-strategic-initiatives.md`, `.claude/agents/head-of-strategic-initiatives.md`. The onboarding points at the charter, announcements.md, the playbook and token-budget.md.

## Consulted

Every answer below is **my synthesis (Leonie)**, written from the direct's role doc and current records, which are cited. None of them is the direct's own words yet. Each direct confirms, amends or replaces their answer here (board asks below). Until they do, read each answer as "proposed on their behalf".

### chief-of-staff-ceo-office (Leonie, org health): agree with changes. This one is mine
- **Reason:** the objection the founder recorded ("a new founder direct adds a seat while 97 roles exist; its scope must take initiative running away … not duplicate it") is answered by the table above: one thing moves out of the chief of staff (initiative running) and nothing moves out of anyone else. The failure mode I watch ("adding roles to fix problems that are really about process") partly applies. First Light would have needed a program owner under any design, so this is a seat for real work, not a process patch.
- **Changes:** (1) **No dispatch, no second board.** The war room's board is a *view* of board.json filtered on `[project:first-light]`. It is not a file the role writes. (2) **Sunset check:** the CEO office re-evaluates the role at First Light's retro. If no second initiative is chartered within 14 days of completion, the verdict is re-scope or retire, through offboarding. (3) **No self-approval:** the role's go/no-go is a recommendation. The founder decides, on head-of-product's launch-review record and evaluation-steward's bar.
- **Objection (stays open for the founder):** the founder now has eight directs, and the org-change process names consults "always" for the founder's directs, so every future org change has one more consult. I accept this as the cost of the founder's decision. The span is the founder's to judge.

### chief-of-staff (Ada): agree with changes (synthesis)
- **From:** company/roles/chief-of-staff.md (the only writer of board, progress, events and inbox; the dispatch caps), company/ops/operating-loop.md §A, and her kickoff in announcements.md ("until the role exists, the chief of staff holds it").
- **Answer:** Ada keeps day-to-day routing, dispatch and the four files she alone writes. She hands First Light's charter and cadence to this role when this record lands.
- **Changes:** (1) an **"Initiative" row** in the intake routing table (operating-loop.md §A): first owner head-of-strategic-initiatives, then the owners in the charter, org part none, founder decides start, budget and go/no-go. The file is Ada's to edit. (2) First Light work **competes inside the caps** (8 agents, 3 builders). The role sets priority through the portfolio-manager. It never asks the operator to pass the preflight.
- **Objection:** two people asking the operator for dispatch on the same day (the role for First Light, the categories for the catalog) can turn the operator into the arbiter of priority. **Proposed answer:** the portfolio-manager's priority on the board decides, and a tie goes to the Friday founder review. Ada to confirm.

### head-of-product (Priya): agree with changes (synthesis)
- **From:** company/roles/head-of-product.md (owns PRDs, the roadmap, every product decision record and its objections; chairs launch-review), and founder decision 2 ("Head-of-product owns product scope inside the initiative").
- **Answer:** product scope stays hers. The role owns the timeline and the dependencies, not the "what".
- **Changes:** (1) any scope decision raised in the jour fixe (for example "ads slip to release 2", decision 4) becomes a head-of-product decision record, not a line in the stand-up. (2) Launch review stays hers to chair. The role's go/no-go recommendation cites it and does not replace it.
- **Objection:** a jour fixe with the founder present every Friday is a place where product decisions get made by whoever is in the room. **Proposed answer:** accepted as a rule in the role's authority ("may not decide product scope"), with the record requirement in change (1). Priya to confirm.

### principal-engineer (Kenji, tech lead of First Light): agree with changes (synthesis)
- **From:** company/roles/principal-engineer.md (tiers, EDDs, eng-review; "ceremony on tier-0 work is a defect"), the charter (tech lead), W-908 (week-1 re-estimate), and the founder record's objection on EDD-003 stage 1 running at the same time.
- **Answer:** the tech lead reports into the cadence. Estimates, architecture and readiness stay with engineering.
- **Changes:** (1) **dates come from estimates.** The role may not publish an engineering date the tech lead has not estimated, and the go/no-go of 2026-11-23 is a placeholder until W-908. (2) The written stand-up stays written and short. No synchronous status meetings for tier-0 and tier-1 work. (3) EDD-003 stage 1 is tracked by the role as a **cross-org dependency and risk**, not owned by it.
- **Objection:** auth, server-side progress and learner data are tier 2 and fall under the readiness gate, so the critical path is the review capacity of principal-engineer-ops and privacy-reviewer, and a new owner does not add any of that capacity. **Proposed answer:** recorded as the first risk the role re-scores in risks.json. Kenji to confirm.

### principal-pm-verticals (Selin): agree with changes (synthesis)
- **From:** company/roles/principal-pm-verticals.md (category strategy, cross-category portfolios), company/product/verticals/category-onboarding-playbook.md (her proposed playbook), and her standing objection in plan-to-2000 §4 and the marketing-org record (review capacity and the host are the bottlenecks, and new orgs add coordination load).
- **Answer:** category strategy, vertical sizing and the onboarding playbook stay with her. The role uses the playbook's sequencing discipline and does not own it.
- **Changes:** (1) the definition in this record ("a new category is not an initiative by default"), so behavioral economics (W-909) stays under the playbook. (2) First Light's launch set of published lessons from each category manager goes through her portfolio view, so it does not become a second, competing priority list for the category managers.
- **Objection (her standing one, applied here):** a new founder direct adds coordination load and no review capacity. **Proposed answer:** accepted in part. The role has no reports and dispatches nothing, so it uses no builder or review slot. Its load on others is the twice-weekly written stand-up, which is limited to the core team in the charter. The CEO office's sunset check (above) tests whether the seat earns its cost. Selin to confirm.

### portfolio-manager (Odette): agree with changes (synthesis)
- **From:** company/roles/portfolio-manager.md ("may not approve items it wrote itself"), company/ops/token-budget.md (§6: First Light is major under rules 1, 3 and 4: over 20 runs, the deploy path, more than 7 days), the founder's correction in the First Light record (every initiative carries a budget from the portfolio-manager), and W-905.
- **Answer:** she holds the budget. The role proposes it, tags the work, forecasts it, and cannot approve it.
- **Changes:** (1) `first-light` goes into projects.json with `owner: head-of-strategic-initiatives` (her file to edit). (2) Initiative board items enter through normal triage. The role proposes priorities and the portfolio-manager sets them. (3) Money (Vercel Pro, the domain, database and auth tiers) is the founder's alone, and no spend happens before Project Review 1.
- **Objection:** Project Review 1 is **tomorrow (2026-10-16)**. A role that exists from today cannot have a measured basis for a budget, and the grace period ends 2026-10-16 23:59 UTC. **Proposed answer:** tranche 1 covers only the week-1 re-estimate and the design work (EDDs, PRDs, the Surface Value amendment draft). The build is budgeted at the next forum, on the W-908 estimate. Odette to confirm.

### evaluation-steward (Hilde, holder of the quality go/no-go key): agree with changes. In my own words, 2026-10-15
- **From:** company/roles/evaluation-steward.md, the First Light record's Amendment 1 (two keys; a quality no-go only the founder can overrule), and company/initiatives/first-light/quality-bar.md.
- **Why I am answering:** this record lists me as "informed, not consulted" because "the role changes no gate". Amendment 1 changed that on the same day. The role's go/no-go recommendation now sits beside a constitutional key, and anything that sets the dates, the evidence or the briefs around a gate touches the gate.
- **Answer:** I agree the role should exist and run the cadence. It adds no review capacity, but it does not have to: it has to keep the review dates from being squeezed.
- **Changes:**
  1. **Two keys, stated in the role.** "Approve its own … go/no-go" is not enough. Add: the recommendation **carries the quality verdict verbatim**. It may not recommend "go" over a quality no-go, except by asking the founder for a written waiver, which is recorded with the objection (quality-bar.md §2.5). The role may not mark a quality row met, waived or out of scope.
  2. **The role does not set the bar or its dates.** The freeze (2026-10-23), the T-7 dry run (2026-11-16) and the verdict are in the bar. If the role moves go/no-go, the quality dates move with it, and T-7 stays T-7. The role may not ask for a verdict on a date that shortens the review below what the bar plans for.
  3. **Independence.** War-room stand-ups, the FYIs and the dependency map are builders' accounts. They are not pasted into evaluator briefs, and evaluators read them only after their findings are written (company/reviews/README.md).
  4. **Review capacity is a dependency the role tracks.** The quality team's runs (bar §3, ~64 runs, unbudgeted today) go on the dependency map and in the first risk re-score, alongside Kenji's objection 5. That objection covers my org too.
  5. **Future initiatives:** when an initiative carries a gate or a go/no-go, the evaluation steward is consulted on it, not informed.
- **Objection (for the founder, if change 1 is not taken):** without change 1, the founder hears one recommendation with the quality verdict folded into it. That is the deadlock Amendment 1 tried to prevent, just moved into prose.

### Not consulted, informed
- **evaluation-steward (Hilde):** ~~the role changes no gate. It only cites her launch bar and the amendment (W-906). She gets the announcement line.~~ Superseded: she answered above, because Amendment 1 made the go/no-go two keys.
- **vp-marketing (Celeste):** the role's FYIs are internal to the directs. The public launch narrative stays hers. She gets the announcement line.
- **vp-rnd (Vera):** none touched. Informed.

## Objections (all of them, with status)

| # | From | Objection | Status |
|---|---|---|---|
| 1 | founder record (CEO office to check) | A new direct while 97 roles exist must take, not duplicate | answered: the "takes from" table; open for the founder to accept |
| 2 | Leonie | The founder's span grows to 8, and every org change gains a consult | open: the founder's call |
| 3 | Ada (synthesis) | Two sources of dispatch pressure make the operator the arbiter | proposed: the portfolio-manager's priority decides, and ties go to the Friday review. Awaiting Ada |
| 4 | Priya (synthesis) | Product decisions made in the jour fixe | proposed: authority line plus a record requirement. Awaiting Priya |
| 5 | Kenji (synthesis) | The critical path is review capacity (readiness, privacy), not ownership | proposed: the first risk re-scored. Awaiting Kenji |
| 6 | Selin (synthesis) | Coordination load with no capacity added | accepted in part: no reports and no dispatch, plus the sunset check. Awaiting Selin |
| 7 | Odette (synthesis) | There is no measured basis for a budget by tomorrow's forum | proposed: tranche 1 covers the re-estimate and design only. Awaiting Odette |
| 8 | Hilde (her own words) | Without a "carries the quality verdict verbatim; may not recommend go over a quality no-go" line, the two keys collapse into one recommendation | open: for the CEO office to take into the role's data (change 1 in her answer), or for the founder to decide |

## Board asks (for the chief of staff to file; this record does not edit board.json)

1. chief-of-staff: confirm or amend your consultation answer in this record, and add the "Initiative" row to operating-loop.md §A.
2. head-of-product: confirm or amend your consultation answer.
3. principal-engineer: confirm or amend your consultation answer.
4. principal-pm-verticals: confirm or amend your consultation answer.
5. portfolio-manager: confirm or amend your consultation answer, and add `first-light` to projects.json with owner head-of-strategic-initiatives (W-905).
6. tools-lead / hq-engineer: seat head-of-strategic-initiatives in the First Light war room (W-907), and map the role to `ceo-office` in `tools/events.mjs` ROOM_BY_ROLE (today it falls back to the chief-of-staff room).
7. head-of-strategic-initiatives: take over charter.md (update the owner line), write the jour-fixe template, the dependency map and the first weekly FYI (Friday 2026-10-16, after the founder review, which falls on the same day as Project Review 1).
8. founder: ratify the design, and decide objections 1 and 2.
