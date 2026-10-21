# Sheet: A First Guide

Sheet is a grid of boxes called cells. Each cell has a name made of one letter and a number, such as `A1` or `C7`. The letter is the column, from `A` to `Z`. The number is the row, from 1 to 99. Case does not matter, so `a1` and `A1` are the same cell.

## Putting things in cells

You can type a number, some text, or a formula into a cell.

- A number, such as `42` or `2.5`, is kept as a number.
- Text, such as `apples`, is kept as text. Even `TRUE` typed by itself is just text.
- A formula starts with `=`. Sheet works out its answer for you.
- An empty entry clears the cell.

A formula can do math with `+`, `-`, `*`, `/` and `^` (power). It can read other cells by name. When you change a cell, every formula that reads it is worked out again.

In the examples below, each line `A1: ...` is what you type in that cell. Each line `A1 shows ...` is what the cell then shows.

```
A1: 2
A2: 3
A3: =A1+A2*4
A3 shows 14
```

Times and divide come before plus and minus, as in school math. Use brackets to change the order:

```
A1: =(2+3)*4
A1 shows 20
```

The `&` sign joins two values into one piece of text:

```
A1: Hello
A2: =A1&" world"
A2 shows Hello world
```

You can compare two values with `=`, `<>`, `<`, `>`, `<=` and `>=`. The answer is `TRUE` or `FALSE`. Text is compared without caring about case.

```
A1: =3>2
A1 shows TRUE
A2: ="cat"="CAT"
A2 shows TRUE
```

Sheet shows at most nine digits after the dot:

```
A1: =1/3
A1 shows 0.333333333
A2: =0.1+0.2
A2 shows 0.3
```

## Ranges

A range is a block of cells. You write it as two corners with a colon between them. `A1:A3` means `A1`, `A2` and `A3`. `A1:B2` means `A1`, `A2`, `B1` and `B2`. Ranges are used inside functions.

## Functions

A function is a named tool. You write its name, then its inputs in brackets, split by commas.

### SUM

`SUM` adds numbers. In a range, only numbers count. Text and empty cells are skipped.

```
A1: 4
A2: 6
A3: pears
A4: =SUM(A1:A3)
A4 shows 10
A5: =SUM(1,2,3)
A5 shows 6
```

`SUM()` with nothing in it is 0.

### MIN

`MIN` gives the smallest number. `MIN()` with nothing in it is 0.

```
A1: 7
A2: 3
A3: 9
A4: =MIN(A1:A3)
A4 shows 3
```

### MAX

`MAX` gives the largest number. `MAX()` with nothing in it is 0.

```
A1: 7
A2: 3
A3: 9
A4: =MAX(A1:A3)
A4 shows 9
```

### AVERAGE

`AVERAGE` adds the numbers and divides by how many there are.

```
A1: 2
A2: 4
A3: 9
A4: =AVERAGE(A1:A3)
A4 shows 5
```

If there are no numbers at all, you get `#DIV/0!`.

### COUNT

`COUNT` tells you how many numbers there are. Text and empty cells are not counted.

```
A1: 5
A2: hello
A3: 8
A4: =COUNT(A1:A3)
A4 shows 2
```

### IF

`IF` makes a choice. It takes a test, a value for yes, and a value for no. If the test is true (or any number but zero), you get the yes value. If not, you get the no value. If you leave out the no value, you get `FALSE`.

```
A1: 80
A2: =IF(A1>=50,"pass","fail")
A2 shows pass
A3: =IF(0,"yes")
A3 shows FALSE
```

### ABS

`ABS` drops the minus sign. It takes one number.

```
A1: =ABS(-7)
A1 shows 7
```

### ROUND

`ROUND` rounds a number. The second input says how many digits to keep after the dot. If you leave it out, you get a whole number.

```
A1: =ROUND(3.14159,2)
A1 shows 3.14
A2: =ROUND(2.5)
A2 shows 3
```

### LEN

`LEN` counts the letters and other signs in a value.

```
A1: hello
A2: =LEN(A1)
A2 shows 5
A3: =LEN(12.5)
A3 shows 4
```

## Errors

When a formula cannot give an answer, the cell shows an error. An error passes on to any formula that reads it. Here is each one.

- `#DIV/0!`: you divided by zero.
- `#REF!`: you named a cell that does not exist, such as `AA1`.
- `#NAME?`: you used a function name that Sheet does not know.
- `#VALUE!`: a value is the wrong kind, such as text where a number should be. A formula that Sheet cannot read also shows this.
- `#CIRC!`: a cell reads itself, either at once or through other cells. This is a loop. A cell that reads a loop shows it too.

```
A1: =1/0
A1 shows #DIV/0!
A2: =AA1
A2 shows #REF!
A3: =FOO(1)
A3 shows #NAME?
A4: ="cat"+1
A4 shows #VALUE!
A5: =2+
A5 shows #VALUE!
A6: =A1+1
A6 shows #DIV/0!
```

Here is a loop. `B1` reads `B2`, and `B2` reads `B1`. `B3` reads the loop, so it shows the error too.

```
B1: =B2+1
B2: =B1+1
B3: =B1
B1 shows #CIRC!
B2 shows #CIRC!
B3 shows #CIRC!
```

To fix an error, change the cell that caused it. Every cell that reads it will then update.
