# Slot ledger (runtime state)

owner: tools-lead · code: tools/lib/slots.mjs · rules: tools/dispatch-check.mjs (S1-S4) · board: W-1196 (with W-1173) · readiness: company/engineering/readiness/2026-10-16-slot-ledger.md

One JSON file per in-flight agent, created with O_EXCL by `dispatch-check` when it passes and `--role` is given:
`{ id, role, lane, source, chooser, kind, agent, ts }`. `source` is `batch=<file>#B<n>`, `SO-<lane>-<n>` or `§4:<reason>`.

- The files are gitignored: they are state, not history. The history is the `dispatch` and `report` events in company/ops/events.jsonl.
- A slot is released by a later `report` or `stopped` event for the same agent label (or, when the slot has no label, one whose summary names the same batch item), or by hand: `node tools/lib/slots.mjs release <id>`. `prune` deletes the released files.
- A slot older than 6 h is reported as STALE by `dispatch-check` and `node tools/lib/slots.mjs list`. It is not counted and not deleted: check whether its agent is still running, then release it.
- Never edit a slot file by hand to make a dispatch pass. If the ledger is wrong, release the slot and say why in the progress entry.
