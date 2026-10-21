# Sheet: what a user sees (behaviour only)

You are building a small spreadsheet engine in plain JavaScript (ES modules, Node 22, no dependencies). This spec says only what the sheet does. How to split it into modules, and every interface between them, is the team's to decide (meeting MTG-1, recorded in ARCH.md). **The requirements come in three waves**: this is wave 1; waves 2 and 3 follow once wave 1 ships, and will add to (never contradict) what is here. Design for them.

The product is `createSheet()` exported from the integration module `live/bench5r/work/SHEET/sheet.mjs`, returning `{ set(cell, text), get(cell), display(cell) }`. Cells are named A1..Z99 (one letter, then 1-99, no leading zero), case-insensitive; any other name throws an Error from `set` and `get`.

## Wave 1: values and formulas over literals

- `set(cell, text)`: `""` clears the cell. Text that does not start with `=` is a value: a plain number (optionally signed, optionally padded with spaces, like `" -2.5 "`, `7`, `.5`) becomes that number; anything else stays text (`"12abc"`, `"TRUE"` stay text). Text starting with `=` is a formula. `get` returns the current value: a number (rounded to 9 decimals), text, a boolean, `""` for an empty cell, or an error value.
- Formulas: numbers (digits with at most one dot: `3`, `2.5`, `.5`, `7.`; `1.2.3` is bad syntax), double-quoted strings (no escapes), `TRUE`/`FALSE` (any case), parentheses, unary minus and plus, and the operators below. Whitespace is ignored.
- Operators, loosest first: comparison `= <> < > <= >=`; then `&` (join as text); then `+ -`; then `* /`; then `^` (power, right-associative). Unary minus applies to the atom right after it, so `-2^2` is 4. All others are left-associative.
- Types: arithmetic and comparison treat `""` as 0, TRUE/FALSE as 1/0, numeric text as its number; other text is an error. `&` joins the text forms (`TRUE` → "TRUE", numbers as JavaScript prints them, `""` as nothing). Comparison of two strings is case-insensitive; otherwise both sides are numbers.
- Errors are values: `#DIV/0!` (division by zero), `#VALUE!` (a wrong type, a non-finite result such as `(-8)^(1/3)`, or a formula that does not parse), `#NAME?` (a call to any function: no functions exist in wave 1). An error in an operand is the result; with errors on both sides, the left one wins.
- `display(cell)`: the value as a user sees it: `""` empty, booleans `TRUE`/`FALSE`, numbers rounded to 9 decimals (`=1/3` shows `0.333333333`, `=0.1+0.2` shows `0.3`), text and errors as they are.

Examples: `=2+3*4` → 14 · `=2^3^2` → 512 · `=-2^2` → 4 · `="n="&5` → "n=5" · `="a"="A"` → TRUE · `="a"+1` → #VALUE! · `=1/0` → #DIV/0! · `=(1+2` → #VALUE! · `=FOO(1)` → #NAME? · `=TRUE+1` → 2.

## Wave 2 (released after wave 1 shipped): references, ranges, functions, recalculation

- A formula can read cells: `=A1*2`. An empty cell reads as `""`. A name that is not a valid cell (`AA1`, `A100`, `A0`) gives `#REF!`. Cell names in formulas are case-insensitive.
- Every `set` recalculates everything that depends on the changed cell, through any chain.
- Ranges `A1:B3` (any two corners) are allowed only as function arguments; elsewhere they give `#VALUE!`. A range covers the rectangle, column by column.
- Functions (case-insensitive): `SUM MIN MAX AVERAGE COUNT IF ABS ROUND LEN`; any other name gives `#NAME?`.
  - `SUM MIN MAX AVERAGE COUNT` take any mix of values and ranges. From a range only number values count (text and blanks are skipped), but an error in a range cell is the result. Other arguments are converted to numbers (an error, or text that is not a number, is the result). A range with an invalid corner gives `#REF!`. SUM of nothing is 0, COUNT counts numbers, MIN and MAX of nothing are 0, AVERAGE of nothing is `#DIV/0!`.
  - `IF(c, a[, b])`: fewer than 2 or more than 3 arguments → `#VALUE!`; an error in `c` is the result; `c` converted to a number decides: non-zero → `a`, zero → `b` (or FALSE without `b`); only the chosen branch is evaluated.
  - `ABS(x)` and `LEN(x)` take exactly one argument; `ROUND(x[, d])` one or two (`Math.round(x·10^d)/10^d`, d defaults to 0). LEN is the length of the value's text form. Wrong counts → `#VALUE!`; errors propagate.

Examples: A1=5, `=A1*2` → 10 · `=SUM(A1:A4)` over 1,2,3,4 → 10 · `=COUNT(A1:A3)` over 1,"word",3 → 2 · `=AVERAGE(A5:A9)` over blanks → #DIV/0! · `=IF(1,2,1/0)` → 2 · `=ROUND(1234,-2)` → 1200 · `=A100` → #REF!.

## Wave 3 (released after wave 2 shipped): cycles, error propagation, scale

- A cell on a reference cycle (it reads itself, directly or through other cells, including through a range) is the error `#CYCLE!`, and so is every cell that reads one. Breaking the cycle (changing or clearing a cell in it) recalculates everything back to normal values.
- Errors propagate through any chain of formulas and functions, the left operand's error first.
- Scale: chains 99 rows long and formulas over the whole sheet (`=SUM(A1:Z10)`) must work.
- Odd input: `=1e3` and `=1.2.3` are `#VALUE!`; `=0^0` is 1; `="5"+1` is 6; a formula `=A1:A2` in A1 is a cycle.
