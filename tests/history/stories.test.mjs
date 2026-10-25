import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const collection=read('content/history-stories/collection.json');

test('the atlas links 24 real drafts; planned research topics are separate',()=>{
 assert.equal(collection.length,24);
 const curriculum=read('content/history-stories/curriculum-200.json');
 assert.equal(curriculum.families.length,8);
 assert.equal(curriculum.families.flatMap(f=>f.topics).length,200);
 for(const f of curriculum.families){assert.equal(f.topics.length,25);assert.equal(f.topics.filter(t=>t.state==='built-draft').length,3);}
 const actual=new Set(collection.map(s=>s.slug));
 for(const t of curriculum.families.flatMap(f=>f.topics))if(t.state==='planned')assert.equal(t.slug,undefined);else assert(actual.has(t.slug));
});
for(const entry of collection)test(entry.slug+': evidence, dates, coordinates and map stay reviewable',()=>{
 const dir='src/demos/history/'+entry.slug;
 const s=read(dir+'/story.json'),m=read(dir+'/meta.json'),map=read(dir+'/map.json');
 assert.equal(s.frames.length,4);assert.equal(m.status,'draft');assert.equal(m.confidence,'');
 assert(s.sources.length>0);for(const source of s.sources){assert.match(source.url,/^https:\/\//);assert(source.section.length>10);assert.equal(source.reviewStatus,'unverified');}
 const nodes=new Set(s.nodes.map(n=>n.id));
 for(const f of s.frames){assert(f.date);assert(f.text);assert(f.active.length>0);for(const n of f.active)assert(nodes.has(n));}
 for(const e of s.edges){assert(e.frame>=0&&e.frame<4);for(const n of e.nodes)if(typeof n==='string')assert(nodes.has(n));}
 assert.equal(map.nodes.length,s.nodes.length);assert.equal(map.edges.length,s.edges.length);assert(map.land.length>0);
 for(const n of map.nodes){assert(n.x>=0&&n.x<=360);assert(n.y>=0&&n.y<=190);assert(n.labelX>=0&&n.labelX<=360);assert(n.labelY>=0&&n.labelY<=190);}
 for(const c of m.claims){assert.equal(c.status,'unverified');assert.equal(c.checkedBy,'');assert(c.addresses.length);}
 assert(m.claims.some(c=>c.addresses.includes('story.reveal')));assert(m.claims.some(c=>c.addresses.includes('story.limit')));
 assert.equal(m.evidence.qa.length,0);assert.equal(m.evidence.humanLearners.length,0);
 assert(s.reveal.length>120);assert(s.limit.length>20);
});
test('sensitive geometry does not invent borders, transmission chains or exact passes',()=>{
 const black=read('src/demos/history/story-black-death/story.json');assert.equal(black.edges.length,0);
 const tsunami=read('src/demos/history/story-lisbon-tsunami/story.json');assert.equal(tsunami.edges.length,0);
 const hannibal=read('src/demos/history/story-hannibal/story.json');assert.match(hannibal.limit,/uncertain/);
 const normandy=read('src/demos/history/story-normandy/story.json');assert.equal(normandy.edges.find(e=>e.nodes.includes('cherbourg')).kind,'objective');
 const pacific=read('src/demos/history/story-pacific-voyaging/story.json');assert.equal(pacific.center,180);
 const suez=read('src/demos/history/story-suez-canal/story.json');assert.deepEqual(suez.closedFrames,[2]);
 const panama=read('src/demos/history/story-panama-locks/story.json');assert.deepEqual(panama.heights,[0,26,26,0]);
});
