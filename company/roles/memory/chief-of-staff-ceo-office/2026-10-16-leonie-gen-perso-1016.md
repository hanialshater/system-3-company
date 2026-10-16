### 2026-10-16 · leonie-gen-perso-1016 · chief-of-staff-ceo-office
- did: Generated the personalization org on founder approval: vp-personalization (rename) + N1-N6, edits E1-E3, memory moved, 14 board items re-owned, lane 14 and handoff map updated
- learned: tools/memory.mjs has no rename: move <old>.md and <old>/ to the new id BEFORE running generate, or generate creates an empty memory for the new id (tools/org/generate.mjs)
- learned: Generating a role without an HQ seat fails tests/hq floors test 18 (every role needs HOME/ROOM_BY_ROLE); test:hq is not in CI, only in verify (tests/hq/floors.test.mjs)
- know: company board has no owner command: re-owning is a JSON edit with a dated note per item; done items were left with their historical owner (company/ops/board.json)
- know: Pool roles go in MANY in people.mjs and take a POOL name per instance; single roles need a PERSONA name (tools/org/people.mjs)
- open: HQ placement of six new roles: personalization and model-lab rooms draw 2 seats each for 8 roles (W-1524)
- open: Prose in other owners' records still names personalization-lead, incl. AMD-008 P1 and EDD-008 settings row (W-1525)
- open: org-change event is the chief of staff's to write; first dispatches per proposal §4 (company/ceo-office/2026-10-16-personalization-org-proposal.md)
