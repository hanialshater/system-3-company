# Founder decision: restructure System 3 Company into content-type lanes, budgeted levels and 39 roles (F-50, W-2030)

owner: chief-of-staff-ceo-office (Leonie; org design and its application) · decides: founder
date: 2026-10-25
status: approved; applied (all steps that do not touch a protected path; step 10 drafted as AMD-017 for ratification)
class: org
route: chief-of-staff-ceo-office (proposal) → founder (approved option A) → receiving roles (written consultations, below) → chief-of-staff-ceo-office (generate, data, docs) → evaluation-steward (AMD-017 / AMD-014 redraft) → constitutional review → founder (ratifies)
recorded by: chief-of-staff-ceo-office
superseded in part (2026-10-25, F-52): the lane M flow of proposal §2c (interaction spec plus mockup before every build) is replaced by one warm maker per item, and five personalization roles kept here are parked (company/decisions/2026-10-25-founder-f52.md)
proposal: company/ceo-office/2026-10-25-restructuring-proposal.md (commit 149ff7c21) · checkpoint: CP1-L1, CP1-L3 (system3-meta docs/CHECKPOINT-1.md)

## What the founder said

> "system 3 co need restructuring though to streamline, different content type, multi level/priority/budget based execution"  (2026-10-25, the ask)
>
> "Approved and decide for me"  (2026-10-25, in reply to the open founder-inbox list that included F-50; relayed verbatim to this run by the coordinating session)

**Source of the approval.** The founder's words reached this run in a message from the coordinating session, quoted verbatim. Under company/ceo-office/org-change-process.md, an agent's message is never the founder's approval in itself. This record therefore quotes the founder's words and their date, and it names the relay. If the founder's words were not as quoted, the founder can undo everything below with one revert per commit (section "Undo").

## What the founder decided, and what is left to the owners

- **Decided by the founder (whether):** option A of F-50. That means two content-type lanes, four execution levels, lane budgets that stop at 100%, and 109 roles down to 39.
- **Delegated ("decide for me"):** the how. That covers the cycle budgets, the default priorities, the re-owning of items, and the reading of each consultation. The CEO office decided these as below, and the owners may change them in writing.
- **Not decided here:** gate tiers. Step 10 touches the protected `tools/company.mjs`. It is drafted as company/constitution/amendments/AMD-017-risk-tiers-and-lanes.md for the evaluation steward and the founder's ratification (F-51). Until it is ratified, every lesson keeps today's gate, including its learner walk.

## What was applied (migration steps 2-9; the proposal's numbering)

| Step | What | Where |
|---|---|---|
| 2 | This record | here |
| 3 | 18 written consultations (one per receiving role), answers represented from each role's file and records | company/ceo-office/consultations/2026-10-25-restructuring/ |
| 4 | Two lane lines (`kind: "lane"`): `lane-single-card`, 9M to 2026-11-08, 90k per published target; `lane-multi-card`, 1.5M, 300k per item target. The new roles are in roleDefaults. | company/ops/projects.json |
| 5 | Lanes stop at 100% of the cycle budget (`gate`, kind lane) and warn at 80%; parked roles are refused in every slot mode (S2) | tools/lib/ledger.mjs, tools/lib/slots.mjs, tests/dispatch/lane-gate.test.mjs |
| 6 | `contentType` on the lane lines; normalising the 14 `format` spellings is **not done** (it edits 1,645 lessons' meta.json, lesson content; left to tools-lead and design-lead, W-2041) | company/ops/projects.json |
| 7 | roles.mjs: 2 pooled roles added (category-curator, route-reviewer); 72 roles parked with full definitions kept (`parked` export); 4 reporting lines moved (head-of-product → founder, demo-builder → principal-pm-verticals, rnd-lead → principal-engineer, research-scientist → head-of-product); 12 kept roles got their new scope lines. generate.mjs: parked docs kept. The 14 category leads named in content/domains.json stay in company/roles/ with a stand-in agent, because the protected `company check` needs them. The other 58 move to company/roles/parked/ and their subagents are removed. people.mjs names the two pools. HQ: parked roles leave HOME (filter), and the pools get rooms (ROOM_BY_ROLE). The memories are **not moved**: the curator reads company/roles/memory/cm-<domain>.md in place. This is a change from proposal §4a, because moving would break memory.mjs and reconcile's links. | tools/org/, .claude/agents/, company/roles/, src/app/hq/people.ts, tools/events.mjs |
| 8 | 231 open items of parked roles re-owned, each with a dated `reowned` note (172 to category-curator, with the category in `domain`). 27 queued items with no priority got a default: doing = 2, next = 3, and W-604/W-605 = 1 as lane M gates. 935 unprioritised backlog and review items are listed for the portfolio-manager. 10 follow-ups were added (W-2032 to W-2041). | company/ops/board.json, company/ceo-office/2026-10-25-unprioritised-items.md |
| 9 | POC map: lane 1 = lane S, lane 6 = lane M; lanes 2, 3, 12, 15 and 21 closed. Operating loop §0 "Lanes, levels and budgets". Org chart header. Tests that encoded the old org (mailbox, slots, the s3c org adapter) were updated to the new one. | company/ceo-office/poc-map.md, company/ops/operating-loop.md, company/org-chart.md, tests/mailbox, tests/dispatch, company/sibling/system3-meta/adapters/s3c/org.test.mjs |
| 10 | **Drafted, not applied:** AMD-017 (tiers S/R/N, sequence probe, tier-N design and pairwise records) | company/constitution/amendments/AMD-017-risk-tiers-and-lanes.md; founder inbox F-51 |
| 11 | Not needed now. The sequence probe is a tool, and `tests/qa/**` is unchanged. | — |
| 12 | Lane M's first batch: board W-2037 (design-lead) | board |

Lane M adds one rule from the pedagogy-critic consultation: a lane M brief names the single-card counterpart that the pairwise judge compares against.

**Undo.** Revert the restructuring commits in reverse order. To un-park one role only, delete its id from `PARK` in tools/org/roles.mjs and run `node tools/org/generate.mjs`; its definition, doc and memory are intact. Re-owned items carry `reowned.from`.

## Predictions (committed in the proposal, 2026-10-25, unchanged)

P1: coordination is 15% or less of measured tokens in the first 14 days after step 9 (wrong above 25%, or if it is still unmeasured). P2: lane S costs 150k or less all-in per published lesson over its first 100 (wrong above 200k). P3: lane M publishes 3 items within 14 days of W-2037's start, at 450k or less each (wrong if fewer than 3 are published, if one costs over 450k, or if pairwise prefers the single-card version in 2 of 3).

## Consulted (written, same run; answers represented from each role's records, not live replies)

| Role | Answer | Objection | What happened to it | File |
|---|---|---|---|---|
| principal-pm-verticals | agree with changes | A lane of 14 categories through one manager can repeat the 10-16 manager-round cost if every batch needs a run of mine. I ask for standing build orders (F-41 item 1): a curator batch request per category per cycle, not per batch. | answered: standing orders are the lane's default (proposal §3); P1 measures the coordination share | company/ceo-office/consultations/2026-10-25-restructuring/principal-pm-verticals.md |
| design-lead | agree with changes | I may not approve my own designs (my role says so). If I manage lane M and also do the first-3 design review, the review must not count as the independent check; pedagogy-critic's pairwise and the learner walk stay the gates. | answered: the design review is a craft review, not a gate; lane M's gates come from lane 10 (proposal §2c) | company/ceo-office/consultations/2026-10-25-restructuring/design-lead.md |
| interaction-designer | agree | The 13 open learning-designer items (keep-remove §4) land on me at once; they need priorities, or lane M stalls behind lane S revisions. | routed: portfolio-manager sets priorities on the re-owned items (board note on each) | company/ceo-office/consultations/2026-10-25-restructuring/interaction-designer.md |
| platform-engineer | object (in part) | My queue is 80 open items. W-604 (the sequence probe) gates lane M's first item; without a priority it waits behind platform work. | standing: W-604 is set to priority 1 on the board in this run; queue size stays an open risk (objection 7) | company/ceo-office/consultations/2026-10-25-restructuring/platform-engineer.md |
| research-scientist | agree | Without a lead, nobody ranks research requests from two lanes. I take them in board-priority order and say so in each record. | answered: board priority is the order (proposal §3) | company/ceo-office/consultations/2026-10-25-restructuring/research-scientist.md |
| pedagogy-critic | agree | Pairwise judging needs two versions of the same concept. Lane M's brief must name the single-card counterpart, or the pairwise cannot run. | answered: added to the lane M flow in the decision record | company/ceo-office/consultations/2026-10-25-restructuring/pedagogy-critic.md |
| evaluation-steward | object (in part) | Sampling the learner walk at 1 in 5 for tier S lowers the floor that caught soft locks after the 10-14 rush. Merging the safety and cultural reviewers into one role may dilute two expertises. Gates are mine to propose by amendment, not the CEO office's. | standing: no gate changes in this run; AMD-017 is a draft for you to own, redraft or reject; until ratification every lesson keeps its learner walk | company/ceo-office/consultations/2026-10-25-restructuring/evaluation-steward.md |
| cm-history (category lead, parked into category-curator) | object | History's charter has sensitive lines and past rulings a fresh curator will not remember; 26 open items were mine. | standing (objection 1): the curator reads the charter and this notebook first; un-park rule if the queue does not clear in 2 cycles or route findings exceed 1 in 5 | company/ceo-office/consultations/2026-10-25-restructuring/cm-history.md |
| cm-lifehacks (category lead, parked into category-curator) | object (in part) | 33 open items and the F-46 closeout were mine. The refuse list must stay binding on every Life Hacks brief. | answered: the refuse list is the route=safety checklist; the 33 items are re-owned with notes | company/ceo-office/consultations/2026-10-25-restructuring/cm-lifehacks.md |
| cm-books (category lead, parked into category-curator) | object (in part) | The book deck was the category's whole plan; without it Books is single cards forever. Copyright has had no owner since F1/F2. | answered in part: route-reviewer owns route=copyright now; the deck is re-proposed after lane M has 10 published (proposal §2a) | company/ceo-office/consultations/2026-10-25-restructuring/cm-books.md |
| cm-cs (category lead, parked into category-curator) | agree | The 200 algorithm drafts need one fact-check/QA plan; that is a lane S batch, not a category decision. | answered: lane S queue item | company/ceo-office/consultations/2026-10-25-restructuring/cm-cs.md |
| head-of-product | agree with changes | Signing every batch record for two lanes is a new load; the founder approved CPO a week ago. | standing (objections 5, 6): span after the change is 6 directs; CPO un-parks if it passes 8 | company/ceo-office/consultations/2026-10-25-restructuring/head-of-product.md |
| principal-engineer | agree with changes | The ledger gate change (lanes stop at 100%) and the parked-role refusal in slots.mjs need a tier-1 readiness self-check by tools-lead; rnd-lead parks if F-49 is declined. | routed: board item for tools-lead's readiness self-check | company/ceo-office/consultations/2026-10-25-restructuring/principal-engineer.md |
| chief-of-staff | object (in part) | Founder asks that touch lessons come to me directly; routing them as a lane batch slows the founder. | answered (objection 9): the founder can mark a batch priority 1; the 10-21 stories skipped pre-build review | company/ceo-office/consultations/2026-10-25-restructuring/chief-of-staff.md |
| portfolio-manager | agree with changes | A lane budget written by the CEO office is a proposal until an approval record names who approved it (projects.json note). The cycle budgets need the founder's number. | answered: the founder's 'decide for me' (F-50) is the approval record for the proposed budgets; they are marked for confirmation at the next op-planning | company/ceo-office/consultations/2026-10-25-restructuring/portfolio-manager.md |
| tools-lead | agree with changes | The CEO office edited tools I own. I want the tier-1 self-check and the drain-order change on my board, not done for me. | routed: both on the board for tools-lead | company/ceo-office/consultations/2026-10-25-restructuring/tools-lead.md |
| hq-engineer | agree with changes | The CEO office writes no HQ code (org-change process step 6). The filter is data-shaped, but the redraw of empty offices is mine. | routed: board item for hq-engineer (redraw floors 3-4) | company/ceo-office/consultations/2026-10-25-restructuring/hq-engineer.md |
| vp-personalization | agree | Dimension ownership must stay outside the builders (independence rule); the learning scientist is not a builder. | answered | company/ceo-office/consultations/2026-10-25-restructuring/vp-personalization.md |

## Objections

The ten objections from the proposal, with what happened to each:

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | A pooled curator has no standing judgment for History and Life Hacks. | category leads (cm-history, cm-lifehacks, cm-books) | **Standing.** Charter, rulings and notebook are data the curator reads first, and route-reviewer is mandatory on those routes. Un-park rule: a category's queue that does not clear in 2 cycles, or route findings above 1 in 5, brings back its lead. |
| 2 | Leads lose memories and seats. | category leads | **Answered.** The memories are kept in place and read by the curator; nothing is deleted. |
| 3 | A 1-in-5 learner sample lowers quality. | evaluation-steward | **Standing.** No gate changed. AMD-017 is the steward's to own or reject. |
| 4 | Merging safety and cultural review dilutes expertise. | evaluation-steward | **Standing.** It is one role with three checklists, and the steward rules on it in the redraft. |
| 5 | Batch records plus cross-lane priority overload head-of-product. | head-of-product | **Answered.** She has 6 directs after the change, and CPO un-parks above 8. |
| 6 | Parking CPO and the evaluation org a week after approval is a reorg every week. | head-of-product, founder | **Standing.** The founder approved option A knowing this. Un-parking is one regenerate. |
| 7 | platform-engineer's queue (80) grows with design-engineer and community-engineer's work. | principal-engineer, platform-engineer | **Answered in part.** W-604 and W-605 are set to priority 1. Queue size stays a risk. |
| 8 | rnd-lead under principal-engineer mixes R&D with production. | principal-engineer | **Answered.** One direct report until F-49; it parks if F-49 is declined. |
| 9 | Routing founder asks through lanes slows the founder. | chief-of-staff | **Answered.** Priority 1 batches are possible, and the 10-21 stories skipped review. |
| 10 | Two lane managers become the new hub. | principal-pm-verticals, design-lead | **Standing.** P1 measures it, and standing build orders are the default. |
| 11 | The CEO office edited tools and HQ data that belong to tools-lead and hq-engineer. | tools-lead, hq-engineer (consultations) | **Answered in part.** The changes are small and tested. The tier-1 self-check (W-2032) and the HQ redraw (W-2035) are on their boards. |
