import assert from 'node:assert/strict';
import * as m from './model.ts';
assert.equal(m.execute(7,5),12);assert.equal(m.execute(7,'pear'),'Type error');assert.equal(m.execute(8,2),10);
console.log('PASS tool-call-request');
