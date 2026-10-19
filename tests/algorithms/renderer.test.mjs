import { register } from 'node:module';
import test from 'node:test';
import assert from 'node:assert/strict';
register('../lifehacks/render-loader.mjs',import.meta.url);
const {createElement:h}=await import('react');
const {renderToStaticMarkup:render}=await import('react-dom/server');
const {AlgorithmStage,AlgorithmFrameView,AlgorithmReveal,useAlgorithmState}=await import('../../src/components/algorithms/AlgorithmLesson.tsx');
const {Lesson}=await import('../../src/kit/Lesson.tsx');
const {Control}=await import('../../src/kit/controls.tsx');
const {initialAlgorithmState,advanceAlgorithm}=await import('../../src/components/algorithms/AlgorithmState.ts');
const spec={slug:'renderer-fixture',topic:'test',predict:{question:'Which path?',options:['A','B'],answer:0},exploreHint:'Test both.',cases:[{label:'A',run:()=>({frames:[{caption:'Input',rows:[{label:'',cells:[{text:'3'},{text:'4'}]}]},{caption:'Combine',rows:[{label:'',cells:[{text:'7',tone:'good'}]}]}],proof:'Sum 7',result:7})},{label:'B',run:()=>({frames:[{caption:'Input',rows:[{label:'',cells:[{text:'4'},{text:'5'}]}]},{caption:'Combine',rows:[{label:'',cells:[{text:'9',tone:'good'}]}]}],proof:'Sum 9',result:9})}],reveal:w=>[`The completed question case retains ${w.proof}. That proof remains visible after resetting the exploration or running the second example, so the comparison still describes the original computation.`]};
function Wrapper(){const state=useAlgorithmState(spec);return h(Lesson,{slug:spec.slug,predict:spec.predict,reveal:()=>h(AlgorithmReveal,{spec,witness:state.witness})},({locked,interact})=>h(AlgorithmStage,{state},h('div',null,h(Control,{disabled:locked||!state.canRun,onClick:()=>state.run(interact)},'Run example'),h(Control,{disabled:locked||!state.canStep,onClick:()=>state.step(interact)},'Step'),h(Control,{disabled:locked||!state.canTryAnother,onClick:state.tryAnother},'Try another'),h(Control,{disabled:locked||!state.canReset,onClick:state.reset},'Reset'))));}
const presentation=(snapshot)=>({...snapshot,trace:snapshot.run,frame:snapshot.run.frames[snapshot.frameIndex]});
test('predict rendering locks all four controls, shows input, and exposes no completed witness',()=>{
  const html=render(h(Wrapper));
  assert.match(html,/data-phase="predict"/);
  const buttons=[...html.matchAll(/<button[^>]*data-qa="control"[^>]*>[\s\S]*?<\/button>/g)].map(m=>m[0]);
  assert.equal(buttons.length,4); assert.ok(buttons.every(b=>b.includes('disabled=""')));
  assert.ok(buttons[0].includes('Run example'));
  assert.doesNotMatch(html,/data-algorithm-proof|Sum 7|Sum 9/);
  assert.match(html,/data-algorithm-frame="0"/);
  assert.doesNotMatch(html,/aria-label="Trace position"|1\/2/);
});
test('reset rendering keeps the original proof alongside input; another case cannot rewrite the reveal',()=>{
  let snapshot=advanceAlgorithm(spec,initialAlgorithmState(spec),'run');
  snapshot=advanceAlgorithm(spec,snapshot,'another');
  snapshot=advanceAlgorithm(spec,snapshot,'reset');
  const html=render(h(AlgorithmStage,{state:presentation(snapshot)}));
  assert.match(html,/Seen/); assert.match(html,/Sum 7/); assert.doesNotMatch(html,/Sum 9/);
  assert.match(html,/data-algorithm-frame="0"/);
  assert.match(render(h(AlgorithmReveal,{spec,witness:snapshot.witness})),/Sum 7/);
});
test('graph representation preserves topology, direction and rejected-edge geometry',()=>{
  const html=render(h(AlgorithmFrameView,{frame:{caption:'Reject cycle',nodes:[{id:'a',label:'A',x:30,y:30},{id:'b',label:'B',x:90,y:90}],edges:[{from:'a',to:'b',directed:true,tone:'bad',label:'4'}]}}));
  assert.match(html,/viewBox="0 0 300 180"/);assert.match(html,/marker-end="url/);
  assert.match(html,/data-tone="bad"/);assert.match(html,/x1="30" y1="30" x2="90" y2="90"/);
});

test('trace position appears after a causal step rather than leaking computation length in predict',()=>{
  const initial=initialAlgorithmState(spec);
  assert.doesNotMatch(render(h(AlgorithmStage,{state:presentation(initial)})),/Trace position/);
  const stepped=advanceAlgorithm(spec,initial,'step');
  assert.match(render(h(AlgorithmStage,{state:presentation(stepped)})),/aria-label="Trace position">2\/2/);
});
