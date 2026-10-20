import test from 'node:test';
import assert from 'node:assert/strict';
import {readOwnedProgress} from '../../src/lib/feed-history.ts';
test('initial stored A history is not read before B cookie ownership settles, including preference-off path',()=>{let reads=0;let device={'a-due':{completedAt:1,recalls:[]}};const read=()=>{reads++;return device;};assert.equal(readOwnedProgress(false,read),null);assert.equal(reads,0);device={};assert.deepEqual(readOwnedProgress(true,read),{});assert.equal(reads,1);});
test('session reset blocks history reads again until fresh ownership is ready',()=>{let ready=true;const read=()=>({'b-due':{completedAt:1,recalls:[]}});assert.ok(readOwnedProgress(ready,read)['b-due']);ready=false;assert.equal(readOwnedProgress(ready,read),null);});
