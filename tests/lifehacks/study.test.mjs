import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calendarResult, queueResult, roundRobinQueue, fileResult, swapPositions, reconstructionMatches, editResult, illustrativeMemory } from '../../src/lib/lifehacks/studyModels.ts';
// Import the explicit fixtures; independent expected outputs below do not reuse their formulas.
import { studyCatalog as catalog } from '../../src/lib/lifehacks/studyCatalog.ts';

test('calendar: touching intervals are compatible, triple overlap is counted once',()=> {
  assert.deepEqual(calendarResult([{label:'one',start:0,duration:10},{label:'two',start:10,duration:5}],20),{conflict:0,finish:15,spill:0});
  // A 0..20, B 5..15, C 10..25: conflict union is 5..20, not 20 pairwise minutes.
  assert.deepEqual(calendarResult([{label:'A',start:0,duration:20},{label:'B',start:5,duration:10},{label:'C',start:10,duration:15}],22),{conflict:15,finish:25,spill:3});
});
test('calendar: a task-specific deadline does not incorrectly include downstream tasks',()=> {
  const rows=[{label:'travel',start:20,duration:20},{label:'visit',start:40,duration:15}];
  assert.equal(calendarResult(rows,40,0).spill,0);
  assert.equal(calendarResult(rows,40).spill,15);
});
test('queue: short jobs reduce waiting but an urgent long job may be late',()=> {
  const spec=catalog['do-not-starve-the-long-job'];
  assert.equal(queueResult(spec,[0,1,2]).waiting,15);
  assert.equal(queueResult(spec,[0,1,2]).late,1);
  assert.equal(queueResult(spec,[2,0,1]).waiting,55);
  assert.equal(queueResult(spec,[2,0,1]).late,0);
});
test('queue: context cost and prerequisites remain separate',()=> {
  const batch=catalog['batch-by-setup'];
  assert.equal(queueResult(batch,[0,1,2]).time,19);
  assert.equal(queueResult(batch,[0,2,1]).time,17);
  assert.equal(queueResult(batch,[0,2,1]).switches,1);
  const dep=catalog['dependency-before-priority'];
  assert.equal(queueResult(dep,[0,1,2]).breaches,1);
  assert.equal(queueResult(dep,[1,0,2]).breaches,0);
});
test('recall: exact positions matter, checking does not mutate the target',()=> {
  const words=['collect','sort','file'], initial=[2,0,1];
  assert.deepEqual(reconstructionMatches(words,initial),[false,false,false]);
  const first=swapPositions(initial,0,1), second=swapPositions(first,1,2);
  assert.deepEqual(second,[0,1,2]);
  assert.deepEqual(reconstructionMatches(words,second),[true,true,true]);
  assert.deepEqual(initial,[2,0,1]);assert.deepEqual(words,['collect','sort','file']);
});
test('files: AND is intersection and OR is union, never summed counts',()=> {
  const spec=catalog['mail-or-vs-and'];
  assert.deepEqual(fileResult(spec,1).rows.map(r=>r.name),['m1','m2','m3']);
  assert.deepEqual(fileResult(spec,2).rows.map(r=>r.name),['m1']);
});
test('files: quoted phrase differs from separate words; exclusion preserves wanted notes',()=> {
  const phrase=catalog['mail-exact-phrase'];
  assert.deepEqual(fileResult(phrase,1).rows.map(r=>r.name),['m1','m2']);
  assert.deepEqual(fileResult(phrase,2).rows.map(r=>r.name),['m1']);
  assert.deepEqual(fileResult(catalog['mail-minus-noise'],2).rows.map(r=>r.name),['m1','m4']);
});
test('files: fixed-width dates and numeric padding produce known text order',()=> {
  assert.deepEqual(fileResult(catalog['iso-date-filename-sort'],2).rows.map(r=>r.name),['2025-12-01','2026-01-15','2026-11-02']);
  assert.deepEqual(fileResult(catalog['version-nine-and-ten'],1).rows.map(r=>r.name),['v10','v2','v9']);
  assert.deepEqual(fileResult(catalog['version-nine-and-ten'],2).rows.map(r=>r.name),['v02','v09','v10']);
});
test('files: metadata, identity and deletion are different dimensions',()=> {
  assert.deepEqual(fileResult(catalog['file-modified-not-created'],1).rows.map(r=>r.name),['new.txt']);
  assert.deepEqual(fileResult(catalog['file-modified-not-created'],2).rows.map(r=>r.name),['old.txt','new.txt']);
  assert.equal(fileResult(catalog['tags-are-not-copies'],1).count,3);
  assert.equal(fileResult(catalog['tags-are-not-copies'],2).count,2);
  assert.equal(fileResult(catalog['deleted-is-a-search-state'],1).count,2);
  assert.equal(fileResult(catalog['deleted-is-a-search-state'],2).count,3);
});
test('editor: Find and zoom change view state while preserving content; cut changes content',()=> {
  const find=catalog['find-next-is-navigation'];
  assert.deepEqual(editResult(find,1).tokens,editResult(find,2).tokens);
  assert.equal(editResult(find,1).highlight,0);assert.equal(editResult(find,2).highlight,2);
  const zoom=catalog['zoom-does-not-rewrite'];
  assert.deepEqual(editResult(zoom,1).tokens,editResult(zoom,2).tokens);
  assert.equal(editResult(zoom,1).scale,1.5);assert.equal(editResult(zoom,2).scale,.8);
  assert.deepEqual(editResult(catalog['cut-moves-the-selection'],1).tokens,['A','C']);
});
test('spacing parameters are explicitly illustrative and do not estimate personal recall',()=> {
  assert.deepEqual(illustrativeMemory(0),{cram:1,spaced:1});
  const month=illustrativeMemory(30);
  assert.ok(month.cram<.02 && month.spaced>.18 && month.spaced<.20);
  assert.match(catalog['spaced-beats-cram'].boundary,/Illustrative/);
});
test('70 unique objectives, review-only artifacts and bounded hooks',()=> {
  assert.equal(Object.keys(catalog).length,70);
  assert.equal(new Set(Object.values(catalog).map(s=>s.objective)).size,70);
  const families=new Set(Object.values(catalog).map(s=>s.family));assert.equal(families.size,7);
  for(const [slug,spec] of Object.entries(catalog)) {
    const meta=JSON.parse(readFileSync(new URL(`../../src/demos/lifehacks/${slug}/meta.json`,import.meta.url)));
    assert.ok(spec.title.length<=40,slug);assert.ok(spec.hook.length<=90,slug);
    assert.equal(new Set(meta.claims.map(c=>c.id)).size,meta.claims.length);
    for(const c of meta.claims) {
      assert.ok(['unverified','verified','disputed','withdrawn'].includes(c.status));
      if(c.status==='verified')assert.ok(c.checkedBy&&c.checkedBy!==meta.owner.builder&&c.checkedOn);
    }
    assert.ok(Object.values(meta.evidence).every(arr=>Array.isArray(arr)&&arr.every(p=>typeof p==='string')));
  }
});

test('round-robin activity does not imply the first task is complete',()=> {
  const spec=catalog['work-in-process-limit'];
  const sliced=roundRobinQueue(spec,[2,1,0],5);
  assert.deepEqual(sliced.ends,[30,25,15]);
  assert.equal(sliced.firstFinish,15);
  assert.equal(queueResult(spec,[0,1,2]).firstFinish,5);
  assert.equal(sliced.time,30);assert.equal(queueResult(spec,[0,1,2]).time,30);
});

test('application sorts new visible values rather than recalling a hidden target',()=> {
  const spec=catalog['apply-not-quote'];
  const input=[spec.words[1],spec.words[2],spec.words[0]];
  assert.deepEqual(input,['5','9','2']);
  const ascending=[...input].map(Number).sort((a,b)=>a-b).map(String);
  assert.deepEqual(ascending,['2','5','9']);
  const edited=swapPositions(swapPositions([2,0,1],0,1),1,2).map(i=>spec.words[i]);
  assert.deepEqual(edited,ascending);
  assert.deepEqual(input,['5','9','2'], 'editing the attempt must preserve the input');
});

// The search fixture checks individual letters; no logarithm formula supplies the observed trace.
import { compareLabel, shuffledLabels, scanLabels } from '../../src/lib/lifehacks/studySearch.ts';
test('ten labels: observed scan and midpoint elimination have an independent four-check trace',()=> {
  const {sorted,shuffled,target}=shuffledLabels(10);
  assert.deepEqual(shuffled,['I','H','G','F','E','D','C','B','A','J']);
  assert.equal(target,'J');
  assert.equal(scanLabels(shuffled,target).checked.length,10);
  const first=compareLabel(sorted,target,0,9);
  assert.equal(first.value,'E');assert.equal(first.verdict,'right');
  assert.deepEqual(sorted.slice(first.keptLo,first.keptHi+1),['F','G','H','I','J']);
  const second=compareLabel(sorted,target,first.keptLo,first.keptHi);
  const third=compareLabel(sorted,target,second.keptLo,second.keptHi);
  const last=compareLabel(sorted,target,third.keptLo,third.keptHi);
  assert.deepEqual([first.value,second.value,third.value,last.value],['E','H','I','J']);
  assert.equal(last.verdict,'found');
});
test('a smaller target keeps the left interval; scanning stops at the found label',()=> {
  const sorted=['A','B','C','D','E','F','G','H'];
  const first=compareLabel(sorted,'B',0,7);
  assert.equal(first.value,'D');assert.equal(first.verdict,'left');
  assert.deepEqual(sorted.slice(first.keptLo,first.keptHi+1),['A','B','C']);
  assert.deepEqual(scanLabels(['D','B','A'],'B'),{checked:['D','B'],found:true});
  assert.deepEqual(scanLabels(['D','A'],'B'),{checked:['D','A'],found:false});
});
test('fresh recall transfer requires sorting and fixed travel arithmetic',()=> {
  const load=slug=>JSON.parse(readFileSync(new URL(`../../src/demos/lifehacks/${slug}/meta.json`,import.meta.url)));
  const ordering=load('apply-not-quote').recall;assert.equal(ordering.options[ordering.answer],'1→4→7');
  assert.deepEqual([7,1,4].sort((a,b)=>a-b),[1,4,7]);
  const travel=load('calendar-needs-travel').recall;assert.equal(travel.options[travel.answer],'14:10');
  assert.equal(14*60+30-20,14*60+10);
  const labels=load('alphabet-sort-search').recall;assert.equal(labels.options[labels.answer],'Put labels in alphabetical order');
});
