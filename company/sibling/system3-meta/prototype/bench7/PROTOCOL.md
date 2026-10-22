# Benchmark 7: run protocol (text games, V vs H vs HSI)

owner: vp-meta · date: 2026-10-22 · status: harness built and dry-run, **no arm run yet** (running starts Agent SDK sessions: it waits for the founder's go)

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
- Each spec is about 475 lines. Part A, the engine contract, is the same in all three; Part B is the game's world.
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
| Hidden feedback | `<category>: <f> of <t> tests fail`, one line per failing category, after each hand-in | the same lines, as the accept stage's revise findings (the kernel puts its one-line label before them) |
| Feedback rounds | at most 3 after the first hand-in | at most 3 loops (maxLoops), counted over every stage's revises (test1, eval, accept). The 4th parks the order (see Stops) |
| Model | the launcher's `--model` default, read from `launch.mjs` (or the same `--model` passed to both) | the launcher's default |
| Tools | Bash, Read, Write, Edit, Glob, Grep; no Agent tool | the same six, named by each role's `tools` in the spec, so the SDK shows only those (no Agent, Task or TodoWrite) |
| Session limits | 200 turns, 60 min a turn, one resume on a crash | builder: maxTurns 200, sessionMin 60; evaluator: 150, 40 |
| Wall clock per game | 480 min (`setup.mjs GAME_MIN`): no round starts after it, a turn ends at it | the same 480 min: the launcher's `--max-min` |
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
- **Every arm:** the game's wall clock is 480 min (`GAME_MIN`). That is V's own most: four hand-ins of a 60-minute turn plus one 60-minute resume each.
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

- `setup.mjs run` starts `launcher/launch.mjs --live=<runs>/arm-<A>/<G> --setting-sources=project --max-parallel=2 --max-min=480`. It runs the observer beside it every 3 s and applies the stops.
- `setup.mjs run --dry-run` prints that command and runs one observer pass. Its records go to `<runs>/_operator/` (default `<scratchpad>/b7-runs`; `--runs` overrides).
- Operator-only diagnostics, after the run: `node run-hidden.mjs --game=Gn --dir=<snapshot> --debug` names failing tests.

## Measures (per arm, per game; `setup.mjs tally`)

| Measure | V | H, HSI |
|---|---|---|
| **First hand-in pass rate** | hidden pass/total after the first "done" | the first accept stage run (`accept.jsonl[0]`), after test1 and the external eval. Also reported: `firstBuild`, the builder's first hand-in, scored by the observer on its snapshot |
| **Final pass rate** | the last hidden run | the last accept run, or the last observed version if the order stopped after it |
| **Rounds / loops** | feedback rounds used (0-3) | hidden rounds (accept runs − 1); `loops`; revises by stage |
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
