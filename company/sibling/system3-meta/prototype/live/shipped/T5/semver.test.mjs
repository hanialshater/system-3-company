import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compare } from './semver.mjs';

test('core numeric ordering', () => {
  assert.equal(compare('1.0.0', '2.0.0'), -1);
  assert.equal(compare('2.0.0', '2.1.0'), -1);
  assert.equal(compare('2.1.0', '2.1.1'), -1);
  assert.equal(compare('1.10.0', '1.9.0'), 1);
  assert.equal(compare('1.2.3', '1.2.3'), 0);
});
test('spec 11.4 example chain', () => {
  const chain = ['1.0.0-alpha', '1.0.0-alpha.1', '1.0.0-alpha.beta', '1.0.0-beta',
    '1.0.0-beta.2', '1.0.0-beta.11', '1.0.0-rc.1', '1.0.0'];
  for (let i = 0; i < chain.length - 1; i++) {
    assert.equal(compare(chain[i], chain[i + 1]), -1, `${chain[i]} < ${chain[i + 1]}`);
    assert.equal(compare(chain[i + 1], chain[i]), 1);
  }
});
test('prerelease below release', () => assert.equal(compare('1.0.0-rc.1', '1.0.0'), -1));
test('numeric below alphanumeric', () => assert.equal(compare('1.0.0-1', '1.0.0-a'), -1));
test('alphanumeric ASCII order, hyphen and case', () => {
  assert.equal(compare('1.0.0-B', '1.0.0-a'), -1);
  assert.equal(compare('1.0.0--', '1.0.0-0a'), -1);
  assert.equal(compare('1.0.0-0a', '1.0.0-1'), 1); // 0a is alphanumeric
});
test('build ignored', () => {
  assert.equal(compare('1.0.0+build.1', '1.0.0+build.2'), 0);
  assert.equal(compare('1.0.0-alpha+001', '1.0.0-alpha'), 0);
  assert.equal(compare('1.0.0+0001', '1.0.0'), 0); // leading zeros allowed in build
});
test('large numbers compared exactly', () => {
  assert.equal(compare('1.0.9007199254740993', '1.0.9007199254740992'), 1);
  assert.equal(compare('1.0.0-9007199254740993', '1.0.0-9007199254740992'), 1);
});
test('invalid versions throw TypeError', () => {
  const bad = ['1.0', '1', '1.0.0.0', '01.0.0', '1.00.0', '1.0.01', '1.0.0-01', '1.0.0-',
    '1.0.0-a..b', '1.0.0-a.', '1.0.0+', '1.0.0+a..b', 'a.b.c', '', ' 1.0.0', '1.0.0-a_b',
    '-1.0.0', '1.0.0-alpha+b+c', 'v1.0.0'];
  for (const v of bad) {
    assert.throws(() => compare(v, '1.0.0'), TypeError, v);
    assert.throws(() => compare('1.0.0', v), TypeError, v);
  }
  assert.throws(() => compare(null, '1.0.0'), TypeError);
});
test('zero prerelease identifier valid', () => assert.equal(compare('1.0.0-0', '1.0.0-0'), 0));
