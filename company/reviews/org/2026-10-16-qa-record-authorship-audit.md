# QA-record authorship audit, 48 hours to 2026-10-16 ~10:10Z (retro 2026-10-16 C8, W-1202)

date: 2026-10-16 · auditor: evaluation-steward · batch: company/ops/dispatch-requests/2026-10-16-r2-quality.md#B6 · checked by: chief-of-staff-ceo-office (numbers against the retro's lane table)
amendment this supports: company/constitution/amendments/AMD-010-qa-harness-stamp.md, part 3

## Question
For each commit in the window that touched a QA record: who actually ran the QA that the record describes? Was it the
qa-tester (independent), an integrator, builder or release run (integration), or can the disk not tell (unknown)?

## Window and method
- **Window:** 2026-10-14 10:10Z to 2026-10-16 10:10Z. This is the 48 hours the batch measured: 14 commits, 13 by `Claude`,
  1 by `principal-engineer`, 0 by `qa-tester`. The same command re-run at 10:48Z gives 12, because rows 1-2 have aged out.
  They are kept here so the count matches the batch.
  `git log --since='2026-10-14T10:10:00Z' --until='2026-10-16T10:10:00Z' --format='%h %an %s' -- 'company/reviews/*qa*'`.
  The pathspec also matches QA summary files, which is why rows 5 and 9 are in the list.
- **Records per commit:** `git diff --name-status <first parent> <commit> -- company/reviews/`, filtered to `*-qa.md`. For
  merges this shows what the merge brought in, and the content's real origin is `git log -1 -- <file>` on the merged side.
- **Dispatch match:** events.jsonl `dispatch`/`report`/`usage` events whose role is qa-tester and whose run brackets the
  commit time. The ledger.jsonl `role: qa-tester` rows agree. Where the log is silent I used testimony. Every such row says
  so, and testimony is never the only basis for an `independent` ruling.
- **Still gate evidence:** whether the file is the newest entry in the lesson's current `meta.evidence.qa`, and the lesson's
  status today. Script: scratch, re-runnable from the commands above.
- **Rulings:** *independent* = a logged qa-tester dispatch brackets the commit. *integration* = the disk shows a
  non-qa-tester ran or carried it (chief of staff, a merge, a builder, a deploy or transfer commit). *unknown* = no logged
  dispatch and no positive evidence either way.

## Per-commit table (all 14)
| # | Commit (UTC) | %an | QA record files | What the disk says | Dispatch matched | Ruling | Newest gate evidence today (draft/review · published) |
|---|---|---|---|---|---|---|---|
| 1 | 1d12caa 10-14 10:13 | Claude | 10 (5 A, 5 M) | "QA build 4: 174/174 pass; records filed" | **qa-tester ·4854** (dispatch 09:53:39Z, last usage 10:13:37Z, commit 18 s later) | **independent** (medium: the committer is unnamed) | 3 · 7 |
| 2 | 68e4fde 10-14 10:19 | principal-engineer | 10 M | An EDD-004 addendum commit. Its QA hunks replace builder-written records ("recorded by: demo-builder (local run, QA_PORT 3471…)") with qa-record output. The 10 records belong to session 2's PR #3 "final QA" run, which was still going (5158898 "WIP… final QA records", 10:21Z). Sweep pattern (retro H5). | none in session 1. Session 2 runs are not in events.jsonl | **unknown** | 3 · 7 |
| 3 | 146acc3 10-14 11:54 (merge) | Claude | 200 A | Merge of PR #2 (codex/lifehacks-200 @ 71e99fe, author Hani M.M. Al-Shater). The records were written by the outside contributor's own `qa-record` runs, and say `qa-tester` only because the string is hardcoded | general-purpose "Femi integrates PR #2" ·6410 (integrator) | **integration** | 0 · 0 (all superseded by row 7) |
| 4 | bb9e013 10-14 12:10 | Claude | 200 R100 | Moves row 3's records to `company/reviews/lifehacks-200/contributor/`. None is linked in any meta.json today | ·6410 (integrator) | **integration** | 0 · 0 |
| 5 | ba58560 10-14 12:15 | Claude | 0 (`ncm-batch1-final-qa-2026-10-14.md`, a summary) | Session 2's transfer 1/5, committed by the chief of staff | none (transfer) | **integration** (no record) | n/a |
| 6 | 06a8240 10-14 12:41 (merge) | Claude | 17 | Merge of PR #3. Where the content came from, on the merged side: 68e4fde ×10 (row 2), 4517323 ×5 (a head-of-product scope-decision commit at 09:31Z that carried QA records, another sweep), df9c2f0 ×1 and 72e9520 ×1 (**builder build commits**: the builder ran qa-record on its own lesson) | "Femi merges PR #3" ·f8a1 (integrator) | **integration** (merge). Underlying: 15 unknown, 2 integration (builder self-QA) | 3 · 13 (the 3 are row 2's; published: 68e4fde 7, 4517323 5, 72e9520 1) |
| 7 | de22974 10-14 13:14 | Claude | 200 A | Chief of staff, note 13:14:58Z: "In the first run, 399 of 400 tests passed… **I re-ran the phone test once** and it passed. Each lesson now has a QA record". Note 12:38:01Z: "Build 7 is up… the browser QA check is now running". No qa-tester dispatch 12:00-13:15Z | none | **integration** (high) | **167** · 0 |
| 8 | f4537d7 10-14 14:27 | Claude | 24 A | The `[deploy]` release commit. Chief of staff, note 14:27:33Z: "my part… a 5-minute release build, 7 minutes of QA, then the commit" | none | **integration** (high) | 17 · 6 |
| 9 | 32791f6 10-14 18:27 | Claude | 0 (`qa-official-2026-10-14.md`, a summary) | Subject says "QA records filed". The qa-tester's own summary says the opposite: "Not done: qa-record for any batch (shell was blocked…)". Committed 42 s after the qa-tester's report | qa-tester ·2b27 wrote the summary; the integrator committed it | **integration** (commit; no record) | n/a |
| 10 | 235ba5e 10-14 18:39 | Claude | 66 A | "Official QA batch c… 132/132; QA records filed" | **qa-tester ·2b27** (dispatch 18:07:04Z, resumed, last usage 18:39:00Z, commit 33 s later) | **independent** (medium: the committer is unnamed) | 32 · 0 |
| 11 | 5eb4c2e 10-15 12:29 | Claude | 41 A | "r7 contract run on production build, 41 publish candidates (1930/1930 passed)". 1930 is the full suite, which is a release run, and the release manager prepared r7 at 12:37Z (COE 2026-10-15). No `target`/`built from` line | none (event log dark 10-15 09:03Z to 10-16 09:57Z) | **unknown** (leans integration) | 1 · 37 |
| 12 | 87732ed 10-15 21:57 | Claude | 22 A | W-1081 (board owner qa-tester). Hand-typed `target: … built from: f1832fab…` plus an exploratory note (W-598) | none (log dark) | **unknown** (leans independent) | 16 · 0 |
| 13 | dd048fe 10-16 09:35 | Claude | 17 A | W-1113/W-1081 (board owner qa-tester). Hand-typed `built from: c2923c9 (HEAD at run time)` | none (log dark) | **unknown** (leans independent) | 17 · 0 |
| 14 | cc2584e 10-16 09:48 | Claude | 11 A | History round-1 batch run 1 (role qa-tester). Hand-typed `built from: 59df55e (HEAD at run; worktree /home/user/s3c-qa2…)` | none (log dark; the CoS logged runs 2, 4 and 5 of that batch, not run 1) | **unknown** (leans independent) | 8 · 3 |

**Totals: 14 commits.** independent 2 (rows 1, 10) · integration 7 (rows 3-9, two of them with no record) · unknown 5 (rows 2, 11-14).
Every QA record in the window says `recorded by: qa-tester (company qa-record)`, including the outside contributor's 200,
the chief of staff's 224 and the builders' own runs. Git names the qa-tester on none of them.

**By lesson** (the newest `evidence.qa` entry, among records from this window): 330 lessons. 42 rest on an independent
record (35 draft/review, 7 published), 97 on unknown (45 · 52) and 191 on integration (184 · 7).

## Findings
- **F1. The label is a constant.** `cmdQaRecord` writes `recorded by: qa-tester` whoever runs it (tools/company.mjs:631). So the
  label carries no information, and the audit had to rebuild authorship from the event log and notes. Fix: AMD-010 part 3, steps 5-8.
- **F2. Integration runs are carrying launch gates.** `company status` lists 217 lessons as "Ready to publish" today (O1's 216
  plus one). **197 of those 217** have a newest QA record that is not independent: 157 integration (155 from row 7's chief
  of staff run on build 7, 2 from row 8) and 40 unknown. Protocol §4 (company/ceo-office/dispatch-requests.md) already says
  "A verify run on the integrated tree is integration. It is not the qa-tester's record." The gate cannot see the
  difference, so it counts them.
- **F3. Same-day records overwrite silently, and commit subjects say records were filed when they were not.** Every run
  writes `<date>-qa.md`. A later run on the same day replaces the earlier record, and if the text is the same, git shows no
  change at all. Row 9's subject says "QA records filed", but the qa-tester's own summary says qa-record was never run for
  batches a, b and d (22 lessons). Their 10-14 record is whatever an earlier run that day wrote. Fix: AMD-010 step 8
  (separate `-qa-integration.md` filename). The subject is testimony. The record and the summary are the artifacts.
- **F4. `qa-record` treats `--help` as "go".** On 10-14 it wrote 19 records from a stale report (qa-official-2026-10-14.md,
  "Mistake to flag"). The qa-tester deleted them. Fix: AMD-010 step 9.
- **F5. Sweeps put QA records under the wrong author.** Row 2 (principal-engineer) and 4517323 (head-of-product, 09:31Z, just
  before the window) carry QA records that their authors did not produce. They are the newest evidence for 12 published and 3
  review lessons. This is retro H5/C6(a). The guard belongs to tools-lead (r2-tools B3).
- **F6. Builders recorded QA on their own lessons, labelled qa-tester** (df9c2f0, 72e9520, inside row 6). One is the newest
  evidence for a published lesson (`news-comes-from-acquaintances`). The tool cannot tell a builder's run from the
  qa-tester's either.
- **F7. The event log was dark for the 4 most recent rows** (10-15 09:03Z to 10-16 09:57Z, retro H3). Rows 12-14 match board
  items and a batch run owned by the qa-tester, so they are probably independent. "Probably" is not gate evidence, so they are
  ruled unknown. tools-lead's r2-tools B1 (the agent-tool hook writes dispatch events) is what makes the next audit decidable.
- **F8. `built from:` is typed by hand.** Rows 12-14 use three different formats, and row 11 has no such line. W-986 C2 requires
  the line, and only the tool can make it trustworthy (AMD-010 step 7).

## Rulings (the steward's, within authority)
1. **Unknown records stay valid evidence** (batch rule). They are not removed from `evidence.qa`, and I edit no meta.json.
2. **Integration records stay in `evidence.qa` too.** Removing them is a gate change, which belongs to AMD-010 step 10 and is not
   retroactive. But they are what protocol §4 says they are: not the qa-tester's record. **My position for the release manager:**
   a publish pass should not publish a lesson whose only current QA record is integration (the P1 list below) until SO-10-1
   has filed an independent one. This is a recommendation, not a hold. Holds are the chief of staff's file
   (publish-holds.json), and the call belongs to the release manager and head-of-product. It goes to the board.
3. **Re-QA under SO-10-1.** Every draft/review lesson below has a non-independent newest QA record and is a launch-gate input.
   The trigger is SO-10-1 (b) ("a board item… asks for a QA record on a new build of a named lesson"), so the chief of staff
   adds one board item pointing at this file. Order: **P1 before P2**. Within each, one tag per run (≤15 lessons), as SO-10-1
   says. The 11 Life Hacks W3 lessons in B3 (elastic-loop-release, fitted-sheet-corners-nest, group-cables-with-ends,
   jacket-last-first, long-cord-knots-itself, shoes-opposite-ends, sock-pairing-by-pattern, sock-pairs-not-all-combinations,
   socks-use-shoe-space, suitcase-layer-access, tote-balance-sides) are covered by B3's qa-tester records once lhw3 merges,
   so leave them out of SO-10-1. At 229 lessons this is about 15 runs, more than SO-10-1's 9-round life at one run per round.
   I will size the next round's batch on it rather than widen the order silently.
4. **Published lessons (59 with a non-independent newest record):** they are outside SO-10-1's scope (draft/review only), and I
   do not reopen them. They get an independent record at their next change or release run. This list is for the record:
   row 11 ×37, row 2 ×7, 4517323 ×5, row 8 ×6, row 14 ×3, 72e9520 ×1.

### P1: "Ready to publish" today, newest QA record not independent (197)
- **5eb4c2e** (unknown, 1): `economics/patience-wins-the-split`
- **68e4fde** (unknown, 3): `economics/penalty-kick-mix`, `math/agenda-picks-the-winner`, `math/cluster-stops-the-cascade`
- **87732ed** (unknown, 16): `lifehacks/lh-align-price-units`, `lifehacks/lh-big-pack-price`, `lifehacks/lh-billing-rounds-hours`, `lifehacks/lh-count-sheets-not-rolls`, `lifehacks/lh-discount-round-trip`, `lifehacks/lh-fixed-coupon-percent`, `lifehacks/lh-flow-duration-offset`, `lifehacks/lh-lead-time-stock`, `lifehacks/lh-reuse-cost-per-use`, `lifehacks/lh-round-lines-versus-total`, `lifehacks/lh-sequential-discounts`, `lifehacks/lh-ticket-bundle-unused`, `lifehacks/lh-visit-fee-crossover`, `lifehacks/lh-weighted-unit-average`, `lifehacks/project-prefix-filenames`, `lifehacks/work-in-process-limit`
- **cc2584e** (unknown, 7): `history/doubling-stopped-speeding-up`, `history/income-flat-then-sixteenfold`, `history/italy-poorer-in-1800`, `history/lakes-misplaced-east-west`, `history/life-expectancy-gained-late`, `history/more-boys-christened`, `history/wages-bought-more-wheat`
- **dd048fe** (unknown, 13): `lifehacks/folded-shirt-stack-height`, `lifehacks/garment-overlap-hides-face`, `lifehacks/half-size-two-towels`, `lifehacks/humidity-evaporation-gap`, `lifehacks/packing-cube-walls`, `lifehacks/pillowcase-set-kit`, `lifehacks/rebuild-the-procedure`, `lifehacks/rolled-or-folded-volume`, `lifehacks/shelf-front-labels`, `lifehacks/spaced-beats-cram`, `lifehacks/suitcase-rotate-block`, `lifehacks/towel-over-two-bars`, `lifehacks/towel-spread-dries-first`
- **f4537d7** (integration, 2): `physics/bird-on-the-wire`, `physics/metal-feels-colder`
- **de22974** (integration, 155): every Life Hacks lesson in `company status` "Ready to publish" whose newest record is `company/reviews/<slug>/2026-10-14-qa.md` from de22974. That is the de22974 group of 167 draft/review Life Hacks lessons minus the 12 listed under P2. Regenerate the exact list with: for each slug in "Ready to publish", `git log -1 --format=%h -- company/reviews/<slug>/2026-10-14-qa.md` = `de22974` and no newer `evidence.qa` entry.

### P2: draft/review but blocked by another gate, newest QA record not independent (32)
- **cc2584e** (unknown, 1): `history/cholera-fell-with-height`
- **dd048fe** (unknown, 4): `lifehacks/breeze-is-not-extra-surface`, `lifehacks/drying-room-water-load`, `lifehacks/square-bow-stays-tied`, `lifehacks/wet-knit-hang-stretch`
- **de22974** (integration, 12): `lifehacks/cue-needs-a-boundary`, `lifehacks/keep-the-error-feedback`, `lifehacks/lh-duty-cycle-energy`, `lifehacks/lh-fixed-energy-charge`, `lifehacks/lh-pay-for-used-quantity`, `lifehacks/lh-same-energy-new-tariff`, `lifehacks/lh-scale-recipe-portions`, `lifehacks/lh-split-order-fixed-fee`, `lifehacks/lh-standby-days-add-up`, `lifehacks/mail-exact-phrase`, `lifehacks/mail-minus-noise`, `lifehacks/unlock-the-following-work`
- **f4537d7** (integration, 15): `ai/asthma-looks-safe`, `ai/best-of-twenty-on-one-test`, `ai/calibrated-but-unequal-alarms`, `cs/cut-the-busiest-link`, `cs/two-cells-sum-any-range`, `cs/zebra-sorts-before-apple`, `economics/order-of-the-bad-year`, `economics/tax-now-or-tax-later`, `math/more-digits-not-bigger`, `math/two-right-angles-never-meet`, `physics/head-on-is-a-wall`, `probability/more-detail-less-likely`, `probability/one-circle-fewer-introductions`, `probability/small-gap-big-extremes`, `probability/twenty-flips-run-of-five`

## For the checker (chief-of-staff-ceo-office): reconciling with the retro's lane table
The retro (company/rituals/records/2026-10-16-retro-delegation.md, lane 10 row) says "Only 2 qa-tester runs are logged, yet
QA records were written for 3 builds". Here: **2** logged qa-tester dispatches produced records in this window (·4854 → row 1,
·2b27 → row 10). On my reading, the retro's "3 builds" are the post-10-15 production builds f1832fa, c2923c9 and 59df55e
(rows 12-14). Row 11 (r7, 10-15) would make it 4, so either the retro's window starts after 12:29Z on 10-15 or row 11 was
not counted. That is the one number I could not reconcile from the retro text. Please confirm which.

## Objections
- *The rulings lean on the chief of staff's notes (rows 7, 8), which are testimony.* Answered: a note in which the chief of
  staff says it ran the QA itself goes against its own interest, and no qa-tester dispatch covers those times. Both point
  the same way. An `independent` ruling needs a logged dispatch, never testimony alone.
- *Rows 12-14 are probably the qa-tester's. Ruling them unknown sends good work back for re-QA.* Carried: that is the cost of a
  dark log. It falls on 41 lessons (rows 12-14 across P1 and P2), not on all 229, and the re-QA is cheap when it passes. If B1's hook
  lands and the dispatches turn up in another record (session reports), I will re-rule those rows in an addendum to this file.
