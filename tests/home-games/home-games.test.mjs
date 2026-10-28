import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const {games,families}=JSON.parse(fs.readFileSync('content/home-games.json','utf8'));
test('the catalog distinguishes 200 base games from 1,000 labeled formats',()=>{
 assert.equal(games.length,1000);assert.equal(new Set(games.map(g=>g.slug)).size,1000);assert.equal(new Set(games.map(g=>g.baseId)).size,200);assert.equal(Object.keys(families).length,10);
 const disk=fs.readdirSync('src/demos/games').filter(s=>fs.existsSync(`src/demos/games/${s}/meta.json`));assert.deepEqual(new Set(disk),new Set(games.map(g=>g.slug)));const counts={};for(const g of games)counts[g.baseId]=(counts[g.baseId]||0)+1;assert.ok(Object.values(counts).every(n=>n===5));
});
test('every activity has a setup, turn, success condition and stopping rule',()=>{
 for(const g of games){for(const k of ['name','setup','turn','success','format','materials'])assert.ok(typeof g[k]==='string'&&g[k].length>3,`${g.slug}: ${k}`);assert.ok(g.minPlayers>=2&&g.maxPlayers===8);assert.ok(g.allowedPlayers.every(n=>n>=g.minPlayers&&n<=8));assert.equal(g.title,`${g.name} · ${g.modeName}`);}
});
test('player filters reflect format constraints and timed games disclose a timer',()=>{
 for(const g of games){if(g.mode==='relay')assert.deepEqual(g.allowedPlayers,[4,6,8],g.slug);if(g.mode==='teams')assert.ok(g.allowedPlayers.every(n=>n>=4),g.slug);if(g.mode==='quick')assert.match(g.materials,/timer/i,g.slug);assert.doesNotMatch(g.materials,/^None;/,g.slug);}
});
test('all rules remain draft, attributed as house rules, and map to their base game',()=>{
 const cur=JSON.parse(fs.readFileSync('content/curriculum/games.json'));assert.equal(cur.concepts.length,200);const set=new Set(cur.concepts.map(c=>c.id));
 for(const g of games){const m=JSON.parse(fs.readFileSync(`src/demos/games/${g.slug}/meta.json`));assert.equal(m.status,'draft');assert.equal(m.concept,g.baseId);assert.equal(m.recall.options[m.recall.answer],g.success,g.slug);assert.ok(set.has(g.baseId));assert.ok(m.claims.every(c=>c.status==='unverified'&&c.source));}
});
test('known paper games disclose the extra paper used as a ball',()=>{
 for(const id of ['paper-target','paper-path'])for(const g of games.filter(x=>x.baseId===id))assert.match(g.materials,/sheets of paper/i,g.slug);
});
