import assert from 'node:assert/strict';
import * as m from './model.ts';
assert.equal(m.score(0),-9);assert.deepEqual(m.probe(0).candidates,[{x:-1,score:-16},{x:1,score:-4}]);assert.equal(m.probe(0).winner,1);assert.deepEqual(m.probe(1).candidates,[{x:0,score:-9},{x:2,score:-1}]);assert.equal(m.probe(1).winner,2);assert.equal(m.probe(3).winner,2);
console.log('PASS evolution-strategies');
