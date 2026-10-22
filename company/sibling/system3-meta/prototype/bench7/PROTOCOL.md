# Benchmark 7: run protocol (text games, V vs H vs HSI)

owner: vp-meta · date: 2026-10-22 · status: harness built and dry-run, **no arm run yet** (running starts Agent SDK sessions: it waits for the founder's go). **v2 (2026-10-22): the three games are rebuilt hard and noisy, with a mid-run Change Notice and visible tests: see "Benchmark 7 v2" at the end, which takes precedence over the earlier sections where they differ.**

## The question

The founder's direction (2026-10-22): "start with smaller task and make sure we have fast and more accurate harness with self improvement, use complex text game as example".

Benchmark 6 found the many-stage flow slower and costlier than one agent, and no more accurate. Most of Meta's cost was cold starts and reviews between every step.

Benchmark 7 tests the hybrid that answers this:
- the builder evaluates its own work inside a warm dev loop (K26);
- one external evaluation follows at the end (K27);
- a revise goes back to the same warm session;
- in one arm, a playbook learns across games (K28).

## Arms

| Arm | What runs | Spec / runner |
|---|---|---|
| **V** | One vanilla agent per game: a fresh Agent SDK session, resumed only for that game's feedback rounds | `vanilla-game.mjs` |
| **H** | The hybrid: lead delegates → warm builder (self-checks with `meta.mjs check`) → test1 (code: its own tests) → eval (independent evaluator: SPEC.md and code only, sample rate 1.0 in [0.5, 1], no batch: one order per live dir would wait out every hold) → accept (code: the hidden suite) → ship (code). maxLoops 3 | `specs/textgame-hybrid-nolearn.json`, `setup.mjs` |
| **HSI** | H plus the K28 playbook. After each game the lead runs one retro, and code validates its rules. The rules are for the builder: the lead is on the work side, so it never writes the evaluator's pack (only code or the founder could). The store (`<runs>/arm-HSI/playbook-store/`, set at init with `--vars`) persists G1 → G2 → G3. H has no store | `specs/textgame-hybrid.json`, `setup.mjs` |

**Games.** G1 The Lighthouse, G2 The Clockwork Manor, G3 The Sunken Temple (`specs/G1.md`-`G3.md`).
- v2: each spec is about 1,120 lines (about 19,500 tokens): a table of contents, Part A (the engine contract, the same in all three), Part B (the game's world) and Part C (Errata). A Change Notice (Part D) is appended after the first hand-in (v2 section).
- Each arm plays G1, then G2, then G3. Game n+1 starts only after that arm's game n has ended.
- `setup.mjs place` refuses to start out of order. For HSI it also waits until G(n-1)'s run has closed, so the retro is in the store.

**One game, one directory, for every arm.**
- No files and no sessions carry over between games. The access rule enforces it: an arm's session may touch only its own game's directory, so G2 cannot read G1's code (Part A, the engine, is the same in all three games).
- V gets a fresh session per game, the way a person starts a new chat per project.
- H and HSI get a fresh live dir per game, so the warm builder is warm within a game only.
- Only HSI's playbook carries over.

## What every arm gets (fairness)

| | V | H, HSI |
|---|---|---|
| Spec text | the prompt plus `SPEC.md` in its dir | the order's `accept` plus `SPEC.md` in the workdir. The same bytes (`specSha` in the manifest) |
| Visible tests (v2) | `visible-tests/` in its dir | `visible-tests/` in the workdir. The same files (`visibleSha`); test1 and the builder's self-check run them with the builder's own tests |
| Change Notice (v2) | after the first hand-in: Part D appended to `SPEC.md`, its visible tests added, and `NOTICE_POINTER` as the next turn | after the first accept run: the same SPEC.md and visible-tests changes, and `NOTICE_POINTER` as the founder's resume reason (the builder's revise findings) |
| Hidden feedback | `<category>: <f> of <t> tests fail`, one line per failing category, after each post-notice hand-in (the first hand-in's pre-notice score goes back to no one) | the same lines, as the accept stage's revise findings (the kernel puts its one-line label before them) |
| Feedback rounds | at most 3 after the notice turn (the notice turn itself costs none) | at most 3 loops (maxLoops), counted over every stage's revises (test1, eval, accept). The notice's park and resume costs none (the loop it counts is granted back). The 4th revise parks the order (see Stops) |
| Model | the launcher's `--model` default, read from `launch.mjs` (or the same `--model` passed to both) | the launcher's default |
| Tools | Bash, Read, Write, Edit, Glob, Grep; no Agent tool | the same six, named by each role's `tools` in the spec, so the SDK shows only those (no Agent, Task or TodoWrite) |
| Session limits | 200 turns, 60 min a turn, one resume on a crash | builder: maxTurns 200, sessionMin 60; evaluator: 150, 40 |
| Wall clock per game | 600 min (v2; `setup.mjs GAME_MIN`): no round starts after it, a turn ends at it | the same 600 min: the launcher's `--max-min` |
| Settings | `settingSources: []` | `settingSources: ["project"]`, where the project settings are only the access hook `setup.mjs` writes to `<live>/kernel/.claude/settings.json`. The live dirs sit outside any git checkout, so no CLAUDE.md loads |
| Access rule | `setup.mjs accessDecision` with `accessRules(P, "V", game)`, as an in-process PreToolUse hook | the same function with `accessRules(P, arm, game)`, as a command hook (`setup.mjs hook`) |

**The access rule.** Every tool call of every arm is logged to `<runs>/_operator/access.jsonl`, allowed or denied. An arm's own game directory (`<runs>/arm-V/<game>/`, or the live dir `<runs>/arm-<H|HSI>/<game>/`) is open. Around it the whole benchmark area is closed:
- the scratchpad that holds `b7/` (hidden tests, references, runner, this harness) and the runs;
- `<runs>/_operator/` (accept log, observer snapshots and their hidden scores, V's ledger);
- every other arm's folder, and the arm's own earlier games;
- HSI's playbook store (code writes it; the K28 guard root protects it too);
- the repo and its home folder (the benchmark write-up);
- other sessions' transcripts (`~/.claude`, except the session's own project folder).

Anything else (`/usr`, `/tmp`, ...) is open. A call is denied when it reaches the closed area:
- a Read, Write, Edit or file path that resolves into it, by its real path too (a symlink is followed);
- a Glob or Grep whose search root is in it or above it;
- a Bash word that resolves into it. Each word is resolved against the directory the line is in at that point: every `cd` and `pushd` is followed, so `cat ../../../b7/…`, `cd .. && cat …` and `x=..` are caught. A recursive command (`find`, `grep -r`, `cp -r`, `tar`, `ls -R`, ...) over a folder above the closed area is denied;
- a Bash path built at run time (`$VAR/…`, `$(…)`, `` `…` ``), which the hook cannot resolve;
- the input names a hidden-test file (`run-hidden`, `acc.test.mjs`).

A Write or Edit is judged by its path only, so a note that mentions the hidden suite is not denied. The hook cannot see what code an agent writes and runs (a node script that computes a path). Two backstops cover that: the hidden runner's isolation below, and the audit.

**The hidden runner's isolation** (`run-hidden.mjs`). An arm's game.mjs runs inside the test process, so the runner:
- copies the suite (the game's `acc.test.mjs`, `kit.mjs`, `reporter.mjs`; never `ref/` or `engine.mjs`) and the arm's directory (no symlinks, no `node_modules`) to fresh temp dirs, and runs the game on the copy, never on the live workdir;
- runs the test process under Node's permission model (`--permission`): it may read only those two copies, may not write, spawn or use workers, and its env is only `PATH` and `GAME_DIR`;
- reports only the suite's own category names (a row naming anything else is dropped, and a category reported twice counts as a load failure), so a game cannot pass text to the builder through its results.

A game that tampers with its own test process could still fake its score. The observer's and the operator's re-scores of the snapshots are the check on that.

**The audit** (`setup.mjs audit`) gives a verdict that is clean only if all three of these hold:
1. **Hook coverage:** every SDK session of every arm (from `launches.jsonl` and V's ledger) has at least one access-log line. A session the hook never saw is unverified.
2. **Transcripts:** each session's transcript is found (`~/.claude/projects/*/<session>.jsonl`, or `$CLAUDE_CONFIG_DIR`).
3. **Content canaries:** no canary string reaches a session in a tool result. The canaries are strings that only the hidden material holds and no spec contains:
   - the hidden tests' names of 24 characters or more, and the suite's own identifiers;
   - the references' and the shared engine's identifiers, and the prose lines they print (40+ characters, 7+ words).

   A test name the session wrote itself first (its own test of the same name, printed back by `node --test`) is its own, not a leak.

Reported beside the verdict, not part of it:
- **Paths seen:** the harness's own paths (`b7/`, `_operator/`, `run-hidden`, `acc.test.mjs`) in a tool result. A Meta session sees them without reading anything hidden, because its own `state.json` holds the accept command and the accept label names `setup.mjs`. Paths named in a session's own calls are listed as attempts.
- **Shared lines:** lines of 50+ characters, not in the spec, that two arms' final games of the same game share. Cross-arm copying leaves no canary, so the operator reads these.

**Known asymmetries (stated, not fixed):**
- Only H and HSI have an external evaluator. That is the treatment.
- The Meta builder works through the kernel CLI (`meta.mjs`), and its brief is the kernel's.
- The accept stage's findings begin with the kernel's label: the accept command line, which names `setup.mjs` by absolute path. So a Meta builder can learn where the harness lives. The hook denies it everything there.
- **The kernel's own Bash guard (K10)** runs in the Meta sessions and not in V's. It refuses some lines V may run, for example `for f in *.test.mjs; do node --test $f; done` ("a script the guard cannot read"). A Meta agent then has to spell the command out. The cost is a turn, not a capability.
- The Meta evaluator drives the game from a scratch script in `live/<dir>/scratch/` (its own directory). V's scratch files are wherever it puts them inside its game directory or in `/tmp`.

**Deviation from the computed brief.** The brief asked for the order's accept text to carry `acceptance: node <b7>/run-hidden.mjs --game=Gn --dir=<workdir>`. The text instead says that code runs the orderer's hidden suite after the evaluation and that failures come back as category lines. It names no path, for two reasons:
- V's prompt names none.
- A builder that knows the runner's path could run it inside its own loop, which is an oracle V does not have.

The actual command lives only in the order's `acceptCmd`, which an agent session cannot set.

## Budgets and approvals

- **Who places the orders.** Each order is placed `--by=founder --to=lead` by the operator running `setup.mjs place`, acting for the founder at the founder's direction above.
- **No budget approval.** A founder-placed order needs none at any budget (`lib.mjs orderNew`: only an orderer whose level has a limit triggers a budget approval; the founder's has none). The lead's delegate is checked against the manager limit (250k) at its default of 150k, which is a check and not a charge.
- **The cap.** Each order's budget is **60,000,000 cumulative tokens**, a runaway cap rather than a target. For scale, B6's vanilla agent used 17.6M cumulative tokens for three lessons. The kernel's per-order charge also counts a warm session's running total again on each resume (see Kernel caveats).
- **Hitting the cap is a stop**, not a top-up (see Stops).
- **The founder's go.** Running the arms starts Agent SDK sessions, about 15-25 in all. The estimate is $40-70, against B6's $7.19 (V, three lessons) and $16.66 (Meta). That needs the founder's go in conversation. Nothing in this benchmark deploys, pushes or touches System 3 Company's lessons.

## Stops (fixed before the run; the harness applies them, never a judgment)

- **V:** the game ends at a full pass, after 3 feedback rounds, or when a turn fails twice (one resume).
- **V:** a hidden runner that itself errors spends no round and sends nothing to the agent. It is retried twice; a third error ends the game with the error recorded for the operator. (The Meta arms' accept treats it the same way: exit 3, a stage error that spends no loop.)
- **Every arm:** the game's wall clock is 600 min (`GAME_MIN`; 480 before v2). That is V's own most: five hand-ins (the first, the notice turn and three feedback rounds) of a 60-minute turn plus one 60-minute resume each.
- **H, HSI:** the game ends when the order is `done`. If it is **parked at the loop cap**, stopped **at its budget**, or still open when the launcher stops at the **wall clock**, the harness (`setup.mjs run`/`watch`) cancels it as the founder, and the cancel is recorded in `_operator/<arm>-<game>/operator.jsonl`. For HSI, a short second launcher (30 min) then runs the cancelled order's evidence and the lead's retro, so the next game's `place` does not stall.
  - A cancelled order is an ended order. Its evidence and HSI's retro still run; a parked order would not count as ended for K28.
  - The arm's final result is its last version.

## Exact run commands

```sh
B7=/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b7
PROTO=/home/user/system-3-company/company/sibling/system3-meta/prototype
cd "$B7"
ln -sfn "$PROTO/launcher/node_modules" node_modules      # the Agent SDK, for vanilla-game.mjs
node vanilla-game.mjs --dry-run | tail -40                 # prompts, model, tools, deny roots; no session
node check-harness.mjs                                     # the access rule on the review's repros, the runner's isolation; no session

# for each game, G1 then G2 then G3, all three arms in parallel; the next game starts after all three have ended
G=G1
node setup.mjs place --arm=H   --game=$G
node setup.mjs place --arm=HSI --game=$G
node setup.mjs run --arm=H   --game=$G > ../b7-runs/_operator/H-$G/run.json   2>&1 &
node setup.mjs run --arm=HSI --game=$G > ../b7-runs/_operator/HSI-$G/run.json 2>&1 &
node vanilla-game.mjs --games=$G         > ../b7-runs/_operator/V-$G.out      2>&1 &
wait

# after G3
node setup.mjs tally --md                      # the results table
node setup.mjs tally > ../b7-runs/_operator/tally.json
node setup.mjs audit > ../b7-runs/_operator/audit.json
```

- `setup.mjs run` starts `launcher/launch.mjs --live=<runs>/arm-<A>/<G> --setting-sources=project --max-parallel=2 --max-min=600`. It runs the observer beside it every 3 s and applies the stops.
- `setup.mjs run --dry-run` prints that command and runs one observer pass. Its records go to `<runs>/_operator/` (default `<scratchpad>/b7-runs`; `--runs` overrides).
- Operator-only diagnostics, after the run: `node run-hidden.mjs --game=Gn --dir=<snapshot> --debug` names failing tests.

## Measures (per arm, per game; `setup.mjs tally`)

| Measure | V | H, HSI |
|---|---|---|
| **First hand-in pass rate** | the PRE-notice suite's pass/total after the first "done" | the first accept stage run (`accept.jsonl[0]`, phase pre), after test1 and the external eval. Also reported: `firstBuild`, the builder's first hand-in, scored by the observer on its snapshot |
| **After the notice (v2)** | the post-notice suite on the hand-in after the notice turn | the first post-notice accept run |
| **Final pass rate** | the last hidden run (post-notice) | the last accept run (post-notice), or the last observed version if the order stopped after it |
| **Rounds / loops** | feedback rounds used after the notice (0-3) | hidden rounds (post-notice accept runs − 1); `loops`; revises by stage |
| **Cost** | the SDK's estimate. Per session, the latest running total | the same, per SDK session (`dedupCost`); the launcher's naive sum is reported beside it |
| **Wall clock** | game start to game summary | launcher up to launcher summary; also the order's lead time |
| **Sessions; cold starts vs resumes** | 1 session; its feedback rounds are resumes | distinct SDK sessions; launches cold or resumed; warm fallbacks |
| **Self-checks** | n/a | `self-check` events (n, failed) |
| **External eval** | n/a | runs, sampled-out, findings by class vs the hidden suite on the same snapshot (see below) |
| **Playbook (HSI)** | n/a | rules active at start; rules added and retired; refused proposals; code's helped/hurt scores; whether each rule's targets failed in a later game's first hand-in (`ruleTargeting`) |

**Were the external eval's findings real?**
1. The observer snapshots the workdir at every signed stage and scores each snapshot with the hidden suite. Each eval verdict is therefore paired with the hidden result on the version it judged.
2. A finding whose class equals a failing hidden category is **real**.
3. Every other finding is reproduced by the operator against SPEC.md on that snapshot. It is labelled real (a spec defect the suite does not test) or false, before the operator reads the builder's NOTES.md or the evaluator's EVAL.md reasoning.
4. A pass on a version the suite fails is a **false pass**.
5. Hidden categories that failed and that the eval missed are listed as `missed`.

## Kernel caveats found while building this harness (open for a K-fix; none is fixed here)

1. **Resumed sessions are counted again.** The launcher sums each launch's `cost` and `cumulative`. A resumed SDK session's result carries the whole session's running total (sdk.d.ts: "a resumed or forked session continues from the total its transcript saved"), so a warm builder's earlier work is counted again on every resume. This affects `launches.jsonl`'s summary and the per-order budget charges. The tally de-duplicates per SDK session, and the 60M cap allows for it.
2. **A parked order is never "ended" for K28** (`learn.mjs` terminal: done or cancelled). An order stopped at the loop cap therefore yields no evidence and no retro. The harness cancels it (Stops).
3. **Accept findings must be in `<class>: …` form** for K28's classifier. The harness's accept prints `failed: <category>: <f> of <t> tests fail`, so HSI's evidence carries the hidden categories as defect classes. The specs' `failed: (.+)` regex captures the rest.

## Review fixes (2026-10-22, before any run)

A review of the kernel (K26-K28) and this harness found holes; the fixes, each with a regression test in the kernel suites where it is kernel code:
- **K27 sampling** is salted per company (`sampleSalt`, set at init): unsalted, every run's O-1 drew 0.9783 at eval, so a lowered rate skipped the external eval in every later game, predictably. The decision is made once per stage and loop and kept. `self-check-failed` now forces the review when the worker's own last self-check this loop failed, or when it handed in without one.
- **K28 playbook:** rule wording that weakens a check is refused in more forms, and only a prohibition right before the verb excuses a rule. Only an author independent of the work (code, the founder, a reviewer) writes rules for an independent reviewer, and those may only add a check; a work-side author's rule with no roles goes to the work side only. A retro role proposes only during an open retro. The store survives a torn evidence line and refuses to overwrite a corrupt playbook (it keeps `playbook.json.bak`). Writes take a store lock across companies. The guard protects the store even with no spec workspace, and `learn show` does not print its path to an agent. A rule scores "helped" only when a stage that catches its target class judged the order; otherwise it is "unobserved" and scores nothing.
- **Predictions:** PREDICTIONS.md is left as committed. P7-10's rationale names "the batch hold (5 min)", which no longer exists; the prediction and its wrong-if line stand as written.
- **K26:** the launch's own abort (its session limit, `--kill`) before the first turn is no longer a failed resume.
- **Harness:** the access rule resolves relative paths and closes every other arm and game (above); the hidden runner is isolated (above); the eval batch is gone from the B7 specs; the Meta roles name their six tools; the wall clock is the same for every arm and a stop there is handled; V's runner errors spend no round; the audit splits path sightings from content leaks and gained reference canaries; the repo spec names no store path (`vars.playbook_store` is `""`, set at init).

## Dry run (2026-10-22; no Agent SDK session)

The first dry run's output (`b7dry/`) was deleted after the review: its fake games imported the hidden reference by absolute path, beside the runs dir and outside the closed area. A later dry run writes only under `<runs>/` (closed to every arm), and is deleted before the arms run.

`b7dry/drive.mjs` (scratchpad) drove the kernel CLI by hand. Fake game versions wrap the reference, and one breaks `inventory`. It covered:
- placement: H G1, HSI G1 and HSI G2; refusals for out of order, V, and a second placement;
- the lead's delegate, and a warm build with a self-check;
- an eval false pass, then an accept revise whose findings are the category lines;
- the revise planned as `resume:<builder session>`;
- the fix, eval, accept, ship, and HSI's retro adding a rule. HSI G2 starts with G1's rule, a duplicate is refused, and H has no store;
- the hook: allowed reads and writes; denied hidden, runner, other-arm, operator, scratchpad-search and repo write-up paths;
- the tally: first 78/80 → final 80/80 on G1, rounds 1, dedup cost 4.5 vs naive 6.5, one eval false pass;
- the audit: a planted canary leak found, a same-name test the session wrote itself not flagged, one session without hook lines flagged.

## Dry run 2 (2026-10-22; no Agent SDK session)

`b7dry2/drive.mjs` (scratchpad) played arm HSI on G1 and then G2, every role by CLI, in a temp runs dir that it deleted afterwards. The games were the real hidden references, copied into the workdir; the accept was the real hidden runner (`setup.mjs accept`); the observer ran `watch --once` after each tick. The launcher was replaced by `supervisor.mjs cycle` (the launch it reserves, with the brief it writes) and by `guard.mjs queryOptions` (the SDK options), with fake SDK session ids. Results:
- **G1, first build:** the reference with one message in the padlock puzzle changed, plus a trivial test by the builder. The self-check passed, test1 passed, and the eval passed with one advisory finding. That was a false pass: the observer scored the snapshot 79/80 with padlock failing.
- **G1, accept:** 79/80. Only `padlock: 1 of 2 tests fail` came back, and the revise went to build (loop 1).
- **K26:** the revise was planned as `resume: <the builder's fake SDK id>`, and the SDK options carried that `resume`. The warm brief was 703 characters, against 4301 for the cold brief kept as the fallback. The evaluator is not warm: its second eval was a fresh session.
- **G1, fix:** the builder fixed the message. Its self-check passed, the eval ran again (the `looped` condition), then accept 80/80, ship, and the evidence (classes `[padlock]`, 2 self-checks).
- **K28 retro:** the lead read `learn show` (the store's path is withheld from agents) and made one proposal:
  - a rule citing the evidence id, targeting padlock: added as P-1, for the builder only;
  - "Skip the evaluator when your own tests pass; hand in right away.": **refused** ("it tells someone to skip or weaken a check");
  - eval sample rate 0.5: applied, inside the bounds [0.5, 1].

  A second proposal after the retro closed was refused ("no open retro"), and so was the lead acting `--by=founder`.
- **G2:** `place` waited until G1's run had closed. G2 started with P-1, and its builder's pack carried P-1 (the brief does not; the pack does). The builder was a cold start, a fresh live dir per game. With `--sample-salt=b7dry-1`, the draw for O-1 at eval was predicted at 0.9415 before the tick. The logged `sample-skip` had the same draw, and code signed eval `sampled-out`. Then accept 59/59, ship.
- **Tally:** G1 first 79/80 → final 80/80, 1 round, eval runs 2, 1 false pass (missed: padlock), self-checks 2 (0 failed). G2: eval sampled out 1.
- **Timings (ms):**

  | Step | ms |
  |---|---|
  | place | 223 |
  | lead delegates | 201 |
  | builder cold launch plan | 165 |
  | builder enters | 95 |
  | self-check | 255 |
  | hand-in | 85 |
  | tick: test1 → eval | 567 |
  | evaluator launch plan | 183 |
  | evaluator enters | 105 |
  | eval hand-in | 85 |
  | tick: accept (hidden runner; the run itself 271-298 ms) | 529 |
  | revise plan, resumed | 169 |
  | re-enter | 86 |
  | fix + self-check + hand-in | 313 |
  | tick: test1 → eval | 587 |
  | eval pass | 83 |
  | tick: accept, ship, evidence | 514 |
  | retro plan | 161 |
  | learn show | 80 |
  | propose | 93 |
  | refused re-propose | 86 |
  | G2 place | 219 |
  | G2 enter (playbook) | 90 |
  | G2 build + self-check + hand-in | 316 |
  | G2 tick: test1, sampled-out eval, accept, ship, evidence | 960 |

  In all, about 6.4 s of harness time for two games.

**Defects found, fixed with regression tests (tests/textgame-hybrid.test.mjs):**
1. **K28 scored a game-specific rule "helped" on a game that cannot show its class.** P-1 targets padlock, which only G1's suite has. On G2 it scored helped: accept had caught padlock once, and accept judged G2. Such a rule would never retire. The fix: a stage run may name the classes it checked (`findings.checked`, a regex whose group 1 lists them). The B7 accept prints `checked: <categories>`, and both specs read it. The kernel keeps the list as 8-hex hashes, in the history entry and the evidence's `checked`. A rule is scored only where a stage that catches its class judged the order *and* checked that class; otherwise it is unobserved. After the fix, P-1 is unobserved on G2, and helped on a later game whose suite has padlock and passes it. The checked line never reaches the findings, the fallback findings included.
   - Fairness note: the hashes hide the category list from a worker reading its own history. A guessed name can still be confirmed. The names in the findings are unchanged: the failing categories only.
2. **`setup.mjs place --sample-salt=<s>`:** a fixed K27 salt, so a dry run's sample decision is known in advance. It is recorded in the manifest. A real run leaves it unset (a random salt per company).
3. **The tally's eval runs** are now counted from the order's history. Before, they came from the observer's rows only, so a run without the observer showed 0 evals. `observed` is reported beside them.

**Still open (not fixed here):**
- An evaluator's pass with `--findings` keeps no findings: `advance` stores findings only on a revise. So an advisory finding on a pass is in EVAL.md only, and the observer's `classes` for that pass are empty.
- The accept label (the first findings line) names `setup.mjs`'s path and is cut at 160 characters (`--b7=/tmp/…`). This is known: see "Known asymmetries".

## Benchmark 7 v2: hard, noisy games (2026-10-22, before any run)

**Why.** The v1 games (about 475-line specs, 52-80 hidden tests each) were small enough that a capable agent could plausibly pass them on its first "done". That leaves no room for the external evaluation or the playbook to show anything. The research memo (`b7/RESEARCH-difficulty.md`, section 4) lists 12 difficulty mechanisms and a fairness rule: every hidden test must be derivable from the final spec text, and the reference must pass 100%. v2 rebuilds G1, G2 and G3 with all 12 mechanisms in each game, in a new guise each time, so a lesson transfers between games but a constant does not.

**This section takes precedence** over the earlier sections where they differ. The run commands, the access rule, the audit and the stops are unchanged, apart from what is stated here.

### The 12 mechanisms in the three games

| # | Mechanism | G1 The Lighthouse | G2 The Clockwork Manor | G3 The Sunken Temple | Category |
|---|---|---|---|---|---|
| 1 | Errata section (precedence stated in A0.2 and again in C0) | C1-C7: carrying limit 5; `take all` also empties open fixed containers; tide period 10; lantern holds 60; no dropping in the dark; padlock 10 and lens 15 points; Tom's default reply | C1-C6: drops in the hayloft fall to the stable; `drop all` keeps the lit torch; battery drains 2 a turn in the dark; light passes through open containers; the keypad code is the diary's digits reversed (2130); midnight at 250 | C1-C6: capacity counts nested items; the basket is not openable (and leaves `state().open`); the collapse timer is 6; `examine` takes no turn; a list binds `it` to its last thing; the machete is dropped at the limit | errata |
| 2 | Ambiguity resolved by a general rule elsewhere | A6.3 nearness (reversed for take); `it`/`them` bind only to what the player named (A6.6, A6.7); default responses for unmentioned verb/object pairs (A9.17). Guises: the two keys, `lamp` (lantern or beacon), `great` | the three keys, `door` (doors, and the bronze key's adjective), `red`, `long` | `statue` (idol or headless statue), `stone`, `column`, `tile`, `green`, `ripe` | ambiguity, pronoun |
| 3 | Category-only feedback | unchanged: `run-hidden.mjs` reports per category only | | | all |
| 4 | Mid-run Change Notice (Part D, 4-5 changes) | G1-N1: new `undo`; `Your hands are full.` and `You set it down.` replace two messages; storm warning at 160 and wreck at 220; the gull snatches on 0-1; scoring moves (lantern 5, logbook +5) | G2-N1: new `wait N` (1-20, stops when a daemon speaks); `The clocks tick on.` replaces `Time passes.`; the rat is hit on 2 or more; scoring moves (trade 5, diary +5) | G3-N1: `score` adds `You have visited R of 17 places.` (visited rooms become game state); the torch burns 2 a turn in the temple, with a crossing warning; `There is no way through there.` replaces `You can't go that way.`; gems turn up on 0-1 | notice, and every category after it |
| 5 | Seeded randomness, exact PRNG, test vectors, draw-order rule (A12) | xorshift32; the wandering gull steals shiny things (draws D1-D3 in its daemon) | LCG (high 16 bits); a fight with the rat (D1 in the action, D2 in the daemon) | PCG-style RXS-M-XS; digging for gems (D1) and the monkey's chatter (D2) | rng (the generator, the draw points, test-vector states), and gull / rat / dig (the outcomes at fixed seeds) |
| 6 | Parser fuzz against an EBNF grammar with exact error classes (A3.6, A3.7: P1-P8) | 287 inputs | 292 inputs | 291 inputs | fuzz, parser |
| 7 | Long-horizon timers with a turn-accounting table (A7.1) | storm, tide, lantern fuel, a ship's bell on T mod 7 = 3; runs of 200-230 turns | midnight, battery, spring, health on T mod 20, a music box on T mod 9; runs up to 260 turns | nightfall, torch, collapse, the mural readable only when T mod 9 is 3-5; runs up to 225 turns | horizon |
| 8 | Save/load round trip under every state | a reload (into a game made with another seed) at every 6th step of an 81-step run, and several reloads in one run, each compared output by output and state by state (rng and characters included); reloads of the slot, `it`/`them`, a finished game, the generator | the same over a 73-step run with a fight | the same over a 79-step run with digging and the collapse | saveload-deep |
| 9 | Distractor rooms and items with a stated generic refusal (A9.18) | boathouse, ruined chapel, lookout: 6 decorative things, an oar and a candle | ballroom, scullery, the portrait: 6 decorative things and a bar of soap | ruins and waterfall: 4 decorative things and a pebble | distractor |
| 10 | Long spec, load-bearing rules mid-document, rule IDs in a table of contents | about 19,500 tokens; the TOC lists every rule ID; mid-document rules: A6.3 nearness, A6.7 `them`, A7.1 turn accounting, A9.18 decorative refusal, A11.3 examining in the dark, A12.3 draw points | | | all |
| 11 | Combinatorial interactions with a precedence table | A14.1 (the order of checks) and A14.2 (32 rows), plus B9 rows for each world | | | interactions |
| 12 | Visible tests: a correct, incomplete, happy-path subset | 89 tests (15% of the post-notice suite), plus 3 notice tests at delivery | 92 (16.4%), plus 3 | 85 (15.6%), plus 2 | (visible) |

### The Change Notice: one notice, delivered the same way to every arm

The notice is fixed before the run (`b7/notices/Gn.md`, built from `hidden/specsrc/Gn-notice.md`). What changes when it is delivered is the same for every arm, byte for byte (`setup.mjs deliverNoticeFiles`; `noticeSha` in the manifest and the ledger):
- Part D is appended to `SPEC.md`;
- the notice's visible tests (`visible-tests/notice.test.mjs` and its data) are added;
- the arm is told with `NOTICE_POINTER`, the same text for every arm.

**V** (`vanilla-game.mjs`):
- Turn 1 is the build. Its hand-in is scored with the **pre-notice** suite, and that score goes back to no one.
- Turn 2 is the notice: `NOTICE_POINTER` plus "Say when you are done.", the closing sentence of every V prompt.
- Every later hand-in is scored with the **post-notice** suite. V gets up to 3 feedback rounds after the notice turn, so the notice costs no round.

**H and HSI** (`setup.mjs`):
- The first accept stage run (after test1 and the external eval) scores the pre-notice suite. It logs the run with `phase: "pre"`, writes `_operator/<arm>-<game>/notice.json` (due), and exits 3. Exit 3 is a stage error: the order is held at accept, nothing is signed and no loop is spent.
- The observer, in `setup.mjs run` or `watch`, then acts as the founder (`deliverNoticeMeta`):
  - it delivers the files;
  - it runs `meta.mjs order park <O> --by=founder`;
  - it runs `meta.mjs order resume <O> --by=founder --to=build --reason=<NOTICE_POINTER>`.
- `lib.mjs resume` counts the return to build as a loop and grants one loop back, so 3 revises remain after the notice, as V's 3 rounds do.
- The warm builder session is resumed with the findings `parked at accept: … Resumed to build by founder: <NOTICE_POINTER>`.
- From then on test1 runs the builder's tests and the visible tests (the notice's included). The eval runs again (its `looped` rule), and every accept run scores the post-notice suite.
- `endIfStopped` never cancels the notice's own park, and a park whose resume failed is retried on the next pass.

**Deviation from the brief:** the notice comes as a park and a resume to build, not an `order reopen`. The kernel reopens only a shipped order. Letting the first hand-in ship would also run ship, the evidence and HSI's retro on a game whose requirements were about to change.

**Stated asymmetries:**
- Meta's first hand-in comes after its self-checks, test1 and the external evaluation; V's comes at its first "done". This is the same as v1.
- If a Meta order parks at the loop cap before it ever reaches accept, it never gets the notice. Its score is then pre-notice only, and the tally says so (`notice.delivered` null).

### The measures (tally)

- **First hand-in:** the pre-notice score: V's first hand-in, Meta's first accept run.
- **After the notice:** the first post-notice score.
- **Final:** the last post-notice score.
- **Rounds:** the post-notice hidden runs minus one.

`PREDICTIONS.md` stands as committed. Its "first hand-in" now reads as the pre-notice score, and its "final" as the last post-notice score. Its numbers were written for the easier v1 games.

### The hidden suite v2

- **Data-driven.** `hidden/Gn/cases.mjs` (and the shared generators in `hidden/common/casegen.mjs`) list each case: a seed, the inputs and save/load operations, and the expectations I wrote from my own reading of the spec. `hidden/build-golden.mjs` runs every case on the reference twice, normally and with `B7_VARIANT=1`, which rewrites every free-wording string. It keeps a line exact only where both runs agree, so free wording is never tested. It writes `golden.pre.json` (with the pre-notice reference, `ref-pre/`) and `golden.post.json` (with `ref/`).
  - The build fails if a hand-written expectation disagrees with the reference.
  - The build also fails if a reload case does not replay exactly like its base run.
- **The runner.** `acc.test.mjs` and `hidden/common/suite.mjs` replay the golden cases. `run-hidden.mjs --phase=pre|post` (post by default) copies the phase's golden file into the isolated suite copy, and takes the category names from it. `kit.mjs` is gone.
- **Sizes.** Specs: G1 71.5k characters (13.0k words, about 19.9k tokens, 1,136 lines); G2 70.8k (12.8k words, about 19.7k tokens); G3 69.9k (12.7k words, about 19.4k tokens). The notices run 1.6-2.4k characters (450-670 tokens). Tests (post-notice; the api row counts its 10 golden cases, and the runner adds 3 code tests to it):

  | category | G1 | G2 | G3 |
  |---|---|---|---|
  | api | 10 (+3) | 10 (+3) | 10 (+3) |
  | parser | 53 | 53 | 53 |
  | fuzz | 287 | 292 | 291 |
  | pronoun | 22 | 14 | 14 |
  | ambiguity | 16 | 11 | 13 |
  | movement / items / containers / light | 8 / 8 / 9 / 8 | 7 / 6 / 6 / 7 | 6 / 4 / 5 / 6 |
  | turns | 12 | 12 | 12 |
  | rng | 12 | 11 | 10 |
  | the random element's puzzle category (gull / rat / dig) | 8 | 10 | 7 |
  | other puzzle categories | npc 4, dog 4, tide 6, chest 3, tower 2, padlock 2, beacon 4 | gardener 4, passage 2, safe 4, automaton 4, pendulum 2, clock 4 | hermit 4, monkey 5, vines 3, tiles 4, idol 6 |
  | horizon | 7 | 7 | 7 |
  | saveload / saveload-deep | 10 / 22 | 10 / 19 | 10 / 20 |
  | scoring / endings / edge | 4 / 5 / 9 | 4 / 5 / 9 | 3 / 3 / 9 |
  | errata | 15 | 13 | 10 |
  | distractor | 11 | 8 | 7 |
  | interactions | 12 | 11 | 9 |
  | notice (post only) | 17 | 13 | 12 |
  | **total, pre-notice suite / post-notice suite** | **576 / 593** | **548 / 561** | **534 / 546** |

  The random generator also runs through horizon, saveload-deep, interactions and notice.
- **Checks made (all pass):**
  - Each reference passes 100% of its own phase's suite. They still pass with every free-wording string rewritten (`B7_VARIANT=1`).
  - The pre-notice reference fails the post-notice suite on 93/593 (G1), 120/561 (G2) and 124/546 (G3) tests. The notices were balanced to this: at first G3's changed initial fuel failed 263 tests (every final state), so its D2 became a temple-only burn rate, and G1 gained a second renamed message.
  - Mutation check (`hidden/mutants.mjs`): 21 misreadings × 3 games, and 62 of 63 are killed. The survivor is `itMulti` in G3, where it is not a misreading: erratum C5 makes a list bind `it` to its last thing.
  - The visible tests pass on both references in both phases. The notice's visible tests fail on the pre-notice references.
  - `check-harness.mjs` checks the access rule, the runner's isolation, the accept phases, the notice files and the canaries.
  - Dry run 3 (below).
- **Not done (the memo's fairness rule asks for it):** two independent spec-only implementations per game, each passing at least 95%. They need agent sessions, so they wait for the founder's go. Recommended before the arms run: one fresh session per game builds from SPEC.md alone, is scored with `run-hidden.mjs --debug`, and the spec is fixed wherever the suite tests something the spec does not settle.
- **Open:**
  - The test process must read its golden file, so a game that reads files could look its answers up. A1.1 forbids file access, and the audit now lists any arm's final code that touches `fs`, `process.env` or a dynamic import (`gameFileAccess`) for the operator to read.
  - The free-wording masks assume the variant reference is a fair alternative implementation. A spec-only implementation is the real check.

### Files (operator side, `b7/` in the scratchpad: never committed, closed to every arm)

`specs/G1-3.md` and `API.md` (built); `notices/Gn.md` (Part D); `visible/Gn/` and `visible/Gn-notice/` (what the arms get); `hidden/specsrc/` (common.md, Gn.md, Gn-errata.md, Gn-notice.md); `hidden/common/engine.mjs` (the shared reference engine v2, with the three generators), `suite.mjs`, `casegen.mjs`, `reporter.mjs`; `hidden/Gn/world.mjs`, `ref/` (post), `ref-pre/` (pre), `cases.mjs`, `golden.{pre,post}.json`, `acc.test.mjs`; `hidden/build-specs.mjs`, `build-golden.mjs`, `mutants.mjs`; `run-hidden.mjs`.

```sh
cd "$B7"
node hidden/build-specs.mjs                 # specs/, notices/; prints the sizes
node hidden/build-golden.mjs                # golden files and visible tests; fails on any hand-expectation mismatch
node hidden/mutants.mjs                     # 21 misreadings x 3 games
node check-harness.mjs                      # access, isolation, accept phases, notice files, canaries
node run-hidden.mjs --game=G1 --phase=pre --dir=hidden/G1/ref-pre    # operator: a reference on its own phase
```

### Dry run 3 (2026-10-22; no Agent SDK session)

`b7dry3/drive.mjs` (scratchpad) played arm H on G1 by CLI, with the real runner and the real kernel, in a temp runs dir that it deleted afterwards:
1. place, the lead's delegate, and the builder's cold start;
2. the pre-notice reference as the game; the self-check passed 90/90 (89 visible tests and 1 own test); test1 passed and the eval passed;
3. the first accept was a `stage-error`, with phase pre at 576/576 and `notice.json` due;
4. the observer's pass parked and resumed the order as the founder. The order was back at build, SPEC.md ended with Part D, `visible-tests/` had `notice.test.mjs`, and the revise was planned as a resume of the same builder session (K26), with the pointer in its findings;
5. the old game failed the builder's own self-check on the new notice tests. The post-notice game passed it, then test1, the eval, accept (post, 593/593) and ship;
6. the tally: first hand-in 576/576 (pre), after the notice 593/593, final 593/593, rounds 0, `loops` 1 (the notice's loop granted back).
