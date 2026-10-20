import assert from "node:assert/strict";
import {points,split} from "./model.ts";
for(const contrast of [false,true]){const s=split(points(contrast));assert.equal(s.pivot.id,"C");assert.deepEqual([s.left.length,s.right.length], [2,2]);assert.deepEqual(s.areas,[24,56]);}
const tied=["D","A","C","B"].map(id=>({id,x:3,y:1}));const t=split(tied);assert.equal(t.pivot.id,"C");assert.deepEqual([...t.left,t.pivot,...t.right].map(p=>p.id),["A","B","C","D"]);assert.equal(new Set([...t.left,t.pivot,...t.right].map(p=>p.id)).size,4);
assert.equal(split([{id:"A",x:1,y:9},{id:"B",x:2,y:1},{id:"C",x:3,y:4}],"y",[0,10,0,10]).pivot.id,"C");
assert.throws(()=>split([]));console.log("PASS median primary/contrast, coordinate ties, even upper-middle, y-axis, empty input");

assert.deepEqual(t.leftBounds,[0,3,0,8]);assert.deepEqual(t.rightBounds,[3,10,0,8]);
