import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {compare,probability} from "./model.ts";
let t=compare();near(t.posterior[0],8/21);near(t.posterior[1],8/21);near(t.posterior[2],5/21);t=compare(2);near(t.posterior[0],64/153);near(t.posterior[2],25/153);assert.deepEqual(t.predictions,[.8,.8,.5]);assert.equal(probability([0,2]),.2);assert.equal(probability([-1,-3]),.8);assert.equal(probability([20,1]),.8);assert.equal(probability([2,2]),.5);for(let n=1;n<20;n++)near(compare(n).posterior[0],compare(n).posterior[1]);
console.log("PASS reward-ambiguity primary, contrast and boundaries");
