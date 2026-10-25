# System 3 Meta: progress log

Meta's own handoffs, newest first (CLAUDE.md "Before you finish": what changed, what you now believe and how sure,
what's next, what's blocked). Until 2026-10-25 Meta's handoffs were written into System 3 Company's
`company/ops/progress.md`; the entries below were copied from it on 2026-10-25 (product/MIGRATION.md, step 1). From
now on Meta writes here; the copies in System 3 Company's log stay there until the records split at the migration.

## 2026-10-25 · vp-meta · B13 final; HQ floors

**Done:**
- **B13 is final** (prototype/bench13/BENCH13.md).
  - Hidden: 88.50% → **91.85%** (+3.35) for **$429.84** ($408.21 for the run, $21.63 for off-boarding), in 241 minutes. The run stopped by its plateau rule.
  - Predictions: 5 right, 4 wrong. The wrong ones are throughput, the gain target, and the fallible member being noticed.
  - The biggest gain went against the knowledge base: m-planner modelled EXPLAIN QUERY PLAN, which four B12 members had recorded as a dead end, and it generalised to hidden (about a third of the gain).
  - The referee guards only the visible set: 17 hidden files regressed while main never fell on the visible set.
  - The knowledge base now holds 245 entries in 53 topics. Two came from the final scoring: the EQP finding, which overturns the dead end, and the visible-referee pitfall.
- Meta's B13 budget line and its B-SCALE milestone (partly) are updated.
- **HQ floors:**
  - the org contract gains optional seating fields;
  - System 3 Company's adapter seats 97 roles on 7 named floors;
  - floor tabs with headcounts, a lift and stairs, and walking between floors.

**Belief:**
- High: at 8 members near the ceiling, headcount does not buy throughput; one exploratory bet did.
- High: a visible-only referee leaks hidden regressions.

**Next:**
- A guard-slice referee, with B13's start rerun.
- Fewer members and an exploration budget.
- Migration steps 2-4 once the founder provides the repositories and Vercel access.

**Blocked:** the repositories and Vercel access (the founder).

## 2026-10-25 · vp-meta · Migration step 1 done; HQ dashboards; B13 near its end

Founder: "go ahead with step 1"; "system 3 co need restructuring … different content type, multi level/priority/budget based execution"; "we also need dashboards in hq meta (eg token budget, mission, big milestones)"; no V arm for B13.

**Done:**
- **The export is complete and clean.** It now includes the HQ, Meta's own records, the knowledge base, the product docs, research write-ups, CI and a Vercel config. A clean export passes 359/359 tests with no path into System 3 Company.
- **Meta has its own catalog and records:** `catalog/roles.json` (the 11 generic roles), `org/org.json`, `company.json`, `milestones.json` and this log.
- **Two new generic tools:** `orgfile.mjs` and `dashboard.mjs`.
- **The HQ has a Dashboard page** (mission, budget lines, spend over time and by member, milestones) and city totals.
- **The HQ builds as a static site** with `hq/build.mjs`.
- **System 3 Company's restructuring** is on its board as W-2002, owned by its org-health head. MIGRATION.md §4 maps the ask onto kernel features.
- Tests: 370/370.

**Belief:**
- High: Meta can be pushed to its own repository as soon as one exists.
- Medium: the static build is enough for the city HQ until companies need live data. Live data needs a server or a scheduled build.

**Next:**
- B13's end: final scoring, off-boarding, BENCH13.md. Check whether m-planner's 12:43 EXPLAIN QUERY PLAN land holds on the hidden set.
- Steps 2-4 of MIGRATION.md.
- Fold the sandbox out of `bench8/`.

**Blocked:** the repositories and Vercel access (the founder).

## 2026-10-25 · chief-of-staff (for System 3 Meta, as vp-meta) · B13 running; the starter HQ, crew sessions, meetings and onboarding as code

Founder: "need to go do b13, write code for other features, when you need new repos for migration I will provide them later"; B13 approved at about $500.

**Done:**
- **B13 launched** at 09:50 UTC (bench13/B13.md, predictions B13-1 to B13-9 committed before the run). Eight members: two Opus, five Sonnet, one Haiku. B13 adds a plateau stop and a planned crash and resume of m-engine. At 10:17 it had 5 lands, none refused, and visible was 0.9271.
- **The starter HQ** (prototype/hq/): a dependency-free server over v1 event logs (/api/city, events, knowledge) and a Linear-like page. The page has a sidebar, Overview, Landings, Board, Notes, Meetings, People and Knowledge. bench2events.mjs shows B11 to B13 live.
- **The crew runner:** `sdkSession({options})` for real members; the company passes its own sandbox and permissions, and the CLI refuses real members without `--sandboxed`. A failed turn emits turn.error, and three in a row make the member idle.
- **Meeting minutes:** `crew minutes` emits a v1 meeting event, which the HQ Meetings page shows.
- **Onboarding as code** (prototype/onboard.mjs): the five starter archetypes, catalog search, proposals with alternatives (by the chief of staff or the org-health head), approval only by the company's owner, and generation (company folder, events, city entry).
- B12's ledger cause corrected: the budget rule stopped the continuation, not idleness.
- Tests: 360/360. product/FEATURES.md is updated.

**Belief:**
- High: the event log is a sufficient contract for the HQ, since the benchmarks render from it with no other source.
- Medium: onboarding's rules (alternative required, owner-only approval, referee owner and HQ developers always) are the right minimum. A first real company will show what is missing.

**Next:**
- B13's end: final scoring, off-boarding, KB rebuild, BENCH13.md.
- HQ extension points for company pages.
- The kernel's meetings.mjs as v1 events.
- Migration once the founder provides the repos.

**Blocked:** the migration repos (the founder will provide them).

## 2026-10-25 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 12: SQLite compatibility by SQLite's own test suite

Founder: "make it grounded in real compatibility test", "Yes go ahead with B12".

**Done:** bench12/BENCH12.md (final). Test material: SQLite 3.53.4's own Tcl suite (from Ubuntu's archive), replayed through the driver: 763 files, 34,868 statements, real SQLite's outputs; 480 hidden files. Both arms from B11 V's engine (57.8% hidden). Hidden mean per test file: **V 86.92% ($145.05, 142 min), O 85.76% ($142.27, 63 min)**. O divided the work by SQLite area on its own (27 lands, none refused, 10 notes); all sessions read the knowledge base; off-boarding added 52 entries (106 in total).

**Belief (medium-high):** at the same budget the autonomous org now matches one strong agent within about a point, and gets there in under half the wall-clock time; the single agent is still slightly better per dollar. **Next:** test the org's speed advantage directly (same wall-clock limit for both, or a budget that does not run out), with the wake-notes fix. **Blocked:** nothing.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 11: SQLite-compatible database in Clojure; off-boarding and a persistent knowledge base

Founder: "go for sqllight", "Clojure, core families"; the org must have autonomy (continuous work, self-landing, roles not limits); "add the persistent knowledge base", "i thought we have agents off boarding"; "make it grounded in real compatibility test".

**Done:** bench11/BENCH11.md (final). Hidden core corpus: V 1.0000 ($145.69), O 0.9998 ($117.91): a tie at the ceiling; the task was too easy. The autonomous org set its own contract, built in parallel, landed 23 times, sent 45 notes and stopped itself when done. Harness bug (org land's stale lock, found by O's m-engine) blocked O's lands for ~50 min; fixed. Off-boarding added: 54 entries with evidence and beliefs in company/sibling/system3-meta/knowledge/ (entries.jsonl, KB.md, README.md).

**B12 groundwork:** SQLite 3.53.4's full source (with its TCL test suite, 1,281 files) from Ubuntu's archive (sqlite.org and GitHub are blocked); tclsh installed; bench12/record.tcl records each test file's SQL.

**Belief (medium-high):** both arrangements saturate a task this size; B12 must be grounded in SQLite's own tests and be larger than one context. **Next:** build B12 (extract and cap the suite's SQL, references from real SQLite, visible/hidden split by test file, a speed component), with on-boarding from the knowledge base. **Blocked:** nothing.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 10: optimising compiler, the full org against one agent

Founder: "Yes go with SQLite first, design B10", "$300 approved, go ahead"; and on reasoning: hold the thesis, iterate the design ("victories happen after many many failures").

**Done** (company/sibling/system3-meta/prototype/bench10, BENCH10.md final):
- v1 (build SQLite) was solved at the start: B9 V's compiler builds SQLite 3.53.4 and passes 170/170 scripts once given headers. v2: make the generated code fast, scored by callgrind instruction counts against gcc -O2 (load-independent), gated by 3,000 hidden SQL scripts, hidden W1-W5, Lua, compile time, determinism.
- Result: by the committed rules **O (the org) 1.256, V 2.0** (V's compiler miscompiles 2 hidden W5 integer-promotion tests); on the count alone **V about 1.05** (near gcc -O2) against O's 1.256. Costs from transcripts: V $110, O $132 (about $45 of it a harness re-run).
- The org's mechanisms worked: 8 kept merges from all 4 workers, a pass one worker built and another extended, stewards in 3 areas, Sonnet workers 35% of credit; an O worker found a bug in the judge (UTF-8 split per pipe chunk) and the architect reinstated a merge the bug had falsely reverted.
- Harness failures fixed during the run (all logged): load-dependent compile-time gate; turn/round costs above assumed rates; restart re-ran cut turns; byte-unsafe output comparison (126 references regenerated); SDK cost unreliable for resumed sessions; practices never credited (every turn cut).

**Belief (medium-high):** a single strong agent with a 1M context goes deeper and faster on one coherent redesign; the org's comparative advantage on this evidence is checking (it caught real defects), not breadth. **Medium:** O's correctness may be conservatism, not design.

**Next (design, needs the founder's go):** B11 org with fewer, longer-lived workers, a held-out correctness check inside the referee, and cut turns that still hand in practices; or the lessons-company test. **Blocked:** nothing.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmarks 9b and 9c: warm forks and the autonomous org

Founder: "Yes keep going" (B9b, then B9c); later: "we did not run the principled org right?" (answer: a lean version only; see BENCH9C.md "What this says").

**Done** (company/sibling/system3-meta/prototype/bench9):
- **B9b, PF** (BENCH9B.md): a scout session, 4 then 3 warm forks with generic temperaments and a findings board. Quiet 0.624 for $60.53, against V 0.529 (re-judged) for $18. Forks held 220-280k context, used the board (23 entries, round-2 plans cite round-1 entries), but went for the same first change, stopped early, and could not measure under four parallel sessions.
- **B9c, AO** (B9C.md, BENCH9C.md): three persistent warm workers, claims, the board, merges kept only if the referee's fast judge says main did not get worse, an arbiter for conflicts (never needed), a coverage map. Quiet 0.637 for $66.54 (true). Every mechanism worked (no collisions, a duplicate avoided through the board, 2 regressions reverted, merges from all 3 workers in all 4 areas); it still lost to V by 20% at 3.7x cost.
- **Deviation:** AO stopped after 2 of 3 rounds: time-capped turns logged $0, so the cap rule would have run round 3 over $70. Fixed in run.mjs (cost estimated from the transcript).
- Board claims (board.mjs), fake judge for dry runs.

**Belief (high):** on a bounded problem that fits one context, with a wall-clock referee on one shared machine, one strong agent beats every multi-agent design we have tried (cold population 0.613, warm forks 0.624, autonomous org 0.637, all at about 0.62 against 0.53). The proportion principle predicted it. **Medium:** the org's mechanisms (claims, board, referee, merge) are sound and are what a long-horizon or too-big-for-one-context task would need.

**Next:** a fair test of the full principled org (stewardship, K38/K39 beliefs on the board, per-worker measurement, possibly a second model family) on work that gives an org a reason: too big for one context or long-running, e.g. a large batch of lessons in the lesson company. Needs the founder's go. **Blocked:** nothing.

## 2026-10-24 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 9 written up; founder principles recorded

Founder: "go after B8", "no native image", "go with K39", then the principles (autonomy, diversity without restriction, full context, shared organised learning, roles and ownership as stewardship, coverage and reach, in proportion).

**Done** (company/sibling/system3-meta):
- **Benchmark 9** (prototype/bench9/BENCH9.md, final): make B8 V's compiler compile fast, three arms one after another at $70 / 240 min. Quiet final: the org S 0.540 ($60.94), one agent V 0.542 ($18.00), the population P 0.613 ($21.26). S and V tied within the judge's ±2%; V at 30% of S's cost. P improved every generation and was cut by time. S's round 2 broke the gate (its timings beat V's) after a 24-minute stage-error stall; K39 then retired three speed rules on that broken round (an attribution flaw).
- **PRINCIPLES.md**: the founder's principles for agent organisations, checked against the Zen of System 3.
- Kernel and harness fixes along the way (pushed): the checked-list split, K38, K39, the tally's V cost, S9 on B8's harness, the fast judge skipping timings after a failed check.

**Belief (medium-high):** when a problem fits one context, one strong agent is the cheapest way to the best result; our multi-agent arms saw a tenth of the context each and were told what to look at.

**Next:** three kernel fixes (a held stage error escalates or retries; a retry re-runs integration; K39 does not score effect rules on gate-failing orders), then B9b (fork population) and B9c (the autonomous org of PRINCIPLES.md), lean, against V's 0.542 at $70. **Blocked:** nothing.

## 2026-10-23 · chief-of-staff (for System 3 Meta, as vp-meta) · Benchmark 8 written up; K38 and K39 built; Benchmark 9 ready to run

Founder: "Go with the C compiler in Clojure", "We need S vs vanilla", "do the comparison after W7 then keep going", "No native image, go after B8", "for learnings lets make them baysian", "Yes go with K39".

**Done** (company/sibling/system3-meta/prototype; 335 tests green):
- **Benchmark 8** (bench8/BENCH8.md, final): one vanilla agent V against the specialized org (S1 stopped at W3; S2 to its cap at W5, then W7 out of competition). Accuracy tied (1,126 of 1,131 hidden at W5; Lua 22 of 22 for both). V cost $86.94 for W1-W7; S2 $81.59 for W1-W5 (2.0× V) and $38.82 for W7 (2.7×). V's compiler compiles about 40% faster (Lua 10.8 s against 14.7 s). S2's one clear win: W5's first hand-in (6 failures against 11). One operator intervention (the W5 change-request deadlock).
- **Kernel:** K38 (Bayesian beliefs per playbook rule), K39 (learning from measured effects: metric lines, effect rules), and a fix for multi-word classes in a stage's checked list (no W3 rule was ever scored before it).
- **Benchmark 9** (bench9/): protocol, predictions v1 and v2 (committed before any arm), judge (fast and full, interleaved sandboxed timing), arms V, P (population) and S (Meta as arm S9 on B8's harness, with K39). Not yet run against the SDK.

**Belief (medium confidence):** on exact-referee build tasks, one strong agent beats our org on cost and time at equal accuracy (B5, B6, B8). The org's mechanisms work; its open questions are learning on recurring work (E2) and diversity on open optimization (B9).

**Next:** B9: setup --baseline, the full judge on the start, fake dry runs of V, P and S, then V → P → S → quiet final scoring (about 14 h, at most about $210). **Blocked:** nothing.

## 2026-10-22 · chief-of-staff (for System 3 Meta, as vp-meta) · M4-M7 integration: M4 and M6 reached, M5 reached in code, M7 built (full cycle deferred)

Founder: "Ultracode I want you to work until M7 is done", then "Keep going until M7 is done", then "we are still developing, if you are done we can move to other tasks before big run". Budget approvals and top-ups went through the queue (M4 A-1..3, M6 A-1..10, ISS-11/12, M7 A-1..5). M4 and M6 acceptance was delegated ("Decide for me").

**Done** (company/sibling/system3-meta; prototype 262 tests, adapters 197 passing, all green):
- **M4** (prototype/M4-RUN.md): 3 real lessons through Meta's 9-stage lesson flow on the company's own tools. Published in the sandbox in 45 min for $9.75. One real fact-check revise. One operator fix for the slug bug, now fixed. Branch `meta/m4-merged`.
- **M5** (K13-K15, inbox-export, ledger-gate): charged spend, budget stops and asks, the founder-inbox export, and the AMD-015 standing approval as data. All 8 refusal classes are tested.
- **M6** (prototype/M6-RUN.md): 10 lessons in two lanes with 3 builders. All published on `meta/m6` for $36.90 ($3.69 a lesson), with 7 real fact-check revises. Budget stops and the founder's top-ups worked live, and charged spend equals the ledger. Missed: lead time, median 51 min against 41.
- **M7** (prototype/M7-STATUS.md): K18-K23 built and reviewed. They cover:
  - the ritual scheduler on rituals-due;
  - several flows per spec;
  - dispatch-check as a launch gate;
  - the event export, board mirror and resumable serve;
  - Demo Crit decisions mapped to orders;
  - the progress handoff.

  A 17-min live slice held and committed 4 overdue rituals on `meta/m7` (digest, WBR, design review, Demo Crit). The founder stopped the 24 h cycle.
- **Sandbox only:** `meta/m4-merged`, `meta/m6` and `meta/m7` are pushed. Nothing is merged to main and nothing is deployed.

**Believe:** Meta can run the company's lesson work end to end on its real gates, at about $3-4 a lesson, with the fact-checker catching real errors (8 of 8 revises were real). Builders in parallel did not raise throughput: check loops are the tail. Confidence: medium. n = 13 lessons, one model, and acceptance was delegated, not the founder's own.

**Next:**
1. The big run: one full 24 h M7 cycle (resume /home/user/meta-runs/m7, or start fresh from `meta/m7`).
2. Before it:
   - keep walkthrough artifacts durable;
   - decide the event units;
   - ratify the plan's restatements.
3. The founder reviews or merges the sandbox branches.

**Blocked:** on the founder: merging `meta/*`, the restatements in plan §M4-§M7, and the 24 h run window.

## 2026-10-21 · chief-of-staff (for System 3 Meta, as vp-meta) · M2 reached, M1 export ready, Benchmarks 4b and 5

Founder: "Go go", then "Yes system 3 meta co".

**Done** (company/sibling/system3-meta/prototype, 82 tests):
- **M2.** `generator.mjs` and `init --spec-file`: companies from JSON specs, validated against invariants (`specs/toy.json`, `research.json`, `sheetco.json`).
- **M1 export.** `export-kernel.mjs` writes a standalone tree; 80/80 tests and a live run pass from it.
  - The repository `hanialshater/system3-meta-co` could not be created: the GitHub integration got a 403 on create.
  - **The founder creates it empty and gives the Claude app access, then I push** (the tree is committed locally in the session scratchpad).
- **Benchmark 4b, like for like.** With company context: 80.7k per order, 79% of live run 3. All four faults were recovered by code, the watchdog live.
- **Benchmark 5, hard.** The team designed the modules, shipped three waves in 24 min, and every hidden test passes. The rework was real:
  - 6 builder→lead asks;
  - the design reopened after the hidden tests exposed a spec mismatch.

  BENCH5.md has the details.
- **Kernel bugs found by these runs, all fixed with tests:**
  - the frozen kernel per run (after I broke a live run by editing meta.mjs);
  - the watchdog's orphan mark was never saved;
  - a crashed judgment launch held its reservation for 30 min;
  - the wait-deadline double launch;
  - reservations ended by the wrong launch;
  - the launcher passed this session's env to agents.

**Believe:** the mechanics are sound and fault recovery is real. Cost is about 80-95k per order with full context. n = 1 per benchmark.

**Next:**
1. Push M1 once the repository exists.
2. Re-run Benchmark 5 on the fixed kernel, to see the empty sessions and the hang gone.
3. M4: a second domain with an external acceptance measure. The founder picks the use case.

**Blocked:** M1's remote, on the founder.
## 2026-10-21 · chief-of-staff (for System 3 Meta, as vp-meta) · M3 reached: the hands-free company (Benchmark 4)

Founder: "update tools.md, then go with Agent SDK for M3, also continue previous tasks, keep going decide for me until we reach a big milestone".

**Built** (company/sibling/system3-meta/prototype, 75 tests):
- **Sessions that wait for their next item** (`room next --wait`). This is the token lever.
- **The company escape list.** `escape add` adds `knownFalse` checks to every text order; it is seeded with the Venus claim.
- **The Agent SDK launcher** (`launcher/`, pinned 0.3.293, decision `decisions/2026-10-21-agent-sdk-launcher.md`).
- **Fault recovery in the supervisor:** the regression gate, the watchdog, `order reopen`, and announcements in briefs.
- **`mail dup`** is now managers-only.
- **TOOLS.md** is current.

**Ran:**
- Benchmark 4 as the M3 exit run (prototype/BENCH4.md, record in live/bench4-record): a 10-order spreadsheet engine with injected faults.
- Results:
  - 10/10 shipped, and every hidden test passes under the changed requirement;
  - 9 sessions, 0 typed commands, 8 min 52 s;
  - 45.3k tokens per order (live run 3: 102.6k), $3.88 in all.
- Faults: crash, corruption and changed requirement were recovered by code. The lost-message fault never fired in the run.

**Believe (sure on the mechanics, n = 1 on cost):**
- M3 is met.
- The cost figure is not like for like: these sessions carry no company CLAUDE.md.
- The task proved too easy with a precise spec: 0 revise loops.

**Next:**
1. A live watchdog test, injected from the tick.
2. A like-for-like cost run.
3. A harder task built on an ambiguous spec.
4. M1 (kernel repo) and M2 (generator).

**Blocked:** nothing.

**Note:** `npm run check` reports 811 errors that predate this work; none are in company/sibling.
## 2026-10-21 · chief-of-staff (for System 3 Meta, as vp-meta's ISS-1/ISS-3) · Benchmark 3: the kickoff ablation

**Done:**
- Benchmark 2's quiz task re-run on the current tools, in two arms: A with the kickoff meeting, B without it.
- Predictions D1-D6 were committed first. Results are in `company/sibling/system3-meta/prototype/BENCH3.md`, the record in `live/bench3-record/`, and the second org evaluation pack in `live/orgeval-2/`.

**Believe (n = 1 per arm, moderately sure):**
- **The kickoff pays.**
  - Half the revise loops: 3 against 6.
  - 13% fewer tokens and 21% less time.
  - Both blind judges preferred A, in both orderings (9 of 12 criteria).
  - Facts are a draw.
- **Orchestration is solved:** 0 typed commands per wake and 3 in all.
- **Cost is not solved.** A used 84% of the current method's tokens. Cost is now sessions × about 65k, because every launch drained one item.

**Next:**
1. Fix the four tool findings listed in BENCH3.md.
2. Batch revise and re-check work into fewer sessions.
3. Add a company escape list. The Venus "thick clouds" claim has escaped three runs running.
4. Then Benchmark 4 (spreadsheet engine with injected faults). Its hidden suite (208 cases) and reference are in the session scratchpad, not yet in the repo.

**Blocked:** nothing.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · The three Benchmark 2 fixes, built and run live (live run 4)

Founder: "go ahead with the 3 fixes".

**Built** (company/sibling/system3-meta/prototype, 60 tests):
- **Decisions become checks:** `meeting decide --rules`, which tighten open and later orders.
- **Giveaway check:** the `distinctAnswers` text check. It flags Benchmark 2's Pluto giveaway and nothing in the baseline pack.
- **No command per wake:** `supervisor.mjs serve`, which streams launches and briefs to a monitor.
- **Gaps found live, also fixed:**
  - `allowedLines`;
  - minutes written as files;
  - `check` rules stated in plain words;
  - one `serve` per state;
  - batch usage by session.

**Live run 4** (LIVE4.md; predictions committed first):
- **The run:** a 3-round quiz plus pack, all shipped in 11.5 minutes, with 11 sessions, 773k tokens and 0 typed commands per wake.
- **Rules:** the kickoff's rules became code checks on every order.
- **Revisions:** one, for two decisions the chair did not carry, one of which no check could express then.
- **Shipped pack:** clean by the code check.
- **Predictions:** L4-1 refuted and L4-4 wrong, both by my own operator errors (a refused set-up, a missing flag, a wrong kill); L4-2 wrong; L4-3 right.

**Belief** (medium):
- The loop now runs on code end to end. What remains is decision quality: carrying every rule. The operator's mistakes now cost more than the tools'.

**Next:**
- A within-round answer check.
- Launch briefs from the file unchanged.
- Re-run the Benchmark 2 task on these tools.

**Blocked:** nothing.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Benchmark 2 (quiz pack): the loop in code, and an honest second result

Founder: "Don't stop".

**Built** (company/sibling/system3-meta/prototype, 54 tests):
- `supervisor.mjs cycle`: usage, watch, launch reservations and briefs written by code. The plan now covers meetings, chairs and delegation.
- `meta.mjs batch`, `check` and `help`, and an adaptive drain cap.
- Text checks gain literal `mustInclude` (it was broken) and `lineMaxWords`.
- A refused command no longer keeps partial changes.
- WBR fixes: revised orders count as misses, and the first window has a start.

**Benchmark 2** (prototype/BENCH2.md; predictions C1-C7 committed before the run):
- **Tokens:** Meta used 70% of the current method's (C1 wrong, not refuted).
- **Wall time:** 1.64× (C3 wrong).
- **Orchestrator actions:** 142% (C2 refuted). The wake is still typed by hand.
- **Bookkeeping by hand:** 0 (C7 right).
- **Facts:** no wrong facts in either pack.
- **Judges:** both blind judges would publish Meta's pack (9 of 12 criteria).
- **Defect shipped:** Meta's PACK integration missed a cross-round giveaway (Pluto); its WBR caught it and opened a fix (ISS-14, ISS-15, not run).

**Belief** (medium, n = 2):
- Meta's quality edge is real and comes from the kickoff.
- Its cost edge holds only when the kickoff's checkable rules become code checks.
- Serial gates cost wall time.

**Next:**
- Decisions → order checks.
- Parallel start after decisions.
- A cycle hook in the harness.
- A code check for cross-round giveaways.

**Blocked:** nothing. `npm run check` errors predate this work and sit outside the sandbox.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Company tools built; Benchmark 1 (story book) against the current method

Founder: "start building these, iteratively and test it … benchmarked against current method. Use writing small story book as a proxy task", with goals (levels, breakdown, RAG, due, why, what, success, roll-up review, board) and rituals with APIs (WBR: page 0, summary, hits and misses, roadmap and goals, leadership asks routed so not everything reaches the CEO).

Built in company/sibling/system3-meta/prototype (46 tests). Each new file listed below is a tool:
- building.mjs: floors and rooms.
- channels.mjs: broadcast with acks.
- tracker.mjs: Linear-like.
- goals.mjs: levels, a contributes-to tree, RAG, auto-red, divergence, code-measured criteria, roll-up review.
- meetings.mjs: private-then-revealed positions, whiteboard, objections, decisions → actions, minutes.
- asks.mjs: routed to the lowest decider.
- rituals.mjs: WBR, goal review, digests.
- specs.mjs: an org as data.
- Text checks as test1.

API.md, ROLES.md and TOOLS.md are updated.

Benchmark 1 (prototype/BENCH1.md; predictions committed before the run): one 5-page picture book per arm.
- **Tokens:** Meta used 38% of the current method's tokens per accepted item (9 sessions against 25).
- **Speed and rework:** Meta was 0.89× the wall time, with 0 revisions against 5.
- **Quality:** both books passed the rubric 6/6. Both blind judges preferred Meta on 10/10 criteria.
- **Wrong:** Meta took 167% of the orchestrator actions. Hand bookkeeping (launched, watch, usage) belongs in code. The current method's WBR hedged its counts rather than misstating them.
- **Tool defects found and fixed in this run:** 5.

Belief (medium, n = 1): the kickoff meeting is what paid. It settled pronouns, tense, names and the refrain before anyone wrote.

Next:
- a `launch` command (launched + usage + watch);
- an adaptive drain cap;
- a book-level UAT read;
- Benchmark 2 on a different proxy task.

Blocked: nothing. `npm run check` fails with 811 errors that predate this work and are outside the sandbox.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · API and role guidelines; manager-onboarding contractor

Founder: contractors' advantage is that they are "custom, less overhead, and disposable", useful in manager onboarding; "put a doc for meta company api docs and role guidelines so we don't lose track".

Added:
- **company/sibling/system3-meta/API.md:** files, concepts, the rules code enforces, every CLI and supervisor command, policy knobs, contractor engagements, event types, the live-round procedure;
- **company/sibling/system3-meta/ROLES.md:** founder, chief of staff, manager (with onboarding), builder, checker, release, supervisor, contractor; does, may not, commands;
- **the `manager-onboarding` contractor template** (contractor.mjs): a disposable research engagement whose brief carries the lane's data from code (report, policy history, open orders, findings, cycles), so a new manager gets a sourced lane brief. Tests 35/35.

Rule kept in both docs: change them in the same commit as the code they describe.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Manager-owned lane policy; contractors

Founder: the manager writes and updates the code for their lane; and "all managers are allowed to hire a one time contractor and decide on how to onboard them". Prototype (company/sibling/system3-meta/prototype, tests 33/33):
- **policy.mjs:** the knobs a lane manager may set (drain cap, later batch, how revisions queue, staffing threshold, a narrower `now` list), validated against an allowlist so a policy cannot touch signers, independence or leases; versioned and pinned per order; a manager cycle records numbers, belief and decision.
- **contractor.mjs** (corrected after the founder's "Contractor is for task that are not in the process, quick prototype, research etc."): any lane manager opens a prototype, research or spike engagement with chosen onboarding; it sits outside the flow (own folder only, no flow work, no signing, no shipping); research needs sourced findings; the manager accepts or rejects; it expires at its timebox; a result enters the product only as an order citing it (`--from-contract`).

Simulator iteration 5 tested the first policy change (revisions as `later`, batch 2): no saving (I5-1 wrong, +3.6% tokens in a quiet lane). Holding pays only if a partner arrives within the hold. So the manager decides from the lane's arrival gaps, and the next candidate needs an engineering change to the allowlist. Nothing in the current company changed.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Meta live run 3: the supervisor as code

Founder: "Yes go ahead" (the supervisor as a script). Built `supervisor.mjs` in company/sibling/system3-meta/prototype, with `state.mjs` shared with meta.mjs; tests 25/25. It does:
- test1, UAT from hidden tests, ship (module only), lease recovery and promotion;
- a launch plan;
- `watch`, which wakes on a state-file change or a timer and exits when an agent session is needed.

Live run 3: 4 orders, 6 agent sessions, all shipped. The supervisor cost 0 tokens, ran code steps in a median 0.5 s, and lifted flow efficiency from 12% to 44% (lead 2-8 min). S2 was wrong: 102.6k per order, because each revision needed its own builder and checker session (~64k each, nothing to drain). Class-level findings closed each revision in one loop. Found and fixed:
- the plan re-requested a launched-but-not-entered session (launch reservations added);
- runTests passed failing tests under a test runner (NODE_TEST_CONTEXT).

Next: cut revision cost (hold revisions as `later` so they share sessions; builder self-check against the class); the remaining manual link is starting agents (only the orchestrating session holds the Agent tool). Nothing in the current company changed.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Meta iteration 4 and live run 2: batching, priority, time

Founder asked about batches vs a mailbox queue, priority flags ("force now or for later"), and time redefined for a fast, parallel company.

**Tools** (company/sibling/system3-meta/prototype; 19/19 tests):
- sessions and `room next` (draining);
- priority now/next/later, with promotion at the due time and limits on who may say `now`;
- `--after` dependencies;
- rituals on progress, event and calendar clocks, counted in cycles;
- `flow metrics` (lead, work, critical path, flow efficiency, cost);
- a wake at lease expiry instead of a sweep;
- in the CLI: `usage add` and `usage correct`.

**Simulator iteration 4** (ITERATIONS.md): draining cut tokens 30%, with flat returns past a cap of 3. `now` gave a 2.2 h p50 at 1.64× the tokens. The progress-clock WBR met 69 times, too often: its stuck rule fires on quiet days.

**Live run 2** (LIVE2.md), 8 orders through 10 builder and checker sessions plus 4 supervisor sessions, all shipped:
- a 3-build drain session cost 37% of three single sessions;
- draining checks cost 14k each against 60k;
- 110.5k per shipped order including the supervisor, against 207k without it in run 1.

M3 was wrong: the `now` order was slowest because it failed its check twice. So checkers should report the class of a defect. Flow efficiency was 12%: waiting comes from batch orchestration. Next: a deterministic supervisor script (wake on message, ~0 tokens) and class-level findings. One recording mistake of mine (usage on the wrong session) was corrected by an appended event.

## 2026-10-21 · chief-of-staff (for System 3 Meta) · Meta live run 1: real agents through the prototype tools

Founder: "Decide for me". I chose a live run before calibration, recorded in company/sibling/system3-meta/prototype/LIVE.md, with predictions committed first. Setup:
- 2 toy tasks;
- 7 fresh subagent runs as builder and checker; this session as manager, release and supervisor;
- state shared across processes through meta.mjs (locked JSON);
- injected faults: duplicate notification, crash, boundary.

Both orders shipped. T2 went round a revise loop on real Unicode defects that the hidden UAT tests would have missed. 0 failed CLI calls by agents. Usage was recorded from the harness for 7/7 agent runs (413,587 tokens). Tool defects found and fixed:
- `--as` usable outside consult;
- refusals not persisted;
- no `room abandon`.

Biggest learning: about 50k of each 55-64k run is fixed start-up cost, so run count drives cost. Also: the supervisor's own tokens are unmeasured, and the recovery sweep polls in code. Next: wake on lease expiry; supervisor usage; simulator iteration 4 with fixed per-run cost (batching). Nothing in the current company changed.

## 2026-10-20 · chief-of-staff (for System 3 Meta) · Meta prototype: tools, toy org, simulator, three iterations

Founder: "experiment with these tools create a toy org, simulate building and observe and iterate on performance. This is meta company, current company is not affected". Built in company/sibling/system3-meta/prototype/ (plain Node, no dependencies; nothing in the company imports it; no company tool, gate or data changed):
- tools: lib.mjs (engine with flows/orders/approvals, mailbox, rooms, org, rituals);
- toy org: toy.mjs;
- simulator: sim.mjs and run.mjs;
- tests: tests/tools.test.mjs, 12/12.

Predictions were committed before each run (PREDICTIONS.md, ITERATIONS.md). Iteration 1, engine vs a model of the current design: tokens/item 61%, lead p50 51%, founder interactions/item 15%; 0 duplicates, 0 violations, every crash recovered within one lease. Serial dispatch is the biggest single cost. P8 (checker bottleneck) was wrong: founder approval waits were the bottleneck. Iteration 2: the measurement fix closes the gap to 0%; 5 sittings; a staffing threshold that fires. Together: p50 3.6 h vs 10.0 h for the current design. Iteration 3: code-first test1 cut escaped defects 38% but not rework (I3-1 wrong): catching sooner still rebuilds. Two tool bugs found by the simulator and fixed with tests. Confidence: high in the tools' invariants under faults; low in the absolute numbers (assumed parameters, simulated workers; see "Limits" in ITERATIONS.md). Next: calibrate with EXP-009/pilot data; iteration 4 (builder runs the lint before leave); a live 2-3 agent run.

## 2026-10-16 (late morning): chief-of-staff — System 3 Meta brief; marketing packet in
- **Changed:** company/sibling/system3-meta/founder-brief.md (founder's mission and onboarding context for the System 3 Meta VP: generate whole companies per use case; higher-risk companies with real infra; usable by others; model/vendor choice; humans and tools as members; what this company proves and where it is thin; constraints; 8 open questions; reading list). Linked from the 10-16 sibling decision. Still parked until after First Light; Leonie designs, founder approves (W-1182).
- **vp-marketing (2ee1428):** F-23 domain shortlist (pick Guess First, guessfirst.app/.com; **no price or availability verified**, proxy blocked every lookup) and the F-17/F-18/F-20 ads packet (stage 1 house cards only, $0 revenue, ~1.9M tokens cost). Follow-ups W-1193/W-1194.
- **Life Hacks W3:** W-1192 to cm-lifehacks (PE-ops approval of the readiness addendum before merge; review tip 5d9de52 whole).
- **Believe (medium):** the Meta brief captures the founder's intent; the claim "generate a company" rests on one company and one model, recorded as an objection.
- **Running:** Leonie retro, backend M1–M6, rome v4 + flips, cultural review.
- **Blocked on founder:** see digest list; plus F-17/18/20 replies and permission to run the domain price quote.
