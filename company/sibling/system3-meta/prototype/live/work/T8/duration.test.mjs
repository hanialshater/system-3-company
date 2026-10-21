import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDuration } from './duration.mjs';

test('valid durations', () => {
  assert.equal(parseDuration('1h30m'), 5400000);
  assert.equal(parseDuration('2d'), 172800000);
  assert.equal(parseDuration('500ms'), 500);
  assert.equal(parseDuration('0s'), 0);
  assert.equal(parseDuration('1d2h3m4s5ms'), 86400000 + 7200000 + 180000 + 4000 + 5);
  assert.equal(parseDuration('1m'), 60000);
  assert.equal(parseDuration('1s5ms'), 1005);
  assert.equal(parseDuration('3m500ms'), 180500);
});

for (const bad of ['', ' ', '1.5h', '1h 30m', ' 1h', '1h ', '5', '1h30', '1y', '1x', '30m1h', '1h1h', '1ms1s',
                   '1s1s', 'h', '-1h', '+1h', '1H', 'ms', '1msms', '1hm']) {
  test(`rejects ${JSON.stringify(bad)}`, () => {
    assert.throws(() => parseDuration(bad), SyntaxError);
  });
}

test('rejects non-strings', () => {
  assert.throws(() => parseDuration(undefined), SyntaxError);
  assert.throws(() => parseDuration(5), SyntaxError);
});
