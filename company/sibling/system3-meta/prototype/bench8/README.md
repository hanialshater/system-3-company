# Benchmark 8: the material (a C-subset compiler in Clojure, 6 waves)

owner: vp-meta · date: 2026-10-23 · status: **v2 (after the pilot): the material is rebuilt with the wider W4/W5 scope
and the UB screen, and re-validated; the arms' harness can run every agent in a box (PROTOCOL.md v2), but no session
authenticates there, so the default is `--isolation=hooks` (PROTOCOL.md "Isolation deviation"). No arm has run.**

## What this is

The task both arms get: write a compiler for a subset of C **in Clojure**. It emits x86-64 GNU as assembly, which
`gcc out.s -o prog` assembles and links. The work comes in six waves on one growing codebase:

| Wave | Scope |
|---|---|
| W1 | ints, expressions, locals, control flow, functions, recursion |
| W2 | pointers, arrays, strings, globals, char |
| W3 | structs, unions, typedef, enums, sizeof, initializers |
| W4 | the preprocessor (#include of the provided headers, #define, #if, # and ##) and varargs |
| W5 | the rest of common C, including floats, GNU C (`gnu`) and variable-length arrays (`vla`) |
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
node build-tests.mjs      # about 16 min on 4 CPUs (v2: the UB screen adds builds and a valgrind run)
node build-bench.mjs      # the benchmark expected outputs and the hidden variants
node validate.mjs         # independent re-check of every test (--spot=K prints K tests per wave for a tagging check)
```

**Pinned upstream commits:**
- c-testsuite `5c7275656d751de0e68b2d340a95b5681858ed07`
- rui314/chibicc `90d1f7f199cc55b13c7fdb5839d1409806633fdb`
- gcc-mirror/gcc `6382527abc778ecbfedb8a85ddcc502cd97ddee9`, a sparse, shallow checkout of
  `gcc/testsuite/gcc.c-torture/execute`

**Reproducibility, checked for v1** (v2 has not been rebuilt from a fresh install; `validate.mjs` re-checks it). A fresh `install.mjs` into an empty dir, then both builds, gave the same 1281 tests:
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
below. v2: the GNU extensions W5.md lists are in scope (`W5 gnu`), so a torture test may keep them.

**The main wrapper.** Most upstream tests print nothing and exit 0, so a compiler that emits
`main: xor %eax,%eax; ret` would pass about 75% of W1. So a test whose main takes no parameters (1,496 of 1,522 in v2):
- has main renamed to `b8_main`, with `return 0;` added before its closing brace (main's implicit return 0 does not
  hold for other functions);
- gets a wrapper main that prints `b8: start` and `b8: end` around the call.

Measured with the null compiler (`validation/stub`): 17 of 951 hidden tests pass (1.8%), against 47 of 63 W1 tests
before the wrapper.

**Every kept program passes all of these:**
1. gcc and clang accept it with `-std=c11 -pedantic-errors` plus errors for implicit declarations, implicit int,
   int conversion and incompatible pointers, using only the provided headers (`-nostdinc -I spec/include`).
   - v2: a program that fails only the C11 check may be kept as GNU C (`-std=gnu11`, the same errors) when the tagger
     then finds a GNU extension or a VLA in scope. Its manifest entry says `std: gnu11`.
2. The feature tagger (`tagger.mjs`) finds nothing out of scope. It works on clang's JSON AST of the test's own
   top-level declarations, never the headers', plus its preprocessor lines, plus (v2) `gcc -std=gnu11 -pedantic
   -Wvla` on the test: a `-Wvla` warning is the `vla` feature, a pedantic warning W5.md's GNU list names is `gnu`,
   and any other pedantic warning drops the test.
3. It is built seven ways: gcc -O0, gcc -O2, clang -O0, clang -O2, gcc -O0 with ASan+UBSan, and (v2) gcc -O0 with
   `-ftrivial-auto-var-init=pattern` and with `=zero`. v2 also runs the gcc -O0 binary three more ways: with the stack
   shifted by a 6 KB environment variable, in a quarter of the default stack (`ulimit -s 2048`), and under valgrind's
   memcheck (`--error-exitcode=97`; for programs under 400 ms at gcc -O0).
   - All of these must agree on stdout and exit status, exit without a signal, and print under 64 KB. (The pilot
     saw a change that only moved locals swing two hidden tests: these screens drop any program whose output depends
     on uninitialised memory, stack addresses or stack depth.)
   - gcc -O0 must run it in under 1.5 s.
   - The per-test time limit is 30 × gcc -O0's time, at least 3 s and at most 30 s.

**The tagger:**
- A test's first wave is the highest wave of any feature it uses.
- Its category is the first feature, in that wave's order (`CATEGORY_ORDER`), that it uses.
- Function prototypes are not tagged, so `int printf(const char *, ...);` is fine in W1. A string literal passed
  straight to a call is W1.
- The out-of-scope list is in W5.md.
- v2 fixes after the pilot: GNU builtins such as `__builtin_types_compatible_p` passed `-pedantic-errors` and were
  tagged W1 (4 of the pilot's 9 failures); VLA parameters (`int b[a++]`) decay to pointers in clang's AST and were
  tagged W2; K&R definitions were meant to be out of scope but were never detected, so they are now in scope from W1.

**The split.** Each (wave, category) is sorted by a hash of the origin, and every 4th test is visible. Test ids are
anonymous (`w3-0042`): the upstream origin is only in `hidden/manifest.json`.

## Counts (visible / hidden), v2 (rebuilt 2026-10-23 after the pilot)

| Wave | Visible | Hidden | Total | By source (c-testsuite / chibicc / torture) | Categories, visible/hidden |
|---|---|---|---|---|---|
| W1 | 21 | 60 | 81 | 25 / 19 / 37 | functions 15/42, control 4/12, expressions 2/6 |
| W2 | 26 | 73 | 99 | 22 / 20 / 57 | globals 9/26, char 5/15, arrays 5/12, pointers 4/12, strings 3/8 |
| W3 | 39 | 108 | 147 | 32 / 48 / 67 | initializers 17/49, sizeof 7/19, structs 6/17, typedef 4/9, unions 3/8, enums 2/6 |
| W4 | 26 | 70 | 96 | 65 / 2 / 29 | include 9/27, define 5/12, conditional 4/11, macro-function 4/9, varargs 3/8, stringize-paste 1/3 |
| W5 | 279 | 820 | 1099 | 58 / 114 / 927 | bitwise 51/150, gnu 39/117, misc 39/115, integer-types 37/110, storage 31/90, floating 29/87, casts 29/86, switch 10/28, goto 8/22, function-pointers 3/8, vla 3/7 |
| **all** | **391** | **1131** | **1522** | 202 / 203 / 1117 | |

- The hidden run after wave n counts the hidden tests of W1 to Wn: 60, 133, 241, 311 and 1131 tests.
- **v1 → v2.** 1281 tests became 1522: the GNU C tests (`W5 gnu`, 156), VLAs (`W5 vla`, 10), K&R definitions and gcc's
  predefined macros brought back 222 torture tests that v1 dropped as out of scope; 58 tests are GNU C (`std: gnu11`).
  The 4 builtin tests v1 mis-tagged W1/W3 moved to `W5 gnu`, and chibicc's macro.c groups that rely on GNU comma
  swallowing (`, ## __VA_ARGS__`) moved from W4 to `W5 gnu`, so W4 shrank (75 → 70 hidden, and `stringize-paste` is
  now a small category: 3 hidden).
- **What was dropped:**
  - torture: 299 for dg-options and the like, 204 out of scope (inline asm 62, vector and `__int128` types, `long
    double`, `_Complex`, `__OPTIMIZE__`, mode/may_alias attributes, other builtins), 50 failing the strict gcc or clang
    check, 29 sanitizer, signal, UB-screen, disagreement or build failures (the UB screen alone: 3, all by valgrind);
  - chibicc units: 98 + 28 strict, 111 out of scope (wide/unicode literals, `long double`, alignas, TLS, `_Generic`), 12
    disagree, 5 sanitizer or build;
  - c-testsuite: 18 (5 strict, 12 out of scope, 1 sanitizer).
- **The UB screen** (pattern and zero auto-var-init, a shifted stack, a quarter stack, valgrind) dropped only 3
  programs beyond v1's five-way agreement. So the pilot's swing of 2 hidden tests when it moved locals was most likely
  its own compiler reading uninitialised stack memory, not the tests; the screen now rules the tests out either way.
- **Pipeline sanity check.** For all 202 c-testsuite tests, the agreed output (with the wrapper's two lines removed)
  equals c-testsuite's own `.expected`.

**Floats: included in W5, as their own category** (`W5 floating`, 116 tests, 11% of W5). The reasons are in W5.md:
they are common C and the torture suite uses them heavily, the SSE part of the ABI is small, glibc prints them, and
as a separate category they cost a compiler that skips them only that category. W6 uses no floats.

## Validation (v2, 2026-10-23)

| Check | Result |
|---|---|
| `validate.mjs`: every test rebuilt with gcc -O0 and clang -O0 (`-std` from its manifest entry), output and exit equal the stored ones; re-tag gives the same wave and category; visible copies byte-identical; no hidden test visible | 1522 checked, **0 problems** (170 s) |
| Tagging spot-check (`validate.mjs --spot=3`, 15 tests read by hand) | correct: e.g. a VLA parameter `char a[2][(*x)++]` (pr22061-2) is W5 `vla`; chibicc's macro.c group with GNU comma swallowing is W5 `gnu`; `__CHAR_BIT__` in pr80501 is a W4 `define` feature (the test is W5 storage by its other features) |
| **chibicc** (built with gcc from the pinned clone, behind `validation/chibicc/chibicc-wrap.sh`), all tests | **1302 / 1522 (85.5%)**: W1 80/81, W2 97/99, W3 145/147, W4 91/96, W5 889/1099 |
| chibicc, hidden tests only | **974 / 1131 (86.1%)**: W1 60/60, W2 71/73, W3 106/108, W4 65/70, W5 672/820. Its weakest category is the new `W5 gnu` (54 of 117 hidden pass); v1's chibicc figure was 93.8% |
| **The pilot's W3 compiler** (one workflow agent, `b8-pilot`), on v2 | hidden W1-W3: **236 / 241 (97.9%)** (v1: 239/248); the 5 failures are initializer and typedef tests the pilot also failed on v1. On the hidden W1-W5 tests it passes 773 / 1131 (68%) without a preprocessor: W4 0/70, W5 537/820 (W5 gnu 59/117, vla 2/7, floating 6/87) |
| chibicc on W6 (hidden variants, v1; the benchmarks did not change) | score **2.42** (two runs: 2.416, 2.426). bintree 1.6, crc 1.9, fannkuch 4.6, fib 1.3, matmul 2.5, sieve 1.8, sort 2.2, vm 6.9. So the score has room both ways, and gcc -O0 parity is a real target |
| Null compiler (`validation/stub`) | 20 / 1131 hidden (1.8%) |
| Regression gate (v1) | the stub against chibicc's results: 877 regressions reported; chibicc against its own W5 results: 0, gate passes |

chibicc's failures are its own gaps (GNU builtins and attributes, casts, floats, misc). Every one of those programs
passed the gcc/clang agreement and the UB screen.

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

1. **Network.** ~~Only the hook enforces it.~~ Closed in v2 (2026-10-23, after the pilot): every agent process runs in
   its arm's box (`sandbox.mjs`, PROTOCOL.md "Box"), whose network namespace reaches only the orderer's egress proxy,
   which allows the model API and nothing else. **Reopened by `--isolation=hooks` (the default, PROTOCOL.md "Isolation
   deviation"):** the sessions run without the box, so the hook, the shims and the audit enforce it again.
2. **Contract rule 2.** ~~Enforceable only in the hook.~~ Closed in v2: the box has no cc1, cc1plus, lto1 or clang, so
   no path, response file or script can compile C there; gcc only assembles and links. **Reopened by
   `--isolation=hooks`** in the same way: the hook and the shims refuse C, and the audit scans the arms' files.
3. **Contamination.** chibicc, 8cc and tcc are well known, so an arm can write from memory. Requiring Clojure (no
   C compiler in Clojure to copy) is the mitigation; the audit can grep for chibicc's identifiers.
4. **What a torture pass shows.** Most torture tests signal failure only by calling abort. The wrapper removes the
   null-compiler floor, but a buggy compiler that never takes a failing branch still passes such a test.
5. **W5 holds 72% of all tests** (1099 in v2), and W1 only 81. Report per-wave pass rates, not one total. Some
   categories are small: W4 stringize-paste 3 hidden, W5 vla 7, W5 function-pointers 8, W1 expressions 6, W3 enums 6,
   W4 varargs 8.
6. **W6 measures wall time per process,** including about 70 ms of sandbox setup on both sides. Runs differed by
   0.4% in the score.


## W7 (2026-10-23): compile real software

An opt-in seventh wave after W6: the arm's compiler builds Lua 5.4.7 from its unmodified sources with a curated header
set and is scored on Lua's own test suite, the runtime of 6 Lua programs against gcc -O0's Lua, and the compile time
(spec/W7.md; PROTOCOL.md "W7"). Its material is built by `node material/build-w7.mjs` (after `install.mjs`):
`spec/W7.md`, `spec/w7/` (build.json, include/, lua/, bench/), `visible/W7/`, `hidden/w7/` (tests, bench variants,
manifest, ref builds, validation) and `<b8>/run-hidden-w7.mjs`.
