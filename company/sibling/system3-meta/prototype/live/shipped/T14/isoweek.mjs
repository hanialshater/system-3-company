// ISO 8601 week date, proleptic Gregorian calendar, pure integer arithmetic
// (avoids Date.UTC mapping years 0-99 to 1900-1999). Year may be any safe integer, including <= 0,
// but a date whose ISO year would fall outside the safe-integer range (only possible at
// +-Number.MAX_SAFE_INTEGER) throws RangeError rather than return an unsafe year.
// All arithmetic stays small: the weekday is computed from the year reduced mod 400 (the Gregorian
// cycle is 146097 days, an exact multiple of 7), so nothing ever exceeds 2^53.
function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
function daysInMonth(y, m) { return [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; }
function dayOfYear(y, m, d) { let n = d; for (let i = 1; i < m; i++) n += daysInMonth(y, i); return n; }
// ISO weekday 1=Mon..7=Sun, via days-from-civil (Howard Hinnant).
function weekday(y, m, d) {
  const r = ((y % 400) + 400) % 400; // exact for any safe integer; same weekdays as y
  const yy = (m <= 2 ? r - 1 : r) + 400; // 399..799, never negative
  const era = Math.floor(yy / 400);
  const yoe = yy - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  const days = era * 146097 + doe - 719468; // days since 1970-01-01 (a Thursday)
  return ((((days + 3) % 7) + 7) % 7) + 1;
}
function weeksInYear(y) {
  const jan1 = weekday(y, 1, 1);
  return jan1 === 4 || (jan1 === 3 && isLeap(y)) ? 53 : 52;
}

export function isoWeek(year, month, day) {
  for (const v of [year, month, day]) {
    if (typeof v !== 'number' || !Number.isSafeInteger(v)) throw new RangeError('date parts must be integers');
  }
  if (month < 1 || month > 12) throw new RangeError('month out of range');
  if (day < 1 || day > daysInMonth(year, month)) throw new RangeError('day out of range');
  const wd = weekday(year, month, day);
  const week = Math.floor((dayOfYear(year, month, day) - wd + 10) / 7);
  if (week < 1) {
    if (!Number.isSafeInteger(year - 1)) throw new RangeError('ISO year out of safe-integer range');
    return [year - 1, weeksInYear(year - 1)];
  }
  if (week > weeksInYear(year)) {
    if (!Number.isSafeInteger(year + 1)) throw new RangeError('ISO year out of safe-integer range');
    return [year + 1, 1];
  }
  return [year, week];
}
