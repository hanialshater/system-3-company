# EXP-009: Meta phase 0, measurement integrity of the run record

owner: chief-of-staff (registered for the founder, 2026-10-20) · build: tools-lead · acceptance and analytics: analytics-steward · registered: 2026-10-20, before any reconciliation was run
context: company/sibling/system3-meta/2026-10-19-vision-and-experiment-roadmap.md ("Roadmap of experiments", phase 0) · company/rituals/records/2026-10-17-wbr.md (A1, A2, A7) · tools/lib/usage.mjs

## Hypothesis

The event log (`company/ops/events.jsonl`) and the ledger (`company/ops/ledger.jsonl`) are the company's record of what ran, what it cost and what the founder asked for. Every later Meta experiment (durable execution, goal contracts, agent warm-up) is judged on cost per accepted outcome and on founder intervention, and both are read from these two files. If they miss runs, tokens or founder messages, those experiments measure the logging, not the mechanism. The 10-17 WBR suggests this is the case: usage stopped at 2026-10-16T15:27Z (A1), founder and publish events are missing (A7), and dispatch counts are unreconciled (the "28 of 97 roles never dispatched" line).

The hypothesis: dispatch and report events are close to complete; usage, founder and publish events are not, and the gaps have a few specific causes that can be named.

## Committed prediction

Window: 2026-10-15T00:00Z to 2026-10-19T23:59Z. Coverage = the share of independently observed occurrences that have a matching record (after `dedupeUsage` for usage).

| Record | Prediction | would_be_wrong_if |
|---|---|---|
| P1. `dispatch` events for agent runs | coverage ≥ 90% | < 80% |
| P2. `report` events for runs that ended | coverage ≥ 85% | < 75% |
| P3. `usage` records (event or ledger), runs before 2026-10-16T15:27Z | coverage ≥ 80% | < 65% |
| P4. `usage` records, runs after 2026-10-16T15:27Z | coverage < 50% | ≥ 70% |
| P5. `founder` events for founder messages | coverage < 30% | ≥ 50% |
| P6. `publish` events for lessons set to published | coverage < 50% after 2026-10-16 | ≥ 75% |
| P7. Causes | ≤ 4 distinct causes explain ≥ 90% of all gaps | more than 4 causes are needed, or ≥ 10% of gaps stay unexplained |

would_be_wrong_if: dispatch coverage < 80%, report coverage < 75%, usage coverage before 10-16T15:27Z < 65% or after it ≥ 70%, founder coverage ≥ 50%, publish coverage after 10-16 ≥ 75%, or more than 4 causes are needed for 90% of the gaps.

If P4 to P6 are wrong (coverage near complete), the WBR's diagnosis was a reading error, and that is a finding too: phase 1 can start on the existing record.

## Design

**Arms.** This is a measurement check, not a treatment comparison. The baseline that is allowed to win is "the record is good enough as it is": if coverage clears the phase-1 bar below, no logging work is done before phase 1.

**The independent list (built without reading events.jsonl or ledger.jsonl):**
- Agent runs: mailbox `launched` and `done` markers where a checkout still has them (they are gitignored spool, so this container has none), `company/ops/dispatch-requests/`, role memory entries (`company/roles/memory/`), review and readiness records that name a run, and commits whose message or trailer names a role run.
- Founder messages: the founder's own words quoted in decision records, progress handoffs and commit messages, with their timestamps.
- Publishes: commits that change a lesson's `meta.json` status to `published`, and `company/ops/releases.json`.

**Matching.** Each independent item is matched to a record by label, source (`mail:<id>`), role and time (±30 min for runs, same message text for founder events). An item with no match is a gap; a record with no independent item is listed separately (it may be a record of something the list missed, or a duplicate).

**Output.** A coverage table per record type and window half, every gap with its cause, and a script under `tools/` that reruns the reconciliation for any window, so it can be repeated after each fix.

**Competing explanations and what each predicts:**
- *Logging is broken* (WBR A1, A7): gaps cluster after a date or in one writer (hooks, the release flow), and fixing that writer closes them.
- *The independent list is incomplete:* records without matches outnumber gaps; coverage looks low only because the list missed occurrences. Check by sampling 10 unmatched records by hand.
- *Not independent enough:* the chief of staff writes both the event log and most of the commits and handoffs the list is built from, so a run the chief of staff forgot appears in neither. This bias can only make coverage look higher. Report it as a limit; it cannot be removed inside this repository.
- *Matching errors:* coverage changes by more than 5 points when the time window is ±10 min vs ±60 min. Report both.

**Phase-1 bar (decides the next experiment):** dispatch, report and usage coverage each ≥ 95% over the last 48 h of a rerun window, and founder events ≥ 90%. Below that, the named causes go to their owners (W-1689 usage, W-1694 founder and publish events) and the reconciliation reruns after their fixes.

**Budget and stop rule.** 200k tokens, tagged `[project:meta-phase0]` (registration: W-2000), hard stop. Stop early once every gap type has a confirmed cause. No change to the event writers, hooks or gates inside this experiment: fixes go to their owners.

**Board.** Build W-1998 (tools-lead), acceptance W-1999 (analytics-steward), project tag W-2000 (portfolio-manager).

**Independence.** tools-lead builds the script and the independent list. analytics-steward writes its acceptance findings on the coverage table and a 10-gap sample before reading tools-lead's notes.

## Result

(not run)

## What changed because of it

(not run)
