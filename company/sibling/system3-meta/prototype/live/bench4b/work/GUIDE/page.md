# Sheet: A First Guide

## What a sheet is

A sheet is a grid of boxes. Each box is a cell. A cell has a name: a letter for the column and a number for the row. The first cell is `A1`. The last one is `Z99`. Names do not care about case, so `a1` is the same cell as `A1`.

You can type a number, some text, or a formula into a cell. A formula starts with `=`. It works something out and shows the answer. When you change a cell, every formula that uses it updates at once.

## Our example

The examples below all use the same sheet. Type these three cells first:

- `A1` holds `2`
- `A2` holds `3`
- `A3` holds `hello`

Each example is a formula you can type into an empty cell, such as `B1`, and the answer it shows.

## Simple sums

You can use `+`, `-`, `*` (times), `/` (divide) and `^` (power). Brackets work too.

- `=A1+A2` shows `5`
- `=(A1+A2)*2` shows `10`
- `=2^3` shows `8`
- `=0.1+0.2` shows `0.3`

Use `&` to join things into text. `=A3&" world"` shows `hello world`.

You can compare two things with `=`, `<>`, `<`, `>`, `<=` and `>=`. The answer is `TRUE` or `FALSE`. `=A1<A2` shows `TRUE`.

## SUM

`SUM` adds numbers. A range such as `A1:A3` means every cell from `A1` to `A3`. Text in a range is skipped.

- `=SUM(A1:A3)` shows `5`
- `=SUM(1,2,3)` shows `6`

## MIN

`MIN` gives the smallest number.

- `=MIN(A1:A3)` shows `2`

## MAX

`MAX` gives the largest number.

- `=MAX(A1:A3)` shows `3`

## AVERAGE

`AVERAGE` adds the numbers and divides by how many there are.

- `=AVERAGE(A1:A2)` shows `2.5`

## COUNT

`COUNT` tells you how many numbers there are. Text does not count.

- `=COUNT(A1:A3)` shows `2`

## IF

`IF` makes a choice. It takes a test, then the answer when the test is true, then the answer when it is false.

- `=IF(A1>1,"big","small")` shows `big`
- `=IF(A1>5,"big","small")` shows `small`

## ABS

`ABS` drops the minus sign from a number.

- `=ABS(-7)` shows `7`

## ROUND

`ROUND` rounds a number. You can say how many places to keep after the dot. If you leave that out, it keeps none.

- `=ROUND(2.567,1)` shows `2.6`
- `=ROUND(2.5)` shows `3`

## LEN

`LEN` counts the letters in a piece of text.

- `=LEN(A3)` shows `5`

## Errors

Sometimes a formula cannot give an answer. Then the cell shows an error. Each error starts with `#`. If a formula uses a cell that has an error, it shows that error too.

- `#DIV/0!` means you divided by zero. `=A1/0` shows `#DIV/0!`
- `#VALUE!` means the kind of value is wrong, such as adding text to a number. It also shows when a formula is not written right. `=A3+1` shows `#VALUE!`
- `#REF!` means a cell name does not exist. `=AA1` shows `#REF!`
- `#NAME?` means there is no function with that name. `=FOO(1)` shows `#NAME?`
- `#CIRC!` means cells use each other in a loop. If `C1` holds `=C2` and `C2` holds `=C1`, both show `#CIRC!`

To fix an error, change the formula or the cells it uses. The answer will update by itself.
