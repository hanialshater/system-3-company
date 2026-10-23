# Benchmark 8: run protocol (a C-subset compiler in Clojure, S vs V)

owner: vp-meta · date: 2026-10-23 · status: **v2 (after the pilot): the harness is rebuilt around a box per arm,
checked from inside, and dry-run; no arm has run.** Running starts Agent SDK sessions, so it waits for the founder's
go. The v2 changes are marked "(v2)" where they replace v1's text, and summed up in "v2: the pilot's findings and what
changed" at the end, which takes precedence where the two differ.

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
| Settings | `settingSources: []` for every session, and the box's HOME is empty at the start (no `~/.claude`, no CLAUDE.md anywhere the CLI looks) (V's query; S's roles say `settingSources: []`, which the launcher's `sessionPlan` keeps). No CLAUDE.md, no project settings, no company subagents or commands |
| Box (v2) | every agent process runs in the same box (`sandbox.mjs`): its own uid (V 64081, S 64082), no capabilities, its own mount, pid and network namespaces; the root fs read-only; `/tmp /home /root /mnt /opt /usr/local /var/tmp /var/log …` empty tmpfs with only the arm's own and read-only folders bound back; cc1/cc1plus/lto1 are `/dev/null` and `/usr/lib/llvm-*` is empty (so gcc only assembles and links, and clang does not exist); the only egress is a tunnel to the orderer's proxy, which allows `CONNECT api.anthropic.com:443` and nothing else (every request logged). V: the SDK's `spawnClaudeCodeProcess` starts the CLI in V's box. S: the whole launcher (supervisor, code stages, every session) runs in S's box; the hidden runner and the accept stage stay with the orderer behind a broker socket |
| Env (v2) | built from an allowlist (`boxEnv`): PATH (shims first, node, /usr/bin, /bin), a private HOME and TMPDIR, LANG, the proxy, the system CA bundle, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, and the auth variables (`AUTH_KEYS`, plus any named in `B8_AUTH_ENV`). Nothing of the operator's session: no `CLAUDE_CODE_*` remote, messaging, debug, sync or additional-directory variables, no `JAVA_TOOL_OPTIONS`, no tokens for other services. The names (never the values) go in each arm's ledger |
| Effort and compaction (v2) | the SDK `effort` option `high` for every session (V's query; S's launcher `--effort=high`); autocompaction at the CLI's default for both (no override). Both recorded in the ledgers |
| Preflight (v2) | before each arm's W1: one one-turn session started exactly as the arm's sessions are (the box, the env, the proxy). If it fails (auth, the tunnel), the arm does not start |
| Toolchain | `<runs>/toolchain/clj-run` (Clojure 1.12.6 + spec.alpha + core.specs.alpha, sha256-checked against VERSIONS.md), read-only |
| Wave docs and files | `setup.mjs release`: the same files, byte for byte, released per wave (W1: CONTRACT.md, the headers, the visible README, W1.md, visible/W1; Wn: Wn.md and visible/Wn; W6: W6.md and spec/bench) |
| Hidden runner | `<b8>/run-hidden.mjs` through `setup.mjs hidden`: the same lines, the same regression gate at W6 (against the arm's own last W5 results), one hidden run at a time across both arms (a lock, so W6 timings never overlap) |
| Feedback | only the failing category lines (`W3 structs: 12 of 40 fail`), the gate line, and at W6 the benchmark and score lines, sent only when something fails |
| Rounds | the first hidden run of a wave plus at most 3 feedback rounds (`MAX_ROUNDS`). V: three feedback turns, then the next wave. S: the accept stage's 4th failing run exits 3, and the harness ends the order as founder |
| Next wave | starts from whatever the last version is, whatever the wave's end: V's directory as it is; S's main fast-forwarded to the wave's branch (done or cancelled) |
| Caps | wall clock 300 min and cost $120 for the whole run (`--max-min`, `--max-cost`), checked before each turn or launch and when each ends; a turn or launcher is cut at the wall clock |
| Access rule | `setup.mjs accessDecision`, the same function: V's in-process hook, S's `setup.mjs hook` as the launcher's `--pretool-hook` (guard.mjs `commandHook`, fails closed, and the hook itself fails closed on unreadable input or an unreachable log). v2: a tool allowlist (the six tools, nothing else), default-deny paths, `gcc @file` and `--language` refused. Every call logged to `_operator/access.jsonl` (S's through the broker, so no S process can write that log) |
| Backstops | the box (above: the hidden material, the other arm, the operator's logs and every other session's files are not in it; no C compiler; no network); PATH shims for each arm (`_shim/<arm>/bin`: gcc/cc/clang only assemble or link; cpp, tcc, chibicc, cc1, claude, curl, wget always refuse; every call logged to the box's own log); the hidden runner's sandbox (no C compiler, no network); the audit (with the egress log) |

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

**v2 (the pilot's findings):**
- **Default-deny.** Besides the open and read-only areas, only `/usr /bin /sbin /lib* /etc /dev`, node's folder,
  `/proc/self`, and paths that do not exist yet (new files under `/tmp`, the box's private tmpfs) are open. Anything
  else that exists is closed: the pilot reached `/tmp/claude-code.log` (the operator's debug log), other sessions'
  fixtures in `/tmp`, sockets and `/root/.claude.json` under the old rule.
- **A tool allowlist.** Bash, Read, Write, Edit, Glob, Grep; any other tool (an MCP tool, Skill, Agent, the web tools)
  is denied.
- **Compiler words.** `gcc @file` (a response file) and `--language=<anything but assembler or none>` are refused by
  the hook and by the shims.
- **The hook fails closed** on input it cannot parse, and S's hook on a log it cannot reach.

Code an agent writes and runs is out of the hook's reach, and v1 relied on that code being harmless. **v2 does not:
the box makes the hook a second line.** Inside the box there is nothing to leak (the hidden tests, `<b8>`, `_operator`,
the other arm, the repo and every other session's files are not mounted), no C compiler to call (cc1 and clang are
gone, whatever path or response file reaches gcc), and no network but the model API. `setup.mjs box-check --arm=V|S`
probes this from inside each box, with no SDK session (2026-10-23: V 22 of 22, S 30 of 30, below). The audit's source
scan also looks for `urlopen`, `fetch(`, `java.net`, `HttpClient` and the model API's host and headers, and the audit
lists every request the egress proxy refused.

**What remains (accepted):** a box can still call the model API itself (the CLI's credentials are in its env), so
code could in principle ask a model with server-side tools to fetch a suite; the audit's source scan names the API's
host and headers, and the egress log counts every tunnel. S's kernel files (state.json, the integration baseline) are
writable by S's uid, as the kernel CLI must write them: the hook keeps tools off them, but code S runs could change
them; that would only corrupt S's own process, never V's score or the hidden runner (root, outside).

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

From `company/sibling/system3-meta/prototype`, as root (the boxes need namespaces and the arms' uids):

```sh
# 0. checks, no SDK session (each must pass)
node bench8/setup.mjs selftest                            # the access rule on 37 fixed calls
node bench8/setup.mjs box-check --arm=V                   # V's box, probed from inside
node bench8/setup.mjs box-check --arm=S                   # S's box, the hook through the broker
# 1. the arms, one after the other (each starts with its one-turn preflight session; caps 300 min, $120 each)
node bench8/vanilla-compiler.mjs                          # V: all six waves, one session
node bench8/setup.mjs run                                 # S: places and runs each wave in turn
# 2. the scores and the audit
node bench8/setup.mjs tally --md; node bench8/setup.mjs audit
```

The box passes only the auth variables named in `sandbox.mjs` `AUTH_KEYS` (`ANTHROPIC_API_KEY`,
`ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`, `ANTHROPIC_BASE_URL`). If the operator's sessions authenticate
another way, export one of these, or name the variables in `B8_AUTH_ENV`, or copy a credential file into the boxes'
HOME with `B8_AUTH_FILES=<src>:<dst under HOME>`; the preflight says whether a session starts. The same variables reach
both arms. Run the box-checks with `--runs=<a scratch dir>` to keep the real runs folder empty until the run.

Run the arms one after the other, never at once: the hidden-run lock keeps W6 timings apart, but two arms' agents
would still share the 4 CPUs.

## Dry run (2026-10-23, no SDK session)

**v2 checks (after the pilot; no SDK session):**
- `setup.mjs selftest`: the access rule on 37 fixed calls, all as expected (v1's 26, plus `gcc --language=c`,
  `gcc @args.rsp`, `/tmp/claude-code.log`, `/root/.claude.json`, `/tmp/cc-socks`, an MCP tool and Skill refused; an
  assemble with `--language=assembler`, `/tmp` scratch files and the box's own HOME allowed; S's integration baseline
  read-only).
- `setup.mjs box-check --arm=V`: 22 of 22 probes held inside V's box: its uid; its folder writable and the toolchain
  read-only; the hidden tests, `<b8>`, `_operator` and S's folder absent; nothing of the host's `/tmp`, `/home`,
  `/root`, `/mnt`; 4 processes visible; gcc on a `.c` file and `gcc --language=c` fail, clang is absent, gcc still
  assembles and links; Clojure runs; python's urllib and node's fetch cannot reach github, the proxy refuses github
  (403) and passes the model API (401 without credentials); no session variables in the env; the root fs read-only;
  `/dev/vda` unreadable. The egress log recorded the three refusals and the one allowed tunnel.
- `setup.mjs box-check --arm=S`: 30 of 30, the same 22 plus: the frozen kernel and the harness read-only; the SDK's
  CLI binary runs (`--version`); the hook (through the broker) allows S's own file, denies a hidden file and an MCP
  tool, and fails closed on unreadable input; git commits as S's uid. The broker wrote the hook's lines to
  `_operator/access.jsonl`.
- **S's launcher in S's box** (a scratch run with no order, so no session was planned): it started as S's uid,
  copied the kernel into the live dir, ran `serve` to its end and wrote state.json, all owned by S's uid, with
  `effort: "high"` in its `launcher-up` line.
- `dryrun.mjs` (below) passed again with the accept stage going through the broker.

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
hidden-run, feedback and ledger path: 63 and then 138 hidden tests, with one feedback round each (v2, on the rebuilt suite: 60 and then 133, exit 0).

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

## Time and cost, estimated before any run (v2)

These are estimates, not measurements: no SDK session of either arm has run, and the pilot was a workflow agent, not
an SDK session.

| | V | S |
|---|---|---|
| Wall clock | 2.5 to 4.5 h. The pilot did W1-W3 in about 55 tool calls; W4 and W5 (1,195 tests, 17 categories) and W6 are several times that work. Hidden runs add about 1 to 4 min each (up to 24 runs) | 4 to 5 h, and likely to reach the 300-min cap: five roles plus an evaluator per wave, one launch at a time per role, integration checks after each hand-in (1 to 3 min each) |
| Cost | $40 to $100. One long session: each tool call re-reads a large cached context, and compaction resets it | $80 to $120, likely to reach the $120 cap (Benchmark 6 measured Meta at 2.3× one agent; the early waves are cheap for one agent, which raises the ratio there) |
| Preflight | under $0.05, under 1 min | the same |

Both arms together: about 7 to 10 hours of wall clock run one after the other, and $120 to $220. The caps (300 min,
$120 per arm) bound the worst case at 10 hours and $240 plus at most one turn's overshoot each (Known limits 1).

## v2: the pilot's findings and what changed (2026-10-23)

A pilot (one workflow agent, no SDK session of either arm) built a W1-W3 compiler in Clojure against this harness and
reported its findings. Each one, and what v2 did:

| Pilot finding | Severity | v2 |
|---|---|---|
| Both arms ran as root and `<b8>/hidden` was world-readable: code an agent wrote (or its compiler, or S's integration check) could read the hidden tests | high | every agent process runs in its arm's box as its own uid; `<b8>`, `_operator`, the other arm, `/home`, `/root` and the host's `/tmp` are not mounted there. S's integration check runs inside S's box; the hidden runner and the accept stage stay with the orderer (root), reached through the broker socket |
| Direct egress worked, and the env kept `HTTPS_PROXY` and `JAVA_TOOL_OPTIONS`: python, node or Java code could fetch the public suites | high | the box's netns has only `lo`, tunnelled to the orderer's egress proxy, which allows `CONNECT api.anthropic.com:443` only and logs every request; the env is an allowlist (no operator proxy, no Java options); the audit lists refused requests and scans sources and tool calls for network words |
| `gcc --language=c` and `gcc @args.rsp` compiled C past the hook and the shim; a script could call `/usr/bin/gcc` by absolute path | high | cc1, cc1plus, lto1 (and the other back ends) are `/dev/null` in the box and `/usr/lib/llvm-*` is empty: gcc cannot compile C by any path; the hook and the shims also refuse `@file` and `--language` |
| The hook allowed `/tmp/claude-code.log` (the operator's debug log), other sessions' fixtures in `/tmp`, sockets, `/root/.claude.json` | high | the box's `/tmp`, `/root`, `/run` are empty tmpfs; the hook is default-deny (only the arm's folders, its read-only ones, the system folders and new `/tmp` files) |
| The arms inherited the session's env: remote-session and messaging variables (a channel to the parent session), `CLAUDE_ADDITIONAL_DIRECTORIES` (a CLAUDE.md could load), debug logging into shared `/tmp`, effort and autocompaction overrides | medium | the env is built from an allowlist (`boxEnv`); effort is the SDK option `high` for both arms; autocompaction is the CLI default for both; the messaging socket and `/mnt` are not in the box anyway |
| The hook was a denylist of tools (an MCP tool and Skill passed), and failed open on unreadable input | medium | an allowlist of the six tools; the hook fails closed on unreadable input and on an unreachable log |
| W1-W3 came out at 95-100% hidden for one careful agent in about 55 tool calls (target: under 80%) | design | W1-W3 are declared the warm-up (PREDICTIONS.md P8-0: both arms ≥ 90%); the difficulty moves to W4-W6: GNU C (`W5 gnu`), VLAs (`W5 vla`), gcc's predefined macros (W4), and W6's continuous score as a headline measure |
| A change that only moved locals on the stack swung 2 hidden tests: some tests may read uninitialised memory | test quality | every test is now also built with `-ftrivial-auto-var-init=pattern` and `=zero`, run with the stack shifted, in a quarter of the stack, and under valgrind; any disagreement drops it (README.md) |
| Spec ambiguities: `extern` prototypes and K&R definitions in W1 tests; a VLA parameter in a W2 test; C11 anonymous members in W3; GNU extensions unaddressed; `long double` undefined | spec | W1.md: K&R and `extern` prototypes in scope; W2.md: a non-constant parameter size is W5 `vla`; W3.md: anonymous members (and designators into them) and block-scope typedef shadowing in scope; W5.md: the GNU list, VLAs, and `long double` out with its reason; the tagger now detects each case |
| The 3 W1 `functions` failures the pilot could not explain | tagger bug | they were `__builtin_types_compatible_p` tests (chibicc's builtin.c) that passed `-pedantic-errors` and were tagged W1; now W5 `gnu` |
