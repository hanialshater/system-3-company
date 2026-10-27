// Builder fixtures, not independent fact-checking or learner evidence.
// Run: node --experimental-strip-types company/reviews/probability-100-2026-10-24/slice-a-check.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const expected={
 'maximum-likelihood':[27/256,27/256], 'bootstrap':[4,8/9],
 'build-a-synthetic-control':[7,8], 'why-is-data-missing':[30,40],
 'noisy-x-flattens-the-slope':[5/6,2], 'why-n-1':[1,.5],
 'find-each-one-s-twin':[10,80/3], 'two-trends':[0,6],
 'windmills-cause-wind':[2,3], 'strong-but-flat':[1,1],
 'restricted-range':[Math.sqrt(8/11),Math.sqrt(8/9)],
 'diff-in-diff-animated':[5,5], 'everyone-got-richer-average-fell':[16,28],
 'split-or-pool':[.1,-.22], 'will-rogers-effect':[2,6.5],
 'traffic-shift-mid-test':[.075,53/120], 'instrument-visualized':[5,7.5],
 'j-shaped-reviews':[40/43,3], 'length-bias':[.8,.5],
 'lead-time-bias':[5,2], 'who-drops-out':[5,0], 'publication-funnel':[1.5,0],
 'm-bias':[-1,0], 'scholarship-cutoff':[3,0], 'doubly-robust':[.2,.44],
 'minimum-detectable-effect':[19.79898987322333,9.899494936611665],
 'novelty-effect':[2+18*Math.exp(-3),20], 'blocked-randomization':[2,12],
 'cluster-trials':[250/7,100], 'sample-ratio-mismatch':[256,.256],
 'intent-to-treat-vs-per-protocol':[2,8], 'not-everyone-takes-the-pill':[2,8],
 'cuped':[.2,1], 'guardrail-metrics':[-12.5,50], 'monday-vs-weekend':[30/7,-4],
 'primacy-effect':[5-15*Math.exp(-3),5], 'twyman-s-law':[0,100],
 'fake-treatment-dates':[0,5], 'find-the-backdoor':[2,3.5],
 'ate-att-atc':[6.8,3.2], 'don-t-control-the-mediator':[7,1],
 'intervene':[4,6], 'same-data-different-graphs':[0,1], 'structural-equations':[2.5,5],
 'ladder-of-causation':[.5,.8], 'feature-importance-isn-t-causal':[.5,0],
 'unroll-the-loop':[.5,1], 'add-a-selection-node':[1,.5],
 'kitchen-sink-regression':[1,2], 'the-missing-half':[1.75,17],
};
const model=await import(pathToFileURL(path.resolve('src/lib/mini-lab/model.ts')));
assert.equal(Object.keys(expected).length,50);
let numeric=0,claims=0; const visuals=new Set();
for(const [key,values] of Object.entries(expected)){
 const slug=`p100-${key}`, dir=path.join('src/demos/probability',slug);
 const {spec,audit}=await import(pathToFileURL(path.resolve(dir,'spec.ts')));
 model.validateSpec(spec);
 for(const [i,name] of ['a','b'].entries()){
  assert.ok(Math.abs(audit[name]-values[i])<1e-9,`${slug}.${name}: ${audit[name]} != ${values[i]}`);numeric++;
 }
 const meta=JSON.parse(fs.readFileSync(path.join(dir,'meta.json')));
 assert.equal(meta.status,'draft');assert.equal(meta.confidence,'');
 assert.equal(meta.concept,slug);assert.equal(meta.curriculum.primary,`probability:${slug}`);
 assert.ok(meta.claims.every(c=>c.status==='unverified'&&!c.checkedBy));
 assert.equal(new Set(meta.claims.map(c=>c.id)).size,meta.claims.length);
 assert.ok(meta.recall.question!==spec.predict.question);
 assert.equal(meta.evidence.qa.length,0);assert.equal(meta.evidence.simulatedLearner.length,0);
 assert.ok(meta.title.length<=40&&meta.hook.length<=90);
 claims+=meta.claims.length;
 spec.scenarios.forEach(s=>s.frames.forEach(f=>visuals.add(f.visual.kind)));
}
console.log(`${Object.keys(expected).length} lesson specifications valid; ${numeric} numeric fixture assertions pass.`);
console.log(`${claims} claims remain unverified; visual families: ${[...visuals].sort().join(', ')}.`);
