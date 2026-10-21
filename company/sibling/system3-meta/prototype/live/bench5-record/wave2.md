
## Wave 2 (released after wave 1 shipped): references, ranges, functions, recalculation

- A formula can read cells: `=A1*2`. An empty cell reads as `""`. A name that is not a valid cell (`AA1`, `A100`, `A0`) gives `#REF!`. Cell names in formulas are case-insensitive.
- Every `set` recalculates everything that depends on the changed cell, through any chain.
- Ranges `A1:B3` (any two corners) are allowed only as function arguments; elsewhere they give `#VALUE!`. A range covers the rectangle, column by column.
- Functions (case-insensitive): `SUM MIN MAX AVERAGE COUNT IF ABS ROUND LEN`; any other name gives `#NAME?`.
  - `SUM MIN MAX AVERAGE COUNT` take any mix of values and ranges. From a range only number values count (text and blanks are skipped), but an error in a range cell is the result. Other arguments are converted to numbers (an error, or text that is not a number, is the result). A range with an invalid corner gives `#REF!`. SUM of nothing is 0, COUNT counts numbers, MIN and MAX of nothing are 0, AVERAGE of nothing is `#DIV/0!`.
  - `IF(c, a[, b])`: fewer than 2 or more than 3 arguments → `#VALUE!`; an error in `c` is the result; `c` converted to a number decides: non-zero → `a`, zero → `b` (or FALSE without `b`); only the chosen branch is evaluated.
  - `ABS(x)` and `LEN(x)` take exactly one argument; `ROUND(x[, d])` one or two (`Math.round(x·10^d)/10^d`, d defaults to 0). LEN is the length of the value's text form. Wrong counts → `#VALUE!`; errors propagate.

Examples: A1=5, `=A1*2` → 10 · `=SUM(A1:A4)` over 1,2,3,4 → 10 · `=COUNT(A1:A3)` over 1,"word",3 → 2 · `=AVERAGE(A5:A9)` over blanks → #DIV/0! · `=IF(1,2,1/0)` → 2 · `=ROUND(1234,-2)` → 1200 · `=A100` → #REF!.
