# Operating audit: 2026-10-14

owner: chief-of-staff-ceo-office (Leonie) · audited: chief-of-staff (Ada) against company/ops/operating-loop.md · requested by: the founder ("We need to make sure we have good structure and rituals, you cant go random across the company"; then "make sure we fix this to have scalable and durable work", company/decisions/2026-10-14-founder-durable-ops-and-marketing.md)
status: findings final; every rule below is **proposed 2026-10-14, founder to ratify**
sources: `git log --since=2026-10-14` (786 commits from midnight to 18:15, then read again at 18:25), company/ops/events.jsonl (2,009 events dated 10-14), company/ops/progress.md (180 entries dated 10-14), company/ops/board.json (687 items), `node tools/rituals-due.mjs`, `npm run company -- status`, today's retro (company/rituals/records/2026-10-14-retro.md)

The chief of staff answers each finding in writing (CEO office authority: "require the operating chief of staff to answer each health finding in writing"). Put the answers under each finding, or in a reply file next to this one.

## 1. Findings

### The six admitted shortcuts, checked

| # | Admitted | Verified? | Evidence and corrections |
|---|---|---|---|
| A1 | Up to 20 agents and 9 builders, against about 8 and 3 | **Yes, and worse in one respect, better in another.** | Event log: peak **20 agents in flight at 06:51, 18 of them demo-builders** (7 revision builders R0-R6 and 11 "Algo builder: pair" agents), and 20 again between 14:00 and 15:00. Builders are therefore undercounted in the retro (18, not 9). **But** the cap in force from 06:41 was not 8/3: `company/decisions/2026-10-14-usage-upgrade.md` (owner chief-of-staff, accepted) raised it to 30 agents (20 in practice) and 10 on Opus, and operating-loop.md carries both caps (line 71: "at most 3 Opus builders and about 8 agents"; line 96: "Up to 30 agents at once"). By its own record the morning was inside the cap. The fault is the record: it set the cap from the token budget, when the binding constraint was a 4-CPU host (load 24-27 in the ops review, 25-60 in the retro; load 9.0 and 10.1 GB free at 18:20 while I wrote this), and the record's only objection was answered with "every builder works in its own worktree", which was not true the same afternoon. See F1. |
| A2 | Builders in the main tree broke the shared dev server | **Yes, for the afternoon.** | Morning builders were briefed into worktrees (72 of 99 builder dispatches say "worktree"; 27 do not, 5 say "work in place"). Every wave-J and pilot builder after 15:00 used the shared `next dev` on :3530 in the main tree (progress.md entries for wave J CS, physics, math, chemistry, books, big ideas). A half-written `src/demos/cs/nearest-town-first-detours/Demo.tsx` returned HTTP 500 on every page between 16:38 and 16:50 (progress.md, W-607). Pages took 50-163 s to render, so builders raised timeouts or ran private tool copies (progress.md: "a temporary copy of the tool with only the load timeouts raised"; "scratch patient.mjs"). 31 "WIP snapshot" commits today are the chief of staff committing other agents' half-done main-tree work. 8fba61c recovered 8 lessons "built in the release worktree by mistake". |
| A3 | 9 rituals overdue | **Yes at 18:17; three of the nine were held but invisible.** | `rituals-due` at 18:17: retro, WBR (36 h, limit 24 h), demo-crit, launch-review, founder-digest (19 h, limit 12 h), design-review (never), ops-review, vertical-review (never), rnd-review (never). Held but invisible: ops-review (company/engineering/operations/2026-10-14-ops-review.md, W-542) and demo-crit (record committed 15:28, while the tool said "last 10:26"; that 10:26 "crit" was a pattern-librarian lesson commit counted as a crit because it landed in the crit room). Between 18:15 and 18:17 the retro, a launch-review record ("written after the fact") and the founder digest were committed; the WBR is an uncommitted draft. The WBR was committed at 18:22 (99f29d9). Still due after that: **design-review (never held), vertical-review (History, and now Marketing, are new founder directions), rnd-review (never held).** See F3, F4. |
| A4 | Every agent wrote board.json and progress.md | **Yes, and the written rules told them to.** | 179 commits touched board.json today and 160 touched progress.md. Of 180 progress entries dated 10-14, 3 are by the chief of staff. Renumbered by hand: W-477..480, W-600, W-609, W-631..637, W-666 to W-673; at least 3 updates were overwritten (portfolio-manager). Empty items from `board add --help`: W-444, W-454, W-685. **Root cause is a contradiction, not only the chief of staff:** loop rule 11 says "the chief of staff alone writes the board, the progress log, the event log and the WBR", but CLAUDE.md "Before you finish" tells every session to "Update company/ops/board.json" and "Add a dated handoff at the top of progress.md", and the generated working agreement (item 9, every role doc) says the same. See F5. |
| A5 | The History decision went to the CEO office and the domain scout, skipping principal-pm-verticals | **Yes, plus two more of the same kind.** | company/decisions/2026-10-14-founder-history-category.md: the chief of staff wrote the list of candidate categories itself (the domain scout's job), recorded the founder's reply, and listed principal-pm-verticals' objection ("one new vertical, not three") under "carried forward" with no answer. The same pattern: (i) Books and Big Ideas (0e7f446) were built by the CEO office before the plan-to-2000 (15:33) existed, see F8; (ii) the domain scout's W-685 asks the founder to choose the next category directly, again skipping principal-pm-verticals and the head of product's Domain Launch Review. **Since repaired in part:** at 18:21 (fb34060) principal-pm-verticals sized History (60 lessons, 40 committed) and ruled that the next category waits for first deploy data. That is the right route, taken after the decision instead of before it. |
| A6 | Founder decisions recorded without the routing check | **Yes.** | Four records today are "owner: founder (recorded by chief-of-staff)" or owner chief-of-staff with no consulted or route section: founder-books-experience, founder-history-category, usage-upgrade, deploy-needs-founder-approval. One of them broke `check` (no owner line, per the retro). The newest (founder-durable-ops-and-marketing) names a route, which is the pattern to keep. |

### Further findings

- **F1. The concurrency cap was set on the wrong constraint, and the loop now carries two.** See A1. The usage-upgrade decision's "would be wrong if" (stop rate above 20%, or merge/QA incidents rise) fired the same day: three SEV2s at 15:27, one of them "shared host exhausted, disk full repeatedly, load 24-27 on 4 CPUs". Nobody reopened the record. The retro now proposes 8/3 again without superseding it, so tomorrow's chief of staff could read either. *Evidence:* operating-loop.md lines 70-74 and 95-96; events `ev-d362239a23`.
- **F2. Founder pressure became dispatch without a capacity answer.** "Spin 20 agnets do the algorithms demos" (06:38), "We are under utilizing FYI" (06:49, 12:26), "Spin many agents" (14:58). Each was followed by a dispatch wave. None got the answer "the host takes N; here is what that costs". The retro's "stop treating 'spin many agents' as permission" is right but is a resolution, not a mechanism.
- **F3. The start-of-session read hides overdue rituals.** `npm run company -- status` printed "Rituals all on cadence" all day (it reads the 7-day calendar table in protected `tools/company.mjs`) while `rituals-due` printed nine DUE. CLAUDE.md's step 1 sends every session to the tool that says nothing is due. Needs an amendment (AMD-005 (a)).
- **F4. The event log went blind at about 16:00, so the ritual and concurrency signals did too.** Last logged dispatch 14:55; last report or usage 15:59; from 16:00 to 18:17 the log holds only 3 kudos, while git took about 50 commits, including 9 wave-J builds. The founder saw it at 14:51 ("in hq we have same number of events as before"). Anything computed from the log (rituals-due thresholds, in-flight agents, the HQ floor) undercounts the afternoon. The concurrency of the afternoon cannot be audited from the log; I reconstructed it from progress.md (at least 8 builders committed between 17:41 and 18:08).
- **F5. The single-writer rule is contradicted by CLAUDE.md and the role docs** (A4). Until that text changes, every agent that follows its onboarding breaks loop rule 11.
- **F6. Three SEV2s have no COE.** principal-engineer-ops' scope: "a COE for every SEV1 and SEV2". The three SEV2s logged at 15:27 (CI queue, deploy before CI, host exhausted) all say "COE required"; the last COE record is 2026-10-13-coe.md. New waves were dispatched after them.
- **F7. The retro's numbers are testimony, not truth.** It says "Deploys: 1, approved by the founder"; git has four `[deploy]` commits (6b45ea0 13:01, 91274b8 13:51, f4537d7 14:27, 5e8608d 14:43), each after a founder ask (12:59, 13:45, 14:17, and 14:41 "deployment was skipped"). They were approved, but the count is wrong, and all four reached production before CI judged them (constitutional review G1). A fifth commit, f868127 (12:58), carries the literal token "[deploy]" in its subject one minute before the founder's "To be clear i want to deploy". It says 9 builders where the log shows 18.
- **F8. The CEO office was a second operator (a finding against my own office).** progress.md line 389 and decision 2026-10-14-books-and-big-ideas.md ("drafted by chief-of-staff-ceo-office (Leonie)"): the CEO office wrote two categories' roles, charters, 120 curriculum concepts and 24 ranked briefs. Briefs and curricula are lesson content (out of the CEO office's scope), and principal-pm-verticals was not on the route. The owners had to re-check them afterwards (W-536, W-537). The routing table below sends the CEO office only the org part.
- **F9. Board ids are allocated as `max + 1` of the local file** (`cmdBoard` in protected `tools/company.mjs`). Parallel sessions on parallel branches will collide however disciplined the chief of staff is. Only an allocator under amendment fixes this (W-528, AMD-005 (c)).
- **F10. Rituals are being run to clear the list, after the fact.** Three records landed in two minutes at 18:15-18:17, one labelled "written after the fact". A ritual written after the work it should have gated does not gate anything. The rhythm below puts rituals before dispatch, and the preflight enforces it.

## 2. Founder-request intake rule (proposed 2026-10-14, founder to ratify)

Every founder ask, in this order, before any dispatch:

1. **Classify** it: product · category-or-vertical · format · org · engineering · ops (dispatch, capacity, rituals) · gates · deploy · budget · status-question.
2. **Route** it to the first owner in the table. The founder's words decide *whether*; the owners decide *how* (company/ceo-office/org-change-process.md). Each owner on the route answers in writing: agree, agree with changes, or object.
3. **Record** it from `company/decisions/_template-founder-intake.md`: verbatim words, `class:`, `route:`, the answers, and an `Answer:` for every objection. "Carried forward" is not an answer.
4. **Board** it: one item per owner step, added by the chief of staff only; the portfolio manager sets the priority (company/ops/triage.md).

Exceptions: a status question is answered from `company status`, with no record. A deploy approval is recorded verbatim in the release record, and the release manager acts only on that specific deploy.

| Kind of ask | First owner | Then | Org part (roles, floors) | Founder decides |
|---|---|---|---|---|
| New category, vertical or course | **principal-pm-verticals** (fit, review capacity, plan-to-2000) | domain-scout (Domain Launch Review proposal) → head-of-product (DLR, slot) → courses-lead if it is a course | chief-of-staff-ceo-office (org-change process) after the head of product accepts | the vertical, its budget, the org |
| Lesson content in an existing category | cm-&lt;domain&gt; | head-of-product if it changes slots | none | no |
| Format, look, multi-card, layout | **design-lead** | learning-designer, interaction-designer; principal-engineer if kit work | none | only if it changes Surface Value |
| Product direction, targets, priorities across categories | head-of-product | portfolio-manager (board priority), principal-pm-verticals for targets | none | targets and budgets |
| Org: new role, floor, retirement, reporting line | **chief-of-staff-ceo-office** | the affected directs (org-change process) | itself | yes, always |
| Ops: "spin N agents", dispatch, rituals, capacity | chief-of-staff | answers with the caps and today's preflight; CEO office audits | none | caps change only by a decision record |
| Engineering: feature, infra, scale, HQ | principal-engineer (tier) | platform-engineer, tools-lead, hq-engineer, backend-engineer; principal-engineer-ops for incidents | none | tier-2 and ADRs on cost |
| Gates, QA contract, protected paths | **evaluation-steward** (amendment) | constitutional review board | none | ratifies |
| Deploy | release-manager | chief-of-staff records the approval verbatim | none | every deploy |
| Budget, usage plan | chief-of-staff with principal-engineer-ops (stop rate, host) | head-of-product for the split | none | yes |
| External PRs | community-engineer | principal-engineer | none | merge go-ahead |
| Safety or sensitive content | lifehacks-safety-reviewer, cultural-reviewer | the category manager | none | refusals that change scope |
| Marketing, public copy, channels | vp-marketing | analytics-steward (any outcome number), fact-checker (any factual line), head-of-product (product promises) | none | anything public, every time |

## 3. Daily operating rhythm (proposed 2026-10-14, founder to ratify)

**Every turn, before choosing a move:** `npm run company -- status` → `node tools/rituals-due.mjs` (status hides overdue rituals until AMD-005) → `node tools/dispatch-check.mjs --kind=<kind> --running=<n> --builders=<n> [--worktree=<path>]` before every Agent call.

**Order when several are due:** open SEV1/SEV2 → COE → founder digest (12 h) → retro (5 merges or an incident) → WBR (24 h or 10 merges) → launch review (after each check batch) → design review and demo crit (per triggers) → vertical review (before any work on a new founder direction) → ops review (weekly, after incidents) → R&D review.

**Fixed points of the day:**
- *Open:* founder digest, WBR (daily while agents run), then the day's dispatch plan inside the caps.
- *Through the day:* launch review after each check batch; retro every 5 merges; merges and their check.
- *Close:* retro of the day, founder digest, one handoff in progress.md by the chief of staff.

**What blocks new dispatch** (`dispatch-check` exits 1):
- a **wave or build** while the **WBR, retro or founder digest** is due (R1);
- a **wave or build** while a **SEV1/SEV2 has no COE** (R2);
- a **wave or build** on the **host guard**: load above 2 × CPUs, or under 10 GB free (C4);
- **any** dispatch at **8 agents in flight**; a build at **3 builders** (C1, C2);
- a build with **no worktree** (C3);
- a **wave** while a **founder decision record** (from 2026-10-15) has no class, route or objections (I1);
- **work on a new category or vertical** before principal-pm-verticals has answered in writing (enforced by I1's route line; vertical review is the ritual).

Never blocked: finishing in-flight agents, merges, the rituals themselves, incident fixes, and a deploy the founder approved.

## 4. Concurrency rules (proposed 2026-10-14, founder to ratify)

1. **At most 8 agents in flight, at most 3 builders** (any model: the host, not the token plan, is the limit). This supersedes the concurrency section of decision 2026-10-14-usage-upgrade.md. Raising it needs a decision record that names the host capacity (CPUs, disk, one built server per evaluator batch), not only the usage plan.
2. **Host guard:** no new build when the 1-minute load is above 2 × CPUs (8 on this host) or under 10 GB is free.
3. **Builders only in worktrees**, each with its own `NEXT_DIST_DIR`, `QA_PORT` and `QA_OUT`. The main tree runs one built server for evaluators and the chief of staff's merges; no builder runs `next dev` there.
4. **One writer** for board.json, progress.md, events.jsonl, founder-inbox.json and the WBR: the chief of staff. Every brief says "do not edit the board or progress.md; put board items and your handoff in your final report".
5. **Every dispatch and every report is logged** (`node tools/events.mjs add`); if the log has no dispatch for 3 h while agents run, the preflight warns.
6. **"Spin many agents" is a request to use the caps fully**, answered with the caps and the preflight output. It is not a licence to pass them.

**How to check.** Before: `node tools/dispatch-check.mjs` (exit 1 = do not dispatch). After: the CEO office rebuilds the day's peak agents and builders from events.jsonl and progress.md, and reports peaks, guard trips and preflight overrides in the WBR health section. A peak above the cap in the log is a finding.

### The mechanism behind each rule

| Rule | Mechanism that makes breaking it fail loudly | Where | Status |
|---|---|---|---|
| ≤ 8 agents, ≤ 3 builders | `dispatch-check` C1/C2, reading both the event log and the caller's count | tools/dispatch-check.mjs | **built** |
| Host guard | `dispatch-check` C4 | tools/dispatch-check.mjs | **built** |
| Worktrees only | `dispatch-check` C3 refuses a build without a git worktree other than the main checkout; W-526 makes the worktree for each agent | tools/dispatch-check.mjs; tools-lead W-526 | C3 **built**; W-526 open |
| Rituals before new work | `dispatch-check` R1 from `rituals-due`; `rituals-due` now also counts committed ritual records, so held rituals are not reported overdue when the event log is blind | tools/dispatch-check.mjs, tools/rituals-due.mjs | **built** |
| `status` tells the truth about rituals | `cmdStatus` reads the triggers | tools/company.mjs (protected) | **AMD-005 (a), drafted** |
| COE before new work | `dispatch-check` R2 | tools/dispatch-check.mjs | **built** |
| One board writer | `board add/move` refuse without `S3_ROLE=chief-of-staff`; `check` fails on unissued ids | tools/company.mjs (protected) | **AMD-005 (b), drafted** |
| No board-id collisions | O_EXCL allocator and `board renumber`; `board add --help` adds nothing | tools/company.mjs (protected) | **AMD-005 (c), drafted** (W-528) |
| Founder intake | template; `dispatch-check` I1 blocks waves now; `check` lint later | company/decisions/_template-founder-intake.md; tools/dispatch-check.mjs; tools/company.mjs | I1 **built**; lint **AMD-005 (d), drafted** |
| Ops review visible | ops-health reads both record locations | tools/ops-health.mjs | **built** (W-542) |
| Every dispatch logged | find why logging stopped at ~16:00 and fix it | tools/events.mjs (tools-lead) | open, board |
| The rules survive sessions | operating-loop.md (edited, proposed); CLAUDE.md text (proposed below, not applied); chief-of-staff role (tools/org/roles.mjs: preflight, intake, single writer, rituals-due; regenerated) | | partly: CLAUDE.md and working agreement item 9 wait for W-712 |

## 5. Which changes need a constitutional amendment

**Need an amendment** (protected paths, company/constitution/protected-paths.txt):
- `tools/company.mjs`: honest ritual status, one board writer, a safe id allocator, the founder-intake lint in `check`. Drafted as **AMD-005** (company/constitution/amendments/AMD-005-operating-gates.md) for the evaluation steward to own and the founder to ratify.
- `.github/workflows/ci.yml` and the hook: production deploys wait for CI (G1) and path-scoped amendments. That is **AMD-003**, already commissioned by the constitutional review. Not redrafted here.

**Do not need an amendment** (applied or proposed in place):
- company/ops/operating-loop.md: intake rule, routing table, rhythm, caps (**applied, marked proposed**).
- tools/dispatch-check.mjs, tools/rituals-due.mjs, tools/ops-health.mjs (**built**; tools-lead to review, because the CEO office should not be the only judge of tools it wrote).
- company/decisions/_template-founder-intake.md (**added**).
- CLAUDE.md (not protected, but it is every session's rules, so the founder ratifies). Proposed text, **not applied**:
  - Start of session, after step 1: "1b. `node tools/rituals-due.mjs`. If you are the chief of staff, run `node tools/dispatch-check.mjs` before every Agent call; exit 1 means do not dispatch."
  - Before you finish, replace the board and progress bullets with: "If you were dispatched, put board items and your handoff in your final report; only the chief of staff writes `board.json` and `progress.md`. If you are the chief of staff, update the board and add the handoff."
- tools/org/roles.mjs: the chief-of-staff role now carries the preflight, intake and single-writer duties (applied, marked proposed, under the founder's durable-ops decision). Working agreement item 9 (every role) changes with the CLAUDE.md text, after W-712.
- A decision record superseding the usage-upgrade caps: company/decisions/2026-10-14-operating-caps-and-intake.md (**proposed**).
