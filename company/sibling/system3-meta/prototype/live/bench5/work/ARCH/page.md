# ARCH: Sheet's design (contract, from MTG-1)

Source: minutes MTG-1 items 1 and 2. This file is the contract between modules.
Interface changes in later waves go through an ARCH amendment by the lead, never a silent edit in a module.
Written by dev-1 (order ARCH); dev-2 checks the B and C sections.

## Split and files

Split by pipeline stage. Each slot's module lives in `live/bench5/work/MOD-<slot>/<file>`; `shipped/` mirrors `work/` so relative paths stay valid.

| Slot | File | Owns | Owner |
|---|---|---|---|
| A | work/MOD-A/syntax.mjs | cell names, tokenizer, parser, AST, refsOf | dev-1 |
| B | work/MOD-B/values.mjs | value model, errors, coercion, operators, rounding, display, literal typing | dev-2 |
| C | work/MOD-C/eval.mjs | evaluator, function registry | dev-2 |
| D | work/MOD-D/store.mjs | cell store, dependency graph, recalc, cycle detection | dev-1 |
| SHEET | work/SHEET/sheet.mjs | thin wiring only (createSheet), no spreadsheet logic | dev-1 |

A failing acceptance category is routed to the owner of the slot that holds that behaviour.

## Imports

Relative ES-module paths from the importing file; no barrels. Import graph:

- A (`../MOD-A/syntax.mjs`): imports nothing.
- B (`../MOD-B/values.mjs`): imports nothing.
- C (`../MOD-C/eval.mjs`): imports `../MOD-B/values.mjs` only, e.g. `import { ERR } from "../MOD-B/values.mjs";`
- D (`../MOD-D/store.mjs`): imports nothing (evaluate is injected).
- SHEET (`work/SHEET/sheet.mjs`): imports all four: `../MOD-A/syntax.mjs`, `../MOD-B/values.mjs`, `../MOD-C/eval.mjs`, `../MOD-D/store.mjs`.

## Values and errors

- Values are JS number, string, boolean; `""` = empty.
- Errors are frozen singleton objects `{error:"#DIV/0!"}` owned by B: `ERR.DIV0` = `{error:"#DIV/0!"}`, `ERR.VALUE` = `{error:"#VALUE!"}`, `ERR.NAME` = `{error:"#NAME?"}`. Waves 2/3 add `ERR.REF` and the cycle error, only in B.
- Internally (inside A-D and between them) errors are never strings, so typed text `"#DIV/0!"` stays text in formulas. Test with `isError(v)`.
- The one exception is the public `get()` of SHEET: there, and only there, an error becomes its code string (`"#DIV/0!"`, `"#VALUE!"`, `"#NAME?"`). (ARCH amendment ISS-9, lead.)
- Only `normalizeCell` throws; everything else returns values.

## Slot A: syntax.mjs

File: work/MOD-A/syntax.mjs (imported as `../MOD-A/syntax.mjs`). Owner: dev-1. Imports: none.

exports: normalizeCell, parseFormula, refsOf

- `normalizeCell(name) -> "A1"` (upper case), or throws Error for anything not one letter + 1..99 without leading zero (including non-strings). Case-insensitive input.
- `parseFormula(src) -> AST`, where src is the text after `=`. Never throws; bad syntax returns `{type:"error",code:"#VALUE!"}`. Whitespace is ignored.
  - Grammar:
    - `cmp := cat (cmpop cat)*` with cmpop one of `= <> < > <= >=`
    - `cat := add ("&" add)*`
    - `add := mul ([+-] mul)*`
    - `mul := pow ([*/] pow)*`
    - `pow := unary ("^" pow)?` (right-assoc)
    - `unary := [+-] unary | atom`
    - `atom := number | string | TRUE | FALSE | NAME "(" args ")" | "(" cmp ")"`
  - So `-2^2` = `(-2)^2` = 4, `2^3^2` = 512. Numbers: digits with at most one dot (`3`, `2.5`, `.5`, `7.`; `1.2.3` is bad syntax). Strings: double-quoted, no escapes. TRUE/FALSE any case.
  - Nodes: `{type:"num",value}` `{type:"str",value}` `{type:"bool",value}` `{type:"unary",op,arg}` `{type:"binary",op,left,right}` (op one of `+ - * / ^ & = <> < > <= >=`) `{type:"call",name (upper case),args:[node]}` `{type:"error",code}`.
  - Wave 2 adds `{type:"ref",cell:"A1"}` `{type:"range",from,to}`.
- `refsOf(ast) -> string[]`: unique normalised cell names, ranges expanded (wave 1 always `[]`).

Owns across waves: all syntax; wave 2 adds ref and range nodes and refsOf.

## Slot B: values.mjs

File: work/MOD-B/values.mjs (imported as `../MOD-B/values.mjs`). Owner: dev-2. Imports: none.

exports: ERR, isError, errorFromCode, parseLiteral, toNumber, toText, binary, unary, round9, display

- `ERR`: frozen singletons `{DIV0, VALUE, NAME}` (later REF, cycle error), each `{error:"<code>"}`.
- `isError(v) -> boolean`.
- `errorFromCode(code) -> the ERR singleton` for that code.
- `parseLiteral(text) -> number` for a trimmed signed plain number (`" -2.5 "`, `"7"`, `".5"`), else the text unchanged (`"12abc"`, `"TRUE"` stay text).
- `toNumber(v) -> number|error`: `""` -> 0, booleans 1/0, numeric text -> number, other text -> ERR.VALUE, error passes through.
- `toText(v) -> string|error`: TRUE/FALSE -> "TRUE"/"FALSE", numbers String(n), `""` -> `""`, error passes through.
- `binary(op,a,b) -> value`: left error wins, then right; arithmetic via toNumber; `/` by 0 -> ERR.DIV0; non-finite result -> ERR.VALUE; `&` joins toText; comparisons return booleans, two strings compared case-insensitively, else both toNumber.
- `unary(op,v) -> number|error`.
- `round9(n) -> Number(n.toFixed(9))` with -0 -> 0.
- `display(v) -> string`: `""` for `""`, "TRUE"/"FALSE", String(round9(n)), text as is, error -> `error.error`.

Owns across waves: value model, error constants (all new error kinds), coercion, operator semantics, rounding, display, typing of non-formula input.

## Slot C: eval.mjs

File: work/MOD-C/eval.mjs (imported as `../MOD-C/eval.mjs`). Owner: dev-2. Imports: `../MOD-B/values.mjs` only.

exports: evaluate, FUNCTIONS

- `evaluate(ast, ctx) -> value`, never throws. `ctx = {get(cell) -> value}` (wave 2 adds `range(from,to) -> value[][]` rows).
  - num/str/bool -> the value; unary/binary -> B's `unary`/`binary` on evaluated operands.
  - Error node -> `errorFromCode(code)`.
  - Call -> `FUNCTIONS[name] ? FUNCTIONS[name](argNodes, ctx, evaluate) : ERR.NAME` (args not evaluated for unknown names).
  - Intermediate values are never rounded.
- `FUNCTIONS`: registry object `{NAME: (argNodes, ctx, evaluate) -> value}`; empty in wave 1, so every call -> #NAME?.

Owns across waves: evaluation; wave 2 ref lookups through ctx and all functions.

## Slot D: store.mjs

File: work/MOD-D/store.mjs (imported as `../MOD-D/store.mjs`). Owner: dev-1. Imports: none (evaluate injected; D does not import C).

exports: createStore

- `createStore({evaluate}) -> {set, clear, get, raw}`:
  - `set(cell, {raw, ast, refs, value})`: for a value cell SHEET passes `ast:null` and `value`; for a formula D computes `value = evaluate(ast, ctx)` with `ctx.get` reading D's cached unrounded values.
  - `clear(cell)`: cell becomes empty.
  - `get(cell) -> value` or `""`.
  - `raw(cell) -> text` or `""`.

Owns across waves: per-cell raw text, parsed AST and cached value; waves 2/3 add dependency edges from refs, dirty propagation, recalculation of dependents in topological order and cycle detection, here only.

## SHEET: sheet.mjs

File: live/bench5/work/SHEET/sheet.mjs. Owner: dev-1. Imports `../MOD-A/syntax.mjs` (normalizeCell, parseFormula, refsOf), `../MOD-B/values.mjs` (parseLiteral, round9, display, isError), `../MOD-C/eval.mjs`, `../MOD-D/store.mjs`. Thin wiring only.

`createSheet() -> {set, get, display}`; store = `createStore({evaluate})`.

- `set(cell, text)`: `key = normalizeCell(cell)`;
  - text `""` -> `store.clear(key)`;
  - starts with `=` -> `ast = parseFormula(text.slice(1))`, `store.set(key, {raw:text, ast, refs:refsOf(ast)})`;
  - else `store.set(key, {raw:text, ast:null, refs:[], value:parseLiteral(text)})`.
- `get(cell)`: `v = store.get(normalizeCell(cell))`; numbers returned as `round9(v)`; errors returned as their code string (`isError(v) ? v.error : v`, so `"#DIV/0!"`, `"#VALUE!"`, `"#NAME?"`); everything else unchanged. This is the only place errors become strings (amendment ISS-9).
- `display(cell)` = `display(store.get(normalizeCell(cell)))` (B's display of the stored value; gives the same strings).
