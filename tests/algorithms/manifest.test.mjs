import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {checkAlgorithms} from '../../tools/algorithms-200-check.mjs';

test('checker accepts authoritative flat lessons with slug indexes and the earlier nested shape; mismatches are reported',async()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'algorithm-manifest-'));
  try {
    const lesson={slug:'fixture',topicId:'fixtures',module:'fixture.mjs',specExport:'fixture',objective:'Combine cells'};
    fs.mkdirSync(path.join(root,'src/demos/cs/fixture'),{recursive:true});
    fs.writeFileSync(path.join(root,'fixture.mjs'),`const run=n=>({frames:[{caption:'Input',rows:[{label:'',cells:[{text:String(n)}]}]},{caption:'Double',rows:[{label:'',cells:[{text:String(n*2)}]}]}],proof:'Sum '+n*2,result:n*2});export const fixture={slug:'fixture',topic:'fixtures',predict:{question:'What sum?',options:['4','6'],answer:0},cases:[{label:'A',run:()=>run(2)},{label:'B',run:()=>run(3)}],reveal:w=>['The completed example retains '+w.proof+'. Combining the two identical cells counts each cell once, and the second input changes the computed total while keeping the same operation.']};`);
    fs.writeFileSync(path.join(root,'src/demos/cs/fixture/meta.json'),JSON.stringify({slug:'fixture',domain:'cs',objective:'Combine cells',claims:[]}));
    fs.writeFileSync(path.join(root,'src/demos/cs/fixture/Demo.tsx'),`import {fixture} from 'fixture.mjs'`);
    for(const manifest of [
      {lessons:[lesson],topics:[{id:'fixtures',slugs:['fixture']}]},
      {topics:[{id:'fixtures',lessons:[lesson]}]},
    ]){
      fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify(manifest));
      const result=await checkAlgorithms({root,manifest:'manifest.json',allowPartial:true});
      assert.equal(result.count,1);assert.deepEqual(result.errors,[]);
    }
    fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify({lessons:[lesson],topics:[{id:'fixtures',slugs:['wrong-slug']}]}));
    const mismatched=await checkAlgorithms({root,manifest:'manifest.json',allowPartial:true});
    assert.ok(mismatched.errors.includes('topic and flat lesson lists do not match'));
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
