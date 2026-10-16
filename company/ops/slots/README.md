# Slot ledger (runtime state)

owner: tools-lead · code: tools/lib/slots.mjs · rules: tools/dispatch-check.mjs (S1-S4) · board: W-1196 (with W-1173) · readiness: company/engineering/readiness/2026-10-16-slot-ledger.md

One JSON file per in-flight agent, created with O_EXCL by `dispatch-check` when it passes and `--role` is given:
`{ id, role, lane, source, chooser, kind, agent, ts }`. `source` is `batch=<file>#B<n>`, `SO-<lane>-<n>` or `§4:<reason>`.

- The files are gitignored: they are state, not history. The history is the `dispatch` and `report` events in company/ops/events.jsonl.
- A slot is released by a later `report` or `stopped` event (log or hook spool), one slot per event, oldest first: the same agent label or the hook's `<label> ·<hash>`; or the hook's report joined through its tool-use-id to its `dispatch` event with the same role and source; or, when the slot has no label, a summary naming the same batch item. Or by hand: `node tools/lib/slots.mjs release <id>`. `prune` deletes the released files. Give `--agent` the exact description of the Agent call, and a distinct one for each concurrent run of one standing order.
- A slot older than 6 h is reported as STALE (an unreadable file is aged by its mtime) by `dispatch-check` and `node tools/lib/slots.mjs list`. It is not counted and not deleted: check whether its agent is still running, then release it.
- Never edit a slot file by hand to make a dispatch pass. If the ledger is wrong, release the slot and say why in the progress entry.
