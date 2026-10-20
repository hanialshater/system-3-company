import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9);
import {run,query,boxes} from './model.ts';assert.deepEqual(run().visited,['A','B']);assert.deepEqual(run(true).visited,['A']);assert.equal(query([6,1]).visited.length,0);assert.deepEqual(query([2,1]).visited,['A','B']);assert.equal(run().hits.length,0);assert.deepEqual(query([0,0]).hits,[[0,0]]);for(const b of boxes)for(const p of b.points)assert.ok(p[0]>=b.box[0]&&p[0]<=b.box[1]&&p[1]>=b.box[2]&&p[1]<=b.box[3]);assert.throws(()=>query([NaN,0]));
console.log("PASS algo-rtree-overlap deterministic fixtures and boundary controls");
