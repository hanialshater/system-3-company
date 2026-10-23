# Benchmark 9: run protocol (make the compiler compile fast: one agent, a population, an org)

owner: vp-meta · date: 2026-10-23 · status: **v1, written before any run; no harness built yet.** Running starts Agent SDK
sessions, so it starts after Benchmark 8 is written up (the founder, 2026-10-23: "go after B8").
founder decisions: compile-time optimization on Lua (2026-10-23: "why not lua compile time optimization?"); **no
native image** (2026-10-23).
predictions: [PREDICTIONS.md](PREDICTIONS.md), committed before any arm runs.

## The question

Benchmark 8 asked whether an org beats one agent at **building** to a strict referee. It did not (BENCH8.md). The
research agenda (RESEARCH-AGENDA.md, Q3 and H3) says the multi-agent side's strongest ground is somewhere else:
**open optimization with a computable score**, where many diverse attempts plus an automatic judge find what one line
of attack misses (AlphaEvolve, FunSearch). Benchmark 9 tests that directly, with three arms that start from the same
code:

| Arm | What it is | Tests |
|---|---|---|
| **V** | one strong agent, one long session (as B8's V) | the baseline |
| **P** | a **population**: code (no LLM manager) runs generations of independent variant sessions, each from a parent and a distinct strategy brief; the judge scores every hand-in; the best survive and are recombined | H3: diversity plus a judge |
| **S** | the **org**: System 3 Meta with module owners (S2's shape), the optimizer's work split by module, K38 playbook beliefs | the org on its home ground |

## The task

Every arm gets **V's final Benchmark 8 compiler** (`<runs>/V`, commit `5a10774`, 6.3k lines of Clojure; W1-W7 done,
hidden W1-W5 99.6%, Lua 22/22): the same tree, byte for byte, in its own git repo. The job is to make it **compile
faster** without breaking it.

- **Primary score (lower is better):** the geometric mean of two ratios against the starting compiler, each the median
  of 5 interleaved timings (the arm's compiler and the start, alternately, one at a time):
  1. **Lua:** the wall time of the 33 Lua 5.4.7 sources in one batch (one JVM), spec/W7.md's build exactly. The start
     takes about 11.3 s (gcc -O0 3.1 s, chibicc 1.7 s).
  2. **Held-out corpus:** the wall time of one batch over the hidden W1-W5 test programs the start compiles correctly
     (about 1,126 small files). No arm sees these files.
- **Gate (a candidate that fails it scores 1.0, no credit):**
  - the hidden W1-W5 tests: every test the start passes still passes (0 regressions);
  - Lua: builds, passes the sanity check, and passes all 22 hidden Lua test files;
  - the W7 runtime score of the generated code is at most 1.10 × the start's (0.725, so ≤ 0.80);
  - the compile's peak RSS is at most 1.10 × the start's (277 MB, so ≤ 305 MB).
- **Secondary, reported beside the score:** each ratio alone (to see whether an arm tuned to Lua, which it can see, at
  the expense of the held-out corpus), peak RSS, runtime score.

## Rules (the same for every arm)

- **The command is fixed.** The judge runs `clj-run -m ccc.main …` (B8's toolchain: Clojure 1.12.6 on the JVM, fixed
  flags `-Xss64m -Xmx2g -XX:+UseSerialGC`, classpath = the jars + `src`). So: **no native image** (founder), no JVM
  flags, no AOT, no `.class` files, no jars, no other launcher. The judge refuses a tree whose `src/` holds anything but
  `.clj`, `.cljc` and `.edn` files.
- **No caching across runs.** The judge copies the arm's committed tree to a fresh read-only directory, with an empty
  HOME and TMPDIR, for every timing. Nothing written by one compile survives to the next.
- **No special cases.** As CONTRACT.md section 4: the compiler may not recognise Lua's sources (names, text, hashes)
  or any input, and may not emit code that was not derived from its input. The held-out corpus is the check that the
  speed is general; the audit greps `src/` for Lua's file names and for hashing of inputs.
- **Same toolbox as B8.** Bash, Read, Write, Edit, Glob, Grep; B8's access rule and hooks (no C compiler on C, no
  network, no nested session); `settingSources: []`; effort high; the same model for every session of every arm.
- **Feedback:** each arm may run the **fast judge** (`judge.mjs fast`) as often as it likes inside its minutes: the
  visible W1-W5 tests, Lua's build, sanity and 6 visible Lua test files, and the two timings (3 interleaved
  repetitions; the corpus timing uses the *visible* tests, never the hidden ones). It prints only pass/fail counts and
  ratios. The **full judge** (the gate on hidden tests, 5 repetitions) runs only on hand-ins: V's and S's at most 3
  times (as B8's rounds), and each P generation's survivors, counted against P's 3 + one per generation (below).

## Arms in detail

**V.** `vanilla-compiler.mjs`'s shape, a new task prompt: one Agent SDK session for the whole run, resumed for every
turn; the fast judge as a command; it hands in when it wants the full judge; at most 3 full-judge rounds.

**P (new driver, `population.mjs`, code only).**
- **Generation 0:** K = 4 variant sessions from the start, each with a **different strategy brief** (the diversity
  rule): (1) startup and namespace load (what Clojure compiles at every start: 6.3k lines of source, reflection, spec);
  (2) the lexer and preprocessor (strings, regexes, sequences); (3) the parser, semantic passes and data structures
  (persistent vs transient, laziness); (4) code generation and output (string building, I/O).
- **Each variant** is a fresh vanilla session (the same tools and rules as V) with a fixed budget (cost and minutes),
  its parent's tree, its brief, and the parent's and the generation's best scores. It runs the fast judge itself and
  hands in once.
- **Selection (code):** every hand-in is scored by the fast judge serially; the best 2 that pass the fast gate
  survive. **Generation n+1:** 2 mutations of the best (briefs rotated so no direction repeats twice in a row) and 2
  crossovers (one session given both survivors' diffs against the start, asked to merge them). Elitism: the best so
  far is kept unchanged.
- **Full judge:** each generation's best goes to the full judge; a candidate that fails the gate is dropped and its
  parent kept. P stops at its caps; its result is its best gated candidate.
- No manager session: briefs, selection and recombination are code. Lineage (parent, brief, score) is logged.

**S.** Meta with `specs/compiler-speed-s9.json` (`bench9/make-spec-s9.mjs`, from S2's spec), run by B8's harness as
arm S9: modules that follow the start's layout (frontend: lexer and preprocessor; parser: parser, types, lowering;
backend: code generation; the architect owns the driver and the shared types, which is where load time lives), owners
on demand with K36/K37 (activation, borrow), the advisory evaluator hunting for what the speed work broke, the visible
check of waves 1-5 and Lua as the integration check, and the full judge as the accept stage. **Three orders (B9a,
B9b, B9c), one full-judge round each**, so S gets the same 3 rounds as V and the architect's retro (K28/K33 with K38
beliefs) runs between them, and its rules are scored on the next order.

All three arms read the same task text ([B9.md](B9.md): V's and P's prompts quote it, S gets it as spec/B9.md).

## Fairness

| | Every arm |
|---|---|
| Start | the same tree (V's B8 compiler at `5a10774`), its own git repo |
| Caps | **$70 and 240 active minutes** each (downtime excluded, as B8's keepalive) |
| Machine | **the arms run one after another, not at once**, so no arm's timings are measured while another arm builds (4 CPUs). Inside an arm, its own parallel sessions do share the machine: that is a real cost of parallelism and is reported (in-loop vs final timings) |
| Final score | after all three arms stop, every arm's final candidate and the start are timed again on a **quiet machine** (nothing else running), 5 interleaved repetitions, and gated on the full hidden suite. This is the score that counts |
| Order | V, then P, then S (fixed before any run, so it cannot be picked after); each arm's in-loop judge timings are interleaved with the start, so drift between arms cancels in the ratios |

## Measures

1. **Final score** (headline): per arm, with the gate result.
2. **Score against spend:** the best gated score after every $10 (curves).
3. **Lua ratio vs corpus ratio:** the overfitting check.
4. **P's lineage:** which briefs the winner descends from; how often crossover beat both parents.
5. **S's coordination share:** cost of the architect and the evaluator over the total; K38 beliefs at the end.
6. **Gate failures:** how many hand-ins broke correctness, per arm.
7. **Noise:** in-loop ratio vs the quiet final ratio for the same candidate.

## Time and cost, estimated before any run

Prep: the judge (fast and full, interleaved timing, the tree check), P's driver, S's spec, a dry run with the fake SDK
and a pilot of the judge on the start: about 2-3 h. Runs: 3 × up to 240 active minutes, one after another, plus the
quiet final scoring (about 1 h): about 14 h of wall clock, about $210 at most.

## Harness check (2026-10-23, before any session)

- `run.mjs setup`: the start is B8 V's tree at `5a10774`; the start's last hidden W7 results (B8 V `W7-4`), runtime
  score 0.725, peak RSS 277 MB, Lua compile 11.3 s; 391 visible corpus files.
- The access rule from a variant's root: the fast judge allowed; writes in its own tree allowed; another variant's tree,
  the start and the judge's config refused; the toolchain read-only.
- `timing.mjs` smoke run (the start against itself, Lua, 1 repetition, while S2 built Lua on the same 4 CPUs):
  16.9 s against 19.6 s, a ratio of 0.86 for identical trees. **Timings under load are noisy by ±15% or more**, which
  is why the protocol interleaves, uses medians of 3 (fast) or 5 (full), runs the arms one after another, and scores
  on a quiet machine at the end.

## Known limits

- One task, one model family. A population of the same model is less diverse than one with several models; the book
  review recommends a cross-model arm, left for later (P2).
- The start is V's own code, which V knows nothing about in this run (a fresh session), but which P and S also know
  nothing about. The start is the same for all.
- The JVM's start and Clojure's load are a floor no arm can remove under these rules (about 1-2 s per batch), so the
  achievable gain is bounded; the held-out corpus (many small files in one batch) and Lua (33 large ones) weight
  that floor differently.
