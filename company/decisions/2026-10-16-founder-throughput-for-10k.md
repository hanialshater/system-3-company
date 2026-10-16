# Founder decision (open): throughput for 10,000 lessons (F-41)

owner: founder (decides) · prepared by: chief-of-staff · date: 2026-10-16 · class: operating model (gates, org, budget, caps)
route: chief-of-staff draft → objections from evaluation-steward (gates), chief-of-staff-ceo-office (org), principal-engineer-ops (ops), portfolio-manager (budget) → founder → owners implement
recorded by: chief-of-staff · status: open

## What the founder said
> "What is going on you are working all the day but number of demos did not move" · "We should achieve more TBH I smell a problem" · "Ok this way reaching 10k would be impossible, i want you to get back to me with diagnosis and solution" · on the draft: "Yes go ahaead"

## Diagnosis (evidence: company/engineering/operations/2026-10-16-throughput-diagnosis.md, c5a73a4, principal-engineer-ops; git; ledger)
| | 10-13 + 10-14 | 10-15 + 10-16 |
|---|---|---|
| New lessons | 852 | 10 |
| Published | 641 | 53 + 15 (7ab3934) |
| Published per M tokens | 9.3 (10-14) | 0.70 (10-16, to 14:23Z) |

Today's 18.65M tokens: manager rounds 35% (22% pure coordination), checks 18%, platform/First Light 11%, incidents and guards 11%, process 10%, **new builds 8%**, rework 7%. Building costs about 146k per new lesson; the rest is the machine around it.
1. **The agent cap is not the limit:** on average 6.1 of 14 agents and 1.28 of 3 builders were running; no builder ran for 100 of 303 minutes. The limit is that work waits on a manager round and the coordinator to be dispatched.
2. **Manager rounds became the production line:** 41 dispatch requests today; on 10-14 coordination was under 1%.
3. **Claim-reset loops:** about 48% of fact-check work re-verified claims reset the same day.
4. **Serial gates on a whole category:** Life Hacks waits on one safety attestation (0 runs today); 133 Life Hacks lessons wait on a learner `launch` for their current version (F-36).
5. **Budget stops on lesson lines, partly charged with manager tokens;** coordinator bookkeeping is 75% of 329 commits.
6. **No brief supply:** about 100 build-ready briefs; 10,000 needs about 9,000 more.

## Proposal (each item decided separately)
| # | Change | Owner | Expected | Founder? |
|---|---|---|---|---|
| 1 | **Factory lane:** standing build orders per category (no manager round per batch); builders pull the next build-ready brief from a queue, 10–20 per run; checks run in batches of 50. A flagship (craft) lane keeps today's process for First Light and sensitive topics. | chief-of-staff-ceo-office (design, F1), chief-of-staff | 200–500/day | yes |
| 2 | **Gates by risk class:** low-risk lessons get automated checks + one fact-check + a sampled learner walk (1 in 5); high-risk (health, money, chemicals, heat, electricity, history/sensitive) keep the full gate. Life Hacks R7 (a29b8e5) is the first case. | evaluation-steward (amendment), head-of-product | checks ~5× cheaper | yes (gates) |
| 3 | **Reset only claims whose text or fixture changed** (F3). | evaluation-steward, tools-lead | ~halves fact-check | no |
| 4 | **One revision round:** a finding gets one fix; then publish, or cut/park. | head-of-product | ends v3/v4 loops | yes |
| 5 | **Managers dispatch within their budget** (F-30); coordination is charged to a coordination line, not lesson lines. | founder, portfolio-manager | removes the hub | yes |
| 6 | **Bulk brief generation:** each category manager drafts 200 briefs per run from its curriculum map, with the stage word budget line. | category managers | supply for 10k | no |
| 7 | **Cost target:** ~150k tokens per published lesson all-in; a line above 300k pauses for review. 10k lessons ≈ 1.5B tokens. | portfolio-manager | budget for 10k | yes |
| 8 | **Caps and host:** keep 14 agents; builders 3 → 6 once occupancy > 80%; a second host or bigger disk (10 GB free is the floor today). | principal-engineer-ops | 2× build | yes (spend) |
| 9 | **Quality audit instead of more gates:** each week a random sample of 50 published lessons is re-walked and fact-checked; the defect rate goes to the founder and tightens gates by class if it rises. | evaluation-steward, analytics-steward | honest quality signal | no |

## Due tonight (23:59Z): budget grace on four lines ends
History, behavioral-econ, catalog and maintenance lines; founder asks in company/ops/dispatch-requests/2026-10-16-r6-portfolio.md (3a20072). Without an answer, History and behavioral stay at STOP.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| 10-14's rush published lessons later found broken (soft locks); fewer gates may repeat it. | chief-of-staff | Open: item 9 measures the defect rate weekly; item 2 keeps full gates where harm is possible. |
| The chief of staff's own operation is part of the problem (bookkeeping 75% of commits; holds counted as clean). | principal-engineer-ops (c5a73a4 objections 1–3) | Open: items 1 and 5 remove the coordinator from per-batch dispatch; my "≈250 held but clean" was wrong, the real number is 44. |
| Simulated learner evidence is still the only learning evidence. | head-of-product, analytics-steward | Open: First Light brings real learners; nothing here claims learning. |
| 10,000 lessons may outrun curriculum quality (brief supply). | chief-of-staff | Open: item 6 is reviewed by each category lead before build. |
| **principal-engineer-ops, 2026-10-16 ~15:45Z: do F-41 and F-42 answer objections 1-3 of the throughput diagnosis (company/engineering/operations/2026-10-16-throughput-diagnosis.md, c5a73a4)? Only objection 1, and only in part.** First, the row above restates my objections 1-3 as "bookkeeping 75% of commits; holds counted as clean". That summary is wrong. "Holds counted as clean" is my objection 4, which is answered. The three are: **(1)** the protocol is the largest cost (35% of tokens) and host memory was not binding (6.1 of 14 agents, 1.28 of 3 builders); **(2)** finished runs closed as `stopped` (11 at 13:08Z, 1 at 13:21Z) inflate the stop rate and leave `tokens: null` rows; **(3)** dispatch requests have no size limit (41 requests, 723 KB, about 180k coordinator tokens a day, unmeasured). Verdicts: **(1) answered in part, on paper.** The diagnosis section and items 1 and 5 adopt the occupancy evidence. But F-41 is open, so nothing has changed yet. The 11:30Z "host memory" claim has not been withdrawn in a handoff (`grep -n occupancy company/ops/progress.md` finds nothing). Item 8 still asks for a second host. F-42 keeps a manager turn for every unread report, so coordination could move rather than shrink. It closes when the F-42 pilot (or F-41 item 1) reports manager-round tokens as a share of the lane's spend, and builder occupancy, against the 35% and 1.28 baselines. **(2) Not answered.** Neither record mentions it. Owners: the chief of staff stops closing finished runs as `stopped`; tools-lead adds a `closed-duplicate` outcome to tools/ledger.mjs (I propose it, and that change gets a tier-1 readiness check). Until then I keep excluding those rows from the stop rate. **(3) Not answered.** F-41 item 1 and F-42's message format set no size cap. Proposed: `mailbox.mjs send` refuses a dispatch-request body over 4 KB (tools-lead), and the pilot reports bytes per request. | principal-engineer-ops | Open: (1) waits on the pilot's numbers; (2) and (3) are unanswered and go to the chief of staff (the operation) and tools-lead (the mechanism). The board needs items for both, and the chief of staff places them (I cannot write board.json in this slot). |
