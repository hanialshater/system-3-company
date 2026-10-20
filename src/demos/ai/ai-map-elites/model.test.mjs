import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
import {replay,quality,cell,insert} from "./model.ts";
const t=replay();assert.deepEqual(t.archive.map(c=>c.id),["H","D","E","F"]);assert.deepEqual(t.archive.map(quality),[8,10,6,8]);assert.equal(t.coverage,4);assert.equal(t.sum,32);assert.equal(t.events[6].accepted,false);assert.equal(t.events[7].accepted,true);assert.equal(cell({id:"X",a:2,b:2}),3);assert.equal(cell({id:"X",a:2,b:0}),1);assert.equal(insert(t.archive,{id:"I",a:3,b:3}).accepted,false);assert.equal(insert([{id:"A",a:1,b:0},null,null,null],{id:"B",a:0,b:0}).accepted,false);assert.throws(()=>cell({id:"X",a:4,b:0}));for(let n=1;n<=8;n++)assert.doesNotThrow(()=>replay(n));
console.log("PASS map-elites primary, contrast and boundaries");
