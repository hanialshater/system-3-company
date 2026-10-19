# Runbook: mailboxes (managers ask, the chief of staff dispatches)

owner: tools-lead (the tool) · lanes: chief-of-staff-ceo-office (company/ceo-office/poc-map.md) · decision: company/decisions/2026-10-16-founder-mailbox-dispatch.md (F-42)
tool: `node tools/mailbox.mjs` (library tools/lib/mailbox.mjs, tests tests/mailbox/, `npm run test:mailbox`)

Mailboxes are spool, not record: `company/ops/mailboxes/<role>/` in the main checkout, gitignored. Each message is one file, `<ts>-<from>-<key>.md`, created whole and exclusively, so parallel writers never collide. The tool never edits or deletes a message; read, claimed (the reservation: run id, state reserved or launched, lease) and done are marker files beside it, and a reservation that ended without a launch is kept as `<id>.released-<run>.json` or `<id>.expired-<run>.json`. The event log stays the record, and only the chief of staff writes it. Run the tool from any worktree: it finds the main checkout's mailboxes through git.

## 1. A manager asks for a run

```bash
node tools/mailbox.mjs send --from=principal-pm-verticals --to=dispatcher --role=demo-builder \
  --kind=dispatch-request --project=wave-j --title="Wave J physics: <slug>" \
  --budget=250k --done-when="built, QA green, claims unverified" --stop-if="over budget or a gate fails twice" \
  --file=brief.md          # or --body="…"; optional --lane=<n>, --dispatch-kind=build|check|…, --worktree=<path>
```

- The file is the brief the agent gets, word for word. Write it for a reader who knows nothing.
- The tool refuses the request (exit 1, nothing written) unless all of these hold. You are the POC of the lane on poc-map.md. The role is listed in that lane, or for a CM, it is one of your own strand managers. The project tag is approved in company/ops/projects.json. Only lane 10 (evaluation-steward) asks for checkers. Nobody asks for release-manager, and no request contains the word "deploy" anywhere.
- Only role ids written in the lane's cell count. Prose such as "launch-review participants" names nobody. Today lane 4 (First Light) accepts no role at all. Lane 5 accepts only analytics-steward, lane 16 only vp-marketing and lane 19 only pattern-librarian. To widen a lane, ask chief-of-staff-ceo-office to list the ids in the map.
- Questions and answers to another role use `--kind=question|answer --to=<role>` and have no lane check.

## 2. The chief of staff drains (every turn, and on every agent report)

```bash
node tools/mailbox.mjs status                 # unread per mailbox; unreserved, reserved and lease-expired requests
node tools/mailbox.mjs drain dispatcher       # re-checks each open request and RESERVES it before printing its lines
node tools/mailbox.mjs drain dispatcher --peek   # look only: reserves nothing (you may not launch from a peek)
```

**Reserve before launch** (since 2026-10-17, external assessment finding 3). The order is drain (reserve) → check → start → confirm → event. The drain takes each request that passes the lane re-check with an exclusive marker that carries a run id and a lease (30 minutes; `--lease=<min>`). Only one drain can win a request, so two drains never print the same one. The authority split is unchanged: managers decide by sending, and only the chief of staff drains, starts agents and records events (decision F-42 §1, §3, §6).

For each `RESERVED` entry, run its lines in order, without choosing:
1. **check:** the printed `dispatch-check … --source=mail:<id> --run=<run>` line. Fill in `--running=<N>` (and `--builders`, `--worktree` for builds). Rule M1 repeats the lane check. In every slot mode it refuses a request that is not reserved, reserved by another run, past its lease, already launched or done. **On FAIL, release it** with the printed `release <id> --run=<run> --reason='…'` line. Then tell the sender with `send --kind=answer`.
2. **start** the agent: the description is the printed label, and the prompt is the brief file. **If the Agent call fails**, release it in the same way, and say why in the reason.
3. **confirm:** `node tools/mailbox.mjs launched <id> --run=<run>`. Only the reserving run can confirm. After this the request never expires; `done` closes it.
4. **event:** the printed `events.mjs add --type=dispatch …` line. Fill in the room. Skip it if the hook wrote the dispatch event (W-1280). The drain writes reservation markers only. It never writes the event log.

**Recovery after a crash.**
- **Crash before the start.** Nothing confirmed the reservation, so its lease runs out. The next drain reclaims the request under a new run id. The old reservation is kept as `<id>.expired-<run>.json`.
- **Crash after the start, before the confirm.** A dispatch event for the request is in the event log or the hook spool (`source: mail:<id>`, or the label). The drain does not re-offer the request. It lists it as `EXPIRED (launched)` with the `launched … --run=<old run>` line. Run that line, and do not start the agent again.
- **No event was written either.** The tool cannot tell this case from a crash before the start, so the request is offered again. Check the Agent tool's running list before you launch a reclaimed request.

A `REFUSED` entry means the map changed after the request was sent, or the file was written by hand. It is never reserved. Do not dispatch it. Answer the sender.

## 3. A worker reports

The worker writes its report to a file and runs this, or the chief of staff runs it with the returned report:

```bash
node tools/mailbox.mjs done <request-id> --report=<path>
```

This copies the report into the requester's mailbox (kind report, `in-reply-to: <id>`). It prints the `events.mjs report` line for the chief of staff to record. A request is done once only.

## 4. The manager reads its inbox

```bash
node tools/mailbox.mjs list <role> --unread
node tools/mailbox.mjs read <id>              # prints it and marks it read
```

When `status` shows unread reports for a manager, the chief of staff starts that manager for a short turn: read the inbox, then decide what comes next (more `send`s, or nothing).

## 5. Integration (whoever merges this branch)

- `node tools/memory.mjs compact --all` is the integrator's step once F-39 (branch f39-agent-memory) is merged too. It is not wired into any mailbox command.
- After merging, run `npm run test:mailbox` and `npm run test:dispatch`.

## Limits (known)
- `--from` is whatever the caller says it is. The tool checks lanes, not identity. A worker could send as a manager. The event log and the reservation marker show who dispatched each run, and the pilot's out-of-lane measure counts refusals, not impersonation.
- Lane 2's "Wave J's fixed slug list only" is prose, and the tool does not check it. principal-pm-verticals keeps to the list.
- The word "deploy" anywhere refuses the request, including "do not deploy". Leave it out. The deploy rule already binds every agent.
