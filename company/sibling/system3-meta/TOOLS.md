# System 3 Meta: tool inventory and build order

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · keep this file current: update a row in the same commit as the tool
founder, 2026-10-21: "not so fast, we have a lot to do for tools … still dont have group meetings, i am not sure if we have broadcast or newsletter mechanism, not sure about rituals, tracking (linear like for example) and many other things"

## Inventory

| Area | State | Where |
|---|---|---|
| Goals (levels, contributes-to tree, RAG, auto-red, divergence, roll-up review) | built, tested; used in benchmark 1 | prototype/goals.mjs |
| Leadership asks (routed to the lowest level that can decide) | built, tested | prototype/asks.mjs |
| Company specs (an org as data: `init --spec=`) and text checks as test1 | built; `toy`, `storybook` | prototype/specs.mjs, state.mjs |
| Supervision (code supervisor, launch plan, wake) | built, tested, used live (run 3) | prototype/supervisor.mjs |
| Flows and orders (stages, signers, versions, `--after`) | built, tested, used live (runs 1-3) | lib.mjs Engine |
| Rooms and sessions (enter, leave, next, leases, recovery) | built, tested, used live | lib.mjs Rooms |
| Mailbox (priorities, keys, leases, promotion) | built, tested, used live; point-to-point only | lib.mjs Mailbox |
| Lane policy and manager cycle | built, tested, simulator only | policy.mjs |
| Contractors (outside the flow; onboarding template) | built, tested via CLI; no live run | contractor.mjs |
| Measurement (usage, flow metrics, manager report) | built, used live | lib.mjs flowMetrics, policy.mjs |
| Approvals (founder queue, callbacks, timeouts) | built; in the CLI (`approval queue`, `approval decide`); a prefix registry routes approved refs (FLOOR-) | lib.mjs Engine, `onApproved` |
| Org changes (propose, approve, onboarding and offboarding, gaps) | built; in the CLI (`org propose`, `org roles`, `org gaps`); not yet used live | lib.mjs Org |
| Rituals: WBR, goal review, digests | built, tested; WBR is a meeting with a code-built pack (page 0, hits and misses, roadmap and goals, leadership asks); used in benchmark 1 | prototype/rituals.mjs |
| Channels, broadcast, announcements | built, tested; company, lane, role and topic channels; ack tracking; used in benchmark 1 | prototype/channels.mjs |
| Tracker (Linear-like) | built, tested; issues, orders (mirrored by code), asks and actions; projects, cycles, labels, links, comments, search, board, overdue | prototype/tracker.mjs |
| Group meetings | built, tested; private-then-revealed rounds, whiteboard, objections that need answers, decisions → tracker actions, minutes to a channel; used live (benchmark 1 kickoff) | prototype/meetings.mjs |
| Newsletter and digests | built, tested; written by code per audience (founder, lane, company), published to a channel | prototype/rituals.mjs digest |
| Building (floors and rooms) | built, tested; floors through founder approval, rooms add, rename, retire (refused while in use), bookings with capacity | prototype/building.mjs |
| Decisions as checks (`meeting decide --rules`) | built, tested; a meeting decision code can check becomes `checks` on every matching order, open or later, with the stricter value winning; the minutes show what each rule tightened; used live (live run 4, benchmark 3) | prototype/meetings.mjs applyRules, meta.mjs |
| Text checks, full set | built, tested: file, word limits, literal mustInclude, whole-word banned, reading ease, title line, lineMaxWords, allowedLines, distinctAnswers (across orders, split sections, within a section, giveaways with distinctive words, common answers exempt); `check` lists them in plain words and logs a self-check event | prototype/state.mjs |
| Supervisor as a service (`serve`) | built, tested; long-running, writes every launch brief to an outbox and one JSON line per event for a monitor; pid guard; adaptive drain cap; 0 typed commands per wake (live run 4, benchmark 3) | prototype/supervisor.mjs serve |
| Harness usage (`supervisor.mjs usage`) | built, tested; by session id or role, `--outside` for work outside rooms | prototype/supervisor.mjs |
| Org evaluation (`orgeval.mjs`) | built, tested; per run: cost, auto-correction (caught by code, self-check, checker, integration; escapes), learning (repeats after being told), collaboration, trend; two packs (live/orgeval-1, -2) | prototype/orgeval.mjs |
| Hidden acceptance (UAT) per task | built; `serve --acceptance=<dir>` runs the orderer's tests; agents never see them | prototype/supervisor.mjs |
| Sessions that wait for their next item (`room next --wait`) | built, tested; a session keeps up to 90 s for its role's next item and the planner counts it as running; benchmark 4: 9 sessions did 22 items | prototype/lib.mjs Rooms.next/resume, meta.mjs |
| Company escape list (`escape add`, `knownFalse` checks) | built, tested; prototype/escapes.json is merged into every new text order's checks; seeded with the Venus claim | prototype/escapes.json, state.mjs |
| Automatic launcher (Agent SDK) | built; runs `serve`, starts every planned session from its brief, tags sessions (META_LAUNCH), records usage, abandons a crashed process's work; M3 reached with it (benchmark 4) | prototype/launcher/launch.mjs |
| Regression gate, watchdog, `order reopen`, announcements in briefs | built, tested; the gate caught benchmark 4's corrupted GRAPH at the next ship; the watchdog is unit-tested only (its live fault never fired); `mail dup` is managers-only | prototype/supervisor.mjs, meta.mjs |
| Document registry and review | designed (scenario S11), not built | - |
| Notifications and subscriptions | not designed | - |
| Calendar of human slots | not designed (the simulator models founder sittings) | - |
| Search and knowledge base | not designed | - |
| COE and retro as tools | not designed | - |
| Escalation inbox (people) | not designed | - |
| HQ view of the live state | not designed for Meta | - |
| Per-role permissions on tools | partly: the engine's rules; no general tool permissions | - |

## Build order

Status 2026-10-21 (updated after benchmark 3): steps 0-6 built except the document registry; since then, decisions as checks, the full text checks, `serve`, harness usage and the org evaluator (rows above). Steps 0-5 were built and tested (46 tests) and used in Benchmark 1 (prototype/BENCH1.md); step 6 approvals and org changes are in the CLI; the document registry is not built.

Each step builds on the one before. Each gets a committed prediction, tests, and one small live run with real agents before the next starts.

0. **Building API.** Floors and rooms as data, through the org change process:
   - `building floor add`, `room add --floor --kind=lane|meeting|quality|lobby|launch --capacity`, `room rename`, `room retire`;
   - `room book` for meeting rooms (a slot; used by group meetings);
   - **code refuses:** retiring a room with seated roles or running runs; a room on a missing floor; a lane room without a lane; booking past capacity;
   - **who may:** adding or retiring floors is an org change (the founder approves); a lane manager may add or book meeting rooms on its own floor;
   - every change is an event, so HQ can draw the building from the log.
1. **Channels and broadcast.** Pub/sub on top of the mailbox:
   - channels (lane, company, role), subscriptions and announcements;
   - read and ack tracking, so "everyone was told" is checkable.
2. **Tracker.** Issues, projects, labels, assignees, cycles, comments, links and a board view. Orders become one kind of tracked item, so all work is in one place. Replaces the company's `board.json` model for Meta.
3. **Group meetings:**
   - an agenda built from tracker items;
   - rounds, with positions written privately and then revealed (no anchoring);
   - a shared whiteboard, and objections that are carried, not dropped;
   - decisions and actions written into the tracker;
   - minutes generated from all of it.
4. **Rituals for real.** CLI commands and live runs, built on meetings and the three clocks.
5. **Newsletter and digests.** Generated by code from the tracker and events, per audience (the founder digest, a lane weekly).
6. **Approvals and org changes in the CLI, then the document registry.**

After these: notifications, a calendar of human slots, search, COE and retro tools, the escalation inbox, an HQ view.
