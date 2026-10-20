import assert from 'node:assert/strict';
import * as m from './model.ts';
for(const a of [false,true])for(const b of [false,true])assert.equal(m.readDocument(a,b),a&&!b?9:4);
console.log('PASS prompt-injection');
