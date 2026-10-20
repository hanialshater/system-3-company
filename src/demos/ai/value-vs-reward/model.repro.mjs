import assert from 'node:assert/strict';
import * as m from './model.ts';
assert.deepEqual(m.returns(1),{cash:3,wait:5});assert.deepEqual(m.returns(.5),{cash:3,wait:2.5});assert(m.returns(1).wait>m.returns(1).cash);assert(m.returns(.5).wait<m.returns(.5).cash);
console.log('PASS value-vs-reward');
