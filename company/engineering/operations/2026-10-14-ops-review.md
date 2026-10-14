# Operational Health Review: 2026-10-14

owner: principal-engineer-ops (Rhea, chair) · trigger: after incidents (three SEV2s declared today) · first review ever held · reads: the founder

Points of contact did not file written reports before this review. That is itself a finding: section 2 is the chair's read of the evidence, and each point of contact owes a paragraph at the next review (see section 6).

## 0. Scorecard

From `node tools/ops-health.mjs --md` at about 15:25 UTC, plus the host and GitHub:

| Metric | Value |
|---|---|
| Agent runs (all time) | 473 finished, 532 dispatched, 32 stopped (6% stop rate) |
| Tokens (all time) | 61,245k; median 122k per run; median 12 min per run |
| Burn rate (last 24 h) | 47,585k tokens in 386 runs = 1,983k tokens/hour |
| Incidents | 3 before today + 3 SEV2 declared in this review (ev-c33bee719d, ev-b27f3b93ae, ev-d362239a23); 1 COE on record |
| Tier registry | 21 entries after this review (was 18); 11 not ok; 7 tier-1 red lines (was 5) |
| Open work | 336 open: P1 1, P2 23, P3 35, P4 7, **untriaged 270** (the count rose by 9 during this review, from concurrent board adds) |
| GitHub | 0 open issues, 0 open PRs |
| CI, last 40 runs | `ci`: 7 queued, 0 concluded. `Deploy to Vercel`: 33 skipped (it waits on a green `ci` that never came) |
| Host | 4 CPUs, load 26.8 / 25.1 / 22.1 (1/5/15 min); `/` at 65% (14 GB free) after about 11 GB was cleared by hand; 12 git worktrees; 8 `.next*` build dirs still on disk |

The worst numbers: CI concludes nothing; load is about 6x the core count; 270 untriaged items.

## 1. Red lines

| Item | Tier | Owner | Changed since last time | Next step |
|---|---|---|---|---|
| ci-and-deploy | T1 degraded | release-manager | AMD-002 ratified (job-level cancel of superseded `ci` runs). The queue is still not draining: 7 of the last 40 runs are queued and none concluded. | Falsifier W-481 on 10-16 (platform-engineer). COE W-522. |
| G1 deploy bypass (part of ci-and-deploy) | T1 | platform-engineer + founder | Found today by the constitutional review: Vercel git-triggered builds ship `[deploy]` commits without waiting for `ci`. | W-480 (decision record: deploy only via `deploy.yml` after green `ci`). COE W-523. |
| shared-dev-host (new) | T1 degraded | principal-engineer (interim) | New entry. Disk full several times today; CPU saturated all day. | COE W-524; fixes W-525, W-531, W-532; owner question W-533. |
| spike-route-open-cdn-param (new) | S1 at-risk | platform-engineer | W-477 filed it as P2. This review classifies it **S1**: anyone with a URL can frame any site under our domain and write learners' real localStorage and `/api/events`. That is "exploitable now". | Fix W-477 (remove the route or `notFound()` in production). Under the S1 rule, app deploys are **held** until it is fixed (W-534, release-manager). Portfolio manager: re-triage W-477 to P1. |
| gates-and-qa-contract | T1 at-risk | evaluation-steward | No change (AMD-001(d) unratified, W-479). | Founder, W-479. |
| auth-and-progress-db, learner-accounts | T1 / D1 missing | backend-engineer | No change (F-01). | Founder inbox F-01. |
| accessibility-review-never-run | U1 at-risk | accessibility-reviewer | No change: still 0 accessibility records. | Unchanged from the CEO office P2. Stays red. |
| The one open P1 | — | — | Older than one review by definition (no review before this one). | Portfolio manager to name it in the next triage. |

**Watch, not declared:** constitutional review G2. Production can show lessons whose claims are unverified (238+ were cited) behind an "In review" tag. The 10-13 SEV1 example is "a published lesson that should have been held". I am not declaring it, because showing tagged in-review lessons was a choice, not a failure. That choice now needs an owner and an exit date (W-479 item 4, founder). If the founder does not decide by the next review, I will declare it SEV1.

## 2. Team reports (chair's read; each point of contact owes its own paragraph next time)

- **Release and deploy (release-manager):** at risk. The worst problem is that the only working path to production (Vercel git builds) skips CI, and the path that waits for CI (`deploy.yml`) has been skipped 33 times. Its needs: platform-engineer for W-480, and the founder for the decision.
- **Platform (platform-engineer):** degraded. The worst open item is W-477 (S1). It also owns W-480, W-481, W-023 (scratch dirs, P3 since 10-12) and the W-287/W-288 kit work. That is too much on one owner. The portfolio manager should look at the load.
- **Company tools (tools-lead):** degraded. Every isolation failure today (worktree, board id, scratch dir, process kill, background loops) lands in tools. W-072 (pid-file `serve.sh`, no `pkill -f`) is marked done, yet a pattern kill took out the coordinator's shell twice today. The mechanism exists, but nothing makes agents use it.
- **Evaluation harness (evaluation-steward):** at risk. `npm run check` fails for everyone when one session leaves a domain half-built (G4: "check fails, not mine" has become routine). That hides real errors.
- **Backend, personalization, HQ, design engineering, privacy, accessibility, lesson quality:** no new incidents in their areas today. Their existing red lines are in section 1.

## 3. Incidents and COEs since last review

| Incident | SEV | Why this severity | COE (author, board) | Actions open | Closed? |
|---|---|---|---|---|---|
| 10-13 usage limit stopped 8 of 9 builders | SEV2 | can't ship | `company/rituals/records/2026-10-13-coe.md` | 5 actions, none with a board id | **No.** The COE's actions table has "—" for every board id, which breaks rule 5 of incident-response.md. The chief of staff should give each action a board item, or drop it explicitly. |
| CI queue ~300, `ci` never green, deploy skipped (ev-c33bee719d) | SEV2 | can't ship: no change can be judged or deployed through the sanctioned path (~3h40m push-to-CI before AMD-002) | backend-engineer, **W-522** | AMD-002 (containment), W-481 | No |
| `[deploy]` reached production before CI (G1/W-480), and the Vercel 100/day quota was exhausted by WIP pushes (ev-b27f3b93ae) | SEV2 | a gate was bypassed, and production deploys were blocked for the day | tools-lead, **W-523**. One COE, because both failures come from Vercel building on git push, outside our pipeline. | W-480, W-482; the `[deploy]` filter and founder approval are containment, not the fix (J3: the filter sits in unprotected `vercel.json` and was edited by a `[deploy]` commit) | No |
| Shared host exhausted: disk full several times, load 24+ (ev-d362239a23) | SEV2 | can't ship: git could not write refs, and tools failed with ENOSPC | principal-engineer, **W-524**. Ops may not write it: W-486 was assigned to ops, so the incident is in my area. | W-486, W-525, W-531, W-532, W-533 | No. About 11 GB cleared by hand; removing merged worktrees was blocked as destructive (correct). |
| Agents wrote into the wrong worktree (coordinator cwd) | SEV3 | no lost commit found; the workaround is absolute paths | not required | W-526, W-527 | — |
| Coordinator shell killed twice by pkill/pgrep patterns | SEV3 | session lost, work recoverable | not required, **but** it repeats a closed fix (W-072) | W-529 | — |
| Background walkthrough loops died with the parent shell | SEV3 | QA rerun needed | not required | W-529 | — |
| Board id collisions and the `fc35/` scratch collision | SEV3 | today's ids were checked (no duplicates on the board now), but `board add` is read-max-plus-one-then-write, so the loser of a race silently loses an item | not required | W-528 (needs an amendment), W-023 | — |
| `check` failed on WIP domains | SEV3 | a workaround exists (it is ignored), and that is the danger | not required | W-530 | — |

**Promotion rule:** any SEV3 above is promoted to SEV2, with a COE, the first time it costs a commit, a board item, or a lesson.

**The common cause** (for the COE authors to test, not assume): concurrency grew, from about 10 agents and many WIP pushes, but the shared resources did not get allocators. That covers CPU, disk, GitHub runners, the Vercel quota, board ids, scratch dirs, cwd and process names. Each is a shared namespace with no owner and no lock. The 10-13 COE's candidate pattern, "capacity is a budget, not a CPU count", now has a second case. Candidate wording: **every shared resource needs an allocator before it needs a cleanup**.

## 4. Agents and spend

Burn in the last 24 h is 1.98M tokens/hour over 386 runs, which is 82% of all-time runs in one day. The stop rate is 6%. Output (lessons) is not on this page. The question for the next WBR is whether burn rose faster than output. The host evidence says throughput is capped by the machine, not by tokens: at load 25 on 4 cores, agents spend much of their 12-minute median waiting on builds and on a dev server that takes 15–60 s a page. **Run fewer at once and they will finish faster.** W-532 sets the interim cap. Roles never dispatched: not computed today. The next review should pull it from `npm run metrics`.

## 5. Tier registry changes (`tiers.json`, written today)

- **New `shared-dev-host`, T1 degraded.** The company cannot ship when it fails (git cannot write). Interim owner: principal-engineer. Naming a permanent owner is an org question (W-533, chief-of-staff-ceo-office).
- **New `agent-isolation`, T2 degraded,** tools-lead. Degraded but working, so not T1.
- **New security entry `spike-route-open-cdn-param`, S1 at-risk,** platform-engineer (W-477).
- **`ci-and-deploy`:** the note now records today's state. **`feed-and-lesson-runtime`:** the stale "local only" note is corrected (production is live via `[deploy]` commits).
- Considered and rejected: classifying `agent-isolation` or `check` T1. They degrade the company but do not stop it shipping. Making them T1 would make the tiers mean less.

## 6. Decisions and actions

| # | Action | Mechanism changed | Owner | Board |
|---|---|---|---|---|
| 1 | Write COE: CI queue | — | backend-engineer | W-522 |
| 2 | Write COE: deploy bypass + quota | — | tools-lead | W-523 |
| 3 | Write COE: host exhaustion | — | principal-engineer | W-524 |
| 4 | **Build-dir and disk policy**: one `.next` per worktree, prune stale build dirs, pre-build free-space guard (< 10 GB refuses) | build/QA tooling | tools-lead | W-525 |
| 5 | **Worktree-per-agent**: tooling creates it, briefs use absolute paths only, merged-and-idle worktrees are listed for founder-approved removal | dispatch tooling | tools-lead | W-526 |
| 6 | Coordinator never `cd`s into a worktree; agents refuse writes outside their path | operating-loop checklist | chief-of-staff | W-527 |
| 7 | **Concurrency-safe board id allocator** (lock + re-read + atomic rename). `tools/company.mjs` is protected, so this needs an amendment, with a falsifier: 20 parallel adds give 20 distinct ids and 0 lost items | CLI, by amendment | tools-lead drafts; founder ratifies | W-528 |
| 8 | **Per-agent scratch dirs**: already W-023 (P3 since 10-12). Recommendation to the portfolio manager: raise it to P2. The `fc35/` collision is its second occurrence. | dispatch tooling | platform-engineer (existing) | W-023 |
| 9 | Process safety: no `pkill -f`/`pgrep -f` patterns; pid-file wrapper for every long-running process, detached with `setsid` so loops survive the parent | tooling + briefs | tools-lead | W-529 |
| 10 | Stop WIP domains from turning `check` red for everyone | gate scope | evaluation-steward | W-530 |
| 11 | **Second machine or self-hosted CI runner**, against a hard cap. A decision record with cost, runner security (secrets on a self-hosted box), and targets (load < 8, page < 5 s, CI queue < 20) | capacity | principal-engineer; founder approves spend | W-531 |
| 12 | Interim cap: at most 2 concurrent builds/QA runs; check disk before each wave | dispatch checklist | chief-of-staff | W-532 |
| 13 | Name an owner for the shared host | org | chief-of-staff-ceo-office | W-533 |
| 14 | Hold app deploys until W-477 is fixed (S1) | release checklist | release-manager | W-534 |
| 15 | Give the 10-13 COE's five actions board ids, or drop them explicitly | COE hygiene | chief-of-staff | (this record; due next review) |
| 16 | Each point of contact files a written paragraph before the next review | ritual | every POC in `tiers.json` | (this record) |
| 17 | `ops-health.mjs` reads ops reviews from `company/engineering/operations/` too (it reports "never held" today) | ops tooling | tools-lead | W-542 |

Already on the board and not duplicated: W-477, W-480, W-481, W-482, W-486, W-023, W-030.

**Objections, with what happened to them:**
- *"The `[deploy]` filter and founder approval already fixed the quota and bypass."* Answer: they fixed the quota (cost). They do not fix the bypass. Vercel still does not wait for CI, and the filter lives in an unprotected file that a `[deploy]` commit has already edited (constitutional review J3). The SEV2 stands, and W-480 is the fix.
- *"A board allocator is too small to need an amendment."* Answer: the size does not matter. `tools/company.mjs` is a protected path, so the amendment is the only legal route. The falsifier keeps the amendment small.
- *"Remove merged worktrees automatically to free disk."* Answer: rejected. Removal is destructive, and worktrees hold uncommitted work, as in the 10-13 COE. The tooling lists them, and a person approves.
- *"W-477 is P2 (from its filer)."* Answer: the tier is reclassified to S1 here, on the "exploitable now" test. The priority is the portfolio manager's call, and this review recommends P1.

## Kudos
- @founder: cleared about 11 GB by hand and left the destructive worktree removal blocked rather than forcing it. That is the right instinct for a shared box holding uncommitted work.
- @evaluation-steward: prepared the constitutional review whose G1 found the deploy bypass before an unratified change used it.
