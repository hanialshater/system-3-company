import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {infer,observations} from "./model.ts";
near(infer(["Red"]).posterior[0],.8);near(infer(["Red","Red"]).posterior[0],16/17);near(infer(observations).likelihoods[0],.128);near(infer(observations).likelihoods[1],.032);near(infer(observations).posterior[0],.8);near(infer(observations,.5).posterior[0],.5);near(infer(["Blue","Blue","Red"]).posterior[1],.8);assert.deepEqual(infer([]).posterior,[.5,.5]);assert.throws(()=>infer(["Blue","Red"],1));
console.log("PASS inverse-rl-goal-inference primary, contrast and boundaries");
