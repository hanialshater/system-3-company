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
test('real map groups once, reconciles visibility, preserves other CS and domains, and exposes no draft links',()=>{
  const html=catalog({VERCEL_ENV:'production'});
  assert.equal(globalThis.__algorithmCatalogCalls,1);
  assert.match(html,/id="algorithms"/);
  assert.equal((html.match(/id="algorithm-topic-/g)||[]).length,20);
  for(const slug of [first,second,'legacy-cs-fixture','math-fixture']) assert.equal(html.split(`href="/d/${slug}"`).length-1,1);
  assert.doesNotMatch(html,new RegExp(`href="/d/${third}"`));
  assert.match(html,/2 visible · 10 planned/);
  assert.match(html,/in review/);
  assert.match(html,/Not yet visible/);
  assert.ok(html.includes(projection.topics[0].concepts[2].name));
  for(const topic of projection.topics) assert.ok(html.includes(`href="#algorithm-topic-${topic.id}"`));
});
test('review-off follows visibleDemos filtering and leaves the planned concept visible without its link',()=>{
  const html=catalog({VERCEL_ENV:'production',SHOW_REVIEW:'off'});
  assert.match(html,/1 visible · 10 planned/);
  assert.doesNotMatch(html,new RegExp(`href="/d/${second}"`));
  assert.ok(html.includes(projection.topics[0].concepts[1].name));
});
