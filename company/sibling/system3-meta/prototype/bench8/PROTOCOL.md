# Benchmark 8: run protocol (a C-subset compiler in Clojure, S vs V)

owner: vp-meta · date: 2026-10-23 · status: **v2 (after the pilot): the harness is rebuilt around a box per arm,
checked from inside, and dry-run; no arm has run.** Running starts Agent SDK sessions, so it waits for the founder's
go. The v2 changes are marked "(v2)" where they replace v1's text, and summed up in "v2: the pilot's findings and what
changed" at the end, which takes precedence where the two differ. **The "Isolation deviation (2026-10-23)" section at
the end takes precedence over both: no session can authenticate inside the box here, so the arms run with
`--isolation=hooks` (the default), without the box.** **"Restarts (2026-10-23)" at the end: both arms resume after
a machine restart (`--resume`), `keepalive.mjs` restarts them, and the caps exclude the downtime.**

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
# --isolation=hooks is the default (see "Isolation deviation" below); --isolation=box runs the v2 box instead
# 0. checks, no SDK session (each must pass)
node bench8/setup.mjs selftest                            # the access rule on 121 fixed calls (117 with --isolation=box)
node bench8/setup.mjs box-check --arm=V                   # box mode only: V's box, probed from inside
node bench8/setup.mjs box-check --arm=S                   # box mode only: S's box, the hook through the broker
# 0b. hooks mode: one tiny session per arm each (a few cents), on a scratch runs dir
node bench8/setup.mjs preflight --arm=V --runs=<scratch>  # "Reply with the single word: ready", tools []
node bench8/setup.mjs probe --arm=V --runs=<scratch>      # hidden file, curl github, gcc on .c: all denied and logged
node bench8/setup.mjs preflight --arm=S --runs=<scratch>; node bench8/setup.mjs probe --arm=S --runs=<scratch>
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

## Isolation deviation (2026-10-23): `--isolation=hooks`

**Why.** The box (v2) gives each arm its own network namespace whose only way out is a tunnel to the orderer's egress
proxy, and an env built from an allowlist. In this container the model API is reached only through the host's proxy,
with the operator session's own credentials, and the founder's operator decided not to chain the box through that
proxy. So no Agent SDK session can authenticate inside a box, and neither arm can run in one. `--isolation=box` stays
in the harness, unchanged, for a host where it can.

**What replaces it.** `--isolation=hooks`, the default for every command (`setup.mjs`, `vanilla-compiler.mjs`; also
`B8_ISOLATION`). Both arms' sessions run the way Benchmarks 6 and 7 ran: the normal Agent SDK `query()` (no
`spawnClaudeCodeProcess`), as the orderer's user, with no namespaces. For both arms alike:

| | Both arms in hooks mode |
|---|---|
| Sessions | V: `vanilla-compiler.mjs` in process (`setup.mjs vOptions`). S: the launcher (`launch.mjs`, the frozen copy) started directly with S's env and `cwd` S's folder; every session through its `queryOptions` |
| Env | this process's env minus launch.mjs's four (`CLAUDECODE`, `CLAUDE_CODE_SESSION_ID`, `CLAUDE_AUTO_BACKGROUND_TASKS`, `CLAUDE_CODE_BG_TASKS_REPORT_RUNNING`) and `sandbox.mjs CONTEXT_STRIP`: `CLAUDE_CODE_REMOTE_SESSION_ID` (below), the additional-directories and CLAUDE.md variables, the effort, thinking and autocompaction overrides, the messaging socket and token, debug and diagnostics files, `JAVA_TOOL_OPTIONS`, `GIT_CONFIG_*`, and the GitHub, AWS and gcloud tokens. Then the shims first on `PATH` and a `TMPDIR` of the arm's own (`<runs>/_box/<arm>/tmp`). The model API's proxy and credentials stay, as they must. Names only in the ledgers (`envNames`) |
| Settings, tools | `settingSources: []`; the SDK `tools` list Bash, Read, Write, Edit, Glob, Grep (no Agent tool, no MCP, no Skill, no web tools); effort `high` (the SDK option); autocompaction the CLI's default |
| Access rule | `accessDecision`, as before, as the PreToolUse hook of every session (V: in process; S: `setup.mjs hook --isolation=hooks`, the launcher's `--pretool-hook`, after the kernel guard's own hook, logged through the broker). V also gets it as `canUseTool` (permission mode `default`, Bash and the write tools left out of `allowedTools`, as the launcher does for S); S's `canUseTool` is the kernel guard's, as in every Meta run. A denial wins over any allow; every call is logged to `_operator/access.jsonl` with its session id |
| What the rule closes | `<b8>` (the hidden tests, the upstream clones in `<b8>/hidden/upstream`, `run-hidden.mjs` and its work dirs), the runs folder but the arm's own folders (so `_operator`, `_box`, the other arm), the company repo and `/home/user`, `~/.claude` (but the arm's own transcript folders), the scratchpad and `/tmp/claude-0` around the runs, `/proc`, and anything else that exists outside the system folders (default-deny). The toolchain is read-only; the released `spec/` and `visible/` are in the arm's own folder |
| Bash rules | network: curl, wget, nc, socat, ssh, scp, pip, npm, npx, uv, `python -m pip` (and other fetch modules), package managers, git clone/fetch/pull/ls-remote/remote/submodule, any `scheme://` URL, `/dev/tcp`; a nested `claude` or the SDK; gcc/cc/clang on C (a `.c` or other C source, `-E`, `-x c`, `--language`, `@file`, stdin), cpp, tcc, chibicc, cc1 always. gcc only on `.s`/`.o` inputs (assemble, link) |
| Shims | `<runs>/_shim/<arm>/bin` first on PATH, as before: gcc/cc/clang assemble and link only; cpp, tcc, chibicc, cc1, claude, curl, wget, nc, ncat, netcat, socat, ssh, scp, sftp, pip, pip3, npm, npx, uv always refuse; every call logged to `<runs>/_box/<arm>/log/shim.jsonl` |
| Hidden runner, accept | unchanged: the orderer's (root) `run-hidden.mjs` in its own sandbox; S's accept stage asks the broker, which runs it as the orderer |
| Preflight | as before, in hooks mode: the one-turn session with the arm's env and hooks (V: `vOptions`; S: the kernel's `sessionPlan`/`makeGuard`/`queryOptions` plus the command hook), and it must get a session id of its own |
| Audit (additions) | `fileScan`: every text file of the arm's folders (the released spec/ and visible/ aside) for hidden paths, network words, a C compiler on C, upstream markers (`gcc.c-torture`, `c-testsuite`, gcc's copyright and `dg-` lines, the hidden tests' original file names, which no released file carries) and hidden-test lines (the canaries); `toolScan`: every logged call for the same, allowed and denied apart (an allowed one is a hole); `upstreamInToolCalls` from the transcripts. The verdict is not clean on a hidden path, hidden-test line or C compile in the files, or an allowed hidden/network/compiler call |

**Found while checking it.** The SDK and the CLI derive a session's id from `CLAUDE_CODE_REMOTE_SESSION_ID` (a UUID v5).
With only launch.mjs's four variables removed, the first probe session got the operator's own session id, so every
session of both arms would have shared one id: one transcript file per project folder, the access log unable to tell
sessions apart, and a resume that could land in the wrong one. `CONTEXT_STRIP` removes it; the preflight and the probe
now fail unless the session's id is its own. (The same variable may have been inherited in Benchmarks 6 and 7.)

**Residual risks (accepted, the same for both arms).**
- **The agents run as root.** The hidden tests, `_operator`, the other arm and the operator's files are protected by
  the hook and the audit, not by permissions or mounts. A tool call that names them is denied; code an agent writes and
  runs (a Clojure `shell/sh`, a Python script) is out of the hook's reach and could read them. The audit's source and
  file scans look for such code (`ProcessBuilder`, `clojure.java.shell`, hidden paths) and for what it would bring back
  (hidden-test lines, upstream markers).
- **The network is open to code.** The proxy variables stay (the CLI needs them), so code an agent runs could fetch the
  public suites. The hook refuses network commands and URLs in tool calls, the shims refuse the common clients, and
  the audit scans files and calls for network words; there is no egress log in this mode.
- **gcc can compile C for code.** cc1 is present; a script that calls `/usr/bin/gcc` on a `.c` by absolute path gets
  past the shims. The hook refuses it in tool calls, and the audit's scans flag a compiler run on C in the arm's files.
- **The rest of the env.** Variables not in `CONTEXT_STRIP` reach both arms (the CLI needs some of them to reach the
  model API); `B8_KEEP_ENV` puts a stripped one back if a session needs it, for both arms.

**Checks (2026-10-23).** `selftest`: 121 of 121 in hooks mode, 117 of 117 in box mode. `vanilla-compiler.mjs
--dry-run` and `--dry-run --fake=dryrun/stub --waves=W1,W2 --max-rounds=1` (60 then 133 hidden tests, exit 0),
`dryrun.mjs` (S through W1 and W2, ok) and `setup.mjs run --dry-run` in hooks mode. One preflight session per arm
(`ready`, its own session id, $0.005 to $0.009 each cold, $0.0002 with a warm cache) and one hook probe per arm (the three
calls denied by the access hook and logged with the session's id, no call allowed; $0.05 each). The kernel suite:
319 of 319.


## Restarts (2026-10-23): both arms restart-safe, and kept alive

**Why.** The container was restarted (reclaimed) without warning twice in one hour: every process died, the files
survived. A first attempt at the real runs (04:44) died that way in its first minutes, and neither arm could continue:
V's ledger held no session id yet (it was written only at a turn's end), and S had no way to continue a wave at all.
Both arms are now restart-safe in the same way, and `keepalive.mjs` restarts them. This section takes precedence over
the earlier ones where they differ.

**The rule, for both arms alike.** The disk is the arm's memory. A restart costs the arm only the work in flight at the
moment of death; the caps count only the time the arm ran; the downtime is recorded, never charged.

| | V (`vanilla-compiler.mjs --resume`) | S (`setup.mjs run --resume`) |
|---|---|---|
| What is on disk | each turn is announced (`turn-start`) before it runs; the session id is written as soon as the SDK reports it (`session`) | the launcher writes each session's id as soon as it is known (`sdk` in launches.jsonl, kernel change); state.json, launches.jsonl and waves.jsonl as before |
| Clock | `_operator/V/clock.json`: active minutes, a beat every 5 s | `_operator/S/clock.json`, the same |
| On resume | kills what the dead run left (its CLI, by cwd in V's folder; its hidden runner); continues the same SDK session (`resume`), the current wave and round: a turn cut mid-way gets `You were interrupted (the machine restarted). Continue where you left off.`; a turn that ended unscored is scored; a failed turn gets its one retry as before | kills the dead run's launcher, serve, agents (cwd in S's folder), broker and its accept runs, K2 job wrappers; removes a dead holder's state lock and stale git index locks; reports every launch the dead launcher left unfinished as failed (`abandonDead`: `launch finished --ok=false`), so its runs are abandoned, its leases released and serve plans the work again at once; restarts the broker and the observer; continues the current wave's order (or its retro) |
| Sessions | a session the SDK cannot resume (no assistant message, an error) is replaced by a new one given the wave's doc and a note (`session-lost`); a run from before these ledger lines finds its session in the access log | an abandoned launch whose session id is known is reported `--intact=true` (kernel change, `tests/k26-restart.test.mjs`): a warm owner's next item for that order resumes that SDK session (K26); if the resume fails, the launcher falls back to the cold brief, recorded (`warm-fallback`); a session with no warm record starts cold, as after any crash |
| Caps | wall clock on the active clock; cost carried from the ledger (a new session's total adds on) | the same: `--max-min` against the active clock, cost from launches.jsonl |
| Recorded | a `resume` line: downMin, activeMin, wave, round, point (`interrupted`, `retry`, `score`, `send`), session and where it was found, leftovers killed | a `resume` line: downMin, activeMin, wave, the launches abandoned and how each goes on (`warm: resumes <id>` or `cold`), leftovers killed; `wave-resume`; the observer's stage retries in operator.jsonl |
| Finished | an `end` line (or a cap's `stop`, or every wave summed up): `--resume` exits 0 at once | a `run-end` line (or `stop`, or every wave ended) |
| One at a time | `_operator/V/arm.pid`, checked against /proc (cmdline) and the boot id: a second V on the same runs refuses (exit 3) | `_operator/S/arm.pid`, the same |

A restart's stage-error (a K2 job that died with the machine, or an accept that lost the broker) holds an S order until
`supervisor.mjs retry` (K2). The observer now retries those, as the founder, at most 6 times a wave; any other
stage-error stays as before.

**Found and fixed while testing it** (each would have stopped a real S run, restart or not):
- **The launcher could not start twice on one live dir** (kernel, `launch.mjs`). It re-linked `live/kernel/live` with
  `existsSync`, which reads a dangling link as missing; the frozen kernel has no `live/`, so every second launcher
  (the next wave's, a retro's, any restart's) died on EEXIST before serve started, and the observer then cancelled the
  wave. It now checks with `lstat`. A run on an older frozen kernel gets a real `S/proto/live/` folder from the
  harness, so its link resolves.
- **Launcher reports lost to the state lock** (kernel, `launch.mjs`). An integration check runs the visible tests
  under the state lock for up to about 20 s; meta.mjs waits 10 s, so `launch finished` failed and its usage, its
  sessions' close and its warm record were lost (owners went cold on their revise). The launcher now retries
  (6 times, 5 s apart), and so does the harness's `metaCli`; on resume, a launch the launcher finished but the kernel
  never heard of is reported again with its recorded numbers.
- **A unix socket path over 107 bytes is cut short silently.** A runs dir with a long name made the broker listen
  somewhere else, and S died at "the broker did not start". `startBroker` now refuses such a path with a clear error.
  The real runs dir (`<scratchpad>/b8-runs`) is well under the limit.
- **The hidden-run lock after a restart.** A lock left by a dead process whose pid now belongs to another process was
  held for ever. The lock records the boot id too, and a holder is alive only if its pid lives under the same boot.
- `setup.mjs run` now exits when it is done; the broker child had kept the process alive.

**`keepalive.mjs`.** Every 30 s it checks each arm: alive (its arm.pid names a live process of this boot running the
arm's script), finished (its ledger), or neither; neither means (re)start it with `--resume` (on a runs dir where the
arm never started, `--resume` is a fresh start). Each arm runs in its own process group, its output in
`_operator/<arm>/arm.out`; before a restart the dead arm's group is killed if it is of this boot. Each start and
restart is a line in `_operator/<arm>/restarts.jsonl` (`operator: start`, `operator: restart` with downMin from the
arm's last beat, lastBeat, activeMin); an arm that dies within 60 s of its start 5 times in a row, or more than
`--max-restarts` (50) times, is given up (`operator: gave up`). It exits when every arm has finished. It is safe to
start again at any time: `_operator/keepalive.pid` (checked the same way) makes a second copy exit at once, and an
arm already running is never started twice. It does not survive a restart itself: after one, start it again (by
hand, or from a boot hook).

**Tally and audit.** `setup.mjs tally` gives each arm `restarts`: operatorRestarts (keepalive's lines), resumes,
downMin, keepaliveDownMin, activeMin, and what was lost (V: sessionsLost; S: launchesAbandoned, warmResumed,
warmFallbacks, stageRetries, reReported); `tally --md` adds a table. Wave minutes are active minutes (downtime is
out). `setup.mjs audit` carries the same under `restarts`, and audits sessions killed in flight by their `sdk` lines.
`setup.mjs status` shows where each arm stands (started, finished, alive, its clock and restarts).

**Commands** (from `company/sibling/system3-meta/prototype`; the real runs dir is the default `--runs`):

```sh
# fresh start, both arms kept alive (each arm's first start is a fresh run; caps 300 min, $120 each)
node bench8/keepalive.mjs --arms=V,S
# after a machine restart: the same command (it resumes every arm that has not finished)
node bench8/keepalive.mjs --arms=V,S
# by hand, without keepalive: fresh start / resume
node bench8/vanilla-compiler.mjs            # V fresh      node bench8/vanilla-compiler.mjs --resume
node bench8/setup.mjs run                   # S fresh      node bench8/setup.mjs run --resume
node bench8/setup.mjs status                # where each arm stands
```

Arm options go through keepalive as `--v='<V args>'` and `--s='<S args>'`. Running the two arms at once (as
`keepalive --arms=V,S` does) shares the 4 CPUs between them; `--arms=V` and then `--arms=S` keeps the protocol's
one-after-the-other order.

**Checks (2026-10-23, no long session).**
- `node bench8/restart-test.mjs` (no Agent SDK session; about 7 min): both arms on a scratch runs dir under
  keepalive (`--interval=5`), V with its fake agent (`--dry-run --fake=dryrun/stub --fake-sec=45`), S with
  `bench8/fake-sdk` (`setup.mjs run --fake`: the real launcher, serve, broker, accept and hidden runner; each "agent"
  plays its role by the kernel's CLI). It passed:
  - a second keepalive exited at once; a second V and a second S refused while one ran;
  - **machine restart**: with V mid-turn (W1, round 0) and S with launches in flight, every process of the run was
    killed with SIGKILL, keepalive too; 20 s later keepalive was started again by hand. V resumed its session with
    the restart turn (point `interrupted`, downMin 0.36); S abandoned its 4 unfinished launches (all cold: none had
    a warm record yet) and continued W1 (downMin 0.36);
  - **arm crash**: with S's hidden accept in flight (V in W1 round 1), both arms' process groups were killed and
    keepalive restarted both within its interval (downMin 0.02 and 0.09; S abandoned 1 launch);
  - both arms ran W1 and W2 to their end, each wave once; V kept one SDK session through both restarts;
    keepalive's lines: 1 start and 2 restarts per arm; tally: 2 resumes per arm, downtime V 0.38 min, S 0.45 min;
    wall time = active time + downtime within the beat (V 4.45 = 4.07 + 0.38 min, S 6.12 = 5.67 + 0.45).
- V with `--fake-lose-session` after a kill: the resume failed as a gone session does, `session-lost` was recorded,
  a new session got the wave's doc and the note, and the wave ran to its end (tally: sessionsLost 1).
- **One real check** (`node bench8/vanilla-compiler.mjs --resume-check --runs=<scratch>`): a one-turn preflight
  session (V's env and hooks; `ready`, $0.0048), then the restart turn on its id with `resume`: the same session id
  came back and the model answered `ready`, the word of its first turn ($0.0102). Total $0.015. (The resumed turn's
  cost alone does not show whether the CLI restores a session's running total; V's cost logic takes a total that does
  not fall below the session's last as the running total, and adds a new session's.)
- The kernel suite: 322 of 322 (3 new, `tests/k26-restart.test.mjs`). `setup.mjs selftest` 121 of 121;
  `vanilla-compiler.mjs --dry-run`, `setup.mjs run --dry-run` and `dryrun.mjs` pass.

**Known limits.**
- The spend of a turn or launch killed in flight is unknown to both arms (the SDK reports cost at a result). V's
  resumed session may carry it in its running total; S's abandoned launch counts 0. Both caps can be overshot by that
  much per restart.
- A restart costs S its in-flight sessions' context unless they had a warm record (an owner's revise); V always
  resumes its one session. That is how each design keeps its memory, and the tally reports what each lost.
- keepalive itself must be started again after a machine restart.

## S2 (2026-10-23): a second S run after the fixes from S1

**Why.** The founder stopped S1 (arm S, `specs/ccompiler-specialized.json`) at W3. On W1-W2 it matched V's accuracy at
about twice V's cost and much more time. Its logs show four causes: (1) the evaluator ran 25-30 min each time, once
ran past its lease and was relaunched, and held the wave the whole time (about 130 min of evaluator time); (2) the
work did not spread across owners (each wave landed mostly on one module, W3 on semantics), yet every owner and the
architect paid a cold start and the coordination; (3) the K10/K28 guard refused the evaluator's own test file
`g01_empty_braces.c`, a test's `.exit` file and a scratch list as "protected" (the K28 store's root `**` was also
matched against every relative shell-write target), and refused 13 Bash lines it could not read (`T=…/clj-run; $T -m
…`, `python3 - <<'EOF'`, an escaped backtick in a `for` loop); (4) cross-module needs waited for change-request
approval. S1's numbers stay as they are, labelled "stopped by the founder at W3" in the tally.

**What changed (kernel, generic; `tests/k34-k37.test.mjs`, `tests/guard.test.mjs`).**
- K34, a time box: a stage an agent works may set `timebox: {min, findings}`. The launcher caps the session at the
  box, and a lease never outlives it. At the box, code signs the stage with the defect lines (`<category>: what is wrong
  -> what is required`) of the stage's report so far. This happens at the tick's sweep, or when the launch ended at the
  box. A blocking stage with such lines revises; with none it moves on as `timeboxed`, recorded, never a silent pass.
- K35, advisory: `advisory: true` on an independent review stage. When the stage before it passes, the order moves on
  to the next stage and the review is scheduled beside it. Its findings are routed by K30 as work on the same order
  while that order is open: into its parts, or held until its next revise. A done or cancelled order is never
  reopened: its findings go to the next order of its flow, at once if that order is at work, or else to the flow's
  backlog, which that order's delegate takes. K28 counts them where they landed.
- K36, staffing on demand: `activate: "on-demand"` on an owner role. `order delegate --scope=<modules>` staffs the
  owners of those modules. Naming an on-demand owner any other way is refused. Routed work (K30, a carried finding)
  and a borrow review start it anyway.
- K37, borrow: spec `borrow: true | {modules: […]}`. An owner may write another owner's module (never an interface,
  so K32 stays an approval). The guard lets the write through and reports it (`guard` line `borrow`, `meta.mjs guard
  borrow`). The owner's K7 commit includes the borrowed files and records them (`commit.borrowed`). The module's owner
  gets a non-blocking `review-borrow` ask with the diff; a no comes back to it as work.
- Guard fixes: the K28 store root is of kind `store`, judged by its absolute path only. A variable the line sets to
  plain literals is judged with each value it can have there (each literal, plus its environment value or nothing).
  A `for` list of literal words is read the same way. An escaped backtick is a literal. A heredoc fed to an
  interpreter's stdin is judged as program text (the denied spellings anywhere in it). A substitution, `read`, an
  unknown variable as the command, and a denied program body are still refused. `shellCommands`' default parse,
  which V's access hook uses, is unchanged.

**S2's spec** (`specs/ccompiler-specialized-v2.json`, written by `bench8/make-spec-s2.mjs` from S1's) is S1's with
these changes: the flow is build -> accept -> eval -> ship, with eval advisory and time-boxed at 10 min after the
hidden accept (the evaluator writes `tests/eval/<Wn>/EVAL.md` as it goes); the four owners are on demand, and the
architect scopes each order (`--to=architect --scope=…`); the four code modules may be borrowed (the evaluator's
`tests/eval/**` and the interfaces may not); and the K28/K33 learning (store, roles, retros, scoped rules) is kept
unchanged. It validates.

**Harness.** `setup.mjs … --arm=S2` is a fresh second S run in its own folders (`<runs>/S2`, `_operator/S2`, its own
broker socket and shims). It gets the same access hook, caps (300 min, $120), feedback lines and rounds as S and V.
The frozen kernel is copied at its start, so S2 runs this kernel. `status`, `tally` (V, S1 labelled, S2, and each
S run against V per wave), `audit --arm=S2` and `keepalive --arms=S2` (its own `keepalive-S2.pid`, beside V's
keepalive) know it. A spec with an advisory stage runs one launcher across waves: the next wave starts as soon as the
last wave's order has ended and its retro is closed, while the advisory review may still run. At the run's end the
launcher is stopped, and an advisory review still open is recorded (`launcher-stop`). Waves W1-W6 are the default.
W7 is opt-in with the W7 extension's own flag (PROTOCOL.md "W7"): once S2's W1-W6 run has finished, `setup.mjs run
--arm=S2 --extend=W7` continues it into W7 (the next wave's order, W7's own caps).

```sh
node bench8/setup.mjs run --arm=S2                       # fresh S2 (founder's go first)
node bench8/keepalive.mjs --arms=S2                      # or kept alive (beside V's keepalive)
node bench8/keepalive.mjs --arms=S2 --s2='--extend=W7'   # then W7, after S2's W1-W6 finished
node bench8/setup.mjs tally --md                         # V, S1 (stopped at W3), S2
```

**Dry run (2026-10-23, no SDK session, `node bench8/dryrun-s2.mjs`, 11.4 min).** S2 ran W1 -> W2 on a scratch runs dir
with `bench8/fake-sdk` and the real launcher, serve, broker, accept and hidden runner. The stub compiler never passes,
so the dry run's accept passed by flag (`--fake-accept-pass`), and the box was 1 min (`--timebox-min=1`). Every check
passed:
- only scoped owners were launched. W1 was scoped to backend, and its parts were architect and backend; frontend and
  optimizer never started, and semantics started only for its borrow review. W2 was scoped to semantics;
- the evaluator was advisory and time-boxed. W1's history is `build:part, build:part, build:pass, accept:pass,
  ship:pass, eval:advisory(timeboxed)`: the order shipped before the review was handed in. The launcher capped the
  session at 1 min, and code signed it at the box with its report's defect line;
- the late finding was the next wave's work. `W1 calls: …` was routed by K30 to backend as a new part of W2's order,
  W2 having been delegated already, so backend worked W2 although W2's scope was semantics. W1 was never reopened. The
  backlog path (no next order at work yet) is covered by `tests/k34-k37.test.mjs`;
- a borrow. Backend wrote semantics' `src/ccc/sema/lower.clj` in W1: a guard `borrow` line, a `borrow` event, and
  the commit's `borrowed: [semantics]`. Semantics' only W1 session was the review-borrow ask, answered yes;
- the guard no longer refuses S1's false positives. Each fake session asked its own guard about S1's refused lines
  (`printf … > g01_empty_braces.c`, `echo 37 > test/backend/c/stress1.exit`, `T=…; $T -m ccc.main …`,
  `CLJ=…; $CLJ …`), and every one was allowed. The dry run had no guard denials.

Kernel suite 327 of 327 and the export check (leaks [], 317 of 317 there) pass. No real arm was started.


## W7 (2026-10-23): compile real software (Lua 5.4.7), released after W6

**What it is.** A seventh wave, opt-in, for an arm that has finished its W1-W6 run: the arm's compiler must build the
Lua 5.4.7 interpreter (github.com/lua/lua, tag v5.4.7, commit `1ab3208a1fceb12fca8f24ba57d6e13c5bff15e3`; lua.org is
blocked here) from its 33 unmodified sources, and the wave is scored by what that interpreter does on Lua's own test
suite (`testes/` at the same tag). `spec/W7.md` is the arm-facing scope. Nothing about W1-W6 changes: the live runs'
processes run the files they started with, and every W7 path is behind `--extend=W7` (or `--waves=…,W7`).

**Design decisions.**
- **Headers: a curated set, the same for both arms** (`spec/w7/include/`, 21 headers: the 8 of W1-W6 extended, plus
  `assert ctype errno float locale math setjmp signal time unistd sys/types sys/wait`), with glibc's x86-64 types and
  layouts (`jmp_buf` 200 bytes, `struct sigaction` 152, `struct tm` 56, glibc's `struct lconv`, `errno` through
  `__errno_location`, `stdin`/`stdout`/`stderr` as variables) and no GNU extension. Not the system's glibc headers:
  those need `sys/cdefs.h`, `__asm__` renames, `__extension__`, `_Float128`, `#include_next` and the compiler's own
  `stddef.h`/`stdarg.h`/`float.h` (which glibc does not ship), a preprocessor and GNU-C project of its own that says
  nothing about compiling Lua and ties the score to the host's glibc. gcc -O0 builds Lua with exactly this set
  (`-nostdinc`) and passes every scored test.
- **Build:** `-I spec/w7/include -I spec/w7/lua -D LUA_COMPAT_5_3 -D LUA_USE_POSIX` (Lua's `LUA_USE_LINUX` without
  `dlopen` and readline; `LUA_COMPAT_5_3` as Lua's makefile), one `--batch` of the 33 sources, `gcc *.s -o lua -lm`
  (`spec/w7/build.json`). The driver gains `-D NAME[=VALUE]` in W7 (W1-W6's tests never pass it).
- **Correctness:** the files all.lua runs, each as one test, driven by `w7test.lua full <file>` (all.lua's Linux
  defaults: `_soft` and `_port` false; dump/undump as all.lua's dofile), in a fresh copy of the suite's directory,
  empty stdin pipe (`files.lua` checks an illegal seek on stdin, which `/dev/null` does not give), limit max(30 s,
  20 × gcc -O0). `main.lua` is left out (C modules through `dlopen`, `lua` on PATH); `gc.lua` goes through dump/undump
  like the others (run directly, its weak-table memory check depends on the string table's size at that moment and
  failed in the driver every time). 28 files; 6 visible (`closure vararg literals nextvar sort bitwise`), 22 hidden;
  categories `W7 language` (8 hidden), `libraries` (5), `runtime` (7), `io-os` (2). A sanity check first (a fixed line
  printed, `assert(1 == 2)` must fail) keeps a broken interpreter from passing by accident.
- **Runtime:** 6 Lua programs (`spec/w7/bench`: fib, nbody, spectral, bintrees, fannkuch, strops), 0.4-1.0 s each on
  gcc -O0's Lua; the runner times hidden variants (other constants), the arm's Lua and gcc -O0's interleaved, 5 reps,
  medians, failure = 20; score = geometric mean. gcc -O2's Lua (every rep) and chibicc's Lua (one rep) are timed beside
  them as references (`hidden/w7/ref/`, built once by `material/build-w7.mjs`).
- **Compile time:** the batch's wall time and the largest process's peak RSS (python3's `RUSAGE_CHILDREN` inside the
  compile sandbox), beside gcc -O0's and chibicc's (serial, one process per file; `hidden/w7/ref/compile.json`).
- **Regressions:** the W7 run first runs `run-hidden.mjs --wave=W5` on the same dir: the hidden W1-W5 tests stay in
  scope, as in every wave; no W6 re-timing and no W6 gate.
- **Feedback:** the failing category lines (W1-W5 and W7), then the `W7 build`, `W7 bench`, `W7 runtime score` and
  `W7 compile` lines, sent only when something fails (as W6). Numbers and categories only; the build line counts
  sources, never names them (the arm has every source and can find a failing one itself).
- **Rounds and caps:** 3 feedback rounds, as every wave; **W7's own caps: 180 active minutes and $80**, counted from
  W7's start (the `extend` line: the arm's active minutes and cost at that moment), whatever W1-W6 used. Both caps
  scale the run's 300 min / $120 for six waves to a wave about as large as W4-W6 together.
- **S's routes:** W7's categories name Lua's features, not compiler modules: no K30 route matches `w7-*`, so every W7
  line goes to the architect's triage (the order's accept text says so). P8-7 (routing) is scored on W1-W6 only.
- **No GCC oracle tool.** A mixed-build tool (Lua sources split between gcc -O0 and the arm's compiler, for
  bisecting a miscompiled file) was proposed during the build and set aside by the founder before it was built: W7 has
  no such tool, and the arms bisect with their own compiler only.

**Harness (all W7-only):**

| | |
|---|---|
| `run-hidden-w7.mjs` | the W7 hidden runner (installed as `<b8>/run-hidden-w7.mjs`; the same sandbox as `run-hidden.mjs`); operator-only `--no-w15`, `--cmd`, `--cmd-unboxed`, `--no-refs` |
| `w7.mjs` | release files, the hidden-run wrapper (feedback lines), `extStatus` (where an arm stands in W7), the caps' base, the accept text, the tally's W7 fields |
| `setup.mjs` | lazy hooks only (W7 paths `require` w7.mjs): `releaseFiles`, `hidden`, `waveAccept`, `sPlace` (W7 follows the last placed wave), the broker (`W[1-7]`), `sAccept` (logs `w7`), `run --extend=W7` (W7's caps from the `extend` row; visible-check.mjs and w7.mjs copied into the frozen harness; an open W6 learn step's retro runs first, in W7's budget), tally (W7 rows: Lua tests %, runtime score, compile s, RSS), status (`w7`), the audit's canaries (hidden W7 test lines) |
| `vanilla-compiler.mjs` | `--extend=W7`: refuses unless W1-W6 finished; the same session's next turn; W7's prompt; W7's caps; the `extend` line; `w7` in hidden lines |
| `visible-check.mjs` | `--wave=W7`: the visible W1-W5 tests, then Lua built with the compiler and the 6 visible W7 files (`W7 <category>`), regressions as before |
| `keepalive.mjs` | an arm whose args carry `--extend=W7` is finished when its W7 has ended |
| `material/build-w7.mjs` | clones Lua at the tag, lays out `spec/w7`, `visible/W7`, `hidden/w7` (tests, bench variants, manifest, ref builds, compile.json) and installs the runner |

**Validation (2026-10-23, all with `nice -n 19`, beside the live run).**
- gcc -O0 with the curated headers: 33 of 33 compile with `-Wall` and no implicit declaration; 28 of 28 test files
  pass 3 times in a row in `full` mode (`dropped: []`). Slowest: `errors.lua` 10.2 s, `constructs.lua` 4.7 s.
- **The runner with gcc -O0 as the "arm"** (`--cmd-unboxed`, `--no-w15`): 22 of 22 hidden, build ok, runtime score
  1.016 (noise of the interleaving under load: per program 0.95-1.17), gcc -O2's Lua 0.490, chibicc's Lua 6.672;
  compile 3.1 s, 46 MB.
- **chibicc** (boxed, `validation/chibicc/chibicc-wrap-w7.sh`, which passes `-D` attached): it builds Lua (33 of 33,
  link ok) and **passes 22 of 22 hidden** (and 28 of 28): W7 is solvable by a small compiler. Its Lua is slow:
  **runtime score 6.17** (bintrees 4.1, strops 3.6, fannkuch 6.8, fib 7.1, nbody 8.3, spectral 9.4; on W6's C programs
  it was 2.42: an interpreter's dispatch loop and its `double`/`TValue` traffic are what a stack-machine code
  generator does worst). Compile 1.7 s, 103 MB.
- **The pilot compiler** (`b8-pilot`, W1-W3, no preprocessor): 0 of 33 sources compile, every W7 test and benchmark
  fails (score 20), as expected.
- `vanilla-compiler.mjs --dry-run --fake=dryrun/stub` on a scratch runs dir: W1, then `--extend=W7 --resume`: the
  `extend` line (caps 180 min, $80), the same fake session, W7's release (105 files), two W7 hidden runs (1153 tests:
  1131 W1-W5 + 22 W7; the stub's Lua does not link), the wave summary; `--resume` again exits `W7 ran`; `keepalive
  --v='--extend=W7' --once` reads V as finished; tally's W7 row. `setup.mjs run --fake` W1, then `--extend=W7 --resume
  --max-rounds=0`: the `extend` row, W7 placed after the cancelled W1 order, the owners' hand-ins, the W7 integration
  checks, the W7 accept (the W7 runner through the broker), its `w7` field, the order ended at its rounds; tally's W7
  row. `setup.mjs selftest` passes; the access rule allows W7's link (`gcc *.s -o lua -lm`), the batch with `-D` and
  running the interpreter, and refuses `gcc` on Lua's `.c` files; the gcc shim links with `-lm`.
- One W7 hidden run on a working compiler takes about 6-10 minutes (W1-W5 2-4 min, the build, the tests in parallel,
  the benchmarks about 2-3 min) and counts in the arm's active time, as every hidden run.

**Commands (after an arm's W1-W6 run has finished; from `company/sibling/system3-meta/prototype`).**

```sh
node bench8/setup.mjs status                                   # each arm's `w7` and whether W1-W6 finished
# V: the next turn of its one session
node bench8/keepalive.mjs --arms=V --v='--extend=W7'           # or by hand: node bench8/vanilla-compiler.mjs --resume --extend=W7
# S2 (and S, were it finished): the next wave's order
node bench8/keepalive.mjs --arms=S2 --s2='--extend=W7'         # or by hand: node bench8/setup.mjs run --resume --arm=S2 --extend=W7
node bench8/setup.mjs tally --md                               # W7 rows: Lua tests %, runtime score, compile s, RSS
```

After a machine restart, the same keepalive command resumes W7 (the `extend` row is the W7 run's start).
