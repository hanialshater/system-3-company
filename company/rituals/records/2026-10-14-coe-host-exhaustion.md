# Correction of Error: 2026-10-14: shared host exhausted (disk full several times, load 25 to 60 on 4 CPUs)

owner: principal-engineer (author, W-524) · reviewers: evaluation-steward, pattern-librarian
status: final
incident: ev-d362239a23 (SEV2, declared 2026-10-14 15:27 UTC in company/engineering/operations/2026-10-14-ops-review.md)
provenance: timeline and evidence drafted by principal-engineer-ops (testimony from the affected area: W-486 was assigned to ops). The author checked each fact against git, the board, the retro corrections, the operating audit and the host. Five whys, "What allowed it" and actions are the author's.

## What happened (facts, timestamps, links)
All times UTC, 2026-10-14. Sources: company/rituals/records/2026-10-14-retro.md and its Corrections section, company/engineering/operations/2026-10-14-ops-review.md, company/reviews/org/2026-10-14-operating-audit.md (A1, A2, F1, F2), the board, the host.
- All day: up to 20 agents in flight, 18 of them builders (event log peak at 06:51 and again 14:00 to 15:00; audit A1, retro corrections; the retro's "9 builders" was wrong). operating-loop.md said about 8 agents and 3 builders; the accepted usage-upgrade record (company/decisions/2026-10-14-usage-upgrade.md) said 30/10. Neither was set from the 4-CPU host.
- Founder asks "Spin 20 agents" (06:38), "We are under utilizing" (06:49, 12:26), "Spin many agents" (14:58) were each followed by a dispatch wave with no capacity answer (audit F2).
- All day: load average 25 to 60 on 4 CPUs (retro). Dev pages took 15 s to 12 min (50 to 163 s per render in progress.md, audit A2); `reveal-fit` timed out on the shared `next dev` on :3530 (W-664: 50 to 105 s per load against a fixed 15 s wait). Official QA could not run until load fell to about 5 at 18:00.
- Afternoon: every wave-J and pilot builder after 15:00 used the shared `next dev` in the main tree; 27 of 99 builder briefs did not say "worktree" (audit A2). A half-written `src/demos/cs/nearest-town-first-detours/Demo.tsx` returned HTTP 500 on every page from 16:38 to 16:50 (W-607), at least the second such outage (retro "What hurt" 2).
- Several times: disk full. About 15:10, `/` at 100% with about 15 MB free; git could not write refs and tools failed with ENOSPC (W-486). The space was held by 20+ stale `.next-<tag>` build dirs (each tool and builder chose its own `NEXT_DIST_DIR` tag; `next.config.mjs` honours any value) and 11 to 12 git worktrees.
- **About 15:30: the chief of staff deleted about 11 GB of build caches with `rm -rf` on `.next-int*`, `.next-pf*`, `.next-wt*` and `.next-hq*` in the main tree.** The founder did not delete them; the ops review's kudos to the founder (section "Kudos") is wrong and is sent back below. `/` went to 65%, 14 GB free (the ops review scorecard records this state; its 15:25 stamp and the 15:30 deletion are both approximate). Removing merged worktrees was blocked as destructive, correctly; they remain. The deletion was by hand, under no policy, with builders still running; nothing checked that no live process was using those dirs.
- 15:27: SEV2 declared. Waves were still dispatched after it (audit F6).
- 17:51 `0225fba`: `REVEAL_FIT_TIMEOUT_MS` added to `tools/reveal-fit.mjs` (W-664, done). It lengthens the load and render waits only; the measurement is unchanged. A workaround for the slow host, not a fix.
- 18:25 `99573b8`: `tools/dispatch-check.mjs` added (C1 at most 8 agents, C2 at most 3 builders, C3 worktree-only builds, C4 load above 2 x CPUs or under 10 GB free; R2 no build while a SEV2 has no COE). The first mechanism of the day between the operator and the host.
- 18:58: load 2.9 / 4.1 / 7.5, 7.7 GB free (81%). 19:01 (author): load 0.49 / 2.40 / 6.22, `df -h /` 8.8 GB available (78%), 16 lines in `git worktree list`, 2 `.next*` dirs in the main tree. **Free disk is under the 10 GB guard again** with only light load: the worktrees and their build output are the remaining hold, and nothing prunes them.

## Impact (learners affected, lessons, claims)
- No learner impact found: nothing deployed from the overloaded period depended on it, and no lost commit was found.
- Throughput: builders spent much of their 12-minute median run waiting; official QA was deferred to 18:00; every builder needed raised timeouts or a private tool copy (a "scratch patient.mjs", a tool copy with raised timeouts). Private tool copies are themselves a risk: a gate run from an unreviewed copy is not the gate.
- Lessons: at least two dev-server outages from one broken file in the shared tree; 31 "WIP snapshot" commits of other agents' half-done main-tree work (audit A2).
- QA verdicts: **no rerun of recorded passes is required.** `REVEAL_FIT_TIMEOUT_MS` changes waits only, not thresholds (tools/reveal-fit.mjs lines 218 to 221), and official QA ran after 18:00 on a quiet host. Any `reveal-fit` result that *errored* on :3530 during the overload is not a verdict and must be rerun against a built server (qa-tester, new item below). Results produced by a private tool copy are not verdicts either and are rerun the same way.
- Spend: 1.98M tokens per hour over 386 runs in the last 24 h (ops review section 4), much of it spent waiting on a saturated CPU.

## Five whys (stop when the answers stop being about people)
1. **Why did the host run out of disk and CPU?** Up to 20 agents, 18 of them builders, each running `next dev`, `next build` or QA on one 4-CPU machine, each build writing its own `.next-<tag>` dir (often in the main tree) and many living in their own worktree. Demand was about 5 times what the host could serve.
2. **Why was demand allowed to reach 5 times capacity?** Concurrency was set by a number on paper, and the number on paper came from the token budget (usage-upgrade: 30/10), not from the host. The loop carried a second, contradictory number (8/3). The operator picked under founder pressure ("spin many agents") and the record's own falsifier ("merge/QA incidents rise") fired the same day without anyone reopening it (audit F1).
3. **Why did nothing refuse a build at load 25, or with 15 MB free?** Because no tool stood between the decision to dispatch and the host. Caps, "builders in worktrees" and "check disk" were prose in operating-loop.md and in briefs, enforced by the operator's memory. `tools/dispatch-check.mjs` did not exist until 18:25, three hours after the SEV2.
4. **Why did CPU, disk and the shared dev server have no allocator?** Because they were treated as free and infinite. Every tool and builder chose its own build dir tag, nothing owned creation or deletion of build dirs or worktrees, and the main-tree `next dev` on :3530 was used by builders and evaluators alike, so one broken file was a company-wide outage. Isolation ("every builder works in its own worktree") was the answer the usage-upgrade record gave to its only objection, but it was a word in a brief, not a property of dispatch: 27 of 99 briefs omitted it.
5. **Why was there no allocator?** Because no role owned the host (W-533; principal-engineer holds it only as an interim entry in tiers.json), and capacity decisions were filed as budget decisions. A resource with no owner gets no budget, no guard and no clean-up policy; clean-up then happens by hand, in a crisis, with `rm -rf`.

**Root cause.** The host was a shared resource with no owner and no allocator. Capacity was decided from the token budget and enforced by memory, so nothing measured CPU, disk or the dev server before work was added to them, and nothing reclaimed what work left behind.

## What allowed it
- **A cap set on the wrong constraint, with two caps on record.** The 30/10 record named only the token plan; 8/3 lived in the same loop doc. A reader could pick either (audit F1).
- **Preflight did not exist.** Dispatch had no exit code. The first mechanism (dispatch-check) arrived at 18:25.
- **Build output had no policy.** `NEXT_DIST_DIR` accepted any tag, so every run made a new dir and none was removed. There was no pre-build disk check.
- **The shared dev server was a single point of failure** with no separation between builders' half-written work and evaluators' reading copy.
- **Worktree isolation was optional.** Briefs said it; dispatch did not create it, and nothing checked it (C3 now checks; W-526 makes it automatic).
- **Containment was by hand.** The 15:30 `rm -rf` worked, but it was the chief of staff's judgement on a live box, not a script that checks for live processes and reports freed space. The ops review then credited the wrong actor, which shows the clean-up left no record of its own.
- **No owner for the host** (W-533).

## Actions (each changes a mechanism; tracked on the board until done)
| Action | Mechanism changed | Owner | Board id |
|---|---|---|---|
| **Root-cause fix: the host gets an allocator.** Preflight refuses dispatch over 8 agents / 3 builders, at load above 2 x CPUs, or under 10 GB free; exit 1 means no Agent call. Make it the required step before every dispatch, and supersede the 30/10 cap so only the host-derived cap remains | `tools/dispatch-check.mjs` C1, C2, C4 (built 18:25); decision `2026-10-14-operating-caps-and-intake.md` | founder ratifies (W-712); tools-lead reviews and adds tests (W-715); chief-of-staff runs it before every dispatch (W-713) | W-712, W-715, W-713 |
| **Root-cause fix: the host gets an owner** who holds the disk, CPU, worktree and process budgets and the guard thresholds | org (role data in tools/org/roles.mjs) | chief-of-staff-ceo-office | W-533 |
| Builders only in worktrees, each with its own `NEXT_DIST_DIR`, `QA_PORT`, `QA_OUT`; dispatch tooling creates the worktree; the main tree runs one built server for evaluators and merges, never a builder's `next dev` | dispatch-check C3 (built) + worktree-per-agent lifecycle script, merged-and-idle listing for founder-approved removal | tools-lead | W-526 |
| Disk guard and build-dir policy: one `.next` per worktree (no `.next-<tag>` copies), a prune script for build dirs older than 24 h with no live process that reports freed GB (replaces hand `rm -rf`), and a pre-build guard that refuses `next build`/QA under 10 GB free. **Run the prune now: free disk is 8.8 GB, under the guard** | build/QA tooling | tools-lead | W-525 |
| Interim cap until W-531: at most 2 concurrent builds/QA runs; disk checked before each wave | dispatch checklist + dispatch-check output in each brief | chief-of-staff | W-532 |
| Second machine or self-hosted CI runner against a hard cap; cost, runner security, targets load < 8, page < 5 s. Raising the 8/3 cap is allowed only through this record | capacity decision record | principal-engineer (author); founder approves spend | W-531 |
| QA tooling tolerates a slow host without false errors; waits only, thresholds unchanged | `REVEAL_FIT_TIMEOUT_MS` in `tools/reveal-fit.mjs` (done; a workaround, kept as a flag, not raised by default) | platform-engineer | W-664 |
| Spend visible per run and project, so "more agents" has a cost on the page | token ledger `tools/ledger.mjs` + `[project:<id>]` tags; project rule in dispatch-check | chief-of-staff (loop), chief-of-staff-ceo-office (preflight rule) | W-721, W-720 |
| Long-running processes via pid files, no `pkill -f`, detached walkthrough loops (the overload made shells and loops die) | process wrapper | tools-lead | W-529 |
| Rerun any `reveal-fit` result that errored on :3530 or came from a private tool copy during 06:00 to 18:00, against a built server | QA record | qa-tester | new (to add) |
| Correct the ops review kudos: the chief of staff, not the founder, deleted the 11 GB at about 15:30 | ops review record | principal-engineer-ops | new (to add) |

## Claims and decisions to send back to review
- QA verdicts: decided above. Recorded passes stand; timeout errors and private-copy results are rerun (qa-tester, new item).
- `company/decisions/2026-10-14-usage-upgrade.md` (30/10 cap) rested on the token budget alone and its objection was answered with a claim (worktree isolation) that was not true the same afternoon. It is superseded by `2026-10-14-operating-caps-and-intake.md` (8/3 plus host guard) once the founder ratifies W-712. Until then the chief of staff uses 8/3 and dispatch-check, not 30/10.
- company/engineering/operations/2026-10-14-ops-review.md, "Kudos": wrong actor for the 11 GB clean-up (principal-engineer-ops, new item).

## Pattern update
Pattern librarian, from this root cause. This is the second case for the 10-13 COE's candidate "capacity is a budget, not a CPU count" (10-13: token limit; 10-14: CPU and disk). Together they support the ops review's proposal: **"every shared resource needs an owner and an allocator before it needs a clean-up"**. Candidate falsifier: a day at or under the caps with dispatch-check run before every dispatch still exhausts the host.
