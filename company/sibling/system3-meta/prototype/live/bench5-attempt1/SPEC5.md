# Sheet: what a user sees (behaviour only)

You are building a small spreadsheet engine in plain JavaScript (ES modules, Node 22, no dependencies). This spec says only what the sheet does. How to split it into modules, and every interface between them, is the team's to decide (meeting MTG-1, recorded in ARCH.md). **The requirements come in three waves**: this is wave 1; waves 2 and 3 follow once wave 1 ships, and will add to (never contradict) what is here. Design for them.

The product is `createSheet()` exported from the integration module `live/bench5/work/SHEET/sheet.mjs`, returning `{ set(cell, text), get(cell), display(cell) }`. Cells are named A1..Z99 (one letter, then 1-99, no leading zero), case-insensitive; any other name throws an Error from `set` and `get`.

## Wave 1: values and formulas over literals

- `set(cell, text)`: `""` clears the cell. Text that does not start with `=` is a value: a plain number (optionally signed, optionally padded with spaces, like `" -2.5 "`, `7`, `.5`) becomes that number; anything else stays text (`"12abc"`, `"TRUE"` stay text). Text starting with `=` is a formula. `get` returns the current value: a number (rounded to 9 decimals), text, a boolean, `""` for an empty cell, or an error value.
- Formulas: numbers (digits with at most one dot: `3`, `2.5`, `.5`, `7.`; `1.2.3` is bad syntax), double-quoted strings (no escapes), `TRUE`/`FALSE` (any case), parentheses, unary minus and plus, and the operators below. Whitespace is ignored.
- Operators, loosest first: comparison `= <> < > <= >=`; then `&` (join as text); then `+ -`; then `* /`; then `^` (power, right-associative). Unary minus applies to the atom right after it, so `-2^2` is 4. All others are left-associative.
- Types: arithmetic and comparison treat `""` as 0, TRUE/FALSE as 1/0, numeric text as its number; other text is an error. `&` joins the text forms (`TRUE` → "TRUE", numbers as JavaScript prints them, `""` as nothing). Comparison of two strings is case-insensitive; otherwise both sides are numbers.
- Errors are values: `#DIV/0!` (division by zero), `#VALUE!` (a wrong type, a non-finite result such as `(-8)^(1/3)`, or a formula that does not parse), `#NAME?` (a call to any function: no functions exist in wave 1). An error in an operand is the result; with errors on both sides, the left one wins.
- `display(cell)`: the value as a user sees it: `""` empty, booleans `TRUE`/`FALSE`, numbers rounded to 9 decimals (`=1/3` shows `0.333333333`, `=0.1+0.2` shows `0.3`), text and errors as they are.

Examples: `=2+3*4` → 14 · `=2^3^2` → 512 · `=-2^2` → 4 · `="n="&5` → "n=5" · `="a"="A"` → TRUE · `="a"+1` → #VALUE! · `=1/0` → #DIV/0! · `=(1+2` → #VALUE! · `=FOO(1)` → #NAME? · `=TRUE+1` → 2.
