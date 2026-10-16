import test from 'node:test';
import assert from 'node:assert/strict';
import { initialAlgorithmState, advanceAlgorithm, algorithmAvailability } from '../../src/components/algorithms/AlgorithmState.ts';
import { validateAlgorithmSpec } from '../../tools/algorithms-200-check.mjs';

const sumRun = (values) => {
  const frames = [{ caption:'Input', rows:[{ label:'', cells:values.map((v) => ({text:String(v)})) }] }];
  let sum = 0;
  for (let i=0; i<values.length; i++) {
    sum += values[i];
    frames.push({ caption:'Accumulate', rows:[{label:'',cells:values.map((v,j)=>({text:String(v),tone:j===i?'active':'plain'}))}], metrics:[{label:'Sum',value:String(sum)}] });
  }
  return { frames, result:sum, proof:`Sum ${sum}` };
};
export const spec = {
  slug:'sum-fixture',topic:'fixtures',predict:{question:'What total will the two numbers produce?',options:['7','9'],answer:0},exploreHint:'Run, or inspect each step.',
  cases:[{label:'A',run:()=>sumRun([3,4])},{label:'B',run:()=>sumRun([4,5])}],
  reveal:(w)=>[`Seen records ${w.proof}. Each highlighted cell contributes once to the running total. The second input changes the total; it does not change the rule used to combine the cells.`]
};

test('a synchronous Run witnesses the question case and retains it after another/reset',()=>{
  let s=initialAlgorithmState(spec);
  assert.equal(s.frameIndex,0); assert.equal(s.witness,null);
  assert.equal(algorithmAvailability(s).canTryAnother,false);
  const initial=s;
  s=advanceAlgorithm(spec,s,'run');
  assert.equal(s.frameIndex,2); assert.equal(s.witness.result,7);
  const witness=s.witness;
  assert.equal(algorithmAvailability(s).canRun,false);
  assert.equal(advanceAlgorithm(spec,s,'run'),s,'disabled Run is a no-op transition');
  s=advanceAlgorithm(spec,s,'another');
  assert.equal(s.run.result,9); assert.equal(s.witness,witness);
  assert.equal(algorithmAvailability(s).canTryAnother,false);
  s=advanceAlgorithm(spec,s,'reset');
  assert.deepEqual(s.run.frames[0],initial.run.frames[0]); assert.equal(s.frameIndex,0);
  assert.equal(s.witness,witness); assert.match(spec.reveal(s.witness).join(' '),/Sum 7/);
  assert.equal(algorithmAvailability(s).canReset,false);
});

test('Step advances causal frames and earns evidence only on the final step',()=>{
  let s=initialAlgorithmState(spec);
  s=advanceAlgorithm(spec,s,'step');
  assert.equal(s.frameIndex,1); assert.equal(s.witness,null);
  assert.equal(s.run.frames[1].metrics[0].value,'3');
  s=advanceAlgorithm(spec,s,'step');
  assert.equal(s.run.frames[2].metrics[0].value,'7'); assert.equal(s.witness.result,7);
  assert.equal(algorithmAvailability(s).canStep,false);
  assert.equal(advanceAlgorithm(spec,s,'step'),s);
});

test('arbitrary reset/another cannot substitute for the question-case milestone',()=>{
  const initial=initialAlgorithmState(spec);
  assert.equal(advanceAlgorithm(spec,initial,'another'),initial);
  assert.equal(advanceAlgorithm(spec,initial,'reset'),initial);
  let state=advanceAlgorithm(spec,initial,'step');
  state=advanceAlgorithm(spec,state,'reset');
  assert.equal(state.witness,null);
  state=advanceAlgorithm(spec,state,'run');
  state=advanceAlgorithm(spec,state,'reset');
  state=advanceAlgorithm(spec,state,'another');
  assert.equal(state.run.result,9); assert.equal(state.witness.result,7);
});

test('validator accepts a finite two-case computation and rejects malformed geometry, duplicate cases and oversized traces',()=>{
  assert.deepEqual(validateAlgorithmSpec(spec).errors,[]);
  const identical={...spec,cases:[spec.cases[0],spec.cases[0]]};
  assert.ok(validateAlgorithmSpec(identical).errors.some((e)=>e.includes('second case')));
  const invalid={...spec,cases:[{label:'bad',run:()=>({frames:[{caption:'Input',nodes:[{id:'A',label:'A',x:Infinity,y:20}],edges:[{from:'A',to:'B'}]},{caption:'End',rows:[{label:'',cells:[{text:'1'}]}]}],proof:'Result 1',result:1})},spec.cases[1]]};
  const errors=validateAlgorithmSpec(invalid).errors.join('\n');
  assert.match(errors,/coordinates/); assert.match(errors,/endpoint/);
  const oversized={...spec,cases:[{label:'large',run:()=>({...sumRun([3,4]),frames:Array.from({length:65},(_,i)=>({caption:String(i),rows:[{label:'',cells:[{text:String(i)}]}]}))})},spec.cases[1]]};
  assert.ok(validateAlgorithmSpec(oversized).errors.some((e)=>e.includes('2–64')));
});
