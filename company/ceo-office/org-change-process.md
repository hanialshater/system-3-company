# Adding, moving or retiring a role: consult the founder's directs first

owner: chief-of-staff-ceo-office (Leonie) · since 2026-10-13 (founder: "When you add people, check with my directs; some of them need to know")

The founder's directs are the roles with `reportsTo: founder` in `tools/org/roles.mjs`. Today they are:
- chief-of-staff (Ada)
- head-of-product (Priya)
- evaluation-steward (Hilde)
- principal-engineer (Kenji)
- chief-of-staff-ceo-office (Leonie)
- vp-rnd (Vera)
- vp-marketing (Celeste), since 2026-10-14 (company/decisions/2026-10-14-marketing-org.md)
- head-of-strategic-initiatives (Beatriz), since 2026-10-15 (company/decisions/2026-10-15-head-of-strategic-initiatives.md). Consult on anything that changes a running initiative's core team or owners

## Steps
1. **Draft:** write the decision record (`company/decisions/<date>-<slug>.md`) with the role's scope, its reporting line, and what it takes from existing roles.
2. **Consult** before the role is generated:
   - **always:** Leonie (org health), and the direct whose org the role will sit in;
   - **when relevant:** any direct whose scope the role touches. A role that touches gates or reviews consults Hilde. One that touches engineering, the kit or data consults Kenji. Lessons, product or categories consult Priya. Dispatching or the loop consults Ada. Labs or research consult Vera. Anything said in public about the company consults Celeste.

   Each one answers in writing in the record's `## Consulted` section: agree, agree with changes, or object, with the reason. Objections travel with the decision.
3. **Generate:** edit `tools/org/roles.mjs`, then run `node tools/org/generate.mjs`.
4. **Inform:** add an `org-change` event: `node tools/events.mjs add --type=org-change --room=ceo-office --actor=<who> --subjects=<role ids> --summary="…"`. HQ shows it on the timeline, and the next WBR lists it under Agents.

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
