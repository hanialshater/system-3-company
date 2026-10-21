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

// Independent BigInt reference: exact days-from-civil for any year, then the ISO rule
// (the Thursday of the date's week decides the ISO year).
const bigRef = (y, m, d) => {
  const Y = BigInt(y), M = BigInt(m), D = BigInt(d);
  const fl = (a, b) => (a >= 0n ? a / b : -((-a + b - 1n) / b));
  const civ = (y, m, d) => { // days since 1970-01-01
    const yy = m <= 2n ? y - 1n : y;
    const era = fl(yy, 400n), yoe = yy - era * 400n;
    const doy = (153n * (m + (m > 2n ? -3n : 9n)) + 2n) / 5n + d - 1n;
    const doe = yoe * 365n + yoe / 4n - yoe / 100n + doy;
    return era * 146097n + doe - 719468n;
  };
  const days = civ(Y, M, D);
  const wd = ((((days + 3n) % 7n) + 7n) % 7n) + 1n; // 1=Mon
  const thu = days + 4n - wd;
  // ISO year = civil year of the Thursday; it is Y-1, Y or Y+1
  let iy = Y + 1n;
  while (civ(iy, 1n, 1n) > thu) iy -= 1n;
  const wk = (thu - civ(iy, 1n, 1n)) / 7n + 1n;
  return [iy, wk];
};
const check = (y, m, d) => {
  const [iy, wk] = bigRef(y, m, d);
  const safe = iy >= BigInt(-Number.MAX_SAFE_INTEGER) && iy <= BigInt(Number.MAX_SAFE_INTEGER);
  if (safe) assert.deepEqual(isoWeek(y, m, d), [Number(iy), Number(wk)], `${y}-${m}-${d}`);
  else assert.throws(() => isoWeek(y, m, d), RangeError, `${y}-${m}-${d}`);
};
test('BigInt reference agrees with Date reference on small years (validates the reference)', () => {
  for (let y = -50; y <= 50; y++) for (const [m, d] of [[1, 1], [1, 3], [6, 15], [12, 29], [12, 31]])
    assert.deepEqual(bigRef(y, m, d).map(Number), ref(y, m, d), `${y}-${m}-${d}`);
});
test('large years: checker cases', () => {
  assert.deepEqual(isoWeek(24663691497547, 1, 1), [24663691497547, 1]);
  assert.deepEqual(isoWeek(140737488355327, 1, 1), [140737488355327, 1]);
  assert.deepEqual(isoWeek(562949953421311, 6, 15), [562949953421311, 25]);
  assert.deepEqual(isoWeek(-35184372088831, 12, 31), [-35184372088830, 1]);
});
test('large years: around 2.5e13, 2^47, 2^49, 2^52 and +-MAX_SAFE_INTEGER agree with BigInt reference', () => {
  const M = Number.MAX_SAFE_INTEGER;
  const centres = [2.466e13, 2.5e13, 2 ** 45, 2 ** 47, 2 ** 49, 2 ** 52, M - 500];
  const days = [[1, 1], [1, 2], [1, 3], [1, 4], [2, 28], [3, 1], [6, 15], [12, 28], [12, 29], [12, 30], [12, 31]];
  for (const c of centres) for (let y = c - 450; y <= Math.min(c + 450, M); y++) for (const [m, d] of days) {
    if (m === 2 && d === 29) continue;
    check(y, m, d); check(-y, m, d);
  }
  for (let y = M - 450; y <= M; y++) for (const [m, d] of days) { check(y, m, d); check(-y, m, d); }
});
test('every day of a few huge years agrees with BigInt reference', () => {
  const M = Number.MAX_SAFE_INTEGER;
  for (const y of [24663691497547, 562949953421311, M - 1, M, -M, -(M - 1), -35184372088831]) {
    for (let m = 1; m <= 12; m++) {
      const dim = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
      for (let d = 1; d <= dim; d++) {
        let ok = true;
        try { isoWeek(y, m, d); } catch (e) { if (m === 2 && d === 29) { ok = false; assert.ok(e instanceof RangeError); } else if (!(e instanceof RangeError)) throw e; }
        if (ok) check(y, m, d);
      }
    }
  }
});
test('ISO year outside safe range throws RangeError, never returns an unsafe integer', () => {
  const M = Number.MAX_SAFE_INTEGER;
  // Per the BigInt reference, MAX_SAFE_INTEGER-12-31 is in ISO week 52 of year M (no spill into 2^53);
  // the old code returned 2^53 here only because its weekday was wrong.
  assert.deepEqual(isoWeek(M, 12, 31), [M, 52]);
  // -MAX_SAFE_INTEGER-01-01 belongs to ISO year -2^53, which is unsafe: rejected.
  assert.throws(() => isoWeek(-M, 1, 1), RangeError);
  assert.deepEqual(isoWeek(-M, 1, 2), [-M, 1]);
  for (const y of [M, -M]) for (let m = 1; m <= 12; m++) for (let d = 1; d <= 28; d++) {
    try { const [iy] = isoWeek(y, m, d); assert.ok(Number.isSafeInteger(iy)); } catch (e) { assert.ok(e instanceof RangeError); }
  }
});
