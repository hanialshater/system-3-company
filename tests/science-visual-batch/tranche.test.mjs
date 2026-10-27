import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const chemistry=JSON.parse(fs.readFileSync('tools/science-visual-batch/reactions/cases.json'));
const biology=JSON.parse(fs.readFileSync('tools/science-visual-batch/genetics/cases.json'));
const known={ 'H₂':'HH','O₂':'OO','H₂O':'HHO','N₂':'NN','NH₃':'NHHH','CH₄':'CHHHH','CO₂':'COO','H₂O₂':'HHOO','CO':'CO','NO':'NO','NO₂':'NOO','SO₂':'SOO','SO₃':'SOOO','O₃':'OOO','C₂H₄':'CCHHHH','Cl₂':'ClCl','HCl':'HCl','CH₃OH':'CHHHHO' };
const atoms=s=>s.match(/Cl|[A-Z]/g)||[];
const count=side=>side.reduce((a,[formula,raw,n])=>{assert.equal(raw.replaceAll(' ',''),known[formula],formula);for(let e of atoms(raw))a[e]=(a[e]||0)+n;return a},{});
const sorted=x=>Object.entries(x).sort();

test('each visual reaction conserves each atom with correct formula compositions',()=>{
 assert.equal(chemistry.length,12);
 for(const c of chemistry){assert.deepEqual(sorted(count(c.reactants)),sorted(count(c.products)),c.slug);assert.ok(c.products.some(p=>p[0]===c.target));}
});
test('every new lesson is a unique draft with only unverified claims',()=>{
 const slugs=new Set();
 for(const [domain,list] of [['chemistry',chemistry],['life',biology]])for(const c of list){
  assert.ok(!slugs.has(c.slug));slugs.add(c.slug);
  const meta=JSON.parse(fs.readFileSync(`src/demos/${domain}/${c.slug}/meta.json`));
  assert.equal(meta.domain,domain);assert.equal(meta.status,'draft');assert.ok(meta.claims.every(x=>x.status==='unverified'));
  assert.equal(new Set(meta.recall.options).size,3);assert.ok(meta.recall.answer>=0&&meta.recall.answer<3);
 }
 assert.equal(biology.length,13);
});
test('selected sequence claims follow base pairing, the standard code and reading frame',()=>{
 const dna='ATGC', complement={A:'T',T:'A',G:'C',C:'G'};assert.equal([...dna].map(x=>complement[x]).join(''),'TACG');
 const rna={A:'U',T:'A',G:'C',C:'G'};assert.equal([...'TACGAA'].map(x=>rna[x]).join(''),'AUGCUU');
 const code={AUG:'Met',GCU:'Ala',UAA:'STOP',GAA:'Glu',GAG:'Glu',GUA:'Val',UAU:'Tyr'};
 for(const slug of ['translate-start-stop-codons','two-codons-one-amino-acid','one-letter-changes-amino-acid','mutation-creates-stop-codon']) {
  const c=biology.find(x=>x.slug===slug);
  if(slug==='translate-start-stop-codons') assert.deepEqual(c.after[0].tokens.map(t=>code[t]),c.after[1].tokens);
  else for(const row of c.after) assert.equal(code[row.label],row.tokens[0],`${slug}: ${row.label}`);
 }
 const inserted='AUG'+'A'+'GAACCA';assert.deepEqual(inserted.match(/.{1,3}/g),['AUG','AGA','ACC','A']);
});

test('transport models conserve the illustrated cargo and pump moves 3 Na out and 2 K in',()=>{
 const cases=JSON.parse(fs.readFileSync('tools/science-visual-batch/transport/cases.json'));
 assert.equal(cases.length,5);
 const total=panel=>[...panel.outside,...panel.inside].sort();
 for(const c of cases){assert.deepEqual(total(c.before),total(c.after),c.slug);const meta=JSON.parse(fs.readFileSync(`src/demos/life/${c.slug}/meta.json`));assert.equal(meta.status,'draft');assert.ok(meta.claims.every(x=>x.status==='unverified'));}
 const pump=cases.find(c=>c.slug==='sodium-potassium-pump-cycle');
 assert.deepEqual(pump.before.inside,['Na','Na','Na']);assert.deepEqual(pump.before.outside,['K','K']);assert.deepEqual(pump.after.outside,['Na','Na','Na']);assert.deepEqual(pump.after.inside,['K','K']);assert.equal(pump.energy,true);
});
