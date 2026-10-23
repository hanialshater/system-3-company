# Benchmark 8: the material (a C-subset compiler in Clojure, 6 waves)

owner: vp-meta · date: 2026-10-23 · status: **the material is built and validated, and the arms' harness is built
and dry-run (PROTOCOL.md: V is `vanilla-compiler.mjs`, S is `setup.mjs run` with specs/ccompiler-specialized.json;
predictions in PREDICTIONS.md). No arm has run.**

## What this is

The task both arms get: write a compiler for a subset of C **in Clojure**. It emits x86-64 GNU as assembly, which
`gcc out.s -o prog` assembles and links. The work comes in six waves on one growing codebase:

| Wave | Scope |
|---|---|
| W1 | ints, expressions, locals, control flow, functions, recursion |
| W2 | pointers, arrays, strings, globals, char |
| W3 | structs, unions, typedef, enums, sizeof, initializers |
| W4 | the preprocessor (#include of the provided headers, #define, #if, # and ##) and varargs |
| W5 | the rest of common C, including floats |
| W6 | optimization: runtime against gcc -O0, gated on no regressions |

Every arm gets the same toolchain, contract, wave specs, headers, visible tests and benchmark programs. Each arm
then runs the same hidden runner.

## Layout of `<b8>`

`<b8>` is `/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8`, or `B8_HOME`.

| Path | Who sees it | What |
|---|---|---|
| `toolchain/clj-run`, `toolchain/lib/*.jar`, `VERSIONS.md` | both arms | Clojure 1.12.6 + spec.alpha 0.5.238 + core.specs.alpha 0.4.74 from Maven Central, sha256-checked; the one way to run Clojure |
| `spec/CONTRACT.md`, `spec/W1.md` … `W6.md` | both arms | the contract and each wave's exact scope |
| `spec/include/*.h` | both arms | the 8 provided headers |
| `spec/bench/*.c`, `*.expected` | both arms | W6's 8 benchmark programs |
| `visible/Wn/` | both arms | about 25% of each wave's tests: `.c`, `.expected` (stdout), `.exit`, `manifest.json` |
| `run-hidden.mjs` | the harness only | the hidden runner, a copy of `bench8/run-hidden.mjs` |
| `hidden/` | never an arm | `tests/` (all tests and expected outputs), `manifest.json` (wave, category, features, origin per test), `bench/` (the hidden benchmark variants), `upstream/` (the clones), `build-report.json`, `validation/` |

## Rebuilding it from this repository

```sh
cd bench8/material
node install.mjs          # toolchain + jars (sha256), spec, visible/README.md, run-hidden.mjs, upstream at pinned commits
node build-tests.mjs      # about 6.5 min on 4 CPUs
node build-bench.mjs      # the benchmark expected outputs and the hidden variants
node validate.mjs         # independent re-check of every test (--spot=K prints K tests per wave for a tagging check)
```

**Pinned upstream commits:**
- c-testsuite `5c7275656d751de0e68b2d340a95b5681858ed07`
- rui314/chibicc `90d1f7f199cc55b13c7fdb5839d1409806633fdb`
- gcc-mirror/gcc `6382527abc778ecbfedb8a85ddcc502cd97ddee9`, a sparse, shallow checkout of
  `gcc/testsuite/gcc.c-torture/execute`

**Reproducibility, checked.** A fresh `install.mjs` into an empty dir, then both builds, gave the same 1281 tests:
- the same ids, waves, categories, expected-output sha256s, exit codes and visible/hidden split;
- byte-identical sources;
- byte-identical benchmark variants.

## How the tests are made (`material/`)

**Sources:**
- c-testsuite `tests/single-exec`: 220 programs.
- gcc `gcc.c-torture/execute`, top level: 1,699 files.
- chibicc `test/*.c`, adapted (`chibicc.mjs`):
  - Each `ASSERT(x, y)` in main is one unit: `check(id, x, (y));`.
  - A GNU statement expression that is the whole second argument, `ASSERT(x, ({ S…; e; }))`, becomes the block
    `{ S… check(id, x, (e)); }`, which has the same scoping.
  - `test.h` becomes a W1-level prelude (`check()` on printf and exit).
  - `test/common`'s definitions are added only where a unit names them.
  - The top-level items a unit needs are found by identifier closure over clang's declared names.
  - Units that pass are grouped by (file, wave, category), up to 8 per program, and the group is checked again.
  - macro.c gets file-specific patches: its quoted includes become the macros those headers define, `__FILE__`
    becomes the expected path, GNU named variadic macros and implementation macros are removed, and a redefinition
    gets an `#undef` first.

**Mechanical normalization of torture tests.** Optimizer attributes with no effect on semantics
(`__attribute__((noinline, noclone, …))`) are removed. `__builtin_abort`, `__builtin_memcpy` and the other libc
spellings become the plain names, with a standard prototype first. Whatever survives must still pass every filter
below, so no builtin or extension remains.

**The main wrapper.** Most upstream tests print nothing and exit 0, so a compiler that emits
`main: xor %eax,%eax; ret` would pass about 75% of W1. So a test whose main takes no parameters (1,257 of 1,281):
- has main renamed to `b8_main`, with `return 0;` added before its closing brace (main's implicit return 0 does not
  hold for other functions);
- gets a wrapper main that prints `b8: start` and `b8: end` around the call.

Measured with the null compiler (`validation/stub`): 17 of 951 hidden tests pass (1.8%), against 47 of 63 W1 tests
before the wrapper.

**Every kept program passes all of these:**
1. gcc and clang accept it with `-std=c11 -pedantic-errors` plus errors for implicit declarations, implicit int,
   int conversion and incompatible pointers, using only the provided headers (`-nostdinc -I spec/include`).
2. The feature tagger (`tagger.mjs`) finds nothing out of scope. It works on clang's JSON AST of the test's own
   top-level declarations, never the headers', plus its preprocessor lines.
3. It is built five ways: gcc -O0, gcc -O2, clang -O0, clang -O2, and gcc -O0 with ASan+UBSan.
   - All five must agree on stdout and exit status, exit without a signal, and print under 64 KB.
   - gcc -O0 must run it in under 1.5 s.
   - The per-test time limit is 30 × gcc -O0's time, at least 3 s and at most 30 s.

**The tagger:**
- A test's first wave is the highest wave of any feature it uses.
- Its category is the first feature, in that wave's order (`CATEGORY_ORDER`), that it uses.
- Function prototypes are not tagged, so `int printf(const char *, ...);` is fine in W1. A string literal passed
  straight to a call is W1.
- The out-of-scope list is in W5.md.

**The split.** Each (wave, category) is sorted by a hash of the origin, and every 4th test is visible. Test ids are
anonymous (`w3-0042`): the upstream origin is only in `hidden/manifest.json`.

## Counts (visible / hidden)

| Wave | Visible | Hidden | Total | By source (c-testsuite / chibicc / torture) | Categories, visible/hidden |
|---|---|---|---|---|---|
| W1 | 22 | 63 | 85 | 25 / 22 / 38 | functions 15/45, control 5/12, expressions 2/6 |
| W2 | 27 | 75 | 102 | 22 / 20 / 60 | globals 9/26, char 6/15, arrays 5/14, pointers 4/12, strings 3/8 |
| W3 | 39 | 110 | 149 | 32 / 50 / 67 | initializers 17/49, sizeof 7/20, structs 6/17, typedef 4/10, unions 3/8, enums 2/6 |
| W4 | 27 | 75 | 102 | 65 / 13 / 24 | include 9/27, conditional 4/11, stringize-paste 4/11, macro-function 4/9, define 3/9, varargs 3/8 |
| W5 | 215 | 628 | 843 | 56 / 81 / 706 | bitwise 46/135, integer-types 35/103, misc 33/99, floating 27/80, storage 27/78, casts 27/78, switch 9/25, goto 8/21, function-pointers 3/9 |
| **all** | **330** | **951** | **1281** | 200 / 186 / 895 | |

- The hidden run after wave n counts the hidden tests of W1 to Wn: 63, 138, 248, 323 and 951 tests.
- **What was dropped:**
  - torture: 299 for dg-options and the like, 297 out of scope (mostly `__attribute__` and predefined macros such
    as `__SIZE_TYPE__`), 194 failing the strict gcc or clang check, 14 sanitizer, signal or build failures;
  - chibicc units: 190 + 14 strict, 135 out of scope (wide/unicode literals, VLAs, long double, alignas, TLS), 6
    disagree;
  - c-testsuite: 20 (12 strict, 7 out of scope, 1 sanitizer).
- **Pipeline sanity check.** For all 200 c-testsuite tests, the agreed output (with the wrapper's two lines removed)
  equals c-testsuite's own `.expected`.

**Floats: included in W5, as their own category** (`W5 floating`, 107 tests, 13% of W5). The reasons are in W5.md:
they are common C and the torture suite uses them heavily, the SSE part of the ABI is small, glibc prints them, and
as a separate category they cost a compiler that skips them only that category. W6 uses no floats.

## Validation

| Check | Result |
|---|---|
| `validate.mjs`: every test rebuilt with gcc -O0 and clang -O0, output and exit equal the stored ones; re-tag gives the same wave and category; visible copies byte-identical; no hidden test visible | 1281 checked, **0 problems** (80 s) |
| Tagging spot-check (`validate.mjs --spot=4`, 20 tests read by hand) | correct, after one fix: a pointer-to-array parameter (`int a[][2]`, qualType `int (*)[2]`) had been tagged as a function pointer |
| **chibicc** (built with gcc from the pinned clone, behind `validation/chibicc/chibicc-wrap.sh`), all tests | **1205 / 1281 (94%)**: W1 84/85, W2 98/102, W3 147/149, W4 99/102, W5 777/843 |
| chibicc, hidden tests only | **892 / 951 (93.8%)**: W1 63/63, W2 72/75, W3 108/110, W4 72/75, W5 577/628 |
| chibicc on W6 (hidden variants) | score **2.42** (two runs: 2.416, 2.426). bintree 1.6, crc 1.9, fannkuch 4.6, fib 1.3, matmul 2.5, sieve 1.8, sort 2.2, vm 6.9. So the score has room both ways, and gcc -O0 parity is a real target |
| Null compiler (`validation/stub`) | 17 / 951 hidden (1.8%); W6 score 20.0 (every program counts as the penalty) |
| Regression gate | the stub against chibicc's results: 877 regressions reported; chibicc against its own W5 results: 0, gate passes |

chibicc's 76 failures are its own gaps (casts, floats, misc). Every one of those programs passed the five-way
gcc/clang agreement.

## The hidden runner (`run-hidden.mjs`)

```
node <b8>/run-hidden.mjs --wave=W1..W6 --dir=<arm compiler dir> [--results=<file>] [--gate=<results file>] [--reps=5]
```

- **What it does.** It batch-compiles the hidden tests of waves 1 to n, assembles and links each one, and runs each
  with its time limit. For W6 it also times the 8 hidden benchmark variants: the arm's binary and gcc -O0's,
  interleaved, serially, 5 runs each, medians.
- **What it prints.** Only category lines (`W3 structs: 12 of 40 fail`), the per-wave and overall totals, the gate
  line, the W6 lines and the score, then a JSON summary as the last line. It never prints test names, text or outputs.
- **`--results`.** Writes the per-test pass map that a later `--gate` needs. It is operator-only, and its path must
  be in a closed area.
- **Isolation (bench7's pattern, made stronger for native code):**
  - The arm's dir is copied to `<b8>/.tmp/run-*` (mode 700). Only regular text files are copied: no symlinks, ELF
    files, zips, `.class` or `.jar` files, nothing over 5 MB, 100 MB in all.
  - Tests are renamed `t0001.c` and so on.
  - Each step (compile, link, run) runs in its own `unshare -m -n -p` sandbox, as nobody with no capabilities and no
    network. The root fs is read-only, and `/tmp /home /root /opt /mnt /run /var/tmp /dev/shm` are empty tmpfs.
  - The compile step also hides `/usr/lib/gcc` and `/usr/lib/llvm-*`, so cc1 and clang do not exist: a compiler that
    shells out to gcc gets "cannot execute cc1".
  - The link step sees only the `.s` files, and the run step only the binary (4 GB address space, 1 MB of stdout).
  - Expected outputs never enter a sandbox.
- **Cheat checks.** A `.s` with a gcc or clang `.ident`, or with `.incbin` or `.include`, fails as cheat.
- **Batches.** Four parallel JVMs. A batch that exits 0 ran to its end. One that dies or times out (60 s + 2 s per
  file) loses its first unwritten file and restarts on the rest.

**Adversarial checks (`validation/adversarial/`):**

| Probe | Result |
|---|---|
| `shellout` (calls gcc and clang) | 0 pass, nothing compiled |
| `ident` (gcc's `.ident`) | 63/63 flagged as cheat |
| `crash` (exit 3 on every 10th file) | exactly those 13 files lost, 13 restarts |
| `peek` reads hidden/manifest.json, the repo's CLAUDE.md, ~/.claude.json | all not found |
| `peek` fetches https://example.com | fails (no DNS) |
| `peek` writes to /var/tmp and /usr/local | ephemeral, and read-only; nothing reached the host |

## Timing

| What | Time |
|---|---|
| JVM startup (`VERSIONS.md`): `clj-run -e` | 0.65-0.81 s |
| a one-line namespace via `-m` | 0.91-0.98 s |
| the same in the runner's sandbox | about 1.6 s |
| **Runner with the null stub compiler**, W1 (63 tests) | 4 s |
| W5 (951 tests) | 34 s (compile 3, link 19, run 12) |
| **With chibicc**, W5 | 44 s |
| W6 (951 tests + benchmarks, 5 reps) | 107 s (benchmarks 74 s) |

A real Clojure compiler adds its own load time once per batch JVM (4 JVMs), plus its compile time.

## Open issues (for the harness step)

1. **Network.** The arms' access hook must deny network fetches (git clone, curl, wget, WebFetch). c-testsuite,
   chibicc and gcc torture are public, so a cloned suite gives most hidden tests away. The visible tests are verbatim
   upstream programs: anonymous ids do not stop recognition. Contract rule 3 forbids downloads; only the hook enforces
   it.
2. **Contract rule 2** (the agent does not compile C with gcc or clang, even for reference outputs) is enforceable
   only in the arms' Bash hook. The runner's sandbox covers the compiler, not the agent's own dev loop.
3. **Contamination.** chibicc, 8cc and tcc are well known, so an arm can write from memory. Requiring Clojure (no
   C compiler in Clojure to copy) is the mitigation; the audit can grep for chibicc's identifiers.
4. **What a torture pass shows.** Most torture tests signal failure only by calling abort. The wrapper removes the
   null-compiler floor, but a buggy compiler that never takes a failing branch still passes such a test.
5. **W5 holds 66% of all tests** (843), and W1 only 85. Report per-wave pass rates, not one total. Some categories
   are small: W5 function-pointers 9 hidden, W1 expressions 6, W3 enums 6, W4 varargs 8.
6. **W6 measures wall time per process,** including about 70 ms of sandbox setup on both sides. Runs differed by
   0.4% in the score.
