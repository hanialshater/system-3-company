import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toKebab } from './kebab.mjs';

test('camelCase and PascalCase', () => {
  assert.equal(toKebab('helloWorld'), 'hello-world');
  assert.equal(toKebab('HelloWorldAgain'), 'hello-world-again');
});
test('acronym ends', () => {
  assert.equal(toKebab('XMLHttpRequest'), 'xml-http-request');
  assert.equal(toKebab('parseHTML'), 'parse-html');
  assert.equal(toKebab('getHTTPResponse'), 'get-http-response');
});
test('spaces, underscores, hyphens collapse to single hyphens', () => {
  assert.equal(toKebab('hello world'), 'hello-world');
  assert.equal(toKebab('snake_case_name'), 'snake-case-name');
  assert.equal(toKebab('a -_ b'), 'a-b');
  assert.equal(toKebab('already-kebab'), 'already-kebab');
});
test('trims leading and trailing separators', () => {
  assert.equal(toKebab('  __-hello World-_ '), 'hello-world');
  assert.equal(toKebab(''), '');
  assert.equal(toKebab(' _-'), '');
});
test('digits stay attached to the word before them', () => {
  assert.equal(toKebab('v2Api'), 'v2-api');
  assert.equal(toKebab('html5Parser'), 'html5-parser');
  assert.equal(toKebab('version 10'), 'version-10');
});
test('lowercases', () => {
  assert.equal(toKebab('ALLCAPS'), 'allcaps');
});
test('non-string throws TypeError', () => {
  for (const v of [null, undefined, 42, {}, [], Symbol('x')]) {
    assert.throws(() => toKebab(v), TypeError);
  }
});
