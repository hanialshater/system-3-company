import assert from "node:assert/strict";
import {DOCUMENTS,REQUIRED,ATTACHMENTS,initialState,transition,earned,compare} from "./model";
let state=initialState();assert.equal(earned(state),false);
for(const id of REQUIRED){const before=state;state=transition(state,{type:"select",id});assert.equal(state.active,id);assert(state.loaded.includes(id));assert.equal(before.loaded.includes(id),false);const twice=transition(state,{type:"select",id});assert.deepEqual(twice,state);for(const x of ATTACHMENTS[id]??[])assert(state.contexts.includes(x));}
assert.equal(earned(state),true);const reset=transition(state,{type:"reset"});assert.equal(reset.active,null);assert.deepEqual(reset.loaded,state.loaded);assert.deepEqual(reset.contexts,state.contexts);assert.equal(earned(reset),true);assert.deepEqual(transition(state,{type:"restart"}),initialState());
for(const missing of REQUIRED){let partial=initialState();for(const id of REQUIRED.filter(x=>x!==missing))partial=transition(partial,{type:"select",id});assert.equal(earned(partial),false);}
assert.deepEqual(transition(state,{type:"select",id:"unknown"}),state);assert.equal(compare(REQUIRED).records.length,DOCUMENTS.length);assert.deepEqual(compare(["unknown"]).unknown,["unknown"]);for(const d of DOCUMENTS){assert(d.fields.length);assert(d.attribution);assert(d.claims.length);}
console.log("PASS finite records, every missing-witness hold, contexts, DOM-order selection, duplicate selection, Reset retention, restart and unknown record");
