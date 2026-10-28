import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const cases=JSON.parse(fs.readFileSync('tools/cosmology-visual/manifest.json','utf8'));
const bySlug=Object.fromEntries(cases.map(c=>[c.slug,c]));
test('cosmology batch has 100 unique questions, balanced across ten visual families',()=>{
 assert.equal(cases.length,100);assert.equal(new Set(cases.map(c=>c.slug)).size,100);assert.equal(new Set(cases.map(c=>c.question)).size,100);
 const groups={};for(const c of cases)groups[c.group]=(groups[c.group]||0)+1;
 assert.deepEqual(Object.keys(groups).sort(),['cmb','dark','early','energy','expansion','light','methods','scales','stars','structure']);assert.ok(Object.values(groups).every(n=>n===10));
});
test('every question has a distinct declared answer and remains an unverified draft',()=>{
 for(const c of cases){const p=`src/demos/physics/${c.slug}/meta.json`,meta=JSON.parse(fs.readFileSync(p,'utf8'));assert.equal(meta.status,'draft',c.slug);assert.equal(c.choices.length,3);assert.equal(new Set(c.choices).size,3,c.slug);assert.ok(c.correct>=0&&c.correct<3);assert.equal(meta.recall.options[meta.recall.answer],c.choices[c.correct],c.slug);assert.ok(meta.claims.length>=2&&meta.claims.every(x=>x.status==='unverified'&&x.source),c.slug);assert.ok(c.explanation.length>120&&c.title.length<=40&&c.after.length<=30,c.slug);}
});
test('selected scale, CMB, expansion, and evidence answers preserve key scientific distinctions',()=>{
 const expected={
  'cosmology-light-year-measures-distance':'Distance',
  'cosmology-starlight-is-history':'The star as it was about 100 years ago',
  'cosmology-observable-horizon':'A limit to what light has had time to reach us',
  'cosmology-no-special-center':'There is no special central galaxy',
  'cosmology-cmb-release-era':'About 380,000 years after the Big Bang',
  'cosmology-cmb-temperature':'About 2.7 kelvin',
  'cosmology-dark-matter-identity':'No: its physical nature remains unknown',
  'cosmology-dark-energy-uncertainty':'No: its physical nature remains uncertain',
  'cosmology-dark-matter-not-dark-energy':'Dark matter clusters gravitationally; dark energy is associated with accelerated expansion',
  'cosmology-black-hole-horizon':'A boundary beyond which light cannot escape to distant observers'
 };
 for(const [slug,answer] of Object.entries(expected)){const c=bySlug[slug];assert.ok(c,slug);assert.equal(c.choices[c.correct],answer,slug);}
});
test('registry includes every draft lesson and each curriculum concept once',()=>{
 const curriculum=JSON.parse(fs.readFileSync('content/curriculum/physics.json'));
 const generated=fs.readFileSync('src/demos/loaders.generated.ts','utf8');
 for(const c of cases){assert.equal(curriculum.concepts.filter(x=>x.id===c.slug).length,1,c.slug);assert.ok(generated.includes(`physics/${c.slug}/Demo`),c.slug);}
});
