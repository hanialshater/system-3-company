# Founder: managers work through mailbox files; the chief of staff starts every agent (F-30 alternative, F-42)

owner: founder (decides) · design: tools-lead (mechanism), chief-of-staff-ceo-office (lanes, independence) · date: 2026-10-16 · class: org mechanism
route: founder proposal → tools-lead builds tools/mailbox.mjs on a branch → chief-of-staff-ceo-office reviews lanes and independence → chief-of-staff merges → pilot on one lane → founder confirms after 3 days
recorded by: chief-of-staff · status: decided in principle (founder's design); pilot terms below

## What the founder said
> "We can have alternative design by mailboxes, you strart all of them thet communicate through mailbox files" (2026-10-16, on F-30)

## The design
1. **No new powers.** Managers do not get the Agent tool (F-30's precondition A falls away). The chief of staff stays the only process that starts agents, and becomes a mechanical dispatcher, not a chooser.
2. **One mailbox per role:** `company/ops/mailboxes/<role>/` (main checkout, uncommitted spool like `company/ops/slots/`). Each message is its own file, created with O_EXCL (`<ts>-<from>-<key>.md`), so parallel writers never collide. Front matter: from, to, kind (dispatch-request | report | question | answer), lane, project tag, budget, done-when, stop-if.
3. **Managers decide; the dispatcher executes.** A manager writes a `dispatch-request` to the `dispatcher` mailbox. Each turn, and on every agent report, the chief of staff drains it: `node tools/mailbox.mjs drain dispatcher` → for each request, `dispatch-check --source=mail:<id>` → start the agent with the message as its brief → mark the message claimed. No manager round, no re-choosing.
4. **Workers report to the requester:** the agent's report goes to the requesting manager's mailbox as well as to the chief of staff. When a manager's mailbox has unread reports, the manager is started for a short "read inbox, decide next" turn.
5. **Lanes and independence are enforced by the tool:** a manager may request only roles in its own lane (poc-map.md); only lane 10 requests checkers; nobody requests release-manager publish or any deploy path. `mailbox.mjs` refuses out-of-lane requests, and dispatch-check refuses them again.
6. **Single writer kept:** managers and workers never write board.json, progress.md, events.jsonl or founder-inbox.json. The drain writes the dispatch/report events from the messages.
7. **Caps unchanged:** every drained request takes a slot (the slot ledger is live).

## Pilot
One lesson-building lane for 3 days (the founder picks: physics/Wave J or Life Hacks). Measures: lessons published per day, time from request to start, out-of-lane refusals (target 0 reached), cap breaches (target 0), cost per published lesson. Stop on any cap breach, out-of-lane dispatch or deploy-path touch.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| The chief of staff is still a single process every dispatch passes through. | chief-of-staff | Answered in part: the step is mechanical (drain → check → start), with no choosing; it can later be a scheduled loop. |
| An idle mailbox needs someone to notice it. | chief-of-staff | Open: the drain runs on every report and every turn; `company status` shows unread counts per mailbox. |
| Mailbox files are a second record next to the event log. | chief-of-staff | Open: messages are spool (uncommitted, like slots); the event log stays the record; the drain copies each message id into its event. |
