import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {filter,shift,compare} from "./model.ts";
assert.deepEqual(filter([1,0,0,0,0,0]),[2,1,0,0,0,1]);assert.deepEqual(compare(0).shiftThenFilter,[1,2,1,0,0,0]);assert.equal(compare(0).equal,true);assert.deepEqual(compare(1).old,[2,0,0]);assert.deepEqual(compare(1).shiftThenFilter,[1,1,0]);assert.equal(compare(1).equal,false);assert.deepEqual(compare(2).shiftThenFilter,[0,2,0]);assert.equal(compare(2).equal,true);assert.deepEqual(compare(3).old,[0,0,0,0,1,2]);assert.deepEqual(compare(3).shiftThenFilter,[0,0,0,0,0,0]);assert.deepEqual(compare(3).filterThenShift,[0,0,0,0,0,1]);assert.equal(compare(3).equal,false);assert.deepEqual(shift([1,2,3],3),[1,2,3]);
console.log("PASS translation-equivariance primary, contrast and boundaries");
