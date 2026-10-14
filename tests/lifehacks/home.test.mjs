import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { evaluateHome, sourceConditionedCordTrials, rectangularPackingScene, homeRulerScene, homeCordScene } from '../../src/lib/lifehacks/home-models.ts';
const source=fs.readFileSync(new URL('../../src/lib/lifehacks/home-lessons.ts',import.meta.url),'utf8');
const specs=JSON.parse(source.slice(source.indexOf('= [')+2,source.lastIndexOf(';')));
const get=slug=>specs.find(s=>s.slug===slug);
const value=(slug,p,after)=>evaluateHome(get(slug),p,after).value;
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);

test('all sixty-nine lesson models stay finite throughout their allowed controls',()=>{
 assert.equal(specs.length,69);
 assert.equal(new Set(specs.map(s=>s.slug)).size,69);
 for(const s of specs) for(const p of [s.min,s.initial,s.max]) for(const after of [false,true]) {
  const r=evaluateHome(s,p,after);assert.ok(Number.isFinite(r.value),`${s.slug}: ${p}`);assert.ok(Number.isFinite(r.other));assert.ok(r.inputs.length);
 }
});
test('the prepared towel exposes four times the faces, with chosen flux kept fixed',()=>{
 const spec=get('towel-spread-dries-first');
 const folded=evaluateHome(spec,70,false),spread=evaluateHome(spec,70,true);
 close(folded.other,0.49);close(spread.other,1.96);close(folded.value/spread.value,4);
 close(spread.value,3.0000000006); // 600g/(1.96m² × explicitly chosen 0.1020408163kg/(m²h))
});
test('equal-leg contact illustration crosses zero rather than proving a level tabletop',()=>{
 close(value('wobbly-table-quarter-turn',0,false),4);
 close(value('wobbly-table-quarter-turn',45,true),0);
 close(value('wobbly-table-quarter-turn',90,true),-4);
});
test('twenty illustrative walking steps can reduce both bow loops',()=>{
 assert.equal(get('square-bow-stays-tied').initial,0);
 close(value('square-bow-stays-tied',0,false),20);
 close(value('square-bow-stays-tied',0,true),20);
 close(value('square-bow-stays-tied',20,false),4);close(value('square-bow-stays-tied',20,true),14);
 assert.equal(value('square-bow-stays-tied',40,false),0);
 assert.equal(value('square-bow-stays-tied',40,true),8);
});
test('cord trials reproduce a fixed seed and retain genuine trial sampling variation',()=>{
 assert.equal(sourceConditionedCordTrials(0).filter(Boolean).length,0);
 assert.equal(sourceConditionedCordTrials(1).filter(Boolean).length,20);
 assert.deepEqual(sourceConditionedCordTrials(0.55),sourceConditionedCordTrials(0.55));
 assert.notDeepEqual(sourceConditionedCordTrials(0.55,20,17),sourceConditionedCordTrials(0.55,20,18));
 assert.throws(()=>sourceConditionedCordTrials(-1));
});
test('a width fit differs from a volume check and includes protrusions',()=>{
 assert.equal(value('furniture-through-door',75,false),-5);assert.equal(value('furniture-through-door',75,true),15);
 assert.equal(value('box-handle-clearance',42,false),2);assert.equal(value('box-handle-clearance',42,true),-4);
 assert.equal(value('measure-inside-not-outside',40,false),3);assert.equal(value('measure-inside-not-outside',40,true),-1);
});
test('two-dimensional packing uses integer rows and rotation, not just total area',()=>{
 assert.equal(value('suitcase-rotate-block',30,false),3);assert.equal(value('suitcase-rotate-block',30,true),4);
 assert.equal(value('drawer-divider-cost',40,true),9.25);
 assert.equal(value('circle-tray-square-corners',28,false),4);assert.equal(value('circle-tray-square-corners',28,true),4);
});
test('rolling and splitting conserve material and face area under the stated assumptions',()=>{
 assert.equal(value('rolled-or-folded-volume',12,false),1440);assert.equal(value('rolled-or-folded-volume',12,true),1440);
 close(value('half-size-two-towels',80,false),1.92);close(value('half-size-two-towels',80,true),1.92);
 close(value('towel-thickness-hidden-volume',2,false),10);close(value('towel-thickness-hidden-volume',2,true),5);
});
test('access, grouping and repeated routes have concrete counts',()=>{
 assert.equal(value('suitcase-layer-access',6,false),5);assert.equal(value('suitcase-layer-access',6,true),0);
 assert.equal(value('pillowcase-set-kit',4,false),3);assert.equal(value('pillowcase-set-kit',4,true),1);
 assert.equal(value('sock-pairs-not-all-combinations',6,false),15);assert.equal(value('sock-pairs-not-all-combinations',6,true),3);
 assert.equal(value('laundry-sort-before-walk',8,false),64);assert.equal(value('laundry-sort-before-walk',8,true),8);
 assert.equal(value('seasonal-bin-rotation',8,false),28);assert.equal(value('seasonal-bin-rotation',8,true),7);
});
test('geometry checks dimensions, conservative bounds and an actual origin',()=>{
 close(value('sofa-diagonal-room',120,true),10); // 120-90-150 right triangle, minus140cm rod.
 assert.equal(value('ruler-start-not-zero',18,true),15);
 assert.equal(value('spacer-protects-clearance',30,true),0);
 assert.equal(value('wrapping-paper-minimum-area',20,true),880);
 assert.equal(value('ribbon-around-box-length',20,true),112);
 assert.equal(value('margin-before-cut',20,true),24);
 close(value('measure-diagonal-for-square',70,true),0);
 close(value('resize-photo-frame-ratio',30,true),200/3);
});
test('static mechanics never claims to reduce the total load',()=>{
 close(value('heavy-book-close-to-back',2,false),5.886);close(value('heavy-book-close-to-back',2,true),1.962);
 close(value('tote-balance-sides',3,false),-10);close(value('tote-balance-sides',3,true),0);
 close(value('weight-spread-on-table',2,false),19620);close(value('weight-spread-on-table',2,true),6540);
});
test('conversion uses an exact definition while a repeated bias adds up',()=>{
 close(value('cm-to-inches',25.4,true),10);
 close(value('tape-mark-same-spacing',5,false),1);close(value('tape-mark-same-spacing',5,true),0.2);
});
test('metadata retains independent gates and complete model addresses',()=>{
 for(const s of specs) {
  const meta=JSON.parse(fs.readFileSync(new URL(`../../src/demos/lifehacks/${s.slug}/meta.json`,import.meta.url),'utf8'));
  for(const c of meta.claims) {
   assert.ok(['unverified','verified','disputed','withdrawn'].includes(c.status));
   if(c.status==='verified')assert.ok(c.checkedBy&&c.checkedBy!==meta.owner.builder&&c.checkedOn);
  }
  assert.equal(new Set(meta.claims.map(c=>c.id)).size,meta.claims.length);
  assert.ok(meta.claims.every(c=>c.id.startsWith(`lifehacks.${s.slug}.`)&&c.text.trim()&&c.source.trim()));
  assert.ok(Object.values(meta.evidence).every(records=>Array.isArray(records)&&records.every(p=>typeof p==='string')));
 }
});


test('the ruler drawing places a three-to-twenty centimetre span on the actual scale',()=>{
 const r=homeRulerScene(get('ruler-start-not-zero'),20,true);
 assert.equal(r.scale,12.5);assert.equal(r.objectStart,62.5);assert.equal(r.objectEnd,275);
 assert.equal(r.measureStart,r.objectStart);assert.equal(r.measureEnd,r.objectEnd);
 assert.equal((r.objectEnd-r.objectStart)/r.scale,17);
 const max=homeRulerScene(get('ruler-start-not-zero'),25,true);
 assert.ok(max.objectEnd<max.viewWidth);
});
test('the shown suitcase fills two exact-height rows without suggesting an extra column',()=>{
 const scene=rectangularPackingScene(32,36,12,18);
 assert.equal(scene.items.length,4);assert.equal(scene.columns,2);assert.equal(scene.rows,2);
 close(scene.items[0].width/scene.items[0].height,12/18);
 close(scene.items[3].y+scene.items[3].height,scene.y+scene.height);
 assert.ok(scene.width-2*scene.items[0].width<scene.items[0].width);
 for(const tile of scene.items) {
  assert.ok(tile.x>=scene.x);assert.ok(tile.y>=scene.y);
  assert.ok(tile.x+tile.width<=scene.x+scene.width+1e-8);
  assert.ok(tile.y+tile.height<=scene.y+scene.height+1e-8);
 }
});
test('fold allowances, conversion span and repeated mark bias use their own real scale',()=>{
 const cut=homeRulerScene(get('margin-before-cut'),22,true);
 close((cut.objectEnd-cut.objectStart)/cut.scale,26);
 close((cut.folds[1]-cut.folds[0])/cut.scale,22);
 const converted=homeRulerScene(get('cm-to-inches'),30.2,true);
 close((converted.objectEnd-converted.objectStart)/converted.scale,30.2);
 const origin=homeRulerScene(get('tape-mark-same-spacing'),5,true);
 const stepping=homeRulerScene(get('tape-mark-same-spacing'),5,false);
 close((origin.marks[4].actual-origin.marks[4].target)/origin.scale,0.2);
 close((stepping.marks[4].actual-stepping.marks[4].target)/stepping.scale,1);
});

// W-358: view 'cord' lessons on the generic stage had no drawing branch and showed the default box.
test('every plain-cord lesson on the generic stage gets a cord drawing that matches its model',()=>{
 const generic=specs.filter(s=>s.view==='cord'&&!['cord','bow','wobble'].includes(s.model));
 assert.deepEqual(generic.map(s=>s.slug).sort(),['coiled-cord-bend-radius','elastic-loop-release','group-cables-with-ends']);
 for(const s of generic) for(const p of [s.min,s.initial,s.max]) for(const after of [false,true]) assert.ok(homeCordScene(s,p,after),`${s.slug} ${p} ${after}`);
 const ends=get('group-cables-with-ends');
 for(let p=ends.min;p<=ends.max;p+=ends.step) {
  assert.equal(homeCordScene(ends,p,false).ends.length,value('group-cables-with-ends',p,false));
  assert.equal(homeCordScene(ends,p,true).ends.length,value('group-cables-with-ends',p,true));
 }
 const loop=get('elastic-loop-release');
 assert.equal(homeCordScene(loop,20,false).crossings.length,value('elastic-loop-release',20,false));
 assert.equal(homeCordScene(loop,20,true).crossings.length,value('elastic-loop-release',20,true));
 assert.ok(homeCordScene(loop,loop.max,false).end<=300);
 const coil=get('coiled-cord-bend-radius'),narrow=homeCordScene(coil,10,false),wide=homeCordScene(coil,10,true);
 close(wide.r,2*narrow.r);close(narrow.turns,200/(2*Math.PI*10));close(wide.turns*2,narrow.turns);
 assert.ok(homeCordScene(coil,coil.max,true).cy-homeCordScene(coil,coil.max,true).r>=20);
});
