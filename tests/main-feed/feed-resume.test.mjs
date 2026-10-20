import test from 'node:test';
import assert from 'node:assert/strict';
import {resumeFeedTail} from '../../src/lib/feed-resume.ts';
const page=number=>({filter:'all',page:number,next:number+1,total:100,items:Array.from({length:30},(_,i)=>({slug:`lesson-${number*30+i}`}))});
for(const ordinal of [2,29,30,35])test(`fresh resume after ordinal${ordinal} preserves next successor/cursor`,()=>{const result=resumeFeedTail(page(Math.floor(ordinal/30)),{tag:'a',snapshot:'v',ordinal,slug:`lesson-${ordinal}`});assert.equal(result.resumeOrdinal,ordinal);assert.equal(result.next,Math.floor(ordinal/30)+1);if(ordinal%30<29)assert.equal(result.items[0].slug,`lesson-${ordinal+1}`);else assert.equal(result.items.length,0);assert.ok(result.items.every(item=>Number(item.slug.split('-')[1])>ordinal));});
test('wrong fresh page or public bookmark does not resume',()=>{assert.equal(resumeFeedTail(page(0),{tag:'a',snapshot:'v',ordinal:35,slug:'lesson-35'}),null);assert.equal(resumeFeedTail(page(1),{tag:'a',snapshot:'v',ordinal:35,slug:'other'}),null);});
test('new-lesson ordinal is independent of interleaved intro/recall DOM positions',()=>{const fresh=page(1);const result=resumeFeedTail(fresh,{tag:'a',snapshot:'v',ordinal:35,slug:'lesson-35'});assert.equal(result.items[0].slug,'lesson-36');});
