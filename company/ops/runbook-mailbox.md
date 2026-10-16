# Runbook: mailboxes (managers ask, the chief of staff dispatches)

owner: tools-lead (the tool) · lanes: chief-of-staff-ceo-office (company/ceo-office/poc-map.md) · decision: company/decisions/2026-10-16-founder-mailbox-dispatch.md (F-42)
tool: `node tools/mailbox.mjs` (library tools/lib/mailbox.mjs, tests tests/mailbox/, `npm run test:mailbox`)

Mailboxes are spool, not record: `company/ops/mailboxes/<role>/` in the main checkout, gitignored. Each message is one file, `<ts>-<from>-<key>.md`, created whole and exclusively, so parallel writers never collide. The tool never edits or deletes a message; read, claimed and done are marker files beside it. The event log stays the record, and only the chief of staff writes it. Run the tool from any worktree: it finds the main checkout's mailboxes through git.

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
node tools/mailbox.mjs status                 # unread per mailbox, unclaimed requests
node tools/mailbox.mjs drain dispatcher       # each unclaimed request, re-checked against today's map
```

For each `REQUEST`, run its four lines in order, without choosing:
1. **check:** the printed `dispatch-check … --source=mail:<id>` line. Fill in `--running=<N>` (and `--builders`, `--worktree` for builds). Rule M1 repeats the lane check and refuses a claimed or done request in every slot mode. On FAIL, stop. Tell the sender with `send --kind=answer`.
2. **start** the agent: the description is the printed label, and the prompt is the brief file.
3. **claim:** `node tools/mailbox.mjs claim <id> --agent='<label>'`. It can be done once only, so a second drain cannot start the same request.
4. **event:** the printed `events.mjs add --type=dispatch …` line. Fill in the room. Skip it if the hook wrote the dispatch event (W-1280). The drain itself writes nothing.

A `REFUSED` entry means the map changed after the request was sent, or the file was written by hand. Do not dispatch it. Answer the sender.

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
- `--from` is whatever the caller says it is. The tool checks lanes, not identity. A worker could send as a manager. The event log and the claim marker show who dispatched each run, and the pilot's out-of-lane measure counts refusals, not impersonation.
- Lane 2's "Wave J's fixed slug list only" is prose, and the tool does not check it. principal-pm-verticals keeps to the list.
- The word "deploy" anywhere refuses the request, including "do not deploy". Leave it out. The deploy rule already binds every agent.
