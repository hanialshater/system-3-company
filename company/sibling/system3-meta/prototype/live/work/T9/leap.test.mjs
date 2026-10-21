import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isLeapYear } from './leap.mjs';

test('divisible by 4 and not a century is leap', () => {
  for (const y of [4, 1996, 2004, 2024]) assert.equal(isLeapYear(y), true, String(y));
});
test('not divisible by 4 is common', () => {
  for (const y of [1, 2, 3, 1999, 2023]) assert.equal(isLeapYear(y), false, String(y));
});
test('centuries are common unless divisible by 400', () => {
  for (const y of [100, 1700, 1800, 1900, 2100]) assert.equal(isLeapYear(y), false, String(y));
  for (const y of [400, 1600, 2000, 2400]) assert.equal(isLeapYear(y), true, String(y));
});
test('invalid inputs throw RangeError', () => {
  for (const v of [0, -1, -400, 1.5, NaN, Infinity, -Infinity, '2000', null, undefined, true, 2000n, {}, []]) {
    assert.throws(() => isLeapYear(v), RangeError, String(v));
  }
});
test('non-coercible inputs throw RangeError, not TypeError', () => {
  const throwing = { toString() { throw new Error('boom'); }, valueOf() { throw new Error('boom'); } };
  const proxy = new Proxy({}, { get() { throw new Error('trap'); } });
  for (const v of [Object.create(null), throwing, proxy, Symbol('y'), () => 2000, new Number(2000)]) {
    assert.throws(() => isLeapYear(v), RangeError, typeof v);
  }
});
test('revoked proxies and other exotic objects throw RangeError', () => {
  const { proxy: revokedObj, revoke: r1 } = Proxy.revocable({}, {});
  r1();
  const { proxy: revokedArr, revoke: r2 } = Proxy.revocable([], {});
  r2();
  const { proxy: revokedFn, revoke: r3 } = Proxy.revocable(function () {}, {});
  r3();
  const allTraps = new Proxy({}, new Proxy({}, { get() { throw new Error('any trap'); } }));
  const badTag = { get [Symbol.toStringTag]() { throw new Error('tag'); }, [Symbol.toPrimitive]() { throw new Error('prim'); } };
  const exotic = [
    revokedObj, revokedArr, revokedFn, allTraps, badTag,
    new Proxy([], {}), Object.create(null), new Date(2000, 0, 1), /2000/, new Map(), new Set(),
    new WeakMap(), Promise.resolve(2000), new Uint8Array(4), new ArrayBuffer(8), new Error('e'),
    Object(2000n), Object(Symbol('s')), new String('2000'), new Boolean(true), class {}, async () => {},
    function* () {}, Symbol.iterator, Symbol.for('y'), -0, 0.1, 2000.0000001, Number.MAX_VALUE * 10,
    Number.MIN_VALUE, 2 ** 51 + 0.5, -2000n, 0n, '', 'x'.repeat(1e6), '\u0000', false,
  ];
  for (const v of exotic) {
    let caught;
    try { isLeapYear(v); } catch (e) { caught = e; }
    assert.ok(caught instanceof RangeError, `expected RangeError for typeof ${typeof v}, got ${caught && caught.constructor && caught.constructor.name}`);
  }
});
test('error path survives tampered globals', () => {
  const origIsArray = Array.isArray, origStringify = JSON.stringify, origString = String.prototype.toString;
  try {
    Array.isArray = () => { throw new TypeError('tampered'); };
    JSON.stringify = () => { throw new TypeError('tampered'); };
    for (const v of [{}, [], 'x', null]) assert.throws(() => isLeapYear(v), RangeError);
  } finally {
    Array.isArray = origIsArray; JSON.stringify = origStringify; String.prototype.toString = origString;
  }
});
test('huge integers follow the rules and stay valid', () => {
  assert.equal(isLeapYear(Number.MAX_SAFE_INTEGER), false);
  assert.equal(isLeapYear(4e20), true); // integer-valued double, divisible by 400
});
