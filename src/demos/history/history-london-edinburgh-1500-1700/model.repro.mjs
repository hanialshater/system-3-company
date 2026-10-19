// Builder state/fixture checks, not independent historical verification or browser QA.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./model.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {initialState,transition,visibleColumns,ready,complete,RECORDS}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const start=initialState();assert.deepEqual(visibleColumns(start,true),{});assert.equal(ready(start),false);
for(const order of [[1603,1707],[1707,1603]]){
 let state=initialState();state=transition(state,{type:'select',year:order[0]});assert.equal(state.earned.length,1);assert.equal(ready(state),false);
 state=transition(state,{type:'select',year:order[0]});assert.equal(state.earned.length,1,'duplicate visits cannot earn another milestone');
 state=transition(state,{type:'reset'});assert.equal(state.focus,null);assert.ok(state.columns[order[0]],'partial snapshot persists');
 state=transition(state,{type:'select',year:order[1]});assert.equal(ready(state),true);assert.equal(state.columns[1603].parliaments.value.length,2);assert.equal(state.columns[1707].parliaments.value.length,1);
 const bytes=JSON.stringify(state.columns);state=transition(state,{type:'reset'});assert.equal(state.focus,null);assert.equal(JSON.stringify(state.columns),bytes);assert.equal(ready(state),true);
 assert.deepEqual(visibleColumns(state,true),{},'lock cannot expose old evidence');
 state=transition(state,{type:'restart'});assert.deepEqual(state,initialState());assert.equal(ready(state),false);
}
const unknown={...RECORDS[1707],monarch:{status:'unknown',reason:'Selected source field unestablished'}};assert.equal(complete(unknown),false);const u=transition(initialState(),{type:'select',year:1707,record:unknown});assert.equal(u.earned.length,0);assert.equal(u.columns[1707].monarch.status,'unknown');assert.equal(ready(u),false);assert.throws(()=>transition(start,{type:'select',year:1603,record:RECORDS[1707]}),/does not match/);
const original=RECORDS[1603];const snapshot=transition(start,{type:'select',year:1603}).columns[1603];assert.notEqual(snapshot,original);assert.notEqual(snapshot.parliaments.value,original.parliaments.value);
for(const r of Object.values(RECORDS)){assert.equal(r.monarch.status,'known');assert.ok(r.monarch.sourceItem&&r.monarch.locator&&r.monarch.claimId);assert.ok(r.parliaments.locator&&r.parliaments.claimId);assert.equal(new Set(r.parliaments.value.map(p=>p.id)).size,r.parliaments.value.length);}
assert.match(RECORDS[1707].monarch.locator,/ArticleII/);assert.match(RECORDS[1707].precision,/1 May/);
const meta=JSON.parse(fs.readFileSync(new URL('./meta.json',import.meta.url),'utf8'));assert.ok(meta.claims.every(c=>c.status==='unverified'));assert.ok(meta.claims.every(c=>/^history\.history-london-edinburgh-1500-1700\.c\d+$/.test(c.id)));const claimIds=new Set(meta.claims.map(c=>c.id));for(const record of Object.values(RECORDS)){assert.ok(claimIds.has(record.monarch.claimId));assert.ok(claimIds.has(record.parliaments.claimId));}assert.equal(meta.status,'draft');assert.equal(meta.curriculum.primary,'history:shared-monarch-separate-parliaments');assert.deepEqual(meta.lineage.originalEndpoints,[1500,1700]);assert.deepEqual(meta.lineage.selectedDates,[1603,1707]);
const code=fs.readFileSync(new URL('./Demo.tsx',import.meta.url),'utf8');assert.match(code,/minInteractions=\{2\}/);assert.match(code,/!signalled\.current\.has\(year\)/);assert.match(code,/signalled\.current\.add\(year\);interact\(\)/);assert.ok(!code.includes('map.json'));assert.ok(!source.includes('map.json'));assert.ok(!code.includes('fetch('));assert.ok(!source.includes('fetch('));
console.log('London builder checks pass: both traversal orders, unique milestones, retained snapshots/reset, lock/restart, unknown/date boundaries and unverified draft identity. Historical facts and rendered fit unverified.');
