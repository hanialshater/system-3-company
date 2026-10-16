# Readiness: slot ledger and dispatch-check S1-S4: tier 1 confirmed (W-1196, W-1173)

confirmed-by: principal-engineer-ops · date: 2026-10-16 · change-tier: **1 (confirmed)** · board: W-1196, W-1173, W-1240 (lane-10 check), W-1252 (this run) · risk: none re-scored
record: `company/engineering/readiness/2026-10-16-slot-ledger.md` **on branch tools-ledger at c73ddb9** (worktree /home/user/s3c-tools2). It is not on main. When tools-ledger merges, the chief of staff links this file from that record.

Not my area. The author is tools-lead.

## Decision

**Tier 1, confirmed. No tier-2 approval is needed, and none is given.** The change touches tools/dispatch-check.mjs, tools/lib/slots.mjs, tests/dispatch/slots.test.mjs, .gitignore and company/ files. No rule in company/engineering/readiness/paths.json matches the code paths, so they are the default tier 1; company/** is tier 0. None of the paths is protected. It does not touch deploy, the event API, auth or learner data. It writes only gitignored state files in company/ops/slots/.

**This is not a merge approval.** The merge waits on lane 10's check of the rules (evaluation-steward, W-1240), as the batch says. My confirmation covers only the tier and the operational findings below, which I pass to lane 10 and tools-lead as input, not as conditions.

**Service tier.** I classified dispatch-check (with the ledger once merged) as service `dispatch-control`, **T2, owner tools-lead, status degraded**, in company/engineering/operations/tiers.json. Every production dispatch goes through it, and a false refusal can freeze dispatch for up to 6 h. It is degraded until W-716 is closed, because the in-flight count reads an event log with no dispatch/report events since 2026-10-14. The service tier does not raise the change tier. Turning on enforce is a tier-1 change by the map, and the batch's switch-over rule governs it (below).

## What I checked (detached worktrees of c73ddb9 and of its parent under my scratchpad; temp slot folders and event logs; the real company/ops/slots and events.jsonl were never written)

| Question | Command | Result |
|---|---|---|
| Tests | `npm run test:dispatch` | **35/35** |
| `npm run check` on the branch | `npm run check` | passed, 965 lessons, 6 warnings, none from this change |
| **Warn mode refuses nothing new.** Same exit codes as the parent commit, for the calls the CoS makes today (no `--role`) | 8 cases (`--kind=other`, `--running=3`, `--kind=build --builders=3`, `--kind=check --running=13`) × (empty log, copy of main's events.jsonl), parent vs branch | **identical exit codes in all 8** |
| The batch's done-when call | `--kind=other --role=tools-lead --source="batch=…r2-tools.md#B2" --chooser=tools-lead` | OK, exit 0, slot claimed with lane 9 and chooser tools-lead |
| Same item twice | the same call again | warn-mode S3 "already held", exit 0 |
| Path traversal | `--source="batch=../../../../etc/passwd#B1"`, `--agent="../../x/y"` | S1 warning; slot files are slugged and stay inside the folder |
| Race, enforce mode | 8 parallel claims of one item | **1 exit 0, 7 exit 1, 1 slot file** |
| Cost | one run, parent vs branch, load about 5 | 1.72 s vs 1.81 s |
| **Exception path** | slots folder path is a file | **uncaught ENOTDIR, exit 1, in warn mode** (finding L1) |
| Corrupt slot file | `{garbage` in a slot file | counted as a **live slot with no age**, so it never goes stale (finding L2) |

## Findings (for tools-lead and lane 10; none blocks tier 1)

- **L1. Warn mode is "never refuses on the rules", not "never refuses".** Any exception in slots.mjs (an unreadable folder, a bad batch file read) makes dispatch-check exit 1, and that refuses the dispatch even in warn mode. Wrap the S-block and the claim in try/catch: in warn mode, warn and continue; in enforce mode, fail. Recommended before the switch-over.
- **L2. A corrupt or half-written slot never expires.** `ts` is null, so age is 0. In enforce mode it holds one of the 14 places until someone deletes it by hand. Use the file's mtime for age when the JSON does not parse.
- **L3. Enforce depends on report events.** Until B1's hook is wired and its H1 check passes, slots are released only by hand or by the 6 h staleness rule. A normal day's dispatches would then read as live slots, and S3 would refuse in enforce mode. The chief of staff's switch-over rule in the batch's `## Dispatched` already requires B1 wired, B2 merged and one clean warn round. I endorse it as written, and add one piece of evidence: the switch-over line should give the count of S3 warnings in the warn round and say how many were false.
- **L4 (as designed, noted for lane 10).** In warn mode, a dispatch that fails S1 still claims a slot (`source: none`), so the gap stays visible. A slot leaked that way counts for 6 h. The S3 info line shows this, and it is the intended trade.

## Believed, not checked

- The 6 h staleness window matches how long agents actually run here. I took it from the event-log rule, not from measurement.
- The release matcher works on the chief of staff's real report summaries. It was tested on the abbreviated form only. The warn round is the test.

## Objections raised, and what happened to each

- *The batch's objection (tools-lead): enforce could block a dispatch mid-round.* Still **open**, as the record says. It is answered by warn by default, plus the chief of staff's written switch-over date. L1 and L3 above are additions to the same answer, not a new objection.
- *Mine: an exception path refuses in warn mode (L1).* Passed to tools-lead and lane 10 as a recommendation before the switch-over. Not a tier-1 gate.
- No other objections are on record for this change.
