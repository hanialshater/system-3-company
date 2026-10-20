import assert from 'node:assert/strict';
import * as m from './model.ts';
assert.deepEqual(m.transition('A','right'),{state:'B',reward:0});assert.deepEqual(m.transition('B','right'),{state:'C',reward:2});for(const s of ['A','B','C'])assert.deepEqual(m.transition(s,'stay'),{state:s,reward:0});assert.deepEqual(m.transition('C','right'),{state:'C',reward:0});
console.log('PASS mdp-basics');
