import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {adapt} from "./model.ts";
const t=adapt();assert.deepEqual(t.winners.map(c=>c.id),["A","B"]);assert.deepEqual(t.mean,[0,0]);assert.deepEqual(t.covariance,[[2.5,2],[2,2.5]]);assert.deepEqual(t.moment,[[4,4],[4,4]]);assert.deepEqual(t.eigenvalues,[4.5,.5]);for(let i=0;i<2;i++)for(let j=0;j<2;j++)near(t.L[i][0]*t.L[j][0]+t.L[i][1]*t.L[j][1],t.covariance[i][j]);near(t.next[0][0],Math.sqrt(2.5));near(t.next[0][1],2/Math.sqrt(2.5));near(t.next[2][1],Math.sqrt(.9));assert.deepEqual(adapt(true).covariance,[[2.5,-2],[-2,2.5]]);assert.deepEqual(adapt(true).winners.map(c=>c.id),["C","D"]);assert.deepEqual(adapt(true).mean,[0,0]);
console.log("PASS cma-es-shape primary, contrast and boundaries");
