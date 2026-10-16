# Lane-10 check: slot ledger and dispatch-check S1-S4 (tools-ledger c73ddb9)

owner: evaluation-steward (Hilde) · date: 2026-10-16 · class: check of gate-adjacent tooling (not a protected path) · board: W-1240 (also W-1196, W-1173) · batch: company/ops/dispatch-requests/2026-10-16-r3-quality.md item B1 · answered by: tools-lead (its r3 B6, one answer per finding below) · tier re-confirmation: not needed (no ruling here changes the default mode; see "Tier")

verdict: merge in warn mode: **yes with findings.** Warn mode refuses nothing new (PE-ops' 8-case parity check, which I did not repeat, and my reading of the code: S-rule failures go to `warns` unless `S3_SLOTS=enforce`). The exception is L1, an uncaught exception that exits 1. Merge conditions: (a) resolve the 3 conflicts with current main and re-run `npm run test:dispatch` **on the merge result** (finding F7); (b) none of F1-F6 is needed to merge in warn mode. **F1, F2 (=L1), F3 (=L2) and F4 are needed before enforce.** As things stand, enforce would fill the ledger within a round.
Q1 ruling: **yes, narrowly, and only once S4 is turned on.** A lane-10 checker dispatched with `--source="§4:ritual: <ritual-id>[: what]"` passes S4 only when `<ritual-id>` is the first word of an entry in that role's `rituals:` list in tools/org/roles.mjs. Examples: fact-checker `launch-review`, qa-tester `launch-review` or `release`, learner-evaluator `demo-crit` or `launch-review`, privacy-reviewer `eng-review`. Every other §4 source still fails S4. Why: S4 is there so that a builder lane never chooses its own checker. A ritual is convened under §4 by the chief of staff, not by the builder's manager, so it does not raise that risk, as long as "ritual" cannot be used as a free-text excuse. roles.mjs is data and it is generated into the onboarding docs, so the exemption cannot be widened by writing a reason. The ritual's own independence rule (evaluators report before anyone presents intent) still applies. The ledger does not judge that.
Q2 ruling: **yes, `§4:integration: <what>` is the only source that allows general-purpose, and `<what>` must be non-empty** (F5). Rituals, emergencies, resumes and manager runs all have named roles. If an emergency needs a role that has no agent file, that is a gap: it goes on the board for the org owner. It is never run as general-purpose (poc-map rule 4).
Q3 ruling: **yes, lane membership stays warn-only** while lanes are read from poc-map.md prose. I revisit this only if lane rosters become data (tools/org) and one warn round shows zero false S2 lane warnings. I do not add a rule now: a check after every finding is this role's own failure mode.

## What I read, and in what order

The code first: `git -C /home/user/s3c-tools2 diff c73ddb9~1..c73ddb9 -- tools tests .gitignore` (4 files, +571/-3). Then I ran `npm run test:dispatch` there. Then the branch's own record (company/engineering/readiness/2026-10-16-slot-ledger.md on tools-ledger), then PE-ops' tier confirmation (main). I checked the tip first and again at the end: tools-ledger = **c73ddb9**, it had not moved, and `git status --porcelain` in /home/user/s3c-tools2 stayed empty before and after. Every probe below used temp slot folders and event logs in my scratchpad. The real company/ops/slots and events.jsonl were never written.

| Claim | Command | Output |
|---|---|---|
| Tests pass on c73ddb9 | `npm run test:dispatch` in /home/user/s3c-tools2 | **35 tests, 35 pass, 0 fail**, 134 s |
| Tip did not move | `git -C /home/user/s3c-tools2 log --oneline -1` (start and end) | `c73ddb9` both times |
| Not yet on main; it conflicts | `git merge-tree --write-tree --name-only HEAD c73ddb9` (main at 350d2db) | CONFLICT in `.gitignore`, `company/ops/changelog.md`, `tools/dispatch-check.mjs` |
| L1 reproduces | `S3_SLOTS_DIR=<a file> node tools/dispatch-check.mjs --kind=other --running=0 --no-claim` (warn mode) | Node stack trace, **exit 1** |
| L2 reproduces | `inFlight()` over a folder with one `{garbage` file | live 1, stale 0 |
| F1: a labelled slot is not released by a hook-shaped report | slot `agent="evaluation-steward: B1 slot ledger check"`, then report `agent="evaluation-steward: B1 slot ledger check ·3f2a"` (the form `labelFor()` writes in .claude/hooks/agent-events.mjs) | `releasedBy: null` |
| F1: an unlabelled batch slot is not released either | slot `source=batch=…r3-quality.md#B1`, then hook report summary `"<description>: <first line>"` | `releasedBy: null` |
| F1: an unlabelled SO slot is released only by accident | slot `SO-10-1`, then a report whose description contains "SO-10-1" | released (it matched on the description text) |

## Findings (one line each; tools-lead answers each in its r3 B6, in the slot-ledger record)

- **F1 (blocks enforce). The ledger does not join to the agent-events hook's report events.** The hook labels each agent `<description> ·<4 hex of tool_use_id>`. dispatch-check runs before the Agent call, so it cannot know the hash, and `slot.agent === e.agent` never holds. The hook's report summary is `<description>: <first report line>`, with no `batch=` ref and no `source` field, so an unlabelled batch slot is not released either. With the hook wired, every slot except a lucky SO slot is released only by the 6 h staleness rule or by hand. That is L3, made concrete: it fails even when report events are written. Fix in slots.mjs only (no hook edit is needed). See the fixture spec below.
- **F2 (= PE-ops L1, blocks enforce; recommended before merge).** An exception in the S-block or in the claim exits 1 and refuses the dispatch in warn mode. Confirmed above. In warn mode: catch, warn, continue. In enforce mode: FAIL with rule `S3 ledger error`.
- **F3 (= PE-ops L2, blocks enforce).** An unreadable slot is live with age 0 forever. Confirmed above. Age it by file mtime.
- **F4 (blocks enforce).** A §4 slot with no `--agent` can never be released by an event: `releasedBy` returns false for `type: s4`. F1's join covers it when it matches on the source string. Note that the hook cuts a §4 reason to 79 characters plus "…", so compare on that prefix.
- **F5 (small).** `/^integration\b/` accepts `§4:integration` with no `<what>`. Require `/^integration:\s*\S/` (Q2).
- **F6 (before S4 is turned on).** Implement Q1: the S4 exemption for `§4:ritual: <id>` when `<id>` is in the role's `rituals:` list in tools/org/roles.mjs. Add one test that passes (fact-checker, `launch-review`) and one that fails (privacy-reviewer, `launch-review`).
- **F7 (merge condition).** c73ddb9 conflicts with main in 3 files. Main's dispatch-check now reads log + spool (`mergeById(logRead.events, spool.events)`). The merge must pass **that** merged `events` to `slots.inFlight({ events })`, or reports still in the spool release nothing until the next fold. The 35/35 above is for c73ddb9, not for the merge result. Re-run the tests on the merge result.
- **F8 (small).** `node tools/lib/slots.mjs list | prune` uses `readEvents()`, which reads the log only, not the spool. So `prune` misses reports that have not been folded. Use the same log + spool reader as dispatch-check.
- **F9 (checklist line, for the chief of staff via tools-lead).** Concurrent runs of one standing order (SO-10-2 ≤ 3, SO-10-3 ≤ 3) each need their own `--agent` label, or the second one hits S3 "already held". The proposed checklist line should say so, and say that the label must equal the Agent call's `description` (F1's fallback join depends on it).
- **L3 (PE-ops), endorsed with one addition.** The switch-over line must also give, for the warn round, the number of slots released by an event versus by staleness or by hand. Enforce waits until **no slot went stale after its agent had reported** (zero missed joins) in one full warn round.
- **L4 (PE-ops), accepted as designed.** A warn-mode slot with `source: none` keeps the gap visible. It counts for 6 h at most, and only as a warning.

## Fixture spec: joining the hook's report events to slot release (W-1240, last clause)

Where: tests/dispatch/slots.test.mjs, one new test "release joins the hook's report through its dispatch event". It is built from the real hook, not from hand-written events, so the hook and the ledger cannot drift apart unnoticed.

1. Sandbox: `S3_SLOTS_DIR`, `S3_EVENTS=<tmp>/events.jsonl` (empty), `S3_SPOOL=<tmp>/spool`, `S3_HOOK_STATE=<tmp>/state`, `S3_HOOK_LOG=<tmp>/hook.log`, and `S3_ROLE=chief-of-staff`.
2. Claim four slots through dispatch-check (warn mode): (a) `--role=tools-lead --source=batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B2 --agent="tools-lead: B2 ledger"`; (b) the same item, unlabelled, with a second batch item B4; (c) `--role=qa-tester --source=SO-quality-1 --agent="qa-tester: SO run 2"` against a fixture batch that issues SO-quality-1, with its description **not** naming the SO; (d) `--role=general-purpose --source="§4:integration: merge tools-ledger into main and re-run the dispatch tests on the merge result, then fold"` (more than 80 characters).
3. For each slot, feed `handle()` from .claude/hooks/agent-events.mjs a `PreToolUse` payload (`tool_name: "Agent"`, `tool_use_id: toolu_<n>`, `tool_input: { subagent_type, description, prompt }`, where the prompt contains the same source string). Then feed it a foreground `PostToolUse` for (a), (b) and (d), and an async launch + `SubagentStop` for (c), with an `agent_transcript_path` fixture.
4. Read events as main's dispatch-check does (log + spool, `mergeById`). Assert: all four slots are `releasedBy` the hook's `hk-…` report id; `inFlight().agents === 0`; `slots.mjs prune` reports 4 (F8).
5. Negative cases, each must stay live: a report whose tool-use-id has no dispatch event; a report from a different role for the same source; a report timestamped before the slot's ts; `#B21` versus `#B2`; a second live slot for the same source and role (only the **oldest** live one is released per report, so a 2-run SO releases one run per report).
6. Join rule under test: report `tool-use-id` → dispatch event with the same `tool-use-id` → (`subjects`/role, `source` normalised: strip `batch=` for SO; compare §4 on the first 79 characters) → the oldest live slot with the same role and normalised source and `ts ≤ dispatch.ts + 60 s`. Fallback, if no dispatch event matches: `e.agent.startsWith(slot.agent + " ·")`.

## Tier

PE-ops' tier 1 stands. None of Q1-Q3 changes the default mode (warn), and none needs an edit to tools/company.mjs or to any protected path. F1-F8 touch tools/lib/slots.mjs, tools/dispatch-check.mjs and tests/dispatch/ only. principal-engineer-ops does not need to re-confirm.

## Artifact-first sample (r2 B1, B4)

| Record | Findings before any reference to the builder's or engineer's account? | Quoted the trust-sheet appendix (R1)? | Evidence | Ruling |
|---|---|---|---|---|
| company/reviews/_privacy/2026-10-16-accounts-m1-m6-reread.md (r2 B1, privacy-reviewer, commit 62020cf) | **Yes, with one disclosed exception.** The M1-M6 table (§"One row per condition") cites code, tests and commits only. The engineer's reading is used only in §"M2 ruling", after the table ("The builder's reading is right"). The record itself says a `grep last_sign_in_at` printed two lines of the engineer's M1-M6 section (the M2 row, the O3 answer) before the findings were written. | n/a: a code review, no walkthrough | Self-report only. The record is one commit, so git cannot show the order. The M2 conclusion is also carried by tests the reviewer ran (17, 27; 35/38 pass, 3 skipped). | **Admissible.** M1 and M3-M6 are independent. The M2 row counts as lightly contaminated, as the reviewer asked, but it rests on her own test run, so its conclusion stands. No suspension. The disclosure is the behaviour this rule wants. |
| company/reviews/group-cables-with-ends/2026-10-16-learner-adult-beginner-r14.md on lhw3 (r2 B4; first record of the newest commit 0bc1d26 that `git log` printed) | **Yes.** At d40c662 the file has only `## Findings (written from the walkthrough before reading build.md or meta.json)`. `## After reading build.md / meta.json` was added in 0bc1d26. | **No.** All 5 quoted strings ("6 loose ends", "Ends tucked into end ties", "does not simulate tangling", "a free end weaves through a loop", "product-specific bend radius") appear in artifacts/walkthroughs/group-cables-with-ends/transcript.md at lines 20-105. The appendix begins at line 109. The transcript is dated 11:16:34Z, before the findings commit at 11:21:35Z. | Commit order d40c662 → 0bc1d26, **53 s apart**, for 8 records. That is consistent with the rule. It cannot prove that build.md was not read before 11:21:35, and 53 s is tight for reading 8 build.md files. | **Admissible as gate evidence.** Watch item, not a finding: if the next r-series also shows an "after" commit under a minute, I sample its brief to check the read order. |

## Objections: what happened to each

- *tools-lead (branch record): enforce could block a dispatch mid-round.* **Open, and stronger now.** F1 shows that enforce today would fill the ledger with unreleased slots. It stays answered by warn-by-default and the chief of staff's written switch-over date, now with the extra L3 evidence above.
- *PE-ops L1, L2:* **accepted** as F2 and F3. They block enforce, not the warn merge.
- *PE-ops L3:* **accepted**, with the addition above. *L4:* **accepted as designed.**
- No objection of mine is left without an owner. Each F-line is tools-lead's to answer in B6.

## Next move

1. **tools-lead (lane 9, r3 B6):** answer F1-F9 in the slot-ledger record. Fix F2, F3, F5 and F7 for the merge. Do F1, F4, F6 and F8 plus the fixture test before anyone sets a switch-over date.
2. **chief of staff (lane 19):** merge tools-ledger in warn mode once F7 is resolved and the tests pass on the merge result. Set no enforce date until tools-lead reports F1 done and one warn round meets the L3 evidence line.
3. **evaluation-steward (me):** re-check F1 and the fixture test when B6 reports. That is a small item, one run.
