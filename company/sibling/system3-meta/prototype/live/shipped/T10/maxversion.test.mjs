import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { maxVersion } from './maxversion.mjs';
import { compare } from '../T5/semver.mjs';

test('empty array returns null', () => {
  assert.equal(maxVersion([]), null);
});

test('single entry is returned', () => {
  assert.equal(maxVersion(['1.2.3']), '1.2.3');
});

test('highest by numeric precedence, not string order', () => {
  assert.equal(maxVersion(['1.9.0', '1.10.0', '1.2.0']), '1.10.0');
  assert.equal(maxVersion(['2.0.0', '10.0.0', '9.99.99']), '10.0.0');
  assert.equal(maxVersion(['0.0.1', '0.1.0', '0.0.9']), '0.1.0');
});

test('release outranks its prereleases; prerelease ordering per semver', () => {
  assert.equal(maxVersion(['1.0.0-rc.1', '1.0.0', '1.0.0-beta']), '1.0.0');
  const spec = ['1.0.0-alpha', '1.0.0-alpha.1', '1.0.0-alpha.beta', '1.0.0-beta',
    '1.0.0-beta.2', '1.0.0-beta.11', '1.0.0-rc.1'];
  assert.equal(maxVersion(spec), '1.0.0-rc.1');
  assert.equal(maxVersion([...spec].reverse()), '1.0.0-rc.1');
  assert.equal(maxVersion(['1.0.0-beta.2', '1.0.0-beta.11']), '1.0.0-beta.11');
});

test('position of the max does not matter', () => {
  const vs = ['1.0.0', '3.0.0', '2.0.0'];
  for (let k = 0; k < vs.length; k++) {
    const rot = [...vs.slice(k), ...vs.slice(0, k)];
    assert.equal(maxVersion(rot), '3.0.0');
  }
});

test('ties in precedence keep the first occurrence', () => {
  assert.equal(maxVersion(['1.0.0+b', '1.0.0+a']), '1.0.0+b');
  assert.equal(maxVersion(['0.1.0', '1.0.0+a', '1.0.0']), '1.0.0+a');
});

test('agrees with compare on large numbers', () => {
  const big = '9007199254740993.0.0';
  assert.equal(maxVersion(['9007199254740992.0.0', big]), big);
});

test('invalid entries throw the TypeError compare throws', () => {
  const cases = [['nope'], ['1.0.0', 'bad'], ['bad', '1.0.0'], ['1.0.0', '2.0.0', '01.0.0'],
    [42], ['1.0.0', null], ['1.0.0', undefined], ['1.0']];
  for (const list of cases) {
    const bad = list.find((v) => { try { compare(v, v); return false; } catch { return true; } });
    let expected;
    try { compare(bad, bad); } catch (e) { expected = e; }
    assert.ok(expected instanceof TypeError);
    assert.throws(() => maxVersion(list), (e) => e instanceof TypeError && e.message === expected.message,
      JSON.stringify(list));
  }
});

test('invalid entry is caught even when it would not change the max', () => {
  assert.throws(() => maxVersion(['9.0.0', 'x']), TypeError);
  assert.throws(() => maxVersion(['x']), TypeError);
});

test('sparse array holes are invalid entries', () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.throws(() => maxVersion(['1.0.0', , '2.0.0']), TypeError);
});

test('non-array input throws TypeError', () => {
  for (const v of [undefined, null, '1.0.0', 1, {}, new Set(['1.0.0'])]) {
    assert.throws(() => maxVersion(v), TypeError);
  }
});

test('does not mutate the input', () => {
  const list = ['1.0.0', '3.0.0', '2.0.0'];
  maxVersion(list);
  assert.deepEqual(list, ['1.0.0', '3.0.0', '2.0.0']);
});

test('imports compare from T5 and has no version-comparison logic of its own', () => {
  const src = readFileSync(new URL('./maxversion.mjs', import.meta.url), 'utf8');
  assert.match(src, /import\s*\{\s*compare\s*\}\s*from\s*'\.\.\/T5\/semver\.mjs'/);
  assert.doesNotMatch(src, /split\(|BigInt|parseInt|Number\(|RegExp|\/\^/);
});
