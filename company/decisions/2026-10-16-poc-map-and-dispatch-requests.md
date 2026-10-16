# Decision: the POC map (one manager per lane) and how managers request dispatches

owner: chief-of-staff-ceo-office (Leonie)
date: 2026-10-16
status: in force for dispatch routing (the founder delegated the POC map to Leonie in 2026-10-16-founder-org-and-dispatch-rule.md). The items under "For the founder" are **proposed** and wait for the founder. No role, reporting line, agent, floor or room changes here
class: org
route: founder (rule, 2026-10-16) → chief-of-staff-ceo-office (map and protocol, this record) → chief-of-staff (runs the protocol), portfolio-manager (re-owns two project lines), the 20 POCs (answer their first batch) → founder (decides the proposals and may overrule any row)
recorded by: chief-of-staff-ceo-office
board: W-1163
files: company/ceo-office/poc-map.md, company/ceo-office/dispatch-requests.md, company/ceo-office/handoff-map.md §6, company/ceo-office/org-change-process.md, company/ops/chief-of-staff-checklist.md ("Dispatch through the manager")

## What the founder said
"…you never start new agents directly, talke to leone (comany health) to design the org, route to teh right POC, all new agents should be approved by me. Also all new orgs or floors or rooms." Then: "1 + yes it can go through you but after asking the manager, your scope is too big so you need to have scalable oversight through others". (Recorded verbatim in 2026-10-16-founder-org-and-dispatch-rule.md.)

## What this record decides (Leonie, under the delegation)
1. **The POC map** (company/ceo-office/poc-map.md) replaces the interim map. It has 20 lanes, each with one POC who exists in tools/org/roles.mjs, or in the Press repo for vp-books. Compared with the interim map:
   - **Kept:** First Light (Beatriz), product and launch review (Priya, narrowed), category CMs, Wave J (Selin), engineering (Kenji), ops (Rhea), quality (Hilde), release (Diego), org (Leonie), the Press (vp-books).
   - **Changed:** research is research-lead alone, with "through vp-rnd" dropped (one POC per lane). Privacy and cultural reviews are *dispatched* from the quality lane, while their reporting lines stay where they are, because a checker is never dispatched by the lane whose work it checks.
   - **Added:** courses, design, company tools and HQ, R&D labs, personalization, international, marketing, triage and budget, rituals and integration.
   - **Flagged:** growth has no clear owner (interim split between First Light and product). The `wave-j` and `catalog` project lines are owned by the chief of staff in projects.json. Five POCs are overloaded: the founder, Priya, Kenji, Hilde and Beatriz.
2. **The request protocol** (company/ceo-office/dispatch-requests.md):
   - One batch file per lane per round, in a fixed format: role, order, kind, worktree, model, project tag, budget, inputs, done-when, checked-by and stop-if.
   - Standing orders, for mechanical work only, which expire within 7 days.
   - A mechanical check by the chief of staff, who may refuse an item in writing but never rewrite it.
   - A closed list of what the chief of staff does alone: integration, its four files, emergencies, the rituals it already owns, resumes and standing orders.
   - What reaches the founder.

## For the founder (proposed; the founder decides)
- **F1. Growth lane.** Keep growth-designer split between lanes 4 and 5 until a second growth role exists. Do not create a growth lead. *Recommendation: yes.*
- **F2. Checkers routed through the quality lane.** privacy-reviewer and cultural-reviewer are dispatched only from evaluation-steward's lane, while their reporting lines stay where they are. This is routing, not a reorg. The reporting-line fix is P6 in company/ceo-office/2026-10-13-proposals.md, still open. *Recommendation: yes. Overrule it if you want Kenji and Yuki to keep dispatch control of their reviewers.*
- **F3. A `batch=` reference on every dispatch event**, and later (tools-lead) a `dispatch-check` warning when a non-ritual, non-incident dispatch has none. dispatch-check's rules are founder-ratified, so this needs the founder. *Recommendation: yes, as a warning for 3 days, then a FAIL.*
- **F4. Managers dispatching their own teams:** a separate proposal, company/decisions/2026-10-16-proposal-managers-dispatch-own-teams.md. *Recommendation: not yet.*

## Consulted
Each answer below is **my synthesis (Leonie)**, written from the role docs and current records. None of them is the direct's own words yet. Each POC confirms or replaces their line in their first batch's `objections:` line.
- **chief-of-staff (Ada):** agree with changes (synthesis). The protocol keeps her as the single executor and the only writer of the four files, and gives her a written refusal path. Her objection is below.
- **head-of-product (Priya):** agree (synthesis). The narrowing takes load off her rather than adding it.
- **evaluation-steward (Hilde):** agree with changes (synthesis). Standing orders must not cover anything that would set a gate's evidence by default. That is why the list in protocol §2.3 is closed.
- **head-of-strategic-initiatives (Beatriz):** agree with changes (synthesis). She orders First Light work but does not choose its checks.
- **principal-engineer (Kenji):** agree (synthesis). He is asked once, and First Light cites his estimates.

## Objections
| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | Twenty lanes could mean twenty manager runs per round, which is more cost than the specialists save. | chief-of-staff-ceo-office (Leonie, against my own design) | **Answered in the design:** only lanes with work, results or a founder ask are asked (protocol §1). Routine work runs on standing orders. **Dated check:** WBR 2026-10-19 measures manager-run cost against the agents those runs unlock. Above 20%, the standing orders widen or F4 is reopened. |
| 2 | First Light is a lane whose work belongs to other managers, so Beatriz and Kenji can ask for the same engineering item twice. | Leonie | **Answered:** an item lives in one lane. First Light items are in lane 4 and must cite Kenji's estimate or EDD. Kenji's lane 7 batch leaves out `[project:first-light]` items. |
| 3 | Routing privacy and cultural reviews through Hilde while they report to Kenji and Yuki splits the line from the work. | Leonie (anticipating Kenji and Yuki) | **Open for the founder (F2).** The split is deliberate: independence over tidiness. The clean fix is P6 (reporting lines), which is the founder's call. |
| 4 | A manager can push work through a standing order that should have had a judgement. | Leonie (anticipating Hilde) | **Answered:** the list of what a standing order may cover is closed, each order expires within 7 days, and Leonie audits them at the WBR. |
| 5 | The chief of staff still makes every Agent call, so the founder's "scalable oversight through others" is only half met: the operator remains the single point of failure. | chief-of-staff (founder record, objection 2) | **Open, with a proposal:** F4. Until the founder decides, the operator executes and the managers decide. |
| 6 | The batch files live in company/ops/, the operator's folder, and the operator could edit a manager's batch. | Leonie | **Answered by rule:** the chief of staff only appends `## Dispatched`. Leonie diffs the batches at the WBR. A mechanical guard would be a hook (tools-lead), proposed only if the diff ever finds an edit. |

## What would make this record wrong
- After 3 days of rounds, managers are still not answering, or the batches merely repeat what the operator would have chosen. In that case the cost buys no oversight, and the map should shrink to fewer, larger lanes.
- The founder lets managers dispatch directly (F4). Then the protocol becomes the managers' own format, and the chief of staff's role in it shrinks to integration.

## Board (for the chief of staff to file; this record does not edit board.json)
- portfolio-manager: re-own `wave-j` to principal-pm-verticals, and decide the `catalog` line's owner (head-of-product, or split per category).
- chief-of-staff: start rounds under company/ceo-office/dispatch-requests.md, and put `batch=` in dispatch event summaries.
- tools-lead: once the founder accepts F3, add a `batch=` warning to tools/dispatch-check.mjs.
- founder: F1 to F4.
- chief-of-staff-ceo-office: the health check of the protocol at WBR 2026-10-19 (objection 1).
