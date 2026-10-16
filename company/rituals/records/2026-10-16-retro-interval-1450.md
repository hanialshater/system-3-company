# Retro: 2026-10-16: interval 13:49Z–14:35Z (build hold lifted, eleven merges)

owner: chief-of-staff · attendees (by report): demo-builder ×5 (cs soft locks, physics #61-63, head-on v2, Wave J design fixes, History B4 stop), tools-lead (r5 B1-B3 conditions), principal-engineer (code checks), evaluation-steward (in-flight check, COE-B re-check), head-of-product (launch review r5), analytics-steward (predictions, EXP-004/005), release-manager (publish 9), cm-probability ×3
recorded by: chief-of-staff (an interval record; the previous retro is 2026-10-16-retro-rounds-3-5.md)

## Numbers for this window
- 11 merges: tools-r5-b1, tools-r5-b2, tools-r5-b3, cs-r5b-softlocks, wj-phys-r3b3, phys-headon-v2, wj-design-r5b1, hist-r4-b4 (notes only), product-r5-b1, beh/CO2 follow-ups.
- 9 lessons published in the repository (684 total); none deployed.
- 1 build stopped correctly on its stop-if (History B4: stages 30 and 29 > 25).

## What went well
- Stop-ifs worked: History B4 refused to build over budget and sent it to cm-history; head-on v2 fit R8 without a re-layout.
- The published soft locks were fixed and merged about 2.5 h after the probe found them, ahead of trigger H.

## What hurt (with evidence)
1. **My own commit subjects re-tripped the incident gate.** The git backfill types any commit whose subject says COE/incident/SEV2 as an incident; 11 such commits (mine and the reviewers') were counted as uncovered SEV2s, including my reclassification commit itself. Fix owner: tools-lead (W-1404). Interim: I reclassified them by hand with a logged note.
2. **I left a build slot claimed** (review-server rebuild 2) after the build finished, so dispatch-check counted 3 builders against 2 real.
3. **Ritual thresholds tuned for a slower company:** retro every 5 merges and WBR every 10 now fire hourly at today's pace.

## What we will change
| Change | Mechanism | Owner | Board id |
|---|---|---|---|
| Classify only real incident declarations | events.mjs git classifier | tools-lead | W-1404 |
| Release my own slots right after the build | checklist line, and dispatch-check's possibly-finished list | chief-of-staff | — |
| Retune ritual merge thresholds to the cap-14 pace | rituals-due.mjs thresholds (proposal, lane 10 decides) | evaluation-steward | new item |

## Objections
| Objection | Raised by | Status |
|---|---|---|
| An hourly interval retro is ceremony, not learning. | chief-of-staff | Open: routed as the threshold item above; until then the gate is honoured with short records like this one. |
