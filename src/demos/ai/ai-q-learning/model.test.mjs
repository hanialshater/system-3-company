import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {update,trace} from "./model.ts";
const t=trace();assert.equal(t.first.target,2);assert.equal(t.first.value,1);assert.equal(t.second.value,1.5);assert.equal(t.terminal.continuation,0);assert.equal(t.terminal.value,2.5);assert.equal(trace(0).first.value,0);assert.equal(update(2,1,[2,6]).value,3);assert.equal(update(4,2,[99],true,.5,0).value,4);assert.equal(update(4,2,[99],true,.5,1).value,2);
console.log("PASS q-learning primary, contrast and boundaries");
