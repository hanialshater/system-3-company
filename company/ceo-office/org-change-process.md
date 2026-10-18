# Adding, moving or retiring a role: consult the founder's directs first

owner: chief-of-staff-ceo-office (Leonie) · since 2026-10-13 (founder: "When you add people, check with my directs; some of them need to know") · extended 2026-10-16 (founder rule: new roles, agents, orgs, floors and rooms go through Leonie; the founder approves each one)

The founder's directs are the roles with `reportsTo: founder` in `tools/org/roles.mjs`. Today they are:
- chief-of-staff (Ada)
- evaluation-steward (Hilde)
- principal-engineer (Kenji)
- chief-of-staff-ceo-office (Leonie)
- vp-rnd (Vera)
- vp-marketing (Celeste), since 2026-10-14 (company/decisions/2026-10-14-marketing-org.md)
- head-of-strategic-initiatives (Beatriz), since 2026-10-15 (company/decisions/2026-10-15-head-of-strategic-initiatives.md). Consult on anything that changes a running initiative's core team or owners
- vp-personalization (Mateo), since 2026-10-16 (company/decisions/2026-10-16-founder-personalization-org.md). Consult on anything that touches learner data, the learner model, feed ordering or personalization's eval
- chief-product-officer (Margot), since 2026-10-14 by decision, generated on this branch 2026-10-18 (company/decisions/2026-10-14-evaluation-org.md, port section; company/decisions/2026-10-18-founder-evaluation-leaderboard-in-hq.md). Consult on anything that touches the product org under head-of-product, the Evaluation org (pairwise judging, criteria, the Bradley-Terry leaderboard), or a product trade-off that crosses product and evaluation

head-of-product (Priya) is no longer a founder direct (she reports to chief-product-officer since the same record). **Keep consulting Priya** on lessons, product and categories, as step 2 below says; the move changes her line, not her scope.

Since 2026-10-16 (company/decisions/2026-10-16-founder-org-and-dispatch-rule.md, rule 1), this process covers every **new role, agent, org, floor and room**, plus moves and retirements. The CEO office designs each one, and **the founder approves each one before it exists**. The full pipeline, from the ask to the check that the role is used, is in "The pipeline end to end" below. The steps that follow are its design and consultation core.

## Steps
1. **Draft (Leonie):** write the decision record (`company/decisions/<date>-<slug>.md`) with the role's scope, its reporting line, and what it takes from existing roles.
2. **Consult** before the role is generated:
   - **always:** Leonie (org health), and the direct whose org the role will sit in;
   - **when relevant:** any direct whose scope the role touches. A role that touches gates or reviews consults Hilde. One that touches the Evaluation org or product outcomes across orgs consults Margot. One that touches engineering, the kit or data consults Kenji. Lessons, product or categories consult Priya. Dispatching or the loop consults Ada. Labs or research consult Vera. Anything said in public about the company consults Celeste.

   Each one answers in writing in the record's `## Consulted` section: agree, agree with changes, or object, with the reason. Objections travel with the decision.
3. **Founder approves (new since 2026-10-16):** the record goes to the founder through `company/ops/founder-inbox.json` (the chief of staff files it) and waits there. Nothing is generated until the record says `status: approved` with the founder's words quoted verbatim, with the date. A message from an agent, the chief of staff included, is never the founder's approval.
4. **Generate:** edit `tools/org/roles.mjs`, then run `node tools/org/generate.mjs`.
5. **Inform:** the chief of staff, as the only writer of events.jsonl, adds an `org-change` event (others put it in their final report): `node tools/events.mjs add --type=org-change --room=ceo-office --actor=<who> --subjects=<role ids> --summary="…"`. HQ shows it on the timeline, and the next WBR lists it under Agents.

## The pipeline end to end (founder rule, 2026-10-16)

Applies to: a new role, a new agent definition (`.claude/agents/*.md`), a new org or team, a new HQ floor or room, a new lane on the POC map, a reporting-line move, and a retirement. It also applies to the sibling company (the Press): its roles live in hanialshater/system3, but the founder still approves each one.

| # | Step | Owner | Artifact | Gate before the next step |
|---|---|---|---|---|
| 0 | **Intake.** A founder ask, a manager's batch item, or a health finding says "we need a new X" | chief-of-staff routes it. It creates nothing, and it does not run the missing role as general-purpose in the meantime | a board item owned by chief-of-staff-ceo-office, and a line in founder-inbox.json if the founder asked | none |
| 1 | **Is it a process problem?** Before designing a role: could an existing role, a handoff or a standing order do it? (My failure mode: "adding roles to fix problems that are really about process") | Leonie | a short paragraph at the top of the record: why an existing role cannot do this | if an existing role can do it, stop. Route it on the POC map instead, and tell the founder in the record |
| 2 | **Design** | Leonie | `company/decisions/<date>-<slug>.md`: scope, reporting line, lane and POC, what it takes from existing roles, its checker (never itself), its first dispatch, HQ placement (floor and row, named only), budget tag, sunset check, `## Consulted`, `## Objections` | for a category, playbook steps 1-3 must exist (below) |
| 3 | **Consult** | the directs in "Steps" 2, each answering in writing | answers in `## Consulted` | every consulted direct has answered, or has been asked twice and the record says so |
| 4 | **Founder approves** | founder | `status: approved`, the founder's words verbatim, with the date | **hard gate.** Without it, steps 5-8 do not happen. An open objection goes to the founder with the record, not around it |
| 5 | **Generate** | the role the record names (default: the CEO office for roles.mjs, people.mjs and generate; the Press's own repo for Press roles) | `tools/org/roles.mjs`, `tools/org/people.mjs`, `node tools/org/generate.mjs` → `company/roles/<id>.md` and `.claude/agents/<id>.md`. **No hand-written agent files** | `npm run check` passes. The commit message links the record |
| 6 | **Place in HQ** (floors and rooms) | tools-lead and hq-engineer, from the record's placement line | HQ code and the room map | after step 5. The CEO office writes no HQ code |
| 7 | **Wire** | Leonie | the role's row on company/ceo-office/poc-map.md, its handoffs on handoff-map.md, and the `org-change` event (step 5 under "Steps") | the role is on the POC map before its first dispatch |
| 8 | **First dispatch** | the role's lane POC asks for it in a batch. The chief of staff dispatches it (company/ceo-office/dispatch-requests.md) | the first board item, run | within 7 days, or the next WBR flags it (O3 in the handoff map) |
| 9 | **Used, or retired** | Leonie, at the WBR (agent metrics) and the sunset date in the record | the role evaluation; offboarding if it is unused | a role with no dispatch in 14 days gets a verdict: activate, re-scope, merge or retire. Retirement comes back to step 2 as its own record, and the founder approves it |

**What counts as "new":** the role id (or agent file, floor or room id) is not yet in tools/org/roles.mjs, HQ or company/sibling/press/hq-snapshot.json. Renaming a person, or a wording fix inside a role's existing scope, is not new. It still needs a decision record, because roles are never edited without one.

**Mechanism:** at each WBR, Leonie diffs `tools/org/roles.mjs`, `.claude/agents/` and HQ's room list against `company/decisions/` since the last WBR. Any role, agent, floor or room with no approved record is a health finding. The chief of staff answers it in writing, and it goes to the founder in the digest.

## When the role is for a new category: the playbook's order (since 2026-10-15, W-899)

A category's org is step 5 of `company/product/verticals/category-onboarding-playbook.md`. A founder decision skips no step. This office does not start before the steps it depends on, and does not do the steps after it.

| Playbook step | Owner | What this office checks before it acts |
|---|---|---|
| 0 Intake | chief-of-staff | Nobody has touched roles.mjs, HQ or the kit |
| 1 Strategy and sizing | principal-pm-verticals | The sizing doc exists (`company/product/verticals/<date>-<slug>.md`) |
| 2 DLR proposal | domain-scout | The DLR record exists and names a CM (new, or an incubating neighbour) |
| 3 Decision and slots | head-of-product | The decision record exists, with the slot line and the boundary rulings. **Step 5 starts only after this** |
| 4 Project budget | portfolio-manager | Runs in parallel with step 5. No tagged dispatch before it passes |
| **5 Org (this office)** | chief-of-staff-ceo-office | The record (steps 1-4 above), `cm(...)` in roles.mjs, people.mjs, generate, the event. **One CM now. Strand managers (`SUBAREAS`, `DOMAIN_NAMES`, `STRAND_RULES`) only after the DLR five pass, or when tranche 2 is released**, and only if the size needs them |
| 6 HQ placement | tools-lead, hq-engineer | After step 5. This office names the floor and row in the record and writes no HQ code |
| 7 Charter and curriculum | the new CM | Runs with step 5. This office drafts no charter, curriculum or briefs (History objection 4) |
| 8 Catalog wiring (`DomainId`, `domains.json`) | platform-engineer | After step 5. This office proposes the domain id in the record and never edits the kit (History objection 7) |
| 9 Checkability | the CM drafts; fact-checker agrees | Written into the CM's scope as a gate before briefs |
| 10-13 Research, pilot, rituals, launch or retire | research-lead, CM, chief-of-staff, domain-scout, head-of-product | Not this office's. Retirement of the role (if the category folds) is, through offboarding |

The consultation for a category role always includes head-of-product (the CM's line), principal-pm-verticals (the interim owner), every neighbouring CM the boundary table names, and the fact-checker (the step-9 route). Add Kenji only if the kit is touched, and Hilde only if a gate is.

When the founder asks for a role directly, the founder has decided. Consulting the directs then does not reopen that decision. It answers *how*: placement, handoffs, and what the role takes from the directs' orgs. Their objections are still recorded.

## Retroactive round (2026-10-13)
These were added today without consulting the directs. Each affected direct reviews them in a consultation note under `company/ceo-office/consultations/`:
- portfolio manager
- principal engineer for operations, and the principal engineer's move to the CEO office
- the R&D and Research orgs and the VP of R&D
- the design org and the illustrator
- the sub-area managers
- the principal PM for verticals
