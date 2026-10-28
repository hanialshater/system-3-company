import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const root='src/demos/chemistry';
const names=readdirSync(root).filter(s=>s.startsWith('organic-reaction-')).sort();
const read=s=>JSON.parse(readFileSync(`${root}/${s}/model.json`,'utf8'));
const expected={'CH₃':1,'CH₂':2,'CH':3,'C':4,'OH':1,'O':2,'Br':1,'Cl':1,'N':3,'NH₂':1,'N₃':1};
test('reaction diagrams have valid bonds, labels, and answer mappings',()=>{
 assert.equal(names.length,30);
 for(const slug of names){const m=read(slug);assert.equal(m.options[m.answer],m.after.name,slug);assert.equal(new Set(m.options).size,m.options.length,slug);
  for(const structure of [m.before,m.after]){const counts=structure.atoms.map(()=>0);for(const b of structure.bonds){assert.ok(structure.atoms[b.a]&&structure.atoms[b.b],slug);assert.ok([1,2,3].includes(b.order),slug);counts[b.a]+=b.order;counts[b.b]+=b.order;}
   structure.atoms.forEach((a,i)=>assert.equal(counts[i],expected[a.label],`${slug}: ${structure.name} ${a.label}`));}
 }
});
test('paired regioselectivity and reduction examples keep their intended distinctions',()=>{
 const product=id=>read(`organic-reaction-${id}`).after.name;
 assert.equal(product('propene-hbr'),'2-bromopropane');assert.equal(product('propene-hbr-peroxide'),'1-bromopropane');
 assert.equal(product('propene-acid-hydration'),'2-propanol');assert.equal(product('propene-hydroboration'),'1-propanol');
 assert.equal(product('butyne-mercuric-hydration'),'2-butanone');assert.equal(product('butyne-hydroboration'),'butanal');
 assert.equal(product('ethanol-pcc'),'ethanal');assert.equal(product('ethanol-aqueous-oxidation'),'ethanoic acid');
});
