# AMD-010: QA records only from stamped, clean harness runs, naming the build and the recorder (W-783, W-986 C2, W-1202)

status: proposed
number: AMD-010, reserved 2026-10-16 by the evaluation steward in README.md (renamed from `proposed-qa-harness-stamp.md`; AMD-009 is held for tools-lead's ops-signals amendment, r2-tools B5)
date: 2026-10-14 (parts 1-2), 2026-10-16 (part 3)
proposed_by: tools-lead (part 1), evaluation-steward (parts 2-3; part 3 from retro 2026-10-16 C8, owner chief-of-staff-ceo-office)
prepared_by: evaluation-steward
surface: `tools/company.mjs` (`cmdQaRecord`, and for part 3 one line in `launchGates`), optionally `tests/qa/contract.spec.ts`
severable: yes. Parts 1, 2 and 3 can be ratified separately. Part 3 does not need part 1. Part 3's `built from:` uses part 2's build stamp when it exists and says so when it does not.

## Context
W-783 (from the COE reviews of 2026-10-14): a QA or reveal-fit verdict must say which commit of the tool produced it,
so a private or edited copy cannot record a verdict. The unprotected half is done on branch
`worktree-agent-a15ac43c96b0c0ab5`:
- `tools/lib/tool-stamp.mjs` computes `{ head, commit, blobs, modified, clean }` for a set of files with git.
- `tools/reveal-fit.mjs` writes `tool` into its JSON and refuses to run (exit 3) when it differs from HEAD, unless `--allow-modified`.
- `playwright.config.ts` (unprotected) writes `config.metadata.qaStamp` into `qa-report.json` for `tests/qa/**` + itself.
  It only stamps; it does not refuse, because the reader of the report is the gate and the reader is protected.

The stamp alone does not stop anyone: `company qa-record` (protected) records a pass from any `qa-report.json`,
including one written by `playwright test -c <private config>` that carries no stamp.

## Proposed change
In `cmdQaRecord` (`tools/company.mjs`):
1. Read `report.config.metadata.qaStamp`. If it is missing, or `clean !== true`, record nothing and exit 1:
   "qa-record: report has no clean harness stamp (tests/qa/** or playwright.config.ts differ from HEAD, or the run used another config)".
2. Recompute the stamp now (same files) and require `qaStamp.commit` to equal the current commit of `tests/qa` +
   `playwright.config.ts`, so a report from an older harness is not recorded against today's contract.
3. Write `harness commit: <qaStamp.commit> (head <qaStamp.head>)` on the record's header line next to `harness:`.
Optional, in `tests/qa/contract.spec.ts`: a first test that fails when `S3_QA_STAMP` is absent, so a run that bypassed
the config fails loudly instead of producing an unstamped green report.

### Part 2 (added by the evaluation steward, 2026-10-15, W-986 C2): name the server that was tested
The harness stamp says *which judge* ran. It does not say *what it judged*. Since 3b97991 (W-851), QA starts its own
server unless `QA_BASE_URL` is set or `QA_REUSE_SERVER=1`, and those two opt-ins bring back the failure W-851 removed:
a record about another build. The interim manual rule is in `company/qa/computer-use-testing.md` ("QA records from a server QA did not start").
- Ordinary half (tools-lead): `playwright.config.ts` writes `config.metadata.qaTarget = { mode: "started" | "reused" | "external", baseURL, builtFrom }`.
  `mode` is `external` when `QA_BASE_URL` is set and `reused` when `QA_REUSE_SERVER=1` (the run cannot tell whether the port was actually taken, so the opt-in is enough).
  `builtFrom` comes from a build stamp: `npm run build` writes `{ commit, clean }` next to the build output, and the app or the config reads it. That stamp
  also closes the gap for `started` runs, which assume the local build matches the tree.
- Protected half, step 4 of `cmdQaRecord`: write `target: <baseURL> · mode: <mode> · built from: <commit>[ (dirty)] | unknown` on the
  record's header. When `mode` is not `started` and `builtFrom` is missing, mark the record `evidence: exploratory only` and
  leave it out of `meta.evidence.qa`, so that `launchGates` cannot count it.
- prediction: no QA record after ratification names a build other than the one it claims. would_be_wrong_if: a record with
  `mode: started` is later shown to have tested a stale build, which means the build stamp is wrong or is not read.

### Part 3 (added by the evaluation steward, 2026-10-16, W-1202, retro 2026-10-16 C8): name who recorded it
Parts 1 and 2 say which judge ran and what it judged. Neither says **who ran it**. Today `cmdQaRecord` writes
`recorded by: qa-tester (company qa-record)` as a fixed string (tools/company.mjs line 631), whoever runs it. So the
integrator's verify run, a release manager's pre-deploy run, an outside contributor's run and the qa-tester's own run all
produce records that look the same. All of them land in `meta.evidence.qa`, and `launchGates` counts any of them.
Protocol §4 (company/ceo-office/dispatch-requests.md) already says an integration verify run "is not the qa-tester's record
and must not be labelled as one". The tool labels it as one anyway. The audit
`company/reviews/org/2026-10-16-qa-record-authorship-audit.md` counts the 14 commits that touched QA records between
2026-10-14 10:10Z and 2026-10-16 10:10Z. Every record they wrote says `qa-tester`. Git names the qa-tester on none of them.
Only 2 of the 14 can be matched to a qa-tester dispatch, and 7 were integration: the chief of staff's own runs, merges, a
deploy commit and transfers. Of the 217 lessons that `company status` lists as "Ready to publish", 197 have a newest QA
record that is integration (157) or of unknown origin (40).

Proposed steps 5 to 9 of `cmdQaRecord`, plus one line in `launchGates`:
5. **Recorder.** Read `--by=<id>`, else `process.env.GIT_AUTHOR_NAME`. Normalise it to a role id: the value, or its first
   word, must name a file `company/roles/<id>.md`. If `--by` and `GIT_AUTHOR_NAME` are both set and disagree, record nothing
   and exit 1 ("qa-record: --by=<a> but GIT_AUTHOR_NAME=<b>"). If neither gives a role id (unset, `Claude`, a person's name),
   the recorder is `unattributed`.
6. **Header.** Write `recorded by: <recorder> (company qa-record)` in place of the fixed string. Also write
   `report started: <report.stats.startTime>`, so a record made from an old `qa-report.json` shows its age. This is a label, not a refusal.
7. **Built from, written by the tool.** Write `target: <baseURL> · mode: <mode> · built from: <commit>[ (dirty)]` from part 2's
   `qaTarget` and build stamp. If part 2 is not ratified or the stamp is missing, write
   `built from: <git rev-parse HEAD>[ (dirty)] (tree at record time; no build stamp)`. The tool writes this line, and an
   agent may not type it by hand. Today agents type it by hand. Across audit rows 11 to 14 there are three different formats, and one record has no such line at all.
8. **Kind.** If the recorder is `qa-tester`, write `kind: independent` and link the record in `meta.evidence.qa`, as today.
   For any other recorder, `unattributed` included, write `kind: integration (protocol §4; evidence for nothing at a launch gate)`
   to the file `company/reviews/<slug>/<date>-qa-integration.md`, and do **not** link it in `meta.evidence.qa`. Two reasons
   for the separate filename. An integration run can never overwrite a same-day independent record, which is a silent
   overwrite today because both write `<date>-qa.md` (audit, finding F3). And `git log` on `*-qa.md` stays a list of qa-tester work.
   This fails closed: an unattributed run is integration, not independent.
9. **Arguments.** Exit 2 and write nothing on any argument other than `--by=<id>`, `--help` included. On 2026-10-14 the
   qa-tester ran `qa-record --help`. The CLI ignored the flag and wrote 19 records from a stale report on another server
   (company/reviews/qa-official-2026-10-14.md, "Mistake to flag"). That is a broken tool, not a new check.
10. **Gate line** (`launchGates`). An `evidence.qa` entry dated on or after the ratification date counts only if its header
    reads `recorded by: qa-tester` and `kind: independent`. Otherwise it fails with "evidence.qa <file> is not an independent QA record".
    Records dated before ratification are grandfathered, so this part does not unpublish anything and does not reopen any gate.
    This line exists because step 8 alone can be undone by hand-linking an integration record into meta.json.

What part 3 does **not** do. It is attribution, not authentication. A run that sets `--by=qa-tester` falsely is still
labelled independent. The cross-check is the audit: compare a record's `recorded by` with the dispatch events
(`role`, `batch=`) and with the commit author. tools-lead's r2-tools B1 hook makes dispatch events reliable, and C8's
commit-msg warning (tools-lead, ordinary surface) flags author `Claude` on `company/reviews/**`. Together these make a
false label detectable after the fact. The steward re-runs the audit at the first constitutional review after ratification.

- prediction (part 3): in the 7 days after ratification, every new `*-qa.md` has `recorded by:` equal to its commit's
  `%an`, and it is `qa-tester` on all of them. Integration runs appear only as `*-qa-integration.md`, and no `launchGates`
  pass rests on one.
- would_be_wrong_if: (a) a dispatched qa-tester run is labelled `unattributed` because its brief did not set
  GIT_AUTHOR_NAME. That is a dispatch failure, and the fix is the brief (C8), not this rule. If it happens more than twice,
  part 3 is costing more than it buys and the board should look again. (b) The integrator starts passing `--by=qa-tester` to get records
  that count. The audit catches that, and if it does, attribution was never enough and the qa-tester has to sign records (a COE).
- side_by_side: for one cycle, steps 8 and 10 warn instead of acting. Records are labelled and still linked. Count how many
  records would have been integration, and how many of those were a lesson's only QA evidence.

## Claimed benefit
Every QA record names the exact harness that produced it, the build it judged and the role that recorded it. A copy of the
harness cannot produce a record, and a run by the integrator cannot pass for the qa-tester's.

## What it removes
The ability to record QA from an edited or private harness. Local experiments still run; they just cannot be recorded.
Part 3 removes the integrator's (and any non-qa-tester's) ability to file a QA record that counts at a launch gate. It also
removes the silent same-day overwrite of an independent record, and qa-record's habit of treating unknown flags as "go".
The integrator keeps its verify runs. They are recorded and visible. They just do not count as evidence.

## Prediction and test
- prediction: after ratification, every new `company/reviews/<slug>/<date>-qa.md` carries a harness commit equal to the
  last commit touching `tests/qa` at that date; `qa-record` on a report from a dirty harness exits 1.
- would_be_wrong_if: a clean CI run is refused (e.g. a shallow clone gives `commit` as the graft, not the real last
  commit: check `actions/checkout` depth; with depth 1, compare `qaStamp.blobs` to `git ls-tree HEAD` instead of `commit`).
- side_by_side: for one cycle, `qa-record` warns instead of refusing; count reports that would have been refused and why.

## Does it change how the proposer is judged?
Parts 1-2: no. tools-lead does not record QA, and neither does the evaluation steward.
Part 3: not the proposer's (the steward records no QA). But it does change how the **qa-tester, the chief of staff and the
release manager** are judged: their runs stop counting unless the qa-tester made them. None of those three may be the
deciding approver of part 3. Their objections go in the decision section below, and each one gets an answer.

## Rollback
Revert the `cmdQaRecord` hunk; the stamp in `playwright.config.ts` is harmless on its own.
Part 3: revert steps 5 to 10. Records already written keep their labels, which is harmless. `*-qa-integration.md` files stay as history.

## Tests to land with ratification (unprotected, `tests/qa-record/attribution.test.mjs`)
`--by` beats an unset env. `--by` and env that disagree exit 1 and write nothing. `GIT_AUTHOR_NAME=Claude` gives
`unattributed` and an integration file that is not linked. `--help` and unknown flags exit 2 and write nothing. A qa-tester
run links into `evidence.qa`. An integration record hand-linked with a date after ratification fails `launchGates`, while
one dated before ratification passes. A `built from:` line is present in every record, written by the tool.

## Decision (constitutional review board)
