# First Light: weekly risk re-score

owner: head-of-strategic-initiatives (proposes and re-scores) · writer of company/ops/risks.json: principal-engineer-ops (decides whether a proposal enters it, W-918) · cadence: every Friday, newest first

I do not write risks.json. Each entry below is a **proposal** with its evidence. The proposed rows also sit in status.json under `risks` with `status: "proposed"`, so the war room shows them until principal-engineer-ops rules.

## 2026-10-15 (week 1, first re-score)

### FL-06 (new, proposed): review capacity for tier-2 readiness and privacy is the critical path

**Origin.** The tech lead's objection to the role (company/decisions/2026-10-15-head-of-strategic-initiatives.md, objection 5, synthesised; W-911 asks him to confirm): "auth, server-side progress and learner data are tier 2 and fall under the readiness gate, so the critical path is the review capacity of principal-engineer-ops and privacy-reviewer, and a new owner does not add any of that capacity." The evaluation steward extended it to her org (consultation change 4; quality-bar.md §3). Both are right, and this entry carries both.

**Proposed score: likelihood 4 × impact 5 = 20** (open). That puts it level with R-001 (host) and R-013 (founder bandwidth).

**Evidence for likelihood 4:**
1. **privacy-reviewer has never run.** The budget pack's unit for it is a proxy (75k, from lifehacks-safety and accessibility-reviewer runs; Addendum A). First Light asks it for about 13 runs (pack, "What binds"), plus the gate criteria by 10-22 (W-932) and the rulings by 11-09. It also sits in two places on the path: the data-model review before auth code (dependencies.md D-17) and the rulings that decide whether social and the ad slot ship (D-22). Its 3 open board items (W-086, W-892, W-932) are all backlog.
2. **principal-engineer-ops has 3 measured runs** (81k mean) and 11 open board items, including W-918, W-923, W-924 and W-934 for First Light. It approves every tier-2 readiness record (auth, the database, the event API, the deploy) plus 2 go/no-go readiness runs. The one tier-2 record it has approved so far, r7 (company/engineering/readiness/2026-10-15-r7-drafts-trust-sheet.md), took two rounds in one day: "approved with conditions" with five residual leaks filed (commits cef5165, f004f3c), then a re-review of fd63b1c with two conditions amended (c0cfd14). Two rounds per record is the only measured rate.
3. **The reviews are serial.** EDD-007 asks for the readiness record before coding. Auth needs EDD → PE review → privacy data-model review → readiness approval before its first code run, and a rework round in any of them restarts the chain (dependencies.md §2).
4. **principal-engineer** owes about 19 PE reviews to First Light (pack) and has 17 open board items, two of them due this week (W-930 on 10-22, W-908 on 10-23).
5. **The quality team's ~64 runs (~9.6M) are unbudgeted** (W-929). learner-evaluator has 13 open items and competes one for one with Wave J, and the catalog queue already holds lessons blocked on "no borrowed-mind learner review" (`npm run company -- status`).
6. Against it, and the reason this is a 4 and not a 5: these are agent roles, so more than one instance can run. The limit is not head count. It is the dispatch caps (8 agents, 3 builders), the review budget lines, the shared host (R-001), and the serial order. All of these can be planned for, if they are planned now.

**Evidence for impact 5:** auth and server-side progress are the core of the release goal (charter: "accounts, progress that follows the learner"). If their readiness record is not approved, they cannot ship, and mastery and account-keyed personalization cannot ship either. That is a launch slip, not a cut. Missing privacy rulings cut social and the ad slot (stop rule), which is impact 3 on its own. The auth path sets the score.

**Early-warning signals (where to look):**
- W-932 (privacy gate criteria) not on disk by **2026-10-22**: the privacy reviewer's first run is late before the build has started.
- The auth EDD (D-16) or its readiness record not on disk by the tranche-1 checkpoint on **2026-10-23**.
- Any tier-2 readiness record waiting more than 24 h for approval (EDD-007's own target is a median under 4 h; no measurement exists yet).
- `node tools/ledger.mjs report` showing no privacy-reviewer run by 10-23.
- W-929 not approved at Project Review 1.

**Proposed mitigations (each owned elsewhere; I track them):**
1. portfolio-manager: name the review lines in the tranche-1 approval (privacy-reviewer, principal-engineer-ops, PE reviews and the W-929 quality line), and give First Light review items priority in the weeks of **10-19** (EDD and data-model reviews) and 11-09 and 11-16 (quality).
2. chief-of-staff: file the auth EDD, privacy data-model review and readiness records as board items now (dependencies.md §3), so the reviews are queued before the code is.
3. principal-engineer-ops: report the approval time of each First Light readiness record at the Friday review. If the median passes 4 h for a week, use EDD-007's own fallback (delegate tier-2 approval for one team's services to principal-engineer).
4. head-of-product: the cut order is already in the stop rule (ad slot, light social, challenges). If FL-06 reaches its signals, I propose the first cut to her in writing. She decides in a record.

**Links:** R-013 (founder bandwidth), R-001 (host), R-012 (budget), FL-03 (privacy and children), W-911, W-918, W-929, W-932.

### Two more entries this week (proposed)

| Risk | Proposed L×I | Change | Evidence | Owner |
|---|---|---|---|---|
| **FL-07 (new): the performance budget pulls the all-metas fix onto the critical path** | **4 × 4 = 16** | new | Q5.3 measured 2.32 MB gz against a 500 KB bar, and Q5.4 measured 16.7 s against 3.0 s (quality-bar.md Q5). The fix (EDD-001 option 4 / EDD-003 A1) needs AMD-001 (c2) (F-03, open since 10-12) and sits in scale-stage-1, which the founder kept off the critical path. W-946 found the 5.3 MB client chunk that carries all 960 metas. Answer due 10-22 (W-930) | principal-engineer |
| **Pre-mortem row 1: founder decisions on the path** (registered under R-013) | **4 × 4 = 16** (unchanged) | confirmed | F-01 open since 10-13. Four founder decisions sit on the path in 15 days: F-15 (10-16), F-01 (10-23), F-19 (10-30), plus the freeze acceptance. F-17, F-18, F-23 and F-08 are near it. If F-01 is still open on 10-23, I will propose impact 5, because tranche 2 for the account workstreams does not release | head-of-strategic-initiatives |

The other proposed rows (FL-01 to FL-05, status.json) keep their scores this week, since no new evidence has come in. W-908 on 10-23 is the evidence that re-scores FL-02.

**Top three this week:** FL-06 (20), FL-07 (16), founder decisions on the path (16). FL-03 (privacy and children, 15) is next.
