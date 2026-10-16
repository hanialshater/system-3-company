# How managers request dispatches from the chief of staff

owner: chief-of-staff-ceo-office (Leonie) designs it. The chief of staff (Ada) runs it · as of: 2026-10-16 · board: W-1163
source: company/decisions/2026-10-16-founder-org-and-dispatch-rule.md (rules 2 and 3) · lanes: company/ceo-office/poc-map.md · record: company/decisions/2026-10-16-poc-map-and-dispatch-requests.md

The idea: **one manager run per lane per round.** The manager decides what runs in the lane. The chief of staff checks it mechanically, fits it to the caps, and dispatches it. The founder sees exceptions, not batches.

## 1. The round and the cadence
- **A round** is one dispatch-planning point of the operating loop. That is the day's open (operating-loop.md §B "Open"), plus any later point where the previous round's batches have drained and the caps have room. Plan for at most 3 rounds a day.
- **Which lanes are asked:** only lanes with (a) board items in `next` owned by a role in the lane, (b) results returned since that lane's last batch, or (c) a founder ask routed to the lane. Every other lane is skipped and costs nothing.
- **Once per lane per round.** One manager run answers for the whole lane. The chief of staff does not go back to the same manager in the same round, except for an emergency (§4) or to report an item it refused (§3.3).
- **Manager runs are dispatches too.** They pass `dispatch-check --kind=other` and count toward the 8-agent cap. Run them in parallel (one message, several Agent calls), in the portfolio-manager's priority order when the cap is tight.
- **A manager who does not answer** (stopped, or no batch file) gets one resume via SendMessage. After that the lane is skipped for the round and the founder digest lists it. A lane skipped two rounds in a row goes on the board for Leonie, as a health finding.

## 2. The batch (what a manager returns)
The manager writes **one file per lane per round**: `company/ops/dispatch-requests/<YYYY-MM-DD>-r<N>-<lane>.md`. An initiative keeps its batches in its own folder (`company/initiatives/<id>/dispatch/<date>-round-<N>.md`, as First Light already does). The `batch=` reference carries the path either way. The manager's final report links it and repeats any founder items. The folder is not one of the four single-writer files, so managers may write it. The chief of staff never edits a batch; it appends a `## Dispatched` section (§3.4).

### 2.1 Header
```md
# Dispatch request: <lane> · round <N> · <date>
poc: <role id> (<name>)
lane: <# and name from poc-map.md>
slots asked: <agents> agents, of which <builders> builders
since last round: <each result that came back, and what the manager decided about it: accept / revise (item Bx) / drop, with a reason>
held or declined: <items the manager chose not to run this round, with the reason>
standing orders: <new, renewed or withdrawn, see 2.3>
for the founder: <none, or each item with the §5 reason>
objections: <none, or the objection and where it is recorded>
```

### 2.2 Items (one block per dispatch, in run order)
```md
## B1 · <one-line task> · board W-<id>
role: <subagent_type, which must exist in .claude/agents/ and be in this lane>
order: <first | after B<k> | parallel with B<k>>
kind: <build | wave | check | ritual | incident | other>   (dispatch-check --kind)
worktree: <yes (builds always) | no>
model: <agent default | sonnet | ...>
project: [project:<id>]   (must be `approved` in company/ops/projects.json)
budget: <runs> runs, ~<tokens>k tokens
inputs: <files. For evaluators, artifacts only: walkthrough output, never build.md or the builder's notes>
cites: <for First Light items: Kenji's estimate or EDD for engineering, Priya's record for scope. Otherwise optional>
outputs: <files the agent writes>
done when: <a check someone else can run: a command, a record with a field, a gate status>
checked by: <the role in lane 10 that checks this work, or "none needed" with a reason. Never this lane>
stop if: <conditions under which the agent stops and reports instead of continuing>
```
Keep each item short. A batch of more than about 8 items is a sign that the lane needs a standing order or a smaller round.

### 2.3 Standing orders (to keep it light)
A manager can turn a routine, mechanical dispatch into a **standing order**, so the chief of staff runs it without asking every round. Example: "every lesson in `review` with no QA record → qa-tester, batches of 15 or fewer, `[project:<lesson's tag>]`."
- It is written in a batch's `standing orders:` line, with an id (`SO-<lane>-<n>`), the trigger, the role, the batch size, the tag, the done check, and an **expiry** (a date, at most 7 days out, or a number of rounds).
- Allowed only for work whose inputs and done check are mechanical. In practice: QA, fact-checking `claims --open`, learner review of lessons waiting for one, claim.mjs builds from an already-ranked brief file, and triage on its trigger.
- Not allowed for: a new format, anything tier 2, anything touching deploy or learner data, a First Light dependency, or anything the founder must see.
- The chief of staff cites the standing order in the dispatch (`batch=SO-<lane>-<n>`). The manager can withdraw it at any batch.

## 3. What the chief of staff does with a batch
1. **Checks, mechanically.** The role exists and is in the lane. The project tag is approved. `dispatch-check` passes. Evaluator inputs are artifacts only. `checked by` is not the same lane. No item deploys or publishes outside lane 11, and no deploy runs without the founder's approval of that deploy.
2. **Fits it to the caps.** Across lanes, the order is the portfolio-manager's priority. Inside a lane, it is the batch's order. Items that do not fit wait for the next round in the same order. The chief of staff does not re-rank them.
3. **Refuses, in writing.** An item that fails a check is not dispatched. The chief of staff writes why under `## Dispatched` and tells the manager at the next round. The chief of staff never fixes an item by changing its role, inputs or done check. That is the manager's call.
4. **Dispatches and records.** Each Agent call's brief is built from the item. The dispatch event's summary carries `batch=<file>#B<n>` (or `batch=SO-…`). The batch gets a `## Dispatched` section listing each item as dispatched / waiting (cap) / refused (reason). Results go back to the lane's POC at the next round. They do not go straight to a follow-up dispatch.

## 4. What the chief of staff may still do alone (no manager asked)
- **Integration:** merging branches, `npm run registry`, `npm run check` and `npm run verify` on the integrated tree, worktree cleanup, `claim.mjs seed-worktrees`, and keeping servers healthy (`tools/serve.sh`). A verify run on the integrated tree is integration. It is not the qa-tester's record and must not be labelled as one.
- **The four files it alone writes:** board.json, progress.md, events.jsonl, founder-inbox.json. Also the dispatch log and `## Dispatched` sections.
- **Emergencies:** a SEV1 or SEV2, a broken or stale server, a full disk, a published claim found false, a learner-harming bug. The chief of staff contains first (incident-response.md), dispatches principal-engineer-ops, and tells the affected lane's POC afterwards. If the fix needs a builder, that is the lane's next batch, unless Rhea declares it part of the incident.
- **Rituals the operating loop already gives it:** WBR, retro, founder digest, the launch-review batch append, cycle planning, board grooming. It dispatches the participants each ritual names (`--kind=ritual`).
- **Resuming** a stopped agent on its existing brief (SendMessage). This is not a new dispatch.
- **Standing orders** already issued by a manager (§2.3), until they expire.
- **Manager runs**, Leonie's runs when the founder or a ritual asks, and portfolio-manager on its triage trigger.

The chief of staff may **not**: choose a specialist's task, add an item to a batch, run a role that is not on the POC map, run a missing role as general-purpose, or create any role, agent, org, floor or room (founder rule 1; company/ceo-office/org-change-process.md).

## 5. What reaches the founder
The attention tiers in operating-loop.md still apply. On top of them, from this protocol:
- **Ask (founder-inbox.json):** any batch item marked `for the founder`. That means a spend above the approved tranche, a gate override or waiver, anything public, any deploy, a new role, agent, org, floor or room (through Leonie), and a cross-lane priority tie the portfolio-manager cannot settle (the Friday review).
- **Batch in the digest:** one line per lane per day (asked / dispatched / waiting / refused), lanes skipped for no answer, and standing orders in force.
- **WBR, company health section (Leonie):** the share of dispatches with a `batch=` reference (target 100%, except §4 items), refusals by reason, manager-run cost per round, and the latency a round adds.
- **Never:** individual batches, routine standing-order runs, or refusals the manager accepted.

## 6. How we will know it works (and when it is wrong)
- Leonie rebuilds the round from events.jsonl and the batch files at each WBR. A dispatch with no `batch=` reference that is not a §4 item is a finding. The chief of staff answers it in writing.
- **Wrong if:** after 3 days, manager runs cost more than 20% of the agents they unlock, or rounds wait more than one loop turn for an answer. Then standing orders are widened, or the proposal in company/decisions/2026-10-16-proposal-managers-dispatch-own-teams.md is taken up.
