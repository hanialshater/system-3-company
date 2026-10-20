import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {correlate,footprint,impulse} from "./model.ts";
assert.deepEqual(impulse().hidden,[[1,1,1],[1,1,1],[1,1,1]]);assert.equal(impulse().output,9);assert.equal(impulse(true).output,1);assert.equal(impulse(false,true).output,0);assert.equal(footprint(1).size,9);assert.equal(footprint(2).size,25);assert.equal(footprint(3).size,49);assert.equal(correlate(correlate(correlate(Array.from({length:7},()=>Array(7).fill(1)))))[0][0],729);assert.throws(()=>correlate([[1,2],[3,4]]));
console.log("PASS receptive-field-growth primary, contrast and boundaries");
