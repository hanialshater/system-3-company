import {register} from 'node:module';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {statusVisible} from '../../src/lib/visibility.ts';
register('./catalog-loader.mjs',import.meta.url);
const {createElement:h}=await import('react');
const {renderToStaticMarkup:render}=await import('react-dom/server');
const {default:Catalog}=await import('../../src/app/catalog/page.tsx');
const projection=JSON.parse(fs.readFileSync(new URL('../../content/algorithms-200.json',import.meta.url),'utf8'));
const curricula=Object.fromEntries(['cs','math'].map(id=>[id,JSON.parse(fs.readFileSync(new URL(`../../content/curriculum/${id}.json`,import.meta.url),'utf8')).concepts]));
const [first,second,third]=projection.topics[0].slugs;
const fixtures=[
  {slug:first,concept:projection.topics[0].concepts[0].id,title:'Visible published fixture',domain:'cs',status:'published'},
  {slug:second,concept:projection.topics[0].concepts[1].id,title:'Visible review fixture',domain:'cs',status:'review'},
  {slug:third,concept:projection.topics[0].concepts[2].id,title:'Hidden draft fixture',domain:'cs',status:'draft'},
  {slug:'legacy-cs-fixture',concept:curricula.cs[0].id,title:'Legacy CS fixture',domain:'cs',status:'published'},
  {slug:'math-fixture',concept:curricula.math[0].id,title:'Other domain fixture',domain:'math',status:'published'},
];
function catalog(env={}){globalThis.__algorithmCatalogCalls=0;globalThis.__algorithmCatalogVisible=fixtures.filter(d=>statusVisible(d.status,{},env));return render(h(Catalog));}
test('projection covers 20 ordered topics with 200 distinct concepts and slugs',()=>{
  assert.equal(projection.topics.length,20);
  assert.deepEqual(projection.topics.map(t=>t.order),Array.from({length:20},(_,i)=>i+1));
  assert.ok(projection.topics.every(t=>t.slugs.length===10&&t.concepts.length===10));
  assert.equal(new Set(projection.topics.flatMap(t=>t.slugs)).size,200);
  assert.equal(new Set(projection.topics.flatMap(t=>t.concepts.map(c=>c.id))).size,200);
});
// Decision company/decisions/2026-10-16-pr6-catalog-algorithms-section.md (W-1578, R1-R6).
const allNames=projection.topics.flatMap(t=>t.concepts.map(c=>c.name));
const withheld=['planned','Not yet visible','not yet visible'];
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
function catalogWith(list,env){globalThis.__algorithmCatalogCalls=0;globalThis.__algorithmCatalogVisible=list.filter(d=>statusVisible(d.status,{},env));return render(h(Catalog));}
function assertFlatListsKept(html){
  // R5/R6(c): the flat CS list and the other domain are unchanged, and no grouped concept falls into the flat list.
  for(const slug of ['legacy-cs-fixture','math-fixture']) assert.equal(html.split(`href="/d/${slug}"`).length-1,1);
  assert.ok(html.includes(escape(curricula.cs[0].name)));
  assert.match(html,/not yet taught/);
}
test('R6(a): production with all 200 algorithm lessons draft shows no section, no planned title and no planned copy',()=>{
  const drafts=projection.topics.flatMap(t=>t.slugs.map((slug,i)=>({slug,concept:t.concepts[i].id,title:t.concepts[i].name,domain:'cs',status:'draft'})));
  const html=catalogWith([...drafts,...fixtures.slice(3)],{VERCEL_ENV:'production'});
  assert.equal(globalThis.__algorithmCatalogCalls,1);
  assert.doesNotMatch(html,/id="algorithms"/);
  assert.doesNotMatch(html,/algorithm-topic/);
  for(const name of allNames) assert.ok(!html.includes(escape(name)),`planned title shown: ${name}`);
  for(const text of withheld) assert.ok(!html.includes(text),`withheld copy shown: ${text}`);
  for(const {slug} of drafts) assert.ok(!html.includes(`href="/d/${slug}"`));
  assertFlatListsKept(html);
});
test('R6(b): one published and one review lesson in topic 1 render one topic, one index entry and two rows; the draft does not',()=>{
  const html=catalog({VERCEL_ENV:'production'});
  assert.equal(globalThis.__algorithmCatalogCalls,1);
  assert.equal((html.match(/id="algorithms"/g)||[]).length,1);
  assert.equal((html.match(/id="algorithm-topic-/g)||[]).length,1);
  assert.equal((html.match(/href="#algorithm-topic-/g)||[]).length,1);
  assert.ok(html.includes(`id="algorithm-topic-${projection.topics[0].id}"`));
  assert.ok(html.includes(`href="#algorithm-topic-${projection.topics[0].id}"`));
  for(const slug of [first,second]) assert.equal(html.split(`href="/d/${slug}"`).length-1,1);
  for(const c of projection.topics[0].concepts.slice(0,2)) assert.ok(html.includes(escape(c.name)));
  assert.match(html,/in review/);
  assert.doesNotMatch(html,new RegExp(`href="/d/${third}"`));
  for(const name of allNames.filter(n=>!projection.topics[0].concepts.slice(0,2).some(c=>c.name===n))) assert.ok(!html.includes(escape(name)),`unshown concept rendered: ${name}`);
  for(const text of withheld) assert.ok(!html.includes(text),`withheld copy shown: ${text}`);
  assertFlatListsKept(html);
});
test('review-off follows visibleDemos filtering: only the published row renders, the review concept does not',()=>{
  const html=catalog({VERCEL_ENV:'production',SHOW_REVIEW:'off'});
  assert.equal((html.match(/id="algorithm-topic-/g)||[]).length,1);
  assert.equal(html.split(`href="/d/${first}"`).length-1,1);
  assert.doesNotMatch(html,new RegExp(`href="/d/${second}"`));
  assert.ok(!html.includes(escape(projection.topics[0].concepts[1].name)));
  for(const text of withheld) assert.ok(!html.includes(text));
  assertFlatListsKept(html);
});
test('R5: the section renders whatever visibleDemos returns, by the same rules, with no status of its own',()=>{
  // statusVisible lists drafts only with includeDrafts, which the catalog never passes, so a draft reaches the
  // section only if visibleDemos returns it; the rows then follow the same rules as for any visible lesson.
  globalThis.__algorithmCatalogCalls=0;globalThis.__algorithmCatalogVisible=fixtures.slice(2,3);
  const html=render(h(Catalog));
  assert.equal((html.match(/id="algorithm-topic-/g)||[]).length,1);
  assert.equal(html.split(`href="/d/${third}"`).length-1,1);
  assert.ok(html.includes(escape(projection.topics[0].concepts[2].name)));
  for(const text of withheld) assert.ok(!html.includes(text));
});
