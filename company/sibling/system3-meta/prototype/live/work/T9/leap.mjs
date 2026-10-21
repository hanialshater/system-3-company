// Gregorian leap year test.
export function isLeapYear(year) {
  if (typeof year !== 'number' || !Number.isInteger(year) || year < 1) {
    throw new RangeError(`isLeapYear: expected an integer year >= 1, got ${String(year)}`);
  }
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
