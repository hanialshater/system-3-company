# Throughput diagnosis, 2026-10-16

owner: principal-engineer-ops (Rhea) · slot: pe-ops-throughput-diagnosis · asked by: founder ("We should achieve more TBH I smell a problem")
sources, all read on 2026-10-16 between 14:55 and 15:10Z: `company/ops/ledger.jsonl` (942 rows; today's rows end at 14:23:37Z), `node tools/ledger.mjs report`, `company/ops/events.jsonl` (1,443 events today), `git log --since=2026-10-16` (576 commits, 00:12 to 14:57Z), `company/ops/board.json`, `node tools/publish-ready.mjs` (run twice: before and after a40bdea), `company/ops/publish-holds.json`, the 41 dispatch requests dated 2026-10-16 (r2 to r6), and every `src/demos/**/meta.json`. The splits are described under Method. I did not use progress.md as evidence. Where I quote it, it is testimony.

## Answer in five lines

1. Today's measured spend was **18.65M tokens, 217 runs and 31.5 agent-hours** (subagents only, to 14:23Z). Of that, **8% built new lessons and 7% reworked them. Manager rounds took 35%**, checks 18%, incidents and their guards 11%, process 10%, and non-lesson platform work 11%.
2. **Yield fell from 9.3 published per M tokens on 10-14 to 0.70 per M today** (13 published for 18.65M). The biggest queue is `review`: **256 lessons, 244 of them added on 10-14, so about 2 days old**.
3. The founder's "~250 gate-clean lessons held" is not what the data says. The publish tool checks the hold first and never looks behind it. Behind the holds, **only 44 lessons are gate-clean** (33 Life Hacks, 11 others). **162 Life Hacks lessons have a learner `revise` verdict** (153 of them from 10-15) and are waiting on F-36.
4. The binding constraint is not the agent cap. On average **6.1 of 14 agents and 1.28 of 3 builders were running**, and **no builder was running in 100 of 303 minutes** (09:20 to 14:23Z). What limits output is the round-by-round manager protocol, the gates that reset claims, single-person gates, and budget stops on the lesson lines.
5. Five fixes follow, each with an owner. Two need the founder (F-36 plus the DLR ratification, and the budget top-ups or kills).

## 1. Where today's tokens and agent-hours went

Each ledger row was classified by its agent label (regex, after stripping the `·xxxx` hash). Rows are 2026-10-16 00:00 to 14:23Z.

| Bucket | Runs | Tokens | Share | Agent-hours | What is in it |
|---|---:|---:|---:|---:|---|
| Manager rounds: pure coordination | 46 | 4.12M | 22% | 3.9 | "<lane> POC: round-N batch", "r5 manager: <role>", positions, triage, objection windows |
| Manager rounds: content rulings and briefs | 29 | 2.35M | 13% | 2.4 | cm-* content runs and patches, rulings, "stage counts" (×8 in r5), research for briefs |
| **Manager rounds, total** | **75** | **6.47M** | **35%** | **6.3** | |
| Checks (FC, QA, learner, cultural, research) | 41 | 3.42M | 18% | 5.8 | SO-10-1/2/3 runs, re-walks, re-QA |
| Platform/launch, non-lesson | 25 | 2.14M | 11% | 4.9 | First Light (privacy, accounts, beacon, growth), scale-stage-1 |
| Incidents and the guards built after them | 30 | 2.01M | 11% | 4.3 | COE-A (/dev/null), COE-B (autostash), commit/pkill/git/build-slot guards, G5/F5 fold gates, their PE and PE-ops reviews |
| Process and governance | 21 | 1.85M | 10% | 3.6 | readiness approvals, steward audits, AMD-011, slot ledger, retro, WBR |
| **New lesson builds** | **10** | **1.46M** | **8%** | **3.6** | behavioral briefs 1-4, History 23/24, Wave J briefs, Life Hacks W3 |
| **Rework (revisions, fixes, flips)** | **15** | **1.30M** | **7%** | **3.0** | v2/v3 builds, soft-lock fixes, design-review fixes |
| Total | 217 | 18.65M | 100% | 31.5 | |

For contrast, the same split on **10-14** (55.1M, 448 runs, 183 agent-hours) had **manager coordination at 0.3M (under 1%)**. About 70% of 10-14 went to builds, rework and checks (the "other" bucket that day is mostly builder labels, e.g. "Algo builder: pair 11", "NCM builder p2").

**Coordinator (not in the ledger).** The coordinator made 329 of today's 576 commits (author "Claude"). **247 of the 329 (75%) are bookkeeping**: "Board…", "Events…", "Merge main-checkout records", "Dispatch records", "Progress". Its tokens are not measured at all (ledger header: "coordinator not included").

**Measurement defects. These are mine to fix, and they move the numbers by a few percent.**
- **Possible double counts.** Four labels have two or three `done` rows a few seconds apart, with token counts rising slowly (for example `Privacy re-read accounts M1-M6 ·a3f8` at 107,661, 108,363 and 108,948). That pattern looks like the same run reported cumulatively, which would overcount by about **0.55M (3%)**.
- **Stops that are not stops.** The 11 `stopped` rows at 13:08Z are the chief of staff closing runs that had already finished. They inflate the stop rate.
- **Runs with no record.** 74 dispatched agents have no usage or stop record (all-time).
- **"~47M imported since 10-14" is not today's spend.** It is the 14:55Z ledger import (commit "Ledger import (W-1231): 437 runs, 47.5M"), a backfill of runs from 10-14 onward.

## 2. Yield

| Day | Measured tokens | Lessons added | Published (status → published) | Published per M tokens | Tokens per published lesson |
|---|---:|---:|---:|---:|---:|
| 10-14 | 55.1M | 451 | 515 | 9.3 | 107k |
| 10-15 | 12.0M | 0 | 40 | 3.3 | 300k |
| 10-16 (to ~15:00Z) | 18.65M | 10 | 13 (9 at 14:08 + 4 at 14:54) | **0.70** | **1.43M** |

Published went 675 → 688 today (git, meta.json at the first commit before 10-16 vs HEAD). At 14:57 (a40bdea), the "pass"-wording fix moved **16 lessons to publish candidates**. If they publish today, today's yield is 29 for 18.65M, which is 1.6 per M. That is still a sixth of the 10-14 rate.

**By stage today:**
- **Build.** 10 runs, 1.46M, 10 new lessons. That is 146k per new lesson, the same order as 10-14, so building is not the problem.
- **Checks.** 41 runs, 3.42M. They wrote 295 review records: 70 learner (50 launch, 20 revise, a 71% launch rate), 103 QA and 73 fact-check. That is about 12k tokens per record, which is cheap per record. The trouble is how much of it is repeat work (cause 3).
- **Claims.** Fact-checkers wrote 393 `verified` lines into meta.json today. Builders wrote 300 `unverified` lines (resets and new claims). The net change across the catalog is **+205 verified** (4,977 → 5,182) and −129 unverified (188 → 59). So **about 188 verifications (48%) re-verified claims reset that same day.**
- **Publish.** 13 lessons. One launch-review chain (W-1233: launch review, predictions, objection window, publish) cost about 0.4M for 9 lessons.

**The queue:**

| Stage | Count | Age (when meta.json was added) | What is behind it |
|---|---:|---|---|
| draft | 25 | 22 from 10-14 (2 days), 3 from today | — |
| **review** | **256** | **244 from 10-14 (2 days)**, 2 from 10-12, 6 from 10-13, 4 from today | 200 Life Hacks (all 10-14) + 56 others |
| published | 688 | — | — |

The review queue, read behind the holds (my script calls `decide()` from tools/publish-ready.mjs and ignores publish-holds.json):

| | Learner launch, claims all verified | Launch, open claims | Verdict for an older version | Learner `revise` |
|---|---:|---:|---:|---:|
| Life Hacks (all 200 held) | **33** | 3 | 2 | **162** (147 with claims clean) |
| Others, held | 11 | 0 | 0 | 1 |
| Others, not held | 13 → 16 candidates after a40bdea | 3 | 1 | 27 |

## 3. Structural causes, with evidence

### C1. Manager rounds became the production line, and the rounds have high latency (35% of tokens)
- The managers-batch protocol started today: round 2 at 10:12, r3 at 12:18, r4 at 12:58, r5 at 13:18, r6 at about 14:50. Every lane writes a dispatch request, then the coordinator reads them all and dispatches.
- **41 dispatch requests today, 723 KB of prose** (r5-portfolio alone is 31.5 KB). For one example, r6-lifehacks spends about 23 KB to ask for 2 builders, each to change two option strings and one aria-label.
- **r5 asked for 41 agents, 6 of them builders.** Its 8 "stage counts" runs (chemistry ×3, geography ×3, math ×2) were counting work.
- Builders sat idle between rounds. They averaged **1.28 running against a cap of 3**, with zero builders for **33% of minutes**, while 6.1 agents on average were running.
- On 10-14, before the protocol, manager coordination was under 1% of spend.

### C2. Life Hacks: one serial gate stands in front of 200 lessons, and 162 of them are not actually clean
- publish-holds.json has a hold on each of the 200 lessons ("held until the Domain Launch Review passes this lesson"). Behind the holds, 33 are clean.
- The DLR record (company/rituals/records/2026-10-15-domain-launch.md) opens the domain with five wave-1 lessons. Wave 2 waits on `spaced-beats-cram`, and kitchen (wave 3) does not publish from this review.
- r6-lifehacks: "the slate's QA condition is met. **The only open gate on all six is Sana's launch attestation (W-1082)**." W-1082 has been in `backlog` since 10-15. lifehacks-safety-reviewer has **3 ledger runs all-time and 0 today**.
- The 162 `revise` lessons (153 verdicts from 10-15) are frozen by F-36, open with the founder ("no new wave, only revisions"). Their revisions run through manager rounds a few lessons at a time.

### C3. Gate loops: one finding resets claims and restarts the whole check chain
- 300 claim lines were reset or added as `unverified` and 393 verified, for a net of +205. About half of today's fact-check output re-verified same-day resets.
- The briefs require this. r6-lifehacks B2 says "reset each changed claim to `unverified`", followed by SO-10-2 FC, SO-10-1 QA and a learner re-walk.
- History's own pricing (r6-history) puts a 3-lesson revision at **~300k build + ~350k checks = ~650k, about 217k per lesson revised**. That is twice the cost of building a new lesson.
- The QA independence audit (CoS handoff 11:30Z: "197 of 217 'ready to publish' lessons rest on non-independent QA") sent about 200 lessons back through re-QA. That was the right call, and it is a one-time cost.

### C4. Budget stops land on the lesson lines, which are charged for their own coordination
- r6-behavioral: **all 5 items (4 builders) wait on a top-up** (behavioral-econ at 2.4M of 1.8M, 129%). r6-history: **all 3 items (2 builders) wait** (6.3M of 2.5M, 251%).
- `[project:x]` tags put manager, POC, research and readiness runs on the lesson line. Today 6.47M of manager-round tokens were spread across lines.
- History's line holds 6.3M for 4 published lessons, which is 1.57M per lesson.
- The grace period for wave-j, lifehacks-engine-v2, books-decks and history ends **2026-10-16 23:59Z** (token-budget.md §6). From tomorrow, more lines can hit a failing `gate`.

### C5. The shared host and checkout cause incidents, and the incidents keep the coordinator busy
- Two SEV2 incidents today (09:45Z /dev/null symlink; 13:06Z `rebase --autostash` in the shared main checkout, which lost agents' uncommitted work) and one SEV3 (11:27Z concurrent `next build` OOM).
- They cost 2.01M (11%) in COEs and guards. Each guard went through about 3 to 5 rounds of tools fix, PE check and PE-ops approval (E1/N1, F1/F2, F5, G5-a/b/d).
- The coordinator's 247 bookkeeping commits are hand-merges of the board and events, which agents in worktrees cannot write. That is the integration-time limit the CoS names in progress.md.
- My own lane is part of the 11%: principal-engineer-ops ran 14 times today for 1.11M, mostly sequential readiness re-approvals of the same guard set.

Not a cause, but visible: First Light and scale-stage-1 took 2.14M (11%) with 0 lessons by design. It is a release investment with its own budget and return measure (go/no-go 2026-11-23). I count it so it is not mistaken for waste.

## 4. Fixes

Estimates are mine. Medium confidence on the direction, low to medium on the numbers. Lessons/day means lessons reaching `published` in the repo. Deploys stay the founder's.

| # | Cause | Mechanism | Owner (route) | Expected lessons/day | Cost | Founder? |
|---|---|---|---|---:|---|---|
| F1 | C1 | **A pull queue for builders.** One ranked build queue per lane on disk, and a standing order (like SO-10-1/2/3) that lets the coordinator start the next item whenever a builder slot frees. Manager rounds become a 2-to-3-hourly re-rank, not a gate on every dispatch. Dispatch requests get a size cap (for example ≤ 4 KB plus a table), and "stage counts" work becomes a script, not an agent. | chief-of-staff-ceo-office (process design); chief of staff runs it | builders from 1.3 to ~2.5 busy on average, so about **+10–20/day** from build plus rework | ~1 design run (~150k); saves ~3–4M/day of coordination | No (F-30, managers dispatching their own teams, is a separate founder item and is not needed for this) |
| F2 | C2 | **Dispatch W-1082 now**: the Life Hacks safety attestation on the six slate lessons. Then publish the wave-1 lessons that are already clean. **Founder: decide F-36**, so the 162 `revise` lessons get one batched revision pass per engine family instead of trickling through rounds. | head-of-product (DLR chair) asks; chief of staff dispatches lifehacks-safety-reviewer; founder on F-36 and the OP ratification of incubating → active | **+5 on the attestation** and **up to ~20–30** of the 33 clean once the DLR flips (wave-1 strands only). After that, about **20–40/day** if the 162 revise lessons get a batched revision | ~1 attestation run (~100k); revisions ~150–200k each if batched by family | **Yes**: F-36 and the OP ratification |
| F3 | C3 | **Reset only what changed, and check once per version.** A claim resets only if its text or its stage fixture changed (diff-based, tool-enforced). One combined post-build check dispatch per lesson version (FC on the reset claims, QA, learner) replaces three separate SO passes for the same version. | evaluation-steward (gates and QA contract; out of my scope, routed); tools-lead builds it | Indirect: about **½ of FC churn saved (~1–1.5M/day)**, and each revised lesson reaches publish a round sooner. About **+5–10/day** | 1 contract amendment if it touches tests/qa or tools/company.mjs (protected); 1–2 tools runs (~200k) | No, unless the amendment needs ratification |
| F4 | C4 | **Charge coordination to coordination.** Manager, POC and readiness runs go on `leadership`/`rituals`, not on the lesson line. Then **decide top-up or kill per line** on the smallest finishing sets the lanes already priced (History B1–B3 ~650k for 3 lessons; behavioral r6). Do it before the grace period ends tonight. | portfolio-manager prices it; principal-engineer is the PE on the top-up; founder approves | +3–6/day from History and behavioral; it also stops tomorrow's gate failures on wave-j and LH v2 | about 1–2M of top-ups, or kill decisions | **Yes**: top-ups need the founder plus one PE (token-budget.md §4) |
| F5 | C5 | **No more guard rounds without a new incident.** Install the pre-commit guard (F-31, founder). Agents write board and events through the spool (`agent-events hook`, already built) so the coordinator stops hand-merging. One readiness approval per guard set, not per diff. | tools-lead (spool); chief of staff (stop hand-merges); principal-engineer-ops (batch approvals, mine) | Indirect. It frees about 75% of the coordinator's commits for dispatching | ~1 tools run; ~0.5M/day of process saved | **Partly**: core.hooksPath was refused by the permission system (F-31 routing) |

Recommended order: **F2 attestation and the 16 candidates first** (lessons today), then F4 before 23:59Z, then F1, F3 and F5.

Concrete next moves (I write none of these; I may not dispatch production work):
- **release-manager / head-of-product.** Publish the 16 candidates that publish-ready lists after a40bdea, through the normal gates. That is repo only, and any deploy needs the founder.
- **head-of-product.** Ask for W-1082.
- **portfolio-manager plus the founder.** Settle the top-ups or kills in F4.
- **chief-of-staff-ceo-office.** Design the F1 pull queue.
- **evaluation-steward.** Design the F3 reset rule.
- **principal-engineer-ops (mine).** Fix the ledger's double counts and stop-rate inflation, and add `pub per M tokens` and `builder occupancy` to `node tools/ops-health.mjs`.

## Method

- **Token split.** A scratch script (not kept in the repo; the rules are described here so they can be re-run): ledger rows by day, first matching regex on the label with the `·hash` stripped. The rules are in the order shown in §1. Expect ±10% between neighbouring buckets (for example, "content patch" counted as manager content rather than rework).
- **Concurrency.** For each minute from 09:20 to 14:23Z, I counted `done` runs whose `[ts − durationMs, ts]` covers that minute. Builder means role `demo-builder`, which undercounts builds run by other roles.
- **Gate status behind holds.** `decide()` imported from tools/publish-ready.mjs, applied to every `status: review` lesson, with publish-holds.json ignored. Claims count as clean when every `claims[].status` is `verified`.
- **Published and added per day.** `^+  "status": "published"` lines and added `meta.json` files in `git log -p` per day.
- **Queue age.** The date of the first git add of each meta.json. This is a lower bound on time in the queue, because some lessons went back to review later.

## Objections

| # | Objection | From | What happened to it |
|---|---|---|---|
| 1 | **To the chief of staff's operation.** The 11:30Z handoff says "the managers-batch protocol works … the real limits are host memory … and integration time." The data does not support the first half. Average occupancy was 6.1 of 14 agents and 1.28 of 3 builders, with no builder running in 100 of 303 minutes, so host memory was not binding today. Integration time is real (247 bookkeeping commits). The protocol itself is the largest cost (35% of tokens). | principal-engineer-ops | Open: written here, and F1 is routed to chief-of-staff-ceo-office. The chief of staff should answer in the next handoff with occupancy numbers, not with "noted". |
| 2 | **To the chief of staff's operation.** Closing finished runs as `stopped` (11 at 13:08Z, 1 at 13:21Z) makes the stop rate, which is a health metric I own, look worse than it is. It also leaves ledger rows with `tokens: null` next to the real `done` row. | principal-engineer-ops | Open. I will propose a `closed-duplicate` outcome in tools/ledger.mjs and events. Until then I exclude these rows from the stop rate. |
| 3 | **To the chief of staff's operation.** Dispatch requests have no size limit. Reading 41 requests (723 KB) costs the coordinator roughly 180k tokens a day, and none of that is measured. | principal-engineer-ops | Open: part of F1. |
| 4 | **To the brief's framing.** "publish-ready.mjs holds ~250 gate-clean lessons" reads the hold lines as gate status. The tool checks holds first and never evaluates what is behind them. Only 44 held lessons are clean. Lifting every hold would publish at most 44, not 250. | principal-engineer-ops | Answered in §2. The founder should read 44 + 16 as today's ceiling, not 250. |
| 5 | **To F2.** "Dispatch W-1082 now" must not become pressure on the safety reviewer to pass lessons. An attestation is a judgement, and the DLR rule (if fewer than five pass, the wave order goes to the founder) stands. | anticipated, lifehacks-safety-reviewer / head-of-product | Accepted. F2 asks for the run, not for a result. The estimates assume passes, and if the attestations fail, F2's yield is 0. |
| 6 | **To F3.** Narrowing resets could let a stage change slip past a claim whose text did not change. W-1078 is exactly that case: true arithmetic for a different fixture. | anticipated, evaluation-steward | Accepted as a design constraint. F3 resets on a text change **or** a fixture change. The steward owns the rule, and I do not. |
| 7 | **To F4.** Moving coordination tokens off the lesson lines could hide what a line really costs. | anticipated, portfolio-manager | Partly accepted. Report both numbers: direct cost per published lesson for the gate, and loaded cost for the review. The gate should not stop builders because of rounds the line did not ask for. |
| 8 | **To my own numbers.** The split is a regex over labels, about 3% may be double-counted, the coordinator is unmeasured, and the ledger stops at 14:23Z. | principal-engineer-ops | Stated in §1 and Method. The conclusions (manager share, idle builders, yield drop) hold under any reasonable reclassification. Each bucket is ±10%. |
| 9 | **To my own lane.** PE-ops spent 1.11M today (14 runs), mostly re-approving one guard set diff by diff. | principal-engineer-ops | Accepted: F5 changes this to one readiness approval per guard set. |
