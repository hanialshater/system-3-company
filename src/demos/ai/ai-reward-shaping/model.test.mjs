import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {routes} from "./model.ts";
assert.equal(routes("raw").cash,3);assert.equal(routes("raw").detour,2.5);assert.equal(routes("bonus").detour,4.5);assert.equal(routes("bonus").winner,"detour");assert.deepEqual(routes("potential").rewards,[0,1]);assert.equal(routes("potential").cash,1);assert.equal(routes("potential").detour,.5);assert.equal(routes("potential").winner,"cash");assert.equal(routes("potential",.5,10).cash,6);assert.equal(routes("potential",.5,10).detour,3);assert.equal(routes("raw",1).detour,5);assert.equal(routes("bonus",1).detour,7);assert.equal(routes("potential",1).detour,3);assert.equal(routes("potential",1).cash,1);
console.log("PASS reward-shaping primary, contrast and boundaries");
