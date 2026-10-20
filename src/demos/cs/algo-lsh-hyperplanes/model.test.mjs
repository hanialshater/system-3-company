import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10);
import {bit,hash,angle,collisionProbability} from "./model.ts";
assert.deepEqual(hash().rows.map(v=>v.bit),[1,1,0]);assert.deepEqual(hash(true).rows.map(v=>v.bit),[1,1,1]);assert.equal(bit([0,1],[1,0]).bit,1);assert.equal(bit([1,0],[-2,1]).bit,0);assert.throws(()=>bit([1,0],[0,0]));assert.throws(()=>bit([0,0],[1,0]));assert.throws(()=>angle([1,0],[Infinity,0]));near(angle([1,0],[1,0]),0);near(angle([1,0],[0,1]),Math.PI/2);near(angle([1,0],[-1,0]),Math.PI);near(collisionProbability(0),1);near(collisionProbability(Math.PI/2),.5);near(collisionProbability(Math.PI),0);assert.throws(()=>collisionProbability(-1));assert.throws(()=>collisionProbability(NaN));
console.log("PASS algo-lsh-hyperplanes primary, contrasts and boundaries");
