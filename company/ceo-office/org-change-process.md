# Adding, moving or retiring a role: consult the founder's directs first

owner: chief-of-staff-ceo-office (Leonie) · since 2026-10-13 (founder: "When you add people, check with my directs; some of them need to know")

The founder's directs are the roles with `reportsTo: founder` in `tools/org/roles.mjs`. Today they are:
- chief-of-staff (Ada)
- head-of-product (Priya)
- evaluation-steward (Hilde)
- principal-engineer (Kenji)
- chief-of-staff-ceo-office (Leonie)
- vp-rnd (Vera)

## Steps
1. **Draft:** write the decision record (`company/decisions/<date>-<slug>.md`) with the role's scope, its reporting line, and what it takes from existing roles.
2. **Consult** before the role is generated:
   - **always:** Leonie (org health), and the direct whose org the role will sit in;
   - **when relevant:** any direct whose scope the role touches. A role that touches gates or reviews consults Hilde. One that touches engineering, the kit or data consults Kenji. Lessons, product or categories consult Priya. Dispatching or the loop consults Ada. Labs or research consult Vera.

   Each one answers in writing in the record's `## Consulted` section: agree, agree with changes, or object, with the reason. Objections travel with the decision.
3. **Generate:** edit `tools/org/roles.mjs`, then run `node tools/org/generate.mjs`.
4. **Inform:** add an `org-change` event: `node tools/events.mjs add --type=org-change --room=ceo-office --actor=<who> --subjects=<role ids> --summary="…"`. HQ shows it on the timeline, and the next WBR lists it under Agents.

When the founder asks for a role directly, the founder has decided. Consulting the directs then does not reopen that decision. It answers *how*: placement, handoffs, and what the role takes from the directs' orgs. Their objections are still recorded.

## Retroactive round (2026-10-13)
These were added today without consulting the directs. Each affected direct reviews them in a consultation note under `company/ceo-office/consultations/`:
- portfolio manager
- principal engineer for operations, and the principal engineer's move to the CEO office
- the R&D and Research orgs and the VP of R&D
- the design org and the illustrator
- the sub-area managers
- the principal PM for verticals
