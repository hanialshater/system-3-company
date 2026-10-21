<!-- Copy of ARCH.md, made only because the O-1 check reads page.md (ISS-8). ARCH.md is the contract; edit ARCH.md, not this file. -->

# ARCH: Sheet's design (the contract)

Source: MTG-1 minutes (kickoff, closed). Written by dev-1 (order O-1). This file is the contract
between slots. Interface changes go through the lead and an edit of this file, never by editing
another slot's module.

Product: `createSheet()` from `live/bench5r/work/SHEET/sheet.mjs` returning
`{ set(cell, text), get(cell), display(cell) }` (SPEC5.md).

## Layout and imports

| Slot  | File                          | Owner | Imports                                   |
|-------|-------------------------------|-------|-------------------------------------------|
| A     | work/MOD-A/parse.mjs          | dev-1 | nothing                                   |
| B     | work/MOD-B/values.mjs         | dev-2 | nothing                                   |
| C     | work/MOD-C/eval.mjs           | dev-1 | `../MOD-B/values.mjs`                     |
| D     | work/MOD-D/graph.mjs          | dev-2 | nothing                                   |
| SHEET | work/SHEET/sheet.mjs          | dev-2 | `../MOD-A/parse.mjs`, `../MOD-B/values.mjs`, `../MOD-C/eval.mjs`, `../MOD-D/graph.mjs` |

- Imports are by relative path only, exactly as above (`import { ... } from "../MOD-B/values.mjs"`).
- Dependency direction: A, B, D are leaves; C depends on B; SHEET depends on all. No cycles.
- `shipped/` keeps the same `MOD-<slot>/` and `SHEET/` layout, so the same relative paths work there.
- ES modules, Node 22, no dependencies. Named exports only.
- Modules never throw for sheet-level problems (bad syntax, wrong types, unknown functions): those
  are error *values*. Only SHEET throws (an `Error` for a bad cell name).

## Values (shared representation, defined by Slot B)

A value is one of:

- number: a finite JS number
- text: a JS string (`""` means empty)
- boolean: JS `true` / `false`
- error: a frozen singleton object from `ERR` in `../MOD-B/values.mjs`

| Constant    | Shape                   | Wave |
|-------------|-------------------------|------|
| `ERR.DIV0`  | `{ error: "#DIV/0!" }`  | 1    |
| `ERR.VALUE` | `{ error: "#VALUE!" }`  | 1    |
| `ERR.NAME`  | `{ error: "#NAME?" }`   | 1    |
| `ERR.REF`   | `{ error: "#REF!" }`    | 2    |
| `ERR.CYCLE` | `{ error: "#CYCLE!" }`  | reserved (later waves) |

- Every error object has `toString()` returning its code.
- `isError(v)` is the only test for an error. Errors are objects, so text the user typed such as
  `"#DIV/0!"` stays text and is not an error.
- Public boundary (MTG-1 decision 2, amended by lead): SHEET `get()` returns the error's code
  string (`isError(v) ? v.error : v`, e.g. `=1/0` → `"#DIV/0!"`); `display()` returns its code.
  Internally (stored values, `ctx.get`/`ctx.range`, `evaluate`, B operators) errors stay `ERR`
  objects, so they pass through references.

## Slot A: parse.mjs

exports: parse, normCell, refs

Owner: dev-1. File: `work/MOD-A/parse.mjs`. Imports nothing.

Owns: formula syntax and cell names, in every wave. Wave 2 adds ref/range nodes and a working
`refs`, here only.

- `parse(src) -> AST` — `src` is the formula text **after** the leading `=`. Never throws.
  - Whitespace is ignored between tokens.
  - Numbers: digits with at most one dot (`3`, `2.5`, `.5`, `7.`); `1.2.3` is bad syntax.
  - Strings: double-quoted, no escapes.
  - `TRUE` / `FALSE` in any case → bool node.
  - Calls: `NAME(args, ...)` → call node with `name` uppercased (parsed in wave 1 so `=FOO(1)`
    evaluates to `#NAME?`, not a syntax error). Zero args allowed: `NAME()`.
  - Precedence, loosest first: comparison `= <> < > <= >=`; `&`; `+ -`; `* /`; `^`.
    `^` is right-associative, all others left-associative.
  - Unary `-` / `+` binds to the atom right after it (so `-2^2` parses as `(-2)^2` = 4).
    Repeated unary (`--2`) is allowed.
  - Bad syntax (empty formula, unbalanced parentheses, trailing junk, `1.2.3`, unknown
    characters, unterminated string) returns `{ type: "error", code: "#VALUE!" }` as the whole AST.
  - Node shapes:
    - `{ type: "num", value: number }`
    - `{ type: "str", value: string }`
    - `{ type: "bool", value: boolean }`
    - `{ type: "unary", op: "-" | "+", arg: AST }`
    - `{ type: "binary", op: "+"|"-"|"*"|"/"|"^"|"&"|"="|"<>"|"<"|">"|"<="|">=", left: AST, right: AST }`
    - `{ type: "call", name: string /* uppercase */, args: AST[] }`
    - `{ type: "error", code: "#VALUE!" | "#REF!" }` — `"#VALUE!"` = bad syntax (always the
      whole AST); wave 2: `"#REF!"` = a name that is not a valid cell (`AA1`, `A100`, `A0`) or a
      range with an invalid corner. A `"#REF!"` node may be a subtree (`=1+AA1`,
      `=SUM(A1:A100)`), not only the whole AST.
    - wave 2: `{ type: "ref", cell: "A1" }` (normalised), `{ type: "range", from: "A1", to: "B2" }`
- `normCell(name) -> "A1" | null` — validates and normalises a cell name: one letter A-Z
  (any case), then 1-99 with no leading zero. Returns the uppercase name, or `null` if invalid
  (non-string input → `null`). Never throws.
- `refs(ast) -> string[]` — the normalised cells an AST references (ranges expanded),
  without duplicates; error nodes are skipped. Wave 1 returns `[]`.

## Slot B: values.mjs

exports: ERR, isError, parseInput, toNumber, toText, compare, unary, binary, round9, display

Owner: dev-2. File: `work/MOD-B/values.mjs`. Imports nothing.

Owns: the value and error representation, literal input, coercion and every operator, in every
wave. All functions are pure and never throw.

- `ERR` — the frozen error singletons (table above).
- `isError(v) -> boolean`.
- `parseInput(text) -> "" | number | string` — for set text that does not start with `=`.
  `""` → `""`. A plain number, optionally signed and padded with spaces (`" -2.5 "`, `7`, `.5`,
  `+3`, `7.`) → that number. Anything else stays the original text (`"12abc"`, `"TRUE"`).
- `toNumber(v) -> number | error` — number as is; `""` → 0; `true`/`false` → 1/0; numeric text
  (same rule as `parseInput`) → its number; other text → `ERR.VALUE`; an error → that error.
- `toText(v) -> string | error` — `""` → `""`; booleans → `"TRUE"`/`"FALSE"`; numbers as
  JavaScript prints them (`String(n)`); text as is; an error → that error.
- `compare(a, b) -> -1 | 0 | 1 | error` — errors first (left wins); two strings compare
  case-insensitively; otherwise both sides go through `toNumber` and compare numerically.
  (`""` is treated as 0 when the other side is not a string; `"" vs "x"` is a string compare.)
- `unary(op, v) -> value` — `op` is `"-"` or `"+"`; applies `toNumber`, error passes through.
- `binary(op, a, b) -> value` — `op` in `+ - * / ^ & = <> < > <= >=`.
  - An error operand is the result; if both are errors, the left one wins.
  - `+ - * / ^`: both sides via `toNumber`; `x/0` → `ERR.DIV0`; a non-finite or NaN result
    (e.g. `(-8)^(1/3)`, overflow) → `ERR.VALUE`.
  - `&`: joins `toText(a) + toText(b)`.
  - comparisons: via `compare`, result a boolean.
- `round9(n) -> number` — round to 9 decimal places (e.g. `0.1+0.2` → `0.3`); `-0` becomes `0`.
- `display(v) -> string` — `""` → `""`; booleans → `"TRUE"`/`"FALSE"`; numbers rounded to 9
  decimals and printed as JavaScript prints them (`1/3` → `"0.333333333"`); text as is;
  errors → their code.

## Slot C: eval.mjs

exports: evaluate, FUNCTIONS

Owner: dev-1. File: `work/MOD-C/eval.mjs`. Imports `../MOD-B/values.mjs`.

Owns: walking the AST and the function table, in every wave. Wave 2 functions are added to
`FUNCTIONS` here only. C never sees storage: references are resolved only through `ctx`.

- `evaluate(ast, ctx) -> value` — never throws.
  - `num`/`str`/`bool` → their value; `error` node → the `ERR` singleton with its code
    (`"#VALUE!"` → `ERR.VALUE`, `"#REF!"` → `ERR.REF`), propagating like any operand error
    (left wins).
  - `unary` → `unary(op, evaluate(arg))`; `binary` → evaluates `left` before `right`, then
    `binary(op, l, r)` from B (left error wins).
  - `call` → looks up `FUNCTIONS[name]`; unknown name → `ERR.NAME` (wave 1: always).
  - wave 2: `ref` → `ctx.get(cell)`. A `range` is read with `ctx.range(from, to)` only by a
    function given it as an argument; a range anywhere else evaluates to `ERR.VALUE`.
  - A number result of the whole evaluation goes through `round9` (intermediate values are not
    rounded).
- `ctx = { get(cell) -> value, range(from, to) -> value[][] }` — supplied by SHEET; `range`
  returns the rectangle's values column by column (one inner array per column, left to right,
  each top to bottom; any two corners, empty cells as `""`); unused in
  wave 1 (SHEET may pass a ctx whose methods return `""` / `[]`).
- `FUNCTIONS` — a plain object mapping an uppercase name to `fn(args, ctx) -> value`, where
  `args` is the array of argument ASTs (so a function can decide evaluation order, ranges and
  short-circuiting; it calls `evaluate(arg, ctx)` itself). Empty in wave 1.

## Slot D: graph.mjs

exports: createGraph

Owner: dev-2. File: `work/MOD-D/graph.mjs`. Imports nothing.

Owns: the dependency graph, recalculation order and cycle detection (waves 2-3). In wave 1 it is a
working but trivial graph with this final interface, so SHEET does not change shape later.

- `createGraph() -> graph` with:
  - `setDeps(cell, cells[])` — replaces the set of cells that `cell` reads (its precedents).
    `setDeps(cell, [])` clears them (used on clear / literal input).
  - `recalcOrder(cell) -> string[]` — `cell` first, then every cell that depends on it directly
    or transitively, in topological order (each cell after all of its precedents in the list).
    Cells in a cycle are still included once, so they can be marked.
  - `cyclic() -> Set<string>` — the cells that are currently part of (or depend on, as later
    waves specify) a dependency cycle. Empty in wave 1.
- All cell names passed in and out are normalised (`normCell` output).

## SHEET: sheet.mjs

exports: createSheet

Owner: dev-2. File: `live/bench5r/work/SHEET/sheet.mjs`. Imports `../MOD-A/parse.mjs`,
`../MOD-B/values.mjs`, `../MOD-C/eval.mjs`, `../MOD-D/graph.mjs`. Wiring only: no parsing,
coercion or operator logic of its own.

- `createSheet() -> { set(cell, text), get(cell), display(cell) }`.
- Cell store: a Map from normalised cell name to `{ text, ast, value }`, plus one `createGraph()`.
- Every method first calls `normCell(cell)`; `null` → `throw new Error(...)`.
- `set(cell, text)`:
  - `""` → delete the record, `graph.setDeps(cell, [])`.
  - text starting with `=` → `ast = parse(text.slice(1))`, `graph.setDeps(cell, refs(ast))`.
  - otherwise → `value = parseInput(text)`, `ast = null`, `graph.setDeps(cell, [])`.
  - then for each `c` of `graph.recalcOrder(cell)`: re-evaluate formula cells with
    `evaluate(ast, ctx)` (cells in `graph.cyclic()` get `ERR.CYCLE` once later waves define it).
    The stored value is what `evaluate` returned (already `round9`ed); a reference sees that
    stored value (errors as `ERR` objects).
- `ctx.get(c)` → the stored value of `c`, or `""` if empty; `ctx.range(from, to)` → the stored
  values column by column, as Slot C gives (wave 2).
- `get(cell)` → the stored value `v`, `""` for an empty cell; an error is returned as its code
  string: `isError(v) ? v.error : v` (e.g. `"#DIV/0!"`). Only this public boundary converts;
  stored values and `ctx` keep the `ERR` object.
- `display(cell)` → `display(v)` from B on the stored value `v` (unchanged).

## Ownership summary

- dev-1: ARCH.md (O-1), Slot A, Slot C.
- dev-2: Slot B, Slot D, SHEET.
- A failing hidden-test category maps to its slot: syntax → A; literals/coercion/operators/display
  → B; evaluation/functions → C; recalculation/cycles → D; names/wiring → SHEET.
