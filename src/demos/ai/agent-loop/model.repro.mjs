import assert from 'node:assert/strict';
import * as m from './model.ts';
assert.deepEqual(m.trace(true),['closed → open','jammed → help','help requested → stop']);assert.deepEqual(m.trace(false),['closed → open','open → read','ticket 6 → stop']);assert(!m.trace(true).some(x=>x.includes('read')));
console.log('PASS agent-loop');
