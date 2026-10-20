import test from 'node:test';
import assert from 'node:assert/strict';
import {feedSequence} from '../../src/lib/feed-sequence.ts';
const lessons=Array.from({length:8},(_,i)=>({slug:`new-${i}`,domain:i%2?'physics':'math'}));
const due=[{slug:'due-1',domain:'math'},{slug:'due-2',domain:'physics'}];
const keys=slots=>slots.map(i=>i.key);
test('enabled All places due retrieval before new lessons from intro',()=>assert.deepEqual(keys(feedSequence(lessons,due,'all',1,true,false)).slice(0,4),['intro','revisit-due-1','revisit-due-2','new-0']));
test('late due discovery never replaces an active prediction',()=>{const noDue=feedSequence(lessons,[],'all',4,true,false),withDue=feedSequence(lessons,due,'all',4,true,false);assert.deepEqual(keys(withDue).slice(0,4),keys(noDue).slice(0,4));assert.deepEqual(keys(withDue).slice(4,6),['revisit-due-1','revisit-due-2']);});
test('off and subject chips retain the unchanged canonical interleave',()=>{assert.deepEqual(keys(feedSequence(lessons,due,'all',0,false,false)).slice(0,6),['intro','new-0','revisit-due-1','new-1','new-2','new-3']);assert.deepEqual(keys(feedSequence(lessons,due,'math',0,true,false)),keys(feedSequence(lessons,due,'math',0,false,false)));});
