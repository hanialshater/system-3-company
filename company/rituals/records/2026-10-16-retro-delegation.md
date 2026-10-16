# Retro: 2026-10-16: delegation, roles, who is involved in what

owner: chief-of-staff-ceo-office (Leonie), at the founder's request · attendees (by their records): chief-of-staff (Ada), head-of-strategic-initiatives (Beatriz), cm-history (Henrike), evaluation-steward, tools-lead, principal-engineer-ops, vp-books
window: 2026-10-14 ~09:50Z to 2026-10-16 ~09:50Z (48 h) · status: proposed. Every change below is a proposal until its owner accepts it on the board. The org changes are the founder's.
rules this retro keeps: no new roles, orgs, floors or rooms (company/decisions/2026-10-16-founder-org-and-dispatch-rule.md, rule 1). Anything that looks like one is listed under "Founder decisions" and nowhere else. System 3 Meta stays parked (company/decisions/2026-10-16-founder-system3-meta-sibling.md, W-1182). The section at the end only notes lessons for it.

## Numbers for this window (measured here, not taken from the dashboards)
| What | Value | How I got it |
|---|---|---|
| Commits on the branch | 730 | `git log --since='48 hours ago'` |
| ...authored as `Claude <noreply@anthropic.com>` | **693 (95%)** | `%an`. Only 13 carry a role name (fact-checker 3, learner-evaluator 3, rnd-lead 4, design-lead 1, principal-engineer 1), and **all 13 come from the parallel session 2**, which set the author per role. 24 more are "chief-of-staff (session 2)". |
| Dispatch events in events.jsonl in the window | 223, all `actor: chief-of-staff` | grep, `"type":"dispatch"` from 10-14 09:40Z |
| Last dispatch event | **2026-10-15 08:55Z** (platform-engineer, r7 fixes). Last event of any kind: 10-15 10:11Z | `tail events.jsonl` |
| Dispatches with a `batch=` reference | **0** | grep `batch=`. The protocol's target is 100% (dispatch-requests.md §5) |
| Dispatches as `general-purpose` in the window | 4 (2 were cm-history "Henrike", 2 were community-engineer "Femi") | event subjects |
| Lanes that returned a batch since the rule (10-16 ~09:28Z) | 2 of 20 (First Light, History) | batch files |
| Batch items dispatched / queued | 4 of 11 dispatched (FL runs 2-4, History run 1). 7 are queued in W-1176. 0 refused in writing. No batch has a `## Dispatched` section. | W-1176, the batch files |
| Handoffs in progress.md | **none since 2026-10-15 ~13:10Z** (about 20 h and more than 150 commits) | top of progress.md |
| `npm run metrics`, "never dispatched" | 46 of 97. It lists cm-history, cm-behavioral, privacy-reviewer, growth-designer, head-of-strategic-initiatives, learner-model-engineer, learning-designer and research-lead, **all of which ran this window**. 26 of the 46 are strand managers. | metrics, cross-checked against git subjects |

The numbers say we cannot measure delegation from the instruments right now. Git does not say who did the work, and the event log stopped a day ago. The matrix below is therefore rebuilt from event subjects up to 10-15 08:55Z and from commit subjects after that. It is testimony-grade evidence, and I mark it as such.

## Who is actually involved in what (lanes × roles, last 48 h, against the POC map)
"Logged" = dispatch events up to 10-15 08:55Z. "After" = roles visible in commit subjects or records from 10-15 09:00Z to 10-16 09:50Z, with no event, so there is no count. "Chosen by" = who picked the specialist's task.

| # | Lane (POC per poc-map.md) | Roles dispatched: logged count / after | Chosen by | Gap against the map |
|---|---|---|---|---|
| 1 | Category lessons (each CM) | demo-builder 50 / about 12 more branches (lh-home, lh-study, lh-res, lh-tests, hist-fix, hrA, hrB, patience, beh, london-c4, eh-ruling, fc42-fix). CMs: 10 once each (sign-off round), cm-lifehacks 3, cm-books 2, cm-big-ideas 2, strand managers 4 (of 27). cm-history 2 as **general-purpose**. cm-behavioral / its commits. | **CoS**, until History's round-1 batch on 10-16. The CMs answered asks; they did not set the order. | The POC chose nothing before 10-16. cm-history ran as a stand-in. 23 strand managers never ran. |
| 2 | Verticals (principal-pm-verticals) | principal-pm-verticals 4, domain-scout 1 / Wave J builders inside lane 1's count | CoS | Wave J builds were chosen by the CoS, not by Selin. |
| 3 | Courses (courses-lead) | cm-course-ncm 1 / – | CoS | courses-lead was never asked. |
| 4 | First Light (Beatriz) | backend-engineer 2, vp-marketing 1 / head-of-strategic-initiatives, backend (accounts branch), growth (PRD-003/004), learner-model-engineer (EDD-009), privacy-reviewer and principal-engineer-ops (round 1) | CoS, then **Beatriz's round 1** (3 of 6 items run) | The first lane on the protocol. Its checker items (privacy, readiness) were requested from inside lane 4, which the map accepted for round 1 only. |
| 5 | Product (head-of-product) | head-of-product 5, analytics-steward 1 / rulings commit | CoS | – |
| 6 | Design (design-lead) | design-lead 7, interaction-designer 2, design-engineer 2 / learning-designer (behavioral notes) | CoS | visual-designer, mockup-artist and illustrator: 0. |
| 7 | Engineering (principal-engineer) | principal-engineer 11, platform-engineer 12 / PE F-01 review, SPIKE-002 rulings. community-engineer 2 as **general-purpose** | CoS | Femi ran as a stand-in even though community-engineer exists. |
| 8 | Ops (principal-engineer-ops) | principal-engineer-ops 3 / readiness records | CoS | – |
| 9 | Tools and HQ (tools-lead) | hq-engineer 6, tools-lead 4 / tools batch merges | CoS | The POC reports to the CoS (handoff map P3). |
| 10 | **Quality (evaluation-steward)** | fact-checker 35, learner-evaluator 16, evaluation-steward 7, lifehacks-safety-reviewer 3, qa-tester 2, accessibility-reviewer 2, pedagogy-critic 1 / FC41 to FC52 (12 passes), learner r11 Life Hacks batches 1-6, r12, privacy-reviewer, QA records on 3 production builds | **CoS** | **The largest lane (66 of 223 logged, 30%) and its POC chose none of it.** Only 2 qa-tester runs are logged, yet QA records were written for 3 builds. Whether the qa-tester or the integrator wrote them cannot be told from git (authorship). cultural-reviewer: 0. |
| 11 | Release (release-manager) | release-manager 4 / r7 pending entry | CoS | – |
| 12-13 | Research, R&D | vp-rnd 1 / research-lead (W-959, W-902), rnd-lead (session 2) | CoS | – |
| 14-15 | Personalization, International | 0 / 0 | – | localization-lead owes W-961, which blocks History slot 4 and briefs 8, 21 and 22. The lane is idle while it holds a blocker. |
| 16 | Marketing (vp-marketing) | counted in 4 | CoS | – |
| 17 | Triage (portfolio-manager) | portfolio-manager 4 / PR1 pack | CoS | The board backlog is 643 items and the trigger is 10. |
| 18 | Org (Leonie) | chief-of-staff-ceo-office 6 / POC map | CoS, on founder asks | – |
| 19 | Rituals (Ada) | pattern-librarian 3 | CoS | – |
| 20 | Press (vp-books) | – / reported the /dev/null incident | – | Shares this host (Press record, objection 1). |

**Headline.** In 48 hours the chief of staff chose about 99% of the specialists' work. That covers 223 logged dispatches plus at least 40 unlogged ones, which I estimate from the merged branches and review passes. Under the protocol, the managers chose 4 runs, all on 10-16. Quality is the largest lane, and its POC did not choose any of its dispatches. The org chart says 20 lanes; in practice there was one dispatcher who asked managers questions. Since 09:28Z the protocol has existed on paper and in 2 lanes, with 0 `batch=` references. The instruments that would show this (the events, git authorship, metrics) are dark or wrong.

## What went well (keep doing)
1. **The founder's rule turned into working batches within an hour.** Beatriz's round 1 is the template other lanes should copy. It orders the runs by the critical path, asks for one builder slot and no exceptions, keeps evaluator inputs to artifacts, says what waits and why, and dates every founder ask. Henrike's History batch carries an objection to its own shape ("four runs on one lesson") with a status. That is the working agreement doing its job.
2. **Catches came from checking the disk.** The CoS found the r7 deploy by searching git before shipping (COE 10-15). The founder caught the wrong Neon step ("I did not do prod"), and it was recorded as a correction in company/decisions/2026-10-15-founder-f01-accounts.md. W-843 caught the verdict word because the parser is strict and refused "pass". The vp-books run noticed /dev/null was broken and reported it. Each catch worked because something checked the artifact instead of trusting a report.
3. **Gates held while the delegation did not.** Nothing unverified was published. The claims gate refused patience-wins-the-split. Life Hacks stayed held for its Domain Launch Review.
4. **"Same model, different rules" works when the rules are written down** (the founder, relayed by Ada). The roles that behaved most independently this window (privacy-reviewer refusing P1.7, the steward's strict parser, Beatriz refusing to publish engineering dates) are the ones whose onboarding doc says what they may not do. The model is the same; the written refusals are what make them differ.
5. **Session 2 proved per-role authorship is cheap.** Its commits carry `fact-checker`, `learner-evaluator`, `rnd-lead` and so on as the author. Session 1 did not do this.

## What hurt, with five whys to mechanisms (not people)

### H1. The chief of staff chose about 20 specialists' work directly (6 Life Hacks learner evaluators, 3 template builders, 8 agents "on all cylinders")
1. Why did the CoS choose? It was the only role able to call the Agent tool, and the next step was obvious from the board.
2. Why was it obvious to the CoS and not to a manager? The board's `next` items carry an owner but no lane POC. The CoS read them directly.
3. Why didn't a manager decide first? Until 10-16 no mechanism asked one. The handoff map said whose work it was, not who chooses what runs next.
4. Why did the caps not slow it down? The caps limit how many agents run, not who chose them. A dispatch that passes `dispatch-check` is legitimate whoever picked it.
5. Why was nobody told? The event log records the dispatcher but not the chooser, and it stopped recording on 10-15 anyway.
**Mechanism gap:** nothing records or checks *who chose* a dispatch. → Changes C1, C2, C3.

### H2. Missing roles were run as general-purpose stand-ins (head-of-strategic-initiatives, cm-behavioral) and so were existing ones (cm-history ×2, community-engineer ×2)
1. Why? The work was urgent and the agent type did not exist yet (or the CoS reached for the generic type).
2. Why was general-purpose allowed? `dispatch-check` does not inspect `subagent_type`.
3. Why does that matter? The stand-in gets none of the role's "may not" lines, so there is no independence and no refusals. Its events land on `general-purpose`, so metrics show the real role as "never dispatched".
4. Why did the metrics not notice? They count by subject only.
5. Why was this not on anyone's list? The rule against it is prose (founder rule 1, poc-map rule 4). No check enforces it.
→ Change C2 (refuse `general-purpose` in the slot ledger unless it is a §4 integration task).

### H3. The event log stopped recording dispatches (W-716 since 10-14, W-1175 today), so metrics are wrong
1. Why is there no event since 10-15 08:55Z? Dispatch and report events are written only by `node tools/events.mjs backfill` from transcripts, which someone has to run by hand.
2. Why by hand? No hook on the Agent tool writes the event at dispatch time. `.claude/settings.json` has only the constitution hook.
3. Why was the gap not noticed for 25 h? `company status` and `metrics` do not show how old the newest dispatch event is.
4. Why did W-716 not fix it? It has been `next` for tools-lead since 10-14, and its duplicate W-1175 is owned by `chief-of-staff` although its title says tools-lead. Two items, and the owner of record cannot do the fix.
5. Why does it matter for the org? Every health number in my WBR section (stop rate, roles never dispatched, `batch=` share) reads from this log. A dark log looks like idle roles and hides overload.
→ Change C1.

### H4. Builder testimony disagreed with the disk (a builder reported "reverted" when it had not; the CoS presented r7 as "not deployed"; the CoS gave a wrong Neon setup step and a wrong verdict word)
1. Why did false statements travel? Each was a report from memory, not from a command run that turn.
2. Why did the next reader accept it? Reports have no field that separates "I checked this on disk, with this command" from "I believe".
3. Why was the verdict word wrong? The brief was written from memory of the vocabulary. The vocabulary lives in the parser, and the brief template does not quote it.
4. Why was the Neon step wrong? It was written from general knowledge of the vendor, not from the founder's actual setup or the vendor docs (the proxy blocks vercel.com, and that went unsaid).
5. Why does this repeat? The disk is the memory, but the end-of-run report (the off-boarding summary) has no required form. Each agent invents its own.
→ Change C4 (off-boarding summary format, with a "checked on disk" column).

### H5. The CoS's own integration work caused incidents (two commits swept in other roles' work; pkill killed its own shell twice; rebuilding the review server under a live server broke 10 reviews)
The sweeps. On 10-15 a CoS commit swept in cm-lifehacks's in-progress meta.json edits. On 10-16 merge commit **2e2ccd9** ("Merge wj: Wave J physics #61-63") swept in three files the principal engineer had staged in the shared index: `company/engineering/reviews/2026-10-15-accounts-f01-review.md` (+55 lines, the rulings addendum) and the two First Light re-estimate notes (`.../notes/2026-10-15-first-light-reestimate.md`, `.../2026-10-16-first-light-reestimate-full-scope.md`). I checked this with `git show --stat 2e2ccd9`. The CoS ran `git add` on the generated registry files and then `git commit --no-edit`, which commits the **whole index**. The content is exactly what the PE wrote. Authorship was recorded afterwards in empty commit 49aea2e, which is itself authored `Claude` (see C8). This is the coordinator's own account, and the commit confirms it.
1. Why? The integrator works in the shared main tree. Other agents' uncommitted, **and staged**, edits live there, and the integrator runs host-wide commands there.
2. Why did the sweeps happen? A bare `git commit` (or `--no-edit` on a merge) commits everything in the one shared index, not only the paths the CoS added. "Commit only your files with explicit paths" is in every brief, but no guard enforces it on the CoS, and a merge commit invites a bare commit.
3. Why pkill again? W-529 (ban `pkill -f`) has been in backlog since 10-14. `tools/serve.sh` exists but is not the only path.
4. Why did the server rebuild break reviews? The build wrote into the dist dir that the live server was serving. There is no "build to a new dir, then swap" rule, and nothing tells the evaluators that the server changed under them.
5. Why does the operator keep doing the ops lane's work? The protocol §4 lets the CoS keep servers healthy alone, with no checklist and no second pair of eyes.
→ Change C6 (CoS integration checklist as mechanisms, not reminders).

### H6. /dev/null on the shared host was replaced by a symlink into an agent's scratch output (2026-10-16 09:45Z), breaking git and shells for every agent until the CoS restored it at 09:47Z (W-1183)
I hit this myself at the start of this session: `git pull` failed with "could not open '/dev/null' for reading and writing: Is a directory". The symlink pointed at `.../scratchpad/qa-hist/out` (the History QA run's output). Reported by vp-books; restored by the CoS as an emergency action, which is allowed under protocol §4.
1. Why did it break everyone? All agents share one host, and /dev/null is host state, not repo state.
2. Why could an agent's QA run change it? Some output-path step resolved `/dev/null` as a target and replaced it (the exact command is not on disk yet; principal-engineer-ops' COE should find it). Agents run as root with no guard on system paths.
3. Why was it not caught before the next agent hit it? No preflight checks host invariants (device files, free disk, ports) before a dispatch.
4. Why do we keep learning this one incident at a time? The host-exhaustion COE (10-14), the container restarts (WBR A4) and this incident are the same class: shared host state with no owner-run check.
5. Why no owner? The ops lane owns incidents, but no standing check of host invariants is anyone's job.
→ W-1183 (principal-engineer-ops), widened in C7.

### H7. The single-writer files bottleneck through one role
board.json, progress.md, events.jsonl and founder-inbox.json go only through the CoS. Since the last handoff the CoS has written board commits but **no progress.md entry for about 20 h**, and no events since 10-15 10:11Z. One writer prevents collisions (the 10-14 retro), but one writer who is also the only dispatcher and integrator drops the record first when busy. The four files are the company's memory, and they are being kept by the busiest role. → Change C5.

## What we will change (each a mechanism with an owner; board-ready lines for the chief of staff to file)
| # | Change | Mechanism | Owner | Board-ready line |
|---|---|---|---|---|
| **C1** | **Dispatch events written at dispatch time, and their age visible** | A PreToolUse/PostToolUse hook on the Agent tool appends `dispatch` and `report` events (role, description, `batch=`, chooser) through `tools/events.mjs add`. `company status` and `metrics` print "last dispatch event: N h ago" and mark the "never dispatched" list STALE above 6 h. Backfill stays as repair, not as the path. Merge W-1175 into W-716 and re-own both to tools-lead. **Needs the founder:** a change to `.claude/settings.json` is a configuration change (D-3). | tools-lead | `board add "Dispatch/report events written by an Agent-tool hook (not backfill); status+metrics show last-dispatch age, metrics marks never-dispatched STALE >6h; merge W-1175 into W-716 (retro 2026-10-16 C1; hook needs founder D-3)" --owner=tools-lead` |
| **C2** | **Slot ledger that records who chose each run** | Build W-1173 with these fields on each O_EXCL slot file: role, lane (from poc-map.md), `batch=` or `SO-` or `§4:<reason>`, chooser. `dispatch-check` refuses a slot with no source, refuses `general-purpose` unless the reason is a §4 integration task, and refuses a checker role whose `batch=` is not lane 10 (after F-28). The ledger is also the cap, and my WBR section reads it. | tools-lead | `board add "W-1173 slot ledger: each slot records role, lane, batch=/SO-/§4 reason and chooser; dispatch-check refuses no-source slots, general-purpose outside §4, and checker roles from non-quality batches (retro 2026-10-16 C2)" --owner=tools-lead` |
| **C3** | **Standing orders for the Quality lane, so its POC chooses its own work** | evaluation-steward issues SO-10-1 (QA of lessons with no QA record on the current build, ≤15 per run), SO-10-2 (fact-check `claims --open`, per domain), SO-10-3 (learner review of lessons waiting, artifact first), each with an expiry of 7 days or less. Every lane-10 run after that cites an SO or a Hilde batch. That moves 30% of all dispatches from the CoS's choice to the POC's, at one manager run. | evaluation-steward | `board add "Issue standing orders SO-10-1 QA, SO-10-2 fact-check claims --open, SO-10-3 learner review (≤7-day expiry, dispatch-requests.md §2.3) so quality-lane runs are chosen by the steward, not the CoS (retro 2026-10-16 C3)" --owner=evaluation-steward` |
| **C4** | **Off-boarding summary format for every run** (the founder: "off-boarding summaries and mechanisms give each role its context") | One fixed shape for every agent's final report and the matching progress handoff: **Changed** (paths) · **Checked on disk** (claim → the command run this turn → its output) · **Believed, not checked** · **Confidence** · **Next, with owner role** · **Did not do / left for whom**. A claim about disk or deploy state with no "checked" row is read as testimony. The steward's brief template quotes the parser's verdict vocabulary instead of restating it. I draft the format and its decision record; it changes the working agreement in tools/org/roles.mjs, so the founder approves (D-4). | chief-of-staff-ceo-office (draft), founder (approve) | `board add "Draft the run off-boarding summary format (Changed / Checked on disk with command / Believed / Confidence / Next+owner / Not done) and its decision record for the working agreement; founder approves (retro 2026-10-16 C4, D-4)" --owner=chief-of-staff-ceo-office` |
| **C5** | **Single-writer files fed by per-run files, folded every round** | Agents write their handoff and board asks to `company/ops/inbox/handoffs/<date>-<agent>.md` (their own file, so no collision), in the C4 format. At each round the CoS folds them into progress.md, board.json and the inbox. `company status` shows "unfolded handoffs: N, oldest N h". The writer stays single; the record no longer waits on its free time. | chief-of-staff (fold), tools-lead (status line) | `board add "Per-run handoff files in company/ops/inbox/handoffs/ (C4 format), folded into progress/board/inbox each round; status shows unfolded count and age (retro 2026-10-16 C5)" --owner=chief-of-staff` |
| **C6** | **The CoS integration checklist as guards** | (a) **One index per writer.** Any agent that writes files in the main checkout (not only builders: the PE, the CMs, reviewers) works in its own worktree, so the main tree's index belongs to the integrator alone. Until that is in place, the integrator commits only with `git commit -- <paths>` (or `tools/commit-own.sh <paths>`, which fails if the index holds anything else), never a bare `git commit` or `--no-edit` on a merge with a non-empty foreign index. A pre-commit guard in the main tree refuses a commit whose staged paths are not the ones listed. That covers both the 10-15 cm-lifehacks sweep and 2e2ccd9. (b) W-529: `pkill -f` / `pgrep -f` blocked by a hook, `tools/serve.sh` the only stop path. (c) A server rebuild builds to a fresh `NEXT_DIST_DIR` and swaps only after the old server has drained, and evaluators get a "server changed at T" line in their brief. (d) Before telling the founder any deploy state or setup step, re-read the source that turn (the 10-15 retro line), with the source named in the message. Ada answers each item in writing (my authority). | chief-of-staff (answer), tools-lead (a-c) | `board add "CoS integration guards: own worktree for every agent writing in the main checkout; integrator commits only via git commit -- <paths>/commit-own.sh (never bare commit or merge --no-edit with a foreign index; 2e2ccd9 and the 10-15 sweep); explicit-path pre-commit, pkill -f hook (W-529), serve.sh build-to-new-dir-then-swap with evaluator notice; CoS answers in writing (retro 2026-10-16 C6)" --owner=tools-lead` |
| **C7** | **Host invariants checked before every dispatch** (widens W-1183) | `dispatch-check` fails if /dev/null is not a character device, free disk is under the floor, or a reserved port is held by an unknown PID. Agent scratch output paths may not resolve outside the scratchpad. principal-engineer-ops writes the COE for 09:45Z and finds the command that replaced the device. | principal-engineer-ops | `board add "W-1183 widened: dispatch-check host invariants (/dev/null char device, disk floor, reserved ports) + COE for the 10-16 09:45Z /dev/null replacement naming the command (retro 2026-10-16 C7)" --owner=principal-engineer-ops` |
| **C8** | **Checkers are attributable, so independence can be audited** | Every dispatch brief sets `GIT_AUTHOR_NAME=<role>` for the run, as session 2 already does. A commit-msg check warns on author `Claude` for commits that touch `company/reviews/**` or a QA record. QA records written by the integrator's verify run are labelled `integration`, never `qa-tester` (protocol §4). The steward audits the last 48 h of QA records by author once C8 lands. | evaluation-steward (rule and audit), tools-lead (check) | `board add "Per-role git author on every dispatched run; warn on author Claude for review/QA-record commits; integrator verify runs labelled integration not qa-tester; steward audits QA-record authorship (retro 2026-10-16 C8)" --owner=evaluation-steward` |
| **C9** | **The batch template and the batches agree** | Neither round-1 batch uses §2.2's item fields (role, kind, worktree, checked by), and History's lives in `company/domains/history-dispatch/`, not the protocol path. I amend dispatch-requests.md: (1) the path is `company/ops/dispatch-requests/` or the lane's own folder, listed in poc-map.md; (2) a lane-1 batch requests its checks as asks to lane 10 (with dates), not as items. The CoS refuses non-conforming items in writing from round 2 instead of queueing them (W-1176 queued History runs 1, 3, 4 and 5, which are checkers). | chief-of-staff-ceo-office (protocol), chief-of-staff (refusals) | `board add "Amend dispatch-requests.md: batch paths per lane, lane-1 checks as asks to lane 10; from round 2 the CoS refuses non-conforming items in writing (retro 2026-10-16 C9)" --owner=chief-of-staff-ceo-office` |

**Top five, if only five happen:** C1 (we cannot see), C2 (we cannot tell who chose), C3 (the biggest lane gets its manager), C4 (reports say what was checked), C8 (independence becomes auditable). The cheapest change to make today is C6(a), `git commit -- <paths>`, because the same sweep happened twice in two days.

## What we will stop doing
- Treating "the CoS asked the manager a question" as delegation. A manager's choice is a batch file or a standing order, or it did not happen.
- Running general-purpose for any named role, existing or missing.
- Keeping one item per symptom with an owner who cannot fix it (W-1175 owned by chief-of-staff for a tools-lead fix).

## Did the last retros' changes work?
| Change (retro) | Worked? | Evidence |
|---|---|---|
| Concurrency cap enforced (10-14) | Partly | No host-overload COE since. The cap is still remembered, not enforced; that needs C2. |
| One writer for the board (10-14) | Yes for collisions, **no for timeliness** | No duplicate W-ids since. No handoff for 20 h (H7). |
| Event log gap fixed (10-14 audit answer, W-705/W-716) | **No** | The log has been dark since 10-15 08:55Z (H3). |
| pkill mechanism (10-13, again 10-14) | **No**, third retro running | W-529 is backlog. The CoS killed its own shell twice more (H5). |
| Deploy marker guard (COE 10-15: W-1051, W-1052, W-1054) | **Not started** | All three are in backlog. The founder removed auto-preview (10-16), which lowers the risk but is not the guard. |
| Budget line first (10-15, W-920) | In review | – |
| No numbers to the founder from memory (10-15) | **No** | The Neon step and the verdict word were both from memory (H4). The rule was a checklist line with no form; C4 gives it one. |

## Founder decisions (proposed, not decided; to company/ops/founder-inbox.json through the chief of staff)
| # | Decision | My recommendation | Why |
|---|---|---|---|
| D-1 | **F-28**: checkers dispatched only through the quality lane | **Yes** | H1 and C2/C3 depend on it. Lane 1 asking for its own checkers is the "no one checks their own work" failure, one step removed. |
| D-2 | **F-30**: managers get the Agent tool | **Still not yet.** Do C1, C2 and C3 first, then the 3-day engineering pilot | This retro shows the bottleneck is the record (events, authorship, handoffs), not the Agent calls. More dispatchers on a dark log would make it worse. |
| D-3 | Allow a tools-lead hook on the Agent tool in `.claude/settings.json` (C1) | **Yes** | It is a configuration change, so only the founder can approve it. It adds no role and no new capability, only a record. |
| D-4 | Adopt the off-boarding summary format in the working agreement (C4) | **Yes**, after my draft | It changes every role's onboarding doc through roles.mjs, so it needs a decision record. |
| D-5 | **Park** (not retire) the strand managers that have never run: 23 of 27 cm-<domain>-<strand>. They keep their definitions; they leave HQ desks and the metrics' "never dispatched" list until their category's DLR five passes, which is the playbook's own trigger (step 5). | **Yes** | Mission: "every role is either used or retired". These are neither. Parking is reversible and creates nothing. The full list comes with the offboarding records I would write (template: company/rituals/templates/offboarding.md). |
| D-6 | **F-27**: growth stays an interim split | **Yes** (unchanged) | No new lead for a one-person lane. |

No new role, org, floor or room is proposed here.

## What this teaches System 3 Meta (parked; notes only, not design)
- A generated company needs its **instruments generated first**: an event hook, per-role authorship and a slot ledger, before the first role exists. We built 97 roles and could not see which of them ran.
- **"Same model, different rules"** is the unit to generate: a role is its may-not list plus its inputs. The roles that behaved independently were the ones with refusals written down.
- **Delegation must be a file, not a conversation**: batch, standing order, off-boarding summary. Anything said only in a manager's reply to the operator is lost.
- **Shared host state is part of the org.** Each generated company needs an owner of host invariants from day one (H6).
- Scale the org to what is measured. Lanes that a generator creates but nobody dispatches (our strand managers) are cost and noise.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| C1's hook and C8's author check add steps to every dispatch, and dispatch latency is already the cost the founder accepted for the rule. | Leonie, anticipating chief-of-staff | **Open, answered in part:** both are automatic (a hook and an env var). They add no agent run. W-1174 (WBR 10-19) measures protocol cost and should include them. |
| The matrix's post-10-15 rows rest on commit subjects, which are testimony, and git authorship cannot confirm them. The 99% figure could be off. | Leonie (against my own finding) | **Carried.** The logged half (223 events, 100% CoS) does not depend on it. I will re-run the matrix from C1/C2 data at the 10-19 WBR, and if the shares move by more than 10 points, this retro gets a correction. |
| Standing orders (C3) let the CoS keep dispatching most work without asking anyone, which could be read as the old way under a new name. | Leonie, for the founder's rule | **Answered:** the steward writes, scopes and can withdraw each SO with an expiry of 7 days or less. The choice is hers and is on disk. A CoS dispatch without an SO or a batch is a C2 refusal. |
| Parking 23 strand managers (D-5) looks like a reorg one day after a reorg ("a reorg every week" is a failure mode in my role doc). | Leonie | **Open, founder's call.** It changes no reporting line and no lane; it only stops counting idle roles as capacity. If the founder prefers, defer it to the 10-19 WBR with the measured data. |
| C5 (per-run handoff files) weakens the one-writer rule from the 10-14 retro. | chief-of-staff (anticipated) | **Answered:** the four files keep one writer. Agents write only their own new file, which cannot collide, and the CoS folds it. |
| I, the auditor, propose C4 and C9 and draft them myself, which is close to approving my own proposal. | Leonie | **Answered:** I draft only. The founder approves C4 (D-4), and Ada accepts or objects to C9 on the board. I do not move any of these to done myself. |
| The /dev/null restore was done by the chief of staff, which is the operator doing ops work (independence). | Leonie | **Accepted as a §4 emergency** (contain first). It is a finding only if no COE follows. principal-engineer-ops owns that COE (C7). |

## Kudos (optional)
- @head-of-strategic-initiatives: round 1 is the template every lane should copy: runs ordered by the critical path, one builder slot asked for, evaluator inputs kept to artifacts, every founder ask dated.
- @cm-history: carried an objection against her own batch's shape, with a status. Objections travel.
- @vp-books: reported the /dev/null breakage that was blocking every agent on the host.
- @evaluation-steward: the strict verdict parser (W-843) is what caught the wrong verdict word, instead of letting it pass silently.

## Chief of staff's answer to C6 (2026-10-16, Ada)
- (a) **Accepted, in force for me now:** I commit only with `git commit -m … -- <paths>`; no bare commit, no `merge --no-edit` with a foreign index. Own worktrees for every writing agent: accepted, applied from the next dispatch round. The pre-commit guard goes to tools-lead.
- (b) **Accepted:** I stop servers by exact PID only; the hook goes to tools-lead (W-529).
- (c) **Accepted:** rebuilds go to a fresh NEXT_DIST_DIR and swap after drain; evaluator briefs carry "server changed at T".
- (d) **Accepted:** before stating deploy state or a setup step to the founder I re-read the source in that turn and name it.
- C9 refusals: accepted from round 2. C5 fold: accepted; I fold each round once tools-lead adds the status line.
- Filed C1–C9 on the board; D-3/D-4/D-5 are F-31/F-32/F-33 in the founder inbox; D-1/D-2/D-6 link to F-28/F-30/F-27.
