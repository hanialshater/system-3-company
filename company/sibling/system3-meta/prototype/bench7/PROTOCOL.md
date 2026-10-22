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
| **H** | The hybrid: lead delegates → warm builder (self-checks with `meta.mjs check`) → test1 (code: its own tests) → eval (independent evaluator: SPEC.md and code only, batch {3, 5 min}, sample rate 1.0 in [0.5, 1]) → accept (code: the hidden suite) → ship (code). maxLoops 3 | `specs/textgame-hybrid-nolearn.json`, `setup.mjs` |
| **HSI** | H plus the K28 playbook. After each game the lead runs one retro, and code validates its rules. The store (`<runs>/arm-HSI/playbook-store/`) persists G1 → G2 → G3. H has no store | `specs/textgame-hybrid.json`, `setup.mjs` |

**Games.** G1 The Lighthouse, G2 The Clockwork Manor, G3 The Sunken Temple (`specs/G1.md`-`G3.md`).
- Each spec is about 475 lines. Part A, the engine contract, is the same in all three; Part B is the game's world.
- Each arm plays G1, then G2, then G3. Game n+1 starts only after that arm's game n has ended.
- `setup.mjs place` refuses to start out of order. For HSI it also waits until G(n-1)'s run has closed, so the retro is in the store.

**One game, one directory, for every arm.**
- No files and no sessions carry over between games.
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
| Tools | Bash, Read, Write, Edit, Glob, Grep; no Agent tool | the launcher's defaults: the same six |
| Session limits | 200 turns, 60 min a turn, one resume on a crash | builder: maxTurns 200, sessionMin 60; evaluator: 150, 40 |
| Settings | `settingSources: []` | `settingSources: ["project"]`, where the project settings are only the access hook `setup.mjs` writes to `<live>/kernel/.claude/settings.json`. The live dirs sit outside any git checkout, so no CLAUDE.md loads |
| Access rule | `setup.mjs accessDecision`, as an in-process PreToolUse hook | the same function, as a command hook (`setup.mjs hook`) |

**The access rule.** Every tool call of every arm is logged to `<runs>/_operator/access.jsonl`, allowed or denied. A call is denied when it touches any of:
- the benchmark folder `b7/` (hidden tests, references, runner, this harness);
- `<runs>/_operator/` (accept log, observer snapshots, V's ledger);
- another arm's folder;
- the benchmark write-up in the repo.

It counts as touching them when:
- any non-write tool's input names one of those paths;
- a Read or Write path resolves into one;
- a Glob or Grep, or a Bash `find`/`grep`/`rg`/`ls -R`, runs over a folder that contains one;
- the input names a hidden-test file (`run-hidden`, `acc.test.mjs`).

A Write or Edit is judged by its path only, so a note that mentions the hidden suite is not denied. The hook is best effort for Bash; the audit below is the backstop.

**The audit** (`setup.mjs audit`) gives a verdict that is clean only if all three of these hold:
1. **Hook coverage:** every SDK session of every arm (from `launches.jsonl` and V's ledger) has at least one access-log line. A session the hook never saw is unverified.
2. **Transcripts:** each session's transcript is found (`~/.claude/projects/*/<session>.jsonl`, or `$CLAUDE_CONFIG_DIR`).
3. **Canaries:** no canary string reaches a session in a tool result. The canaries are:
   - the hidden tests' names that are 24 characters or more and do not occur in any spec;
   - the hidden suite's own identifiers;
   - the hidden paths.

   A test name the session wrote itself first (its own test of the same name, printed back by `node --test`) is its own, not a leak. Paths named in a session's own calls are listed as attempts.

**Known asymmetries (stated, not fixed):**
- Only H and HSI have an external evaluator. That is the treatment.
- The Meta builder works through the kernel CLI (`meta.mjs`), and its brief is the kernel's.
- The accept stage's findings begin with the kernel's label: the accept command line, which names `setup.mjs` by absolute path. So a Meta builder can learn where the harness lives. The hook denies it everything there.

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
- **H, HSI:** the game ends when the order is `done`. If it is **parked at the loop cap**, or stopped **at its budget**, the harness (`setup.mjs run`/`watch`) cancels it as the founder, and the cancel is recorded in `_operator/<arm>-<game>/operator.jsonl`.
  - A cancelled order is an ended order. Its evidence and HSI's retro still run; a parked order would not count as ended for K28.
  - The arm's final result is its last version.

## Exact run commands

```sh
B7=/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b7
PROTO=/home/user/system-3-company/company/sibling/system3-meta/prototype
cd "$B7"
ln -sfn "$PROTO/launcher/node_modules" node_modules      # the Agent SDK, for vanilla-game.mjs
node vanilla-game.mjs --dry-run | tail -40                 # prompts, model, tools, deny roots; no session

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

- `setup.mjs run` starts `launcher/launch.mjs --live=<runs>/arm-<A>/<G> --setting-sources=project --max-parallel=2 --max-min=150`. It runs the observer beside it every 3 s and applies the stops.
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

## Dry run (done, 2026-10-22; no Agent SDK session)

`b7dry/drive.mjs` (scratchpad) drove the kernel CLI by hand. Fake game versions wrap the reference, and one breaks `inventory`. It covered:
- placement: H G1, HSI G1 and HSI G2; refusals for out of order, V, and a second placement;
- the lead's delegate, and a warm build with a self-check;
- an eval false pass, then an accept revise whose findings are the category lines;
- the revise planned as `resume:<builder session>`;
- the fix, eval, accept, ship, and HSI's retro adding a rule. HSI G2 starts with G1's rule, a duplicate is refused, and H has no store;
- the hook: allowed reads and writes; denied hidden, runner, other-arm, operator, scratchpad-search and repo write-up paths;
- the tally: first 78/80 → final 80/80 on G1, rounds 1, dedup cost 4.5 vs naive 6.5, one eval false pass;
- the audit: a planted canary leak found, a same-name test the session wrote itself not flagged, one session without hook lines flagged.
