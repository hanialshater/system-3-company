# Sheet: a small spreadsheet engine (the spec every order builds against)

Plain JavaScript ES modules, Node 22, no dependencies.
- Each module lives in its own work folder, `live/bench4b/work/<TASK>/`.
- A module imports another one by its relative path. Example: PARSER imports `../TOKENIZER/tokenize.mjs`.
- The same layout exists under `shipped/`, so the paths work in both places.
- Every module comes with its own `*.test.mjs` (`node --test`).
- Build against the dependency's **shipped** behaviour as this spec describes it. Never edit another order's folder.

Cells are `A1` to `Z99`: one letter, then 1 to 99. Cell names and function names are case-insensitive.

## TOKENIZER: `tokenize.mjs`

`export function tokenize(src)` returns an array of tokens `{ type, value }`. Whitespace is skipped.

- **Numbers:** `num`, with a Number value. Digits with at most one dot (`3`, `2.5`, `.5`, `7.`). `1.2.3` is an error. There is no exponent (`1e3` is the number `1` followed by the id `E3`).
- **Strings:** `str`, double-quoted. The value has no quotes. There are no escapes. An unterminated string is an error.
- **Identifiers:** `id`. A letter, then letters, digits or `_`. The value is **uppercased**.
- **Operators:** `op`, one of `+ - * / ^ & = <> < > <= >= ( ) , :`.
- **Errors:** anything else throws a `SyntaxError`.

## PARSER: `parse.mjs` (after TOKENIZER)

`export function parse(src)` parses a formula without its leading `=` and returns an AST. Bad syntax throws a `SyntaxError`, and that includes leftover tokens and empty input.

**Node shapes:**
- `{type:"num", value}`, `{type:"str", value}`, `{type:"bool", value}` (for `TRUE` and `FALSE`);
- `{type:"ref", ref:"A1"}`: any other identifier not followed by `(`, even one that is not a valid cell, such as `AA1`;
- `{type:"range", from:"A1", to:"B3"}`: identifier `:` identifier;
- `{type:"neg", arg}` for unary minus. Unary plus is dropped.
- `{type:"bin", op, left, right}` for an operator;
- `{type:"call", name:"SUM", args:[…]}` for a function call. `SUM()` has no args.

**Precedence, loosest first:**
1. comparison (`= <> < > <= >=`);
2. `&`;
3. `+ -`;
4. `* /`;
5. `^`.

`^` is right-associative; every other operator is left-associative. Unary minus applies to the atom that follows it, so `-2^2` is `(-2)^2`.

## VALUES: `values.mjs`

- `export const ERRORS = { DIV0: "#DIV/0!", REF: "#REF!", NAME: "#NAME?", VALUE: "#VALUE!", CYCLE: "#CYCLE!" }`.
- `export function isError(v)`: true for a string that is one of the ERRORS values.
- `export function toNumber(v)`:
  - `""` becomes 0; `true` and `false` become 1 and 0;
  - a number stays as it is; an error stays as it is;
  - text that is a plain number, optionally signed and padded with spaces (`" -2.5 "`), becomes that number;
  - anything else becomes `#VALUE!`.
- `export function toText(v)`: `""` stays `""`; booleans become `TRUE` and `FALSE`; a number becomes `String(n)`; text stays as it is.
- `export function parseLiteral(text)`: cell input that does not start with `=`. A plain number (as in `toNumber`) becomes a Number; anything else stays text. The input `TRUE` stays the text "TRUE".

## CELLS: `cells.mjs`

- `export function isRef(s)`: true for `A1`…`Z99` in uppercase. The row has no leading zero.
- `export function rangeCells(a, b)`: every cell in the rectangle from `a` to `b`, in any corner order. The order is column by column, top to bottom in each column. Returns `null` if either end is not a valid ref.
- `export function refsOf(ast)`: a `Set` of the valid cells a parser AST reads, including every cell of every range.

## FUNCTIONS: `functions.mjs` (after VALUES, CELLS)

`export function callFunction(name, args, ctx)`:
- `name` is uppercase, and `args` are unevaluated parser ASTs.
- `ctx` is `{ evaluate(ast), cell(ref) }`: `evaluate` turns an AST into a value, and `cell` reads a cell's value.
- An unknown name returns `#NAME?`.

**Aggregates: `SUM MIN MAX AVERAGE COUNT`.**
- A range argument (`{type:"range"}`) contributes its cells. An error in a cell is returned at once. From a range, only number values count; text and blanks are skipped.
- An invalid range returns `#REF!`.
- Any other argument is evaluated and converted with `toNumber`; an error is returned.
- `SUM` of nothing is 0. `COUNT` is the count of numbers.
- `MIN` and `MAX` of nothing are 0. `AVERAGE` of nothing is `#DIV/0!`.

**The other functions:**
- **`IF(c, a[, b])`.** With fewer than 2 or more than 3 arguments, it returns `#VALUE!`. It evaluates `c`; an error is returned. Then `toNumber(c)` decides: non-zero evaluates and returns `a`; zero evaluates and returns `b`, or `false` when there is no `b`. Only the branch chosen is evaluated.
- **`ABS(x)`:** exactly one argument (else `#VALUE!`).
- **`ROUND(x[, d])`:** `Math.round(x*10^d)/10^d`, with d defaulting to 0. It takes 1 or 2 arguments.
- **`LEN(x)`:** exactly one argument. The length of `toText` of the value. Errors propagate.

## EVALUATOR: `evaluate.mjs` (after PARSER, VALUES, CELLS, FUNCTIONS)

`export function evaluate(ast, cell)` returns a value: a number, a string, a boolean, `""` or an error string. `cell(ref)` returns a cell's value.

**Atoms.** `num`, `str` and `bool` return their value. A `ref` that is not a valid cell gives `#REF!`; a valid one gives `cell(ref)`. A `range` outside a function gives `#VALUE!`. A `call` goes to `callFunction` with `ctx = { evaluate: (a) => evaluate(a, cell), cell }`.

**Unary minus.** `toNumber`, then negate; errors propagate.

**Binary operators.** Evaluate left, then right. The first error (left before right) is the result.
- **`&`** joins `toText(left)` and `toText(right)`.
- **Comparison.** If both sides are strings, they are compared case-insensitively. Otherwise both sides go through `toNumber` (errors propagate). The result is a boolean.
- **`+ - * / ^`** use `toNumber` on both sides. Division by 0 gives `#DIV/0!`, and a non-finite result gives `#VALUE!`.

## GRAPH: `graph.mjs` (after CELLS)

`export function cycleCells(deps)`:
- `deps` is a `Map` from cell to an array of the cells its formula reads.
- It returns a `Set` of the cells that lie on a reference cycle: a strongly connected group of 2 or more cells, or a cell that reads itself.
- Cells that only depend on a cycle are not in the set.

## FORMAT: `format.mjs` (after VALUES)

`export function display(v)`:
- `""` stays `""`; booleans become `TRUE` and `FALSE`; errors and text stay as they are.
- A number is rounded to 9 decimal places and then given as `String`, so `0.1+0.2` shows as `0.3` and `1/3` as `0.333333333`.

## SHEET: `sheet.mjs` (after EVALUATOR, GRAPH, FORMAT)

`export function createSheet()` returns `{ set(cell, text), get(cell), display(cell) }`.

**`set(cell, text)`:**
- A bad cell name throws an `Error`.
- `""` clears the cell.
- Text starting with `=` is a formula. Its parse result is kept; a formula that fails to parse evaluates to `#VALUE!`.
- Other text goes through `parseLiteral`.
- Every `set` recalculates everything that depends on the cell.

**`get(cell)`** returns the current value:
- an empty cell is `""`;
- a number is rounded to 9 decimal places;
- a cell on a cycle (`cycleCells` over every formula's `refsOf`) is `ERRORS.CYCLE`. A cell that reads one gets that error by propagation.

**`display(cell)`** is `display(get(cell))`.

## GUIDE: `guide.md` (after SHEET)

A user guide for people who have never used a spreadsheet:
- a `# ` title line;
- one section per function, naming each one (`SUM`, `MIN`, `MAX`, `AVERAGE`, `COUNT`, `IF`, `ABS`, `ROUND`, `LEN`);
- a section on errors that names every error value;
- 300 to 900 words, reading ease at least 50.

Every example in it must be true of the shipped SHEET.
