import test from 'node:test';
import assert from 'node:assert/strict';
import {preferencePatch} from '../../src/lib/preference-patch.ts';
const saved={personalizationOn:true,subjects:['physics'],experiences:['surprise'],challenge:'gentle',lessOf:[]};
test('subject-only edit omits another tabs untouched challenge, experiences and on',()=>assert.deepEqual(preferencePatch(saved,{...saved,subjects:['math']},'save'),{subjects:['math']}));
test('enable is deliberate and still omits unchanged choices',()=>assert.deepEqual(preferencePatch(saved,saved,'enable'),{personalizationOn:true}));
test('challenge clearing is an explicit null; experiences emit only on change',()=>assert.deepEqual(preferencePatch(saved,{...saved,challenge:null,experiences:[]},'save'),{challenge:null,experiences:[]}));
test('off preserves choices; reset atomically clears all fields with false marker',()=>{assert.deepEqual(preferencePatch(saved,saved,'off'),{personalizationOn:false});assert.deepEqual(preferencePatch(saved,saved,'reset'),{personalizationOn:false,subjects:[],lessOf:[],experiences:[],challenge:null});});
