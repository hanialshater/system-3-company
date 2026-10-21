
## Wave 3 (released after wave 2 shipped): cycles, error propagation, scale

- A cell on a reference cycle (it reads itself, directly or through other cells, including through a range) is the error `#CYCLE!`, and so is every cell that reads one. Breaking the cycle (changing or clearing a cell in it) recalculates everything back to normal values.
- Errors propagate through any chain of formulas and functions, the left operand's error first.
- Scale: chains 99 rows long and formulas over the whole sheet (`=SUM(A1:Z10)`) must work.
- Odd input: `=1e3` and `=1.2.3` are `#VALUE!`; `=0^0` is 1; `="5"+1` is 6; a formula `=A1:A2` in A1 is a cycle.
