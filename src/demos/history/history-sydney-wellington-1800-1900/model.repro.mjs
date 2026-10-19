import ts from 'typescript';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8').replace('import {lessonData} from "./data";','const lessonData={documents:[]};');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const m=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
let state=m.transition(m.initialState(),{type:'commit'});
for(const id of m.REQUIRED){state=m.transition(state,{type:'navigate',target:id});assert.equal(state.frame,id);const proof={generation:state.generation,witness:id,frame:id,text:m.frameText(id),contexts:m.requiredContexts(id),ordinaryVisible:true};state=m.transition(state,{type:'mounted',proof});assert.equal(m.canDeliverFinal(state),false);}
state=m.transition(state,{type:'navigate',target:'comparison'});assert.equal(state.frame,'comparison');assert.equal(m.canDeliverFinal(state),false);
state=m.transition(state,{type:'mounted',proof:{generation:state.generation,witness:null,frame:'comparison',text:m.frameText('comparison'),contexts:[],ordinaryVisible:true}});assert.equal(m.canDeliverFinal(state),true);
const reset=m.transition(state,{type:'reset'});assert.deepEqual(reset.earned,state.earned);assert.equal(reset.active,null);assert.equal(m.canDeliverFinal(m.transition(state,{type:'restart'})),false);
console.log('qualified witness / mounted comparison gate PASS');
