# Benchmark 8: run protocol (a C-subset compiler in Clojure, S vs V)

owner: vp-meta · date: 2026-10-23 · status: **the harness is built and dry-run, and no arm has run.** Running starts
Agent SDK sessions, so it waits for the founder's go.

## The question

Benchmark 8 compares two arms on one long task: a compiler for a subset of C, written in Clojure, that emits x86-64 GNU
as. The work comes in six waves on one growing codebase (README.md):

| Wave | Scope |
|---|---|
| W1 | ints, expressions, locals, control flow, functions, recursion |
| W2 | pointers, arrays, strings, globals, char |
| W3 | structs, unions, typedef, enums, sizeof, initializers |
| W4 | the preprocessor and varargs calls |
| W5 | the rest of common C, floats as their own category |
| W6 | optimization only: the runtime of 8 benchmarks against gcc -O0, gated on no regressions |

The question is whether a specialized org with divided ownership and per-domain knowledge accumulation (S) does
better than one capable vanilla agent (V). S is System 3 Meta running `specs/ccompiler-specialized.json`.

## Arms

| | V (`vanilla-compiler.mjs`) | S (`setup.mjs run`, spec `ccompiler-specialized.json`) |
|---|---|---|
| Sessions | **one** Agent SDK session for the whole run, resumed for every turn | one session per launch the supervisor plans; owners warm within a wave (K26), cold across waves |
| Who works | one agent | architect (manager: owns the interfaces, delegates, answers change requests, the retro), frontend, semantics, backend, optimizer (owners, from W5 on for the optimizer), evaluator (independent, cold) |
| Code | `<runs>/V/`, its own git repo | `<runs>/S/work` (repo, main) and one worktree per wave `<runs>/S/wt/<Wn>` (K5) |
| Ownership | none | K29: each module's paths are its owner's; a write elsewhere is denied by the guard and refused at the commit unless a change request was approved |
| Per hand-in | none | K31: each owner's hand-in commits only its paths; the integration check runs the visible tests of waves 1..n on the commit as made; a regression (a visible test that passed at the last passing check) is routed back |
| Interfaces | none | K32: driver, AST, IR, ABI doc, module map, owned by the architect; a change makes its contract due at the next integration check |
| Feedback | the hidden lines, as the next turn | the same lines, as the accept stage's revise; split by category and routed to owners (K30); unmatched to the architect (triage) |
| Learning | none beyond the session's own context | K33: playbook rules scoped per module (and global ones); the architect's retro after each wave; each owner's pack carries its module's rules |

Neither arm gets System 3 Company's tools, CLAUDE.md, subagents or slash commands. S gets Meta's own kernel CLI
(`meta.mjs`, the supervisor, the launcher): that kernel is the harness under test.

## Fairness: what is the same for both arms

| | Both arms |
|---|---|
| Model | the launcher's `--model` default (read by `vanilla-compiler.mjs` from `launch.mjs`, so no model id lives in this folder), or the same `--model` passed to both |
| Tools | Bash, Read, Write, Edit, Glob, Grep. No Agent tool, no web tools. V: the SDK `tools` list; S: each role's `tools` |
| Settings | `settingSources: []` for every session (V's query; S's roles say `settingSources: []`, which the launcher's `sessionPlan` keeps). No CLAUDE.md, no project settings, no company subagents or commands |
| Toolchain | `<runs>/toolchain/clj-run` (Clojure 1.12.6 + spec.alpha + core.specs.alpha, sha256-checked against VERSIONS.md), read-only |
| Wave docs and files | `setup.mjs release`: the same files, byte for byte, released per wave (W1: CONTRACT.md, the headers, the visible README, W1.md, visible/W1; Wn: Wn.md and visible/Wn; W6: W6.md and spec/bench) |
| Hidden runner | `<b8>/run-hidden.mjs` through `setup.mjs hidden`: the same lines, the same regression gate at W6 (against the arm's own last W5 results), one hidden run at a time across both arms (a lock, so W6 timings never overlap) |
| Feedback | only the failing category lines (`W3 structs: 12 of 40 fail`), the gate line, and at W6 the benchmark and score lines, sent only when something fails |
| Rounds | the first hidden run of a wave plus at most 3 feedback rounds (`MAX_ROUNDS`). V: three feedback turns, then the next wave. S: the accept stage's 4th failing run exits 3, and the harness ends the order as founder |
| Next wave | starts from whatever the last version is, whatever the wave's end: V's directory as it is; S's main fast-forwarded to the wave's branch (done or cancelled) |
| Caps | wall clock 300 min and cost $120 for the whole run (`--max-min`, `--max-cost`), checked before each turn or launch and when each ends; a turn or launcher is cut at the wall clock |
| Access rule | `setup.mjs accessDecision`, the same function: V's in-process hook, S's `setup.mjs hook` as the launcher's `--pretool-hook` (guard.mjs `commandHook`, fails closed). Every call logged to `_operator/access.jsonl` |
| Backstops | PATH shims for each arm (`_shim/<arm>/bin`: gcc/cc/clang only assemble or link; cpp, tcc, chibicc, cc1, claude, curl, wget always refuse; every call logged); the hidden runner's sandbox (no C compiler, no network); the audit |

**What S adds is only Meta:** the org, the ownership and its guard, the parallel owners, the integration check, the
interface contracts, the evaluator, the routing and the playbooks. V's extra is one long session whose context carries
across waves; S carries knowledge across waves only through the codebase, the docs and the K33 playbooks.

## The access rule

From Benchmark 7 v3. Every path a call can reach is resolved: Bash words against the directory the line is in (each
cd followed), symlinks by their real path, Glob and Grep by their root.

**Open and read-only areas:**
- V's own directory is open.
- S's worktrees and scratch are open.
- The toolchain, S's live dir (the kernel copy, state.json), S's repo checkout and the playbook store are readable
  and never written by a tool. The kernel CLI, a node process, still writes them.

**Closed:** the benchmark's area around the open parts:
- `<b8>` (the hidden tests, the runner);
- the runs folder, including the other arm and `_operator`;
- the company repo and its home folder;
- other sessions' transcripts and temp folders;
- `/proc`.

**Benchmark 8 adds three Bash rules:**
1. **No C compiler on C.** gcc, cc and clang may only assemble or link: no C source, no `-E`, no `-x c`, no stdin
   input. cpp, tcc, chibicc and cc1 are refused outright.
2. **No network.** The upstream suites are public, so curl, wget, package installs, git remotes and URLs are refused.
3. **No nested session.** `claude` and `@anthropic-ai/claude-code` are refused.

The hook also reads:
- `bash -c` strings, `eval`, `$(…)`;
- a script or Makefile the line runs, when the file is in the arm's own folders.

Code an agent writes and runs is out of the hook's reach. The PATH shims catch a C compile through `gcc` by name. The
audit's source scan catches `ProcessBuilder`, `clojure.java.shell`, network classes and chibicc's identifiers. The
hidden runner's compile sandbox has no C compiler at all.

## Measures (setup.mjs tally)

- **First hand-in** (per wave):
  - V: the hidden run after the wave's first "done".
  - S: the wave's first accept run, which comes after the owners' hand-ins, the integration checks and the evaluation.
- **Final:** the wave's last hidden run.
- **Both scores cover the hidden tests of waves 1..n.** Each is reported overall, for the wave's own tests (`own`) and
  per wave.
- **W6 score:** the geometric mean of the 8 ratios against gcc -O0 (lower is better). The gate counts the hidden
  W1-W5 tests that passed at the arm's last W5 run and fail now.
- **Rounds:** the number of feedback rounds used.
- **Cost:** the SDK estimate, with each SDK session counted once.
  - V: the running total's growth per turn.
  - S: `dedupCost` over the wave's launches.
- **Tokens:** cumulative.
- **Minutes:** the wall time of the wave.
- **The per-module knowledge metric** (`tally().knowledge`), for each module and wave:
  - the rules S had in that module's scope at the wave's start (from playbook.json);
  - the failing fraction of the hidden tests routed to that module at the first hand-in, for S, and for V on the same
    routes (`moduleOf`: the spec's routes applied to V's categories).
- **S-only process measures:** integration runs and failures, parts and their routed categories, change requests
  granted, guard and hook denials.

## Running it (after the founder's go)

```sh
node bench8/vanilla-compiler.mjs                          # V: all six waves, one session (caps 300 min, $120)
node bench8/setup.mjs run                                 # S: places and runs each wave in turn (same caps)
node bench8/setup.mjs tally --md; node bench8/setup.mjs audit
```

Run the arms one after the other, never at once: the hidden-run lock keeps W6 timings apart, but two arms' agents
would still share the 4 CPUs.

## Dry run (2026-10-23, no SDK session)

**`node bench8/dryrun.mjs`** drives S through W1 → W2 by the CLI. Every role is played by the script exactly as an
agent calls the kernel. It uses:
- the real spec, instantiated for a fresh runs dir;
- the real integration check (a Clojure stub compiler in the module layout, `dryrun/stub/`, on the visible tests);
- the real interface contracts and the real hidden runner.

Every check passed:

- **Parallel parts (K31).** The architect delegated W1 to four owners at once (`--owners=architect,frontend,semantics`,
  to backend). All four entered their parts before any hand-in.
- **The launcher's plan.** It started each owner in the worktree with `settingSources []`, the six tools, maxTurns
  200 and sessionMin 60.
- **Ownership (K29), twice:**
  - frontend's write to the backend's module was denied by the guard (`module-owner`), for an Edit and for a shell
    redirect;
  - frontend's hand-in with the backend's file staged was refused at the commit, and nothing was committed.
- **The access hook on S.** gcc on a visible test was refused, the kernel CLI was allowed, and `_operator` was
  closed.
- **Interface change (K32).** Semantics asked to change the AST. Only the architect could answer, and it approved.
  The first version broke the namespace, so its contract failed at the next integration check and semantics' part
  reopened. The fix passed.
- **Commits and the integration check.** Each hand-in was its own commit, holding only its owner's paths. The
  integration check ran on each commit as made; the architect's interfaces-first commit passed because a namespace
  that only lacks a module not yet written is noted, not counted.
- **Eval.** The evaluator wrote and compiled its own test with the compiler (never gcc on C) and passed. An owner was
  refused entry to the eval.
- **Routing (K30) and warm sessions (K26).**
  - The hidden accept failed W1's three categories, and the revise went to the backend alone. The other three owners
    got nothing.
  - The backend resumed its own warm session.
- **The round cap.** With `--max-rounds=1`, the second failing accept exited 3 and marked the wave's rounds spent.
  The harness cancelled the order as founder.
- **Scoped playbooks (K33).**
  - The evidence named each category's module.
  - The architect's retro added a rule scoped to the backend module.
  - W2 was placed on main fast-forwarded to W1's branch, so W2 started from W1's last version, and every owner started
    cold (K26 is per order).
  - The backend's W2 pack carried the rule; frontend's carried none.
- **W2.**
  - Four owners handed in back to back and the integration check (visible W1 and W2) passed.
  - The accept's revise split between backend (w1-*, w2-strings, char, arrays, pointers) and semantics
    (w2-globals).
- **Tally.** It reports per wave the first and final pass rate, rounds, integration runs, parts, change requests,
  module failure fractions and rules at start.

**`node bench8/vanilla-compiler.mjs --dry-run`** started no session. It printed each wave's turn prompt, a feedback
turn and the settings:
- `settingSources []`;
- the six tools;
- the caps;
- the launcher's default model, read from launch.mjs.

**The access rule's self-test** passed 26 of 26 calls:
- refused:
  - gcc/cc/clang on C, `-x c`, `-E`, stdin;
  - tcc inside `bash -c`;
  - curl;
  - git clone;
  - `claude`, `npx @anthropic-ai/claude-code`;
  - hidden files, the other arm's files, `_operator`;
  - writes to the toolchain or state.json;
- allowed: assemble and link, clj-run, the kernel CLI, git in V's own repo.

**`--dry-run --fake=dryrun/stub --waves=W1,W2 --max-rounds=1`** played the agent itself. It ran the real release,
hidden-run, feedback and ledger path: 63 and then 138 hidden tests, with one feedback round each.

## Known limits

1. **Cost overshoot.** The cost cap is checked between turns and launches, so a run can overshoot by up to one turn's
   cost. Within a turn, the wall clock and the turn's own limit bound it.
2. **Session lengths differ.** V's turn may run 500 agent turns or 120 minutes. S's launches run 200 turns or 60
   minutes each, and S has many. The whole-run caps are the binding limits for both.
3. **What V's context buys.** V's long session carries its context across waves, compacted by the SDK when needed.
   S's owners start each wave cold. This difference is by design: S's cross-wave memory is the codebase, docs/ and
   the playbooks.
4. **Contamination.** The hidden tests are public upstream programs (README.md, open issue 1), so a model may know
   some by heart. The audit reports a hidden line an arm wrote first as `own`, never as a leak.
