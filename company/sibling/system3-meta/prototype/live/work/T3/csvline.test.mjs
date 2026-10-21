import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsvLine } from './csvline.mjs';

test('simple fields', () => assert.deepEqual(parseCsvLine('a,b,c'), ['a', 'b', 'c']));
test('empty line', () => assert.deepEqual(parseCsvLine(''), ['']));
test('empty fields', () => assert.deepEqual(parseCsvLine(',,'), ['', '', '']));
test('trailing comma', () => assert.deepEqual(parseCsvLine('a,'), ['a', '']));
test('no trimming', () => assert.deepEqual(parseCsvLine(' a , b '), [' a ', ' b ']));
test('quoted comma', () => assert.deepEqual(parseCsvLine('"a,b",c'), ['a,b', 'c']));
test('escaped quote', () => assert.deepEqual(parseCsvLine('"he said ""hi""",x'), ['he said "hi"', 'x']));
test('empty quoted', () => assert.deepEqual(parseCsvLine('"",""'), ['', '']));
test('quoted last', () => assert.deepEqual(parseCsvLine('a,"b"'), ['a', 'b']));
test('only quotes pair', () => assert.deepEqual(parseCsvLine('""""'), ['"']));
test('unterminated quote', () => assert.throws(() => parseCsvLine('"abc'), SyntaxError));
test('unterminated after escape', () => assert.throws(() => parseCsvLine('"a""'), SyntaxError));
test('quote inside unquoted', () => assert.throws(() => parseCsvLine('ab"c'), SyntaxError));
test('chars after closing quote', () => assert.throws(() => parseCsvLine('"a"b,c'), SyntaxError));
test('space after closing quote', () => assert.throws(() => parseCsvLine('"a" ,c'), SyntaxError));
