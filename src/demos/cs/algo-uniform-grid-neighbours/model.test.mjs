import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10);
import {cell,run,search} from "./model.ts";
assert.deepEqual(run().candidates.map(p=>p.id),["A","B"]);assert.deepEqual(run().neighbours.map(p=>p.id),["A"]);assert.equal(run().candidates.some(p=>p.id==="C"),false);assert.equal(run(true).k,3);assert.deepEqual(run(true).neighbours.map(p=>p.id),["A"]);assert.deepEqual(run(true,true).neighbours,[]);assert.deepEqual(cell({id:"N",x:-.1,y:.1},1),[-1,0]);assert.deepEqual(cell({id:"B",x:.9,y:.1},.4),[2,0]);
const q={id:"q",x:0,y:0};assert.equal(search(q,[{id:"E",x:1,y:0}],1,1).neighbours.length,1);assert.equal(search(q,[{id:"Z",x:0,y:0}],1,0).neighbours.length,1);const dense=Array.from({length:100},(_,i)=>({id:String(i),x:.1+i/10000,y:.1}));assert.equal(search(q,dense,1,1).candidates.length,100);
for(const h of [.4,.5,1,2])for(const radius of [0,.5,1,2]){const points=Array.from({length:121},(_,i)=>({id:String(i),x:(i%11-5)/3,y:(Math.floor(i/11)-5)/3}));for(const offset of [-.1,.1,.9]){const query={id:"q",x:offset,y:-offset};const actual=search(query,points,h,radius).neighbours.map(p=>p.id).sort(),brute=points.filter(p=>(p.x-query.x)**2+(p.y-query.y)**2<=radius*radius).map(p=>p.id).sort();assert.deepEqual(actual,brute);}}
assert.throws(()=>cell(q,0));
console.log("PASS algo-uniform-grid-neighbours primary, contrasts and boundaries");
