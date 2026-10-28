// Independent finite examples for each lesson's question-case calculation.
// Run with: node --import ./tests/lifehacks/register.mjs company/reviews/behavioral-100-2026-10-24/fixtures.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {validateSpec,advance,initialState,availability,displayedFrame} from '../../../src/lib/mini-lab/model.ts';
const manifest=JSON.parse(fs.readFileSync(new URL('./manifest.json',import.meta.url)));
const expected=[4,40,-20,8,120,5000,120,5,25,3,5,28,18,60,6,0,18,0,2,12,10,0,42,70,1.6,0,40,8,5,20,130,3,26,11,5,0,7,1,0,11,50,6.2,40,1,-10,.64,10,2,.5,6.3,8,40,100*.99**20,1,-1,20,-200,80,60,31,-1,2,50,8,180,20,30,10,1,2,0,-8.7,15,7,0,65,54,100/1.05,2,100/3,100,50,.68,90,750,1,30,-1,6,-5,3,-3,4,110,-1,0,64,1100/18,.5,.065];
const focus=[2,0,0,0,0,1,1,0,1,0,2,0,1,1,0,1,0,2,0,1,1,1,0,0,0,1,0,0,0,0,0,0,2,0,0,2,0,1,0,2,0,2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,0,0,2,1,0,0,0,2,0,0,0,0,0,0,0,0,0,1,1,0,0,0];
assert.equal(manifest.length,100); assert.equal(expected.length,100);assert.equal(focus.length,100);
let checks=0;
for(let i=0;i<manifest.length;i++){
 const item=manifest[i],base=path.resolve('src/demos/behavioral',item.slug);
 const {compute}=await import(pathToFileURL(path.join(base,'model.ts')));
 const {spec}=await import(pathToFileURL(path.join(base,'spec.ts')));
 const actual=compute(item.a)[focus[i]];
 assert.ok(Math.abs(actual-expected[i])<1e-9,`${item.slug}: ${actual} != ${expected[i]}`);checks++;
 validateSpec(spec);checks++;
 let s=initialState();assert.equal(availability(spec,s).compare,false);
 s=advance(spec,s,'run');assert.deepEqual(s.witnessed,[true,false]);
 s=advance(spec,s,'compare');assert.deepEqual(s.witnessed,[true,true]);
 s=advance(spec,s,'reset');assert.deepEqual(s.witnessed,[true,true]);assert.ok(displayedFrame(spec,s));checks++;
 const meta=JSON.parse(fs.readFileSync(path.join(base,'meta.json')));
 assert.equal(meta.status,'draft');assert.ok(meta.claims.every(c=>c.status==='unverified'&&!c.checkedBy));checks++;
 assert.equal(meta.sourceProvenance.entry,item.sourceEntryId);assert.ok(meta.sourceProvenance.text);checks++;
}
console.log(`${checks} fixture/state/provenance checks passed for ${manifest.length} behavioral drafts.`);
