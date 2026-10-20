import test from 'node:test';
import assert from 'node:assert/strict';
import {quarantinedSlots,canResumeInteraction} from '../../src/lib/feed-quarantine.ts';
test('quarantine contains only intro and the same public card/key, with no ordered neighbours',()=>{const current={kind:'lesson',key:'public-current',meta:{slug:'public-current'}};const result=quarantinedSlots(current);assert.equal(result.length,2);assert.equal(result[1],current);assert.deepEqual(Object.keys(result[1]).sort(),['key','kind','meta']);});
test('resume requires both same identity and exact fresh snapshot',()=>{const checkpoint={tag:'a',snapshot:'v1'};assert.equal(canResumeInteraction(checkpoint,'a','v1'),true);assert.equal(canResumeInteraction(checkpoint,'b','v1'),false);assert.equal(canResumeInteraction(checkpoint,'a','v2'),false);assert.equal(canResumeInteraction(null,'a','v1'),false);});
