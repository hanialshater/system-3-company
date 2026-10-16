# Operational readiness: slot ledger and dispatch-check S1-S4 (W-1196, W-1173)

```
change: dispatch-check claims an O_EXCL slot per in-flight agent (role, lane, source, chooser) and adds rules S1 (source), S2 (role / general-purpose), S3 (slot count as a third cap count), S4 (checkers through lane 10, off until F-28); S-rule failures are warnings unless S3_SLOTS=enforce
change-tier: 1
paths: tools/lib/slots.mjs, tools/dispatch-check.mjs, tests/dispatch/slots.test.mjs, company/ops/slots/README.md, .gitignore, company/ops/changelog.md
author: tools-lead
self-check: tools-lead
board: W-1196, W-1173
risks: none added; proposes nothing closed until enforce mode has run one round (see 7)
links: batch company/ops/dispatch-requests/2026-10-16-r2-tools.md#B2; retro company/rituals/records/2026-10-16-retro-delegation.md (H1, H2, C2); founder caps company/decisions/2026-10-16-founder-agent-cap-14.md; branch tools-ledger
checked by: evaluation-steward (lane 10; dispatch-check is gate-adjacent). Not yet checked.
```

Why tier 1, not 2: `tools/dispatch-check.mjs` is not a protected path and no rule in paths.json names it (default tier 1). It is not deploy, the event API, auth or learner data. It is gate-adjacent, so the batch names a lane-10 checker, and enforce mode waits for the chief of staff's written date (below).

## What it does
- `tools/lib/slots.mjs` (library and CLI `list | release <id> | prune`). A slot is `company/ops/slots/<id>.json`, created with `openSync(..., "wx")`, the same O_EXCL pattern as `tools/claim.mjs`. The id is the `--agent` label if given, else `<role>--<source>`, slugged.
- Lane and chooser come from the source, not from the caller. For a batch item, they come from the batch header's `lane:` and `poc:` lines, and the item's `role:` must equal `--role`. A standing order uses the batch file that issued it. `§4:` gives lane 19 and the chooser chief-of-staff. A `--chooser` that disagrees with the source is an S1 failure, so the CoS cannot write in a chooser the disk does not support.
- When `--role` is given and nothing refuses, dispatch-check claims the slot. In warn mode, a slot with no source is still claimed with `source: "none"`, so the gap shows in the ledger. `--no-claim` is for a dry check.
- Release: a later `report` or `stopped` event with the same `agent` label releases the slot. If the slot has no label, a report from the same role whose summary names the same batch item releases it. The CoS writes summaries as `batch=…r2-tools.md#B2`, and the matcher accepts that short form. A slot older than 6 h is STALE: it is reported, not counted and not deleted, the same 6 h rule as the event-log count.
- S3 count: C1/C2 still use max(event log, `--running`) and fail as before, whatever the mode. When the live slot count alone puts a dispatch over 14 agents or 3 builders, that is S3, and S3 follows the mode. Taking an id held by a live slot is also S3.
- S4 is built and tested but **off**. `--s4` or `S3_SLOTS_S4=on` turns it on. The checker roles are read from poc-map.md row 10, without its POC, with a hard-coded fallback.

## Switch-over (the batch's objection, carried here)
Default `S3_SLOTS=warn`. Today the CoS calls dispatch-check without `--role/--source`, so in warn mode every call prints three S1 warnings and "no slot claimed". That is the point: the gap is visible from the first call, and nothing is refused. **Enforce starts only when the chief of staff writes a switch-over date** (under `## Dispatched` in the r2-tools batch, or in its progress entry). After that, either export `S3_SLOTS=enforce` in the loop's command, or a one-line change of the default in dispatch-check (tools-lead, tier 1, after the date). I will not change the default before that date is on disk. **Status: open.**

### Proposed line for company/ops/chief-of-staff-checklist.md (the CoS writes the checklist; I do not)
Under "Dispatch only from a batch item" (item 3 of the dispatch section):
> Run `node tools/dispatch-check.mjs --kind=<kind> --role=<subagent_type> --source="batch=<file>#B<n>" --running=<n> --builders=<n> [--agent="<label>"]` before each Agent call (`SO-<lane>-<n>` or `§4:<reason>` in place of `batch=`). Use the same `--agent` label as the Agent call's description. It claims the slot. Any `S1`–`S3` warning is a dispatch you would have to defend at the WBR. From <switch-over date>, `S3_SLOTS=enforce`.

Also for the CoS: item 16 of the same checklist still says "At most 8 agents at once". The founder raised the cap to 14 (2026-10-16-founder-agent-cap-14.md).

## Open questions for the checker (evaluation-steward)
1. **S4 and rituals.** With S4 on, a checker dispatched as a ritual participant (`§4:ritual: launch review`) is refused, because §4 is not a lane-10 batch. The batch item says "source not a lane-10 batch or SO → refuse", and I built it as written. If launch-review participants should pass, the fix is one condition. That is your call under F-28.
2. **S2 for `§4:integration`.** Only that reason allows `general-purpose`. The other §4 reasons (ritual, emergency, resume, manager run) name real roles, so they are refused.
3. **Lane membership** (role not listed in the batch's lane) is a warning only, because poc-map.md is prose. Lane 1 lists strand managers as "the CM's strand managers", not by id, so a hard rule would refuse legitimate items.

## The check
1. **What can fail.** (a) A false refusal in enforce mode blocks a legitimate dispatch at a bad moment. Mitigation: warn by default, and enforce only after the CoS's date. (b) Slots leak when the Agent call never happens after a passing check, or when the report event has no label or batch ref. They go STALE after 6 h and stop counting. Until then they count toward the cap, but in warn mode they only warn. (c) A report summary in a form the matcher does not know leaves the slot live until it goes stale. The worst case: in enforce mode, 14 leaked slots refuse every dispatch for up to 6 h. The CoS sees an S3 line naming the slots and can `release`. Only agents see any of this. Learners never do.
2. **How we would know.** dispatch-check's `slots:` info line on every call (live / builders / stale / released). STALE lines name each slot and give its release command. `node tools/lib/slots.mjs list`. There is no HQ meter yet. If one is wanted, it is an HQ item for hq-engineer next round.
3. **How to roll back.** `git revert <sha>`, or `--no-claim` per call, or leave the mode at warn. `rm company/ops/slots/*.json` empties the ledger, which is state only, so no history is lost.
4. **Capacity.** One small JSON file per in-flight agent (14 at most live, under 1 KB each). dispatch-check reads the slot folder, the batch file and poc-map.md. That is small next to what it already reads (rituals, COEs, decisions). Measured on this host: one dispatch-check run takes 2.2 s at load 10 on 4 CPUs. tests/dispatch/slots.test.mjs took 81 s at load about 30 (about 40 dispatch-check runs, plus 8 parallel node processes for the race). The cost is the existing per-run startup, not the ledger. No server, no build.
5. **Security.** No new route, no network. The batch path is resolved and read, never executed. Slot ids are slugged (`[a-z0-9-]`, 90 chars max), so `--agent` cannot write outside the folder.
6. **Data.** Writes only company/ops/slots/*.json (gitignored) with role ids, file paths and labels. No learner data.
7. **Risks.** None added. When enforce has run one round with no false refusal, I will propose to principal-engineer-ops that the H1/H2 finding ("nothing records or checks who chose a dispatch") gets a `reality: in-place` mechanism. Not before.

## Tested (in the worktree, branch tools-ledger)
- `npm run test:dispatch`: 35 pass, 0 fail (15 new in tests/dispatch/slots.test.mjs: S1 to S4, S4 off by default and on with `--s4` and with `S3_SLOTS_S4=on`, 8-process double-claim with exactly one winner, a 7 h stale slot reported and not counted, release by an abbreviated batch ref and by agent label (and `#B21` does not release `#B2`), warn exit 0 vs enforce exit 1). Every test sets its own `S3_SLOTS_DIR` and `S3_EVENTS`.
- The done-when command, run with an empty scratch event log and a scratch slot folder: `OK`, exit 0, one slot `{role: tools-lead, lane: "9", source: batch=…r2-tools.md#B2, chooser: tools-lead, kind: other}`. Against this worktree's copy of the real events.jsonl, the same command fails **C1** (the log shows 14 dispatches with no report in the last 6 h). That is the existing C1 rule reading the log, not B2. It is the W-716 symptom B1 is fixing: reports are not logged, so dispatches look open.
