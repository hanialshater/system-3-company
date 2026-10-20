import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10);
import {sketch,row,median,threeRows} from "./model.ts";
assert.equal(row(0).counter,3);assert.equal(row(0).estimate,3);assert.equal(row(1).estimate,7);assert.equal((row(0).estimate+row(1).estimate)/2,5);assert.equal(row(2).estimate,5);assert.deepEqual(threeRows(),{estimates:[3,7,5],estimate:5});assert.notEqual(threeRows().estimate,Math.min(...threeRows().estimates));
const neg=sketch([{id:"a",count:5,bucket:0,sign:-1},{id:"b",count:2,bucket:0,sign:1}],"a");assert.equal(neg.counter,-3);assert.equal(neg.estimate,3);assert.equal(sketch([{id:"a",count:4,bucket:0,sign:-1}],"a").estimate,4);assert.equal(row(0,1).counter,5);assert.throws(()=>median([]));assert.throws(()=>median([1,2]));assert.throws(()=>sketch([],"missing"));
console.log("PASS algo-count-sketch-signs primary, contrasts and boundaries");
