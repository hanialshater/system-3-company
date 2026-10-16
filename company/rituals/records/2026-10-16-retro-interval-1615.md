# Retro: 2026-10-16, interval 14:35–15:32Z (founder: "the number of demos did not move")

owner: chief-of-staff · attendees (by report): principal-engineer-ops (throughput diagnosis c5a73a4), evaluation-steward (W-843 a40bdea), head-of-product (Wave J launch 7ab3934, Life Hacks DLR r2 a29b8e5), lifehacks-safety-reviewer (0c64108), analytics-steward (d83d7b7), release-manager (f9265aa, 00b4b1e), chief-of-staff-ceo-office (floor reseat 2976eb7, consultation 8ab264d), tools-lead (F-39, F-42), hq-engineer (F-40), principal-pm-verticals (F-42 pilot day 1)
Correction 15:38Z: times in this record were first written as 16:xx; the host clock read 15:3x. The file name keeps "1615" so links hold.
recorded by: chief-of-staff (citing the attendees' reports; no words in their name)

## Numbers (git, ledger after the 15:30Z import)
- Published 688 → 709 (+21 in this interval: 15 Wave J at 7ab3934, 6 Life Hacks, the first in that category, at 00b4b1e). Nothing deployed.
- Founder decisions recorded: F-39 (agent memory), F-40 (floors), F-42 (mailbox dispatch), F-43 (First Light +1M); F-41 (throughput), F-44, F-45 open.
- Merged: F-39 memory (tier 1), F-40 floors, F-42 mailbox (tier 1). Two package.json lines wait for principal-engineer-ops.

## What went well
- **Unblocking beat building.** One ruling (W-843) plus one launch review published 15 lessons for ~0.3M; two missing inputs (W-1082, W-1083) opened Life Hacks. Both had sat for days.
- **Independent numbers corrected mine:** PE-ops showed 44 held lessons were clean, not ~250.

## What hurt
1. **I reported a held-lesson count from `company status` that ignores holds and learner verdicts** (≈250 vs 44 clean). Mechanism: A8 in the DLR r2 record asks principal-engineer for `company publish` to refuse incubating, held or unverdicted lessons; until then I quote `publish-ready` only.
2. **My brief to Leonie replaced her onboarding with a reading list.** Fixed by F-39: the start and finish steps now live in the agent template.
3. **The first F-40 browser check 404'd** because HQ is off in production builds; I lost one build cycle. Note added to my memory.
4. **Builders sat idle while work waited on manager rounds and me** (PE-ops: 6.1 of 14 agents, 1.28 of 3 builders on average). F-42's pilot is the change under test.

## What we will change
| Change | Mechanism | Owner | Board |
|---|---|---|---|
| Quote ready counts from publish-ready, never company status | checklist line (this record) | chief-of-staff | — |
| Builders pull work from mail, no manager round | F-42 pilot, 3 days, measured | principal-pm-verticals, chief-of-staff | W-1471 |
| Retune ritual thresholds so they don't block on bookkeeping merges | W-1426 | tools-lead | W-1426 |

## Objections
| Objection | Raised by | Status |
|---|---|---|
| A coordinator-written retro is not the attendees' retro. | chief-of-staff-ceo-office (standing) | Open: W-1203. |
| Rituals at 5 merges block dispatch while the founder asks for output. | chief-of-staff | Open: W-1426; held anyway, as R1 requires. |
