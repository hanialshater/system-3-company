# Benchmark 8: predictions, committed before any run (v2, after the pilot)

owner: vp-meta · date: 2026-10-23 · scored by `setup.mjs tally` and `setup.mjs audit`, with the measures defined in
[PROTOCOL.md](PROTOCOL.md) · status: **v2, re-committed before any arm has run.** v1 (commit f464ecd4f) is replaced:
the pilot changed what the benchmark can show, so the predictions say so.

## What the pilot taught (one careful workflow agent, W1-W3, 2026-10-23)

- **W1-W3 are near the ceiling for one capable agent.** It reached 96.4% of the hidden W1-W3 tests (239 of 248) at the
  end of W3, in about 55 tool calls, against a target of under 80%. Most of the 9 failures were not its compiler's
  fault: 4 were a tagger bug (GNU `__builtin_types_compatible_p` tests tagged W1 and W3), now fixed (those tests are W5
  `gnu`). Re-scored on v2, the pilot's W3 compiler passes 236 of 241 hidden W1-W3 tests (97.9%). So **W1-W3 will not
  separate the arms on pass rate.** They are the codebase's foundation, and they separate the arms only on cost and
  time.
- **The same W3 compiler, with no preprocessor, already passes 537 of 820 hidden W5 tests** (65%): most torture tests
  need little beyond W1-W3. What it misses is the breadth: W4 entirely, floating (6 of 87 pass), GNU C (59 of 117),
  storage, bitwise, casts. chibicc, a mature compiler, passes 86% of all hidden tests and 46% of `W5 gnu`.
- **So the signal has to come from W4-W6, made harder within the plan:**
  - more torture tests in scope: GNU C (a new `W5 gnu` category: statement expressions, `typeof`, attributes, case
    ranges, computed goto, the common builtins), variable-length arrays (`W5 vla`), K&R definitions (W1) and gcc's
    predefined type and limit macros (W4);
  - the UB screen (PROTOCOL.md v2) removed the tests whose output depended on stack contents or depth;
  - the W6 score stays continuous (geometric mean against gcc -O0, chibicc 2.42), and it is a headline measure below.
- **The pilot's spec questions are answered in the wave docs** (K&R and `extern` prototypes in W1, VLA parameters in
  W5, C11 anonymous members in W3, `long double` out with a reason, the GNU list in W5).

## The bet (unchanged)

S is a specialized org: an architect who owns the interfaces, four module owners on one worktree at once, an
adversarial evaluator, failures routed to their owners, a playbook per module. V is one capable agent in one long
session. The bet: specialization costs S time and money early, and pays back where the work is broad (W5: eleven
categories across the frontend, semantics and backend) and deep (W6: an optimizer with nothing else to do).

**Headline measures** (stated now, so the write-up cannot pick them later):
1. the **final W5 hidden pass rate** (all hidden W1-W5 tests after W5's last round);
2. the **final W6 score** (lower is better), with the regression gate;
3. **total cost** (each SDK session counted once).

## Predictions

| # | Measure | Prediction | Wrong if |
|---|---|---|---|
| P8-0 | **Ceiling (the pilot's finding, kept honest)** | both arms' final W3 hidden pass rate (W1-W3 tests) is ≥ 90% | either arm < 90% |
| P8-1 | **Early cost and time** | S trails V on W1 and W2: S's cost and minutes are higher on each of W1 and W2 | S's cost ≤ V's on W1 and on W2, or S's minutes ≤ V's on both |
| P8-2 | **Difficulty where it now lives** | the better arm's **first-hand-in** W5 hidden pass rate (W1-W5 tests) is below 85%, and its W5 `gnu` + `vla` categories together fail at least 15% at the first hand-in | either is not so (the raise did not bite) |
| P8-3 | **First hand-in, W4 to W6** | S's first-hand-in hidden pass rate ≥ V's on at least 2 of W4, W5, W6 | S < V on 2 or more of them |
| P8-4 | **Final W5 (headline 1)** | S's final W5 hidden pass rate ≥ V's | S's is lower by more than 1 point |
| P8-5 | **W6 score (headline 2)** | S's final W6 score is lower (better) than V's, with S's gate at no more regressions than V's | S's score ≥ V's, or S's gate shows more regressions |
| P8-6 | **Total cost (headline 3)** | S's total cost ≤ 2 × V's | S > 2 × V |
| P8-7 | **Routing works** | in every S wave with a revise, at least 80% of the revise's categories reach an owner by a route (not triage), and the architect routes on or handles every triaged one | < 80% in any wave, or a triaged category left unhandled |
| P8-8 | **Ownership holds** | 0 S commits change another owner's paths without an approved change request, and at least 1 change request is raised and decided across the run | any such commit, or no change request in six waves |
| P8-9 | **Per-module knowledge** | for each module that gains rules, its failing fraction at the first hand-in falls from the wave where the rules were added to the next by more than V's fraction on the same routes falls | in more than half of the modules with rules, S's fall is ≤ V's (or S's fraction rises) |
| P8-10 | **Clean run** | the audit is clean for both arms: every session ran under the hook, every transcript was found, no hidden-test text reached a session, no shim refused a C compile, and the egress proxy refused nothing | any leak, a session without hook lines or a transcript, a refused C compile, or a refused egress request (an attempt counts) |
| P8-11 | **Caps** | at least one arm ends a wave because of the run's caps (300 min or $120): S more likely than V | neither arm reaches a cap (then the caps were not the binding limit, and the comparison is unconstrained) |

## The operator's prior (stated so the result can surprise)

Guesses with confidences, made before any run. They do not change the predictions above.

- **P8-0 (ceiling): 85%.** The pilot did it alone, quickly. S's risk is integration friction on the first wave, not
  skill.
- **P8-1 (S trails early): 85%** (was 75%). The pilot showed W1 is one agent's ~15 tool calls; S pays five roles and an
  evaluator for it.
- **P8-2 (difficulty bites): 55%.** chibicc passes 86% of all hidden tests on v2 (82% of W5's own) and only 46% of
  `W5 gnu`; a first W5 hand-in written in one wave should land near or below it. Against: the pilot's W3 compiler
  already passes 65% of W5 with no preprocessor, so a strong arm can start W5 high.
- **P8-3 (S's first hand-in from W4): 45%.** The evaluator should catch defects before the hidden run, but V gets the
  same feedback rounds and keeps its whole context.
- **P8-4 (final W5): 45%** (was 50%). With three rounds both arms climb; V's single context sees every category's
  line at once, while S splits them across owners who start each wave cold.
- **P8-5 (W6): 55%.** A dedicated optimizer that joins at W5 should win, unless S's interfaces (a fixed IR) make
  register allocation harder than V's free hand, or the gate catches S's optimizer breaking something.
- **P8-6 (cost ≤ 2× V): 40%** (was 50%). Benchmark 6 measured Meta at 2.3× a single agent, and the pilot shows the
  early waves are cheap for one agent, which raises S's ratio there.
- **P8-9 (knowledge): 35%.** Six waves is a short horizon.
- **P8-10 (clean): 75%.** The box makes a leak very unlikely; the likeliest failure is an attempt (a `gcc` on a `.c`
  file, or a `curl`) that the box refuses and the audit then counts.
- **P8-11 (caps bind): 55%.** S runs many sessions; W5 is large.

## W7 predictions (2026-10-23, committed before any arm runs W7)

W7 (PROTOCOL.md "W7", spec/W7.md): the arm's compiler builds Lua 5.4.7 and is scored on 22 hidden files of Lua's own
test suite, the runtime of 6 Lua programs against gcc -O0's Lua, and the compile time; 3 feedback rounds, its own
caps (180 active min, $80). References measured before any arm: chibicc passes 22 of 22 with a runtime score of 6.17;
gcc -O0 compiles the 33 sources in 3.0 s at 46 MB.

| # | Measure | Prediction | Wrong if |
|---|---|---|---|
| P8-W7-1 | **Difficulty** | both arms' final W7 pass rate on the 22 hidden Lua test files is below 90% within W7's caps | either arm ≥ 90% (20 or more of 22) |
| P8-W7-2 | **The first build** | at the first hand-in, at least one arm's Lua fails to build or link, or passes fewer than half of the hidden files | both arms build Lua and pass ≥ 11 of 22 at their first hand-in |
| P8-W7-3 | **Specialization pays more on W7** | S's (S2's) advantage over V is larger on W7 than on W1-W6: (S − V) on the final W7 Lua-test pass rate exceeds (S − V) on the final W5 hidden pass rate (headline 1) | S − V on W7 ≤ S − V on W5 |
| P8-W7-4 | **Runtime** | each arm whose Lua builds and passes the sanity check has a W7 runtime score between 1.0 and chibicc's 6.17; the arm with the better final W6 score also has the better W7 runtime score | an arm with a working Lua scores ≥ 6.17 or < 1.0, or the W6 order of the arms flips on W7 |
| P8-W7-5 | **Compile time** | both arms' batch over the 33 sources takes ≥ 5× gcc -O0's 3.0 s (≥ 15 s) with a peak RSS ≥ 300 MB (one JVM) | either arm is faster than 15 s or under 300 MB |
| P8-W7-6 | **Caps** | at least one arm ends W7 on its caps (180 min or $80) or its 3 rounds with a Lua-test failure left | both arms pass every hidden Lua test before their caps and rounds |
| P8-W7-7 | **Cost on W7** | S's W7 cost ≤ 2× V's W7 cost | S > 2× V on W7 |

**The operator's prior.** P8-W7-1: 70% (Lua is ~20k lines of real C; the suite exercises setjmp/longjmp error
paths, coroutines, the GC under stress, string formatting of floats; 180 minutes is short). P8-W7-2: 80%. P8-W7-3:
40% (the work is one long debugging loop on one program, which favours V's single context; S's lever is parallel
owners on independent miscompilations once Lua links, and its evaluator; every W7 line reaches S through the
architect's triage, an extra hop). P8-W7-4: 55%. P8-W7-5: 75% (the JVM's start and Clojure's load alone are ~2-4 s;
a tree-walking compiler written for tests of a few dozen lines meets `lvm.c` and `lparser.c`). P8-W7-6: 75%.
P8-W7-7: 45%.
