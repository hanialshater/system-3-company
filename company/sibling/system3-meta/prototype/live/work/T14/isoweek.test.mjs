import test from 'node:test';
import assert from 'node:assert/strict';
import { isoWeek } from './isoweek.mjs';

test('ordinary dates', () => {
  assert.deepEqual(isoWeek(2026, 10, 21), [2026, 43]);
  assert.deepEqual(isoWeek(2024, 6, 15), [2024, 24]);
  assert.deepEqual(isoWeek(2000, 2, 29), [2000, 9]);
});
test('year boundaries', () => {
  assert.deepEqual(isoWeek(2005, 1, 1), [2004, 53]);
  assert.deepEqual(isoWeek(2005, 1, 2), [2004, 53]);
  assert.deepEqual(isoWeek(2005, 1, 3), [2005, 1]);
  assert.deepEqual(isoWeek(2007, 1, 1), [2007, 1]);
  assert.deepEqual(isoWeek(2007, 12, 30), [2007, 52]);
  assert.deepEqual(isoWeek(2007, 12, 31), [2008, 1]);
  assert.deepEqual(isoWeek(2008, 12, 29), [2009, 1]);
  assert.deepEqual(isoWeek(2009, 12, 31), [2009, 53]);
  assert.deepEqual(isoWeek(2010, 1, 3), [2009, 53]);
  assert.deepEqual(isoWeek(2010, 1, 4), [2010, 1]);
  assert.deepEqual(isoWeek(2020, 12, 31), [2020, 53]);
  assert.deepEqual(isoWeek(2021, 1, 3), [2020, 53]);
  assert.deepEqual(isoWeek(2021, 1, 4), [2021, 1]);
  assert.deepEqual(isoWeek(2016, 1, 3), [2015, 53]);
  assert.deepEqual(isoWeek(2019, 12, 30), [2020, 1]);
  assert.deepEqual(isoWeek(2026, 1, 1), [2026, 1]);
  assert.deepEqual(isoWeek(2027, 1, 1), [2026, 53]);
});
test('leap-year 53-week rule (Jan 1 on Wednesday in leap year)', () => {
  assert.deepEqual(isoWeek(1992, 12, 31), [1992, 53]); // 1992 starts Wed, leap
  assert.deepEqual(isoWeek(2024, 12, 30), [2025, 1]);  // 2024 starts Mon -> 52 weeks
});
test('years 0-99 and negative years are not mapped to 1900s', () => {
  assert.deepEqual(isoWeek(1, 1, 1), [1, 1]);        // 0001-01-01 is a Monday
  assert.deepEqual(isoWeek(99, 1, 1), [99, 1]);       // 0099-01-01 is a Thursday
  assert.deepEqual(isoWeek(0, 2, 29), [0, 9]);        // year 0 is leap (same cycle as 2000)
  assert.deepEqual(isoWeek(-400, 6, 15), isoWeek(2000, 6, 15).map((v, i) => (i === 0 ? v - 2400 : v)));
});
const ref = (y, m, d) => {
    const t = new Date(0);
    t.setUTCFullYear(y, m - 1, d); // avoids the 0-99 -> 1900s mapping
    const wd = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - wd);
    const iy = t.getUTCFullYear();
    const jan1 = new Date(0); jan1.setUTCFullYear(iy, 0, 1);
    return [iy, Math.ceil(((t - jan1) / 864e5 + 1) / 7)];
};
test('year-boundary days for years -500..500 agree with Date reference', () => {
  for (let y = -500; y <= 500; y++)
    for (const [m, d] of [[1, 1], [1, 2], [1, 3], [1, 4], [12, 28], [12, 29], [12, 30], [12, 31]])
      assert.deepEqual(isoWeek(y, m, d), ref(y, m, d), `${y}-${m}-${d}`);
});
test('agrees with Date-based reference over 1970-2100', () => {
  const ref0 = (y, m, d) => {
    const t = new Date(Date.UTC(y, m - 1, d));
    const wd = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - wd);
    const iy = t.getUTCFullYear();
    const wk = Math.ceil(((t - Date.UTC(iy, 0, 1)) / 864e5 + 1) / 7);
    return [iy, wk];
  };
  for (let t = Date.UTC(1970, 0, 1); t <= Date.UTC(2100, 11, 31); t += 864e5) {
    const dt = new Date(t);
    const y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, d = dt.getUTCDate();
    assert.deepEqual(isoWeek(y, m, d), ref0(y, m, d), `${y}-${m}-${d}`);
  }
});
test('invalid dates throw RangeError', () => {
  const bad = [
    [2026, 2, 30], [2026, 2, 29], [1900, 2, 29], [2100, 2, 29], [2026, 4, 31], [2026, 0, 1], [2026, 13, 1],
    [2026, 1, 0], [2026, 1, 32], [2026, -1, 1], [2026, 1, -1], [2026.5, 1, 1], [2026, 1.5, 1], [2026, 1, 1.5],
    [NaN, 1, 1], [2026, NaN, 1], [2026, 1, Infinity], [Infinity, 1, 1], ['2026', 1, 1], [2026, '1', 1], [2026, 1, '1'],
    [2026n, 1, 1], [null, 1, 1], [undefined, 1, 1], [2026, 1], [], [true, 1, 1], [new Number(2026), 1, 1], [2 ** 60, 1, 1],
  ];
  for (const args of bad) assert.throws(() => isoWeek(...args), RangeError, String(args));
});
