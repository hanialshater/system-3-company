import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const root='src/demos/chemistry',slugs=readdirSync(root).filter(s=>s.startsWith('organic-isomer-')).sort();
const valence={'CH₃':1,'CH₂':2,'CH':3,'C':4,'OH':1,'O':2,'Br':1,'Cl':1,'N':3,'NH₂':1,'NH':2};
const read=s=>JSON.parse(readFileSync(`${root}/${s}/model.json`,'utf8'));
test('every isomer picture has valid valence and a consistent formula relation',()=>{
 assert.equal(slugs.length,24);
 for(const slug of slugs){const m=read(slug);assert.ok(m.answer>=0&&m.answer<3,slug);for(const s of [m.a,m.b]){const counts=s.atoms.map(()=>0);for(const b of s.bonds){assert.ok(s.atoms[b.a]&&s.atoms[b.b],slug);counts[b.a]+=b.order;counts[b.b]+=b.order;}s.atoms.forEach((a,i)=>assert.equal(counts[i],valence[a.label],`${slug}: ${a.label}`));}assert.equal(m.formulaA===m.formulaB,m.answer!==2,slug);}
});
test('specific examples distinguish a structural isomer, a different formula, and a reversed drawing',()=>{
 assert.equal(read('organic-isomer-ethanol-ether').answer,0);
 assert.equal(read('organic-isomer-propene-propane').answer,2);
 assert.equal(read('organic-isomer-ethanol-reversed').answer,1);
});
