import assert from 'node:assert/strict';
import * as m from './model.ts';
assert.deepEqual(m.correlate(1),[-1,2,-1]);assert.deepEqual(m.correlate(2),[0,4,-1]);for(const k of [1,2])m.correlate(k).forEach((v,i)=>assert.equal(v,k*m.input[i]-m.input[i+1]));
console.log('PASS convolution-weight-sharing');
