import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9);
import {run,crossing,length} from './model.ts';assert.deepEqual(run().after,[0,2,1,3]);near(run().old,4+4*Math.sqrt(2));near(run().next,8);assert.equal(new Set(run().after).size,4);assert.equal(run(true).changed,false);near(run(true).old,run(true).next);assert.equal(crossing([0,0],[1,0],[1,0],[2,0]),false);assert.equal(crossing([0,0],[1,0],[0,1],[1,1]),false);assert.equal(crossing([0,0],[2,2],[0,2],[2,0]),true);near(length([0,1,2,3]),length([3,2,1,0]));
console.log("PASS algo-tsp-two-opt deterministic fixtures and boundary controls");
